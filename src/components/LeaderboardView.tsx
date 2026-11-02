import React, { useState, useMemo } from "react";
import { 
  Trophy, 
  Sparkles, 
  Zap, 
  DollarSign, 
  Clock, 
  Search, 
  ExternalLink, 
  ChevronUp, 
  ChevronDown, 
  BarChart3, 
  Layers, 
  RotateCcw
} from "lucide-react";
import { useTheme } from "../lib/theme";
import { LEADERBOARD_MODELS, type LeaderboardModel } from "../data/leaderboardData";

interface LeaderboardViewProps {
  onBackToHome?: () => void;
}

type MetricTab = "intelligence" | "pricing" | "speed" | "latency" | "all";
type SortField = keyof LeaderboardModel;
type SortOrder = "asc" | "desc";

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onBackToHome }) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";

  const [activeTab, setActiveTab] = useState<MetricTab>("intelligence");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<string>("All");
  const [selectedLicense, setSelectedLicense] = useState<string>("All");
  const [sortField, setSortField] = useState<SortField>("intelligenceIndex");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedModel, setSelectedModel] = useState<LeaderboardModel | null>(null);
  const [showMatrix, setShowMatrix] = useState<boolean>(false);

  // Unique creators for filtering
  const creators = useMemo(() => {
    const set = new Set<string>();
    LEADERBOARD_MODELS.forEach((m) => set.add(m.creator));
    return ["All", ...Array.from(set).sort()];
  }, []);

  // Top 3 Podium Models based on default intelligence index
  const podiumModels = useMemo(() => {
    const sorted = [...LEADERBOARD_MODELS]
      .filter((m) => m.intelligenceIndex !== null)
      .sort((a, b) => (b.intelligenceIndex || 0) - (a.intelligenceIndex || 0));
    return sorted.slice(0, 3);
  }, []);

  // Filtered and sorted models
  const processedModels = useMemo(() => {
    return LEADERBOARD_MODELS.filter((m) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesCreator = m.creator.toLowerCase().includes(q);
        if (!matchesName && !matchesCreator) return false;
      }

      // Creator filter
      if (selectedCreator !== "All" && m.creator !== selectedCreator) {
        return false;
      }

      // License filter
      if (selectedLicense !== "All" && m.license !== selectedLicense) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      // Handle nulls always at the bottom
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      return sortOrder === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [searchQuery, selectedCreator, selectedLicense, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      // Default to ascending for prices and latency (lower is better)
      if (
        field === "costPerTask" ||
        field === "inputPrice" ||
        field === "outputPrice" ||
        field === "latencyFirstChunk"
      ) {
        setSortOrder("asc");
      } else {
        setSortOrder("desc");
      }
    }
  };

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <span className="opacity-20 text-[10px] ml-1">⇅</span>;
    }
    return sortOrder === "asc" ? (
      <ChevronUp size={12} className="inline ml-1 text-blue-500" />
    ) : (
      <ChevronDown size={12} className="inline ml-1 text-blue-500" />
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1880px] 2xl:max-w-[2040px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 text-left animate-fade-in">
      {/* ── 1. Editorial Header & Navigation ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200/80 dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Trophy size={12} />
              Verified AI Benchmark Index
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              Artificial Analysis Data
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            AI Frontier Leaderboard
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            Independent evaluation of frontier intelligence index, agentic reasoning, code synthesis,
            pricing ($/1M tokens), generation speed (tok/s), and real-world latency.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              showMatrix
                ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                : "border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-300"
            }`}
          >
            <BarChart3 size={14} />
            <span>{showMatrix ? "Hide Value Matrix" : "Pareto Value Matrix"}</span>
          </button>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 transition-all cursor-pointer"
            >
              Back to Home
            </button>
          )}
        </div>
      </div>

      {/* ── 2. Top 3 Podium Showcase ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {podiumModels.map((model, idx) => {
          const rankColors = [
            {
              border: "border-amber-400/40 dark:border-amber-500/30",
              badge: "bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-400/30",
              crown: "text-amber-500",
              rank: "1st Place",
              glow: "from-amber-500/10 to-transparent",
            },
            {
              border: "border-neutral-300 dark:border-white/20",
              badge: "bg-neutral-200/50 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-white/20",
              crown: "text-neutral-400",
              rank: "2nd Place",
              glow: "from-neutral-500/10 to-transparent",
            },
            {
              border: "border-amber-700/30 dark:border-amber-600/20",
              badge: "bg-amber-700/10 text-amber-700 dark:text-amber-500 border-amber-700/20",
              crown: "text-amber-700",
              rank: "3rd Place",
              glow: "from-amber-700/10 to-transparent",
            },
          ][idx];

          return (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${rankColors.border} ${
                isAmoled
                  ? "bg-gradient-to-b bg-[#17181a] hover:bg-[#1e1f21]"
                  : "bg-gradient-to-b bg-white hover:bg-neutral-50 shadow-xs hover:shadow-md"
              }`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${rankColors.glow} rounded-bl-full pointer-events-none`} />

              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${rankColors.badge}`}>
                  {rankColors.rank}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {model.creator}
                </span>
              </div>

              <h3 className="text-lg font-bold text-neutral-900 dark:text-white truncate">
                {model.name}
              </h3>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-neutral-100 dark:border-white/[0.06]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                    Intelligence Index
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums">
                      {model.intelligenceIndex}
                    </span>
                    <span className="text-xs text-neutral-400">/ 100</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                    Briefcase Elo
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
                      {model.briefcaseElo ?? "--"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-4 pt-3 border-t border-neutral-100 dark:border-white/[0.06]">
                <span>Cost: <strong className="text-neutral-900 dark:text-white font-mono">${model.costPerTask?.toFixed(2) ?? "--"}</strong>/task</span>
                <span>Speed: <strong className="text-neutral-900 dark:text-white font-mono">{model.speedMedian ?? "--"}</strong> tok/s</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3. Pareto Value Matrix (Intelligence vs. Price) ── */}
      {showMatrix && (
        <div className={`p-6 rounded-2xl border transition-all ${
          isAmoled ? "bg-[#141517] border-white/10" : "bg-neutral-50/70 border-neutral-200"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Sparkles size={14} className="text-blue-500" />
                Value Frontier Matrix (Intelligence vs. Cost per Task)
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Top-left represents maximum cost efficiency (High Intelligence, Low Cost).
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> OpenAI</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Anthropic</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Google</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> DeepSeek</span>
            </div>
          </div>

          <div className="relative h-64 w-full border border-neutral-200 dark:border-white/10 rounded-xl p-4 bg-white/50 dark:bg-black/30 overflow-hidden">
            {/* Quadrant labels */}
            <span className="absolute top-2 left-3 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              ✦ Optimal Value (High Intel, Low Cost)
            </span>
            <span className="absolute top-2 right-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Frontier Peak (Premium Cost)
            </span>
            <span className="absolute bottom-2 left-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Budget / Lightweight
            </span>

            {/* Plot models as points */}
            <div className="relative w-full h-full">
              {LEADERBOARD_MODELS.filter((m) => m.intelligenceIndex !== null && m.costPerTask !== null).map((m) => {
                // X: cost per task from $0 to $13
                const xPercent = Math.min(95, Math.max(5, ((m.costPerTask || 0) / 13) * 90 + 5));
                // Y: intelligence from 0 to 65 (inverted so high is top)
                const yPercent = Math.min(92, Math.max(8, 100 - ((m.intelligenceIndex || 0) / 65) * 85));

                const colorCls =
                  m.creator === "OpenAI"
                    ? "bg-emerald-500"
                    : m.creator === "Anthropic"
                    ? "bg-amber-500"
                    : m.creator === "Google"
                    ? "bg-blue-500"
                    : m.creator === "DeepSeek"
                    ? "bg-cyan-500"
                    : "bg-purple-500";

                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m)}
                    style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full ${colorCls} hover:scale-150 transition-transform cursor-pointer border border-white dark:border-black shadow-xs group`}
                    title={`${m.name} (${m.creator}) - Index: ${m.intelligenceIndex}, $${m.costPerTask?.toFixed(2)}/task`}
                  >
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-neutral-900 text-white whitespace-nowrap z-20 pointer-events-none shadow-md">
                      {m.name}: {m.intelligenceIndex} pts · ${m.costPerTask?.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── 4. Dimension Tabs & Filters Row ── */}
      <div className="flex flex-col gap-4">
        {/* Dimension Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-neutral-200/60 dark:border-white/[0.06]">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: "intelligence", label: "Intelligence", icon: Sparkles },
              { id: "pricing", label: "Pricing & Cost", icon: DollarSign },
              { id: "speed", label: "Speed & Tokens/s", icon: Zap },
              { id: "latency", label: "Latency & Time", icon: Clock },
              { id: "all", label: "All Dimensions", icon: Layers },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as MetricTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? isAmoled
                        ? "bg-white text-black shadow-xs font-bold"
                        : "bg-neutral-900 text-white shadow-xs font-bold"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="font-semibold text-neutral-900 dark:text-white">
              {processedModels.length}
            </span>
            <span>of {LEADERBOARD_MODELS.length} models</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search size={14} className="absolute left-3.5 top-3 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter model name or lab..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-wrap">
            {/* Creator Filter */}
            <select
              value={selectedCreator}
              onChange={(e) => setSelectedCreator(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
            >
              {creators.map((c) => (
                <option key={c} value={c}>
                  Lab: {c}
                </option>
              ))}
            </select>

            {/* License Filter */}
            <select
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
            >
              <option value="All">All Licenses</option>
              <option value="Proprietary">Proprietary</option>
              <option value="Open">Open Weights</option>
            </select>

            {(selectedCreator !== "All" || selectedLicense !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCreator("All");
                  setSelectedLicense("All");
                  setSearchQuery("");
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 5. High-Density Leaderboard Table ── */}
      <div className={`overflow-x-auto rounded-2xl border ${
        isAmoled ? "border-white/10 bg-[#161719]" : "border-neutral-200 bg-white shadow-xs"
      }`}>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className={`border-b ${
              isAmoled
                ? "bg-white/[0.02] border-white/10 text-neutral-400"
                : "bg-neutral-50/80 border-neutral-200 text-neutral-600"
            }`}>
              <th className="py-3.5 pl-4 pr-2 font-semibold">#</th>
              <th
                onClick={() => handleSort("name")}
                className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white whitespace-nowrap"
              >
                Model & Creator {renderSortIndicator("name")}
              </th>

              {/* Intelligence Columns */}
              {(activeTab === "intelligence" || activeTab === "all") && (
                <>
                  <th
                    onClick={() => handleSort("intelligenceIndex")}
                    className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white text-right whitespace-nowrap"
                  >
                    Index {renderSortIndicator("intelligenceIndex")}
                  </th>
                  <th
                    onClick={() => handleSort("briefcaseElo")}
                    className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white text-right whitespace-nowrap"
                  >
                    Briefcase Elo {renderSortIndicator("briefcaseElo")}
                  </th>
                  <th
                    onClick={() => handleSort("accuracy")}
                    className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white text-right whitespace-nowrap"
                  >
                    Accuracy {renderSortIndicator("accuracy")}
                  </th>
                  <th
                    onClick={() => handleSort("nonHallucination")}
                    className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white text-right whitespace-nowrap"
                  >
                    Non-Halluc. {renderSortIndicator("nonHallucination")}
                  </th>
                  <th
                    onClick={() => handleSort("frontierCode")}
                    className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white text-right whitespace-nowrap hidden lg:table-cell"
                  >
                    FrontierCode {renderSortIndicator("frontierCode")}
                  </th>
                </>
              )}

              {/* Pricing Columns */}
              {(activeTab === "pricing" || activeTab === "all") && (
                <>
                  <th
                    onClick={() => handleSort("costPerTask")}
                    className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white text-right whitespace-nowrap"
                  >
                    Cost / Task {renderSortIndicator("costPerTask")}
                  </th>
                  <th
                    onClick={() => handleSort("inputPrice")}
                    className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white text-right whitespace-nowrap"
                  >
                    Input $/1M {renderSortIndicator("inputPrice")}
                  </th>
                  <th
                    onClick={() => handleSort("outputPrice")}
                    className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white text-right whitespace-nowrap"
                  >
                    Output $/1M {renderSortIndicator("outputPrice")}
                  </th>
                </>
              )}

              {/* Speed Columns */}
              {(activeTab === "speed" || activeTab === "all") && (
                <th
                  onClick={() => handleSort("speedMedian")}
                  className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white text-right whitespace-nowrap"
                >
                  Speed (tok/s) {renderSortIndicator("speedMedian")}
                </th>
              )}

              {/* Latency Columns */}
              {(activeTab === "latency" || activeTab === "all") && (
                <th
                  onClick={() => handleSort("latencyFirstChunk")}
                  className="py-3.5 px-3 font-semibold cursor-pointer hover:text-neutral-900 dark:hover:text-white text-right whitespace-nowrap"
                >
                  1st Chunk (s) {renderSortIndicator("latencyFirstChunk")}
                </th>
              )}

              <th className="py-3.5 pr-4 pl-2 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.05]">
            {processedModels.map((m, idx) => {
              const isSelected = selectedModel?.id === m.id;
              const indexColor =
                (m.intelligenceIndex ?? 0) >= 50
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                  : (m.intelligenceIndex ?? 0) >= 30
                  ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20"
                  : "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-white/[0.04] border-neutral-200 dark:border-white/10";

              return (
                <tr
                  key={m.id}
                  onClick={() => setSelectedModel(m)}
                  className={`group transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/70 dark:bg-blue-900/20"
                      : isAmoled
                      ? "hover:bg-white/[0.03]"
                      : "hover:bg-neutral-50/80"
                  }`}
                >
                  {/* Rank number */}
                  <td className="py-3 pl-4 pr-2 font-mono text-neutral-400 tabular-nums">
                    {idx + 1}
                  </td>

                  {/* Model Name & Specs */}
                  <td className="py-3 px-3">
                    <div className="flex flex-col min-w-[200px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {m.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02] text-neutral-500">
                          {m.contextWindow}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                        <span>{m.creator}</span>
                        <span>•</span>
                        <span className={m.license === "Open" ? "text-emerald-600 dark:text-emerald-400" : ""}>
                          {m.license}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Intelligence Columns */}
                  {(activeTab === "intelligence" || activeTab === "all") && (
                    <>
                      <td className="py-3 px-3 text-right">
                        {m.intelligenceIndex !== null ? (
                          <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold tabular-nums border ${indexColor}`}>
                            {m.intelligenceIndex}
                          </span>
                        ) : (
                          <span className="text-neutral-400">--</span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums text-neutral-800 dark:text-neutral-200">
                        {m.briefcaseElo ? (
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {m.briefcaseElo}
                          </span>
                        ) : (
                          <span className="text-neutral-400">--</span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums">
                        {m.accuracy !== null ? `${m.accuracy}%` : <span className="text-neutral-400">--</span>}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums">
                        {m.nonHallucination !== null ? (
                          <span className={m.nonHallucination >= 80 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : ""}>
                            {m.nonHallucination}%
                          </span>
                        ) : (
                          <span className="text-neutral-400">--</span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums hidden lg:table-cell">
                        {m.frontierCode !== null ? `${m.frontierCode}%` : <span className="text-neutral-400">--</span>}
                      </td>
                    </>
                  )}

                  {/* Pricing Columns */}
                  {(activeTab === "pricing" || activeTab === "all") && (
                    <>
                      <td className="py-3 px-3 text-right font-mono tabular-nums">
                        {m.costPerTask !== null ? (
                          <span className="font-semibold text-neutral-900 dark:text-white">
                            ${m.costPerTask.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-neutral-400">--</span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-400">
                        {m.inputPrice !== null ? `$${m.inputPrice.toFixed(2)}` : "--"}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-400">
                        {m.outputPrice !== null ? `$${m.outputPrice.toFixed(2)}` : "--"}
                      </td>
                    </>
                  )}

                  {/* Speed Column */}
                  {(activeTab === "speed" || activeTab === "all") && (
                    <td className="py-3 px-3 text-right font-mono tabular-nums">
                      {m.speedMedian !== null ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-neutral-800 dark:text-neutral-200">
                          <Zap size={11} className="text-amber-500 fill-amber-500" />
                          {m.speedMedian}
                        </span>
                      ) : (
                        <span className="text-neutral-400">--</span>
                      )}
                    </td>
                  )}

                  {/* Latency Column */}
                  {(activeTab === "latency" || activeTab === "all") && (
                    <td className="py-3 px-3 text-right font-mono tabular-nums">
                      {m.latencyFirstChunk !== null ? (
                        <span>{m.latencyFirstChunk.toFixed(1)}s</span>
                      ) : (
                        <span className="text-neutral-400">--</span>
                      )}
                    </td>
                  )}

                  {/* Action Link */}
                  <td className="py-3 pr-4 pl-2 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(m.modelUrl, "_blank", "noopener,noreferrer");
                      }}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      title="View Artificial Analysis Benchmark Card"
                    >
                      <ExternalLink size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── 6. Model Deep-Dive Modal ── */}
      {selectedModel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedModel(null)}
        >
          <div
            className={`relative w-full max-w-xl p-6 rounded-3xl border shadow-2xl ${
              isAmoled ? "bg-[#18191b] border-white/15" : "bg-white border-neutral-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-neutral-400">{selectedModel.creator}</span>
                  <span className="text-xs text-neutral-400">•</span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{selectedModel.license}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                  {selectedModel.name}
                </h2>
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
                <p className="text-xl font-black text-neutral-900 dark:text-white mt-0.5">${selectedModel.costPerTask?.toFixed(2) ?? "--"}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Median Speed</span>
                <p className="text-xl font-black text-amber-500 mt-0.5">{selectedModel.speedMedian ?? "--"} <span className="text-xs font-normal">tok/s</span></p>
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
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-white/[0.08]">
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
