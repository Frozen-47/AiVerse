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

export type { SiteAnnouncement };

interface AdminDashboardProps {
  onBackToHome: () => void;
  onViewEntry?: (entry: Entry) => void;
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
}

type NavSectionId =
  | "users"
  | "deletion_requests"
  | "submissions"
  | "directory"
  | "analytics"
  | "announcements"
  | "audit";

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
}) => {
  const t = useTokens();
  const { user } = useAuth();
  const currentUserKey = user ? (user.id.startsWith("supabase_") ? user.id : `supabase_${user.id}`) : "";

  // Google Cloud Console Navigation State
  const [activeNav, setActiveNav] = useState<NavSectionId>("users");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

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

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const logAudit = (action: string, details: string) => {
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
        localStorage.setItem("aiverse_admin_audit_logs", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error("Failed to write audit log:", err);
    }
  };

  const clearAuditLogs = () => {
    localStorage.removeItem("aiverse_admin_audit_logs");
    setAuditLogs([]);
    showToast("success", "Audit trail cleared.");
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch pending entries (approved = false)
      const { data: pendingData, error: pendingErr } = await supabase
        .from("entries")
        .select("*")
        .eq("approved", false)
        .order("created_at", { ascending: false });

      if (pendingErr) throw pendingErr;
      setPendingEntries((pendingData as Entry[]) || []);

      // 2. Fetch approved entries (approved = true)
      const { data: approvedData, error: approvedErr } = await supabase
        .from("entries")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (approvedErr) throw approvedErr;

      const loadedApproved = (approvedData as Entry[]) || [];
      const mergedMap = new Map<string, Entry>();
      defaultEntries.forEach((e) => {
        if (e && e.name) mergedMap.set(e.name.toLowerCase().trim(), { ...e, approved: true });
      });
      loadedApproved.forEach((e) => {
        if (e && e.name) mergedMap.set(e.name.toLowerCase().trim(), e);
      });
      setApprovedEntries(Array.from(mergedMap.values()));

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

  const handleApprove = async (entry: Entry) => {
    setActioningId(entry.name);
    try {
      const { error: err } = await supabase
        .from("entries")
        .update({ approved: true })
        .eq("name", entry.name);

      if (err) throw err;

      setPendingEntries((prev) => prev.filter((e) => e.name !== entry.name));
      setApprovedEntries((prev) => [{ ...entry, approved: true }, ...prev]);
      if (reviewingEntry?.name === entry.name) setReviewingEntry(null);
      showToast("success", `"${entry.name}" approved and published to catalog.`);
      logAudit("Approve Asset", `Approved and published "${entry.name}" to directory`);
    } catch (err: any) {
      showToast("error", `Failed to approve "${entry.name}": ${err.message}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleBatchApproveAll = async () => {
    if (pendingEntries.length === 0) return;
    setActioningId("batch_approve");
    try {
      const names = pendingEntries.map((e) => e.name);
      const { error: err } = await supabase
        .from("entries")
        .update({ approved: true })
        .in("name", names);

      if (err) throw err;

      const count = pendingEntries.length;
      setApprovedEntries((prev) => [
        ...pendingEntries.map((e) => ({ ...e, approved: true })),
        ...prev,
      ]);
      setPendingEntries([]);
      setBatchConfirm(null);
      showToast("success", `Approved and published all ${count} submissions.`);
      logAudit("Batch Approve", `Approved all ${count} pending submissions at once`);
    } catch (err: any) {
      showToast("error", `Batch approve failed: ${err.message}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleBatchRejectAll = async () => {
    if (pendingEntries.length === 0) return;
    setActioningId("batch_reject");
    try {
      const names = pendingEntries.map((e) => e.name);
      const { error: err } = await supabase
        .from("entries")
        .delete()
        .in("name", names);

      if (err) throw err;

      const count = pendingEntries.length;
      setPendingEntries([]);
      setBatchConfirm(null);
      showToast("success", `Purged all ${count} submissions.`);
      logAudit("Batch Reject", `Discarded all ${count} pending submissions from queue`);
    } catch (err: any) {
      showToast("error", `Batch reject failed: ${err.message}`);
    } finally {
      setActioningId(null);
    }
  };

  const executeDelete = async (entryName: string) => {
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

      setPendingEntries((prev) => prev.filter((e) => e.name !== entryName));
      setApprovedEntries((prev) => prev.filter((e) => e.name !== entryName));
      if (reviewingEntry?.name === entryName) setReviewingEntry(null);
      showToast("success", `"${entryName}" has been deleted from catalog.`);
      logAudit("Delete Asset", `Deleted "${entryName}" from catalog`);
    } catch (err: any) {
      showToast("error", `Failed to delete "${entryName}": ${err.message}`);
    } finally {
      setActioningId(null);
      setDeleteConfirmEntry(null);
    }
  };

  const handleTogglePopular = async (entry: Entry) => {
    const newPopular = !entry.popular;
    setActioningId(entry.name);
    try {
      const { error: err } = await supabase
        .from("entries")
        .update({ popular: newPopular })
        .eq("name", entry.name);

      if (err) throw err;

      setApprovedEntries((prev) =>
        prev.map((e) => (e.name === entry.name ? { ...e, popular: newPopular } : e))
      );
      showToast("success", `"${entry.name}" marked as ${newPopular ? "Featured ⭐" : "Standard"}.`);
      logAudit("Toggle Featured", `Updated "${entry.name}" featured status to ${newPopular}`);
    } catch (err: any) {
      showToast("error", `Failed to update featured state: ${err.message}`);
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
          </div>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex items-center gap-2">
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
      <div className="flex-1 flex overflow-hidden">
        {/* Google Admin Left Navigation Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0 -translate-x-full"
          } transition-all duration-200 border-r border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] flex flex-col justify-between shrink-0 overflow-y-auto z-10`}
        >
          <div className="py-3 px-2 space-y-4">
            {/* Group 1: Identity & Access Management */}
            <div>
              <p className="px-3 text-[10px] font-semibold text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                Directory & Access
              </p>
              <nav className="space-y-0.5">
                <button
                  onClick={() => setActiveNav("users")}
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
                  onClick={() => setActiveNav("deletion_requests")}
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
                  onClick={() => setActiveNav("submissions")}
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
                  onClick={() => setActiveNav("directory")}
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

            {/* Group 3: Operations & Monitoring */}
            <div>
              <p className="px-3 text-[10px] font-semibold text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                Operations & Logging
              </p>
              <nav className="space-y-0.5">
                <button
                  onClick={() => setActiveNav("analytics")}
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
                  onClick={() => setActiveNav("announcements")}
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
                  onClick={() => setActiveNav("audit")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeNav === "audit"
                      ? "bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-semibold"
                      : "text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <History size={15} />
                    <span>Audit Logs</span>
                  </div>
                  <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] font-mono">
                    {auditLogs.length}
                  </span>
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
                    onClick={() => setActiveNav("deletion_requests")}
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
          {activeNav === "submissions" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-medium text-[#202124] dark:text-[#e8eaed]">Review Queue</h2>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Audit and approve community-submitted models, frameworks, datasets, and platforms.
                  </p>
                </div>
                {pendingEntries.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBatchConfirm("approve")}
                      className="px-3 py-1.5 rounded text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] cursor-pointer shadow-xs transition-colors flex items-center gap-1"
                    >
                      <CheckCheck size={13} />
                      Approve All ({pendingEntries.length})
                    </button>
                    <button
                      onClick={() => setBatchConfirm("reject")}
                      className="px-3 py-1.5 rounded text-xs font-medium text-[#d93025] border border-[#d93025]/30 hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] cursor-pointer transition-colors"
                    >
                      Purge All
                    </button>
                  </div>
                )}
              </div>

              {/* Filter and Search Bar for Submissions */}
              {pendingEntries.length > 0 && (
                <div className="p-3 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm w-full">
                    <input
                      type="text"
                      value={submissionsSearch}
                      onChange={(e) => setSubmissionsSearch(e.target.value)}
                      placeholder="Search queue by asset or organization..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-[#f1f3f4] dark:bg-[#202124] focus:bg-white dark:focus:bg-[#1e1f20] text-xs outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                    />
                    <Search className="absolute left-2.5 top-2 text-[#5f6368] dark:text-[#9aa0a6]" size={13} />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={submissionsTypeFilter}
                      onChange={(e) => setSubmissionsTypeFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs outline-none cursor-pointer"
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
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-dashed rounded-lg border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995] mb-1">
                    <Check size={22} className="stroke-[2.5px]" />
                  </div>
                  <p className="text-sm font-medium text-[#202124] dark:text-[#e8eaed]">Review queue is clean</p>
                  <p className="text-xs max-w-sm text-[#5f6368] dark:text-[#9aa0a6]">
                    All submissions have been audited and published to the live directory.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                          <th className="px-4 py-3">Asset</th>
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

                          return (
                            <tr key={entry.name} className="hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
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
                                <div className="flex items-center gap-1.5">
                                  <div className="w-5 h-5 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[9px] font-bold">
                                    {submitter?.avatarUrl ? (
                                      <img src={submitter.avatarUrl} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                      submitter?.displayName ? submitter.displayName[0].toUpperCase() : "U"
                                    )}
                                  </div>
                                  <span className="text-[#202124] dark:text-[#e8eaed] truncate max-w-[110px]">
                                    {submitter ? submitter.displayName : "Anonymous"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6]">
                                {entry.license} · {entry.size}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setReviewingEntry(entry)}
                                    className="px-2.5 py-1 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#e8f0fe] dark:hover:bg-[#1a2e4c] transition-colors cursor-pointer"
                                  >
                                    Inspect Specs
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleApprove(entry)}
                                    disabled={actioningId === entry.name}
                                    className="px-2.5 py-1 rounded text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] text-white transition-colors cursor-pointer disabled:opacity-50"
                                  >
                                    {actioningId === entry.name ? "..." : "Approve"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDeleteConfirmEntry(entry.name)}
                                    disabled={actioningId === entry.name}
                                    className="p-1 rounded text-[#d93025] dark:text-[#f28b82] hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer disabled:opacity-50"
                                    title="Reject"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
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
              SECTION 4: CATALOG DIRECTORY (LIVE APPROVED ASSETS)
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
                <button
                  onClick={() => exportDataAsJson(approvedEntries, "aiverse_catalog")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed] cursor-pointer transition-colors"
                >
                  <Download size={13} />
                  Export Catalog
                </button>
              </div>

              {/* Search and Filters Bar */}
              <div className="p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-3">
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
                      className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-[#f1f3f4] dark:bg-[#202124] focus:bg-white dark:focus:bg-[#1e1f20] text-xs outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
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
                      className="px-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs outline-none cursor-pointer"
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
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
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

              {/* Data Table */}
              <div className="rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] overflow-hidden">
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

                {/* Pagination Footer */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                    className="p-3.5 rounded-lg border border-[#1a73e8]/30 bg-[#e8f0fe]/30 dark:bg-[#1a2e4c]/30 text-left cursor-pointer transition-colors hover:border-[#1a73e8]"
                  >
                    <Database size={18} className="text-[#1a73e8] dark:text-[#8ab4f8] mb-1.5" />
                    <p className="text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8]">Full Cloud Snapshot</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">Complete database bundle</p>
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
              SECTION 7: CLOUD AUDIT LOGS
          ════════════════════════════════════════════════════════════════════ */}
          {activeNav === "audit" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-[#202124] dark:text-[#e8eaed]">Cloud Security & Activity Audit Log</h2>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Chronological audit log of administrative approvals, IAM role changes, suspensions, and exports.
                  </p>
                </div>
                {auditLogs.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportDataAsJson(auditLogs, "aiverse_audit_log")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Download size={12} />
                      Export Log
                    </button>
                    <button
                      onClick={clearAuditLogs}
                      className="px-3 py-1.5 rounded text-xs font-medium text-[#d93025] border border-[#d93025]/30 hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer"
                    >
                      Clear Log
                    </button>
                  </div>
                )}
              </div>

              {auditLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-dashed rounded-lg border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
                  <p className="text-sm font-medium text-[#202124] dark:text-[#e8eaed]">Audit trail is empty</p>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Administrative operations performed in this console will be logged chronologically here.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                          <th className="px-4 py-3">Action</th>
                          <th className="px-4 py-3">Details</th>
                          <th className="px-4 py-3">Actor</th>
                          <th className="px-4 py-3 text-right">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dadce0]/60 dark:divide-[#3c4043]/60 text-xs">
                        {auditLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors">
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1a2e4c] dark:text-[#a8c7fa]">
                                {log.action}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-[#3c4043] dark:text-[#bdc1c6] font-medium">{log.details}</td>
                            <td className="px-4 py-3 text-[#5f6368] dark:text-[#9aa0a6] font-mono text-[11px]">{log.adminEmail}</td>
                            <td className="px-4 py-3 text-right font-mono text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">
                              {new Date(log.timestamp).toLocaleString()}
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

      {/* ── Google Toast Notification (Anchored at Bottom-Left) ──────────────── */}
      {toast && (
        <div className="fixed bottom-5 left-5 z-50 animate-[fadeUp_0.2s_ease-out]">
          <div
            className={`px-4 py-3 rounded-lg border flex items-center gap-2.5 text-xs font-medium shadow-lg ${
              toast.type === "success"
                ? "bg-[#202124] text-white border-neutral-700 dark:bg-white dark:text-[#202124] dark:border-neutral-200"
                : "bg-[#d93025] text-white border-[#b31412]"
            }`}
          >
            {toast.type === "success" ? (
              <Check size={16} className="shrink-0 text-[#81c995]" />
            ) : (
              <Info size={16} className="shrink-0 text-white" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
