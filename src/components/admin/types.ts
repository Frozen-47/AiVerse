import type { Entry } from "../../types";

export type NavSectionId =
  | "users"
  | "deletion_requests"
  | "submissions"
  | "directory"
  | "infrastructure"
  | "analytics"
  | "announcements"
  | "audit";

export interface UserProfile {
  userKey: string;
  displayName: string;
  username: string;
  description: string;
  github: string;
  linkedin: string;
  medium: string;
  devto: string;
  portfolio: string;
  avatarUrl?: string;
  role: string;
  interests: string[];
  updatedAt: string;
  isBlocked?: boolean;
  blockedUntil?: string;
  deletionRequested?: boolean;
  deletionReason?: string;
  deletionRequestedAt?: string;
}

export interface AuditLogMetadata {
  workflow?: string;
  status?: "success" | "warning" | "error";
  summary?: string;
  runId?: string;
  sha?: string;
  durationMs?: number;
  totalModels?: number;
  timestamp?: string;
  userKey?: string;
  [key: string]: unknown;
}

export interface AuditLogItem {
  id: string;
  action: string;
  details: string;
  adminEmail: string;
  timestamp: string;
  workflow?: string;
  status?: "success" | "warning" | "error";
  summary?: string;
  metadata?: AuditLogMetadata;
}

export interface EditingEntryState {
  isNew: boolean;
  name: string;
  org: string;
  type: Entry["type"];
  task: string;
  license: string;
  year: number;
  size: string;
  summary: string;
  architecture: string;
  usage: string;
  benchmarks: string;
  limitations: string;
  url: string;
  popular: boolean;
  citations?: Entry["citations"];
}

export interface ToastState {
  type: "success" | "error";
  message: string;
  onUndo?: () => void;
}

export interface PipelineLogCounts {
  actionCount: number;
  radarCount: number;
  leaderboardCount: number;
  iamCount: number;
}

export type AuditFilterType = "all" | "actions" | "radar" | "leaderboard" | "iam";
export type UserStatusFilter = "all" | "active" | "suspended" | "deletion";
export type UserSortBy = "recent" | "name" | "role";
export type CatalogSortBy = "recent" | "name" | "year";
