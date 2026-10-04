import React from "react";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

interface FeatureHeaderProps {
  onBackToHome: () => void;
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({ onBackToHome }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#dadce0] dark:border-[#3c4043]/50">
      <div className="flex flex-col gap-1 text-left">
        {/* Google Cloud Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#5f6368] dark:text-[#8e918f] font-medium">
          <button
            onClick={onBackToHome}
            className="hover:text-[#1a73e8] dark:hover:text-[#a8c7fa] hover:underline cursor-pointer flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Dashboard</span>
          </button>
          <span className="opacity-40">/</span>
          <span>Google Model Garden</span>
          <span className="opacity-40">/</span>
          <span className="font-semibold text-[#202124] dark:text-[#e3e3e3]">Interactive AI Suite</span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202124] dark:text-[#e3e3e3]">
            Interactive AI Suite
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] border border-[#1a73e8]/20 flex items-center gap-1">
            <CheckCircle2 size={11} /> Live Console
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Sparkles size={11} /> Sandbox Ready
          </span>
        </div>
      </div>

      <button
        onClick={onBackToHome}
        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#3c4043] dark:text-[#c4c7c5] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] hover:text-[#202124] dark:hover:text-white transition-all cursor-pointer shadow-xs w-fit"
      >
        <ArrowLeft size={13} />
        <span>Back to Catalog</span>
      </button>
    </div>
  );
};
