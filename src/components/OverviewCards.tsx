import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Award, Building2, Database, ShieldCheck } from "lucide-react";
import {
  computeLicenseMix,
  fetchDashboardRadarBundle,
  fetchDashboardStats,
  type DashboardRadarBundle,
  type DashboardStats,
} from "../lib/dashboard";
import { useTheme } from "../lib/theme";
import type { Entry, EntryRatingSummary } from "../types";

interface OverviewCardsProps {
  totalEntriesCount?: number;
  ecosystemsCount?: number;
  entries?: Entry[];
  ratingSummaries?: Record<string, EntryRatingSummary>;
  onViewAllEntries?: () => void;
  onViewEcosystems?: () => void;
  onScrollToRadar?: () => void;
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({
  totalEntriesCount,
  ecosystemsCount = 200,
  entries = [],
  ratingSummaries,
  onViewAllEntries,
  onViewEcosystems,
  onScrollToRadar,
}) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";

  const [stats, setStats] = useState<DashboardStats>({
    totalEntries: entries.length || 766,
    totalUsers: 10,
    averageRating: 4.38,
    totalRatings: 8,
    activeToday: 0,
    activeThisWeek: 2,
    newEntriesCount: 504,
  });

  const [radarBundle, setRadarBundle] = useState<DashboardRadarBundle | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadStats = () => {
      void (async () => {
        const [data, radar] = await Promise.all([
          fetchDashboardStats(),
          fetchDashboardRadarBundle(),
        ]);
        if (isMounted) {
          setStats(data);
          setRadarBundle(radar);
        }
      })();
    };

    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleWin = typeof window !== "undefined" ? (window as IdleWindow) : undefined;
    if (idleWin?.requestIdleCallback) {
      const id = idleWin.requestIdleCallback(loadStats, { timeout: 2500 });
      return () => {
        isMounted = false;
        idleWin.cancelIdleCallback?.(id);
      };
    }

    const timer = window.setTimeout(loadStats, 900);
    return () => {
      isMounted = false;
      window.clearTimeout(timer);
    };
  }, []);

  const catalogCount = entries.length > 0 ? entries.length : totalEntriesCount || 0;
  const displayEntries = Math.max(catalogCount, stats.totalEntries);
  const currentYear = new Date().getFullYear();

  const displayNewEntries = useMemo(() => {
    if (entries.length > 0) {
      const count = entries.filter((e) => e.year === currentYear).length;
      if (count > 0) return count;
    }
    return stats.newEntriesCount;
  }, [entries, currentYear, stats.newEntriesCount]);

  const popularCount = useMemo(() => {
    if (entries.length > 0) {
      return entries.filter((e) => e.popular).length;
    }
    return radarBundle?.catalogStats?.popularEntries ?? 368;
  }, [entries, radarBundle]);

  const openShare = useMemo(() => {
    if (entries.length === 0) return { pct: 64, count: 490 };
    const mix = computeLicenseMix(entries);
    const openCount =
      (mix.find((m) => m.id === "open_source")?.count ?? 0) +
      (mix.find((m) => m.id === "open_weights")?.count ?? 0);
    return {
      pct: Math.round((openCount / entries.length) * 100),
      count: openCount,
    };
  }, [entries]);

  const { displayAvgRating, displayRatingCount } = useMemo(() => {
    let avg = stats.averageRating;
    let count = stats.totalRatings;

    if (ratingSummaries && Object.keys(ratingSummaries).length > 0) {
      let sum = 0;
      let total = 0;
      for (const item of Object.values(ratingSummaries)) {
        if (item && item.count > 0) {
          sum += item.average * item.count;
          total += item.count;
        }
      }
      if (total > 0) {
        avg = Math.round((sum / total) * 100) / 100;
        count = total;
      }
    }

    return {
      displayAvgRating: avg > 0 ? avg.toFixed(2) : "4.38",
      displayRatingCount: count,
    };
  }, [stats.averageRating, stats.totalRatings, ratingSummaries]);

  const linksHealth = radarBundle?.linksHealth;
  const healthPct =
    linksHealth && linksHealth.checked > 0
      ? Math.round((linksHealth.healthy / linksHealth.checked) * 100)
      : 88;

  const cards = [
    {
      label: "Verified Assets",
      value: displayEntries.toLocaleString(),
      hint: `+${displayNewEntries} in ${currentYear} · ${popularCount} flagships`,
      badge: "Catalog",
      icon: Database,
      accent: isAmoled
        ? "from-indigo-500/20 via-violet-500/5 to-transparent"
        : "from-indigo-500/10 via-violet-500/5 to-transparent",
      iconColor: isAmoled
        ? "bg-indigo-500/15 border-indigo-500/25 text-indigo-300"
        : "bg-indigo-50 border-indigo-200/80 text-indigo-600",
      onClick: onViewAllEntries,
    },
    {
      label: "Pioneer AI Labs",
      value: ecosystemsCount.toLocaleString(),
      hint: "Organizations & research teams",
      badge: "Ecosystems",
      icon: Building2,
      accent: isAmoled
        ? "from-sky-500/20 via-cyan-500/5 to-transparent"
        : "from-sky-500/10 via-cyan-500/5 to-transparent",
      iconColor: isAmoled
        ? "bg-sky-500/15 border-sky-500/25 text-sky-300"
        : "bg-sky-50 border-sky-200/80 text-sky-600",
      onClick: onViewEcosystems,
    },
    {
      label: "Open Ecosystem",
      value: `${openShare.pct}%`,
      hint: `${openShare.count.toLocaleString()} open-source & open-weights`,
      badge: "Permissive",
      icon: ShieldCheck,
      accent: isAmoled
        ? "from-emerald-500/20 via-teal-500/5 to-transparent"
        : "from-emerald-500/10 via-teal-500/5 to-transparent",
      iconColor: isAmoled
        ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-300"
        : "bg-emerald-50 border-emerald-200/80 text-emerald-600",
      progress: openShare.pct,
      onClick: onViewAllEntries,
    },
    {
      label: "Community & Pulse",
      value: `${displayAvgRating}★`,
      hint: `${displayRatingCount} reviews · ${stats.totalUsers} builders · ${healthPct}% link health`,
      badge: linksHealth ? `${linksHealth.healthy}/${linksHealth.checked} URLs` : "Verified",
      icon: Award,
      accent: isAmoled
        ? "from-amber-500/20 via-orange-500/5 to-transparent"
        : "from-amber-500/10 via-orange-500/5 to-transparent",
      iconColor: isAmoled
        ? "bg-amber-500/15 border-amber-500/25 text-amber-300"
        : "bg-amber-50 border-amber-200/80 text-amber-600",
      onClick: onScrollToRadar,
    },
  ];

  return (
    <section aria-label="Platform Telemetry KPIs" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const InteractiveTag = card.onClick ? "button" : "div";
          return (
            <InteractiveTag
              key={card.label}
              type={card.onClick ? "button" : undefined}
              onClick={card.onClick}
              className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200 ${
                card.onClick ? "cursor-pointer hover:-translate-y-0.5" : ""
              } ${
                isAmoled
                  ? "bg-[#0c0d11] border-white/[0.08] hover:border-indigo-500/35"
                  : "bg-white border-neutral-200/85 hover:border-indigo-300 shadow-2xs hover:shadow-xs"
              }`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-75 ${card.accent}`}
              />
              <div className="relative flex items-start justify-between gap-3">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                      {card.label}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${
                        isAmoled
                          ? "border-white/10 bg-white/[0.04] text-neutral-300"
                          : "border-neutral-200/80 bg-white text-neutral-600"
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums text-neutral-900 dark:text-white">
                    {card.value}
                  </div>
                </div>

                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${card.iconColor}`}
                >
                  <Icon size={17} />
                </div>
              </div>

              {card.progress !== undefined && (
                <div className="relative mt-3 h-1.5 w-full rounded-full bg-neutral-200/80 dark:bg-white/[0.07] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
              )}

              <div className="relative mt-3 flex items-center justify-between gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                <span className="truncate">{card.hint}</span>
                {card.onClick && (
                  <ArrowUpRight
                    size={13}
                    className="shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-indigo-500 transition-all"
                  />
                )}
              </div>
            </InteractiveTag>
          );
        })}
      </div>
    </section>
  );
};
