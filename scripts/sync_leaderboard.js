import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logActionExecution } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const targetFile = path.join(rootDir, 'src', 'data', 'leaderboardData.ts');

// Load .env if present
const envPath = path.resolve(rootDir, '.env');
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

async function fetchUrl(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

function parseTokens(num) {
  if (!num) return '128k';
  if (num >= 1000000) return `${Math.round(num / 1000000)}M`;
  if (num >= 1000) return `${Math.round(num / 1000)}k`;
  return `${num}`;
}

function sanitizeId(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function main() {
  const startTime = Date.now();
  console.log('🚀 Syncing AiVerse AI Frontier Benchmark Leaderboard...');

  // 1. Read existing models from src/data/leaderboardData.ts
  const currentContent = fs.readFileSync(targetFile, 'utf-8');
  const jsContent = currentContent
    .replace(/export interface .*?{[\s\S]*?}/g, '')
    .replace(/export const LEADERBOARD_MODELS: LeaderboardModel\[\] =/g, 'const m =') + '\nreturn m;';
  const getExisting = new Function(jsContent);
  const existingModels = getExisting();
  console.log(`[Baseline] Loaded ${existingModels.length} existing models from leaderboardData.ts`);

  const modelMap = new Map();
  for (const m of existingModels) {
    modelMap.set(m.id, m);
  }

  // 2. Fetch live data from Artificial Analysis Leaderboards
  let liveCount = 0;
  let priceUpdates = 0;
  try {
    console.log('[Artificial Analysis] Fetching live benchmark flight data...');
    const aaHtml = await fetchUrl('https://artificialanalysis.ai/leaderboards/models');
    const chunks = [];
    const re = /self\.__next_f\.push\(\[1,\s*"([\s\S]*?)"\]\)/g;
    let m;
    while ((m = re.exec(aaHtml)) !== null) chunks.push(m[1]);
    const combined = chunks.join('');
    const unescaped = combined.replace(/\\"/g, '"').replace(/\\\\/g, '\\');

    const regex = /\{"id":"([a-f0-9-]+)","release":\{"slug":"([^"]+)","name":"([^"]+)"\}(.*?)"modelCreatorName":"([^"]+)"(.*?)\}/g;
    let match;

    while ((match = regex.exec(unescaped)) !== null) {
      const slug = match[2];
      const releaseName = match[3];
      const middle = match[4];
      const creator = match[5];
      const rest = match[6];
      const full = middle + rest;

      const shortNameMatch = full.match(/"shortName":"([^"]+)"/);
      const nameMatch = full.match(/"name":"([^"]+)"/);
      const suffixMatch = full.match(/"suffix":(?:"([^"]+)"|null)/);
      const suffix = suffixMatch && suffixMatch[1] ? suffixMatch[1] : '';
      const name = shortNameMatch ? shortNameMatch[1] : (nameMatch ? nameMatch[1] : releaseName);

      const contextMatch = full.match(/"contextWindowTokens":(\d+)/);
      const contextTokens = contextMatch ? parseInt(contextMatch[1], 10) : 128000;
      const isOpenWeights = full.includes('"isOpenWeights":true');

      // Metric scores
      const intelMatch = full.match(/"intelligenceIndex":(\d+(?:\.\d+)?)/);
      const omniscienceMatch = full.match(/"omniscience":(\d+(?:\.\d+)?)/);
      const briefcaseMatch = full.match(/"aa-briefcase":(\d+(?:\.\d+)?)/);
      const accMatch = full.match(/"omniscience-accuracy":(\d+(?:\.\d+)?)/);
      const nonHalluMatch = full.match(/"omniscience-non-hallucination":(\d+(?:\.\d+)?)/);
      const autoBenchMatch = full.match(/"automationbench-aa":(\d+(?:\.\d+)?)/);
      const termSciMatch = full.match(/"terminal-bench-science":(\d+(?:\.\d+)?)/);
      const frontierMatch = full.match(/"frontiercode-2-0":(\d+(?:\.\d+)?)/);
      const hleMatch = full.match(/"hle-diamond":(\d+(?:\.\d+)?)/);
      const gdpMatch = full.match(/"gdp-pdf":(\d+(?:\.\d+)?)/);
      const term4Match = full.match(/"terminalbench-4-0":(\d+(?:\.\d+)?)/);
      const critMatch = full.match(/"critpt-v2-hard":(\d+(?:\.\d+)?)/);

      // Pricing & Performance
      const costMatch = full.match(/"intelligenceIndexCostPerTask":(\d+(?:\.\d+)?)/);
      const inPriceMatch = full.match(/"price1mInputTokens":(\d+(?:\.\d+)?)/);
      const outPriceMatch = full.match(/"price1mOutputTokens":(\d+(?:\.\d+)?)/);
      const cachePriceMatch = full.match(/"cacheHitPrice":(\d+(?:\.\d+)?)/);
      const speedMatch = full.match(/"outputSpeed":(\d+(?:\.\d+)?)/);
      const ttftMatch = full.match(/"timeToFirstToken":(\d+(?:\.\d+)?)/);

      const cleanSuffix = suffix ? suffix.replace(/,\s*default\s*fallback/i, '').trim() : '';
      const rawId = cleanSuffix ? `${slug}-${cleanSuffix}` : slug;
      const id = sanitizeId(rawId);

      const intelligenceIndex = intelMatch ? Math.round(parseFloat(intelMatch[1])) : null;
      const omniscienceNet = omniscienceMatch ? Math.round(parseFloat(omniscienceMatch[1])) : null;

      // Only add or update if model has intelligence index or is in existing map
      if (intelligenceIndex !== null || modelMap.has(id)) {
        const existing = modelMap.get(id) || {};

        const updated = {
          id,
          name: existing.name || name,
          contextWindow: existing.contextWindow || parseTokens(contextTokens),
          creator: existing.creator || creator,
          license: isOpenWeights ? "Open" : "Proprietary",
          intelligenceIndex: intelligenceIndex !== null ? intelligenceIndex : (existing.intelligenceIndex ?? null),
          omniscienceNet: omniscienceNet !== null ? omniscienceNet : (existing.omniscienceNet ?? null),
          briefcaseElo: briefcaseMatch ? Math.round(parseFloat(briefcaseMatch[1])) : (existing.briefcaseElo ?? null),
          accuracy: accMatch ? Math.round(parseFloat(accMatch[1]) * 100) : (existing.accuracy ?? null),
          nonHallucination: nonHalluMatch ? Math.round(parseFloat(nonHalluMatch[1]) * 100) : (existing.nonHallucination ?? null),
          automationBench: autoBenchMatch ? Math.round(parseFloat(autoBenchMatch[1]) * 100) : (existing.automationBench ?? null),
          terminalBenchScience: termSciMatch ? Math.round(parseFloat(termSciMatch[1]) * 100) : (existing.terminalBenchScience ?? null),
          frontierCode: frontierMatch ? Math.round(parseFloat(frontierMatch[1]) * 100) : (existing.frontierCode ?? null),
          hleDiamond: hleMatch ? Math.round(parseFloat(hleMatch[1]) * 100) : (existing.hleDiamond ?? null),
          gdpPdf: gdpMatch ? Math.round(parseFloat(gdpMatch[1]) * 100) : (existing.gdpPdf ?? null),
          terminalBench4: term4Match ? Math.round(parseFloat(term4Match[1]) * 100) : (existing.terminalBench4 ?? null),
          critPt: critMatch ? Math.round(parseFloat(critMatch[1]) * 100) : (existing.critPt ?? null),
          costPerTask: costMatch ? Math.round(parseFloat(costMatch[1]) * 100) / 100 : (existing.costPerTask ?? null),
          inputPrice: inPriceMatch ? parseFloat(inPriceMatch[1]) : (existing.inputPrice ?? null),
          outputPrice: outPriceMatch ? parseFloat(outPriceMatch[1]) : (existing.outputPrice ?? null),
          cacheHitPrice: cachePriceMatch ? parseFloat(cachePriceMatch[1]) : (existing.cacheHitPrice ?? null),
          speedMedian: speedMatch ? Math.round(parseFloat(speedMatch[1])) : (existing.speedMedian ?? null),
          latencyFirstChunk: ttftMatch ? Math.round(parseFloat(ttftMatch[1]) * 100) / 100 : (existing.latencyFirstChunk ?? null),
          modelUrl: existing.modelUrl || `https://artificialanalysis.ai/models/${slug}`,
          providersUrl: existing.providersUrl || `https://artificialanalysis.ai/models/${slug}/providers`
        };

        modelMap.set(id, updated);
        liveCount++;
      }
    }
    console.log(`[Artificial Analysis] Synced ${liveCount} live benchmark entries.`);
  } catch (err) {
    console.warn('[Artificial Analysis] Warning during fetch:', err.message);
  }

  // 3. Fetch OpenRouter for live pricing updates
  try {
    console.log('[OpenRouter] Fetching live pricing indices...');
    const orText = await fetchUrl('https://openrouter.ai/api/v1/models');
    const orData = JSON.parse(orText);
    const orModels = orData.data || [];

    for (const om of orModels) {
      const omSlug = sanitizeId(om.id);
      const omName = sanitizeId(om.name || '');

      for (const [id, m] of modelMap.entries()) {
        if (id.includes(omSlug) || omSlug.includes(id) || (omName && id.includes(omName))) {
          if (om.pricing) {
            const inP = parseFloat(om.pricing.prompt || 0) * 1000000;
            const outP = parseFloat(om.pricing.completion || 0) * 1000000;
            if (inP > 0 && m.inputPrice === null) {
              m.inputPrice = Math.round(inP * 100) / 100;
              priceUpdates++;
            }
            if (outP > 0 && m.outputPrice === null) {
              m.outputPrice = Math.round(outP * 100) / 100;
            }
          }
        }
      }
    }
    console.log(`[OpenRouter] Enriched ${priceUpdates} models with live API pricing.`);
  } catch (err) {
    console.warn('[OpenRouter] Pricing enrichment warning:', err.message);
  }

  // 4. Sort models by intelligenceIndex descending (nulls last)
  const finalModels = Array.from(modelMap.values()).sort((a, b) => {
    if (a.intelligenceIndex !== null && b.intelligenceIndex !== null) {
      return b.intelligenceIndex - a.intelligenceIndex;
    }
    if (a.intelligenceIndex !== null) return -1;
    if (b.intelligenceIndex !== null) return 1;
    return (b.briefcaseElo || 0) - (a.briefcaseElo || 0);
  });

  // 5. Generate updated src/data/leaderboardData.ts
  const output = `// AI Frontier Benchmark Leaderboard
// Sourced from Artificial Analysis (artificialanalysis.ai) Intelligence, Pricing & Speed Index
// Automatically synced via 'npm run sync:leaderboard'

export interface LeaderboardModel {
  id: string;
  name: string;
  contextWindow: string;
  creator: string;
  license: "Proprietary" | "Open";
  intelligenceIndex: number | null;
  omniscienceNet: number | null;
  briefcaseElo: number | null;
  accuracy: number | null;
  nonHallucination: number | null;
  automationBench: number | null;
  terminalBenchScience: number | null;
  frontierCode: number | null;
  hleDiamond: number | null;
  gdpPdf: number | null;
  terminalBench4: number | null;
  critPt: number | null;
  costPerTask: number | null;
  inputPrice: number | null;
  outputPrice: number | null;
  cacheHitPrice?: number | null;
  speedMedian: number | null;
  latencyFirstChunk: number | null;
  modelUrl: string;
  providersUrl?: string;
}

export const LEADERBOARD_MODELS: LeaderboardModel[] = ${JSON.stringify(finalModels, null, 2)};
`;

  fs.writeFileSync(targetFile, output, 'utf-8');
  console.log(`✨ Successfully synced ${finalModels.length} models into src/data/leaderboardData.ts!`);

  const durationMs = Date.now() - startTime;
  await logActionExecution({
    workflow: 'Leaderboard Sync',
    action: 'LEADERBOARD_SYNC',
    status: 'success',
    summary: `Leaderboard Sync completed: ${finalModels.length} benchmarked frontier models active`,
    details: `Ingested live data from Artificial Analysis (${liveCount} models updated) and OpenRouter (${priceUpdates} pricing metrics updated). Sorted and compiled into src/data/leaderboardData.ts in ${durationMs}ms.`,
    metadata: {
      totalModels: finalModels.length,
      liveScraped: liveCount,
      priceUpdates,
      durationMs,
      targetFile: 'src/data/leaderboardData.ts'
    }
  });
}

main().catch(async (err) => {
  console.error('Leaderboard sync failed:', err);
  try {
    await logActionExecution({
      workflow: 'Leaderboard Sync',
      action: 'LEADERBOARD_SYNC',
      status: 'error',
      summary: `Leaderboard Sync Failed: ${err.message}`,
      details: err.stack || err.message,
      metadata: {
        error: err.message
      }
    });
  } catch {}
  process.exit(1);
});
