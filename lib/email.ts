import { Resend } from 'resend'
import WelcomeEmail from '@/emails/WelcomeEmail'
import RetractationAckEmail from '@/emails/RetractationAckEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL || 'LISA <contact@formationlisa.fr>'

export async function envoyerEmailBienvenue(params: { to: string; prenom: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://formationlisa.fr'

  return resend.emails.send({
    from: FROM,
    to: params.to,
    subject: 'Bienvenue dans LISA — ton accès est prêt',
    react: WelcomeEmail({ prenom: params.prenom, siteUrl }),
  })
}

export async function envoyerAccuseRetractation(params: {
  to: string
  nom: string
  referenceCommande?: string
  dateCommande?: string
}) {
  return resend.emails.send({
    from: FROM,
    to: params.to,
    subject: 'Confirmation de réception de ta demande de rétractation — LISA',
    react: RetractationAckEmail({
      nom: params.nom,
      email: params.to,
      referenceCommande: params.referenceCommande,
      dateCommande: params.dateCommande,
    }),
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

  return resend.emails.send({
    from: FROM,
    to: notifTo,
    subject: `Nouvelle demande de rétractation — ${params.nom}`,
    text: `Nom : ${params.nom}\nEmail : ${params.email}\nRéférence commande : ${params.referenceCommande || 'non fournie'}\nMessage : ${params.message || '(aucun)'}`,
  })
}
