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
      color: "text-rose-500 bg-rose-500/10",
      action: () => { setPopularOnly(false); setSavedOnly(false); setTypeFilter("AI"); },
    },
    {
      title: "Neural Models",
      desc: "Large language models, vision engines, and weights.",
      count: typeCounts.Model,
      icon: Cpu,
      color: "text-purple-500 bg-purple-500/10",
      action: () => { setPopularOnly(false); setSavedOnly(false); setTypeFilter("Model"); },
    },
    {
      title: "Curated Datasets",
      desc: "Training weights, fine-tuning corpora, and benchmarks.",
      count: typeCounts.Dataset,
      icon: Database,
      color: "text-emerald-500 bg-emerald-500/10",
      action: () => { setPopularOnly(false); setSavedOnly(false); setTypeFilter("Dataset"); },
    },
    {
      title: "Dev Frameworks",
      desc: "Libraries, CLI tools, runtime backends, and runtimes.",
      count: typeCounts.Framework,
      icon: Layers,
      color: "text-amber-500 bg-amber-500/10",
      action: () => { setPopularOnly(false); setSavedOnly(false); setTypeFilter("Framework"); },
    },
    {
      title: "AI Platforms",
      desc: "Inference hosting, serverless API providers, and GPU clouds.",
      count: typeCounts.Platform,
      icon: Laptop,
      color: "text-indigo-600 bg-indigo-500/10 dark:text-indigo-400",
      action: () => { setPopularOnly(false); setSavedOnly(false); setTypeFilter("Platform"); },
    },
    {
      title: "Popular Selections",
      desc: "Highest-rated and most frequently bookmarked tools.",
      count: typeCounts.Popular,
      icon: Star,
      color: "text-amber-400 bg-amber-400/10",
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
      className="p-5 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] shadow-xs"
    >
      {/* Section heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200/70 dark:border-white/[0.06]">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Interactive Catalog
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Discover by Ecosystem Category
          </h2>
          <p className="text-xs leading-relaxed max-w-xl text-neutral-500 dark:text-neutral-400 mt-0.5">
            Access curated collections of artificial intelligence models, frameworks, fine-tuning datasets, and platform services.
          </p>
        </div>

        <div className="shrink-0 flex items-center">
          <button
            onClick={navigateCatalog}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/[0.1] bg-neutral-50 dark:bg-[#121319] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer shadow-xs flex items-center gap-2"
          >
            <BookOpen size={13} />
            <span>Browse All {entries.length} Assets</span>
          </button>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3.5">
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
              className="group relative flex flex-col items-start p-4 rounded-xl border border-neutral-200/80 dark:border-white/[0.07] bg-neutral-50/80 dark:bg-[#121319] hover:border-indigo-300 dark:hover:border-indigo-500/35 hover:bg-white dark:hover:bg-[#161822] transition-all cursor-pointer text-left"
            >
              <div className="absolute top-3.5 right-3.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-[#0c0d11] text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-white/[0.08] tabular-nums">
                  {cat.count} items
                </span>
              </div>
              <div className={`p-2 rounded-xl ${cat.color} mb-2.5`}>
                <Icon size={16} />
              </div>
              <h3 className="font-bold text-xs sm:text-sm mb-1 text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {cat.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-400">{cat.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
