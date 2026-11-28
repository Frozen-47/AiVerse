import React from "react";
import {
  AlertTriangle,
  Download,
  MessageSquare,
  Search,
  ShieldAlert,
  Trash2,
  UserCog,
  Users,
} from "lucide-react";
import type { UserProfile, UserSortBy, UserStatusFilter } from "./types";

interface AdminUsersSectionProps {
  users: UserProfile[];
  filteredUsers: UserProfile[];
  pendingDeletionCount: number;
  usersSearch: string;
  onUsersSearchChange: (val: string) => void;
  usersRoleFilter: string;
  onUsersRoleFilterChange: (val: string) => void;
  usersStatusFilter: UserStatusFilter;
  onUsersStatusFilterChange: (val: UserStatusFilter) => void;
  usersSortBy: UserSortBy;
  onUsersSortByChange: (val: UserSortBy) => void;
  onExportUsers: () => void;
  onJumpToDeletions: () => void;
  onInspectUser: (profile: UserProfile) => void;
  onViewUserChats: (profile: UserProfile) => void;
  onManageRole: (profile: UserProfile) => void;
  onBlockUser: (profile: UserProfile) => void;
  onDeleteUser: (profile: UserProfile) => void;
}

export const AdminUsersSection: React.FC<AdminUsersSectionProps> = ({
  users,
  filteredUsers,
  pendingDeletionCount,
  usersSearch,
  onUsersSearchChange,
  usersRoleFilter,
  onUsersRoleFilterChange,
  usersStatusFilter,
  onUsersStatusFilterChange,
  usersSortBy,
  onUsersSortByChange,
  onExportUsers,
  onJumpToDeletions,
  onInspectUser,
  onViewUserChats,
  onManageRole,
  onBlockUser,
  onDeleteUser,
}) => {
  const suspendedCount = users.filter((u) => u.isBlocked).length;
  const activeCount = users.filter((u) => !u.isBlocked && !u.deletionRequested).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <span>Identity & Access Directory</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-neutral-100 dark:bg-white/[0.07] text-neutral-600 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/[0.08]">
              {users.length}
            </span>
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Govern registered builder accounts, enterprise IAM roles, AI chat logs, and account access states.
          </p>
        </div>

        <button
          type="button"
          onClick={onExportUsers}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0d11] hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-200 cursor-pointer transition-colors self-start sm:self-auto"
        >
          <Download size={13} />
          Export Directory
        </button>
      </div>

      {/* Security Alert Banner if Deletion Requests Pending */}
      {pendingDeletionCount > 0 && (
        <div className="p-3.5 rounded-2xl border border-rose-500/30 bg-rose-50/80 dark:bg-rose-500/10 text-rose-700 dark:text-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-300 shrink-0">
              <ShieldAlert size={16} />
            </div>
            <p className="text-xs">
              <strong>
                {pendingDeletionCount} Account Deletion Request{pendingDeletionCount > 1 ? "s" : ""}
              </strong>{" "}
              awaiting administrator approval. Self-deletion is locked by platform policy.
            </p>
          </div>
          <button
            type="button"
            onClick={onJumpToDeletions}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto transition-colors"
          >
            Review Requests
          </button>
        </div>
      )}

      {/* Search, Status Chips, Role & Sort */}
      <div className="p-3.5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md w-full">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={usersSearch}
              onChange={(e) => onUsersSearchChange(e.target.value)}
              placeholder="Search by display name, @handle, role, or email..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#111319] text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={usersRoleFilter}
              onChange={(e) => onUsersRoleFilterChange(e.target.value)}
              className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#111319] text-xs text-neutral-700 dark:text-neutral-200 outline-none cursor-pointer"
            >
              <option value="all">All Roles ({users.length})</option>
              <option value="developer">Developers</option>
              <option value="researcher">Researchers</option>
              <option value="designer">Designers</option>
              <option value="pm">Product Managers</option>
              <option value="founder">Founders</option>
              <option value="creator">Creators</option>
            </select>

            <select
              value={usersSortBy}
              onChange={(e) => onUsersSortByChange(e.target.value as UserSortBy)}
              className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#111319] text-xs text-neutral-700 dark:text-neutral-200 outline-none cursor-pointer"
            >
              <option value="recent">Sort: Last Active</option>
              <option value="name">Sort: Name A–Z</option>
              <option value="role">Sort: Role</option>
            </select>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 dark:border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: "all", label: "All Accounts", count: users.length },
                { id: "active", label: "Active", count: activeCount },
                { id: "suspended", label: "Suspended", count: suspendedCount },
                { id: "deletion", label: "Deletion Pending", count: pendingDeletionCount },
              ] as const
            ).map((chip) => {
              const active = usersStatusFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => onUsersStatusFilterChange(chip.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer border ${
                    active
                      ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white"
                      : "bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/25"
                  }`}
                >
                  <span>{chip.label}</span>
                  <span
                    className={`font-mono text-[10px] ${
                      active ? "opacity-80" : "opacity-60"
                    }`}
                  >
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 tabular-nums">
            Showing <strong className="text-neutral-900 dark:text-white">{filteredUsers.length}</strong> of {users.length}
          </span>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="py-14 px-4 text-center space-y-2">
            <Users size={26} className="mx-auto text-neutral-400 opacity-60" />
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              No builder accounts match your filters
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Try clearing the search query or switching status filter pills.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200/80 dark:border-white/[0.07] bg-neutral-50/80 dark:bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <th className="px-4 py-3">Builder</th>
                  <th className="px-3 py-3">IAM Role</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Last Active</th>
                  <th className="px-4 py-3 text-right">Governance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.05] text-xs">
                {filteredUsers.map((profile) => (
                  <tr
                    key={profile.userKey}
                    className="hover:bg-neutral-50/80 dark:hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-neutral-200 dark:border-white/10 flex items-center justify-center font-bold text-xs text-neutral-800 dark:text-white shrink-0">
                          {profile.avatarUrl ? (
                            <img
                              src={profile.avatarUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            profile.displayName[0]?.toUpperCase() || "U"
                          )}
                        </div>
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => onInspectUser(profile)}
                            className="font-semibold text-neutral-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer truncate max-w-[190px] text-left block transition-colors"
                          >
                            {profile.displayName}
                          </button>
                          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate max-w-[190px] block">
                            {profile.username}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-200 border border-neutral-200/70 dark:border-white/[0.08]">
                        {profile.role}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {profile.deletionRequested ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/25">
                          <AlertTriangle size={10} />
                          Deletion Pending
                        </span>
                      ) : profile.isBlocked ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/25">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-neutral-500 dark:text-neutral-400 font-mono text-[11px] tabular-nums">
                      {new Date(profile.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onInspectUser(profile)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.07] transition-colors cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => onViewUserChats(profile)}
                          className="px-2 py-1 rounded-lg text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors cursor-pointer inline-flex items-center gap-1"
                          title="Inspect and clear user chat conversations"
                        >
                          <MessageSquare size={12} />
                          <span>Chats</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onManageRole(profile)}
                          className="px-2 py-1 rounded-lg text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.07] transition-colors cursor-pointer inline-flex items-center gap-1"
                          title="Assign IAM role"
                        >
                          <UserCog size={12} />
                          <span className="hidden xl:inline">Role</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onBlockUser(profile)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                            profile.isBlocked
                              ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                              : "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                          }`}
                        >
                          {profile.isBlocked ? "Unsuspend" : "Suspend"}
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteUser(profile)}
                          className="p-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Purge account"
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
        )}
      </div>
    </div>
  );
};
