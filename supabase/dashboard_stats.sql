-- Enable read access to all users (including anonymous) for user_preferences so we can count them for dashboard stats.
-- Alternatively, if we only want aggregate access, we might create a database function to return the stats without exposing the table. 
-- But this policy allows basic SELECT.

-- Ensure RLS is enabled on user_preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to select (read) from user_preferences for dashboard metrics
CREATE POLICY "Allow public read access for dashboard stats on user_preferences"
ON public.user_preferences
FOR SELECT
TO public
USING (true);

-- Policy for entries (if not already public)
CREATE POLICY "Allow public read access on entries"
ON public.entries
FOR SELECT
TO public
USING (true);
