import React from "react";
import { useTokens } from "../../lib/theme";
import type { Entry } from "../../types";

interface SpotlightGridProps {
  entries: Entry[];
  setSelected: (entry: Entry | null) => void;
  setBrowseAll: (b: boolean) => void;
  setActiveView: (v: "landing" | "catalog") => void;
}

export const SpotlightGrid: React.FC<SpotlightGridProps> = ({
  entries,
  setSelected,
  setBrowseAll,
  setActiveView,
}) => {
  const t = useTokens();
  const spotlights = entries.filter((e) => e.popular).slice(0, 3);

  return (
    <div id="spotlights" className="flex flex-col scroll-mt-24">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          <h3 className={`text-base font-extrabold tracking-tight ${t.textPrimary}`}>
            Featured AI Spotlights
          </h3>
        </div>
        <button
          onClick={() => {
            setBrowseAll(true);
            setActiveView("catalog");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`text-[11px] font-extrabold tracking-wide uppercase transition-colors duration-200 hover:opacity-80 flex items-center gap-1 cursor-pointer ${t.textAccent}`}
        >
          See All Tools →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {spotlights.map((entry) => (
          <div
            key={entry.name}
            className={`group relative flex flex-col p-5 rounded-2xl transition-all duration-300 ${t.card}`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border ${t.pillSmall}`}>
                  {entry.type}
                </span>
                <h4 className={`text-[14px] font-bold mt-2.5 transition-colors ${t.textPrimary}`}>
                  {entry.name}
                </h4>
              </div>
              <span className={`text-[10px] ${t.textMuted}`}>{entry.org}</span>
            </div>

            <p className={`text-[12px] leading-relaxed mb-5 line-clamp-2 ${t.textSecondary}`}>
              {entry.summary}
            </p>

            <div className={`mt-auto pt-3.5 border-t border-dashed ${t.border} flex items-center justify-between`}>
              <span className={`text-[11px] font-semibold ${t.textSecondary}`}>{entry.task}</span>
              <button
                onClick={() => setSelected(entry)}
                className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${t.btnSecondary}`}
              >
                View Specs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
