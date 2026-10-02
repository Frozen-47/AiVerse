import React from "react";
import { 
  Search, 
  Command, 
  Globe, 
  Cpu, 
  Zap, 
  Database, 
  Cloud, 
  Sparkles,
  Building2,
  X,
  SlidersHorizontal
} from "lucide-react";
import { useTheme } from "../lib/theme";

interface DashboardHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalEntries: number;
  activeType: string;
  onSelectType: (type: string) => void;
  activeTask: string;
  onSelectTask: (task: string) => void;
  onScrollToCatalog: () => void;
  catalogDisplayMode?: "assets" | "ecosystems";
  onSelectDisplayMode?: (mode: "assets" | "ecosystems") => void;
}

const CATEGORY_CHIPS = [
  { id: "All", label: "All Assets", icon: Globe },
  { id: "Ecosystems", label: "AI Labs & Ecosystems", icon: Building2 },
  { id: "Model", label: "Models & LLMs", icon: Cpu },
  { id: "Framework", label: "Frameworks", icon: Zap },
  { id: "Dataset", label: "Datasets", icon: Database },
  { id: "Platform", label: "Platforms", icon: Cloud },
  { id: "AI", label: "Applications", icon: Sparkles },
];

const TASK_CHIPS = [
  { id: "All Tasks", label: "All Tasks" },
  { id: "NLP", label: "NLP & Reasoning" },
  { id: "Computer Vision", label: "Vision & Imaging" },
  { id: "Multimodal", label: "Multimodal" },
  { id: "AI Coding", label: "Coding & Dev" },
  { id: "Audio", label: "Audio & Speech" },
];

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  searchQuery,
  onSearchChange,
  totalEntries,
  activeType,
  onSelectType,
  activeTask,
  onSelectTask,
  onScrollToCatalog,
  catalogDisplayMode = "assets",
  onSelectDisplayMode,
}) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";

  return (
    <div className="relative pt-4 pb-8 sm:pt-8 sm:pb-12 overflow-hidden">
      {/* Subtle atmospheric lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      >
        <div 
          className={`aspect-[1100/350] w-[60rem] flex-none ${
            isAmoled 
              ? "bg-gradient-to-tr from-white/[0.03] via-indigo-500/[0.05] to-white/[0.02]" 
              : "bg-gradient-to-tr from-neutral-200/40 via-indigo-100/30 to-neutral-100/20"
          } opacity-70`}
          style={{
            clipPath:
              "polygon(50% 0%, 80% 25%, 100% 65%, 65% 100%, 35% 100%, 0% 65%, 20% 25%)",
          }}
        />
      </div>

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        {/* Apple/Google minimalist pill badge */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-5 text-[11px] font-medium transition-all backdrop-blur-md ${
          isAmoled
            ? "bg-white/[0.04] border-white/10 text-neutral-300"
            : "bg-neutral-100/80 border-neutral-200 text-neutral-700 shadow-2xs"
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-neutral-400 dark:text-neutral-400">Command Center</span>
          <span className="opacity-30">•</span>
          <span className="font-medium text-neutral-900 dark:text-white">
            {totalEntries > 0 ? `${totalEntries} AI Assets Verified` : "242+ Assets Indexed"}
          </span>
        </div>

        {/* Clean, authoritative headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] mb-4 text-neutral-900 dark:text-white">
          Every AI Tool, Model & Tech.{" "}
          <span className={
            isAmoled 
              ? "bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200 bg-clip-text text-transparent font-extrabold" 
              : "bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent font-extrabold"
          }>
            One Universe.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base leading-relaxed max-w-2xl font-normal mb-8 text-neutral-500 dark:text-neutral-400">
          The citation-backed open compendium. Search architectural blueprints, benchmark scores, licenses, and verified resources.
        </p>

        {/* Spotlight-inspired Search Bar */}
        <div className="w-full max-w-2xl relative mb-6">
          <div className={`relative flex items-center rounded-2xl border px-5 py-3.5 transition-all duration-200 ${
            isAmoled
              ? "bg-neutral-900/70 border-white/10 shadow-xl backdrop-blur-xl focus-within:border-white/30 focus-within:ring-2 focus-within:ring-white/10"
              : "bg-white border-neutral-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-200/80"
          }`}>
            <Search size={19} className="text-neutral-400 dark:text-neutral-400 mr-3.5 shrink-0" />
            <input
              type="text"
              data-search="true"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (e.target.value && onScrollToCatalog) {
                  onScrollToCatalog();
                }
              }}
              placeholder={`Search ${totalEntries > 0 ? totalEntries : 242}+ models, frameworks, datasets, or tasks...`}
              className={`w-full bg-transparent border-none outline-none text-sm md:text-base font-normal pr-3 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500`}
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => onSearchChange("")}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-white mr-2 cursor-pointer transition-colors"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
            <div className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold shrink-0 border ${
              isAmoled
                ? "bg-white/[0.06] text-neutral-400 border-white/10"
                : "bg-neutral-100 text-neutral-500 border-neutral-200"
            }`}>
              <Command size={10} /> K
            </div>
          </div>
        </div>

        {/* Clean Segmented Category Bar (Apple style) */}
        <div className="w-full flex flex-col items-center gap-3.5">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-neutral-100/70 dark:bg-white/[0.04] border border-neutral-200/60 dark:border-white/[0.08] backdrop-blur-md">
            {CATEGORY_CHIPS.map((chip) => {
              const isActive =
                chip.id === "Ecosystems"
                  ? catalogDisplayMode === "ecosystems"
                  : catalogDisplayMode === "assets" && activeType === chip.id;
              const Icon = chip.icon;
              return (
                <button
                  key={chip.id}
                  onClick={() => {
                    if (chip.id === "Ecosystems") {
                      onSelectDisplayMode?.("ecosystems");
                    } else {
                      onSelectDisplayMode?.("assets");
                      onSelectType(chip.id);
                    }
                    onScrollToCatalog();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? isAmoled
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "bg-neutral-900 text-white font-semibold shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon size={14} className="shrink-0" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Task Tags (Clean Minimalist Google style) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            <span className="text-xs font-medium text-neutral-400 dark:text-neutral-400 flex items-center gap-1 mr-1">
              <SlidersHorizontal size={12} /> Filter Task:
            </span>
            {TASK_CHIPS.map((task) => {
              const isActive = activeTask === task.id;
              return (
                <button
                  key={task.id}
                  onClick={() => {
                    onSelectTask(task.id);
                    onScrollToCatalog();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                    isActive
                      ? isAmoled
                        ? "bg-white/15 text-white border-white/30 font-semibold"
                        : "bg-neutral-200 text-neutral-900 border-neutral-300 font-semibold"
                      : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {task.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

