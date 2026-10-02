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
    <div className={`p-5 rounded-2xl border transition-all duration-200 ${
      isAmoled
        ? "bg-neutral-900/40 border-white/[0.08]"
        : "bg-neutral-50/70 border-neutral-200/80 shadow-2xs"
    }`}>
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-neutral-200/60 dark:border-white/[0.06]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Platform Standards
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {props.map((prop, i) => {
          const Icon = prop.icon;
          return (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 mt-0.5 ${
                isAmoled
                  ? "bg-white/[0.04] border-white/10 text-neutral-300"
                  : "bg-white border-neutral-200 text-neutral-700 shadow-2xs"
              }`}>
                <Icon size={13} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight">
                  {prop.title}
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed mt-0.5">
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


