-- Run this in the Supabase SQL Editor if you already have the `entries` table.
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS.

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
