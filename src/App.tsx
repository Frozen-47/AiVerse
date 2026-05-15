import React, { useState, useMemo, useEffect } from "react";
import { Server } from "lucide-react";
import { ThemeContext, useTheme } from "./lib/theme";
import { useTokens } from "./lib/theme";
import { entries as initialEntries, typeFilters } from "./data";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { SearchBar } from "./components/SearchBar";
import { EntryCard } from "./components/EntryCard";
import { DetailModal } from "./components/DetailModal";
import { AddModal } from "./components/AddModal";
import { ChatWidget } from "./components/ChatWidget";
import type { Entry, Theme, TypeFilter, TaskFilter } from "./types";

// ─── Inner app (needs theme context) ─────────────────────────────────────────
const Inner: React.FC = () => {
  const t = useTokens();
  const { theme } = useTheme();
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("All Tasks");
  const [popularOnly, setPopularOnly] = useState(false);
  const [selected, setSelected] = useState<Entry | null>(null);
  const [isAdding, setIsAdding] = useState(false); // We can leave this in case it's needed later, but we will use the toast instead.
  const [showBackendToast, setShowBackendToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddClick = () => {
    setShowBackendToast(true);
    setTimeout(() => setShowBackendToast(false), 3500);
  };

  // Reset to page 1 and scroll to top when filters change
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [typeFilter, taskFilter, popularOnly, search]);

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

  // Sync document body and meta tags for an orderly global theme switch
  useEffect(() => {
    if (theme === "amoled") {
      document.documentElement.style.backgroundColor = "#000000";
      document.body.style.backgroundColor = "#000000";
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#000000");
    } else {
      document.documentElement.style.backgroundColor = "#f8fafc";
      document.body.style.backgroundColor = "#f8fafc";
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f8fafc");
    }
  }, [theme]);

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

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedEntries = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${t.page}`}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full bg-cyan-400/4 blur-[120px]" />
        <div className="absolute top-1/3 -right-20 w-75 h-100 rounded-full bg-violet-500/3 blur-[100px]" />
      </div>

      <Navbar onAddEntry={handleAddClick} entryCount={entries.length} />

      <div className="w-full px-6 xl:px-12 py-8">
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
        <div className="flex gap-8 w-full">
          {/* Sidebar — hidden on mobile */}
          <div className="hidden lg:block sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
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
              {typeFilters.map((f) => (
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
              <div className="flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {paginatedEntries.map((entry, i) => (
                    <EntryCard
                      key={entry.name}
                      entry={entry}
                      onClick={() => setSelected(entry)}
                      index={i}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${t.surface} ${t.border} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : `hover:${t.textPrimary}`}`}
                    >
                      Prev
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-all flex items-center justify-center ${
                          currentPage === page 
                            ? t.btnPrimary 
                            : `${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${t.surface} ${t.border} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : `hover:${t.textPrimary}`}`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer 
        className={`mt-8 text-center text-[11px] ${t.textSecondary} border-t ${t.border} pt-6 pb-2 animate-fade-in-up opacity-0`}
        style={{ animationDelay: '600ms' }}
      >
        <p>
          Built by Sabareesh. Find me on <a href="https://discord.com/users/1272910357517701147" className={`${t.textMuted} font-semibold hover:underline`}>Discord</a> and <a href="https://github.com/Frozen-47" className={`${t.textMuted} font-semibold hover:underline`}>GitHub</a>
        </p>
      </footer>

      {selected && <DetailModal entry={selected} onClose={() => setSelected(null)} />}
      {isAdding && <AddModal onClose={() => setIsAdding(false)} onSubmit={handleAdd} />}

      {/* Global Toast Notification */}
      {showBackendToast && (
        <div className="fixed bottom-24 right-6 z-50 animate-[fadeUp_0.3s_ease-out]">
          <div className="p-4 rounded-xl border flex items-center gap-3 text-[13px] bg-red-500/10 border-red-500/20 text-red-500 font-medium shadow-2xl backdrop-blur-md">
            <Server size={18} className="shrink-0" />
            <span>
              Backend integration is currently in progress.<br/>
              Entry submissions are temporarily disabled.
            </span>
          </div>
        </div>
      )}

      {/* Groq AI Agent */}
      <ChatWidget />

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
