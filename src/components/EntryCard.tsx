import { memo } from "react";
import { Star, ChevronRight, Bookmark } from "lucide-react";
import { useTheme, TYPE_GLYPH } from "../lib/theme";
import type { Entry, EntryRatingSummary } from "../types";

interface EntryCardProps {
  entry: Entry;
  entryName: string;
  onSelect: (name: string) => void;
  index: number;
  ratingSummary?: EntryRatingSummary;
  isBookmarked?: boolean;
  onToggleBookmark?: (name: string) => void;
}

export const EntryCard = memo(function EntryCard({
  entry,
  entryName,
  onSelect,
  index,
  ratingSummary,
  isBookmarked,
  onToggleBookmark,
}: EntryCardProps) {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";
  const animate = index < 8;

  return (
    <article
      onClick={() => onSelect(entryName)}
      style={animate ? { animationDelay: `${index * 30}ms` } : undefined}
      className={`
        group flex flex-col rounded-2xl p-5 cursor-pointer transition-all duration-200 border ${
          isAmoled
            ? "bg-neutral-900/40 border-white/[0.08] hover:border-white/[0.2] hover:bg-neutral-900/70"
            : "bg-white border-neutral-200/90 hover:border-neutral-300 hover:shadow-xs"
        }
        hover:-translate-y-0.5
        [content-visibility:auto]
        ${animate ? "animate-fade-in-up" : ""}
      `}
    >
      <div className="flex items-start justify-between mb-3.5">
        {/* Apple squircle glyph */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold shrink-0 border ${
          isAmoled
            ? "bg-white/[0.05] border-white/10 text-white"
            : "bg-neutral-100 border-neutral-200 text-neutral-800"
        }`}>
          {TYPE_GLYPH[entry.type] ?? "◆"}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {onToggleBookmark && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(entryName);
              }}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isBookmarked
                  ? isAmoled
                    ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                    : "border-amber-400 text-amber-600 bg-amber-50"
                  : isAmoled
                  ? "border-white/10 text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-white hover:bg-white/[0.06]"
                  : "border-neutral-200 text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-neutral-900 hover:bg-neutral-100"
              } ${isBookmarked ? "opacity-100" : ""}`}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
            >
              <Bookmark size={12} className={isBookmarked ? "fill-current" : ""} />
            </button>
          )}

          {entry.popular && (
            <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md border ${
              isAmoled
                ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}>
              <Star size={8} className="fill-current" /> Popular
            </span>
          )}

          <span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-md border ${
            isAmoled
              ? "bg-white/[0.04] text-neutral-400 border-white/10"
              : "bg-neutral-100 text-neutral-600 border-neutral-200"
          }`}>
            {entry.type}
          </span>
        </div>
      </div>

      <h3 className="text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-white leading-tight mb-0.5 group-hover:text-black dark:group-hover:text-white">
        {entry.name}
      </h3>
      <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
        {entry.org}
      </p>

      <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3.5 font-normal flex-1">
        {entry.summary}
      </p>

      <div className="mb-3.5">
        <span className={`inline-flex text-[10px] font-medium px-2 py-0.5 rounded-md border ${
          isAmoled
            ? "bg-white/[0.03] text-neutral-400 border-white/[0.06]"
            : "bg-neutral-50 text-neutral-600 border-neutral-200/80"
        }`}>
          {entry.task}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-white/[0.05]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-mono text-neutral-400 truncate">
            {entry.size}
          </span>
          {ratingSummary && ratingSummary.count > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-600 dark:text-neutral-300">
              <Star size={10} className="fill-amber-400 text-amber-400 shrink-0" />
              {ratingSummary.average.toFixed(1)}
              <span className="text-neutral-400 text-[10px]">({ratingSummary.count})</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-neutral-400">{entry.year}</span>
          <ChevronRight
            size={13}
            className="text-neutral-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
          />
        </div>
      </div>
    </article>
  );
});

