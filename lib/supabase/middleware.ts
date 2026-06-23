import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isDashboard = path.startsWith('/dashboard')
  const isSession = path.startsWith('/session')
  const isFreeSession = path === '/session/0' || path.startsWith('/session/0/')

  if (!user && (isDashboard || (isSession && !isFreeSession))) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', path)
    return NextResponse.redirect(url)
  }

  if (user && isSession && !isFreeSession) {
    const { data: profile } = await supabase
      .from('user_profile')
      .select('has_paid')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!profile?.has_paid) {
      const url = request.nextUrl.clone()
      url.pathname = '/inscription'
      url.searchParams.set('reason', 'paiement_requis')
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}