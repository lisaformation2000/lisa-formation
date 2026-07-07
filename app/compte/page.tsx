'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import RessourcesSection from './ressources'

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://cejaflvoowyytkuqvwdz.supabase.co'

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlamFmbHZvb3d5eXRrdXF2d2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MjkyNDcsImV4cCI6MjA5NTUwNTI0N30.T2M46dGoj39SpYnJqcl_uGc7xlJYPK72jos8Beb9blU'

const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const BADGES = [
  { lettre: 'L', label: 'Semaine 1', image: '/badges/badge-L.png', sessions: Array.from({ length: 7 }, (_, i) => i + 1) },
  { lettre: 'i', label: 'Semaine 2', image: '/badges/badge-i.png', sessions: Array.from({ length: 7 }, (_, i) => i + 8) },
  { lettre: 's', label: 'Semaine 3', image: '/badges/badge-s.png', sessions: Array.from({ length: 7 }, (_, i) => i + 15) },
  { lettre: 'A', label: 'Semaine 4', image: '/badges/badge-A.png', sessions: Array.from({ length: 9 }, (_, i) => i + 22) },
]

const APPAREIL_LABELS: Record<string, string> = {
  windows: '💻 Windows',
  apple: '🍎 Mac / Apple',
  mac: '🍎 Mac / Apple',
  iphone: '📱 iPhone',
  android: '🤖 Android',
}

function getAppareilLabel(raw: any): string {
  if (!raw) return 'Appareil non défini'
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((p: string) => APPAREIL_LABELS[p] || p).join(' · ')
    }
    if (typeof parsed === 'string') {
      return APPAREIL_LABELS[parsed] || parsed
    }
  } catch {
    if (typeof raw === 'string') return APPAREIL_LABELS[raw] || raw
  }
  return 'Appareil non défini'
}

const neonText: React.CSSProperties = {
  fontFamily: "var(--font-lisa-cursive), 'Brush Script MT', cursive",
  background: 'linear-gradient(100deg, #FCA5C4 0%, #F472B6 20%, #C4A6F5 42%, #67E8F9 62%, #A78BFA 82%, #F9A8D4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  filter: 'drop-shadow(0 0 6px rgba(167,139,250,0.55)) drop-shadow(0 0 12px rgba(103,232,249,0.35))',
}

const titleGradient: React.CSSProperties = {
  background: 'linear-gradient(90deg, #A78BFA 0%, #C4A6F5 30%, #F472B6 65%, #F9A8D4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function ComptePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [completedIds, setCompletedIds] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(prof)

      const { data: prog } = await supabase
        .from('session_progress')
        .select('session_id')
        .eq('user_id', user.id)
        .eq('completed', true)

      const ids = (prog || [])
        .map((p: any) => p.session_id)
        .filter((id: number) => id >= 1 && id <= 30)

      setCompletedIds(ids)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#070014' }}>
      <div className="text-white opacity-60 text-sm">Chargement...</div>
    </div>
  )

  const totalSessions = 30
  const progressPct = Math.min(Math.round((completedIds.length / totalSessions) * 100), 100)
  const hasS30 = completedIds.includes(30)

  const prenomAffiche = profile?.first_name?.trim() || ''
  const nomComplet = `${prenomAffiche} ${profile?.last_name || ''}`.trim()
  const initiale = (prenomAffiche?.[0] || nomComplet?.[0] || '✦').toUpperCase()

  function badgeUnlocked(badge: typeof BADGES[0]) {
    return badge.sessions.every(id => completedIds.includes(id))
  }

  async function downloadCertificat() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    window.open(`/api/certificate?userId=${user.id}`, '_blank')
  }

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: '#070014' }}>
      <div className="max-w-xl mx-auto space-y-6">

        <div className="flex items-center gap-3 mb-2">
          <Link href="/dashboard" className="text-white opacity-40 hover:opacity-70 text-sm">
            ← Retour au dashboard
          </Link>
        </div>

        <div className="rounded-2xl p-6 border"
          style={{
            borderColor: 'rgba(167,139,250,0.25)',
            background: 'linear-gradient(135deg, rgba(244,114,182,0.14), rgba(167,139,250,0.10), rgba(103,232,249,0.08))',
          }}>
          <div className="flex items-start gap-4 flex-wrap">
            <div className="relative flex items-center justify-center flex-shrink-0"
              style={{ width: '68px', height: '68px' }}>
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #F472B6, #A78BFA, #67E8F9)',
                  opacity: 0.35,
                  filter: 'blur(10px)',
                }} />
              <div className="relative flex items-center justify-center rounded-full"
                style={{
                  width: '68px',
                  height: '68px',
                  background: 'rgba(7,0,20,0.55)',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                }}>
                <span style={{ ...neonText, fontSize: '42px', fontWeight: 700, lineHeight: 1 }}>
                  {initiale}
                </span>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-white font-semibold text-lg truncate">
                {nomComplet || 'Bienvenue'}
              </div>
              <div className="text-white/45 text-sm whitespace-normal break-words leading-snug">
                {getAppareilLabel(profile?.appareil_prefere)}
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${
                profile?.is_paid
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-white/10 text-white/40'
              }`}>
                {profile?.is_paid ? 'Accès complet' : 'Session découverte'}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6 border" style={{ borderColor: 'rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.04)' }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70 text-sm font-medium">Progression globale</span>
            <span className="text-white font-bold">{progressPct}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #F472B6, #A78BFA, #67E8F9)',
                boxShadow: '0 0 14px rgba(167,139,250,0.6)',
              }} />
          </div>
          <div className="mt-3 text-white/45 text-xs">
            {completedIds.length} session{completedIds.length > 1 ? 's' : ''} terminée{completedIds.length > 1 ? 's' : ''} sur {totalSessions}
          </div>
        </div>

        <div className="rounded-2xl p-6 border"
          style={{
            borderColor: 'rgba(167,139,250,0.20)',
            background: 'linear-gradient(160deg, rgba(167,139,250,0.08), rgba(103,232,249,0.05))',
          }}>
          <div className="text-center mb-5">
            <h3 className="text-xl font-bold mb-1" style={titleGradient}>
              Tes badges LISA
            </h3>
            <p className="text-white/45 text-xs">
              Débloque les 4 semaines pour reformer le logo complet.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {BADGES.map(badge => {
              const unlocked = badgeUnlocked(badge)
              const done = badge.sessions.filter(id => completedIds.includes(id)).length
              const badgePct = Math.round((done / badge.sessions.length) * 100)
              return (
                <div key={badge.label}
                  className="rounded-xl p-3 border transition-all flex flex-col items-center"
                  style={{
                    borderColor: unlocked ? 'rgba(167,139,250,0.55)' : 'rgba(255,255,255,0.08)',
                    background: unlocked
                      ? 'linear-gradient(145deg, rgba(244,114,182,0.16), rgba(103,232,249,0.12))'
                      : 'rgba(255,255,255,0.02)',
                    boxShadow: unlocked ? '0 0 16px rgba(167,139,250,0.25)' : 'none',
                  }}>
                  <div className="relative w-full flex items-center justify-center"
                    style={{ height: '56px', filter: unlocked ? 'none' : 'grayscale(1) brightness(0.4) opacity(0.35)' }}>
                    <Image
                      src={badge.image}
                      alt={`Lettre ${badge.lettre} du logo LISA`}
                      width={90}
                      height={56}
                      style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
                    />
                  </div>
                  <div className="text-white/55 text-[10px] mt-2 text-center leading-tight">
                    {badge.label}
                  </div>
                  <div className="text-white/35 text-[10px] mt-0.5 mb-2">
                    {done}/{badge.sessions.length}
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div className="h-1.5 rounded-full transition-all duration-700"
                      style={{
                        width: `${badgePct}%`,
                        background: 'linear-gradient(90deg, #F472B6, #A78BFA, #67E8F9)',
                      }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-5 rounded-xl p-4 border flex items-center gap-3"
            style={{ borderColor: 'rgba(167,139,250,0.20)', background: 'rgba(255,255,255,0.03)' }}>
            <div className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{ width: '38px', height: '38px', border: '1.5px solid rgba(167,139,250,0.4)' }}>
              <span style={{ ...neonText, fontSize: '18px' }}>✦</span>
            </div>
            <p className="text-white/50 text-xs leading-snug flex-1">
              Complète chaque semaine pour faire apparaître une lettre et reformer le logo LISA.
            </p>
            <span style={{ ...neonText, fontSize: '22px', fontWeight: 700 }} className="flex-shrink-0">
              LisA
            </span>
          </div>
        </div>

        {profile?.is_paid && (
          <div className="rounded-2xl p-6 border"
            style={{
              borderColor: hasS30 ? 'rgba(252,211,77,0.5)' : 'rgba(255,255,255,0.08)',
              background: hasS30 ? 'rgba(252,211,77,0.06)' : 'rgba(255,255,255,0.02)',
            }}>
            <div className="text-white/70 text-sm font-medium mb-2">Certificat de formation</div>
            {hasS30 ? (
              <>
                <p className="text-white/50 text-xs mb-4">
                  Félicitations ! Tu as terminé toutes les sessions. Télécharge ton certificat.
                </p>
                <button onClick={downloadCertificat}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #FCD34D, #F472B6)', color: '#070014' }}>
                  ⬇ Télécharger mon certificat
                </button>
              </>
            ) : (
              <p className="text-white/30 text-xs">
                Disponible à la fin de la session 30 — encore {30 - completedIds.length} session{30 - completedIds.length > 1 ? 's' : ''} à terminer.
              </p>
            )}
          </div>
        )}

        {/* Ressources */}
        <RessourcesSection />

        <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="text-white/70 text-sm font-medium mb-2">Communauté LISA</div>
          <p className="text-white/40 text-xs mb-4">
            Rejoins le groupe privé pour échanger avec les autres apprenants.
          </p>
          <div className="flex flex-col gap-2">
            <a href="https://www.facebook.com/share/1YPN2oMHJj/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(244,114,182,0.15)', color: '#F472B6', border: '1px solid rgba(244,114,182,0.3)' }}>
              👥 Rejoindre la communauté Facebook
            </a>
            <a href="https://www.instagram.com/je_suis_lisa_off?igsh=eG10d28wY2lqY2Zv"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(167,139,250,0.15)', color: '#A78BFA', border: '1px solid rgba(167,139,250,0.3)' }}>
              📸 Suivre sur Instagram
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
