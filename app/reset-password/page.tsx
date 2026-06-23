'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const supabase = useMemo(() => createClient(), [])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [envoye, setEnvoye] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim()) {
      setError('Entre ton adresse email.')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/update-password`,
    })

    setLoading(false)

    // On affiche toujours le même message de succès, qu'un compte existe ou non
    // avec cet email — c'est une pratique de sécurité standard (ne pas révéler
    // si une adresse email est inscrite ou pas).
    if (error) {
      console.error(error)
    }
    setEnvoye(true)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#070014',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        color: '#ffffff',
      }}
    >
      <div style={{ backgroundColor: '#000000', width: '100%', display: 'flex', justifyContent: 'center', padding: '16px 0', marginBottom: '48px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img src="/logoLisa.webp" alt="LISA" style={{ height: '120px', width: 'auto' }} />
        </Link>
      </div>

      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px',
          padding: '36px 32px',
          width: '100%',
          maxWidth: '420px',
          margin: '0 24px',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Mot de passe oublié</h1>

        {envoye ? (
          <p style={{ color: '#67E8F9', fontSize: '14px', lineHeight: 1.6 }}>
            ✅ Si un compte existe avec cette adresse, un email avec un lien de
            réinitialisation vient de t'être envoyé. Vérifie ta boîte de réception
            (et tes spams).
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ color: '#D4D4D8', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
              Entre ton email, on t'envoie un lien pour choisir un nouveau mot de passe.
            </p>

            <label htmlFor="email" style={{ display: 'block', color: '#D4D4D8', fontSize: '13px', marginBottom: '6px' }}>
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              autoComplete="email"
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: '20px',
              }}
            />

            {error && (
              <div role="alert" style={{ color: '#F472B6', fontSize: '13px', marginBottom: '16px' }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(90deg, #A78BFA, #F472B6)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Envoi…' : 'Envoyer le lien'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
          <Link href="/login" style={{ color: '#A78BFA', textDecoration: 'underline' }}>
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </main>
  )
}
