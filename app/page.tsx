export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
        <img
          src="/logo-lisa.png"
          alt="LISA"
          className="w-full max-w-[1200px] h-auto"
        />

        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <a
            href="/programme"
            className="rounded-2xl border border-purple-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-purple-900"
          >
            Découvrir le programme
          </a>

          <a
            href="/inscription"
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-lg font-bold text-white transition hover:scale-105"
          >
            Commencer pour 147€
          </a>
        </div>
      </div>
    </main>
  );
}