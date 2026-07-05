'use client'

import { Suspense, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  return (
    <Suspense fallback={<main style={{ backgroundColor: '#070014', minHeight: '100vh' }} />}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'

  const supabase = useMemo(() => createClient(), [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') || '').trim()
    const password = String(formData.get('password') || '')

    if (!email || !password) {
      setError('Remplis tous les champs.')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email ou mot de passe incorrect. Vérifie et réessaie.')
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
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
      <div
        style={{
          backgroundColor: '#000000',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '16px 0',
          marginBottom: '48px',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img src="/logoLisa.webp" alt="LISA" style={{ height: '120px', width: 'auto' }} />
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(167,139,250,0.25)',
          borderRadius: '20px',
          padding: '36px 32px',
          width: '100%',
          maxWidth: '420px',
          margin: '0 24px',
          boxShadow: '0 0 40px rgba(167,139,250,0.12)',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Me connecter</h1>
        <p style={{ color: '#D4D4D8', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
          Bon retour ! Entre tes identifiants pour accéder à ta formation.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', color: '#D4D4D8', fontSize: '13px', marginBottom: '6px' }}>
            Adresse e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ton@email.com"
            autoComplete="email"
            style={champStyle}
          />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="password" style={{ display: 'block', color: '#D4D4D8', fontSize: '13px', marginBottom: '6px' }}>
            Mot de passe
          </label>

          <div style={{ position: 'relative' }}>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              style={{ ...champStyle, paddingRight: '44px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              aria-pressed={showPassword}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'right', marginBottom: '20px' }}>
          <Link href="/reset-password" style={{ color: '#A78BFA', fontSize: '13px', textDecoration: 'none' }}>
            Mot de passe oublié ?
          </Link>
        </p>

        {error && (
          <div role="alert" style={erreurStyle}>
            ⚠️ {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{ ...boutonStyle, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
          Pas encore de compte ?{' '}
          <Link href="/inscription" style={{ color: '#A78BFA', textDecoration: 'underline', fontWeight: 600 }}>
            Rejoindre la formation
          </Link>
        </p>
      </form>

      <Link href="/" style={{ color: '#71717A', fontSize: '13px', marginTop: '24px', textDecoration: 'none' }}>
        ← Retour à l'accueil
      </Link>
    </main>
  )
}

const champStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(167,139,250,0.3)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
}

const boutonStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  background: 'linear-gradient(90deg, #A78BFA, #F472B6)',
  border: 'none',
  borderRadius: '12px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 0 24px rgba(167,139,250,0.35)',
}

const erreurStyle: React.CSSProperties = {
  background: 'rgba(244,114,182,0.1)',
  border: '1px solid rgba(244,114,182,0.3)',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '16px',
  color: '#F472B6',
  fontSize: '13px',
}