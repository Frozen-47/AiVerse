import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Check,
  Shield,
  Users,
  Server,
  Trash2,
  Info,
  RefreshCw,
  Star,
  ExternalLink,
  Layers,
  Compass,
  GitBranch,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useTokens, useTheme, typeBadge, taskBadge, typeIcon, TYPE_GLYPH } from "../lib/theme";
import type { Entry } from "../types";

interface AdminDashboardProps {
  onBackToHome: () => void;
  onViewEntry?: (entry: Entry) => void;
}

interface UserProfile {
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
}

type TabId = "submissions" | "directory" | "users";

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToHome,
  onViewEntry,
}) => {
  const t = useTokens();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "amoled";

  const [activeTab, setActiveTab] = useState<TabId>("submissions");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [pendingEntries, setPendingEntries] = useState<Entry[]>([]);
  const [approvedEntries, setApprovedEntries] = useState<Entry[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  
  // Actions states
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [directorySearch, setDirectorySearch] = useState("");

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
      setApprovedEntries((approvedData as Entry[]) || []);

      // 3. Fetch user preferences (for users tab)
      const { data: usersData, error: usersErr } = await supabase
        .from("user_preferences")
        .select("*")
        .order("updated_at", { ascending: false });

      if (usersErr) throw usersErr;

      const parsedUsers: UserProfile[] = (usersData || []).map((row: any) => {
        let meta: any = {};
        try {
          if (row.referral_source) {
            meta = JSON.parse(row.referral_source);
          }
        } catch {
          // referral_source is a plain string
        }

        return {
          userKey: row.user_key,
          displayName: meta?.displayName || "Builder",
          username: meta?.username || "@anonymous",
          description: meta?.description || "",
          github: meta?.github || "",
          linkedin: meta?.linkedin || "",
          medium: meta?.medium || "",
          devto: meta?.devto || "",
          portfolio: meta?.portfolio || "",
          avatarUrl: meta?.avatarUrl || meta?.avatar_url || undefined,
          role: row.role || "developer",
          interests: row.interests || [],
          updatedAt: row.updated_at || "",
        };
      });
      setUsers(parsedUsers);

    } catch (err: any) {
      console.error("AdminDashboard failed to load data:", err);
      setError(
        err.message ||
          "Could not fetch database registries. Ensure RLS policies have been executed in your Supabase project."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (entry: Entry) => {
    setActioningId(entry.name);
    try {
      const { error: err } = await supabase
        .from("entries")
        .update({ approved: true })
        .eq("name", entry.name);

      if (err) throw err;

      // Update local states
      setPendingEntries((prev) => prev.filter((e) => e.name !== entry.name));
      setApprovedEntries((prev) => [
        { ...entry, approved: true },
        ...prev,
      ]);
    } catch (err: any) {
      alert("Failed to approve entry: " + err.message);
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (entryName: string) => {
    if (!window.confirm(`Are you sure you want to reject/delete "${entryName}"?`)) {
      return;
    }
    setActioningId(entryName);
    try {
      const { error: err } = await supabase
        .from("entries")
        .delete()
        .eq("name", entryName);

      if (err) throw err;

      // Update local states
      setPendingEntries((prev) => prev.filter((e) => e.name !== entryName));
      setApprovedEntries((prev) => prev.filter((e) => e.name !== entryName));
    } catch (err: any) {
      alert("Failed to delete entry: " + err.message);
    } finally {
      setActioningId(null);
    }
  };

  // Filter approved directory
  const filteredApproved = approvedEntries.filter((entry) => {
    const q = directorySearch.toLowerCase();
    return (
      entry.name.toLowerCase().includes(q) ||
      (entry.org || "").toLowerCase().includes(q) ||
      entry.type.toLowerCase().includes(q) ||
      entry.task.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-[fadeUp_0.4s_ease-out] text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={onBackToHome}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold border shadow-sm transition-all cursor-pointer backdrop-blur-md mb-4 ${
              isDark
                ? "bg-white/5 border-white/10 text-white hover:border-white/20 hover:shadow-sm"
                : "bg-white/80 border-slate-200 text-slate-700 hover:border-black/20 hover:text-black"
            }`}
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl shrink-0 ${isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 border border-amber-200 text-amber-600"}`}>
              <Shield size={24} className="stroke-[2px]" />
            </div>
            <div>
              <h1 className={`text-2xl font-black tracking-tight ${t.textPrimary}`}>
                Administrator Dashboard
              </h1>
              <p className={`text-[12px] mt-1 ${t.textSecondary}`}>
                Manage user database profiles, examine tool listings pending confirmation, and prune registered library items.
              </p>
            </div>
          </div>
        </div>

        {!loading && (
          <button
            onClick={loadData}
            title="Refresh database records"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold border shadow-sm transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Sync Records
          </button>
        )}
      </div>

      {/* RLS Policy Warning Banner */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex gap-3">
          <Info size={20} className="shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold">RLS Authorization Failure</p>
            <p className="text-xs leading-relaxed opacity-90">
              The query returned a database permissions failure. RLS is currently active. To let admins view all user entries and preferences, you must run the SQL scripts in your Supabase SQL editor:
            </p>
            <code className="block text-[11px] font-mono p-3 bg-neutral-950/90 rounded-lg border border-white/10 text-slate-300 break-all select-all">
              {`CREATE OR REPLACE FUNCTION private.is_admin() RETURNS boolean LANGUAGE sql STABLE SECURITY INVOKER AS $$ SELECT auth.jwt() ->> 'email' = 'frozennheart47@gmail.com' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'; $$;`}
            </code>
            <p className="text-[11px] opacity-80 italic">
              Details: {error}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className={`flex border-b mb-6 overflow-x-auto no-scrollbar gap-1 ${t.border}`}>
        <button
          onClick={() => setActiveTab("submissions")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "submissions"
              ? `border-current ${isDark ? "text-white" : "text-black"}`
              : `border-transparent ${t.textMuted} hover:${t.textSecondary}`
          }`}
        >
          <Server size={15} />
          Pending Submissions
          {pendingEntries.length > 0 && (
            <span className="ml-1.5 px-2 py-0.5 text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
              {pendingEntries.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("directory")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "directory"
              ? `border-current ${isDark ? "text-white" : "text-black"}`
              : `border-transparent ${t.textMuted} hover:${t.textSecondary}`
          }`}
        >
          <Star size={15} />
          Approved Directory
          {!loading && approvedEntries.length > 0 && (
            <span className="ml-1.5 px-2 py-0.5 text-[10px] font-semibold bg-neutral-500/10 text-neutral-400 border border-neutral-500/20 rounded-full">
              {approvedEntries.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "users"
              ? `border-current ${isDark ? "text-white" : "text-black"}`
              : `border-transparent ${t.textMuted} hover:${t.textSecondary}`
          }`}
        >
          <Users size={15} />
          Registered Users
          {!loading && users.length > 0 && (
            <span className="ml-1.5 px-2 py-0.5 text-[10px] font-semibold bg-neutral-500/10 text-neutral-400 border border-neutral-500/20 rounded-full">
              {users.length}
            </span>
          )}
        </button>
      </div>

      {/* Main Content Areas */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className={`w-8 h-8 border-4 border-slate-200 border-t-neutral-800 dark:border-white/10 dark:border-t-white rounded-full animate-spin`} />
          <p className={`text-[12px] font-bold uppercase tracking-wider ${t.textMuted}`}>Fetching records...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* TAB 1: PENDING SUBMISSIONS */}
          {activeTab === "submissions" && (
            <>
              {pendingEntries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-dashed rounded-2xl border-neutral-200 dark:border-white/10">
                  <div className="text-4xl opacity-25 text-neutral-400">✓</div>
                  <p className={`text-sm font-semibold ${t.textPrimary}`}>Submissions inbox is empty</p>
                  <p className={`text-xs max-w-[280px] leading-relaxed ${t.textMuted}`}>
                    All user-submitted frameworks, datasets, models, and platforms have been audited.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingEntries.map((entry) => (
                    <div
                      key={entry.name}
                      className={`rounded-2xl p-6 flex flex-col justify-between border ${t.card}`}
                    >
                      <div className="space-y-4">
                        {/* Header Row */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${typeIcon(entry.type, t)}`}>
                              {TYPE_GLYPH[entry.type] ?? "◆"}
                            </div>
                            <div>
                              <h3 className={`text-base font-black ${t.textPrimary}`}>
                                {entry.name}
                              </h3>
                              <p className={`text-[11px] ${t.textMuted}`}>
                                Submitted by {entry.org || "Unknown Organization"} · {entry.year}
                              </p>
                            </div>
                          </div>
                          {entry.url && (
                            <a
                              href={entry.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-1.5 rounded-lg border transition-colors ${t.surface} ${t.border} ${t.textMuted} hover:${t.textPrimary}`}
                              title="Visit official resources link"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${typeBadge(entry.type, t)}`}>
                            {entry.type}
                          </span>
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${taskBadge(entry.task, t)}`}>
                            {entry.task}
                          </span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-md border ${t.surface} ${t.border} ${t.textMuted}`}>
                            {entry.license}
                          </span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-md border ${t.surface} ${t.border} ${t.textMuted}`}>
                            Size: {entry.size}
                          </span>
                        </div>

                        {/* Summary & Limitations */}
                        <div className="space-y-2">
                          <p className={`text-xs leading-relaxed ${t.textSecondary}`}>
                            {entry.summary}
                          </p>
                          {entry.limitations && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {entry.limitations.split(",").map((l, idx) => (
                                <span
                                  key={idx}
                                  className={`text-[10px] px-2 py-0.5 rounded-lg border ${t.limitTag}`}
                                >
                                  ⚠ {l.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Usage Block Preview (if exists) */}
                        {entry.usage && (
                          <details className={`group rounded-xl overflow-hidden border ${t.border}`}>
                            <summary className={`flex items-center justify-between px-3 py-2 text-[11px] font-bold cursor-pointer outline-none select-none transition-colors ${t.surface} hover:${t.surfaceHover}`}>
                              <span>Show example code usage</span>
                              <span className="text-[10px] opacity-50 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <pre className={`p-3 text-[11px] font-mono overflow-x-auto leading-relaxed border-t ${t.border} ${t.code}`}>
                              {entry.usage}
                            </pre>
                          </details>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2.5 mt-6 pt-4 border-t border-dashed dark:border-white/5 border-neutral-200">
                        <button
                          type="button"
                          onClick={() => handleApprove(entry)}
                          disabled={actioningId === entry.name}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer disabled:opacity-50`}
                        >
                          <Check size={14} className="stroke-[2.5px]" />
                          {actioningId === entry.name ? "Approve..." : "Approve Submission"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(entry.name)}
                          disabled={actioningId === entry.name}
                          className={`flex items-center justify-center p-2.5 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50`}
                          title="Reject and discard submission"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* TAB 2: APPROVED DIRECTORY */}
          {activeTab === "directory" && (
            <div className="space-y-4">
              {/* Search filter bar */}
              <div className="max-w-md">
                <input
                  type="text"
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  placeholder="Filter active listings by name, category, or task..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${t.input}`}
                />
              </div>

              {filteredApproved.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-dashed rounded-2xl border-neutral-200 dark:border-white/10">
                  <div className="text-4xl opacity-25 text-neutral-400">◌</div>
                  <p className={`text-sm font-semibold ${t.textPrimary}`}>No approved entries found</p>
                  <p className={`text-xs max-w-[280px] leading-relaxed ${t.textMuted}`}>
                    Try clearing your search filters or check your Supabase approved table entries.
                  </p>
                </div>
              ) : (
                <div className={`overflow-x-auto rounded-2xl border ${t.border}`}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`border-b text-[10px] font-bold uppercase tracking-wider ${t.surface2} ${t.textMuted}`}>
                        <th className="px-5 py-3.5">Name</th>
                        <th className="px-5 py-3.5">Organization</th>
                        <th className="px-5 py-3.5">Type</th>
                        <th className="px-5 py-3.5">Task</th>
                        <th className="px-5 py-3.5">Year</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {filteredApproved.map((entry) => (
                        <tr
                          key={entry.name}
                          className={`text-xs transition-colors hover:bg-neutral-50/50 dark:hover:bg-white/[0.015]`}
                        >
                          <td className="px-5 py-3.5 font-bold">
                            <button
                              onClick={() => onViewEntry?.(entry)}
                              className={`hover:underline cursor-pointer ${t.textPrimary}`}
                            >
                              {entry.name}
                            </button>
                          </td>
                          <td className={`px-5 py-3.5 ${t.textSecondary}`}>{entry.org || "—"}</td>
                          <td className="px-5 py-3.5">
                            <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${typeBadge(entry.type, t)}`}>
                              {entry.type}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${taskBadge(entry.task, t)}`}>
                              {entry.task}
                            </span>
                          </td>
                          <td className={`px-5 py-3.5 ${t.textSecondary}`}>{entry.year}</td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => handleReject(entry.name)}
                              disabled={actioningId === entry.name}
                              className={`p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50`}
                              title="Delete from active directory"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REGISTERED USERS */}
          {activeTab === "users" && (
            <>
              {users.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-dashed rounded-2xl border-neutral-200 dark:border-white/10">
                  <div className="text-4xl opacity-25 text-neutral-400">👤</div>
                  <p className={`text-sm font-semibold ${t.textPrimary}`}>No registered users</p>
                  <p className={`text-xs max-w-[280px] leading-relaxed ${t.textMuted}`}>
                    No builder profiles have synced metadata to `user_preferences` database tables.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users.map((profile) => {
                    const initials = profile.displayName
                      ? profile.displayName.slice(0, 2).toUpperCase()
                      : profile.username.replace("@", "").slice(0, 2).toUpperCase();

                    const builderLevel = Math.min(10, Math.max(1, profile.interests.length));

                    return (
                      <div
                        key={profile.userKey}
                        className={`rounded-2xl p-5 border flex flex-col justify-between ${t.card}`}
                      >
                        <div className="space-y-4">
                          {/* Avatar row */}
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs ${isDark ? "bg-white/8 text-white" : "bg-black/6 text-black"}`}>
                              {profile.avatarUrl ? (
                                <img
                                  src={profile.avatarUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                initials
                              )}
                            </div>
                            <div className="min-w-0">
                              <h3 className={`text-sm font-bold truncate ${t.textPrimary}`}>
                                {profile.displayName}
                              </h3>
                              <p className={`text-xs truncate ${t.textMuted}`}>
                                {profile.username}
                              </p>
                            </div>
                          </div>

                          {/* Profile meta badges */}
                          <div className="flex flex-wrap gap-1.5">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${isDark ? "bg-white/6 text-white/60" : "bg-black/5 text-black/50"}`}>
                              Role: {profile.role}
                            </span>
                            <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-700"}`}>
                              LVL {builderLevel} Builder
                            </span>
                          </div>

                          {/* Bio */}
                          {profile.description && (
                            <p className={`text-xs leading-relaxed line-clamp-3 ${t.textSecondary}`}>
                              {profile.description}
                            </p>
                          )}

                          {/* Interests */}
                          {profile.interests.length > 0 && (
                            <div>
                              <p className={`text-[9px] uppercase tracking-wider font-semibold mb-1 ${t.textMuted}`}>Interests</p>
                              <div className="flex flex-wrap gap-1">
                                {profile.interests.map((interest) => (
                                  <span
                                    key={interest}
                                    className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? "bg-white/5 text-white/50 border border-white/8" : "bg-black/4 text-black/50 border border-black/8"}`}
                                  >
                                    {interest}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Social connections */}
                        <div className="flex gap-2 mt-4 pt-3 border-t dark:border-white/5 border-neutral-200">
                          {profile.github && (
                            <a
                              href={profile.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-1.5 rounded-lg border transition-colors ${t.surface} ${t.border} ${t.textMuted} hover:${t.textPrimary}`}
                              title="GitHub link"
                            >
                              <GitBranch size={13} />
                            </a>
                          )}
                          {profile.linkedin && (
                            <a
                              href={profile.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-1.5 rounded-lg border transition-colors ${t.surface} ${t.border} ${t.textMuted} hover:${t.textPrimary}`}
                              title="LinkedIn link"
                            >
                              <Layers size={13} />
                            </a>
                          )}
                          {profile.portfolio && (
                            <a
                              href={profile.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-1.5 rounded-lg border transition-colors ${t.surface} ${t.border} ${t.textMuted} hover:${t.textPrimary}`}
                              title="Portfolio link"
                            >
                              <Compass size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
