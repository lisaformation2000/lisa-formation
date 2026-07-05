import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return rgb(r, g, b)
}

// ---- Utilitaires PNG (pur JS, sans dépendance) ----

function readPngChunks(buf: Buffer) {
  const chunks: { type: string; data: Buffer }[] = []
  let off = 8 // sauter la signature PNG
  while (off < buf.length) {
    const len = buf.readUInt32BE(off)
    const type = buf.toString('ascii', off + 4, off + 8)
    const data = buf.subarray(off + 8, off + 8 + len)
    chunks.push({ type, data })
    off += 12 + len
  }
  return chunks
}

function crc32(buf: Buffer): number {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) {
      c = (c >>> 1) ^ (0xEDB88320 & -(c & 1))
    }
  }
  return ~c >>> 0
}

function makeChunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

function paeth(a: number, b: number, c: number) {
  const p = a + b - c
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c)
  if (pa <= pb && pa <= pc) return a
  if (pb <= pc) return b
  return c
}

/**
 * Prend un PNG (Buffer), rend transparents les pixels quasi-noirs,
 * et renvoie un nouveau PNG Buffer en RGBA. Retourne null si non géré.
 */
function makeBlackTransparent(buf: Buffer, threshold = 40): Buffer | null {
  try {
    const sig = buf.subarray(0, 8)
    if (sig[0] !== 0x89 || sig[1] !== 0x50) return null // pas un PNG

    const chunks = readPngChunks(buf)
    const ihdr = chunks.find(c => c.type === 'IHDR')
    if (!ihdr) return null

    const width = ihdr.data.readUInt32BE(0)
    const height = ihdr.data.readUInt32BE(4)
    const bitDepth = ihdr.data.readUInt8(8)
    const colorType = ihdr.data.readUInt8(9)
    const interlace = ihdr.data.readUInt8(12)

    if (bitDepth !== 8 || interlace !== 0) return null
    // couleur : 2 = RGB, 6 = RGBA
    const srcChannels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0
    if (srcChannels === 0) return null

    // Concaténer et décompresser les IDAT
    const idat = Buffer.concat(chunks.filter(c => c.type === 'IDAT').map(c => c.data))
    const raw = zlib.inflateSync(idat)

    const stride = width * srcChannels
    const out = Buffer.alloc(width * height * 4) // RGBA
    const prev = Buffer.alloc(stride)
    let pos = 0

    for (let y = 0; y < height; y++) {
      const filter = raw[pos++]
      const line = Buffer.from(raw.subarray(pos, pos + stride))
      pos += stride

      // défiltrage
      for (let i = 0; i < stride; i++) {
        const a = i >= srcChannels ? line[i - srcChannels] : 0
        const b = prev[i]
        const c = i >= srcChannels ? prev[i - srcChannels] : 0
        let val = line[i]
        if (filter === 1) val = (val + a) & 0xff
        else if (filter === 2) val = (val + b) & 0xff
        else if (filter === 3) val = (val + ((a + b) >> 1)) & 0xff
        else if (filter === 4) val = (val + paeth(a, b, c)) & 0xff
        line[i] = val
      }
      line.copy(prev)

      // écrire RGBA + transparence du noir
      for (let x = 0; x < width; x++) {
        const s = x * srcChannels
        const r = line[s]
        const g = line[s + 1]
        const bl = line[s + 2]
        const srcA = srcChannels === 4 ? line[s + 3] : 255
        const d = (y * width + x) * 4
        out[d] = r
        out[d + 1] = g
        out[d + 2] = bl
        // si pixel quasi-noir -> transparent, sinon garder alpha source
        out[d + 3] = (r <= threshold && g <= threshold && bl <= threshold) ? 0 : srcA
      }
    }

    // reconstruire un PNG RGBA
    const newStride = width * 4
    const rawOut = Buffer.alloc((newStride + 1) * height)
    for (let y = 0; y < height; y++) {
      rawOut[y * (newStride + 1)] = 0 // filtre none
      out.copy(rawOut, y * (newStride + 1) + 1, y * newStride, (y + 1) * newStride)
    }
    const compressed = zlib.deflateSync(rawOut)

    const newIhdr = Buffer.from(ihdr.data)
    newIhdr.writeUInt8(6, 9) // colorType RGBA

    const png = Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      makeChunk('IHDR', newIhdr),
      makeChunk('IDAT', compressed),
      makeChunk('IEND', Buffer.alloc(0)),
    ])
    return png
  } catch {
    return null
  }
}

export async function generateCertificat(
  prenom: string,
  nom: string,
  dateCompletion: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()

  const page = pdfDoc.addPage([841.89, 595.28])
  const { width, height } = page.getSize()

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const PINK   = hexToRgb('#F472B6')
  const VIOLET = hexToRgb('#A78BFA')
  const CYAN   = hexToRgb('#67E8F9')
  const YELLOW = hexToRgb('#FCD34D')
  const BG     = hexToRgb('#070014')
  const WHITE  = rgb(1, 1, 1)

  // Fond noir
  page.drawRectangle({ x: 0, y: 0, width, height, color: BG })

  // Fond image cosmique (protégé)
  try {
    const bgPath = path.join(process.cwd(), 'public', 'certificat-bg.png')
    if (fs.existsSync(bgPath)) {
      const bgBytes = fs.readFileSync(bgPath)
      const bgImg = await pdfDoc.embedPng(bgBytes)
      page.drawImage(bgImg, { x: 0, y: 0, width, height, opacity: 0.30 })
    }
  } catch (e) {
    console.error('Erreur fond certificat:', e)
  }

  // Bordure violette extérieure
  page.drawRectangle({
    x: 18, y: 18, width: width - 36, height: height - 36,
    borderColor: VIOLET, borderWidth: 1.5,
    color: rgb(0, 0, 0), opacity: 0
  })

  // Bordure rose intérieure
  page.drawRectangle({
    x: 24, y: 24, width: width - 48, height: height - 48,
    borderColor: PINK, borderWidth: 0.7,
    color: rgb(0, 0, 0), opacity: 0
  })

  // Logo LisA — fond noir rendu transparent pour se fondre dans le cosmique
  const logoW = 260
  const logoH = 260
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo-lisa-certificat.png')
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath)
      const transparent = makeBlackTransparent(logoBytes, 45)
      const finalBytes = transparent || logoBytes
      const logoImg = await pdfDoc.embedPng(finalBytes)
      page.drawImage(logoImg, {
        x: (width - logoW) / 2,
        y: height - 35 - logoH,
        width: logoW,
        height: logoH,
      })
    }
  } catch (e) {
    console.error('Erreur logo certificat:', e)
  }

  // Position Y de départ après le logo
  let y = height - 35 - logoH - 18

  // ATTESTATION DE FORMATION
  const titleText = 'ATTESTATION DE FORMATION'
  const titleW = fontNormal.widthOfTextAtSize(titleText, 8.5)
  page.drawText(titleText, {
    x: (width - titleW) / 2, y,
    size: 8.5, font: fontNormal, color: CYAN
  })
  y -= 10

  // Ligne déco
  page.drawLine({
    start: { x: (width - 180) / 2, y },
    end:   { x: (width + 180) / 2, y },
    color: VIOLET, thickness: 0.7
  })
  y -= 42

  // Prénom Nom
  const fullName = `${prenom} ${nom}`.trim()
  const nameSize = 30
  const nameW = fontBold.widthOfTextAtSize(fullName, nameSize)
  page.drawText(fullName, {
    x: (width - nameW) / 2, y,
    size: nameSize, font: fontBold, color: PINK
  })
  y -= 12

  // Ligne sous le nom
  const lineW = Math.min(nameW + 60, 360)
  page.drawLine({
    start: { x: (width - lineW) / 2, y },
    end:   { x: (width + lineW) / 2, y },
    color: PINK, thickness: 0.8
  })
  y -= 18

  // a terminé avec succès
  const line1 = 'a terminé avec succès la formation complète'
  const line1W = fontNormal.widthOfTextAtSize(line1, 9)
  page.drawText(line1, {
    x: (width - line1W) / 2, y,
    size: 9, font: fontNormal, color: WHITE, opacity: 0.85
  })
  y -= 13

  const line2 = '30 sessions · 4 semaines · Environ 45 heures de formation'
  const line2W = fontNormal.widthOfTextAtSize(line2, 9)
  page.drawText(line2, {
    x: (width - line2W) / 2, y,
    size: 9, font: fontNormal, color: WHITE, opacity: 0.85
  })
  y -= 22

  // Date
  const dateLine = `Complété le ${dateCompletion}`
  const dateW = fontBold.widthOfTextAtSize(dateLine, 10)
  page.drawText(dateLine, {
    x: (width - dateW) / 2, y,
    size: 10, font: fontBold, color: YELLOW
  })
  y -= 20

  // Séparateur
  const sepY = y
  page.drawLine({
    start: { x: 80, y: sepY },
    end:   { x: width - 80, y: sepY },
    color: VIOLET, thickness: 0.5
  })

  // Bloc gauche — N.F.
  const leftX = width * 0.25
  const sigW = 120
  page.drawLine({
    start: { x: leftX - sigW / 2, y: sepY - 12 },
    end:   { x: leftX + sigW / 2, y: sepY - 12 },
    color: VIOLET, thickness: 0.7
  })
  const nadiaW = fontNormal.widthOfTextAtSize('N.F.', 8)
  page.drawText('N.F.', {
    x: leftX - nadiaW / 2, y: sepY - 22,
    size: 8, font: fontNormal, color: CYAN
  })
  const f1W = fontNormal.widthOfTextAtSize('Fondatrice — LISA Formation', 6.5)
  page.drawText('Fondatrice — LISA Formation', {
    x: leftX - f1W / 2, y: sepY - 31,
    size: 6.5, font: fontNormal, color: WHITE, opacity: 0.45
  })
  const siretW = fontNormal.widthOfTextAtSize('SIRET 10586431800016', 6.5)
  page.drawText('SIRET 10586431800016', {
    x: leftX - siretW / 2, y: sepY - 39,
    size: 6.5, font: fontNormal, color: WHITE, opacity: 0.45
  })

  // Bloc droit — Signature
  const rightX = width * 0.75
  page.drawLine({
    start: { x: rightX - sigW / 2, y: sepY - 12 },
    end:   { x: rightX + sigW / 2, y: sepY - 12 },
    color: PINK, thickness: 0.7
  })
  const sigTextW = fontNormal.widthOfTextAtSize('Signature', 7)
  page.drawText('Signature', {
    x: rightX - sigTextW / 2, y: sepY - 22,
    size: 7, font: fontNormal, color: WHITE, opacity: 0.45
  })

  // Badge central
  const badgeY = sepY - 28
  page.drawEllipse({
    x: width / 2, y: badgeY,
    xScale: 20, yScale: 20,
    borderColor: YELLOW, borderWidth: 1.2,
    color: rgb(0, 0, 0), opacity: 0
  })
  const badge1W = fontBold.widthOfTextAtSize('CERTIFIE', 6)
  page.drawText('CERTIFIE', {
    x: width / 2 - badge1W / 2, y: badgeY + 3,
    size: 6, font: fontBold, color: YELLOW
  })
  const badge2W = fontBold.widthOfTextAtSize('2025-2026', 6)
  page.drawText('2025-2026', {
    x: width / 2 - badge2W / 2, y: badgeY - 6,
    size: 6, font: fontBold, color: YELLOW
  })

  // Pied de page
  const footer = 'formationlisa.fr · contact@formationlisa.fr · Attestation de suivi — Non certifiée Qualiopi — Délivrée à titre informatif'
  const footerW = fontNormal.widthOfTextAtSize(footer, 6.5)
  page.drawText(footer, {
    x: (width - footerW) / 2, y: 30,
    size: 6.5, font: fontNormal, color: WHITE, opacity: 0.35
  })

  return pdfDoc.save()
}