import React, { useState } from "react";
import { X, Plus, Server } from "lucide-react";
import { useTokens } from "../lib/theme";
import { typeFilters, taskFilters } from "../data";
import type { Entry } from "../types";

type PartialEntry = Partial<Entry>;

interface AddModalProps {
  onClose: () => void;
  onSubmit: (e: PartialEntry) => void;
}

const emptyEntry = (): PartialEntry => ({
  name: "",
  type: "Model",
  task: "NLP",
  summary: "",
  license: "Open Source",
  year: new Date().getFullYear(),
  org: "",
  size: "Unknown",
  architecture: "",
  usage: "",
  benchmarks: "N/A",
  limitations: "",
  url: "",
  citations: [],
  popular: false,
});


export const AddModal: React.FC<AddModalProps> = ({ onClose, onSubmit: _onSubmit }) => {
  const t = useTokens();
  const [entry, setEntry] = useState<PartialEntry>(emptyEntry());
  const [showBackendMsg, setShowBackendMsg] = useState(false);

  const inputCls = `w-full px-3 py-2.5 rounded-xl text-[13px] border focus:outline-none transition-all ${t.input}`;
  const labelCls = `block text-[10px] font-semibold uppercase tracking-widest mb-1.5 ${t.textMuted}`;

  const set = (patch: Partial<PartialEntry>) => setEntry((p) => ({ ...p, ...patch }));

  const addCitation = () =>
    set({ citations: [...(entry.citations ?? []), { text: "", url: "" }] });

  const removeCitation = (i: number) =>
    set({ citations: (entry.citations ?? []).filter((_, idx) => idx !== i) });

  const updateCitation = (i: number, field: "text" | "url", value: string) => {
    const updated = [...(entry.citations ?? [])];
    updated[i] = { ...updated[i], [field]: value };
    set({ citations: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.name || !entry.summary) return;
    
    setShowBackendMsg(true);
    setTimeout(() => {
      setShowBackendMsg(false);
      onClose();
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl ${t.modal} ${t.border}`}>

        {/* ── Header (fixed) ── */}
        <div className={`shrink-0 px-7 pt-7 pb-5 border-b ${t.border}`}>
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full border transition-all ${t.surface} ${t.border} ${t.textMuted}`}
          >
            <X size={13} />
          </button>
          <h2 className={`text-base font-black tracking-tight ${t.textPrimary}`}>Add New AI Tool</h2>
          <p className={`text-[12px] mt-0.5 ${t.textMuted}`}>Contribute to the AiVerse directory</p>
        </div>

        {/* ── Scrollable body (hidden scrollbar) ── */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-7 py-6 space-y-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className={labelCls}>Tool Name *</label>
              <input required type="text" value={entry.name ?? ""} onChange={(e) => set({ name: e.target.value })} className={inputCls} placeholder="e.g. Gemini 1.5 Pro" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className={labelCls}>Organization</label>
              <input type="text" value={entry.org ?? ""} onChange={(e) => set({ org: e.target.value })} className={inputCls} placeholder="e.g. Google" />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select value={entry.type ?? "Model"} onChange={(e) => set({ type: e.target.value as Entry["type"] })} className={inputCls}>
                {typeFilters.filter((f) => f !== "All").map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Task</label>
              <select value={entry.task ?? "NLP"} onChange={(e) => set({ task: e.target.value as Entry["task"] })} className={inputCls}>
                {taskFilters.filter((f) => f !== "All Tasks").map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>License</label>
              <input type="text" value={entry.license ?? ""} onChange={(e) => set({ license: e.target.value })} className={inputCls} placeholder="e.g. Apache-2.0" />
            </div>
            <div>
              <label className={labelCls}>Year</label>
              <input type="number" value={entry.year ?? new Date().getFullYear()} onChange={(e) => set({ year: parseInt(e.target.value) })} className={inputCls} min={1990} max={2099} />
            </div>
            <div>
              <label className={labelCls}>Model Size</label>
              <input type="text" value={entry.size ?? ""} onChange={(e) => set({ size: e.target.value })} className={inputCls} placeholder="e.g. 7B params" />
            </div>
            <div>
              <label className={labelCls}>Official URL</label>
              <input type="url" value={entry.url ?? ""} onChange={(e) => set({ url: e.target.value })} className={inputCls} placeholder="https://..." />
            </div>
          </div>

          {/* Popular toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" checked={!!entry.popular} onChange={(e) => set({ popular: e.target.checked })} className="sr-only peer" />
              <div className={`w-9 h-5 rounded-full transition-colors ${entry.popular ? "bg-cyan-500" : "bg-white/10"} peer-focus:ring-2 peer-focus:ring-cyan-500/30`} />
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${entry.popular ? "translate-x-4" : ""}`} />
            </div>
            <span className={`text-[13px] ${t.textSecondary}`}>Mark as Popular</span>
          </label>

          <div>
            <label className={labelCls}>Summary *</label>
            <textarea required rows={3} value={entry.summary ?? ""} onChange={(e) => set({ summary: e.target.value })} className={`${inputCls} resize-none`} placeholder="Brief description..." />
          </div>
          <div>
            <label className={labelCls}>Architecture</label>
            <textarea rows={2} value={entry.architecture ?? ""} onChange={(e) => set({ architecture: e.target.value })} className={`${inputCls} resize-none`} placeholder="Model architecture..." />
          </div>
          <div>
            <label className={labelCls}>Usage Example</label>
            <textarea rows={4} value={entry.usage ?? ""} onChange={(e) => set({ usage: e.target.value })} className={`${inputCls} font-mono resize-none`} placeholder="# Python code..." />
          </div>
          <div>
            <label className={labelCls}>Benchmarks</label>
            <input type="text" value={entry.benchmarks ?? ""} onChange={(e) => set({ benchmarks: e.target.value })} className={inputCls} placeholder="e.g. MMLU: 86.4%" />
          </div>
          <div>
            <label className={labelCls}>Limitations</label>
            <input type="text" value={entry.limitations ?? ""} onChange={(e) => set({ limitations: e.target.value })} className={inputCls} placeholder="Comma-separated..." />
          </div>

          {/* Citations */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + " mb-0"}>Citations</label>
              <button type="button" onClick={addCitation} className={`inline-flex items-center gap-1 text-[11px] border px-2.5 py-1 rounded-lg transition-colors ${t.btnSecondary} ${t.border}`}>
                <Plus size={10} /> Add
              </button>
            </div>
            {(entry.citations ?? []).length === 0 && (
              <p className={`text-[11px] italic ${t.textMuted}`}>No citations yet.</p>
            )}
            <div className="space-y-2">
              {(entry.citations ?? []).map((c, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-1.5">
                    <input type="text" value={c.text} onChange={(e) => updateCitation(i, "text", e.target.value)} className={inputCls} placeholder="Smith et al. (2024)" />
                    <input type="url" value={c.url} onChange={(e) => updateCitation(i, "url", e.target.value)} className={inputCls} placeholder="https://arxiv.org/..." />
                  </div>
                  <button type="button" onClick={() => removeCitation(i)} className="mt-1 w-7 h-7 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors shrink-0">
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Progress Message */}
          {showBackendMsg && (
            <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-[13px] bg-amber-500/10 border-amber-500/20 text-amber-500 font-medium animate-[fadeUp_0.3s_ease-out]`}>
              <Server size={16} className="shrink-0" />
              <span>
                Backend integration is currently in progress. Entry submissions are temporarily disabled.
              </span>
            </div>
          )}

          {/* ── Footer (inside form, stays at bottom of scroll) ── */}
          <div className={`flex justify-end gap-2 pt-4 border-t ${t.border}`}>
            <button type="button" onClick={onClose} className={`px-4 py-2 rounded-xl text-[13px] transition-colors ${t.btnGhost}`}>
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={showBackendMsg}
              className={`inline-flex items-center gap-1.5 px-6 py-2 rounded-full text-[13px] font-semibold transition-all ${showBackendMsg ? 'opacity-50 cursor-not-allowed' : ''} ${t.btnPrimary}`}
            >
              <Plus size={13} /> Submit Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};