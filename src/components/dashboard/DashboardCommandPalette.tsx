import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  Compass,
  LayoutGrid,
  Moon,
  Plus,
  Search,
  Sparkles,
  Sun,
  Swords,
  Terminal,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { LEADERBOARD_MODELS, type LeaderboardModel } from "../../data/leaderboardData";
import { getTopFrontierModels, loadRecentViewedNames, searchCatalogQuickMatches } from "../../lib/dashboard";
import { groupEntriesByEcosystem, type EcosystemGroup } from "../../lib/ecosystems";
import { TYPE_GLYPH, useTheme } from "../../lib/theme";
import type { Entry } from "../../types";
import { LabLogo } from "../LabLogo";

type PaletteTab = "all" | "assets" | "labs" | "leaderboard" | "actions";

interface DashboardCommandPaletteProps {
  open: boolean;
  onClose: () => void;
  entries: Entry[];
  onSelectEntry: (entry: Entry) => void;
  onSelectEcosystem: (orgName: string) => void;
  onNavigateDirectory: (query?: string) => void;
  onNavigateLeaderboard: () => void;
  onNavigateFeatures: (subpage: "overview" | "compare" | "wizard" | "playground") => void;
  onNavigateChat: () => void;
  onAddEntry: () => void;
}

interface PaletteItem {
  id: string;
  group: "assets" | "labs" | "leaderboard" | "actions";
  title: string;
  subtitle: string;
  badge?: string;
  onTrigger: () => void;
  entry?: Entry;
  lab?: EcosystemGroup;
  model?: LeaderboardModel;
  icon?: React.ReactNode;
}

export const DashboardCommandPalette: React.FC<DashboardCommandPaletteProps> = ({
  open,
  onClose,
  entries,
  onSelectEntry,
  onSelectEcosystem,
  onNavigateDirectory,
  onNavigateLeaderboard,
  onNavigateFeatures,
  onNavigateChat,
  onAddEntry,
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<PaletteTab>("all");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);
    return () => window.clearTimeout(timer);
  }, [open]);

  const ecosystems = useMemo(() => groupEntriesByEcosystem(entries), [entries]);
  const frontierModels = useMemo(
    () => getTopFrontierModels(LEADERBOARD_MODELS, { limit: 40 }),
    [],
  );

  const recentEntries = useMemo(() => {
    if (!open) return [];
    const names = loadRecentViewedNames();
    const map = new Map(entries.map((e) => [e.name, e]));
    return names.map((n) => map.get(n)).filter((e): e is Entry => Boolean(e)).slice(0, 4);
  }, [open, entries]);

  const actionItems = useMemo<PaletteItem[]>(() => {
    return [
      {
        id: "act-directory",
        group: "actions",
        title: "Browse Full AI Catalog",
        subtitle: `Explore all ${entries.length} verified models, frameworks, datasets & tools`,
        badge: "Directory",
        icon: <LayoutGrid size={15} className="text-indigo-500" />,
        onTrigger: () => {
          onClose();
          onNavigateDirectory(query.trim() || undefined);
        },
      },
      {
        id: "act-leaderboard",
        group: "actions",
        title: "Open Frontier Benchmark Leaderboard",
        subtitle: "Intelligence index, token speed (tok/s), pricing & latency",
        badge: "Rankings",
        icon: <Trophy size={15} className="text-amber-500" />,
        onTrigger: () => {
          onClose();
          onNavigateLeaderboard();
        },
      },
      {
        id: "act-compare",
        group: "actions",
        title: "Launch Comparison Arena",
        subtitle: "Head-to-head specs, licenses & architecture comparison",
        badge: "Arena",
        icon: <Swords size={15} className="text-purple-500" />,
        onTrigger: () => {
          onClose();
          onNavigateFeatures("compare");
        },
      },
      {
        id: "act-wizard",
        group: "actions",
        title: "Start AI Discovery Wizard",
        subtitle: "Get matched recommendations for your stack, goal & license",
        badge: "Advisor",
        icon: <Compass size={15} className="text-cyan-500" />,
        onTrigger: () => {
          onClose();
          onNavigateFeatures("wizard");
        },
      },
      {
        id: "act-playground",
        group: "actions",
        title: "Open Model Playground (Groq LPU)",
        subtitle: "Prompt and compare live LLMs side by side",
        badge: "Live",
        icon: <Terminal size={15} className="text-emerald-500" />,
        onTrigger: () => {
          onClose();
          onNavigateFeatures("playground");
        },
      },
      {
        id: "act-vox",
        group: "actions",
        title: "Ask Vox AI Assistant",
        subtitle: "Chat with citation-grounded AiVerse research assistant",
        badge: "Groq LPU",
        icon: <Zap size={15} className="text-indigo-500" />,
        onTrigger: () => {
          onClose();
          onNavigateChat();
        },
      },
      {
        id: "act-submit",
        group: "actions",
        title: "Submit a New AI Asset",
        subtitle: "Propose a model, framework, dataset, or tool for review",
        badge: "Contribute",
        icon: <Plus size={15} className="text-rose-500" />,
        onTrigger: () => {
          onClose();
          onAddEntry();
        },
      },
      {
        id: "act-theme",
        group: "actions",
        title: isAmoled ? "Switch to Clean Light Mode" : "Switch to AMOLED Dark Mode",
        subtitle: "Toggle global interface theme immediately",
        badge: "Theme",
        icon: isAmoled ? (
          <Sun size={15} className="text-amber-400" />
        ) : (
          <Moon size={15} className="text-indigo-600" />
        ),
        onTrigger: () => {
          setTheme(isAmoled ? "light" : "amoled");
          onClose();
        },
      },
    ];
  }, [
    entries.length,
    isAmoled,
    onAddEntry,
    onClose,
    onNavigateChat,
    onNavigateDirectory,
    onNavigateFeatures,
    onNavigateLeaderboard,
    query,
    setTheme,
  ]);

  const items = useMemo<PaletteItem[]>(() => {
    const q = query.trim().toLowerCase();
    const list: PaletteItem[] = [];

    if (tab === "all" || tab === "assets") {
      const matchedAssets = q
        ? searchCatalogQuickMatches(entries, q, tab === "assets" ? 12 : 6)
        : recentEntries.length > 0
        ? recentEntries
        : entries.filter((e) => e.popular).slice(0, 5);

      for (const entry of matchedAssets) {
        list.push({
          id: `asset-${entry.name}`,
          group: "assets",
          title: entry.name,
          subtitle: `${entry.org} · ${entry.task} · ${entry.license}`,
          badge: entry.type,
          entry,
          onTrigger: () => {
            onClose();
            onSelectEntry(entry);
          },
        });
      }
    }

    if (tab === "all" || tab === "labs") {
      const matchedLabs = q
        ? ecosystems
            .filter(
              (eco) =>
                eco.name.toLowerCase().includes(q) ||
                eco.domain.toLowerCase().includes(q),
            )
            .slice(0, tab === "labs" ? 10 : 4)
        : ecosystems.slice(0, 3);

      for (const lab of matchedLabs) {
        list.push({
          id: `lab-${lab.id}`,
          group: "labs",
          title: lab.name,
          subtitle: `${lab.totalCount} verified assets · ${lab.domain}`,
          badge: "Lab",
          lab,
          icon: <Building2 size={15} className="text-indigo-500" />,
          onTrigger: () => {
            onClose();
            onSelectEcosystem(lab.name);
          },
        });
      }
    }

    if (tab === "all" || tab === "leaderboard") {
      const matchedModels = q
        ? frontierModels
            .filter(
              (m) =>
                m.releaseName.toLowerCase().includes(q) ||
                m.creator.toLowerCase().includes(q),
            )
            .slice(0, tab === "leaderboard" ? 10 : 4)
        : frontierModels.slice(0, 4);

      for (const m of matchedModels) {
        list.push({
          id: `lb-${m.id}`,
          group: "leaderboard",
          title: m.releaseName,
          subtitle: `${m.creator} · Intelligence ${m.intelligenceIndex} · ${
            m.speedMedian ? `${Math.round(m.speedMedian)} tok/s` : m.contextWindow
          }`,
          badge: m.license,
          model: m,
          onTrigger: () => {
            onClose();
            const match = entries.find(
              (e) =>
                e.name.toLowerCase() === m.releaseName.toLowerCase() ||
                e.name.toLowerCase().includes(m.releaseName.toLowerCase()),
            );
            if (match) onSelectEntry(match);
            else onNavigateLeaderboard();
          },
        });
      }
    }

    if (tab === "all" || tab === "actions") {
      const matchedActions = q
        ? actionItems.filter(
            (a) =>
              a.title.toLowerCase().includes(q) ||
              a.subtitle.toLowerCase().includes(q),
          )
        : actionItems.slice(0, tab === "actions" ? actionItems.length : 5);
      list.push(...matchedActions);
    }

    return list;
  }, [
    actionItems,
    ecosystems,
    entries,
    frontierModels,
    onClose,
    onNavigateLeaderboard,
    onSelectEcosystem,
    onSelectEntry,
    query,
    recentEntries,
    tab,
  ]);

  const safeActiveIdx = items.length === 0 ? 0 : Math.min(activeIdx, items.length - 1);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown" && items.length > 0) {
        e.preventDefault();
        setActiveIdx((prev) => (prev + 1) % items.length);
      } else if (e.key === "ArrowUp" && items.length > 0) {
        e.preventDefault();
        setActiveIdx((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === "Enter" && items[safeActiveIdx]) {
        e.preventDefault();
        items[safeActiveIdx].onTrigger();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [items, onClose, open, safeActiveIdx]);

  if (!open) return null;

  const tabs: Array<{ id: PaletteTab; label: string }> = [
    { id: "all", label: "All" },
    { id: "assets", label: "Catalog" },
    { id: "labs", label: "AI Labs" },
    { id: "leaderboard", label: "Benchmarks" },
    { id: "actions", label: "Quick Actions" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[8vh] sm:pt-[12vh] bg-black/65 backdrop-blur-md animate-[fadeIn_0.15s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label="Global AiVerse Command Palette"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl overflow-hidden rounded-3xl border shadow-2xl transition-colors ${
          isAmoled
            ? "border-white/12 bg-[#0c0d12] text-white"
            : "border-neutral-200 bg-white text-neutral-900"
        }`}
      >
        {/* Top Input */}
        <div
          className={`flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b ${
            isAmoled ? "border-white/[0.08]" : "border-neutral-200/80"
          }`}
        >
          <Search size={17} className="text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            placeholder="Jump to any AI model, lab, benchmark, or workflow…"
            className="flex-1 min-w-0 bg-transparent text-sm focus:outline-none placeholder:text-neutral-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveIdx(0);
              }}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
              aria-label="Clear command query"
            >
              <X size={14} />
            </button>
          )}
          <kbd
            className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
              isAmoled
                ? "border-white/10 bg-white/[0.05] text-neutral-400"
                : "border-neutral-200 bg-neutral-100 text-neutral-500"
            }`}
          >
            ESC
          </kbd>
        </div>

        {/* Scope Filter Pills */}
        <div
          className={`flex items-center gap-1.5 px-4 py-2 border-b overflow-x-auto no-scrollbar ${
            isAmoled
              ? "border-white/[0.06] bg-[#090a0e]"
              : "border-neutral-100 bg-neutral-50/70"
          }`}
        >
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  setActiveIdx(0);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                  active
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : isAmoled
                    ? "border-transparent text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                    : "border-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Results */}
        <div className="max-h-[54vh] overflow-y-auto p-2 space-y-1">
          {items.length === 0 ? (
            <div className="py-10 px-4 text-center space-y-2">
              <Sparkles size={20} className="mx-auto text-indigo-500 opacity-70" />
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                No instant matches for &ldquo;{query}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateDirectory(query.trim());
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
              >
                <span>Search Full Directory</span>
                <ArrowRight size={12} />
              </button>
            </div>
          ) : (
            items.map((item, idx) => {
              const isSelected = idx === safeActiveIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={item.onTrigger}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? isAmoled
                        ? "bg-indigo-500/15 border border-indigo-500/30"
                        : "bg-indigo-50 border border-indigo-200/80"
                      : "border border-transparent hover:bg-neutral-100/80 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.model ? (
                      <div className="w-8 h-8 rounded-xl border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-[#14161f] flex items-center justify-center shrink-0">
                        <LabLogo creator={item.model.creator} size={16} />
                      </div>
                    ) : item.entry ? (
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border shrink-0 ${
                          isAmoled
                            ? "bg-white/[0.05] border-white/10 text-indigo-300"
                            : "bg-indigo-50 border-indigo-200/70 text-indigo-600"
                        }`}
                      >
                        {TYPE_GLYPH[item.entry.type] ?? "◆"}
                      </span>
                    ) : (
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${
                          isAmoled
                            ? "bg-white/[0.05] border-white/10"
                            : "bg-neutral-100 border-neutral-200/70"
                        }`}
                      >
                        {item.icon}
                      </span>
                    )}

                    <div className="min-w-0">
                      <p className="text-xs sm:text-[13px] font-semibold truncate text-neutral-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-[11px] truncate text-neutral-500 dark:text-neutral-400">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${
                        isAmoled
                          ? "border-white/10 bg-white/[0.04] text-neutral-300"
                          : "border-neutral-200 bg-white text-neutral-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div
          className={`flex items-center justify-between px-4 py-2.5 border-t text-[11px] ${
            isAmoled
              ? "border-white/[0.08] bg-[#090a0e] text-neutral-400"
              : "border-neutral-200/80 bg-neutral-50 text-neutral-500"
          }`}
        >
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="font-medium text-indigo-600 dark:text-indigo-400">
            {query ? `${items.length} matches` : `${entries.length} verified assets`}
          </span>
        </div>
      </div>
    </div>
  );
};
