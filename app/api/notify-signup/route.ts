import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";

export async function POST(req: NextRequest) {
  // Important : ce hook se déclenche AVANT la création du compte utilisateur.
  // On ne doit JAMAIS bloquer une vraie inscription, même en cas d'erreur.
  try {
    const payload = await req.text();

    const headers = {
      "webhook-id": req.headers.get("webhook-id") || "",
      "webhook-timestamp": req.headers.get("webhook-timestamp") || "",
      "webhook-signature": req.headers.get("webhook-signature") || "",
    };

    const secret = process.env.SIGNUP_WEBHOOK_SECRET || "";
    const wh = new Webhook(secret);

    let data: any;
    try {
      data = wh.verify(payload, headers);
    } catch (verifyError) {
      console.error("Signature webhook invalide:", verifyError);
      // On ne bloque jamais une inscription réelle, même si la signature échoue.
      return NextResponse.json({}, { status: 200 });
    }

    const email = data?.user?.email || "email inconnu";

    // Envoi de l'email en arrière-plan, sans jamais bloquer la réponse
    fetch("https://api.brevo.com/v3/smtp/email", {
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
    }).catch((err) => {
      console.error("Erreur envoi Brevo (non bloquant):", err);
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Erreur notify-signup (non bloquant):", error);
    return NextResponse.json({}, { status: 200 });
  }
}