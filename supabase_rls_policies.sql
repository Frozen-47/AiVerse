-- Refresh RLS helpers + policies. Safe to re-run. Prefer supabase_all.sql for new projects.

-- ─── Helpers (private schema — not exposed via /rest/v1/rpc) ─────────────────

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

DROP FUNCTION IF EXISTS public.can_access_user_key(text);
DROP FUNCTION IF EXISTS public.app_user_key();
DROP FUNCTION IF EXISTS public.is_guest_user_key(text);
DROP FUNCTION IF EXISTS public.is_admin();

-- ─── entries ─────────────────────────────────────────────────────────────────

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

-- ─── user_preferences ────────────────────────────────────────────────────────

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

-- ─── entry_ratings ───────────────────────────────────────────────────────────

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

-- ─── entry_comments ──────────────────────────────────────────────────────────

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

-- ─── user_bookmarks ──────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Allow public read bookmarks" ON user_bookmarks;
DROP POLICY IF EXISTS "Read own bookmarks" ON user_bookmarks;
CREATE POLICY "Read own bookmarks"
  ON user_bookmarks FOR SELECT
  USING (user_key = private.app_user_key());

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
