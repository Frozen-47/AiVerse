import React, { useState } from "react";
import { useTokens } from "../../lib/theme";
import type { Entry, EntryRatingSummary } from "../../types";
import { useAuth } from "../AuthContext";
import { Lock, ArrowLeftRight, ChevronDown, Star, Bookmark, Shield, AlertTriangle, Check, Bot, Cpu, Zap, Database, Cloud } from "lucide-react";

interface CompareArenaProps {
  entries: Entry[];
  compareToolA: string;
  setCompareToolA: (t: string) => void;
  compareToolB: string;
  setCompareToolB: (t: string) => void;
  setSelected: (entry: Entry | null) => void;
  ratingSummaries: Record<string, EntryRatingSummary>;
  bookmarks: string[];
}

export const CompareArena: React.FC<CompareArenaProps> = ({
  entries,
  compareToolA,
  setCompareToolA,
  compareToolB,
  setCompareToolB,
  setSelected,
  ratingSummaries,
  bookmarks,
}) => {
  const t = useTokens();
  const { user, openAuthModal } = useAuth();

  // Search and dropdown state for Competitor A
  const [searchA, setSearchA] = useState("");
  const [openA, setOpenA] = useState(false);

  // Search and dropdown state for Competitor B
  const [searchB, setSearchB] = useState("");
  const [openB, setOpenB] = useState(false);

  const entryA = entries.find((e) => e.name === compareToolA) || entries[0];
  const entryB = entries.find((e) => e.name === compareToolB) || entries[1] || entries[0];

  const presets = [
    { label: "GPT-4o vs Claude 3.5", a: "GPT-4o", b: "Claude 3.5 Sonnet" },
    { label: "Llama 3 vs Mistral 7B", a: "Llama 3 (70B)", b: "Mistral 7B" },
    { label: "PyTorch vs TensorFlow", a: "PyTorch", b: "TensorFlow" },
  ];

  const ratingA = ratingSummaries[entryA.name]?.average || 0;
  const countA = ratingSummaries[entryA.name]?.count || 0;
  const ratingB = ratingSummaries[entryB.name]?.average || 0;
  const countB = ratingSummaries[entryB.name]?.count || 0;

  const isPermissiveLicense = (lic: string) => {
    const l = lic.toLowerCase();
    return l.includes("mit") || l.includes("apache") || l.includes("bsd") || l.includes("public domain") || l.includes("cc0");
  };

  const renderStars = (rating: number) => {
    const rounded = Math.round(rating);
    return (
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={12}
            className={s <= rounded ? "fill-current text-amber-400" : "text-slate-200 dark:text-neutral-800"}
          />
        ))}
      </div>
    );
  };

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "AI": return <Bot size={20} className="text-white" />;
      case "Model": return <Cpu size={20} className="text-white" />;
      case "Framework": return <Zap size={20} className="text-white" />;
      case "Dataset": return <Database size={20} className="text-white" />;
      default: return <Cloud size={20} className="text-white" />;
    }
  };

  return (
    <div
      id="arena"
      className="relative p-5 sm:p-6 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] transition-all scroll-mt-24 overflow-hidden shadow-xs"
    >
      {/* Lock overlay if not logged in */}
      {!user && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm bg-white/92 dark:bg-[#131314]/92 text-[#202124] dark:text-[#e3e3e3] border border-[#dadce0] dark:border-[#3c4043]/60 rounded-2xl transition-colors">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-md bg-[#1a73e8] dark:bg-[#a8c7fa] text-white dark:text-[#041e49]">
            <Lock size={20} />
          </div>
          <h3 className="text-lg font-bold mb-1.5 tracking-tight text-[#202124] dark:text-[#e3e3e3]">
            Unlock Comparison Arena
          </h3>
          <p className="text-xs mb-5 max-w-sm leading-relaxed mx-auto text-[#5f6368] dark:text-[#c4c7c5]">
            Sign in to run real-time side-by-side technical comparisons across different AI models, frameworks, datasets, and serving tools.
          </p>
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => openAuthModal("signin")}
              className="px-4 py-2 rounded-full text-xs font-semibold border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => openAuthModal("signup")}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] transition-all shadow-xs cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>
      )}

      {/* Dropdown Backdrop to close on click outside */}
      {(openA || openB) && (
        <div 
          className="fixed inset-0 z-20 cursor-default" 
          onClick={() => { setOpenA(false); setOpenB(false); }}
        />
      )}

      {/* Main content which is blurred/inert if not logged in */}
      <div 
        className={!user ? "filter blur-xs pointer-events-none select-none" : ""}
        {...(!user ? { inert: true } : {})}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-6 pb-5 border-b border-neutral-100 dark:border-white/[0.04]">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Technical Comparison
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Side-by-Side Model Arena
            </h3>
            <p className="text-xs leading-relaxed max-w-xl text-neutral-500 dark:text-neutral-400 mt-1">
              Compare detailed specifications, licensing, limitations, and user rating metrics across different assets in our registry.
            </p>
          </div>

          {/* Preset matchups */}
          <div className="flex flex-wrap items-center gap-2 md:self-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Presets:</span>
            {presets.map((match, idx) => (
              <button
                key={idx}
                onClick={() => { setCompareToolA(match.a); setCompareToolB(match.b); }}
                className="px-2.5 py-1 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04] transition-all cursor-pointer"
              >
                {match.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Autocomplete Selectors + Swap Button */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-end mb-6 text-left relative z-30">
          
          {/* Selector A */}
          <div className="flex flex-col gap-1.5 md:col-span-5 relative">
            <label className={`text-[10px] font-extrabold uppercase tracking-widest ${t.textMuted}`}>Competitor A</label>
            <button
              onClick={() => { setOpenA(!openA); setOpenB(false); }}
              className={`w-full p-3.5 rounded-xl border text-[13px] font-bold text-left focus:outline-none flex items-center justify-between transition-all ${t.input}`}
            >
              <span className="truncate">[{entryA.type.toUpperCase()}] {entryA.name}</span>
              <ChevronDown size={14} className={`transform transition-transform duration-250 shrink-0 ml-2 ${openA ? "rotate-180 text-emerald-400" : t.textMuted}`} />
            </button>

            {openA && (
              <div className={`absolute left-0 right-0 top-full mt-2 p-2 rounded-2xl border shadow-xl flex flex-col gap-2 ${t.modal} backdrop-blur-md max-h-64 z-40`}>
                <input
                  type="text"
                  placeholder="Search competitor..."
                  value={searchA}
                  onChange={(e) => setSearchA(e.target.value)}
                  className={`p-2.5 rounded-lg border text-[12px] font-semibold focus:outline-none transition-all ${t.input}`}
                  autoFocus
                />
                <div className="overflow-y-auto max-h-40 divide-y divide-white/5 scrollbar-thin">
                  {entries
                    .filter(e => e.name.toLowerCase().includes(searchA.toLowerCase()) || e.org.toLowerCase().includes(searchA.toLowerCase()))
                    .map((e) => (
                      <button
                        key={e.name}
                        onClick={() => {
                          setCompareToolA(e.name);
                          setOpenA(false);
                          setSearchA("");
                        }}
                        className={`w-full text-left p-2.5 text-[12px] font-bold transition-all flex justify-between items-center ${t.surfaceHover} ${
                          compareToolA === e.name ? "text-emerald-400 bg-emerald-500/5 font-black" : t.textSecondary
                        }`}
                      >
                        <span className="truncate mr-2">{e.name}</span>
                        <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded border shrink-0 ${t.pillSmall}`}>{e.type}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Animated Swap Column */}
          <div className="flex justify-center md:col-span-1 py-1">
            <button
              onClick={() => {
                const temp = compareToolA;
                setCompareToolA(compareToolB);
                setCompareToolB(temp);
              }}
              className={`p-3.5 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-300 hover:rotate-180 hover:scale-110 active:scale-95 shadow-md ${t.btnSecondary}`}
              title="Swap Competitors"
            >
              <ArrowLeftRight size={15} className="text-emerald-400" />
            </button>
          </div>

          {/* Selector B */}
          <div className="flex flex-col gap-1.5 md:col-span-5 relative">
            <label className={`text-[10px] font-extrabold uppercase tracking-widest ${t.textMuted}`}>Competitor B</label>
            <button
              onClick={() => { setOpenB(!openB); setOpenA(false); }}
              className={`w-full p-3.5 rounded-xl border text-[13px] font-bold text-left focus:outline-none flex items-center justify-between transition-all ${t.input}`}
            >
              <span className="truncate">[{entryB.type.toUpperCase()}] {entryB.name}</span>
              <ChevronDown size={14} className={`transform transition-transform duration-250 shrink-0 ml-2 ${openB ? "rotate-180 text-emerald-400" : t.textMuted}`} />
            </button>

            {openB && (
              <div className={`absolute left-0 right-0 top-full mt-2 p-2 rounded-2xl border shadow-xl flex flex-col gap-2 ${t.modal} backdrop-blur-md max-h-64 z-40`}>
                <input
                  type="text"
                  placeholder="Search competitor..."
                  value={searchB}
                  onChange={(e) => setSearchB(e.target.value)}
                  className={`p-2.5 rounded-lg border text-[12px] font-semibold focus:outline-none transition-all ${t.input}`}
                  autoFocus
                />
                <div className="overflow-y-auto max-h-40 divide-y divide-white/5 scrollbar-thin">
                  {entries
                    .filter(e => e.name.toLowerCase().includes(searchB.toLowerCase()) || e.org.toLowerCase().includes(searchB.toLowerCase()))
                    .map((e) => (
                      <button
                        key={e.name}
                        onClick={() => {
                          setCompareToolB(e.name);
                          setOpenB(false);
                          setSearchB("");
                        }}
                        className={`w-full text-left p-2.5 text-[12px] font-bold transition-all flex justify-between items-center ${t.surfaceHover} ${
                          compareToolB === e.name ? "text-emerald-400 bg-emerald-500/5 font-black" : t.textSecondary
                        }`}
                      >
                        <span className="truncate mr-2">{e.name}</span>
                        <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded border shrink-0 ${t.pillSmall}`}>{e.type}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Competitor Cards Header */}
        {entryA && entryB && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
            {/* Card A */}
            <div className="p-4 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-[#f8f9fa] dark:bg-[#131314] flex items-center justify-between gap-4 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] border border-[#1a73e8]/20 flex items-center justify-center">
                  {renderTypeIcon(entryA.type)}
                </div>
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-1.5 text-[#202124] dark:text-[#e3e3e3]">
                    {entryA.name}
                    {bookmarks.includes(entryA.name) && <Bookmark size={11} className="text-amber-500 fill-current shrink-0" />}
                  </h4>
                  <p className="text-[11px] text-[#5f6368] dark:text-[#8e918f]">by {entryA.org}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#c4c7c5] block mb-1 w-fit ml-auto">
                  {entryA.type}
                </span>
                {ratingA > 0 ? (
                  <div className="flex flex-col items-end gap-0.5">
                    {renderStars(ratingA)}
                    <span className="text-[9px] text-[#70757a] dark:text-[#8e918f]">{ratingA.toFixed(1)} ★ ({countA} revs)</span>
                  </div>
                ) : (
                  <span className="text-[9px] text-[#70757a] dark:text-[#8e918f]">No reviews</span>
                )}
              </div>
            </div>

            {/* Card B */}
            <div className="p-4 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-[#f8f9fa] dark:bg-[#131314] flex items-center justify-between gap-4 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] border border-[#1a73e8]/20 flex items-center justify-center">
                  {renderTypeIcon(entryB.type)}
                </div>
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-1.5 text-[#202124] dark:text-[#e3e3e3]">
                    {entryB.name}
                    {bookmarks.includes(entryB.name) && <Bookmark size={11} className="text-amber-500 fill-current shrink-0" />}
                  </h4>
                  <p className="text-[11px] text-[#5f6368] dark:text-[#8e918f]">by {entryB.org}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#c4c7c5] block mb-1 w-fit ml-auto">
                  {entryB.type}
                </span>
                {ratingB > 0 ? (
                  <div className="flex flex-col items-end gap-0.5">
                    {renderStars(ratingB)}
                    <span className="text-[9px] text-[#70757a] dark:text-[#8e918f]">{ratingB.toFixed(1)} ★ ({countB} revs)</span>
                  </div>
                ) : (
                  <span className="text-[9px] text-[#70757a] dark:text-[#8e918f]">No reviews</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Spec table */}
        {entryA && entryB && (
          <div className="border border-[#dadce0] dark:border-[#3c4043]/60 rounded-2xl overflow-hidden shadow-xs bg-white dark:bg-[#1e1f20]">
            {[
              { label: "Developer",            a: entryA.org,          b: entryB.org },
              { label: "Category",             a: entryA.type,         b: entryB.type,         badge: true },
              { label: "Primary Task",         a: entryA.task,         b: entryB.task },
              { 
                label: "Rating Metrics", 
                a: ratingA > 0 ? `${ratingA.toFixed(1)} ★ (${countA} reviews)` : "No reviews", 
                b: ratingB > 0 ? `${ratingB.toFixed(1)} ★ (${countB} reviews)` : "No reviews",
                ratingAdv: ratingA !== ratingB 
              },
              { label: "Year Released",        a: entryA.year.toString(), b: entryB.year.toString() },
              { 
                label: "Licensing",            
                a: entryA.license,      
                b: entryB.license,
                shield: true
              },
              { label: "Scope Size",           a: entryA.size,         b: entryB.size },
              { label: "Key Benchmarks",       a: entryA.benchmarks || "N/A", b: entryB.benchmarks || "N/A", full: true },
              { label: "Known Limitations",    a: entryA.limitations || "None reported", b: entryB.limitations || "None reported", full: true, warning: true },
              { label: "Architecture Overview",a: entryA.architecture, b: entryB.architecture },
              { label: "Technical Summary",    a: entryA.summary,      b: entryB.summary,      full: true },
            ].map((row, i) => {
              const differs = row.a !== row.b;
              return (
                <div
                  key={i}
                  className={`grid grid-cols-1 md:grid-cols-5 border-b border-[#dadce0] dark:border-[#3c4043]/40 last:border-b-0 text-xs leading-relaxed transition-colors ${
                    differs && !row.full ? "bg-[#f8f9fa]/60 dark:bg-[#282a2c]/20" : ""
                  }`}
                >
                  <div
                    className="p-3 md:pl-4 md:col-span-1 font-bold border-b md:border-b-0 md:border-r border-[#dadce0] dark:border-[#3c4043]/40 flex items-center text-left uppercase tracking-wider text-[10px] bg-[#f1f3f4] dark:bg-[#282a2c] text-[#5f6368] dark:text-[#8e918f]"
                  >
                    <span className="flex items-center gap-1.5">
                      {row.warning && <AlertTriangle size={11} className="text-amber-500 shrink-0" />}
                      {row.shield && <Shield size={11} className="text-emerald-500 shrink-0" />}
                      {row.label}
                    </span>
                  </div>

                  {[row.a, row.b].map((val, vi) => {
                    const isCompetitorA = vi === 0;
                    
                    // Specific highlight flags
                    let hasAdvantage = false;
                    if (row.ratingAdv) {
                      hasAdvantage = isCompetitorA ? (ratingA > ratingB) : (ratingB > ratingA);
                    }
                    if (row.shield) {
                      const compliance = isCompetitorA ? isPermissiveLicense(entryA.license) : isPermissiveLicense(entryB.license);
                      const peerCompliance = isCompetitorA ? isPermissiveLicense(entryB.license) : isPermissiveLicense(entryA.license);
                      if (compliance && !peerCompliance) {
                        hasAdvantage = true;
                      }
                    }

                    return (
                      <div
                        key={vi}
                        className={`p-3 md:col-span-2 ${vi === 0 ? "border-b md:border-b-0 md:border-r border-[#dadce0] dark:border-[#3c4043]/40" : ""} text-[#3c4043] dark:text-[#c4c7c5] flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-2 text-left">
                          {row.badge ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3]">
                              {val}
                            </span>
                          ) : (
                            <span className={row.full ? "font-normal" : "font-semibold text-[#202124] dark:text-[#e3e3e3]"}>{val}</span>
                          )}
                        </div>

                        {/* Show check/advantage badge if highlighted */}
                        {hasAdvantage && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shrink-0 bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400">
                            <Check size={9} /> Adv
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Action row */}
            <div
              className="grid grid-cols-1 md:grid-cols-5 border-t border-[#dadce0] dark:border-[#3c4043]/40 text-xs font-semibold text-center bg-[#f1f3f4] dark:bg-[#282a2c]"
            >
              <div className="hidden md:block md:col-span-1 border-r border-[#dadce0] dark:border-[#3c4043]/40" />
              <button
                onClick={() => setSelected(entryA)}
                className="p-3 md:col-span-2 border-b md:border-b-0 md:border-r border-[#dadce0] dark:border-[#3c4043]/40 text-[#1a73e8] dark:text-[#a8c7fa] hover:bg-[#1a73e8]/10 transition-colors cursor-pointer"
              >
                Inspect {entryA.name} in Model Garden →
              </button>
              <button
                onClick={() => setSelected(entryB)}
                className="p-3 md:col-span-2 text-[#1a73e8] dark:text-[#a8c7fa] hover:bg-[#1a73e8]/10 transition-colors cursor-pointer"
              >
                Inspect {entryB.name} in Model Garden →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
