import type { Entry } from "../types";

/** Decode ?entry= slug (handles legacy double-encoded share links). */
export function decodeEntrySlug(slug: string): string {
  let name = slug;
  for (let i = 0; i < 2; i++) {
    if (!/%[0-9A-Fa-f]{2}/.test(name)) break;
    try {
      const decoded = decodeURIComponent(name);
      if (decoded === name) break;
      name = decoded;
    } catch {
      break;
    }
  }
  return name;
}

export function findEntryBySlug(entries: Entry[], slug: string): Entry | undefined {
  const name = decodeEntrySlug(slug);
  return entries.find((e) => e.name === name);
}

export function shareUrlForEntry(name: string): string {
  const url = new URL(window.location.href);
  url.searchParams.set("entry", name);
  return url.toString();
}
