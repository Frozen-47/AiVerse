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
      color: "text-[#1a73e8] bg-[#1a73e8]/10 dark:text-[#a8c7fa]",
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
      className="p-5 sm:p-6 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] shadow-xs"
    >
      {/* Section heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]/40">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1a73e8] dark:bg-[#a8c7fa]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5f6368] dark:text-[#8e918f]">
              Interactive Catalog
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[#202124] dark:text-[#e3e3e3]">
            Discover by Ecosystem Category
          </h2>
          <p className="text-xs leading-relaxed max-w-xl text-[#5f6368] dark:text-[#c4c7c5] mt-0.5">
            Access curated collections of artificial intelligence models, frameworks, fine-tuning datasets, and platform services.
          </p>
        </div>

        <div className="shrink-0 flex items-center">
          <button
            onClick={navigateCatalog}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-all cursor-pointer shadow-xs flex items-center gap-2"
          >
            <BookOpen size={13} />
            <span>Browse All {entries.length} Assets</span>
          </button>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
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
              className="group relative flex flex-col items-start p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-[#f8f9fa] dark:bg-[#282a2c]/30 hover:border-[#1a73e8]/40 dark:hover:border-[#a8c7fa]/40 hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-all cursor-pointer text-left"
            >
              <div className="absolute top-3.5 right-3.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#8e918f] border border-[#dadce0] dark:border-[#3c4043]/60 tabular-nums">
                  {cat.count} items
                </span>
              </div>
              <div className={`p-2 rounded-lg ${cat.color} mb-2.5`}>
                <Icon size={16} />
              </div>
              <h3 className="font-bold text-xs sm:text-sm mb-1 text-[#202124] dark:text-[#e3e3e3] group-hover:text-[#1a73e8] dark:group-hover:text-[#a8c7fa] transition-colors">
                {cat.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-[#5f6368] dark:text-[#c4c7c5]">{cat.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
