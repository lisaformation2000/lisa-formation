'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://cejaflvoowyytkuqvwdz.supabase.co'

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlamFmbHZvb3d5eXRrdXF2d2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MjkyNDcsImV4cCI6MjA5NTUwNTI0N30.T2M46dGoj39SpYnJqcl_uGc7xlJYPK72jos8Beb9blU'

const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const CATEGORY_ORDER = [
  "Decouvrir l'IA",
  "Utiliser l'IA au quotidien",
  'Confidentialite',
  'Comparer les IA',
  'La formation LISA',
]

const CACHE_KEY = 'lisa_faq_cache_v1'
const CACHE_DURATION_MS = 60 * 60 * 1000

interface FaqItem {
  id: number
  category: string
  question: string
  answer: string
  display_order: number
}

const titleGradient: React.CSSProperties = {
  background: 'linear-gradient(90deg, #A78BFA 0%, #C4A6F5 30%, #F472B6 65%, #F9A8D4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY)
        if (cached) {
          const parsed = JSON.parse(cached)
          if (Date.now() - parsed.timestamp < CACHE_DURATION_MS) {
            setFaqs(parsed.data)
            setLoading(false)
            return
          }
        }
      } catch {}

      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .order('display_order', { ascending: true })

      if (!error && data) {
        setFaqs(data as FaqItem[])
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
        } catch {}
      }
      setLoading(false)
    }
    load()
  }, [])

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: faqs.filter((f) => f.category === cat),
  })).filter((g) => g.items.length > 0)

  function toggle(id: number) {
    setOpenQuestion((prev) => (prev === id ? null : id))
  }

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: '#070014' }}>
      <div className="max-w-2xl mx-auto space-y-6">

        <div className="flex items-center gap-3 mb-2">
          <Link href="/dashboard" className="text-white opacity-40 hover:opacity-70 text-sm">
            Retour au dashboard
          </Link>
        </div>

        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2" style={titleGradient}>
            Foire aux questions
          </h1>
          <p className="text-white/45 text-sm">
            Tout ce que tu dois savoir sur l'IA et sur la formation LISA
          </p>
        </div>

        {loading && (
          <div className="text-white/40 text-sm text-center py-10">Chargement des questions...</div>
        )}

        {!loading && grouped.length === 0 && (
          <div className="text-white/40 text-sm text-center py-10">
            Aucune question disponible pour le moment.
          </div>
        )}

        {!loading && grouped.map((group) => (
          <div key={group.category} className="rounded-2xl p-6 border"
            style={{
              borderColor: 'rgba(167,139,250,0.20)',
              background: 'linear-gradient(160deg, rgba(167,139,250,0.06), rgba(103,232,249,0.04))',
            }}>
            <h2 className="text-lg font-semibold mb-4" style={titleGradient}>
              {group.category}
            </h2>
            <div className="space-y-2">
              {group.items.map((item) => {
                const isOpen = openQuestion === item.id
                return (
                  <div key={item.id} className="rounded-xl border overflow-hidden transition-all"
                    style={{
                      borderColor: isOpen ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.08)',
                      background: isOpen ? 'rgba(167,139,250,0.08)' : 'rgba(255,255,255,0.02)',
                    }}>
                    <button
                      onClick={() => toggle(item.id)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between gap-3"
                    >
                      <span className="text-white text-sm font-medium">{item.question}</span>
                      <span className="text-[#A78BFA] text-lg flex-shrink-0">
                        {isOpen ? '-' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-white/55 text-sm leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="rounded-2xl p-6 border border-white/10 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-white/40 text-xs">
            Tu ne trouves pas la reponse a ta question ?
          </p>
          <a href="mailto:contact@formationlisa.fr" className="text-[#A78BFA] text-sm font-medium">
            contact@formationlisa.fr
          </a>
        </div>

      </div>
    </div>
  )
}
