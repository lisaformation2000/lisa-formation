import Link from "next/link";

const semaines = [
  {
    numero: "Semaine 1",
    titre: "Découvrir les outils",
    sessions: "Sessions 1 à 7",
    couleur: "#F472B6",
    items: [
      "Créer ton compte Claude et ChatGPT",
      "Comprendre l'interface et l'historique",
      "Écrire ton premier prompt",
      "Apprendre à comparer les outils",
      "Découvrir ce que l'IA sait faire (et ce qu'elle rate)",
      "Vérifier les informations — garder ton esprit critique",
      "Bilan + découverte de Perplexity",
    ],
  },
  {
    numero: "Semaine 2",
    titre: "L'IA dans ta vie de tous les jours",
    sessions: "Sessions 8 à 14",
    couleur: "#A78BFA",
    items: [
      "Gagner du temps sur les emails",
      "Résumer des documents longs",
      "Créer du contenu pour les réseaux sociaux",
      "Organiser tes idées et tes projets",
      "Faire des recherches avec Gemini et Perplexity",
      "Tour des meilleurs outils gratuits",
      "Bilan + découverte de Meta AI",
    ],
  },
  {
    numero: "Semaine 3",
    titre: "Aller plus loin sans se perdre",
    sessions: "Sessions 15 à 21",
    couleur: "#67E8F9",
    items: [
      "Prompts avancés — les techniques qui changent tout",
      "Apprendre plus vite avec l'IA",
      "Construire une offre ou un service",
      "Éthique, données personnelles et IA Act",
      "Repérer les faux contenus générés par IA",
      "Automatiser les tâches répétitives — sans coder",
      "Bilan + découverte de Grok",
    ],
  },
  {
    numero: "Semaine 4",
    titre: "Autonomie, ancrage et certificat",
    sessions: "Sessions 22 à 30",
    couleur: "#FCD34D",
    items: [
      "Rester à jour sans effort",
      "Créer ta veille IA personnelle",
      "Trouver l'équilibre — ne pas se perdre dans l'IA",
      "Construire ton positionnement autour de l'IA",
      "Tour complet des IA et certifications officielles",
      "Ton plan d'action sur 90 jours",
      "Bilan final + certificat de formation",
    ],
  },
];

const outils = [
  { nom: "Claude", usage: "Rédaction & analyse en français" },
  { nom: "ChatGPT", usage: "Polyvalent & créatif" },
  { nom: "Perplexity", usage: "Recherche avec sources citées" },
  { nom: "Gemini", usage: "Connecté à l'actualité en temps réel" },
  { nom: "Meta AI", usage: "Questions rapides sur Facebook & Instagram" },
  { nom: "Make.com", usage: "Automatisation sans code" },
  { nom: "Grok", usage: "Actualités en temps réel sur X" },
  { nom: "NotebookLM", usage: "Analyse de documents PDF" },
];

export default function ProgrammePage() {
  return (
    <main
      style={{
        backgroundColor: "#070014",
        minHeight: "100vh",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <nav
        style={{
          padding: "18px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "#000000",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <img
            src="/logoLisa.webp"
            alt="LISA - La formation pour débuter avec l'IA"
            style={{
              height: "250px",
              width: "auto",
              display: "block",
            }}
          />
        </Link>

        <Link href="/inscription" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "linear-gradient(90deg, #A78BFA, #F472B6)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Commencer — 147€
          </button>
        </Link>
      </nav>

      <section
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "64px 24px 48px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#A78BFA",
            marginBottom: "16px",
          }}
        >
          Le programme complet
        </p>

        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          Tout ce que tu vas apprendre{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #F472B6, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            en 30 sessions
          </span>
        </h1>

        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.7)",
            maxWidth: "580px",
            margin: "0 auto 40px",
          }}
        >
          LISA est une formation pour débutants complets. Zéro prérequis. Zéro
          jargon. Tu avances à ton rythme, depuis ton téléphone ou ton
          ordinateur. À la fin, tu utilises l'IA concrètement dans ta vie
          quotidienne.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          {[
            { val: "30", label: "sessions" },
            { val: "~45h", label: "de formation" },
            { val: "À vie", label: "accès illimité" },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  background: "linear-gradient(90deg, #F472B6, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.val}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: "4px",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          margin: "0 24px",
        }}
      />

      <section
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            background: "rgba(252, 211, 77, 0.06)",
            border: "1px solid rgba(252, 211, 77, 0.2)",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                background: "rgba(252, 211, 77, 0.15)",
                color: "#FCD34D",
                fontSize: "12px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "20px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Gratuite
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
              ~ 30 minutes
            </span>
          </div>

          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>
            Session Découverte
          </h2>

          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
            Une session indépendante et complète. Tu découvres ce qu'est
            vraiment l'IA, tu accèdes aux premiers outils, et tu poses ta toute
            première question à une IA. Sans compte requis.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {semaines.map((semaine) => (
            <div
              key={semaine.numero}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeft: `3px solid ${semaine.couleur}`,
                borderRadius: "16px",
                padding: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: semaine.couleur,
                      marginBottom: "6px",
                    }}
                  >
                    {semaine.numero}
                  </p>
                  <h3 style={{ fontSize: "19px", fontWeight: 700 }}>
                    {semaine.titre}
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    padding: "4px 10px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {semaine.sessions}
                </span>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {semaine.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: semaine.couleur, marginTop: "2px", flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "56px 24px",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#67E8F9",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            Inclus dans la formation
          </p>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "36px",
            }}
          >
            Les outils que tu vas découvrir
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {outils.map((outil) => (
              <div
                key={outil.nom}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <span style={{ fontWeight: 700, fontSize: "15px" }}>{outil.nom}</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{outil.usage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          Cette formation est faite pour toi si…
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            "Tu entends parler de l'IA partout mais tu ne sais pas par où commencer",
            "Tu n'as aucune compétence technique — et tu ne veux pas en avoir besoin",
            "Tu veux utiliser l'IA concrètement dans ta vie pro ou personnelle",
            "Tu veux avancer à ton rythme, depuis ton téléphone ou ton ordinateur",
            "Tu veux garder ton esprit critique — sans te laisser dépasser",
          ].map((phrase) => (
            <div
              key={phrase}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                fontSize: "15px",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  background: "linear-gradient(90deg, #F472B6, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                →
              </span>
              {phrase}
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          textAlign: "center",
          padding: "64px 24px 80px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(22px, 4vw, 34px)",
            fontWeight: 800,
            marginBottom: "16px",
            lineHeight: 1.3,
          }}
        >
          Prête à commencer ?
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "36px",
          }}
        >
          Paiement unique — Accès à vie — Aucun abonnement
        </p>
        <Link href="/inscription" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "linear-gradient(90deg, #A78BFA, #F472B6)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "18px 48px",
              fontSize: "17px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 32px rgba(167, 139, 250, 0.35)",
            }}
          >
            Commencer pour 147€
          </button>
        </Link>
        <p style={{ marginTop: "16px", fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
          <Link
            href="/"
            style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline" }}
          >
            Retour à l'accueil
          </Link>
        </p>
      </section>
    </main>
  );
}