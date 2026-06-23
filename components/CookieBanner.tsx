'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accepter = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const refuser = () => {
    localStorage.setItem('cookie_consent', 'refused')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#000000',
      borderTop: '1px solid rgba(167,139,250,0.3)',
      padding: '20px 24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
        Ce site utilise uniquement des cookies essentiels au fonctionnement de la plateforme (session, authentification). Aucun cookie publicitaire ou de tracking.
      </p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={accepter} style={{
          background: 'linear-gradient(90deg, #A78BFA, #F472B6)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer',
        }}>
          Accepter
        </button>
        <button onClick={refuser} style={{
          background: 'none',
          color: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          padding: '10px 20px',
          fontSize: '13px',
          cursor: 'pointer',
        }}>
          Refuser
        </button>
      </div>
    </div>
  )
}