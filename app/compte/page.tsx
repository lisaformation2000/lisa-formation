'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const BADGES = [
  { label: 'Semaine 1', sessions: Array.from({length: 7}, (_, i) => i + 1), color: '#F472B6' },
  { label: 'Semaine 2', sessions: Array.from({length: 7}, (_, i) => i + 8), color: '#A78BFA' },
  { label: 'Semaine 3', sessions: Array.from({length: 7}, (_, i) => i + 15), color: '#67E8F9' },
  { label: 'Semaine 4', sessions: Array.from({length: 9}, (_, i) => i + 22), color: '#FCD34D' },
]

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

      setCompletedIds((prog || []).map((p: any) => p.session_id))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{background:'#070014'}}>
      <div className="text-white opacity-60 text-sm">Chargement...</div>
    </div>
  )

  const totalSessions = 30
  const progressPct = Math.round((completedIds.length / totalSessions) * 100)
  const hasS30 = completedIds.includes(30)

  function badgeUnlocked(badge: typeof BADGES[0]) {
    return badge.sessions.every(id => completedIds.includes(id))
  }

  async function downloadCertificat() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    window.open(`/api/certificat?userId=${user.id}`, '_blank')
  }

  return (
    <div className="min-h-screen px-4 py-10" style={{background:'#070014'}}>
      <div className="max-w-xl mx-auto space-y-6">

        {/* En-tête */}
        <div className="flex items-center gap-3 mb-2">
          <Link href="/dashboard" className="text-white opacity-40 hover:opacity-70 text-sm">
            ← Retour
          </Link>
        </div>

        {/* Profil */}
        <div className="rounded-2xl p-6 border border-white/10" style={{background:'rgba(255,255,255,0.04)'}}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
              style={{background: 'linear-gradient(135deg, #F472B6, #A78BFA)'}}>
              {(profile?.first_name?.[0] || '?').toUpperCase()}
            </div>
            <div>
              <div className="text-white font-semibold text-lg">
                {profile?.first_name} {profile?.last_name}
              </div>
              <div className="text-white/40 text-sm">
                {profile?.appareil_prefere || 'Appareil non défini'}
              </div>
            </div>
            <div className="ml-auto">
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
        <div className="rounded-2xl p-6 border border-white/10" style={{background:'rgba(255,255,255,0.04)'}}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70 text-sm font-medium">Progression globale</span>
            <span className="text-white font-bold">{progressPct}%</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{background:'rgba(255,255,255,0.08)'}}>
            <div className="h-2 rounded-full transition-all duration-700"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #F472B6, #A78BFA, #67E8F9)'
              }}/>
          </div>
          <div className="mt-3 text-white/40 text-xs">
            {completedIds.length} session{completedIds.length > 1 ? 's' : ''} terminée{completedIds.length > 1 ? 's' : ''} sur {totalSessions}
          </div>
        </div>

        {/* Badges */}
        <div className="rounded-2xl p-6 border border-white/10" style={{background:'rgba(255,255,255,0.04)'}}>
          <div className="text-white/70 text-sm font-medium mb-4">Badges de progression</div>
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map(badge => {
              const unlocked = badgeUnlocked(badge)
              const done = badge.sessions.filter(id => completedIds.includes(id)).length
              return (
                <div key={badge.label}
                  className="rounded-xl p-4 border transition-all"
                  style={{
                    borderColor: unlocked ? badge.color : 'rgba(255,255,255,0.08)',
                    background: unlocked ? `${badge.color}15` : 'rgba(255,255,255,0.02)',
                  }}>
                  <div className="text-2xl mb-1">{unlocked ? '✦' : '○'}</div>
                  <div className="text-white text-sm font-semibold">{badge.label}</div>
                  <div className="text-white/40 text-xs mt-1">
                    {done}/{badge.sessions.length} sessions
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
              borderColor: hasS30 ? '#FCD34D' : 'rgba(255,255,255,0.08)',
              background: hasS30 ? 'rgba(252,211,77,0.06)' : 'rgba(255,255,255,0.02)'
            }}>
            <div className="text-white/70 text-sm font-medium mb-2">Certificat de formation</div>
            {hasS30 ? (
              <>
                <p className="text-white/50 text-xs mb-4">
                  Félicitations ! Tu as terminé toutes les sessions. Télécharge ton certificat.
                </p>
                <button onClick={downloadCertificat}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{background: 'linear-gradient(135deg, #FCD34D, #F472B6)', color: '#070014'}}>
                  ⬇ Télécharger mon certificat
                </button>
              </>
            ) : (
              <p className="text-white/30 text-xs">
                Disponible à la fin de la session 30 — encore {30 - completedIds.filter(id => id >= 1 && id <= 30).length} session{30 - completedIds.filter(id => id >= 1 && id <= 30).length > 1 ? 's' : ''} à terminer.
              </p>
            )}
          </div>
        )}

        {/* Ressources */}
        <div className="rounded-2xl p-6 border border-white/10" style={{background:'rgba(255,255,255,0.04)'}}>
          <div className="text-white/70 text-sm font-medium mb-2">Ressources & Guides</div>
          <p className="text-white/30 text-xs">
            Tes guides PDF seront disponibles ici prochainement.
          </p>
        </div>

        {/* Communauté */}
        <div className="rounded-2xl p-6 border border-white/10" style={{background:'rgba(255,255,255,0.04)'}}>
          <div className="text-white/70 text-sm font-medium mb-2">Communauté LISA</div>
          <p className="text-white/40 text-xs mb-4">
            Rejoins le groupe privé pour échanger avec les autres apprenants.
          </p>
          <div className="flex flex-col gap-2">
            <a href="https://www.facebook.com/share/1YPN2oMHJj/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{background:'rgba(244,114,182,0.15)', color:'#F472B6', border:'1px solid rgba(244,114,182,0.3)'}}>
              👥 Rejoindre la communauté Facebook
            </a>
            <a href="https://www.instagram.com/je_suis_lisa_off?igsh=eG10d28wY2lqY2Zv"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{background:'rgba(167,139,250,0.15)', color:'#A78BFA', border:'1px solid rgba(167,139,250,0.3)'}}>
              📸 Suivre sur Instagram
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}