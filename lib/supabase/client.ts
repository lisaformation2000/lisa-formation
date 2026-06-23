import { createBrowserClient } from '@supabase/ssr'

/**
 * Client Supabase pour les composants React côté navigateur ('use client').
 * Les clés viennent des variables d'environnement — voir .env.local.example.
 * NEXT_PUBLIC_SUPABASE_ANON_KEY est une clé publique par design (protégée par les
 * règles RLS côté base), elle peut être exposée au navigateur sans risque.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
