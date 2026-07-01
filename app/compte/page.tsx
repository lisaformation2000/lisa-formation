'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://cejaflvoowyytkuqvwdz.supabase.co'

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlamFmbHZvb3d5eXRrdXF2d2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MjkyNDcsImV4cCI6MjA5NTUwNTI0N30.T2M46dGoj39SpYnJqcl_uGc7xlJYPK72jos8Beb9blU'

const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const BADGES = [
  { lettre: 'L', label: 'Semaine 1', sessions: Array.from({ length: 7 }, (_, i) => i + 1) },
  { lettre: 'I', label: 'Semaine 2', sessions: Array.from({ length: 7 }, (_, i) => i + 8) },
  { lettre: 'S', label: 'Semaine 3', sessions: Array.from({ length: 7 }, (_, i) => i + 15) },
  { lettre: 'A', label: 'Semaine 4', sessions: Array.from({ length: 9 }, (_, i) => i + 22) },
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

export default function ComptePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [email, setEmail] = useState<string>('')
  const [completedIds, setCompletedIds] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      setEmail(user.email || '')

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

  // Nom affiché : prénom si dispo, sinon on n'affiche pas le début du mail
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

        {/* En-tête */}
        <div className="flex items-center gap-3 mb-2">
          <Link href="/dashboard" className="text-white opacity-40 hover:opacity-70 text-sm">
            ← Retour au dashboard
          </Link>
        </div>

        {/* Profil */}
        <div className="rounded-2xl p-6 border border-white/10"
          style={{ background: 'linear-gradient(135deg, rgba(244,114,182,0.08), rgba(167,139,250,0.06), rgba(103,232,249,0.05))' }}>
          <div className="flex items-center gap-4">
            {/* Initiale stylée façon logo LISA */}
            <div className="relative flex items-center justify-center flex-shrink-0"
              style={{ width: '64px', height: '64px' }}>
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #F472B6, #A78BFA, #67E8F9)',
                  opacity: 0.25,
                  filter: 'blur(8px)',
                }} />
              <div className="relative flex items-center justify-center rounded-full"
                style={{
                  width: '64px',
                  height: '64px',
                  background: 'rgba(7,0,20,0.6)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                }}>
                <span style={{
                  fontSize: '30px',
                  fontWeight: 800,
                  fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                  background: 'linear-gradient(135deg, #F472B6, #A78BFA, #67E8F9)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {initiale}
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <div className="text-white font-semibold text-lg truncate">
                {nomComplet || 'Bienvenue'}
              </div>
              <div className="text-white/40 text-sm truncate">
                {getAppareilLabel(profile?.appareil_prefere)}
              </div>
            </div>
            <div className="ml-auto flex-shrink-0">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                profile?.is_paid
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-white/10 text-white/40'
              }`}>
                {profile?.is_paid ? 'Accès complet' : 'Session découverte'}
              </span>
            </div>
          </div>
        </div>

        {/* Progression */}
        <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70 text-sm font-medium">Progression globale</span>
            <span className="text-white font-bold">{progressPct}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #F472B6, #A78BFA, #67E8F9)',
                boxShadow: '0 0 12px rgba(167,139,250,0.5)',
              }} />
          </div>
          <div className="mt-3 text-white/40 text-xs">
            {completedIds.length} session{completedIds.length > 1 ? 's' : ''} terminée{completedIds.length > 1 ? 's' : ''} sur {totalSessions}
          </div>
        </div>

        {/* Badges L-I-S-A */}
        <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="text-white/70 text-sm font-medium mb-1">Tes badges LISA</div>
          <div className="text-white/35 text-xs mb-4">Débloque les 4 semaines pour reformer le logo complet.</div>
          <div className="grid grid-cols-4 gap-3">
            {BADGES.map(badge => {
              const unlocked = badgeUnlocked(badge)
              const done = badge.sessions.filter(id => completedIds.includes(id)).length
              return (
                <div key={badge.label}
                  className="rounded-xl p-3 border transition-all flex flex-col items-center"
                  style={{
                    borderColor: unlocked ? 'rgba(167,139,250,0.5)' : 'rgba(255,255,255,0.08)',
                    background: unlocked
                      ? 'linear-gradient(135deg, rgba(244,114,182,0.12), rgba(103,232,249,0.10))'
                      : 'rgba(255,255,255,0.02)',
                  }}>
                  <span style={{
                    fontSize: '34px',
                    fontWeight: 800,
                    lineHeight: 1,
                    fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                    ...(unlocked
                      ? {
                          background: 'linear-gradient(135deg, #F472B6, #A78BFA, #67E8F9)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                      : { color: 'rgba(255,255,255,0.15)' }),
                  }}>
                    {badge.lettre}
                  </span>
                  <div className="text-white/50 text-[10px] mt-2 text-center leading-tight">
                    {badge.label}
                  </div>
                  <div className="text-white/30 text-[10px] mt-0.5">
                    {done}/{badge.sessions.length}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Certificat */}
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
        <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="text-white/70 text-sm font-medium mb-2">Ressources & Guides</div>
          <p className="text-white/30 text-xs">
            Tes guides PDF seront disponibles ici prochainement.
          </p>
        </div>

        {/* Communauté */}
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