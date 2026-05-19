-- =============================================================================
-- Enable Public Read Access for user_preferences
-- Run this in your Supabase SQL Editor to support public profile pages.
-- =============================================================================

-- Drop the restrictive SELECT policy
DROP POLICY IF EXISTS "Read own preferences" ON user_preferences;

-- Recreate SELECT policy to allow anyone to read profiles
CREATE POLICY "Read own preferences"
  ON user_preferences FOR SELECT
  USING (true);
