export const BOOKMARKS_KEY = "aiverse_bookmarks";

export function loadBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function saveBookmarks(names: string[]): void {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(names));
}

export function clearLocalBookmarks(): void {
  localStorage.removeItem(BOOKMARKS_KEY);
}

export function toggleBookmark(name: string): string[] {
  const current = loadBookmarks();
  const next = current.includes(name)
    ? current.filter((n) => n !== name)
    : [...current, name];
  saveBookmarks(next);
  return next;
}
