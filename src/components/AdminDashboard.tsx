import React, { useState, useEffect, useMemo } from "react";
import {
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
  Table,
  LayoutGrid,
  ShieldAlert,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
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

type TabId = "submissions" | "directory" | "users" | "analytics" | "announcements" | "audit";

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

  const [activeTab, setActiveTab] = useState<TabId>("submissions");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [pendingEntries, setPendingEntries] = useState<Entry[]>([]);
  const [approvedEntries, setApprovedEntries] = useState<Entry[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);

  // View modes (Google Cloud Console allows toggling between Data Table and Detail Cards)
  const [submissionsViewMode, setSubmissionsViewMode] = useState<"table" | "cards">("table");
  const [usersViewMode, setUsersViewMode] = useState<"table" | "cards">("table");

  // Pagination for Directory table
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
  const [usersStatusFilter, setUsersStatusFilter] = useState<"all" | "deletion_requests" | "active" | "blocked">("all");

  // Actions & Dialog states
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [deleteConfirmEntry, setDeleteConfirmEntry] = useState<string | null>(null);
  const [batchConfirm, setBatchConfirm] = useState<"approve" | "reject" | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modals for CRUD and Detailed Review
  const [reviewingEntry, setReviewingEntry] = useState<Entry | null>(null);
  const [editingEntry, setEditingEntry] = useState<EditingEntryState | null>(null);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
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
      showToast("success", `"${entry.name}" has been approved and published.`);
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
      showToast("success", `Discarded and purged all ${count} submissions.`);
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
        showToast("success", `"${editingEntry.name}" created and published!`);
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
        showToast("success", `"${editingEntry.name}" details updated.`);
        logAudit("Edit Asset", `Modified technical specs for "${editingEntry.name}"`);
      }
      setEditingEntry(null);
    } catch (err: any) {
      showToast("error", `Failed to save entry: ${err.message}`);
    } finally {
      setActioningId(null);
    }
  };

  // ── Actions: User Management ──────────────────────────────────────────────

  const handleUpdateUserProfile = async () => {
    if (!editingUser) return;
    setActioningId(editingUser.userKey);
    try {
      const { data: currentPref } = await supabase
        .from("user_preferences")
        .select("referral_source")
        .eq("user_key", editingUser.userKey)
        .maybeSingle();

      let existingMeta: any = {};
      try {
        if (currentPref?.referral_source) {
          existingMeta = JSON.parse(currentPref.referral_source);
        }
      } catch {}

      let finalAvatar = editingUser.avatarUrl || undefined;
      if (finalAvatar && finalAvatar.includes("dicebear.com")) {
        finalAvatar = undefined;
      }
      if (user && (editingUser.userKey === currentUserKey || editingUser.userKey === user.id)) {
        const oAuthPic = getOAuthAvatarUrl(user);
        if (oAuthPic) finalAvatar = oAuthPic;
      }

      const referralSourceObj = {
        ...existingMeta,
        source: "other",
        displayName: editingUser.displayName.trim(),
        username: editingUser.username,
        description: editingUser.description.trim(),
        github: editingUser.github.trim(),
        linkedin: editingUser.linkedin.trim(),
        medium: editingUser.medium.trim(),
        devto: editingUser.devto.trim(),
        portfolio: editingUser.portfolio.trim(),
        avatarUrl: finalAvatar,
      };

      const { error: err } = await supabase
        .from("user_preferences")
        .update({
          role: editingUser.role,
          referral_source: JSON.stringify(referralSourceObj),
          updated_at: new Date().toISOString(),
        })
        .eq("user_key", editingUser.userKey);

      if (err) throw err;

      const updatedUser: UserProfile = {
        ...editingUser,
        avatarUrl: finalAvatar,
      };

      setUsers((prev) =>
        prev.map((u) => (u.userKey === editingUser.userKey ? updatedUser : u))
      );
      showToast("success", `Profile for "${editingUser.displayName}" updated.`);
      logAudit("Edit User", `Updated profile for "${editingUser.displayName}" (${editingUser.username})`);
      setEditingUser(null);
    } catch (err: any) {
      showToast("error", `Failed to update profile: ${err.message}`);
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
      logAudit("Suspend User", `${isBlocked ? "Suspended" : "Reactivated"} account "${profile.displayName}"`);
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
      showToast("success", `Account "${profile.displayName}" permanently deleted everywhere.`);
      logAudit("Delete User", `Permanently deleted credentials and data for "${profile.displayName}" (${profile.username})`);
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
      logAudit("Export Data", `Exported ${filename} as JSON snapshot`);
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
          ? "Site announcement broadcasted globally to all users!"
          : "Announcement disabled."
      );
      logAudit(
        "Site Announcement",
        ann.enabled
          ? `Broadcasted banner globally: "${ann.message.slice(0, 35)}..."`
          : "Deactivated site-wide announcement"
      );
    } catch (err: any) {
      showToast("error", `Failed to save announcement: ${err.message}`);
    }
  };

  // ── Filtered Data Calculations ────────────────────────────────────────────

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

      const matchesStatus =
        usersStatusFilter === "all"
          ? true
          : usersStatusFilter === "deletion_requests"
          ? Boolean(u.deletionRequested)
          : usersStatusFilter === "blocked"
          ? u.isBlocked
          : !u.isBlocked;

      return matchesQuery && matchesStatus;
    });
  }, [users, usersSearch, usersStatusFilter]);

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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-left">
      {/* ── Top Google Cloud Console Breadcrumbs & Header Bar ────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#dadce0] dark:border-[#3c4043] mb-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-[#5f6368] dark:text-[#9aa0a6]">
            <button
              onClick={onBackToHome}
              className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors cursor-pointer flex items-center gap-1"
              title="Return to main application"
            >
              <ArrowLeft size={14} />
            </button>
            <span className="font-medium text-[#202124] dark:text-[#e8eaed]">AiVerse Console</span>
            <span className="opacity-40">/</span>
            <span>Governance & Administration</span>
            <span className="opacity-40">/</span>
            <span className="font-semibold text-[#1a73e8] dark:text-[#8ab4f8]">Cloud Control</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#8ab4f8] flex items-center justify-center font-bold">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-medium tracking-tight text-[#202124] dark:text-[#e8eaed]">
                Administrator Console
              </h1>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e6f4ea] text-[#137333] border border-[#ceead6] dark:bg-[#0d3419] dark:text-[#81c995] dark:border-[#1e5c30]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e8e3e]" />
              Production Active
            </span>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
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
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] dark:hover:bg-[#aecbfa] cursor-pointer shadow-xs transition-colors"
          >
            <Plus size={14} className="stroke-[2.5px]" />
            Add New Asset
          </button>

          {!loading && (
            <button
              onClick={loadData}
              title="Synchronize records with live database"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-[#3c4043] dark:text-[#e8eaed] hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <RefreshCw size={12} className={`stroke-[2.5px] ${loading ? "animate-spin" : ""}`} />
              Sync Database
            </button>
          )}

          <button
            onClick={() => setDirectDeleteModalOpen(true)}
            title="Purge account directly by Supabase Auth UID"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] hover:border-[#d93025] hover:text-[#d93025] dark:hover:border-[#f28b82] dark:hover:text-[#f28b82] bg-white dark:bg-[#202124] text-[#5f6368] dark:text-[#9aa0a6] transition-colors cursor-pointer"
          >
            <Trash2 size={12} />
            Purge by UID
          </button>
        </div>
      </div>

      {/* ── Authorization / Policy Notice Banner (Google Cloud Warning) ─────── */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-[#fef7e0] border border-[#f9ab00] dark:bg-[#332a00] dark:border-[#f9ab00]/50 text-[#7c4a03] dark:text-[#fdd663] text-xs flex gap-3">
          <Info size={16} className="shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Security & Policy Notice</p>
            <p className="leading-relaxed opacity-90">
              Database returned: {error}. Catalog fallback active. All management tools remain operational.
            </p>
          </div>
        </div>
      )}

      {/* ── Material 3 Horizontal Tab Strip (Google Cloud Console Standard) ── */}
      <div className="border-b border-[#dadce0] dark:border-[#3c4043] flex items-center gap-2 overflow-x-auto mb-6 scrollbar-none">
        {[
          {
            id: "submissions",
            label: "Review Queue",
            icon: Server,
            count: pendingEntries.length,
            isAlert: false,
          },
          {
            id: "directory",
            label: "Catalog Directory",
            icon: Database,
            count: approvedEntries.length,
            isAlert: false,
          },
          {
            id: "users",
            label: "Registered Users",
            icon: Users,
            count: pendingDeletionUsers.length > 0 ? pendingDeletionUsers.length : users.length,
            isAlert: pendingDeletionUsers.length > 0,
            alertLabel: pendingDeletionUsers.length > 0 ? `${pendingDeletionUsers.length} Deletion Requests` : undefined,
          },
          {
            id: "analytics",
            label: "Cloud Telemetry",
            icon: BarChart3,
          },
          {
            id: "announcements",
            label: "Site Broadcast",
            icon: Megaphone,
            count: announcement.enabled ? 1 : 0,
            isAlert: false,
          },
          {
            id: "audit",
            label: "Audit Logs",
            icon: History,
            count: auditLogs.length,
            isAlert: false,
          },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`relative py-3 px-4 text-xs font-medium border-b-2 -mb-[1px] flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
                isActive
                  ? "border-[#1a73e8] dark:border-[#8ab4f8] text-[#1a73e8] dark:text-[#8ab4f8] font-semibold"
                  : "border-transparent text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:border-[#dadce0] dark:hover:border-[#5f6368]"
              }`}
            >
              <TabIcon size={14} className="stroke-[2px]" />
              <span>{tab.label}</span>
              {tab.isAlert ? (
                <span className="ml-1 px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82] border border-[#f5b4af] dark:border-[#5c2423] animate-pulse">
                  {tab.alertLabel || tab.count}
                </span>
              ) : tab.count !== undefined && tab.count > 0 ? (
                <span
                  className={`ml-1 px-2 py-0.2 rounded-full text-[10px] font-semibold ${
                    isActive
                      ? "bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1a2e4c] dark:text-[#a8c7fa]"
                      : "bg-neutral-100 dark:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
                  }`}
                >
                  {tab.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* ── Main Content Area ────────────────────────────────────────────────── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-8 h-8 border-3 border-neutral-300 border-t-[#1a73e8] rounded-full animate-spin" />
          <p className="text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6]">Synchronizing console records...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* ══════════════════════════════════════════════════════════════════════
              TAB 1: PENDING SUBMISSIONS (REVIEW QUEUE)
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "submissions" && (
            <div className="space-y-4">
              {/* Controls and filter bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
                <div className="flex items-center gap-2 flex-wrap flex-1">
                  <div className="relative flex-1 max-w-sm">
                    <input
                      type="text"
                      value={submissionsSearch}
                      onChange={(e) => setSubmissionsSearch(e.target.value)}
                      placeholder="Search queue by asset name or org..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-[#f1f3f4] dark:bg-[#202124] focus:bg-white dark:focus:bg-[#1e1f20] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors"
                    />
                    <Search className="absolute left-2.5 top-2 text-[#5f6368] dark:text-[#9aa0a6]" size={13} />
                  </div>

                  <select
                    value={submissionsTypeFilter}
                    onChange={(e) => setSubmissionsTypeFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Model">Models</option>
                    <option value="Framework">Frameworks</option>
                    <option value="Dataset">Datasets</option>
                    <option value="Platform">Platforms</option>
                    <option value="AI">AI Applications</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-[#dadce0] dark:border-[#5f6368] rounded-md overflow-hidden">
                    <button
                      onClick={() => setSubmissionsViewMode("table")}
                      className={`p-1.5 transition-colors cursor-pointer ${
                        submissionsViewMode === "table"
                          ? "bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1a2e4c] dark:text-[#a8c7fa]"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
                      }`}
                      title="Table View (Google Cloud Queue)"
                    >
                      <Table size={14} />
                    </button>
                    <button
                      onClick={() => setSubmissionsViewMode("cards")}
                      className={`p-1.5 transition-colors cursor-pointer ${
                        submissionsViewMode === "cards"
                          ? "bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1a2e4c] dark:text-[#a8c7fa]"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
                      }`}
                      title="Cards View"
                    >
                      <LayoutGrid size={14} />
                    </button>
                  </div>

                  {pendingEntries.length > 0 && (
                    <>
                      <button
                        onClick={() => setBatchConfirm("approve")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] dark:hover:bg-[#aecbfa] cursor-pointer shadow-xs transition-colors"
                      >
                        <CheckCheck size={13} />
                        Approve All ({pendingEntries.length})
                      </button>
                      <button
                        onClick={() => setBatchConfirm("reject")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#d93025] dark:text-[#f28b82] border border-[#d93025]/30 dark:border-[#f28b82]/30 hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] cursor-pointer transition-colors"
                      >
                        <Trash2 size={13} />
                        Clear All
                      </button>
                    </>
                  )}
                </div>
              </div>

              {filteredSubmissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-dashed rounded-lg border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995] mb-1">
                    <Check size={22} className="stroke-[2.5px]" />
                  </div>
                  <p className="text-sm font-medium text-[#202124] dark:text-[#e8eaed]">Review queue is clean</p>
                  <p className="text-xs max-w-sm text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                    All submitted models, frameworks, and datasets have been audited and published to the live directory.
                  </p>
                </div>
              ) : submissionsViewMode === "table" ? (
                /* ── Review Queue: Google Cloud Console Data Table ── */
                <div className="overflow-x-auto rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
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
                          <tr
                            key={entry.name}
                            className="hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors"
                          >
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
                                <span className="truncate max-w-[110px] text-[#202124] dark:text-[#e8eaed]">
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
                                  title="Inspect technical specifications"
                                >
                                  Inspect
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleApprove(entry)}
                                  disabled={actioningId === entry.name}
                                  className="px-2.5 py-1 rounded text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] text-white transition-colors cursor-pointer disabled:opacity-50"
                                  title="Approve and publish"
                                >
                                  {actioningId === entry.name ? "..." : "Approve"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmEntry(entry.name)}
                                  disabled={actioningId === entry.name}
                                  className="p-1 rounded text-[#d93025] dark:text-[#f28b82] hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer disabled:opacity-50"
                                  title="Reject submission"
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
              ) : (
                /* ── Review Queue: Cards View ── */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSubmissions.map((entry) => {
                    const submitter = users.find((u) => u.userKey === entry.submitted_by);
                    const isNew = isNewSubmission(entry.created_at);

                    return (
                      <div
                        key={entry.name}
                        className="rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] p-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm border ${typeIcon(entry.type, t)}`}>
                                {TYPE_GLYPH[entry.type] ?? "◆"}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">
                                    {entry.name}
                                  </h3>
                                  {isNew && (
                                    <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1a2e4c] dark:text-[#a8c7fa]">
                                      NEW
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">
                                  {entry.org || "Independent"} · {entry.year}
                                </p>
                              </div>
                            </div>
                            {entry.url && (
                              <a
                                href={entry.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8]"
                              >
                                <ExternalLink size={13} />
                              </a>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${typeBadge(entry.type, t)}`}>
                              {entry.type}
                            </span>
                            <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${taskBadge(entry.task, t)}`}>
                              {entry.task}
                            </span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6]">
                              {entry.license}
                            </span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6]">
                              Size: {entry.size}
                            </span>
                          </div>

                          <p className="text-xs leading-relaxed text-[#3c4043] dark:text-[#bdc1c6] line-clamp-3">
                            {entry.summary}
                          </p>

                          {/* Submitter info */}
                          <div className="p-2 rounded bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60 flex items-center gap-2 text-xs">
                            <div className="w-5 h-5 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[9px] font-bold">
                              {submitter?.avatarUrl ? (
                                <img src={submitter.avatarUrl} alt="" className="w-full h-full object-cover" />
                              ) : (
                                submitter?.displayName ? submitter.displayName[0].toUpperCase() : "U"
                              )}
                            </div>
                            <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">
                              Submitted by <strong className="text-[#202124] dark:text-[#e8eaed]">{submitter?.displayName || "Anonymous"}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2 pt-3 mt-3 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60">
                          <button
                            type="button"
                            onClick={() => setReviewingEntry(entry)}
                            className="px-3 py-1.5 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#e8f0fe] dark:hover:bg-[#1a2e4c] transition-colors cursor-pointer"
                          >
                            Inspect Specs
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApprove(entry)}
                            disabled={actioningId === entry.name}
                            className="flex-1 py-1.5 rounded text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] text-white transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {actioningId === entry.name ? "Approving..." : "Approve & Publish"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmEntry(entry.name)}
                            disabled={actioningId === entry.name}
                            className="p-1.5 rounded border border-[#dadce0] dark:border-[#5f6368] text-[#d93025] dark:text-[#f28b82] hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer disabled:opacity-50"
                            title="Reject"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 2: CATALOG DIRECTORY (APPROVED ASSETS)
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "directory" && (
            <div className="space-y-4">
              {/* Search, Filter Chips, and Actions Bar */}
              <div className="p-4 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      value={directorySearch}
                      onChange={(e) => {
                        setDirectorySearch(e.target.value);
                        setDirectoryPage(1);
                      }}
                      placeholder="Search live catalog by name, org, or task..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-[#f1f3f4] dark:bg-[#202124] focus:bg-white dark:focus:bg-[#1e1f20] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors"
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
                      className="px-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none cursor-pointer"
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

                    <button
                      onClick={() => exportDataAsJson(approvedEntries, "aiverse_catalog")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      title="Download catalog JSON snapshot"
                    >
                      <Download size={12} />
                      Export
                    </button>
                  </div>
                </div>

                {/* Google Material 3 Category Filter Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60">
                  <span className="text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] mr-1">Filter by type:</span>
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

              {filteredApproved.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-dashed rounded-lg border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
                  <p className="text-sm font-medium text-[#202124] dark:text-[#e8eaed]">No assets match your search criteria</p>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Try clearing your search query or selected category filter chips.
                  </p>
                </div>
              ) : (
                /* Google Cloud Console Table */
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
                          <tr
                            key={entry.name}
                            className="hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors"
                          >
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
                                  title="Edit asset specifications"
                                >
                                  <Edit size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmEntry(entry.name)}
                                  disabled={actioningId === entry.name}
                                  className="p-1.5 rounded hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] text-[#d93025] dark:text-[#f28b82] transition-colors cursor-pointer disabled:opacity-50"
                                  title="Delete asset from catalog"
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

                  {/* Pagination Footer (Google Cloud Console Style) */}
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
                        <option value={100}>100</option>
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

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 3: REGISTERED USERS & ACCOUNT DELETION APPROVALS
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "users" && (
            <div className="space-y-4">
              {/* ── Google Security Alert Callout for Pending Deletion Requests ── */}
              {pendingDeletionUsers.length > 0 && (
                <div className="p-4 rounded-lg border border-[#f9ab00] bg-[#fef7e0] dark:bg-[#332a00] dark:border-[#f9ab00]/50 text-[#7c4a03] dark:text-[#fdd663] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-[#f9ab00]/20 text-[#b06000] dark:text-[#fdd663] shrink-0 mt-0.5">
                      <ShieldAlert size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#7c4a03] dark:text-[#fdd663]">
                        Security Policy: {pendingDeletionUsers.length} Account Deletion Request{pendingDeletionUsers.length > 1 ? "s" : ""} Pending Review
                      </h4>
                      <p className="text-[11px] text-[#7c4a03]/90 dark:text-[#fdd663]/90 leading-relaxed">
                        Regular users cannot self-delete their accounts. Review submitted reasons below and either approve the permanent purge or dismiss the request.
                      </p>
                    </div>
                  </div>
                  {usersStatusFilter !== "deletion_requests" && (
                    <button
                      type="button"
                      onClick={() => setUsersStatusFilter("deletion_requests")}
                      className="px-3 py-1.5 rounded text-xs font-semibold bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
                    >
                      Filter Requests ({pendingDeletionUsers.length})
                    </button>
                  )}
                </div>
              )}

              {/* Filter, Search, and View Controls */}
              <div className="p-4 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      value={usersSearch}
                      onChange={(e) => setUsersSearch(e.target.value)}
                      placeholder="Search accounts by name, username, or reason..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-[#f1f3f4] dark:bg-[#202124] focus:bg-white dark:focus:bg-[#1e1f20] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors"
                    />
                    <Search className="absolute left-2.5 top-2 text-[#5f6368] dark:text-[#9aa0a6]" size={13} />
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View Mode Toggle */}
                    <div className="flex items-center border border-[#dadce0] dark:border-[#5f6368] rounded-md overflow-hidden">
                      <button
                        onClick={() => setUsersViewMode("table")}
                        className={`p-1.5 transition-colors cursor-pointer ${
                          usersViewMode === "table"
                            ? "bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1a2e4c] dark:text-[#a8c7fa]"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
                        }`}
                        title="Table View (Google Admin Directory)"
                      >
                        <Table size={14} />
                      </button>
                      <button
                        onClick={() => setUsersViewMode("cards")}
                        className={`p-1.5 transition-colors cursor-pointer ${
                          usersViewMode === "cards"
                            ? "bg-[#e8f0fe] text-[#1967d2] dark:bg-[#1a2e4c] dark:text-[#a8c7fa]"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
                        }`}
                        title="Cards View"
                      >
                        <LayoutGrid size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => exportDataAsJson(users, "aiverse_users")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Download size={12} />
                      Export
                    </button>
                  </div>
                </div>

                {/* Status Filter Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60">
                  <span className="text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] mr-1">Status:</span>
                  {[
                    { id: "all", label: "All Accounts", count: users.length },
                    {
                      id: "deletion_requests",
                      label: "Deletion Requests",
                      count: pendingDeletionUsers.length,
                      isAlert: pendingDeletionUsers.length > 0,
                    },
                    {
                      id: "active",
                      label: "Active Users",
                      count: users.filter((u) => !u.isBlocked && !u.deletionRequested).length,
                    },
                    {
                      id: "blocked",
                      label: "Suspended",
                      count: users.filter((u) => u.isBlocked).length,
                    },
                  ].map((chip) => {
                    const isSelected = usersStatusFilter === chip.id;
                    return (
                      <button
                        key={chip.id}
                        onClick={() => setUsersStatusFilter(chip.id as any)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                          isSelected
                            ? chip.isAlert
                              ? "bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82] border-transparent font-semibold"
                              : "bg-[#c2e7ff] text-[#001d35] dark:bg-[#004a77] dark:text-[#c2e7ff] border-transparent font-semibold"
                            : chip.isAlert
                            ? "bg-[#fce8e6]/50 text-[#c5221f] border-[#f5b4af] dark:bg-[#3c1716]/50 dark:text-[#f28b82] dark:border-[#5c2423]"
                            : "bg-transparent text-[#444746] dark:text-[#c4c7c5] border-[#747775]/40 dark:border-[#8e918f]/40 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }`}
                      >
                        <span>{chip.label}</span>
                        <span className="text-[10px] opacity-75">({chip.count})</span>
                      </button>
                    );
                  })}
                  <div className="ml-auto text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    Showing <strong className="text-[#202124] dark:text-[#e8eaed]">{filteredUsers.length}</strong> accounts
                  </div>
                </div>
              </div>

              {filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-dashed rounded-lg border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
                  <p className="text-sm font-medium text-[#202124] dark:text-[#e8eaed]">No accounts found</p>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                    No user accounts match the current filter or search criteria.
                  </p>
                </div>
              ) : usersViewMode === "table" ? (
                /* Google Admin Directory Table */
                <div className="overflow-x-auto rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124] text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6]">
                        <th className="px-4 py-3">User</th>
                        <th className="px-3 py-3">Role</th>
                        <th className="px-3 py-3">Status</th>
                        <th className="px-3 py-3">Deletion Request Info</th>
                        <th className="px-3 py-3">Last Updated</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dadce0]/60 dark:divide-[#3c4043]/60 text-xs">
                      {filteredUsers.map((profile) => (
                        <tr
                          key={profile.userKey}
                          className={`hover:bg-[#f8f9fa] dark:hover:bg-[#282a2d] transition-colors ${
                            profile.deletionRequested ? "bg-[#fce8e6]/10 dark:bg-[#3c1716]/10" : ""
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center font-bold text-xs text-[#202124] dark:text-[#e8eaed] shrink-0">
                                {profile.avatarUrl ? (
                                  <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  profile.displayName[0].toUpperCase()
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-[#202124] dark:text-[#e8eaed] truncate max-w-[150px]">
                                  {profile.displayName}
                                </div>
                                <div className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] font-mono truncate max-w-[150px]">
                                  {profile.username}
                                </div>
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
                          <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6]">
                            {profile.deletionRequested ? (
                              <div className="max-w-xs space-y-0.5">
                                <p className="text-[11px] text-[#d93025] dark:text-[#f28b82] italic line-clamp-1">
                                  "{profile.deletionReason || "No specific reason provided."}"
                                </p>
                                {profile.deletionRequestedAt && (
                                  <p className="text-[10px] font-mono text-[#5f6368] dark:text-[#9aa0a6]">
                                    Requested: {new Date(profile.deletionRequestedAt).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <span className="text-[#9aa0a6] dark:text-[#5f6368]">—</span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-[#5f6368] dark:text-[#9aa0a6] font-mono text-[11px]">
                            {new Date(profile.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {profile.deletionRequested ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleRejectDeletionRequest(profile)}
                                  disabled={actioningId === profile.userKey}
                                  className="px-2.5 py-1 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
                                  title="Reject deletion request"
                                >
                                  Dismiss
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmUser(profile)}
                                  disabled={actioningId === profile.userKey}
                                  className="px-2.5 py-1 rounded text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                                  title="Approve and permanently delete user"
                                >
                                  Approve & Purge
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => setEditingUser(profile)}
                                  className="px-2 py-1 rounded text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#e8f0fe] dark:hover:bg-[#1a2e4c] transition-colors cursor-pointer"
                                >
                                  Edit
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
                                  title="Delete user"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Google Admin Cards View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.map((profile) => (
                    <div
                      key={profile.userKey}
                      className={`p-4 rounded-lg border flex flex-col justify-between transition-colors bg-white dark:bg-[#1e1f20] ${
                        profile.deletionRequested
                          ? "border-[#d93025]/50 bg-[#fce8e6]/5"
                          : "border-[#dadce0] dark:border-[#3c4043]"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center font-bold text-sm text-[#202124] dark:text-[#e8eaed] shrink-0">
                              {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
                              ) : (
                                profile.displayName[0].toUpperCase()
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed] truncate">
                                {profile.displayName}
                              </h4>
                              <p className="text-[11px] font-mono text-[#5f6368] dark:text-[#9aa0a6] truncate">
                                {profile.username}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 border ${
                              profile.deletionRequested
                                ? "bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82] border-[#f5b4af] dark:border-[#5c2423]"
                                : profile.isBlocked
                                ? "bg-[#fce8e6] text-[#c5221f] dark:bg-[#3c1716] dark:text-[#f28b82] border-transparent"
                                : "bg-[#e6f4ea] text-[#137333] dark:bg-[#0d3419] dark:text-[#81c995] border-transparent"
                            }`}
                          >
                            {profile.deletionRequested ? "Deletion Requested" : profile.isBlocked ? "Suspended" : "Active"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-medium capitalize px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[#3c4043] dark:text-[#e8eaed]">
                            {profile.role}
                          </span>
                          {profile.interests.slice(0, 2).map((item) => (
                            <span key={item} className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6]">
                              #{item}
                            </span>
                          ))}
                        </div>

                        {profile.description && (
                          <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] line-clamp-2 leading-relaxed">
                            {profile.description}
                          </p>
                        )}

                        {/* Deletion Request Notice Box inside Card */}
                        {profile.deletionRequested && (
                          <div className="p-2.5 rounded border border-[#f9ab00]/50 bg-[#fef7e0]/50 dark:bg-[#332a00]/50 space-y-1">
                            <div className="flex items-center justify-between text-[11px] font-semibold text-[#b06000] dark:text-[#fdd663]">
                              <span className="flex items-center gap-1">
                                <AlertTriangle size={11} />
                                Deletion Reason:
                              </span>
                              {profile.deletionRequestedAt && (
                                <span className="text-[10px] font-mono opacity-80">
                                  {new Date(profile.deletionRequestedAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#7c4a03] dark:text-[#fdd663] italic">
                              "{profile.deletionReason || "No specific reason provided."}"
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 mt-3 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60">
                        {profile.deletionRequested ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleRejectDeletionRequest(profile)}
                              disabled={actioningId === profile.userKey}
                              className="flex-1 py-1.5 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              Dismiss
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmUser(profile)}
                              disabled={actioningId === profile.userKey}
                              className="flex-1 py-1.5 rounded text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white transition-colors cursor-pointer disabled:opacity-50 shadow-xs flex items-center justify-center gap-1"
                            >
                              <Trash2 size={12} />
                              Approve & Purge
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setEditingUser(profile)}
                              className="flex-1 py-1.5 rounded text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#e8f0fe] dark:hover:bg-[#1a2e4c] transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setBlockingUser(profile)}
                              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                                profile.isBlocked
                                  ? "text-[#137333] dark:text-[#81c995] border border-[#137333]/30 hover:bg-[#e6f4ea] dark:hover:bg-[#0d3419]"
                                  : "text-[#b06000] dark:text-[#fdd663] border border-[#b06000]/30 hover:bg-[#fef7e0] dark:hover:bg-[#332a00]"
                              }`}
                            >
                              {profile.isBlocked ? "Unsuspend" : "Suspend"}
                            </button>
                            <button
                              onClick={() => setDeleteConfirmUser(profile)}
                              className="p-1.5 rounded text-[#d93025] dark:text-[#f28b82] hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer"
                              title="Delete user"
                            >
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 4: CLOUD TELEMETRY & ANALYTICS
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Google Cloud Monitoring KPI Metric Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { label: "Active Catalog", value: approvedEntries.length, sub: "Live assets verified", color: "text-[#1a73e8]" },
                  { label: "Review Queue", value: pendingEntries.length, sub: "Pending audit", color: "text-[#b06000]" },
                  { label: "Registered Builders", value: users.length, sub: "Active developer accounts", color: "text-[#1e8e3e]" },
                  { label: "Featured Assets", value: featuredCount, sub: "Highlighted in showcases", color: "text-[#f9ab00]" },
                  { label: "Suspended / Flagged", value: users.filter((u) => u.isBlocked).length, sub: "Restricted access", color: "text-[#d93025]" },
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

              {/* Resource Distribution (Google Cloud Resource Quotas Style) */}
              <div className="p-5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">Catalog Resource Distribution</h3>
                    <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">Proportional breakdown across verified technical categories</p>
                  </div>
                  <span className="text-xs font-mono font-medium text-[#5f6368] dark:text-[#9aa0a6]">{approvedEntries.length} Total</span>
                </div>

                <div className="space-y-3 pt-2">
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

              {/* Data Export & Backup Center */}
              <div className="p-5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">Cloud Storage & Snapshot Center</h3>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">Download verified snapshots for cold storage, backups, and off-site migrations</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  <button
                    onClick={() => exportDataAsJson(approvedEntries, "aiverse_catalog_approved")}
                    className="p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] text-left cursor-pointer transition-colors"
                  >
                    <FileJson size={18} className="text-[#1a73e8] mb-1.5" />
                    <p className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">Catalog Assets</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">Export all {approvedEntries.length} approved tools</p>
                  </button>

                  <button
                    onClick={() => exportDataAsJson(users, "aiverse_builders_directory")}
                    className="p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] text-left cursor-pointer transition-colors"
                  >
                    <Users size={18} className="text-[#1e8e3e] mb-1.5" />
                    <p className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">Builder Registry</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">Export user profiles & roles</p>
                  </button>

                  <button
                    onClick={() => exportDataAsJson(pendingEntries, "aiverse_pending_queue")}
                    className="p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] text-left cursor-pointer transition-colors"
                  >
                    <Server size={18} className="text-[#b06000] mb-1.5" />
                    <p className="text-xs font-semibold text-[#202124] dark:text-[#e8eaed]">Review Queue</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] mt-0.5">Export unapproved queue</p>
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

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 5: SITE ANNOUNCEMENT BROADCAST
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "announcements" && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] space-y-5">
                <div>
                  <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
                    Site-wide Announcement Banner
                  </h3>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] mt-0.5 leading-relaxed">
                    Broadcast priority messages and service notices across the top banner of AiVerse.
                  </p>
                </div>

                {/* Live Preview Box (Google Material 3 Alert Banner) */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">Live Banner Preview</span>
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

                {/* Form Controls */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#202124]">
                    <div>
                      <p className="text-xs font-medium text-[#202124] dark:text-[#e8eaed]">Broadcast State</p>
                      <p className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">Enable or disable the global banner</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAnnouncement((prev) => ({ ...prev, enabled: !prev.enabled }))}
                      className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                        announcement.enabled
                          ? "bg-[#1e8e3e] text-white"
                          : "bg-neutral-200 dark:bg-neutral-700 text-[#5f6368] dark:text-[#9aa0a6]"
                      }`}
                    >
                      {announcement.enabled ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {/* Banner Type Chips */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">Notice Accent</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "info", label: "Informational (Blue)" },
                        { id: "success", label: "Release (Green)" },
                        { id: "warning", label: "Notice (Amber)" },
                        { id: "special", label: "Special (Purple)" },
                      ].map((sev) => (
                        <button
                          key={sev.id}
                          type="button"
                          onClick={() => setAnnouncement((prev) => ({ ...prev, type: sev.id as any }))}
                          className={`p-2 rounded-md border text-xs font-medium text-center cursor-pointer transition-colors ${
                            announcement.type === sev.id
                              ? "border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8] dark:border-[#8ab4f8] dark:bg-[#1a2e4c] dark:text-[#8ab4f8] font-semibold"
                              : "border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-50 dark:hover:bg-neutral-800"
                          }`}
                        >
                          {sev.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">Announcement Text</label>
                    <textarea
                      value={announcement.message}
                      onChange={(e) => setAnnouncement((prev) => ({ ...prev, message: e.target.value }))}
                      rows={2}
                      maxLength={180}
                      className="w-full p-2.5 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                      placeholder="e.g. 15 new vision models and benchmarks have been added to the catalog!"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">Button Label (Optional)</label>
                      <input
                        type="text"
                        value={announcement.linkText || ""}
                        onChange={(e) => setAnnouncement((prev) => ({ ...prev, linkText: e.target.value }))}
                        placeholder="e.g. Explore Now"
                        className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider">Button URL (Optional)</label>
                      <input
                        type="text"
                        value={announcement.linkUrl || ""}
                        onChange={(e) => setAnnouncement((prev) => ({ ...prev, linkUrl: e.target.value }))}
                        placeholder="e.g. #catalog or https://..."
                        className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => handleSaveAnnouncement(announcement)}
                      className="px-4 py-2 rounded-md text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] cursor-pointer shadow-xs transition-colors"
                    >
                      Save & Broadcast Live
                    </button>
                    {announcement.enabled && (
                      <button
                        type="button"
                        onClick={() => handleSaveAnnouncement({ ...announcement, enabled: false })}
                        className="px-3 py-2 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
                      >
                        Deactivate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              TAB 6: CLOUD AUDIT & LOGGING
          ══════════════════════════════════════════════════════════════════════ */}
          {activeTab === "audit" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
                <div>
                  <h3 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">Cloud Security & Activity Audit Log</h3>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">Chronological log of administrative actions, user suspensions, and catalog updates</p>
                </div>
                {auditLogs.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportDataAsJson(auditLogs, "aiverse_audit_log")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#dadce0] dark:border-[#5f6368] text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Download size={12} />
                      Export
                    </button>
                    <button
                      onClick={clearAuditLogs}
                      className="px-3 py-1.5 rounded-md text-xs font-medium text-[#d93025] dark:text-[#f28b82] border border-[#d93025]/30 hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer"
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
                    Actions performed in this console will be logged chronologically here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20]">
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
              )}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MATERIAL 3 DIALOGS AND MODALS
      ══════════════════════════════════════════════════════════════════════ */}

      {/* ── Modal: Inspect Pending Submission ───────────────────────────────── */}
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
                    Architecture Specifications
                  </label>
                  <p className="p-2.5 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60">
                    {reviewingEntry.architecture}
                  </p>
                </div>
              )}

              {reviewingEntry.benchmarks && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                    Benchmarks & Scores
                  </label>
                  <p className="p-2.5 rounded-lg bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0]/60 dark:border-[#3c4043]/60 font-mono text-[11px]">
                    {reviewingEntry.benchmarks}
                  </p>
                </div>
              )}

              {reviewingEntry.limitations && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">
                    Known Limitations & Constraints
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
                    Official URL
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
                className="px-4 py-2 rounded-md text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirmEntry(reviewingEntry.name)}
                className="px-3 py-2 rounded-md text-xs font-medium text-[#d93025] border border-[#d93025]/30 hover:bg-[#fce8e6] dark:hover:bg-[#3c1716] transition-colors cursor-pointer"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => handleApprove(reviewingEntry)}
                disabled={actioningId === reviewingEntry.name}
                className="px-4 py-2 rounded-md text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] transition-colors cursor-pointer disabled:opacity-50"
              >
                {actioningId === reviewingEntry.name ? "Approving..." : "Approve & Publish"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Batch Confirm ────────────────────────────────────────────── */}
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
              {batchConfirm === "approve" ? `Batch Approve All ${pendingEntries.length} Assets?` : `Purge All ${pendingEntries.length} Submissions?`}
            </h3>
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              {batchConfirm === "approve"
                ? "This will batch-publish all currently pending submissions to the live catalog immediately."
                : "This will permanently discard all submissions currently awaiting review in the queue."}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBatchConfirm(null)}
                className="px-4 py-2 rounded-md text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={batchConfirm === "approve" ? handleBatchApproveAll : handleBatchRejectAll}
                className={`px-4 py-2 rounded-md text-xs font-medium text-white cursor-pointer ${
                  batchConfirm === "approve" ? "bg-[#1a73e8] hover:bg-[#1557b0]" : "bg-[#d93025] hover:bg-[#b31412]"
                }`}
              >
                {batchConfirm === "approve" ? `Approve All (${pendingEntries.length})` : "Purge Submissions"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Create / Edit Catalog Asset ──────────────────────────────── */}
      {editingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-2xl p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingEntry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#8ab4f8]">
                <Edit size={18} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">
                  {editingEntry.isNew ? "Create New AI Asset" : `Edit Specifications: ${editingEntry.name}`}
                </h3>
                <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                  {editingEntry.isNew ? "Directly publish a verified tool to the live catalog" : "Update technical specifications and benchmark scores"}
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
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Parameter / Dataset Size</label>
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
                <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Technical Summary</label>
                <textarea
                  required
                  value={editingEntry.summary}
                  onChange={(e) => setEditingEntry({ ...editingEntry, summary: e.target.value })}
                  rows={2}
                  className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] resize-none"
                  placeholder="Concise overview of architectural advantages and primary use case..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Architecture Specs</label>
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
                    placeholder="e.g. MMLU: 88.5%, HumanEval: 82.6%"
                    className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Official Repository / Link URL</label>
                <input
                  type="url"
                  value={editingEntry.url}
                  onChange={(e) => setEditingEntry({ ...editingEntry, url: e.target.value })}
                  placeholder="https://github.com/... or https://huggingface.co/..."
                  className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="entry-featured-checkbox"
                  checked={editingEntry.popular}
                  onChange={(e) => setEditingEntry({ ...editingEntry, popular: e.target.checked })}
                  className="rounded border-[#dadce0] text-[#1a73e8] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="entry-featured-checkbox" className="text-xs font-medium text-[#7c4a03] dark:text-[#fdd663] flex items-center gap-1 cursor-pointer">
                  <Star size={12} className="fill-[#f9ab00] text-[#f9ab00]" />
                  Highlight as featured asset on home dashboard
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#dadce0] dark:border-[#3c4043]">
                <button
                  type="button"
                  onClick={() => setEditingEntry(null)}
                  className="px-4 py-2 rounded-md text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actioningId === editingEntry.name}
                  className="px-4 py-2 rounded-md text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] cursor-pointer shadow-xs disabled:opacity-50 transition-colors"
                >
                  {actioningId === editingEntry.name ? "Saving..." : editingEntry.isNew ? "Publish Asset" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Delete Entry Confirmation ─────────────────────────────────── */}
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
              Are you sure you want to delete <strong className="text-[#202124] dark:text-[#e8eaed]">"{deleteConfirmEntry}"</strong>? This will remove the item from the active catalog and all comparison views.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmEntry(null)}
                className="px-4 py-2 rounded-md text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executeDelete(deleteConfirmEntry)}
                className="px-4 py-2 rounded-md text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer transition-colors"
              >
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Edit User Profile ─────────────────────────────────────────── */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#5f6368] dark:text-[#9aa0a6]"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#8ab4f8]">
                <Users size={18} />
              </div>
              <h3 className="text-base font-semibold text-[#202124] dark:text-[#e8eaed]">Edit User Account</h3>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleUpdateUserProfile();
              }}
              className="space-y-4 text-left"
            >
              <div>
                <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.displayName}
                  onChange={(e) => setEditingUser({ ...editingUser, displayName: e.target.value })}
                  className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none cursor-pointer"
                >
                  <option value="developer">Developer / Engineer</option>
                  <option value="designer">UI/UX Designer</option>
                  <option value="researcher">AI Researcher</option>
                  <option value="pm">Product Manager</option>
                  <option value="creator">Content Creator</option>
                  <option value="founder">Founder / Executive</option>
                  <option value="other">Other Technologist</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5f6368] dark:text-[#9aa0a6] uppercase tracking-wider mb-1">Bio / Description</label>
                <textarea
                  value={editingUser.description}
                  onChange={(e) => setEditingUser({ ...editingUser, description: e.target.value })}
                  rows={2}
                  maxLength={160}
                  className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="url"
                  value={editingUser.github}
                  onChange={(e) => setEditingUser({ ...editingUser, github: e.target.value })}
                  placeholder="GitHub URL"
                  className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none"
                />
                <input
                  type="url"
                  value={editingUser.linkedin}
                  onChange={(e) => setEditingUser({ ...editingUser, linkedin: e.target.value })}
                  placeholder="LinkedIn URL"
                  className="w-full p-2 rounded-md border border-[#dadce0] dark:border-[#5f6368] bg-white dark:bg-[#202124] text-xs text-[#202124] dark:text-[#e8eaed] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#dadce0] dark:border-[#3c4043]">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-md text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actioningId === editingUser.userKey}
                  className="px-4 py-2 rounded-md text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#8ab4f8] dark:text-[#202124] cursor-pointer transition-colors"
                >
                  {actioningId === editingUser.userKey ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Suspend User ─────────────────────────────────────────────── */}
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
                {blockingUser.isBlocked ? "Lift Account Suspension" : "Suspend User Account"}
              </h3>
            </div>
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              {blockingUser.isBlocked ? (
                <>Lift suspension for <strong className="text-[#202124] dark:text-[#e8eaed]">{blockingUser.displayName}</strong>? They will regain access immediately.</>
              ) : (
                <>Select duration to temporarily suspend <strong className="text-[#202124] dark:text-[#e8eaed]">{blockingUser.displayName}</strong> from logging into AiVerse.</>
              )}
            </p>
            <div className="flex flex-col gap-2 pt-1">
              {blockingUser.isBlocked ? (
                <button
                  onClick={() => handleExecuteBlock(blockingUser, false, 0)}
                  className="w-full py-2 rounded-md font-medium text-xs bg-[#1e8e3e] hover:bg-[#137333] text-white cursor-pointer transition-colors"
                >
                  Lift Suspension (Reactivate)
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleExecuteBlock(blockingUser, true, 24 * 60 * 60 * 1000)}
                    className="w-full py-2 rounded-md font-medium text-xs border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#202124] dark:text-[#e8eaed] cursor-pointer transition-colors"
                  >
                    Suspend for 24 Hours
                  </button>
                  <button
                    onClick={() => handleExecuteBlock(blockingUser, true, 7 * 24 * 60 * 60 * 1000)}
                    className="w-full py-2 rounded-md font-medium text-xs border border-[#dadce0] dark:border-[#5f6368] hover:bg-neutral-50 dark:hover:bg-neutral-800 text-[#202124] dark:text-[#e8eaed] cursor-pointer transition-colors"
                  >
                    Suspend for 7 Days
                  </button>
                  <button
                    onClick={() => handleExecuteBlock(blockingUser, true, -1)}
                    className="w-full py-2 rounded-md font-medium text-xs bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer transition-colors"
                  >
                    Suspend Indefinitely
                  </button>
                </>
              )}
              <button
                onClick={() => setBlockingUser(null)}
                className="w-full py-2 rounded-md text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Approve Deletion / Delete User ────────────────────────────── */}
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
                {deleteConfirmUser.deletionRequested ? "Approve User Deletion Request" : "Permanently Delete Account"}
              </h3>
            </div>

            {deleteConfirmUser.deletionRequested && (
              <div className="p-3 rounded-lg border border-[#f9ab00] bg-[#fef7e0] dark:bg-[#332a00] dark:border-[#f9ab00]/50 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-[#b06000] dark:text-[#fdd663]">
                  <span className="flex items-center gap-1">
                    <AlertTriangle size={12} />
                    User Deletion Request Reason:
                  </span>
                  {deleteConfirmUser.deletionRequestedAt && (
                    <span className="text-[10px] font-mono opacity-80">
                      {new Date(deleteConfirmUser.deletionRequestedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#7c4a03] dark:text-[#fdd663] italic">
                  "{deleteConfirmUser.deletionReason || "No specific reason provided."}"
                </p>
              </div>
            )}

            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              Permanently purge account <strong className="text-[#202124] dark:text-[#e8eaed]">{deleteConfirmUser.displayName} ({deleteConfirmUser.username})</strong>?
              <br />
              This will invoke the security administrator RPC to permanently remove credentials from <strong className="text-[#d93025] dark:text-[#f28b82]">auth.users</strong> and purge all associated bookmarks, ratings, and comments.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmUser(null)}
                className="px-4 py-2 rounded-md text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
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
                className="px-4 py-2 rounded-md text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer shadow-xs transition-colors"
              >
                {deleteConfirmUser.deletionRequested ? "Approve & Purge Everywhere" : "Delete Account Everywhere"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Direct Delete by Auth UID ─────────────────────────────────── */}
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
              Enter any Supabase User UID (or formatted key) to purge their credentials from <strong className="text-[#d93025] dark:text-[#f28b82]">auth.users</strong> and all application database tables:
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
                className="px-4 py-2 rounded-md text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!directDeleteUidInput.trim()}
                onClick={async () => {
                  await handleExecuteDirectDeleteUid(directDeleteUidInput);
                }}
                className="px-4 py-2 rounded-md text-xs font-medium bg-[#d93025] hover:bg-[#b31412] text-white cursor-pointer disabled:opacity-50 transition-colors"
              >
                Purge Account Everywhere
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
