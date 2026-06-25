import WelcomeEmail from '@/emails/WelcomeEmail'
import RetractationAckEmail from '@/emails/RetractationAckEmail'
import { render } from '@react-email/render'

const FROM_EMAIL = 'contact@formationlisa.fr'
const FROM_NAME = 'LISA Formation IA'
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email'

type BrevoPayload = {
  sender: { email: string; name: string }
  to: { email: string }[]
  subject: string
  htmlContent?: string
  textContent?: string
}

async function envoyerViaBrevo(payload: BrevoPayload) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return
  const res = await fetch(BREVO_URL, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const erreur = await res.text()
    console.error('Erreur Brevo:', res.status, erreur)
  }
  return res
}

export async function envoyerEmailBienvenue(params: { to: string; prenom: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://formationlisa.fr'
  const html = await render(WelcomeEmail({ prenom: params.prenom, siteUrl }))
  return envoyerViaBrevo({
    sender: { email: FROM_EMAIL, name: FROM_NAME },
    to: [{ email: params.to }],
    subject: 'Bienvenue dans LISA — ton accès est prêt',
    htmlContent: html,
  })
}

export async function envoyerAccuseRetractation(params: {
  to: string
  nom: string
  referenceCommande?: string
  dateCommande?: string
}) {
  const html = await render(RetractationAckEmail({
    nom: params.nom,
    email: params.to,
    referenceCommande: params.referenceCommande,
    dateCommande: params.dateCommande,
  }))
  return envoyerViaBrevo({
    sender: { email: FROM_EMAIL, name: FROM_NAME },
    to: [{ email: params.to }],
    subject: 'Confirmation de réception de ta demande de rétractation — LISA',
    htmlContent: html,
  })
}

export async function notifierNadiaRetractation(params: {
  nom: string
  email: string
  referenceCommande?: string
  message?: string
}) {
  const notifTo = process.env.NOTIF_RETRACTATION_EMAIL
  if (!notifTo) return
  return envoyerViaBrevo({
    sender: { email: FROM_EMAIL, name: FROM_NAME },
    to: [{ email: notifTo }],
    subject: `Nouvelle demande de rétractation — ${params.nom}`,
    textContent: `Nom : ${params.nom}\nEmail : ${params.email}\nRéférence commande : ${params.referenceCommande || 'non fournie'}\nMessage : ${params.message || '(aucun)'}`,
  })
}