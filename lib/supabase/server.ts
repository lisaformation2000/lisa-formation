import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Client Supabase pour les Server Components et Route Handlers.
 * Lit/écrit la session via les cookies HTTP — nécessaire pour que le middleware
 * et les routes API sachent qui est connecté sans dépendre du localStorage.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as CookieOptions)
            )
          } catch {
            // setAll appelé depuis un Server Component (lecture seule) — le
            // middleware se charge déjà du rafraîchissement de session dans ce cas.
          }
        },
      },
    }
  )
}

/**
 * Client "admin" avec la clé service_role — à utiliser UNIQUEMENT côté serveur,
 * jamais dans un fichier exposé au navigateur. Sert à modifier des données
 * (ex: statut de paiement) sans être soumis aux règles RLS, typiquement depuis
 * le webhook Stripe où il n'y a pas d'utilisateur connecté au sens cookie.
 */
export function createAdminClient() {
  const { createClient: createSupabaseClient } = require('@supabase/supabase-js')
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
