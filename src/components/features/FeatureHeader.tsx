import React from "react";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

interface FeatureHeaderProps {
  onBackToHome: () => void;
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({ onBackToHome }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-200/80 dark:border-white/[0.08]">
      <div className="flex flex-col gap-1 text-left">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          <button
            onClick={onBackToHome}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Home</span>
          </button>
          <span className="opacity-40">/</span>
          <span>Features</span>
          <span className="opacity-40">/</span>
          <span className="font-semibold text-neutral-900 dark:text-white">Interactive AI Suite</span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Interactive AI Suite
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
            <CheckCircle2 size={11} /> Live Console
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
            <Sparkles size={11} /> Sandbox Ready
          </span>
        </div>
      </div>

      <button
        onClick={onBackToHome}
        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer shadow-xs w-fit"
      >
        <ArrowLeft size={13} />
        <span>Back to Home</span>
      </button>
    </div>
  );
};
