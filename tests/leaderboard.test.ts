import { describe, it, expect } from "vitest";
import { LEADERBOARD_MODELS } from "../src/data/leaderboardData";

describe("AI Frontier Benchmark Leaderboard Data & Hierarchy", () => {
  it("should have populated benchmark models", () => {
    expect(LEADERBOARD_MODELS.length).toBeGreaterThan(50);
  });

  it("should verify Claude Fable 5.2 release and variants match benchmark flight data", () => {
    const fableVariants = LEADERBOARD_MODELS.filter(
      (m) => m.releaseSlug === "claude-fable-5-2"
    );
    expect(fableVariants.length).toBeGreaterThanOrEqual(5);

    const maxVariant = fableVariants.find((m) => m.suffix?.includes("Max"));
    expect(maxVariant).toBeDefined();
    expect(maxVariant?.intelligenceIndex).toBe(65);
    expect(maxVariant?.costPerTask).toBe(26.54);
    expect(maxVariant?.timePerTaskMinutes).toBe(41.8);
    expect(maxVariant?.timeToFirstAnswerToken).toBeCloseTo(238.16, 1);
  });

  it("should verify Gemini 4 Carbon release and variants match benchmark flight data", () => {
    const carbonVariants = LEADERBOARD_MODELS.filter(
      (m) => m.releaseSlug === "gemini-4-carbon"
    );
    expect(carbonVariants.length).toBeGreaterThanOrEqual(3);

    const highVariant = carbonVariants.find((m) => m.suffix === "High");
    expect(highVariant).toBeDefined();
    expect(highVariant?.intelligenceIndex).toBe(60);
    expect(highVariant?.costPerTask).toBe(5.48);
    expect(highVariant?.timePerTaskMinutes).toBe(32.1);
    expect(highVariant?.timeToFirstAnswerToken).toBeCloseTo(73.97, 1);
  });

  it("should verify top releases order matching leaderboard screenshot", () => {
    // Group models by releaseSlug
    const groupMap = new Map<string, typeof LEADERBOARD_MODELS>();
    for (const m of LEADERBOARD_MODELS) {
      const slug = m.releaseSlug;
      if (!groupMap.has(slug)) groupMap.set(slug, []);
      groupMap.get(slug)!.push(m);
    }

    const groups = Array.from(groupMap.entries()).map(([slug, variants]) => {
      const best = variants.reduce((prev, curr) => 
        (curr.intelligenceIndex || 0) > (prev.intelligenceIndex || 0) ? curr : prev
      );
      return { slug, best };
    });

    groups.sort((a, b) => (b.best.intelligenceIndex || 0) - (a.best.intelligenceIndex || 0));

    // Verify top 5 release slugs
    expect(groups[0].slug).toBe("claude-fable-5-2");
    expect(groups[1].slug).toBe("gemini-4-carbon");
    expect(groups[2].slug).toBe("claude-opus-5-5");
    expect(groups[3].slug).toBe("gpt-6-astra");
    expect(groups[0].best.intelligenceIndex).toBe(65);
    expect(groups[1].best.intelligenceIndex).toBe(60);
    expect(groups[2].best.intelligenceIndex).toBe(59);
    expect(groups[3].best.intelligenceIndex).toBe(57);
  });
});
