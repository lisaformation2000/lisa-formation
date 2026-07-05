'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function InscriptionPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [checkingSession, setCheckingSession] = useState(true)
  const [dejaConnecte, setDejaConnecte] = useState(false)
  const [dejaPaye, setDejaPaye] = useState(false)

  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('')
  const [accepteCGV, setAccepteCGV] = useState(false)
  const [renonceRetractation, setRenonceRetractation] = useState(false)

  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false)
  const [afficherConfirmation, setAfficherConfirmation] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const verifier = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session?.user) {
        setDejaConnecte(true)
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_paid')
          .eq('id', data.session.user.id)
          .maybeSingle()
        if (profile?.is_paid) setDejaPaye(true)
      }
      setCheckingSession(false)
    }
    verifier()
  }, [supabase])

  const lancerPaiement = async () => {
    setError('')
    if (!accepteCGV) {
      setError('Tu dois accepter les CGV pour continuer.')
      return
    }
    if (!renonceRetractation) {
      setError('Tu dois cocher la case sur le délai de rétractation pour un accès immédiat.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ retractationWaived: true }),
      })
      const json = await res.json()

      if (!res.ok) {
        setError(json.error || 'Une erreur est survenue. Réessaie.')
        setLoading(false)
        return
      }
      if (json.alreadyPaid) {
        router.push('/dashboard')
        return
      }
      window.location.href = json.url
    } catch {
      setError('Impossible de contacter le serveur de paiement. Réessaie dans un instant.')
      setLoading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!prenom.trim() || !email.trim() || !motDePasse) {
      setError('Merci de remplir tous les champs.')
      return
    }
    if (motDePasse.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (motDePasse !== confirmationMotDePasse) {
      setError('Les deux mots de passe ne correspondent pas.')
      return
    }
    if (!accepteCGV) {
      setError('Tu dois accepter les CGV pour continuer.')
      return
    }
    if (!renonceRetractation) {
      setError('Tu dois cocher la case sur le délai de rétractation pour un accès immédiat.')
      return
    }

    setLoading(true)

    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password: motDePasse,
      options: {
        data: { prenom: prenom.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (signUpError) {
      setError(
        signUpError.message.includes('already registered')
          ? 'Un compte existe déjà avec cet email. Connecte-toi pour continuer.'
          : 'Une erreur est survenue lors de la création du compte. Vérifie ton email et réessaie.'
      )
      setLoading(false)
      return
    }

    await lancerPaiement()
  }

  if (checkingSession) {
    return <main style={{ backgroundColor: '#070014', minHeight: '100vh' }} />
  }

  return (
    <main
      style={{
        backgroundColor: '#070014',
        minHeight: '100vh',
        color: '#ffffff',
        fontFamily: "'Inter', sans-serif",
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
          <img
            src="/logoLisa.webp"
            alt="LISA - La formation pour débuter avec l'IA"
            style={{ height: '160px', width: 'auto', display: 'block' }}
          />
        </Link>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
            Rejoins la formation LISA
          </h1>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #F472B6, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            147€
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
            Paiement unique — Accès à vie
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {['30 sessions', 'Exercices pratiques', 'PDF téléchargeables', 'Attestation de formation', 'Mises à jour incluses'].map(
            (item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'rgba(255,255,255,0.8)' }}>
                <span style={{ color: '#67E8F9' }}>✅</span>
                {item}
              </div>
            )
          )}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

        {dejaConnecte ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {dejaPaye ? (
              <>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                  Tu as déjà accès à la formation.
                </p>
                <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                  <button style={boutonPrincipalStyle}>Accéder à mon espace</button>
                </Link>
              </>
            ) : (
              <>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                  Tu es connecté. Plus qu'une étape pour débloquer les 30 sessions.
                </p>
                <CasesLegales
                  accepteCGV={accepteCGV}
                  setAccepteCGV={setAccepteCGV}
                  renonceRetractation={renonceRetractation}
                  setRenonceRetractation={setRenonceRetractation}
                />
                {error && <p style={erreurStyle}>⚠️ {error}</p>}
                <button onClick={lancerPaiement} disabled={loading} style={boutonPrincipalStyle}>
                  {loading ? 'Redirection vers le paiement…' : 'Payer 147€ et débloquer la formation'}
                </button>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} style={inputStyle} autoComplete="given-name" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} autoComplete="email" />

            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={afficherMotDePasse ? 'text' : 'password'}
                placeholder="Mot de passe (8 caractères minimum)"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                style={{ ...inputStyle, paddingRight: '48px' }}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setAfficherMotDePasse((v) => !v)}
                aria-label={afficherMotDePasse ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                style={boutonOeilStyle}
              >
                {afficherMotDePasse ? '🙈' : '👁️'}
              </button>
            </div>

            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={afficherConfirmation ? 'text' : 'password'}
                placeholder="Confirme ton mot de passe"
                value={confirmationMotDePasse}
                onChange={(e) => setConfirmationMotDePasse(e.target.value)}
                style={{ ...inputStyle, paddingRight: '48px' }}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setAfficherConfirmation((v) => !v)}
                aria-label={afficherConfirmation ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                style={boutonOeilStyle}
              >
                {afficherConfirmation ? '🙈' : '👁️'}
              </button>
            </div>

            <CasesLegales
              accepteCGV={accepteCGV}
              setAccepteCGV={setAccepteCGV}
              renonceRetractation={renonceRetractation}
              setRenonceRetractation={setRenonceRetractation}
            />

            {error && <p style={erreurStyle}>⚠️ {error}</p>}

            <button type="submit" disabled={loading} style={boutonPrincipalStyle}>
              {loading ? 'Création du compte…' : 'Je rejoins la formation — 147€'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
          <Link href="/programme" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'underline' }}>
            Retour au programme
          </Link>
        </p>

        {!dejaConnecte && (
          <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '-12px' }}>
            Déjà inscrit ?{' '}
            <Link href="/login" style={{ color: '#A78BFA', textDecoration: 'underline', fontWeight: 600 }}>
              Se connecter
            </Link>
          </p>
        )}
      </div>
    </main>
  )
}

function CasesLegales({
  accepteCGV,
  setAccepteCGV,
  renonceRetractation,
  setRenonceRetractation,
}: {
  accepteCGV: boolean
  setAccepteCGV: (v: boolean) => void
  renonceRetractation: boolean
  setRenonceRetractation: (v: boolean) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: 'rgba(255,255,255,0.6)' }}>
      <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={accepteCGV}
          onChange={(e) => setAccepteCGV(e.target.checked)}
          style={{ marginTop: '3px', flexShrink: 0 }}
        />
        <span>
          J'ai lu et j'accepte les{' '}
          <Link href="/cgv" target="_blank" style={{ color: '#A78BFA' }}>
            Conditions Générales de Vente
          </Link>{' '}
          et la{' '}
          <Link href="/confidentialite" target="_blank" style={{ color: '#A78BFA' }}>
            Politique de Confidentialité
          </Link>
          .
        </span>
      </label>
      <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={renonceRetractation}
          onChange={(e) => setRenonceRetractation(e.target.checked)}
          style={{ marginTop: '3px', flexShrink: 0 }}
        />
        <span>
          Je demande expressément que l'accès à la formation commence immédiatement, avant la
          fin du délai de rétractation de 14 jours, et je reconnais que je perds mon droit de
          rétractation une fois la formation rendue accessible, conformément aux articles
          L221-25 et L221-28 du Code de la consommation.
        </span>
      </label>
    </div>
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

const boutonOeilStyle: React.CSSProperties = {
  position: 'absolute',
  right: '4px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '18px',
  padding: '8px',
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const boutonPrincipalStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #A78BFA, #F472B6)',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  padding: '18px',
  fontSize: '17px',
  fontWeight: 700,
  cursor: 'pointer',
  width: '100%',
  boxShadow: '0 0 32px rgba(167, 139, 250, 0.35)',
}

const erreurStyle: React.CSSProperties = {
  background: 'rgba(244,114,182,0.1)',
  border: '1px solid rgba(244,114,182,0.3)',
  borderRadius: '8px',
  padding: '12px',
  color: '#F472B6',
  fontSize: '13px',
  margin: 0,
}