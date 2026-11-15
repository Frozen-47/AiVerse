import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const logsFilePath = path.join(rootDir, 'public', 'data', 'github_action_logs.json');

// Ensure public/data directory exists
const publicDataDir = path.join(rootDir, 'public', 'data');
if (!fs.existsSync(publicDataDir)) {
  fs.mkdirSync(publicDataDir, { recursive: true });
}

/**
 * Record an automated execution log from GitHub Actions (or local script run)
 * Persists locally to public/data/github_action_logs.json AND pushes to Supabase admin_audit_logs.
 */
export async function logActionExecution({
  workflow,
  action,
  status = 'success',
  summary,
  details,
  metadata = {}
}) {
  const timestamp = new Date().toISOString();
  const logId = `action_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  
  const logEntry = {
    id: logId,
    created_at: timestamp,
    timestamp,
    workflow,
    action,
    status, // 'success' | 'warning' | 'error'
    actor_email: 'github-actions[bot]',
    summary,
    details: typeof details === 'string' ? details : JSON.stringify(details, null, 2),
    metadata: {
      ...metadata,
      runId: process.env.GITHUB_RUN_ID || 'local-manual-run',
      runNumber: process.env.GITHUB_RUN_NUMBER || '1',
      sha: process.env.GITHUB_SHA ? process.env.GITHUB_SHA.substring(0, 7) : 'local',
      ref: process.env.GITHUB_REF || 'local',
      workflow
    }
  };

  // 1. Persist to public/data/github_action_logs.json
  try {
    let existingLogs = [];
    if (fs.existsSync(logsFilePath)) {
      try {
        existingLogs = JSON.parse(fs.readFileSync(logsFilePath, 'utf-8'));
        if (!Array.isArray(existingLogs)) existingLogs = [];
      } catch {
        existingLogs = [];
      }
    }

    // Prepend latest log entry and limit to 100 entries to prevent unbounded growth
    existingLogs.unshift(logEntry);
    if (existingLogs.length > 100) {
      existingLogs = existingLogs.slice(0, 100);
    }

    fs.writeFileSync(logsFilePath, JSON.stringify(existingLogs, null, 2), 'utf-8');
    console.log(`[Action Logger] 📝 Recorded run to public/data/github_action_logs.json (${logId})`);
  } catch (err) {
    console.warn('[Action Logger] Local log file write warning:', err.message);
  }

  // 2. Persist to Supabase table admin_audit_logs if service role credentials exist
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (supabaseUrl && serviceRoleKey) {
    try {
      const cleanUrl = supabaseUrl.replace(/\/+$/, '');
      const resp = await fetch(`${cleanUrl}/rest/v1/admin_audit_logs`, {
        method: 'POST',
        headers: {
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          actor_email: 'github-actions[bot]',
          action,
          details: `${summary} — ${logEntry.details}`,
          metadata: logEntry
        })
      });

      if (resp.ok) {
        console.log(`[Action Logger] ☁️ Pushed audit log to Supabase admin_audit_logs table.`);
      } else {
        const txt = await resp.text();
        console.warn(`[Action Logger] Supabase log insert notice (HTTP ${resp.status}):`, txt);
      }
    } catch (dbErr) {
      console.warn('[Action Logger] Supabase log push notice (continuing):', dbErr.message);
    }
  }

  return logEntry;
}
