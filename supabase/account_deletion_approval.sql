-- =============================================================================
-- AiVerse — Account Deletion Approval & Policy Workflow
-- Run this in your Supabase Project -> SQL Editor
--
-- Security Policy:
--   Regular users DO NOT have permission to delete their account directly.
--   Users must submit an account deletion request with an optional reason.
--   Only platform administrators can approve and permanently delete accounts.
-- =============================================================================

-- ─── 1. Disable Direct Self-Deletion ─────────────────────────────────────────
-- Any attempt by non-admins to call delete_own_account will raise an exception.
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


-- ─── 2. User Function: Request Account Deletion ──────────────────────────────
-- Submits an account deletion request for administrator review.
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

  -- Load existing preference record
  SELECT * INTO current_pref FROM public.user_preferences 
  WHERE user_key = calling_user_key OR user_key = calling_user_id::text
  LIMIT 1;

  IF current_pref IS NULL THEN
    -- Insert new record if one does not exist
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

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Account deletion request submitted. An administrator will review your request.'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.request_account_deletion(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.request_account_deletion(text) TO authenticated;


-- ─── 3. User Function: Cancel Account Deletion Request ────────────────────────
-- Allows a user to withdraw a pending deletion request.
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
      -- In case referral_source was not json
    END;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Account deletion request has been cancelled.'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.cancel_account_deletion_request() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.cancel_account_deletion_request() TO authenticated;


-- ─── 4. Admin Function: Delete any user account completely ───────────────────
-- (Remains strict administrator-only)
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
  -- Extract calling user claims safely
  caller_email := auth.jwt() ->> 'email';
  caller_sub := auth.jwt() ->> 'sub';
  caller_role := auth.jwt() -> 'user_metadata' ->> 'role';

  -- Verify caller is an administrator
  IF NOT (
    caller_email = 'frozennheart47@gmail.com' 
    OR caller_sub = '20f48b0a-737d-4b78-9098-847a8ba450e8'
    OR caller_role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Unauthorized: Only platform administrators can delete accounts.';
  END IF;

  -- Normalize target key: extract raw UUID whether formatted as 'supabase_<uuid>' or '<uuid>'
  IF target_user_key LIKE 'supabase_%' THEN
    raw_uuid_text := substring(target_user_key from 10);
  ELSE
    raw_uuid_text := target_user_key;
  END IF;

  -- Prevent admin from accidentally deleting the primary administrator account
  IF raw_uuid_text = '20f48b0a-737d-4b78-9098-847a8ba450e8' THEN
    RAISE EXCEPTION 'Security error: You cannot delete the primary admin account.';
  END IF;

  -- 1. Delete from application tables
  DELETE FROM public.user_preferences 
    WHERE user_key = target_user_key 
       OR user_key = 'supabase_' || raw_uuid_text 
       OR user_key = raw_uuid_text;

  DELETE FROM public.user_bookmarks 
    WHERE user_key = target_user_key 
       OR user_key = 'supabase_' || raw_uuid_text 
       OR user_key = raw_uuid_text;

  DELETE FROM public.entry_ratings 
    WHERE user_key = target_user_key 
       OR user_key = 'supabase_' || raw_uuid_text 
       OR user_key = raw_uuid_text;

  DELETE FROM public.entry_comments 
    WHERE user_key = target_user_key 
       OR user_key = 'supabase_' || raw_uuid_text 
       OR user_key = raw_uuid_text;

  UPDATE public.entries 
    SET submitted_by = NULL 
    WHERE submitted_by = target_user_key 
       OR submitted_by = 'supabase_' || raw_uuid_text 
       OR submitted_by = raw_uuid_text;

  -- 2. Delete completely from auth.users (cascades sessions, identities, OAuth tokens)
  BEGIN
    target_uuid := raw_uuid_text::uuid;
    DELETE FROM auth.users WHERE id = target_uuid;
  EXCEPTION WHEN OTHERS THEN
    -- Non-UUID keys fallback
  END;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_user_by_admin(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_user_by_admin(text) TO authenticated;
