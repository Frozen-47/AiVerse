-- Included in all.sql. Run this only if you add bookmarks on an old project.

CREATE TABLE IF NOT EXISTS user_bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_key TEXT NOT NULL,
  entry_name TEXT NOT NULL REFERENCES entries(name) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_key, entry_name)
);

CREATE INDEX IF NOT EXISTS user_bookmarks_user_key_idx ON user_bookmarks (user_key, created_at DESC);

ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
