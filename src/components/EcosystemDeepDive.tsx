import React, { useState, useMemo } from "react";
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Box, 
  Layers, 
  Database, 
  Server, 
  Bot, 
  List, 
  LayoutGrid, 
  Star, 
  Bookmark, 
  ChevronRight 
} from "lucide-react";
import type { EntryRatingSummary } from "../types";
import type { EcosystemGroup } from "../lib/ecosystems";
import { EntryCard } from "./EntryCard";
import { EcosystemLogo } from "./EcosystemLogo";
import { useTheme, TYPE_GLYPH } from "../lib/theme";

interface EcosystemDeepDiveProps {
  ecosystem: EcosystemGroup;
  onBack: () => void;
  onSelectEntry: (name: string) => void;
  bookmarks: string[];
  onToggleBookmark: (name: string) => void;
  ratingSummaries: Record<string, EntryRatingSummary>;
}

export const EcosystemDeepDive: React.FC<EcosystemDeepDiveProps> = ({
  ecosystem,
  onBack,
  onSelectEntry,
  bookmarks,
  onToggleBookmark,
  ratingSummaries,
}) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";
  const [selectedType, setSelectedType] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredEntries = useMemo(() => {
    if (selectedType === "All") return ecosystem.entries;
    return ecosystem.entries.filter((e) => e.type === selectedType);
  }, [ecosystem.entries, selectedType]);

  const typeFilterOptions = [
    { id: "All", label: "All Assets", count: ecosystem.totalCount, icon: Sparkles },
    ...(ecosystem.modelsCount > 0 ? [{ id: "Model", label: "Models & Weights", count: ecosystem.modelsCount, icon: Box }] : []),
    ...(ecosystem.frameworksCount > 0 ? [{ id: "Framework", label: "Frameworks & Tooling", count: ecosystem.frameworksCount, icon: Layers }] : []),
    ...(ecosystem.datasetsCount > 0 ? [{ id: "Dataset", label: "Datasets & Corpora", count: ecosystem.datasetsCount, icon: Database }] : []),
    ...(ecosystem.platformsCount > 0 ? [{ id: "Platform", label: "Platforms & APIs", count: ecosystem.platformsCount, icon: Server }] : []),
    ...(ecosystem.appsCount > 0 ? [{ id: "AI", label: "Applications", count: ecosystem.appsCount, icon: Bot }] : []),
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-[fadeUp_0.3s_ease-out] text-left">
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <button
            onClick={onBack}
            className="hover:text-blue-500 hover:underline cursor-pointer flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={12} />
            All Ecosystems
          </button>
          <span className="opacity-40">/</span>
          <span>AI Labs</span>
          <span className="opacity-40">/</span>
          <span className="font-semibold text-neutral-900 dark:text-white">{ecosystem.name}</span>
        </div>

        <button
          onClick={onBack}
          className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer shadow-xs w-fit"
        >
          <ArrowLeft size={12} />
          Back to Ecosystem Overview
        </button>
      </div>

      {/* Lab Banner Header */}
      <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <EcosystemLogo
              name={ecosystem.name}
              website={ecosystem.website}
              size={56}
              className="rounded-2xl shadow-sm"
            />
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {ecosystem.name} Ecosystem
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border tabular-nums ${ecosystem.colorScheme.badge}`}>
                  {ecosystem.totalCount} Integrated Assets
                </span>
                {ecosystem.website && (
                  <a
                    href={ecosystem.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Official Portal</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {ecosystem.domain}
              </p>
              <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 mt-2 max-w-2xl">
                {ecosystem.description}
              </p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-white/[0.06]">
            <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
              Primary Licensing:
            </span>
            <div className="flex flex-wrap gap-1">
              {ecosystem.licenses.map((lic) => (
                <span
                  key={lic}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-white/[0.06]"
                >
                  {lic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Segmented Tabs & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {typeFilterOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedType === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedType(opt.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs"
                    : "border border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={12} className={isSelected ? "text-blue-400 dark:text-blue-600" : "opacity-60"} />
                <span>{opt.label}</span>
                <span className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-white/20 dark:bg-black/20" : "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500"
                }`}>
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Line-by-Line (List) vs Cards (Grid) */}
        <div className="flex items-center self-end sm:self-auto p-1 rounded-xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] shrink-0">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
            title="Line-by-line list view"
          >
            <List size={13} />
            <span>Line by Line</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
            title="Cards grid view"
          >
            <LayoutGrid size={13} />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Asset Directory Contents */}
      {filteredEntries.length === 0 ? (
        <div className="p-10 text-center rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02]">
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            No assets found in this category for {ecosystem.name}.
          </p>
        </div>
      ) : viewMode === "list" ? (
        /* ─── Line by Line Directory Layout ─── */
        <div className="flex flex-col gap-2.5 w-full">
          {filteredEntries.map((entry, index) => {
            const animate = index < 12;
            const entryRating = ratingSummaries[entry.name];
            const isBookmarked = bookmarks.includes(entry.name);

            return (
              <div
                key={entry.name}
                onClick={() => onSelectEntry(entry.name)}
                style={animate ? { animationDelay: `${index * 25}ms` } : undefined}
                className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:px-4.5 sm:py-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isAmoled
                    ? "bg-[#1e1f20] border-white/10 hover:border-white/20 hover:bg-[#252729] hover:shadow-md"
                    : "bg-white border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50/80 hover:shadow-xs"
                } ${animate ? "animate-fade-in-up" : ""}`}
              >
                {/* Left: Glyph + Title + Badges + Snippet */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold shrink-0 border ${
                      isAmoled
                        ? "bg-white/[0.08] border-white/10 text-neutral-200"
                        : "bg-[#f1f3f4] border-neutral-200 text-neutral-700"
                    }`}
                  >
                    {TYPE_GLYPH[entry.type] ?? "◆"}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline transition-colors truncate">
                        {entry.name}
                      </span>

                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 border-neutral-200/80 dark:border-white/[0.08]">
                        {entry.task}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-neutral-50 dark:bg-white/[0.03] text-neutral-500 dark:text-neutral-400 border-neutral-200/60 dark:border-white/[0.06]">
                        {entry.type}
                      </span>
                      {entry.size && entry.size !== "Unknown" && entry.size !== "N/A" && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-neutral-50 dark:bg-white/[0.03] text-neutral-500 dark:text-neutral-400 border-neutral-200/60 dark:border-white/[0.06] hidden md:inline-block">
                          {entry.size}
                        </span>
                      )}

                      {entry.popular && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20">
                          <Star size={8} className="fill-current text-amber-500" />
                          <span>Top Choice</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate font-normal leading-relaxed">
                      {entry.summary}
                    </p>
                  </div>
                </div>

                {/* Right: Meta Telemetry, Rating, Bookmark & Action */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-white/[0.06] text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-2 text-[11px]">
                    {entryRating && entryRating.count > 0 ? (
                      <div className="flex items-center gap-1 font-medium text-neutral-700 dark:text-neutral-300">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span className="tabular-nums font-semibold">{entryRating.average.toFixed(1)}</span>
                        <span className="text-neutral-400">({entryRating.count})</span>
                      </div>
                    ) : (
                      <span className="font-mono text-neutral-500 dark:text-neutral-400">{entry.license}</span>
                    )}
                    <span className="opacity-40">•</span>
                    <span className="font-mono tabular-nums">{entry.year}</span>
                  </div>

                  <div className="flex items-center gap-1 pl-1">
                    {onToggleBookmark && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(entry.name);
                        }}
                        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                          isBookmarked
                            ? isAmoled
                              ? "text-[#8ab4f8] bg-blue-500/10"
                              : "text-[#1a73e8] bg-blue-50"
                            : "text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10"
                        }`}
                        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
                      >
                        <Bookmark size={13} className={isBookmarked ? "fill-current" : ""} />
                      </button>
                    )}

                    <div className="flex items-center gap-0.5 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pl-1">
                      <span className="text-[11px] font-medium hidden md:inline">Inspect</span>
                      <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ─── Alternative Grid Cards Layout ─── */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredEntries.map((entry, i) => (
            <EntryCard
              key={entry.name}
              entry={entry}
              entryName={entry.name}
              onSelect={onSelectEntry}
              index={i}
              ratingSummary={ratingSummaries[entry.name]}
              isBookmarked={bookmarks.includes(entry.name)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};
