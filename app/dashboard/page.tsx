"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const sessions = [
  { id: 0, titre: "Session Découverte", gratuite: true },
  { id: 1, titre: "S1 — Accéder aux outils et créer son compte" },
  { id: 2, titre: "S2 — Comprendre et maîtriser les prompts" },
  { id: 3, titre: "S3 — Claude et ChatGPT" },
  { id: 4, titre: "S4 — Ce que l'IA sait faire (et ce qu'elle rate)" },
  { id: 5, titre: "S5 — Apprendre à vérifier" },
  { id: 6, titre: "S6 — L'IA dans ta vie pro" },
  { id: 7, titre: "S7 — Bilan Semaine 1 + Perplexity" },
  { id: 8, titre: "S8 — Gagner du temps au quotidien" },
  { id: 9, titre: "S9 — Créer du contenu avec l'IA" },
  { id: 10, titre: "S10 — Organiser ses idées et ses projets" },
  { id: 11, titre: "S11 — Recherches avec Gemini et Perplexity" },
  { id: 12, titre: "S12 — Les meilleurs outils gratuits" },
  { id: 13, titre: "S13 — Cas concret — Témoignage réel" },
  { id: 14, titre: "S14 — Bilan Semaine 2 + Meta AI" },
  { id: 15, titre: "S15 — Prompts avancés" },
  { id: 16, titre: "S16 — Apprendre plus vite avec l'IA" },
  { id: 17, titre: "S17 — Construire une offre avec l'IA" },
  { id: 18, titre: "S18 — Éthique, données et IA Act" },
  { id: 19, titre: "S19 — Automatiser sans coder" },
  { id: 20, titre: "S20 — IA et accompagnement humain" },
  { id: 21, titre: "S21 — Point d'étape + Grok" },
  { id: 22, titre: "S22 — Rester à jour sans effort" },
  { id: 23, titre: "S23 — Créer ta veille IA personnelle" },
  { id: 24, titre: "S24 — L'IA et l'équilibre humain" },
  { id: 25, titre: "S25 — Ton positionnement autour de l'IA" },
  { id: 26, titre: "S26 — IA et bien-être" },
  { id: 27, titre: "S27 — Tour complet des IA et certifications" },
  { id: 28, titre: "S28 — Ton projet sur 90 jours" },
  { id: 29, titre: "S29 — Débrief complet des 28 sessions" },
  { id: 30, titre: "S30 — Bilan final, certificat et suite" },
];

const appareils = [
  { id: "windows", label: "Windows" },
  { id: "mac", label: "Mac" },
  { id: "iphone", label: "iPhone / iPad" },
  { id: "android", label: "Android" },
];

function normaliserAppareil(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string");
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed)
        ? parsed.filter((item) => typeof item === "string")
        : [];
    } catch {
      return [];
    }
  }
  return [];
}

function AppareilSelector({
  appareils,
  initial,
  onValider,
}: {
  appareils: { id: string; label: string }[];
  initial: string[];
  onValider: (s: string[]) => void;
}) {
  const [selection, setSelection] = useState<string[]>(initial);

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
        {appareils.map((a) => (
          <button
            key={a.id}
            onClick={() =>
              setSelection((prev) =>
                prev.includes(a.id) ? prev.filter((x) => x !== a.id) : [...prev, a.id]
              )
            }
            aria-pressed={selection.includes(a.id)}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              background: selection.includes(a.id)
                ? "linear-gradient(90deg, #A78BFA, #F472B6)"
                : "rgba(255,255,255,0.05)",
              border: selection.includes(a.id) ? "none" : "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            }}
          >
            {a.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => onValider(selection)}
        disabled={selection.length === 0}
        style={{
          background:
            selection.length > 0
              ? "linear-gradient(90deg, #A78BFA, #F472B6)"
              : "rgba(255,255,255,0.05)",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "12px 24px",
          fontSize: "15px",
          fontWeight: 700,
          cursor: selection.length > 0 ? "pointer" : "not-allowed",
        }}
      >
        Valider mon choix
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<any>(null);
  const [prenom, setPrenom] = useState("");
  const [hasPaid, setHasPaid] = useState(false);
  const [appareil, setAppareil] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [showAppareil, setShowAppareil] = useState(false);
  const [loading, setLoading] = useState(true);
  const [genCertificat, setGenCertificat] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session?.user) {
          router.push("/login");
          return;
        }

        const currentUser = data.session.user;
        setUser(currentUser);
        setPrenom(
          currentUser.user_metadata?.prenom || currentUser.email?.split("@")[0] || ""
        );

        const { data: profile } = await supabase
          .from("profiles")
          .select("is_paid, appareil_prefere")
          .eq("id", currentUser.id)
          .maybeSingle();

        setHasPaid(Boolean(profile?.is_paid));

        const appareilSauvegarde = normaliserAppareil(profile?.appareil_prefere);
        if (appareilSauvegarde.length > 0) {
          setAppareil(appareilSauvegarde);
        } else {
          setShowAppareil(true);
        }

        const { data: prog, error: progressError } = await supabase
          .from("session_progress")
          .select("session_id, completed")
          .eq("user_id", currentUser.id);

        if (!progressError && prog) {
          const map: Record<number, boolean> = {};
          prog.forEach((p: any) => {
            if (p.session_id !== undefined && p.session_id >= 1 && p.session_id <= 30) {
              map[p.session_id] = Boolean(p.completed);
            }
          });
          setProgress(map);
        }
      } catch (error) {
        console.error("Erreur dashboard :", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router, supabase]);

  const sauvegarderAppareil = async (selection: string[]) => {
    if (!user) return;
    setAppareil(selection);
    setShowAppareil(false);
    await supabase
      .from("profiles")
      .update({ appareil_prefere: JSON.stringify(selection) })
      .eq("id", user.id);
  };

  const sessionsTerminees = Object.values(progress).filter(Boolean).length;
  const formationTerminee = sessionsTerminees >= 30;

  const prochaineSession = sessions.find((s) => !progress[s.id]);

  const handleDeconnexion = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const telechargerCertificat = async () => {
    if (!user) return;
    setGenCertificat(true);
    try {
      window.open(`/api/certificate?userId=${user.id}`, '_blank');
    } finally {
      setGenCertificat(false);
    }
  };

  if (loading) {
    return (
      <main style={{ backgroundColor: "#070014", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>Chargement...</p>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "#070014", minHeight: "100vh", color: "#ffffff", fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ backgroundColor: "#000000", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: "12px", flexWrap: "wrap" }}>
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <img src="/logoLisa.webp" alt="LISA" style={{ height: "80px", width: "auto" }} />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <Link href="/compte" style={{ textDecoration: "none" }}>
            <span style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.75)",
              cursor: "pointer",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(167,139,250,0.3)",
              background: "rgba(167,139,250,0.08)",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}>
              Bonjour {prenom} 👋
            </span>
          </Link>
          <button
            onClick={handleDeconnexion}
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px 14px", fontSize: "13px", color: "rgba(255,255,255,0.6)", cursor: "pointer", whiteSpace: "nowrap" }}
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>

        {!hasPaid && (
          <div style={{ background: "rgba(244,114,182,0.08)", border: "1px solid rgba(244,114,182,0.25)", borderRadius: "16px", padding: "24px 28px", marginBottom: "32px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>Accès limité à la Session Découverte</p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>Débloque les 30 sessions complètes pour 147€ — paiement unique, accès à vie.</p>
            </div>
            <Link href="/inscription" style={{ textDecoration: "none" }}>
              <button style={{ background: "linear-gradient(90deg, #A78BFA, #F472B6)", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 22px", fontSize: "14px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                Débloquer — 147€
              </button>
            </Link>
          </div>
        )}

        {showAppareil && (
          <div style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: "16px", padding: "32px", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Sur quel appareil travailles-tu ?</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>Tu pourras modifier ce choix à tout moment.</p>
            <AppareilSelector appareils={appareils} initial={appareil} onValider={sauvegarderAppareil} />
          </div>
        )}

        {formationTerminee && (
          <div style={{ background: "rgba(103,232,249,0.08)", border: "1px solid rgba(103,232,249,0.25)", borderRadius: "16px", padding: "24px 28px", marginBottom: "32px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>🎉 Formation terminée — félicitations !</p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>Ton attestation de formation est prête à télécharger.</p>
            </div>
            <button
              onClick={telechargerCertificat}
              disabled={genCertificat}
              style={{ background: "linear-gradient(90deg, #67E8F9, #A78BFA)", color: "#070014", border: "none", borderRadius: "10px", padding: "12px 22px", fontSize: "14px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {genCertificat ? "Génération…" : "Télécharger mon attestation"}
            </button>
          </div>
        )}

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px", marginBottom: "32px" }}>
          <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
            Tu as terminé{" "}
            <span style={{ color: "#A78BFA" }}>{sessionsTerminees} session{sessionsTerminees > 1 ? "s" : ""}</span>{" "}
            sur 30
          </p>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "99px", height: "8px", marginBottom: "20px" }}>
            <div style={{ background: "linear-gradient(90deg, #A78BFA, #F472B6)", borderRadius: "99px", height: "8px", width: `${(sessionsTerminees / 30) * 100}%`, transition: "width 0.4s ease" }} />
          </div>
          {prochaineSession && !formationTerminee && (
            <Link href={`/session/${prochaineSession.id}`} style={{ textDecoration: "none" }}>
              <button style={{ background: "linear-gradient(90deg, #A78BFA, #F472B6)", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 28px", fontSize: "15px", fontWeight: 700, cursor: "pointer", boxShadow: "0 0 24px rgba(167,139,250,0.3)" }}>
                Reprendre — {prochaineSession.titre}
              </button>
            </Link>
          )}
        </div>

        {appareil.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Ton appareil :</span>
            {appareil.map((a) => (
              <span key={a} style={{ fontSize: "12px", background: "rgba(103,232,249,0.1)", border: "1px solid rgba(103,232,249,0.2)", color: "#67E8F9", borderRadius: "20px", padding: "4px 12px" }}>
                {appareils.find((ap) => ap.id === a)?.label}
              </span>
            ))}
            <button onClick={() => setShowAppareil(true)} style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              Modifier
            </button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {sessions.map((session, index) => {
            const isTerminee = Boolean(progress[session.id]);
            const verrouillee = !session.gratuite && !hasPaid;

            return (
              <Link key={session.id} href={verrouillee ? "/inscription" : `/session/${session.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: isTerminee ? "rgba(103,232,249,0.04)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isTerminee ? "rgba(103,232,249,0.15)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: "12px",
                  padding: "18px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  opacity: verrouillee ? 0.55 : 1,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: isTerminee ? "rgba(103,232,249,0.15)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: isTerminee ? "#67E8F9" : "rgba(255,255,255,0.3)", fontWeight: 700, flexShrink: 0 }}>
                      {isTerminee ? "✓" : verrouillee ? "🔒" : index}
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: isTerminee ? "rgba(255,255,255,0.6)" : "#ffffff" }}>
                        {session.titre}
                      </p>
                      {(session as any).gratuite && (
                        <span style={{ fontSize: "11px", color: "#FCD34D" }}>Gratuite</span>
                      )}
                    </div>
                  </div>
                  <span style={{
                    fontSize: "12px",
                    color: isTerminee ? "#67E8F9" : "rgba(255,255,255,0.25)",
                    background: isTerminee ? "rgba(103,232,249,0.08)" : "transparent",
                    border: isTerminee ? "1px solid rgba(103,232,249,0.15)" : "none",
                    borderRadius: "20px",
                    padding: isTerminee ? "3px 10px" : "0",
                    whiteSpace: "nowrap",
                  }}>
                    {verrouillee ? "147€" : isTerminee ? "Terminée" : "Commencer"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}