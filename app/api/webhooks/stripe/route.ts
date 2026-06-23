import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/server'
import { envoyerEmailBienvenue } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

/**
 * IMPORTANT : Stripe signe le corps BRUT de la requête. Il ne faut donc jamais
 * parser le JSON avant la vérification de signature, sinon la signature ne
 * correspondra plus et Stripe sera systématiquement rejeté (erreur fréquente).
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante.' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Signature Stripe invalide :', err)
    return NextResponse.json({ error: 'Signature invalide.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.client_reference_id || session.metadata?.user_id

    if (!userId) {
      console.error('checkout.session.completed sans user_id — session', session.id)
      return NextResponse.json({ received: true })
    }

    const supabaseAdmin = createAdminClient()

    const { error: profileError } = await supabaseAdmin
      .from('user_profile')
      .update({
        has_paid: true,
        paid_at: new Date().toISOString(),
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
        stripe_checkout_session_id: session.id,
        retractation_waived: session.metadata?.retractation_waived === 'true',
      })
      .eq('user_id', userId)

    if (profileError) {
      console.error('Erreur mise à jour user_profile :', profileError)
    }

    const { error: orderError } = await supabaseAdmin.from('orders').insert({
      user_id: userId,
      stripe_checkout_session_id: session.id,
      stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
      amount_total: session.amount_total ?? 14700,
      currency: session.currency ?? 'eur',
      status: 'completed',
      retractation_waived: session.metadata?.retractation_waived === 'true',
    })

    if (orderError) {
      // Une session déjà traitée (rejouée par Stripe) provoquera un conflit sur la
      // contrainte UNIQUE stripe_checkout_session_id : c'est attendu, on l'ignore.
      console.warn('orders.insert :', orderError.message)
    }

    // Email de bienvenue — on récupère le prénom et l'email réels de l'utilisateur
    const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId)
    const email = userData?.user?.email || session.customer_details?.email
    const prenom = userData?.user?.user_metadata?.prenom || ''

    if (email) {
      try {
        await envoyerEmailBienvenue({ to: email, prenom })
      } catch (emailError) {
        console.error('Erreur envoi email de bienvenue :', emailError)
      }
    }
  }

  return NextResponse.json({ received: true })
}
