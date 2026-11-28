import React, { useState } from "react";
import type { Entry, EntryRatingSummary } from "../../types";
import { useAuth } from "../AuthContext";
import { EcosystemLogo } from "../EcosystemLogo";
import { 
  Lock, 
  ArrowLeftRight, 
  ChevronDown, 
  Star, 
  Bookmark, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2,
  GitCompare,
  Search,
  ArrowRight,
} from "lucide-react";

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
    { label: "Llama 3.3 vs Mistral", a: "Llama 3.3 70B", b: "Mistral Large 2" },
    { label: "GPT-4o vs Claude 3.5", a: "GPT-4o", b: "Claude 3.5 Sonnet" },
    { label: "PyTorch vs TensorFlow", a: "PyTorch", b: "TensorFlow" },
    { label: "DeepSeek R1 vs Qwen 2.5", a: "DeepSeek R1", b: "Qwen 2.5 Coder 32B" },
  ];

  const ratingA = ratingSummaries[entryA?.name]?.average || 0;
  const countA = ratingSummaries[entryA?.name]?.count || 0;
  const ratingB = ratingSummaries[entryB?.name]?.average || 0;
  const countB = ratingSummaries[entryB?.name]?.count || 0;

  const isPermissiveLicense = (lic: string) => {
    const l = lic.toLowerCase();
    return l.includes("mit") || l.includes("apache") || l.includes("bsd") || l.includes("public domain") || l.includes("cc0");
  };

  const renderStars = (rating: number) => {
    const rounded = Math.round(rating);
    return (
      <div className="flex items-center gap-0.5 text-amber-500">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={11}
            className={s <= rounded ? "fill-current text-amber-500" : "text-neutral-300 dark:text-neutral-700"}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      id="arena"
      className="relative rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] text-neutral-900 dark:text-neutral-100 transition-all scroll-mt-24 overflow-hidden shadow-xs"
    >
      {/* ── Lock overlay if not logged in ── */}
      {!user && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md bg-white/95 dark:bg-[#090a0e]/95 text-neutral-900 dark:text-white rounded-2xl transition-colors">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3.5 shadow-sm bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Lock size={22} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1.5 tracking-tight text-neutral-900 dark:text-white">
            Model Comparison Arena
          </h3>
          <p className="text-xs sm:text-sm mb-6 max-w-md leading-relaxed mx-auto text-neutral-600 dark:text-neutral-300">
            Sign in to compare detailed architectures, benchmark scores, licensing terms, and operational trade-offs side-by-side.
          </p>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openAuthModal("signin")}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => openAuthModal("signup")}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm shadow-indigo-500/20 cursor-pointer"
            >
              Create Free Account
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

      {/* Main content */}
      <div 
        className={`p-5 sm:p-7 ${!user ? "filter blur-xs pointer-events-none select-none" : ""}`}
        {...(!user ? { inert: true } : {})}
      >
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-neutral-200/70 dark:border-white/[0.06]">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <GitCompare size={17} />
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Control Plane Evaluation
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Side-by-Side Model Comparator
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Compare architectural specifications, licensing compliance, and benchmark metrics across models
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-full md:self-end">
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mr-1 shrink-0">
              Presets:
            </span>
            {presets.map((match, idx) => (
              <button
                key={idx}
                onClick={() => { 
                  const targetA = entries.find(e => e.name.toLowerCase() === match.a.toLowerCase())?.name || match.a;
                  const targetB = entries.find(e => e.name.toLowerCase() === match.b.toLowerCase())?.name || match.b;
                  setCompareToolA(targetA); 
                  setCompareToolB(targetB); 
                }}
                className="px-3 py-1 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-[#121319] text-neutral-600 dark:text-neutral-300 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              >
                {match.label}
              </button>
            ))}
          </div>
        </div>

        {/* Competitor Selectors & Swap Control */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center mb-6 text-left relative z-30">
          {/* Selector A */}
          <div className="flex flex-col gap-1.5 md:col-span-5 relative">
            <label className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Primary Model (A)
            </label>
            <button
              type="button"
              onClick={() => { setOpenA(!openA); setOpenB(false); }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-xs font-semibold text-neutral-900 dark:text-white text-left focus:outline-none focus:border-indigo-500 flex items-center justify-between transition-colors shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                {entryA && <EcosystemLogo name={entryA.org || entryA.name} website={entryA.url} size={20} />}
                <span className="truncate">{entryA?.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400">
                  {entryA?.type}
                </span>
              </div>
              <ChevronDown size={14} className={`shrink-0 ml-2 text-neutral-400 transition-transform duration-200 ${openA ? "rotate-180" : ""}`} />
            </button>

            {openA && (
              <div className="absolute left-0 right-0 top-full mt-1.5 p-2 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#0d0e12] shadow-2xl flex flex-col gap-1.5 max-h-72 z-40">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search model or framework..."
                    value={searchA}
                    onChange={(e) => setSearchA(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-neutral-200 dark:border-white/[0.1] bg-neutral-50 dark:bg-[#121319] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto max-h-48 divide-y divide-neutral-200/60 dark:divide-white/[0.05] no-scrollbar">
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
                        className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex justify-between items-center cursor-pointer ${
                          compareToolA === e.name
                            ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 font-bold"
                            : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate mr-2">
                          <EcosystemLogo name={e.org || e.name} website={e.url} size={15} />
                          <span className="truncate">{e.name}</span>
                        </div>
                        <span className="text-[9.5px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400 shrink-0">
                          {e.type}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center md:col-span-1 pt-4 md:pt-6">
            <button
              onClick={() => {
                const temp = compareToolA;
                setCompareToolA(compareToolB);
                setCompareToolB(temp);
              }}
              className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] hover:bg-indigo-50 dark:hover:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              title="Swap Models"
            >
              <ArrowLeftRight size={15} />
            </button>
          </div>

          {/* Selector B */}
          <div className="flex flex-col gap-1.5 md:col-span-5 relative">
            <label className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Comparison Model (B)
            </label>
            <button
              type="button"
              onClick={() => { setOpenB(!openB); setOpenA(false); }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-xs font-semibold text-neutral-900 dark:text-white text-left focus:outline-none focus:border-indigo-500 flex items-center justify-between transition-colors shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                {entryB && <EcosystemLogo name={entryB.org || entryB.name} website={entryB.url} size={20} />}
                <span className="truncate">{entryB?.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400">
                  {entryB?.type}
                </span>
              </div>
              <ChevronDown size={14} className={`shrink-0 ml-2 text-neutral-400 transition-transform duration-200 ${openB ? "rotate-180" : ""}`} />
            </button>

            {openB && (
              <div className="absolute left-0 right-0 top-full mt-1.5 p-2 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#0d0e12] shadow-2xl flex flex-col gap-1.5 max-h-72 z-40">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search model or framework..."
                    value={searchB}
                    onChange={(e) => setSearchB(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-neutral-200 dark:border-white/[0.1] bg-neutral-50 dark:bg-[#121319] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto max-h-48 divide-y divide-neutral-200/60 dark:divide-white/[0.05] no-scrollbar">
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
                        className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex justify-between items-center cursor-pointer ${
                          compareToolB === e.name
                            ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 font-bold"
                            : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate mr-2">
                          <EcosystemLogo name={e.org || e.name} website={e.url} size={15} />
                          <span className="truncate">{e.name}</span>
                        </div>
                        <span className="text-[9.5px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400 shrink-0">
                          {e.type}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Competitor Summary Cards Header */}
        {entryA && entryB && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
            {/* Card A */}
            <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/80 dark:bg-[#121319] flex items-center justify-between gap-4 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <EcosystemLogo name={entryA.org || entryA.name} website={entryA.url} size={36} />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 truncate">
                    <span className="truncate">{entryA.name}</span>
                    {bookmarks.includes(entryA.name) && (
                      <Bookmark size={12} className="text-amber-500 fill-current shrink-0" />
                    )}
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">by {entryA.org}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] text-neutral-600 dark:text-neutral-300 block mb-1 w-fit ml-auto">
                  {entryA.type}
                </span>
                {ratingA > 0 ? (
                  <div className="flex flex-col items-end gap-0.5">
                    {renderStars(ratingA)}
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400">{ratingA.toFixed(1)} ★ ({countA})</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">No reviews</span>
                )}
              </div>
            </div>

            {/* Card B */}
            <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/80 dark:bg-[#121319] flex items-center justify-between gap-4 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <EcosystemLogo name={entryB.org || entryB.name} website={entryB.url} size={36} />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 truncate">
                    <span className="truncate">{entryB.name}</span>
                    {bookmarks.includes(entryB.name) && (
                      <Bookmark size={12} className="text-amber-500 fill-current shrink-0" />
                    )}
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">by {entryB.org}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] text-neutral-600 dark:text-neutral-300 block mb-1 w-fit ml-auto">
                  {entryB.type}
                </span>
                {ratingB > 0 ? (
                  <div className="flex flex-col items-end gap-0.5">
                    {renderStars(ratingB)}
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400">{ratingB.toFixed(1)} ★ ({countB})</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">No reviews</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Comparison Matrix */}
        {entryA && entryB && (
          <div className="border border-neutral-200/80 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xs bg-white dark:bg-[#0c0d11]">
            {[
              { label: "Developer Org", a: entryA.org, b: entryB.org },
              { label: "Stack Category", a: entryA.type, b: entryB.type, badge: true },
              { label: "Primary Task", a: entryA.task, b: entryB.task },
              { 
                label: "Rating Metrics", 
                a: ratingA > 0 ? `${ratingA.toFixed(1)} ★ (${countA} reviews)` : "No reviews", 
                b: ratingB > 0 ? `${ratingB.toFixed(1)} ★ (${countB} reviews)` : "No reviews",
                ratingAdv: ratingA !== ratingB 
              },
              { label: "Year Released", a: entryA.year.toString(), b: entryB.year.toString() },
              { 
                label: "License & Terms", 
                a: entryA.license, 
                b: entryB.license,
                shield: true
              },
              { label: "Parameter Count", a: entryA.size, b: entryB.size },
              { label: "Key Benchmarks", a: entryA.benchmarks || "N/A", b: entryB.benchmarks || "N/A", full: true },
              { label: "Known Limitations", a: entryA.limitations || "None reported", b: entryB.limitations || "None reported", full: true, warning: true },
              { label: "Architecture", a: entryA.architecture, b: entryB.architecture },
              { label: "Technical Summary", a: (entryA.description || entryA.summary), b: (entryB.description || entryB.summary), full: true },
            ].map((row, i) => {
              const differs = row.a !== row.b;
              return (
                <div
                  key={i}
                  className={`grid grid-cols-1 md:grid-cols-5 border-b border-neutral-200/70 dark:border-white/[0.06] last:border-b-0 text-xs leading-relaxed transition-colors ${
                    differs && !row.full ? "bg-indigo-50/30 dark:bg-indigo-500/[0.03]" : ""
                  }`}
                >
                  {/* Row Label */}
                  <div className="p-3 md:pl-4 md:col-span-1 font-semibold border-b md:border-b-0 md:border-r border-neutral-200/70 dark:border-white/[0.06] flex items-center text-left text-[11px] bg-neutral-50 dark:bg-[#121319] text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      {row.warning && <AlertTriangle size={12} className="text-amber-500 shrink-0" />}
                      {row.shield && <ShieldCheck size={12} className="text-indigo-600 dark:text-indigo-400 shrink-0" />}
                      {row.label}
                    </span>
                  </div>

                  {/* Competitor Values */}
                  {[row.a, row.b].map((val, vi) => {
                    const isCompetitorA = vi === 0;
                    
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
                        className={`p-3 md:col-span-2 ${vi === 0 ? "border-b md:border-b-0 md:border-r border-neutral-200/70 dark:border-white/[0.06]" : ""} text-neutral-900 dark:text-neutral-100 flex items-center justify-between gap-2`}
                      >
                        <div className="flex items-start sm:items-center gap-2 text-left">
                          <span className="md:hidden text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 shrink-0 pt-0.5 sm:pt-0">
                            {isCompetitorA ? entryA.name : entryB.name}:
                          </span>
                          {row.badge ? (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-[#121319] text-neutral-800 dark:text-neutral-200">
                              {val}
                            </span>
                          ) : (
                            <span className={row.full ? "font-normal leading-relaxed text-neutral-600 dark:text-neutral-300" : "font-semibold text-neutral-900 dark:text-white"}>
                              {val}
                            </span>
                          )}
                        </div>

                        {/* Control Plane advantage chip */}
                        {hasAdvantage && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                            <CheckCircle2 size={11} /> Adv
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Bottom Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 border-t border-neutral-200/80 dark:border-white/[0.08] text-xs font-semibold text-center bg-neutral-50 dark:bg-[#121319]">
              <div className="hidden md:block md:col-span-1 border-r border-neutral-200/80 dark:border-white/[0.08]" />
              <button
                onClick={() => setSelected(entryA)}
                className="p-3 md:col-span-2 border-b md:border-b-0 md:border-r border-neutral-200/80 dark:border-white/[0.08] text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Inspect {entryA.name} in Catalog</span>
                <ArrowRight size={13} />
              </button>
              <button
                onClick={() => setSelected(entryB)}
                className="p-3 md:col-span-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Inspect {entryB.name} in Catalog</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
