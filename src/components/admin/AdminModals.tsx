import React, { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCheck,
  CheckCircle2,
  Code,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Info,
  MessageSquare,
  MessageSquareX,
  RefreshCw,
  Sparkles,
  Star,
  Terminal,
  Trash2,
  UserCog,
  X,
} from "lucide-react";
import type { Entry } from "../../types";
import type { ChatSession } from "../../lib/chats";
import { TYPE_GLYPH, taskBadge, typeBadge, typeIcon, useTokens } from "../../lib/theme";
import type { AuditLogItem, EditingEntryState, UserProfile } from "./types";

interface AdminModalsProps {
  actioningId: string | null;
  approvedCount: number;
  staticBundleCount: number;
  pendingCount: number;
  // User Inspect
  inspectingUser: UserProfile | null;
  onCloseInspectUser: () => void;
  onOpenRoleFromInspect: (profile: UserProfile) => void;
  onOpenChatsFromInspect: (profile: UserProfile) => void;
  onOpenDeleteFromInspect: (profile: UserProfile) => void;
  // Role Manager
  roleManagingUser: UserProfile | null;
  selectedNewRole: string;
  onSelectNewRole: (role: string) => void;
  onCloseRoleManager: () => void;
  onSaveUserRole: (profile: UserProfile, newRole: string) => void;
  // Review Submission
  reviewingEntry: Entry | null;
  onCloseReviewingEntry: () => void;
  onApproveEntry: (entry: Entry) => void;
  onRequestDeleteEntry: (name: string) => void;
  // Edit / Create Asset
  editingEntry: EditingEntryState | null;
  onChangeEditingEntry: (next: EditingEntryState) => void;
  onCloseEditingEntry: () => void;
  onSubmitEditingEntry: (e: React.FormEvent) => void;
  // Delete Asset Confirm
  deleteConfirmEntry: string | null;
  onCloseDeleteConfirmEntry: () => void;
  onConfirmDeleteEntry: (name: string) => void;
  // Suspend User
  blockingUser: UserProfile | null;
  onCloseBlockingUser: () => void;
  onExecuteBlock: (profile: UserProfile, isBlocked: boolean, durationMs: number) => void;
  // Purge User Confirm
  deleteConfirmUser: UserProfile | null;
  onCloseDeleteConfirmUser: () => void;
  onConfirmDeleteUser: (profile: UserProfile) => Promise<void>;
  // Direct Purge UID
  directDeleteModalOpen: boolean;
  directDeleteUidInput: string;
  onChangeDirectDeleteUid: (val: string) => void;
  onCloseDirectDelete: () => void;
  onConfirmDirectDelete: (uid: string) => Promise<void>;
  // Batch Confirm
  batchConfirm: "approve" | "reject" | null;
  onCloseBatchConfirm: () => void;
  onConfirmBatchApproveAll: () => void;
  onConfirmBatchRejectAll: () => void;
  // User Chats
  chatManagingUser: UserProfile | null;
  userChatsList: ChatSession[];
  loadingUserChats: boolean;
  onCloseChatManager: () => void;
  onDeleteSingleChat: (profile: UserProfile, sessionId: string) => void;
  onRequestClearAllChats: (profile: UserProfile) => void;
  // Confirm Clear Chats
  clearChatsConfirmUser: UserProfile | null;
  onCloseClearChatsConfirm: () => void;
  onConfirmClearAllChats: (profile: UserProfile) => void;
  // Inspect Log
  inspectingLog: AuditLogItem | null;
  onCloseInspectLog: () => void;
  // Codebase Sync Center
  codebaseSyncModalOpen: boolean;
  onCloseCodebaseSync: () => void;
  onExportFullCatalog: () => void;
}

const MODAL_OVERLAY =
  "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-[fadeIn_0.15s_ease-out]";
const MODAL_CARD =
  "relative w-full rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0d0e12] shadow-2xl";

export const AdminModals: React.FC<AdminModalsProps> = ({
  actioningId,
  approvedCount,
  staticBundleCount,
  pendingCount,
  inspectingUser,
  onCloseInspectUser,
  onOpenRoleFromInspect,
  onOpenChatsFromInspect,
  onOpenDeleteFromInspect,
  roleManagingUser,
  selectedNewRole,
  onSelectNewRole,
  onCloseRoleManager,
  onSaveUserRole,
  reviewingEntry,
  onCloseReviewingEntry,
  onApproveEntry,
  onRequestDeleteEntry,
  editingEntry,
  onChangeEditingEntry,
  onCloseEditingEntry,
  onSubmitEditingEntry,
  deleteConfirmEntry,
  onCloseDeleteConfirmEntry,
  onConfirmDeleteEntry,
  blockingUser,
  onCloseBlockingUser,
  onExecuteBlock,
  deleteConfirmUser,
  onCloseDeleteConfirmUser,
  onConfirmDeleteUser,
  directDeleteModalOpen,
  directDeleteUidInput,
  onChangeDirectDeleteUid,
  onCloseDirectDelete,
  onConfirmDirectDelete,
  batchConfirm,
  onCloseBatchConfirm,
  onConfirmBatchApproveAll,
  onConfirmBatchRejectAll,
  chatManagingUser,
  userChatsList,
  loadingUserChats,
  onCloseChatManager,
  onDeleteSingleChat,
  onRequestClearAllChats,
  clearChatsConfirmUser,
  onCloseClearChatsConfirm,
  onConfirmClearAllChats,
  inspectingLog,
  onCloseInspectLog,
  codebaseSyncModalOpen,
  onCloseCodebaseSync,
  onExportFullCatalog,
}) => {
  const t = useTokens();
  const [copiedLogJson, setCopiedLogJson] = useState(false);
  const [copiedSyncCmd, setCopiedSyncCmd] = useState(false);

  return (
    <>
      {/* 1. Read-Only User Account Overview */}
      {inspectingUser && (
        <div className={MODAL_OVERLAY} onClick={onCloseInspectUser}>
          <div
            className={`${MODAL_CARD} max-w-lg p-6 space-y-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseInspectUser}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-neutral-200 dark:border-white/10 flex items-center justify-center font-bold text-base text-neutral-900 dark:text-white shrink-0">
                {inspectingUser.avatarUrl ? (
                  <img
                    src={inspectingUser.avatarUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  inspectingUser.displayName[0]?.toUpperCase() || "U"
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white truncate">
                  {inspectingUser.displayName}
                </h3>
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 truncate">
                  {inspectingUser.username}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/70 dark:border-white/[0.07] space-y-2 text-xs">
              <div className="flex justify-between gap-2">
                <span className="text-neutral-500 dark:text-neutral-400">User Key / UID:</span>
                <span className="font-mono text-neutral-900 dark:text-white truncate max-w-[260px]">
                  {inspectingUser.userKey}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-neutral-500 dark:text-neutral-400">Enterprise Role:</span>
                <span className="capitalize font-semibold text-neutral-900 dark:text-white">
                  {inspectingUser.role}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-neutral-500 dark:text-neutral-400">Access Status:</span>
                <span>
                  {inspectingUser.deletionRequested ? (
                    <span className="text-rose-500 font-semibold">Deletion Requested</span>
                  ) : inspectingUser.isBlocked ? (
                    <span className="text-amber-500 font-semibold">Suspended</span>
                  ) : (
                    <span className="text-emerald-500 font-semibold">Active</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-neutral-500 dark:text-neutral-400">Last Updated:</span>
                <span className="font-mono text-neutral-900 dark:text-white">
                  {new Date(inspectingUser.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>

            {inspectingUser.interests.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Focus Areas
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {inspectingUser.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2.5 py-0.5 rounded-full text-[11px] bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200/70 dark:border-white/[0.08]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {inspectingUser.description && (
              <div className="space-y-1 text-xs">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Bio & Note (Read-Only)
                </span>
                <p className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/70 dark:border-white/[0.07] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {inspectingUser.description}
                </p>
              </div>
            )}

            {inspectingUser.deletionRequested && (
              <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs space-y-1 text-amber-800 dark:text-amber-200">
                <div className="font-semibold flex items-center gap-1.5">
                  <AlertTriangle size={13} />
                  Pending Deletion Request
                </div>
                <p className="italic">
                  "{inspectingUser.deletionReason || "No specific reason provided."}"
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-neutral-200/80 dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenRoleFromInspect(inspectingUser)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 text-indigo-600 dark:text-indigo-400 hover:bg-neutral-50 dark:hover:bg-white/[0.05] cursor-pointer"
                >
                  Change Role
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChatsFromInspect(inspectingUser)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 text-indigo-600 dark:text-indigo-400 hover:bg-neutral-50 dark:hover:bg-white/[0.05] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <MessageSquare size={13} />
                  User Chats
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onCloseInspectUser}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDeleteFromInspect(inspectingUser)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Change Enterprise Role */}
      {roleManagingUser && (
        <div className={MODAL_OVERLAY} onClick={onCloseRoleManager}>
          <div
            className={`${MODAL_CARD} max-w-md p-6 space-y-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseRoleManager}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/12 text-indigo-600 dark:text-indigo-400">
                <UserCog size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Assign Enterprise Role
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Configure permissions for{" "}
                  <strong className="text-neutral-900 dark:text-white">
                    {roleManagingUser.displayName}
                  </strong>
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-xs max-h-[50vh] overflow-y-auto pr-1">
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
                  className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                    selectedNewRole === r.id
                      ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-500/15"
                      : "border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <input
                    type="radio"
                    name="role-select"
                    checked={selectedNewRole === r.id}
                    onChange={() => onSelectNewRole(r.id)}
                    className="mt-0.5 text-indigo-600 focus:ring-0"
                  />
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {r.label}
                    </span>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {r.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200/80 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={onCloseRoleManager}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actioningId === roleManagingUser.userKey}
                onClick={() => onSaveUserRole(roleManagingUser, selectedNewRole)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
              >
                {actioningId === roleManagingUser.userKey ? "Saving..." : "Save Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Inspect Pending Submission */}
      {reviewingEntry && (
        <div className={MODAL_OVERLAY} onClick={onCloseReviewingEntry}>
          <div
            className={`${MODAL_CARD} max-w-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseReviewingEntry}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base border ${typeIcon(
                  reviewingEntry.type,
                  t,
                )}`}
              >
                {TYPE_GLYPH[reviewingEntry.type] ?? "◆"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {reviewingEntry.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {reviewingEntry.org || "Independent Organization"} · Released{" "}
                  {reviewingEntry.year}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span
                className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${typeBadge(
                  reviewingEntry.type,
                  t,
                )}`}
              >
                {reviewingEntry.type}
              </span>
              <span
                className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${taskBadge(
                  reviewingEntry.task,
                  t,
                )}`}
              >
                {reviewingEntry.task}
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-300">
                License: {reviewingEntry.license || "Open"}
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-300">
                Size: {reviewingEntry.size || "—"}
              </span>
            </div>

            <div className="space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
              <div>
                <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                  Summary
                </label>
                <p className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/70 dark:border-white/[0.07] leading-relaxed">
                  {reviewingEntry.summary}
                </p>
              </div>

              {reviewingEntry.architecture && (
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                    Architecture
                  </label>
                  <p className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/70 dark:border-white/[0.07]">
                    {reviewingEntry.architecture}
                  </p>
                </div>
              )}

              {reviewingEntry.benchmarks && (
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                    Benchmarks
                  </label>
                  <p className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/70 dark:border-white/[0.07] font-mono text-[11px]">
                    {reviewingEntry.benchmarks}
                  </p>
                </div>
              )}

              {reviewingEntry.limitations && (
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                    Known Limitations
                  </label>
                  <p className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-200">
                    {reviewingEntry.limitations}
                  </p>
                </div>
              )}

              {reviewingEntry.usage && (
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                    Code Usage
                  </label>
                  <pre className="p-3 rounded-xl bg-neutral-950 text-neutral-200 border border-white/10 font-mono text-[11px] overflow-x-auto">
                    {reviewingEntry.usage}
                  </pre>
                </div>
              )}

              {reviewingEntry.url && (
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                    Official Repository URL
                  </label>
                  <a
                    href={reviewingEntry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{reviewingEntry.url}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200/80 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={onCloseReviewingEntry}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => onRequestDeleteEntry(reviewingEntry.name)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 border border-rose-500/25 hover:bg-rose-50 dark:hover:bg-rose-500/10 cursor-pointer"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => onApproveEntry(reviewingEntry)}
                disabled={actioningId === reviewingEntry.name}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
              >
                {actioningId === reviewingEntry.name ? "Approving..." : "Approve & Publish"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Create / Edit Catalog Asset */}
      {editingEntry && (
        <div className={MODAL_OVERLAY} onClick={onCloseEditingEntry}>
          <div
            className={`${MODAL_CARD} max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseEditingEntry}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/12 text-indigo-600 dark:text-indigo-400">
                <Edit size={18} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  {editingEntry.isNew
                    ? "Create New AI Asset"
                    : `Edit Specifications: ${editingEntry.name}`}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {editingEntry.isNew
                    ? "Publish a verified asset directly to the live catalog"
                    : "Update technical specifications, usage snippet, and benchmarks"}
                </p>
              </div>
            </div>

            <form onSubmit={onSubmitEditingEntry} className="space-y-3.5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Asset Name
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!editingEntry.isNew}
                    value={editingEntry.name}
                    onChange={(e) =>
                      onChangeEditingEntry({ ...editingEntry, name: e.target.value })
                    }
                    placeholder="e.g. DeepSeek-V3"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEntry.org}
                    onChange={(e) =>
                      onChangeEditingEntry({ ...editingEntry, org: e.target.value })
                    }
                    placeholder="e.g. DeepSeek / Meta / Google"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={editingEntry.type}
                    onChange={(e) =>
                      onChangeEditingEntry({
                        ...editingEntry,
                        type: e.target.value as Entry["type"],
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#111319] text-xs text-neutral-900 dark:text-white outline-none cursor-pointer"
                  >
                    <option value="Model">Model</option>
                    <option value="Framework">Framework</option>
                    <option value="Dataset">Dataset</option>
                    <option value="Platform">Platform</option>
                    <option value="AI">AI Application</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Task Domain
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEntry.task}
                    onChange={(e) =>
                      onChangeEditingEntry({ ...editingEntry, task: e.target.value })
                    }
                    placeholder="e.g. NLP / Multimodal"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    License
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEntry.license}
                    onChange={(e) =>
                      onChangeEditingEntry({ ...editingEntry, license: e.target.value })
                    }
                    placeholder="e.g. MIT / Apache 2.0"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Release Year
                  </label>
                  <input
                    type="number"
                    required
                    value={editingEntry.year}
                    onChange={(e) =>
                      onChangeEditingEntry({
                        ...editingEntry,
                        year: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Parameter / Size
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEntry.size}
                    onChange={(e) =>
                      onChangeEditingEntry({ ...editingEntry, size: e.target.value })
                    }
                    placeholder="e.g. 671B / 10M Samples"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Summary
                </label>
                <textarea
                  required
                  value={editingEntry.summary}
                  onChange={(e) =>
                    onChangeEditingEntry({ ...editingEntry, summary: e.target.value })
                  }
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Architecture
                  </label>
                  <input
                    type="text"
                    value={editingEntry.architecture}
                    onChange={(e) =>
                      onChangeEditingEntry({
                        ...editingEntry,
                        architecture: e.target.value,
                      })
                    }
                    placeholder="e.g. Transformer Decoder, MLA"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Benchmarks
                  </label>
                  <input
                    type="text"
                    value={editingEntry.benchmarks}
                    onChange={(e) =>
                      onChangeEditingEntry({
                        ...editingEntry,
                        benchmarks: e.target.value,
                      })
                    }
                    placeholder="e.g. MMLU: 88.5%"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Quickstart / Usage Code
                  </label>
                  <textarea
                    value={editingEntry.usage}
                    onChange={(e) =>
                      onChangeEditingEntry({ ...editingEntry, usage: e.target.value })
                    }
                    rows={2}
                    placeholder="pip install ..."
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-mono text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Known Limitations
                  </label>
                  <textarea
                    value={editingEntry.limitations}
                    onChange={(e) =>
                      onChangeEditingEntry({
                        ...editingEntry,
                        limitations: e.target.value,
                      })
                    }
                    rows={2}
                    placeholder="Requires high VRAM or API key..."
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60 resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Official Repository URL
                </label>
                <input
                  type="url"
                  value={editingEntry.url}
                  onChange={(e) =>
                    onChangeEditingEntry({ ...editingEntry, url: e.target.value })
                  }
                  placeholder="https://github.com/..."
                  className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-mono text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 text-xs font-medium text-amber-700 dark:text-amber-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingEntry.popular}
                  onChange={(e) =>
                    onChangeEditingEntry({ ...editingEntry, popular: e.target.checked })
                  }
                  className="rounded border-neutral-300 text-indigo-600 focus:ring-0 cursor-pointer"
                />
                <Star size={12} className="fill-amber-400 text-amber-400" />
                Highlight as featured asset on home dashboard
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200/80 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={onCloseEditingEntry}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actioningId === editingEntry.name}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
                >
                  {actioningId === editingEntry.name
                    ? "Saving..."
                    : editingEntry.isNew
                    ? "Publish Asset"
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Delete Asset Confirm */}
      {deleteConfirmEntry && (
        <div className={MODAL_OVERLAY} onClick={onCloseDeleteConfirmEntry}>
          <div
            className={`${MODAL_CARD} max-w-md p-6 space-y-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseDeleteConfirmEntry}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 text-rose-500">
              <div className="p-2.5 rounded-xl bg-rose-500/12">
                <Trash2 size={20} />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                Delete Catalog Asset
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Remove <strong className="text-neutral-900 dark:text-white">"{deleteConfirmEntry}"</strong> from the live catalog and all comparison views?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onCloseDeleteConfirmEntry}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onConfirmDeleteEntry(deleteConfirmEntry)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
              >
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Suspend Account */}
      {blockingUser && (
        <div className={MODAL_OVERLAY} onClick={onCloseBlockingUser}>
          <div
            className={`${MODAL_CARD} max-w-md p-6 space-y-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseBlockingUser}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 text-amber-500">
              <div className="p-2.5 rounded-xl bg-amber-500/12">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                {blockingUser.isBlocked ? "Lift Account Suspension" : "Suspend Account Access"}
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {blockingUser.isBlocked ? (
                <>
                  Restore active access for{" "}
                  <strong className="text-neutral-900 dark:text-white">
                    {blockingUser.displayName}
                  </strong>
                  ?
                </>
              ) : (
                <>
                  Select suspension duration for{" "}
                  <strong className="text-neutral-900 dark:text-white">
                    {blockingUser.displayName}
                  </strong>
                  .
                </>
              )}
            </p>
            <div className="flex flex-col gap-2 pt-1">
              {blockingUser.isBlocked ? (
                <button
                  type="button"
                  onClick={() => onExecuteBlock(blockingUser, false, 0)}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                >
                  Lift Suspension
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => onExecuteBlock(blockingUser, true, 24 * 60 * 60 * 1000)}
                    className="w-full py-2.5 rounded-xl font-medium text-xs border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-900 dark:text-white cursor-pointer"
                  >
                    Suspend for 24 Hours
                  </button>
                  <button
                    type="button"
                    onClick={() => onExecuteBlock(blockingUser, true, 7 * 24 * 60 * 60 * 1000)}
                    className="w-full py-2.5 rounded-xl font-medium text-xs border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-900 dark:text-white cursor-pointer"
                  >
                    Suspend for 7 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => onExecuteBlock(blockingUser, true, -1)}
                    className="w-full py-2.5 rounded-xl font-semibold text-xs bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
                  >
                    Suspend Indefinitely
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={onCloseBlockingUser}
                className="w-full py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Permanently Purge User */}
      {deleteConfirmUser && (
        <div className={MODAL_OVERLAY} onClick={onCloseDeleteConfirmUser}>
          <div
            className={`${MODAL_CARD} max-w-md p-6 space-y-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseDeleteConfirmUser}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 text-rose-500">
              <div className="p-2.5 rounded-xl bg-rose-500/12">
                <Trash2 size={20} />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                {deleteConfirmUser.deletionRequested
                  ? "Approve User Deletion Request"
                  : "Permanently Purge Account"}
              </h3>
            </div>

            {deleteConfirmUser.deletionRequested && (
              <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs space-y-1 text-amber-800 dark:text-amber-200">
                <div className="font-semibold flex items-center gap-1">
                  <AlertTriangle size={12} />
                  User Deletion Reason:
                </div>
                <p className="italic">
                  "{deleteConfirmUser.deletionReason || "No specific reason provided."}"
                </p>
              </div>
            )}

            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Permanently purge{" "}
              <strong className="text-neutral-900 dark:text-white">
                {deleteConfirmUser.displayName} ({deleteConfirmUser.username})
              </strong>
              ? This executes the admin RPC to remove credentials from{" "}
              <strong className="text-rose-500">auth.users</strong> and delete all user bookmarks, ratings, chats, and comments.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onCloseDeleteConfirmUser}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void onConfirmDeleteUser(deleteConfirmUser)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
              >
                {deleteConfirmUser.deletionRequested
                  ? "Approve & Purge Everywhere"
                  : "Delete Account Everywhere"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Direct Purge by Auth UID */}
      {directDeleteModalOpen && (
        <div className={MODAL_OVERLAY} onClick={onCloseDirectDelete}>
          <div
            className={`${MODAL_CARD} max-w-md p-6 space-y-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseDirectDelete}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 text-rose-500">
              <div className="p-2.5 rounded-xl bg-rose-500/12">
                <Trash2 size={20} />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                Purge User by Auth UID
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Enter any Supabase User UID to purge their credentials from{" "}
              <strong className="text-rose-500">auth.users</strong> and all application tables:
            </p>
            <input
              type="text"
              placeholder="e.g. afa9a070-6961-4419-a7b1-291628f94a48"
              value={directDeleteUidInput}
              onChange={(e) => onChangeDirectDeleteUid(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-mono text-neutral-900 dark:text-white outline-none focus:border-rose-500/60"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onCloseDirectDelete}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!directDeleteUidInput.trim()}
                onClick={() => void onConfirmDirectDelete(directDeleteUidInput)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer disabled:opacity-50"
              >
                Purge Account Everywhere
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Batch Confirm */}
      {batchConfirm && (
        <div className={MODAL_OVERLAY} onClick={onCloseBatchConfirm}>
          <div
            className={`${MODAL_CARD} max-w-md p-6 space-y-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseBatchConfirm}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>
            <div
              className={`p-2.5 rounded-xl w-fit ${
                batchConfirm === "approve"
                  ? "bg-emerald-500/12 text-emerald-500"
                  : "bg-rose-500/12 text-rose-500"
              }`}
            >
              {batchConfirm === "approve" ? (
                <CheckCheck size={22} />
              ) : (
                <AlertTriangle size={22} />
              )}
            </div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
              {batchConfirm === "approve"
                ? `Approve All ${pendingCount} Submissions?`
                : `Purge All ${pendingCount} Submissions?`}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {batchConfirm === "approve"
                ? "This will batch-publish all pending submissions to the live public catalog immediately."
                : "This will permanently discard all submissions currently in the review queue."}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onCloseBatchConfirm}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={
                  batchConfirm === "approve"
                    ? onConfirmBatchApproveAll
                    : onConfirmBatchRejectAll
                }
                className={`px-4 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer ${
                  batchConfirm === "approve"
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : "bg-rose-600 hover:bg-rose-500"
                }`}
              >
                {batchConfirm === "approve"
                  ? `Approve All (${pendingCount})`
                  : "Purge Submissions"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. Manage & Clear User Chats */}
      {chatManagingUser && (
        <div className={MODAL_OVERLAY} onClick={onCloseChatManager}>
          <div
            className={`${MODAL_CARD} max-w-2xl p-6 space-y-4 max-h-[85vh] flex flex-col overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseChatManager}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center justify-between pr-8 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/12 text-indigo-600 dark:text-indigo-400">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                    User Conversations · {chatManagingUser.displayName}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    {chatManagingUser.username} · {chatManagingUser.userKey}
                  </p>
                </div>
              </div>

              {userChatsList.length > 0 && (
                <button
                  type="button"
                  onClick={() => onRequestClearAllChats(chatManagingUser)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
                >
                  <Trash2 size={13} />
                  Clear All Chats
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1 text-xs">
              {loadingUserChats ? (
                <div className="flex items-center justify-center py-12 gap-2 text-neutral-500">
                  <RefreshCw size={16} className="animate-spin text-indigo-500" />
                  <span>Querying database for user chat sessions...</span>
                </div>
              ) : userChatsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2 text-center border border-dashed rounded-xl border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02]">
                  <MessageSquare size={20} className="text-neutral-400" />
                  <p className="font-semibold text-sm text-neutral-900 dark:text-white">
                    No chat records found
                  </p>
                  <p className="text-xs text-neutral-500 max-w-xs">
                    This user currently has zero stored chat sessions.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1">
                    <span>
                      {userChatsList.length} conversation session
                      {userChatsList.length > 1 ? "s" : ""}
                    </span>
                    <span>Most recent first</span>
                  </div>
                  {userChatsList.map((chat) => (
                    <div
                      key={chat.id}
                      className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/70 dark:bg-white/[0.02] space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-neutral-900 dark:text-white truncate">
                            {chat.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-neutral-500 font-mono">
                            <span className="capitalize">Mode: {chat.mode}</span>
                            <span>·</span>
                            <span>{chat.messages.length} messages</span>
                            <span>·</span>
                            <span>
                              {new Date(chat.updatedAt || chat.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={actioningId === chat.id}
                          onClick={() => onDeleteSingleChat(chatManagingUser, chat.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                          title="Delete session"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      {chat.messages.length > 0 && (
                        <div className="p-2.5 rounded-lg bg-white dark:bg-[#0c0d11] border border-neutral-200/70 dark:border-white/[0.06] text-[11px] text-neutral-500 line-clamp-2">
                          <strong className="text-neutral-900 dark:text-white">
                            {chat.messages[chat.messages.length - 1].role}:
                          </strong>{" "}
                          {chat.messages[chat.messages.length - 1].content.slice(0, 140)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-200/80 dark:border-white/[0.08] shrink-0">
              <span className="text-[11px] text-neutral-500">
                Administrative Governance · Permanent Database Clears
              </span>
              <button
                type="button"
                onClick={onCloseChatManager}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. Confirm Clear Chats */}
      {clearChatsConfirmUser && (
        <div className={MODAL_OVERLAY} onClick={onCloseClearChatsConfirm}>
          <div
            className={`${MODAL_CARD} max-w-md p-6 space-y-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/12 text-rose-500 shrink-0">
                <MessageSquareX size={22} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Clear User Chat History?
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Permanent removal from database
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Permanently clear all chat history for{" "}
              <strong className="text-neutral-900 dark:text-white">
                {clearChatsConfirmUser.displayName}
              </strong>{" "}
              (
              <code className="font-mono text-[11px] text-indigo-500">
                {clearChatsConfirmUser.username}
              </code>
              )? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200/80 dark:border-white/[0.08]">
              <button
                type="button"
                disabled={actioningId === clearChatsConfirmUser.userKey}
                onClick={onCloseClearChatsConfirm}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actioningId === clearChatsConfirmUser.userKey}
                onClick={() => onConfirmClearAllChats(clearChatsConfirmUser)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer disabled:opacity-50"
              >
                {actioningId === clearChatsConfirmUser.userKey
                  ? "Clearing..."
                  : "Clear Chats from Database"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. Execution Log JSON Payload */}
      {inspectingLog && (
        <div className={MODAL_OVERLAY} onClick={onCloseInspectLog}>
          <div
            className={`${MODAL_CARD} max-w-2xl max-h-[85vh] flex flex-col overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-neutral-200/80 dark:border-white/[0.08] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/12 text-indigo-500 flex items-center justify-center">
                  <Code size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {inspectingLog.workflow || inspectingLog.action}
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-500">
                    ID: {inspectingLog.id} ·{" "}
                    {new Date(inspectingLog.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseInspectLog}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
              <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.02] space-y-1">
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {inspectingLog.summary || inspectingLog.action}
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {inspectingLog.details}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Full Log Metadata
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        JSON.stringify(inspectingLog, null, 2),
                      );
                      setCopiedLogJson(true);
                      setTimeout(() => setCopiedLogJson(false), 2000);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {copiedLogJson ? (
                      <>
                        <Check size={12} className="text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        Copy JSON
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-950 text-neutral-200 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[45vh]">
                  {JSON.stringify(inspectingLog, null, 2)}
                </pre>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/70 dark:bg-white/[0.02] flex items-center justify-between shrink-0 text-xs">
              <span className="text-neutral-500 font-mono text-[11px]">
                Actor: {inspectingLog.adminEmail}
              </span>
              <button
                type="button"
                onClick={onCloseInspectLog}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 13. Codebase & Supabase Sync Center */}
      {codebaseSyncModalOpen && (
        <div className={MODAL_OVERLAY} onClick={onCloseCodebaseSync}>
          <div
            className={`${MODAL_CARD} max-w-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onCloseCodebaseSync}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/12 text-indigo-500">
                <Terminal size={22} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Codebase & Supabase Sync Center
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Synchronize live Supabase catalog rows with static repository files and RLS policies.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-800 dark:text-indigo-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold">
                <Info size={14} />
                <span>Zero-Latency Hybrid Architecture</span>
              </div>
              <p className="leading-relaxed">
                AiVerse bundles verified entries statically in{" "}
                <code className="font-mono">src/data.ts</code> for instant first paint, while live submissions and admin approvals persist directly in Supabase <code className="font-mono">public.entries</code>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.02] space-y-1">
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Live Directory
                </span>
                <p className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums">
                  {approvedCount} Assets
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={12} /> RLS protected
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.02] space-y-1">
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Static Bundle
                </span>
                <p className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums">
                  {staticBundleCount} Assets
                </p>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <Sparkles size={12} /> Pre-compiled
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.02] space-y-1">
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Pending Queue
                </span>
                <p className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums">
                  {pendingCount} Items
                </p>
                <p className="text-[11px] text-neutral-500">Awaiting review</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-900 dark:text-white">
                  1. Sync Pending Queue into Static Codebase
                </span>
                <span className="text-[11px] text-neutral-500">Terminal</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-neutral-950 text-white font-mono text-xs">
                <span>npm run approve:pending</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText("npm run approve:pending");
                    setCopiedSyncCmd(true);
                    setTimeout(() => setCopiedSyncCmd(false), 2000);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                >
                  {copiedSyncCmd ? (
                    <Check size={12} className="text-emerald-400" />
                  ) : (
                    <Copy size={12} />
                  )}
                  <span>{copiedSyncCmd ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-800 dark:text-amber-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold">
                <AlertTriangle size={14} className="shrink-0" />
                <span>Supabase SQL Editor Guidance</span>
              </div>
              <p className="leading-relaxed">
                Ensure <code className="font-mono">supabase/rls_policies.sql</code> has been executed in Supabase Dashboard → SQL Editor so admin approvals pass RLS. For large seed imports over 1 MB, run <code className="font-mono">seed_part1.sql</code> and <code className="font-mono">seed_part2.sql</code> separately.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-200/80 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={onExportFullCatalog}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <Download size={13} />
                Export Full Catalog JSON
              </button>
              <button
                type="button"
                onClick={onCloseCodebaseSync}
                className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
