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
      accent: "text-[#1a73e8] dark:text-[#a8c7fa]",
      bg: "bg-[#1a73e8]/10",
    },
    {
      val: typeCounts.Model,
      label: "AI Models & Weights",
      desc: "Open & proprietary LLMs",
      icon: Cpu,
      accent: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
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
            className="p-4 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] shadow-xs flex items-center justify-between gap-3 transition-all hover:border-[#1a73e8]/40 dark:hover:border-[#a8c7fa]/40"
          >
            <div className="flex flex-col text-left min-w-0">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#202124] dark:text-[#e3e3e3] tabular-nums">
                {stat.val}
              </span>
              <span className="text-xs font-semibold text-[#202124] dark:text-[#e3e3e3] truncate mt-0.5">
                {stat.label}
              </span>
              <span className="text-[11px] text-[#5f6368] dark:text-[#8e918f] truncate">
                {stat.desc}
              </span>
            </div>

            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.accent} flex items-center justify-center shrink-0`}>
              <Icon size={18} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
