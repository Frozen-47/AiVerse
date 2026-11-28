import React, { useState } from "react";
import {
  Check,
  CheckCheck,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  ExternalLink,
  Info,
  Layers,
  Search,
  Sparkles,
  Square,
  Terminal,
  Trash2,
} from "lucide-react";
import type { Entry } from "../../types";
import { typeBadge, useTokens } from "../../lib/theme";

interface AdminReviewQueueSectionProps {
  pendingEntries: Entry[];
  filteredSubmissions: Entry[];
  approvedCount: number;
  selectedSubmissions: Set<string>;
  submissionsSearch: string;
  onSubmissionsSearchChange: (val: string) => void;
  submissionsTypeFilter: string;
  onSubmissionsTypeFilterChange: (val: string) => void;
  actioningId: string | null;
  onToggleSelectAll: () => void;
  onToggleSelectOne: (name: string) => void;
  onClearSelection: () => void;
  onApproveOne: (entry: Entry) => void;
  onRejectOne: (name: string) => void;
  onBatchApprove: (names?: string[]) => void;
  onBatchReject: (names?: string[]) => void;
  onConfirmBatchApproveAll: () => void;
  onConfirmBatchRejectAll: () => void;
  onInspectSpecs: (entry: Entry) => void;
  onOpenSyncCenter: () => void;
  onExportQueue: (items: Entry[], filename: string) => void;
  onBrowseCatalog: () => void;
}

function isNewSubmission(createdAt?: string): boolean {
  if (!createdAt) return false;
  const created = new Date(createdAt);
  const diffMs = Date.now() - created.getTime();
  return diffMs / (1000 * 60 * 60 * 24) <= 2;
}

export const AdminReviewQueueSection: React.FC<AdminReviewQueueSectionProps> = ({
  pendingEntries,
  filteredSubmissions,
  approvedCount,
  selectedSubmissions,
  submissionsSearch,
  onSubmissionsSearchChange,
  submissionsTypeFilter,
  onSubmissionsTypeFilterChange,
  actioningId,
  onToggleSelectAll,
  onToggleSelectOne,
  onClearSelection,
  onApproveOne,
  onRejectOne,
  onBatchApprove,
  onBatchReject,
  onConfirmBatchApproveAll,
  onConfirmBatchRejectAll,
  onInspectSpecs,
  onOpenSyncCenter,
  onExportQueue,
  onBrowseCatalog,
}) => {
  const t = useTokens();
  const [expandedName, setExpandedName] = useState<string | null>(null);
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
              Review Queue
            </h2>
            {pendingEntries.length > 0 ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/12 text-amber-700 dark:text-amber-300 border border-amber-500/25">
                {pendingEntries.length} awaiting audit
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                Queue pristine
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Audit community submissions and Daily Pulse discoveries with 0ms optimistic publishing and rollback safety.
          </p>
        </div>

        {pendingEntries.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onOpenSyncCenter}
              className="px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0d11] hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-200 cursor-pointer transition-colors inline-flex items-center gap-1.5"
            >
              <Terminal size={13} className="text-indigo-500" />
              Sync Center
            </button>
            <button
              type="button"
              onClick={() => onExportQueue(pendingEntries, "aiverse_pending_queue")}
              className="px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0d11] hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-600 dark:text-neutral-300 cursor-pointer transition-colors inline-flex items-center gap-1.5"
            >
              <Download size={13} />
              Export JSON
            </button>
            <button
              type="button"
              onClick={() => {
                if (selectedSubmissions.size > 0) {
                  onBatchApprove(Array.from(selectedSubmissions));
                } else {
                  onConfirmBatchApproveAll();
                }
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer shadow-xs transition-colors inline-flex items-center gap-1.5"
            >
              <CheckCheck size={14} />
              {selectedSubmissions.size > 0
                ? `Approve Selected (${selectedSubmissions.size})`
                : `Approve All (${pendingEntries.length})`}
            </button>
            <button
              type="button"
              onClick={() => {
                if (selectedSubmissions.size > 0) {
                  onBatchReject(Array.from(selectedSubmissions));
                } else {
                  onConfirmBatchRejectAll();
                }
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 border border-rose-500/25 hover:bg-rose-50 dark:hover:bg-rose-500/10 cursor-pointer transition-colors"
            >
              {selectedSubmissions.size > 0
                ? `Purge Selected (${selectedSubmissions.size})`
                : "Purge All"}
            </button>
          </div>
        )}
      </div>

      {/* Optimistic Info Strip */}
      {pendingEntries.length > 0 && (
        <div className="p-3.5 rounded-2xl border border-indigo-500/20 bg-indigo-50/70 dark:bg-indigo-500/10 text-xs text-indigo-800 dark:text-indigo-200 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Info size={16} className="shrink-0 mt-0.5 text-indigo-500" />
            <p className="leading-relaxed">
              <strong>Optimistic Publishing Active:</strong> Approvals update existing database rows first and only insert missing pulse discoveries, with instant Undo and automatic rollback on database error. Run <code className="font-mono">npm run approve:pending</code> to sync static files.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenSyncCenter}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 transition-colors cursor-pointer"
          >
            Details →
          </button>
        </div>
      )}

      {/* Search & Category Chips */}
      {pendingEntries.length > 0 && (
        <div className="p-3.5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm w-full">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={submissionsSearch}
              onChange={(e) => onSubmissionsSearchChange(e.target.value)}
              placeholder="Search queue by asset, org, or task..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#111319] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(["All", "Model", "Framework", "Dataset", "Platform", "AI"] as const).map(
              (cat) => {
                const active = submissionsTypeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onSubmissionsTypeFilterChange(cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer border ${
                      active
                        ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white"
                        : "text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/25"
                    }`}
                  >
                    {cat === "All" ? `All (${pendingEntries.length})` : cat}
                  </button>
                );
              },
            )}
          </div>
        </div>
      )}

      {/* Empty State or Table */}
      {filteredSubmissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 gap-4 text-center border border-dashed rounded-2xl border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0d11]">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Sparkles size={28} />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/12 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 size={12} /> 100% Up to Date
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Review queue is pristine
            </h3>
            <p className="text-xs max-w-md text-neutral-500 dark:text-neutral-400 leading-relaxed">
              All community submissions and Daily Pulse discoveries have been audited and deployed to the live catalog.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onBrowseCatalog}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Layers size={14} />
              Browse Catalog ({approvedCount})
            </button>
            <button
              type="button"
              onClick={onOpenSyncCenter}
              className="px-4 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Terminal size={14} className="text-indigo-500" />
              Codebase Sync
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200/80 dark:border-white/[0.07] bg-neutral-50/80 dark:bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <th className="w-10 px-3 py-3 text-center">
                    <button
                      type="button"
                      onClick={onToggleSelectAll}
                      title={
                        selectedSubmissions.size === filteredSubmissions.length
                          ? "Deselect All"
                          : "Select All"
                      }
                      className="text-neutral-500 hover:text-indigo-500 cursor-pointer"
                    >
                      {selectedSubmissions.size > 0 &&
                      selectedSubmissions.size === filteredSubmissions.length ? (
                        <CheckSquare size={15} className="text-indigo-500" />
                      ) : selectedSubmissions.size > 0 ? (
                        <div className="w-3.5 h-3.5 rounded-xs border-2 border-indigo-500 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-indigo-500" />
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
              <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.05] text-xs">
                {filteredSubmissions.map((entry) => {
                  const isNew = isNewSubmission(entry.created_at);
                  const isSelected = selectedSubmissions.has(entry.name);
                  const isExpanded = expandedName === entry.name;

                  return (
                    <React.Fragment key={entry.name}>
                      <tr
                        className={`transition-colors ${
                          isSelected
                            ? "bg-indigo-50/70 dark:bg-indigo-500/10"
                            : "hover:bg-neutral-50/80 dark:hover:bg-white/[0.03]"
                        }`}
                      >
                        <td className="w-10 px-3 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => onToggleSelectOne(entry.name)}
                            className="text-neutral-400 hover:text-indigo-500 cursor-pointer"
                          >
                            {isSelected ? (
                              <CheckSquare size={15} className="text-indigo-500" />
                            ) : (
                              <Square size={15} />
                            )}
                          </button>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setExpandedName(isExpanded ? null : entry.name)}
                              className="p-1 rounded-md hover:bg-neutral-200/70 dark:hover:bg-white/10 text-neutral-500 cursor-pointer transition-colors"
                              title={isExpanded ? "Collapse specs" : "Expand inline specs"}
                            >
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => onInspectSpecs(entry)}
                              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer text-left"
                            >
                              {entry.name}
                            </button>
                            {isNew && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                                NEW
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-neutral-600 dark:text-neutral-300">
                          {entry.org || "Independent"}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${typeBadge(
                              entry.type,
                              t,
                            )}`}
                          >
                            {entry.type}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-neutral-600 dark:text-neutral-300">
                          {entry.task}
                        </td>
                        <td className="px-3 py-3">
                          {entry.submitted_by === "daily-pulse-bot" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/20">
                              <Sparkles size={11} />
                              Daily Pulse Bot
                            </span>
                          ) : (
                            <span className="text-neutral-600 dark:text-neutral-300">
                              Community Member
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-neutral-500 dark:text-neutral-400">
                          {entry.license || "Open"} · {entry.size || "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => onInspectSpecs(entry)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-medium border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              onClick={() => onApproveOne(entry)}
                              disabled={actioningId === entry.name}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer disabled:opacity-50"
                            >
                              {actioningId === entry.name ? "..." : "Approve"}
                            </button>
                            <button
                              type="button"
                              onClick={() => onRejectOne(entry.name)}
                              disabled={actioningId === entry.name}
                              className="p-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer disabled:opacity-50"
                              title="Reject submission"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-neutral-50/70 dark:bg-white/[0.02]">
                          <td
                            colSpan={8}
                            className="px-6 py-4 border-b border-neutral-200/70 dark:border-white/[0.06]"
                          >
                            <div className="space-y-3 max-w-4xl">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                                  Summary
                                </span>
                                <p className="mt-1 text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
                                  {entry.summary || "No summary description provided."}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0c0d11] border border-neutral-200/80 dark:border-white/[0.08]">
                                  <span className="text-[10px] text-neutral-400 block">
                                    Architecture
                                  </span>
                                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                                    {entry.architecture || "Standard"}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0c0d11] border border-neutral-200/80 dark:border-white/[0.08]">
                                  <span className="text-[10px] text-neutral-400 block">
                                    Benchmarks
                                  </span>
                                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                                    {entry.benchmarks || "N/A"}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0c0d11] border border-neutral-200/80 dark:border-white/[0.08]">
                                  <span className="text-[10px] text-neutral-400 block">
                                    Size / Scale
                                  </span>
                                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                                    {entry.size || "Unknown"}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0c0d11] border border-neutral-200/80 dark:border-white/[0.08]">
                                  <span className="text-[10px] text-neutral-400 block">
                                    Documentation
                                  </span>
                                  {entry.url ? (
                                    <a
                                      href={entry.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                                    >
                                      Open URL <ExternalLink size={11} />
                                    </a>
                                  ) : (
                                    <span className="text-neutral-400">None</span>
                                  )}
                                </div>
                              </div>

                              {entry.usage && (
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                                      Quickstart Snippet
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        navigator.clipboard.writeText(entry.usage || "");
                                        setCopiedCodeKey(entry.name);
                                        setTimeout(() => setCopiedCodeKey(null), 2000);
                                      }}
                                      className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                                    >
                                      {copiedCodeKey === entry.name ? (
                                        <>
                                          <Check size={12} className="text-emerald-500" />
                                          Copied!
                                        </>
                                      ) : (
                                        <>
                                          <Copy size={12} />
                                          Copy
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <pre className="p-3 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-36 border border-white/10">
                                    {entry.usage}
                                  </pre>
                                </div>
                              )}

                              <div className="flex items-center justify-end gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => onRejectOne(entry.name)}
                                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                                >
                                  Reject Submission
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onApproveOne(entry)}
                                  className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
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

      {/* Floating Glass Batch Action Dock */}
      {selectedSubmissions.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-950/95 dark:bg-white/95 text-white dark:text-neutral-900 px-5 py-3 rounded-2xl shadow-2xl border border-white/15 dark:border-neutral-200 flex items-center gap-4 backdrop-blur-xl animate-[fadeInUp_0.2s_ease-out]">
          <div className="flex items-center gap-2 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
              {selectedSubmissions.size}
            </span>
            <span>selected</span>
          </div>
          <div className="h-4 w-px bg-white/20 dark:bg-black/15" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onBatchApprove(Array.from(selectedSubmissions))}
              disabled={actioningId === "batch_approve"}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <CheckCheck size={14} />
              Approve Selected
            </button>
            <button
              type="button"
              onClick={() => onBatchReject(Array.from(selectedSubmissions))}
              disabled={actioningId === "batch_reject"}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Trash2 size={13} />
              Reject
            </button>
            <button
              type="button"
              onClick={() => {
                const selectedEntries = pendingEntries.filter((e) =>
                  selectedSubmissions.has(e.name),
                );
                onExportQueue(
                  selectedEntries,
                  `aiverse_selected_submissions_${selectedSubmissions.size}`,
                );
              }}
              className="px-2.5 py-1.5 rounded-xl text-xs font-medium border border-white/20 dark:border-black/15 hover:bg-white/10 dark:hover:bg-black/5 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <Download size={13} />
              Export
            </button>
            <button
              type="button"
              onClick={onClearSelection}
              className="px-2 py-1 text-xs opacity-70 hover:opacity-100 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
