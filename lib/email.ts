import * as SibApiV3Sdk from 'sib-api-v3-sdk'
import WelcomeEmail from '@/emails/WelcomeEmail'
import RetractationAckEmail from '@/emails/RetractationAckEmail'
import { render } from '@react-email/render'

const FROM_EMAIL = 'contact@formationlisa.fr'
const FROM_NAME = 'LISA Formation IA'

function getBrevo() {
  if (!process.env.BREVO_API_KEY) return null
  const defaultClient = SibApiV3Sdk.ApiClient.instance
  const apiKey = defaultClient.authentications['api-key']
  apiKey.apiKey = process.env.BREVO_API_KEY
  return new SibApiV3Sdk.TransactionalEmailsApi()
}

export async function envoyerEmailBienvenue(params: { to: string; prenom: string }) {
  const brevo = getBrevo()
  if (!brevo) return
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://formationlisa.fr'
  const html = await render(WelcomeEmail({ prenom: params.prenom, siteUrl }))
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
  sendSmtpEmail.sender = { email: FROM_EMAIL, name: FROM_NAME }
  sendSmtpEmail.to = [{ email: params.to }]
  sendSmtpEmail.subject = 'Bienvenue dans LISA — ton accès est prêt'
  sendSmtpEmail.htmlContent = html
  return brevo.sendTransacEmail(sendSmtpEmail)
}

export async function envoyerAccuseRetractation(params: {
  to: string
  nom: string
  referenceCommande?: string
  dateCommande?: string
}) {
  const brevo = getBrevo()
  if (!brevo) return
  const html = await render(RetractationAckEmail({
    nom: params.nom,
    email: params.to,
    referenceCommande: params.referenceCommande,
    dateCommande: params.dateCommande,
  }))
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
  sendSmtpEmail.sender = { email: FROM_EMAIL, name: FROM_NAME }
  sendSmtpEmail.to = [{ email: params.to }]
  sendSmtpEmail.subject = 'Confirmation de réception de ta demande de rétractation — LISA'
  sendSmtpEmail.htmlContent = html
  return brevo.sendTransacEmail(sendSmtpEmail)
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
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
  sendSmtpEmail.sender = { email: FROM_EMAIL, name: FROM_NAME }
  sendSmtpEmail.to = [{ email: notifTo }]
  sendSmtpEmail.subject = `Nouvelle demande de rétractation — ${params.nom}`
  sendSmtpEmail.textContent = `Nom : ${params.nom}\nEmail : ${params.email}\nRéférence commande : ${params.referenceCommande || 'non fournie'}\nMessage : ${params.message || '(aucun)'}`
  return brevo.sendTransacEmail(sendSmtpEmail)
}