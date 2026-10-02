import React, { memo, useMemo } from "react";
import { Star, Layers, Box, Database, Server, LayoutGrid, Bot, Bookmark, RotateCcw } from "lucide-react";
import type { Entry, TypeFilter, TaskFilter } from "../types";

interface SidebarProps {
  entries: Entry[];
  currentFilter: TypeFilter;
  currentTask: TaskFilter;
  typeFilters: string[];
  taskFilters: string[];
  popularOnly: boolean;
  filteredCount: number;
  onTypeFilter: (f: TypeFilter) => void;
  onTaskFilter: (f: TaskFilter) => void;
  onPopularToggle: () => void;
  savedOnly?: boolean;
  savedCount?: number;
  onSavedToggle?: () => void;
  onResetFilters?: () => void;
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  All: <LayoutGrid size={13} />,
  AI: <Bot size={13} />,
  Framework: <Layers size={13} />,
  Dataset: <Database size={13} />,
  Platform: <Server size={13} />,
  Model: <Box size={13} />,
};

export const Sidebar = memo(function Sidebar({
  entries,
  currentFilter,
  currentTask,
  typeFilters,
  taskFilters,
  popularOnly,
  filteredCount,
  onTypeFilter,
  onTaskFilter,
  onPopularToggle,
  savedOnly,
  savedCount = 0,
  onSavedToggle,
  onResetFilters,
}: SidebarProps) {
  const { typeCounts, taskCounts, popularCount } = useMemo(() => {
    const byType: Record<string, number> = {};
    const byTask: Record<string, number> = {};
    let popular = 0;
    for (const e of entries) {
      byType[e.type] = (byType[e.type] ?? 0) + 1;
      byTask[e.task] = (byTask[e.task] ?? 0) + 1;
      if (e.popular) popular++;
    }
    const typeCounts = typeFilters.reduce<Record<string, number>>((acc, f) => {
      acc[f] = f === "All" ? entries.length : byType[f] ?? 0;
      return acc;
    }, {});
    const taskCounts = taskFilters.reduce<Record<string, number>>((acc, f) => {
      acc[f] = f === "All Tasks" ? entries.length : byTask[f] ?? 0;
      return acc;
    }, {});
    return { typeCounts, taskCounts, popularCount: popular };
  }, [entries, typeFilters, taskFilters]);

  const hasActiveFilters =
    currentFilter !== "All" ||
    currentTask !== "All Tasks" ||
    popularOnly ||
    !!savedOnly;

  const handleReset = () => {
    if (onResetFilters) {
      onResetFilters();
    } else {
      onTypeFilter("All");
      onTaskFilter("All Tasks");
      if (popularOnly) onPopularToggle();
      if (savedOnly && onSavedToggle) onSavedToggle();
    }
  };

  return (
    <aside className="w-full flex flex-col gap-4">
      {/* Google Cloud Resource Filter Panel */}
      <div className="rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl p-4 space-y-5 shadow-xs">
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-bold tracking-tight text-neutral-900 dark:text-white uppercase">
              Filter Resources
            </span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer transition-all"
            >
              <RotateCcw size={10} />
              Reset
            </button>
          )}
        </div>

        {/* Collections Section */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2 px-1">
            Collections
          </p>
          <div className="space-y-1">
            {onSavedToggle && (
              <button
                onClick={onSavedToggle}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  savedOnly
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.04] hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bookmark size={13} className={savedOnly ? "fill-current" : "opacity-70"} />
                  <span>Bookmarks</span>
                </div>
                <span className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full ${
                  savedOnly ? "bg-white/20 dark:bg-black/20" : "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400"
                }`}>
                  {savedCount}
                </span>
              </button>
            )}

            <button
              onClick={onPopularToggle}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                popularOnly
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.04] hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Star size={13} className={popularOnly ? "fill-current text-amber-400" : "opacity-70"} />
                <span>Featured</span>
              </div>
              <span className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full ${
                popularOnly ? "bg-white/20 dark:bg-black/20" : "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400"
              }`}>
                {popularCount}
              </span>
            </button>
          </div>
        </div>

        {/* Category Type Filter */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2 px-1">
            Category
          </p>
          <div className="space-y-1">
            {typeFilters.map((f) => {
              const isSelected = currentFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => onTypeFilter(f as TypeFilter)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.04] hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={isSelected ? "text-white dark:text-black" : "opacity-70"}>
                      {TYPE_ICONS[f] ?? <Box size={13} />}
                    </span>
                    <span>{f === "All" ? "All Categories" : f}</span>
                  </div>
                  <span className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 dark:bg-black/20" : "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400"
                  }`}>
                    {typeCounts[f]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Task Domain Filter */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2 px-1">
            Domain / Task
          </p>
          <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
            {taskFilters.map((f) => {
              const isSelected = currentTask === f;
              return (
                <button
                  key={f}
                  onClick={() => onTaskFilter(f as TaskFilter)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.04] hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isSelected ? "bg-blue-400" : "bg-neutral-400 dark:bg-neutral-600"
                    }`} />
                    <span className="truncate">{f}</span>
                  </div>
                  <span className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full shrink-0 ${
                    isSelected ? "bg-white/20 dark:bg-black/20" : "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400"
                  }`}>
                    {taskCounts[f]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Footer */}
        <div className="pt-3 border-t border-neutral-100 dark:border-white/[0.06] text-[11px] text-neutral-400 dark:text-neutral-500 flex items-center justify-between px-1">
          <span>Matching Assets</span>
          <span className="font-bold text-neutral-900 dark:text-white tabular-nums">
            {filteredCount} / {entries.length}
          </span>
        </div>
      </div>
    </aside>
  );
});
