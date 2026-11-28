import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import {
  canonicalEntryKey,
  isUnnecessaryOrSpamEntry,
  normalizeLicense,
  sanitizeAndDeduplicateCatalog,
  sanitizeEntryRecord,
} from '../src/lib/catalogCleanupCore.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read .env if present
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function escapeJson(obj) {
  if (!obj) return "'[]'::jsonb";
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

function sanitizeEntry(entry) {
  const cleaned = sanitizeEntryRecord({
    ...entry,
    name: String(entry.name || '').trim(),
    org: entry.org ? String(entry.org).trim() : 'Independent',
    type: String(entry.type || 'Model').trim(),
    task: String(entry.task || 'NLP').trim(),
    license: entry.license ? String(entry.license).trim() : 'Community',
    year: typeof entry.year === 'number' ? entry.year : (entry.year ? parseInt(String(entry.year), 10) || new Date().getFullYear() : new Date().getFullYear()),
    size: entry.size ? String(entry.size).trim() : 'N/A',
    summary: String(entry.summary || '').trim(),
    architecture: entry.architecture ? String(entry.architecture).trim() : 'N/A',
    usage: entry.usage ? String(entry.usage).trim() : undefined,
    benchmarks: entry.benchmarks ? String(entry.benchmarks).trim() : 'N/A',
    limitations: entry.limitations ? String(entry.limitations).trim() : 'N/A',
    url: entry.url ? String(entry.url).trim() : undefined,
    citations: Array.isArray(entry.citations) ? entry.citations : [],
    popular: Boolean(entry.popular),
  });
  return {
    ...cleaned,
    approved: true,
    description: cleaned.summary,
  };
}

async function main() {
  console.log('=== AiVerse Catalog Approval & Static Synchronization ===\n');

  // 1. Read pending_pulse_requests.json
  const pendingPath = path.join(rootDir, 'public', 'data', 'pending_pulse_requests.json');
  if (!fs.existsSync(pendingPath)) {
    console.log('No pending requests file found at:', pendingPath);
    return;
  }

  let pendingList = [];
  try {
    pendingList = JSON.parse(fs.readFileSync(pendingPath, 'utf-8'));
  } catch (err) {
    console.error('Error reading pending_pulse_requests.json:', err.message);
    return;
  }

  if (!Array.isArray(pendingList) || pendingList.length === 0) {
    console.log('✓ Pending review queue is already clean (0 items in pending_pulse_requests.json).');
    return;
  }

  console.log(`Found ${pendingList.length} total pending review item(s) in pending_pulse_requests.json.`);

  // 2. Read existing entries from src/data.ts
  const dataTsPath = path.join(rootDir, 'src', 'data.ts');
  const dataTsContent = fs.readFileSync(dataTsPath, 'utf-8');

  const jsContent = dataTsContent
    .replace(/import type .*?;/g, '')
    .replace(/export const entries: Entry\[\] =/g, 'const entries =')
    .replace(/export const /g, 'const ') + '\nreturn entries;';

  let existingEntries = [];
  try {
    const getEntries = new Function(jsContent);
    existingEntries = getEntries();
  } catch (err) {
    console.error('Failed to parse existing src/data.ts entries:', err.message);
    return;
  }

  console.log(`Current static catalog entries in src/data.ts: ${existingEntries.length}`);

  const existingKeys = new Set(existingEntries.map(e => canonicalEntryKey(e.name || '')));

  // 3. Filter items to approve that are valid, non-spam, and not yet in src/data.ts
  const newlyApproved = [];
  for (const item of pendingList) {
    if (!item || !item.name || isUnnecessaryOrSpamEntry(item)) continue;
    const cleanItem = sanitizeEntry(item);
    const key = canonicalEntryKey(cleanItem.name);
    if (key && !existingKeys.has(key)) {
      newlyApproved.push(cleanItem);
      existingKeys.add(key);
    }
  }

  console.log(`New entries to approve and append: ${newlyApproved.length}`);

  if (newlyApproved.length === 0) {
    console.log('All items in pending queue already exist in src/data.ts.');
    // Prune pending list since they are already in catalog
    fs.writeFileSync(pendingPath, '[]\n', 'utf-8');
    console.log('✓ Pruned pending_pulse_requests.json.');
    return;
  }

  // 4. Merge & enforce catalog invariants
  const updatedEntries = sanitizeAndDeduplicateCatalog([...existingEntries, ...newlyApproved]).map(e => ({
    ...e,
    approved: true,
  }));
  console.log(`Updated catalog total: ${updatedEntries.length} entries.`);

  // 5. Write updated src/data.ts
  const tsOutput = `import type { Entry } from './types';

export const entries: Entry[] = ${JSON.stringify(updatedEntries, null, 2)};

export const typeFilters = ["All", "AI", "Framework", "Dataset", "Platform", "Model"];

export const taskFilters = [
  "All Tasks",
  "NLP",
  "Computer Vision",
  "MLOps",
  "Audio",
  "Multimodal",
  "AI Coding",
  "Image Generation",
  "Video Generation",
  "Productivity",
  "Education",
  "Research"
];
`;
  fs.writeFileSync(dataTsPath, tsOutput, 'utf-8');
  console.log(`✓ Updated src/data.ts with ${updatedEntries.length} entries.`);

  // 6. Clear approved items from pending_pulse_requests.json
  fs.writeFileSync(pendingPath, '[]\n', 'utf-8');
  console.log('✓ Cleared public/data/pending_pulse_requests.json review queue.');

  // 7. Update newly_added_models.json history status
  const historyPath = path.join(rootDir, 'public', 'data', 'newly_added_models.json');
  if (fs.existsSync(historyPath)) {
    try {
      let history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'));
      if (Array.isArray(history)) {
        history.forEach(batch => {
          if (batch.status === 'queued_in_review_list') {
            batch.status = 'approved_in_catalog';
          }
        });
        fs.writeFileSync(historyPath, JSON.stringify(history.slice(0, 100), null, 2), 'utf-8');
        console.log('✓ Updated public/data/newly_added_models.json statuses to approved_in_catalog.');
      }
    } catch {}
  }

  // 8. Update public/data.json if present
  const publicDataJsonPath = path.join(rootDir, 'public', 'data.json');
  if (fs.existsSync(publicDataJsonPath)) {
    try {
      const pData = JSON.parse(fs.readFileSync(publicDataJsonPath, 'utf-8'));
      pData.entries = updatedEntries.map(e => ({ ...e, approved: true }));
      fs.writeFileSync(publicDataJsonPath, JSON.stringify(pData, null, 2), 'utf-8');
      console.log('✓ Updated public/data.json with full catalog.');
    } catch {}
  }

  // 9. Update public/data/catalog_stats.json preserving full Dashboard stats schema
  const statsPath = path.join(rootDir, 'public', 'data', 'catalog_stats.json');
  try {
    let existingStats = {};
    if (fs.existsSync(statsPath)) {
      try { existingStats = JSON.parse(fs.readFileSync(statsPath, 'utf-8')); } catch {}
    }
    const byType = {};
    const byTask = {};
    const byLicense = {};
    updatedEntries.forEach(e => {
      byType[e.type] = (byType[e.type] || 0) + 1;
      byTask[e.task] = (byTask[e.task] || 0) + 1;
      const lic = normalizeLicense(e.license, e.type);
      byLicense[lic] = (byLicense[lic] || 0) + 1;
    });

    const stats = {
      timestamp: new Date().toISOString(),
      totalEntries: updatedEntries.length,
      popularEntries: updatedEntries.filter(e => e.popular).length,
      totalUsers: existingStats.totalUsers ?? 10,
      averageRating: existingStats.averageRating ?? 4.38,
      totalRatings: existingStats.totalRatings ?? 8,
      newEntriesCount: updatedEntries.filter(e => (e.year || 0) >= new Date().getFullYear() - 1).length,
      byType,
      byTask,
      byLicense,
      toolOfTheDay: existingStats.toolOfTheDay || updatedEntries.find(e => e.popular) || updatedEntries[0],
    };
    fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2) + '\n', 'utf-8');
    console.log('✓ Updated public/data/catalog_stats.json.');
  } catch {}

  // 10. Regenerate supabase/seed_entries.sql
  console.log('Regenerating supabase/seed_entries.sql...');
  let sql = `-- =============================================================================\n`;
  sql += `-- AiVerse: Complete Catalog Seed & Admin Policy Migration\n`;
  sql += `-- Run this entire script in Supabase Dashboard -> SQL Editor\n`;
  sql += `-- =============================================================================\n\n`;
  sql += `-- 1. Ensure platform administrator authorization includes both platform owner emails\n`;
  sql += `CREATE OR REPLACE FUNCTION private.is_admin()\n`;
  sql += `RETURNS boolean\n`;
  sql += `LANGUAGE sql\n`;
  sql += `STABLE\n`;
  sql += `SECURITY INVOKER\n`;
  sql += `SET search_path = ''\n`;
  sql += `AS $$\n`;
  sql += `  SELECT COALESCE(\n`;
  sql += `    lower(coalesce(auth.jwt() ->> 'email', '')) IN ('frozennheart47@gmail.com', 'sabareeshgm47@gmail.com')\n`;
  sql += `    OR auth.jwt() ->> 'sub' = '20f48b0a-737d-4b78-9098-847a8ba450e8'\n`;
  sql += `    OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin',\n`;
  sql += `    false\n`;
  sql += `  );\n`;
  sql += `$$;\n\n`;
  sql += `GRANT EXECUTE ON FUNCTION private.is_admin() TO anon, authenticated;\n\n`;
  sql += `-- 2. Upsert all ${updatedEntries.length} entries into public.entries\n\n`;

  for (const e of updatedEntries) {
    const name = escapeSql(e.name);
    const org = escapeSql(e.org || null);
    const type = escapeSql(e.type);
    const task = escapeSql(e.task);
    const license = escapeSql(e.license || null);
    const year = e.year ? e.year : 'NULL';
    const size = escapeSql(e.size || null);
    const summary = escapeSql(e.summary);
    const architecture = escapeSql(e.architecture || null);
    const usage = escapeSql(e.usage || null);
    const benchmarks = escapeSql(e.benchmarks || null);
    const limitations = escapeSql(e.limitations || null);
    const url = escapeSql(e.url || null);
    const citations = escapeJson(e.citations || []);
    const popular = e.popular ? 'true' : 'false';

    sql += `INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)\n`;
    sql += `VALUES (${name}, ${org}, ${type}, ${task}, ${license}, ${year}, ${size}, ${summary}, ${architecture}, ${usage}, ${benchmarks}, ${limitations}, ${url}, ${citations}, ${popular}, true)\n`;
    sql += `ON CONFLICT (name) DO UPDATE SET\n`;
    sql += `  org = EXCLUDED.org,\n`;
    sql += `  type = EXCLUDED.type,\n`;
    sql += `  task = EXCLUDED.task,\n`;
    sql += `  license = EXCLUDED.license,\n`;
    sql += `  year = EXCLUDED.year,\n`;
    sql += `  size = EXCLUDED.size,\n`;
    sql += `  summary = EXCLUDED.summary,\n`;
    sql += `  architecture = EXCLUDED.architecture,\n`;
    sql += `  usage = EXCLUDED.usage,\n`;
    sql += `  benchmarks = EXCLUDED.benchmarks,\n`;
    sql += `  limitations = EXCLUDED.limitations,\n`;
    sql += `  url = EXCLUDED.url,\n`;
    sql += `  citations = EXCLUDED.citations,\n`;
    sql += `  popular = EXCLUDED.popular,\n`;
    sql += `  approved = true;\n\n`;
  }

  const outSqlPath = path.join(rootDir, 'supabase', 'seed_entries.sql');
  fs.writeFileSync(outSqlPath, sql, 'utf-8');
  console.log(`✓ Successfully updated supabase/seed_entries.sql (${(fs.statSync(outSqlPath).size / 1024).toFixed(1)} KB).`);

  // 11. Sync directly to Supabase if credentials available
  if (supabaseUrl && supabaseKey) {
    console.log(`\nSyncing ${newlyApproved.length} newly approved items to Supabase (${supabaseUrl})...`);
    const sb = createClient(supabaseUrl, supabaseKey);

    const dbPayload = newlyApproved.map(e => ({
      name: e.name,
      org: e.org || null,
      type: e.type,
      task: e.task,
      license: e.license || null,
      year: e.year,
      size: e.size || null,
      summary: e.summary,
      architecture: e.architecture || null,
      usage: e.usage || null,
      benchmarks: e.benchmarks || null,
      limitations: e.limitations || null,
      url: e.url || null,
      citations: e.citations || [],
      popular: e.popular || false,
      approved: true
    }));

    const chunkSize = 25;
    let syncedCount = 0;
    let hasRlsError = false;

    for (let i = 0; i < dbPayload.length; i += chunkSize) {
      const chunk = dbPayload.slice(i, i + chunkSize);
      const { error } = await sb.from('entries').upsert(chunk, { onConflict: 'name' });
      if (error) {
        console.warn(`[Supabase Sync] Chunk ${Math.floor(i / chunkSize) + 1} notice:`, error.message);
        if (error.code === '42501') {
          hasRlsError = true;
        }
      } else {
        syncedCount += chunk.length;
      }
    }

    if (syncedCount > 0) {
      console.log(`✓ Direct Supabase sync successful: ${syncedCount}/${dbPayload.length} entries upserted as approved.`);
    }

    if (hasRlsError) {
      console.log('\n[Supabase Note] Direct insertion with the anon API key is restricted by table RLS policies.');
      console.log('To synchronize remote Supabase database:');
      console.log('1. Run supabase/seed_entries.sql directly in Supabase Dashboard -> SQL Editor (instant full sync).');
      console.log('2. OR provide SUPABASE_SERVICE_ROLE_KEY in .env to allow automated CLI write access.');
    }
  }

  console.log('\n=== Approval & Static Sync Complete! ===');
}

main().catch(err => {
  console.error('Fatal error in approve_pending.js:', err);
  process.exit(1);
});
