import React from "react";
import { BookOpen, Sparkles, Cpu, Database, Layers, Laptop, Star } from "lucide-react";
import { useTokens } from "../../lib/theme";
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
  resolvedTheme: string;
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
  resolvedTheme,
  setTypeFilter,
  setSearchInput,
  setBrowseAll,
  setActiveView,
  setSavedOnly,
  setPopularOnly,
}) => {
  const t = useTokens();

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
      className={`p-6 sm:p-8 rounded-[28px] border backdrop-blur-md transition-all scroll-mt-24 ${
        resolvedTheme === "amoled"
          ? "bg-black border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)]"
          : "bg-white border-cyan-200/50 shadow-md shadow-slate-100"
      }`}
    >
      {/* Section heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                resolvedTheme === "amoled"
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                  : "bg-cyan-55 border-cyan-200 text-cyan-700"
              }`}
            >
              Interactive Hub
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight mb-2 ${t.textPrimary}`}>
            Discover the{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              AI Universe
            </span>
          </h2>
          <p className={`text-[14px] leading-relaxed max-w-xl font-light ${t.textSecondary}`}>
            Unlock direct access to the world's most powerful artificial intelligence models, frameworks, curated datasets, and platform services.
          </p>
        </div>

        <div className="shrink-0 flex items-center">
          <button
            onClick={navigateCatalog}
            className={`w-full md:w-auto relative group overflow-hidden px-6 py-4 rounded-2xl border text-center font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${
              resolvedTheme === "amoled"
                ? "bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border-cyan-500/30 text-cyan-100 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                : "bg-linear-to-r from-cyan-50/80 via-blue-50/50 to-indigo-50/50 border-cyan-300 text-cyan-950 hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] shadow-md shadow-slate-100"
            }`}
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[-500%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#06b6d4_360deg)] opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none" />
            <div className="absolute inset-px rounded-[15px] bg-inherit z-0" />
            <div className="relative z-10 flex items-center gap-2">
              <BookOpen size={16} className="text-cyan-500 dark:text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <span className="text-[14px]">Browse All {entries.length} AI Tools</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md border ${
                  resolvedTheme === "amoled"
                    ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-300"
                    : "bg-cyan-100 border-cyan-300 text-cyan-800"
                }`}
              >
                EXPLORE
              </span>
            </div>
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
              className={`group relative flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                resolvedTheme === "amoled"
                  ? "bg-black border-white/6 hover:border-cyan-500/40 hover:bg-cyan-500/2 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                  : "bg-white border-slate-200/60 hover:border-cyan-500/40 hover:bg-cyan-5/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.06)]"
              }`}
            >
              <div className="absolute top-4 right-4">
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                    resolvedTheme === "amoled"
                      ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                      : "bg-cyan-50 border-cyan-500/15 text-cyan-600"
                  }`}
                >
                  {cat.count} items
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/5 text-cyan-500 mb-4 transition-colors group-hover:bg-cyan-500/20 dark:group-hover:bg-cyan-500/15">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className={`font-bold text-[14px] mb-1 group-hover:text-cyan-500 transition-colors ${t.textPrimary}`}>
                {cat.title}
              </h3>
              <p className={`text-[12px] leading-snug ${t.textMuted}`}>{cat.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
