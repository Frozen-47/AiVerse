import React from "react";
import { Check, ShieldAlert, Trash2 } from "lucide-react";
import type { UserProfile } from "./types";

interface AdminDeletionsSectionProps {
  pendingDeletionUsers: UserProfile[];
  actioningId: string | null;
  onDismissRequest: (profile: UserProfile) => void;
  onApprovePurge: (profile: UserProfile) => void;
}

export const AdminDeletionsSection: React.FC<AdminDeletionsSectionProps> = ({
  pendingDeletionUsers,
  actioningId,
  onDismissRequest,
  onApprovePurge,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
          <ShieldAlert size={18} className="text-rose-500" />
          <span>Account Deletion Approvals</span>
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Security governance: users cannot self-delete accounts. Review deletion requests before permanently purging credentials from <code className="font-mono text-[11px]">auth.users</code>.
        </p>
      </div>

      {pendingDeletionUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 gap-3 text-center border border-dashed rounded-2xl border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0d11]">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Check size={22} className="stroke-[2.5px]" />
          </div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-white">
            Zero pending deletion requests
          </p>
          <p className="text-xs max-w-sm text-neutral-500 dark:text-neutral-400">
            All user account deletion requests have been reviewed and resolved.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {pendingDeletionUsers.map((profile) => (
            <div
              key={profile.userKey}
              className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100 dark:bg-white/[0.08] border border-neutral-200 dark:border-white/10 flex items-center justify-center font-bold text-sm text-neutral-800 dark:text-white shrink-0">
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

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {profile.displayName}
                    </p>
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                      {profile.username}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400">
                      {profile.deletionRequestedAt
                        ? new Date(profile.deletionRequestedAt).toLocaleString()
                        : "Pending"}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-500/8 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-xs italic">
                    "{profile.deletionReason || "No specific reason provided."}"
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={() => onDismissRequest(profile)}
                  disabled={actioningId === profile.userKey}
                  className="px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.05] transition-colors cursor-pointer disabled:opacity-50"
                >
                  Dismiss Request
                </button>
                <button
                  type="button"
                  onClick={() => onApprovePurge(profile)}
                  disabled={actioningId === profile.userKey}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer shadow-xs transition-colors disabled:opacity-50"
                >
                  <Trash2 size={13} />
                  Approve & Purge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
