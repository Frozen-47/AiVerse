import React from "react";
import { Star, Layers, Box, Database, Server, LayoutGrid, Bot } from "lucide-react";
import { useTokens } from "../lib/theme";
import { typeFilters, taskFilters } from "../data";
import type { Entry, TypeFilter, TaskFilter } from "../types";

interface SidebarProps {
  entries: Entry[];
  currentFilter: TypeFilter;
  currentTask: TaskFilter;
  popularOnly: boolean;
  filteredCount: number;
  onTypeFilter: (f: TypeFilter) => void;
  onTaskFilter: (f: TaskFilter) => void;
  onPopularToggle: () => void;
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  All: <LayoutGrid size={14} />,
  AI: <Bot size={14} />,
  Framework: <Layers size={14} />,
  Dataset: <Database size={14} />,
  Platform: <Server size={14} />,
  Model: <Box size={14} />,
};

const TASK_COLORS: Record<string, string> = {
  "All Tasks": "bg-white/10",
  NLP: "bg-blue-500",
  "Computer Vision": "bg-rose-500",
  MLOps: "bg-orange-500",
  Audio: "bg-teal-500",
  Multimodal: "bg-purple-500",
  "AI Coding": "bg-indigo-500",
  "Image Generation": "bg-pink-500",
  "Video Generation": "bg-red-500",
  "Productivity": "bg-fuchsia-500",
  "Education": "bg-green-500",
  "Research": "bg-amber-500"
};

export const Sidebar: React.FC<SidebarProps> = ({
  entries,
  currentFilter,
  currentTask,
  popularOnly,
  filteredCount,
  onTypeFilter,
  onTaskFilter,
  onPopularToggle,
}) => {
  const t = useTokens();

  const typeCounts = typeFilters.reduce<Record<string, number>>((acc, f) => {
    acc[f] = f === "All" ? entries.length : entries.filter((e) => e.type === f).length;
    return acc;
  }, {});

  const taskCounts = taskFilters.reduce<Record<string, number>>((acc, f) => {
    acc[f] = f === "All Tasks" ? entries.length : entries.filter((e) => e.task === f).length;
    return acc;
  }, {});

  const popularCount = entries.filter((e) => e.popular).length;

  return (
    <aside className="w-56 shrink-0 flex flex-col gap-6">
      {/* Stats */}
      <div className={`rounded-2xl border p-4 ${t.surface} ${t.border}`}>
        <p className={`text-[10px] uppercase tracking-widest font-semibold mb-3 ${t.textMuted}`}>
          Overview
        </p>
        <div className="space-y-2">
          {[
            { label: "Total Entries", value: entries.length, color: t.textAccent },
            { label: "AI Assistants", value: typeCounts["AI"], color: "text-pink-400" },
            { label: "Models", value: typeCounts["Model"], color: "text-violet-400" },
            { label: "Frameworks", value: typeCounts["Framework"], color: "text-amber-400" },
            { label: "Datasets", value: typeCounts["Dataset"], color: "text-sky-400" },
            { label: "Platforms", value: typeCounts["Platform"], color: "text-emerald-400" },
            { label: "Popular", value: popularCount, color: "text-amber-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between">
              <span className={`text-[12px] ${t.textSecondary}`}>{label}</span>
              <span className={`text-[13px] font-black tabular-nums ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 px-1 ${t.textMuted}`}>
          Type
        </p>
        <div className="space-y-0.5">
          {typeFilters.map((f) => (
            <button
              key={f}
              onClick={() => onTypeFilter(f as TypeFilter)}
              className={`
                w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium
                transition-all duration-150
                ${currentFilter === f ? t.sidebarActive : t.sidebarItem}
              `}
            >
              <span className="opacity-70">{TYPE_ICONS[f]}</span>
              <span className="flex-1 text-left">{f}</span>
              <span className={`text-[11px] tabular-nums font-semibold ${currentFilter === f ? "" : t.textMuted}`}>
                {typeCounts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Task Filter */}
      <div>
        <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 px-1 ${t.textMuted}`}>
          Task
        </p>
        <div className="space-y-0.5">
          {taskFilters.map((f) => (
            <button
              key={f}
              onClick={() => onTaskFilter(f as TaskFilter)}
              className={`
                w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium
                transition-all duration-150
                ${currentTask === f ? t.sidebarActive : t.sidebarItem}
              `}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${TASK_COLORS[f] ?? "bg-gray-500"} ${f === "All Tasks" ? "opacity-30" : "opacity-80"}`}
              />
              <span className="flex-1 text-left truncate">{f}</span>
              <span className={`text-[11px] tabular-nums font-semibold ${currentTask === f ? "" : t.textMuted}`}>
                {taskCounts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular toggle */}
      <div>
        <button
          onClick={onPopularToggle}
          className={`
            w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium
            transition-all duration-150
            ${popularOnly ? t.sidebarActive : t.sidebarItem}
          `}
        >
          <Star size={14} className={popularOnly ? "fill-current" : ""} />
          <span className="flex-1 text-left">Popular only</span>
          <span className={`text-[11px] tabular-nums font-semibold ${popularOnly ? "" : t.textMuted}`}>
            {popularCount}
          </span>
        </button>
      </div>

      {/* Result count */}
      <div className={`text-[11px] px-1 ${t.textMuted}`}>
        Showing <span className={`font-bold ${t.textSecondary}`}>{filteredCount}</span> of {entries.length} entries
      </div>
    </aside>
  );
};
