import React, { useEffect, useState } from "react";
import { Sparkles, Flame, FileText, ExternalLink, ArrowRight, Cpu, Layers, Heart, Download, ThumbsUp } from "lucide-react";
import { useTheme } from "../lib/theme";
import type { Entry } from "../types";

interface TrendingModel {
  id: string;
  author: string;
  likes: number;
  downloads: number;
  pipeline_tag: string;
  url: string;
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

export const DailyPulseSection: React.FC<DailyPulseSectionProps> = ({ onSelectEntry, entries = [] }) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";
  const [activeTab, setActiveTab] = useState<"spotlight" | "models" | "papers">("spotlight");
  const [trendingData, setTrendingData] = useState<DailyPulseData | null>(null);
  const [toolOfTheDay, setToolOfTheDay] = useState<Entry | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const trendingRes = await fetch("/data/daily_trending.json");
        if (trendingRes.ok) {
          const data = await trendingRes.json();
          if (isMounted) setTrendingData(data);
        }

        const toolRes = await fetch("/data/tool_of_the_day.json");
        if (toolRes.ok) {
          const data = await toolRes.json();
          if (isMounted && data.tool) {
            setToolOfTheDay(data.tool);
          }
        } else if (entries.length > 0) {
          const pool = entries.filter((e) => e.popular) || entries;
          const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
          if (isMounted) setToolOfTheDay(pool[dayOfYear % pool.length]);
        }
      } catch (err) {
        console.warn("Failed to load daily pulse feeds:", err);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [entries]);

  const spotlight = toolOfTheDay || entries[0] || null;

  return (
    <div className="flex flex-col gap-4">
      {/* Header with Live Indicator & Segmented Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Live Daily Pulse
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Today's AI Pulse & Spotlight
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Synchronized daily: Featured tool of the day, top trending open-weights, and research papers.
          </p>
        </div>

        {/* Apple-style Segmented Control */}
        <div className={`inline-flex items-center p-1 rounded-full border shrink-0 self-start md:self-auto ${
          isAmoled 
            ? "bg-white/[0.04] border-white/10" 
            : "bg-neutral-100 border-neutral-200"
        }`}>
          <button
            onClick={() => setActiveTab("spotlight")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "spotlight"
                ? isAmoled
                  ? "bg-neutral-800 text-white shadow-xs font-semibold"
                  : "bg-white text-neutral-900 shadow-xs font-semibold"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Sparkles size={13} />
            <span>Spotlight</span>
          </button>
          <button
            onClick={() => setActiveTab("models")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "models"
                ? isAmoled
                  ? "bg-neutral-800 text-white shadow-xs font-semibold"
                  : "bg-white text-neutral-900 shadow-xs font-semibold"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Flame size={13} />
            <span>Trending Models</span>
          </button>
          <button
            onClick={() => setActiveTab("papers")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "papers"
                ? isAmoled
                  ? "bg-neutral-800 text-white shadow-xs font-semibold"
                  : "bg-white text-neutral-900 shadow-xs font-semibold"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <FileText size={13} />
            <span>Research Papers</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "spotlight" && spotlight && (
        <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-200 ${
          isAmoled
            ? "bg-neutral-900/40 border-white/[0.08]"
            : "bg-neutral-50/70 border-neutral-200/80"
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border flex items-center gap-1 ${
                  isAmoled
                    ? "bg-white/[0.08] text-white border-white/15"
                    : "bg-white text-neutral-900 border-neutral-200 shadow-xs"
                }`}>
                  <Sparkles size={11} /> Spotlight of the Day
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                  isAmoled
                    ? "bg-white/[0.04] text-neutral-300 border-white/10"
                    : "bg-neutral-100 text-neutral-700 border-neutral-200"
                }`}>
                  {spotlight.type}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                  isAmoled
                    ? "bg-white/[0.04] text-neutral-300 border-white/10"
                    : "bg-neutral-100 text-neutral-700 border-neutral-200"
                }`}>
                  {spotlight.task}
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                  by <span className="text-neutral-900 dark:text-white font-medium">{spotlight.org}</span>
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
                  <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    isAmoled
                      ? "bg-white/[0.02] border-white/[0.07]"
                      : "bg-white border-neutral-200/80 shadow-xs"
                  }`}>
                    <Cpu size={16} className="text-neutral-500 dark:text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase font-medium tracking-wider text-neutral-400 dark:text-neutral-400">
                        Architecture Specs
                      </span>
                      <span className="text-xs font-medium text-neutral-900 dark:text-white line-clamp-2 mt-0.5">
                        {spotlight.architecture}
                      </span>
                    </div>
                  </div>
                )}
                {spotlight.benchmarks && (
                  <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    isAmoled
                      ? "bg-white/[0.02] border-white/[0.07]"
                      : "bg-white border-neutral-200/80 shadow-xs"
                  }`}>
                    <Layers size={16} className="text-neutral-500 dark:text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase font-medium tracking-wider text-neutral-400 dark:text-neutral-400">
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
                  onClick={() => onSelectEntry(spotlight)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAmoled
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  } shadow-xs`}
                >
                  Inspect Details <ArrowRight size={13} />
                </button>
              )}
              {spotlight.url && (
                <a
                  href={spotlight.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-5 py-2.5 rounded-full text-xs font-medium border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAmoled
                      ? "border-white/15 text-neutral-200 hover:bg-white/[0.06] hover:border-white/25"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingData?.models && trendingData.models.length > 0 ? (
            trendingData.models.slice(0, 6).map((m) => (
              <a
                key={m.id}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isAmoled
                    ? "bg-neutral-900/40 border-white/[0.08] hover:border-white/[0.18] hover:bg-neutral-900/70"
                    : "bg-neutral-50/70 border-neutral-200/80 hover:border-neutral-300 hover:bg-white"
                } hover:-translate-y-0.5 hover:shadow-xs`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider border ${
                      isAmoled 
                        ? "bg-white/[0.04] text-neutral-300 border-white/10" 
                        : "bg-neutral-100 text-neutral-600 border-neutral-200"
                    }`}>
                      {m.pipeline_tag}
                    </span>
                    <span className="text-[11px] font-medium text-neutral-400">
                      by <span className="text-neutral-700 dark:text-neutral-300">{m.author}</span>
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold mb-2 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors text-neutral-900 dark:text-white break-all">
                    {m.id}
                  </h4>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-white/[0.05] flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-medium text-neutral-600 dark:text-neutral-300">
                      <Heart size={12} className="text-neutral-400 dark:text-neutral-400" />
                      {m.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-neutral-600 dark:text-neutral-300">
                      <Download size={12} className="text-neutral-400 dark:text-neutral-400" />
                      {m.downloads.toLocaleString()}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-medium text-neutral-700 dark:text-neutral-300 group-hover:gap-1.5 transition-all">
                    HuggingFace <ExternalLink size={11} />
                  </span>
                </div>
              </a>
            ))
          ) : (
            <div className={`col-span-2 p-8 text-center rounded-2xl border ${
              isAmoled ? "bg-neutral-900/40 border-white/[0.08]" : "bg-neutral-50/70 border-neutral-200/80"
            } text-neutral-400`}>
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
                    ? "bg-neutral-900/40 border-white/[0.08] hover:border-white/[0.18] hover:bg-neutral-900/70"
                    : "bg-neutral-50/70 border-neutral-200/80 hover:border-neutral-300 hover:bg-white"
                } hover:-translate-y-0.5 hover:shadow-xs`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium uppercase tracking-wider border flex items-center gap-1 ${
                      isAmoled
                        ? "bg-white/[0.04] text-neutral-300 border-white/10"
                        : "bg-neutral-100 text-neutral-600 border-neutral-200"
                    }`}>
                      <FileText size={10} /> Research Paper
                    </span>
                    <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
                      <ThumbsUp size={11} /> {p.upvotes}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold mb-2 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors text-neutral-900 dark:text-white line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-3 mb-4 font-normal">
                    {p.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 dark:border-white/[0.05] flex items-center justify-between text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                  <span>Read on ArXiv / HF Papers</span>
                  <ExternalLink size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))
          ) : (
            <div className={`col-span-2 p-8 text-center rounded-2xl border ${
              isAmoled ? "bg-neutral-900/40 border-white/[0.08]" : "bg-neutral-50/70 border-neutral-200/80"
            } text-neutral-400`}>
              Daily papers feed updating. Check back shortly.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

