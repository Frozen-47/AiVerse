import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  ExternalLink,
  Eye,
  LayoutGrid,
  List,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import type { Entry } from "../../types";
import { typeBadge, useTokens } from "../../lib/theme";
import type { CatalogSortBy } from "./types";

interface AdminDirectorySectionProps {
  approvedEntries: Entry[];
  filteredApproved: Entry[];
  paginatedApproved: Entry[];
  typeCounts: Record<string, number>;
  taskCounts: [string, number][];
  featuredCount: number;
  catalogViewMode: "table" | "grid";
  onViewModeChange: (mode: "table" | "grid") => void;
  directorySearch: string;
  onSearchChange: (val: string) => void;
  directoryTypeFilter: string;
  onTypeFilterChange: (val: string) => void;
  directoryTaskFilter: string;
  onTaskFilterChange: (val: string) => void;
  directoryFeaturedOnly: boolean;
  onToggleFeaturedOnly: () => void;
  directorySortBy: CatalogSortBy;
  onSortByChange: (sort: CatalogSortBy) => void;
  directoryPage: number;
  directoryPageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  actioningId: string | null;
  onViewEntry?: (entry: Entry) => void;
  onTogglePopular: (entry: Entry) => void;
  onEditEntry: (entry: Entry) => void;
  onDeleteEntry: (name: string) => void;
  onExportCatalog: () => void;
}

export const AdminDirectorySection: React.FC<AdminDirectorySectionProps> = ({
  approvedEntries,
  filteredApproved,
  paginatedApproved,
  typeCounts,
  taskCounts,
  featuredCount,
  catalogViewMode,
  onViewModeChange,
  directorySearch,
  onSearchChange,
  directoryTypeFilter,
  onTypeFilterChange,
  directoryTaskFilter,
  onTaskFilterChange,
  directoryFeaturedOnly,
  onToggleFeaturedOnly,
  directorySortBy,
  onSortByChange,
  directoryPage,
  directoryPageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  actioningId,
  onViewEntry,
  onTogglePopular,
  onEditEntry,
  onDeleteEntry,
  onExportCatalog,
}) => {
  const t = useTokens();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Catalog Directory
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            All {approvedEntries.length} verified models, frameworks, datasets, platforms, and AI apps in the live registry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-neutral-200 dark:border-white/10 rounded-xl p-0.5 bg-neutral-100/80 dark:bg-white/[0.04]">
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1 cursor-pointer transition-colors ${
                catalogViewMode === "table"
                  ? "bg-white dark:bg-[#161820] text-neutral-900 dark:text-white shadow-xs"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <List size={13} />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1 cursor-pointer transition-colors ${
                catalogViewMode === "grid"
                  ? "bg-white dark:bg-[#161820] text-neutral-900 dark:text-white shadow-xs"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <LayoutGrid size={13} />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
          <button
            type="button"
            onClick={onExportCatalog}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0d11] hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-200 cursor-pointer transition-colors"
          >
            <Download size={13} />
            Export Catalog
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-3.5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md w-full">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={directorySearch}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search active catalog by name, org, or task..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#111319] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={directoryTaskFilter}
              onChange={(e) => onTaskFilterChange(e.target.value)}
              className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#111319] text-xs text-neutral-700 dark:text-neutral-200 outline-none cursor-pointer"
            >
              <option value="All Tasks">All Tasks</option>
              {taskCounts.map(([taskName]) => (
                <option key={taskName} value={taskName}>
                  {taskName}
                </option>
              ))}
            </select>

            <select
              value={directorySortBy}
              onChange={(e) => onSortByChange(e.target.value as CatalogSortBy)}
              className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#111319] text-xs text-neutral-700 dark:text-neutral-200 outline-none cursor-pointer"
            >
              <option value="recent">Sort: Default</option>
              <option value="name">Sort: Name A–Z</option>
              <option value="year">Sort: Release Year</option>
            </select>

            <button
              type="button"
              onClick={onToggleFeaturedOnly}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                directoryFeaturedOnly
                  ? "bg-amber-500/12 border-amber-500/35 text-amber-700 dark:text-amber-300"
                  : "border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04]"
              }`}
            >
              <Star
                size={12}
                className={directoryFeaturedOnly ? "fill-amber-400 text-amber-400" : ""}
              />
              Featured ({featuredCount})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100 dark:border-white/[0.06]">
          <span className="text-[11px] font-medium text-neutral-400 mr-1">Category:</span>
          {(["All", "Model", "Framework", "Dataset", "Platform", "AI"] as const).map(
            (type) => {
              const isSelected = directoryTypeFilter === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onTypeFilterChange(type)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer border ${
                    isSelected
                      ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white font-semibold"
                      : "bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/25"
                  }`}
                >
                  <span>{type === "All" ? "All Types" : type}</span>
                  {type !== "All" && (
                    <span className="text-[10px] opacity-70 font-mono">
                      ({typeCounts[type] || 0})
                    </span>
                  )}
                </button>
              );
            },
          )}
          <div className="ml-auto text-[11px] text-neutral-500 dark:text-neutral-400 tabular-nums">
            Showing{" "}
            <strong className="text-neutral-900 dark:text-white">
              {filteredApproved.length}
            </strong>{" "}
            of {approvedEntries.length}
          </div>
        </div>
      </div>

      {/* Grid or Table */}
      {catalogViewMode === "grid" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {paginatedApproved.map((entry) => (
              <div
                key={entry.name}
                className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] hover:border-neutral-300 dark:hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${typeBadge(
                          entry.type,
                          t,
                        )}`}
                      >
                        {entry.type}
                      </span>
                      <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate max-w-[140px]">
                        {entry.org || "Independent"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onTogglePopular(entry)}
                      className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                      title={entry.popular ? "Featured (click to unfeature)" : "Feature"}
                    >
                      <Star
                        size={15}
                        className={
                          entry.popular
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-400"
                        }
                      />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => onViewEntry?.(entry)}
                    className="mt-2 font-semibold text-sm text-neutral-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer text-left line-clamp-1 transition-colors"
                  >
                    {entry.name}
                  </button>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {entry.summary || "No summary description provided."}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-neutral-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-2 truncate">
                    <span>{entry.task}</span>
                    <span>·</span>
                    <span className="truncate">{entry.license || "Open"}</span>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onViewEntry?.(entry)}
                      className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.07] text-neutral-500 hover:text-indigo-500 cursor-pointer"
                      title="View asset details"
                    >
                      <Eye size={13} />
                    </button>
                    {entry.url && (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.07] text-neutral-500 hover:text-indigo-500"
                        title="Open documentation"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => onEditEntry(entry)}
                      className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.07] text-neutral-500 hover:text-indigo-500 cursor-pointer"
                      title="Edit specs"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteEntry(entry.name)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-500 cursor-pointer"
                      title="Delete from catalog"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PaginationFooter
            directoryPage={directoryPage}
            directoryPageSize={directoryPageSize}
            totalCount={filteredApproved.length}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            label="Cards per page:"
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200/80 dark:border-white/[0.07] bg-neutral-50/80 dark:bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-3 py-3">Organization</th>
                  <th className="px-3 py-3">Category</th>
                  <th className="px-3 py-3">Task Domain</th>
                  <th className="px-3 py-3">License</th>
                  <th className="px-3 py-3">Year</th>
                  <th className="px-3 py-3 text-center">Featured</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.05] text-xs">
                {paginatedApproved.map((entry) => (
                  <tr
                    key={entry.name}
                    className="hover:bg-neutral-50/80 dark:hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold">
                      <button
                        type="button"
                        onClick={() => onViewEntry?.(entry)}
                        className="text-neutral-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer text-left transition-colors"
                      >
                        {entry.name}
                      </button>
                    </td>
                    <td className="px-3 py-3 text-neutral-500 dark:text-neutral-400">
                      {entry.org || "—"}
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
                    <td className="px-3 py-3 text-neutral-500 dark:text-neutral-400">
                      {entry.license || "—"}
                    </td>
                    <td className="px-3 py-3 text-neutral-500 dark:text-neutral-400 font-mono tabular-nums">
                      {entry.year}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => onTogglePopular(entry)}
                        disabled={actioningId === entry.name}
                        className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.07] transition-colors cursor-pointer"
                        title={entry.popular ? "Featured (click to unfeature)" : "Feature"}
                      >
                        <Star
                          size={14}
                          className={
                            entry.popular
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-400"
                          }
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onEditEntry(entry)}
                          className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.07] text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer"
                          title="Edit specs"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteEntry(entry.name)}
                          disabled={actioningId === entry.name}
                          className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer disabled:opacity-50"
                          title="Delete asset"
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

          <PaginationFooter
            directoryPage={directoryPage}
            directoryPageSize={directoryPageSize}
            totalCount={filteredApproved.length}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            label="Rows per page:"
            embedded
          />
        </div>
      )}
    </div>
  );
};

interface PaginationFooterProps {
  directoryPage: number;
  directoryPageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  label: string;
  embedded?: boolean;
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({
  directoryPage,
  directoryPageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
  label,
  embedded,
}) => (
  <div
    className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 text-xs text-neutral-500 dark:text-neutral-400 ${
      embedded
        ? "border-t border-neutral-200/80 dark:border-white/[0.07] bg-neutral-50/70 dark:bg-white/[0.02]"
        : "rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]"
    }`}
  >
    <div className="flex items-center gap-2">
      <span>{label}</span>
      <select
        value={directoryPageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="px-2 py-1 rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#111319] text-xs text-neutral-900 dark:text-white outline-none cursor-pointer"
      >
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>

    <div className="flex items-center gap-3 tabular-nums">
      <span>
        {totalCount === 0 ? 0 : (directoryPage - 1) * directoryPageSize + 1}–
        {Math.min(directoryPage * directoryPageSize, totalCount)} of {totalCount}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, directoryPage - 1))}
          disabled={directoryPage === 1}
          className="p-1.5 rounded-lg hover:bg-neutral-200/70 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft size={15} />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, directoryPage + 1))}
          disabled={directoryPage >= totalPages}
          className="p-1.5 rounded-lg hover:bg-neutral-200/70 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  </div>
);
