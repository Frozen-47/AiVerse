import { describe, it, expect } from "vitest";
import { 
  groupEcosystemEntriesIntoFamilies, 
  getCreatorColor, 
  ECOSYSTEM_TIERS 
} from "../src/lib/ecosystems";
import type { Entry } from "../src/types";

describe("Model Ecosystem Organization & Grouping", () => {
  const mockAnthropicEntries: Entry[] = [
    {
      name: "Claude Fable 5.2",
      type: "Model",
      summary: "Mythos-class reasoning",
      task: "AI Coding",
      license: "Proprietary",
      year: 2026,
      org: "Anthropic",
      size: "Mythos Architecture",
    },
    {
      name: "Claude Opus 5.5 (max with fallback)",
      type: "Model",
      summary: "Heavyweight reasoning",
      task: "AI Coding",
      license: "Proprietary",
      year: 2026,
      org: "Anthropic",
    },
    {
      name: "Claude 3.5 Sonnet",
      type: "Model",
      summary: "Frontier multimodal",
      task: "AI Coding",
      license: "Proprietary",
      year: 2024,
      org: "Anthropic",
    },
    {
      name: "Claude 3 Opus",
      type: "Model",
      summary: "Original Opus 3",
      task: "AI Coding",
      license: "Proprietary",
      year: 2024,
      org: "Anthropic",
    },
    {
      name: "hh-rlhf",
      type: "Dataset",
      summary: "Human feedback dataset",
      task: "Safety",
      license: "MIT",
      year: 2023,
      org: "Anthropic",
    },
  ];

  it("organizes Anthropic models into distinct families", () => {
    const families = groupEcosystemEntriesIntoFamilies(mockAnthropicEntries, "Anthropic");
    expect(families.length).toBeGreaterThanOrEqual(4);

    const fableFam = families.find((f) => f.id === "claude-fable-5-2");
    expect(fableFam).toBeDefined();
    expect(fableFam?.entries.some((e) => e.name === "Claude Fable 5.2")).toBe(true);

    const opus55Fam = families.find((f) => f.id === "claude-opus-5-5");
    expect(opus55Fam).toBeDefined();

    const c35Fam = families.find((f) => f.id === "claude-3-7-3-5");
    expect(c35Fam).toBeDefined();
    expect(c35Fam?.entries.some((e) => e.name === "Claude 3.5 Sonnet")).toBe(true);

    const toolsFam = families.find((f) => f.id === "anthropic-safety-tools");
    expect(toolsFam).toBeDefined();
    expect(toolsFam?.entries.some((e) => e.name === "hh-rlhf")).toBe(true);
  });

  const mockOpenAIEntries: Entry[] = [
    {
      name: "GPT-6 Astra",
      type: "Model",
      summary: "Frontier flagship",
      task: "AI Coding",
      license: "Proprietary",
      year: 2026,
      org: "OpenAI",
      size: "Frontier MoE",
    },
    {
      name: "o3-mini",
      type: "Model",
      summary: "Cost-effective reasoning",
      task: "Reasoning",
      license: "Proprietary",
      year: 2025,
      org: "OpenAI",
    },
    {
      name: "GPT-4o",
      type: "Model",
      summary: "Omni model",
      task: "Multimodal",
      license: "Proprietary",
      year: 2024,
      org: "OpenAI",
    },
    {
      name: "Whisper v3 Turbo",
      type: "Model",
      summary: "Speech recognition",
      task: "Audio",
      license: "MIT",
      year: 2024,
      org: "OpenAI",
    },
  ];

  it("organizes OpenAI models into distinct families", () => {
    const families = groupEcosystemEntriesIntoFamilies(mockOpenAIEntries, "OpenAI");
    expect(families.length).toBeGreaterThanOrEqual(4);

    const astraFam = families.find((f) => f.id === "gpt-6-astra");
    expect(astraFam).toBeDefined();

    const oFam = families.find((f) => f.id === "o-series");
    expect(oFam).toBeDefined();
    expect(oFam?.entries.some((e) => e.name === "o3-mini")).toBe(true);

    const mediaFam = families.find((f) => f.id === "openai-media");
    expect(mediaFam).toBeDefined();
    expect(mediaFam?.entries.some((e) => e.name === "Whisper v3 Turbo")).toBe(true);
  });

  it("provides distinctive creator accent colors", () => {
    expect(getCreatorColor("Anthropic")).toBe("#cc785c");
    expect(getCreatorColor("Google DeepMind")).toBe("#4285F4");
    expect(getCreatorColor("OpenAI")).toBe("#10a37f");
    expect(getCreatorColor("Meta AI")).toBe("#0081FB");
    expect(getCreatorColor("DeepSeek AI")).toBe("#0066FF");
    expect(getCreatorColor("Mistral AI")).toBe("#FA520F");
  });

  it("defines all curated ecosystem directory tiers", () => {
    expect(ECOSYSTEM_TIERS.length).toBe(6);
    const tierIds = ECOSYSTEM_TIERS.map((t) => t.id);
    expect(tierIds).toContain("frontier");
    expect(tierIds).toContain("open-weights");
    expect(tierIds).toContain("innovators");
    expect(tierIds).toContain("infrastructure");
    expect(tierIds).toContain("creative");
    expect(tierIds).toContain("research");
  });
});
