import React, { useState, useEffect } from "react";
import { X, Plus, Server, Layers, Cpu, Code2, BookOpen, HelpCircle } from "lucide-react";
import { useTokens, useTheme } from "../lib/theme";
import type { Entry } from "../types";
import { useAuth } from "./AuthContext";

type PartialEntry = Partial<Entry>;

interface AddModalProps {
  typeFilters: string[];
  taskFilters: string[];
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

export const AddModal: React.FC<AddModalProps> = ({ typeFilters, taskFilters, onClose, onSubmit: _onSubmit }) => {
  const t = useTokens();
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";
  const { user } = useAuth();

  const [entry, setEntry] = useState<PartialEntry>(emptyEntry());
  const [showBackendMsg, setShowBackendMsg] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const inputCls = `w-full px-3.5 py-2.5 rounded-lg text-[13px] border transition-all ${
    isAmoled
      ? "bg-white/[0.04] border-white/15 text-white placeholder:text-neutral-500 focus:border-[#8ab4f8] focus:ring-2 focus:ring-[#8ab4f8]/20"
      : "bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20"
  } focus:outline-none`;

  const labelCls = "text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1 block";
  const helperCls = "text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 block";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.name || !entry.summary) return;
    
    setShowBackendMsg(true);
    try {
      const { insertEntry } = await import('../lib/supabase');
      
      const toSubmit = { ...entry };
      const userKey = user ? (user.id.startsWith("supabase_") ? user.id : `supabase_${user.id}`) : null;
      
      const inserted = (await insertEntry(toSubmit, userKey || undefined)) as any;
      
      if (inserted && inserted.length > 0) {
        _onSubmit(inserted[0]);
      } else {
        _onSubmit(entry);
      }
    } catch (err) {
      console.error("Failed to insert entry:", err);
      _onSubmit(entry);
    } finally {
      setShowBackendMsg(false);
      onClose();
    }
  };

  return (
    <div
      className={t.modalOverlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border ${
        isAmoled 
          ? "bg-[#1e1f20] border-white/10 text-white" 
          : "bg-white border-neutral-200 text-neutral-900"
      }`}>

        {/* ── Google Cloud Console Header Bar ── */}
        <div className="shrink-0 px-6 py-4 border-b border-neutral-200/90 dark:border-white/10 bg-[#f8f9fa] dark:bg-[#18191a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#1a73e8] dark:text-[#8ab4f8] flex items-center justify-center border border-blue-200/60 dark:border-blue-700/30">
              <Layers size={17} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                <span>AiVerse Console</span>
                <span>›</span>
                <span>Registry</span>
                <span>›</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-medium">New Resource</span>
              </div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white leading-tight">
                Register AI Resource
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-200/70 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Form Body structured as Google Cloud Sections ── */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-6 no-scrollbar bg-white dark:bg-[#1e1f20]"
        >
          {/* Section 1: Basic Information */}
          <div className="rounded-2xl border border-neutral-200 dark:border-white/10 p-5 bg-[#fafafa] dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-3.5">
              <Layers size={15} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">1. Basic Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Resource Name *</label>
                <input required type="text" value={entry.name ?? ""} onChange={(e) => set({ name: e.target.value })} className={inputCls} placeholder="e.g. DeepSeek-V3" />
                <span className={helperCls}>Public canonical name of the AI model or tool</span>
              </div>
              <div>
                <label className={labelCls}>Publisher / Organization</label>
                <input type="text" value={entry.org ?? ""} onChange={(e) => set({ org: e.target.value })} className={inputCls} placeholder="e.g. Mistral AI" />
                <span className={helperCls}>Company, research group, or lead creator</span>
              </div>
              <div>
                <label className={labelCls}>Asset Type</label>
                <select value={entry.type ?? "Model"} onChange={(e) => set({ type: e.target.value as Entry["type"] })} className={inputCls}>
                  {typeFilters.filter((f) => f !== "All").map((f) => <option key={f} className="text-black">{f}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Primary Task</label>
                <select value={entry.task ?? "NLP"} onChange={(e) => set({ task: e.target.value as Entry["task"] })} className={inputCls}>
                  {taskFilters.filter((f) => f !== "All Tasks").map((f) => <option key={f} className="text-black">{f}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specifications */}
          <div className="rounded-2xl border border-neutral-200 dark:border-white/10 p-5 bg-[#fafafa] dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-3.5">
              <Cpu size={15} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">2. Technical Specifications</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Parameter / Model Size</label>
                <input type="text" value={entry.size ?? ""} onChange={(e) => set({ size: e.target.value })} className={inputCls} placeholder="e.g. 70B params" />
              </div>
              <div>
                <label className={labelCls}>License</label>
                <input type="text" value={entry.license ?? ""} onChange={(e) => set({ license: e.target.value })} className={inputCls} placeholder="e.g. Apache-2.0" />
              </div>
              <div>
                <label className={labelCls}>Release Year</label>
                <input type="number" value={entry.year ?? new Date().getFullYear()} onChange={(e) => set({ year: parseInt(e.target.value) })} className={inputCls} min={1990} max={2099} />
              </div>
            </div>

            <div className="mt-4">
              <label className={labelCls}>Architecture Details</label>
              <input type="text" value={entry.architecture ?? ""} onChange={(e) => set({ architecture: e.target.value })} className={inputCls} placeholder="e.g. Mixture-of-Experts (MoE) with Multi-Head Latent Attention" />
              <span className={helperCls}>Key architectural features or model foundations</span>
            </div>
          </div>

          {/* Section 3: Documentation & Overview */}
          <div className="rounded-2xl border border-neutral-200 dark:border-white/10 p-5 bg-[#fafafa] dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-3.5">
              <Code2 size={15} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">3. Documentation & Usage</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelCls}>Overview Summary *</label>
                <textarea required rows={2} value={entry.summary ?? ""} onChange={(e) => set({ summary: e.target.value })} className={`${inputCls} resize-none`} placeholder="Concise 1-2 sentence description of what this AI resource provides..." />
              </div>

              <div>
                <label className={labelCls}>Official Documentation / Repository URL</label>
                <input type="url" value={entry.url ?? ""} onChange={(e) => set({ url: e.target.value })} className={inputCls} placeholder="https://github.com/..." />
              </div>

              <div>
                <label className={labelCls}>Quickstart Usage Code</label>
                <textarea rows={3} value={entry.usage ?? ""} onChange={(e) => set({ usage: e.target.value })} className={`${inputCls} font-mono resize-none text-xs`} placeholder="# Code snippet or API request..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Key Benchmarks</label>
                  <input type="text" value={entry.benchmarks ?? ""} onChange={(e) => set({ benchmarks: e.target.value })} className={inputCls} placeholder="e.g. MMLU: 88.5%, HumanEval: 91%" />
                </div>
                <div>
                  <label className={labelCls}>Known Limitations</label>
                  <input type="text" value={entry.limitations ?? ""} onChange={(e) => set({ limitations: e.target.value })} className={inputCls} placeholder="e.g. High VRAM requirement (48GB+)" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Citations & Spotlight */}
          <div className="rounded-2xl border border-neutral-200 dark:border-white/10 p-5 bg-[#fafafa] dark:bg-white/[0.02]">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <BookOpen size={15} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">4. Citations & Discovery</h3>
              </div>
              <button 
                type="button" 
                onClick={addCitation} 
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-neutral-300 dark:border-white/15 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                <Plus size={11} /> Add Citation
              </button>
            </div>

            {(entry.citations ?? []).length === 0 ? (
              <p className="text-xs text-neutral-500 italic mb-4">No technical citations attached yet.</p>
            ) : (
              <div className="space-y-2 mb-4">
                {(entry.citations ?? []).map((c, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-1.5">
                      <input type="text" value={c.text} onChange={(e) => updateCitation(i, "text", e.target.value)} className={inputCls} placeholder="Paper title / Authors (e.g. Vaswani et al.)" />
                      <input type="url" value={c.url} onChange={(e) => updateCitation(i, "url", e.target.value)} className={inputCls} placeholder="https://arxiv.org/abs/..." />
                    </div>
                    <button type="button" onClick={() => removeCitation(i)} className="mt-1 w-7 h-7 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors shrink-0 cursor-pointer">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Google Material Switch for Spotlight */}
            <div className="pt-3 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 block">Spotlight Recommendation</span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Mark this resource as a featured / recommended asset in search filters</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={!!entry.popular} onChange={(e) => set({ popular: e.target.checked })} className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-[#1a73e8]"></div>
              </label>
            </div>
          </div>

          {/* Backend Progress Message */}
          {showBackendMsg && (
            <div className="p-3.5 rounded-2xl border flex items-center gap-3 text-[13px] bg-blue-500/10 border-blue-500/20 text-[#1a73e8] dark:text-[#8ab4f8] font-medium">
              <Server size={16} className="shrink-0 animate-pulse" />
              <span>Registering resource with the AiVerse catalog...</span>
            </div>
          )}

          {/* ── Google Cloud Bottom Action Bar ── */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-white/10">
            <a 
              href="https://aiverse.dev" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1 text-xs text-[#1a73e8] dark:text-[#8ab4f8] hover:underline"
            >
              <HelpCircle size={13} />
              <span>Registry guidelines</span>
            </a>
            <div className="flex items-center gap-2">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-5 py-2 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={showBackendMsg}
                className={`inline-flex items-center gap-1.5 px-6 py-2 rounded-full text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] text-white shadow-xs transition-all cursor-pointer ${
                  showBackendMsg ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Plus size={14} /> Create Resource
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
