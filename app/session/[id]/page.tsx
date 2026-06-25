'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

const APP_STYLE: Record<string, { couleur: string; bg: string; logo: string }> = {
  windows: { couleur: '#00C8FF', bg: '#00C8FF', logo: '⊞' },
  apple:   { couleur: '#A78BFA', bg: '#A78BFA', logo: '' },
  mac:     { couleur: '#A78BFA', bg: '#A78BFA', logo: '' },
  iphone:  { couleur: '#F472B6', bg: '#F472B6', logo: '▢' },
  android: { couleur: '#3DDC84', bg: '#3DDC84', logo: '🤖' },
}

function VueAppareils({ items }: { items: any[] }) {
  return (
    <>
      {items.map((app: any, i: number) => {
        const key = (app.logo || '').toLowerCase()
        const st = APP_STYLE[key] || { couleur: '#A78BFA', bg: '#A78BFA', logo: '' }
        return (
          <div key={i} style={{ border: `1px solid ${st.couleur}`, borderRadius: '12px', marginBottom: '14px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderBottom: `1px solid ${st.couleur}33` }}>
              <span style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{st.logo}</span>
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

function VueChecklist({ items }: { items: string[] }) {
  return (
    <div style={{ marginTop: '18px' }}>
      {items.map((item: string, i: number) => (
        <div key={i} style={{ borderLeft: '3px solid #A78BFA', backgroundColor: 'rgba(167,139,250,0.05)', borderRadius: '6px', padding: '12px 16px', margin: '8px 0', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ color: '#A78BFA', fontSize: '1rem' }}>☐</span>
          <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{item}</span>
        </div>
      ))}
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

function VueTableau({ lignes }: { lignes: any[] }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      {lignes.map((ligne: any, i: number) => (
        <div key={i} style={{ display: 'flex', gap: '16px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ color: '#67E8F9', fontWeight: 700, fontSize: '0.9rem', minWidth: '180px' }}>{ligne.cle}</span>
          <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{ligne.valeur}</span>
        </div>
      ))}
    </div>
  )
}

function VueBloc({ bloc, partIndex, blocIndex, copied, onCopy }: { bloc: any; partIndex: number; blocIndex: number; copied: string | null; onCopy: (t: string, k: string) => void }) {
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
      return <VueAppareils items={bloc.items || []} />
    case 'outils':
      return <VueOutils items={bloc.items || []} />
    case 'prompts':
      return <VuePrompts items={bloc.items || []} keyPrefix={`${partIndex}-${blocIndex}`} copied={copied} onCopy={onCopy} />
    case 'checklist':
      return <VueChecklist items={bloc.items || []} />
    case 'tableau':
      return <VueTableau lignes={bloc.lignes || []} />
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

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const sessionId = parseInt(id)
      const isFreeSession = sessionId === 0

      if (!user && !isFreeSession) {
        router.push('/login')
        return
      }

      if (user) setUserId(user.id)

      const isSlug = isNaN(sessionId)
      const query = supabase.from('sessions_content').select('*')
      const { data, error } = isSlug
        ? await query.eq('slug', id).single()
        : await query.eq('session_id', sessionId).single()

      if (error || !data) { router.push('/dashboard'); return }
      setSession(data)

      if (user) {
        const { data: progress } = await supabase
          .from('user_progress').select('*')
          .eq('user_id', user.id).eq('session_id', data.session_id).maybeSingle()
        if (progress) setCompleted(true)
      }

      setLoading(false)
    }
    init()
  }, [id])

  const markComplete = async () => {
    if (!userId || !session || completed) return
    setMarking(true)
    await supabase.from('user_progress').upsert({
      user_id: userId, session_id: session.session_id,
      statut: 'terminee', completed_at: new Date().toISOString()
    }, { onConflict: 'user_id,session_id' })
    setCompleted(true); setMarking(false)
  }

  const copier = (texte: string, key: string) => {
    navigator.clipboard.writeText(texte)
    setCopied(key); setTimeout(() => setCopied(null), 1500)
  }

  const currentId = parseInt(id)
  const prevId = !isNaN(currentId) && currentId > 0 ? currentId - 1 : null
  const nextId = !isNaN(currentId) && currentId < 30 ? currentId + 1 : null

  if (loading) return (
    <div style={{ backgroundColor: '#070014', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#A78BFA', fontSize: '1.1rem' }}>Chargement de la session...</p>
    </div>
  )
  if (!session) return null

  const c = session.content_json as any
  const titre = c.titre || c.title || 'Session'
  const sousTitre = c.sous_titre
  const tagline = c.tagline
  const duree = c.duree || c.duration
  const infos = c.infos
  const sommaire: string[] = c.sommaire || []
  const parties: any[] = c.parties || c.parts || []
  const sessionSuivante = c.session_suivante

  return (
    <div style={{ backgroundColor: '#070014', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <div onClick={() => router.push('/')} style={{ backgroundColor: '#000000', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
        <img src="/logo-lisa.png" alt="LISA" style={{ maxWidth: '400px', width: '70%', height: 'auto' }} />
      </div>

      <nav style={{ backgroundColor: '#000000', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/dashboard')} style={{ color: '#A78BFA', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>← Retour au dashboard</button>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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

        {sommaire.length > 0 && (
          <div style={{ backgroundColor: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '40px' }}>
            {sommaire.map((item, i) => (
              <p key={i} style={{ color: '#e2e8f0', fontSize: '0.92rem', margin: '8px 0', display: 'flex', gap: '12px' }}>
                <span style={{ color: '#F472B6', fontWeight: 700 }}>{i + 1}.</span> {item}
              </p>
            ))}
          </div>
        )}

        {parties.map((part: any, index: number) => {
          const pTitre = part.titre || part.title
          const pNumero = part.numero ?? index + 1

          return (
            <div key={index} style={{ marginBottom: '48px' }}>
              <h2 style={{ display: 'flex', alignItems: 'baseline', gap: '12px', fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px' }}>
                <span style={{ color: '#F472B6', fontWeight: 800 }}>{pNumero}.</span>
                <span style={{ color: '#ffffff' }}>{pTitre}</span>
                {part.duree && <span style={{ color: '#67E8F9', fontSize: '0.8rem', fontWeight: 400 }}>· {part.duree}</span>}
              </h2>

              {Array.isArray(part.blocs) && part.blocs.map((bloc: any, bi: number) => (
                <VueBloc key={bi} bloc={bloc} partIndex={index} blocIndex={bi} copied={copied} onCopy={copier} />
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
                  {(part.appareils || []).length > 0 && <VueAppareils items={part.appareils} />}
                  {(part.prompts || []).length > 0 && (
                    <VuePrompts items={part.prompts} keyPrefix={`${index}-legacy`} copied={copied} onCopy={copier} />
                  )}
                  {(part.checklist || []).length > 0 && <VueChecklist items={part.checklist} />}
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