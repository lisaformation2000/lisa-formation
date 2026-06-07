export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* HERO */}
      <section className="bg-violet-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Apprends à utiliser l'IA en 30 sessions
        </h1>
        <p className="text-xl mb-2">Simple. Concret. Sans jargon.</p>
        <p className="text-lg mb-8 opacity-90">
          Tu n'as pas besoin d'être expert. Tu as juste besoin de commencer.
        </p>
        <a href="/inscription" className="bg-white text-violet-700 font-bold py-4 px-8 rounded-full text-lg hover:bg-violet-50 transition">
          Commencer pour 147€
        </a>
        <p className="mt-4 text-sm opacity-80">Paiement unique — Accès à vie</p>
      </section>

      {/* PROMESSE */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-violet-700 mb-6">
          Ce que tu vas maîtriser
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-violet-50">
            <div className="text-4xl mb-3">🛠️</div>
            <h3 className="font-bold text-lg mb-2">Les outils</h3>
            <p className="text-gray-600">Claude, ChatGPT, Gemini, Perplexity — tu sauras lequel utiliser et quand.</p>
          </div>
          <div className="p-6 rounded-2xl bg-violet-50">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-2">Gagner du temps</h3>
            <p className="text-gray-600">Emails, résumés, organisation — l'IA devient ton assistant au quotidien.</p>
          </div>
          <div className="p-6 rounded-2xl bg-violet-50">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="font-bold text-lg mb-2">L'esprit critique</h3>
            <p className="text-gray-600">Tu sais ce que l'IA rate, comment vérifier, et rester maître de tes décisions.</p>
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-violet-700 mb-10 text-center">Le programme — 4 semaines</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-violet-600 font-bold mb-1">Semaine 1</div>
              <h3 className="font-bold text-lg mb-2">Découvrir les outils</h3>
              <p className="text-gray-600">Créer ses comptes, comprendre les prompts, esprit critique — Sessions 1 à 7</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-violet-600 font-bold mb-1">Semaine 2</div>
              <h3 className="font-bold text-lg mb-2">L'IA dans ta vie de tous les jours</h3>
              <p className="text-gray-600">Emails, contenu, organisation, recherche — Sessions 8 à 14</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-violet-600 font-bold mb-1">Semaine 3</div>
              <h3 className="font-bold text-lg mb-2">Aller plus loin</h3>
              <p className="text-gray-600">Prompts avancés, éthique, IA Act, automatisation — Sessions 15 à 21</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-violet-600 font-bold mb-1">Semaine 4</div>
              <h3 className="font-bold text-lg mb-2">Autonomie complète</h3>
              <p className="text-gray-600">Veille, positionnement, certifications, plan 90 jours — Sessions 22 à 30</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-md mx-auto bg-violet-700 text-white rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-2">147€</h2>
          <p className="text-lg mb-6 opacity-90">Paiement unique — Accès à vie</p>
          <ul className="text-left space-y-3 mb-8">
            <li>✅ Session découverte gratuite</li>
            <li>✅ 30 sessions complètes</li>
            <li>✅ Exercices pratiques</li>
            <li>✅ Attestation de formation</li>
            <li>✅ Mises à jour incluses</li>
          </ul>
          <a href="/inscription" className="bg-white text-violet-700 font-bold py-4 px-8 rounded-full text-lg hover:bg-violet-50 transition block text-center">
            Je commence maintenant
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>LISA — La formation pour débuter avec l'IA</p>
        <p className="mt-1">© 2026 — formationlisa.fr</p>
      </footer>

    </main>
  );
}