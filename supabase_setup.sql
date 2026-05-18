-- Prefer running supabase_all.sql once (tables + RLS).
-- This file is kept for reference; same tables as supabase_all.sql (part 1).

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

-- Onboarding preferences (see supabase_user_preferences.sql)
CREATE TABLE IF NOT EXISTS user_preferences (
  user_key TEXT PRIMARY KEY,
  email TEXT,
  role TEXT NOT NULL,
  interests TEXT[] NOT NULL DEFAULT '{}',
  referral_source TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Ratings & comments (see supabase_entry_feedback.sql)
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

-- RLS policies: run supabase_rls_policies.sql after this file.
