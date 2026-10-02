import React from "react";
import { ArrowRight, ExternalLink, Sparkles, Box, Layers, Database, Server, Bot } from "lucide-react";
import type { Entry } from "../types";
import type { EcosystemGroup } from "../lib/ecosystems";

interface EcosystemCardProps {
  ecosystem: EcosystemGroup;
  onExplore: (eco: EcosystemGroup) => void;
  onSelectEntry: (entry: Entry) => void;
}

export const EcosystemCard: React.FC<EcosystemCardProps> = ({
  ecosystem,
  onExplore,
  onSelectEntry,
}) => {
  const initials = ecosystem.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl hover:border-neutral-300 dark:hover:border-white/20 transition-all duration-200 shadow-xs hover:shadow-md text-left">
      <div>
        {/* Top bar: Avatar/Initials + Name + Count Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white tracking-tight">
                  {ecosystem.name}
                </h3>
                {ecosystem.website && (
                  <a
                    href={ecosystem.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors"
                    title={`Visit ${ecosystem.name}`}
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
              <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                {ecosystem.domain}
              </p>
            </div>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border tabular-nums shrink-0 ${ecosystem.colorScheme.badge}`}>
            {ecosystem.totalCount} {ecosystem.totalCount === 1 ? "Asset" : "Assets"}
          </span>
        </div>

        {/* Lab Description */}
        <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-2">
          {ecosystem.description}
        </p>

        {/* Flagship Models preview chips */}
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2 flex items-center gap-1">
            <Sparkles size={10} className="text-blue-500" />
            Flagship Technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ecosystem.flagships.map((entry) => (
              <button
                key={entry.name}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEntry(entry);
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer flex items-center gap-1"
                title={`View specs for ${entry.name}`}
              >
                <span>{entry.name}</span>
                <span className="text-[9px] opacity-60">({entry.type})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Breakdown counts + View Ecosystem Action */}
      <div className="pt-3 border-t border-neutral-100 dark:border-white/[0.06] flex items-center justify-between gap-2 mt-2">
        <div className="flex items-center gap-2 text-[10px] font-medium text-neutral-400 dark:text-neutral-500">
          {ecosystem.modelsCount > 0 && (
            <span className="flex items-center gap-0.5">
              <Box size={10} /> {ecosystem.modelsCount}
            </span>
          )}
          {ecosystem.frameworksCount > 0 && (
            <span className="flex items-center gap-0.5">
              <Layers size={10} /> {ecosystem.frameworksCount}
            </span>
          )}
          {ecosystem.datasetsCount > 0 && (
            <span className="flex items-center gap-0.5">
              <Database size={10} /> {ecosystem.datasetsCount}
            </span>
          )}
          {ecosystem.platformsCount > 0 && (
            <span className="flex items-center gap-0.5">
              <Server size={10} /> {ecosystem.platformsCount}
            </span>
          )}
          {ecosystem.appsCount > 0 && (
            <span className="flex items-center gap-0.5">
              <Bot size={10} /> {ecosystem.appsCount}
            </span>
          )}
        </div>

        <button
          onClick={() => onExplore(ecosystem)}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer transition-all shrink-0"
        >
          <span>Explore Ecosystem</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};
