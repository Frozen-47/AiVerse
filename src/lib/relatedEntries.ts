import type { Entry } from "../types";
import { scoreEntry, type OnboardingInterest } from "./onboarding";

export function getRelatedEntries(
  entry: Entry,
  all: Entry[],
  interests: OnboardingInterest[] = [],
  limit = 4,
): Entry[] {
  return all
    .filter((e) => e.name !== entry.name)
    .map((e) => ({
      entry: e,
      score:
        (e.type === entry.type ? 2 : 0) +
        (e.task === entry.task ? 3 : 0) +
        scoreEntry(e, interests),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.entry.year - a.entry.year)
    .slice(0, limit)
    .map((x) => x.entry);
}

/** Entries suitable for the detail-modal compare dropdown (related first, then same task). */
export function getCompareCandidates(
  entry: Entry,
  all: Entry[],
  interests: OnboardingInterest[] = [],
  limit = 20,
): Entry[] {
  const related = getRelatedEntries(entry, all, interests, limit);
  const seen = new Set([entry.name, ...related.map((e) => e.name)]);
  const sameTask = all
    .filter((e) => !seen.has(e.name) && e.task === entry.task)
    .sort((a, b) => b.year - a.year);
  return [...related, ...sameTask].slice(0, limit);
}
