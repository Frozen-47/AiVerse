import type { Entry } from "../types";

export function entryToSlug(name: string): string {
  return encodeURIComponent(name);
}

export function findEntryBySlug(entries: Entry[], slug: string): Entry | undefined {
  try {
    const name = decodeURIComponent(slug);
    return entries.find((e) => e.name === name);
  } catch {
    return undefined;
  }
}

export function shareUrlForEntry(name: string): string {
  const url = new URL(window.location.href);
  url.searchParams.set("entry", entryToSlug(name));
  return url.toString();
}
