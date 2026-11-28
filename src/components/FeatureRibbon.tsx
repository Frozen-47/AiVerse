import React from "react";
import { Sparkles, Cpu, Layers, Bot, ArrowRight, Lock } from "lucide-react";
import { useTheme } from "../lib/theme";

interface FeatureRibbonProps {
  user: unknown;
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
    <div className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 ${
      isAmoled
        ? "bg-[#0c0d11] border-white/[0.08]"
        : "bg-white/95 border-neutral-200/80 shadow-xs"
    }`}>
      <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-neutral-200/70 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Intelligent Command Workflows
          </h3>
        </div>
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          4 Integrated Tools
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <button
              key={idx}
              onClick={f.onClick}
              className={`group flex flex-col justify-between p-4.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isAmoled
                  ? "bg-[#121319] border-white/[0.07] hover:bg-[#161822] hover:border-indigo-500/35 hover:shadow-lg"
                  : "bg-neutral-50/80 border-neutral-200/80 hover:bg-white hover:border-indigo-300 shadow-2xs hover:shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    isAmoled
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                      : "bg-indigo-50 border-indigo-200/80 text-indigo-600"
                  }`}>
                    <Icon size={16} />
                  </div>
                  {f.isLocked ? (
                    <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${
                      isAmoled 
                        ? "bg-white/[0.04] text-neutral-400 border-white/10" 
                        : "bg-white text-neutral-600 border-neutral-200"
                    }`}>
                      <Lock size={9} /> Unlock
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity">
                      Active
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {f.title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 font-normal leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-200/60 dark:border-white/[0.05] flex items-center justify-between text-xs font-semibold text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <span>Launch Workflow</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};


