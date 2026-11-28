import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Gauge,
  PieChart,
  Sparkles,
  Trophy,
} from "lucide-react";
import { LEADERBOARD_MODELS, type LeaderboardModel } from "../../data/leaderboardData";
import {
  computeLicenseMix,
  computeTaxonomyBreakdown,
  computeTopTasks,
  getTopFrontierModels,
} from "../../lib/dashboard";
import { useTheme } from "../../lib/theme";
import type { Entry, TaskFilter, TypeFilter } from "../../types";
import { LabLogo } from "../LabLogo";

interface DashboardAnalyticsBentoProps {
  entries: Entry[];
  onSelectEntry: (entry: Entry) => void;
  onFilterByType: (type: TypeFilter) => void;
  onFilterByTask: (task: TaskFilter) => void;
  onOpenLeaderboard: () => void;
}

type LeftViewMode = "types" | "licenses" | "tasks";
type RightViewMode = "ranked" | "scatter";

export const DashboardAnalyticsBento: React.FC<DashboardAnalyticsBentoProps> = ({
  entries,
  onSelectEntry,
  onFilterByType,
  onFilterByTask,
  onOpenLeaderboard,
}) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";

  // Left panel: Taxonomy / License / Tasks
  const [leftView, setLeftView] = useState<LeftViewMode>("types");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Right panel: Frontier Leaderboard Pulse
  const [rightView, setRightView] = useState<RightViewMode>("ranked");
  const [weightsFilter, setWeightsFilter] = useState<"All" | "Open" | "Proprietary">("All");
  const [reasoningOnly, setReasoningOnly] = useState(false);
  const [hoveredModelId, setHoveredModelId] = useState<string | null>(null);

  const taxonomySlices = useMemo(() => computeTaxonomyBreakdown(entries), [entries]);
  const licenseSlices = useMemo(() => computeLicenseMix(entries), [entries]);
  const topTasks = useMemo(() => computeTopTasks(entries, 7), [entries]);
  const maxTaskCount = topTasks[0]?.count || 1;

  const activeDonutData = useMemo(() => {
    const source =
      leftView === "licenses"
        ? licenseSlices.map((s) => ({
            key: s.id,
            label: s.label,
            count: s.count,
            pct: s.pct,
            stroke: s.stroke,
            dotClass: s.dotClass,
            filterType: undefined as TypeFilter | undefined,
          }))
        : taxonomySlices.map((s) => ({
            key: s.type,
            label: s.label,
            count: s.count,
            pct: s.pct,
            stroke: s.stroke,
            dotClass: s.dotClass,
            filterType: s.type as TypeFilter,
          }));

    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    const total = entries.length || 1;

    let offset = 0;
    const segments = source.map((item) => {
      const dashLength = (item.count / total) * circumference;
      const seg = {
        ...item,
        dashLength,
        dashOffset: -offset,
      };
      offset += dashLength;
      return seg;
    });

    return { radius, circumference, segments };
  }, [entries.length, leftView, licenseSlices, taxonomySlices]);

  const hoveredSlice = hoveredKey
    ? activeDonutData.segments.find((s) => s.key === hoveredKey)
    : null;

  const rankedModels = useMemo(
    () =>
      getTopFrontierModels(LEADERBOARD_MODELS, {
        weights: weightsFilter,
        reasoningOnly,
        limit: 6,
      }),
    [weightsFilter, reasoningOnly],
  );

  const scatterModels = useMemo(
    () =>
      getTopFrontierModels(LEADERBOARD_MODELS, {
        weights: weightsFilter,
        reasoningOnly,
        limit: 24,
      }).filter(
        (m) =>
          typeof m.speedMedian === "number" &&
          m.speedMedian > 0 &&
          typeof m.intelligenceIndex === "number",
      ),
    [weightsFilter, reasoningOnly],
  );

  const scatterBounds = useMemo(() => {
    if (scatterModels.length === 0) {
      return { maxSpeed: 300, minIntel: 20, maxIntel: 70 };
    }
    const speeds = scatterModels.map((m) => m.speedMedian ?? 0);
    const intels = scatterModels.map((m) => m.intelligenceIndex ?? 0);
    return {
      maxSpeed: Math.max(250, Math.ceil(Math.max(...speeds) / 50) * 50),
      minIntel: Math.max(0, Math.floor(Math.min(...intels) / 5) * 5 - 5),
      maxIntel: Math.min(100, Math.ceil(Math.max(...intels) / 5) * 5 + 3),
    };
  }, [scatterModels]);

  const hoveredScatterModel = hoveredModelId
    ? scatterModels.find((m) => m.id === hoveredModelId) ?? null
    : null;

  const handleOpenLeaderboardModel = (m: LeaderboardModel) => {
    const target = m.releaseName.toLowerCase();
    const match = entries.find(
      (e) =>
        e.name.toLowerCase() === target ||
        e.name.toLowerCase().includes(target) ||
        target.includes(e.name.toLowerCase()),
    );
    if (match) {
      onSelectEntry(match);
    } else {
      onOpenLeaderboard();
    }
  };

  return (
    <section
      aria-label="Catalog Telemetry and Frontier Benchmark Pulse"
      className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full text-left"
    >
      {/* ── Left Panel (5 cols): Interactive Taxonomy / License / Task Intelligence ── */}
      <div
        className={`lg:col-span-5 p-5 sm:p-6 rounded-2xl border flex flex-col justify-between gap-5 ${
          isAmoled
            ? "bg-[#0c0d11] border-white/[0.08]"
            : "bg-white border-neutral-200/85 shadow-xs"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-neutral-200/70 dark:border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PieChart size={14} className="text-indigo-500" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Catalog Architecture
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
              Ecosystem Breakdown
            </h3>
          </div>

          <div
            className={`inline-flex items-center p-1 rounded-xl border self-start sm:self-auto ${
              isAmoled
                ? "bg-[#121319] border-white/[0.08]"
                : "bg-neutral-100 border-neutral-200/80"
            }`}
          >
            {(
              [
                { id: "types", label: "Types" },
                { id: "licenses", label: "Licenses" },
                { id: "tasks", label: "Tasks" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setLeftView(item.id);
                  setHoveredKey(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  leftView === item.id
                    ? isAmoled
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      : "bg-white text-indigo-600 shadow-2xs"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-transparent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {leftView === "tasks" ? (
          <div className="space-y-3 flex-1">
            {topTasks.map((t) => {
              const widthPct = Math.max(6, Math.round((t.count / maxTaskCount) * 100));
              return (
                <button
                  key={t.task}
                  type="button"
                  onClick={() => onFilterByTask(t.task as TaskFilter)}
                  className="w-full text-left group cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {t.task}
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
                      {t.count} ({t.pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 group-hover:brightness-110 transition-all duration-300"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-5 flex-1">
            {/* Interactive SVG Donut */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90" aria-hidden="true">
                <circle
                  cx="75"
                  cy="75"
                  r={activeDonutData.radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="16"
                  className="text-neutral-100 dark:text-white/[0.06]"
                />
                {activeDonutData.segments.map((seg) => {
                  const isHovered = hoveredKey === seg.key;
                  const dimmed = hoveredKey !== null && !isHovered;
                  return (
                    <circle
                      key={seg.key}
                      cx="75"
                      cy="75"
                      r={activeDonutData.radius}
                      fill="none"
                      stroke={seg.stroke}
                      strokeWidth={isHovered ? 20 : 16}
                      strokeDasharray={`${seg.dashLength} ${activeDonutData.circumference}`}
                      strokeDashoffset={seg.dashOffset}
                      strokeLinecap="butt"
                      onMouseEnter={() => setHoveredKey(seg.key)}
                      onMouseLeave={() => setHoveredKey(null)}
                      onClick={() => seg.filterType && onFilterByType(seg.filterType)}
                      className="transition-all duration-200 cursor-pointer"
                      style={{ opacity: dimmed ? 0.35 : 1 }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-3">
                <span className="text-2xl font-bold tabular-nums text-neutral-900 dark:text-white">
                  {hoveredSlice ? hoveredSlice.count : entries.length}
                </span>
                <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 truncate max-w-[92px]">
                  {hoveredSlice ? `${hoveredSlice.pct}% share` : "Total Assets"}
                </span>
              </div>
            </div>

            {/* Interactive Legend */}
            <div className="flex-1 w-full space-y-1.5">
              {activeDonutData.segments.map((seg) => {
                const isHovered = hoveredKey === seg.key;
                return (
                  <button
                    key={seg.key}
                    type="button"
                    onMouseEnter={() => setHoveredKey(seg.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() => seg.filterType && onFilterByType(seg.filterType)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      seg.filterType ? "cursor-pointer" : "cursor-default"
                    } ${
                      isHovered
                        ? isAmoled
                          ? "bg-white/[0.08]"
                          : "bg-neutral-100"
                        : isAmoled
                        ? "hover:bg-white/[0.04]"
                        : "hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${seg.dotClass}`} />
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
                        {seg.label}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400 shrink-0 ml-2">
                      {seg.count} ({seg.pct}%)
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-neutral-200/70 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
          <span>
            {leftView === "tasks"
              ? "Click any task bar to filter catalog"
              : leftView === "types"
              ? "Click any slice to open filtered directory"
              : "License distribution across all verified entries"}
          </span>
          <button
            type="button"
            onClick={() => onFilterByType("All")}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Explore</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </div>

      {/* ── Right Panel (7 cols): Frontier Benchmark Intelligence Pulse ── */}
      <div
        className={`lg:col-span-7 p-5 sm:p-6 rounded-2xl border flex flex-col justify-between gap-4 ${
          isAmoled
            ? "bg-[#0c0d11] border-white/[0.08]"
            : "bg-white border-neutral-200/85 shadow-xs"
        }`}
      >
        <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-3 pb-3.5 border-b border-neutral-200/70 dark:border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy size={14} className="text-amber-500" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Artificial Analysis Sync
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
              Frontier Benchmark Pulse
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Weights Filter */}
            <div
              className={`inline-flex items-center p-0.5 rounded-xl border ${
                isAmoled
                  ? "bg-[#121319] border-white/[0.08]"
                  : "bg-neutral-100 border-neutral-200/80"
              }`}
            >
              {(["All", "Open", "Proprietary"] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeightsFilter(w)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    weightsFilter === w
                      ? isAmoled
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "bg-white text-indigo-600 shadow-2xs"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-transparent"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>

            {/* Reasoning Filter */}
            <button
              type="button"
              onClick={() => setReasoningOnly((r) => !r)}
              aria-pressed={reasoningOnly}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                reasoningOnly
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/35"
                  : isAmoled
                  ? "border-white/[0.08] bg-[#121319] text-neutral-400 hover:text-white"
                  : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Sparkles size={11} />
              <span>Reasoning</span>
            </button>

            {/* View Mode Toggle: Ranked vs Scatter */}
            <div
              className={`inline-flex items-center p-0.5 rounded-xl border ${
                isAmoled
                  ? "bg-[#121319] border-white/[0.08]"
                  : "bg-neutral-100 border-neutral-200/80"
              }`}
            >
              <button
                type="button"
                onClick={() => setRightView("ranked")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  rightView === "ranked"
                    ? isAmoled
                      ? "bg-white/10 text-white"
                      : "bg-white text-neutral-900 shadow-2xs"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <BarChart3 size={11} />
                <span>Top 6</span>
              </button>
              <button
                type="button"
                onClick={() => setRightView("scatter")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  rightView === "scatter"
                    ? isAmoled
                      ? "bg-white/10 text-white"
                      : "bg-white text-neutral-900 shadow-2xs"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Gauge size={11} />
                <span>Speed × IQ</span>
              </button>
            </div>
          </div>
        </div>

        {rightView === "ranked" ? (
          <div className="space-y-2.5">
            {rankedModels.map((model, idx) => {
              const score = model.intelligenceIndex ?? 0;
              const barPct = Math.max(8, Math.min(100, Math.round((score / 70) * 100)));
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => handleOpenLeaderboardModel(model)}
                  className={`w-full group flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isAmoled
                      ? "bg-[#121319] border-white/[0.06] hover:border-indigo-500/35 hover:bg-[#161824]"
                      : "bg-neutral-50/70 border-neutral-200/70 hover:bg-white hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span
                      className={`w-5 text-xs font-mono font-bold tabular-nums shrink-0 ${
                        idx === 0
                          ? "text-amber-500"
                          : idx === 1
                          ? "text-neutral-400"
                          : idx === 2
                          ? "text-amber-700 dark:text-amber-600"
                          : "text-neutral-400"
                      }`}
                    >
                      #{idx + 1}
                    </span>
                    <LabLogo creator={model.creator} size={18} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {model.releaseName}
                        </span>
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${
                            model.license === "Open"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : isAmoled
                              ? "bg-white/[0.04] text-neutral-400 border-white/10"
                              : "bg-white text-neutral-600 border-neutral-200"
                          }`}
                        >
                          {model.license}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                        {model.creator} · {model.contextWindow} ctx ·{" "}
                        {model.speedMedian ? `${Math.round(model.speedMedian)} tok/s` : "--"}
                      </p>
                    </div>
                  </div>

                  {/* Intelligence Index Bar */}
                  <div className="flex items-center gap-3 sm:w-48 shrink-0">
                    <div className="flex-1 h-2 rounded-full bg-neutral-200/80 dark:bg-white/[0.07] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs font-mono font-bold tabular-nums text-neutral-900 dark:text-white">
                      {score}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Interactive Intelligence vs Speed Scatter Plot */
          <div className="space-y-2.5">
            <div
              className={`relative rounded-xl border p-3 ${
                isAmoled
                  ? "bg-[#090a0e] border-white/[0.06]"
                  : "bg-neutral-50/70 border-neutral-200/70"
              }`}
            >
              <svg
                viewBox="0 0 520 210"
                className="w-full h-52 overflow-visible"
                role="img"
                aria-label="Scatter plot comparing model Intelligence Index against generation speed in tokens per second"
              >
                {/* Horizontal gridlines */}
                {[0.2, 0.5, 0.8].map((frac) => {
                  const y = 180 - frac * 155;
                  const val = Math.round(
                    scatterBounds.minIntel +
                      frac * (scatterBounds.maxIntel - scatterBounds.minIntel),
                  );
                  return (
                    <g key={frac}>
                      <line
                        x1="36"
                        x2="504"
                        y1={y}
                        y2={y}
                        stroke="currentColor"
                        strokeDasharray="3 4"
                        className="text-neutral-200 dark:text-white/[0.08]"
                      />
                      <text
                        x="30"
                        y={y + 3}
                        textAnchor="end"
                        className="fill-neutral-400 text-[9px] font-mono"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Axis Labels */}
                <text x="36" y="12" className="fill-neutral-400 text-[9px] font-semibold">
                  Intelligence Index ↑
                </text>
                <text
                  x="504"
                  y="204"
                  textAnchor="end"
                  className="fill-neutral-400 text-[9px] font-semibold"
                >
                  Median Speed (tok/s) →
                </text>

                {/* Data Points */}
                {scatterModels.map((m) => {
                  const speed = m.speedMedian ?? 0;
                  const intel = m.intelligenceIndex ?? 0;
                  const x = 42 + Math.min(1, speed / scatterBounds.maxSpeed) * 452;
                  const yNorm =
                    (intel - scatterBounds.minIntel) /
                    Math.max(1, scatterBounds.maxIntel - scatterBounds.minIntel);
                  const y = 180 - Math.max(0, Math.min(1, yNorm)) * 155;
                  const isHovered = hoveredModelId === m.id;
                  const fill = m.license === "Open" ? "#10b981" : "#6366f1";

                  return (
                    <g
                      key={m.id}
                      onMouseEnter={() => setHoveredModelId(m.id)}
                      onMouseLeave={() => setHoveredModelId(null)}
                      onClick={() => handleOpenLeaderboardModel(m)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 11 : 7}
                        fill={fill}
                        fillOpacity={isHovered ? 0.25 : 0.14}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 5.5 : 4}
                        fill={fill}
                        stroke={isAmoled ? "#090a0e" : "#ffffff"}
                        strokeWidth="1.5"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Active Tooltip Readout Bar */}
              <div className="mt-2 pt-2 border-t border-neutral-200/70 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                {hoveredScatterModel ? (
                  <>
                    <div className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-white">
                      <LabLogo creator={hoveredScatterModel.creator} size={14} />
                      <span>{hoveredScatterModel.releaseName}</span>
                      <span className="text-neutral-400 font-normal">
                        ({hoveredScatterModel.creator})
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-neutral-600 dark:text-neutral-300">
                      <span>IQ {hoveredScatterModel.intelligenceIndex}</span>
                      <span>{Math.round(hoveredScatterModel.speedMedian ?? 0)} tok/s</span>
                      <span>
                        {hoveredScatterModel.costPerTask !== null
                          ? `$${hoveredScatterModel.costPerTask.toFixed(2)}/task`
                          : hoveredScatterModel.license}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" /> Proprietary
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Open Weights
                      </span>
                    </div>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      Hover or click any point to inspect model
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-neutral-200/70 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
          <span>
            Showing {rightView === "ranked" ? rankedModels.length : scatterModels.length} frontier releases
          </span>
          <button
            type="button"
            onClick={onOpenLeaderboard}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Full Benchmark Leaderboard</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </section>
  );
};
