import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

interface FeatureHeaderProps {
  onBackToHome: () => void;
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({ onBackToHome }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-200/80 dark:border-white/[0.08]">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <button
            onClick={onBackToHome}
            className="hover:text-blue-500 hover:underline cursor-pointer flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={12} />
            Dashboard
          </button>
          <span className="opacity-40">/</span>
          <span>Interactive Tools</span>
          <span className="opacity-40">/</span>
          <span className="font-semibold text-neutral-900 dark:text-white">Suite Console</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Interactive AI Suite
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1">
            <Sparkles size={11} /> Live Workspaces
          </span>
        </div>
      </div>

      <button
        onClick={onBackToHome}
        className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer shadow-xs w-fit"
      >
        <ArrowLeft size={13} />
        Back to Dashboard
      </button>
    </div>
  );
};
