import React, { useState, useMemo } from "react";
import { 
  Trophy, 
  Sparkles, 
  ExternalLink, 
  ChevronUp, 
  ChevronDown, 
  BarChart3, 
  Layers, 
  RotateCcw,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { useTheme } from "../lib/theme";
import { LEADERBOARD_MODELS, type LeaderboardModel } from "../data/leaderboardData";
import { LabLogo } from "./LabLogo";

const getCreatorColor = (creator: string): string => {
  const c = creator.toLowerCase();
  if (c.includes("anthropic")) return "#cc785c";
  if (c.includes("google") || c.includes("deepmind")) return "#34a853";
  if (c.includes("openai")) return "#111827";
  if (c.includes("meta") || c.includes("facebook")) return "#0081fb";
  if (c.includes("deepseek")) return "#0066ff";
  if (c.includes("mistral")) return "#fa520f";
  if (c.includes("xai") || c.includes("spacex") || c.includes("grok")) return "#736cd3";
  if (c.includes("microsoft")) return "#00a4ef";
  if (c.includes("alibaba") || c.includes("qwen")) return "#8b5cf6";
  if (c.includes("amazon") || c.includes("nova")) return "#ff9900";
  if (c.includes("cohere")) return "#39594c";
  return "#6b7280";
};

const formatCost = (val: number | null | undefined): string => {
  if (val === null || val === undefined) return "--";
  if (val === 0) return "$0.00";
  if (val < 0.1) {
    return `$${val.toFixed(4).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")}`;
  }
  return `$${val.toFixed(2)}`;
};

const formatTime = (val: number | null | undefined): string => {
  if (val === null || val === undefined) return "--";
  return val.toFixed(1);
};

const formatLatency = (val: number | null | undefined): string => {
  if (val === null || val === undefined) return "--";
  return val.toFixed(2);
};

interface LeaderboardViewProps {
  onBackToHome?: () => void;
  onSelectEntryByName?: (name: string) => void;
}

type SortField = 
  | "name" 
  | "intelligenceIndex" 
  | "costPerTask" 
  | "timePerTaskMinutes" 
  | "timeToFirstAnswerToken" 
  | "contextTokens"
  | "briefcaseElo"
  | "accuracy"
  | "nonHallucination"
  | "frontierCode"
  | "speedMedian"
  | "inputPrice"
  | "outputPrice";

type SortOrder = "asc" | "desc";

interface ReleaseGroup {
  releaseSlug: string;
  releaseName: string;
  creator: string;
  creatorColor: string;
  contextWindow: string;
  contextTokens: number;
  modelUrl: string;
  providersUrl?: string;
  variants: LeaderboardModel[];
  bestVariant: LeaderboardModel;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onBackToHome, onSelectEntryByName }) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [weightsFilter, setWeightsFilter] = useState<string>("All"); // All | Open | Proprietary
  const [sizeFilter, setSizeFilter] = useState<string>("All"); // All | Large | Medium | Small
  const [priceFilter, setPriceFilter] = useState<string>("All"); // All | < $2 | $2 - $10 | > $10
  const [reasoningFilter, setReasoningFilter] = useState<string>("All"); // All | Reasoning | Non-reasoning
  const [statusFilter, setStatusFilter] = useState<string>("Current"); // Current | Deprecated | All

  // Sorting states
  const [sortField, setSortField] = useState<SortField>("intelligenceIndex");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Expanded releases (initially close everything)
  const [expandedReleases, setExpandedReleases] = useState<Set<string>>(
    () => new Set()
  );

  // Column expansion toggle
  const [expandColumns, setExpandColumns] = useState<boolean>(false);

  // Secondary views
  const [showMatrix, setShowMatrix] = useState<boolean>(false);
  const [showPodium, setShowPodium] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<LeaderboardModel | null>(null);

  const toggleExpand = (slug: string) => {
    setExpandedReleases((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      // Default to ascending for cost, latency, time, input/output prices (lower is better)
      if (
        field === "costPerTask" ||
        field === "timePerTaskMinutes" ||
        field === "timeToFirstAnswerToken" ||
        field === "inputPrice" ||
        field === "outputPrice"
      ) {
        setSortOrder("asc");
      } else {
        setSortOrder("desc");
      }
    }
  };

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <span className="opacity-30 text-[10px] ml-1">↑↓</span>;
    }
    return sortOrder === "asc" ? (
      <span className="text-blue-500 font-bold ml-1 text-xs">↑</span>
    ) : (
      <span className="text-blue-500 font-bold ml-1 text-xs">↓</span>
    );
  };

  // 1. Filter models
  const filteredModels = useMemo(() => {
    return LEADERBOARD_MODELS.filter((m) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = m.name?.toLowerCase().includes(q);
        const matchesRelease = m.releaseName?.toLowerCase().includes(q);
        const matchesCreator = m.creator?.toLowerCase().includes(q);
        const matchesSuffix = m.suffix?.toLowerCase().includes(q);
        if (!matchesName && !matchesRelease && !matchesCreator && !matchesSuffix) return false;
      }

      // Weights filter
      if (weightsFilter === "Open" && m.license !== "Open") return false;
      if (weightsFilter === "Proprietary" && m.license !== "Proprietary") return false;

      // Size filter
      if (sizeFilter !== "All") {
        const pClass = m.paramClass?.toLowerCase() || "";
        const nameLower = m.name.toLowerCase();
        if (sizeFilter === "Large") {
          const isLarge = pClass === "large" || (m.contextTokens && m.contextTokens >= 500000) || nameLower.includes("large") || nameLower.includes("max");
          if (!isLarge) return false;
        } else if (sizeFilter === "Medium") {
          const isMedium = pClass === "medium" || nameLower.includes("medium");
          if (!isMedium) return false;
        } else if (sizeFilter === "Small") {
          const isSmall = pClass === "small" || nameLower.includes("small") || nameLower.includes("mini") || nameLower.includes("flash") || nameLower.includes("low");
          if (!isSmall) return false;
        }
      }

      // Price filter
      if (priceFilter !== "All") {
        if (m.costPerTask === null) return false;
        if (priceFilter === "< $2" && m.costPerTask >= 2) return false;
        if (priceFilter === "$2 - $10" && (m.costPerTask < 2 || m.costPerTask > 10)) return false;
        if (priceFilter === "> $10" && m.costPerTask <= 10) return false;
      }

      // Reasoning filter
      if (reasoningFilter === "Reasoning" && !m.isReasoning) return false;
      if (reasoningFilter === "Non-reasoning" && m.isReasoning) return false;

      // Status filter
      if (statusFilter === "Current" && m.deprecated) return false;
      if (statusFilter === "Deprecated" && !m.deprecated) return false;

      return true;
    });
  }, [searchQuery, weightsFilter, sizeFilter, priceFilter, reasoningFilter, statusFilter]);

  // 2. Group into Release Families
  const groupedReleases = useMemo<ReleaseGroup[]>(() => {
    const groupMap = new Map<string, LeaderboardModel[]>();

    for (const model of filteredModels) {
      const slug = model.releaseSlug || model.id;
      if (!groupMap.has(slug)) {
        groupMap.set(slug, []);
      }
      groupMap.get(slug)!.push(model);
    }

    const groups: ReleaseGroup[] = [];

    groupMap.forEach((variants, slug) => {
      // Sort variants within the group
      variants.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (typeof valA === "number" && typeof valB === "number") {
          return sortOrder === "asc" ? valA - valB : valB - valA;
        }
        return (b.intelligenceIndex || 0) - (a.intelligenceIndex || 0);
      });

      const top = variants[0];
      const relName = top.releaseName || top.name;
      const creatorColor = top.creatorColor || getCreatorColor(top.creator);

      groups.push({
        releaseSlug: slug,
        releaseName: relName,
        creator: top.creator,
        creatorColor,
        contextWindow: top.contextWindow,
        contextTokens: top.contextTokens || 128000,
        modelUrl: top.modelUrl,
        providersUrl: top.providersUrl,
        variants,
        bestVariant: top,
      });
    });

    // Sort the groups by their best variant
    groups.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.releaseName.localeCompare(b.releaseName)
          : b.releaseName.localeCompare(a.releaseName);
      }

      const valA = a.bestVariant[sortField];
      const valB = b.bestVariant[sortField];

      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      return sortOrder === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    return groups;
  }, [filteredModels, sortField, sortOrder]);

  // Top 3 Podium
  const podiumModels = useMemo(() => {
    return [...LEADERBOARD_MODELS]
      .filter((m) => m.intelligenceIndex !== null)
      .sort((a, b) => (b.intelligenceIndex || 0) - (a.intelligenceIndex || 0))
      .slice(0, 3);
  }, []);

  const hasActiveFilters = 
    searchQuery !== "" ||
    weightsFilter !== "All" ||
    sizeFilter !== "All" ||
    priceFilter !== "All" ||
    reasoningFilter !== "All" ||
    statusFilter !== "Current";

  const resetFilters = () => {
    setSearchQuery("");
    setWeightsFilter("All");
    setSizeFilter("All");
    setPriceFilter("All");
    setReasoningFilter("All");
    setStatusFilter("Current");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-8 py-6 text-left animate-fade-in font-sans">
      
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Trophy size={11} />
              Verified AI Benchmark Index
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              Artificial Analysis Flight Data
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            AI Frontier Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Independent evaluation of frontier intelligence index, agentic reasoning, generation speed, real-world latency, and pricing.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={() => setShowPodium(!showPodium)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              showPodium
                ? "bg-amber-500 text-white border-amber-400 shadow-xs"
                : "border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-300"
            }`}
          >
            <Trophy size={13} />
            <span>{showPodium ? "Hide Podium" : "Show Podium"}</span>
          </button>

          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              showMatrix
                ? "bg-blue-600 text-white border-blue-500 shadow-xs"
                : "border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-300"
            }`}
          >
            <BarChart3 size={13} />
            <span>{showMatrix ? "Hide Matrix" : "Value Matrix"}</span>
          </button>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 transition-all cursor-pointer"
            >
              Back to Home
            </button>
          )}
        </div>
      </div>

      {/* ── Optional: Top 3 Podium Showcase ── */}
      {showPodium && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in">
          {podiumModels.map((model, idx) => {
            const rankColors = [
              {
                border: "border-amber-400/40 dark:border-amber-500/30",
                badge: "bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-400/30",
                rank: "1st Place",
              },
              {
                border: "border-neutral-300 dark:border-white/20",
                badge: "bg-neutral-200/50 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-white/20",
                rank: "2nd Place",
              },
              {
                border: "border-amber-700/30 dark:border-amber-600/20",
                badge: "bg-amber-700/10 text-amber-700 dark:text-amber-500 border-amber-700/20",
                rank: "3rd Place",
              },
            ][idx];

            return (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${rankColors.border} ${
                  isAmoled
                    ? "bg-[#161719] hover:bg-[#1c1d20]"
                    : "bg-white hover:bg-neutral-50 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${rankColors.badge}`}>
                    {rankColors.rank}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <LabLogo creator={model.creator} size={14} />
                    <span className="text-xs font-mono text-neutral-400">{model.creator}</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white truncate">
                  {model.name}
                </h3>
                <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-neutral-100 dark:border-white/[0.06]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Intelligence</span>
                    <p className="text-xl font-black text-neutral-900 dark:text-white">{model.intelligenceIndex} <span className="text-xs font-normal text-neutral-400">pts</span></p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Cost/Task</span>
                    <p className="text-sm font-mono font-bold text-neutral-800 dark:text-neutral-200">${model.costPerTask?.toFixed(2) ?? "--"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Optional: Pareto Value Matrix ── */}
      {showMatrix && (
        <div className={`p-5 rounded-2xl border transition-all animate-fade-in ${
          isAmoled ? "bg-[#141517] border-white/10" : "bg-neutral-50/70 border-neutral-200"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Sparkles size={14} className="text-blue-500" />
                Value Frontier Matrix (Intelligence vs. Cost per Task)
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Top-left represents maximum cost efficiency (High Intelligence, Low Cost).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#111827] dark:bg-white" /> OpenAI</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#cc785c]" /> Anthropic</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#34a853]" /> Google</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0066ff]" /> DeepSeek</span>
            </div>
          </div>

          <div className="relative h-60 w-full border border-neutral-200 dark:border-white/10 rounded-xl p-3 bg-white/60 dark:bg-black/40 overflow-hidden">
            <span className="absolute top-2 left-3 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              ✦ Optimal Value (High Intel, Low Cost)
            </span>
            <span className="absolute top-2 right-3 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
              Frontier Peak (Premium Cost)
            </span>
            <span className="absolute bottom-2 left-3 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
              Budget / Lightweight
            </span>

            <div className="relative w-full h-full">
              {LEADERBOARD_MODELS.filter((m) => m.intelligenceIndex !== null && m.costPerTask !== null).map((m) => {
                const xPercent = Math.min(94, Math.max(6, ((m.costPerTask || 0) / 28) * 88 + 6));
                const yPercent = Math.min(90, Math.max(10, 100 - ((m.intelligenceIndex || 0) / 68) * 80));
                const dotColor = getCreatorColor(m.creator);

                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m)}
                    style={{ left: `${xPercent}%`, top: `${yPercent}%`, backgroundColor: dotColor }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full hover:scale-150 transition-transform cursor-pointer border border-white dark:border-black shadow-xs group"
                    title={`${m.name}: ${m.intelligenceIndex} pts, $${m.costPerTask?.toFixed(2)}`}
                  >
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-neutral-900 text-white whitespace-nowrap z-30 pointer-events-none shadow-md">
                      {m.name}: {m.intelligenceIndex} pts · ${m.costPerTask?.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── 2. Artificial Analysis Style Filters & Search Toolbar ── */}
      <div className="flex flex-col gap-3">
        {/* Search Input Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter, e.g. GPT, Meta"
              className="w-full px-3.5 py-1.5 rounded-lg text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Expand Columns Button */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setExpandColumns(!expandColumns)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <span>{expandColumns ? "Collapse columns" : "Expand columns"}</span>
              {expandColumns ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
            </button>
          </div>
        </div>

        {/* Filter Pills Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-wrap pt-0.5">
          {/* Weights Filter */}
          <div className="relative">
            <select
              value={weightsFilter}
              onChange={(e) => setWeightsFilter(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 shadow-2xs"
            >
              <option value="All">Weights: All</option>
              <option value="Open">Weights: Open</option>
              <option value="Proprietary">Weights: Proprietary</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-2.5 text-neutral-500 pointer-events-none" />
          </div>

          {/* Size Filter */}
          <div className="relative">
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 shadow-2xs"
            >
              <option value="All">Size: All</option>
              <option value="Large">Size: Large</option>
              <option value="Medium">Size: Medium</option>
              <option value="Small">Size: Small</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-2.5 text-neutral-500 pointer-events-none" />
          </div>

          {/* Price Filter */}
          <div className="relative">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 shadow-2xs"
            >
              <option value="All">Price: All</option>
              <option value="< $2">Price: &lt; $2</option>
              <option value="$2 - $10">Price: $2 - $10</option>
              <option value="> $10">Price: &gt; $10</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-2.5 text-neutral-500 pointer-events-none" />
          </div>

          {/* Reasoning Filter */}
          <div className="relative">
            <select
              value={reasoningFilter}
              onChange={(e) => setReasoningFilter(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 shadow-2xs"
            >
              <option value="All">Reasoning: All</option>
              <option value="Reasoning">Reasoning: Reasoning</option>
              <option value="Non-reasoning">Reasoning: Non-reasoning</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-2.5 text-neutral-500 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 shadow-2xs"
            >
              <option value="Current">Status: Current</option>
              <option value="Deprecated">Status: Deprecated</option>
              <option value="All">Status: All</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-2.5 text-neutral-500 pointer-events-none" />
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors"
              title="Reset all filters"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          )}

          <div className="ml-auto text-xs text-neutral-400 font-mono hidden md:flex items-center gap-3">
            <button
              onClick={() => {
                if (expandedReleases.size > 0) {
                  setExpandedReleases(new Set());
                } else {
                  setExpandedReleases(new Set(groupedReleases.filter(g => g.variants.length > 1).map(g => g.releaseSlug)));
                }
              }}
              className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline cursor-pointer transition-colors"
            >
              {expandedReleases.size > 0 ? "Collapse all" : "Expand all"}
            </button>
            <span>•</span>
            <span>{groupedReleases.length} releases ({filteredModels.length} variants)</span>
          </div>
        </div>
      </div>

      {/* ── 3. High-Fidelity 2-Tier Leaderboard Table ── */}
      <div className={`rounded-xl border overflow-hidden ${
        isAmoled ? "border-white/10 bg-[#141517]" : "border-neutral-200 bg-white shadow-2xs"
      }`}>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              {/* ── Header Tier 1: Category Groups ── */}
              <tr className={`border-b text-neutral-700 dark:text-neutral-300 ${
                isAmoled ? "bg-white/[0.03] border-white/10" : "bg-neutral-50/80 border-neutral-200"
              }`}>
                {/* Model Column Header */}
                <th
                  rowSpan={2}
                  onClick={() => handleSort("name")}
                  className="py-2.5 px-4 font-semibold text-xs border-r border-neutral-200/60 dark:border-white/[0.06] cursor-pointer hover:text-neutral-900 dark:hover:text-white select-none whitespace-nowrap min-w-[280px]"
                >
                  <div className="flex items-center justify-between">
                    <span>Model</span>
                    {renderSortIndicator("name")}
                  </div>
                </th>

                {/* Intelligence Category */}
                <th
                  colSpan={expandColumns ? 5 : 1}
                  className="py-2 px-3 font-semibold text-xs text-center border-r border-neutral-200/60 dark:border-white/[0.06]"
                >
                  <div className="flex items-center justify-center gap-1 text-neutral-700 dark:text-neutral-300">
                    <span>Intelligence</span>
                    <span className="text-[10px] opacity-40">|&rarr;</span>
                  </div>
                </th>

                {/* Price Category */}
                <th
                  colSpan={expandColumns ? 3 : 1}
                  className="py-2 px-3 font-semibold text-xs text-center border-r border-neutral-200/60 dark:border-white/[0.06]"
                >
                  <div className="flex items-center justify-center gap-1 text-neutral-700 dark:text-neutral-300">
                    <span>Price</span>
                    <span className="text-[10px] opacity-40">|&rarr;</span>
                  </div>
                </th>

                {/* Speed Category */}
                <th
                  colSpan={expandColumns ? 2 : 1}
                  className="py-2 px-3 font-semibold text-xs text-center border-r border-neutral-200/60 dark:border-white/[0.06]"
                >
                  <div className="flex items-center justify-center gap-1 text-neutral-700 dark:text-neutral-300">
                    <span>Speed</span>
                    <span className="text-[10px] opacity-40">|&rarr;</span>
                  </div>
                </th>

                {/* Latency Category */}
                <th
                  className="py-2 px-3 font-semibold text-xs text-center border-r border-neutral-200/60 dark:border-white/[0.06]"
                >
                  <div className="flex items-center justify-center gap-1 text-neutral-700 dark:text-neutral-300">
                    <span>Latency</span>
                    <span className="text-[10px] opacity-40">|&rarr;</span>
                  </div>
                </th>

                {/* Features Category */}
                <th
                  className="py-2 px-3 font-semibold text-xs text-center border-r border-neutral-200/60 dark:border-white/[0.06]"
                >
                  <div className="flex items-center justify-center gap-1 text-neutral-700 dark:text-neutral-300">
                    <span>Features</span>
                    <span className="text-[10px] opacity-40">|&rarr;</span>
                  </div>
                </th>

                {/* Further Analysis */}
                <th
                  rowSpan={2}
                  className="py-2.5 px-4 font-semibold text-xs text-center select-none whitespace-nowrap min-w-[160px]"
                >
                  Further Analysis
                </th>
              </tr>

              {/* ── Header Tier 2: Specific Metric Subheaders ── */}
              <tr className={`border-b text-[11px] text-neutral-600 dark:text-neutral-400 ${
                isAmoled ? "bg-white/[0.02] border-white/10" : "bg-neutral-50/50 border-neutral-200"
              }`}>
                {/* Intelligence Metrics */}
                <th
                  onClick={() => handleSort("intelligenceIndex")}
                  className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                >
                  Artificial Analysis Intelligence Index {renderSortIndicator("intelligenceIndex")}
                </th>

                {expandColumns && (
                  <>
                    <th
                      onClick={() => handleSort("briefcaseElo")}
                      className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                    >
                      Briefcase Elo {renderSortIndicator("briefcaseElo")}
                    </th>
                    <th
                      onClick={() => handleSort("accuracy")}
                      className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                    >
                      Accuracy {renderSortIndicator("accuracy")}
                    </th>
                    <th
                      onClick={() => handleSort("nonHallucination")}
                      className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                    >
                      Non-Halluc. {renderSortIndicator("nonHallucination")}
                    </th>
                    <th
                      onClick={() => handleSort("frontierCode")}
                      className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                    >
                      FrontierCode {renderSortIndicator("frontierCode")}
                    </th>
                  </>
                )}

                {/* Price Metrics */}
                <th
                  onClick={() => handleSort("costPerTask")}
                  className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                >
                  Cost per Task USD {renderSortIndicator("costPerTask")}
                </th>

                {expandColumns && (
                  <>
                    <th
                      onClick={() => handleSort("inputPrice")}
                      className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                    >
                      Input $/1M {renderSortIndicator("inputPrice")}
                    </th>
                    <th
                      onClick={() => handleSort("outputPrice")}
                      className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                    >
                      Output $/1M {renderSortIndicator("outputPrice")}
                    </th>
                  </>
                )}

                {/* Speed Metrics */}
                <th
                  onClick={() => handleSort("timePerTaskMinutes")}
                  className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                >
                  Time per Task Minutes {renderSortIndicator("timePerTaskMinutes")}
                </th>

                {expandColumns && (
                  <th
                    onClick={() => handleSort("speedMedian")}
                    className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                  >
                    Speed (tok/s) {renderSortIndicator("speedMedian")}
                  </th>
                )}

                {/* Latency Metric */}
                <th
                  onClick={() => handleSort("timeToFirstAnswerToken")}
                  className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                >
                  First Answer Token (s) {renderSortIndicator("timeToFirstAnswerToken")}
                </th>

                {/* Features Metric */}
                <th
                  onClick={() => handleSort("contextTokens")}
                  className="py-2 px-3 font-medium cursor-pointer hover:text-neutral-900 dark:hover:text-white border-r border-neutral-200/60 dark:border-white/[0.06] text-center select-none whitespace-nowrap"
                >
                  Context Window {renderSortIndicator("contextTokens")}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.05]">
              {groupedReleases.map((group) => {
                const isExpanded = expandedReleases.has(group.releaseSlug);
                const hasMultiple = group.variants.length > 1;

                if (isExpanded && hasMultiple) {
                  // ── EXPANDED RELEASE GROUP ──
                  const totalMetricCols = 4 + (expandColumns ? 7 : 0);

                  return (
                    <React.Fragment key={group.releaseSlug}>
                      {/* Family Header Row */}
                      <tr
                        onClick={() => toggleExpand(group.releaseSlug)}
                        className={`group cursor-pointer transition-colors ${
                          isAmoled ? "bg-white/[0.015] hover:bg-white/[0.03]" : "bg-neutral-50/40 hover:bg-neutral-50/80"
                        }`}
                      >
                        <td className="py-2.5 px-3 border-r border-neutral-100 dark:border-white/[0.04]">
                          <div className="flex items-center gap-2">
                            {/* Color Accent Bar */}
                            <span
                              style={{ backgroundColor: group.creatorColor }}
                              className="w-1 h-4 rounded-full shrink-0"
                            />
                            {/* Creator Logo */}
                            <LabLogo creator={group.creator} size={15} />
                            {/* Model Family Name */}
                            <span className="font-bold text-neutral-900 dark:text-white text-xs">
                              {group.releaseName}
                            </span>
                            {/* Collapse Icon */}
                            <ChevronUp size={13} className="text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 ml-0.5" />
                          </div>
                        </td>

                        {/* Blank cells for header line metrics */}
                        {Array.from({ length: totalMetricCols }).map((_, idx) => (
                          <td key={idx} className="border-r border-neutral-100 dark:border-white/[0.04]" />
                        ))}

                        {/* Features (Context Window) */}
                        <td
                          rowSpan={group.variants.length + 1}
                          className="py-3 px-3 text-center align-middle font-mono font-medium text-neutral-700 dark:text-neutral-300 border-r border-neutral-100 dark:border-white/[0.04]"
                        >
                          {group.contextWindow}
                        </td>

                        {/* Further Analysis */}
                        <td
                          rowSpan={group.variants.length + 1}
                          className="py-3 px-4 text-center align-middle"
                        >
                          <div className="flex items-center justify-center gap-3 text-xs">
                            <a
                              href={group.modelUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-0.5 font-medium text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <span>Model</span>
                              <ExternalLink size={10} className="inline opacity-60" />
                            </a>
                            <a
                              href={group.providersUrl || `${group.modelUrl}/providers`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-0.5 font-medium text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <span>Providers</span>
                              <ExternalLink size={10} className="inline opacity-60" />
                            </a>
                          </div>
                        </td>
                      </tr>

                      {/* Variant Sub-rows */}
                      {group.variants.map((v) => (
                        <tr
                          key={v.id}
                          onClick={() => setSelectedModel(v)}
                          className={`cursor-pointer transition-colors ${
                            selectedModel?.id === v.id
                              ? "bg-blue-50/70 dark:bg-blue-900/20"
                              : isAmoled
                              ? "hover:bg-white/[0.02]"
                              : "hover:bg-neutral-50/60"
                          }`}
                        >
                          {/* Indented Variant Suffix */}
                          <td className="py-2 pl-9 pr-3 border-r border-neutral-100 dark:border-white/[0.04]">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                              {v.suffix || v.name}
                            </span>
                          </td>

                          {/* Intelligence Index */}
                          <td className="py-2 px-3 text-center tabular-nums font-semibold text-neutral-800 dark:text-neutral-200 border-r border-neutral-100 dark:border-white/[0.04]">
                            {v.intelligenceIndex ?? "--"}
                          </td>

                          {expandColumns && (
                            <>
                              <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                                {v.briefcaseElo ?? "--"}
                              </td>
                              <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                                {v.accuracy != null ? `${v.accuracy}%` : "--"}
                              </td>
                              <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                                {v.nonHallucination != null ? `${v.nonHallucination}%` : "--"}
                              </td>
                              <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                                {v.frontierCode != null ? `${v.frontierCode}%` : "--"}
                              </td>
                            </>
                          )}

                          {/* Cost per Task */}
                          <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-800 dark:text-neutral-200 border-r border-neutral-100 dark:border-white/[0.04]">
                            {formatCost(v.costPerTask)}
                          </td>

                          {expandColumns && (
                            <>
                              <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                                {formatCost(v.inputPrice)}
                              </td>
                              <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                                {formatCost(v.outputPrice)}
                              </td>
                            </>
                          )}

                          {/* Time per Task Minutes */}
                          <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-700 dark:text-neutral-300 border-r border-neutral-100 dark:border-white/[0.04]">
                            {formatTime(v.timePerTaskMinutes)}
                          </td>

                          {expandColumns && (
                            <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                              {v.speedMedian != null ? `${v.speedMedian}` : "--"}
                            </td>
                          )}

                          {/* First Answer Token */}
                          <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-700 dark:text-neutral-300 border-r border-neutral-100 dark:border-white/[0.04]">
                            {formatLatency(v.timeToFirstAnswerToken ?? v.latencyFirstChunk)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                }

                // ── COLLAPSED OR SINGLE VARIANT ROW ──
                const top = group.bestVariant;

                return (
                  <tr
                    key={group.releaseSlug}
                    onClick={() => {
                      if (hasMultiple) {
                        toggleExpand(group.releaseSlug);
                      } else {
                        setSelectedModel(top);
                      }
                    }}
                    className={`cursor-pointer transition-colors ${
                      selectedModel?.id === top.id
                        ? "bg-blue-50/70 dark:bg-blue-900/20"
                        : isAmoled
                        ? "hover:bg-white/[0.02]"
                        : "hover:bg-neutral-50/70"
                    }`}
                  >
                    {/* Model Cell */}
                    <td className="py-2.5 px-3 border-r border-neutral-100 dark:border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        {/* Color Accent Bar */}
                        <span
                          style={{ backgroundColor: group.creatorColor }}
                          className="w-1 h-4 rounded-full shrink-0"
                        />
                        {/* Creator Logo */}
                        <LabLogo creator={group.creator} size={15} />
                        {/* Model Name + Suffix */}
                        <span className="font-bold text-neutral-900 dark:text-white text-xs">
                          {group.releaseName}
                        </span>
                        {hasMultiple && top.suffix && (
                          <span className="text-neutral-500 dark:text-neutral-400 text-xs font-normal">
                            {top.suffix}
                          </span>
                        )}
                        {/* Chevron if expandable */}
                        {hasMultiple && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(group.releaseSlug);
                            }}
                            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                            title="Expand variants"
                          >
                            <ChevronDown size={13} />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Intelligence Index */}
                    <td className="py-2 px-3 text-center tabular-nums font-semibold text-neutral-800 dark:text-neutral-200 border-r border-neutral-100 dark:border-white/[0.04]">
                      {top.intelligenceIndex ?? "--"}
                    </td>

                    {expandColumns && (
                      <>
                        <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                          {top.briefcaseElo ?? "--"}
                        </td>
                        <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                          {top.accuracy != null ? `${top.accuracy}%` : "--"}
                        </td>
                        <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                          {top.nonHallucination != null ? `${top.nonHallucination}%` : "--"}
                        </td>
                        <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                          {top.frontierCode != null ? `${top.frontierCode}%` : "--"}
                        </td>
                      </>
                    )}

                    {/* Cost per Task */}
                    <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-800 dark:text-neutral-200 border-r border-neutral-100 dark:border-white/[0.04]">
                      {formatCost(top.costPerTask)}
                    </td>

                    {expandColumns && (
                      <>
                        <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                          {formatCost(top.inputPrice)}
                        </td>
                        <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                          {formatCost(top.outputPrice)}
                        </td>
                      </>
                    )}

                    {/* Time per Task Minutes */}
                    <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-700 dark:text-neutral-300 border-r border-neutral-100 dark:border-white/[0.04]">
                      {formatTime(top.timePerTaskMinutes)}
                    </td>

                    {expandColumns && (
                      <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-600 dark:text-neutral-400 border-r border-neutral-100 dark:border-white/[0.04]">
                        {top.speedMedian != null ? `${top.speedMedian}` : "--"}
                      </td>
                    )}

                    {/* First Answer Token */}
                    <td className="py-2 px-3 text-center tabular-nums font-mono text-neutral-700 dark:text-neutral-300 border-r border-neutral-100 dark:border-white/[0.04]">
                      {formatLatency(top.timeToFirstAnswerToken ?? top.latencyFirstChunk)}
                    </td>

                    {/* Context Window */}
                    <td className="py-2 px-3 text-center tabular-nums font-mono font-medium text-neutral-700 dark:text-neutral-300 border-r border-neutral-100 dark:border-white/[0.04]">
                      {group.contextWindow}
                    </td>

                    {/* Further Analysis */}
                    <td className="py-2 px-4 text-center">
                      <div className="flex items-center justify-center gap-3 text-xs">
                        <a
                          href={group.modelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-0.5 font-medium text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <span>Model</span>
                          <ExternalLink size={10} className="inline opacity-60" />
                        </a>
                        <a
                          href={group.providersUrl || `${group.modelUrl}/providers`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-0.5 font-medium text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <span>Providers</span>
                          <ExternalLink size={10} className="inline opacity-60" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 4. Model Deep-Dive Modal ── */}
      {selectedModel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedModel(null)}
        >
          <div
            className={`relative w-full max-w-xl max-h-[90dvh] overflow-y-auto no-scrollbar p-5 sm:p-6 rounded-3xl border shadow-2xl ${
              isAmoled ? "bg-[#18191b] border-white/15" : "bg-white border-neutral-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <LabLogo creator={selectedModel.creator} size={15} />
                  <span className="text-xs font-mono text-neutral-400">{selectedModel.creator}</span>
                  <span className="text-xs text-neutral-400">•</span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{selectedModel.license}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
                  {selectedModel.name}
                </h2>
                {selectedModel.description && (
                  <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-300 mt-2 max-w-lg font-normal">
                    {selectedModel.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedModel(null)}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-neutral-100 dark:border-white/[0.08]">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Intelligence Index</span>
                <p className="text-xl font-black text-neutral-900 dark:text-white mt-0.5">{selectedModel.intelligenceIndex ?? "--"}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Briefcase Elo</span>
                <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">{selectedModel.briefcaseElo ?? "--"}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Cost / Task</span>
                <p className="text-xl font-black text-neutral-900 dark:text-white mt-0.5">{formatCost(selectedModel.costPerTask)}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Time / Task</span>
                <p className="text-xl font-black text-amber-500 mt-0.5">
                  {selectedModel.timePerTaskMinutes != null ? `${formatTime(selectedModel.timePerTaskMinutes)}m` : "--"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 my-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Verified Benchmarks</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.02] flex justify-between">
                  <span className="text-neutral-500">Accuracy</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{selectedModel.accuracy ? `${selectedModel.accuracy}%` : "--"}</span>
                </div>
                <div className="p-2.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.02] flex justify-between">
                  <span className="text-neutral-500">Non-Hallucination</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{selectedModel.nonHallucination ? `${selectedModel.nonHallucination}%` : "--"}</span>
                </div>
                <div className="p-2.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.02] flex justify-between">
                  <span className="text-neutral-500">FrontierCode 2.0</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{selectedModel.frontierCode ? `${selectedModel.frontierCode}%` : "--"}</span>
                </div>
                <div className="p-2.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.02] flex justify-between">
                  <span className="text-neutral-500">Terminal-Bench 4.0</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{selectedModel.terminalBench4 ? `${selectedModel.terminalBench4}%` : "--"}</span>
                </div>
                <div className="p-2.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.02] flex justify-between">
                  <span className="text-neutral-500">First Answer Token</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {selectedModel.timeToFirstAnswerToken != null ? `${formatLatency(selectedModel.timeToFirstAnswerToken)}s` : "--"}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.02] flex justify-between">
                  <span className="text-neutral-500">Context Window</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{selectedModel.contextWindow}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-white/[0.08]">
              {onSelectEntryByName && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectEntryByName(selectedModel.name);
                    setSelectedModel(null);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
                >
                  <Layers size={13} />
                  <span>Explore in Compendium</span>
                </button>
              )}
              <a
                href={selectedModel.modelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs hover:opacity-90 transition-opacity"
              >
                <span>View on Artificial Analysis</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
