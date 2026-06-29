import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateCertificat } from '@/lib/generateCertificat'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId requis' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, is_paid')
    .eq('id', userId)
    .single()

  if (!profile?.is_paid) {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 })
  }

  const { data: s30 } = await supabase
    .from('session_progress')
    .select('completed, completed_at')
    .eq('user_id', userId)
    .eq('session_id', 30)
    .single()

  if (!s30?.completed) {
    return NextResponse.json({ error: 'Session 30 non terminée' }, { status: 403 })
  }

  const dateStr = s30.completed_at
    ? new Date(s30.completed_at).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    : new Date().toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
      })

  const pdfBytes = await generateCertificat(
    profile.first_name || '',
    profile.last_name || '',
    dateStr
  )

  const prenom = profile.first_name || 'apprenant'
  const nom = profile.last_name || ''

  const buffer = Buffer.from(pdfBytes)
return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="certificat-lisa-${prenom}-${nom}.pdf"`
    }
  })
}