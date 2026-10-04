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
  const spotlights = entries.filter((e) => e.popular).slice(0, 3);

  return (
    <div id="spotlights" className="flex flex-col scroll-mt-24 text-left">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#202124] dark:text-[#e3e3e3]">
            Google Model Garden Spotlights
          </h3>
        </div>
        <button
          onClick={() => {
            setBrowseAll(true);
            setActiveView("catalog");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-xs font-semibold text-[#1a73e8] dark:text-[#a8c7fa] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Explore All Tools</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {spotlights.map((entry) => (
          <div
            key={entry.name}
            className="group relative flex flex-col p-4 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] hover:border-[#1a73e8]/40 dark:hover:border-[#a8c7fa]/40 shadow-xs transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#f1f3f4] dark:bg-[#282a2c] text-[#5f6368] dark:text-[#c4c7c5] border border-[#dadce0] dark:border-[#3c4043]/60">
                    {entry.type}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                </div>
                <h4 className="text-sm font-bold mt-1 text-[#202124] dark:text-[#e3e3e3] group-hover:text-[#1a73e8] dark:group-hover:text-[#a8c7fa] transition-colors">
                  {entry.name}
                </h4>
              </div>
              <span className="text-[11px] text-[#5f6368] dark:text-[#8e918f] font-medium shrink-0">
                {entry.org}
              </span>
            </div>

            <p className="text-xs leading-relaxed mb-4 line-clamp-2 text-[#5f6368] dark:text-[#c4c7c5]">
              {entry.summary}
            </p>

            <div className="mt-auto pt-3 border-t border-[#dadce0]/80 dark:border-[#3c4043]/40 flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#5f6368] dark:text-[#8e918f]">
                {entry.task}
              </span>
              <button
                onClick={() => setSelected(entry)}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1a73e8]/10 hover:bg-[#1a73e8]/20 text-[#1a73e8] dark:text-[#a8c7fa] transition-colors cursor-pointer"
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
