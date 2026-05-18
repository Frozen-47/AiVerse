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

-- Ratings & comments (see supabase_entry_feedback.sql for migration-only script)
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

DROP POLICY IF EXISTS "Allow public read ratings" ON entry_ratings;
CREATE POLICY "Allow public read ratings" ON entry_ratings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert ratings" ON entry_ratings;
CREATE POLICY "Allow public insert ratings" ON entry_ratings FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update ratings" ON entry_ratings;
CREATE POLICY "Allow public update ratings" ON entry_ratings FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public read comments" ON entry_comments;
CREATE POLICY "Allow public read comments" ON entry_comments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert comments" ON entry_comments;
CREATE POLICY "Allow public insert comments" ON entry_comments FOR INSERT WITH CHECK (true);
