import React from "react";
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
    { val: entries.length, label: "Registered Entities" },
    { val: typeCounts.Model, label: "AI Models & Weights" },
    { val: typeCounts.Framework, label: "Developer Frameworks" },
    { val: typeCounts.Popular, label: "Highly Rated Assets" },
  ];

  return (
    <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center shadow-xs">
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col items-center justify-center p-2">
          <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white tabular-nums">
            {stat.val}
          </span>
          <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mt-1">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};
