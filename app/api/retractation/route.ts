import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { envoyerAccuseRetractation, notifierNadiaRetractation } from '@/lib/email'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { nom, email, referenceCommande, dateCommande, message } = body

  if (!nom?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Le nom et l’email sont obligatoires.' }, { status: 400 })
  }

  const supabaseAdmin = createAdminClient()

  const { error } = await supabaseAdmin.from('retractation_requests').insert({
    nom: nom.trim(),
    email: email.trim(),
    reference_commande: referenceCommande?.trim() || null,
    date_commande: dateCommande || null,
    message: message?.trim() || null,
  })

  if (error) {
    console.error('Erreur enregistrement rétractation :', error)
    return NextResponse.json({ error: 'Une erreur est survenue. Réessaie ou écris directement à lisaformationia@gmail.com.' }, { status: 500 })
  }

  try {
    await envoyerAccuseRetractation({
      to: email.trim(),
      nom: nom.trim(),
      referenceCommande,
      dateCommande,
    })
    await notifierNadiaRetractation({ nom: nom.trim(), email: email.trim(), referenceCommande, message })
  } catch (emailError) {
    // On ne bloque pas la demande si l'email échoue — elle est déjà enregistrée en base.
    console.error('Erreur envoi email rétractation :', emailError)
  }

  return NextResponse.json({ success: true })
}
