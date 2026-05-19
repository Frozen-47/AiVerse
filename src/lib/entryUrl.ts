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

const PROFILE_PATH_RE = /\/user\/(@?[a-z0-9_-]+)\/?$/;

/** Username segment for `/user/{slug}` (no leading @). */
export function profilePathSlug(username: string): string {
  return username.startsWith("@") ? username.slice(1) : username;
}

/** Canonical @handle used in app state and APIs. */
export function profileHandleFromSlug(slug: string): string {
  const raw = slug.startsWith("@") ? slug.slice(1) : slug;
  return `@${raw.toLowerCase()}`;
}

export function parseProfileFromPathname(pathname: string): string | null {
  const match = pathname.match(PROFILE_PATH_RE);
  return match ? profileHandleFromSlug(match[1]) : null;
}

export function parseProfileUsernameFromLocation(): string | null {
  if (typeof window === "undefined") return null;
  return parseProfileFromPathname(window.location.pathname);
}

/** Rewrite legacy `?user=@handle` links to `/user/handle`. */
export function migrateLegacyProfileQueryUrl(): string | null {
  const legacy = new URLSearchParams(window.location.search).get("user");
  if (!legacy) return null;

  const handle = profileHandleFromSlug(legacy);
  const url = new URL(window.location.href);
  url.pathname = `/user/${profilePathSlug(handle)}`;
  url.searchParams.delete("user");
  window.history.replaceState({}, "", url);
  return handle;
}

export function shareUrlForProfile(username: string): string {
  const url = new URL(window.location.origin);
  url.pathname = `/user/${profilePathSlug(username)}`;
  url.search = "";
  url.hash = "";
  return url.toString();
}
