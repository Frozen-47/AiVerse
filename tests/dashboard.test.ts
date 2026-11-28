import { describe, expect, it } from "vitest";
import { LEADERBOARD_MODELS } from "../src/data/leaderboardData";
import {
  classifyLicenseBucket,
  computeLicenseMix,
  computeTaxonomyBreakdown,
  computeTopTasks,
  decodeHtmlEntities,
  formatRelativeTimestamp,
  getTopFrontierModels,
  searchCatalogQuickMatches,
} from "../src/lib/dashboard";
import type { Entry } from "../src/types";

const SAMPLE_ENTRIES: Entry[] = [
  {
    name: "GPT-6 Astra",
    org: "OpenAI",
    type: "Model",
    task: "NLP",
    license: "Proprietary",
    year: 2026,
    size: "1M Context",
    summary: "Frontier multimodal reasoning architecture.",
    architecture: "Transformer",
    benchmarks: "MMLU",
    limitations: "API rate limits",
    citations: [],
    popular: true,
  },
  {
    name: "DeepSeek-R1",
    org: "DeepSeek AI",
    type: "Model",
    task: "NLP",
    license: "MIT",
    year: 2025,
    size: "671B MoE",
    summary: "Open-weights reasoning model trained via RL.",
    architecture: "MoE",
    benchmarks: "MATH-500",
    limitations: "Large VRAM",
    citations: [],
    popular: true,
  },
  {
    name: "PyTorch",
    org: "Meta AI",
    type: "Framework",
    task: "MLOps",
    license: "BSD-3-Clause",
    year: 2016,
    size: "Library",
    summary: "Deep learning tensor framework.",
    architecture: "Dynamic Graph",
    benchmarks: "N/A",
    limitations: "None",
    citations: [],
    popular: true,
  },
  {
    name: "FineWeb-2",
    org: "Hugging Face",
    type: "Dataset",
    task: "NLP",
    license: "ODC-BY",
    year: 2026,
    size: "Multi-TB",
    summary: "Multilingual web pretraining dataset.",
    architecture: "Parquet",
    benchmarks: "N/A",
    limitations: "Storage",
    citations: [],
    popular: false,
  },
  {
    name: "GroqCloud",
    org: "Groq",
    type: "Platform",
    task: "MLOps",
    license: "Freemium",
    year: 2024,
    size: "LPU Cloud",
    summary: "Ultra-low latency LPU inference platform.",
    architecture: "LPU",
    benchmarks: "tok/s",
    limitations: "Context limits",
    citations: [],
    popular: true,
  },
  {
    name: "Cursor",
    org: "Cursor",
    type: "AI",
    task: "AI Coding",
    license: "Commercial",
    year: 2024,
    size: "IDE",
    summary: "AI-first code editor.",
    architecture: "Agentic IDE",
    benchmarks: "N/A",
    limitations: "Subscription",
    citations: [],
    popular: true,
  },
];

describe("Dashboard Intelligence & Analytics Helpers", () => {
  it("computes taxonomy breakdown with exact counts and percentages", () => {
    const slices = computeTaxonomyBreakdown(SAMPLE_ENTRIES);
    const map = new Map(slices.map((s) => [s.type, s]));
    expect(map.get("Model")?.count).toBe(2);
    expect(map.get("Framework")?.count).toBe(1);
    expect(map.get("Dataset")?.count).toBe(1);
    expect(map.get("Platform")?.count).toBe(1);
    expect(map.get("AI")?.count).toBe(1);
    expect(map.get("Model")?.pct).toBe(33);
  });

  it("classifies permissive, open-weights, and proprietary licenses accurately", () => {
    expect(classifyLicenseBucket("MIT")).toBe("open_source");
    expect(classifyLicenseBucket("APACHE-2.0")).toBe("open_source");
    expect(classifyLicenseBucket("BSD-3-Clause")).toBe("open_source");
    expect(classifyLicenseBucket("Open Weights")).toBe("open_weights");
    expect(classifyLicenseBucket("Llama 3.2 Community License")).toBe("open_weights");
    expect(classifyLicenseBucket("ODC-BY")).toBe("open_weights");
    expect(classifyLicenseBucket("Proprietary")).toBe("proprietary");
    expect(classifyLicenseBucket("Freemium")).toBe("proprietary");
    expect(classifyLicenseBucket("Custom Unknown")).toBe("other");

    const mix = computeLicenseMix(SAMPLE_ENTRIES);
    const byId = new Map(mix.map((m) => [m.id, m.count]));
    expect(byId.get("open_source")).toBe(2);
    expect(byId.get("open_weights")).toBe(1);
    expect(byId.get("proprietary")).toBe(3);
  });

  it("ranks top task domains in descending order", () => {
    const tasks = computeTopTasks(SAMPLE_ENTRIES, 3);
    expect(tasks[0].task).toBe("NLP");
    expect(tasks[0].count).toBe(3);
    expect(tasks[1].task).toBe("MLOps");
    expect(tasks[1].count).toBe(2);
    expect(tasks.length).toBe(3);
  });

  it("deduplicates leaderboard releases and respects open-weights filter", () => {
    const topAll = getTopFrontierModels(LEADERBOARD_MODELS, { limit: 6 });
    expect(topAll.length).toBe(6);
    const slugs = new Set(topAll.map((m) => m.releaseSlug || m.releaseName));
    expect(slugs.size).toBe(6);
    expect(
      (topAll[0].intelligenceIndex ?? 0) >= (topAll[1].intelligenceIndex ?? 0),
    ).toBe(true);

    const topOpen = getTopFrontierModels(LEADERBOARD_MODELS, {
      weights: "Open",
      limit: 5,
    });
    expect(topOpen.length).toBeGreaterThan(0);
    expect(topOpen.every((m) => m.license === "Open")).toBe(true);
  });

  it("ranks exact and prefix matches first in quick search", () => {
    const matches = searchCatalogQuickMatches(SAMPLE_ENTRIES, "deepseek", 5);
    expect(matches[0].name).toBe("DeepSeek-R1");

    const orgMatches = searchCatalogQuickMatches(SAMPLE_ENTRIES, "openai", 5);
    expect(orgMatches.some((e) => e.name === "GPT-6 Astra")).toBe(true);

    expect(searchCatalogQuickMatches(SAMPLE_ENTRIES, "   ", 5)).toEqual([]);
  });

  it("formats relative timestamps gracefully", () => {
    expect(formatRelativeTimestamp(undefined)).toBe("Synced recently");
    expect(formatRelativeTimestamp("not-a-date")).toBe("Synced recently");
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTimestamp(twoHoursAgo)).toBe("2h ago");
  });

  it("decodes common HTML entities cleanly", () => {
    expect(decodeHtmlEntities("Models &lt;15B &amp; &quot;fast&quot; &#39;evals&#39;")).toBe(
      "Models <15B & \"fast\" 'evals'",
    );
    expect(decodeHtmlEntities("Plain summary")).toBe("Plain summary");
  });
});
