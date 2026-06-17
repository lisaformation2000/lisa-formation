'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Barre de navigation */}
      <div className="w-full flex justify-end px-6 py-4">
        <Link
          href="/login"
          className="text-sm font-bold text-white rounded-full px-4 py-2 transition bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 hover:scale-105"
        >
          Déjà membre ? Se connecter
        </Link>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center px-4 pt-2 pb-6">
        <img
          src="/logo-lisa.png"
          alt="LISA"
          className="w-full max-w-[800px] h-auto"
        />
        <div className="flex gap-2 mt-2">
          <span className="w-2 h-2 rounded-full bg-pink-400 inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
        </div>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center text-center px-6 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Apprends à utiliser<br />
          l'IA en{' '}
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            30 sessions
          </span>
        </h1>

        <p className="text-lg mb-2">
          <span className="text-pink-400 font-semibold">Simple.</span>{' '}
          <span className="text-green-400 font-semibold">Concret.</span>{' '}
          <span className="text-yellow-400 font-semibold">Sans</span>{' '}
          <span className="text-cyan-400 font-semibold">jargon.</span>
        </p>

        <p className="text-gray-300 mb-8">
          Tu n'as pas besoin d'être expert.<br />
          Tu as juste besoin de commencer.
        </p>

        <Link
          href="/inscription"
          className="rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 px-10 py-4 text-lg font-bold text-white transition hover:scale-105 mb-3 shadow-lg shadow-pink-500/30"
        >
          Commencer pour 147€
        </Link>
        <p className="text-sm text-gray-400">Paiement unique — Accès à vie</p>
      </div>

      {/* Ce que tu vas maîtriser */}
      <div className="flex flex-col items-center px-6 pb-16">
        <h2 className="text-2xl font-bold mb-8">Ce que tu vas maîtriser</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">

          <div className="bg-gray-900 rounded-2xl p-6 flex flex-col items-center text-center border border-gray-800">
            <div className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F472B6, #fb923c)' }}>
              <span className="text-3xl">🛠️</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-pink-400">Les outils</h3>
            <p className="text-gray-400 text-sm">Les meilleurs outils IA et comment les utiliser efficacement.</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 flex flex-col items-center text-center border border-gray-800">
            <div className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FCD34D, #fb923c)' }}>
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-yellow-400">Gagner du temps</h3>
            <p className="text-gray-400 text-sm">Automatiser les tâches répétitives et booster ta productivité.</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 flex flex-col items-center text-center border border-gray-800">
            <div className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}>
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-purple-400">L'esprit critique</h3>
            <p className="text-gray-400 text-sm">Comprendre, analyser et utiliser l'IA de manière intelligente.</p>
          </div>

        </div>

        {/* Petits points séparateur */}
        <div className="flex gap-2 mt-10">
          <span className="w-2 h-2 rounded-full bg-pink-400 inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-600 text-xs pb-8 px-6">
        <p>© 2026 LISA — La formation pour débuter avec l'IA</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/cgv" className="hover:text-gray-400">CGV</Link>
          <Link href="/mentions-legales" className="hover:text-gray-400">Mentions légales</Link>
          <Link href="/confidentialite" className="hover:text-gray-400">Confidentialité</Link>
        </div>
      </div>

    </main>
  );
}