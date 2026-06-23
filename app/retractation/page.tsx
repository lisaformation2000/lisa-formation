'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RetractationPage() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [referenceCommande, setReferenceCommande] = useState('')
  const [dateCommande, setDateCommande] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [envoye, setEnvoye] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!nom.trim() || !email.trim()) {
      setError('Le nom et l’email sont obligatoires.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/retractation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, referenceCommande, dateCommande, message }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Une erreur est survenue.')
        setLoading(false)
        return
      }
      setEnvoye(true)
    } catch {
      setError('Impossible d’envoyer la demande. Réessaie ou écris à lisaformationia@gmail.com.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#070014] text-white px-6 py-16 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
        Exercer mon droit de rétractation
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        Cette fonctionnalité est accessible librement, sans création de compte, conformément à
        l’article L221-21 du Code de la consommation. Si tu as expressément renoncé à ce droit
        lors de ton achat (case cochée pour un accès immédiat), ta demande sera examinée au cas
        par cas conformément à l’article L221-28.
      </p>

      {envoye ? (
        <div className="bg-white/5 border border-cyan-400/20 rounded-xl p-6 text-sm text-gray-200">
          ✅ Ta demande a été enregistrée. Un email de confirmation vient de t’être envoyé à
          l’adresse fournie — conserve-le, il constitue ton accusé de réception sur support
          durable. Le traitement (et le remboursement éventuel) intervient dans un délai maximum
          de 14 jours.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="nom">Nom complet *</label>
            <input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="email">Email utilisé lors de l’achat *</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="reference">Référence de commande (si connue)</label>
            <input id="reference" value={referenceCommande} onChange={(e) => setReferenceCommande(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="date">Date de la commande</label>
            <input id="date" type="date" value={dateCommande} onChange={(e) => setDateCommande(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="message">Message (facultatif)</label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none" />
          </div>

          {error && <p className="text-pink-400 text-sm">⚠️ {error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-violet-400 to-pink-400 py-3 font-bold text-sm disabled:opacity-60"
          >
            {loading ? 'Envoi…' : 'Envoyer ma demande de rétractation'}
          </button>
        </form>
      )}

      <p className="text-center text-xs text-gray-500 mt-10">
        <Link href="/" className="underline">← Retour à l’accueil</Link>
      </p>
    </main>
  )
}
