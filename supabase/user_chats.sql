-- =============================================================================
-- AiVerse — User Chat Sessions Table & Admin Governance
-- Run this in your Supabase Project -> SQL Editor
-- Safe to re-run multiple times (idempotent)
-- =============================================================================

-- ─── 1. USER CHATS TABLE ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_chats (
  id TEXT PRIMARY KEY,
  user_key TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'New conversation',
  mode TEXT NOT NULL DEFAULT 'flagship',
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure all columns exist if created previously
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS user_key TEXT NOT NULL DEFAULT '';
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT 'New conversation';
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS mode TEXT NOT NULL DEFAULT 'flagship';
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS messages JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.user_chats ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Index for high-performance lookup by user account
CREATE INDEX IF NOT EXISTS user_chats_user_key_idx ON public.user_chats (user_key, updated_at DESC);

-- Enable Row Level Security
ALTER TABLE public.user_chats ENABLE ROW LEVEL SECURITY;

-- ─── 2. ROW LEVEL SECURITY POLICIES ──────────────────────────────────────────

-- Users can read their own chats; Admins can read all chats
DROP POLICY IF EXISTS "Users can read own chats" ON public.user_chats;
CREATE POLICY "Users can read own chats"
  ON public.user_chats FOR SELECT
  USING (
    user_key = private.app_user_key()
    OR user_key = (auth.jwt() ->> 'sub')
    OR private.can_access_user_key(user_key)
    OR private.is_admin()
  );

-- Users can insert their own chats; Admins can insert
DROP POLICY IF EXISTS "Users can insert own chats" ON public.user_chats;
CREATE POLICY "Users can insert own chats"
  ON public.user_chats FOR INSERT
  WITH CHECK (
    user_key = private.app_user_key()
    OR user_key = (auth.jwt() ->> 'sub')
    OR private.can_access_user_key(user_key)
    OR private.is_admin()
  );

-- Users can update their own chats; Admins can update
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

-- Users can delete their own chats; Admins can delete any user chat
DROP POLICY IF EXISTS "Users can delete own chats" ON public.user_chats;
CREATE POLICY "Users can delete own chats"
  ON public.user_chats FOR DELETE
  USING (
    user_key = private.app_user_key()
    OR user_key = (auth.jwt() ->> 'sub')
    OR private.can_access_user_key(user_key)
    OR private.is_admin()
  );

-- ─── 3. ADMIN RPC: CLEAR USER CHATS ─────────────────────────────────────────

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
    -- Delete single session
    DELETE FROM public.user_chats
    WHERE id = target_session_id
      AND (
        user_key = target_user_key
        OR user_key = 'supabase_' || raw_uuid_text
        OR user_key = raw_uuid_text
      );
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
  ELSE
    -- Delete all sessions for the target user
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
