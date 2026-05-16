import { createClient } from '@supabase/supabase-js';
import type { Entry } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Throw a more helpful error if keys are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.");
}

export const supabase = createClient(
  supabaseUrl || 'http://placeholder.com',
  supabaseAnonKey || 'placeholder'
);

// Helper function to insert an entry
export const insertEntry = async (entry: Partial<Entry>) => {
  const { data, error } = await supabase
    .from('entries')
    .insert([entry])
    .select();
  
  if (error) throw error;
  return data;
};

// Helper function to fetch all entries
export const fetchEntries = async () => {
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data as Entry[];
};
