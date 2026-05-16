import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_project_url')) {
  console.error('Error: Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Reading local data.ts...');
  // Since data.ts is written in TS, we'll just extract the JSON-like payload via regex or we can just import it if using ts-node.
  // For simplicity, I'll extract it using a regex hack since it's a simple export const entries = [ ... ];
  const dataPath = path.resolve(__dirname, '../src/data.ts');
  const dataContent = fs.readFileSync(dataPath, 'utf-8');
  
  // Remove TS specific syntax
  const jsContent = dataContent
    .replace(/import type .*?;/g, '')
    .replace(/export const entries: Entry\[\] =/g, 'const entries =')
    .replace(/export const /g, 'const ') + '\nreturn entries;';
  
  let entries;
  try {
    const getEntries = new Function(jsContent);
    entries = getEntries();
  } catch (e) {
    console.error('Failed to parse entries array:', e);
    process.exit(1);
  }


  console.log(`Found ${entries.length} entries. Seeding to Supabase...`);

  const entriesWithApproved = entries.map(e => ({ ...e, approved: true }));
  const { error } = await supabase.from('entries').insert(entriesWithApproved);
  
  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('Successfully seeded database!');
  }
}

seed();
