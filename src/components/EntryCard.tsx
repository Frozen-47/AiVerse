import React from "react";
import { Star, ChevronRight } from "lucide-react";
import { useTokens, typeBadge, taskBadge, TYPE_GLYPH, typeIcon } from "../lib/theme";
import type { Entry } from "../types";

interface EntryCardProps {
  entry: Entry;
  onClick: () => void;
  index: number;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry, onClick, index }) => {
  const t = useTokens();

  return (
    <article
      onClick={onClick}
      style={{ animationDelay: `${index * 40}ms` }}
      className={`
        group flex flex-col border rounded-2xl p-5 cursor-pointer
        transition-all duration-200 hover:-translate-y-0.5
        animate-[fadeUp_0.35s_ease_both]
        ${t.card} ${t.border}
      `}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[17px] font-bold shrink-0 ${typeIcon(entry.type, t)}`}>
          {TYPE_GLYPH[entry.type] ?? "◆"}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {entry.popular && (
            <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border ${t.popular}`}>
              <Star size={7} className="fill-current" /> Popular
            </span>
          )}
          <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md border ${typeBadge(entry.type, t)}`}>
            {entry.type}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className={`text-[15px] font-black tracking-tight leading-tight mb-0.5 ${t.textPrimary}`}>
        {entry.name}
      </h3>
      <p className={`text-[11px] font-semibold uppercase tracking-wider mb-3 ${t.textMuted}`}>
        {entry.org}
      </p>

      {/* Summary */}
      <p className={`text-[12.5px] leading-relaxed line-clamp-2 flex-1 mb-4 ${t.textSecondary}`}>
        {entry.summary}
      </p>

      {/* Task badge */}
      <div className="mb-3">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${taskBadge(entry.task, t)}`}>
          {entry.task}
        </span>
      </div>

      {/* Footer */}
      <div className={`flex items-center justify-between pt-3 border-t ${t.border}`}>
        <span className={`text-[11px] font-mono truncate max-w-[65%] ${t.textMuted}`}>
          {entry.size}
        </span>
        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] ${t.textMuted}`}>{entry.year}</span>
          <ChevronRight
            size={13}
            className={`opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ${t.textMuted}`}
          />
        </div>
      </div>
    </article>
  );
};
