import type { Entry } from "../types";
import {
  normalizeOrgName as normalizeOrgNameRaw,
  stripProviderPrefix as stripProviderPrefixRaw,
  cleanEntryDisplayName as cleanEntryDisplayNameRaw,
  canonicalEntryKey as canonicalEntryKeyRaw,
  normalizeLicense as normalizeLicenseRaw,
  cleanEntryText as cleanEntryTextRaw,
  isUnnecessaryOrSpamEntry as isUnnecessaryOrSpamEntryRaw,
  sanitizeEntryRecord as sanitizeEntryRecordRaw,
  sanitizeAndDeduplicateCatalog as sanitizeAndDeduplicateCatalogRaw,
} from "./catalogCleanupCore.mjs";

export const normalizeOrgName = (rawOrg: string | null | undefined): string =>
  normalizeOrgNameRaw(rawOrg);

export const stripProviderPrefix = (name: string): string =>
  stripProviderPrefixRaw(name);

export const cleanEntryDisplayName = (name: string): string =>
  cleanEntryDisplayNameRaw(name);

export const canonicalEntryKey = (name: string): string =>
  canonicalEntryKeyRaw(name);

export const normalizeLicense = (
  rawLicense: string | null | undefined,
  type?: string,
): string => normalizeLicenseRaw(rawLicense, type);

export const cleanEntryText = (rawText: string | null | undefined): string =>
  cleanEntryTextRaw(rawText);

export const isUnnecessaryOrSpamEntry = (entry: Partial<Entry>): boolean =>
  isUnnecessaryOrSpamEntryRaw(entry);

export const sanitizeEntryRecord = (entry: Entry): Entry =>
  sanitizeEntryRecordRaw(entry);

export const sanitizeAndDeduplicateCatalog = (entries: Entry[]): Entry[] =>
  sanitizeAndDeduplicateCatalogRaw(entries);
