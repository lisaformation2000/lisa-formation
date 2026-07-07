'use client'

interface Ressource {
  titre: string
  description: string
  fichier: string
}

const ressources: Ressource[] = [
  {
    titre: "Checklist de démarrage",
    description: "Coche chaque étape à ton rythme, sans pression",
    fichier: "LISA-Checklist-VS.pdf",
  },
  {
    titre: "Glossaire",
    description: "40 termes essentiels, expliqués simplement",
    fichier: "LISA-Glossaire-VS.pdf",
  },
  {
    titre: "Liste de prompts par thème",
    description: "34 prompts prêts à copier, classés par situation",
    fichier: "LISA-Prompts-VS.pdf",
  },
  {
    titre: "Comparatif des IA",
    description: "Claude, ChatGPT, Perplexity, Gemini, Meta AI, Grok",
    fichier: "LISA-Comparatif-VS.pdf",
  },
  {
    titre: "Guide IA par métier",
    description: "Des cas d'usage concrets, au travail et au quotidien",
    fichier: "LISA-Guide-Metier-VS.pdf",
  },
  {
    titre: "Mon plan 90 jours",
    description: "Un carnet à remplir pour construire la suite",
    fichier: "LISA-Workbook-90-jours-VS.pdf",
  },
]

export default function RessourcesSection() {
  return (
    <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <div className="text-white/70 text-sm font-medium mb-1">Ressources & Guides</div>
      <p className="text-white/40 text-xs mb-4">
        Tes 6 guides PDF téléchargeables, inclus dans ta formation.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {ressources.map((r) => (
          
            key={r.fichier}
            href={`/ressources/${r.fichier}`}
            download
            className="rounded-xl border p-3 flex flex-col gap-1 transition-all hover:opacity-80"
            style={{ borderColor: 'rgba(167,139,250,0.25)', background: 'rgba(167,139,250,0.06)' }}
          >
            <span className="text-white text-sm font-medium">{r.titre}</span>
            <span className="text-white/40 text-xs">{r.description}</span>
            <span className="text-[#A78BFA] text-xs mt-1">⬇ Télécharger le PDF</span>
          </a>
        ))}
      </div>
    </div>
  )
}
