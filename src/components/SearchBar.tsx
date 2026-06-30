import React, { useRef, useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useTokens, useTheme, typeBadge, TYPE_GLYPH, typeIcon } from "../lib/theme";
import type { Entry } from "../types";

interface SearchBarProps {
  query: string;
  onChange: (q: string) => void;
  entries: Entry[];
  onSelect: (e: Entry) => void;
  showDropdown?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onChange,
  entries,
  onSelect,
  showDropdown = true,
}) => {
  const t = useTokens();
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isMac, setIsMac] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect OS for shortcut indicator
  useEffect(() => {
    if (typeof window !== "undefined") {
      const platform = navigator.platform || "";
      const userAgent = navigator.userAgent || "";
      const macRegex = /mac|ipod|ipad|iphone/i;
      setIsMac(macRegex.test(platform) || macRegex.test(userAgent));
    }
  }, []);

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

  // Reset activeIndex when query or results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [query, results]);

  const handleSelect = (e: Entry) => {
    onSelect(e);
    onChange("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || !open || results.length === 0) {
      if (e.key === "Escape") {
        onChange("");
        inputRef.current?.blur();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > -1 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          handleSelect(results[activeIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        onChange("");
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl glass-search"
      >
        <Search size={15} className={t.textMuted} />
        <input
          ref={inputRef}
          data-search
          type="text"
          value={query}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 180)}
          onKeyDown={handleKeyDown}
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
          {isMac ? "⌘K" : "Ctrl+K"}
        </kbd>
      </div>

      {/* Dropdown */}
      {showDropdown && open && query && (
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
            results.map((e, i) => {
              const isHighlighted = i === activeIndex;
              return (
                <div
                  key={i}
                  onMouseDown={(e) => {
                    // Prevent input blur before click executes
                    e.preventDefault();
                    handleSelect(results[i]);
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`
                    flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
                    ${isHighlighted ? (resolvedTheme === "light" ? "bg-slate-100/90" : "bg-white/[0.08]") : ""}
                    hover:${t.surfaceHover} border-b last:border-0 ${t.border}
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
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
