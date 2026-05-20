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
  resolvedTheme: string;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ entries, typeCounts, resolvedTheme }) => {
  const t = useTokens();

  const stats = [
    { val: entries.length, label: "Registered Entities" },
    { val: typeCounts.Model, label: "AI Models & Weights" },
    { val: typeCounts.Framework, label: "Developer Frameworks" },
    { val: typeCounts.Popular, label: "Highly Rated Assets" },
  ];

  return (
    <div
      className={`p-6 rounded-3xl border backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center transition-all duration-300 ${
        resolvedTheme === "amoled"
          ? "bg-black border-white/5 shadow-[0_0_20px_rgba(6,182,212,0.02)] hover:border-cyan-500/20"
          : "bg-white border-slate-200/60 shadow-sm shadow-slate-55 hover:border-cyan-500/20"
      }`}
    >
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col items-center justify-center">
          <span className="text-3xl font-black tracking-tight bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
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
