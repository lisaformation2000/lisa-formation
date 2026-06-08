export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans">

      {/* HERO */}
      <section className="bg-violet-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Apprends à utiliser l'IA en 30 sessions
        </h1>

        <p className="text-xl mb-2">
          Simple. Concret. Sans jargon.
        </p>

        <p className="text-lg mb-8 opacity-90">
          Tu n'as pas besoin d'être expert.
          Tu as juste besoin de commencer.
        </p>

        <a
          href="/inscription"
          className="bg-white text-violet-700 font-bold py-4 px-8 rounded-full text-lg hover:bg-violet-50 transition"
        >
          Commencer pour 147€
        </a>

        <p className="mt-4 text-sm opacity-80">
          Paiement unique — Accès à vie
        </p>
      </section>

      {/* CONTENU */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-white">
        <h2 className="text-3xl font-bold mb-6">
          La formation pour débuter avec l'IA
        </h2>

        <p className="text-lg mb-4">
          LISA est une formation pensée pour les débutants complets.
        </p>

        <p className="text-lg mb-4">
          Tu avances à ton rythme grâce à 30 sessions simples,
          concrètes et accessibles.
        </p>

        <p className="text-lg">
          Aucun jargon. Aucun prérequis technique.
          Juste des explications claires et des exercices pratiques.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-violet-800 text-white py-8 px-6 text-center">
        <p className="font-bold">LISA</p>
        <p className="mt-2">© 2026 – formationlisa.fr</p>
      </footer>

    </main>
  );
}