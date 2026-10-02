import React, { useState, useMemo } from "react";
import { Search, Building2, RotateCcw } from "lucide-react";
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

  const allEcosystems = useMemo(() => {
    return groupEntriesByEcosystem(entries);
  }, [entries]);

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
    <div className="flex flex-col gap-6 w-full text-left animate-[fadeUp_0.3s_ease-out]">
      {/* Ecosystem Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {filteredEcosystems.length} AI Ecosystems & Labs
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <Building2 size={22} className="text-blue-500" />
            AI Labs & Ecosystems
          </h2>
        </div>

        {/* Search bar inside section */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI Labs (e.g. OpenAI, DeepSeek)..."
            className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 shadow-xs"
          />
          <Search size={13} className="absolute left-3 top-2.5 text-neutral-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Filter Quick Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { id: "All", label: "All Labs" },
          { id: "Frontier", label: "Frontier Giants (OpenAI, Underrated One, Anthropic)" },
          { id: "Open", label: "Open-Weights Champions (Meta, DeepSeek, Mistral)" },
          { id: "Multi", label: "Extensive Suites (5+ Assets)" },
        ].map((pill) => {
          const isSelected = filterFocus === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setFilterFocus(pill.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEcosystems.map((eco) => (
            <EcosystemCard
              key={eco.id}
              ecosystem={eco}
              onExplore={(selectedEco) => setActiveEcosystem(selectedEco)}
              onSelectEntry={onSelectEntry}
            />
          ))}
        </div>
      )}
    </div>
  );
};
