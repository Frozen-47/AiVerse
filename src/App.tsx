import React, { useState, useMemo, useEffect } from "react";
import { ThemeContext } from "./lib/theme";
import { useTokens } from "./lib/theme";
import { entries as initialEntries } from "./data";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { SearchBar } from "./components/SearchBar";
import { EntryCard } from "./components/EntryCard";
import { DetailModal } from "./components/DetailModal";
import { AddModal } from "./components/AddModal";
import type { Entry, Theme, TypeFilter, TaskFilter } from "./types";

// ─── Inner app (needs theme context) ─────────────────────────────────────────
const Inner: React.FC = () => {
  const t = useTokens();
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("All Tasks");
  const [popularOnly, setPopularOnly] = useState(false);
  const [selected, setSelected] = useState<Entry | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        (document.querySelector<HTMLInputElement>("[data-search]"))?.focus();
      }
      if (e.key === "Escape") {
        setSelected(null);
        setIsAdding(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() =>
    entries.filter((e) => {
      if (typeFilter !== "All" && e.type !== typeFilter) return false;
      if (taskFilter !== "All Tasks" && e.task !== taskFilter) return false;
      if (popularOnly && !e.popular) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !e.name.toLowerCase().includes(q) &&
          !e.summary.toLowerCase().includes(q) &&
          !e.org.toLowerCase().includes(q) &&
          !e.task.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    }),
  [entries, typeFilter, taskFilter, popularOnly, search]);

  const handleAdd = (partial: Partial<Entry>) => {
    const complete: Entry = {
      name: partial.name ?? "",
      org: partial.org ?? "",
      type: partial.type ?? "Model",
      task: partial.task ?? "NLP",
      license: partial.license ?? "Unknown",
      year: partial.year ?? new Date().getFullYear(),
      size: partial.size ?? "Unknown",
      summary: partial.summary ?? "",
      architecture: partial.architecture ?? "",
      usage: partial.usage,
      benchmarks: partial.benchmarks ?? "N/A",
      limitations: partial.limitations ?? "",
      url: partial.url,
      citations: partial.citations ?? [],
      popular: partial.popular ?? false,
    };
    setEntries((prev) => [complete, ...prev]);
    setIsAdding(false);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${t.page}`}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full bg-cyan-400/4 blur-[120px]" />
        <div className="absolute top-1/3 -right-20 w-75 h-100 rounded-full bg-violet-500/3 blur-[100px]" />
      </div>

      <Navbar onAddEntry={() => setIsAdding(true)} entryCount={entries.length} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-10">
          <div className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest border rounded-full px-4 py-1.5 mb-5 ${t.surface} ${t.border} ${t.textMuted}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Open AI Knowledge Base · {entries.length} Entities
          </div>
          <h1 className={`text-[clamp(32px,5vw,52px)] font-black leading-[1.05] tracking-[-0.03em] mb-3 ${t.textPrimary}`}>
            Every AI tool,{" "}
            <span className="bg-linear-to-r from-cyan-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              one universe.
            </span>
          </h1>
          <p className={`text-[15px] leading-relaxed max-w-xl font-light ${t.textSecondary}`}>
            A citation-backed encyclopedia of models, frameworks, datasets, and platforms — built for builders.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-2xl">
          <SearchBar
            query={search}
            onChange={setSearch}
            entries={entries}
            onSelect={(e) => { setSelected(e); setSearch(""); }}
          />
        </div>

        {/* Main layout */}
        <div className="flex gap-8">
          {/* Sidebar — hidden on mobile */}
          <div className="hidden lg:block">
            <Sidebar
              entries={entries}
              currentFilter={typeFilter}
              currentTask={taskFilter}
              popularOnly={popularOnly}
              filteredCount={filtered.length}
              onTypeFilter={setTypeFilter}
              onTaskFilter={setTaskFilter}
              onPopularToggle={() => setPopularOnly((p) => !p)}
            />
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile filters */}
            <div className="flex flex-wrap gap-2 mb-5 lg:hidden">
              {["All", "Model", "Framework", "Dataset", "Platform"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTypeFilter(f as TypeFilter)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
                    typeFilter === f ? t.pillActive : t.pillInactive
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-3">
                <div className={`text-5xl opacity-10 ${t.textPrimary}`}>◌</div>
                <p className={`text-[14px] ${t.textMuted}`}>No entries match your filters.</p>
                <button
                  onClick={() => { setTypeFilter("All"); setTaskFilter("All Tasks"); setPopularOnly(false); setSearch(""); }}
                  className={`text-[12px] underline underline-offset-2 ${t.textAccent}`}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((entry, i) => (
                  <EntryCard
                    key={entry.name}
                    entry={entry}
                    onClick={() => setSelected(entry)}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selected && <DetailModal entry={selected} onClose={() => setSelected(null)} />}
      {isAdding && <AddModal onClose={() => setIsAdding(false)} onSubmit={handleAdd} />}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
};

// ─── Root App (provides context) ──────────────────────────────────────────────
const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("amoled");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Inner />
    </ThemeContext.Provider>
  );
};

export default App;
