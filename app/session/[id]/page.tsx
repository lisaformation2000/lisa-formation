'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { use } from 'react'

const supabase = createBrowserClient(
  'https://cejaflvoowyytkuqvwdz.supabase.co/rest/v1/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlamFmbHZvb3d5eXRrdXF2d2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MjkyNDcsImV4cCI6MjA5NTUwNTI0N30.T2M46dGoj39SpYnJqcl_uGc7xlJYPK72jos8Beb9blU'
)

interface SessionData {
  id: string
  session_id: number
  slug: string
  content_json: {
    title: string
    steps: number
    duration?: string
    description?: string
    parts?: Array<{
      title: string
      content: string
      prompts?: Array<{ label: string; text: string }>
      exercise?: { title: string; steps: string[] }
      note?: string
      table?: Array<{ key: string; value: string }>
    }>
  }
}

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [session, setSession] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [marking, setMarking] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUserId(user.id)

      const sessionId = parseInt(id)
      const isSlug = isNaN(sessionId)

      const query = supabase.from('sessions_content').select('*')
      const { data, error } = isSlug
        ? await query.eq('slug', id).single()
        : await query.eq('session_id', sessionId).single()

      if (error || !data) {
        router.push('/dashboard')
        return
      }

      setSession(data)

      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_id', isSlug ? data.session_id : sessionId)
        .single()

      if (progress) setCompleted(true)
      setLoading(false)
    }

    init()
  }, [id])

  const markComplete = async () => {
    if (!userId || !session || completed) return
    setMarking(true)

    await supabase.from('user_progress').upsert({
      user_id: userId,
      session_id: session.session_id,
      completed_at: new Date().toISOString()
    })

    setCompleted(true)
    setMarking(false)
  }

  const currentId = parseInt(id)
  const prevId = currentId > 0 ? currentId - 1 : null
  const nextId = currentId < 30 ? currentId + 1 : null

  if (loading) {
    return (
      <div style={{ backgroundColor: '#070014', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#A78BFA', fontSize: '1.1rem' }}>Chargement de la session...</p>
      </div>
    )
  }

  if (!session) return null

  const { title, duration, parts, description } = session.content_json as any

  return (
    <div style={{ backgroundColor: '#070014', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <nav style={{ backgroundColor: '#000000', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => router.push('/dashboard')}
          style={{ color: '#A78BFA', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
        >
          ← Retour au dashboard
        </button>
        <span style={{ color: '#67E8F9', fontSize: '0.85rem' }}>
          Session {currentId === 0 ? 'Découverte' : currentId} / 30
        </span>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px' }}>

        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #F472B6, #A78BFA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>
          {title}
        </h1>

        {duration && (
          <p style={{ color: '#67E8F9', fontSize: '0.9rem', marginBottom: '32px' }}>
            ⏱ Durée estimée : {duration}
          </p>
        )}

        {description && !parts && (
          <div style={{
            backgroundColor: 'rgba(167, 139, 250, 0.05)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <p style={{ color: '#e2e8f0', lineHeight: '1.8', fontSize: '1rem', margin: 0 }}>
              {description}
            </p>
          </div>
        )}

        {parts && parts.map((part: any, index: number) => (
          <div key={index} style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#F472B6',
              borderLeft: '3px solid #A78BFA',
              paddingLeft: '12px',
              marginBottom: '16px'
            }}>
              {part.title}
            </h2>
            {part.content && (
              <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
                {part.content}
              </p>
            )}
            {part.note && (
              <div style={{ border: '1px solid #67E8F9', borderRadius: '8px', padding: '16px', marginBottom: '16px', backgroundColor: 'rgba(103, 232, 249, 0.05)' }}>
                <p style={{ color: '#67E8F9', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>💡 {part.note}</p>
              </div>
            )}
            {part.prompts && part.prompts.map((prompt: any, i: number) => (
              <div key={i} style={{ border: '1px solid #F472B6', borderRadius: '8px', padding: '16px', marginBottom: '12px', backgroundColor: 'rgba(244, 114, 182, 0.05)' }}>
                <p style={{ color: '#F472B6', fontWeight: '600', fontSize: '0.85rem', marginBottom: '8px' }}>📋 {prompt.label}</p>
                <p style={{ color: '#e2e8f0', fontSize: '0.9rem', margin: 0, whiteSpace: 'pre-wrap' }}>{prompt.text}</p>
              </div>
            ))}
          </div>
        ))}

        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          {completed ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '1rem', fontWeight: '600' }}>
              ✅ Session complétée !
            </div>
          ) : (
            <button
              onClick={markComplete}
              disabled={marking}
              style={{
                background: 'linear-gradient(135deg, #A78BFA, #F472B6)',
                color: 'white', border: 'none', borderRadius: '8px',
                padding: '14px 32px', fontSize: '1rem', fontWeight: '600',
                cursor: marking ? 'not-allowed' : 'pointer', opacity: marking ? 0.7 : 1
              }}
            >
              {marking ? 'Enregistrement...' : '✓ Marquer comme complétée'}
            </button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(167, 139, 250, 0.2)' }}>
          {prevId !== null ? (
            <button
              onClick={() => router.push(`/session/${prevId}`)}
              style={{ color: '#A78BFA', background: 'none', border: '1px solid #A78BFA', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              ← Session précédente
            </button>
          ) : <div />}
          {nextId !== null && (
            <button
              onClick={() => router.push(`/session/${nextId}`)}
              style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}
            >
              Session suivante →
            </button>
          )}
        </div>

      </div>
    </div>
  )
}