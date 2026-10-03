import React, { useState, useMemo } from "react";
import { ArrowLeft, ExternalLink, Sparkles, Box, Layers, Database, Server, Bot } from "lucide-react";
import type { EntryRatingSummary } from "../types";
import type { EcosystemGroup } from "../lib/ecosystems";
import { EntryCard } from "./EntryCard";
import { EcosystemLogo } from "./EcosystemLogo";

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
  const [selectedType, setSelectedType] = useState<string>("All");

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

      {/* Category Segmented Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
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

      {/* Asset Cards Grid */}
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
    </div>
  );
};
