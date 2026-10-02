import React from "react";
import { Sparkles, Cpu, Layers } from "lucide-react";
import { useTheme } from "../../lib/theme";

export const ValueProps: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";

  const props = [
    {
      title: "Curated Technical Schemas",
      desc: "Citation-backed specs, licenses, and architecture blueprints for swift integration.",
      icon: Sparkles,
    },
    {
      title: "Autonomous Assistant",
      desc: "Invoke Vox anytime for cross-comparisons, benchmark queries, or syntax lookups.",
      icon: Cpu,
    },
    {
      title: "Community Powered",
      desc: "Open source index. Rate models, save bookmarks, and submit builder credentials.",
      icon: Layers,
    },
  ];

  return (
    <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 ${
      isAmoled
        ? "bg-neutral-900/40 border-white/[0.08]"
        : "bg-neutral-50/70 border-neutral-200/80 shadow-2xs"
    }`}>
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-200/60 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Platform Guarantees & Standards
          </h3>
        </div>
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Open AI Standards
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {props.map((prop, i) => {
          const Icon = prop.icon;
          return (
            <div key={i} className={`p-4.5 rounded-2xl border flex items-start gap-4 transition-all duration-150 ${
              isAmoled
                ? "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                : "bg-white border-neutral-200/70 shadow-2xs hover:shadow-xs"
            }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 mt-0.5 ${
                isAmoled
                  ? "bg-white/[0.05] border-white/10 text-neutral-300"
                  : "bg-neutral-100 border-neutral-200 text-neutral-700 shadow-2xs"
              }`}>
                <Icon size={15} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight">
                  {prop.title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed mt-1.5">
                  {prop.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


