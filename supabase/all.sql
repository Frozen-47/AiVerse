-- =============================================================================
-- AiVerse — Complete Database Setup & Security Policy
-- Run this ENTIRE file in your Supabase Project -> SQL Editor
-- Safe to re-run multiple times (idempotent: IF NOT EXISTS, DROP POLICY IF EXISTS, etc.)
-- =============================================================================

-- ─── PART 1: TABLES & SCHEMA MIGRATIONS ──────────────────────────────────────

-- 1. AI Catalog Entries (Models, Frameworks, Datasets, Platforms, AI Apps)
CREATE TABLE IF NOT EXISTS public.entries (
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

-- Ensure all columns exist if the table was created previously
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS org TEXT;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'Model';
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS task TEXT NOT NULL DEFAULT 'NLP';
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS license TEXT;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS year INTEGER;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS size TEXT;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS summary TEXT NOT NULL DEFAULT '';
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS architecture TEXT;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS usage TEXT;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS benchmarks TEXT;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS limitations TEXT;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS citations JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS popular BOOLEAN DEFAULT false;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false;
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS submitted_by TEXT;

-- 2. User Profiles & Preferences (Stores roles, bio, social links, deletion requests)
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_key TEXT PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'developer',
  interests TEXT[] NOT NULL DEFAULT '{}',
  referral_source TEXT NOT NULL DEFAULT '{"source":"direct"}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.user_preferences ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'developer';
ALTER TABLE public.user_preferences ADD COLUMN IF NOT EXISTS interests TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE public.user_preferences ADD COLUMN IF NOT EXISTS referral_source TEXT NOT NULL DEFAULT '{"source":"direct"}';
ALTER TABLE public.user_preferences ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- 3. Community Ratings & Reviews
CREATE TABLE IF NOT EXISTS public.entry_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entry_name TEXT NOT NULL REFERENCES public.entries(name) ON DELETE CASCADE,
  user_key TEXT NOT NULL,
  author_name TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (entry_name, user_key)
);

-- 4. Community Comments & Discussion
CREATE TABLE IF NOT EXISTS public.entry_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entry_name TEXT NOT NULL REFERENCES public.entries(name) ON DELETE CASCADE,
  user_key TEXT NOT NULL,
  author_name TEXT NOT NULL,
  body TEXT NOT NULL CHECK (char_length(trim(body)) >= 1 AND char_length(body) <= 2000),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. User Bookmarks
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_key TEXT NOT NULL,
  entry_name TEXT NOT NULL REFERENCES public.entries(name) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_key, entry_name)
);

-- 6. User Chat Sessions (Stored per user account)
CREATE TABLE IF NOT EXISTS public.user_chats (
  id TEXT PRIMARY KEY,
  user_key TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'New conversation',
  mode TEXT NOT NULL DEFAULT 'flagship',
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS user_key TEXT NOT NULL DEFAULT '';
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT 'New conversation';
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS mode TEXT NOT NULL DEFAULT 'flagship';
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS messages JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- ─── PART 2: INDEXES ─────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS entries_name_idx ON public.entries (name);
CREATE INDEX IF NOT EXISTS entries_type_idx ON public.entries (type);
CREATE INDEX IF NOT EXISTS entries_approved_idx ON public.entries (approved);
CREATE INDEX IF NOT EXISTS entry_ratings_entry_name_idx ON public.entry_ratings (entry_name);
CREATE INDEX IF NOT EXISTS entry_comments_entry_name_idx ON public.entry_comments (entry_name, created_at DESC);
CREATE INDEX IF NOT EXISTS user_bookmarks_user_key_idx ON public.user_bookmarks (user_key, created_at DESC);
CREATE INDEX IF NOT EXISTS user_chats_user_key_idx ON public.user_chats (user_key, updated_at DESC);

-- Enable RLS on all public tables
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entry_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entry_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_chats ENABLE ROW LEVEL SECURITY;

-- ─── PART 3: PRIVATE SCHEMA & RLS HELPERS ────────────────────────────────────

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO postgres, service_role, anon, authenticated;

-- Resolves the current user's formatted key (e.g. 'supabase_20f48b0a-...')
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

-- Validates guest user keys for anonymous session support
CREATE OR REPLACE FUNCTION private.is_guest_user_key(key text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT key ~ '^guest_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';
$$;

-- Access check for user preferences (allows own key or guest keys)
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

-- Security check for platform administrators
CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT 
    auth.jwt() ->> 'email' = 'frozennheart47@gmail.com' 
    OR auth.jwt() ->> 'sub' = '20f48b0a-737d-4b78-9098-847a8ba450e8'
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

-- Drop obsolete public RLS helpers if they exist
DROP FUNCTION IF EXISTS public.can_access_user_key(text) CASCADE;
DROP FUNCTION IF EXISTS public.app_user_key() CASCADE;
DROP FUNCTION IF EXISTS public.is_guest_user_key(text) CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- ─── PART 4: ROW LEVEL SECURITY POLICIES ─────────────────────────────────────

-- ── entries ───────────────────────────────────────────
DROP POLICY IF EXISTS "Allow public read access" ON public.entries;
DROP POLICY IF EXISTS "Public read approved entries" ON public.entries;
CREATE POLICY "Public read approved entries"
  ON public.entries FOR SELECT
  USING (approved = true OR private.is_admin() OR submitted_by = private.app_user_key());

DROP POLICY IF EXISTS "Admin update entries" ON public.entries;
CREATE POLICY "Admin update entries"
  ON public.entries FOR UPDATE
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "Admin delete entries" ON public.entries;
CREATE POLICY "Admin delete entries"
  ON public.entries FOR DELETE
  USING (private.is_admin());

DROP POLICY IF EXISTS "Allow public inserts" ON public.entries;
DROP POLICY IF EXISTS "Public submit unapproved entries" ON public.entries;
CREATE POLICY "Public submit unapproved entries"
  ON public.entries FOR INSERT
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

-- ── user_preferences ──────────────────────────────────
-- Public read access so builder profiles and badges are visible across the community
DROP POLICY IF EXISTS "Allow public read preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Read own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Public read user profiles" ON public.user_preferences;
CREATE POLICY "Public read user profiles"
  ON public.user_preferences FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public upsert preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Insert own preferences" ON public.user_preferences;
CREATE POLICY "Insert own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (
    private.can_access_user_key(user_key)
    AND role IS NOT NULL
    AND btrim(role) <> ''
    AND referral_source IS NOT NULL
    AND btrim(referral_source) <> ''
  );

DROP POLICY IF EXISTS "Allow public update preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Update own preferences" ON public.user_preferences;
CREATE POLICY "Update own preferences"
  ON public.user_preferences FOR UPDATE
  USING (private.can_access_user_key(user_key) OR private.is_admin())
  WITH CHECK (private.can_access_user_key(user_key) OR private.is_admin());

DROP POLICY IF EXISTS "Admin delete preferences" ON public.user_preferences;
CREATE POLICY "Admin delete preferences"
  ON public.user_preferences FOR DELETE
  USING (private.is_admin());

-- ── entry_ratings ─────────────────────────────────────
DROP POLICY IF EXISTS "Allow public read ratings" ON public.entry_ratings;
DROP POLICY IF EXISTS "Public read ratings" ON public.entry_ratings;
CREATE POLICY "Public read ratings"
  ON public.entry_ratings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public insert ratings" ON public.entry_ratings;
DROP POLICY IF EXISTS "Insert own ratings" ON public.entry_ratings;
CREATE POLICY "Insert own ratings"
  ON public.entry_ratings FOR INSERT
  WITH CHECK (
    user_key = private.app_user_key()
    AND private.app_user_key() IS NOT NULL
    AND rating BETWEEN 1 AND 5
    AND author_name IS NOT NULL
    AND btrim(author_name) <> ''
    AND char_length(btrim(author_name)) <= 120
    AND entry_name IS NOT NULL
  );

DROP POLICY IF EXISTS "Allow public update ratings" ON public.entry_ratings;
DROP POLICY IF EXISTS "Update own ratings" ON public.entry_ratings;
CREATE POLICY "Update own ratings"
  ON public.entry_ratings FOR UPDATE
  USING (user_key = private.app_user_key())
  WITH CHECK (
    user_key = private.app_user_key()
    AND rating BETWEEN 1 AND 5
    AND author_name IS NOT NULL
    AND btrim(author_name) <> ''
    AND char_length(btrim(author_name)) <= 120
  );

-- ── entry_comments ────────────────────────────────────
DROP POLICY IF EXISTS "Allow public read comments" ON public.entry_comments;
DROP POLICY IF EXISTS "Public read comments" ON public.entry_comments;
CREATE POLICY "Public read comments"
  ON public.entry_comments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public insert comments" ON public.entry_comments;
DROP POLICY IF EXISTS "Insert own comments" ON public.entry_comments;
CREATE POLICY "Insert own comments"
  ON public.entry_comments FOR INSERT
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

-- ── user_bookmarks ────────────────────────────────────
DROP POLICY IF EXISTS "Allow public read bookmarks" ON public.user_bookmarks;
DROP POLICY IF EXISTS "Read own bookmarks" ON public.user_bookmarks;
CREATE POLICY "Allow public read bookmarks"
  ON public.user_bookmarks FOR SELECT
  USING (user_key = private.app_user_key() OR private.is_admin());

DROP POLICY IF EXISTS "Allow public insert bookmarks" ON public.user_bookmarks;
DROP POLICY IF EXISTS "Insert own bookmarks" ON public.user_bookmarks;
CREATE POLICY "Insert own bookmarks"
  ON public.user_bookmarks FOR INSERT
  WITH CHECK (
    user_key = private.app_user_key()
    AND private.app_user_key() IS NOT NULL
    AND entry_name IS NOT NULL
    AND btrim(entry_name) <> ''
  );

DROP POLICY IF EXISTS "Allow public delete bookmarks" ON public.user_bookmarks;
DROP POLICY IF EXISTS "Delete own bookmarks" ON public.user_bookmarks;
CREATE POLICY "Delete own bookmarks"
  ON public.user_bookmarks FOR DELETE
  USING (user_key = private.app_user_key());

-- ─── user_chats ──────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Users can read own chats" ON public.user_chats;
CREATE POLICY "Users can read own chats"
  ON public.user_chats FOR SELECT
  USING (
    user_key = private.app_user_key()
    OR user_key = (auth.jwt() ->> 'sub')
    OR private.can_access_user_key(user_key)
    OR private.is_admin()
  );

DROP POLICY IF EXISTS "Users can insert own chats" ON public.user_chats;
CREATE POLICY "Users can insert own chats"
  ON public.user_chats FOR INSERT
  WITH CHECK (
    user_key = private.app_user_key()
    OR user_key = (auth.jwt() ->> 'sub')
    OR private.can_access_user_key(user_key)
    OR private.is_admin()
  );

DROP POLICY IF EXISTS "Users can update own chats" ON public.user_chats;
CREATE POLICY "Users can update own chats"
  ON public.user_chats FOR UPDATE
  USING (
    user_key = private.app_user_key()
    OR user_key = (auth.jwt() ->> 'sub')
    OR private.can_access_user_key(user_key)
    OR private.is_admin()
  )
  WITH CHECK (
    user_key = private.app_user_key()
    OR user_key = (auth.jwt() ->> 'sub')
    OR private.can_access_user_key(user_key)
    OR private.is_admin()
  );

DROP POLICY IF EXISTS "Users can delete own chats" ON public.user_chats;
CREATE POLICY "Users can delete own chats"
  ON public.user_chats FOR DELETE
  USING (
    user_key = private.app_user_key()
    OR user_key = (auth.jwt() ->> 'sub')
    OR private.can_access_user_key(user_key)
    OR private.is_admin()
  );

-- ─── PART 5: SECURITY & ACCOUNT DELETION APPROVAL POLICY ─────────────────────
-- Security rule:
--   Users CANNOT delete their accounts directly.
--   Users submit an account deletion request for administrator approval.
--   Only administrators can approve and permanently purge accounts.

-- 1. Obsolete function cleanup: user self-deletion was removed in favor of admin review workflow.
-- Dropping this function completely resolves Supabase Linter 0029 (authenticated_security_definer_function_executable).
DROP FUNCTION IF EXISTS public.delete_own_account() CASCADE;

-- 2. Request Account Deletion (User submits reason for admin review)
-- Runs as SECURITY INVOKER because it only modifies the caller's own user_preferences record.
CREATE OR REPLACE FUNCTION public.request_account_deletion(reason text DEFAULT '')
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  calling_user_id uuid;
  calling_user_key text;
  current_pref record;
  meta jsonb;
BEGIN
  calling_user_id := auth.uid();
  IF calling_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated.';
  END IF;

  calling_user_key := 'supabase_' || calling_user_id::text;

  SELECT * INTO current_pref FROM public.user_preferences 
  WHERE user_key = calling_user_key OR user_key = calling_user_id::text
  LIMIT 1;

  IF current_pref IS NULL THEN
    INSERT INTO public.user_preferences (user_key, role, interests, referral_source, updated_at)
    VALUES (
      calling_user_key,
      'developer',
      '{}'::text[],
      pg_catalog.jsonb_build_object(
        'source', 'direct',
        'deletionRequested', true,
        'deletionReason', pg_catalog.coalesce(reason, ''),
        'deletionRequestedAt', pg_catalog.now()::text
      )::text,
      pg_catalog.now()
    );
  ELSE
    BEGIN
      meta := current_pref.referral_source::jsonb;
    EXCEPTION WHEN OTHERS THEN
      meta := pg_catalog.jsonb_build_object('source', pg_catalog.coalesce(current_pref.referral_source, 'direct'));
    END;

    meta := meta || pg_catalog.jsonb_build_object(
      'deletionRequested', true,
      'deletionReason', pg_catalog.coalesce(reason, ''),
      'deletionRequestedAt', pg_catalog.now()::text
    );

    UPDATE public.user_preferences
    SET referral_source = meta::text,
        updated_at = pg_catalog.now()
    WHERE user_key = current_pref.user_key;
  END IF;

  RETURN pg_catalog.jsonb_build_object(
    'success', true,
    'message', 'Account deletion request submitted for administrator review.'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.request_account_deletion(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.request_account_deletion(text) TO authenticated;

-- 3. Cancel Account Deletion Request (User can withdraw request anytime)
-- Runs as SECURITY INVOKER because it only modifies the caller's own user_preferences record.
CREATE OR REPLACE FUNCTION public.cancel_account_deletion_request()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  calling_user_id uuid;
  calling_user_key text;
  current_pref record;
  meta jsonb;
BEGIN
  calling_user_id := auth.uid();
  IF calling_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated.';
  END IF;

  calling_user_key := 'supabase_' || calling_user_id::text;

  SELECT * INTO current_pref FROM public.user_preferences 
  WHERE user_key = calling_user_key OR user_key = calling_user_id::text
  LIMIT 1;

  IF current_pref IS NOT NULL THEN
    BEGIN
      meta := current_pref.referral_source::jsonb;
      meta := meta - 'deletionRequested' - 'deletion_requested' - 'deletionReason' - 'deletion_reason' - 'deletionRequestedAt' - 'deletion_requested_at';
      UPDATE public.user_preferences
      SET referral_source = meta::text,
          updated_at = pg_catalog.now()
      WHERE user_key = current_pref.user_key;
    EXCEPTION WHEN OTHERS THEN
    END;
  END IF;

  RETURN pg_catalog.jsonb_build_object(
    'success', true,
    'message', 'Account deletion request cancelled.'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.cancel_account_deletion_request() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.cancel_account_deletion_request() TO authenticated;

-- 4. Admin Function: Permanently purge any user from auth.users and all platform tables
-- NOTE ON SUPABASE LINTER 0029:
-- This function MUST be SECURITY DEFINER to delete from auth.users, which ordinary client roles cannot access.
-- It is protected against unauthorized execution by:
--   1. Strict caller verification via private.is_admin() (raising an exception if caller is not an admin)
--   2. SET search_path = '' to prevent search-path hijacking attacks
--   3. Protection against accidental deletion of the primary platform admin
CREATE OR REPLACE FUNCTION public.delete_user_by_admin(target_user_key text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  raw_uuid_text text;
  target_uuid uuid;
BEGIN
  IF NOT private.is_admin() THEN
    RAISE EXCEPTION 'Unauthorized: Only platform administrators can delete accounts.';
  END IF;

  IF target_user_key LIKE 'supabase_%' THEN
    raw_uuid_text := pg_catalog.substr(target_user_key, 10);
  ELSE
    raw_uuid_text := target_user_key;
  END IF;

  IF raw_uuid_text = '20f48b0a-737d-4b78-9098-847a8ba450e8' THEN
    RAISE EXCEPTION 'Security error: You cannot delete the primary admin account.';
  END IF;

  DELETE FROM public.user_preferences 
    WHERE user_key = target_user_key OR user_key = 'supabase_' || raw_uuid_text OR user_key = raw_uuid_text;
  DELETE FROM public.user_bookmarks 
    WHERE user_key = target_user_key OR user_key = 'supabase_' || raw_uuid_text OR user_key = raw_uuid_text;
  DELETE FROM public.entry_ratings 
    WHERE user_key = target_user_key OR user_key = 'supabase_' || raw_uuid_text OR user_key = raw_uuid_text;
  DELETE FROM public.entry_comments 
    WHERE user_key = target_user_key OR user_key = 'supabase_' || raw_uuid_text OR user_key = raw_uuid_text;
  DELETE FROM public.user_chats 
    WHERE user_key = target_user_key OR user_key = 'supabase_' || raw_uuid_text OR user_key = raw_uuid_text;

  UPDATE public.entries 
    SET submitted_by = NULL 
    WHERE submitted_by = target_user_key OR submitted_by = 'supabase_' || raw_uuid_text OR submitted_by = raw_uuid_text;

  BEGIN
    target_uuid := raw_uuid_text::uuid;
    DELETE FROM auth.users WHERE id = target_uuid;
  EXCEPTION WHEN OTHERS THEN
  END;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_user_by_admin(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_user_by_admin(text) TO authenticated;

-- 5. Admin Function: Clear user chat history from database
CREATE OR REPLACE FUNCTION public.clear_user_chats_by_admin(
  target_user_key text,
  target_session_id text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  caller_email text;
  caller_sub text;
  caller_role text;
  raw_uuid_text text;
  deleted_count integer := 0;
BEGIN
  caller_email := auth.jwt() ->> 'email';
  caller_sub := auth.jwt() ->> 'sub';
  caller_role := auth.jwt() -> 'user_metadata' ->> 'role';

  IF NOT (
    caller_email = 'frozennheart47@gmail.com'
    OR caller_sub = '20f48b0a-737d-4b78-9098-847a8ba450e8'
    OR caller_role = 'admin'
    OR private.is_admin()
  ) THEN
    RAISE EXCEPTION 'Unauthorized: Only platform administrators can clear user chats.';
  END IF;

  IF target_user_key LIKE 'supabase_%' THEN
    raw_uuid_text := pg_catalog.substr(target_user_key, 10);
  ELSE
    raw_uuid_text := target_user_key;
  END IF;

  IF target_session_id IS NOT NULL AND target_session_id <> '' THEN
    DELETE FROM public.user_chats
    WHERE id = target_session_id
      AND (
        user_key = target_user_key
        OR user_key = 'supabase_' || raw_uuid_text
        OR user_key = raw_uuid_text
      );
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
  ELSE
    DELETE FROM public.user_chats
    WHERE user_key = target_user_key
       OR user_key = 'supabase_' || raw_uuid_text
       OR user_key = raw_uuid_text;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
  END IF;

  RETURN pg_catalog.jsonb_build_object(
    'success', true,
    'deleted_count', deleted_count,
    'message', 'User chats successfully cleared from database.'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.clear_user_chats_by_admin(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.clear_user_chats_by_admin(text, text) TO authenticated;

-- ─── PART 6: ADMIN USER DIRECTORY & CATALOG AUTOMATION ────────────────────────

-- Returns all accounts from auth.users joined with user_preferences for the admin console
-- NOTE ON SUPABASE LINTER 0029:
-- This function MUST be SECURITY DEFINER to select from auth.users, which ordinary client roles cannot access.
-- It is protected against unauthorized execution by:
--   1. Strict caller verification via private.is_admin() (raising an exception if caller is not an admin)
--   2. SET search_path = '' to prevent search-path hijacking attacks
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  result jsonb;
BEGIN
  IF NOT private.is_admin() THEN
    RAISE EXCEPTION 'Unauthorized: Administrator access required.';
  END IF;

  SELECT pg_catalog.jsonb_agg(u_row) INTO result
  FROM (
    SELECT 
      u.id::text AS user_id,
      'supabase_' || u.id::text AS user_key,
      u.email,
      pg_catalog.coalesce(
        p.referral_source,
        pg_catalog.jsonb_build_object(
          'displayName', pg_catalog.coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', pg_catalog.split_part(u.email, '@', 1)),
          'avatarUrl', pg_catalog.coalesce(u.raw_user_meta_data->>'avatar_url', u.raw_user_meta_data->>'picture'),
          'source', 'direct'
        )::text
      ) AS referral_source,
      pg_catalog.coalesce(p.role, 'developer') AS role,
      pg_catalog.coalesce(p.interests, '{}'::text[]) AS interests,
      pg_catalog.coalesce(p.updated_at, u.created_at) AS updated_at,
      u.created_at,
      u.last_sign_in_at
    FROM auth.users u
    LEFT JOIN public.user_preferences p 
      ON p.user_key = 'supabase_' || u.id::text OR p.user_key = u.id::text
    ORDER BY u.created_at DESC
  ) u_row;

  RETURN pg_catalog.coalesce(result, '[]'::jsonb);
END;
$$;

REVOKE ALL ON FUNCTION public.get_admin_users() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_users() TO authenticated;

-- Catalog Sync RPC for automated sync workflows (daily pulse / GitHub Actions)
CREATE OR REPLACE FUNCTION public.sync_catalog_entry(entry_data jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Restrict execution to service role or platform administrators
  IF auth.role() <> 'service_role' AND NOT private.is_admin() THEN
    RAISE EXCEPTION 'Unauthorized: Only service role or platform administrators can sync catalog entries.';
  END IF;

  INSERT INTO public.entries (
    name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved
  ) VALUES (
    entry_data->>'name',
    entry_data->>'org',
    entry_data->>'type',
    entry_data->>'task',
    entry_data->>'license',
    CASE WHEN (entry_data->>'year') IS NOT NULL AND (entry_data->>'year') ~ '^\d+$' THEN (entry_data->>'year')::int ELSE NULL END,
    entry_data->>'size',
    entry_data->>'summary',
    entry_data->>'architecture',
    entry_data->>'usage',
    entry_data->>'benchmarks',
    entry_data->>'limitations',
    entry_data->>'url',
    pg_catalog.coalesce(entry_data->'citations', '[]'::jsonb),
    pg_catalog.coalesce((entry_data->>'popular')::boolean, false),
    true
  )
  ON CONFLICT (name) DO UPDATE SET
    org = EXCLUDED.org,
    type = EXCLUDED.type,
    task = EXCLUDED.task,
    license = EXCLUDED.license,
    year = EXCLUDED.year,
    size = EXCLUDED.size,
    summary = EXCLUDED.summary,
    architecture = EXCLUDED.architecture,
    usage = EXCLUDED.usage,
    benchmarks = EXCLUDED.benchmarks,
    limitations = EXCLUDED.limitations,
    url = EXCLUDED.url,
    citations = EXCLUDED.citations,
    popular = EXCLUDED.popular,
    approved = true;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_catalog_entry(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.sync_catalog_entry(jsonb) TO authenticated, service_role;


