import { describe, expect, it } from "vitest";
import {
  canonicalEntryKey,
  cleanEntryDisplayName,
  cleanEntryText,
  isUnnecessaryOrSpamEntry,
  normalizeLicense,
  normalizeOrgName,
  sanitizeAndDeduplicateCatalog,
  stripProviderPrefix,
} from "../src/lib/catalogCleanup";
import { entries as catalogEntries } from "../src/data";
import { LEADERBOARD_MODELS } from "../src/data/leaderboardData";
import { groupEntriesByEcosystem } from "../src/lib/ecosystems";
import type { Entry } from "../src/types";

describe("catalogCleanup utilities", () => {
  it("normalizes org/lab aliases case-insensitively", () => {
    expect(normalizeOrgName("anthropic")).toBe("Anthropic");
    expect(normalizeOrgName("Anthropic")).toBe("Anthropic");
    expect(normalizeOrgName("openai")).toBe("OpenAI");
    expect(normalizeOrgName("google")).toBe("Google DeepMind");
    expect(normalizeOrgName("Google Brain")).toBe("Google DeepMind");
    expect(normalizeOrgName("inclusionai")).toBe("InclusionAI");
    expect(normalizeOrgName("inclusionAI")).toBe("InclusionAI");
    expect(normalizeOrgName("liquid")).toBe("Liquid AI");
    expect(normalizeOrgName("LiquidAI")).toBe("Liquid AI");
    expect(normalizeOrgName("thinkingmachines")).toBe("Thinking Machines");
    expect(normalizeOrgName("meta-models")).toBe("Meta AI");
    expect(normalizeOrgName("zai-org")).toBe("Zhipu AI (THUDM)");
  });

  it("strips provider prefixes and wrapper suffixes cleanly", () => {
    expect(stripProviderPrefix("Anthropic: Claude Fable 5.2")).toBe("Claude Fable 5.2");
    expect(cleanEntryDisplayName("Anthropic: Claude Fable 5.2 (batch)")).toBe("Claude Fable 5.2");
    expect(cleanEntryDisplayName("inclusionAI: Ling 3.2 Flash (free)")).toBe("Ling 3.2 Flash");
    expect(cleanEntryDisplayName("Claude Opus 5.5 (xhigh with fallback)")).toBe("Claude Opus 5.5");
    expect(cleanEntryDisplayName("DeepSeek V4.1 Flash 1017 (non-reasoning)")).toBe(
      "DeepSeek V4.1 Flash 1017",
    );
  });

  it("normalizes license variants into standard labels", () => {
    expect(normalizeLicense("APACHE-2.0", "Model")).toBe("Apache-2.0");
    expect(normalizeLicense("apache 2.0", "Model")).toBe("Apache-2.0");
    expect(normalizeLicense("OTHER", "Model")).toBe("Open Weights");
    expect(normalizeLicense("OTHER", "Dataset")).toBe("Open Data");
    expect(normalizeLicense("NOASSERTION", "Framework")).toBe("Open Source");
    expect(normalizeLicense("Not specified", "AI")).toBe("Proprietary");
    expect(normalizeLicense("Open", "Model")).toBe("Open Weights");
  });

  it("cleans card boilerplate, HTML entities, floats, and filler sentences", () => {
    const dirty =
      "Dataset Card for 'TestCard'\t\n**Awesome** &amp; reliable benchmark scoring 56.40831234 [paper](https://example.com). The application is powered by advanced foundation models utilizing cloud nodes.";
    expect(cleanEntryText(dirty)).toBe(
      "Awesome & reliable benchmark scoring 56.4 paper.",
    );
  });

  it("identifies NSFW, third-party GGUF/abliterated uploads, and wrapper spam", () => {
    expect(
      isUnnecessaryOrSpamEntry({
        name: "Qwen3.8-27B-abliterated-GGUF",
        org: "huihui-ai",
        url: "https://huggingface.co/huihui-ai/Qwen3.8-27B-abliterated-GGUF",
      }),
    ).toBe(true);
    expect(
      isUnnecessaryOrSpamEntry({
        name: "OpenAI: GPT-6.2 Astra Pro",
        org: "openai",
        summary: "GPT-6.2 Astra Pro is the same underlying model as GPT-6.2 Astra.",
      }),
    ).toBe(true);
    expect(
      isUnnecessaryOrSpamEntry({
        name: "Anthropic: Claude Fable 5.2 (batch)",
        org: "anthropic",
      }),
    ).toBe(true);
    expect(
      isUnnecessaryOrSpamEntry({
        name: "Claude Fable 5.2",
        org: "Anthropic",
        url: "https://anthropic.com",
      }),
    ).toBe(false);
  });

  it("collapses effort variants and provider-prefixed duplicates into one canonical entry", () => {
    const base: Omit<Entry, "name" | "org"> = {
      type: "Model",
      task: "NLP",
      license: "Proprietary",
      year: 2026,
      size: "200k Context",
      summary: "Frontier model evaluated on Artificial Analysis.",
      architecture: "Transformer",
      benchmarks: "Intelligence Index: 65",
      limitations: "API rate limits",
      citations: [],
      popular: true,
    };

    const result = sanitizeAndDeduplicateCatalog([
      { ...base, name: "Claude Opus 5.5 (low with fallback)", org: "Anthropic" },
      { ...base, name: "Claude Opus 5.5 (high with fallback)", org: "anthropic" },
      { ...base, name: "Anthropic: Claude Opus 5.5 (batch)", org: "anthropic" },
      { ...base, name: "Anthropic: Claude Fable 5.2", org: "anthropic" },
      { ...base, name: "Claude Fable 5.2", org: "Anthropic" },
    ]);

    expect(result).toHaveLength(2);
    expect(result.map((e) => e.name).sort()).toEqual(["Claude Fable 5.2", "Claude Opus 5.5"]);
    expect(result.every((e) => e.org === "Anthropic")).toBe(true);
  });
});

describe("Curated catalog & leaderboard invariants", () => {
  it("contains zero case-colliding or unnormalized labs", () => {
    const ecosystems = groupEntriesByEcosystem(catalogEntries);
    const lowercaseMap = new Map<string, string[]>();
    for (const eco of ecosystems) {
      const lower = eco.name.toLowerCase();
      lowercaseMap.set(lower, [...(lowercaseMap.get(lower) || []), eco.name]);
    }
    const collisions = [...lowercaseMap.values()].filter((v) => v.length > 1);
    expect(collisions).toEqual([]);
  });

  it("contains zero duplicate canonical entries, effort/GGUF/spam variants, or dirty descriptions", () => {
    expect(catalogEntries.length).toBeGreaterThan(500);

    const seenKeys = new Set<string>();
    for (const entry of catalogEntries) {
      expect(entry.name.trim().length).toBeGreaterThan(0);
      expect(entry.year).toBeGreaterThanOrEqual(1990);
      expect(entry.year).toBeLessThanOrEqual(2027);
      expect(entry.license).not.toMatch(/^(OTHER|NOASSERTION|Not specified|Unknown)$/i);

      const key = canonicalEntryKey(entry.name);
      expect(seenKeys.has(key)).toBe(false);
      seenKeys.add(key);

      expect(entry.name).not.toMatch(
        /(\((?:high|low|medium|max|xhigh)(?:\s+with\s+fallback)?\)|\((?:batch|free|non-reasoning)\)|^(?:OpenAI|Anthropic|Google|inclusionAI|LiquidAI|Thinking Machines):\s+|(?:^|[-_\s])(?:gguf|abliterated|uncensored|heretic)(?:$|[-_\s]))/i,
      );

      expect(entry.summary).not.toMatch(
        /[\t\r\n]|&amp;|&lt;|Dataset Card for|Model Card for|The application is powered|incorporating an architecture|trending with over|\b0 downloads\b|\d+\.\d{4,}/i,
      );
    }
  });

  it("has clean leaderboard descriptions without placeholder dashes", () => {
    expect(LEADERBOARD_MODELS.length).toBeGreaterThan(200);
    for (const model of LEADERBOARD_MODELS) {
      expect(model.description || "").not.toMatch(/Briefcase Elo of --|Intelligence Index of frontier/);
    }
  });
});
