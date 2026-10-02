import React from "react";
import { BookOpen, Sparkles, Cpu, Database, Layers, Laptop, Star } from "lucide-react";
import type { Entry } from "../../types";

interface CategoryDashboardProps {
  entries: Entry[];
  typeCounts: {
    AI: number;
    Model: number;
    Dataset: number;
    Framework: number;
    Platform: number;
    Popular: number;
  };
  setTypeFilter: (f: string) => void;
  setSearchInput: (s: string) => void;
  setBrowseAll: (b: boolean) => void;
  setActiveView: (v: "landing" | "catalog") => void;
  setSavedOnly: (s: boolean) => void;
  setPopularOnly: (p: boolean) => void;
}

export const CategoryDashboard: React.FC<CategoryDashboardProps> = ({
  entries,
  typeCounts,
  setTypeFilter,
  setSearchInput,
  setBrowseAll,
  setActiveView,
  setSavedOnly,
  setPopularOnly,
}) => {

  const categories = [
    {
      title: "AI Assistants",
      desc: "Intelligent agents, chat applications, and coding copilots.",
      count: typeCounts.AI,
      icon: Sparkles,
      action: () => { setPopularOnly(false); setSavedOnly(false); setTypeFilter("AI"); },
    },
    {
      title: "Neural Models",
      desc: "Large language models, vision engines, and weights.",
      count: typeCounts.Model,
      icon: Cpu,
      action: () => { setPopularOnly(false); setSavedOnly(false); setTypeFilter("Model"); },
    },
    {
      title: "Curated Datasets",
      desc: "Training weights, fine-tuning corpora, and benchmarks.",
      count: typeCounts.Dataset,
      icon: Database,
      action: () => { setPopularOnly(false); setSavedOnly(false); setTypeFilter("Dataset"); },
    },
    {
      title: "Dev Frameworks",
      desc: "Libraries, CLI tools, runtime backends, and runtimes.",
      count: typeCounts.Framework,
      icon: Layers,
      action: () => { setPopularOnly(false); setSavedOnly(false); setTypeFilter("Framework"); },
    },
    {
      title: "AI Platforms",
      desc: "Inference hosting, serverless API providers, and GPU clouds.",
      count: typeCounts.Platform,
      icon: Laptop,
      action: () => { setPopularOnly(false); setSavedOnly(false); setTypeFilter("Platform"); },
    },
    {
      title: "Popular Selections",
      desc: "Highest-rated and most frequently bookmarked tools.",
      count: typeCounts.Popular,
      icon: Star,
      action: () => { setSavedOnly(false); setPopularOnly(true); setTypeFilter("All"); },
    },
  ];

  const navigateCatalog = () => {
    setBrowseAll(true);
    setActiveView("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="categories"
      className="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl transition-all scroll-mt-24 shadow-xs"
    >
      {/* Section heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 pb-5 border-b border-neutral-100 dark:border-white/[0.04]">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Interactive Catalog
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Discover by Ecosystem Category
          </h2>
          <p className="text-xs leading-relaxed max-w-xl text-neutral-500 dark:text-neutral-400 mt-1">
            Access curated collections of artificial intelligence models, frameworks, fine-tuning datasets, and platform services.
          </p>
        </div>

        <div className="shrink-0 flex items-center">
          <button
            onClick={navigateCatalog}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer shadow-xs flex items-center gap-2"
          >
            <BookOpen size={14} />
            <span>Browse All {entries.length} Assets</span>
          </button>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <button
              key={i}
              onClick={() => {
                cat.action();
                setSearchInput("");
                setBrowseAll(true);
                setActiveView("catalog");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group relative flex flex-col items-start p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white/50 dark:bg-neutral-950/40 hover:border-neutral-300 dark:hover:border-white/20 transition-all duration-200 cursor-pointer text-left shadow-xs"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-white/[0.06] tabular-nums">
                  {cat.count} items
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-white/[0.06] text-neutral-900 dark:text-white mb-3">
                <Icon size={18} />
              </div>
              <h3 className="font-bold text-sm mb-1 text-neutral-900 dark:text-white">
                {cat.title}
              </h3>
              <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">{cat.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
