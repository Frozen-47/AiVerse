import type { Entry } from "../types";

export declare function normalizeOrgName(rawOrg: string | null | undefined): string;
export declare function stripProviderPrefix(name: string): string;
export declare function cleanEntryDisplayName(name: string): string;
export declare function canonicalEntryKey(name: string): string;
export declare function normalizeLicense(rawLicense: string | null | undefined, type?: string): string;
export declare function cleanEntryText(rawText: string | null | undefined): string;
export declare function isUnnecessaryOrSpamEntry(entry: Partial<Entry>): boolean;
export declare function sanitizeEntryRecord(entry: Entry): Entry;
export declare function sanitizeAndDeduplicateCatalog(entries: Entry[]): Entry[];
