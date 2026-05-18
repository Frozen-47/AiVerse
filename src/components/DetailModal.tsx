import React, { useState, useEffect } from "react";
import { X, Star, ExternalLink, Copy, Check, Lock, Link2, Bookmark } from "lucide-react";
import { shareUrlForEntry } from "../lib/entryUrl";
import { useUser, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { useTokens, typeBadge, taskBadge, TYPE_GLYPH, typeIcon } from "../lib/theme";
import type { Entry, EntryRatingSummary } from "../types";
import { EntryFeedback } from "./EntryFeedback";

interface DetailModalProps {
  entry: Entry;
  onClose: () => void;
  onRatingSummaryChange?: (entryName: string, summary: EntryRatingSummary) => void;
  relatedEntries?: Entry[];
  onSelectRelated?: (entry: Entry) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  entry,
  onClose,
  onRatingSummaryChange,
  relatedEntries = [],
  onSelectRelated,
  isBookmarked,
  onToggleBookmark,
}) => {
  const t = useTokens();
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.usage ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(shareUrlForEntry(entry.name));
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl ${t.modal} ${t.border}`}>

        <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
          <button
            onClick={handleShareLink}
            title="Copy share link"
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${t.surface} ${t.border} ${linkCopied ? "text-emerald-400" : t.textMuted}`}
          >
            {linkCopied ? <Check size={13} /> : <Link2 size={13} />}
          </button>
          {onToggleBookmark && (
            <button
              onClick={onToggleBookmark}
              title={isBookmarked ? "Remove bookmark" : "Bookmark"}
              className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${t.surface} ${t.border} ${isBookmarked ? "text-amber-400 border-amber-500/30" : t.textMuted}`}
            >
              <Bookmark size={13} className={isBookmarked ? "fill-current" : ""} />
            </button>
          )}
          <button
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${t.surface} ${t.border} ${t.textMuted} hover:${t.textSecondary}`}
          >
            <X size={13} />
          </button>
        </div>

        {/* Header (fixed) */}
        <div className={`shrink-0 px-7 pt-7 pb-6 border-b ${t.border}`}>
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 ${typeIcon(entry.type, t)}`}>
              {TYPE_GLYPH[entry.type] ?? "◆"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className={`text-xl font-black tracking-tight ${t.textPrimary}`}>{entry.name}</h2>
                {entry.popular && (
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${t.popular}`}>
                    <Star size={8} className="fill-current" /> Popular
                  </span>
                )}
              </div>
              <p className={`text-[12px] ${t.textMuted}`}>{entry.org} · {entry.year}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg border ${typeBadge(entry.type, t)}`}>
              {entry.type}
            </span>
            <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg border ${taskBadge(entry.task, t)}`}>
              {entry.task}
            </span>
            <span className={`text-[10px] px-2.5 py-1 rounded-lg border ${t.surface} ${t.border} ${t.textMuted}`}>
              {entry.license}
            </span>
          </div>

          <p className={`text-[13.5px] leading-relaxed ${t.textSecondary}`}>{entry.summary}</p>
        </div>

        {/* Scroll: entry details first, then ratings & comments at the bottom */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <div className="relative">
            {!user && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-black/70 min-h-[280px]">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/30">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Unlock Full Details</h3>
              <p className="text-[13px] text-gray-300 mb-6 max-w-[280px] leading-relaxed">
                Sign in to view architecture, benchmarks, code usage, and direct resources for this AI model.
              </p>
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all bg-white/10 text-white hover:bg-white/20 border border-white/10">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-md shadow-cyan-500/20">
                    Create Account
                  </button>
                </SignUpButton>
              </div>
            </div>
          )}

            <div
              className={`px-7 py-6 space-y-6 ${
                !user ? "opacity-25 pointer-events-none select-none" : ""
              }`}
            >

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Organization", value: entry.org },
              { label: "Model Size",   value: entry.size },
            ].map(({ label, value }) => (
              <div key={label} className={`rounded-2xl border px-4 py-3 ${t.surface2} ${t.border}`}>
                <p className={`text-[10px] uppercase tracking-widest mb-1 ${t.textMuted}`}>{label}</p>
                <p className={`text-[13px] font-semibold word-break break-all ${t.textPrimary}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Architecture */}
          <div>
            <p className={`text-[10px] uppercase tracking-widest mb-2 ${t.textMuted}`}>Architecture</p>
            <p className={`text-[13px] leading-relaxed ${t.textSecondary}`}>{entry.architecture}</p>
          </div>

          {/* Code */}
          {entry.usage && (
            <div>
              <p className={`text-[10px] uppercase tracking-widest mb-2 ${t.textMuted}`}>Example Usage</p>
              <div className={`rounded-2xl overflow-hidden border ${t.border}`}>
                {/* Toolbar */}
                <div className={`flex items-center justify-between px-4 py-2.5 border-b ${t.border} ${t.surface}`}>
                  <span className={`text-[10px] uppercase tracking-widest font-semibold ${t.textMuted}`}>Python</span>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <button
                      onClick={handleCopy}
                      title="Copy code"
                      className={`
                        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium
                        transition-all duration-150
                        ${copied
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : `${t.surface} ${t.border} ${t.textMuted} hover:${t.textSecondary}`
                        }
                      `}
                    >
                      {copied ? <Check size={11} /> : <Copy size={11} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
                {/* Code body — white bg in light theme, dark in amoled (via t.code token) */}
                <pre className={`px-5 py-4 text-[12px] font-mono overflow-x-auto leading-relaxed ${t.code}`}>
                  {entry.usage}
                </pre>
              </div>
            </div>
          )}

          {/* Benchmarks */}
          <div>
            <p className={`text-[10px] uppercase tracking-widest mb-2 ${t.textMuted}`}>Benchmarks</p>
            <p className={`text-[13px] leading-relaxed ${t.textSecondary}`}>{entry.benchmarks}</p>
          </div>

          {/* Limitations */}
          <div>
            <p className={`text-[10px] uppercase tracking-widest mb-2 ${t.textMuted}`}>Limitations</p>
            <div className="flex flex-wrap gap-2">
              {entry.limitations.split(",").map((l, i) => (
                <span key={i} className={`text-[11px] px-3 py-1 rounded-xl border ${t.limitTag}`}>
                  ⚠ {l.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* URL */}
          {entry.url && (
            <div>
              <p className={`text-[10px] uppercase tracking-widest mb-2 ${t.textMuted}`}>Official Resource</p>
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-[12px] font-medium px-3 py-2 rounded-xl border transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textAccent}`}
              >
                <ExternalLink size={12} />
                {entry.url}
              </a>
            </div>
          )}

          {relatedEntries.length > 0 && onSelectRelated && (
            <div>
              <p className={`text-[10px] uppercase tracking-widest mb-2 ${t.textMuted}`}>Related entries</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {relatedEntries.map((related) => (
                  <button
                    key={related.name}
                    type="button"
                    onClick={() => onSelectRelated(related)}
                    className={`text-left rounded-xl border px-4 py-3 transition-all ${t.surface} ${t.border} hover:border-cyan-500/30`}
                  >
                    <p className={`text-[13px] font-semibold ${t.textPrimary}`}>{related.name}</p>
                    <p className={`text-[11px] mt-0.5 ${t.textMuted}`}>{related.type} · {related.task}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Citations */}
          {entry.citations.length > 0 && (
            <div>
              <p className={`text-[10px] uppercase tracking-widest mb-2 ${t.textMuted}`}>Citations</p>
              <div className="space-y-2">
                {entry.citations.map((c, i) => (
                  <a
                    key={i}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all group ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textAccent}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 shrink-0" />
                    <span className="flex-1 text-[12px]">{c.text}</span>
                    <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
            </div>
          </div>

          <div className={`px-7 pb-7 border-t ${t.border}`}>
            <EntryFeedback
              entryName={entry.name}
              onRatingSummaryChange={onRatingSummaryChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};