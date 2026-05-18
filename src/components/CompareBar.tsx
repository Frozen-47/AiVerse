import { memo } from "react";
import { X, Scale, ChevronRight } from "lucide-react";
import { useTokens } from "../lib/theme";
import type { Entry } from "../types";

interface CompareBarProps {
  entries: Entry[];
  onRemove: (name: string) => void;
  onClear: () => void;
  onOpen: (entry: Entry) => void;
}

export const CompareBar = memo(function CompareBar({
  entries,
  onRemove,
  onClear,
  onOpen,
}: CompareBarProps) {
  const t = useTokens();
  if (entries.length === 0) return null;

  return (
    <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl rounded-2xl border shadow-2xl px-4 py-3 ${t.modal} ${t.border}`}>
      <div className="flex items-center gap-3 mb-2">
        <Scale size={14} className={t.textAccent} />
        <span className={`text-[12px] font-bold uppercase tracking-wider ${t.textPrimary}`}>
          Compare ({entries.length}/3)
        </span>
        <button
          type="button"
          onClick={onClear}
          className={`ml-auto text-[11px] font-medium ${t.textMuted} hover:${t.textSecondary}`}
        >
          Clear all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {entries.map((entry) => (
          <div
            key={entry.name}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${t.surface2} ${t.border}`}
          >
            <button
              type="button"
              onClick={() => onOpen(entry)}
              className={`flex-1 min-w-0 text-left text-[12px] font-semibold truncate ${t.textPrimary} hover:${t.textAccent}`}
            >
              {entry.name}
            </button>
            <span className={`text-[10px] shrink-0 ${t.textMuted}`}>{entry.year}</span>
            <button
              type="button"
              onClick={() => onRemove(entry.name)}
              className={`p-1 rounded-lg ${t.textMuted} hover:${t.textSecondary}`}
              aria-label={`Remove ${entry.name} from compare`}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
      {entries.length >= 2 && (
        <button
          type="button"
          onClick={() => onOpen(entries[0])}
          className={`mt-2 w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold py-1.5 rounded-lg ${t.textAccent}`}
        >
          View first entry details
          <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
});
