import Link from "next/link";

export default function InscriptionPage() {
  return (
    <main
      style={{
        backgroundColor: "#070014",
        minHeight: "100vh",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 24px 80px",
      }}
    >
      {/* Bandeau noir avec logo */}
      <div
        style={{
          backgroundColor: "#000000",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "16px 0",
          marginBottom: "40px",
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
      </div>

      {/* Carte centrale */}
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Titre */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              marginBottom: "8px",
            }}
          >
            Rejoins la formation LISA
          </h1>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 800,
              background: "linear-gradient(90deg, #F472B6, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            147€
          </div>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", marginTop: "4px" }}>
            Paiement unique — Accès à vie
          </p>
        </div>

        {/* Ce qui est inclus */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {[
            "30 sessions",
            "Exercices pratiques",
            "PDF téléchargeables",
            "Attestation de formation",
            "Mises à jour incluses",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "15px",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              <span style={{ color: "#67E8F9" }}>✅</span>
              {item}
            </div>
          ))}
        </div>

        {/* Séparateur */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

        {/* Formulaire */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input
            type="text"
            placeholder="Prénom"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "14px 16px",
              fontSize: "15px",
              color: "#ffffff",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            placeholder="Nom"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "14px 16px",
              fontSize: "15px",
              color: "#ffffff",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "14px 16px",
              fontSize: "15px",
              color: "#ffffff",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "14px 16px",
              fontSize: "15px",
              color: "#ffffff",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Bouton */}
        <button
          style={{
            background: "linear-gradient(90deg, #A78BFA, #F472B6)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "18px",
            fontSize: "17px",
            fontWeight: 700,
            cursor: "pointer",
            width: "100%",
            boxShadow: "0 0 32px rgba(167, 139, 250, 0.35)",
          }}
        >
          Je rejoins la formation — 147€
        </button>

        {/* Retour au programme */}
        <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
          <Link
            href="/programme"
            style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline" }}
          >
            Retour au programme
          </Link>
        </p>

        {/* Déjà inscrit */}
        <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.3)", marginTop: "-12px" }}>
          Déjà inscrit ?{" "}
          <Link
            href="/login"
            style={{ color: "#A78BFA", textDecoration: "underline", fontWeight: 600 }}
          >
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}