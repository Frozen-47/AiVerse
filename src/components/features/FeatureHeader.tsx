import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useTokens, useTheme } from "../../lib/theme";

interface FeatureHeaderProps {
  onBackToHome: () => void;
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({ onBackToHome }) => {
  const t = useTokens();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "amoled";
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-dashed border-slate-200 dark:border-white/6">
      <div>
        <div className={`inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest border rounded-full px-3 py-1 mb-3.5 ${t.surface} ${t.border} ${t.textMuted}`}>
          <Sparkles size={10} className={isDark ? "text-white/50" : "text-black/50"} />
          Ecosystem Features Hub
        </div>
        <h1 className={`text-[clamp(32px,4vw,48px)] font-black leading-[1.05] tracking-[-0.03em] mb-2.5 ${t.textPrimary}`}>
          Interactive Suite
        </h1>
        <p className={`text-[13px] font-light ${t.textSecondary}`}>
          Explore dynamic discovery engines, spec Head-to-Heads, and visual categories.
        </p>
      </div>

      <button
        onClick={onBackToHome}
        className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold border shadow-sm transition-all cursor-pointer ${t.surface} ${t.border} ${t.textPrimary} hover:${t.borderHover} hover:${t.textAccent}`}
      >
        <ArrowLeft size={14} />
        Back to Dashboard
      </button>
    </div>
  );
};
