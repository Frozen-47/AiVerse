import React, { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Flame,
  Heart,
  Layers,
  Radio,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import {
  fetchDashboardRadarBundle,
  formatRelativeTimestamp,
  type DashboardRadarBundle,
} from "../lib/dashboard";
import { useTheme } from "../lib/theme";
import type { Entry } from "../types";

interface TrendingModel {
  id: string;
  author: string;
  likes: number;
  downloads: number;
  pipeline_tag: string;
  url: string;
  source?: string;
}

interface TrendingPaper {
  title: string;
  summary: string;
  upvotes: number;
  arxiv_id: string;
  url: string;
  githubRepo?: string | null;
}

interface DailyPulseData {
  timestamp?: string;
  models: TrendingModel[];
  papers: TrendingPaper[];
}

interface DailyPulseSectionProps {
  onSelectEntry?: (entry: Entry) => void;
  entries?: Entry[];
}

export const DailyPulseSection: React.FC<DailyPulseSectionProps> = ({
  onSelectEntry,
  entries = [],
}) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";
  const [activeTab, setActiveTab] = useState<"spotlight" | "models" | "papers" | "radar">(
    "spotlight",
  );
  const [trendingData, setTrendingData] = useState<DailyPulseData | null>(null);
  const [toolOfTheDay, setToolOfTheDay] = useState<Entry | null>(null);
  const [radarBundle, setRadarBundle] = useState<DashboardRadarBundle | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [trendingRes, toolRes, radar] = await Promise.all([
          fetch("/data/daily_trending.json").catch(() => null),
          fetch("/data/tool_of_the_day.json").catch(() => null),
          fetchDashboardRadarBundle(),
        ]);

        if (trendingRes?.ok) {
          const data = (await trendingRes.json()) as DailyPulseData;
          if (isMounted) setTrendingData(data);
        }

        if (toolRes?.ok) {
          const data = (await toolRes.json()) as { tool?: Entry };
          if (isMounted && data.tool) {
            setToolOfTheDay(data.tool);
          }
        } else if (entries.length > 0) {
          const pool = entries.filter((e) => e.popular);
          const sourcePool = pool.length > 0 ? pool : entries;
          const dayOfYear = Math.floor(
            (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
          );
          if (isMounted) setToolOfTheDay(sourcePool[dayOfYear % sourcePool.length]);
        }

        if (isMounted) {
          setRadarBundle(radar);
        }
      } catch (err) {
        console.warn("Failed to load daily pulse feeds:", err);
      }
    }

    void loadData();
    return () => {
      isMounted = false;
    };
  }, [entries]);

  const spotlight = toolOfTheDay || entries[0] || null;
  const latestBatch = radarBundle?.recentBatches?.[0] ?? null;
  const linksHealth = radarBundle?.linksHealth ?? null;
  const latestRun = radarBundle?.latestRun ?? null;
  const syncAge = formatRelativeTimestamp(trendingData?.timestamp || latestRun?.timestamp);

  return (
    <div id="radar-pulse" className="flex flex-col gap-4 scroll-mt-24">
      {/* Header with Live Indicator & Segmented Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Live AI Radar
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-100/80 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-300 font-mono">
              Synced {syncAge}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Live AI Radar & Ecosystem Spotlight
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time ecosystem radar: featured tool of the day, trending models, research papers, and automated ingestion health.
          </p>
        </div>

        {/* Segmented Control */}
        <div
          role="tablist"
          aria-label="Live AI Radar Feeds"
          className={`inline-flex items-center p-1 rounded-2xl border shrink-0 overflow-x-auto no-scrollbar max-w-full ${
            isAmoled
              ? "bg-[#0c0d11] border-white/[0.08]"
              : "bg-neutral-100 border-neutral-200/80"
          }`}
        >
          {(
            [
              { id: "spotlight", label: "Spotlight", icon: Sparkles },
              { id: "models", label: "Trending Models", icon: Flame },
              { id: "papers", label: "Research Papers", icon: FileText },
              { id: "radar", label: "Radar Feed & Health", icon: Radio },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap ${
                  isActive
                    ? isAmoled
                      ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-xs font-semibold"
                      : "bg-white text-indigo-600 shadow-xs font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-transparent"
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: SPOTLIGHT */}
      {activeTab === "spotlight" && spotlight && (
        <div
          className={`p-6 md:p-8 rounded-2xl border transition-all duration-200 ${
            isAmoled
              ? "bg-[#0c0d11] border-white/[0.08]"
              : "bg-white/95 border-neutral-200/80 shadow-xs"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border flex items-center gap-1 ${
                    isAmoled
                      ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/30"
                      : "bg-indigo-50 text-indigo-600 border-indigo-200/80 shadow-xs"
                  }`}
                >
                  <Sparkles size={11} /> Spotlight of the Day
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                    isAmoled
                      ? "bg-white/[0.04] text-neutral-300 border-white/[0.08]"
                      : "bg-neutral-100 text-neutral-700 border-neutral-200"
                  }`}
                >
                  {spotlight.type}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                    isAmoled
                      ? "bg-white/[0.04] text-neutral-300 border-white/[0.08]"
                      : "bg-neutral-100 text-neutral-700 border-neutral-200"
                  }`}
                >
                  {spotlight.task}
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  by{" "}
                  <span className="text-neutral-900 dark:text-white font-medium">
                    {spotlight.org}
                  </span>
                </span>
              </div>

              <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
                {spotlight.name}
              </h4>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 font-normal">
                {spotlight.summary}
              </p>

              {/* Badges / Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                {spotlight.architecture && (
                  <div
                    className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                      isAmoled
                        ? "bg-[#121319] border-white/[0.07]"
                        : "bg-neutral-50/80 border-neutral-200/80 shadow-xs"
                    }`}
                  >
                    <Cpu size={16} className="text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase font-semibold tracking-wider text-neutral-500 dark:text-neutral-400">
                        Architecture Specs
                      </span>
                      <span className="text-xs font-medium text-neutral-900 dark:text-white line-clamp-2 mt-0.5">
                        {spotlight.architecture}
                      </span>
                    </div>
                  </div>
                )}
                {spotlight.benchmarks && (
                  <div
                    className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                      isAmoled
                        ? "bg-[#121319] border-white/[0.07]"
                        : "bg-neutral-50/80 border-neutral-200/80 shadow-xs"
                    }`}
                  >
                    <Layers size={16} className="text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase font-semibold tracking-wider text-neutral-500 dark:text-neutral-400">
                        Verified Benchmarks
                      </span>
                      <span className="text-xs font-medium text-neutral-900 dark:text-white line-clamp-2 mt-0.5">
                        {spotlight.benchmarks}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              {onSelectEntry && (
                <button
                  type="button"
                  onClick={() => onSelectEntry(spotlight)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Inspect Details <ArrowRight size={13} />
                </button>
              )}
              {spotlight.url && (
                <a
                  href={spotlight.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-5 py-2.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAmoled
                      ? "border-white/[0.1] bg-[#121319] text-neutral-200 hover:bg-white/[0.06] hover:border-white/20"
                      : "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  Official Site <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRENDING MODELS */}
      {activeTab === "models" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingData?.models && trendingData.models.length > 0 ? (
            trendingData.models.slice(0, 6).map((m) => (
              <a
                key={m.id}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isAmoled
                    ? "bg-[#0c0d11] border-white/[0.08] hover:border-indigo-500/35 hover:bg-[#101218]"
                    : "bg-white border-neutral-200/80 hover:border-indigo-300 shadow-2xs hover:shadow-xs"
                } hover:-translate-y-0.5`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider border ${
                        isAmoled
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                          : "bg-indigo-50 text-indigo-700 border-indigo-200/80"
                      }`}
                    >
                      {m.pipeline_tag}
                    </span>
                    <span className="text-[11px] font-medium text-neutral-400">
                      by <span className="text-neutral-700 dark:text-neutral-300">{m.author}</span>
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-neutral-900 dark:text-white break-all">
                    {m.id}
                  </h4>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-medium text-neutral-600 dark:text-neutral-300">
                      <Heart size={12} className="text-neutral-400" />
                      {m.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-neutral-600 dark:text-neutral-300">
                      <Download size={12} className="text-neutral-400" />
                      {m.downloads.toLocaleString()}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-1.5 transition-all">
                    {m.source || "Hugging Face"} <ExternalLink size={11} />
                  </span>
                </div>
              </a>
            ))
          ) : (
            <div
              className={`col-span-full p-8 text-center rounded-2xl border ${
                isAmoled ? "bg-[#0c0d11] border-white/[0.08]" : "bg-neutral-50/70 border-neutral-200/80"
              } text-neutral-400`}
            >
              Daily models feed updating. Check back shortly.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DAILY PAPERS */}
      {activeTab === "papers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingData?.papers && trendingData.papers.length > 0 ? (
            trendingData.papers.slice(0, 4).map((p, idx) => (
              <a
                key={idx}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isAmoled
                    ? "bg-[#0c0d11] border-white/[0.08] hover:border-indigo-500/35 hover:bg-[#101218]"
                    : "bg-white border-neutral-200/80 hover:border-indigo-300 shadow-2xs hover:shadow-xs"
                } hover:-translate-y-0.5`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium uppercase tracking-wider border flex items-center gap-1 ${
                        isAmoled
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                          : "bg-indigo-50 text-indigo-700 border-indigo-200/80"
                      }`}
                    >
                      <FileText size={10} /> Research Paper
                    </span>
                    <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
                      <ThumbsUp size={11} /> {p.upvotes}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-neutral-900 dark:text-white line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-3 mb-4 font-normal">
                    {p.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 dark:border-white/[0.06] flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>Read on ArXiv / HF Papers</span>
                  <ExternalLink size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))
          ) : (
            <div
              className={`col-span-full p-8 text-center rounded-2xl border ${
                isAmoled ? "bg-[#0c0d11] border-white/[0.08]" : "bg-neutral-50/70 border-neutral-200/80"
              } text-neutral-400`}
            >
              Daily papers feed updating. Check back shortly.
            </div>
          )}
        </div>
      )}

      {/* TAB 4: RADAR FEED & LINK HEALTH */}
      {activeTab === "radar" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Newly Discovered Assets Queue */}
          <div
            className={`lg:col-span-8 p-5 rounded-2xl border space-y-4 ${
              isAmoled
                ? "bg-[#0c0d11] border-white/[0.08]"
                : "bg-white border-neutral-200/85 shadow-xs"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-200/70 dark:border-white/[0.06]">
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Latest AI Radar Discoveries
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {latestBatch
                    ? `Batch ${latestBatch.date} · Automated candidate feed queued for curation`
                    : "Automated pipeline feed from Artificial Analysis, OpenRouter & Hugging Face"}
                </p>
              </div>
              {latestRun && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Activity size={11} />
                  Run #{latestRun.metadata?.runNumber || "Latest"} · {latestRun.status}
                </span>
              )}
            </div>

            {latestBatch && latestBatch.assets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {latestBatch.assets.map((asset) => (
                  <a
                    key={asset.name}
                    href={asset.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                      isAmoled
                        ? "bg-[#121319] border-white/[0.07] hover:border-indigo-500/35"
                        : "bg-neutral-50/70 border-neutral-200/80 hover:bg-white hover:border-indigo-300"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                          {asset.type} · {asset.task}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 truncate">
                          {asset.org}
                        </span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                        {asset.name}
                      </h5>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                        {asset.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] pt-2 border-t border-neutral-200/60 dark:border-white/[0.06] text-neutral-500 dark:text-neutral-400">
                      <span>{asset.license}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
                        Source <ExternalLink size={10} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 py-6 text-center">
                No recent batch items loaded.
              </p>
            )}
          </div>

          {/* Link Health & Pipeline Audit Card */}
          <div
            className={`lg:col-span-4 p-5 rounded-2xl border flex flex-col justify-between gap-4 ${
              isAmoled
                ? "bg-[#0c0d11] border-white/[0.08]"
                : "bg-white border-neutral-200/85 shadow-xs"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Link & Security Audit
                  </h4>
                </div>
                {latestRun?.metadata?.securityScore !== undefined && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/25">
                    {latestRun.metadata.securityScore}% Secure
                  </span>
                )}
              </div>

              {linksHealth ? (
                <>
                  <div
                    className={`p-3.5 rounded-xl border ${
                      isAmoled
                        ? "bg-[#121319] border-white/[0.07]"
                        : "bg-neutral-50 border-neutral-200/80"
                    }`}
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                        Sampled URL Health
                      </span>
                      <span className="text-sm font-bold tabular-nums text-neutral-900 dark:text-white">
                        {linksHealth.healthy} / {linksHealth.checked} operational
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-white/[0.07] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${Math.round(
                            (linksHealth.healthy / Math.max(1, linksHealth.checked)) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-2">
                      Automated check {formatRelativeTimestamp(linksHealth.timestamp)}
                    </p>
                  </div>

                  {linksHealth.issues && linksHealth.issues.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5">
                        <AlertTriangle size={12} className="text-amber-500" />
                        Flagged in latest sample ({linksHealth.issues.length})
                      </p>
                      <div className="space-y-1.5">
                        {linksHealth.issues.slice(0, 4).map((issue) => (
                          <a
                            key={issue.name}
                            href={issue.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-[11px] transition-colors ${
                              isAmoled
                                ? "bg-[#121319] border-white/[0.06] hover:border-amber-500/35"
                                : "bg-neutral-50 border-neutral-200/70 hover:bg-white"
                            }`}
                          >
                            <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
                              {issue.name}
                            </span>
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-300 shrink-0">
                              {issue.status}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={14} />
                      <span>All sampled URLs healthy.</span>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Link health telemetry unavailable.
                </p>
              )}
            </div>

            {latestRun && (
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 pt-3 border-t border-neutral-200/70 dark:border-white/[0.06] leading-relaxed">
                {latestRun.summary}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
