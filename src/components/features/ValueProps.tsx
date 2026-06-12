import React from "react";
import { Sparkles, Cpu, Layers } from "lucide-react";
import { useTokens } from "../../lib/theme";

export const ValueProps: React.FC = () => {
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
            className={`p-5 rounded-2xl transition-all duration-300 ${t.card}`}
          >
            <div className={`p-2 w-fit rounded-lg ${t.iconBg} mb-3`}>
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
