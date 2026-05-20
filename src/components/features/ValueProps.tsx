import React from "react";
import { Sparkles, Cpu, Layers } from "lucide-react";
import { useTokens } from "../../lib/theme";

interface ValuePropsProps {
  resolvedTheme: string;
}

export const ValueProps: React.FC<ValuePropsProps> = ({ resolvedTheme }) => {
  const t = useTokens();

  const props = [
    {
      title: "Curated Technical Schemas",
      desc: "Every listed asset contains citation-backed specifications, license categories, deployment tasks, and developer frameworks designed for swift integrations.",
      icon: Sparkles,
    },
    {
      title: "Autonomous Virtual Chat",
      desc: "Invoke our intelligent assistant Vox anytime via the cyber-orb button to perform cross-comparisons, syntax inquiries, or semantic tool lookups on the fly.",
      icon: Cpu,
    },
    {
      title: "Fully Community Powered",
      desc: "AiVerse is built entirely on open-source contributions. Bookmark your favorites, rate models, submit entries, and share builder credentials transparently.",
      icon: Layers,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
      {props.map((prop, i) => {
        const Icon = prop.icon;
        return (
          <div
            key={i}
            className={`p-5 rounded-2xl border transition-all duration-300 ${
              resolvedTheme === "amoled"
                ? "bg-black border-white/5 hover:border-white/10 hover:bg-cyan-500/1"
                : "bg-white border-slate-200/50 shadow-xs hover:border-slate-300 hover:shadow-md hover:shadow-slate-100"
            }`}
          >
            <div className="p-2 w-fit rounded-lg bg-cyan-500/10 text-cyan-500 mb-3">
              <Icon size={16} />
            </div>
            <h4 className={`text-[13px] font-bold mb-1.5 ${t.textPrimary}`}>{prop.title}</h4>
            <p className={`text-[12px] leading-relaxed font-light ${t.textSecondary}`}>{prop.desc}</p>
          </div>
        );
      })}
    </div>
  );
};
