import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const [k, ...v] = line.split('=');
  if (k) env[k.trim()] = v.join('=').trim();
}
const url = env.VITE_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;
const sb = createClient(url, key);

// Read local data.ts
const dataTs = fs.readFileSync('src/data.ts', 'utf-8');
const jsContent = dataTs
  .replace(/import type .*?;/g, '')
  .replace(/export const entries: Entry\[\] =/g, 'const entries =')
  .replace(/export const /g, 'const ') + '\nreturn entries;';
const localEntries = new Function(jsContent)();

async function run() {
  console.log(`Starting sync of ${localEntries.length} entries to Supabase...`);
  let successCount = 0;
  let failCount = 0;

  // Process in batches of 20 concurrent updates
  const batchSize = 20;
  for (let i = 0; i < localEntries.length; i += batchSize) {
    const chunk = localEntries.slice(i, i + batchSize);
    await Promise.all(
      chunk.map(async (e) => {
        try {
          const { error } = await sb
            .from('entries')
            .update({
              summary: e.summary,
              architecture: e.architecture,
              benchmarks: e.benchmarks,
              limitations: e.limitations,
              usage: e.usage,
              citations: e.citations,
              url: e.url,
              year: e.year,
              size: e.size,
              popular: e.popular
            })
            .eq('name', e.name);

          if (error) {
            console.error(`Failed to update ${e.name}:`, error.message);
            failCount++;
          } else {
            successCount++;
          }
        } catch (err) {
          console.error(`Exception updating ${e.name}:`, err);
          failCount++;
        }
      })
    );
    console.log(`Progress: ${Math.min(i + batchSize, localEntries.length)}/${localEntries.length} synced (Success: ${successCount}, Fail: ${failCount})`);
  }

  console.log(`Finished sync! Success: ${successCount}, Failures: ${failCount}`);
}

run();
