import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCheck,
  Command,
  Database,
  Download,
  History,
  Layers,
  Megaphone,
  Plus,
  RefreshCw,
  Search,
  Server,
  ShieldAlert,
  Terminal,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import type { Entry } from "../../types";
import type { NavSectionId, UserProfile } from "./types";

interface CommandItem {
  id: string;
  group: "Navigation" | "Quick Actions" | "Review Queue" | "Builders" | "Catalog";
  title: string;
  subtitle: string;
  keywords: string;
  badge?: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

interface AdminCommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (sec: NavSectionId) => void;
  onAddAsset: () => void;
  onOpenSyncCenter: () => void;
  onOpenDirectPurge: () => void;
  onRefreshData: () => void;
  onBatchApproveAll: () => void;
  onExportFullSnapshot: () => void;
  onInspectUser: (user: UserProfile) => void;
  onReviewSubmission: (entry: Entry) => void;
  onInspectCatalogEntry: (entry: Entry) => void;
  users: UserProfile[];
  pendingEntries: Entry[];
  approvedEntries: Entry[];
  pendingDeletionCount: number;
}

export const AdminCommandPalette: React.FC<AdminCommandPaletteProps> = ({
  open,
  onClose,
  onNavigate,
  onAddAsset,
  onOpenSyncCenter,
  onOpenDirectPurge,
  onRefreshData,
  onBatchApproveAll,
  onExportFullSnapshot,
  onInspectUser,
  onReviewSubmission,
  onInspectCatalogEntry,
  users,
  pendingEntries,
  approvedEntries,
  pendingDeletionCount,
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const allItems = useMemo<CommandItem[]>(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-users",
        group: "Navigation",
        title: "Users & IAM Directory",
        subtitle: `Manage ${users.length} builder accounts, roles, chats, and suspensions`,
        keywords: "users iam accounts roles builders",
        badge: `${users.length}`,
        icon: <Users size={15} className="text-sky-500" />,
        onSelect: () => onNavigate("users"),
      },
      {
        id: "nav-deletions",
        group: "Navigation",
        title: "Account Deletion Approvals",
        subtitle: "Review and process user account purge requests",
        keywords: "deletion requests purge gdpr security",
        badge: pendingDeletionCount > 0 ? `${pendingDeletionCount} pending` : undefined,
        icon: <ShieldAlert size={15} className="text-rose-500" />,
        onSelect: () => onNavigate("deletion_requests"),
      },
      {
        id: "nav-submissions",
        group: "Navigation",
        title: "Review Queue",
        subtitle: `Audit ${pendingEntries.length} pending community & Daily Pulse submissions`,
        keywords: "review queue pending submissions approve pulse",
        badge: pendingEntries.length > 0 ? `${pendingEntries.length} waiting` : "Pristine",
        icon: <Server size={15} className="text-amber-500" />,
        onSelect: () => onNavigate("submissions"),
      },
      {
        id: "nav-directory",
        group: "Navigation",
        title: "Live Catalog Directory",
        subtitle: `Browse, feature, edit, or delete ${approvedEntries.length} published assets`,
        keywords: "catalog directory entries models frameworks datasets",
        badge: `${approvedEntries.length}`,
        icon: <Layers size={15} className="text-violet-500" />,
        onSelect: () => onNavigate("directory"),
      },
      {
        id: "nav-analytics",
        group: "Navigation",
        title: "Cloud Telemetry & Quotas",
        subtitle: "Distribution charts, task domains, and cold storage snapshots",
        keywords: "analytics telemetry charts metrics stats",
        icon: <BarChart3 size={15} className="text-emerald-500" />,
        onSelect: () => onNavigate("analytics"),
      },
      {
        id: "nav-infrastructure",
        group: "Navigation",
        title: "Supabase & Storage Console",
        subtitle: "Live database tables, buckets, latency telemetry, and RPC health",
        keywords: "supabase postgres storage buckets rpc",
        icon: <Database size={15} className="text-cyan-500" />,
        onSelect: () => onNavigate("infrastructure"),
      },
      {
        id: "nav-announcements",
        group: "Navigation",
        title: "Site-Wide Broadcast Studio",
        subtitle: "Configure global announcement banner and call-to-action link",
        keywords: "announcement broadcast banner alert notice",
        icon: <Megaphone size={15} className="text-fuchsia-500" />,
        onSelect: () => onNavigate("announcements"),
      },
      {
        id: "nav-audit",
        group: "Navigation",
        title: "Audit & CI/CD Pipeline Logs",
        subtitle: "Inspect admin governance actions, AI Radar, and Leaderboard runs",
        keywords: "audit logs pipeline radar leaderboard github actions",
        icon: <History size={15} className="text-indigo-500" />,
        onSelect: () => onNavigate("audit"),
      },
    ];

    const quickActions: CommandItem[] = [
      {
        id: "act-add-asset",
        group: "Quick Actions",
        title: "Create New AI Asset",
        subtitle: "Publish a verified model, framework, dataset, or platform",
        keywords: "add new create publish asset entry",
        icon: <Plus size={15} className="text-emerald-500" />,
        onSelect: onAddAsset,
      },
      ...(pendingEntries.length > 0
        ? [
            {
              id: "act-approve-all",
              group: "Quick Actions" as const,
              title: `Batch Approve All (${pendingEntries.length})`,
              subtitle: "Publish every pending submission to the live catalog",
              keywords: "batch approve all publish queue",
              icon: <CheckCheck size={15} className="text-sky-500" />,
              onSelect: onBatchApproveAll,
            },
          ]
        : []),
      {
        id: "act-sync-center",
        group: "Quick Actions",
        title: "Open Codebase & Supabase Sync Center",
        subtitle: "Inspect bundle diff and copy CLI sync command",
        keywords: "sync codebase seed sql",
        icon: <Terminal size={15} className="text-violet-500" />,
        onSelect: onOpenSyncCenter,
      },
      {
        id: "act-refresh",
        group: "Quick Actions",
        title: "Refresh Live Telemetry",
        subtitle: "Re-query Supabase tables, pending queue, and audit logs",
        keywords: "refresh reload sync fetch",
        icon: <RefreshCw size={15} className="text-cyan-500" />,
        onSelect: onRefreshData,
      },
      {
        id: "act-export",
        group: "Quick Actions",
        title: "Export Full Cloud Backup JSON",
        subtitle: "Download catalog, users, pending queue, and broadcast config",
        keywords: "export backup download json snapshot",
        icon: <Download size={15} className="text-amber-500" />,
        onSelect: onExportFullSnapshot,
      },
      {
        id: "act-purge-uid",
        group: "Quick Actions",
        title: "Purge User by Auth UID",
        subtitle: "Directly remove a user from auth.users and all related tables",
        keywords: "delete purge uid auth user",
        icon: <Trash2 size={15} className="text-rose-500" />,
        onSelect: onOpenDirectPurge,
      },
    ];

    const q = query.trim().toLowerCase();
    if (!q) {
      return [...navItems, ...quickActions];
    }

    const pendingMatches: CommandItem[] = pendingEntries
      .filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          (e.org || "").toLowerCase().includes(q) ||
          e.type.toLowerCase().includes(q),
      )
      .slice(0, 5)
      .map((entry) => ({
        id: `pending-${entry.name}`,
        group: "Review Queue",
        title: entry.name,
        subtitle: `${entry.type} · ${entry.org || "Independent"} · ${entry.task}`,
        keywords: `${entry.name} ${entry.org || ""} ${entry.task}`,
        badge: "Pending",
        icon: <Activity size={15} className="text-amber-500" />,
        onSelect: () => onReviewSubmission(entry),
      }));

    const userMatches: CommandItem[] = users
      .filter(
        (u) =>
          u.displayName.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q),
      )
      .slice(0, 5)
      .map((profile) => ({
        id: `user-${profile.userKey}`,
        group: "Builders",
        title: profile.displayName,
        subtitle: `${profile.username} · ${profile.role}`,
        keywords: `${profile.displayName} ${profile.username} ${profile.role}`,
        badge: profile.isBlocked ? "Suspended" : "Active",
        icon: <UserCheck size={15} className="text-emerald-500" />,
        onSelect: () => onInspectUser(profile),
      }));

    const catalogMatches: CommandItem[] = approvedEntries
      .filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          (e.org || "").toLowerCase().includes(q) ||
          e.task.toLowerCase().includes(q),
      )
      .slice(0, 6)
      .map((entry) => ({
        id: `catalog-${entry.name}`,
        group: "Catalog",
        title: entry.name,
        subtitle: `${entry.type} · ${entry.org || "Independent"} · ${entry.task}`,
        keywords: `${entry.name} ${entry.org || ""} ${entry.task}`,
        badge: entry.popular ? "Featured" : "Live",
        icon: <Layers size={15} className="text-violet-500" />,
        onSelect: () => onInspectCatalogEntry(entry),
      }));

    const baseMatches = [...navItems, ...quickActions].filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q),
    );

    return [...baseMatches, ...pendingMatches, ...userMatches, ...catalogMatches];
  }, [
    query,
    users,
    pendingEntries,
    approvedEntries,
    pendingDeletionCount,
    onNavigate,
    onAddAsset,
    onOpenSyncCenter,
    onOpenDirectPurge,
    onRefreshData,
    onBatchApproveAll,
    onExportFullSnapshot,
    onInspectUser,
    onReviewSubmission,
    onInspectCatalogEntry,
  ]);

  if (!open) return null;

  const clampedIndex = Math.min(activeIndex, Math.max(0, allItems.length - 1));

  const runSelection = (item: CommandItem | undefined) => {
    if (!item) return;
    setQuery("");
    setActiveIndex(0);
    onClose();
    item.onSelect();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (allItems.length === 0 ? 0 : (i + 1) % allItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        allItems.length === 0 ? 0 : (i - 1 + allItems.length) % allItems.length,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      runSelection(allItems[clampedIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setQuery("");
      onClose();
    }
  };

  const groups: CommandItem["group"][] = [
    "Navigation",
    "Quick Actions",
    "Review Queue",
    "Builders",
    "Catalog",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-md animate-[fadeIn_0.15s_ease-out]"
      onClick={() => {
        setQuery("");
        onClose();
      }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0d0e12] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200/80 dark:border-white/[0.08]">
          <Search size={17} className="text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Jump to section, run admin action, or inspect builder / asset..."
            className="w-full bg-transparent text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveIndex(0);
              }}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/8 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[58vh] overflow-y-auto p-2 space-y-3">
          {allItems.length === 0 ? (
            <div className="py-12 text-center space-y-1.5">
              <Command size={24} className="mx-auto text-neutral-400 opacity-60" />
              <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                No commands or records match "{query}"
              </p>
              <p className="text-[11px] text-neutral-500">
                Try searching for a section, user name, or catalog model.
              </p>
            </div>
          ) : (
            groups.map((groupName) => {
              const itemsInGroup = allItems.filter((i) => i.group === groupName);
              if (itemsInGroup.length === 0) return null;

              return (
                <div key={groupName} className="space-y-1">
                  <p className="px-2.5 pt-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                    {groupName}
                  </p>
                  <div className="space-y-0.5">
                    {itemsInGroup.map((item) => {
                      const idx = allItems.indexOf(item);
                      const isActive = idx === clampedIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => runSelection(item)}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                            isActive
                              ? "bg-indigo-50 dark:bg-white/[0.08] text-neutral-900 dark:text-white"
                              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200/80 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                              {item.icon}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold truncate">{item.title}</p>
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 dark:bg-white/[0.08] text-neutral-600 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/[0.08]">
                                {item.badge}
                              </span>
                            )}
                            <ArrowRight
                              size={13}
                              className={`transition-opacity ${isActive ? "opacity-80 text-indigo-500 dark:text-indigo-400" : "opacity-0"}`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-4 py-2.5 border-t border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/80 dark:bg-white/[0.02] flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-neutral-200 dark:border-white/10 font-mono text-[10px]">↑↓</kbd>
              Navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-neutral-200 dark:border-white/10 font-mono text-[10px]">↵</kbd>
              Execute
            </span>
          </div>
          <span className="font-mono text-[10px]">AiVerse Command Palette</span>
        </div>
      </div>
    </div>
  );
};
