-- Fresh Supabase project: run this entire file once.
-- Existing project with `entries` already: run supabase_user_preferences.sql instead.

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

DROP POLICY IF EXISTS "Allow public read access" ON entries;
CREATE POLICY "Allow public read access"
  ON entries FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public inserts" ON entries;
CREATE POLICY "Allow public inserts"
  ON entries FOR INSERT
  WITH CHECK (true);

-- Onboarding preferences (see supabase_user_preferences.sql for migration-only script)
CREATE TABLE IF NOT EXISTS user_preferences (
  user_key TEXT PRIMARY KEY,
  email TEXT,
  role TEXT NOT NULL,
  interests TEXT[] NOT NULL DEFAULT '{}',
  referral_source TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read preferences" ON user_preferences;
CREATE POLICY "Allow public read preferences"
  ON user_preferences FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public upsert preferences" ON user_preferences;
CREATE POLICY "Allow public upsert preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update preferences" ON user_preferences;
CREATE POLICY "Allow public update preferences"
  ON user_preferences FOR UPDATE
  USING (true);
