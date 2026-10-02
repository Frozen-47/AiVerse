import React from "react";
import { Sparkles, Cpu, Layers, Bot, ArrowRight, Lock } from "lucide-react";
import { useTheme } from "../lib/theme";

interface FeatureRibbonProps {
  user: any;
  onOpenAuth: (mode: "signin" | "signup") => void;
  onOpenWizard: () => void;
  onOpenArena: () => void;
  onOpenPlayground: () => void;
  onOpenSuite: () => void;
}

export const FeatureRibbon: React.FC<FeatureRibbonProps> = ({
  user,
  onOpenAuth,
  onOpenWizard,
  onOpenArena,
  onOpenPlayground,
  onOpenSuite,
}) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";

  const features = [
    {
      title: "Discovery Wizard",
      desc: "Interactive matching quiz based on your goals, hardware & stack",
      icon: Sparkles,
      isLocked: !user,
      onClick: () => (!user ? onOpenAuth("signin") : onOpenWizard()),
    },
    {
      title: "Comparison Arena",
      desc: "Side-by-side architectural benchmarks & latency comparisons",
      icon: Cpu,
      isLocked: !user,
      onClick: () => (!user ? onOpenAuth("signin") : onOpenArena()),
    },
    {
      title: "Model Playground",
      desc: "Prompt LLMs side-by-side with system constraints & live output",
      icon: Bot,
      isLocked: !user,
      onClick: () => (!user ? onOpenAuth("signin") : onOpenPlayground()),
    },
    {
      title: "Ecosystem Suite",
      desc: "Category deep-dives, hardware matrix & system capacity metrics",
      icon: Layers,
      isLocked: false,
      onClick: onOpenSuite,
    },
  ];

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-200 ${
      isAmoled
        ? "bg-neutral-900/40 border-white/[0.08]"
        : "bg-neutral-50/70 border-neutral-200/80 shadow-2xs"
    }`}>
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-neutral-200/60 dark:border-white/[0.06]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Command Workflows
        </h3>
        <span className="text-[10px] font-medium text-neutral-400">
          4 Tools
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <button
              key={idx}
              onClick={f.onClick}
              className={`group flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                isAmoled
                  ? "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.15]"
                  : "bg-white border-neutral-200/70 hover:bg-neutral-100 hover:border-neutral-300 shadow-2xs"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                isAmoled
                  ? "bg-white/[0.05] border-white/10 text-white"
                  : "bg-neutral-100 border-neutral-200 text-neutral-800"
              }`}>
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                    {f.title}
                  </span>
                  {f.isLocked && (
                    <span className={`flex items-center gap-0.5 text-[9px] font-medium px-1.5 py-0.2 rounded border shrink-0 ${
                      isAmoled 
                        ? "bg-white/[0.04] text-neutral-400 border-white/10" 
                        : "bg-neutral-100 text-neutral-600 border-neutral-200"
                    }`}>
                      <Lock size={8} /> Unlock
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-normal">
                  {f.desc}
                </p>
              </div>
              <ArrowRight size={13} className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};


