import React from "react";
import { useTokens } from "../../lib/theme";
import type { Entry } from "../../types";
import { useAuth } from "../AuthContext";
import { Lock } from "lucide-react";

interface CompareArenaProps {
  entries: Entry[];
  resolvedTheme: string;
  compareToolA: string;
  setCompareToolA: (t: string) => void;
  compareToolB: string;
  setCompareToolB: (t: string) => void;
  setSelected: (entry: Entry | null) => void;
}

export const CompareArena: React.FC<CompareArenaProps> = ({
  entries,
  resolvedTheme,
  compareToolA,
  setCompareToolA,
  compareToolB,
  setCompareToolB,
  setSelected,
}) => {
  const t = useTokens();
  const { user, openAuthModal } = useAuth();

  const entryA = entries.find((e) => e.name === compareToolA);
  const entryB = entries.find((e) => e.name === compareToolB);

  const badgePill = `text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full border ${
    resolvedTheme === "amoled"
      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
      : "bg-cyan-55 border-cyan-200 text-cyan-700"
  }`;

  const presets = [
    { label: "GPT-4o ⚔️ Claude 3.5", a: "GPT-4o", b: "Claude 3.5 Sonnet" },
    { label: "Llama 3 ⚔️ Mistral 7B", a: "Llama 3 (70B)", b: "Mistral 7B" },
    { label: "PyTorch ⚔️ TensorFlow", a: "PyTorch", b: "TensorFlow" },
  ];

  return (
    <div
      id="arena"
      className={`relative p-6 sm:p-8 rounded-[28px] border backdrop-blur-md transition-all duration-300 scroll-mt-24 overflow-hidden ${
        resolvedTheme === "amoled"
          ? "bg-black border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)]"
          : "bg-white border-slate-200/50 shadow-md shadow-slate-100"
      }`}
    >
      {/* Lock overlay if not logged in */}
      {!user && (
        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[6px] transition-colors duration-200 ${
          resolvedTheme === "light" ? "bg-white/85" : "bg-black/85"
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/35 animate-bounce-slow">
            <Lock size={24} className="text-white" />
          </div>
          <h3 className={`text-xl font-bold mb-2 tracking-tight ${t.textPrimary}`}>Unlock AI Arena</h3>
          <p className={`text-[13px] mb-6 max-w-95 leading-relaxed mx-auto ${t.textSecondary}`}>
            Sign in to run real-time side-by-side technical comparisons across different AI models, frameworks, datasets, and serving tools.
          </p>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openAuthModal("signin")}
              className={`${t.btnSecondary} px-5 py-2.5 rounded-xl font-medium text-sm transition-all border cursor-pointer`}
            >
              Login
            </button>
            <button 
              onClick={() => openAuthModal("signup")}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>
      )}

      {/* Main content which is blurred/inert if not logged in */}
      <div 
        className={!user ? "filter blur-xs pointer-events-none select-none" : ""}
        {...(!user ? { inert: true } : {})}
      >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className={badgePill}>AI Arena</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <h3 className={`text-xl font-bold tracking-tight mb-1.5 ${t.textPrimary}`}>
            Side-by-Side Spec Table
          </h3>
          <p className={`text-[13px] leading-relaxed max-w-xl font-light ${t.textSecondary}`}>
            Run instant technical spec head-to-heads across any models, MLOps platforms, datasets, or libraries in the registry.
          </p>
        </div>

        {/* Preset matchups */}
        <div className="flex flex-wrap items-center gap-2 md:self-end">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${t.textMuted}`}>Matchups:</span>
          {presets.map((match, idx) => (
            <button
              key={idx}
              onClick={() => { setCompareToolA(match.a); setCompareToolB(match.b); }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                resolvedTheme === "amoled"
                  ? "bg-cyan-500/5 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/15"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {match.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-5 mb-6 text-left">
        <div className="hidden md:block md:col-span-1" />
        <div className="flex flex-col gap-1.5 md:col-span-2 md:pr-4 mb-4 md:mb-0">
          <label className={`text-[10px] font-extrabold uppercase tracking-widest ${t.textMuted}`}>Competitor A</label>
          <select
            value={compareToolA}
            onChange={(e) => setCompareToolA(e.target.value)}
            className={`w-full p-3.5 rounded-xl border text-[13px] font-bold focus:outline-none focus:border-cyan-500 transition-all ${
              resolvedTheme === "amoled"
                ? "bg-black border-cyan-500/20 text-cyan-100"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            {entries.map((e) => (
              <option key={e.name} value={e.name}>[{e.type.toUpperCase()}] {e.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2 md:pl-4">
          <label className={`text-[10px] font-extrabold uppercase tracking-widest ${t.textMuted}`}>Competitor B</label>
          <select
            value={compareToolB}
            onChange={(e) => setCompareToolB(e.target.value)}
            className={`w-full p-3.5 rounded-xl border text-[13px] font-bold focus:outline-none focus:border-cyan-500 transition-all ${
              resolvedTheme === "amoled"
                ? "bg-black border-cyan-500/20 text-cyan-100"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            {entries.map((e) => (
              <option key={e.name} value={e.name}>[{e.type.toUpperCase()}] {e.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Spec table */}
      {entryA && entryB && (
        <div className={`border rounded-2xl overflow-hidden ${resolvedTheme === "amoled" ? "border-cyan-500/10" : "border-slate-200"}`}>
          {[
            { label: "Developer",            a: entryA.org,          b: entryB.org },
            { label: "Category",             a: entryA.type,         b: entryB.type,         badge: true },
            { label: "Primary Task",         a: entryA.task,         b: entryB.task },
            { label: "Year Released",        a: entryA.year,         b: entryB.year },
            { label: "Licensing",            a: entryA.license,      b: entryB.license },
            { label: "Scope Size",           a: entryA.size,         b: entryB.size },
            { label: "Architecture Overview",a: entryA.architecture, b: entryB.architecture },
            { label: "Technical Summary",    a: entryA.summary,      b: entryB.summary,      full: true },
          ].map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-5 border-b last:border-b-0 text-[12px] leading-relaxed transition-colors ${
                resolvedTheme === "amoled"
                  ? "border-white/4 hover:bg-white/1"
                  : "border-slate-200 hover:bg-slate-50/50"
              }`}
            >
              <div
                className={`p-3 md:pl-5 md:col-span-1 font-bold border-b md:border-b-0 md:border-r flex items-center text-left uppercase tracking-wider text-[10px] ${
                  resolvedTheme === "amoled"
                    ? "bg-white/1 border-white/4 text-cyan-400"
                    : "bg-slate-50/80 border-slate-200 text-slate-600"
                }`}
              >
                {row.label}
              </div>
              {[row.a, row.b].map((val, vi) => (
                <div
                  key={vi}
                  className={`p-3.5 md:col-span-2 ${vi === 0 ? "border-b md:border-b-0 md:border-r" : ""} ${
                    resolvedTheme === "amoled"
                      ? "border-white/4"
                      : "border-slate-200"
                  } ${t.textSecondary} flex items-center`}
                >
                  {(row as any).badge ? (
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border ${
                        resolvedTheme === "amoled"
                          ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                          : "bg-cyan-50 border-cyan-200 text-cyan-700"
                      }`}
                    >
                      {val}
                    </span>
                  ) : (
                    <span className={(row as any).full ? "font-light" : "font-semibold"}>{val}</span>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Action row */}
          <div
            className={`grid grid-cols-1 md:grid-cols-5 border-t text-[11px] leading-relaxed uppercase tracking-wider text-center ${
              resolvedTheme === "amoled" ? "border-white/4 bg-white/1" : "border-slate-200 bg-slate-50/50"
            }`}
          >
            <div className={`hidden md:block md:col-span-1 border-r ${resolvedTheme === "amoled" ? "border-white/4" : "border-slate-200"}`} />
            <button
              onClick={() => setSelected(entryA)}
              className={`p-3 md:col-span-2 border-b md:border-b-0 md:border-r hover:bg-cyan-500/5 transition-colors cursor-pointer text-cyan-500 font-bold ${
                resolvedTheme === "amoled" ? "border-white/4" : "border-slate-200"
              }`}
            >
              Launch {entryA.name} Spec Details
            </button>
            <button
              onClick={() => setSelected(entryB)}
              className="p-3 md:col-span-2 hover:bg-cyan-500/5 transition-colors cursor-pointer text-cyan-500 font-bold"
            >
              Launch {entryB.name} Spec Details
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
