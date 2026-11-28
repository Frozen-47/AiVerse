import React from "react";
import { Database, Cpu, Layers, Star } from "lucide-react";
import type { Entry } from "../../types";

interface MetricsBarProps {
  entries: Entry[];
  typeCounts: {
    Model: number;
    Framework: number;
    Popular: number;
  };
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ entries, typeCounts }) => {
  const stats = [
    {
      val: entries.length,
      label: "Registered Entities",
      desc: "Tracked ecosystem assets",
      icon: Database,
      accent: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      val: typeCounts.Model,
      label: "AI Models & Weights",
      desc: "Open & proprietary LLMs",
      icon: Cpu,
      accent: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      val: typeCounts.Framework,
      label: "Developer Frameworks",
      desc: "Toolchains & runtimes",
      icon: Layers,
      accent: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      val: typeCounts.Popular,
      label: "Highly Rated Assets",
      desc: "Verified community picks",
      icon: Star,
      accent: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] shadow-xs flex items-center justify-between gap-3 transition-all hover:border-indigo-300 dark:hover:border-indigo-500/35"
          >
            <div className="flex flex-col text-left min-w-0">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white tabular-nums">
                {stat.val}
              </span>
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate mt-0.5">
                {stat.label}
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                {stat.desc}
              </span>
            </div>

            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.accent} border border-white/[0.06] flex items-center justify-center shrink-0`}>
              <Icon size={18} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
