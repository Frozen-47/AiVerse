import React, { useState, useMemo } from "react";
import { 
  Sparkles, 
  Building2, 
  ArrowRight, 
  Layers, 
  Globe, 
  Cpu, 
  Zap, 
  Database, 
  Cloud 
} from "lucide-react";
import type { Entry, EntryRatingSummary } from "../types";
import { useTheme } from "../lib/theme";
import { EntryCard } from "./EntryCard";
import { groupEntriesByEcosystem, type EcosystemGroup } from "../lib/ecosystems";
import { EcosystemLogo } from "./EcosystemLogo";

export interface CategoryConfig {
  id: string;
  label: string;
  singular: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  curated: string[];
}

export const SHOWCASE_CATEGORIES: CategoryConfig[] = [
  {
    id: "All",
    label: "All Assets",
    singular: "Asset",
    badge: "Top 6 Frontier Assets",
    title: "Frontier Highlights · All Assets",
    subtitle: "Top 6 flagship models, frameworks, and platform hubs across the verified AI universe.",
    icon: Globe,
    curated: [
      "GPT-6 Astra",
      "Claude Fable",
      "Gemini 4 Argon",
      "DeepSeek-R1",
      "PyTorch",
      "Hugging Face",
    ],
  },
  {
    id: "Ecosystems",
    label: "AI Labs",
    singular: "AI Lab",
    badge: "Top 6 Pioneer Labs",
    title: "Frontier Highlights · Pioneer AI Labs",
    subtitle: "Top 6 frontier research organizations driving foundation models, reasoning, and multimodal breakthroughs.",
    icon: Building2,
    curated: [
      "OpenAI",
      "Anthropic",
      "Google DeepMind",
      "DeepSeek AI",
      "Meta AI",
      "Alibaba (Qwen)",
    ],
  },
  {
    id: "Model",
    label: "Models & LLMs",
    singular: "Model",
    badge: "Top 6 Foundation Models",
    title: "Frontier Highlights · Models & LLMs",
    subtitle: "Top 6 frontier foundation models, reasoning architectures, and state-of-the-art multimodal systems.",
    icon: Cpu,
    curated: [
      "GPT-6 Astra",
      "Claude Fable",
      "Gemini 4 Argon",
      "DeepSeek-R1",
      "Wan 2.1",
      "Grok 3",
    ],
  },
  {
    id: "Framework",
    label: "Frameworks",
    singular: "Framework",
    badge: "Top 6 Frameworks & Libraries",
    title: "Frontier Highlights · Frameworks & Libraries",
    subtitle: "Top 6 developer frameworks, inference runtimes, agent orchestrators, and fine-tuning engines.",
    icon: Zap,
    curated: [
      "PyTorch",
      "vLLM",
      "LangGraph",
      "CrewAI",
      "Unsloth",
      "DSPy",
    ],
  },
  {
    id: "Dataset",
    label: "Datasets",
    singular: "Dataset",
    badge: "Top 6 Datasets & Benchmarks",
    title: "Frontier Highlights · Datasets & Benchmarks",
    subtitle: "Top 6 golden-standard evaluation benchmarks, pretraining corpora, and instruction-tuning datasets.",
    icon: Database,
    curated: [
      "SWE-bench Verified",
      "FineWeb & FineWeb-Edu",
      "ImageNet",
      "MATH-500",
      "GAIA Benchmark",
      "Common Crawl",
    ],
  },
  {
    id: "Platform",
    label: "Platforms",
    singular: "Platform",
    badge: "Top 6 Cloud & Platforms",
    title: "Frontier Highlights · Cloud & Platforms",
    subtitle: "Top 6 ultra-low latency inference engines, cloud GPUs, and distributed model hubs.",
    icon: Cloud,
    curated: [
      "Hugging Face",
      "OpenRouter",
      "GroqCloud",
      "Modal",
      "RunPod",
      "llama.cpp",
    ],
  },
  {
    id: "AI",
    label: "Applications",
    singular: "Application",
    badge: "Top 6 AI Applications",
    title: "Frontier Highlights · AI Applications",
    subtitle: "Top 6 autonomous software engineers, interface builders, research assistants, and agentic tools.",
    icon: Sparkles,
    curated: [
      "Cursor",
      "Devin",
      "v0 by Vercel",
      "Lovable.dev",
      "NotebookLM",
      "OpenHands",
    ],
  },
];

interface FrontierShowcaseProps {
  entries: Entry[];
  onSelectEntry: (entry: Entry) => void;
  bookmarks: string[];
  onToggleBookmark: (name: string) => void;
  ratingSummaries: Record<string, EntryRatingSummary>;
  onViewEcosystem: (orgName: string) => void;
  onViewAll: (category?: string) => void;
  searchQuery?: string;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const FrontierShowcase: React.FC<FrontierShowcaseProps> = ({
  entries,
  onSelectEntry,
  bookmarks,
  onToggleBookmark,
  ratingSummaries,
  onViewEcosystem,
  onViewAll,
  searchQuery = "",
  activeCategory = "All",
  onSelectCategory,
}) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";

  // Local fallback if activeCategory is not passed from parent
  const [internalCategory, setInternalCategory] = useState<string>("All");
  const currentCategory = activeCategory || internalCategory;

  const handleCategoryChange = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      setInternalCategory(catId);
    }
  };

  // Active configuration meta
  const currentConfig = useMemo(() => {
    return (
      SHOWCASE_CATEGORIES.find((c) => c.id === currentCategory) ||
      SHOWCASE_CATEGORIES[0]
    );
  }, [currentCategory]);

  // All ecosystems grouped
  const allEcosystems = useMemo(() => {
    return groupEntriesByEcosystem(entries);
  }, [entries]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: entries.length,
      Ecosystems: allEcosystems.length,
      Model: 0,
      Framework: 0,
      Dataset: 0,
      Platform: 0,
      AI: 0,
    };
    for (const e of entries) {
      if (counts[e.type] !== undefined) {
        counts[e.type]++;
      }
    }
    return counts;
  }, [entries, allEcosystems]);

  // Curated 6 AI Labs (for Ecosystems view)
  const showcaseLabs = useMemo(() => {
    const map = new Map(allEcosystems.map((e) => [e.name, e]));
    const list: EcosystemGroup[] = [];
    const curatedNames =
      SHOWCASE_CATEGORIES.find((c) => c.id === "Ecosystems")?.curated || [];

    for (const lab of curatedNames) {
      const found = map.get(lab);
      if (found) list.push(found);
    }

    if (list.length < 6) {
      for (const eco of allEcosystems) {
        if (!list.some((item) => item.name === eco.name)) {
          list.push(eco);
          if (list.length === 6) break;
        }
      }
    }

    return list.slice(0, 6);
  }, [allEcosystems]);

  // Curated 6 items for the active category
  const showcaseEntries = useMemo(() => {
    const map = new Map(entries.map((e) => [e.name, e]));
    const list: Entry[] = [];

    // 1. Prioritize curated flagships
    for (const name of currentConfig.curated) {
      const found = map.get(name);
      if (found && !list.some((item) => item.name === found.name)) {
        list.push(found);
      }
    }

    // 2. Backfill with popular entries of the matching category
    if (list.length < 6) {
      const pool =
        currentCategory === "All"
          ? entries
          : entries.filter((e) => e.type === currentCategory);

      for (const e of pool) {
        if (!list.some((item) => item.name === e.name) && e.popular) {
          list.push(e);
          if (list.length === 6) break;
        }
      }
    }

    // 3. Fallback to any in category if still under 6
    if (list.length < 6) {
      const pool =
        currentCategory === "All"
          ? entries
          : entries.filter((e) => e.type === currentCategory);

      for (const e of pool) {
        if (!list.some((item) => item.name === e.name)) {
          list.push(e);
          if (list.length === 6) break;
        }
      }
    }

    return list.slice(0, 6);
  }, [entries, currentCategory, currentConfig]);

  // Live search filtering if searchQuery is provided
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return entries.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        (e.org && e.org.toLowerCase().includes(q)) ||
        e.task.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q)
    );
  }, [entries, searchQuery]);

  const activeTotalCount = categoryCounts[currentCategory] || entries.length;

  return (
    <section className="flex flex-col gap-7 w-full text-left">
      {/* ── 1. Clean, Artful Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-5 border-b border-neutral-200/80 dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
              {searchResults
                ? `${searchResults.length} Results Found`
                : currentConfig.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {searchResults ? (
              <span>
                Search: <span className="text-blue-600 dark:text-blue-400">&ldquo;{searchQuery}&rdquo;</span>
              </span>
            ) : (
              currentConfig.title
            )}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            {searchResults
              ? `Displaying verified AI technologies matching your search query.`
              : currentConfig.subtitle}
          </p>
        </div>

        {/* Action Controls & Dynamic Category Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          {!searchResults && (
            <div className={`p-1 rounded-2xl border flex items-center overflow-x-auto no-scrollbar max-w-full ${
              isAmoled 
                ? "bg-neutral-800/90 border-white/10 shadow-xs" 
                : "bg-neutral-100/90 border-neutral-200/90 shadow-2xs"
            }`}>
              {SHOWCASE_CATEGORIES.map((cat) => {
                const isActive = currentCategory === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? isAmoled
                          ? "bg-white text-neutral-950 font-semibold shadow-xs"
                          : "bg-neutral-900 text-white font-semibold shadow-xs"
                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/[0.08]"
                    }`}
                  >
                    <Icon size={12} className="shrink-0" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={() => onViewAll(currentCategory)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title={`Open complete ${currentConfig.label} directory`}
          >
            <span>
              {currentCategory === "Ecosystems"
                ? `All Labs (${allEcosystems.length})`
                : `Full Directory (${activeTotalCount})`}
            </span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* ── 2. Content Grid: Top 6 for Selected Category ── */}
      {searchResults ? (
        searchResults.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border flex flex-col items-center justify-center ${
            isAmoled ? "bg-white/[0.02] border-white/10" : "bg-neutral-50 border-neutral-200/80"
          }`}>
            <p className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5">
              No assets found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Explore the full directory to filter by license, parameter size, or research category.
            </p>
            <button
              onClick={() => onViewAll("All")}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black cursor-pointer shadow-xs"
            >
              Browse Complete Directory
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {searchResults.slice(0, 6).map((entry, i) => (
              <EntryCard
                key={entry.name}
                entry={entry}
                entryName={entry.name}
                onSelect={() => onSelectEntry(entry)}
                index={i}
                ratingSummary={ratingSummaries[entry.name]}
                isBookmarked={bookmarks.includes(entry.name)}
                onToggleBookmark={onToggleBookmark}
                onViewEcosystem={onViewEcosystem}
              />
            ))}
          </div>
        )
      ) : currentCategory === "Ecosystems" ? (
        /* Top 6 Pioneer AI Labs */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {showcaseLabs.map((eco) => (
            <div
              key={eco.id}
              onClick={() => onViewEcosystem(eco.name)}
              className={`group flex flex-col justify-between p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isAmoled
                  ? "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]"
                  : "bg-white border-neutral-200/80 hover:border-neutral-300 shadow-2xs hover:shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <EcosystemLogo name={eco.name} website={eco.website} size={40} />
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {eco.name}
                      </h3>
                      <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                        {eco.domain}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border tabular-nums shrink-0 ${eco.colorScheme.badge}`}>
                    {eco.totalCount} Assets
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-4">
                  {eco.description}
                </p>

                {/* Flagship chips */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {eco.flagships.slice(0, 3).map((f) => (
                    <span
                      key={f.name}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                        isAmoled
                          ? "bg-white/[0.03] text-neutral-300 border-white/5"
                          : "bg-neutral-100/80 text-neutral-700 border-neutral-200/60"
                      }`}
                    >
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-semibold text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>Explore Ecosystem</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Top 6 Entries for the active category (Models, Frameworks, Datasets, Platforms, Applications, or All) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {showcaseEntries.map((entry, i) => (
            <EntryCard
              key={entry.name}
              entry={entry}
              entryName={entry.name}
              onSelect={() => onSelectEntry(entry)}
              index={i}
              ratingSummary={ratingSummaries[entry.name]}
              isBookmarked={bookmarks.includes(entry.name)}
              onToggleBookmark={onToggleBookmark}
              onViewEcosystem={onViewEcosystem}
            />
          ))}
        </div>
      )}

      {/* ── 3. Artful, Aesthetic Discovery Callout ── */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all ${
        isAmoled
          ? "bg-gradient-to-r from-blue-950/20 via-white/[0.02] to-indigo-950/20 border-white/10"
          : "bg-gradient-to-r from-blue-50/60 via-white to-indigo-50/60 border-neutral-200/90 shadow-2xs"
      }`}>
        <div className="flex items-start sm:items-center gap-4">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
            isAmoled
              ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
              : "bg-blue-50 border-blue-200 text-blue-600 shadow-2xs"
          }`}>
            <Layers size={20} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
              {currentCategory === "Ecosystems"
                ? `Explore All Pioneer Ecosystems (${allEcosystems.length} AI Labs)`
                : currentCategory === "All"
                ? `Explore the Full Compendium (${entries.length} Verified Assets)`
                : `Explore All ${activeTotalCount} ${currentConfig.label}`}
            </h4>
            <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Filter by model parameters, tasks, permissive licenses, and comparative benchmark telemetry.
            </p>
          </div>
        </div>

        <button
          onClick={() => onViewAll(currentCategory)}
          className="px-5 py-2.5 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-xs self-start sm:self-auto"
        >
          <span>
            {currentCategory === "Ecosystems"
              ? "Explore All Ecosystems"
              : `Open Full Directory (${activeTotalCount})`}
          </span>
          <ArrowRight size={13} />
        </button>
      </div>
    </section>
  );
};
