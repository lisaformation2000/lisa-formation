'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

function normaliserAppareil(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.filter((item) => typeof item === 'string')
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
    } catch {
      return []
    }
  }
  return []
}

const APP_LOGOS: Record<string, React.ReactNode> = {
  windows: (
    <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="winGrad" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#33B5F5" />
          <stop offset="100%" stopColor="#0078D4" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#winGrad)" />
      <g fill="white">
        <path d="M36,42 L57,39 L57,58 L36,58 Z" />
        <path d="M61,38.5 L84,35 L84,58 L61,58 Z" />
        <path d="M36,62 L57,62 L57,81 L36,78 Z" />
        <path d="M61,62 L84,62 L84,85 L61,81.5 Z" />
      </g>
    </svg>
  ),
  mac: (
    <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="macGrad" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#B9A6FB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#macGrad)" />
      <g transform="translate(60,60) scale(0.062) translate(-512,-555)" fill="white">
        <path d="M747.4,640.6c-1.2-119.9,97.8-177.5,102.3-180.2c-55.8-81.6-142.6-92.8-173.4-94c-73.8-7.5-144.1,43.4-181.6,43.4c-37.4,0-95-42.3-156.3-41.2c-80.4,1.2-154.5,46.7-195.9,118.6c-83.6,145-21.4,360,60,477.9c39.8,57.7,87.3,122.4,149.5,120.1c60-2.4,82.6-38.8,155.2-38.8c72.6,0,92.9,38.8,156.3,37.6c64.5-1.2,105.4-58.8,144.8-116.7c45.6-66.9,64.4-131.7,65.5-135C831.7,832.1,748.7,800.3,747.4,640.6z" />
        <path d="M628.5,313.4c33.1-40.1,55.4-95.8,49.3-151.4c-47.6,1.9-105.3,31.7-139.5,71.8c-30.7,35.5-57.6,92.2-50.4,146.6C490.7,386.5,595.4,353.4,628.5,313.4z" />
      </g>
    </svg>
  ),
  iphone: (
    <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="iphGrad" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#FBB6CE" />
          <stop offset="55%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#DB2777" />
        </radialGradient>
        <linearGradient id="screenSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.22" />
          <stop offset="45%" stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#iphGrad)" />
      <rect x="43" y="30" width="34" height="60" rx="9.5" fill="white" />
      <rect x="47" y="34" width="26" height="52" rx="6" fill="#EC4899" />
      <rect x="47" y="34" width="26" height="52" rx="6" fill="url(#screenSheen)" />
      <rect x="54" y="34" width="12" height="4.5" rx="2.25" fill="white" />
      <rect x="54" y="81.5" width="12" height="2.6" rx="1.3" fill="white" />
    </svg>
  ),
  android: (
    <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="andGrad" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#6EE7A8" />
          <stop offset="55%" stopColor="#3DDC84" />
          <stop offset="100%" stopColor="#1FB866" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#andGrad)" />
      <g fill="white">
        <line x1="47" y1="38" x2="51.5" y2="45" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="73" y1="38" x2="68.5" y2="45" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M42,55 a18,18 0 0 1 36,0 Z" />
        <circle cx="52" cy="49.5" r="2.1" fill="#3DDC84" />
        <circle cx="68" cy="49.5" r="2.1" fill="#3DDC84" />
        <rect x="42" y="58" width="36" height="26" rx="3" />
        <rect x="33" y="58" width="6.5" height="22" rx="3.25" />
        <rect x="80.5" y="58" width="6.5" height="22" rx="3.25" />
        <rect x="49" y="82" width="6.5" height="16" rx="3.25" />
        <rect x="64.5" y="82" width="6.5" height="16" rx="3.25" />
      </g>
    </svg>
  ),
}

const APP_STYLE: Record<string, { couleur: string }> = {
  windows: { couleur: '#00C8FF' },
  apple:   { couleur: '#A78BFA' },
  mac:     { couleur: '#A78BFA' },
  iphone:  { couleur: '#F472B6' },
  android: { couleur: '#3DDC84' },
}

function logoPourCle(key: string): React.ReactNode {
  if (key === 'apple') return APP_LOGOS.mac
  return APP_LOGOS[key] || APP_LOGOS.mac
}

function VueAppareils({ items, filtre }: { items: any[]; filtre: string[] }) {
  const aAfficher = useMemo(() => {
    const normFiltre = filtre.map((f) => (f === 'apple' ? 'mac' : f))
    const visibles = normFiltre.length > 0
      ? items.filter((app: any) => {
          const k = (app.logo || '').toLowerCase()
          return normFiltre.includes(k === 'apple' ? 'mac' : k)
        })
      : items
    return visibles.length > 0 ? visibles : items
  }, [items, filtre])

  return (
    <>
      {aAfficher.map((app: any, i: number) => {
        const key = (app.logo || '').toLowerCase()
        const st = APP_STYLE[key] || { couleur: '#A78BFA' }
        return (
          <div key={i} style={{ border: `1px solid ${st.couleur}`, borderRadius: '12px', marginBottom: '14px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderBottom: `1px solid ${st.couleur}33` }}>
              <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{logoPourCle(key)}</span>
              <span style={{ color: st.couleur, fontWeight: 700, fontSize: '1.05rem' }}>{app.nom}</span>
            </div>
            <div style={{ padding: '14px 18px' }}>
              {(app.etapes || []).map((etape: string, j: number) => (
                <p key={j} style={{ color: '#e2e8f0', fontSize: '0.88rem', margin: '8px 0', display: 'flex', gap: '12px' }}>
                  <span style={{ color: st.couleur, fontWeight: 700, minWidth: '16px' }}>{j + 1}</span> {etape}
                </p>
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}

function VueOutils({ items }: { items: any[] }) {
  return (
    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '20px' }}>
      {items.map((outil: any, i: number) => (
        <div key={i} style={{ flex: '1 1 280px', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '12px', padding: '18px', backgroundColor: 'rgba(167,139,250,0.04)' }}>
          <p style={{ color: '#67E8F9', fontWeight: 700, fontSize: '1rem', marginBottom: '6px' }}>{outil.nom} — {outil.url}</p>
          {outil.description && <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', marginBottom: '10px' }}>{outil.description}</p>}
          {(outil.points || []).map((pt: string, j: number) => (
            <p key={j} style={{ color: '#3DDC84', fontSize: '0.85rem', margin: '4px 0' }}>✓ {pt}</p>
          ))}
        </div>
      ))}
    </div>
  )
}

function VuePrompts({ items, keyPrefix, copied, onCopy }: { items: any[]; keyPrefix: string; copied: string | null; onCopy: (texte: string, key: string) => void }) {
  return (
    <>
      {items.map((prompt: any, i: number) => {
        const key = `${keyPrefix}-${i}`
        const texte = prompt.texte || prompt.text
        return (
          <div key={i} style={{ border: '1px solid #F472B6', borderRadius: '12px', marginBottom: '14px', overflow: 'hidden', backgroundColor: 'rgba(244,114,182,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid rgba(244,114,182,0.2)' }}>
              <span style={{ color: '#F472B6', fontWeight: 600, fontSize: '0.88rem' }}>{prompt.label}</span>
              <button onClick={() => onCopy(texte, key)} style={{ background: 'rgba(244,114,182,0.15)', color: '#F472B6', border: '1px solid #F472B6', borderRadius: '6px', padding: '4px 12px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
                {copied === key ? '✓ Copié' : 'Copier'}
              </button>
            </div>
            <p style={{ color: '#e2e8f0', fontSize: '0.88rem', margin: 0, padding: '14px 16px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', lineHeight: 1.6 }}>{texte}</p>
          </div>
        )
      })}
    </>
  )
}

function VueChecklist({ items, storageKey }: { items: string[]; storageKey: string }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false))

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const arr = JSON.parse(saved)
        if (Array.isArray(arr) && arr.length === items.length) {
          setChecked(arr)
          return
        }
      }
    } catch {}
    setChecked(items.map(() => false))
  }, [storageKey, items.length])

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const tousCoches = checked.length > 0 && checked.every(Boolean)

  return (
    <div style={{ marginTop: '18px' }}>
      {items.map((item: string, i: number) => (
        <div
          key={i}
          onClick={() => toggle(i)}
          style={{
            borderLeft: `3px solid ${checked[i] ? '#3DDC84' : '#A78BFA'}`,
            backgroundColor: checked[i] ? 'rgba(61,220,132,0.08)' : 'rgba(167,139,250,0.05)',
            borderRadius: '6px',
            padding: '12px 16px',
            margin: '8px 0',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            userSelect: 'none',
          }}
        >
          <span style={{ color: checked[i] ? '#3DDC84' : '#A78BFA', fontSize: '1.1rem', flexShrink: 0 }}>
            {checked[i] ? '☑' : '☐'}
          </span>
          <span style={{
            color: checked[i] ? 'rgba(255,255,255,0.5)' : '#e2e8f0',
            fontSize: '0.9rem',
            
          }}>
            {item}
          </span>
        </div>
      ))}

      {tousCoches && (
        <div style={{
          marginTop: '14px',
          padding: '14px 18px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(61,220,132,0.12), rgba(103,232,249,0.10))',
          border: '1px solid rgba(61,220,132,0.35)',
          textAlign: 'center',
        }}>
          <p style={{ color: '#3DDC84', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>
            🎉 Bravo, tu as tout coché ! Tu peux passer à la suite.
          </p>
        </div>
      )}
    </div>
  )
}

function normaliserLigne(item: any): { cle: string; valeur: string } {
  if (typeof item === 'string') {
    const [t, ...reste] = item.split(' — ')
    return { cle: t, valeur: reste.join(' — ') }
  }
  if (Array.isArray(item)) {
    return { cle: String(item[0] ?? ''), valeur: item.slice(1).join(' — ') }
  }
  if (item && typeof item === 'object') {
    const cle = item.titre || item.nom || item.cle || item.label || ''
    const valeur = item.description || item.valeur || item.texte || item.text || ''
    return { cle, valeur }
  }
  return { cle: String(item ?? ''), valeur: '' }
}

function VueTableau({ lignes, titre }: { lignes: any[]; titre?: string }) {
  return (
    <div style={{ backgroundColor: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
      {titre && <p style={{ color: '#A78BFA', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px' }}>{titre}</p>}
      {lignes.map((ligne: any, i: number) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px 16px',
            padding: '10px 0',
            borderBottom: i < lignes.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}
        >
          <span style={{ color: '#F472B6', fontWeight: 700, fontSize: '0.9rem', flex: '0 0 auto' }}>{ligne.cle}</span>
          <span style={{ color: '#e2e8f0', fontSize: '0.92rem', flex: '1 1 200px' }}>{ligne.valeur}</span>
        </div>
      ))}
    </div>
  )
}

function VueBloc({ bloc, partIndex, blocIndex, copied, onCopy, filtreAppareil, sessionId }: { bloc: any; partIndex: number; blocIndex: number; copied: string | null; onCopy: (t: string, k: string) => void; filtreAppareil: string[]; sessionId: number }) {
  switch (bloc.type) {
    case 'texte':
      return <p style={{ color: '#e2e8f0', lineHeight: 1.8, marginBottom: '18px', whiteSpace: 'pre-wrap' }}>{bloc.texte}</p>
    case 'note':
      return (
        <div style={{ borderLeft: '3px solid #A78BFA', borderRadius: '8px', padding: '14px 18px', marginBottom: '16px', backgroundColor: 'rgba(167,139,250,0.08)' }}>
          <p style={{ color: '#c4b5fd', fontSize: '0.9rem', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>{bloc.texte}</p>
        </div>
      )
    case 'alerte':
      return (
        <div style={{ border: '1px solid #67E8F9', borderRadius: '8px', padding: '14px 18px', marginBottom: '16px', backgroundColor: 'rgba(103,232,249,0.06)' }}>
          <p style={{ color: '#67E8F9', fontSize: '0.9rem', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>⚠ {bloc.texte}</p>
        </div>
      )
    case 'appareils_titre':
      return <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, margin: '24px 0 14px' }}>{bloc.texte}</h3>
    case 'appareils':
      return <VueAppareils items={bloc.items || []} filtre={filtreAppareil} />
    case 'outils':
      return <VueOutils items={bloc.items || []} />
    case 'prompts':
      return <VuePrompts items={bloc.items || []} keyPrefix={`${partIndex}-${blocIndex}`} copied={copied} onCopy={onCopy} />
    case 'checklist':
      return <VueChecklist items={bloc.items || []} storageKey={`lisa-checklist-s${sessionId}-p${partIndex}-b${blocIndex}`} />
    case 'tableau':
      return <VueTableau lignes={bloc.lignes || []} titre={bloc.titre} />
    default:
      return null
  }
}

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [marking, setMarking] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [filtreAppareil, setFiltreAppareil] = useState<string[]>([])

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const sessionId = parseInt(id)
      const isFreeSession = sessionId === 0

      if (!user && !isFreeSession) {
        router.push('/login')
        return
      }

      if (user) {
        setUserId(user.id)
        const { data: profile } = await supabase
          .from('profiles')
          .select('appareil_prefere')
          .eq('id', user.id)
          .maybeSingle()
        setFiltreAppareil(normaliserAppareil(profile?.appareil_prefere))
      }

      const isSlug = isNaN(sessionId)
      const query = supabase.from('sessions_content').select('*')
      const { data, error } = isSlug
        ? await query.eq('slug', id).single()
        : await query.eq('session_id', sessionId).single()

      if (error || !data) { router.push('/dashboard'); return }
      setSession(data)

      if (user) {
        const { data: progress } = await supabase
          .from('session_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('session_id', data.session_id)
          .maybeSingle()
        if (progress?.completed) setCompleted(true)
      }

      setLoading(false)
    }
    init()
  }, [id])

  const markComplete = async () => {
    if (!userId || !session || completed) return
    setMarking(true)
    await supabase.from('session_progress').upsert({
      user_id: userId,
      session_id: session.session_id,
      completed: true,
      completed_at: new Date().toISOString()
    }, { onConflict: 'user_id,session_id' })
    setCompleted(true)
    setMarking(false)
  }

  const copier = (texte: string, key: string) => {
    navigator.clipboard.writeText(texte)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  const currentId = parseInt(id)
  const prevId = !isNaN(currentId) && currentId > 0 ? currentId - 1 : null
  const nextId = !isNaN(currentId) && currentId < 30 ? currentId + 1 : null

  const c = session?.content_json as any

  const titre = c?.titre || c?.title || 'Session'
  const sousTitre = c?.sous_titre
  const tagline = c?.tagline
  const duree = c?.duree || c?.duration
  const infos = c?.infos
  const sessionSuivante = c?.session_suivante

  const sommaire: string[] = useMemo(() => c?.sommaire || [], [c])
  const parties: any[] = useMemo(() => c?.parties || c?.parts || [], [c])

  if (loading) return (
    <div style={{ backgroundColor: '#070014', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#A78BFA', fontSize: '1.1rem' }}>Chargement de la session...</p>
    </div>
  )
  if (!session) return null

  return (
    <div style={{ backgroundColor: '#070014', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <div onClick={() => router.push('/')} style={{ backgroundColor: '#000000', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
        <img src="/logo-lisa.png" alt="LISA" style={{ maxWidth: '400px', width: '70%', height: 'auto' }} />
      </div>

      <nav style={{ backgroundColor: '#000000', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/dashboard')} style={{ color: '#A78BFA', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>← Retour au dashboard</button>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => router.push('/compte')} style={{ color: '#F472B6', background: 'none', border: '1px solid #F472B6', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontSize: '0.85rem' }}>👤 Mon compte</button>
          <button onClick={() => router.push('/programme')} style={{ color: '#67E8F9', background: 'none', border: '1px solid #67E8F9', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontSize: '0.85rem' }}>📋 Programme</button>
          <span style={{ color: '#67E8F9', fontSize: '0.85rem' }}>Session {currentId === 0 ? 'Découverte' : currentId} / 30</span>
        </div>
      </nav>

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '36px 20px' }}>

        {sousTitre && <p style={{ color: '#A78BFA', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{titre}</p>}
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(90deg, #F472B6, #A78BFA, #67E8F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px', lineHeight: 1.2 }}>
          {sousTitre || titre}
        </h1>
        {tagline && <p style={{ color: '#F472B6', fontSize: '0.95rem', marginBottom: '12px', fontStyle: 'italic' }}>{tagline}</p>}
        {infos && <p style={{ color: '#67E8F9', fontSize: '0.88rem', marginBottom: '28px' }}>{infos}</p>}
        {!infos && duree && <p style={{ color: '#67E8F9', fontSize: '0.9rem', marginBottom: '28px' }}>⏱ {duree}</p>}

        {/* Sommaire — corrigé mobile */}
        {sommaire.length > 0 && (
          <div style={{ backgroundColor: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '40px' }}>
            {sommaire.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: '8px 0' }}>
                <span style={{ color: '#F472B6', fontWeight: 700, flexShrink: 0, minWidth: '20px' }}>{i + 1}.</span>
                <span style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        {parties.map((part: any, index: number) => {
          const pTitre = part.titre || part.title || ''
          const pNumero = part.numero ?? index + 1

          const titreSansDouble = pTitre.replace(/^\d+\.\s*/, '')

          return (
            <div key={index} style={{ marginBottom: '48px' }}>
              <h2 style={{ display: 'flex', alignItems: 'baseline', gap: '12px', fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px' }}>
                <span style={{ color: '#F472B6', fontWeight: 800 }}>{pNumero}.</span>
                <span style={{ color: '#ffffff' }}>{titreSansDouble}</span>
                {part.duree && <span style={{ color: '#67E8F9', fontSize: '0.8rem', fontWeight: 400 }}>· {part.duree}</span>}
              </h2>

              {Array.isArray(part.blocs) && part.blocs.map((bloc: any, bi: number) => (
                <VueBloc key={bi} bloc={bloc} partIndex={index} blocIndex={bi} copied={copied} onCopy={copier} filtreAppareil={filtreAppareil} sessionId={session.session_id} />
              ))}

              {!Array.isArray(part.blocs) && (
                <>
                  {part.contenu && <p style={{ color: '#e2e8f0', lineHeight: 1.8, marginBottom: '18px', whiteSpace: 'pre-wrap' }}>{part.contenu}</p>}
                  {part.note && (
                    <div style={{ borderLeft: '3px solid #A78BFA', borderRadius: '8px', padding: '14px 18px', marginBottom: '16px', backgroundColor: 'rgba(167,139,250,0.08)' }}>
                      <p style={{ color: '#c4b5fd', fontSize: '0.9rem', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>{part.note}</p>
                    </div>
                  )}
                  {part.alerte && (
                    <div style={{ border: '1px solid #67E8F9', borderRadius: '8px', padding: '14px 18px', marginBottom: '16px', backgroundColor: 'rgba(103,232,249,0.06)' }}>
                      <p style={{ color: '#67E8F9', fontSize: '0.9rem', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>⚠ {part.alerte}</p>
                    </div>
                  )}
                  {(part.capacites || []).length > 0 && (
                    <VueTableau lignes={(part.capacites || []).map((cap: any) => normaliserLigne(cap))} />
                  )}
                  {(part.limites || []).length > 0 && (
                    <VueTableau lignes={(part.limites || []).map((lim: any) => normaliserLigne(lim))} />
                  )}
                  {(part.outils || []).length > 0 && <VueOutils items={part.outils} />}
                  {part.appareils_titre && <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, margin: '24px 0 14px' }}>{part.appareils_titre}</h3>}
                  {(part.appareils || []).length > 0 && <VueAppareils items={part.appareils} filtre={filtreAppareil} />}
                  {(part.prompts || []).length > 0 && (
                    <VuePrompts items={part.prompts} keyPrefix={`${index}-legacy`} copied={copied} onCopy={copier} />
                  )}
                  {(part.checklist || []).length > 0 && <VueChecklist items={part.checklist} storageKey={`lisa-checklist-s${session.session_id}-p${index}-legacy`} />}
                </>
              )}
            </div>
          )
        })}

        {sessionSuivante && (
          <div style={{ backgroundColor: 'rgba(244,114,182,0.05)', border: '1px solid rgba(244,114,182,0.2)', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px' }}>
            <p style={{ color: '#F472B6', fontWeight: 700, fontSize: '0.78rem', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>→ Session suivante</p>
            <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>{sessionSuivante}</p>
          </div>
        )}

        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          {completed ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3DDC84', fontSize: '1rem', fontWeight: 600 }}>✅ Session complétée !</div>
          ) : userId ? (
            <button onClick={markComplete} disabled={marking} style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)', color: 'white', border: 'none', borderRadius: '8px', padding: '14px 32px', fontSize: '1rem', fontWeight: 600, cursor: marking ? 'not-allowed' : 'pointer', opacity: marking ? 0.7 : 1 }}>
              {marking ? 'Enregistrement...' : '✓ Marquer comme complétée'}
            </button>
          ) : (
            <button onClick={() => router.push('/decouverte')} style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)', color: 'white', border: 'none', borderRadius: '8px', padding: '14px 32px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
              ✨ Rejoindre la formation — 147€
            </button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(167,139,250,0.2)' }}>
          {prevId !== null ? (
            <button onClick={() => router.push(`/session/${prevId}`)} style={{ color: '#A78BFA', background: 'none', border: '1px solid #A78BFA', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontSize: '0.9rem' }}>← Précédente</button>
          ) : <div />}
          {nextId !== null && (
            <button onClick={() => router.push(`/session/${nextId}`)} style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>Suivante →</button>
          )}
        </div>

      </div>
    </div>
  )
}