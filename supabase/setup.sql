-- Prefer running all.sql once (tables + RLS).
-- This file is kept for reference; same tables as all.sql (part 1).

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
  approved BOOLEAN DEFAULT false
);

ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Onboarding preferences (see user_preferences.sql)
CREATE TABLE IF NOT EXISTS user_preferences (
  user_key TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  interests TEXT[] NOT NULL DEFAULT '{}',
  referral_source TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Ratings & comments (see entry_feedback.sql)
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

CREATE INDEX IF NOT EXISTS entry_ratings_entry_name_idx ON entry_ratings (entry_name);
CREATE INDEX IF NOT EXISTS entry_comments_entry_name_idx ON entry_comments (entry_name, created_at DESC);

ALTER TABLE entry_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_comments ENABLE ROW LEVEL SECURITY;

-- RLS policies: run rls_policies.sql after this file.

-- ─── Administrative RPC Functions ──────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.delete_user_by_admin(target_user_key text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_catalog
AS $$
DECLARE
  raw_uuid_text text;
  target_uuid uuid;
  caller_email text;
  caller_sub text;
  caller_role text;
BEGIN
  caller_email := auth.jwt() ->> 'email';
  caller_sub := auth.jwt() ->> 'sub';
  caller_role := auth.jwt() -> 'user_metadata' ->> 'role';

  IF NOT (
    caller_email = 'frozennheart47@gmail.com' 
    OR caller_sub = '20f48b0a-737d-4b78-9098-847a8ba450e8'
    OR caller_role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Unauthorized: Only platform administrators can delete accounts.';
  END IF;

  IF target_user_key LIKE 'supabase_%' THEN
    raw_uuid_text := substring(target_user_key from 10);
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

CREATE OR REPLACE FUNCTION public.delete_own_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_catalog
AS $$
BEGIN
  RAISE EXCEPTION 'Permission Denied: User accounts cannot be deleted directly. Account deletions require administrator review and approval. Please submit a deletion request from your profile settings.';
END;
$$;

REVOKE ALL ON FUNCTION public.delete_own_account() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.request_account_deletion(reason text DEFAULT '')
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_catalog
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
      jsonb_build_object(
        'source', 'direct',
        'deletionRequested', true,
        'deletionReason', COALESCE(reason, ''),
        'deletionRequestedAt', now()::text
      )::text,
      now()
    );
  ELSE
    BEGIN
      meta := current_pref.referral_source::jsonb;
    EXCEPTION WHEN OTHERS THEN
      meta := jsonb_build_object('source', COALESCE(current_pref.referral_source, 'direct'));
    END;

    meta := meta || jsonb_build_object(
      'deletionRequested', true,
      'deletionReason', COALESCE(reason, ''),
      'deletionRequestedAt', now()::text
    );

    UPDATE public.user_preferences
    SET referral_source = meta::text,
        updated_at = now()
    WHERE user_key = current_pref.user_key;
  END IF;

  RETURN jsonb_build_object('success', true, 'message', 'Account deletion request submitted for administrator review.');
END;
$$;

REVOKE ALL ON FUNCTION public.request_account_deletion(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.request_account_deletion(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.cancel_account_deletion_request()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_catalog
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
          updated_at = now()
      WHERE user_key = current_pref.user_key;
    EXCEPTION WHEN OTHERS THEN
      -- Ignore non-json
    END;
  END IF;

  RETURN jsonb_build_object('success', true, 'message', 'Account deletion request cancelled.');
END;
$$;

REVOKE ALL ON FUNCTION public.cancel_account_deletion_request() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.cancel_account_deletion_request() TO authenticated;

CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_catalog
AS $$
DECLARE
  caller_email text;
  caller_sub text;
  caller_role text;
  result jsonb;
BEGIN
  caller_email := auth.jwt() ->> 'email';
  caller_sub := auth.jwt() ->> 'sub';
  caller_role := auth.jwt() -> 'user_metadata' ->> 'role';

  IF NOT (
    caller_email = 'frozennheart47@gmail.com'
    OR caller_sub = '20f48b0a-737d-4b78-9098-847a8ba450e8'
    OR caller_role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT jsonb_agg(u_row) INTO result
  FROM (
    SELECT 
      u.id::text AS user_id,
      'supabase_' || u.id::text AS user_key,
      u.email,
      COALESCE(
        p.referral_source,
        jsonb_build_object(
          'displayName', COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
          'avatarUrl', COALESCE(u.raw_user_meta_data->>'avatar_url', u.raw_user_meta_data->>'picture'),
          'source', 'direct'
        )::text
      ) AS referral_source,
      COALESCE(p.role, 'developer') AS role,
      COALESCE(p.interests, '{}'::text[]) AS interests,
      COALESCE(p.updated_at, u.created_at) AS updated_at,
      u.created_at,
      u.last_sign_in_at
    FROM auth.users u
    LEFT JOIN public.user_preferences p 
      ON p.user_key = 'supabase_' || u.id::text OR p.user_key = u.id::text
    ORDER BY u.created_at DESC
  ) u_row;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

REVOKE ALL ON FUNCTION public.get_admin_users() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_users() TO authenticated;

