import * as Brevo from '@getbrevo/brevo'
import WelcomeEmail from '@/emails/WelcomeEmail'
import RetractationAckEmail from '@/emails/RetractationAckEmail'
import { renderAsync } from '@react-email/render'

const FROM_EMAIL = 'contact@formationlisa.fr'
const FROM_NAME = 'LISA Formation IA'

function getBrevo() {
  if (!process.env.BREVO_API_KEY) return null
  const apiInstance = new Brevo.TransactionalEmailsApi()
  apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)
  return apiInstance
}

export async function envoyerEmailBienvenue(params: { to: string; prenom: string }) {
  const brevo = getBrevo()
  if (!brevo) return
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://formationlisa.fr'
  const html = await renderAsync(WelcomeEmail({ prenom: params.prenom, siteUrl }))
  return brevo.sendTransacEmail({
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
  const brevo = getBrevo()
  if (!brevo) return
  const html = await renderAsync(RetractationAckEmail({
    nom: params.nom,
    email: params.to,
    referenceCommande: params.referenceCommande,
    dateCommande: params.dateCommande,
  }))
  return brevo.sendTransacEmail({
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
  const brevo = getBrevo()
  if (!brevo) return
  const notifTo = process.env.NOTIF_RETRACTATION_EMAIL
  if (!notifTo) return
  return brevo.sendTransacEmail({
    sender: { email: FROM_EMAIL, name: FROM_NAME },
    to: [{ email: notifTo }],
    subject: `Nouvelle demande de rétractation — ${params.nom}`,
    textContent: `Nom : ${params.nom}\nEmail : ${params.email}\nRéférence commande : ${params.referenceCommande || 'non fournie'}\nMessage : ${params.message || '(aucun)'}`,
  })
}