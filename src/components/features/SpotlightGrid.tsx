import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
  const spotlights = entries.filter((e) => e.popular).slice(0, 6);

  return (
    <div id="spotlights" className="flex flex-col scroll-mt-24 text-left">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
            Curated Flagship Spotlights
          </h3>
        </div>
        <button
          onClick={() => {
            setBrowseAll(true);
            setActiveView("catalog");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Explore All Tools</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3.5">
        {spotlights.map((entry) => (
          <div
            key={entry.name}
            className="group relative flex flex-col p-4 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] hover:border-indigo-300 dark:hover:border-indigo-500/35 hover:-translate-y-0.5 shadow-xs transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-[#121319] text-neutral-600 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/[0.08]">
                    {entry.type}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                </div>
                <h4 className="text-sm font-bold mt-1.5 text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {entry.name}
                </h4>
              </div>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium shrink-0">
                {entry.org}
              </span>
            </div>

            <p className="text-xs leading-relaxed mb-4 line-clamp-2 text-neutral-600 dark:text-neutral-400">
              {entry.description || entry.summary}
            </p>

            <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                {entry.task}
              </span>
              <button
                onClick={() => setSelected(entry)}
                className="text-xs font-semibold px-3 py-1 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer"
              >
                Inspect Specs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
