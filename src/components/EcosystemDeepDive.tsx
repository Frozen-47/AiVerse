import React, { useState, useMemo, useEffect } from "react";
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Box, 
  Layers, 
  Database, 
  Server, 
  Bot, 
  Star, 
  Bookmark, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  LayoutGrid,
  List
} from "lucide-react";
import type { EntryRatingSummary } from "../types";
import { 
  type EcosystemGroup, 
  groupEcosystemEntriesIntoFamilies,
  type ModelFamilyGroup 
} from "../lib/ecosystems";
import { EcosystemLogo } from "./EcosystemLogo";
import { LabLogo } from "./LabLogo";
import { EntryCard } from "./EntryCard";
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
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredEntries = useMemo(() => {
    if (selectedType === "All") return ecosystem.entries;
    return ecosystem.entries.filter((e) => e.type === selectedType);
  }, [ecosystem.entries, selectedType]);

  // Group filtered entries hierarchically by model family / series
  const allFamilies: ModelFamilyGroup[] = useMemo(() => {
    return groupEcosystemEntriesIntoFamilies(filteredEntries, ecosystem.name);
  }, [filteredEntries, ecosystem.name]);

  // Apply optional family filter pill
  const families: ModelFamilyGroup[] = useMemo(() => {
    if (selectedFamilyFilter === "All") return allFamilies;
    return allFamilies.filter((f) => f.id === selectedFamilyFilter);
  }, [allFamilies, selectedFamilyFilter]);

  // Open / expanded by default so all assets are immediately visible and browsable
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(() => {
    return new Set(allFamilies.map((f) => f.id));
  });

  // Whenever families change (e.g. filter switched), ensure they remain open for browsing
  useEffect(() => {
    setExpandedFamilies(new Set(allFamilies.map((f) => f.id)));
  }, [allFamilies]);

  const allExpanded = families.length > 0 && families.every((f) => expandedFamilies.has(f.id));

  const toggleAllFamilies = () => {
    if (allExpanded) {
      setExpandedFamilies(new Set());
    } else {
      setExpandedFamilies(new Set(families.map((f) => f.id)));
    }
  };

  const toggleFamily = (familyId: string) => {
    setExpandedFamilies((prev) => {
      const next = new Set(prev);
      if (next.has(familyId)) {
        next.delete(familyId);
      } else {
        next.add(familyId);
      }
      return next;
    });
  };

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
            <ArrowLeft size={14} />
            <span>AI Labs & Ecosystems</span>
          </button>
          <span>/</span>
          <span className="font-semibold text-neutral-900 dark:text-white">
            {ecosystem.name}
          </span>
        </div>

        <button
          onClick={onBack}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft size={13} />
          <span>Back to All Labs</span>
        </button>
      </div>

      {/* Lab Banner Header */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isAmoled 
          ? "bg-[#18191b] border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]" 
          : "bg-white/80 border-neutral-200/90 shadow-xs backdrop-blur-xl"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-start gap-4">
            <EcosystemLogo
              name={ecosystem.name}
              website={ecosystem.website}
              size={52}
              className="rounded-2xl shadow-sm shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white truncate">
                  {ecosystem.name}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border tabular-nums ${ecosystem.colorScheme.badge}`}>
                  {ecosystem.totalCount} Integrated Assets
                </span>
                {ecosystem.website && (
                  <a
                    href={ecosystem.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    <span>Official Portal</span>
                    <ExternalLink size={11} className="opacity-70" />
                  </a>
                )}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {ecosystem.domain}
              </p>
              <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-300 mt-2 max-w-3xl">
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

      {/* Asset Controls Toolbar: Type Filter, View Mode, and Expand/Collapse */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 pb-2">
        {/* Left: Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {typeFilterOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedType === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setSelectedType(opt.id);
                  setSelectedFamilyFilter("All");
                }}
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

        {/* Right: View Mode Toggle (Grid vs List) + Family Count & Collapse/Expand */}
        <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
          {/* View Mode Toggle: Grid Cards vs Compact List */}
          <div className="flex items-center p-0.5 rounded-xl bg-neutral-100 dark:bg-white/[0.05] border border-neutral-200/80 dark:border-white/[0.08]">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
              title="Show rich resource cards grid"
            >
              <LayoutGrid size={13} />
              <span className="hidden sm:inline">Cards Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
              title="Show structured directory list"
            >
              <List size={13} />
              <span className="hidden sm:inline">Directory List</span>
            </button>
          </div>

          <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap hidden sm:inline">
            {families.length} {families.length === 1 ? "Family" : "Families"} · {filteredEntries.length} Assets
          </span>

          <button
            type="button"
            onClick={toggleAllFamilies}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer shadow-2xs"
            title={allExpanded ? "Collapse all model families" : "Expand all model families"}
          >
            <ChevronsUpDown size={12} className="opacity-70" />
            <span>{allExpanded ? "Collapse all" : "Expand all"}</span>
          </button>
        </div>
      </div>

      {/* Optional Family Jump Filter Pills (when multiple families exist) */}
      {allFamilies.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 text-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 shrink-0 mr-1">
            Series:
          </span>
          <button
            onClick={() => setSelectedFamilyFilter("All")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedFamilyFilter === "All"
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-500/30"
                : "border border-neutral-200/70 dark:border-white/[0.06] text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/[0.02]"
            }`}
          >
            All Families ({allFamilies.length})
          </button>
          {allFamilies.map((fam) => (
            <button
              key={fam.id}
              onClick={() => setSelectedFamilyFilter(fam.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedFamilyFilter === fam.id
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-500/30"
                  : "border border-neutral-200/70 dark:border-white/[0.06] text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/[0.02]"
              }`}
            >
              <span
                style={{ backgroundColor: fam.accentColor }}
                className="w-1.5 h-1.5 rounded-full shrink-0"
              />
              <span>{fam.name}</span>
              <span className="opacity-60 tabular-nums">({fam.entries.length})</span>
            </button>
          ))}
        </div>
      )}

      {/* Asset Directory Contents Organized by Family */}
      {filteredEntries.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02]">
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            No assets found in this category for {ecosystem.name}.
          </p>
        </div>
      ) : (
        /* ─── Model Families Showcase ─── */
        <div className="flex flex-col gap-6 w-full">
          {families.map((family) => {
            const isExpanded = expandedFamilies.has(family.id);

            return (
              <section
                key={family.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isAmoled
                    ? "bg-[#18191b] border-white/10 shadow-sm"
                    : "bg-white/80 border-neutral-200/90 shadow-2xs"
                }`}
              >
                {/* Family Header Banner */}
                <div
                  onClick={() => toggleFamily(family.id)}
                  className={`w-full flex items-center justify-between p-4 sm:px-5 sm:py-3.5 transition-colors cursor-pointer select-none border-b ${
                    isExpanded ? "border-neutral-100 dark:border-white/[0.06]" : "border-transparent"
                  } ${
                    isAmoled
                      ? "hover:bg-white/[0.03] bg-[#1a1b1d]"
                      : "hover:bg-neutral-50/80 bg-neutral-50/50"
                  }`}
                >
                  {/* Left: Creator Accent Indicator + Lab Logo + Family Name + Badges + Subtitle */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span
                      style={{ backgroundColor: family.accentColor }}
                      className="w-1.5 h-6 rounded-full shrink-0 shadow-xs"
                    />

                    <LabLogo creator={ecosystem.name} size={20} />

                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight truncate">
                        {family.name}
                      </h3>

                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 dark:bg-white/[0.08] text-neutral-700 dark:text-neutral-200 border border-neutral-200/80 dark:border-white/[0.08] tabular-nums">
                        {family.entries.length} {family.entries.length === 1 ? "Asset" : "Assets"}
                      </span>

                      {family.subtitle && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 hidden lg:inline truncate max-w-md">
                          · {family.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Metrics + Collapse / Expand indicator */}
                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    {family.contextWindow && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-white/[0.06] hidden sm:inline">
                        {family.contextWindow}
                      </span>
                    )}

                    {family.highlightMetric && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hidden md:inline truncate max-w-[160px]">
                        {family.highlightMetric}
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      <span className="text-[11px] hidden sm:inline">
                        {isExpanded ? "Collapse" : "Expand"}
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-neutral-700 dark:text-neutral-300" />
                      ) : (
                        <ChevronDown size={16} className="text-neutral-500 dark:text-neutral-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Family Assets Content (Rendered when expanded) */}
                {isExpanded && (
                  <div className="p-4 sm:p-5">
                    {viewMode === "grid" ? (
                      /* ─── Mode A: Rich Resource Cards Grid ─── */
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {family.entries.map((entry, index) => (
                          <EntryCard
                            key={entry.name}
                            entry={entry}
                            entryName={entry.name}
                            onSelect={onSelectEntry}
                            index={index}
                            ratingSummary={ratingSummaries[entry.name]}
                            isBookmarked={bookmarks.includes(entry.name)}
                            onToggleBookmark={onToggleBookmark}
                          />
                        ))}
                      </div>
                    ) : (
                      /* ─── Mode B: Structured Directory List Rows ─── */
                      <div className="flex flex-col gap-2.5 w-full">
                        {family.entries.map((entry) => {
                          const entryRating = ratingSummaries[entry.name];
                          const isBookmarked = bookmarks.includes(entry.name);

                          return (
                            <div
                              key={entry.name}
                              onClick={() => onSelectEntry(entry.name)}
                              className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:px-4 sm:py-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                                isAmoled
                                  ? "bg-[#1e1f20] border-white/10 hover:border-white/20 hover:bg-[#252729] hover:shadow-md"
                                  : "bg-white border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50/80 hover:shadow-2xs"
                              }`}
                            >
                              {/* Left: Glyph + Title + Badges + Snippet */}
                              <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0 border ${
                                    isAmoled
                                      ? "bg-white/[0.08] border-white/10 text-neutral-200"
                                      : "bg-[#f1f3f4] border-neutral-200 text-neutral-700"
                                  }`}
                                >
                                  {TYPE_GLYPH[entry.type] ?? "◆"}
                                </div>

                                <div className="flex flex-col min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <span className="text-sm sm:text-[15px] font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline transition-colors truncate">
                                      {entry.name}
                                    </span>

                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 border-neutral-200/80 dark:border-white/[0.08]">
                                      {entry.task}
                                    </span>

                                    {entry.size && entry.size !== "N/A" && entry.size !== "Unknown" && (
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-neutral-50 dark:bg-white/[0.02] text-neutral-500 dark:text-neutral-400 border-neutral-200/60 dark:border-white/[0.06]">
                                        {entry.size}
                                      </span>
                                    )}

                                    <span className="text-[10px] px-2 py-0.5 rounded-full border bg-neutral-50 dark:bg-white/[0.02] text-neutral-500 dark:text-neutral-400 border-neutral-200/60 dark:border-white/[0.06]">
                                      {entry.license}
                                    </span>

                                    {entry.popular && (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                        <Star size={9} className="fill-current" />
                                        <span>Top Choice</span>
                                      </span>
                                    )}
                                  </div>

                                  <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 line-clamp-2 sm:line-clamp-3 font-normal leading-relaxed">
                                    {entry.description || entry.summary}
                                  </p>
                                </div>
                              </div>

                              {/* Right: Meta Telemetry, Rating, Bookmark & Action */}
                              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-white/[0.06] text-xs text-neutral-500 dark:text-neutral-400">
                                <div className="flex items-center gap-2 text-[11px]">
                                  {entryRating && entryRating.count > 0 ? (
                                    <div className="flex items-center gap-1 font-medium text-neutral-700 dark:text-neutral-300">
                                      <span className="font-bold">{entryRating.average.toFixed(1)}</span>
                                      <Star size={11} className="fill-amber-400 text-amber-400" />
                                      <span className="text-neutral-400">({entryRating.count})</span>
                                    </div>
                                  ) : (
                                    <span>{entry.year}</span>
                                  )}

                                  {entry.benchmarks && entry.benchmarks !== "N/A" && (
                                    <span className="hidden md:inline-block max-w-[170px] truncate text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-white/[0.06]">
                                      {entry.benchmarks.split(",")[0]}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleBookmark(entry.name);
                                    }}
                                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                      isBookmarked
                                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20"
                                        : "text-neutral-400 hover:text-neutral-700 dark:hover:text-white border-transparent hover:bg-neutral-100 dark:hover:bg-white/10"
                                    }`}
                                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
                                    title={isBookmarked ? "Remove bookmark" : "Bookmark this asset"}
                                  >
                                    <Bookmark size={13} className={isBookmarked ? "fill-current" : ""} />
                                  </button>

                                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                                    <span>Inspect</span>
                                    <ChevronRight size={13} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};
