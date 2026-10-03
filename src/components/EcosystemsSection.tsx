import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import type { Entry, EntryRatingSummary } from "../types";
import { groupEntriesByEcosystem, type EcosystemGroup } from "../lib/ecosystems";
import { EcosystemCard } from "./EcosystemCard";
import { EcosystemDeepDive } from "./EcosystemDeepDive";

interface EcosystemsSectionProps {
  entries: Entry[];
  onSelectEntry: (entry: Entry) => void;
  bookmarks: string[];
  onToggleBookmark: (name: string) => void;
  ratingSummaries: Record<string, EntryRatingSummary>;
  selectedEcosystemId?: string | null;
  onClearSelectedEcosystem?: () => void;
}

export const EcosystemsSection: React.FC<EcosystemsSectionProps> = ({
  entries,
  onSelectEntry,
  bookmarks,
  onToggleBookmark,
  ratingSummaries,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEcosystem, setActiveEcosystem] = useState<EcosystemGroup | null>(null);
  const [filterFocus, setFilterFocus] = useState<"All" | "Frontier" | "Open" | "Multi">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const sectionRef = useRef<HTMLDivElement>(null);

  const allEcosystems = useMemo(() => {
    return groupEntriesByEcosystem(entries);
  }, [entries]);

  // Reset to page 1 whenever search query or category filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterFocus]);

  const filteredEcosystems = useMemo(() => {
    let result = allEcosystems;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (eco) =>
          eco.name.toLowerCase().includes(q) ||
          eco.description.toLowerCase().includes(q) ||
          eco.domain.toLowerCase().includes(q) ||
          eco.entries.some((e) => e.name.toLowerCase().includes(q) || e.task.toLowerCase().includes(q))
      );
    }

    if (filterFocus === "Frontier") {
      result = result.filter((eco) =>
        ["OpenAI", "Google DeepMind", "Anthropic", "xAI"].includes(eco.name)
      );
    } else if (filterFocus === "Open") {
      result = result.filter((eco) =>
        ["Meta AI", "DeepSeek AI", "Mistral AI", "Alibaba (Qwen)", "Hugging Face"].includes(eco.name) ||
        eco.licenses.some((l) => l.toLowerCase().includes("mit") || l.toLowerCase().includes("apache"))
      );
    } else if (filterFocus === "Multi") {
      result = result.filter((eco) =>
        eco.totalCount >= 5
      );
    }

    return result;
  }, [allEcosystems, searchQuery, filterFocus]);

  const totalPages = Math.max(1, Math.ceil(filteredEcosystems.length / pageSize));

  // Current page items slice
  const paginatedEcosystems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEcosystems.slice(start, start + pageSize);
  }, [filteredEcosystems, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    const page = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Helper for sliding pagination window (e.g. [1, 2, 3, 4, 5, '...', 19])
  const getVisiblePages = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }
    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  // If a specific ecosystem is currently opened, display its deep-dive workspace
  if (activeEcosystem) {
    return (
      <EcosystemDeepDive
        ecosystem={activeEcosystem}
        onBack={() => setActiveEcosystem(null)}
        onSelectEntry={(entryName) => {
          const found = entries.find((e) => e.name === entryName);
          if (found) onSelectEntry(found);
        }}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
        ratingSummaries={ratingSummaries}
      />
    );
  }

  return (
    <div ref={sectionRef} className="flex flex-col gap-6 w-full text-left animate-[fadeUp_0.3s_ease-out] scroll-mt-24">
      {/* Ecosystem Search and Filter Controls - Unified sleek toolbar without duplicate title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 pb-4 border-b border-neutral-200/80 dark:border-white/[0.08]">
        {/* Filter Quick Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: "All", label: "All Labs" },
            { id: "Frontier", label: "Frontier Giants (OpenAI, Google, Anthropic, xAI)" },
            { id: "Open", label: "Open-Weights Champions (Meta, DeepSeek, Mistral, Qwen)" },
            { id: "Multi", label: "Extensive Suites (5+ Assets)" },
          ].map((pill) => {
            const isSelected = filterFocus === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setFilterFocus(pill.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs"
                    : "border border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04]"
                }`}
              >
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search bar & count indicator */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto">
          <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
            {filteredEcosystems.length === allEcosystems.length
              ? `Page ${currentPage} of ${totalPages} (${allEcosystems.length} labs)`
              : `${filteredEcosystems.length} of ${allEcosystems.length} labs`}
          </span>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI Labs (e.g. OpenAI, DeepSeek)..."
              className="w-full pl-9 pr-8 py-1.5 rounded-full text-xs border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 shadow-xs"
            />
            <Search size={13} className="absolute left-3 top-2.5 text-neutral-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1.5 text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Ecosystem Cards */}
      {filteredEcosystems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/50 dark:bg-white/[0.01] flex flex-col items-center justify-center my-4">
          <p className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
            No AI Labs matched your search
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 max-w-sm">
            Try searching for another organization or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setFilterFocus("All");
            }}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black shadow-xs cursor-pointer hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <RotateCcw size={12} />
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedEcosystems.map((eco) => (
              <EcosystemCard
                key={eco.id}
                ecosystem={eco}
                onExplore={(selectedEco) => setActiveEcosystem(selectedEco)}
                onSelectEntry={onSelectEntry}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-4 border-t border-neutral-200/80 dark:border-white/[0.08]">
              {/* Left: Summary and Page Size Selectors */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                <span>
                  Showing <strong className="text-neutral-900 dark:text-white font-semibold">{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredEcosystems.length)}</strong> of <strong className="text-neutral-900 dark:text-white font-semibold">{filteredEcosystems.length}</strong> AI Labs <span className="opacity-75 font-normal">(Page {currentPage} of {totalPages})</span>
                </span>
                <span className="opacity-40">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px]">Per page:</span>
                  {[12, 24, 48].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setPageSize(size);
                        setCurrentPage(1);
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                        pageSize === size
                          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                          : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Page Navigation Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                >
                  <ChevronLeft size={13} />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {visiblePages.map((page, idx) => {
                    if (page === "...") {
                      return (
                        <span key={`dots-${idx}`} className="px-1.5 text-xs text-neutral-400 select-none">
                          …
                        </span>
                      );
                    }
                    const pageNum = page as number;
                    const isCurrent = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`min-w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                            : "border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                >
                  <span>Next</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
