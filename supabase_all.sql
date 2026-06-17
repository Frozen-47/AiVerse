-- =============================================================================
-- AiVerse — full database setup (run this ONE file in Supabase SQL Editor)
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS
-- =============================================================================

-- ─── 1. Tables ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL UNIQUE,
  org TEXT,
  type TEXT NOT NULL,
  task TEXT NOT NULL,
  license TEXT,
  year INTEGER,
  size TEXT,
  summary TEXT NOT NULL,
  architecture TEXT,
  usage TEXT,
  benchmarks TEXT,
  limitations TEXT,
  url TEXT,
  citations JSONB DEFAULT '[]'::jsonb,
  popular BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT false,
  submitted_by TEXT
);

CREATE TABLE IF NOT EXISTS user_preferences (
  user_key TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  interests TEXT[] NOT NULL DEFAULT '{}',
  referral_source TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS entry_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entry_name TEXT NOT NULL REFERENCES entries(name) ON DELETE CASCADE,
  user_key TEXT NOT NULL,
  author_name TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (entry_name, user_key)
);

CREATE TABLE IF NOT EXISTS entry_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entry_name TEXT NOT NULL REFERENCES entries(name) ON DELETE CASCADE,
  user_key TEXT NOT NULL,
  author_name TEXT NOT NULL,
  body TEXT NOT NULL CHECK (char_length(trim(body)) >= 1 AND char_length(body) <= 2000),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_key TEXT NOT NULL,
  entry_name TEXT NOT NULL REFERENCES entries(name) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_key, entry_name)
);

CREATE INDEX IF NOT EXISTS entry_ratings_entry_name_idx ON entry_ratings (entry_name);
CREATE INDEX IF NOT EXISTS entry_comments_entry_name_idx ON entry_comments (entry_name, created_at DESC);
CREATE INDEX IF NOT EXISTS user_bookmarks_user_key_idx ON user_bookmarks (user_key, created_at DESC);

ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;

-- ─── 2. RLS helpers (private schema — not exposed via /rest/v1/rpc) ─────────
-- Clerk + Supabase: Authentication → Third-party auth → Clerk; JWT `sub` = user id.

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO postgres, service_role, anon, authenticated;

CREATE OR REPLACE FUNCTION private.app_user_key()
RETURNS text
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT CASE
    WHEN (auth.jwt() ->> 'sub') IS NOT NULL
      THEN 'supabase_' || (auth.jwt() ->> 'sub')
    ELSE NULL
  END;
$$;

CREATE OR REPLACE FUNCTION private.is_guest_user_key(key text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT key ~ '^guest_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';
$$;

CREATE OR REPLACE FUNCTION private.can_access_user_key(key text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT key = private.app_user_key()
    OR (
      auth.role() = 'anon'
      AND private.app_user_key() IS NULL
      AND private.is_guest_user_key(key)
    );
$$;

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT 
    auth.jwt() ->> 'email' = 'frozennheart47@gmail.com' 
    OR auth.jwt() -> 'user_metadata' ->> 'role' = 'admin';
$$;

REVOKE ALL ON FUNCTION private.app_user_key() FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_guest_user_key(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.can_access_user_key(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.app_user_key() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION private.is_guest_user_key(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION private.can_access_user_key(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION private.is_admin() TO anon, authenticated;

-- Remove legacy public helpers (callable via PostgREST RPC)
DROP FUNCTION IF EXISTS public.can_access_user_key(text) CASCADE;
DROP FUNCTION IF EXISTS public.app_user_key() CASCADE;
DROP FUNCTION IF EXISTS public.is_guest_user_key(text) CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- ─── 3. RLS policies ─────────────────────────────────────────────────────────

-- entries
DROP POLICY IF EXISTS "Allow public read access" ON entries;
DROP POLICY IF EXISTS "Public read approved entries" ON entries;
CREATE POLICY "Public read approved entries"
  ON entries FOR SELECT
  USING (approved = true OR private.is_admin() OR submitted_by = private.app_user_key());

DROP POLICY IF EXISTS "Admin update entries" ON entries;
CREATE POLICY "Admin update entries"
  ON entries FOR UPDATE
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "Admin delete entries" ON entries;
CREATE POLICY "Admin delete entries"
  ON entries FOR DELETE
  USING (private.is_admin());

DROP POLICY IF EXISTS "Allow public inserts" ON entries;
DROP POLICY IF EXISTS "Public submit unapproved entries" ON entries;
CREATE POLICY "Public submit unapproved entries"
  ON entries FOR INSERT
  WITH CHECK (
    coalesce(approved, false) = false
    AND coalesce(popular, false) = false
    AND name IS NOT NULL
    AND btrim(name) <> ''
    AND type IS NOT NULL
    AND btrim(type) <> ''
    AND task IS NOT NULL
    AND btrim(task) <> ''
    AND summary IS NOT NULL
    AND btrim(summary) <> ''
  );

-- user_preferences
DROP POLICY IF EXISTS "Allow public read preferences" ON user_preferences;
DROP POLICY IF EXISTS "Read own preferences" ON user_preferences;
CREATE POLICY "Read own preferences"
  ON user_preferences FOR SELECT
  USING (private.can_access_user_key(user_key) OR private.is_admin());

DROP POLICY IF EXISTS "Allow public upsert preferences" ON user_preferences;
DROP POLICY IF EXISTS "Insert own preferences" ON user_preferences;
CREATE POLICY "Insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (
    private.can_access_user_key(user_key)
    AND role IS NOT NULL
    AND btrim(role) <> ''
    AND referral_source IS NOT NULL
    AND btrim(referral_source) <> ''
  );

DROP POLICY IF EXISTS "Allow public update preferences" ON user_preferences;
DROP POLICY IF EXISTS "Update own preferences" ON user_preferences;
CREATE POLICY "Update own preferences"
  ON user_preferences FOR UPDATE
  USING (private.can_access_user_key(user_key))
  WITH CHECK (
    private.can_access_user_key(user_key)
    AND role IS NOT NULL
    AND btrim(role) <> ''
    AND referral_source IS NOT NULL
    AND btrim(referral_source) <> ''
  );

-- entry_ratings
DROP POLICY IF EXISTS "Allow public read ratings" ON entry_ratings;
DROP POLICY IF EXISTS "Public read ratings" ON entry_ratings;
CREATE POLICY "Public read ratings"
  ON entry_ratings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public insert ratings" ON entry_ratings;
DROP POLICY IF EXISTS "Insert own ratings" ON entry_ratings;
CREATE POLICY "Insert own ratings"
  ON entry_ratings FOR INSERT
  WITH CHECK (
    user_key = private.app_user_key()
    AND private.app_user_key() IS NOT NULL
    AND rating BETWEEN 1 AND 5
    AND author_name IS NOT NULL
    AND btrim(author_name) <> ''
    AND char_length(btrim(author_name)) <= 120
    AND entry_name IS NOT NULL
  );

DROP POLICY IF EXISTS "Allow public update ratings" ON entry_ratings;
DROP POLICY IF EXISTS "Update own ratings" ON entry_ratings;
CREATE POLICY "Update own ratings"
  ON entry_ratings FOR UPDATE
  USING (user_key = private.app_user_key())
  WITH CHECK (
    user_key = private.app_user_key()
    AND rating BETWEEN 1 AND 5
    AND author_name IS NOT NULL
    AND btrim(author_name) <> ''
    AND char_length(btrim(author_name)) <= 120
  );

-- entry_comments
DROP POLICY IF EXISTS "Allow public read comments" ON entry_comments;
DROP POLICY IF EXISTS "Public read comments" ON entry_comments;
CREATE POLICY "Public read comments"
  ON entry_comments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public insert comments" ON entry_comments;
DROP POLICY IF EXISTS "Insert own comments" ON entry_comments;
CREATE POLICY "Insert own comments"
  ON entry_comments FOR INSERT
  WITH CHECK (
    user_key = private.app_user_key()
    AND private.app_user_key() IS NOT NULL
    AND author_name IS NOT NULL
    AND btrim(author_name) <> ''
    AND char_length(btrim(author_name)) <= 120
    AND body IS NOT NULL
    AND char_length(btrim(body)) >= 1
    AND char_length(body) <= 2000
    AND entry_name IS NOT NULL
  );

-- user_bookmarks
DROP POLICY IF EXISTS "Allow public read bookmarks" ON user_bookmarks;
DROP POLICY IF EXISTS "Read own bookmarks" ON user_bookmarks;
CREATE POLICY "Allow public read bookmarks"
  ON user_bookmarks FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public insert bookmarks" ON user_bookmarks;
DROP POLICY IF EXISTS "Insert own bookmarks" ON user_bookmarks;
CREATE POLICY "Insert own bookmarks"
  ON user_bookmarks FOR INSERT
  WITH CHECK (
    user_key = private.app_user_key()
    AND private.app_user_key() IS NOT NULL
    AND entry_name IS NOT NULL
    AND btrim(entry_name) <> ''
  );

DROP POLICY IF EXISTS "Allow public delete bookmarks" ON user_bookmarks;
DROP POLICY IF EXISTS "Delete own bookmarks" ON user_bookmarks;
CREATE POLICY "Delete own bookmarks"
  ON user_bookmarks FOR DELETE
  USING (user_key = private.app_user_key());
