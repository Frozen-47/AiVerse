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
        group flex flex-col rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-200 border ${
          isAmoled
            ? "bg-[#1e1f20] border-white/10 hover:border-white/20 hover:bg-[#252729] hover:shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-[0_4px_16px_rgba(32,33,36,0.1)]"
        }
        hover:-translate-y-0.5
        [content-visibility:auto]
        ${animate ? "animate-fade-in-up" : ""}
      `}
    >
      {/* ── 1. Breadcrumb & Favicon Row ── */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 border ${
            isAmoled
              ? "bg-white/[0.08] border-white/10 text-neutral-200"
              : "bg-[#f1f3f4] border-neutral-200 text-neutral-700"
          }`}>
            {TYPE_GLYPH[entry.type] ?? "◆"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100 truncate leading-tight">
              {entry.org || "AiVerse Resource"}
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal truncate leading-tight">
              aiverse.dev › {entry.type.toLowerCase()} › {entry.task.toLowerCase().replace(/\s+/g, '-')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {entry.popular && (
            <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${
              isAmoled
                ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}>
              <Star size={8} className="fill-current text-amber-500" /> Top Choice
            </span>
          )}

          {onToggleBookmark && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(entryName);
              }}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isBookmarked
                  ? isAmoled
                    ? "text-[#8ab4f8] bg-blue-500/10"
                    : "text-[#1a73e8] bg-blue-50"
                  : "text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10"
              }`}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
            >
              <Bookmark size={13} className={isBookmarked ? "fill-current" : ""} />
            </button>
          )}
        </div>
      </div>

      {/* ── 2. Search Result Title ── */}
      <h3 className="text-base sm:text-[17px] font-medium tracking-normal text-[#1a0dab] dark:text-[#8ab4f8] group-hover:underline leading-snug mb-1.5">
        {entry.name}
      </h3>

      {/* ── 3. Snippet Description ── */}
      <p className="text-xs sm:text-[13px] leading-relaxed text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2 mb-3 flex-1 font-normal">
        {entry.summary}
      </p>

      {/* ── 4. Attribute Sitelinks / Chips ── */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
        <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
          isAmoled
            ? "bg-white/[0.05] text-neutral-300 border-white/10"
            : "bg-[#f1f3f4] text-[#3c4043] border-neutral-200/80"
        }`}>
          {entry.task}
        </span>
        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
          isAmoled
            ? "bg-white/[0.02] text-neutral-400 border-white/5"
            : "bg-[#f8f9fa] text-neutral-600 border-neutral-200/60"
        }`}>
          {entry.size}
        </span>
        <span className={`text-[11px] px-2 py-0.5 rounded-full border ${
          isAmoled
            ? "bg-white/[0.02] text-neutral-400 border-white/5"
            : "bg-[#f8f9fa] text-neutral-600 border-neutral-200/60"
        }`}>
          {entry.type}
        </span>
      </div>

      {/* ── 5. Structured Data / Rating & Meta Row ── */}
      <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 dark:border-white/[0.06] text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          {ratingSummary && ratingSummary.count > 0 ? (
            <div className="flex items-center gap-1 font-normal">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{ratingSummary.average.toFixed(1)}</span>
              <div className="flex items-center text-amber-500">
                <Star size={11} className="fill-amber-400 text-amber-400" />
              </div>
              <span>({ratingSummary.count})</span>
            </div>
          ) : (
            <span>{entry.license}</span>
          )}
          <span>•</span>
          <span>{entry.year}</span>
        </div>

        <div className="flex items-center gap-1 text-[#1a73e8] dark:text-[#8ab4f8] font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Overview</span>
          <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </article>
  );
});
