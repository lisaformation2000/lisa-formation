'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DecouvertePage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !motDePasse) {
      setError('Merci de remplir tous les champs.')
      return
    }
    if (motDePasse.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    setLoading(true)

    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password: motDePasse,
    })

    if (signUpError) {
      if (signUpError.message.includes('already registered') || signUpError.message.includes('User already registered')) {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: motDePasse,
        })
        if (loginError) {
          setError('Un compte existe déjà avec cet email. Vérifie ton mot de passe.')
          setLoading(false)
          return
        }
        router.push('/session/0')
        return
      }
      setError('Une erreur est survenue. Réessaie.')
      setLoading(false)
      return
    }

    await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: motDePasse,
    })

    router.push('/session/0')
  }

  return (
    <main
      style={{
        backgroundColor: '#070014',
        minHeight: '100vh',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 24px 80px',
      }}
    >
      <div
        style={{
          backgroundColor: '#000000',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '16px 0',
          marginBottom: '40px',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img src="/logo-lisa.png" alt="LISA" style={{ height: '120px', width: 'auto' }} />
        </Link>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(167,139,250,0.3)',
          borderRadius: '20px',
          padding: '40px 32px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>✨</div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
            Session découverte gratuite
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            Crée ton compte gratuit pour accéder à ta première session — sans engagement, sans carte bancaire.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input
            type="email"
            placeholder="Ton adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Choisis un mot de passe (8 caractères min.)"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            style={inputStyle}
            autoComplete="new-password"
          />

          {error && (
            <p style={erreurStyle}>⚠️ {error}</p>
          )}

          <button type="submit" disabled={loading} style={{ ...boutonStyle, opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Chargement…' : '✨ Accéder à la session découverte'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '20px' }}>
          Déjà un compte ?{' '}
          <Link href="/login?next=/session/0" style={{ color: '#A78BFA', textDecoration: 'underline' }}>
            Se connecter
          </Link>
        </p>

        <div
          style={{
            marginTop: '28px',
            padding: '16px',
            background: 'rgba(167,139,250,0.06)',
            border: '1px solid rgba(167,139,250,0.15)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            Après la session découverte, tu pourras rejoindre la formation complète pour <strong style={{ color: '#F472B6' }}>147€</strong> — paiement unique, accès à vie.
          </p>
        </div>
      </div>

      <Link href="/" style={{ color: '#71717A', fontSize: '13px', marginTop: '24px', textDecoration: 'none' }}>
        ← Retour à l'accueil
      </Link>
    </main>
  )
}

const inputStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '14px 16px',
  fontSize: '15px',
  color: '#ffffff',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

const boutonStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #A78BFA, #F472B6)',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  padding: '16px',
  fontSize: '16px',
  fontWeight: 700,
  cursor: 'pointer',
  width: '100%',
}

const erreurStyle: React.CSSProperties = {
  background: 'rgba(244,114,182,0.1)',
  border: '1px solid rgba(255,114,182,0.3)',
  borderRadius: '8px',
  padding: '12px',
  color: '#F472B6',
  fontSize: '13px',
  margin: 0,
}