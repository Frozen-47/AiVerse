import React, { useState, useMemo } from 'react';
import type { Entry } from './types';
import { entries as initialEntries, typeFilters, taskFilters } from './data';
import { Search, Plus, X, ExternalLink, BookOpen, ChevronRight } from 'lucide-react';

// ─── Tag helpers ─────────────────────────────────────────────────────────────
const typeTagClass: Record<string, string> = {
  Model:     'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20',
  Framework: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20',
  Dataset:   'bg-sky-500/10    text-sky-600    dark:text-sky-400    border border-sky-500/20',
  Platform:  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
};
const taskTagClass: Record<string, string> = {
  NLP:               'bg-blue-500/10  text-blue-600  dark:text-blue-400  border border-blue-500/20',
  'Computer Vision': 'bg-pink-500/10  text-pink-600  dark:text-pink-400  border border-pink-500/20',
  MLOps:             'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20',
};
const getTypeTag = (t: string) => typeTagClass[t] ?? 'bg-black/5 dark:bg-white/5 text-secondary border border-black/10 dark:border-white/10';
const getTaskTag = (t: string) => taskTagClass[t] ?? 'bg-black/5 dark:bg-white/5 text-secondary border border-black/10 dark:border-white/10';

const animClass = "animate-fade-in-up opacity-0";

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const DetailModal: React.FC<{ entry: Entry; onClose: () => void }> = ({ entry, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-secondary hover:text-primary hover:bg-black/10 dark:hover:bg-white/10 transition-all"
      >
        <X size={14} />
      </button>

      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-black/5 dark:border-white/10">
        <h2 className="text-xl font-semibold text-primary mb-3">{entry.name}</h2>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${getTypeTag(entry.type)}`}>{entry.type}</span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${getTaskTag(entry.task)}`}>{entry.task}</span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-secondary border border-black/10 dark:border-white/10">{entry.license}</span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-secondary border border-black/10 dark:border-white/10">{entry.year}</span>
        </div>
        <p className="text-[13px] text-secondary leading-relaxed">{entry.summary}</p>
      </div>

      <div className="px-6 py-5 space-y-5">

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3">
          {[{ label: 'Organization', value: entry.org }, { label: 'Model Size', value: entry.size }].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-white/40 dark:bg-white/3 border border-black/5 dark:border-white/10 px-4 py-3">
              <p className="text-[10px] uppercase tracking-widest text-muted mb-1">{label}</p>
              <p className="text-[13px] font-semibold text-primary wrap-break-word">{value}</p>
            </div>
          ))}
        </div>

        {/* Architecture */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted mb-1.5">Architecture</p>
          <p className="text-[13px] text-secondary leading-relaxed">{entry.architecture}</p>
        </div>

        {/* Usage */}
        {entry.usage && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted mb-1.5">Example Usage</p>
            <div className="rounded-xl overflow-hidden border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between px-4 py-2 bg-black/80 dark:bg-black/90">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Python</span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
              </div>
              <pre className="bg-black/90 dark:bg-black px-4 py-4 text-[12px] text-green-400 font-mono overflow-x-auto whitespace-pre leading-relaxed">{entry.usage}</pre>
            </div>
          </div>
        )}

        {/* Benchmarks */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted mb-1.5">Benchmarks</p>
          <p className="text-[13px] text-secondary leading-relaxed">{entry.benchmarks}</p>
        </div>

        {/* Limitations */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted mb-1.5">Limitations</p>
          <div className="flex flex-wrap gap-1.5">
            {entry.limitations.split(',').map((l, i) => (
              <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-red-500/5 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/15 dark:border-red-500/20">
                ⚠ {l.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* URL */}
        {entry.url && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted mb-1.5">Official Resource</p>
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-secondary hover:text-primary bg-black/4 dark:bg-white/4 border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-lg transition-colors hover:border-black/20 dark:hover:border-white/20"
            >
              <ExternalLink size={12} />
              {entry.url}
            </a>
          </div>
        )}

        {/* Citations */}
        {entry.citations?.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted mb-1.5">Citations</p>
            <div className="space-y-1.5">
              {entry.citations.map((c, i) => (
                <a
                  key={i}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-black/5 dark:border-white/10 bg-white/30 dark:bg-white/3 hover:border-black/20 dark:hover:border-white/20 text-secondary hover:text-primary text-[12px] transition-all group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                  <span className="flex-1">{c.text}</span>
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// ─── Add Entry Modal ──────────────────────────────────────────────────────────
const AddModal: React.FC<{
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newEntry: Partial<Entry>;
  setNewEntry: React.Dispatch<React.SetStateAction<Partial<Entry>>>;
}> = ({ onClose, onSubmit, newEntry, setNewEntry }) => {

  const inputCls = "w-full bg-white/40 dark:bg-white/4 border border-black/10 dark:border-white/10 text-primary placeholder:text-muted px-3 py-2.5 rounded-lg text-[13px] focus:outline-none focus:border-black/30 dark:focus:border-white/30 focus:bg-white/60 dark:focus:bg-white/[0.07] transition-all";
  const labelCls = "block text-[10px] font-semibold text-muted mb-1.5 uppercase tracking-widest";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-secondary hover:text-primary hover:bg-black/10 dark:hover:bg-white/10 transition-all"
        >
          <X size={14} />
        </button>

        <div className="px-6 pt-6 pb-4 border-b border-black/5 dark:border-white/10">
          <h2 className="text-base font-semibold text-primary">Add New AI Tool</h2>
          <p className="text-[12px] text-secondary mt-0.5">Contribute to the community directory</p>
        </div>

        <form onSubmit={onSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tool Name *</label>
              <input required type="text" value={newEntry.name} onChange={e => setNewEntry({ ...newEntry, name: e.target.value })} className={inputCls} placeholder="e.g. Gemini 1.5 Pro" />
            </div>
            <div>
              <label className={labelCls}>Organization</label>
              <input type="text" value={newEntry.org} onChange={e => setNewEntry({ ...newEntry, org: e.target.value })} className={inputCls} placeholder="e.g. Google" />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select value={newEntry.type} onChange={e => setNewEntry({ ...newEntry, type: e.target.value })} className={inputCls}>
                {typeFilters.filter((t: string) => t !== 'All').map((t: string) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Task</label>
              <select value={newEntry.task} onChange={e => setNewEntry({ ...newEntry, task: e.target.value })} className={inputCls}>
                {taskFilters.filter((t: string) => t !== 'All Tasks').map((t: string) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>License</label>
              <input type="text" value={newEntry.license} onChange={e => setNewEntry({ ...newEntry, license: e.target.value })} className={inputCls} placeholder="e.g. Apache-2.0" />
            </div>
            <div>
              <label className={labelCls}>Year</label>
              <input type="number" value={newEntry.year} onChange={e => setNewEntry({ ...newEntry, year: parseInt(e.target.value) })} className={inputCls} min={1990} max={2099} />
            </div>
            <div>
              <label className={labelCls}>Model Size</label>
              <input type="text" value={newEntry.size} onChange={e => setNewEntry({ ...newEntry, size: e.target.value })} className={inputCls} placeholder="e.g. 7B params" />
            </div>
            <div>
              <label className={labelCls}>Official URL</label>
              <input type="url" value={newEntry.url} onChange={e => setNewEntry({ ...newEntry, url: e.target.value })} className={inputCls} placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className={labelCls}>Summary *</label>
            <textarea required rows={3} value={newEntry.summary} onChange={e => setNewEntry({ ...newEntry, summary: e.target.value })} className={`${inputCls} resize-none`} placeholder="A brief description of this tool..." />
          </div>
          <div>
            <label className={labelCls}>Architecture</label>
            <textarea rows={2} value={newEntry.architecture} onChange={e => setNewEntry({ ...newEntry, architecture: e.target.value })} className={`${inputCls} resize-none`} placeholder="Describe the model architecture..." />
          </div>
          <div>
            <label className={labelCls}>Usage Example</label>
            <textarea rows={4} value={newEntry.usage} onChange={e => setNewEntry({ ...newEntry, usage: e.target.value })} className={`${inputCls} font-mono resize-none`} placeholder="# Python code snippet..." />
          </div>
          <div>
            <label className={labelCls}>Benchmarks</label>
            <input type="text" value={newEntry.benchmarks} onChange={e => setNewEntry({ ...newEntry, benchmarks: e.target.value })} className={inputCls} placeholder="e.g. MMLU: 86.4%, HumanEval: 67%" />
          </div>
          <div>
            <label className={labelCls}>Limitations</label>
            <input type="text" value={newEntry.limitations} onChange={e => setNewEntry({ ...newEntry, limitations: e.target.value })} className={inputCls} placeholder="Comma-separated limitations..." />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-black/5 dark:border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-[13px] font-medium text-secondary hover:text-primary transition-colors">
              Cancel
            </button>
            <button type="submit" className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[13px] font-medium border border-black/10 dark:border-white/20 bg-white/40 dark:bg-white/6 backdrop-blur-md text-primary hover:bg-white/60 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/30 transition-all shadow-sm">
              <Plus size={13} /> Submit Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('All');
  const [currentTask, setCurrentTask] = useState('All Tasks');
  const [entriesList, setEntriesList] = useState<Entry[]>(initialEntries);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const emptyEntry: Partial<Entry> = {
    name: '', type: 'Model', task: 'NLP', summary: '', license: 'Open Source',
    year: new Date().getFullYear(), org: '', size: 'Unknown',
    architecture: '', usage: '', benchmarks: 'N/A', limitations: '', url: '', citations: []
  };
  const [newEntry, setNewEntry] = useState<Partial<Entry>>(emptyEntry);

  const filtered = useMemo(() => entriesList.filter(e => {
    const matchType   = currentFilter === 'All' || e.type === currentFilter;
    const matchTask   = currentTask === 'All Tasks' || e.task === currentTask;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || e.name.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q) || e.org.toLowerCase().includes(q);
    return matchType && matchTask && matchSearch;
  }), [searchQuery, currentFilter, currentTask, entriesList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.name || !newEntry.summary) return;
    setEntriesList([newEntry as Entry, ...entriesList]);
    setNewEntry(emptyEntry);
    setIsAddOpen(false);
  };

  const filterBtnCls = (active: boolean) =>
    `px-3 py-1 rounded-full text-[12px] font-medium border transition-all ${
      active
        ? 'bg-white/40 dark:bg-white/10 border-black/20 dark:border-white/20 text-primary shadow-sm'
        : 'bg-transparent border-black/5 dark:border-white/5 text-secondary hover:border-black/15 dark:hover:border-white/15 hover:text-primary'
    }`;

  return (
    <div className="min-h-screen relative font-sans text-sm selection:bg-primary/10">

      {/* Identical glow background from your portfolio */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary),0.04)_0,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(var(--primary),0.03)_0,transparent_50%)] blur-[60px]" />

      <main className="max-w-4xl mx-auto px-4 pt-10 pb-12 flex flex-col gap-4">

        {/* ── Hero card ── */}
        <section
          className={`bg-white/10 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-xl p-5 hover:border-black/20 dark:hover:border-white/20 transition-all ${animClass}`}
          style={{ animationDelay: '0ms' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <BookOpen size={13} className="text-muted" />
                <span className="text-[10px] uppercase tracking-widest text-muted font-medium">Open Knowledge Base</span>
              </div>
              <h1 className="text-xl font-semibold text-primary mb-1">AI Directory</h1>
              <p className="text-[13px] text-secondary leading-relaxed max-w-md">
                A curated, citation-backed encyclopedia of AI models, datasets, frameworks, and platforms.
              </p>
            </div>
            <div className="flex gap-5 shrink-0">
              <div className="text-right">
                <p className="text-lg font-semibold text-primary">{entriesList.length}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted">Entries</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-primary">4</p>
                <p className="text-[10px] uppercase tracking-widest text-muted">Types</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Search + Filters card ── */}
        <section
          className={`bg-white/10 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-xl p-4 hover:border-black/20 dark:hover:border-white/20 transition-all ${animClass}`}
          style={{ animationDelay: '50ms' }}
        >
          <div className="relative mb-3">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search models, orgs, tasks..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/40 dark:bg-white/4 border border-black/10 dark:border-white/10 text-primary placeholder:text-muted text-[13px] focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2 items-center">
            <span className="text-[10px] uppercase tracking-widest text-muted mr-1">Type</span>
            {typeFilters.map(f => (
              <button key={f} onClick={() => setCurrentFilter(f)} className={filterBtnCls(currentFilter === f)}>{f}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] uppercase tracking-widest text-muted mr-1">Task</span>
            {taskFilters.map(t => (
              <button key={t} onClick={() => setCurrentTask(t)} className={filterBtnCls(currentTask === t)}>{t}</button>
            ))}
          </div>
        </section>

        {/* ── Count + Add row ── */}
        <div
          className={`flex items-center justify-between ${animClass}`}
          style={{ animationDelay: '100ms' }}
        >
          <p className="text-[12px] text-muted">
            Showing <span className="text-primary font-semibold">{filtered.length}</span> of {entriesList.length} entries
          </p>
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-secondary hover:text-primary bg-white/10 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full transition-all hover:border-black/20 dark:hover:border-white/20 shadow-sm"
          >
            <Plus size={13} /> Add Entry
          </button>
        </div>

        {/* ── Entries grid card ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-secondary">
            <p className="text-3xl mb-3">◌</p>
            <p className="text-[13px]">No entries found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <section
            className={`bg-white/10 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-xl p-5 hover:border-black/20 dark:hover:border-white/20 transition-all ${animClass}`}
            style={{ animationDelay: '150ms' }}
          >
            <div className="flex items-center gap-2 mb-4 pb-1.5 border-b border-black/5 dark:border-white/10">
              <h2 className="text-base font-semibold text-primary">All Entries</h2>
              <span className="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 text-secondary px-2 py-0.5 rounded-full text-[11px] font-medium">{filtered.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((entry, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedEntry(entry)}
                  className="group flex flex-col bg-white/30 dark:bg-white/3 border border-black/5 dark:border-white/10 rounded-xl p-4 cursor-pointer hover:border-black/20 dark:hover:border-white/20 hover:bg-white/50 dark:hover:bg-white/6 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-[14px] font-semibold text-primary leading-tight">{entry.name}</h3>
                    <span className="text-[10px] font-mono text-muted ml-2 mt-0.5 shrink-0">{entry.year}</span>
                  </div>

                  <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">{entry.org}</p>

                  <p className="text-[12px] text-secondary leading-relaxed line-clamp-2 mb-3 flex-1">{entry.summary}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getTypeTag(entry.type)}`}>{entry.type}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getTaskTag(entry.task)}`}>{entry.task}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-black/5 dark:border-white/5">
                    <span className="text-[10px] font-mono text-muted truncate max-w-[80%]">{entry.size}</span>
                    <ChevronRight size={13} className="text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Modals */}
      {selectedEntry && <DetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />}
      {isAddOpen && (
        <AddModal
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleSubmit}
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      )}
    </div>
  );
};

export default App;