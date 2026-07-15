-- Included in all.sql. Run this only if you add feedback tables on an old project.

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
