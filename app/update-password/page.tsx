'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()

  const [motDePasse, setMotDePasse] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [succes, setSucces] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (motDePasse.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (motDePasse !== confirmation) {
      setError('Les deux mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: motDePasse })
    setLoading(false)

    if (error) {
      setError("Le lien a peut-être expiré. Refais une demande depuis 'Mot de passe oublié'.")
      return
    }

    setSucces(true)
    setTimeout(() => router.push('/dashboard'), 2000)
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
        <img src="/logoLisa.webp" alt="LISA" style={{ height: '120px', width: 'auto' }} />
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
        <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Nouveau mot de passe</h1>

        {succes ? (
          <p style={{ color: '#67E8F9', fontSize: '14px' }}>✅ Mot de passe mis à jour. Redirection…</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="motDePasse" style={{ display: 'block', color: '#D4D4D8', fontSize: '13px', marginBottom: '6px' }}>
              Nouveau mot de passe
            </label>
            <input
              id="motDePasse"
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              autoComplete="new-password"
              style={champStyle}
            />

            <label htmlFor="confirmation" style={{ display: 'block', color: '#D4D4D8', fontSize: '13px', margin: '16px 0 6px' }}>
              Confirme le mot de passe
            </label>
            <input
              id="confirmation"
              type="password"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              autoComplete="new-password"
              style={champStyle}
            />

            {error && (
              <div role="alert" style={{ color: '#F472B6', fontSize: '13px', margin: '16px 0' }}>
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
                marginTop: '20px',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Mise à jour…' : 'Valider le nouveau mot de passe'}
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

const champStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
}
