import React, { useRef, useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useTokens, typeBadge, TYPE_GLYPH, typeIcon } from "../lib/theme";
import type { Entry } from "../types";

interface SearchBarProps {
  query: string;
  onChange: (q: string) => void;
  entries: Entry[];
  onSelect: (e: Entry) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onChange,
  entries,
  onSelect,
}) => {
  const t = useTokens();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return entries
      .filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.org.toLowerCase().includes(q) ||
          e.task.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q)
      )
      .slice(0, 7);
  }, [query, entries]);

  const handleSelect = (e: Entry) => {
    onSelect(e);
    onChange("");
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200
          ${t.surface} ${t.border}
          ${open && query ? "ring-2 ring-cyan-500/20 border-cyan-500/40" : ""}
        `}
      >
        <Search size={15} className={t.textMuted} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search models, frameworks, orgs…"
          className={`flex-1 bg-transparent text-[14px] focus:outline-none ${t.textPrimary} placeholder:${t.textMuted}`}
        />
        {query && (
          <button
            onClick={() => { onChange(""); inputRef.current?.focus(); }}
            className={`w-5 h-5 flex items-center justify-center rounded-full ${t.textMuted} hover:${t.textSecondary} transition-colors`}
          >
            <X size={12} />
          </button>
        )}
        <kbd className={`hidden sm:inline-flex items-center text-[10px] border rounded px-1.5 py-0.5 font-mono ${t.textMuted} ${t.border}`}>
          ⌘K
        </kbd>
      </div>

      {/* Dropdown */}
      {open && query && (
        <div
          className={`
            absolute top-[calc(100%+8px)] left-0 right-0 z-50 rounded-2xl border shadow-2xl overflow-hidden
            ${t.modal} ${t.border}
          `}
        >
          {results.length === 0 ? (
            <div className={`px-4 py-8 text-center text-[13px] ${t.textMuted}`}>
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((e, i) => (
              <div
                key={i}
                onClick={() => handleSelect(e)}
                className={`
                  flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
                  ${t.surfaceHover} border-b last:border-0 ${t.border}
                `}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${typeIcon(e.type, t)}`}>
                  {TYPE_GLYPH[e.type] ?? "◆"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-semibold truncate ${t.textPrimary}`}>{e.name}</p>
                  <p className={`text-[11px] truncate ${t.textMuted}`}>
                    {e.org} · {e.task}
                  </p>
                </div>
                <span
                  className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md border shrink-0 ${typeBadge(e.type, t)}`}
                >
                  {e.type}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
