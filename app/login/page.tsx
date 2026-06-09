'use client'

import { useState, useMemo } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const supabase = useMemo(
    () =>
      createBrowserClient(
        'https://cejaflvoowyytkuqvwdz.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlamFmbHZvb3d5eXRrdXF2d2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MjkyNDcsImV4cCI6MjA5NTUwNTI0N30.T2M46dGoj39SpYnJqcl_uGc7xlJYPK72jos8Beb9blU'
      ),
    []
  )

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
    setMessage('')

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError('Email ou mot de passe incorrect. Vérifie et réessaie.')
        setLoading(false)
        return
      }

      router.push('/dashboard')
      router.refresh()
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError('Une erreur est survenue. Vérifie ton email et réessaie.')
    } else {
      setMessage("Un email de confirmation t'a été envoyé.")
    }

    setLoading(false)
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
        <a href="/" style={{ textDecoration: 'none' }}>
          <img
            src="/logoLisa.webp"
            alt="LISA"
            style={{ height: '120px', width: 'auto' }}
          />
        </a>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px',
          padding: '36px 32px',
          width: '100%',
          maxWidth: '420px',
          margin: '0 24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '28px',
            gap: '4px',
          }}
        >
          {['login', 'signup'].map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => {
                setMode(m)
                setError('')
                setMessage('')
              }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                background:
                  mode === m
                    ? 'linear-gradient(90deg, #A78BFA, #F472B6)'
                    : 'transparent',
                color: '#ffffff',
              }}
            >
              {m === 'login' ? 'Me connecter' : 'Créer un compte'}
            </button>
          ))}
        </div>

        <p
          style={{
            color: '#D4D4D8',
            fontSize: '14px',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}
        >
          {mode === 'login'
            ? 'Bon retour ! Entre tes identifiants pour accéder à ta formation.'
            : 'Crée ton compte pour commencer la Session Découverte gratuite.'}
        </p>

        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              color: '#D4D4D8',
              fontSize: '13px',
              marginBottom: '6px',
            }}
          >
            Adresse e-mail
          </label>
          <input
            name="email"
            type="email"
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
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              color: '#D4D4D8',
              fontSize: '13px',
              marginBottom: '6px',
            }}
          >
            Mot de passe
          </label>

          <div style={{ position: 'relative' }}>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={mode === 'signup' ? 'Au moins 6 caractères' : '••••••••'}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              style={{
                width: '100%',
                padding: '12px 44px 12px 14px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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

        {error && (
          <div
            style={{
              background: 'rgba(244,114,182,0.1)',
              border: '1px solid rgba(244,114,182,0.3)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              color: '#F472B6',
              fontSize: '13px',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {message && (
          <div
            style={{
              background: 'rgba(103,232,249,0.1)',
              border: '1px solid rgba(103,232,249,0.3)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              color: '#67E8F9',
              fontSize: '13px',
            }}
          >
            ✅ {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: loading
              ? 'rgba(255,255,255,0.1)'
              : 'linear-gradient(90deg, #A78BFA, #F472B6)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading
            ? 'Chargement...'
            : mode === 'login'
            ? 'Se connecter'
            : 'Créer mon compte'}
        </button>

        {mode === 'login' && (
          <p style={{ textAlign: 'center', marginTop: '16px' }}>
            <a
              href="/reset-password"
              style={{
                color: '#A78BFA',
                fontSize: '13px',
                textDecoration: 'none',
              }}
            >
              Mot de passe oublié ?
            </a>
          </p>
        )}
      </form>

      <a
        href="/"
        style={{
          color: '#71717A',
          fontSize: '13px',
          marginTop: '24px',
          textDecoration: 'none',
        }}
      >
        ← Retour à l'accueil
      </a>
    </main>
  )
}