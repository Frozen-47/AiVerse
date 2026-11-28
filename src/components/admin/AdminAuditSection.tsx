import React from "react";
import {
  Bot,
  CheckCircle2,
  Code,
  Download,
  History,
  Radio,
  Search,
  ShieldCheck,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import type { AuditFilterType, AuditLogItem, PipelineLogCounts } from "./types";

interface AdminAuditSectionProps {
  auditLogs: AuditLogItem[];
  filteredAuditLogs: AuditLogItem[];
  auditFilter: AuditFilterType;
  onAuditFilterChange: (filter: AuditFilterType) => void;
  auditSearchQuery: string;
  onAuditSearchQueryChange: (val: string) => void;
  latestAiRadarRun?: AuditLogItem;
  latestLeaderboardRun?: AuditLogItem;
  pipelineLogCounts: PipelineLogCounts;
  onExportLogs: () => void;
  onClearLocalLogs: () => void;
  onInspectLog: (log: AuditLogItem) => void;
}

export const AdminAuditSection: React.FC<AdminAuditSectionProps> = ({
  auditLogs,
  filteredAuditLogs,
  auditFilter,
  onAuditFilterChange,
  auditSearchQuery,
  onAuditSearchQueryChange,
  latestAiRadarRun,
  latestLeaderboardRun,
  pipelineLogCounts,
  onExportLogs,
  onClearLocalLogs,
  onInspectLog,
}) => {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <History size={19} className="text-indigo-500" />
            <span>System Audit & CI/CD Pipeline Logs</span>
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Immutable governance events combined with GitHub Actions telemetry for AI Radar and Leaderboard Sync.
          </p>
        </div>

        {auditLogs.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onExportLogs}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0d11] text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <Download size={13} />
              Export Logs
            </button>
            <button
              type="button"
              onClick={onClearLocalLogs}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 border border-rose-500/25 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              Clear Local View
            </button>
          </div>
        )}
      </div>

      {/* Pipeline Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <PipelineCard
          title="AI Radar & Ecosystem Discovery"
          schedule="Runs ~10x daily (every 2.4 hrs) via GitHub Actions"
          icon={<Radio size={16} />}
          iconBg="bg-indigo-500/12 border-indigo-500/25 text-indigo-500"
          selected={auditFilter === "radar"}
          runCount={pipelineLogCounts.radarCount}
          latestRun={latestAiRadarRun}
          filterLabel="Showing Radar Logs"
          onClick={() =>
            onAuditFilterChange(auditFilter === "radar" ? "all" : "radar")
          }
        />

        <PipelineCard
          title="Frontier Leaderboard Sync"
          schedule="Runs daily at 04:00 UTC via GitHub Actions"
          icon={<Zap size={16} />}
          iconBg="bg-cyan-500/12 border-cyan-500/25 text-cyan-500"
          selected={auditFilter === "leaderboard"}
          runCount={pipelineLogCounts.leaderboardCount}
          latestRun={latestLeaderboardRun}
          filterLabel="Showing Leaderboard Logs"
          onClick={() =>
            onAuditFilterChange(auditFilter === "leaderboard" ? "all" : "leaderboard")
          }
        />
      </div>

      {/* Filter Tabs + Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {(
            [
              { key: "all", label: "All Logs", count: auditLogs.length },
              { key: "actions", label: "CI/CD Pipelines", count: pipelineLogCounts.actionCount },
              { key: "radar", label: "AI Radar", count: pipelineLogCounts.radarCount },
              { key: "leaderboard", label: "Leaderboard Sync", count: pipelineLogCounts.leaderboardCount },
              { key: "iam", label: "Admin & Security", count: pipelineLogCounts.iamCount },
            ] as const
          ).map((tab) => {
            const active = auditFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onAuditFilterChange(tab.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                  active
                    ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white font-semibold"
                    : "bg-white dark:bg-[#0c0d11] text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/25"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    active
                      ? "bg-white/20 dark:bg-black/15"
                      : "bg-neutral-100 dark:bg-white/[0.06]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[230px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            value={auditSearchQuery}
            onChange={(e) => onAuditSearchQueryChange(e.target.value)}
            placeholder="Search action, details, or actor..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0d11] text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none focus:border-indigo-500/60"
          />
          {auditSearchQuery && (
            <button
              type="button"
              onClick={() => onAuditSearchQueryChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {filteredAuditLogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center border border-dashed rounded-2xl border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0d11]">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-neutral-100 dark:bg-white/[0.06] text-neutral-500">
            <History size={20} />
          </div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-white">
            No matching audit records
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">
            {auditSearchQuery
              ? `Zero records match "${auditSearchQuery}".`
              : "Administrative events and GitHub Action execution logs will appear here."}
          </p>
          {(auditSearchQuery || auditFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                onAuditSearchQueryChange("");
                onAuditFilterChange("all");
              }}
              className="mt-1 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200/80 dark:border-white/[0.07] bg-neutral-50/80 dark:bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action / Pipeline</th>
                  <th className="px-4 py-3">Execution Summary</th>
                  <th className="px-4 py-3">Actor</th>
                  <th className="px-4 py-3 text-right">Timestamp</th>
                  <th className="px-3 py-3 text-center">JSON</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.05] text-xs">
                {filteredAuditLogs.map((log) => {
                  const isActionBot = log.adminEmail.includes("github-actions");
                  const isRadar =
                    log.action === "AI_RADAR_SYNC" || log.workflow?.includes("Radar");
                  const isLeaderboard =
                    log.action === "LEADERBOARD_SYNC" ||
                    log.workflow?.includes("Leaderboard");
                  const isError = log.status === "error";

                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-neutral-50/80 dark:hover:bg-white/[0.03] transition-colors"
                    >
                      <td className="px-4 py-3 align-top">
                        {isError ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/12 text-rose-600 dark:text-rose-300">
                            <XCircle size={10} />
                            FAILED
                          </span>
                        ) : isActionBot ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-300">
                            <CheckCircle2 size={10} />
                            SUCCESS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/12 text-indigo-600 dark:text-indigo-300">
                            <ShieldCheck size={10} />
                            ADMIN
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 align-top whitespace-nowrap">
                        {isRadar ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                            <Radio size={11} />
                            AI Radar
                          </span>
                        ) : isLeaderboard ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">
                            <Zap size={11} />
                            Leaderboard
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 font-mono text-[10px]">
                            {log.action}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 align-top max-w-md">
                        <div className="space-y-1">
                          {log.summary && (
                            <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                              {log.summary}
                            </p>
                          )}
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                            {log.details}
                          </p>
                          {log.metadata && (
                            <div className="flex items-center gap-1.5 pt-0.5 flex-wrap text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                              {log.metadata.runId &&
                                log.metadata.runId !== "local-manual-run" && (
                                  <span className="bg-neutral-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded">
                                    Run #{log.metadata.runId}
                                  </span>
                                )}
                              {log.metadata.sha && log.metadata.sha !== "local" && (
                                <span className="bg-neutral-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded">
                                  {log.metadata.sha}
                                </span>
                              )}
                              {typeof log.metadata.durationMs === "number" && (
                                <span className="bg-neutral-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded">
                                  {(log.metadata.durationMs / 1000).toFixed(1)}s
                                </span>
                              )}
                              {typeof log.metadata.totalModels === "number" && (
                                <span className="bg-neutral-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded">
                                  {log.metadata.totalModels} models
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3 align-top whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                          {isActionBot ? (
                            <>
                              <Bot size={13} className="text-indigo-500" />
                              <span className="font-mono text-[11px] font-medium">
                                github-actions[bot]
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">
                                {(log.adminEmail[0] || "A").toUpperCase()}
                              </div>
                              <span
                                className="font-mono text-[11px] truncate max-w-[130px]"
                                title={log.adminEmail}
                              >
                                {log.adminEmail}
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3 align-top text-right font-mono text-[11px] text-neutral-500 dark:text-neutral-400 whitespace-nowrap tabular-nums">
                        <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                        <div className="text-[10px] opacity-75">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="px-3 py-3 align-top text-center">
                        <button
                          type="button"
                          onClick={() => onInspectLog(log)}
                          className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.08] text-neutral-500 hover:text-indigo-500 transition-colors cursor-pointer"
                          title="Inspect JSON payload"
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
  );
};

interface PipelineCardProps {
  title: string;
  schedule: string;
  icon: React.ReactNode;
  iconBg: string;
  selected: boolean;
  runCount: number;
  latestRun?: AuditLogItem;
  filterLabel: string;
  onClick: () => void;
}

const PipelineCard: React.FC<PipelineCardProps> = ({
  title,
  schedule,
  icon,
  iconBg,
  selected,
  runCount,
  latestRun,
  filterLabel,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
      selected
        ? "border-indigo-500/60 ring-2 ring-indigo-500/15 bg-indigo-50/40 dark:bg-indigo-500/10"
        : "border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] hover:border-neutral-300 dark:hover:border-white/20"
    }`}
  >
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-2.5">
        <div
          className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xs font-semibold text-neutral-900 dark:text-white">
            {title}
          </h3>
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
            {schedule}
          </p>
        </div>
      </div>

      {latestRun ? (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
            latestRun.status === "error"
              ? "bg-rose-500/12 text-rose-600 dark:text-rose-300"
              : "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              latestRun.status === "error"
                ? "bg-rose-500"
                : "bg-emerald-500 animate-pulse"
            }`}
          />
          {latestRun.status === "error" ? "Failed" : "Operational"}
        </span>
      ) : (
        <span className="text-[10px] text-neutral-500 bg-neutral-100 dark:bg-white/[0.06] px-2 py-0.5 rounded-full">
          Scheduled
        </span>
      )}
    </div>

    <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-white/[0.06] text-xs">
      {latestRun ? (
        <div className="space-y-1">
          <p className="text-[11px] font-medium text-neutral-800 dark:text-neutral-200 truncate">
            {latestRun.summary || latestRun.details}
          </p>
          <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
            <span>
              Last Run: {new Date(latestRun.timestamp).toLocaleTimeString()} (
              {new Date(latestRun.timestamp).toLocaleDateString()})
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              {selected ? filterLabel : `View ${runCount} Runs →`}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          No execution history recorded in this session.
        </p>
      )}
    </div>
  </button>
);
