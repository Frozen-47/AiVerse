-- Execute this script in the Supabase SQL Editor to create the 'entries' table

CREATE TABLE entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
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
  popular BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous reads
CREATE POLICY "Allow public read access" 
  ON entries FOR SELECT 
  USING (true);

-- Create policy to allow anonymous inserts (since we are taking submissions from users directly)
-- Note: In a production app, you might want to require authentication or add spam protection.
CREATE POLICY "Allow public inserts" 
  ON entries FOR INSERT 
  WITH CHECK (true);
