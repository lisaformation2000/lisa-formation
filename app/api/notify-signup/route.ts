import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Vérification simple du secret partagé (à définir dans les variables d'env Vercel)
    const secret = req.headers.get("x-webhook-secret");
    if (secret !== process.env.SIGNUP_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const email = body?.user?.email || body?.record?.email || body?.email;

    if (!email) {
      return NextResponse.json({ error: "missing email" }, { status: 400 });
    }

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify({
        sender: { name: "LISA Formation IA", email: "contact@formationlisa.fr" },
        to: [{ email: "lisaformationia@gmail.com", name: "Nadia" }],
        subject: "Nouvelle inscription — Session Découverte",
        htmlContent: `<html><body>
          <h2>Nouvelle inscription Session Découverte</h2>
          <p>Email : ${email}</p>
          <p>Date : ${new Date().toLocaleString("fr-FR")}</p>
        </body></html>`,
      }),
    });

    if (!brevoResponse.ok) {
      const errText = await brevoResponse.text();
      console.error("Erreur Brevo:", errText);
      return NextResponse.json({ error: "brevo failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur notify-signup:", error);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}