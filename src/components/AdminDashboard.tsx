import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Check,
  Command,
  Database,
  History,
  Info,
  Layers,
  Megaphone,
  Menu,
  Plus,
  RefreshCw,
  Server,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Trash2,
  Undo2,
  Users,
} from "lucide-react";
import { getOAuthAvatarUrl, supabase } from "../lib/supabase";
import {
  canonicalEntryKey,
  isUnnecessaryOrSpamEntry,
  sanitizeAndDeduplicateCatalog,
  sanitizeEntryRecord,
} from "../lib/catalogCleanup";
import {
  createAuditLogId,
  filterAndSortEntries,
  filterAndSortUsers,
  formatCatalogDbError,
  partitionPendingBatchForSync,
  sanitizeEntryForCatalogDb,
  toErrorMessage,
} from "../lib/adminCatalog";
import type { Entry } from "../types";
import { entries as defaultEntries } from "../data";
import { useAuth } from "./AuthContext";
import {
  type SiteAnnouncement,
  DEFAULT_ANNOUNCEMENT,
  fetchSiteAnnouncement,
  saveSiteAnnouncement,
} from "../lib/announcements";
import {
  type ChatSession,
  adminClearUserChats,
  adminFetchUserChats,
} from "../lib/chats";
import { SupabaseConsole } from "./SupabaseConsole";
import { AdminCommandPalette } from "./admin/AdminCommandPalette";
import { AdminPulseStrip } from "./admin/AdminPulseStrip";
import { AdminUsersSection } from "./admin/AdminUsersSection";
import { AdminDeletionsSection } from "./admin/AdminDeletionsSection";
import { AdminReviewQueueSection } from "./admin/AdminReviewQueueSection";
import { AdminDirectorySection } from "./admin/AdminDirectorySection";
import { AdminTelemetrySection } from "./admin/AdminTelemetrySection";
import { AdminBroadcastSection } from "./admin/AdminBroadcastSection";
import { AdminAuditSection } from "./admin/AdminAuditSection";
import { AdminModals } from "./admin/AdminModals";
import type {
  AuditFilterType,
  AuditLogItem,
  AuditLogMetadata,
  CatalogSortBy,
  EditingEntryState,
  NavSectionId,
  PipelineLogCounts,
  ToastState,
  UserProfile,
  UserSortBy,
  UserStatusFilter,
} from "./admin/types";

export type { SiteAnnouncement, NavSectionId, UserProfile, AuditLogItem };

interface AdminDashboardProps {
  onBackToHome: () => void;
  onViewEntry?: (entry: Entry) => void;
  initialSection?: NavSectionId;
  onSectionChange?: (section: NavSectionId) => void;
}

interface RawUserRow {
  user_key?: string;
  user_id?: string;
  email?: string;
  referral_source?: string;
  role?: string;
  interests?: string[];
  updated_at?: string;
  created_at?: string;
  blocked_until?: string;
  avatar_url?: string;
  deletion_requested?: boolean;
  deletion_reason?: string;
  deletion_requested_at?: string;
}

interface ParsedReferralMeta {
  displayName?: string;
  full_name?: string;
  username?: string;
  description?: string;
  github?: string;
  linkedin?: string;
  medium?: string;
  devto?: string;
  portfolio?: string;
  avatarUrl?: string;
  avatar_url?: string;
  blockedUntil?: string;
  blocked_until?: string;
  isBlocked?: boolean;
  deletionRequested?: boolean;
  deletion_requested?: boolean;
  deletionReason?: string;
  deletion_reason?: string;
  deletionRequestedAt?: string;
  deletion_requested_at?: string;
}

interface RawAuditLogRow {
  id: string;
  action: string;
  details: string;
  actor_email?: string;
  created_at?: string;
  timestamp?: string;
  workflow?: string;
  status?: "success" | "warning" | "error";
  summary?: string;
  metadata?: AuditLogMetadata;
}

function loadInitialAnnouncement(): SiteAnnouncement {
  try {
    const stored = localStorage.getItem("aiverse_site_announcement");
    if (stored) {
      const parsed = JSON.parse(stored) as SiteAnnouncement;
      const count = defaultEntries.length || 538;
      if (
        parsed?.message &&
        (parsed.message.includes("228+") || parsed.message.includes("238+"))
      ) {
        parsed.message = parsed.message
          .replace(/\b(228|238)\+\b/g, `${count}+`)
          .replace(/compare \d+\+ open/g, `compare ${count}+ open`);
        localStorage.setItem("aiverse_site_announcement", JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch {
    // ignore storage parse failure
  }
  return DEFAULT_ANNOUNCEMENT;
}

function loadInitialAuditLogs(): AuditLogItem[] {
  try {
    const stored = localStorage.getItem("aiverse_admin_audit_logs");
    return stored ? (JSON.parse(stored) as AuditLogItem[]) : [];
  } catch {
    return [];
  }
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToHome,
  onViewEntry,
  initialSection,
  onSectionChange,
}) => {
  const { user } = useAuth();
  const currentUserKey = user
    ? user.id.startsWith("supabase_")
      ? user.id
      : `supabase_${user.id}`
    : "";

  // Navigation & Shell State
  const [localNav, setLocalNav] = useState<NavSectionId>(initialSection || "users");
  const activeNav: NavSectionId = initialSection || localNav;
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : true,
  );
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const handleNavSelect = useCallback(
    (sec: NavSectionId) => {
      setLocalNav(sec);
      onSectionChange?.(sec);
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    },
    [onSectionChange],
  );

  // Data Loading State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingEntries, setPendingEntries] = useState<Entry[]>([]);
  const [approvedEntries, setApprovedEntries] = useState<Entry[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);

  // Directory Pagination & Filters
  const [directoryPage, setDirectoryPage] = useState(1);
  const [directoryPageSize, setDirectoryPageSize] = useState(20);
  const [directorySearch, setDirectorySearch] = useState("");
  const [directoryTypeFilter, setDirectoryTypeFilter] = useState<string>("All");
  const [directoryTaskFilter, setDirectoryTaskFilter] = useState<string>("All Tasks");
  const [directoryFeaturedOnly, setDirectoryFeaturedOnly] = useState(false);
  const [directorySortBy, setDirectorySortBy] = useState<CatalogSortBy>("recent");
  const [catalogViewMode, setCatalogViewMode] = useState<"table" | "grid">("table");

  // Submissions Filters & Multi-Select
  const [submissionsSearch, setSubmissionsSearch] = useState("");
  const [submissionsTypeFilter, setSubmissionsTypeFilter] = useState<string>("All");
  const [selectedSubmissions, setSelectedSubmissions] = useState<Set<string>>(new Set());

  // Users Filters & Sort
  const [usersSearch, setUsersSearch] = useState("");
  const [usersRoleFilter, setUsersRoleFilter] = useState<string>("all");
  const [usersStatusFilter, setUsersStatusFilter] = useState<UserStatusFilter>("all");
  const [usersSortBy, setUsersSortBy] = useState<UserSortBy>("recent");

  // Action & Dialog States
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [deleteConfirmEntry, setDeleteConfirmEntry] = useState<string | null>(null);
  const [batchConfirm, setBatchConfirm] = useState<"approve" | "reject" | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [codebaseSyncModalOpen, setCodebaseSyncModalOpen] = useState(false);

  const [inspectingUser, setInspectingUser] = useState<UserProfile | null>(null);
  const [roleManagingUser, setRoleManagingUser] = useState<UserProfile | null>(null);
  const [selectedNewRole, setSelectedNewRole] = useState<string>("developer");

  const [reviewingEntry, setReviewingEntry] = useState<Entry | null>(null);
  const [editingEntry, setEditingEntry] = useState<EditingEntryState | null>(null);
  const [blockingUser, setBlockingUser] = useState<UserProfile | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<UserProfile | null>(null);
  const [directDeleteModalOpen, setDirectDeleteModalOpen] = useState(false);
  const [directDeleteUidInput, setDirectDeleteUidInput] = useState("");

  // User Chats State
  const [chatManagingUser, setChatManagingUser] = useState<UserProfile | null>(null);
  const [userChatsList, setUserChatsList] = useState<ChatSession[]>([]);
  const [loadingUserChats, setLoadingUserChats] = useState(false);
  const [clearChatsConfirmUser, setClearChatsConfirmUser] = useState<UserProfile | null>(null);

  // Broadcast & Audit State
  const [announcement, setAnnouncement] = useState<SiteAnnouncement>(loadInitialAnnouncement);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(loadInitialAuditLogs);
  const [auditFilter, setAuditFilter] = useState<AuditFilterType>("all");
  const [auditSearchQuery, setAuditSearchQuery] = useState("");
  const [inspectingLog, setInspectingLog] = useState<AuditLogItem | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string, onUndo?: () => void) => {
      setToast({ type, message, onUndo });
    },
    [],
  );

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), toast.onUndo ? 7000 : 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Global keyboard shortcut: Cmd/Ctrl+K for Command Palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const logAudit = useCallback(
    async (action: string, details: string) => {
      try {
        const newLog: AuditLogItem = {
          id: createAuditLogId(),
          action,
          details,
          adminEmail: user?.email || "admin",
          timestamp: new Date().toISOString(),
        };
        setAuditLogs((prev) => {
          const updated = [newLog, ...prev].slice(0, 100);
          try {
            localStorage.setItem("aiverse_admin_audit_logs", JSON.stringify(updated));
          } catch {
            // ignore storage quota errors
          }
          return updated;
        });

        try {
          await supabase.from("admin_audit_logs").insert([
            {
              actor_email: user?.email || "admin",
              action,
              details,
              metadata: {
                timestamp: newLog.timestamp,
                userKey: user ? `supabase_${user.id}` : undefined,
              },
            },
          ]);
        } catch (dbErr) {
          console.warn("Server audit log write notice (stored locally):", dbErr);
        }
      } catch (err) {
        console.error("Failed to write audit log:", err);
      }
    },
    [user],
  );

  const clearAuditLogs = () => {
    try {
      localStorage.removeItem("aiverse_admin_audit_logs");
    } catch {
      // ignore storage errors
    }
    setAuditLogs([]);
    showToast("success", "Local audit display cleared. Server audit trail remains immutable.");
  };

  const loadData = useCallback(async () => {
    try {
      const [pendingResult, approvedResult] = await Promise.all([
        supabase
          .from("entries")
          .select("*")
          .eq("approved", false)
          .order("created_at", { ascending: false }),
        supabase
          .from("entries")
          .select("*")
          .eq("approved", true)
          .order("created_at", { ascending: false }),
      ]);

      if (pendingResult.error) throw pendingResult.error;
      if (approvedResult.error) throw approvedResult.error;

      const loadedPendingRaw = (pendingResult.data as Entry[]) || [];
      const loadedApproved = (approvedResult.data as Entry[]) || [];

      const mergedMap = new Map<string, Entry>();
      defaultEntries.forEach((e) => {
        if (e && e.name) {
          const clean = sanitizeEntryRecord(e);
          mergedMap.set(canonicalEntryKey(clean.name), { ...clean, approved: true });
        }
      });
      loadedApproved.forEach((e) => {
        if (e && e.name && !isUnnecessaryOrSpamEntry(e)) {
          const clean = sanitizeEntryRecord(e);
          const key = canonicalEntryKey(clean.name);
          if (key && !mergedMap.has(key)) {
            mergedMap.set(key, clean);
          }
        }
      });
      const approvedEntriesList = sanitizeAndDeduplicateCatalog(Array.from(mergedMap.values()));
      setApprovedEntries(approvedEntriesList);

      const approvedNamesSet = new Set<string>();
      approvedEntriesList.forEach((e) => {
        if (e && e.name) {
          approvedNamesSet.add(e.name.toLowerCase().trim());
          approvedNamesSet.add(canonicalEntryKey(e.name));
        }
      });

      const localApprovedPulse = new Set<string>();
      try {
        const stored = localStorage.getItem("aiverse_approved_pulse_requests");
        if (stored) {
          const arr = JSON.parse(stored) as unknown;
          if (Array.isArray(arr)) {
            arr.forEach((n) => localApprovedPulse.add(String(n).toLowerCase().trim()));
          }
        }
      } catch {
        // ignore storage parse failure
      }

      const localDismissedPulse = new Set<string>();
      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        if (stored) {
          const arr = JSON.parse(stored) as unknown;
          if (Array.isArray(arr)) {
            arr.forEach((n) => localDismissedPulse.add(String(n).toLowerCase().trim()));
          }
        }
      } catch {
        // ignore storage parse failure
      }

      const loadedPending: Entry[] = loadedPendingRaw.filter((p) => {
        if (!p || !p.name || isUnnecessaryOrSpamEntry(p)) return false;
        const normName = p.name.toLowerCase().trim();
        const canonName = canonicalEntryKey(p.name);
        if (
          p.summary === "[Deleted from Directory]" ||
          p.summary?.startsWith("[Deleted")
        ) {
          return false;
        }
        if (
          approvedNamesSet.has(normName) ||
          approvedNamesSet.has(canonName) ||
          localApprovedPulse.has(normName)
        ) {
          return false;
        }
        if (localDismissedPulse.has(normName)) return false;
        return true;
      });

      try {
        const pulseRes = await fetch("/data/pending_pulse_requests.json");
        if (pulseRes.ok) {
          const pulseItems = (await pulseRes.json()) as unknown;
          if (Array.isArray(pulseItems)) {
            const pendingNames = new Set(
              loadedPending.map((p) => canonicalEntryKey(p.name || "")),
            );
            (pulseItems as Entry[]).forEach((item) => {
              if (item && item.name && !isUnnecessaryOrSpamEntry(item)) {
                const cleanItem = sanitizeEntryRecord(item);
                const normName = cleanItem.name.toLowerCase().trim();
                const canonName = canonicalEntryKey(cleanItem.name);
                if (
                  !pendingNames.has(canonName) &&
                  !approvedNamesSet.has(normName) &&
                  !approvedNamesSet.has(canonName) &&
                  !localApprovedPulse.has(normName) &&
                  !localDismissedPulse.has(normName) &&
                  cleanItem.summary !== "[Deleted from Directory]"
                ) {
                  pendingNames.add(canonName);
                  loadedPending.push({
                    ...cleanItem,
                    approved: false,
                    submitted_by: item.submitted_by || "daily-pulse-bot",
                  });
                  pendingNames.add(normName);
                }
              }
            });
          }
        }
      } catch {
        // ignore missing static pulse json
      }

      setPendingEntries(loadedPending);

      let usersRows: RawUserRow[] = [];
      try {
        const { data: rpcUsers, error: rpcErr } = await supabase.rpc("get_admin_users");
        if (!rpcErr && Array.isArray(rpcUsers) && rpcUsers.length > 0) {
          usersRows = rpcUsers as RawUserRow[];
        }
      } catch {
        // fall back to user_preferences
      }

      if (usersRows.length === 0) {
        const { data: usersData, error: usersErr } = await supabase
          .from("user_preferences")
          .select("*")
          .order("updated_at", { ascending: false });

        if (usersErr) throw usersErr;
        usersRows = (usersData as RawUserRow[]) || [];
      }

      const nowMs = Date.now();
      const parsedUsers: UserProfile[] = usersRows.map((row, idx) => {
        let meta: ParsedReferralMeta = {};
        try {
          if (row.referral_source) {
            meta = JSON.parse(row.referral_source) as ParsedReferralMeta;
          }
        } catch {
          // non-JSON referral_source
        }

        let blockedUntilDate: string | undefined;
        let isUserBlocked = false;
        const rawBlockedUntil = row.blocked_until || meta.blockedUntil || meta.blocked_until;
        if (rawBlockedUntil) {
          const bDate = new Date(rawBlockedUntil);
          if (bDate.getTime() > nowMs) {
            isUserBlocked = true;
            blockedUntilDate = rawBlockedUntil;
          }
        } else if (meta.isBlocked) {
          isUserBlocked = true;
          blockedUntilDate = "9999-12-31T23:59:59.999Z";
        }

        let userAvatar = meta.avatarUrl || meta.avatar_url || row.avatar_url || undefined;
        if (userAvatar && userAvatar.includes("dicebear.com")) {
          userAvatar = undefined;
        }
        if (
          user &&
          (row.user_key === currentUserKey ||
            (user.id && row.user_key === user.id) ||
            (user.id && row.user_key?.includes(user.id)))
        ) {
          const realOAuth = getOAuthAvatarUrl(user);
          if (realOAuth) userAvatar = realOAuth;
        }

        const fallbackName = row.email
          ? row.email.split("@")[0]
          : `User_${String(row.user_key || idx).slice(-6)}`;

        return {
          userKey:
            row.user_key ||
            (row.user_id ? `supabase_${row.user_id}` : `user_${idx}`),
          displayName: meta.displayName || meta.full_name || fallbackName,
          username: meta.username || `@${fallbackName}`,
          description: meta.description || (row.email ? `Email: ${row.email}` : ""),
          github: meta.github || "",
          linkedin: meta.linkedin || "",
          medium: meta.medium || "",
          devto: meta.devto || "",
          portfolio: meta.portfolio || "",
          avatarUrl: userAvatar,
          role: row.role || "developer",
          interests: row.interests || [],
          updatedAt: row.updated_at || row.created_at || new Date().toISOString(),
          isBlocked: isUserBlocked,
          blockedUntil: blockedUntilDate,
          deletionRequested: Boolean(
            meta.deletionRequested || meta.deletion_requested || row.deletion_requested,
          ),
          deletionReason: meta.deletionReason || meta.deletion_reason || row.deletion_reason || "",
          deletionRequestedAt:
            meta.deletionRequestedAt ||
            meta.deletion_requested_at ||
            row.deletion_requested_at ||
            undefined,
        };
      });

      setUsers(parsedUsers);

      try {
        const liveAnn = await fetchSiteAnnouncement();
        if (liveAnn) setAnnouncement(liveAnn);
      } catch {
        // ignore announcement fallback notice
      }

      try {
        let combinedLogs: AuditLogItem[] = [];
        try {
          const { data: serverLogs, error: logsErr } = await supabase
            .from("admin_audit_logs")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(100);

          if (!logsErr && serverLogs && serverLogs.length > 0) {
            combinedLogs = (serverLogs as RawAuditLogRow[]).map((log) => ({
              id: log.id,
              action: log.action,
              details: log.details,
              adminEmail: log.actor_email || "admin",
              timestamp: log.created_at || new Date().toISOString(),
              workflow: log.metadata?.workflow,
              status: log.metadata?.status,
              summary: log.metadata?.summary,
              metadata: log.metadata,
            }));
          }
        } catch (serverErr) {
          console.warn("Server audit logs notice:", serverErr);
        }

        try {
          const actionLogsRes = await fetch("/data/github_action_logs.json", {
            cache: "no-cache",
          });
          if (actionLogsRes.ok) {
            const actionLogs = (await actionLogsRes.json()) as unknown;
            if (Array.isArray(actionLogs)) {
              const existingIds = new Set(combinedLogs.map((l) => l.id));
              (actionLogs as RawAuditLogRow[]).forEach((actLog) => {
                if (!existingIds.has(actLog.id)) {
                  combinedLogs.push({
                    id: actLog.id,
                    action: actLog.action,
                    details: actLog.details,
                    adminEmail: actLog.actor_email || "github-actions[bot]",
                    timestamp:
                      actLog.created_at || actLog.timestamp || new Date().toISOString(),
                    workflow: actLog.workflow || actLog.metadata?.workflow,
                    status: actLog.status || actLog.metadata?.status || "success",
                    summary: actLog.summary,
                    metadata: actLog.metadata,
                  });
                }
              });
            }
          }
        } catch (actionErr) {
          console.warn("Action logs fetch notice:", actionErr);
        }

        combinedLogs.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );

        if (combinedLogs.length > 0) {
          setAuditLogs(combinedLogs);
          try {
            localStorage.setItem(
              "aiverse_admin_audit_logs",
              JSON.stringify(combinedLogs),
            );
          } catch {
            // ignore storage quota errors
          }
        }
      } catch (logErr) {
        console.warn("Audit logs notice (falling back to local cache):", logErr);
      }
    } catch (err: unknown) {
      console.error("Admin dashboard load failed:", err);
      setError(toErrorMessage(err, "Failed to query admin records."));
      setApprovedEntries(defaultEntries.map((e) => ({ ...e, approved: true })));
    } finally {
      setLoading(false);
    }
  }, [currentUserKey, user]);

  useEffect(() => {
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (!cancelled) {
        void loadData();
      }
    });
    return () => {
      cancelled = true;
    };
  }, [loadData]);

  const handleRefreshData = useCallback(() => {
    setLoading(true);
    setError(null);
    void loadData();
  }, [loadData]);

  // ── Optimistic Entry Management ───────────────────────────────────────────

  const handleApprove = async (entry: Entry) => {
    const prevPending = [...pendingEntries];
    const prevApproved = [...approvedEntries];

    setPendingEntries((prev) => prev.filter((e) => e.name !== entry.name));
    setApprovedEntries((prev) => [{ ...entry, approved: true }, ...prev]);
    setSelectedSubmissions((prev) => {
      const next = new Set(prev);
      next.delete(entry.name);
      return next;
    });
    if (reviewingEntry?.name === entry.name) setReviewingEntry(null);

    showToast("success", `"${entry.name}" approved and published to catalog.`, async () => {
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      try {
        await supabase
          .from("entries")
          .update({ approved: false })
          .eq("name", entry.name);
        void logAudit("Undo Approval", `Reverted approval for "${entry.name}"`);
      } catch (err) {
        console.warn("Failed to revert approval in DB:", err);
      }
    });

    setActioningId(entry.name);
    try {
      const dbPayload = sanitizeEntryForCatalogDb(entry);
      const { data: updated, error: updateErr } = await supabase
        .from("entries")
        .update({ approved: true })
        .eq("name", entry.name)
        .select("name");
      if (updateErr) throw updateErr;

      if (!updated || updated.length === 0) {
        const { error: upsertErr } = await supabase
          .from("entries")
          .upsert([dbPayload], { onConflict: "name" });
        if (upsertErr) throw upsertErr;
      }

      void logAudit("Approve Asset", `Approved and published "${entry.name}" to directory`);

      try {
        const stored = localStorage.getItem("aiverse_approved_pulse_requests");
        const list: string[] = stored ? (JSON.parse(stored) as string[]) : [];
        const set = new Set(list.map((n) => n.toLowerCase().trim()));
        set.add(entry.name.toLowerCase().trim());
        localStorage.setItem("aiverse_approved_pulse_requests", JSON.stringify(Array.from(set)));
      } catch {
        // ignore storage error
      }

      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        if (stored) {
          const list = JSON.parse(stored) as string[];
          const filtered = list.filter(
            (n) => n.toLowerCase().trim() !== entry.name.toLowerCase().trim(),
          );
          localStorage.setItem("aiverse_dismissed_pulse_requests", JSON.stringify(filtered));
        }
      } catch {
        // ignore storage error
      }
    } catch (err: unknown) {
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      showToast(
        "error",
        `Database sync failed for "${entry.name}". Rolled back: ${formatCatalogDbError(err, user?.email)}`,
      );
    } finally {
      setActioningId(null);
    }
  };

  const handleBatchApprove = async (specificNames?: string[]) => {
    const targetNames =
      specificNames && specificNames.length > 0
        ? new Set(specificNames)
        : selectedSubmissions.size > 0
        ? new Set(selectedSubmissions)
        : new Set(pendingEntries.map((e) => e.name));

    if (targetNames.size === 0) return;

    const targets = pendingEntries.filter((e) => targetNames.has(e.name));
    if (targets.length === 0) return;

    const targetNamesList = targets.map((e) => e.name);
    const count = targets.length;
    const chunkSize = 25;

    const prevPending = [...pendingEntries];
    const prevApproved = [...approvedEntries];
    const prevSelected = new Set(selectedSubmissions);

    setPendingEntries((prev) => prev.filter((e) => !targetNames.has(e.name)));
    setApprovedEntries((prev) => [
      ...targets.map((e) => ({ ...e, approved: true })),
      ...prev,
    ]);
    setSelectedSubmissions((prev) => {
      const next = new Set(prev);
      targetNamesList.forEach((n) => next.delete(n));
      return next;
    });
    setBatchConfirm(null);

    showToast("success", `Approved ${count} submissions to catalog.`, async () => {
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      try {
        for (let i = 0; i < targetNamesList.length; i += chunkSize) {
          const nameChunk = targetNamesList.slice(i, i + chunkSize);
          const { error: undoErr } = await supabase
            .from("entries")
            .update({ approved: false })
            .in("name", nameChunk);
          if (undoErr) throw undoErr;
        }
        void logAudit("Undo Batch Approval", `Reverted approval for ${count} submissions`);
      } catch (err) {
        console.warn("Failed to revert batch approval in DB:", err);
      }
    });

    setActioningId("batch_approve");
    try {
      const updatedNames: string[] = [];
      for (let i = 0; i < targetNamesList.length; i += chunkSize) {
        const nameChunk = targetNamesList.slice(i, i + chunkSize);
        const { data: updatedRows, error: updateErr } = await supabase
          .from("entries")
          .update({ approved: true })
          .in("name", nameChunk)
          .select("name");
        if (updateErr) throw updateErr;
        if (Array.isArray(updatedRows)) {
          updatedRows.forEach((row: { name?: string }) => {
            if (row?.name) updatedNames.push(row.name);
          });
        }
      }

      const missingPayloads = partitionPendingBatchForSync(targets, updatedNames);
      for (let i = 0; i < missingPayloads.length; i += chunkSize) {
        const chunk = missingPayloads.slice(i, i + chunkSize);
        const { error: upsertErr } = await supabase
          .from("entries")
          .upsert(chunk, { onConflict: "name" });
        if (upsertErr) throw upsertErr;
      }

      void logAudit("Batch Approve", `Approved ${count} pending submissions at once`);

      try {
        const stored = localStorage.getItem("aiverse_approved_pulse_requests");
        const list: string[] = stored ? (JSON.parse(stored) as string[]) : [];
        const set = new Set(list.map((n) => n.toLowerCase().trim()));
        targetNamesList.forEach((n) => set.add(n.toLowerCase().trim()));
        localStorage.setItem("aiverse_approved_pulse_requests", JSON.stringify(Array.from(set)));
      } catch {
        // ignore storage error
      }

      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        if (stored) {
          const list = JSON.parse(stored) as string[];
          const nameSet = new Set(targetNamesList.map((n) => n.toLowerCase().trim()));
          const filtered = list.filter((n) => !nameSet.has(n.toLowerCase().trim()));
          localStorage.setItem("aiverse_dismissed_pulse_requests", JSON.stringify(filtered));
        }
      } catch {
        // ignore storage error
      }
    } catch (err: unknown) {
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      setSelectedSubmissions(prevSelected);
      showToast(
        "error",
        `Batch approve database sync failed. Rolled back: ${formatCatalogDbError(err, user?.email)}`,
      );
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (entryName: string) => {
    const prevPending = [...pendingEntries];
    const target = pendingEntries.find((e) => e.name === entryName);
    if (!target) return;

    setPendingEntries((prev) => prev.filter((e) => e.name !== entryName));
    setSelectedSubmissions((prev) => {
      const next = new Set(prev);
      next.delete(entryName);
      return next;
    });
    if (reviewingEntry?.name === entryName) setReviewingEntry(null);
    setDeleteConfirmEntry(null);

    showToast("success", `Rejected "${entryName}" from review queue.`, () => {
      setPendingEntries(prevPending);
      void logAudit("Undo Reject", `Restored "${entryName}" to review queue`);
    });

    setActioningId(entryName);
    try {
      const { error: err } = await supabase.from("entries").delete().eq("name", entryName);
      if (err) throw err;

      void logAudit("Reject Asset", `Rejected "${entryName}" from review queue`);

      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        const list: string[] = stored ? (JSON.parse(stored) as string[]) : [];
        const set = new Set(list.map((n) => n.toLowerCase().trim()));
        set.add(entryName.toLowerCase().trim());
        localStorage.setItem("aiverse_dismissed_pulse_requests", JSON.stringify(Array.from(set)));
      } catch {
        // ignore storage error
      }
    } catch (err: unknown) {
      setPendingEntries(prevPending);
      showToast(
        "error",
        `Failed to reject "${entryName}". Rolled back: ${formatCatalogDbError(err, user?.email)}`,
      );
    } finally {
      setActioningId(null);
    }
  };

  const handleBatchReject = async (specificNames?: string[]) => {
    const targetNames =
      specificNames && specificNames.length > 0
        ? new Set(specificNames)
        : selectedSubmissions.size > 0
        ? new Set(selectedSubmissions)
        : new Set(pendingEntries.map((e) => e.name));

    if (targetNames.size === 0) return;

    const targetNamesList = Array.from(targetNames);
    const count = targetNamesList.length;
    const prevPending = [...pendingEntries];
    const prevSelected = new Set(selectedSubmissions);

    setPendingEntries((prev) => prev.filter((e) => !targetNames.has(e.name)));
    setSelectedSubmissions(new Set());
    setBatchConfirm(null);

    showToast("success", `Purged ${count} submissions from queue.`, () => {
      setPendingEntries(prevPending);
      void logAudit("Undo Batch Reject", `Restored ${count} submissions to queue`);
    });

    setActioningId("batch_reject");
    try {
      const { error: err } = await supabase
        .from("entries")
        .delete()
        .in("name", targetNamesList);
      if (err) throw err;

      void logAudit("Batch Reject", `Purged ${count} pending submissions from queue`);

      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        const list: string[] = stored ? (JSON.parse(stored) as string[]) : [];
        const set = new Set(list.map((n) => n.toLowerCase().trim()));
        targetNamesList.forEach((n) => set.add(n.toLowerCase().trim()));
        localStorage.setItem("aiverse_dismissed_pulse_requests", JSON.stringify(Array.from(set)));
      } catch {
        // ignore storage error
      }
    } catch (err: unknown) {
      setPendingEntries(prevPending);
      setSelectedSubmissions(prevSelected);
      showToast(
        "error",
        `Batch reject failed. Rolled back: ${formatCatalogDbError(err, user?.email)}`,
      );
    } finally {
      setActioningId(null);
    }
  };

  const executeDelete = async (entryName: string) => {
    const prevPending = [...pendingEntries];
    const prevApproved = [...approvedEntries];

    setPendingEntries((prev) => prev.filter((e) => e.name !== entryName));
    setApprovedEntries((prev) => prev.filter((e) => e.name !== entryName));
    if (reviewingEntry?.name === entryName) setReviewingEntry(null);
    setDeleteConfirmEntry(null);

    showToast("success", `"${entryName}" has been deleted from catalog.`, () => {
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      void logAudit("Undo Delete", `Restored "${entryName}" to catalog`);
    });

    setActioningId(entryName);
    try {
      const { error: err } = await supabase
        .from("entries")
        .upsert(
          {
            name: entryName,
            type: "Model",
            task: "NLP",
            summary: "[Deleted from Directory]",
            approved: false,
          },
          { onConflict: "name" },
        );

      if (err) throw err;

      void logAudit("Delete Asset", `Deleted "${entryName}" from catalog`);

      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        const list: string[] = stored ? (JSON.parse(stored) as string[]) : [];
        const set = new Set(list.map((n) => n.toLowerCase().trim()));
        set.add(entryName.toLowerCase().trim());
        localStorage.setItem("aiverse_dismissed_pulse_requests", JSON.stringify(Array.from(set)));
      } catch {
        // ignore storage error
      }

      try {
        const stored = localStorage.getItem("aiverse_approved_pulse_requests");
        if (stored) {
          const list = JSON.parse(stored) as string[];
          const filtered = list.filter(
            (n) => n.toLowerCase().trim() !== entryName.toLowerCase().trim(),
          );
          localStorage.setItem("aiverse_approved_pulse_requests", JSON.stringify(filtered));
        }
      } catch {
        // ignore storage error
      }
    } catch (err: unknown) {
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      showToast(
        "error",
        `Failed to delete "${entryName}". Rolled back: ${formatCatalogDbError(err, user?.email)}`,
      );
    } finally {
      setActioningId(null);
    }
  };

  const handleTogglePopular = async (entry: Entry) => {
    const newPopular = !entry.popular;
    const prevApproved = [...approvedEntries];

    setApprovedEntries((prev) =>
      prev.map((e) => (e.name === entry.name ? { ...e, popular: newPopular } : e)),
    );
    showToast("success", `"${entry.name}" marked as ${newPopular ? "Featured ⭐" : "Standard"}.`);

    setActioningId(entry.name);
    try {
      const { error: err } = await supabase
        .from("entries")
        .update({ popular: newPopular })
        .eq("name", entry.name);

      if (err) throw err;
      void logAudit("Toggle Featured", `Updated "${entry.name}" featured status to ${newPopular}`);
    } catch (err: unknown) {
      setApprovedEntries(prevApproved);
      showToast(
        "error",
        `Failed to update featured state: ${formatCatalogDbError(err, user?.email)}`,
      );
    } finally {
      setActioningId(null);
    }
  };

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry) return;

    setActioningId(editingEntry.name);
    try {
      const payload: Partial<Entry> = {
        name: editingEntry.name.trim(),
        org: editingEntry.org.trim(),
        type: editingEntry.type,
        task: editingEntry.task.trim(),
        license: editingEntry.license.trim(),
        year: Number(editingEntry.year),
        size: editingEntry.size.trim(),
        summary: editingEntry.summary.trim(),
        architecture: editingEntry.architecture.trim(),
        usage: editingEntry.usage.trim() || undefined,
        benchmarks: editingEntry.benchmarks.trim(),
        limitations: editingEntry.limitations.trim(),
        url: editingEntry.url.trim() || undefined,
        popular: editingEntry.popular,
        approved: true,
      };

      if (editingEntry.isNew) {
        const { error: err } = await supabase.from("entries").insert([
          {
            ...payload,
            citations: [],
            created_at: new Date().toISOString(),
          },
        ]);
        if (err) throw err;

        const newEntry = { ...payload, citations: [] } as Entry;
        setApprovedEntries((prev) => [newEntry, ...prev]);
        showToast("success", `"${editingEntry.name}" published to catalog.`);
        void logAudit("Create Asset", `Created new asset "${editingEntry.name}" in catalog`);
      } else {
        const { error: err } = await supabase.from("entries").upsert(
          {
            ...payload,
            citations: editingEntry.citations || [],
            approved: true,
          },
          { onConflict: "name" },
        );
        if (err) throw err;

        setApprovedEntries((prev) =>
          prev.map((item) =>
            item.name === editingEntry.name ? ({ ...item, ...payload } as Entry) : item,
          ),
        );
        showToast("success", `"${editingEntry.name}" specifications updated.`);
        void logAudit("Edit Asset", `Modified technical specs for "${editingEntry.name}"`);
      }
      setEditingEntry(null);
    } catch (err: unknown) {
      showToast("error", `Failed to save entry: ${formatCatalogDbError(err, user?.email)}`);
    } finally {
      setActioningId(null);
    }
  };

  // ── User Governance & IAM ─────────────────────────────────────────────────

  const handleUpdateUserRole = async (profile: UserProfile, newRole: string) => {
    setActioningId(profile.userKey);
    try {
      const { error: err } = await supabase
        .from("user_preferences")
        .update({
          role: newRole,
          updated_at: new Date().toISOString(),
        })
        .eq("user_key", profile.userKey);

      if (err) throw err;

      setUsers((prev) =>
        prev.map((u) => (u.userKey === profile.userKey ? { ...u, role: newRole } : u)),
      );
      showToast("success", `Role for "${profile.displayName}" updated to ${newRole}.`);
      void logAudit(
        "Assign Role",
        `Changed role for "${profile.displayName}" (${profile.username}) to ${newRole}`,
      );
      setRoleManagingUser(null);
    } catch (err: unknown) {
      showToast("error", `Failed to update user role: ${toErrorMessage(err)}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleExecuteBlock = async (
    profile: UserProfile,
    isBlocked: boolean,
    durationMs = 0,
  ) => {
    if (profile.userKey === currentUserKey || (user && profile.userKey === user.id)) {
      showToast("error", "Security violation: You cannot suspend your own admin account.");
      return;
    }

    setActioningId(profile.userKey);
    try {
      let blockedUntilValue: string | null = null;
      if (isBlocked) {
        blockedUntilValue =
          durationMs === -1
            ? "9999-12-31T23:59:59.999Z"
            : new Date(Date.now() + durationMs).toISOString();
      }

      const { data: currentPref } = await supabase
        .from("user_preferences")
        .select("referral_source")
        .eq("user_key", profile.userKey)
        .maybeSingle();

      let metaObj: ParsedReferralMeta = {};
      try {
        if (currentPref?.referral_source) {
          metaObj = JSON.parse(currentPref.referral_source) as ParsedReferralMeta;
        }
      } catch {
        // ignore non-json
      }

      metaObj.blockedUntil = blockedUntilValue ?? undefined;
      metaObj.isBlocked = isBlocked;

      const { error: err } = await supabase
        .from("user_preferences")
        .update({
          referral_source: JSON.stringify(metaObj),
          updated_at: new Date().toISOString(),
        })
        .eq("user_key", profile.userKey);

      if (err) throw err;

      setUsers((prev) =>
        prev.map((u) =>
          u.userKey === profile.userKey
            ? { ...u, isBlocked, blockedUntil: blockedUntilValue || undefined }
            : u,
        ),
      );

      showToast(
        "success",
        isBlocked
          ? `Account for "${profile.displayName}" suspended.`
          : `Suspension lifted for "${profile.displayName}".`,
      );
      void logAudit(
        "Suspend Account",
        `${isBlocked ? "Suspended" : "Reactivated"} account "${profile.displayName}"`,
      );
      setBlockingUser(null);
    } catch (err: unknown) {
      showToast("error", `Failed to modify status: ${toErrorMessage(err)}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleExecuteDeleteUser = async (profile: UserProfile) => {
    if (
      profile.userKey === currentUserKey ||
      (user && (profile.userKey === user.id || profile.userKey === `supabase_${user.id}`))
    ) {
      showToast("error", "Security violation: You cannot delete your own admin account.");
      return;
    }

    setActioningId(profile.userKey);
    try {
      const rawUuid = profile.userKey.startsWith("supabase_")
        ? profile.userKey.slice(9)
        : profile.userKey;
      const formattedKey = profile.userKey.startsWith("supabase_")
        ? profile.userKey
        : `supabase_${profile.userKey}`;

      const { error: rpcErr } = await supabase.rpc("delete_user_by_admin", {
        target_user_key: formattedKey,
      });

      await Promise.allSettled([
        supabase
          .from("user_preferences")
          .delete()
          .in("user_key", [profile.userKey, formattedKey, rawUuid]),
        supabase
          .from("user_bookmarks")
          .delete()
          .in("user_key", [profile.userKey, formattedKey, rawUuid]),
        supabase
          .from("entry_ratings")
          .delete()
          .in("user_key", [profile.userKey, formattedKey, rawUuid]),
        supabase
          .from("entry_comments")
          .delete()
          .in("user_key", [profile.userKey, formattedKey, rawUuid]),
        supabase
          .from("user_chats")
          .delete()
          .in("user_key", [profile.userKey, formattedKey, rawUuid]),
      ]);

      if (rpcErr) {
        throw new Error(rpcErr.message || "Failed to purge account from auth.users");
      }

      setUsers((prev) =>
        prev.filter(
          (u) =>
            u.userKey !== profile.userKey &&
            u.userKey !== formattedKey &&
            u.userKey !== rawUuid,
        ),
      );
      if (inspectingUser?.userKey === profile.userKey) setInspectingUser(null);
      showToast("success", `Account "${profile.displayName}" permanently deleted.`);
      void logAudit(
        "Purge Account",
        `Permanently purged credentials and data for "${profile.displayName}" (${profile.username})`,
      );
    } catch (err: unknown) {
      showToast("error", `Failed to delete user: ${toErrorMessage(err)}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleViewUserChats = async (profile: UserProfile) => {
    setChatManagingUser(profile);
    setLoadingUserChats(true);
    try {
      const chats = await adminFetchUserChats(profile.userKey);
      setUserChatsList(chats);
    } catch (err: unknown) {
      showToast("error", `Could not query user chats: ${toErrorMessage(err)}`);
      setUserChatsList([]);
    } finally {
      setLoadingUserChats(false);
    }
  };

  const handleClearAllUserChats = async (profile: UserProfile) => {
    setActioningId(profile.userKey);
    try {
      const result = await adminClearUserChats(profile.userKey);
      if (!result.success) throw new Error(result.message);

      setUserChatsList([]);
      setClearChatsConfirmUser(null);
      showToast(
        "success",
        `Cleared all chat history for "${profile.displayName}" from database.`,
      );
      void logAudit(
        "Clear User Chats",
        `Cleared chat history for "${profile.displayName}" (${profile.userKey})`,
      );
    } catch (err: unknown) {
      showToast("error", `Failed to clear user chats: ${toErrorMessage(err)}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleDeleteSingleChat = async (profile: UserProfile, sessionId: string) => {
    setActioningId(sessionId);
    try {
      const result = await adminClearUserChats(profile.userKey, sessionId);
      if (!result.success) throw new Error(result.message);

      setUserChatsList((prev) => prev.filter((c) => c.id !== sessionId));
      showToast("success", "Chat session removed from database.");
      void logAudit(
        "Delete User Chat Session",
        `Deleted chat session "${sessionId}" for "${profile.displayName}"`,
      );
    } catch (err: unknown) {
      showToast("error", `Failed to delete session: ${toErrorMessage(err)}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleRejectDeletionRequest = async (profile: UserProfile) => {
    setActioningId(profile.userKey);
    try {
      const rawUuid = profile.userKey.startsWith("supabase_")
        ? profile.userKey.slice(9)
        : profile.userKey;
      const formattedKey = profile.userKey.startsWith("supabase_")
        ? profile.userKey
        : `supabase_${profile.userKey}`;

      const { data: prefData } = await supabase
        .from("user_preferences")
        .select("referral_source")
        .or(`user_key.eq.${profile.userKey},user_key.eq.${formattedKey},user_key.eq.${rawUuid}`)
        .maybeSingle();

      let meta: ParsedReferralMeta = {};
      if (prefData?.referral_source) {
        try {
          meta = JSON.parse(prefData.referral_source) as ParsedReferralMeta;
        } catch {
          // ignore non-json
        }
      }

      delete meta.deletionRequested;
      delete meta.deletion_requested;
      delete meta.deletionReason;
      delete meta.deletion_reason;
      delete meta.deletionRequestedAt;
      delete meta.deletion_requested_at;

      await supabase
        .from("user_preferences")
        .update({
          referral_source: JSON.stringify(meta),
          updated_at: new Date().toISOString(),
        })
        .or(`user_key.eq.${profile.userKey},user_key.eq.${formattedKey},user_key.eq.${rawUuid}`);

      setUsers((prev) =>
        prev.map((u) =>
          u.userKey === profile.userKey ||
          u.userKey === formattedKey ||
          u.userKey === rawUuid
            ? {
                ...u,
                deletionRequested: false,
                deletionReason: undefined,
                deletionRequestedAt: undefined,
              }
            : u,
        ),
      );
      showToast("success", `Deletion request for "${profile.displayName}" dismissed.`);
      void logAudit(
        "Dismiss Deletion Request",
        `Dismissed deletion request for "${profile.displayName}" (${profile.username})`,
      );
    } catch (err: unknown) {
      showToast("error", `Failed to dismiss deletion request: ${toErrorMessage(err)}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleExecuteDirectDeleteUid = async (uidToPurge: string) => {
    const trimmed = uidToPurge.trim();
    if (!trimmed) {
      showToast("error", "Please enter a valid User UID or key.");
      return;
    }
    if (
      trimmed === currentUserKey ||
      (user && (trimmed === user.id || trimmed === `supabase_${user.id}`)) ||
      trimmed.includes("20f48b0a-737d-4b78-9098-847a8ba450e8")
    ) {
      showToast("error", "Security violation: You cannot delete the primary admin account.");
      return;
    }

    const formattedKey = trimmed.startsWith("supabase_") ? trimmed : `supabase_${trimmed}`;
    const rawUuid = trimmed.startsWith("supabase_") ? trimmed.slice(9) : trimmed;

    setActioningId(formattedKey);
    try {
      const { error: rpcErr } = await supabase.rpc("delete_user_by_admin", {
        target_user_key: formattedKey,
      });

      await Promise.allSettled([
        supabase.from("user_preferences").delete().in("user_key", [trimmed, formattedKey, rawUuid]),
        supabase.from("user_bookmarks").delete().in("user_key", [trimmed, formattedKey, rawUuid]),
        supabase.from("entry_ratings").delete().in("user_key", [trimmed, formattedKey, rawUuid]),
        supabase.from("entry_comments").delete().in("user_key", [trimmed, formattedKey, rawUuid]),
        supabase.from("user_chats").delete().in("user_key", [trimmed, formattedKey, rawUuid]),
      ]);

      if (rpcErr) {
        throw new Error(rpcErr.message || "Failed to delete from auth.users");
      }

      setUsers((prev) =>
        prev.filter(
          (u) => u.userKey !== trimmed && u.userKey !== formattedKey && u.userKey !== rawUuid,
        ),
      );
      showToast("success", `Account ${rawUuid} permanently deleted everywhere.`);
      void logAudit("Purge User UID", `Deleted account UID ${rawUuid} directly from auth.users`);
      setDirectDeleteModalOpen(false);
      setDirectDeleteUidInput("");
    } catch (err: unknown) {
      showToast("error", `Failed to purge user: ${toErrorMessage(err)}`);
    } finally {
      setActioningId(null);
    }
  };

  // ── Exports & Broadcast ───────────────────────────────────────────────────

  const exportDataAsJson = useCallback(
    (data: unknown, filename: string) => {
      try {
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("success", `Exported ${filename} successfully.`);
        void logAudit("Export Snapshot", `Exported ${filename} snapshot`);
      } catch (err: unknown) {
        showToast("error", `Export failed: ${toErrorMessage(err)}`);
      }
    },
    [logAudit, showToast],
  );

  const handleSaveAnnouncement = async (ann: SiteAnnouncement) => {
    try {
      await saveSiteAnnouncement(ann, currentUserKey);
      setAnnouncement({ ...ann, updatedAt: new Date().toISOString() });
      showToast(
        "success",
        ann.enabled ? "Site announcement broadcasted globally!" : "Announcement disabled.",
      );
      void logAudit(
        "Site Announcement",
        ann.enabled
          ? `Broadcasted banner: "${ann.message.slice(0, 35)}..."`
          : "Deactivated site-wide announcement",
      );
    } catch (err: unknown) {
      showToast("error", `Failed to save announcement: ${toErrorMessage(err)}`);
    }
  };

  // ── Computed Collections ──────────────────────────────────────────────────

  const pendingDeletionUsers = useMemo(
    () => users.filter((u) => Boolean(u.deletionRequested)),
    [users],
  );

  const filteredUsers = useMemo(
    () =>
      filterAndSortUsers(
        users,
        usersSearch,
        usersRoleFilter,
        usersStatusFilter,
        usersSortBy,
      ),
    [users, usersSearch, usersRoleFilter, usersStatusFilter, usersSortBy],
  );

  const filteredApproved = useMemo(
    () =>
      filterAndSortEntries(
        approvedEntries,
        directorySearch,
        directoryTypeFilter,
        directoryTaskFilter,
        directoryFeaturedOnly,
        directorySortBy,
      ),
    [
      approvedEntries,
      directorySearch,
      directoryTypeFilter,
      directoryTaskFilter,
      directoryFeaturedOnly,
      directorySortBy,
    ],
  );

  const totalPages = Math.max(1, Math.ceil(filteredApproved.length / directoryPageSize));
  const safeDirectoryPage = Math.min(directoryPage, totalPages);

  const paginatedApproved = useMemo(() => {
    const start = (safeDirectoryPage - 1) * directoryPageSize;
    return filteredApproved.slice(start, start + directoryPageSize);
  }, [filteredApproved, safeDirectoryPage, directoryPageSize]);

  const filteredSubmissions = useMemo(() => {
    const q = submissionsSearch.toLowerCase();
    return pendingEntries.filter((entry) => {
      const matchesQuery =
        !q ||
        entry.name.toLowerCase().includes(q) ||
        (entry.org || "").toLowerCase().includes(q) ||
        entry.task.toLowerCase().includes(q);
      const matchesType =
        submissionsTypeFilter === "All" || entry.type === submissionsTypeFilter;
      return matchesQuery && matchesType;
    });
  }, [pendingEntries, submissionsSearch, submissionsTypeFilter]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Model: 0,
      Framework: 0,
      Dataset: 0,
      Platform: 0,
      AI: 0,
    };
    approvedEntries.forEach((e) => {
      if (counts[e.type] !== undefined) counts[e.type]++;
    });
    return counts;
  }, [approvedEntries]);

  const taskCounts = useMemo(() => {
    const map: Record<string, number> = {};
    approvedEntries.forEach((e) => {
      map[e.task] = (map[e.task] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [approvedEntries]);

  const featuredCount = useMemo(
    () => approvedEntries.filter((e) => e.popular).length,
    [approvedEntries],
  );

  const latestAiRadarRun = useMemo(
    () =>
      auditLogs.find(
        (l) => l.action === "AI_RADAR_SYNC" || l.workflow?.includes("AI Radar"),
      ),
    [auditLogs],
  );

  const latestLeaderboardRun = useMemo(
    () =>
      auditLogs.find(
        (l) =>
          l.action === "LEADERBOARD_SYNC" || l.workflow?.includes("Leaderboard"),
      ),
    [auditLogs],
  );

  const pipelineLogCounts = useMemo<PipelineLogCounts>(() => {
    let actionCount = 0;
    let radarCount = 0;
    let leaderboardCount = 0;
    let iamCount = 0;

    auditLogs.forEach((l) => {
      const isPipeline =
        l.adminEmail.includes("github-actions") ||
        l.action === "AI_RADAR_SYNC" ||
        l.action === "LEADERBOARD_SYNC" ||
        Boolean(l.workflow);

      if (isPipeline) {
        actionCount++;
        if (l.action === "AI_RADAR_SYNC" || l.workflow?.includes("Radar")) radarCount++;
        if (l.action === "LEADERBOARD_SYNC" || l.workflow?.includes("Leaderboard")) {
          leaderboardCount++;
        }
      } else {
        iamCount++;
      }
    });

    return { actionCount, radarCount, leaderboardCount, iamCount };
  }, [auditLogs]);

  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const isPipeline =
        log.adminEmail.includes("github-actions") ||
        log.action === "AI_RADAR_SYNC" ||
        log.action === "LEADERBOARD_SYNC" ||
        Boolean(log.workflow);

      if (auditFilter === "actions" && !isPipeline) return false;
      if (
        auditFilter === "radar" &&
        log.action !== "AI_RADAR_SYNC" &&
        !log.workflow?.includes("Radar")
      ) {
        return false;
      }
      if (
        auditFilter === "leaderboard" &&
        log.action !== "LEADERBOARD_SYNC" &&
        !log.workflow?.includes("Leaderboard")
      ) {
        return false;
      }
      if (auditFilter === "iam" && isPipeline) return false;

      if (auditSearchQuery.trim()) {
        const q = auditSearchQuery.toLowerCase();
        return (
          (log.action || "").toLowerCase().includes(q) ||
          (log.details || "").toLowerCase().includes(q) ||
          (log.adminEmail || "").toLowerCase().includes(q) ||
          (log.workflow || "").toLowerCase().includes(q) ||
          (log.summary || "").toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [auditLogs, auditFilter, auditSearchQuery]);

  const openNewAssetEditor = useCallback(() => {
    setEditingEntry({
      isNew: true,
      name: "",
      org: "",
      type: "Model",
      task: "NLP",
      license: "MIT",
      year: new Date().getFullYear(),
      size: "Medium",
      summary: "",
      architecture: "",
      usage: "",
      benchmarks: "",
      limitations: "",
      url: "",
      popular: false,
    });
  }, []);

  const openEditAssetModal = useCallback((entry: Entry) => {
    setEditingEntry({
      isNew: false,
      name: entry.name,
      org: entry.org || "",
      type: entry.type,
      task: entry.task || "NLP",
      license: entry.license || "MIT",
      year: entry.year || new Date().getFullYear(),
      size: entry.size || "Unknown",
      summary: entry.summary || "",
      architecture: entry.architecture || "",
      usage: entry.usage || "",
      benchmarks: entry.benchmarks || "",
      limitations: entry.limitations || "",
      url: entry.url || "",
      popular: Boolean(entry.popular),
      citations: entry.citations,
    });
  }, []);

  const navGroups: Array<{
    title: string;
    items: Array<{
      id: NavSectionId;
      label: string;
      icon: React.ReactNode;
      badge?: string | number;
      badgeTone?: "neutral" | "amber" | "rose" | "emerald";
    }>;
  }> = [
    {
      title: "Identity & Security",
      items: [
        {
          id: "users",
          label: "Users & IAM",
          icon: <Users size={15} />,
          badge: users.length,
          badgeTone: "neutral",
        },
        {
          id: "deletion_requests",
          label: "Deletion Approvals",
          icon: <ShieldAlert size={15} />,
          badge: pendingDeletionUsers.length > 0 ? pendingDeletionUsers.length : undefined,
          badgeTone: "rose",
        },
      ],
    },
    {
      title: "Catalog Governance",
      items: [
        {
          id: "submissions",
          label: "Review Queue",
          icon: <Server size={15} />,
          badge: pendingEntries.length > 0 ? pendingEntries.length : undefined,
          badgeTone: "amber",
        },
        {
          id: "directory",
          label: "Catalog Directory",
          icon: <Layers size={15} />,
          badge: approvedEntries.length,
          badgeTone: "neutral",
        },
      ],
    },
    {
      title: "Telemetry & Cloud",
      items: [
        {
          id: "analytics",
          label: "Cloud Telemetry",
          icon: <BarChart3 size={15} />,
        },
        {
          id: "infrastructure",
          label: "Supabase & Storage",
          icon: <Database size={15} />,
          badge: "Live",
          badgeTone: "emerald",
        },
        {
          id: "announcements",
          label: "Site Broadcast",
          icon: <Megaphone size={15} />,
          badge: announcement.enabled ? "On" : undefined,
          badgeTone: "emerald",
        },
        {
          id: "audit",
          label: "Audit & Pipelines",
          icon: <History size={15} />,
          badge: auditLogs.length > 0 ? auditLogs.length : undefined,
          badgeTone: "neutral",
        },
      ],
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col bg-neutral-50 dark:bg-[#050507] text-neutral-900 dark:text-neutral-100 text-left">
      {/* ── Top Command Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 h-14 px-4 border-b border-neutral-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#090a0e]/90 backdrop-blur-xl flex items-center justify-between gap-3 shrink-0 z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => setSidebarOpen((s) => !s)}
            className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/[0.08] text-neutral-500 dark:text-neutral-400 transition-colors cursor-pointer"
            title="Toggle sidebar"
          >
            <Menu size={18} />
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/[0.08] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Back to AiVerse"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 text-white flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck size={15} />
            </div>
            <span className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-white truncate">
              AiVerse Control Plane
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Production
            </span>
          </div>
        </div>

        {/* Center Command Palette Trigger */}
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center justify-between gap-6 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04] hover:border-neutral-300 dark:hover:border-white/25 text-xs text-neutral-500 dark:text-neutral-400 transition-all cursor-pointer min-w-[260px] lg:min-w-[320px]"
        >
          <span className="inline-flex items-center gap-2">
            <Command size={13} className="text-indigo-500" />
            <span>Quick jump or run action...</span>
          </span>
          <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-neutral-200 dark:border-white/10 font-mono text-[10px] text-neutral-500 dark:text-neutral-300">
            ⌘K
          </kbd>
        </button>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="md:hidden p-1.5 rounded-xl border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 cursor-pointer"
            title="Command Palette (Ctrl+K)"
          >
            <Command size={15} />
          </button>

          <button
            type="button"
            onClick={() => setCodebaseSyncModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:bg-neutral-50 dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer"
            title="Codebase & Supabase Sync Center"
          >
            <Terminal size={13} className="text-indigo-500" />
            <span className="hidden xl:inline">Sync Center</span>
          </button>

          <button
            type="button"
            onClick={openNewAssetEditor}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xs cursor-pointer transition-colors"
          >
            <Plus size={14} className="stroke-[2.5px]" />
            <span className="hidden sm:inline">Add Asset</span>
          </button>

          <button
            type="button"
            onClick={handleRefreshData}
            disabled={loading}
            title="Refresh database records"
            className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/[0.08] text-neutral-500 dark:text-neutral-400 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            type="button"
            onClick={() => setDirectDeleteModalOpen(true)}
            title="Purge user by Supabase Auth UID"
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-500/40 transition-colors cursor-pointer"
          >
            <Trash2 size={12} />
            <span>Purge UID</span>
          </button>
        </div>
      </header>

      {/* ── Body: Collapsible Left Rail + Main Workspace ───────────────────── */}
      <div className="flex-1 flex overflow-hidden relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden animate-[fadeIn_0.15s_ease-out]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`${
            sidebarOpen
              ? "fixed md:relative inset-y-0 left-0 w-64 z-40 md:z-10 shadow-2xl md:shadow-none"
              : "w-0 -translate-x-full overflow-hidden border-r-0"
          } transition-all duration-200 border-r border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#090a0e] flex flex-col justify-between shrink-0 overflow-y-auto`}
        >
          <div className="py-4 px-3 space-y-5">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="px-3 text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">
                  {group.title}
                </p>
                <nav className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = activeNav === item.id;
                    const badgeClass =
                      item.badgeTone === "rose"
                        ? "bg-rose-600 text-white"
                        : item.badgeTone === "amber"
                        ? "bg-amber-500 text-black font-bold"
                        : item.badgeTone === "emerald"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                        : "bg-neutral-100 dark:bg-white/[0.07] text-neutral-500 dark:text-neutral-400";

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavSelect(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700 dark:bg-white/[0.09] dark:text-white font-semibold"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/80 dark:hover:bg-white/[0.04] hover:text-neutral-900 dark:hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={isActive ? "text-indigo-600 dark:text-indigo-400" : ""}>
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono tabular-nums ${badgeClass}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          {/* Admin Identity Footer */}
          <div className="p-3.5 border-t border-neutral-200/80 dark:border-white/[0.08] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {user?.email ? user.email[0].toUpperCase() : "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-neutral-900 dark:text-white truncate">
                {user?.email || "Administrator"}
              </p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Platform Security Officer
              </p>
            </div>
          </div>
        </aside>

        {/* ── Main Content Canvas ──────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex gap-3">
              <Info size={16} className="shrink-0 mt-0.5 text-amber-500" />
              <p className="leading-relaxed">
                Database returned notice: {error}. Catalog fallback active; all governance controls remain operational.
              </p>
            </div>
          )}

          {/* Live Platform Pulse KPI Strip */}
          <AdminPulseStrip
            activeNav={activeNav}
            totalUsers={users.length}
            suspendedUsers={users.filter((u) => u.isBlocked).length}
            pendingCount={pendingEntries.length}
            approvedCount={approvedEntries.length}
            featuredCount={featuredCount}
            deletionCount={pendingDeletionUsers.length}
            pipelineCount={pipelineLogCounts.actionCount}
            onSelectSection={handleNavSelect}
          />

          {loading ? (
            <div className="space-y-4">
              <div className="h-14 rounded-2xl bg-neutral-200/60 dark:bg-white/[0.04] animate-pulse" />
              <div className="h-72 rounded-2xl bg-neutral-200/60 dark:bg-white/[0.04] animate-pulse" />
            </div>
          ) : (
            <>
              {activeNav === "users" && (
                <AdminUsersSection
                  users={users}
                  filteredUsers={filteredUsers}
                  pendingDeletionCount={pendingDeletionUsers.length}
                  usersSearch={usersSearch}
                  onUsersSearchChange={setUsersSearch}
                  usersRoleFilter={usersRoleFilter}
                  onUsersRoleFilterChange={setUsersRoleFilter}
                  usersStatusFilter={usersStatusFilter}
                  onUsersStatusFilterChange={setUsersStatusFilter}
                  usersSortBy={usersSortBy}
                  onUsersSortByChange={setUsersSortBy}
                  onExportUsers={() => exportDataAsJson(users, "aiverse_users")}
                  onJumpToDeletions={() => handleNavSelect("deletion_requests")}
                  onInspectUser={setInspectingUser}
                  onViewUserChats={handleViewUserChats}
                  onManageRole={(profile) => {
                    setRoleManagingUser(profile);
                    setSelectedNewRole(profile.role);
                  }}
                  onBlockUser={setBlockingUser}
                  onDeleteUser={setDeleteConfirmUser}
                />
              )}

              {activeNav === "deletion_requests" && (
                <AdminDeletionsSection
                  pendingDeletionUsers={pendingDeletionUsers}
                  actioningId={actioningId}
                  onDismissRequest={handleRejectDeletionRequest}
                  onApprovePurge={setDeleteConfirmUser}
                />
              )}

              {activeNav === "submissions" && (
                <AdminReviewQueueSection
                  pendingEntries={pendingEntries}
                  filteredSubmissions={filteredSubmissions}
                  approvedCount={approvedEntries.length}
                  selectedSubmissions={selectedSubmissions}
                  submissionsSearch={submissionsSearch}
                  onSubmissionsSearchChange={setSubmissionsSearch}
                  submissionsTypeFilter={submissionsTypeFilter}
                  onSubmissionsTypeFilterChange={setSubmissionsTypeFilter}
                  actioningId={actioningId}
                  onToggleSelectAll={() => {
                    if (
                      selectedSubmissions.size === filteredSubmissions.length &&
                      filteredSubmissions.length > 0
                    ) {
                      setSelectedSubmissions(new Set());
                    } else {
                      setSelectedSubmissions(
                        new Set(filteredSubmissions.map((e) => e.name)),
                      );
                    }
                  }}
                  onToggleSelectOne={(name) => {
                    setSelectedSubmissions((prev) => {
                      const next = new Set(prev);
                      if (next.has(name)) next.delete(name);
                      else next.add(name);
                      return next;
                    });
                  }}
                  onClearSelection={() => setSelectedSubmissions(new Set())}
                  onApproveOne={handleApprove}
                  onRejectOne={handleReject}
                  onBatchApprove={handleBatchApprove}
                  onBatchReject={handleBatchReject}
                  onConfirmBatchApproveAll={() => setBatchConfirm("approve")}
                  onConfirmBatchRejectAll={() => setBatchConfirm("reject")}
                  onInspectSpecs={setReviewingEntry}
                  onOpenSyncCenter={() => setCodebaseSyncModalOpen(true)}
                  onExportQueue={exportDataAsJson}
                  onBrowseCatalog={() => handleNavSelect("directory")}
                />
              )}

              {activeNav === "directory" && (
                <AdminDirectorySection
                  approvedEntries={approvedEntries}
                  filteredApproved={filteredApproved}
                  paginatedApproved={paginatedApproved}
                  typeCounts={typeCounts}
                  taskCounts={taskCounts}
                  featuredCount={featuredCount}
                  catalogViewMode={catalogViewMode}
                  onViewModeChange={setCatalogViewMode}
                  directorySearch={directorySearch}
                  onSearchChange={(val) => {
                    setDirectorySearch(val);
                    setDirectoryPage(1);
                  }}
                  directoryTypeFilter={directoryTypeFilter}
                  onTypeFilterChange={(val) => {
                    setDirectoryTypeFilter(val);
                    setDirectoryPage(1);
                  }}
                  directoryTaskFilter={directoryTaskFilter}
                  onTaskFilterChange={(val) => {
                    setDirectoryTaskFilter(val);
                    setDirectoryPage(1);
                  }}
                  directoryFeaturedOnly={directoryFeaturedOnly}
                  onToggleFeaturedOnly={() => {
                    setDirectoryFeaturedOnly((f) => !f);
                    setDirectoryPage(1);
                  }}
                  directorySortBy={directorySortBy}
                  onSortByChange={(sort) => {
                    setDirectorySortBy(sort);
                    setDirectoryPage(1);
                  }}
                  directoryPage={safeDirectoryPage}
                  directoryPageSize={directoryPageSize}
                  totalPages={totalPages}
                  onPageChange={setDirectoryPage}
                  onPageSizeChange={(size) => {
                    setDirectoryPageSize(size);
                    setDirectoryPage(1);
                  }}
                  actioningId={actioningId}
                  onViewEntry={onViewEntry}
                  onTogglePopular={handleTogglePopular}
                  onEditEntry={openEditAssetModal}
                  onDeleteEntry={setDeleteConfirmEntry}
                  onExportCatalog={() => exportDataAsJson(approvedEntries, "aiverse_catalog")}
                />
              )}

              {activeNav === "analytics" && (
                <AdminTelemetrySection
                  approvedEntries={approvedEntries}
                  pendingEntries={pendingEntries}
                  users={users}
                  featuredCount={featuredCount}
                  typeCounts={typeCounts}
                  taskCounts={taskCounts}
                  announcement={announcement}
                  onExportJson={exportDataAsJson}
                  onJumpToInfrastructure={() => handleNavSelect("infrastructure")}
                />
              )}

              {activeNav === "announcements" && (
                <AdminBroadcastSection
                  announcement={announcement}
                  onChange={setAnnouncement}
                  onSave={handleSaveAnnouncement}
                />
              )}

              {activeNav === "audit" && (
                <AdminAuditSection
                  auditLogs={auditLogs}
                  filteredAuditLogs={filteredAuditLogs}
                  auditFilter={auditFilter}
                  onAuditFilterChange={setAuditFilter}
                  auditSearchQuery={auditSearchQuery}
                  onAuditSearchQueryChange={setAuditSearchQuery}
                  latestAiRadarRun={latestAiRadarRun}
                  latestLeaderboardRun={latestLeaderboardRun}
                  pipelineLogCounts={pipelineLogCounts}
                  onExportLogs={() => exportDataAsJson(auditLogs, "aiverse_system_audit_logs")}
                  onClearLocalLogs={clearAuditLogs}
                  onInspectLog={setInspectingLog}
                />
              )}

              {activeNav === "infrastructure" && (
                <SupabaseConsole showToast={showToast} logAudit={logAudit} />
              )}
            </>
          )}
        </main>
      </div>

      {/* ⌘K Global Command Palette */}
      <AdminCommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavSelect}
        onAddAsset={openNewAssetEditor}
        onOpenSyncCenter={() => setCodebaseSyncModalOpen(true)}
        onOpenDirectPurge={() => setDirectDeleteModalOpen(true)}
        onRefreshData={handleRefreshData}
        onBatchApproveAll={() => {
          handleNavSelect("submissions");
          setBatchConfirm("approve");
        }}
        onExportFullSnapshot={() =>
          exportDataAsJson(
            {
              catalog: approvedEntries,
              users,
              pending: pendingEntries,
              announcement,
              exportedAt: new Date().toISOString(),
            },
            "aiverse_complete_system_backup",
          )
        }
        onInspectUser={(profile) => {
          handleNavSelect("users");
          setInspectingUser(profile);
        }}
        onReviewSubmission={(entry) => {
          handleNavSelect("submissions");
          setReviewingEntry(entry);
        }}
        onInspectCatalogEntry={(entry) => {
          if (onViewEntry) onViewEntry(entry);
          else openEditAssetModal(entry);
        }}
        users={users}
        pendingEntries={pendingEntries}
        approvedEntries={approvedEntries}
        pendingDeletionCount={pendingDeletionUsers.length}
      />

      {/* All Governance Modals */}
      <AdminModals
        actioningId={actioningId}
        approvedCount={approvedEntries.length}
        staticBundleCount={defaultEntries.length}
        pendingCount={pendingEntries.length}
        inspectingUser={inspectingUser}
        onCloseInspectUser={() => setInspectingUser(null)}
        onOpenRoleFromInspect={(profile) => {
          setInspectingUser(null);
          setRoleManagingUser(profile);
          setSelectedNewRole(profile.role);
        }}
        onOpenChatsFromInspect={(profile) => {
          setInspectingUser(null);
          void handleViewUserChats(profile);
        }}
        onOpenDeleteFromInspect={(profile) => {
          setInspectingUser(null);
          setDeleteConfirmUser(profile);
        }}
        roleManagingUser={roleManagingUser}
        selectedNewRole={selectedNewRole}
        onSelectNewRole={setSelectedNewRole}
        onCloseRoleManager={() => setRoleManagingUser(null)}
        onSaveUserRole={handleUpdateUserRole}
        reviewingEntry={reviewingEntry}
        onCloseReviewingEntry={() => setReviewingEntry(null)}
        onApproveEntry={handleApprove}
        onRequestDeleteEntry={setDeleteConfirmEntry}
        editingEntry={editingEntry}
        onChangeEditingEntry={setEditingEntry}
        onCloseEditingEntry={() => setEditingEntry(null)}
        onSubmitEditingEntry={handleSaveEntry}
        deleteConfirmEntry={deleteConfirmEntry}
        onCloseDeleteConfirmEntry={() => setDeleteConfirmEntry(null)}
        onConfirmDeleteEntry={executeDelete}
        blockingUser={blockingUser}
        onCloseBlockingUser={() => setBlockingUser(null)}
        onExecuteBlock={handleExecuteBlock}
        deleteConfirmUser={deleteConfirmUser}
        onCloseDeleteConfirmUser={() => setDeleteConfirmUser(null)}
        onConfirmDeleteUser={async (target) => {
          setDeleteConfirmUser(null);
          await handleExecuteDeleteUser(target);
        }}
        directDeleteModalOpen={directDeleteModalOpen}
        directDeleteUidInput={directDeleteUidInput}
        onChangeDirectDeleteUid={setDirectDeleteUidInput}
        onCloseDirectDelete={() => {
          setDirectDeleteModalOpen(false);
          setDirectDeleteUidInput("");
        }}
        onConfirmDirectDelete={handleExecuteDirectDeleteUid}
        batchConfirm={batchConfirm}
        onCloseBatchConfirm={() => setBatchConfirm(null)}
        onConfirmBatchApproveAll={() => void handleBatchApprove()}
        onConfirmBatchRejectAll={() => void handleBatchReject()}
        chatManagingUser={chatManagingUser}
        userChatsList={userChatsList}
        loadingUserChats={loadingUserChats}
        onCloseChatManager={() => setChatManagingUser(null)}
        onDeleteSingleChat={handleDeleteSingleChat}
        onRequestClearAllChats={setClearChatsConfirmUser}
        clearChatsConfirmUser={clearChatsConfirmUser}
        onCloseClearChatsConfirm={() => setClearChatsConfirmUser(null)}
        onConfirmClearAllChats={handleClearAllUserChats}
        inspectingLog={inspectingLog}
        onCloseInspectLog={() => setInspectingLog(null)}
        codebaseSyncModalOpen={codebaseSyncModalOpen}
        onCloseCodebaseSync={() => setCodebaseSyncModalOpen(false)}
        onExportFullCatalog={() => exportDataAsJson(approvedEntries, "aiverse_catalog_full")}
      />

      {/* Toast Notification with Instant Undo */}
      {toast && (
        <div className="fixed bottom-5 left-5 z-50 max-w-md animate-[fadeInUp_0.2s_ease-out]">
          <div
            className={`px-4 py-3 rounded-2xl border flex items-center gap-3 text-xs font-medium shadow-2xl backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-neutral-950/95 text-white border-white/15 dark:bg-white/95 dark:text-neutral-900 dark:border-neutral-200"
                : "bg-rose-600/95 text-white border-rose-500"
            }`}
          >
            {toast.type === "success" ? (
              <Check size={16} className="shrink-0 text-emerald-400 dark:text-emerald-600" />
            ) : (
              <Info size={16} className="shrink-0 text-white" />
            )}
            <span className="leading-snug">{toast.message}</span>
            {toast.onUndo && (
              <button
                type="button"
                onClick={() => {
                  toast.onUndo?.();
                  setToast(null);
                }}
                className="ml-2 pl-3 border-l border-white/25 dark:border-black/20 text-indigo-300 dark:text-indigo-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Undo2 size={13} />
                Undo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
