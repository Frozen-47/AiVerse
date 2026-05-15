import React, { useState } from "react";
import { X, Star, ExternalLink, Copy, Check } from "lucide-react";
import { useTokens, typeBadge, taskBadge, TYPE_GLYPH, typeIcon } from "../lib/theme";
import type { Entry } from "../types";

interface DetailModalProps {
  entry: Entry;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ entry, onClose }) => {
  const t = useTokens();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.usage ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl ${t.modal} ${t.border}`}>

        {/* Close */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full border transition-all ${t.surface} ${t.border} ${t.textMuted} hover:${t.textSecondary}`}
        >
          <X size={13} />
        </button>

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

        {/* Scrollable body (no scrollbar) */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6 no-scrollbar">

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
                <pre className={`px-5 py-4 text-[12px] font-mono overflow-x-auto leading-relaxed no-scrollbar ${t.code}`}>
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
    </div>
  );
};