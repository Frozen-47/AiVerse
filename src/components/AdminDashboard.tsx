import React, { useState, useEffect, useMemo } from "react";
import {
  Menu,
  ArrowLeft,
  Check,
  Users,
  Server,
  Trash2,
  Info,
  RefreshCw,
  Star,
  ExternalLink,
  X,
  AlertTriangle,
  Search,
  Edit,
  Plus,
  Download,
  BarChart3,
  Megaphone,
  History,
  Sparkles,
  CheckCheck,
  FileJson,
  Database,
  ShieldAlert,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  UserCog,
  MessageSquare,
  MessageSquareX,
  Activity,
  Bot,
  Zap,
  Radio,
  Copy,
  Code,
  CheckCircle2,
  XCircle,
  LayoutGrid,
  List,
  Terminal,
  CheckSquare,
  Square,
  Undo2,
  ChevronDown,
  ChevronUp,
  Layers,
  Eye,
} from "lucide-react";
import { supabase, getOAuthAvatarUrl } from "../lib/supabase";
import { useTokens, typeBadge, taskBadge, typeIcon, TYPE_GLYPH } from "../lib/theme";
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

export type { SiteAnnouncement };

export type NavSectionId =
  | "users"
  | "deletion_requests"
  | "submissions"
  | "directory"
  | "infrastructure"
  | "analytics"
  | "announcements"
  | "audit";

interface AdminDashboardProps {
  onBackToHome: () => void;
  onViewEntry?: (entry: Entry) => void;
  initialSection?: NavSectionId;
  onSectionChange?: (section: NavSectionId) => void;
}

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

export interface AuditLogItem {
  id: string;
  action: string;
  details: string;
  adminEmail: string;
  timestamp: string;
  workflow?: string;
  status?: "success" | "warning" | "error";
  summary?: string;
  metadata?: any;
}

interface EditingEntryState {
  isNew: boolean;
  name: string;
  org: string;
  type: "Model" | "Framework" | "Dataset" | "Platform" | "AI";
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
}

const isNewSubmission = (createdAt?: string): boolean => {
  if (!createdAt) return false;
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= 2;
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToHome,
  onViewEntry,
  initialSection,
  onSectionChange,
}) => {
  const t = useTokens();
  const { user } = useAuth();
  const currentUserKey = user ? (user.id.startsWith("supabase_") ? user.id : `supabase_${user.id}`) : "";

  // Google Cloud Console Navigation State
  const [activeNav, setActiveNav] = useState<NavSectionId>(initialSection || "users");
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== "undefined" ? window.innerWidth >= 768 : true);

  useEffect(() => {
    if (initialSection && initialSection !== activeNav) {
      setActiveNav(initialSection);
    }
  }, [initialSection]);

  const handleNavSelect = (sec: NavSectionId) => {
    setActiveNav(sec);
    onSectionChange?.(sec);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [pendingEntries, setPendingEntries] = useState<Entry[]>([]);
  const [approvedEntries, setApprovedEntries] = useState<Entry[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);

  // Directory Pagination
  const [directoryPage, setDirectoryPage] = useState(1);
  const [directoryPageSize, setDirectoryPageSize] = useState(20);

  // Filtering states
  const [directorySearch, setDirectorySearch] = useState("");
  const [directoryTypeFilter, setDirectoryTypeFilter] = useState<string>("All");
  const [directoryTaskFilter, setDirectoryTaskFilter] = useState<string>("All Tasks");
  const [directoryFeaturedOnly, setDirectoryFeaturedOnly] = useState(false);

  const [submissionsSearch, setSubmissionsSearch] = useState("");
  const [submissionsTypeFilter, setSubmissionsTypeFilter] = useState<string>("All");

  const [usersSearch, setUsersSearch] = useState("");
  const [usersRoleFilter, setUsersRoleFilter] = useState<string>("all");

  // Actions & Dialog states
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [deleteConfirmEntry, setDeleteConfirmEntry] = useState<string | null>(null);
  const [batchConfirm, setBatchConfirm] = useState<"approve" | "reject" | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string; onUndo?: () => void } | null>(null);

  // Modern UI & Optimistic Batch Controls
  const [selectedSubmissions, setSelectedSubmissions] = useState<Set<string>>(new Set());
  const [catalogViewMode, setCatalogViewMode] = useState<"table" | "grid">("table");
  const [codebaseSyncModalOpen, setCodebaseSyncModalOpen] = useState(false);
  const [expandedSubmissionName, setExpandedSubmissionName] = useState<string | null>(null);
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);
  const [copiedSyncCmd, setCopiedSyncCmd] = useState(false);

  // Modals (Google Admin: Admins NEVER edit user profiles, only manage IAM Roles, access, or purge)
  const [inspectingUser, setInspectingUser] = useState<UserProfile | null>(null);
  const [roleManagingUser, setRoleManagingUser] = useState<UserProfile | null>(null);
  const [selectedNewRole, setSelectedNewRole] = useState<string>("developer");

  const [reviewingEntry, setReviewingEntry] = useState<Entry | null>(null);
  const [editingEntry, setEditingEntry] = useState<EditingEntryState | null>(null);
  const [blockingUser, setBlockingUser] = useState<UserProfile | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<UserProfile | null>(null);
  const [directDeleteModalOpen, setDirectDeleteModalOpen] = useState(false);
  const [directDeleteUidInput, setDirectDeleteUidInput] = useState("");

  // User Chats Management state (Admin ability to clear user chat from database)
  const [chatManagingUser, setChatManagingUser] = useState<UserProfile | null>(null);
  const [userChatsList, setUserChatsList] = useState<ChatSession[]>([]);
  const [loadingUserChats, setLoadingUserChats] = useState(false);
  const [clearChatsConfirmUser, setClearChatsConfirmUser] = useState<UserProfile | null>(null);

  // Site Announcements state
  const [announcement, setAnnouncement] = useState<SiteAnnouncement>(() => {
    try {
      const stored = localStorage.getItem("aiverse_site_announcement");
      if (stored) {
        const parsed = JSON.parse(stored);
        const count = defaultEntries.length || 242;
        if (parsed?.message && (parsed.message.includes("228+") || parsed.message.includes("238+"))) {
          parsed.message = parsed.message
            .replace(/\b(228|238)\+\b/g, `${count}+`)
            .replace(/compare \d+\+ open/g, `compare ${count}+ open`);
          localStorage.setItem("aiverse_site_announcement", JSON.stringify(parsed));
        }
        return parsed;
      }
      return DEFAULT_ANNOUNCEMENT;
    } catch {
      return DEFAULT_ANNOUNCEMENT;
    }
  });

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const stored = localStorage.getItem("aiverse_admin_audit_logs");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [auditFilter, setAuditFilter] = useState<"all" | "actions" | "radar" | "leaderboard" | "iam">("all");
  const [auditSearchQuery, setAuditSearchQuery] = useState("");
  const [inspectingLog, setInspectingLog] = useState<AuditLogItem | null>(null);
  const [copiedLogJson, setCopiedLogJson] = useState(false);

  const showToast = (type: "success" | "error", message: string, onUndo?: () => void) => {
    setToast({ type, message, onUndo });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), toast.onUndo ? 7000 : 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const logAudit = async (action: string, details: string) => {
    try {
      const newLog: AuditLogItem = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        action,
        details,
        adminEmail: user?.email || "admin",
        timestamp: new Date().toISOString(),
      };
      setAuditLogs((prev) => {
        const updated = [newLog, ...prev].slice(0, 100);
        try {
          localStorage.setItem("aiverse_admin_audit_logs", JSON.stringify(updated));
        } catch {}
        return updated;
      });

      // Persist to Supabase server-side audit logs
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
  };

  const clearAuditLogs = () => {
    try {
      localStorage.removeItem("aiverse_admin_audit_logs");
    } catch {}
    setAuditLogs([]);
    showToast("success", "Local audit display cleared. Server audit trail remains immutable.");
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch pending & approved entries in parallel
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

      const loadedPendingRaw: Entry[] = (pendingResult.data as Entry[]) || [];
      const loadedApproved: Entry[] = (approvedResult.data as Entry[]) || [];

      // Build approved map and lookup set (combining defaultEntries & remote approved)
      const mergedMap = new Map<string, Entry>();
      defaultEntries.forEach((e) => {
        if (e && e.name) mergedMap.set(e.name.toLowerCase().trim(), { ...e, approved: true });
      });
      loadedApproved.forEach((e) => {
        if (e && e.name) mergedMap.set(e.name.toLowerCase().trim(), e);
      });
      const approvedEntriesList = Array.from(mergedMap.values());
      setApprovedEntries(approvedEntriesList);

      const approvedNamesSet = new Set<string>();
      approvedEntriesList.forEach((e) => {
        if (e && e.name) approvedNamesSet.add(e.name.toLowerCase().trim());
      });

      // Track locally approved and dismissed pulse requests
      let localApprovedPulse = new Set<string>();
      try {
        const stored = localStorage.getItem("aiverse_approved_pulse_requests");
        if (stored) {
          const arr = JSON.parse(stored);
          if (Array.isArray(arr)) arr.forEach((n) => localApprovedPulse.add(String(n).toLowerCase().trim()));
        }
      } catch {}

      let localDismissedPulse = new Set<string>();
      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        if (stored) {
          const arr = JSON.parse(stored);
          if (Array.isArray(arr)) arr.forEach((n) => localDismissedPulse.add(String(n).toLowerCase().trim()));
        }
      } catch {}

      // Filter loaded pending: exclude soft-deleted entries, already-approved entries, and dismissed entries
      const loadedPending: Entry[] = loadedPendingRaw.filter((p) => {
        if (!p || !p.name) return false;
        const normName = p.name.toLowerCase().trim();
        if (p.summary === "[Deleted from Directory]" || p.summary?.startsWith("[Deleted")) return false;
        if (approvedNamesSet.has(normName) || localApprovedPulse.has(normName)) return false;
        if (localDismissedPulse.has(normName)) return false;
        return true;
      });

      // Also merge any automated daily pulse requests waiting for review (ONLY if not approved or dismissed)
      try {
        const pulseRes = await fetch("/data/pending_pulse_requests.json");
        if (pulseRes.ok) {
          const pulseItems = await pulseRes.json();
          if (Array.isArray(pulseItems)) {
            const pendingNames = new Set(loadedPending.map((p) => (p.name || "").toLowerCase().trim()));
            pulseItems.forEach((item: Entry) => {
              if (item && item.name) {
                const normName = item.name.toLowerCase().trim();
                if (
                  !pendingNames.has(normName) &&
                  !approvedNamesSet.has(normName) &&
                  !localApprovedPulse.has(normName) &&
                  !localDismissedPulse.has(normName) &&
                  item.summary !== "[Deleted from Directory]"
                ) {
                  loadedPending.push({ ...item, approved: false, submitted_by: item.submitted_by || "daily-pulse-bot" });
                  pendingNames.add(normName);
                }
              }
            });
          }
        }
      } catch {}

      setPendingEntries(loadedPending);

      // 3. Fetch user accounts (try get_admin_users to capture all auth.users, fallback to user_preferences)
      let usersRows: any[] = [];
      try {
        const { data: rpcUsers, error: rpcErr } = await supabase.rpc("get_admin_users");
        if (!rpcErr && Array.isArray(rpcUsers) && rpcUsers.length > 0) {
          usersRows = rpcUsers;
        }
      } catch {}

      if (usersRows.length === 0) {
        const { data: usersData, error: usersErr } = await supabase
          .from("user_preferences")
          .select("*")
          .order("updated_at", { ascending: false });

        if (usersErr) throw usersErr;
        usersRows = usersData || [];
      }

      const parsedUsers: UserProfile[] = usersRows.map((row: any) => {
        let meta: any = {};
        try {
          if (row.referral_source) {
            meta = JSON.parse(row.referral_source);
          }
        } catch {}

        let blockedUntilDate: string | undefined = undefined;
        let isUserBlocked = false;
        const rawBlockedUntil = row.blocked_until || meta.blockedUntil || meta.blocked_until;
        if (rawBlockedUntil) {
          const bDate = new Date(rawBlockedUntil);
          if (bDate.getTime() > Date.now()) {
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
        if (user && (row.user_key === currentUserKey || (user.id && row.user_key === user.id) || (user.id && row.user_key.includes(user.id)))) {
          const realOAuth = getOAuthAvatarUrl(user);
          if (realOAuth) userAvatar = realOAuth;
        }

        const fallbackName = row.email ? row.email.split("@")[0] : `User_${String(row.user_key).slice(-6)}`;
        const isDeletionReq = Boolean(meta.deletionRequested || meta.deletion_requested || row.deletion_requested);
        const reqReason = meta.deletionReason || meta.deletion_reason || row.deletion_reason || "";
        const reqAt = meta.deletionRequestedAt || meta.deletion_requested_at || row.deletion_requested_at || undefined;

        return {
          userKey: row.user_key || (row.user_id ? `supabase_${row.user_id}` : `user_${Math.random()}`),
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
          deletionRequested: isDeletionReq,
          deletionReason: reqReason,
          deletionRequestedAt: reqAt,
        };
      });

      setUsers(parsedUsers);

      // 4. Fetch live broadcast announcement
      try {
        const liveAnn = await fetchSiteAnnouncement();
        if (liveAnn) setAnnouncement(liveAnn);
      } catch {}

      // 5. Fetch server-persisted audit logs & GitHub Action automation logs
      try {
        let combinedLogs: AuditLogItem[] = [];

        // 5a. Fetch Supabase server audit logs
        try {
          const { data: serverLogs, error: logsErr } = await supabase
            .from("admin_audit_logs")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(100);

          if (!logsErr && serverLogs && serverLogs.length > 0) {
            combinedLogs = serverLogs.map((log: any) => ({
              id: log.id,
              action: log.action,
              details: log.details,
              adminEmail: log.actor_email || "admin",
              timestamp: log.created_at,
              workflow: log.metadata?.workflow,
              status: log.metadata?.status,
              summary: log.metadata?.summary,
              metadata: log.metadata,
            }));
          }
        } catch (serverErr) {
          console.warn("Server audit logs notice:", serverErr);
        }

        // 5b. Fetch static/recent GitHub Action execution logs from /data/github_action_logs.json
        try {
          const actionLogsRes = await fetch("/data/github_action_logs.json", { cache: "no-cache" });
          if (actionLogsRes.ok) {
            const actionLogs = await actionLogsRes.json();
            if (Array.isArray(actionLogs)) {
              const existingIds = new Set(combinedLogs.map((l) => l.id));
              actionLogs.forEach((actLog: any) => {
                if (!existingIds.has(actLog.id)) {
                  combinedLogs.push({
                    id: actLog.id,
                    action: actLog.action,
                    details: actLog.details,
                    adminEmail: actLog.actor_email || "github-actions[bot]",
                    timestamp: actLog.created_at || actLog.timestamp,
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

        // Sort descending by timestamp
        combinedLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        if (combinedLogs.length > 0) {
          setAuditLogs(combinedLogs);
          try {
            localStorage.setItem("aiverse_admin_audit_logs", JSON.stringify(combinedLogs));
          } catch {}
        }
      } catch (logErr) {
        console.warn("Audit logs notice (falling back to local cache):", logErr);
      }
    } catch (err: any) {
      console.error("Admin dashboard load failed:", err);
      setError(err.message || "Failed to query admin records.");
      setApprovedEntries(defaultEntries.map((e) => ({ ...e, approved: true })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ── Actions: Entry Management ─────────────────────────────────────────────

  // Helper to sanitize entry payload strictly for Supabase entries table schema
  const sanitizeEntryForCatalogDb = (entry: Partial<Entry>) => ({
    name: String(entry.name || "").trim(),
    org: entry.org ? String(entry.org).trim() : null,
    type: String(entry.type || "Model").trim(),
    task: String(entry.task || "NLP").trim(),
    license: entry.license ? String(entry.license).trim() : null,
    year: typeof entry.year === "number" ? entry.year : (entry.year ? parseInt(String(entry.year), 10) || new Date().getFullYear() : new Date().getFullYear()),
    size: entry.size ? String(entry.size).trim() : null,
    summary: String(entry.summary || "").trim(),
    architecture: entry.architecture ? String(entry.architecture).trim() : null,
    usage: entry.usage ? String(entry.usage).trim() : null,
    benchmarks: entry.benchmarks ? String(entry.benchmarks).trim() : null,
    limitations: entry.limitations ? String(entry.limitations).trim() : null,
    url: entry.url ? String(entry.url).trim() : null,
    citations: Array.isArray(entry.citations) ? entry.citations : [],
    popular: Boolean(entry.popular),
    approved: true,
    submitted_by: entry.submitted_by || null,
  });

  // ── Multi-select batch helpers ──────────────────────────────────────────
  const toggleSelectAllSubmissions = () => {
    if (selectedSubmissions.size === filteredSubmissions.length && filteredSubmissions.length > 0) {
      setSelectedSubmissions(new Set());
    } else {
      setSelectedSubmissions(new Set(filteredSubmissions.map((e) => e.name)));
    }
  };

  const toggleSelectSubmission = (name: string) => {
    setSelectedSubmissions((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  // ── Optimistic Action: Single Approve with 0ms UI update, Undo, and Rollback ─
  const handleApprove = async (entry: Entry) => {
    // 0ms Optimistic Update: Immediately reflect approval in UI
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
    if (expandedSubmissionName === entry.name) setExpandedSubmissionName(null);

    // Provide immediate undo capability with 7-second grace window
    showToast("success", `"${entry.name}" approved and published to catalog.`, async () => {
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      try {
        await supabase
          .from("entries")
          .update({ approved: false })
          .eq("name", entry.name);
        logAudit("Undo Approval", `Reverted approval for "${entry.name}"`);
      } catch (err) {
        console.warn("Failed to revert approval in DB:", err);
      }
    });

    logAudit("Approve Asset", `Approved and published "${entry.name}" to directory`);

    // Asynchronous background database persistence
    setActioningId(entry.name);
    try {
      const dbPayload = sanitizeEntryForCatalogDb(entry);

      // Attempt 1: update existing record if already in DB
      const { data: updated, error: updateErr } = await supabase
        .from("entries")
        .update({ approved: true })
        .eq("name", entry.name)
        .select();

      if (updateErr || !updated || updated.length === 0) {
        // Fallback: upsert with explicit onConflict on "name"
        const { error: upsertErr } = await supabase
          .from("entries")
          .upsert([dbPayload], { onConflict: "name" });
        if (upsertErr) throw upsertErr;
      }

      // Persist to local approved pulse tracking
      try {
        const stored = localStorage.getItem("aiverse_approved_pulse_requests");
        const list: string[] = stored ? JSON.parse(stored) : [];
        const set = new Set(list.map((n) => n.toLowerCase().trim()));
        set.add(entry.name.toLowerCase().trim());
        localStorage.setItem("aiverse_approved_pulse_requests", JSON.stringify(Array.from(set)));
      } catch {}

      // Clean from dismissed pulse tracking if previously recorded
      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        if (stored) {
          const list: string[] = JSON.parse(stored);
          const filtered = list.filter((n) => n.toLowerCase().trim() !== entry.name.toLowerCase().trim());
          localStorage.setItem("aiverse_dismissed_pulse_requests", JSON.stringify(filtered));
        }
      } catch {}
    } catch (err: any) {
      // Automatic rollback on DB failure
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      showToast("error", `Database sync failed for "${entry.name}". Rolled back: ${err.message || err.details || "Database error"}`);
    } finally {
      setActioningId(null);
    }
  };

  // ── Optimistic Action: Batch Approve (Selection or All) with 0ms UI update, Undo, and Chunked Upsert ─
  const handleBatchApprove = async (specificNames?: string[]) => {
    const targetNames = specificNames && specificNames.length > 0
      ? new Set(specificNames)
      : selectedSubmissions.size > 0
      ? new Set(selectedSubmissions)
      : new Set(pendingEntries.map((e) => e.name));

    if (targetNames.size === 0) return;

    const targets = pendingEntries.filter((e) => targetNames.has(e.name));
    const targetNamesList = targets.map((e) => e.name);
    const count = targets.length;

    // 0ms Optimistic UI updates
    const prevPending = [...pendingEntries];
    const prevApproved = [...approvedEntries];

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

    // Provide instant undo
    showToast("success", `Approved ${count} submissions to catalog.`, async () => {
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      try {
        await supabase
          .from("entries")
          .update({ approved: false })
          .in("name", targetNamesList);
        logAudit("Undo Batch Approval", `Reverted approval for ${count} submissions`);
      } catch (err) {
        console.warn("Failed to revert batch approval in DB:", err);
      }
    });

    logAudit("Batch Approve", `Approved ${count} pending submissions at once`);

    // Background chunked upsert to Supabase
    setActioningId("batch_approve");
    try {
      // 1. Update any entries already present in DB
      const { error: updateErr } = await supabase
        .from("entries")
        .update({ approved: true })
        .in("name", targetNamesList);
      if (updateErr) {
        console.warn("[Admin] Batch update warning:", updateErr.message);
      }

      // 2. Batch upsert in chunks of 25 with cleaned payload & explicit onConflict: "name"
      const cleaned = targets.map(sanitizeEntryForCatalogDb);
      const chunkSize = 25;
      for (let i = 0; i < cleaned.length; i += chunkSize) {
        const chunk = cleaned.slice(i, i + chunkSize);
        const { error: upsertErr } = await supabase
          .from("entries")
          .upsert(chunk, { onConflict: "name" });
        if (upsertErr) throw upsertErr;
      }

      // Persist all approved names to local tracking
      try {
        const stored = localStorage.getItem("aiverse_approved_pulse_requests");
        const list: string[] = stored ? JSON.parse(stored) : [];
        const set = new Set(list.map((n) => n.toLowerCase().trim()));
        targetNamesList.forEach((n) => set.add(n.toLowerCase().trim()));
        localStorage.setItem("aiverse_approved_pulse_requests", JSON.stringify(Array.from(set)));
      } catch {}

      // Clean all approved names from dismissed tracking
      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        if (stored) {
          const list: string[] = JSON.parse(stored);
          const nameSet = new Set(targetNamesList.map((n) => n.toLowerCase().trim()));
          const filtered = list.filter((n) => !nameSet.has(n.toLowerCase().trim()));
          localStorage.setItem("aiverse_dismissed_pulse_requests", JSON.stringify(filtered));
        }
      } catch {}
    } catch (err: any) {
      // Rollback on DB error
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      showToast("error", `Batch approve database sync failed. Rolled back: ${err.message || err.details || "Database error"}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleBatchApproveAll = async () => {
    return handleBatchApprove();
  };

  // ── Optimistic Action: Single Reject with 0ms UI update and Undo ──────────
  const handleReject = async (entryName: string) => {
    const prevPending = [...pendingEntries];
    const target = pendingEntries.find((e) => e.name === entryName);
    if (!target) return;

    // 0ms Optimistic Update
    setPendingEntries((prev) => prev.filter((e) => e.name !== entryName));
    setSelectedSubmissions((prev) => {
      const next = new Set(prev);
      next.delete(entryName);
      return next;
    });
    if (reviewingEntry?.name === entryName) setReviewingEntry(null);
    if (expandedSubmissionName === entryName) setExpandedSubmissionName(null);
    setDeleteConfirmEntry(null);

    showToast("success", `Rejected "${entryName}" from review queue.`, () => {
      setPendingEntries(prevPending);
      logAudit("Undo Reject", `Restored "${entryName}" to review queue`);
    });

    logAudit("Reject Asset", `Rejected "${entryName}" from review queue`);

    // Background deletion
    setActioningId(entryName);
    try {
      const { error: err } = await supabase
        .from("entries")
        .delete()
        .eq("name", entryName);
      if (err) throw err;

      // Track as dismissed pulse
      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        const list: string[] = stored ? JSON.parse(stored) : [];
        const set = new Set(list.map((n) => n.toLowerCase().trim()));
        set.add(entryName.toLowerCase().trim());
        localStorage.setItem("aiverse_dismissed_pulse_requests", JSON.stringify(Array.from(set)));
      } catch {}
    } catch (err: any) {
      setPendingEntries(prevPending);
      showToast("error", `Failed to reject "${entryName}". Rolled back: ${err.message || "Database error"}`);
    } finally {
      setActioningId(null);
    }
  };

  // ── Optimistic Action: Batch Reject (Selection or All) ────────────────────
  const handleBatchReject = async (specificNames?: string[]) => {
    const targetNames = specificNames && specificNames.length > 0
      ? new Set(specificNames)
      : selectedSubmissions.size > 0
      ? new Set(selectedSubmissions)
      : new Set(pendingEntries.map((e) => e.name));

    if (targetNames.size === 0) return;

    const targetNamesList = Array.from(targetNames);
    const count = targetNamesList.length;
    const prevPending = [...pendingEntries];

    // 0ms Optimistic Update
    setPendingEntries((prev) => prev.filter((e) => !targetNames.has(e.name)));
    setSelectedSubmissions(new Set());
    setBatchConfirm(null);

    showToast("success", `Purged ${count} submissions from queue.`, () => {
      setPendingEntries(prevPending);
      logAudit("Undo Batch Reject", `Restored ${count} submissions to queue`);
    });

    logAudit("Batch Reject", `Purged ${count} pending submissions from queue`);

    setActioningId("batch_reject");
    try {
      const { error: err } = await supabase
        .from("entries")
        .delete()
        .in("name", targetNamesList);
      if (err) throw err;

      // Persist rejected names to local dismissed tracking
      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        const list: string[] = stored ? JSON.parse(stored) : [];
        const set = new Set(list.map((n) => n.toLowerCase().trim()));
        targetNamesList.forEach((n) => set.add(n.toLowerCase().trim()));
        localStorage.setItem("aiverse_dismissed_pulse_requests", JSON.stringify(Array.from(set)));
      } catch {}
    } catch (err: any) {
      setPendingEntries(prevPending);
      showToast("error", `Batch reject failed. Rolled back: ${err.message || "Database error"}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleBatchRejectAll = async () => {
    return handleBatchReject();
  };

  // ── Optimistic Action: Delete from Active Catalog with Rollback and Undo ──
  const executeDelete = async (entryName: string) => {
    const prevPending = [...pendingEntries];
    const prevApproved = [...approvedEntries];

    // 0ms Optimistic UI update
    setPendingEntries((prev) => prev.filter((e) => e.name !== entryName));
    setApprovedEntries((prev) => prev.filter((e) => e.name !== entryName));
    if (reviewingEntry?.name === entryName) setReviewingEntry(null);
    setDeleteConfirmEntry(null);

    showToast("success", `"${entryName}" has been deleted from catalog.`, () => {
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      logAudit("Undo Delete", `Restored "${entryName}" to catalog`);
    });

    logAudit("Delete Asset", `Deleted "${entryName}" from catalog`);

    setActioningId(entryName);
    try {
      const { error: err } = await supabase
        .from("entries")
        .upsert({
          name: entryName,
          type: "Model",
          task: "NLP",
          summary: "[Deleted from Directory]",
          approved: false,
        }, { onConflict: "name" });

      if (err) throw err;

      // Track as dismissed pulse / deleted
      try {
        const stored = localStorage.getItem("aiverse_dismissed_pulse_requests");
        const list: string[] = stored ? JSON.parse(stored) : [];
        const set = new Set(list.map((n) => n.toLowerCase().trim()));
        set.add(entryName.toLowerCase().trim());
        localStorage.setItem("aiverse_dismissed_pulse_requests", JSON.stringify(Array.from(set)));
      } catch {}

      // Remove from approved tracking if present
      try {
        const stored = localStorage.getItem("aiverse_approved_pulse_requests");
        if (stored) {
          const list: string[] = JSON.parse(stored);
          const filtered = list.filter((n) => n.toLowerCase().trim() !== entryName.toLowerCase().trim());
          localStorage.setItem("aiverse_approved_pulse_requests", JSON.stringify(filtered));
        }
      } catch {}
    } catch (err: any) {
      setPendingEntries(prevPending);
      setApprovedEntries(prevApproved);
      showToast("error", `Failed to delete "${entryName}". Rolled back: ${err.message || "Database error"}`);
    } finally {
      setActioningId(null);
    }
  };

  // ── Optimistic Action: Star / Featured Toggle ─────────────────────────────
  const handleTogglePopular = async (entry: Entry) => {
    const newPopular = !entry.popular;
    const prevApproved = [...approvedEntries];

    // 0ms Optimistic UI update
    setApprovedEntries((prev) =>
      prev.map((e) => (e.name === entry.name ? { ...e, popular: newPopular } : e))
    );
    showToast("success", `"${entry.name}" marked as ${newPopular ? "Featured ⭐" : "Standard"}.`);
    logAudit("Toggle Featured", `Updated "${entry.name}" featured status to ${newPopular}`);

    setActioningId(entry.name);
    try {
      const { error: err } = await supabase
        .from("entries")
        .update({ popular: newPopular })
        .eq("name", entry.name);

      if (err) throw err;
    } catch (err: any) {
      setApprovedEntries(prevApproved);
      showToast("error", `Failed to update featured state: ${err.message || "Database error"}`);
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
        const { error: err } = await supabase.from("entries").insert([{
          ...payload,
          citations: [],
          created_at: new Date().toISOString(),
        }]);
        if (err) throw err;

        const newEntry = { ...payload, citations: [] } as Entry;
        setApprovedEntries((prev) => [newEntry, ...prev]);
        showToast("success", `"${editingEntry.name}" published to catalog.`);
        logAudit("Create Asset", `Created new asset "${editingEntry.name}" in catalog`);
      } else {
        const { error: err } = await supabase
          .from("entries")
          .upsert({
            ...payload,
            citations: (editingEntry as any).citations || [],
            approved: true,
          }, { onConflict: "name" });
        if (err) throw err;

        setApprovedEntries((prev) =>
          prev.map((item) =>
            item.name === editingEntry.name ? ({ ...item, ...payload } as Entry) : item
          )
        );
        showToast("success", `"${editingEntry.name}" specifications updated.`);
        logAudit("Edit Asset", `Modified technical specs for "${editingEntry.name}"`);
      }
      setEditingEntry(null);
    } catch (err: any) {
      showToast("error", `Failed to save entry: ${err.message}`);
    } finally {
      setActioningId(null);
    }
  };

  // ── Actions: User Governance & IAM (NO EDITING PERSONAL USER DETAILS) ──────

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
        prev.map((u) => (u.userKey === profile.userKey ? { ...u, role: newRole } : u))
      );
      showToast("success", `Role for "${profile.displayName}" updated to ${newRole}.`);
      logAudit("Assign Role", `Changed role for "${profile.displayName}" (${profile.username}) to ${newRole}`);
      setRoleManagingUser(null);
    } catch (err: any) {
      showToast("error", `Failed to update user role: ${err.message}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleExecuteBlock = async (
    profile: UserProfile,
    isBlocked: boolean,
    durationMs: number = 0
  ) => {
    if (profile.userKey === currentUserKey || (user && profile.userKey === user.id)) {
      showToast("error", "Security violation: You cannot suspend your own admin account.");
      return;
    }

    setActioningId(profile.userKey);
    try {
      let blockedUntilValue: string | null = null;
      if (isBlocked) {
        if (durationMs === -1) {
          blockedUntilValue = "9999-12-31T23:59:59.999Z";
        } else {
          blockedUntilValue = new Date(Date.now() + durationMs).toISOString();
        }
      }

      const { data: currentPref } = await supabase
        .from("user_preferences")
        .select("referral_source")
        .eq("user_key", profile.userKey)
        .maybeSingle();

      let metaObj: any = {};
      try {
        if (currentPref?.referral_source) {
          metaObj = JSON.parse(currentPref.referral_source);
        }
      } catch {}

      metaObj.blockedUntil = blockedUntilValue;
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
            : u
        )
      );

      const msg = isBlocked
        ? `Account for "${profile.displayName}" suspended.`
        : `Suspension lifted for "${profile.displayName}".`;
      showToast("success", msg);
      logAudit("Suspend Account", `${isBlocked ? "Suspended" : "Reactivated"} account "${profile.displayName}"`);
      setBlockingUser(null);
    } catch (err: any) {
      showToast("error", `Failed to modify status: ${err.message}`);
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
        supabase.from("user_preferences").delete().in("user_key", [profile.userKey, formattedKey, rawUuid]),
        supabase.from("user_bookmarks").delete().in("user_key", [profile.userKey, formattedKey, rawUuid]),
        supabase.from("entry_ratings").delete().in("user_key", [profile.userKey, formattedKey, rawUuid]),
        supabase.from("entry_comments").delete().in("user_key", [profile.userKey, formattedKey, rawUuid]),
        supabase.from("user_chats").delete().in("user_key", [profile.userKey, formattedKey, rawUuid]),
      ]);

      if (rpcErr) {
        console.error("delete_user_by_admin RPC error:", rpcErr);
        throw new Error(rpcErr.message || "Failed to purge account from auth.users");
      }

      setUsers((prev) =>
        prev.filter(
          (u) =>
            u.userKey !== profile.userKey &&
            u.userKey !== formattedKey &&
            u.userKey !== rawUuid
        )
      );
      if (inspectingUser?.userKey === profile.userKey) setInspectingUser(null);
      showToast("success", `Account "${profile.displayName}" permanently deleted.`);
      logAudit("Purge Account", `Permanently purged credentials and data for "${profile.displayName}" (${profile.username})`);
    } catch (err: any) {
      showToast("error", `Failed to delete user: ${err.message}`);
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
    } catch (err: any) {
      console.warn("Failed to fetch user chats:", err);
      showToast("error", `Could not query user chats: ${err.message}`);
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
      showToast("success", `Cleared all chat history for "${profile.displayName}" from database.`);
      logAudit("Clear User Chats", `Permanently cleared chat history from database for "${profile.displayName}" (${profile.userKey})`);
    } catch (err: any) {
      showToast("error", `Failed to clear user chats: ${err.message}`);
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
      logAudit("Delete User Chat Session", `Deleted chat session "${sessionId}" for user "${profile.displayName}"`);
    } catch (err: any) {
      showToast("error", `Failed to delete session: ${err.message}`);
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

      let meta: any = {};
      if (prefData?.referral_source) {
        try {
          meta = JSON.parse(prefData.referral_source);
        } catch {}
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
          u.userKey === profile.userKey || u.userKey === formattedKey || u.userKey === rawUuid
            ? { ...u, deletionRequested: false, deletionReason: undefined, deletionRequestedAt: undefined }
            : u
        )
      );
      showToast("success", `Deletion request for "${profile.displayName}" dismissed.`);
      logAudit("Dismiss Deletion Request", `Dismissed account deletion request for "${profile.displayName}" (${profile.username})`);
    } catch (err: any) {
      showToast("error", `Failed to dismiss deletion request: ${err.message}`);
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
          (u) =>
            u.userKey !== trimmed &&
            u.userKey !== formattedKey &&
            u.userKey !== rawUuid
        )
      );
      showToast("success", `Account ${rawUuid} permanently deleted everywhere.`);
      logAudit("Purge User UID", `Deleted account with UID ${rawUuid} directly from auth.users`);
      setDirectDeleteModalOpen(false);
      setDirectDeleteUidInput("");
    } catch (err: any) {
      showToast("error", `Failed to purge user: ${err.message}`);
    } finally {
      setActioningId(null);
    }
  };

  // ── Actions: Data Exports ─────────────────────────────────────────────────

  const exportDataAsJson = (data: any, filename: string) => {
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
      logAudit("Export Snapshot", `Exported ${filename} snapshot`);
    } catch (err: any) {
      showToast("error", `Export failed: ${err.message}`);
    }
  };

  // ── Actions: Site Announcements ───────────────────────────────────────────

  const handleSaveAnnouncement = async (ann: SiteAnnouncement) => {
    try {
      await saveSiteAnnouncement(ann, currentUserKey);
      setAnnouncement({ ...ann, updatedAt: new Date().toISOString() });
      showToast(
        "success",
        ann.enabled
          ? "Site announcement broadcasted globally!"
          : "Announcement disabled."
      );
      logAudit(
        "Site Announcement",
        ann.enabled
          ? `Broadcasted banner: "${ann.message.slice(0, 35)}..."`
          : "Deactivated site-wide announcement"
      );
    } catch (err: any) {
      showToast("error", `Failed to save announcement: ${err.message}`);
    }
  };

  // ── Computed Lists ────────────────────────────────────────────────────────

  const pendingDeletionUsers = useMemo(() => {
    return users.filter((u) => Boolean(u.deletionRequested));
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = usersSearch.toLowerCase();
      const matchesQuery =
        !q ||
        u.displayName.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        Boolean(u.deletionReason && u.deletionReason.toLowerCase().includes(q));

      const matchesRole = usersRoleFilter === "all" || u.role.toLowerCase() === usersRoleFilter.toLowerCase();

      return matchesQuery && matchesRole;
    });
  }, [users, usersSearch, usersRoleFilter]);

  const filteredApproved = useMemo(() => {
    return approvedEntries.filter((entry) => {
      const q = directorySearch.toLowerCase();
      const matchesQuery =
        !q ||
        entry.name.toLowerCase().includes(q) ||
        (entry.org || "").toLowerCase().includes(q) ||
        entry.type.toLowerCase().includes(q) ||
        entry.task.toLowerCase().includes(q);

      const matchesType = directoryTypeFilter === "All" || entry.type === directoryTypeFilter;
      const matchesTask = directoryTaskFilter === "All Tasks" || entry.task === directoryTaskFilter;
      const matchesFeatured = !directoryFeaturedOnly || !!entry.popular;

      return matchesQuery && matchesType && matchesTask && matchesFeatured;
    });
  }, [approvedEntries, directorySearch, directoryTypeFilter, directoryTaskFilter, directoryFeaturedOnly]);

  const paginatedApproved = useMemo(() => {
    const start = (directoryPage - 1) * directoryPageSize;
    return filteredApproved.slice(start, start + directoryPageSize);
  }, [filteredApproved, directoryPage, directoryPageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredApproved.length / directoryPageSize));

  const filteredSubmissions = useMemo(() => {
    return pendingEntries.filter((entry) => {
      const q = submissionsSearch.toLowerCase();
      const matchesQuery =
        !q ||
        entry.name.toLowerCase().includes(q) ||
        (entry.org || "").toLowerCase().includes(q) ||
        entry.task.toLowerCase().includes(q);

      const matchesType = submissionsTypeFilter === "All" || entry.type === submissionsTypeFilter;
      return matchesQuery && matchesType;
    });
  }, [pendingEntries, submissionsSearch, submissionsTypeFilter]);

  // Analytics Metrics
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { Model: 0, Framework: 0, Dataset: 0, Platform: 0, AI: 0 };
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

  const featuredCount = useMemo(() => approvedEntries.filter((e) => e.popular).length, [approvedEntries]);

  const latestAiRadarRun = useMemo(() => {
    return auditLogs.find(
      (l) => l.action === "AI_RADAR_SYNC" || l.workflow?.includes("AI Radar")
    );
  }, [auditLogs]);

  const latestLeaderboardRun = useMemo(() => {
    return auditLogs.find(
      (l) => l.action === "LEADERBOARD_SYNC" || l.workflow?.includes("Leaderboard")
    );
  }, [auditLogs]);

  const pipelineLogCounts = useMemo(() => {
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
        if (l.action === "LEADERBOARD_SYNC" || l.workflow?.includes("Leaderboard")) leaderboardCount++;
      } else {
        iamCount++;
      }
    });

    return { actionCount, radarCount, leaderboardCount, iamCount };
  }, [auditLogs]);

  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      // 1. Category filter
      const isPipeline =
        log.adminEmail.includes("github-actions") ||
        log.action === "AI_RADAR_SYNC" ||
        log.action === "LEADERBOARD_SYNC" ||
        Boolean(log.workflow);

      if (auditFilter === "actions" && !isPipeline) return false;
      if (auditFilter === "radar" && log.action !== "AI_RADAR_SYNC" && !log.workflow?.includes("Radar")) return false;
      if (auditFilter === "leaderboard" && log.action !== "LEADERBOARD_SYNC" && !log.workflow?.includes("Leaderboard")) return false;
      if (auditFilter === "iam" && isPipeline) return false;

      // 2. Search query filter
      if (auditSearchQuery.trim()) {
        const q = auditSearchQuery.toLowerCase();
        const matchesAction = (log.action || "").toLowerCase().includes(q);
        const matchesDetails = (log.details || "").toLowerCase().includes(q);
        const matchesActor = (log.adminEmail || "").toLowerCase().includes(q);
        const matchesWorkflow = (log.workflow || "").toLowerCase().includes(q);
        const matchesSummary = (log.summary || "").toLowerCase().includes(q);
        return matchesAction || matchesDetails || matchesActor || matchesWorkflow || matchesSummary;
      }

      return true;
    });
  }, [auditLogs, auditFilter, auditSearchQuery]);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col bg-[#f8f9fa] dark:bg-[#131314] text-[#202124] dark:text-[#e8eaed] text-left">
      {/* ── Google Cloud App Bar ────────────────────────────────────────────── */}
      <header className="h-14 px-4 border-b border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] transition-colors cursor-pointer"
            title="Toggle Navigation Menu"
          >
            <Menu size={18} />
          </button>

          <button
            onClick={onBackToHome}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] transition-colors cursor-pointer"
            title="Back to AiVerse Home"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#1a73e8] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <ShieldCheck size={16} />
            </div>
            <span className="font-semibold text-sm tracking-tight text-[#202124] dark:text-[#e8eaed]">
              AiVerse Cloud Console
            </span>
            <span className="hidden sm:inline-block text-[#5f6368] dark:text-[#9aa0a6] text-xs opacity-40">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e8e3e]" />
              Production
            </span>

            {/* Live Telemetry Status Pills */}
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8]">
              <Layers size={12} />
              {approvedEntries.length} Live Assets
            </span>
            {pendingEntries.length > 0 ? (
              <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#fef7e0] text-[#7c4a03] dark:bg-[#332a00] dark:text-[#fdd663]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f9ab00] animate-pulse" />
                {pendingEntries.length} In Review
              </span>
            ) : (
              <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995]">
                <Check size={11} className="stroke-[2.5px]" />
                Queue Pristine
              </span>
            )}
          </div>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCodebaseSyncModalOpen(true)}
            title="Codebase & Supabase Sync status and seed scripts"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium border border-[#dadce0] dark:border-[#3c4043] bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] transition-colors cursor-pointer"
          >
            <Terminal size={13} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
            <span className="hidden md:inline">Codebase Sync</span>
          </button>

          <button
            onClick={() => {
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
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] shadow-xs cursor-pointer transition-colors"
          >
            <Plus size={14} className="stroke-[2.5px]" />
            <span className="hidden sm:inline">Add Asset</span>
          </button>

          {!loading && (
            <button
              onClick={loadData}
              title="Refresh database records"
              className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] transition-colors cursor-pointer"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
          )}

          <button
            onClick={() => setDirectDeleteModalOpen(true)}
            title="Purge account directly by Supabase Auth UID"
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#d93025] hover:border-[#d93025] transition-colors cursor-pointer"
          >
            <Trash2 size={12} />
            Purge UID
          </button>
        </div>
      </header>

      {/* ── Main Layout: Google Cloud Left Navigation Drawer + Content Pane ── */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Backdrop when admin sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden animate-[fadeIn_0.15s_ease-out]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Google Admin Left Navigation Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "fixed md:relative inset-y-0 left-0 w-64 z-40 md:z-10 shadow-2xl md:shadow-none" : "w-0 -translate-x-full"
          } transition-all duration-200 border-r border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] flex flex-col justify-between shrink-0 overflow-y-auto`}
        >
          <div className="py-3 px-2 space-y-4">
            {/* Group 1: Identity & Access Management */}
            <div>
              <p className="px-3 text-[10px] font-semibold text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                Directory & Access
              </p>
              <nav className="space-y-0.5">
                <button
                  onClick={() => handleNavSelect("users")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeNav === "users"
                      ? "bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-semibold"
                      : "text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users size={15} />
                    <span>Users</span>
                  </div>
                  <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] font-normal">
                    {users.length}
                  </span>
                </button>

                <button
                  onClick={() => handleNavSelect("deletion_requests")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeNav === "deletion_requests"
                      ? "bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82] font-semibold"
                      : "text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert size={15} className={pendingDeletionUsers.length > 0 ? "text-[#d93025]" : ""} />
                    <span>Deletion Approvals</span>
                  </div>
                  {pendingDeletionUsers.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#d93025] text-white">
                      {pendingDeletionUsers.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            {/* Group 2: Catalog Governance */}
            <div>
              <p className="px-3 text-[10px] font-semibold text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                Catalog Governance
              </p>
              <nav className="space-y-0.5">
                <button
                  onClick={() => handleNavSelect("submissions")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeNav === "submissions"
                      ? "bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-semibold"
                      : "text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Server size={15} />
                    <span>Review Queue</span>
                  </div>
                  {pendingEntries.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#b06000] text-white">
                      {pendingEntries.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleNavSelect("directory")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeNav === "directory"
                      ? "bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-semibold"
                      : "text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Database size={15} />
                    <span>Catalog Directory</span>
                  </div>
                  <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] font-normal">
                    {approvedEntries.length}
                  </span>
                </button>
              </nav>
            </div>

            {/* Group 3: Operations & Cloud */}
            <div>
              <p className="px-3 text-[10px] font-semibold text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                Cloud & Operations
              </p>
              <nav className="space-y-0.5">
                <button
                  onClick={() => handleNavSelect("infrastructure")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeNav === "infrastructure"
                      ? "bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-semibold"
                      : "text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Database size={15} />
                    <span>Supabase & Storage</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
                </button>

                <button
                  onClick={() => handleNavSelect("analytics")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeNav === "analytics"
                      ? "bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-semibold"
                      : "text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <BarChart3 size={15} />
                  <span>Cloud Telemetry</span>
                </button>

                <button
                  onClick={() => handleNavSelect("announcements")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeNav === "announcements"
                      ? "bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-semibold"
                      : "text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Megaphone size={15} />
                    <span>Site Broadcast</span>
                  </div>
                  {announcement.enabled && (
                    <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
                  )}
                </button>

                <button
                  onClick={() => handleNavSelect("audit")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeNav === "audit"
                      ? "bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-semibold"
                      : "text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <History size={15} />
                    <span>Audit & Pipeline Logs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {pipelineLogCounts.actionCount > 0 && (
                      <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8]">
                        🤖 {pipelineLogCounts.actionCount}
                      </span>
                    )}
                    <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] font-mono">
                      {auditLogs.length}
                    </span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Admin User Footer in Sidebar */}
          <div className="p-3 border-t border-[#dadce0] dark:border-[#3c4043] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1a73e8] text-white flex items-center justify-center font-bold text-xs">
              {user?.email ? user.email[0].toUpperCase() : "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[#202124] dark:text-[#e8eaed] truncate">
                {user?.email || "Administrator"}
              </p>
              <p className="text-[10px] text-[#1e8e3e] font-semibold">Security Officer</p>
            </div>
          </div>
        </aside>

        {/* ── Main Workspace Area ────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Policy Notice if any */}
          {error && (
            <div className="p-4 rounded-lg bg-[#fef7e0] border border-[#f9ab00] text-[#7c4a03] dark:bg-[#332a00] dark:text-[#fdd663] text-xs flex gap-3">
              <Info size={16} className="shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Database returned notice: {error}. Catalog fallback active. All management tools remain operational.
              </p>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              SECTION 1: USERS (GOOGLE ADMIN DIRECTORY)
          ════════════════════════════════════════════════════════════════════ */}
          {activeNav === "users" && (
            <div className="space-y-4">
              {/* Header Title & Actions Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-medium text-[#202124] dark:text-[#e8eaed]">Users</h2>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Directory of registered builder accounts, assigned enterprise roles, and security access states.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportDataAsJson(users, "aiverse_users")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] cursor-pointer transition-colors"
                  >
                    <Download size={13} />
                    Download Users
                  </button>
                </div>
              </div>

              {/* Security Alert if Deletion Requests Pending */}
              {pendingDeletionUsers.length > 0 && (
                <div className="p-3.5 rounded-lg border border-[#f9ab00] bg-[#fef7e0] dark:bg-[#332a00] dark:border-[#f9ab00]/50 text-[#7c4a03] dark:text-[#fdd663] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert size={16} className="shrink-0 text-[#b06000]" />
                    <p className="text-xs">
                      <strong>{pendingDeletionUsers.length} Account Deletion Request{pendingDeletionUsers.length > 1 ? "s" : ""}</strong> require administrator approval. Users cannot self-delete.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavSelect("deletion_requests")}
                    className="px-2.5 py-1 rounded text-xs font-semibold bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
                  >
                    Review Requests
                  </button>
                </div>
              )}

              {/* Filter and Search Bar */}
              <div className="p-3 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm w-full">
                  <input
                    type="text"
                    value={usersSearch}
                    onChange={(e) => setUsersSearch(e.target.value)}
                    placeholder="Search by name, handle, or email..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-[#f1f3f4] dark:bg-[#202124] focus:bg-white dark:focus:bg-[#1e1f20] text-xs outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                  <Search className="absolute left-2.5 top-2 text-[#5f6368] dark:text-[#9aa0a6]" size={13} />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={usersRoleFilter}
                    onChange={(e) => setUsersRoleFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs outline-none cursor-pointer"
                  >
                    <option value="all">All Roles ({users.length})</option>
                    <option value="developer">Developers</option>
                    <option value="researcher">Researchers</option>
                    <option value="designer">Designers</option>
                    <option value="pm">Product Managers</option>
                    <option value="founder">Founders</option>
                  </select>

                  <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    {filteredUsers.length} accounts
                  </span>
                </div>
              </div>

              {/* Google Admin Users Data Table */}
              <div className="rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                        <th className="px-4 py-3">Name</th>
                        <th className="px-3 py-3">Role & Permissions</th>
                        <th className="px-3 py-3">Status</th>
                        <th className="px-3 py-3">Last Active</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dadce0]/60 dark:divide-[#3c4043]/60 text-xs">
                      {filteredUsers.map((profile) => (
                        <tr
                          key={profile.userKey}
                          className="hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center font-bold text-xs text-[#202124] dark:text-[#e8eaed] shrink-0">
                                {profile.avatarUrl ? (
                                  <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  profile.displayName[0].toUpperCase()
                                )}
                              </div>
                              <div className="min-w-0">
                                <button
                                  onClick={() => setInspectingUser(profile)}
                                  className="font-medium text-[#202124] dark:text-[#e8eaed] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] hover:underline cursor-pointer truncate max-w-[170px] text-left block"
                                >
                                  {profile.displayName}
                                </button>
                                <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] font-mono truncate max-w-[170px] block">
                                  {profile.username}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <span className="capitalize px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed]">
                              {profile.role}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            {profile.deletionRequested ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82] border border-[#f5b4af] dark:border-[#5c2423]">
                                <AlertTriangle size={10} />
                                Deletion Pending
                              </span>
                            ) : profile.isBlocked ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82]">
                                Suspended
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995]">
                                Active
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6] font-mono text-[11px]">
                            {new Date(profile.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setInspectingUser(profile)}
                                className="px-2 py-1 rounded text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#e8f0fe] dark:hover:bg-[#1a2e4c] transition-colors cursor-pointer"
                                title="Inspect user account details"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleViewUserChats(profile)}
                                className="px-2 py-1 rounded text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#e8f0fe] dark:hover:bg-[#1a2e4c] transition-colors cursor-pointer inline-flex items-center gap-1"
                                title="Inspect and clear user chat conversations from database"
                              >
                                <MessageSquare size={12} />
                                <span>Chats</span>
                              </button>
                              <button
                                onClick={() => {
                                  setRoleManagingUser(profile);
                                  setSelectedNewRole(profile.role);
                                }}
                                className="px-2 py-1 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                                title="Change role and IAM permissions"
                              >
                                Change Role
                              </button>
                              <button
                                onClick={() => setBlockingUser(profile)}
                                className={`px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                                  profile.isBlocked
                                    ? "text-[#137333] dark:text-[#81c995] hover:bg-[#e6f4ea] dark:hover:bg-[#0d3419]"
                                    : "text-[#b06000] dark:text-[#fdd663] hover:bg-[#fef7e0] dark:hover:bg-[#332a00]"
                                }`}
                              >
                                {profile.isBlocked ? "Unsuspend" : "Suspend"}
                              </button>
                              <button
                                onClick={() => setDeleteConfirmUser(profile)}
                                className="p-1 rounded text-[#d93025] dark:text-[#f28b82] hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer"
                                title="Delete account"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              SECTION 2: ACCOUNT DELETION APPROVALS QUEUE
          ════════════════════════════════════════════════════════════════════ */}
          {activeNav === "deletion_requests" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-[#202124] dark:text-[#e8eaed]">Account Deletion Approvals</h2>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                  Organizational security governance: Users do not have permission to self-delete accounts. Review and approve permanent purge or dismiss.
                </p>
              </div>

              {pendingDeletionUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-dashed rounded-lg border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995] mb-1">
                    <Check size={22} className="stroke-[2.5px]" />
                  </div>
                  <p className="text-sm font-medium text-[#202124] dark:text-[#e8eaed]">No pending deletion requests</p>
                  <p className="text-xs max-w-sm text-[#5f6368] dark:text-[#9aa0a6]">
                    There are currently zero user account deletion requests awaiting administrative review.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                          <th className="px-4 py-3">User Account</th>
                          <th className="px-3 py-3">Requested Reason</th>
                          <th className="px-3 py-3">Request Date</th>
                          <th className="px-4 py-3 text-right">Approval Decision</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dadce0]/60 dark:divide-[#3c4043]/60 text-xs">
                        {pendingDeletionUsers.map((profile) => (
                          <tr key={profile.userKey} className="hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center font-bold text-xs text-[#202124] dark:text-[#e8eaed] shrink-0">
                                  {profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    profile.displayName[0].toUpperCase()
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-[#202124] dark:text-[#e8eaed]">
                                    {profile.displayName}
                                  </p>
                                  <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] font-mono">
                                    {profile.username}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              <div className="max-w-md p-2 rounded bg-[#fef7e0]/50 dark:bg-[#332a00]/50 border border-[#f9ab00]/30 text-[#7c4a03] dark:text-[#fdd663]">
                                <p className="italic text-xs">
                                  "{profile.deletionReason || "No specific reason provided."}"
                                </p>
                              </div>
                            </td>
                            <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6] font-mono text-[11px]">
                              {profile.deletionRequestedAt
                                ? new Date(profile.deletionRequestedAt).toLocaleString()
                                : "Pending"}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleRejectDeletionRequest(profile)}
                                  disabled={actioningId === profile.userKey}
                                  className="px-2.5 py-1.5 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
                                >
                                  Dismiss Request
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmUser(profile)}
                                  disabled={actioningId === profile.userKey}
                                  className="px-3 py-1.5 rounded text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer shadow-xs transition-colors disabled:opacity-50"
                                >
                                  Approve & Purge
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              SECTION 3: REVIEW QUEUE (PENDING SUBMISSIONS)
          ════════════════════════════════════════════════════════════════════ */}
          {/* ════════════════════════════════════════════════════════════════════
              SECTION 3: REVIEW QUEUE (PENDING SUBMISSIONS) - OPTIMISTIC & MODERN
          ════════════════════════════════════════════════════════════════════ */}
          {activeNav === "submissions" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium text-[#202124] dark:text-[#e8eaed]">Review Queue</h2>
                    {pendingEntries.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#fef7e0] text-[#7c4a03] dark:bg-[#332a00] dark:text-[#fdd663] border border-[#f9ab00]/30">
                        {pendingEntries.length} awaiting audit
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Audit and approve community-submitted models, frameworks, datasets, and platforms with 0ms optimistic publishing.
                  </p>
                </div>
                {pendingEntries.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setCodebaseSyncModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#dadce0] dark:border-[#3c4043] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <Terminal size={13} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
                      Codebase Sync
                    </button>
                    <button
                      onClick={() => exportDataAsJson(pendingEntries, "aiverse_pending_queue")}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] border border-[#dadce0] dark:border-[#3c4043] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors flex items-center gap-1"
                      title="Download JSON of pending entries"
                    >
                      <Download size={13} />
                      Export JSON
                    </button>
                    <button
                      onClick={() => {
                        if (selectedSubmissions.size > 0) {
                          handleBatchApprove(Array.from(selectedSubmissions));
                        } else {
                          setBatchConfirm("approve");
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCheck size={14} />
                      {selectedSubmissions.size > 0
                        ? `Approve Selected (${selectedSubmissions.size})`
                        : `Approve All (${pendingEntries.length})`}
                    </button>
                    <button
                      onClick={() => {
                        if (selectedSubmissions.size > 0) {
                          handleBatchReject(Array.from(selectedSubmissions));
                        } else {
                          setBatchConfirm("reject");
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#d93025] border border-[#d93025]/30 hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] cursor-pointer transition-colors"
                    >
                      {selectedSubmissions.size > 0 ? `Purge Selected (${selectedSubmissions.size})` : "Purge All"}
                    </button>
                  </div>
                )}
              </div>

              {pendingEntries.length > 0 && (
                <div className="p-3.5 rounded-xl border border-[#1a73e8]/25 bg-[#e8f0fe] dark:bg-[#1a2e4c] text-xs text-[#174ea6] dark:text-[#8ab4f8] flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Info size={16} className="shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <span>
                        <strong>Optimistic Publishing Active:</strong> Clicking Approve immediately publishes the asset with instant zero-latency UI response and an undo toast. To sync local repository static files (<code>src/data.ts</code>), run <code>npm run approve:pending</code>.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCodebaseSyncModalOpen(true)}
                    className="shrink-0 px-2 py-1 rounded bg-white/60 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 text-[11px] font-semibold text-[#1a73e8] dark:text-[#8ab4f8] transition-colors cursor-pointer"
                  >
                    Details &rarr;
                  </button>
                </div>
              )}

              {/* Filter and Search Bar for Submissions */}
              {pendingEntries.length > 0 && (
                <div className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm w-full">
                    <input
                      type="text"
                      value={submissionsSearch}
                      onChange={(e) => setSubmissionsSearch(e.target.value)}
                      placeholder="Search queue by asset or organization..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#dadce0] dark:border-[#5f6368] bg-[#f1f3f4] dark:bg-[#202124] focus:bg-white dark:focus:bg-[#1e1f20] text-xs outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                    />
                    <Search className="absolute left-2.5 top-2 text-[#5f6368] dark:text-[#9aa0a6]" size={13} />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={submissionsTypeFilter}
                      onChange={(e) => setSubmissionsTypeFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs outline-none cursor-pointer"
                    >
                      <option value="All">All Categories ({pendingEntries.length})</option>
                      <option value="Model">Models</option>
                      <option value="Framework">Frameworks</option>
                      <option value="Dataset">Datasets</option>
                      <option value="Platform">Platforms</option>
                      <option value="AI">AI Applications</option>
                    </select>

                    <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                      {filteredSubmissions.length} pending
                    </span>
                  </div>
                </div>
              )}

              {filteredSubmissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 gap-4 text-center border border-dashed rounded-2xl border-[#dadce0] dark:border-[#3c4043] bg-gradient-to-b from-white to-[#f8f9fa] dark:from-[#1e1f20] dark:to-[#171718] shadow-xs">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-[#e6f4ea] to-[#ceead6] dark:from-[#0d3419] dark:to-[#137333]/30 text-[#137333] dark:text-[#81c995] shadow-inner mb-1">
                    <Sparkles size={28} className="stroke-[2px]" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995] mb-1">
                      <CheckCircle2 size={12} /> 100% Up to Date
                    </div>
                    <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed]">
                      Review queue is pristine
                    </h3>
                    <p className="text-xs max-w-md text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                      All community submissions, Daily Pulse discoveries, and AI assets have been audited and deployed to the active catalog.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleNavSelect("directory")}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Layers size={14} />
                      Browse Catalog ({approvedEntries.length})
                    </button>
                    <button
                      onClick={() => setCodebaseSyncModalOpen(true)}
                      className="px-4 py-2 rounded-lg text-xs font-medium border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#202124] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Terminal size={14} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
                      Codebase Sync
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                          <th className="w-10 px-3 py-3 text-center">
                            <button
                              type="button"
                              onClick={toggleSelectAllSubmissions}
                              title={selectedSubmissions.size === filteredSubmissions.length ? "Deselect All" : "Select All"}
                              className="text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] cursor-pointer"
                            >
                              {selectedSubmissions.size > 0 && selectedSubmissions.size === filteredSubmissions.length ? (
                                <CheckSquare size={15} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
                              ) : selectedSubmissions.size > 0 ? (
                                <div className="w-3.5 h-3.5 rounded-xs border-2 border-[#1a73e8] flex items-center justify-center">
                                  <div className="w-2 h-1 bg-[#1a73e8]" />
                                </div>
                              ) : (
                                <Square size={15} />
                              )}
                            </button>
                          </th>
                          <th className="px-3 py-3">Asset</th>
                          <th className="px-3 py-3">Organization</th>
                          <th className="px-3 py-3">Category</th>
                          <th className="px-3 py-3">Task Domain</th>
                          <th className="px-3 py-3">Submitter</th>
                          <th className="px-3 py-3">License & Size</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dadce0]/60 dark:divide-[#3c4043]/60 text-xs">
                        {filteredSubmissions.map((entry) => {
                          const submitter = users.find((u) => u.userKey === entry.submitted_by);
                          const isNew = isNewSubmission(entry.created_at);
                          const isSelected = selectedSubmissions.has(entry.name);
                          const isExpanded = expandedSubmissionName === entry.name;

                          return (
                            <React.Fragment key={entry.name}>
                              <tr
                                className={`transition-colors ${
                                  isSelected
                                    ? "bg-[#e8f0fe]/50 dark:bg-[#1a2e4c]/30"
                                    : "hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d]"
                                }`}
                              >
                                <td className="w-10 px-3 py-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => toggleSelectSubmission(entry.name)}
                                    className="text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] cursor-pointer"
                                  >
                                    {isSelected ? (
                                      <CheckSquare size={15} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
                                    ) : (
                                      <Square size={15} />
                                    )}
                                  </button>
                                </td>
                                <td className="px-3 py-3">
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setExpandedSubmissionName(isExpanded ? null : entry.name)}
                                      className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer transition-colors"
                                      title={isExpanded ? "Collapse inline specs" : "Expand inline specs"}
                                    >
                                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>
                                    <button
                                      onClick={() => setReviewingEntry(entry)}
                                      className="font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer text-left"
                                    >
                                      {entry.name}
                                    </button>
                                    {isNew && (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1a2e4c] dark:text-[#a8c7fa]">
                                        NEW
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6]">{entry.org || "Independent"}</td>
                                <td className="px-3 py-3">
                                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${typeBadge(entry.type, t)}`}>
                                    {entry.type}
                                  </span>
                                </td>
                                <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6]">{entry.task}</td>
                                <td className="px-3 py-3">
                                  {entry.submitted_by === "daily-pulse-bot" ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1a2e4c] dark:text-[#a8c7fa] border border-[#1967d2]/20">
                                      <Sparkles size={11} className="text-[#1967d2] dark:text-[#a8c7fa]" />
                                      Daily Pulse Bot
                                    </span>
                                  ) : (
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-5 h-5 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[9px] font-bold">
                                        {submitter?.avatarUrl ? (
                                          <img src={submitter.avatarUrl} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                          submitter?.displayName ? submitter.displayName[0].toUpperCase() : "U"
                                        )}
                                      </div>
                                      <span className="text-[#202124] dark:text-[#e8eaed] truncate max-w-[110px]">
                                        {submitter ? submitter.displayName : "Community Member"}
                                      </span>
                                    </div>
                                  )}
                                </td>
                                <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6]">
                                  {entry.license} · {entry.size}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setReviewingEntry(entry)}
                                      className="px-2.5 py-1 rounded-lg text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#e8f0fe] dark:hover:bg-[#1a2e4c] transition-colors cursor-pointer"
                                    >
                                      Inspect Specs
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleApprove(entry)}
                                      disabled={actioningId === entry.name}
                                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] text-white transition-colors cursor-pointer disabled:opacity-50"
                                      title="Instantly approve and publish"
                                    >
                                      {actioningId === entry.name ? "..." : "Approve"}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleReject(entry.name)}
                                      disabled={actioningId === entry.name}
                                      className="p-1.5 rounded-lg text-[#d93025] dark:text-[#f28b82] hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer disabled:opacity-50"
                                      title="Reject submission"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                </td>
                              </tr>

                              {/* Inline Quick-Specs Drawer */}
                              {isExpanded && (
                                <tr className="bg-[#f8f9fa]/80 dark:bg-[#18191a]/80">
                                  <td colSpan={8} className="px-6 py-4 border-b border-[#dadce0] dark:border-[#3c4043]">
                                    <div className="space-y-3 max-w-4xl">
                                      <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                                          Summary
                                        </span>
                                        <p className="mt-0.5 text-xs text-[#202124] dark:text-[#e8eaed] leading-relaxed">
                                          {entry.summary || "No summary description provided."}
                                        </p>
                                      </div>

                                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                                        <div className="p-2.5 rounded-lg bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043]">
                                          <span className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6] block">Architecture</span>
                                          <span className="font-semibold text-[#202124] dark:text-[#e8eaed]">{entry.architecture || "Standard"}</span>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043]">
                                          <span className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6] block">Benchmarks</span>
                                          <span className="font-semibold text-[#202124] dark:text-[#e8eaed]">{entry.benchmarks || "N/A"}</span>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043]">
                                          <span className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6] block">Parameters / Size</span>
                                          <span className="font-semibold text-[#202124] dark:text-[#e8eaed]">{entry.size || "Unknown"}</span>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043]">
                                          <span className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6] block">Documentation</span>
                                          {entry.url ? (
                                            <a
                                              href={entry.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="font-semibold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline flex items-center gap-1"
                                            >
                                              Open URL <ExternalLink size={11} />
                                            </a>
                                          ) : (
                                            <span className="text-[#5f6368] dark:text-[#9aa0a6]">None</span>
                                          )}
                                        </div>
                                      </div>

                                      {entry.usage && (
                                        <div className="pt-1">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                                              Quickstart / Usage Code
                                            </span>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                navigator.clipboard.writeText(entry.usage || "");
                                                setCopiedCodeKey(entry.name);
                                                setTimeout(() => setCopiedCodeKey(null), 2000);
                                              }}
                                              className="inline-flex items-center gap-1 text-[11px] text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
                                            >
                                              {copiedCodeKey === entry.name ? (
                                                <>
                                                  <Check size={12} className="text-[#1e8e3e]" />
                                                  <span>Copied!</span>
                                                </>
                                              ) : (
                                                <>
                                                  <Copy size={12} />
                                                  <span>Copy Snippet</span>
                                                </>
                                              )}
                                            </button>
                                          </div>
                                          <pre className="p-3 rounded-lg bg-[#202124] text-white font-mono text-[11px] leading-relaxed overflow-x-auto max-h-36">
                                            {entry.usage}
                                          </pre>
                                        </div>
                                      )}

                                      <div className="flex items-center justify-end gap-2 pt-2">
                                        <button
                                          type="button"
                                          onClick={() => handleReject(entry.name)}
                                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#d93025] hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer"
                                        >
                                          Reject Submission
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleApprove(entry)}
                                          className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                                        >
                                          <Check size={13} />
                                          Approve Immediately
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Floating Batch Action Bar when items selected */}
              {selectedSubmissions.size > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#202124]/95 dark:bg-white/95 text-white dark:text-[#202124] px-5 py-3 rounded-2xl shadow-2xl border border-neutral-700/80 dark:border-neutral-200/80 flex items-center gap-4 backdrop-blur-md animate-[fadeUp_0.2s_ease-out]">
                  <div className="flex items-center gap-2 font-medium text-xs">
                    <span className="w-5 h-5 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-[10px] font-bold">
                      {selectedSubmissions.size}
                    </span>
                    <span>selected</span>
                  </div>
                  <div className="h-4 w-px bg-white/20 dark:bg-black/20" />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBatchApprove(Array.from(selectedSubmissions))}
                      disabled={actioningId === "batch_approve"}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a73e8] hover:bg-[#1557b0] text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <CheckCheck size={14} />
                      Approve Selected ({selectedSubmissions.size})
                    </button>
                    <button
                      onClick={() => handleBatchReject(Array.from(selectedSubmissions))}
                      disabled={actioningId === "batch_reject"}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#d93025]/90 hover:bg-[#d93025] text-white transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 size={13} />
                      Reject Selected
                    </button>
                    <button
                      onClick={() => {
                        const selectedEntries = pendingEntries.filter((e) => selectedSubmissions.has(e.name));
                        exportDataAsJson(selectedEntries, `aiverse_selected_submissions_${selectedSubmissions.size}`);
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-white/20 dark:border-black/20 hover:bg-white/10 dark:hover:bg-black/5 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Download size={13} />
                      Export
                    </button>
                    <button
                      onClick={() => setSelectedSubmissions(new Set())}
                      className="px-2 py-1 text-xs opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
                    >
                      Deselect
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              SECTION 4: CATALOG DIRECTORY (LIVE APPROVED ASSETS) - TABLE & GRID
          ════════════════════════════════════════════════════════════════════ */}
          {activeNav === "directory" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-medium text-[#202124] dark:text-[#e8eaed]">Catalog Directory</h2>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    All {approvedEntries.length} verified and published models, tools, and platforms in the live registry.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-[#dadce0] dark:border-[#3c4043] rounded-lg p-0.5 bg-neutral-100 dark:bg-neutral-800">
                    <button
                      onClick={() => setCatalogViewMode("table")}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                        catalogViewMode === "table"
                          ? "bg-white dark:bg-[#1e1f20] text-[#1a73e8] dark:text-[#8ab4f8] shadow-xs"
                          : "text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed]"
                      }`}
                      title="Table View"
                    >
                      <List size={13} />
                      <span className="hidden sm:inline">Table</span>
                    </button>
                    <button
                      onClick={() => setCatalogViewMode("grid")}
                      className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                        catalogViewMode === "grid"
                          ? "bg-white dark:bg-[#1e1f20] text-[#1a73e8] dark:text-[#8ab4f8] shadow-xs"
                          : "text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed]"
                      }`}
                      title="Grid View"
                    >
                      <LayoutGrid size={13} />
                      <span className="hidden sm:inline">Grid</span>
                    </button>
                  </div>
                  <button
                    onClick={() => exportDataAsJson(approvedEntries, "aiverse_catalog")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] cursor-pointer transition-colors"
                  >
                    <Download size={13} />
                    Export Catalog
                  </button>
                </div>
              </div>

              {/* Search and Filters Bar */}
              <div className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md w-full">
                    <input
                      type="text"
                      value={directorySearch}
                      onChange={(e) => {
                        setDirectorySearch(e.target.value);
                        setDirectoryPage(1);
                      }}
                      placeholder="Search active catalog by name, org, or task..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#dadce0] dark:border-[#5f6368] bg-[#f1f3f4] dark:bg-[#202124] focus:bg-white dark:focus:bg-[#1e1f20] text-xs outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                    />
                    <Search className="absolute left-2.5 top-2 text-[#5f6368] dark:text-[#9aa0a6]" size={13} />
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={directoryTaskFilter}
                      onChange={(e) => {
                        setDirectoryTaskFilter(e.target.value);
                        setDirectoryPage(1);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs outline-none cursor-pointer"
                    >
                      <option value="All Tasks">All Tasks</option>
                      {taskCounts.map(([taskName]) => (
                        <option key={taskName} value={taskName}>{taskName}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => {
                        setDirectoryFeaturedOnly((f) => !f);
                        setDirectoryPage(1);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        directoryFeaturedOnly
                          ? "bg-[#fef7e0] border-[#f9ab00] text-[#7c4a03] dark:bg-[#332a00] dark:text-[#fdd663]"
                          : "border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-50 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <Star size={12} className={directoryFeaturedOnly ? "fill-[#f9ab00] text-[#f9ab00]" : ""} />
                      Featured ({featuredCount})
                    </button>
                  </div>
                </div>

                {/* Google Material 3 Category Filter Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60">
                  <span className="text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] mr-1">Category:</span>
                  {(["All", "Model", "Framework", "Dataset", "Platform", "AI"] as const).map((type) => {
                    const isSelected = directoryTypeFilter === type;
                    return (
                      <button
                        key={type}
                        onClick={() => {
                          setDirectoryTypeFilter(type);
                          setDirectoryPage(1);
                        }}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                          isSelected
                            ? "bg-[#c2e7ff] text-[#001d35] dark:bg-[#004a77] dark:text-[#c2e7ff] border-transparent font-semibold"
                            : "bg-transparent text-[#444746] dark:text-[#c4c7c5] border-[#747775]/40 dark:border-[#8e918f]/40 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }`}
                      >
                        <span>{type === "All" ? "All Types" : type}</span>
                        {type !== "All" && (
                          <span className="text-[10px] opacity-75">({typeCounts[type] || 0})</span>
                        )}
                      </button>
                    );
                  })}
                  <div className="ml-auto text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Showing <strong className="text-[#202124] dark:text-[#e8eaed]">{filteredApproved.length}</strong> of {approvedEntries.length} assets
                  </div>
                </div>
              </div>

              {/* View 1: Card Grid Mode */}
              {catalogViewMode === "grid" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {paginatedApproved.map((entry) => (
                      <div
                        key={entry.name}
                        className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${typeBadge(entry.type, t)}`}>
                                {entry.type}
                              </span>
                              <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] truncate max-w-[140px]">
                                {entry.org || "Independent"}
                              </span>
                            </div>
                            <button
                              onClick={() => handleTogglePopular(entry)}
                              className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                              title={entry.popular ? "Featured (click to unfeature)" : "Click to feature"}
                            >
                              <Star
                                size={15}
                                className={entry.popular ? "fill-[#f9ab00] text-[#f9ab00]" : "text-[#5f6368] dark:text-[#9aa0a6]"}
                              />
                            </button>
                          </div>
                          <button
                            onClick={() => onViewEntry?.(entry)}
                            className="mt-1 font-semibold text-sm text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer text-left line-clamp-1"
                          >
                            {entry.name}
                          </button>
                          <p className="mt-1 text-xs text-[#5f6368] dark:text-[#9aa0a6] line-clamp-2 leading-relaxed">
                            {entry.summary || "No summary description provided."}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60 flex items-center justify-between text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                          <div className="flex items-center gap-2">
                            <span>{entry.task}</span>
                            <span>·</span>
                            <span>{entry.license || "Open"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onViewEntry?.(entry)}
                              className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] cursor-pointer"
                              title="View asset details"
                            >
                              <Eye size={13} />
                            </button>
                            {entry.url && (
                              <a
                                href={entry.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8]"
                                title="Open documentation"
                              >
                                <ExternalLink size={13} />
                              </a>
                            )}
                            <button
                              onClick={() => {
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
                                  popular: !!entry.popular,
                                });
                              }}
                              className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] cursor-pointer"
                              title="Edit specs"
                            >
                              <Edit size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmEntry(entry.name)}
                              className="p-1.5 rounded hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] text-[#d93025] dark:text-[#f28b82] cursor-pointer"
                              title="Delete from catalog"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Footer for Grid */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    <div className="flex items-center gap-2">
                      <span>Cards per page:</span>
                      <select
                        value={directoryPageSize}
                        onChange={(e) => {
                          setDirectoryPageSize(Number(e.target.value));
                          setDirectoryPage(1);
                        }}
                        className="px-2 py-1 rounded border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#1e1f20] text-xs text-[#202124] dark:text-[#e8eaed] outline-none"
                      >
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>
                        {Math.min((directoryPage - 1) * directoryPageSize + 1, filteredApproved.length)}–
                        {Math.min(directoryPage * directoryPageSize, filteredApproved.length)} of {filteredApproved.length}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setDirectoryPage((p) => Math.max(1, p - 1))}
                          disabled={directoryPage === 1}
                          className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setDirectoryPage((p) => Math.min(totalPages, p + 1))}
                          disabled={directoryPage >= totalPages}
                          className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* View 2: Data Table Mode */
                <div className="rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                          <th className="px-4 py-3">Asset</th>
                          <th className="px-3 py-3">Organization</th>
                          <th className="px-3 py-3">Category</th>
                          <th className="px-3 py-3">Task Domain</th>
                          <th className="px-3 py-3">License</th>
                          <th className="px-3 py-3">Year</th>
                          <th className="px-3 py-3 text-center">Featured</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dadce0]/60 dark:divide-[#3c4043]/60 text-xs">
                        {paginatedApproved.map((entry) => (
                          <tr key={entry.name} className="hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors">
                            <td className="px-4 py-3 font-medium">
                              <button
                                onClick={() => onViewEntry?.(entry)}
                                className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer text-left"
                              >
                                {entry.name}
                              </button>
                            </td>
                            <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6]">{entry.org || "—"}</td>
                            <td className="px-3 py-3">
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${typeBadge(entry.type, t)}`}>
                                {entry.type}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6]">{entry.task}</td>
                            <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6]">{entry.license || "—"}</td>
                            <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6]">{entry.year}</td>
                            <td className="px-3 py-3 text-center">
                              <button
                                onClick={() => handleTogglePopular(entry)}
                                disabled={actioningId === entry.name}
                                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                                title={entry.popular ? "Featured (click to unfeature)" : "Click to feature"}
                              >
                                <Star
                                  size={14}
                                  className={entry.popular ? "fill-[#f9ab00] text-[#f9ab00]" : "text-[#5f6368] dark:text-[#9aa0a6]"}
                                />
                              </button>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => {
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
                                      popular: !!entry.popular,
                                    });
                                  }}
                                  className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#1a73e8] dark:text-[#8ab4f8] transition-colors cursor-pointer"
                                  title="Edit specs"
                                >
                                  <Edit size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmEntry(entry.name)}
                                  disabled={actioningId === entry.name}
                                  className="p-1.5 rounded hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] text-[#d93025] dark:text-[#f28b82] transition-colors cursor-pointer disabled:opacity-50"
                                  title="Delete asset"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Footer for Table */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    <div className="flex items-center gap-2">
                      <span>Rows per page:</span>
                      <select
                        value={directoryPageSize}
                        onChange={(e) => {
                          setDirectoryPageSize(Number(e.target.value));
                          setDirectoryPage(1);
                        }}
                        className="px-2 py-1 rounded border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#1e1f20] text-xs text-[#202124] dark:text-[#e8eaed] outline-none"
                      >
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>
                        {Math.min((directoryPage - 1) * directoryPageSize + 1, filteredApproved.length)}–
                        {Math.min(directoryPage * directoryPageSize, filteredApproved.length)} of {filteredApproved.length}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setDirectoryPage((p) => Math.max(1, p - 1))}
                          disabled={directoryPage === 1}
                          className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setDirectoryPage((p) => Math.min(totalPages, p + 1))}
                          disabled={directoryPage >= totalPages}
                          className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              SECTION 5: CLOUD TELEMETRY & METRICS
          ════════════════════════════════════════════════════════════════════ */}
          {activeNav === "analytics" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-[#202124] dark:text-[#e8eaed]">Cloud Telemetry & Quotas</h2>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                  Resource telemetry, catalog categories breakdown, and database snapshot exports.
                </p>
              </div>

              {/* KPI Metric Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { label: "Active Catalog", value: approvedEntries.length, sub: "Live assets verified", color: "text-[#1a73e8]" },
                  { label: "Review Queue", value: pendingEntries.length, sub: "Pending audit", color: "text-[#b06000]" },
                  { label: "Registered Builders", value: users.length, sub: "Active developer accounts", color: "text-[#1e8e3e]" },
                  { label: "Featured Showcases", value: featuredCount, sub: "Highlighted on home", color: "text-[#f9ab00]" },
                  { label: "Suspended Accounts", value: users.filter((u) => u.isBlocked).length, sub: "Access restricted", color: "text-[#d93025]" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] flex flex-col justify-between"
                  >
                    <p className="text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">{item.label}</p>
                    <div className="my-2">
                      <span className={`text-2xl sm:text-3xl font-bold ${item.color}`}>{item.value}</span>
                    </div>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Category Breakdown */}
              <div className="p-5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">Catalog Resource Distribution</h3>
                  <span className="text-xs font-mono font-medium text-[#5f6368] dark:text-[#9aa0a6]">{approvedEntries.length} Total</span>
                </div>

                <div className="space-y-3 pt-1">
                  {[
                    { type: "Model", label: "Models & LLMs", color: "bg-[#1a73e8]" },
                    { type: "Framework", label: "Frameworks & Libraries", color: "bg-[#1e8e3e]" },
                    { type: "Dataset", label: "Datasets & Corpora", color: "bg-[#f9ab00]" },
                    { type: "Platform", label: "Platforms & Compute", color: "bg-[#007bb6]" },
                    { type: "AI", label: "AI Applications", color: "bg-[#9334e6]" },
                  ].map((cat) => {
                    const count = typeCounts[cat.type] || 0;
                    const pct = approvedEntries.length > 0 ? Math.round((count / approvedEntries.length) * 100) : 0;
                    return (
                      <div key={cat.type} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-[#202124] dark:text-[#e8eaed]">{cat.label}</span>
                          <span className="font-mono text-[#5f6368] dark:text-[#9aa0a6]">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${cat.color}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Snapshot Backup Center */}
              <div className="p-5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-4">
                <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">Database Snapshots & Cold Storage</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <button
                    onClick={() => exportDataAsJson(approvedEntries, "aiverse_catalog_approved")}
                    className="p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] text-left cursor-pointer transition-colors"
                  >
                    <FileJson size={18} className="text-[#1a73e8] mb-1.5" />
                    <p className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">Catalog Assets</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">{approvedEntries.length} verified tools</p>
                  </button>

                  <button
                    onClick={() => exportDataAsJson(users, "aiverse_builders_directory")}
                    className="p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] text-left cursor-pointer transition-colors"
                  >
                    <Users size={18} className="text-[#1e8e3e] mb-1.5" />
                    <p className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">Builder Directory</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">{users.length} accounts</p>
                  </button>

                  <button
                    onClick={() => exportDataAsJson(pendingEntries, "aiverse_pending_queue")}
                    className="p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] text-left cursor-pointer transition-colors"
                  >
                    <Server size={18} className="text-[#b06000] mb-1.5" />
                    <p className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">Review Queue</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">{pendingEntries.length} pending items</p>
                  </button>

                  <button
                    onClick={() =>
                      exportDataAsJson(
                        {
                          catalog: approvedEntries,
                          users,
                          pending: pendingEntries,
                          announcement,
                          exportedAt: new Date().toISOString(),
                        },
                        "aiverse_complete_system_backup"
                      )
                    }
                    className="p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] text-left cursor-pointer transition-colors"
                  >
                    <Database size={18} className="text-[#1a73e8] dark:text-[#8ab4f8] mb-1.5" />
                    <p className="text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8]">Full Cloud Snapshot</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">Complete database bundle</p>
                  </button>

                  <button
                    onClick={() => handleNavSelect("infrastructure")}
                    className="p-3.5 rounded-lg border border-[#1a73e8]/40 bg-[#e8f0fe]/40 dark:bg-[#1a2e4c]/40 text-left cursor-pointer transition-colors hover:border-[#1a73e8]"
                  >
                    <Activity size={18} className="text-[#1a73e8] dark:text-[#8ab4f8] mb-1.5" />
                    <p className="text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8]">Supabase Console</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">Live DB & Storage explorer</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              SECTION 6: SITE ANNOUNCEMENT BROADCAST
          ════════════════════════════════════════════════════════════════════ */}
          {activeNav === "announcements" && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-4">
                <div>
                  <h2 className="text-lg font-medium text-[#202124] dark:text-[#e8eaed]">Site-wide Announcement Banner</h2>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">
                    Configure live top alert banners broadcasted to all visitors and developers.
                  </p>
                </div>

                {/* Banner Preview */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">Preview</span>
                  <div
                    className={`p-3 rounded-lg border text-xs font-medium flex items-center justify-between gap-3 ${
                      announcement.type === "warning"
                        ? "bg-[#fef7e0] border-[#fdd663] text-[#b06000] dark:bg-[#3b2d07] dark:border-[#5c4710] dark:text-[#fdd663]"
                        : announcement.type === "success"
                        ? "bg-[#e6f4ea] border-[#a8dab5] text-[#137333] dark:bg-[#0d3419] dark:border-[#1e5c30] dark:text-[#81c995]"
                        : announcement.type === "special"
                        ? "bg-[#f3e8fd] border-[#d7aefb] text-[#8430ce] dark:bg-[#2c1a4d] dark:border-[#512b91] dark:text-[#d7aefb]"
                        : "bg-[#e8f0fe] border-[#aecbfa] text-[#1967d2] dark:bg-[#1a2e4c] dark:border-[#28456c] dark:text-[#a8c7fa]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="shrink-0" />
                      <span>{announcement.message || "Enter announcement message below..."}</span>
                      {announcement.linkUrl && (
                        <span className="underline ml-1 font-semibold cursor-pointer">
                          {announcement.linkText || "Learn more"} →
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] opacity-60">Dismiss ✕</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124]">
                  <div>
                    <p className="text-xs font-medium text-[#202124] dark:text-[#e8eaed]">Banner Active State</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">Toggle visibility for site visitors</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnnouncement((prev) => ({ ...prev, enabled: !prev.enabled }))}
                    className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      announcement.enabled
                        ? "bg-[#1e8e3e] text-white"
                        : "bg-neutral-200 dark:bg-neutral-700 text-[#5f6368] dark:text-[#9aa0a6]"
                    }`}
                  >
                    {announcement.enabled ? "Active" : "Inactive"}
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">Announcement Text</label>
                  <textarea
                    value={announcement.message}
                    onChange={(e) => setAnnouncement((prev) => ({ ...prev, message: e.target.value }))}
                    rows={2}
                    maxLength={180}
                    className="w-full p-2.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSaveAnnouncement(announcement)}
                    className="px-4 py-2 rounded text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] cursor-pointer shadow-xs transition-colors"
                  >
                    Save & Broadcast
                  </button>
                  {announcement.enabled && (
                    <button
                      type="button"
                      onClick={() => handleSaveAnnouncement({ ...announcement, enabled: false })}
                      className="px-3 py-2 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
                    >
                      Deactivate
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              SECTION 7: SYSTEM AUDIT & GITHUB ACTION PIPELINE LOGS
          ════════════════════════════════════════════════════════════════════ */}
          {activeNav === "audit" && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-medium text-[#202124] dark:text-[#e8eaed] flex items-center gap-2">
                    <History size={20} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
                    <span>System Audit & CI/CD Pipeline Logs</span>
                  </h2>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Real-time execution log of automated GitHub Actions (AI Radar, Frontier Leaderboard) and platform administrative governance.
                  </p>
                </div>
                {auditLogs.length > 0 && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => exportDataAsJson(auditLogs, "aiverse_system_audit_logs")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Download size={13} />
                      Export Logs
                    </button>
                    <button
                      onClick={clearAuditLogs}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#d93025] border border-[#d93025]/30 hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer"
                    >
                      Clear Local View
                    </button>
                  </div>
                )}
              </div>

              {/* ── Top Automated Pipeline Health Cards ─────────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* AI Radar Card */}
                <div
                  onClick={() => setAuditFilter(auditFilter === "radar" ? "all" : "radar")}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    auditFilter === "radar"
                      ? "border-[#1a73e8] ring-2 ring-[#1a73e8]/20 bg-[#e8f0fe]/30 dark:bg-[#1a2e4c]/20"
                      : "border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] hover:border-[#1a73e8]/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <Radio size={16} />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">AI Radar & Ecosystem Discovery</h3>
                        <p className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6]">Runs ~10x daily (every 2.4 hrs) via GitHub Actions</p>
                      </div>
                    </div>
                    {latestAiRadarRun ? (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                        latestAiRadarRun.status === "error"
                          ? "bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82]"
                          : "bg-[#e6f4ea] text-[#137333] dark:bg-[#133824] dark:text-[#81c995]"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${latestAiRadarRun.status === "error" ? "bg-[#d93025]" : "bg-[#1e8e3e] animate-pulse"}`} />
                        {latestAiRadarRun.status === "error" ? "Failed" : "Operational"}
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6] bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                        Scheduled
                      </span>
                    )}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60 text-xs">
                    {latestAiRadarRun ? (
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium text-[#202124] dark:text-[#e8eaed] truncate">
                          {latestAiRadarRun.summary || latestAiRadarRun.details}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-[#5f6368] dark:text-[#9aa0a6]">
                          <span>Last Run: {new Date(latestAiRadarRun.timestamp).toLocaleTimeString()} ({new Date(latestAiRadarRun.timestamp).toLocaleDateString()})</span>
                          <span className="text-[#1a73e8] dark:text-[#8ab4f8] font-medium hover:underline">
                            {auditFilter === "radar" ? "Showing Radar Logs" : `View ${pipelineLogCounts.radarCount} Runs →`}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">No execution history recorded in this session.</p>
                    )}
                  </div>
                </div>

                {/* Frontier Leaderboard Sync Card */}
                <div
                  onClick={() => setAuditFilter(auditFilter === "leaderboard" ? "all" : "leaderboard")}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    auditFilter === "leaderboard"
                      ? "border-[#1a73e8] ring-2 ring-[#1a73e8]/20 bg-[#e8f0fe]/30 dark:bg-[#1a2e4c]/20"
                      : "border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] hover:border-[#1a73e8]/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                        <Zap size={16} />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">Frontier Leaderboard Sync</h3>
                        <p className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6]">Runs daily at 04:00 UTC via GitHub Actions</p>
                      </div>
                    </div>
                    {latestLeaderboardRun ? (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                        latestLeaderboardRun.status === "error"
                          ? "bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82]"
                          : "bg-[#e6f4ea] text-[#137333] dark:bg-[#133824] dark:text-[#81c995]"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${latestLeaderboardRun.status === "error" ? "bg-[#d93025]" : "bg-[#1e8e3e] animate-pulse"}`} />
                        {latestLeaderboardRun.status === "error" ? "Failed" : "Operational"}
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6] bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                        Scheduled
                      </span>
                    )}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60 text-xs">
                    {latestLeaderboardRun ? (
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium text-[#202124] dark:text-[#e8eaed] truncate">
                          {latestLeaderboardRun.summary || latestLeaderboardRun.details}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-[#5f6368] dark:text-[#9aa0a6]">
                          <span>Last Run: {new Date(latestLeaderboardRun.timestamp).toLocaleTimeString()} ({new Date(latestLeaderboardRun.timestamp).toLocaleDateString()})</span>
                          <span className="text-[#1a73e8] dark:text-[#8ab4f8] font-medium hover:underline">
                            {auditFilter === "leaderboard" ? "Showing Leaderboard Logs" : `View ${pipelineLogCounts.leaderboardCount} Runs →`}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">No execution history recorded in this session.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Filter Pills & Search Control ────────────────────────────── */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { key: "all", label: "All Logs", count: auditLogs.length },
                    { key: "actions", label: "🤖 CI/CD Pipelines", count: pipelineLogCounts.actionCount },
                    { key: "radar", label: "📡 AI Radar", count: pipelineLogCounts.radarCount },
                    { key: "leaderboard", label: "⚡ Leaderboard Sync", count: pipelineLogCounts.leaderboardCount },
                    { key: "iam", label: "🛡️ Admin & Security", count: pipelineLogCounts.iamCount },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setAuditFilter(tab.key as any)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        auditFilter === tab.key
                          ? "bg-[#1a73e8] text-white font-semibold shadow-xs"
                          : "bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#9aa0a6] border border-[#dadce0] dark:border-[#3c4043] hover:bg-neutral-50 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        auditFilter === tab.key
                          ? "bg-white/20 text-white"
                          : "bg-neutral-100 dark:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Search Box */}
                <div className="relative min-w-[220px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5f6368] dark:text-[#9aa0a6]" />
                  <input
                    type="text"
                    value={auditSearchQuery}
                    onChange={(e) => setAuditSearchQuery(e.target.value)}
                    placeholder="Search logs by action, details..."
                    className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e8eaed] placeholder-[#5f6368] focus:outline-none focus:border-[#1a73e8]"
                  />
                  {auditSearchQuery && (
                    <button
                      onClick={() => setAuditSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5f6368] hover:text-[#202124] dark:hover:text-[#e8eaed]"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* ── Rich Audit & Pipeline Logs Table ───────────────────────────── */}
              {filteredAuditLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-center border border-dashed rounded-xl border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]">
                    <History size={20} />
                  </div>
                  <p className="text-sm font-medium text-[#202124] dark:text-[#e8eaed]">No matching audit records</p>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] max-w-sm">
                    {auditSearchQuery
                      ? `Zero records match query "${auditSearchQuery}". Try clearing filters.`
                      : "Logs from administrative actions and automated GitHub Actions will appear chronologically here."}
                  </p>
                  {auditSearchQuery && (
                    <button
                      onClick={() => {
                        setAuditSearchQuery("");
                        setAuditFilter("all");
                      }}
                      className="mt-1 px-3 py-1 text-xs font-medium text-[#1a73e8] hover:underline cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Action / Pipeline</th>
                          <th className="px-4 py-3">Execution Summary & Details</th>
                          <th className="px-4 py-3">Actor</th>
                          <th className="px-4 py-3 text-right">Timestamp</th>
                          <th className="px-3 py-3 text-center">Inspect</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dadce0]/60 dark:divide-[#3c4043]/60 text-xs">
                        {filteredAuditLogs.map((log) => {
                          const isActionBot = log.adminEmail.includes("github-actions");
                          const isRadar = log.action === "AI_RADAR_SYNC" || log.workflow?.includes("Radar");
                          const isLeaderboard = log.action === "LEADERBOARD_SYNC" || log.workflow?.includes("Leaderboard");
                          const isError = log.status === "error";

                          return (
                            <tr key={log.id} className="hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors">
                              {/* Status Badge */}
                              <td className="px-4 py-3 align-top">
                                {isError ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82]">
                                    <XCircle size={10} />
                                    FAILED
                                  </span>
                                ) : isActionBot ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] dark:bg-[#133824] dark:text-[#81c995]">
                                    <CheckCircle2 size={10} />
                                    SUCCESS
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1a2e4c] dark:text-[#a8c7fa]">
                                    <ShieldCheck size={10} />
                                    ADMIN
                                  </span>
                                )}
                              </td>

                              {/* Action / Pipeline Pill */}
                              <td className="px-4 py-3 align-top whitespace-nowrap">
                                {isRadar ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                    <Radio size={11} />
                                    AI Radar
                                  </span>
                                ) : isLeaderboard ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                                    <Zap size={11} />
                                    Leaderboard
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 text-[#3c4043] dark:bg-neutral-800 dark:text-[#bdc1c6] font-mono text-[10px]">
                                    {log.action}
                                  </span>
                                )}
                              </td>

                              {/* Summary & Details */}
                              <td className="px-4 py-3 align-top max-w-md">
                                <div className="space-y-0.5">
                                  {log.summary && (
                                    <p className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">
                                      {log.summary}
                                    </p>
                                  )}
                                  <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed line-clamp-2">
                                    {log.details}
                                  </p>
                                  {log.metadata && (
                                    <div className="flex items-center gap-2 pt-1 flex-wrap text-[10px] text-[#5f6368] dark:text-[#9aa0a6] font-mono">
                                      {log.metadata.runId && log.metadata.runId !== "local-manual-run" && (
                                        <span className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.2 rounded">
                                          Run #{log.metadata.runId}
                                        </span>
                                      )}
                                      {log.metadata.sha && log.metadata.sha !== "local" && (
                                        <span className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.2 rounded">
                                          Commit {log.metadata.sha}
                                        </span>
                                      )}
                                      {log.metadata.durationMs && (
                                        <span className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.2 rounded">
                                          ⏱️ {(log.metadata.durationMs / 1000).toFixed(1)}s
                                        </span>
                                      )}
                                      {log.metadata.totalModels && (
                                        <span className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.2 rounded">
                                          📊 {log.metadata.totalModels} models
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </td>

                              {/* Actor */}
                              <td className="px-4 py-3 align-top whitespace-nowrap">
                                <div className="flex items-center gap-1.5 text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                                  {isActionBot ? (
                                    <>
                                      <Bot size={13} className="text-[#1a73e8]" />
                                      <span className="font-mono text-[11px] font-medium text-[#202124] dark:text-[#e8eaed]">
                                        github-actions[bot]
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <div className="w-4 h-4 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-[9px] font-bold">
                                        {log.adminEmail[0].toUpperCase()}
                                      </div>
                                      <span className="font-mono text-[11px] truncate max-w-[120px]" title={log.adminEmail}>
                                        {log.adminEmail}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </td>

                              {/* Timestamp */}
                              <td className="px-4 py-3 align-top text-right font-mono text-[11px] text-[#5f6368] dark:text-[#9aa0a6] whitespace-nowrap">
                                <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                                <div className="text-[10px] text-[#5f6368]/80">{new Date(log.timestamp).toLocaleDateString()}</div>
                              </td>

                              {/* Inspect Payload Button */}
                              <td className="px-3 py-3 align-top text-center">
                                <button
                                  onClick={() => setInspectingLog(log)}
                                  className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors cursor-pointer"
                                  title="Inspect JSON Payload & Metadata"
                                >
                                  <Code size={14} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              SECTION 8: SUPABASE & STORAGE INFRASTRUCTURE
          ════════════════════════════════════════════════════════════════════ */}
          {activeNav === "infrastructure" && (
            <SupabaseConsole showToast={showToast} logAudit={logAudit} />
          )}
        </main>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          GOOGLE ADMIN DIALOGS (IAM ROLES, READ-ONLY INSPECT, ACCESS)
      ══════════════════════════════════════════════════════════════════════ */}

      {/* ── Dialog: Read-Only User Account Overview ─────────────────────────── */}
      {inspectingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <button
              onClick={() => setInspectingUser(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center font-bold text-base text-[#202124] dark:text-[#e8eaed] shrink-0">
                {inspectingUser.avatarUrl ? (
                  <img src={inspectingUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  inspectingUser.displayName[0].toUpperCase()
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed] truncate">
                  {inspectingUser.displayName}
                </h3>
                <p className="text-xs font-mono text-[#5f6368] dark:text-[#9aa0a6] truncate">
                  {inspectingUser.username}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5f6368] dark:text-[#9aa0a6]">User Key / ID:</span>
                <span className="font-mono text-[#202124] dark:text-[#e8eaed] truncate max-w-[240px]">{inspectingUser.userKey}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f6368] dark:text-[#9aa0a6]">Enterprise Role:</span>
                <span className="capitalize font-medium text-[#202124] dark:text-[#e8eaed]">{inspectingUser.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f6368] dark:text-[#9aa0a6]">Access Status:</span>
                <span>
                  {inspectingUser.deletionRequested ? (
                    <span className="text-[#d93025] font-semibold">Deletion Requested</span>
                  ) : inspectingUser.isBlocked ? (
                    <span className="text-[#d93025] font-medium">Suspended</span>
                  ) : (
                    <span className="text-[#137333] font-medium">Active</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f6368] dark:text-[#9aa0a6]">Last Updated:</span>
                <span className="font-mono text-[#202124] dark:text-[#e8eaed]">{new Date(inspectingUser.updatedAt).toLocaleString()}</span>
              </div>
            </div>

            {inspectingUser.description && (
              <div className="space-y-1 text-xs">
                <span className="text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">Bio & Note (Read-Only)</span>
                <p className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-800 text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed">
                  {inspectingUser.description}
                </p>
              </div>
            )}

            {inspectingUser.deletionRequested && (
              <div className="p-3 rounded-lg border border-[#f9ab00] bg-[#fef7e0] dark:bg-[#332a00] text-xs space-y-1 text-[#7c4a03] dark:text-[#fdd663]">
                <div className="font-semibold flex items-center gap-1">
                  <AlertTriangle size={12} />
                  Pending Deletion Request
                </div>
                <p className="italic">"{inspectingUser.deletionReason || "No specific reason provided."}"</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-[#dadce0] dark:border-[#3c4043]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const target = inspectingUser;
                    setInspectingUser(null);
                    setRoleManagingUser(target);
                    setSelectedNewRole(target.role);
                  }}
                  className="px-3 py-1.5 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Change Role
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = inspectingUser;
                    setInspectingUser(null);
                    handleViewUserChats(target);
                  }}
                  className="px-3 py-1.5 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer flex items-center gap-1.5"
                  title="View and clear user chats from database"
                >
                  <MessageSquare size={13} />
                  <span>User Chats</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setInspectingUser(null)}
                  className="px-3 py-1.5 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = inspectingUser;
                    setInspectingUser(null);
                    setDeleteConfirmUser(target);
                  }}
                  className="px-3 py-1.5 rounded text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Dialog: Change Enterprise Role & IAM Permissions ────────────────── */}
      {roleManagingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <button
              onClick={() => setRoleManagingUser(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#8ab4f8]">
                <UserCog size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">Assign Enterprise Role</h3>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                  Configure organizational access permissions for <strong className="text-[#202124] dark:text-[#e8eaed]">{roleManagingUser.displayName}</strong>
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">
                Select IAM Role
              </label>
              {[
                { id: "developer", label: "Developer", desc: "Can submit tools, write reviews, and compare models" },
                { id: "researcher", label: "AI Researcher", desc: "Benchmark verification and evaluation permissions" },
                { id: "designer", label: "UI/UX Designer", desc: "Design evaluation and ecosystem review" },
                { id: "pm", label: "Product Manager", desc: "Roadmap and product lifecycle evaluation" },
                { id: "founder", label: "Founder / Executive", desc: "Venture and strategic project access" },
                { id: "creator", label: "Content Creator", desc: "Media and tutorial contribution permissions" },
                { id: "other", label: "General Member", desc: "Standard community access" },
              ].map((r) => (
                <label
                  key={r.id}
                  onClick={() => setSelectedNewRole(r.id)}
                  className={`p-2.5 rounded-lg border flex items-start gap-2.5 cursor-pointer transition-colors ${
                    selectedNewRole === r.id
                      ? "border-[#1a73e8] bg-[#e8f0fe]/40 dark:bg-[#1a2e4c]/40"
                      : "border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="role-select"
                    checked={selectedNewRole === r.id}
                    onChange={() => setSelectedNewRole(r.id)}
                    className="mt-0.5 text-[#1a73e8] focus:ring-0"
                  />
                  <div>
                    <span className="font-semibold text-[#202124] dark:text-[#e8eaed]">{r.label}</span>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">{r.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#dadce0] dark:border-[#3c4043]">
              <button
                type="button"
                onClick={() => setRoleManagingUser(null)}
                className="px-4 py-2 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actioningId === roleManagingUser.userKey}
                onClick={() => handleUpdateUserRole(roleManagingUser, selectedNewRole)}
                className="px-4 py-2 rounded text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] cursor-pointer shadow-xs disabled:opacity-50"
              >
                {actioningId === roleManagingUser.userKey ? "Saving..." : "Save Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dialog: Inspect Submission ───────────────────────────────────────── */}
      {reviewingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-2xl p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setReviewingEntry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base border ${typeIcon(reviewingEntry.type, t)}`}>
                {TYPE_GLYPH[reviewingEntry.type] ?? "◆"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#202124] dark:text-[#e8eaed]">{reviewingEntry.name}</h3>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                  {reviewingEntry.org || "Independent Organization"} · Released {reviewingEntry.year}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${typeBadge(reviewingEntry.type, t)}`}>
                {reviewingEntry.type}
              </span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${taskBadge(reviewingEntry.task, t)}`}>
                {reviewingEntry.task}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6]">
                License: {reviewingEntry.license}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6]">
                Size: {reviewingEntry.size}
              </span>
            </div>

            <div className="space-y-3 text-xs text-[#3c4043] dark:text-[#bdc1c6]">
              <div>
                <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                  Summary
                </label>
                <p className="p-3 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60 leading-relaxed">
                  {reviewingEntry.summary}
                </p>
              </div>

              {reviewingEntry.architecture && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                    Architecture
                  </label>
                  <p className="p-2.5 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60">
                    {reviewingEntry.architecture}
                  </p>
                </div>
              )}

              {reviewingEntry.benchmarks && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                    Benchmarks
                  </label>
                  <p className="p-2.5 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60 font-mono text-[11px]">
                    {reviewingEntry.benchmarks}
                  </p>
                </div>
              )}

              {reviewingEntry.limitations && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                    Known Limitations
                  </label>
                  <p className="p-2.5 rounded-lg bg-[#fef7e0]/50 border border-[#f9ab00]/40 text-[#7c4a03] dark:text-[#fdd663]">
                    {reviewingEntry.limitations}
                  </p>
                </div>
              )}

              {reviewingEntry.usage && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                    Code Usage
                  </label>
                  <pre className="p-3 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60 font-mono text-[11px] overflow-x-auto">
                    {reviewingEntry.usage}
                  </pre>
                </div>
              )}

              {reviewingEntry.url && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                    Official Repository URL
                  </label>
                  <a
                    href={reviewingEntry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline flex items-center gap-1"
                  >
                    <span>{reviewingEntry.url}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#dadce0] dark:border-[#3c4043]">
              <button
                type="button"
                onClick={() => setReviewingEntry(null)}
                className="px-4 py-2 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirmEntry(reviewingEntry.name)}
                className="px-3 py-2 rounded text-xs font-medium text-[#d93025] border border-[#d93025]/30 hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] cursor-pointer"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => handleApprove(reviewingEntry)}
                disabled={actioningId === reviewingEntry.name}
                className="px-4 py-2 rounded text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] cursor-pointer disabled:opacity-50"
              >
                {actioningId === reviewingEntry.name ? "Approving..." : "Approve & Publish"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dialog: Create / Edit Catalog Asset ──────────────────────────────── */}
      {editingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-2xl p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingEntry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#8ab4f8]">
                <Edit size={18} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
                  {editingEntry.isNew ? "Create New AI Asset" : `Edit Specifications: ${editingEntry.name}`}
                </h3>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                  {editingEntry.isNew ? "Publish verified model to directory" : "Update technical specs and benchmarks"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveEntry} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Asset Name</label>
                  <input
                    type="text"
                    required
                    disabled={!editingEntry.isNew}
                    value={editingEntry.name}
                    onChange={(e) => setEditingEntry({ ...editingEntry, name: e.target.value })}
                    placeholder="e.g. DeepSeek-V3"
                    className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Organization</label>
                  <input
                    type="text"
                    required
                    value={editingEntry.org}
                    onChange={(e) => setEditingEntry({ ...editingEntry, org: e.target.value })}
                    placeholder="e.g. DeepSeek / Meta / Google"
                    className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={editingEntry.type}
                    onChange={(e) => setEditingEntry({ ...editingEntry, type: e.target.value as any })}
                    className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none cursor-pointer"
                  >
                    <option value="Model">Model</option>
                    <option value="Framework">Framework</option>
                    <option value="Dataset">Dataset</option>
                    <option value="Platform">Platform</option>
                    <option value="AI">AI Application</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Task Domain</label>
                  <input
                    type="text"
                    required
                    value={editingEntry.task}
                    onChange={(e) => setEditingEntry({ ...editingEntry, task: e.target.value })}
                    placeholder="e.g. NLP / Multimodal"
                    className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">License</label>
                  <input
                    type="text"
                    required
                    value={editingEntry.license}
                    onChange={(e) => setEditingEntry({ ...editingEntry, license: e.target.value })}
                    placeholder="e.g. MIT / Apache 2.0"
                    className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Release Year</label>
                  <input
                    type="number"
                    required
                    value={editingEntry.year}
                    onChange={(e) => setEditingEntry({ ...editingEntry, year: Number(e.target.value) })}
                    className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Parameter / Size</label>
                  <input
                    type="text"
                    required
                    value={editingEntry.size}
                    onChange={(e) => setEditingEntry({ ...editingEntry, size: e.target.value })}
                    placeholder="e.g. 671B / 10M Samples"
                    className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Summary</label>
                <textarea
                  required
                  value={editingEntry.summary}
                  onChange={(e) => setEditingEntry({ ...editingEntry, summary: e.target.value })}
                  rows={2}
                  className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Architecture</label>
                  <input
                    type="text"
                    value={editingEntry.architecture}
                    onChange={(e) => setEditingEntry({ ...editingEntry, architecture: e.target.value })}
                    placeholder="e.g. Transformer Decoder, MLA"
                    className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Benchmarks</label>
                  <input
                    type="text"
                    value={editingEntry.benchmarks}
                    onChange={(e) => setEditingEntry({ ...editingEntry, benchmarks: e.target.value })}
                    placeholder="e.g. MMLU: 88.5%"
                    className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Official Repository URL</label>
                <input
                  type="url"
                  value={editingEntry.url}
                  onChange={(e) => setEditingEntry({ ...editingEntry, url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="entry-featured-input"
                  checked={editingEntry.popular}
                  onChange={(e) => setEditingEntry({ ...editingEntry, popular: e.target.checked })}
                  className="rounded border-[#dadce0] text-[#1a73e8] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="entry-featured-input" className="text-xs font-medium text-[#7c4a03] dark:text-[#fdd663] flex items-center gap-1 cursor-pointer">
                  <Star size={12} className="fill-[#f9ab00] text-[#f9ab00]" />
                  Highlight as featured asset on home dashboard
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#dadce0] dark:border-[#3c4043]">
                <button
                  type="button"
                  onClick={() => setEditingEntry(null)}
                  className="px-4 py-2 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actioningId === editingEntry.name}
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {actioningId === editingEntry.name ? "Saving..." : editingEntry.isNew ? "Publish Asset" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Dialog: Delete Asset Confirmation ───────────────────────────────── */}
      {deleteConfirmEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <button
              onClick={() => setDeleteConfirmEntry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 text-[#d93025]">
              <div className="p-2 rounded-lg bg-[#fce8e6] dark:bg-[#3c1716]">
                <Trash2 size={20} />
              </div>
              <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">Delete Catalog Asset</h3>
            </div>
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              Permanently delete <strong className="text-[#202124] dark:text-[#e8eaed]">"{deleteConfirmEntry}"</strong> from the catalog and all comparison views?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmEntry(null)}
                className="px-4 py-2 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executeDelete(deleteConfirmEntry)}
                className="px-4 py-2 rounded text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer"
              >
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dialog: Suspend Account ─────────────────────────────────────────── */}
      {blockingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <button
              onClick={() => setBlockingUser(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 text-[#b06000]">
              <div className="p-2 rounded-lg bg-[#fef7e0] dark:bg-[#332a00]">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
                {blockingUser.isBlocked ? "Lift Account Suspension" : "Suspend Account Access"}
              </h3>
            </div>
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              {blockingUser.isBlocked ? (
                <>Restore active status for <strong className="text-[#202124] dark:text-[#e8eaed]">{blockingUser.displayName}</strong>? They will regain access immediately.</>
              ) : (
                <>Select duration to suspend login access for <strong className="text-[#202124] dark:text-[#e8eaed]">{blockingUser.displayName}</strong>.</>
              )}
            </p>
            <div className="flex flex-col gap-2 pt-1">
              {blockingUser.isBlocked ? (
                <button
                  onClick={() => handleExecuteBlock(blockingUser, false, 0)}
                  className="w-full py-2 rounded font-medium text-xs bg-[#1e8e3e] hover:bg-[#137333] text-white cursor-pointer"
                >
                  Lift Suspension
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleExecuteBlock(blockingUser, true, 24 * 60 * 60 * 1000)}
                    className="w-full py-2 rounded font-medium text-xs border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#202124] dark:text-[#e8eaed] cursor-pointer"
                  >
                    Suspend for 24 Hours
                  </button>
                  <button
                    onClick={() => handleExecuteBlock(blockingUser, true, 7 * 24 * 60 * 60 * 1000)}
                    className="w-full py-2 rounded font-medium text-xs border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#202124] dark:text-[#e8eaed] cursor-pointer"
                  >
                    Suspend for 7 Days
                  </button>
                  <button
                    onClick={() => handleExecuteBlock(blockingUser, true, -1)}
                    className="w-full py-2 rounded font-medium text-xs bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer"
                  >
                    Suspend Indefinitely
                  </button>
                </>
              )}
              <button
                onClick={() => setBlockingUser(null)}
                className="w-full py-2 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dialog: Permanently Purge Account ───────────────────────────────── */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <button
              onClick={() => setDeleteConfirmUser(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 text-[#d93025]">
              <div className="p-2 rounded-lg bg-[#fce8e6] dark:bg-[#3c1716]">
                <Trash2 size={20} />
              </div>
              <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
                {deleteConfirmUser.deletionRequested ? "Approve User Deletion Request" : "Permanently Purge Account"}
              </h3>
            </div>

            {deleteConfirmUser.deletionRequested && (
              <div className="p-3 rounded-lg border border-[#f9ab00] bg-[#fef7e0] dark:bg-[#332a00] text-xs space-y-1 text-[#7c4a03] dark:text-[#fdd663]">
                <div className="font-semibold flex items-center gap-1">
                  <AlertTriangle size={12} />
                  User Deletion Reason:
                </div>
                <p className="italic">"{deleteConfirmUser.deletionReason || "No specific reason provided."}"</p>
              </div>
            )}

            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              Permanently purge account <strong className="text-[#202124] dark:text-[#e8eaed]">{deleteConfirmUser.displayName} ({deleteConfirmUser.username})</strong>?
              <br />
              This executes the database admin RPC to permanently remove credentials from <strong className="text-[#d93025] dark:text-[#f28b82]">auth.users</strong> and clean up all application bookmarks, ratings, and comments.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmUser(null)}
                className="px-4 py-2 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const target = deleteConfirmUser;
                  setDeleteConfirmUser(null);
                  await handleExecuteDeleteUser(target);
                }}
                className="px-4 py-2 rounded text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer shadow-xs"
              >
                {deleteConfirmUser.deletionRequested ? "Approve & Purge Everywhere" : "Delete Account Everywhere"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dialog: Direct Delete by Auth UID ─────────────────────────────────── */}
      {directDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <button
              onClick={() => {
                setDirectDeleteModalOpen(false);
                setDirectDeleteUidInput("");
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 text-[#d93025]">
              <div className="p-2 rounded-lg bg-[#fce8e6] dark:bg-[#3c1716]">
                <Trash2 size={20} />
              </div>
              <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">Purge User by Auth UID</h3>
            </div>
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              Enter any Supabase User UID to purge their account from <strong className="text-[#d93025]">auth.users</strong> and all application database tables:
            </p>
            <div>
              <input
                type="text"
                placeholder="e.g. afa9a070-6961-4419-a7b1-291628f94a48"
                value={directDeleteUidInput}
                onChange={(e) => setDirectDeleteUidInput(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs font-mono text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#d93025]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDirectDeleteModalOpen(false);
                  setDirectDeleteUidInput("");
                }}
                className="px-4 py-2 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!directDeleteUidInput.trim()}
                onClick={async () => {
                  await handleExecuteDirectDeleteUid(directDeleteUidInput);
                }}
                className="px-4 py-2 rounded text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer disabled:opacity-50"
              >
                Purge Account Everywhere
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dialog: Batch Confirm ────────────────────────────────────────────── */}
      {batchConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <button
              onClick={() => setBatchConfirm(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>
            <div className={`p-2 rounded-lg w-fit ${batchConfirm === "approve" ? "bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995]" : "bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82]"}`}>
              {batchConfirm === "approve" ? <CheckCheck size={22} /> : <AlertTriangle size={22} />}
            </div>
            <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
              {batchConfirm === "approve" ? `Approve All ${pendingEntries.length} Submissions?` : `Purge All ${pendingEntries.length} Submissions?`}
            </h3>
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              {batchConfirm === "approve"
                ? "This will batch-publish all pending submissions to the live public catalog immediately."
                : "This will permanently discard all submissions currently in the review queue."}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBatchConfirm(null)}
                className="px-4 py-2 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={batchConfirm === "approve" ? handleBatchApproveAll : handleBatchRejectAll}
                className={`px-4 py-2 rounded text-xs font-medium text-white cursor-pointer ${
                  batchConfirm === "approve" ? "bg-[#1a73e8] hover:bg-[#1557b0]" : "bg-[#d93025] hover:bg-[#b31412]"
                }`}
              >
                {batchConfirm === "approve" ? `Approve All (${pendingEntries.length})` : "Purge Submissions"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dialog: Manage & Clear User Chats ────────────────────────────────── */}
      {chatManagingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-2xl p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4 max-h-[85vh] flex flex-col overflow-hidden">
            <button
              onClick={() => setChatManagingUser(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-center justify-between pr-8 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#8ab4f8]">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
                    User Conversations · {chatManagingUser.displayName}
                  </h3>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] font-mono">
                    {chatManagingUser.username} · {chatManagingUser.userKey}
                  </p>
                </div>
              </div>

              {userChatsList.length > 0 && (
                <button
                  type="button"
                  onClick={() => setClearChatsConfirmUser(chatManagingUser)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white transition-colors cursor-pointer shadow-xs"
                  title="Clear all user chats from database"
                >
                  <Trash2 size={13} />
                  <span>Clear All Chats</span>
                </button>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1 text-xs">
              {loadingUserChats ? (
                <div className="flex items-center justify-center py-12 gap-2 text-[#5f6368] dark:text-[#9aa0a6]">
                  <RefreshCw size={16} className="animate-spin text-[#1a73e8]" />
                  <span>Querying database for user chat sessions...</span>
                </div>
              ) : userChatsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2 text-center border border-dashed rounded-xl border-[#dadce0] dark:border-[#3c4043] bg-neutral-50/50 dark:bg-white/[0.02]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]">
                    <MessageSquare size={18} />
                  </div>
                  <p className="font-medium text-sm text-[#202124] dark:text-[#e8eaed]">
                    No chat records found
                  </p>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] max-w-xs">
                    This user currently has zero active chat sessions stored in the database.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-[#5f6368] dark:text-[#9aa0a6] px-1">
                    <span>{userChatsList.length} conversation session{userChatsList.length > 1 ? "s" : ""}</span>
                    <span>Most recent activity first</span>
                  </div>
                  {userChatsList.map((chat) => (
                    <div
                      key={chat.id}
                      className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] space-y-2 transition-colors hover:border-[#1a73e8]/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-[#202124] dark:text-[#e8eaed] truncate">
                            {chat.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#5f6368] dark:text-[#9aa0a6] font-mono">
                            <span className="capitalize">Mode: {chat.mode}</span>
                            <span>·</span>
                            <span>{chat.messages.length} messages</span>
                            <span>·</span>
                            <span>{new Date(chat.updatedAt || chat.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={actioningId === chat.id}
                          onClick={() => handleDeleteSingleChat(chatManagingUser, chat.id)}
                          className="p-1.5 rounded-lg text-[#d93025] hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                          title="Delete this chat session from database"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Snippet preview */}
                      {chat.messages.length > 0 && (
                        <div className="p-2 rounded bg-white dark:bg-[#18191c] border border-[#dadce0]/60 dark:border-[#3c4043]/60 text-[11px] text-[#5f6368] dark:text-[#9aa0a6] line-clamp-2">
                          <strong className="text-[#202124] dark:text-[#e8eaed]">
                            {chat.messages[chat.messages.length - 1].role}:
                          </strong>{" "}
                          {chat.messages[chat.messages.length - 1].content.slice(0, 140)}...
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#dadce0] dark:border-[#3c4043] shrink-0">
              <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">
                Administrative Governance · Permanent Database Clears
              </span>
              <button
                type="button"
                onClick={() => setChatManagingUser(null)}
                className="px-4 py-2 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dialog: Confirm Clear User Chats ──────────────────────────────────── */}
      {clearChatsConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#d93025]/10 text-[#d93025] shrink-0">
                <MessageSquareX size={22} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
                  Clear User Chat History?
                </h3>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">
                  Permanent removal from database
                </p>
              </div>
            </div>

            <p className="text-xs text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed">
              Are you sure you want to permanently clear all chat history and conversation records for{" "}
              <strong className="text-[#202124] dark:text-[#e8eaed] font-semibold">{clearChatsConfirmUser.displayName}</strong>{" "}
              (<code className="font-mono text-[11px] text-[#1a73e8] dark:text-[#8ab4f8]">{clearChatsConfirmUser.username}</code>) from the database? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#dadce0] dark:border-[#3c4043]">
              <button
                type="button"
                disabled={actioningId === clearChatsConfirmUser.userKey}
                onClick={() => setClearChatsConfirmUser(null)}
                className="px-4 py-2 rounded text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actioningId === clearChatsConfirmUser.userKey}
                onClick={() => handleClearAllUserChats(clearChatsConfirmUser)}
                className="px-4 py-2 rounded text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer shadow-xs disabled:opacity-50"
              >
                {actioningId === clearChatsConfirmUser.userKey ? "Clearing..." : "Clear Chats from Database"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dialog: Inspect Execution Log JSON Payload ───────────────────────── */}
      {inspectingLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] shadow-2xl flex flex-col overflow-hidden animate-[scaleUp_0.15s_ease-out]">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#dadce0] dark:border-[#3c4043] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] dark:bg-[#1a2e4c] text-[#1a73e8] dark:text-[#8ab4f8] flex items-center justify-center">
                  <Code size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">
                    {inspectingLog.workflow || inspectingLog.action}
                  </h3>
                  <p className="text-[11px] font-mono text-[#5f6368] dark:text-[#9aa0a6]">
                    ID: {inspectingLog.id} • {new Date(inspectingLog.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectingLog(null)}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs font-mono">
              <div className="p-3 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#131314] space-y-1.5 font-sans">
                <p className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">
                  {inspectingLog.summary || inspectingLog.action}
                </p>
                <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                  {inspectingLog.details}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5 font-sans">
                  <span className="text-[11px] font-semibold text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">
                    Full Log Metadata & Context
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(inspectingLog, null, 2));
                      setCopiedLogJson(true);
                      setTimeout(() => setCopiedLogJson(false), 2000);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
                  >
                    {copiedLogJson ? (
                      <>
                        <Check size={12} className="text-[#1e8e3e]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#131314] text-[#202124] dark:text-[#e8eaed] text-[11px] leading-relaxed overflow-x-auto max-h-[45vh]">
                  {JSON.stringify(inspectingLog, null, 2)}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-[#dadce0] dark:border-[#3c4043] bg-neutral-50 dark:bg-[#18191a] flex items-center justify-between shrink-0 text-xs">
              <span className="text-[#5f6368] dark:text-[#9aa0a6] font-mono text-[11px]">
                Actor: {inspectingLog.adminEmail}
              </span>
              <button
                onClick={() => setInspectingLog(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Codebase & Supabase Sync Center ───────────────────────────── */}
      {codebaseSyncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-2xl p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setCodebaseSyncModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#8ab4f8]">
                <Terminal size={22} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
                  Codebase & Supabase Sync Center
                </h3>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                  Synchronize live Supabase catalog rows with the local static repository files.
                </p>
              </div>
            </div>

            {/* Architecture Explainer Pill */}
            <div className="p-3.5 rounded-xl bg-[#e8f0fe] dark:bg-[#1a2e4c] border border-[#1a73e8]/25 text-xs text-[#174ea6] dark:text-[#8ab4f8] space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold">
                <Info size={14} />
                <span>Zero-Latency Hybrid Architecture</span>
              </div>
              <p className="leading-relaxed">
                AiVerse bundles verified entries statically in <code>src/data.ts</code> for instant 0ms first-contentful paint across all clients. Dynamic community submissions and reviews are persisted to Supabase and seamlessly merged at runtime.
              </p>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] space-y-1">
                <span className="text-[11px] font-semibold text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">
                  Live Active Directory
                </span>
                <p className="text-lg font-bold text-[#202124] dark:text-[#e8eaed]">
                  {approvedEntries.length} Assets
                </p>
                <p className="text-[11px] text-[#137333] dark:text-[#81c995] flex items-center gap-1">
                  <CheckCircle2 size={12} /> Supabase RLS policies active
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] space-y-1">
                <span className="text-[11px] font-semibold text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">
                  Static Bundle (`src/data.ts`)
                </span>
                <p className="text-lg font-bold text-[#202124] dark:text-[#e8eaed]">
                  {defaultEntries.length} Assets
                </p>
                <p className="text-[11px] text-[#1a73e8] dark:text-[#8ab4f8] flex items-center gap-1">
                  <Sparkles size={12} /> Pre-compiled for instant paint
                </p>
              </div>
            </div>

            {/* Sync Command Snippet */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">
                  1. Synchronize Pending Queue to Repository Codebase
                </span>
                <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">Run in terminal</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-[#202124] text-white font-mono text-xs">
                <span>npm run approve:pending</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText("npm run approve:pending");
                    setCopiedSyncCmd(true);
                    setTimeout(() => setCopiedSyncCmd(false), 2000);
                  }}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                >
                  {copiedSyncCmd ? <Check size={12} className="text-[#81c995]" /> : <Copy size={12} />}
                  <span>{copiedSyncCmd ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">
                This script updates <code>src/data.ts</code>, clears <code>pending_pulse_requests.json</code>, and maintains catalog sync without manual editing.
              </p>
            </div>

            {/* Supabase SQL Editor Limit Guidance */}
            <div className="p-3.5 rounded-xl border border-[#f9ab00]/30 bg-[#fef7e0] dark:bg-[#332a00]/40 text-xs text-[#7c4a03] dark:text-[#fdd663] space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold">
                <AlertTriangle size={14} className="shrink-0" />
                <span>Supabase SQL Editor 1 MB Limit Solution</span>
              </div>
              <p className="leading-relaxed">
                If Supabase returns <em>"Query is too large to be run via the SQL Editor"</em> on <code>seed_entries.sql</code> (1.3 MB), run the lightweight incremental script <code>supabase/seed_missing_191.sql</code> (273 KB) or execute split chunks <code>seed_part1.sql</code> and <code>seed_part2.sql</code>.
              </p>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#dadce0] dark:border-[#3c4043]">
              <button
                type="button"
                onClick={() => exportDataAsJson(approvedEntries, "aiverse_catalog_full")}
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download size={13} />
                Export Full Catalog JSON
              </button>
              <button
                type="button"
                onClick={() => setCodebaseSyncModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-lg text-xs font-semibold bg-[#1a73e8] hover:bg-[#1557b0] text-white transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Google Toast Notification (Anchored at Bottom-Left with Instant Undo) ── */}
      {toast && (
        <div className="fixed bottom-5 left-5 z-50 animate-[fadeUp_0.2s_ease-out]">
          <div
            className={`px-4 py-3 rounded-xl border flex items-center gap-3 text-xs font-medium shadow-xl backdrop-blur-md ${
              toast.type === "success"
                ? "bg-[#202124]/95 text-white border-neutral-700/80 dark:bg-white/95 dark:text-[#202124] dark:border-neutral-200/80"
                : "bg-[#d93025]/95 text-white border-[#b31412]"
            }`}
          >
            {toast.type === "success" ? (
              <Check size={16} className="shrink-0 text-[#81c995]" />
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
                className="ml-2 pl-3 border-l border-white/25 dark:border-black/25 text-[#8ab4f8] dark:text-[#1a73e8] hover:underline font-semibold flex items-center gap-1 cursor-pointer shrink-0 transition-opacity hover:opacity-90"
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
