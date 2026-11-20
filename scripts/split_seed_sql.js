import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function escapeJson(obj) {
  if (!obj) return "'[]'::jsonb";
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

function formatSqlForEntries(entries, title) {
  let sql = `-- =============================================================================\n`;
  sql += `-- AiVerse: ${title} (${entries.length} entries)\n`;
  sql += `-- Run this script in Supabase Dashboard -> SQL Editor\n`;
  sql += `-- =============================================================================\n\n`;
  sql += `-- 1. Ensure platform administrator authorization includes both platform owner emails\n`;
  sql += `CREATE OR REPLACE FUNCTION private.is_admin()\n`;
  sql += `RETURNS boolean\n`;
  sql += `LANGUAGE sql\n`;
  sql += `STABLE\n`;
  sql += `SECURITY INVOKER\n`;
  sql += `SET search_path = ''\n`;
  sql += `AS $$\n`;
  sql += `  SELECT \n`;
  sql += `    auth.jwt() ->> 'email' IN ('frozennheart47@gmail.com', 'sabareeshgm47@gmail.com')\n`;
  sql += `    OR auth.jwt() ->> 'sub' = '20f48b0a-737d-4b78-9098-847a8ba450e8'\n`;
  sql += `    OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin';\n`;
  sql += `$$;\n\n`;
  sql += `GRANT EXECUTE ON FUNCTION private.is_admin() TO anon, authenticated;\n\n`;
  sql += `-- 2. Upsert ${entries.length} entries into public.entries\n\n`;

  for (const e of entries) {
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
  return sql;
}

const dataTsContent = fs.readFileSync(path.join(rootDir, 'src', 'data.ts'), 'utf8');
const jsContent = dataTsContent
  .replace(/import type .*?;/g, '')
  .replace(/export const entries: Entry\[\] =/g, 'const entries =')
  .replace(/export const /g, 'const ') + '\nreturn entries;';
const allEntries = new Function(jsContent)();

// 1. The 191 newly approved entries (entries 575 to 766) that are missing from Supabase
const missing191 = allEntries.slice(575);
console.log(`Writing seed_missing_191.sql for ${missing191.length} entries...`);
const missingSql = formatSqlForEntries(missing191, 'Newly Approved Entries Sync');
const missingPath = path.join(rootDir, 'supabase', 'seed_missing_191.sql');
fs.writeFileSync(missingPath, missingSql, 'utf8');
console.log(`✓ supabase/seed_missing_191.sql created (${(fs.statSync(missingPath).size / 1024).toFixed(1)} KB)`);

// 2. Part 1 and Part 2 (if full catalog is ever needed to run in two halves)
const part1 = allEntries.slice(0, 383);
const part2 = allEntries.slice(383);
const p1Path = path.join(rootDir, 'supabase', 'seed_part1.sql');
const p2Path = path.join(rootDir, 'supabase', 'seed_part2.sql');
fs.writeFileSync(p1Path, formatSqlForEntries(part1, 'Full Catalog Part 1 of 2'), 'utf8');
fs.writeFileSync(p2Path, formatSqlForEntries(part2, 'Full Catalog Part 2 of 2'), 'utf8');
console.log(`✓ supabase/seed_part1.sql created (${(fs.statSync(p1Path).size / 1024).toFixed(1)} KB)`);
console.log(`✓ supabase/seed_part2.sql created (${(fs.statSync(p2Path).size / 1024).toFixed(1)} KB)`);
