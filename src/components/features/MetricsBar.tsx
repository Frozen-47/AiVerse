import React from "react";
import { useTokens } from "../../lib/theme";
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
  const t = useTokens();

  const stats = [
    { val: entries.length, label: "Registered Entities" },
    { val: typeCounts.Model, label: "AI Models & Weights" },
    { val: typeCounts.Framework, label: "Developer Frameworks" },
    { val: typeCounts.Popular, label: "Highly Rated Assets" },
  ];

  return (
    <div
      className={`p-6 rounded-3xl border backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center transition-all duration-300 ${t.surface} shadow-sm`}
    >
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col items-center justify-center">
          <span className={`text-3xl font-black tracking-tight ${t.textPrimary}`}>
            {stat.val}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${t.textMuted}`}>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};
