import { NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { readFile } from 'fs/promises'
import path from 'path'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })
  }

  const { data: progress } = await supabase
    .from('user_progress')
    .select('session_id, statut, completed_at')
    .eq('user_id', user.id)
    .eq('statut', 'terminee')

  const sessionsTerminees = progress?.length ?? 0
  if (sessionsTerminees < 30) {
    return NextResponse.json(
      { error: 'La formation doit être terminée à 100% pour générer l’attestation.' },
      { status: 403 }
    )
  }

  const prenom = user.user_metadata?.prenom || ''
  const nom = user.user_metadata?.nom || ''
  const nomComplet = `${prenom} ${nom}`.trim() || user.email || 'Participant LISA'

  const dateCompletion = progress
    ?.map((p) => p.completed_at)
    .filter(Boolean)
    .sort()
    .at(-1)
  const dateAffichee = dateCompletion
    ? new Date(dateCompletion).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([842, 595]) // A4 paysage

  // Fond
  page.drawRectangle({ x: 0, y: 0, width: 842, height: 595, color: rgb(0.027, 0, 0.078) })

  // Cadre décoratif
  page.drawRectangle({
    x: 24, y: 24, width: 842 - 48, height: 595 - 48,
    borderColor: rgb(0.655, 0.545, 0.980), borderWidth: 1.5,
  })

  // Logo
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo-lisa-email.png')
    const logoBytes = await readFile(logoPath)
    const logoImage = await pdfDoc.embedPng(logoBytes)
    const logoDims = logoImage.scale(0.28)
    page.drawImage(logoImage, {
      x: (842 - logoDims.width) / 2,
      y: 595 - 70 - logoDims.height,
      width: logoDims.width,
      height: logoDims.height,
    })
  } catch {
    // Si le logo n'est pas trouvé, on continue sans bloquer la génération du certificat.
  }

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

  const centrer = (texte: string, font: typeof fontBold, taille: number) =>
    (842 - font.widthOfTextAtSize(texte, taille)) / 2

  const titre = 'ATTESTATION DE FORMATION'
  page.drawText(titre, {
    x: centrer(titre, fontBold, 22), y: 410, size: 22, font: fontBold,
    color: rgb(0.976, 0.451, 0.714),
  })

  const sousTitre = "LISA — La formation pour débuter avec l'IA"
  page.drawText(sousTitre, {
    x: centrer(sousTitre, fontRegular, 13), y: 382, size: 13, font: fontRegular,
    color: rgb(0.8, 0.8, 0.85),
  })

  const ligne1 = 'Ceci certifie que'
  page.drawText(ligne1, {
    x: centrer(ligne1, fontRegular, 12), y: 330, size: 12, font: fontRegular,
    color: rgb(0.7, 0.7, 0.78),
  })

  page.drawText(nomComplet, {
    x: centrer(nomComplet, fontBold, 28), y: 295, size: 28, font: fontBold,
    color: rgb(1, 1, 1),
  })

  const ligne2 = 'a suivi avec succès l’intégralité des 30 sessions de la formation,'
  page.drawText(ligne2, {
    x: centrer(ligne2, fontRegular, 12), y: 255, size: 12, font: fontRegular,
    color: rgb(0.7, 0.7, 0.78),
  })
  const ligne3 = 'soit environ 45 heures de contenu pédagogique sur l’usage pratique de l’intelligence artificielle.'
  page.drawText(ligne3, {
    x: centrer(ligne3, fontRegular, 12), y: 235, size: 12, font: fontRegular,
    color: rgb(0.7, 0.7, 0.78),
  })

  const dateLigne = `Formation complétée le ${dateAffichee}`
  page.drawText(dateLigne, {
    x: centrer(dateLigne, fontRegular, 12), y: 190, size: 12, font: fontRegular,
    color: rgb(0.4, 0.85, 0.95),
  })

  const mention = 'Attestation de suivi — Non certifiée Qualiopi — Délivrée à titre informatif — Valorisable sur LinkedIn et CV'
  page.drawText(mention, {
    x: centrer(mention, fontItalic, 9), y: 80, size: 9, font: fontItalic,
    color: rgb(0.55, 0.55, 0.6),
  })

  const site = 'formationlisa.fr'
  page.drawText(site, {
    x: centrer(site, fontRegular, 10), y: 60, size: 10, font: fontRegular,
    color: rgb(0.55, 0.45, 0.85),
  })

  const pdfBytes = await pdfDoc.save()

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Attestation-LISA.pdf"',
    },
  })
}
