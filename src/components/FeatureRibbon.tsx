import React from "react";
import { ArrowRight, Bot, Cpu, Layers, Sparkles } from "lucide-react";
import { useTheme } from "../lib/theme";

interface FeatureRibbonProps {
  user?: unknown;
  onOpenAuth?: (mode: "signin" | "signup") => void;
  onOpenWizard: () => void;
  onOpenArena: () => void;
  onOpenPlayground: () => void;
  onOpenSuite: () => void;
}

export const FeatureRibbon: React.FC<FeatureRibbonProps> = ({
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
      desc: "Interactive matching quiz tuned to your goals, hardware & licensing stack",
      icon: Sparkles,
      badge: "Advisor",
      badgeStyle: isAmoled
        ? "bg-amber-500/15 text-amber-300 border-amber-500/25"
        : "bg-amber-50 text-amber-700 border-amber-200",
      onClick: onOpenWizard,
    },
    {
      title: "Comparison Arena",
      desc: "Head-to-head architectural specs, benchmarks & latency comparisons",
      icon: Cpu,
      badge: "Arena",
      badgeStyle: isAmoled
        ? "bg-purple-500/15 text-purple-300 border-purple-500/25"
        : "bg-purple-50 text-purple-700 border-purple-200",
      onClick: onOpenArena,
    },
    {
      title: "Model Playground",
      desc: "Prompt LLMs side-by-side with system constraints & live streaming",
      icon: Bot,
      badge: "Groq LPU",
      badgeStyle: isAmoled
        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
        : "bg-emerald-50 text-emerald-700 border-emerald-200",
      onClick: onOpenPlayground,
    },
    {
      title: "Ecosystem Suite",
      desc: "Category deep-dives, hardware matrix & live system capacity telemetry",
      icon: Layers,
      badge: "Active",
      badgeStyle: isAmoled
        ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/25"
        : "bg-indigo-50 text-indigo-700 border-indigo-200",
      onClick: onOpenSuite,
    },
  ];

  return (
    <section
      aria-label="Intelligent Command Workflows"
      className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 text-left ${
        isAmoled
          ? "bg-[#0c0d11] border-white/[0.08]"
          : "bg-white/95 border-neutral-200/80 shadow-xs"
      }`}
    >
      <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-neutral-200/70 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Intelligent Command Workflows
          </h3>
        </div>
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          4 Integrated Studio Tools
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <button
              key={f.title}
              type="button"
              onClick={f.onClick}
              className={`group flex flex-col justify-between p-4.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer hover:-translate-y-0.5 ${
                isAmoled
                  ? "bg-[#121319] border-white/[0.07] hover:bg-[#161822] hover:border-indigo-500/35 hover:shadow-lg"
                  : "bg-neutral-50/80 border-neutral-200/80 hover:bg-white hover:border-indigo-300 shadow-2xs hover:shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      isAmoled
                        ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                        : "bg-indigo-50 border-indigo-200/80 text-indigo-600"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${f.badgeStyle}`}
                  >
                    {f.badge}
                  </span>
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
    </section>
  );
};
