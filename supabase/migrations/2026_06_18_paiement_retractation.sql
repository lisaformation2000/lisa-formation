-- ============================================================================
-- MIGRATION LISA — Paiement, accès, rétractation
-- À exécuter dans Supabase > SQL Editor, dans l'ordre, en une seule fois.
-- ============================================================================

-- 1. Colonnes de statut de paiement sur user_profile
ALTER TABLE user_profile
  ADD COLUMN IF NOT EXISTS has_paid boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id text,
  ADD COLUMN IF NOT EXISTS retractation_waived boolean NOT NULL DEFAULT false;

-- 2. Table des commandes (trace de chaque paiement Stripe, indépendante du profil
--    pour garder un historique même si le profil est modifié plus tard)
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_checkout_session_id text UNIQUE NOT NULL,
  stripe_customer_id text,
  amount_total integer NOT NULL,        -- en centimes, ex: 14700 pour 147,00€
  currency text NOT NULL DEFAULT 'eur',
  status text NOT NULL DEFAULT 'completed',
  retractation_waived boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "orders_select_own" ON orders;
CREATE POLICY "orders_select_own" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Pas de policy INSERT/UPDATE pour les utilisateurs : seul le webhook Stripe,
-- via la clé service_role (qui ignore RLS), peut écrire dans cette table.

-- 3. Table des demandes de rétractation (obligation légale au 19/06/2026 —
--    fonctionnalité accessible même sans compte, donc pas liée à auth.users)
CREATE TABLE IF NOT EXISTS retractation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  email text NOT NULL,
  reference_commande text,
  date_commande date,
  message text,
  statut text NOT NULL DEFAULT 'recue', -- recue / traitee / remboursee
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE retractation_requests ENABLE ROW LEVEL SECURITY;
-- Aucune policy publique : seule la route API (clé service_role) écrit et lit.
-- Cela évite qu'une personne puisse consulter les demandes des autres.

-- 4. Index utiles
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profile_has_paid ON user_profile(has_paid);

-- ============================================================================
-- Fin de la migration.
-- ============================================================================
