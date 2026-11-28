import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logActionExecution } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const targetFile = path.join(rootDir, 'src', 'data', 'leaderboardData.ts');

function parseTokens(num) {
  if (!num) return '128k';
  if (num >= 1000000) return `${Math.round(num / 1000000)}M`;
  if (num >= 1000) return `${Math.round(num / 1000)}k`;
  return `${num}`;
}

function sanitizeId(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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

async function main() {
  const startTime = Date.now();
  console.log('🚀 Syncing AiVerse AI Frontier Benchmark Leaderboard...');

  // 1. Fetch live data from Artificial Analysis Leaderboards
  let rawModels = [];
  try {
    console.log('[Artificial Analysis] Fetching live benchmark flight data...');
    const html = await fetchUrl('https://artificialanalysis.ai/leaderboards/models');
    const chunks = [];
    const re = /self\.__next_f\.push\(\[1,\s*"([\s\S]*?)"\]\)/g;
    let m;
    while ((m = re.exec(html)) !== null) chunks.push(m[1]);
    const combined = chunks.join('').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

    // Parse models by extracting balanced JSON objects with {"id":"[uuid]","release":
    const idRegex = /\{"id":"([a-f0-9-]{36})","release":\{"slug":"([^"]+)","name":"([^"]+)"\}/g;
    let match;
    while ((match = idRegex.exec(combined)) !== null) {
      const startPos = match.index;
      let depth = 0;
      let endPos = startPos;
      for (let i = startPos; i < combined.length; i++) {
        if (combined[i] === '{') depth++;
        else if (combined[i] === '}') {
          depth--;
          if (depth === 0) {
            endPos = i + 1;
            break;
          }
        }
      }
      const jsonStr = combined.slice(startPos, endPos);
      try {
        const obj = JSON.parse(jsonStr);
        rawModels.push(obj);
      } catch (e) {
        // ignore parse fragment
      }
    }
    console.log(`[Artificial Analysis] Ingested ${rawModels.length} models from flight data.`);
  } catch (err) {
    console.warn('[Artificial Analysis] Warning during fetch:', err.message);
  }

  // 2. Fetch OpenRouter for additional pricing enrichment
  let orData = [];
  try {
    console.log('[OpenRouter] Fetching live pricing indices...');
    const orText = await fetchUrl('https://openrouter.ai/api/v1/models');
    const orJson = JSON.parse(orText);
    orData = orJson.data || [];
    console.log(`[OpenRouter] Loaded ${orData.length} models for pricing enrichment.`);
  } catch (err) {
    console.warn('[OpenRouter] Warning during fetch:', err.message);
  }

  // 3. Process and normalize models
  const processedList = [];
  const seenIds = new Set();

  for (const raw of rawModels) {
    const slug = raw.release?.slug || 'unknown';
    const releaseName = raw.release?.name || raw.name || 'Unknown';
    const suffix = raw.suffix || '';
    const cleanSuffix = suffix ? suffix.replace(/,\s*default\s*fallback/i, '').trim() : '';
    const customId = cleanSuffix ? `${slug}-${cleanSuffix}` : slug;
    const finalId = sanitizeId(customId);

    if (seenIds.has(finalId)) continue;
    seenIds.add(finalId);

    const scores = raw.scores || {};
    const intel = raw.intelligenceIndex ? Math.round(raw.intelligenceIndex) : null;
    const cost = raw.intelligenceIndexCostPerTask != null ? Math.round(raw.intelligenceIndexCostPerTask * 100) / 100 : null;
    const timeSec = raw.intelligenceIndexTimePerTask != null ? raw.intelligenceIndexTimePerTask : null;
    const timeMin = timeSec != null ? Math.round((timeSec / 60) * 10) / 10 : null;
    const ttfa = raw.timeToFirstAnswerToken != null
      ? Math.round(raw.timeToFirstAnswerToken * 100) / 100
      : (raw.timeToFirstToken != null ? Math.round(raw.timeToFirstToken * 100) / 100 : null);

    const contextTokens = raw.contextWindowTokens || 128000;
    const isOpenWeights = Boolean(raw.isOpenWeights);

    let inPrice = raw.price1mInputTokens != null ? raw.price1mInputTokens : null;
    let outPrice = raw.price1mOutputTokens != null ? raw.price1mOutputTokens : null;

    if (inPrice == null || outPrice == null) {
      for (const om of orData) {
        const omSlug = sanitizeId(om.id);
        if (omSlug.includes(slug) || slug.includes(omSlug)) {
          if (om.pricing) {
            const pIn = parseFloat(om.pricing.prompt || 0) * 1000000;
            const pOut = parseFloat(om.pricing.completion || 0) * 1000000;
            if (inPrice == null && pIn > 0) inPrice = Math.round(pIn * 100) / 100;
            if (outPrice == null && pOut > 0) outPrice = Math.round(pOut * 100) / 100;
          }
        }
      }
    }

    const elo = scores['aa-briefcase'] ? Math.round(scores['aa-briefcase']) : null;
    const creatorName = raw.modelCreatorName || 'AI Lab';
    const displayName = raw.name || releaseName;
    const metricParts = [];
    if (intel !== null && intel !== undefined) metricParts.push(`an Intelligence Index of ${intel}`);
    if (elo !== null && elo !== undefined) metricParts.push(`a Briefcase Elo of ${elo}`);
    metricParts.push(`a ${parseTokens(contextTokens)} context window`);
    const metricsText = metricParts.length > 1
      ? `${metricParts.slice(0, -1).join(', ')}, and ${metricParts[metricParts.length - 1]}`
      : metricParts[0];

    processedList.push({
      id: finalId,
      name: displayName,
      shortName: raw.shortName || displayName,
      releaseSlug: slug,
      releaseName: releaseName,
      suffix: raw.suffix || '',
      creator: creatorName,
      creatorColor: raw.modelCreatorColor || '#6b7280',
      creatorLogo: raw.modelCreatorLogo || null,
      description: `${creatorName}'s ${Boolean(raw.isReasoning) ? 'frontier reasoning' : 'frontier foundation'} model (${displayName}) evaluated on the Artificial Analysis benchmark index with ${metricsText}.`,
      license: isOpenWeights ? "Open" : "Proprietary",
      isReasoning: Boolean(raw.isReasoning),
      paramClass: raw.paramClass || null,
      priceClass: raw.priceClass || null,
      deprecated: Boolean(raw.deprecated),
      contextWindow: parseTokens(contextTokens),
      contextTokens: contextTokens,
      intelligenceIndex: intel,
      omniscienceNet: raw.omniscience ? Math.round(raw.omniscience) : null,
      briefcaseElo: elo,
      accuracy: scores['omniscience-accuracy'] ? Math.round(scores['omniscience-accuracy'] * 100) : null,
      nonHallucination: scores['omniscience-non-hallucination'] ? Math.round(scores['omniscience-non-hallucination'] * 100) : null,
      automationBench: scores['automationbench-aa'] ? Math.round(scores['automationbench-aa'] * 100) : null,
      terminalBenchScience: scores['terminal-bench-science'] ? Math.round(scores['terminal-bench-science'] * 100) : null,
      frontierCode: scores['frontiercode-2-0'] ? Math.round(scores['frontiercode-2-0'] * 100) : null,
      hleDiamond: scores['hle-diamond'] ? Math.round(scores['hle-diamond'] * 100) : null,
      gdpPdf: scores['gdp-pdf'] ? Math.round(scores['gdp-pdf'] * 100) : null,
      terminalBench4: scores['terminalbench-4-0'] ? Math.round(scores['terminalbench-4-0'] * 100) : null,
      critPt: scores['critpt-v2-hard'] ? Math.round(scores['critpt-v2-hard'] * 100) : null,
      costPerTask: cost,
      timePerTaskMinutes: timeMin,
      timePerTaskSeconds: timeSec,
      timeToFirstAnswerToken: ttfa,
      latencyFirstChunk: ttfa,
      speedMedian: raw.outputSpeed ? Math.round(raw.outputSpeed) : null,
      inputPrice: inPrice,
      outputPrice: outPrice,
      cacheHitPrice: raw.cacheHitPrice ?? null,
      modelUrl: `https://artificialanalysis.ai/models/${slug}`,
      providersUrl: `https://artificialanalysis.ai/models/${slug}/providers`
    });
  }

  // Sort by intelligenceIndex desc (nulls last)
  processedList.sort((a, b) => {
    if (a.intelligenceIndex !== null && b.intelligenceIndex !== null) {
      return b.intelligenceIndex - a.intelligenceIndex;
    }
    if (a.intelligenceIndex !== null) return -1;
    if (b.intelligenceIndex !== null) return 1;
    return (b.briefcaseElo || 0) - (a.briefcaseElo || 0);
  });

  // 4. Generate updated src/data/leaderboardData.ts
  const output = `// AI Frontier Benchmark Leaderboard
// Sourced from Artificial Analysis (artificialanalysis.ai) Intelligence, Pricing & Speed Index
// Automatically synced via 'npm run sync:leaderboard'

export interface LeaderboardModel {
  id: string;
  name: string;
  shortName?: string;
  releaseSlug: string;
  releaseName: string;
  suffix?: string;
  creator: string;
  creatorColor?: string;
  creatorLogo?: string | null;
  description?: string;
  license: "Proprietary" | "Open";
  isReasoning?: boolean;
  paramClass?: string | null;
  priceClass?: string | null;
  deprecated?: boolean;
  contextWindow: string;
  contextTokens?: number;
  intelligenceIndex: number | null;
  omniscienceNet?: number | null;
  briefcaseElo?: number | null;
  accuracy?: number | null;
  nonHallucination?: number | null;
  automationBench?: number | null;
  terminalBenchScience?: number | null;
  frontierCode?: number | null;
  hleDiamond?: number | null;
  gdpPdf?: number | null;
  terminalBench4?: number | null;
  critPt?: number | null;
  costPerTask: number | null;
  timePerTaskMinutes?: number | null;
  timePerTaskSeconds?: number | null;
  timeToFirstAnswerToken?: number | null;
  latencyFirstChunk: number | null;
  speedMedian: number | null;
  inputPrice: number | null;
  outputPrice: number | null;
  cacheHitPrice?: number | null;
  modelUrl: string;
  providersUrl?: string;
}

export const LEADERBOARD_MODELS: LeaderboardModel[] = ${JSON.stringify(processedList, null, 2)};
`;

  fs.writeFileSync(targetFile, output, 'utf-8');
  console.log(`✨ Successfully synced ${processedList.length} models into src/data/leaderboardData.ts!`);

  const durationMs = Date.now() - startTime;
  try {
    await logActionExecution({
      workflow: 'Leaderboard Sync',
      action: 'LEADERBOARD_SYNC',
      status: 'success',
      summary: `Leaderboard Sync completed: ${processedList.length} benchmarked frontier models active`,
      details: `Ingested live flight data from Artificial Analysis and OpenRouter. Compiled into src/data/leaderboardData.ts in ${durationMs}ms.`,
      metadata: {
        totalModels: processedList.length,
        durationMs,
        targetFile: 'src/data/leaderboardData.ts'
      }
    });
  } catch {}
}

main().catch(async (err) => {
  console.error('Leaderboard sync failed:', err);
  process.exit(1);
});
