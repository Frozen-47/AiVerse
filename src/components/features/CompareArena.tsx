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
            className={s <= rounded ? "fill-current text-amber-500" : "text-[#dadce0] dark:text-[#3c4043]"}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      id="arena"
      className="relative rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] transition-all scroll-mt-24 overflow-hidden shadow-xs"
    >
      {/* ── Lock overlay if not logged in ── */}
      {!user && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md bg-white/95 dark:bg-[#131314]/95 text-[#202124] dark:text-[#e3e3e3] rounded-2xl transition-colors">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3.5 shadow-sm bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] border border-[#1a73e8]/20">
            <Lock size={22} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1.5 tracking-tight text-[#202124] dark:text-[#e3e3e3]">
            Model Comparison Arena
          </h3>
          <p className="text-xs sm:text-sm mb-6 max-w-md leading-relaxed mx-auto text-[#5f6368] dark:text-[#c4c7c5]">
            Sign in to compare detailed architectures, benchmark scores, licensing terms, and operational trade-offs side-by-side.
          </p>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openAuthModal("signin")}
              className="px-5 py-2.5 rounded-full text-xs font-semibold border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => openAuthModal("signup")}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] transition-colors shadow-xs cursor-pointer"
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#dadce0]/70 dark:border-[#3c4043]/40">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] flex items-center justify-center shrink-0">
                <GitCompare size={17} />
              </div>
              <span className="text-xs font-bold text-[#1a73e8] dark:text-[#a8c7fa] uppercase tracking-wider">
                Google Cloud Model Evaluation
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#202124] dark:text-[#e3e3e3]">
              Side-by-Side Model Comparator
            </h3>
            <p className="text-xs text-[#5f6368] dark:text-[#8e918f] mt-0.5">
              Compare architectural specifications, licensing compliance, and benchmark metrics across models
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 md:self-end">
            <span className="text-[11px] font-semibold text-[#5f6368] dark:text-[#8e918f] mr-1">
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
                className="px-3 py-1 rounded-full text-xs font-medium border border-[#dadce0] dark:border-[#3c4043]/60 bg-[#f8f9fa] dark:bg-[#282a2c]/40 text-[#5f6368] dark:text-[#c4c7c5] hover:border-[#1a73e8] dark:hover:border-[#a8c7fa] hover:text-[#1a73e8] dark:hover:text-[#a8c7fa] transition-colors cursor-pointer"
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
            <label className="text-[11px] font-semibold text-[#5f6368] dark:text-[#8e918f] uppercase tracking-wider">
              Primary Model (A)
            </label>
            <button
              type="button"
              onClick={() => { setOpenA(!openA); setOpenB(false); }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-xs font-semibold text-[#202124] dark:text-[#e3e3e3] text-left focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#a8c7fa] flex items-center justify-between transition-colors shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                {entryA && <EcosystemLogo name={entryA.org || entryA.name} website={entryA.url} size={20} />}
                <span className="truncate">{entryA?.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#f1f3f4] dark:bg-[#282a2c] text-[#5f6368] dark:text-[#8e918f]">
                  {entryA?.type}
                </span>
              </div>
              <ChevronDown size={14} className={`shrink-0 ml-2 text-[#70757a] transition-transform duration-200 ${openA ? "rotate-180" : ""}`} />
            </button>

            {openA && (
              <div className="absolute left-0 right-0 top-full mt-1.5 p-2 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] shadow-xl flex flex-col gap-1.5 max-h-72 z-40">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#70757a]" />
                  <input
                    type="text"
                    placeholder="Search model or framework..."
                    value={searchA}
                    onChange={(e) => setSearchA(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#282a2c]/40 text-xs text-[#202124] dark:text-[#e3e3e3] outline-none"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto max-h-48 divide-y divide-[#dadce0]/50 dark:divide-[#3c4043]/30 no-scrollbar">
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
                            ? "bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] font-bold"
                            : "text-[#202124] dark:text-[#e3e3e3] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c]"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate mr-2">
                          <EcosystemLogo name={e.org || e.name} website={e.url} size={15} />
                          <span className="truncate">{e.name}</span>
                        </div>
                        <span className="text-[9.5px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#f1f3f4] dark:bg-[#282a2c] text-[#5f6368] dark:text-[#8e918f] shrink-0">
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
              className="w-10 h-10 rounded-full border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] text-[#1a73e8] dark:text-[#a8c7fa] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              title="Swap Models"
            >
              <ArrowLeftRight size={15} />
            </button>
          </div>

          {/* Selector B */}
          <div className="flex flex-col gap-1.5 md:col-span-5 relative">
            <label className="text-[11px] font-semibold text-[#5f6368] dark:text-[#8e918f] uppercase tracking-wider">
              Comparison Model (B)
            </label>
            <button
              type="button"
              onClick={() => { setOpenB(!openB); setOpenA(false); }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-xs font-semibold text-[#202124] dark:text-[#e3e3e3] text-left focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#a8c7fa] flex items-center justify-between transition-colors shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                {entryB && <EcosystemLogo name={entryB.org || entryB.name} website={entryB.url} size={20} />}
                <span className="truncate">{entryB?.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#f1f3f4] dark:bg-[#282a2c] text-[#5f6368] dark:text-[#8e918f]">
                  {entryB?.type}
                </span>
              </div>
              <ChevronDown size={14} className={`shrink-0 ml-2 text-[#70757a] transition-transform duration-200 ${openB ? "rotate-180" : ""}`} />
            </button>

            {openB && (
              <div className="absolute left-0 right-0 top-full mt-1.5 p-2 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] shadow-xl flex flex-col gap-1.5 max-h-72 z-40">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#70757a]" />
                  <input
                    type="text"
                    placeholder="Search model or framework..."
                    value={searchB}
                    onChange={(e) => setSearchB(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-[#f8f9fa] dark:bg-[#282a2c]/40 text-xs text-[#202124] dark:text-[#e3e3e3] outline-none"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto max-h-48 divide-y divide-[#dadce0]/50 dark:divide-[#3c4043]/30 no-scrollbar">
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
                            ? "bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] font-bold"
                            : "text-[#202124] dark:text-[#e3e3e3] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c]"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate mr-2">
                          <EcosystemLogo name={e.org || e.name} website={e.url} size={15} />
                          <span className="truncate">{e.name}</span>
                        </div>
                        <span className="text-[9.5px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#f1f3f4] dark:bg-[#282a2c] text-[#5f6368] dark:text-[#8e918f] shrink-0">
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
            <div className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-[#f8f9fa] dark:bg-[#131314] flex items-center justify-between gap-4 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <EcosystemLogo name={entryA.org || entryA.name} website={entryA.url} size={36} />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#202124] dark:text-[#e3e3e3] flex items-center gap-1.5 truncate">
                    <span className="truncate">{entryA.name}</span>
                    {bookmarks.includes(entryA.name) && (
                      <Bookmark size={12} className="text-amber-500 fill-current shrink-0" />
                    )}
                  </h4>
                  <p className="text-[11px] text-[#5f6368] dark:text-[#8e918f] truncate">by {entryA.org}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#c4c7c5] block mb-1 w-fit ml-auto">
                  {entryA.type}
                </span>
                {ratingA > 0 ? (
                  <div className="flex flex-col items-end gap-0.5">
                    {renderStars(ratingA)}
                    <span className="text-[10px] text-[#70757a] dark:text-[#8e918f]">{ratingA.toFixed(1)} ★ ({countA})</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-[#70757a] dark:text-[#8e918f]">No reviews</span>
                )}
              </div>
            </div>

            {/* Card B */}
            <div className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-[#f8f9fa] dark:bg-[#131314] flex items-center justify-between gap-4 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <EcosystemLogo name={entryB.org || entryB.name} website={entryB.url} size={36} />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#202124] dark:text-[#e3e3e3] flex items-center gap-1.5 truncate">
                    <span className="truncate">{entryB.name}</span>
                    {bookmarks.includes(entryB.name) && (
                      <Bookmark size={12} className="text-amber-500 fill-current shrink-0" />
                    )}
                  </h4>
                  <p className="text-[11px] text-[#5f6368] dark:text-[#8e918f] truncate">by {entryB.org}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#c4c7c5] block mb-1 w-fit ml-auto">
                  {entryB.type}
                </span>
                {ratingB > 0 ? (
                  <div className="flex flex-col items-end gap-0.5">
                    {renderStars(ratingB)}
                    <span className="text-[10px] text-[#70757a] dark:text-[#8e918f]">{ratingB.toFixed(1)} ★ ({countB})</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-[#70757a] dark:text-[#8e918f]">No reviews</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Google Comparison Matrix */}
        {entryA && entryB && (
          <div className="border border-[#dadce0] dark:border-[#3c4043]/60 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-[#1e1f20]">
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
              { label: "Technical Summary", a: entryA.summary, b: entryB.summary, full: true },
            ].map((row, i) => {
              const differs = row.a !== row.b;
              return (
                <div
                  key={i}
                  className={`grid grid-cols-1 md:grid-cols-5 border-b border-[#dadce0]/70 dark:border-[#3c4043]/40 last:border-b-0 text-xs leading-relaxed transition-colors ${
                    differs && !row.full ? "bg-[#f8f9fa]/50 dark:bg-[#282a2c]/20" : ""
                  }`}
                >
                  {/* Row Label */}
                  <div className="p-3 md:pl-4 md:col-span-1 font-semibold border-b md:border-b-0 md:border-r border-[#dadce0]/70 dark:border-[#3c4043]/40 flex items-center text-left text-[11px] bg-[#f8f9fa] dark:bg-[#282a2c] text-[#5f6368] dark:text-[#8e918f]">
                    <span className="flex items-center gap-1.5">
                      {row.warning && <AlertTriangle size={12} className="text-amber-500 shrink-0" />}
                      {row.shield && <ShieldCheck size={12} className="text-[#1a73e8] dark:text-[#a8c7fa] shrink-0" />}
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
                        className={`p-3 md:col-span-2 ${vi === 0 ? "border-b md:border-b-0 md:border-r border-[#dadce0]/70 dark:border-[#3c4043]/40" : ""} text-[#202124] dark:text-[#e3e3e3] flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-2 text-left">
                          {row.badge ? (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#dadce0] dark:border-[#3c4043]/60 bg-[#f8f9fa] dark:bg-[#282a2c] text-[#202124] dark:text-[#e3e3e3]">
                              {val}
                            </span>
                          ) : (
                            <span className={row.full ? "font-normal leading-relaxed text-[#5f6368] dark:text-[#c4c7c5]" : "font-semibold text-[#202124] dark:text-[#e3e3e3]"}>
                              {val}
                            </span>
                          )}
                        </div>

                        {/* Google Blue advantage chip */}
                        {hasAdvantage && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] border border-[#1a73e8]/20">
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
            <div className="grid grid-cols-1 md:grid-cols-5 border-t border-[#dadce0] dark:border-[#3c4043]/60 text-xs font-semibold text-center bg-[#f8f9fa] dark:bg-[#282a2c]/60">
              <div className="hidden md:block md:col-span-1 border-r border-[#dadce0] dark:border-[#3c4043]/60" />
              <button
                onClick={() => setSelected(entryA)}
                className="p-3 md:col-span-2 border-b md:border-b-0 md:border-r border-[#dadce0] dark:border-[#3c4043]/60 text-[#1a73e8] dark:text-[#a8c7fa] hover:bg-[#1a73e8]/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Inspect {entryA.name} in Model Garden</span>
                <ArrowRight size={13} />
              </button>
              <button
                onClick={() => setSelected(entryB)}
                className="p-3 md:col-span-2 text-[#1a73e8] dark:text-[#a8c7fa] hover:bg-[#1a73e8]/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Inspect {entryB.name} in Model Garden</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
