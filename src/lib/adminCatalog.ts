import type { Entry } from "../types";
import type {
  CatalogSortBy,
  UserProfile,
  UserSortBy,
  UserStatusFilter,
} from "../components/admin/types";

/**
 * Extracts a human-readable error message from an unknown thrown value.
 */
export function toErrorMessage(err: unknown, fallback = "Unexpected error"): string {
  if (err instanceof Error && err.message) return err.message;
  if (err && typeof err === "object") {
    const obj = err as { message?: string; details?: string };
    if (obj.message) return obj.message;
    if (obj.details) return obj.details;
  }
  return fallback;
}

/**
 * Generates a unique audit log identifier outside React render cycles.
 */
export function createAuditLogId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Filters and sorts builder profiles for the IAM Directory.
 */
export function filterAndSortUsers(
  users: UserProfile[],
  search: string,
  roleFilter: string,
  statusFilter: UserStatusFilter,
  sortBy: UserSortBy,
): UserProfile[] {
  const q = search.trim().toLowerCase();
  const filtered = users.filter((u) => {
    const matchesQuery =
      !q ||
      u.displayName.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.description.toLowerCase().includes(q) ||
      Boolean(u.deletionReason && u.deletionReason.toLowerCase().includes(q));

    const matchesRole =
      roleFilter === "all" || u.role.toLowerCase() === roleFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "deletion"
        ? Boolean(u.deletionRequested)
        : statusFilter === "suspended"
        ? Boolean(u.isBlocked)
        : !u.isBlocked && !u.deletionRequested;

    return matchesQuery && matchesRole && matchesStatus;
  });

  if (sortBy === "name") {
    return [...filtered].sort((a, b) =>
      a.displayName.localeCompare(b.displayName),
    );
  }
  if (sortBy === "role") {
    return [...filtered].sort((a, b) => a.role.localeCompare(b.role));
  }
  return [...filtered].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

/**
 * Filters and sorts approved catalog entries for the Directory view.
 */
export function filterAndSortEntries(
  entries: Entry[],
  search: string,
  typeFilter: string,
  taskFilter: string,
  featuredOnly: boolean,
  sortBy: CatalogSortBy,
): Entry[] {
  const q = search.trim().toLowerCase();
  const filtered = entries.filter((entry) => {
    const matchesQuery =
      !q ||
      entry.name.toLowerCase().includes(q) ||
      (entry.org || "").toLowerCase().includes(q) ||
      entry.type.toLowerCase().includes(q) ||
      entry.task.toLowerCase().includes(q);

    const matchesType = typeFilter === "All" || entry.type === typeFilter;
    const matchesTask = taskFilter === "All Tasks" || entry.task === taskFilter;
    const matchesFeatured = !featuredOnly || Boolean(entry.popular);

    return matchesQuery && matchesType && matchesTask && matchesFeatured;
  });

  if (sortBy === "name") {
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === "year") {
    return [...filtered].sort((a, b) => (b.year || 0) - (a.year || 0));
  }
  return filtered;
}

/**
 * Sanitizes an entry object to match the public.entries Supabase table schema.
 */
export function sanitizeEntryForCatalogDb(entry: Partial<Entry>) {
  return {
    name: String(entry.name || "").trim(),
    org: entry.org ? String(entry.org).trim() : null,
    type: String(entry.type || "Model").trim(),
    task: String(entry.task || "NLP").trim(),
    license: entry.license ? String(entry.license).trim() : null,
    year:
      typeof entry.year === "number"
        ? entry.year
        : entry.year
        ? parseInt(String(entry.year), 10) || new Date().getFullYear()
        : new Date().getFullYear(),
    size: entry.size ? String(entry.size).trim() : null,
    summary: String(entry.summary || entry.description || "").trim(),
    architecture: entry.architecture ? String(entry.architecture).trim() : null,
    usage: entry.usage ? String(entry.usage).trim() : null,
    benchmarks: entry.benchmarks ? String(entry.benchmarks).trim() : null,
    limitations: entry.limitations ? String(entry.limitations).trim() : null,
    url: entry.url ? String(entry.url).trim() : null,
    citations: Array.isArray(entry.citations) ? entry.citations : [],
    popular: Boolean(entry.popular),
    approved: true,
    submitted_by: entry.submitted_by || null,
  };
}

/**
 * Returns deduplicated, sanitized payloads only for entries not already updated
 * in the database, avoiding redundant INSERT/UPSERT RLS checks on existing rows.
 */
export function partitionPendingBatchForSync(
  targets: Partial<Entry>[],
  updatedNames: Iterable<string>,
) {
  const seen = new Set<string>();
  for (const name of updatedNames) {
    const norm = String(name || "").toLowerCase().trim();
    if (norm) seen.add(norm);
  }

  const missing: ReturnType<typeof sanitizeEntryForCatalogDb>[] = [];
  for (const target of targets) {
    const sanitized = sanitizeEntryForCatalogDb(target);
    const norm = sanitized.name.toLowerCase();
    if (!norm || seen.has(norm)) continue;
    seen.add(norm);
    missing.push(sanitized);
  }
  return missing;
}

/**
 * Formats Supabase/PostgreSQL errors into actionable messages for admins.
 */
export function formatCatalogDbError(
  err: unknown,
  adminEmail?: string | null,
): string {
  const errObj = (err && typeof err === "object" ? err : {}) as {
    code?: string;
    message?: string;
    details?: string;
  };
  const baseMessage = errObj.message || errObj.details || "Database error";
  const isRlsViolation =
    errObj.code === "42501" || /row-level security/i.test(baseMessage);

  if (isRlsViolation) {
    const accountHint = adminEmail ? ` for ${adminEmail}` : "";
    return `${baseMessage} — Run supabase/rls_policies.sql (or supabase/all.sql) in your Supabase SQL Editor to grant admin permissions${accountHint}.`;
  }
  return baseMessage;
}
