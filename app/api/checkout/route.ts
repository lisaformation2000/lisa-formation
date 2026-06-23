import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

/**
 * Crée une session Stripe Checkout pour l'utilisateur connecté et renvoie l'URL
 * vers laquelle rediriger le navigateur. Le paiement est en mode "payment"
 * (paiement unique), pas "subscription", conformément à l'offre 147€ à vie.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })
  }

  let body: { retractationWaived?: boolean } = {}
  try {
    body = await request.json()
  } catch {
    // corps vide accepté
  }

  if (!body.retractationWaived) {
    return NextResponse.json(
      { error: 'La case de renonciation au délai de rétractation doit être cochée pour un accès immédiat.' },
      { status: 400 }
    )
  }

  // Évite de payer deux fois si déjà à jour
  const { data: profile } = await supabase
    .from('user_profile')
    .select('has_paid, stripe_customer_id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (profile?.has_paid) {
    return NextResponse.json({ alreadyPaid: true })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: user.email,
    client_reference_id: user.id,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    metadata: {
      user_id: user.id,
      retractation_waived: 'true',
    },
    success_url: `${siteUrl}/dashboard?paiement=succes`,
    cancel_url: `${siteUrl}/inscription?paiement=annule`,
    locale: 'fr',
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}
