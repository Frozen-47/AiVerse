import React, { useState } from "react";
import {
  Activity,
  Database,
  FileJson,
  Server,
  Star,
  Users,
} from "lucide-react";
import type { Entry } from "../../types";
import type { SiteAnnouncement } from "../../lib/announcements";
import type { UserProfile } from "./types";

interface AdminTelemetrySectionProps {
  approvedEntries: Entry[];
  pendingEntries: Entry[];
  users: UserProfile[];
  featuredCount: number;
  typeCounts: Record<string, number>;
  taskCounts: [string, number][];
  announcement: SiteAnnouncement;
  onExportJson: (data: unknown, filename: string) => void;
  onJumpToInfrastructure: () => void;
}

const CATEGORY_SERIES = [
  { type: "Model", label: "Models & LLMs", stroke: "#8b5cf6", dot: "bg-violet-500" },
  { type: "Platform", label: "Platforms & Compute", stroke: "#0ea5e9", dot: "bg-sky-500" },
  { type: "Dataset", label: "Datasets & Corpora", stroke: "#10b981", dot: "bg-emerald-500" },
  { type: "AI", label: "AI Applications", stroke: "#f43f5e", dot: "bg-rose-500" },
  { type: "Framework", label: "Frameworks & Libraries", stroke: "#f59e0b", dot: "bg-amber-500" },
] as const;

export const AdminTelemetrySection: React.FC<AdminTelemetrySectionProps> = ({
  approvedEntries,
  pendingEntries,
  users,
  featuredCount,
  typeCounts,
  taskCounts,
  announcement,
  onExportJson,
  onJumpToInfrastructure,
}) => {
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  const total = approvedEntries.length;
  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  const segments = CATEGORY_SERIES.reduce<
    Array<{
      type: string;
      label: string;
      stroke: string;
      dot: string;
      count: number;
      pct: number;
      dashLength: number;
      dashOffset: number;
    }>
  >((acc, cat) => {
    const count = typeCounts[cat.type] || 0;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    const dashLength = total > 0 ? (count / total) * circumference : 0;
    const prevSum = acc.reduce((sum, s) => sum + s.dashLength, 0);
    acc.push({
      ...cat,
      count,
      pct,
      dashLength,
      dashOffset: -prevSum,
    });
    return acc;
  }, []);

  const activeSegment = hoveredType
    ? segments.find((s) => s.type === hoveredType)
    : null;

  const topTasks = taskCounts.slice(0, 8);
  const maxTaskCount = topTasks.length > 0 ? topTasks[0][1] : 1;
  const suspendedCount = users.filter((u) => u.isBlocked).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
          Cloud Telemetry & Analytics
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Real-time catalog taxonomy distribution, task domain coverage, and cold-storage backup snapshots.
        </p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          {
            label: "Active Catalog",
            value: approvedEntries.length,
            sub: "Verified live assets",
            accent: "text-indigo-600 dark:text-indigo-400",
          },
          {
            label: "Review Queue",
            value: pendingEntries.length,
            sub: "Awaiting audit",
            accent: "text-amber-600 dark:text-amber-400",
          },
          {
            label: "Builders",
            value: users.length,
            sub: "Registered accounts",
            accent: "text-emerald-600 dark:text-emerald-400",
          },
          {
            label: "Featured",
            value: featuredCount,
            sub: "Spotlighted on home",
            accent: "text-violet-600 dark:text-violet-400",
            icon: <Star size={12} className="inline fill-amber-400 text-amber-400 mr-1" />,
          },
          {
            label: "Suspended",
            value: suspendedCount,
            sub: "Access restricted",
            accent: "text-rose-600 dark:text-rose-400",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] flex flex-col justify-between"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {item.label}
            </p>
            <div className="my-2">
              <span className={`text-2xl sm:text-3xl font-bold tabular-nums ${item.accent}`}>
                {item.value.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {item.icon}
              {item.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Bento Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Interactive Donut Chart: Category Distribution */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Catalog Mix
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Hover a ring slice or category to inspect
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400">
              {total} total
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-1">
            {/* SVG Donut */}
            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
                <circle
                  cx="75"
                  cy="75"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="16"
                  className="text-neutral-100 dark:text-white/[0.06]"
                />
                {segments.map((seg) => {
                  const isHovered = hoveredType === seg.type;
                  const dimmed = hoveredType !== null && !isHovered;
                  return (
                    <circle
                      key={seg.type}
                      cx="75"
                      cy="75"
                      r={radius}
                      fill="none"
                      stroke={seg.stroke}
                      strokeWidth={isHovered ? 20 : 16}
                      strokeDasharray={`${seg.dashLength} ${circumference}`}
                      strokeDashoffset={seg.dashOffset}
                      strokeLinecap="butt"
                      onMouseEnter={() => setHoveredType(seg.type)}
                      onMouseLeave={() => setHoveredType(null)}
                      className="transition-all duration-200 cursor-pointer"
                      style={{ opacity: dimmed ? 0.35 : 1 }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-3">
                <span className="text-2xl font-bold tabular-nums text-neutral-900 dark:text-white">
                  {activeSegment ? activeSegment.count : total}
                </span>
                <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 truncate max-w-[92px]">
                  {activeSegment ? `${activeSegment.type} (${activeSegment.pct}%)` : "Live Assets"}
                </span>
              </div>
            </div>

            {/* Interactive Legend */}
            <div className="flex-1 w-full space-y-2">
              {segments.map((seg) => {
                const isHovered = hoveredType === seg.type;
                return (
                  <div
                    key={seg.type}
                    onMouseEnter={() => setHoveredType(seg.type)}
                    onMouseLeave={() => setHoveredType(null)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                      isHovered
                        ? "bg-neutral-100 dark:bg-white/[0.07]"
                        : "hover:bg-neutral-50 dark:hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${seg.dot}`} />
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
                        {seg.label}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 tabular-nums shrink-0 ml-2">
                      {seg.count} ({seg.pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Task Domains Bar Chart */}
        <div className="lg:col-span-7 p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Top Task Domains
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Leading functional specialties across verified catalog entries
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {taskCounts.length} domains
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {topTasks.map(([taskName, count]) => {
              const barPct = Math.max(4, Math.round((count / maxTaskCount) * 100));
              const sharePct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={taskName} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {taskName}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 tabular-nums">
                      {count} ({sharePct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 transition-all duration-300"
                      style={{ width: `${barPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cold Storage Snapshot Vault */}
      <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
            Database Snapshots & Cold Storage
          </h3>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Download point-in-time JSON backups or jump into the live Supabase table explorer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <button
            type="button"
            onClick={() => onExportJson(approvedEntries, "aiverse_catalog_approved")}
            className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] hover:border-indigo-500/40 bg-neutral-50/50 dark:bg-white/[0.02] text-left cursor-pointer transition-all"
          >
            <FileJson size={18} className="text-violet-500 mb-2" />
            <p className="text-xs font-semibold text-neutral-900 dark:text-white">
              Catalog Assets
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              {approvedEntries.length} verified tools
            </p>
          </button>

          <button
            type="button"
            onClick={() => onExportJson(users, "aiverse_builders_directory")}
            className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] hover:border-emerald-500/40 bg-neutral-50/50 dark:bg-white/[0.02] text-left cursor-pointer transition-all"
          >
            <Users size={18} className="text-emerald-500 mb-2" />
            <p className="text-xs font-semibold text-neutral-900 dark:text-white">
              Builder Directory
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              {users.length} accounts
            </p>
          </button>

          <button
            type="button"
            onClick={() => onExportJson(pendingEntries, "aiverse_pending_queue")}
            className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] hover:border-amber-500/40 bg-neutral-50/50 dark:bg-white/[0.02] text-left cursor-pointer transition-all"
          >
            <Server size={18} className="text-amber-500 mb-2" />
            <p className="text-xs font-semibold text-neutral-900 dark:text-white">
              Review Queue
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              {pendingEntries.length} pending items
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              onExportJson(
                {
                  catalog: approvedEntries,
                  users,
                  pending: pendingEntries,
                  announcement,
                  exportedAt: new Date().toISOString(),
                },
                "aiverse_complete_system_backup",
              )
            }
            className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] hover:border-sky-500/40 bg-neutral-50/50 dark:bg-white/[0.02] text-left cursor-pointer transition-all"
          >
            <Database size={18} className="text-sky-500 mb-2" />
            <p className="text-xs font-semibold text-neutral-900 dark:text-white">
              Full Cloud Snapshot
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Complete JSON bundle
            </p>
          </button>

          <button
            type="button"
            onClick={onJumpToInfrastructure}
            className="p-3.5 rounded-xl border border-indigo-500/30 bg-indigo-50/70 dark:bg-indigo-500/10 hover:border-indigo-500/60 text-left cursor-pointer transition-all"
          >
            <Activity size={18} className="text-indigo-600 dark:text-indigo-400 mb-2" />
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              Supabase Console
            </p>
            <p className="text-[11px] text-indigo-600/80 dark:text-indigo-300/70 mt-0.5">
              Live DB & Storage explorer
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
