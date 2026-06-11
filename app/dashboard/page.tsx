"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

const sessions = [
  { id: "decouverte", titre: "Session Découverte", gratuite: true },
  { id: "s1", titre: "S1 — Accéder aux outils et créer son compte" },
  { id: "s2", titre: "S2 — Comprendre et maîtriser les prompts" },
  { id: "s3", titre: "S3 — Claude et ChatGPT" },
  { id: "s4", titre: "S4 — Ce que l'IA sait faire (et ce qu'elle rate)" },
  { id: "s5", titre: "S5 — Apprendre à vérifier" },
  { id: "s6", titre: "S6 — L'IA dans ta vie pro" },
  { id: "s7", titre: "S7 — Bilan Semaine 1 + Perplexity" },
  { id: "s8", titre: "S8 — Gagner du temps au quotidien" },
  { id: "s9", titre: "S9 — Créer du contenu avec l'IA" },
  { id: "s10", titre: "S10 — Organiser ses idées et ses projets" },
  { id: "s11", titre: "S11 — Recherches avec Gemini et Perplexity" },
  { id: "s12", titre: "S12 — Les meilleurs outils gratuits" },
  { id: "s13", titre: "S13 — Cas concret — Témoignage réel" },
  { id: "s14", titre: "S14 — Bilan Semaine 2 + Meta AI" },
  { id: "s15", titre: "S15 — Prompts avancés" },
  { id: "s16", titre: "S16 — Apprendre plus vite avec l'IA" },
  { id: "s17", titre: "S17 — Construire une offre avec l'IA" },
  { id: "s18", titre: "S18 — Éthique, données et IA Act" },
  { id: "s19", titre: "S19 — Automatiser sans coder" },
  { id: "s20", titre: "S20 — IA et accompagnement humain" },
  { id: "s21", titre: "S21 — Point d'étape + Grok" },
  { id: "s22", titre: "S22 — Rester à jour sans effort" },
  { id: "s23", titre: "S23 — Créer ta veille IA personnelle" },
  { id: "s24", titre: "S24 — L'IA et l'équilibre humain" },
  { id: "s25", titre: "S25 — Ton positionnement autour de l'IA" },
  { id: "s26", titre: "S26 — IA et bien-être" },
  { id: "s27", titre: "S27 — Tour complet des IA et certifications" },
  { id: "s28", titre: "S28 — Ton projet sur 90 jours" },
  { id: "s29", titre: "S29 — Débrief complet des 28 sessions" },
  { id: "s30", titre: "S30 — Bilan final, certificat et suite" },
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
  onValider,
}: {
  appareils: { id: string; label: string }[];
  onValider: (s: string[]) => void;
}) {
  const [selection, setSelection] = useState<string[]>([]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {appareils.map((a) => (
          <button
            key={a.id}
            onClick={() =>
              setSelection((prev) =>
                prev.includes(a.id)
                  ? prev.filter((x) => x !== a.id)
                  : [...prev, a.id]
              )
            }
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              background: selection.includes(a.id)
                ? "linear-gradient(90deg, #A78BFA, #F472B6)"
                : "rgba(255,255,255,0.05)",
              border: selection.includes(a.id)
                ? "none"
                : "1px solid rgba(255,255,255,0.1)",
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

  const supabase = useMemo(
    () =>
      createBrowserClient(
        "https://cejaflvoowyytkuqvwdz.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlamFmbHZvb3d5eXRrdXF2d2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MjkyNDcsImV4cCI6MjA5NTUwNTI0N30.T2M46dGoj39SpYnJqcl_uGc7xlJYPK72jos8Beb9blU"
      ),
    []
  );

  const [user, setUser] = useState<any>(null);
  const [prenom, setPrenom] = useState("");
  const [appareil, setAppareil] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, string>>({});
  const [showAppareil, setShowAppareil] = useState(false);
  const [loading, setLoading] = useState(true);

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
          currentUser.user_metadata?.prenom ||
            currentUser.email?.split("@")[0] ||
            ""
        );

        const { data: profile, error: profileError } = await supabase
          .from("user_profile")
          .select("appareil_prefere")
          .eq("user_id", currentUser.id)
          .maybeSingle();

        if (!profileError && profile?.appareil_prefere) {
          const appareilSauvegarde = normaliserAppareil(profile.appareil_prefere);

          if (appareilSauvegarde.length > 0) {
            setAppareil(appareilSauvegarde);
          } else {
            setShowAppareil(true);
          }
        } else {
          setShowAppareil(true);
        }

        const { data: prog, error: progressError } = await supabase
          .from("user_progress")
          .select("session_id, statut")
          .eq("user_id", currentUser.id);

        if (!progressError && prog) {
          const map: Record<string, string> = {};

          prog.forEach((p: any) => {
            if (p.session_id && p.statut) {
              map[p.session_id] = p.statut;
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

    const { error } = await supabase.from("user_profile").upsert(
      {
        user_id: user.id,
        appareil_prefere: JSON.stringify(selection),
      },
      { onConflict: "user_id" }
    );

    if (error) {
      console.error("Erreur sauvegarde appareil :", error);
    }
  };

  const sessionsTerminees = Object.values(progress).filter(
    (s) => s === "terminee"
  ).length;

  const prochaineSession = sessions.find(
    (s) => !progress[s.id] || progress[s.id] === "a_faire"
  );

  const handleDeconnexion = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <main
        style={{
          backgroundColor: "#070014",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Chargement...
        </p>
      </main>
    );
  }

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
          backgroundColor: "#000000",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <img
            src="/logoLisa.webp"
            alt="LISA"
            style={{ height: "120px", width: "auto" }}
          />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
            Bonjour {prenom} 👋
          </span>

          <button
            onClick={handleDeconnexion}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "13px",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
            }}
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
        {showAppareil && (
          <div
            style={{
              background: "rgba(167,139,250,0.08)",
              border: "1px solid rgba(167,139,250,0.2)",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "32px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
              Sur quel appareil travailles-tu ?
            </h2>

            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "20px",
              }}
            >
              Tu pourras modifier ce choix à tout moment.
            </p>

            <AppareilSelector
              appareils={appareils}
              onValider={sauvegarderAppareil}
            />
          </div>
        )}

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "28px",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "8px",
            }}
          >
            Bonjour {prenom} 👋
          </p>

          <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
            Tu as terminé{" "}
            <span style={{ color: "#A78BFA" }}>
              {sessionsTerminees} session{sessionsTerminees > 1 ? "s" : ""}
            </span>{" "}
            sur 30
          </p>

          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: "99px",
              height: "8px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(90deg, #A78BFA, #F472B6)",
                borderRadius: "99px",
                height: "8px",
                width: `${(sessionsTerminees / 30) * 100}%`,
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {prochaineSession && (
            <Link
              href={`/session/${prochaineSession.id}`}
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  background: "linear-gradient(90deg, #A78BFA, #F472B6)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px 28px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 0 24px rgba(167,139,250,0.3)",
                }}
              >
                Reprendre — {prochaineSession.titre}
              </button>
            </Link>
          )}
        </div>

        {appareil.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
              Ton appareil :
            </span>

            {appareil.map((a) => (
              <span
                key={a}
                style={{
                  fontSize: "12px",
                  background: "rgba(103,232,249,0.1)",
                  border: "1px solid rgba(103,232,249,0.2)",
                  color: "#67E8F9",
                  borderRadius: "20px",
                  padding: "4px 12px",
                }}
              >
                {appareils.find((ap) => ap.id === a)?.label}
              </span>
            ))}

            <button
              onClick={() => setShowAppareil(true)}
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.3)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Modifier
            </button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {sessions.map((session, index) => {
            const statut = progress[session.id] || "a_faire";
            const isTerminee = statut === "terminee";
            const isEnCours = statut === "en_cours";

            return (
              <Link
                key={session.id}
                href={`/session/${session.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: isTerminee
                      ? "rgba(103,232,249,0.04)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${
                      isTerminee
                        ? "rgba(103,232,249,0.15)"
                        : isEnCours
                        ? "rgba(167,139,250,0.2)"
                        : "rgba(255,255,255,0.06)"
                    }`,
                    borderRadius: "12px",
                    padding: "18px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: isTerminee
                          ? "rgba(103,232,249,0.15)"
                          : "rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        color: isTerminee
                          ? "#67E8F9"
                          : "rgba(255,255,255,0.3)",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {isTerminee ? "✓" : index }
                    </div>

                    <div>
                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          color: isTerminee
                            ? "rgba(255,255,255,0.6)"
                            : "#ffffff",
                        }}
                      >
                        {session.titre}
                      </p>

                      {session.gratuite && (
                        <span style={{ fontSize: "11px", color: "#FCD34D" }}>
                          Gratuite
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: "12px",
                      color: isTerminee
                        ? "#67E8F9"
                        : isEnCours
                        ? "#A78BFA"
                        : "rgba(255,255,255,0.25)",
                      background: isTerminee
                        ? "rgba(103,232,249,0.08)"
                        : isEnCours
                        ? "rgba(167,139,250,0.08)"
                        : "transparent",
                      border: isTerminee
                        ? "1px solid rgba(103,232,249,0.15)"
                        : isEnCours
                        ? "1px solid rgba(167,139,250,0.15)"
                        : "none",
                      borderRadius: "20px",
                      padding: isTerminee || isEnCours ? "3px 10px" : "0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isTerminee ? "Terminée" : isEnCours ? "En cours" : "Commencer"}
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