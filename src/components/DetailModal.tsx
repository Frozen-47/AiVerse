import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  X,
  Star,
  ExternalLink,
  Copy,
  Check,
  Lock,
  Bookmark,
  ChevronDown,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Code2,
  MessageSquare,
  Building2,
  Calendar,
  Layers,
  ShieldCheck,
  Cpu,
  Terminal,
  ArrowRight,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Share2,
} from "lucide-react";
import { shareUrlForEntry } from "../lib/entryUrl";
import { useAuth } from "./AuthContext";
import { useTokens, typeBadge, taskBadge, TYPE_GLYPH, typeIcon } from "../lib/theme";
import type { Entry, EntryRatingSummary } from "../types";
import { EntryFeedback } from "./EntryFeedback";

export interface DetailModalProps {
  entry: Entry;
  onClose: () => void;
  onRatingSummaryChange?: (entryName: string, summary: EntryRatingSummary) => void;
  relatedEntries?: Entry[];
  onSelectRelated?: (entry: Entry) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  compareCandidates?: Entry[];
  onViewProfile?: (username: string) => void;
  onOpenPlayground?: (modelName?: string) => void;
}

type TabType = "overview" | "specs" | "code" | "reviews";
type CodeLang = "python" | "javascript" | "curl";

const COMPARE_ROWS: { label: string; get: (e: Entry) => string }[] = [
  { label: "Type", get: (e) => e.type },
  { label: "Task", get: (e) => e.task },
  { label: "License", get: (e) => e.license },
  { label: "Year", get: (e) => String(e.year) },
  { label: "Size", get: (e) => e.size },
  { label: "Organization", get: (e) => e.org },
  { label: "Benchmarks", get: (e) => e.benchmarks },
];

function CompareSelect({
  value,
  onChange,
  candidates,
  placeholder,
  className,
}: {
  value: string;
  onChange: (name: string) => void;
  candidates: Entry[];
  placeholder: string;
  className: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = candidates.find((c) => c.name === value);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        id="compare-with"
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${className} flex items-center justify-between gap-2 text-left cursor-pointer`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={selected ? "text-[#202124] dark:text-[#e3e3e3]" : "text-[#70757a] dark:text-[#8e918f]"}>
          {selected?.name ?? placeholder}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-30 left-0 right-0 mt-1 max-h-52 overflow-y-auto overscroll-contain rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] shadow-xl"
        >
          <li>
            <button
              type="button"
              role="option"
              aria-selected={!value}
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className={`w-full px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                !value
                  ? "bg-[#f1f3f4] dark:bg-[#282a2c] text-[#1a73e8] dark:text-[#a8c7fa] font-semibold"
                  : "text-[#70757a] dark:text-[#8e918f] hover:bg-[#f8f9fa] dark:hover:bg-[#282a2c]/60"
              }`}
            >
              {placeholder}
            </button>
          </li>
          {candidates.map((c) => (
            <li key={c.name}>
              <button
                type="button"
                role="option"
                aria-selected={c.name === value}
                onClick={() => {
                  onChange(c.name);
                  setOpen(false);
                }}
                className={`w-full px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                  c.name === value
                    ? "bg-[#f1f3f4] dark:bg-[#282a2c] text-[#1a73e8] dark:text-[#a8c7fa] font-semibold"
                    : "text-[#3c4043] dark:text-[#c4c7c5] hover:bg-[#f8f9fa] dark:hover:bg-[#282a2c]/60"
                }`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CompareTable({
  left,
  right,
}: {
  left: Entry;
  right: Entry;
}) {
  return (
    <div className="rounded-xl border border-[#dadce0] dark:border-[#3c4043]/60 overflow-hidden bg-white dark:bg-[#1e1f20]">
      <div className="grid grid-cols-[100px_minmax(0,1fr)_minmax(0,1fr)] sm:grid-cols-[130px_minmax(0,1fr)_minmax(0,1fr)] gap-px text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold bg-[#f1f3f4] dark:bg-[#282a2c]">
        <div className="px-3.5 py-2.5 text-[#5f6368] dark:text-[#8e918f]">Metric</div>
        <div className="px-3.5 py-2.5 truncate font-bold text-[#202124] dark:text-[#e3e3e3]">{left.name}</div>
        <div className="px-3.5 py-2.5 truncate font-bold text-[#1a73e8] dark:text-[#a8c7fa]">{right.name}</div>
      </div>
      {COMPARE_ROWS.map(({ label, get }) => (
        <div
          key={label}
          className="grid grid-cols-[100px_minmax(0,1fr)_minmax(0,1fr)] sm:grid-cols-[130px_minmax(0,1fr)_minmax(0,1fr)] gap-px border-t border-[#dadce0] dark:border-[#3c4043]/40 bg-white dark:bg-[#1e1f20]"
        >
          <div className="px-3.5 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#5f6368] dark:text-[#8e918f]">
            {label}
          </div>
          <div className={`px-3.5 py-2.5 text-xs leading-relaxed ${label === "Benchmarks" ? "line-clamp-3" : ""} text-[#3c4043] dark:text-[#c4c7c5]`}>
            {get(left)}
          </div>
          <div className={`px-3.5 py-2.5 text-xs leading-relaxed ${label === "Benchmarks" ? "line-clamp-3" : ""} text-[#3c4043] dark:text-[#c4c7c5]`}>
            {get(right)}
          </div>
        </div>
      ))}
    </div>
  );
}

function generateCodeSnippets(entry: Entry): Record<CodeLang, string> {
  const slug = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  let pythonSnippet = entry.usage?.trim() || "";
  const isRealPython =
    pythonSnippet.includes("import ") ||
    pythonSnippet.includes("from ") ||
    pythonSnippet.includes("def ") ||
    pythonSnippet.includes("print(") ||
    pythonSnippet.includes("client =");

  if (!isRealPython) {
    pythonSnippet = `# Python SDK Quickstart for ${entry.name}
import os
import requests

API_ENDPOINT = "https://api.aiverse.frozenn.in/v1/models/${slug}/generate"
API_KEY = os.environ.get("AIVERSE_API_KEY", "YOUR_API_KEY")

payload = {
    "model": "${entry.name}",
    "prompt": "Explain the core intuition behind quantum algorithms.",
    "temperature": 0.7,
    "max_tokens": 1024
}

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

response = requests.post(API_ENDPOINT, json=payload, headers=headers)
print(response.json())`;
  }

  const jsSnippet = `// Node.js & Browser Fetch Quickstart for ${entry.name}
const API_ENDPOINT = "https://api.aiverse.frozenn.in/v1/models/${slug}/generate";
const API_KEY = process.env.AIVERSE_API_KEY || "YOUR_API_KEY";

async function runInference() {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${API_KEY}\`,
    },
    body: JSON.stringify({
      model: "${entry.name}",
      prompt: "Explain the core intuition behind quantum algorithms.",
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  const data = await response.json();
  console.log("Inference output:", data);
}

runInference().catch(console.error);`;

  const curlSnippet = `# cURL / REST API Quickstart for ${entry.name}
curl -X POST "https://api.aiverse.frozenn.in/v1/models/${slug}/generate" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $AIVERSE_API_KEY" \\
  -d '{
    "model": "${entry.name}",
    "prompt": "Explain the core intuition behind quantum algorithms.",
    "temperature": 0.7,
    "max_tokens": 1024
  }'`;

  return {
    python: pythonSnippet,
    javascript: jsSnippet,
    curl: curlSnippet,
  };
}

export const DetailModal: React.FC<DetailModalProps> = ({
  entry,
  onClose,
  onRatingSummaryChange,
  relatedEntries = [],
  onSelectRelated,
  isBookmarked,
  onToggleBookmark,
  compareCandidates = [],
  onViewProfile,
  onOpenPlayground,
}) => {
  const t = useTokens();
  const { user, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [activeCodeLang, setActiveCodeLang] = useState<CodeLang>("python");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [compareName, setCompareName] = useState("");

  const isNew = entry.created_at
    ? (new Date().getTime() - new Date(entry.created_at).getTime()) / (1000 * 60 * 60 * 24) <= 2
    : false;

  const compareEntry = useMemo(
    () => compareCandidates.find((e) => e.name === compareName),
    [compareCandidates, compareName],
  );

  const codeSnippets = useMemo(() => generateCodeSnippets(entry), [entry]);
  const selectCls =
    "w-full px-3.5 py-2.5 rounded-xl text-xs border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] focus:outline-none focus:ring-1 focus:ring-[#1a73e8] transition-all";

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock background scroll when full-page view is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow || "unset";
    };
  }, []);

  useEffect(() => {
    setCompareName("");
    setActiveTab("overview");
  }, [entry.name]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeLang]);
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
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.name} - Model Details`}
      className="fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain animate-[fadeIn_0.15s_ease-out] bg-[#f8f9fa] dark:bg-[#131314] text-[#202124] dark:text-[#e3e3e3]"
    >
      {/* 1. Google Cloud / Model Garden Header (Clean & Compact) */}
      <header className="sticky top-0 z-40 px-4 sm:px-6 h-13 sm:h-14 border-b border-[#dadce0] dark:border-[#3c4043]/50 bg-white/95 dark:bg-[#131314]/95 backdrop-blur-md flex items-center justify-between gap-4 transition-colors">
        {/* Left: Back button & Breadcrumbs */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#c4c7c5] hover:text-[#202124] dark:hover:text-white hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-colors cursor-pointer"
            title="Return to Catalog (Esc)"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="h-3.5 w-px bg-[#dadce0] dark:bg-[#3c4043] hidden sm:block" />

          {/* Breadcrumb path */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-[#5f6368] dark:text-[#8e918f] font-medium truncate"
          >
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 text-[#1a73e8] dark:text-[#a8c7fa] font-semibold shrink-0 hover:underline cursor-pointer"
              title="Return to Catalog"
            >
              <Sparkles size={12} /> Model Garden
            </button>
            <span className="opacity-40">/</span>
            <span className="truncate">{entry.type}</span>
            <span className="opacity-40">/</span>
            <span className="font-semibold text-[#202124] dark:text-[#e3e3e3] truncate max-w-[140px] sm:max-w-xs">
              {entry.name}
            </span>
          </nav>
        </div>

        {/* Right: Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenPlayground && (
            <button
              onClick={() => onOpenPlayground(entry.name)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] shadow-xs transition-all cursor-pointer"
              title="Test in Interactive Model Playground"
            >
              <Terminal size={12} />
              <span className="hidden sm:inline">Open in Playground</span>
            </button>
          )}

          <button
            onClick={handleShareLink}
            title="Share model link"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] transition-all cursor-pointer ${
              linkCopied
                ? "bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] border-[#1a73e8]/30"
                : "text-[#5f6368] dark:text-[#c4c7c5] hover:text-[#202124] dark:hover:text-white"
            }`}
          >
            {linkCopied ? <Check size={12} /> : <Share2 size={12} />}
            <span className="hidden md:inline">{linkCopied ? "Copied" : "Share"}</span>
          </button>

          {onToggleBookmark && (
            <button
              onClick={onToggleBookmark}
              title={isBookmarked ? "Remove bookmark" : "Bookmark this model"}
              className={`w-7 h-7 flex items-center justify-center rounded-full border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] transition-all cursor-pointer ${
                isBookmarked
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-500"
                  : "text-[#5f6368] dark:text-[#8e918f] hover:text-[#202124] dark:hover:text-white"
              }`}
            >
              <Bookmark size={12} className={isBookmarked ? "fill-current" : ""} />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#8e918f] hover:text-[#202124] dark:hover:text-white transition-all cursor-pointer"
            title="Close view (Esc)"
          >
            <X size={13} />
          </button>
        </div>
      </header>

      {/* 2. Hero Strip (Refined & Proportional) */}
      <div className="border-b border-[#dadce0] dark:border-[#3c4043]/40 bg-white dark:bg-[#1e1f20]/30 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              {/* Glyph Icon */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 border border-[#dadce0] dark:border-[#3c4043]/60 ${typeIcon(
                  entry.type,
                  t,
                )}`}
              >
                {TYPE_GLYPH[entry.type] ?? "◈"}
              </div>

              {/* Title & Metadata Badges */}
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202124] dark:text-[#e3e3e3]">
                    {entry.name}
                  </h1>

                  {isNew && (
                    <span className="inline-flex items-center text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25 animate-pulse">
                      NEW
                    </span>
                  )}

                  {entry.popular && (
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${t.popular}`}>
                      <Star size={9} className="fill-current text-amber-400" /> Popular
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <CheckCircle2 size={10} /> Verified Spec
                  </span>
                </div>

                {/* Subtitle Chips Row */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#5f6368] dark:text-[#8e918f] mb-1.5">
                  <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md border ${typeBadge(entry.type, t)}`}>
                    {entry.type}
                  </span>
                  <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md border ${taskBadge(entry.task, t)}`}>
                    {entry.task}
                  </span>
                  <span className="opacity-30">•</span>
                  <span className="flex items-center gap-1">
                    <Building2 size={12} className="opacity-70" />
                    <span className="font-medium text-[#202124] dark:text-[#c4c7c5]">{entry.org}</span>
                  </span>
                  <span className="opacity-30">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="opacity-70" />
                    <span>{entry.year}</span>
                  </span>
                  <span className="opacity-30">•</span>
                  <span className="flex items-center gap-1">
                    <Layers size={12} className="opacity-70" />
                    <span>{entry.size}</span>
                  </span>
                  <span className="opacity-30">•</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} className="opacity-70" />
                    <span>{entry.license}</span>
                  </span>
                </div>

                <p className="text-[13px] leading-relaxed text-[#5f6368] dark:text-[#c4c7c5] max-w-3xl">
                  {entry.summary}
                </p>
              </div>
            </div>

            {/* Quick action buttons on desktop */}
            {entry.url && (
              <div className="hidden lg:flex items-center gap-2 shrink-0">
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#3c4043] dark:text-[#c4c7c5] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-colors"
                >
                  <Globe size={12} />
                  <span>Docs</span>
                  <ExternalLink size={10} className="opacity-60" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Google Material 3 Tabs Bar (Sticky) */}
      <div className="sticky top-[52px] sm:top-[56px] z-30 border-b border-[#dadce0] dark:border-[#3c4043]/50 bg-white/95 dark:bg-[#131314]/95 backdrop-blur-md transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none" role="tablist">
            {[
              { id: "overview", label: "Overview", icon: Sparkles },
              { id: "specs", label: "Specifications & Benchmarks", icon: BarChart3 },
              { id: "code", label: "API Quickstart", icon: Code2 },
              { id: "reviews", label: "Community Reviews", icon: MessageSquare },
            ].map(({ id, label, icon: TabIcon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(id as TabType)}
                  className={`flex items-center gap-1.5 px-3.5 py-3 text-xs sm:text-[13px] font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "border-[#1a73e8] dark:border-[#a8c7fa] text-[#1a73e8] dark:text-[#a8c7fa] font-semibold"
                      : "border-transparent text-[#5f6368] dark:text-[#8e918f] hover:text-[#202124] dark:hover:text-[#e3e3e3] hover:border-[#dadce0] dark:hover:border-[#3c4043]"
                  }`}
                >
                  <TabIcon size={14} className={isActive ? "text-[#1a73e8] dark:text-[#a8c7fa]" : "opacity-60"} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Responsive Body (Balanced 2-Column Grid) */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="relative">
          {/* Sign In prompt overlay for unauthenticated users */}
          {!user && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center min-h-[380px] backdrop-blur-sm rounded-2xl bg-white/90 dark:bg-[#131314]/92 border border-[#dadce0] dark:border-[#3c4043]/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-md bg-[#1a73e8] dark:bg-[#a8c7fa] text-white dark:text-[#041e49]">
                <Lock size={20} />
              </div>
              <h2 className="text-lg font-bold mb-1.5 tracking-tight text-[#202124] dark:text-[#e3e3e3]">
                Sign in to Access Full Model Garden Specs
              </h2>
              <p className="text-xs mb-5 max-w-sm leading-relaxed mx-auto text-[#5f6368] dark:text-[#c4c7c5]">
                Sign in to view technical architecture, copy SDK code snippets, compare benchmarks, and test this model in the Playground.
              </p>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => openAuthModal("signin")}
                  className="px-5 py-2 rounded-full font-medium text-xs border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] font-semibold px-5 py-2 rounded-full text-xs shadow-xs transition-all cursor-pointer"
                >
                  Create Free Account
                </button>
              </div>
            </div>
          )}

          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${
              !user ? "opacity-25 blur-[4px] pointer-events-none select-none max-h-[460px] overflow-hidden" : ""
            }`}
            {...(!user ? { inert: true } : {})}
          >
            {/* Left Main Content Column (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-5">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-5">
                  {/* Google Quick Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1a73e8] dark:text-[#a8c7fa] mb-1">
                        <Building2 size={12} />
                        <span>Developer</span>
                      </div>
                      <p className="text-xs font-bold text-[#202124] dark:text-[#e3e3e3] truncate">
                        {entry.org}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-500 mb-1">
                        <Layers size={12} />
                        <span>Parameters</span>
                      </div>
                      <p className="text-xs font-bold text-[#202124] dark:text-[#e3e3e3] truncate">
                        {entry.size}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1a73e8] dark:text-[#a8c7fa] mb-1">
                        <Sparkles size={12} />
                        <span>Primary Task</span>
                      </div>
                      <p className="text-xs font-bold text-[#202124] dark:text-[#e3e3e3] truncate">
                        {entry.task}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                        <ShieldCheck size={12} />
                        <span>License</span>
                      </div>
                      <p className="text-xs font-bold text-[#202124] dark:text-[#e3e3e3] truncate">
                        {entry.license}
                      </p>
                    </div>
                  </div>

                  {/* Architecture & Engineering Card */}
                  <section className="p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Cpu size={16} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                      <h2 className="text-sm font-bold text-[#202124] dark:text-[#e3e3e3]">
                        Technical Architecture
                      </h2>
                    </div>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-[#3c4043] dark:text-[#c4c7c5]">
                      {entry.architecture}
                    </p>
                  </section>

                  {/* Responsible AI & Safety Limitations */}
                  <section className="p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldAlert size={16} className="text-amber-500" />
                      <div>
                        <h2 className="text-sm font-bold text-[#202124] dark:text-[#e3e3e3]">
                          Responsible AI & Constraints
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {entry.limitations.split(",").map((l, i) => (
                        <div
                          key={i}
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                        >
                          <AlertTriangle size={12} className="shrink-0" />
                          <span>{l.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Official Links & Resources */}
                  {entry.url && (
                    <section className="p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                      <div className="flex items-center gap-2 mb-2.5">
                        <ExternalLink size={16} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                        <h2 className="text-sm font-bold text-[#202124] dark:text-[#e3e3e3]">
                          Official Documentation & Registry
                        </h2>
                      </div>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/40 bg-[#f8f9fa] dark:bg-[#282a2c]/40 hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Globe size={15} className="text-[#1a73e8] dark:text-[#a8c7fa] shrink-0" />
                          <span className="text-xs font-medium text-[#202124] dark:text-[#e3e3e3] truncate">
                            {entry.url}
                          </span>
                        </div>
                        <ExternalLink size={13} className="text-[#70757a] group-hover:text-[#1a73e8] dark:group-hover:text-[#a8c7fa] transition-colors shrink-0" />
                      </a>
                    </section>
                  )}

                  {/* Research Citations */}
                  {entry.citations.length > 0 && (
                    <section className="p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                      <h2 className="text-sm font-bold text-[#202124] dark:text-[#e3e3e3] mb-3">
                        Research Papers & Literature
                      </h2>
                      <div className="space-y-2">
                        {entry.citations.map((c, i) => (
                          <a
                            key={i}
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/40 bg-[#f8f9fa] dark:bg-[#282a2c]/40 hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-colors group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] dark:bg-[#a8c7fa] shrink-0" />
                            <span className="flex-1 text-xs text-[#3c4043] dark:text-[#c4c7c5]">{c.text}</span>
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#1a73e8] dark:text-[#a8c7fa] shrink-0" />
                          </a>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {/* TAB 2: SPECS & BENCHMARKS */}
              {activeTab === "specs" && (
                <div className="space-y-5">
                  {/* Technical Specifications Matrix */}
                  <section className="rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 overflow-hidden bg-white dark:bg-[#1e1f20]">
                    <div className="px-5 py-3 border-b border-[#dadce0] dark:border-[#3c4043]/50 text-xs font-bold uppercase tracking-wider bg-[#f1f3f4] dark:bg-[#282a2c] text-[#202124] dark:text-[#e3e3e3]">
                      Model Garden Technical Specification Sheet
                    </div>
                    <div className="divide-y divide-[#dadce0] dark:divide-[#3c4043]/40 text-xs">
                      {[
                        { label: "Model Asset Name", value: entry.name },
                        { label: "Resource Category", value: entry.type },
                        { label: "Primary Task Domain", value: entry.task },
                        { label: "Model Architecture", value: entry.architecture },
                        { label: "Weights / Parameter Size", value: entry.size },
                        { label: "Developer / Organization", value: entry.org },
                        { label: "Release Year", value: String(entry.year) },
                        { label: "License & Commercial Usage", value: entry.license },
                      ].map(({ label, value }) => (
                        <div key={label} className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white dark:bg-[#1e1f20]">
                          <span className="font-medium text-[#5f6368] dark:text-[#8e918f]">
                            {label}
                          </span>
                          <span className="sm:col-span-2 font-semibold text-[#202124] dark:text-[#e3e3e3]">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Benchmarks & Performance Metrics */}
                  <section className="p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <BarChart3 size={16} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                      <h2 className="text-sm font-bold text-[#202124] dark:text-[#e3e3e3]">
                        Evaluation Benchmarks & Performance
                      </h2>
                    </div>
                    <div className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/40 bg-[#f8f9fa] dark:bg-[#282a2c]/40 text-xs leading-relaxed font-mono text-[#202124] dark:text-[#e3e3e3]">
                      {entry.benchmarks}
                    </div>
                  </section>

                  {/* Side-by-Side Model Comparator */}
                  {compareCandidates.length > 0 && (
                    <section className="p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Sliders size={16} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                        <h2 className="text-sm font-bold text-[#202124] dark:text-[#e3e3e3]">
                          Model Garden Comparator
                        </h2>
                      </div>
                      <p className="text-xs text-[#5f6368] dark:text-[#8e918f] mb-3">
                        Compare technical attributes side-by-side with another asset in the ecosystem:
                      </p>

                      <CompareSelect
                        value={compareName}
                        onChange={setCompareName}
                        candidates={compareCandidates}
                        placeholder="Choose candidate model to compare…"
                        className={selectCls}
                      />

                      {compareEntry && (
                        <div className="mt-4">
                          <CompareTable left={entry} right={compareEntry} />
                        </div>
                      )}
                    </section>
                  )}
                </div>
              )}

              {/* TAB 3: API & CODE */}
              {activeTab === "code" && (
                <div className="space-y-5">
                  <section className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-bold text-[#202124] dark:text-[#e3e3e3] flex items-center gap-1.5">
                          <Terminal size={15} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                          SDK Quickstart & Inference
                        </h2>
                      </div>

                      {/* Language Selector Tabs */}
                      <div className="flex items-center p-0.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-[#f1f3f4] dark:bg-[#282a2c] text-xs">
                        {(["python", "javascript", "curl"] as CodeLang[]).map((lang) => {
                          const isLangActive = activeCodeLang === lang;
                          return (
                            <button
                              key={lang}
                              onClick={() => setActiveCodeLang(lang)}
                              className={`px-3 py-1 rounded-lg font-medium capitalize transition-all cursor-pointer ${
                                isLangActive
                                  ? "bg-white dark:bg-[#1e1f20] text-[#1a73e8] dark:text-[#a8c7fa] font-semibold shadow-xs"
                                  : "text-[#5f6368] dark:text-[#8e918f] hover:text-[#202124] dark:hover:text-white"
                              }`}
                            >
                              {lang === "javascript" ? "Node.js" : lang}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Code Container */}
                    <div className="rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 overflow-hidden shadow-xs bg-[#1e1f20]">
                      {/* Editor Toolbar */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#3c4043]/50 bg-[#282a2c]/60">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                          </div>
                          <span className="text-[11px] font-mono font-medium ml-1.5 text-[#8e918f]">
                            {activeCodeLang === "python"
                              ? "quickstart.py"
                              : activeCodeLang === "javascript"
                              ? "quickstart.mjs"
                              : "request.sh"}
                          </span>
                        </div>

                        <button
                          onClick={handleCopyCode}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#3c4043] bg-[#1e1f20] text-xs font-medium text-[#c4c7c5] hover:text-white transition-all cursor-pointer"
                        >
                          {copied ? <Check size={12} className="text-[#1a73e8] dark:text-[#a8c7fa]" /> : <Copy size={12} />}
                          <span>{copied ? "Copied" : "Copy Code"}</span>
                        </button>
                      </div>

                      {/* Code body */}
                      <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed max-h-[380px] bg-[#1e1f20] text-[#e3e3e3]">
                        <code>{codeSnippets[activeCodeLang]}</code>
                      </pre>
                    </div>
                  </section>

                  {/* Playground Launch Banner */}
                  <section className="p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent">
                    <div>
                      <h3 className="text-sm font-bold text-[#202124] dark:text-[#e3e3e3] flex items-center gap-1.5">
                        <Sparkles size={15} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                        Interactive Model Playground
                      </h3>
                      <p className="text-xs mt-0.5 text-[#5f6368] dark:text-[#c4c7c5]">
                        Test model inference, compare outputs, and tune temperature live without installing anything.
                      </p>
                    </div>
                    {onOpenPlayground && (
                      <button
                        onClick={() => onOpenPlayground(entry.name)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] shadow-xs transition-all cursor-pointer shrink-0"
                      >
                        <span>Open Playground</span>
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </section>
                </div>
              )}

              {/* TAB 4: REVIEWS & COMMUNITY */}
              {activeTab === "reviews" && (
                <section className="p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                  <EntryFeedback
                    entryName={entry.name}
                    onRatingSummaryChange={onRatingSummaryChange}
                    onViewProfile={onViewProfile}
                  />
                </section>
              )}
            </div>

            {/* Right Sticky Sidebar (4 cols on desktop) */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="sticky top-28 space-y-4">
                {/* Card 1: Resource Information */}
                <div className="p-4 sm:p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#5f6368] dark:text-[#8e918f] mb-3 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                    Resource Information
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#dadce0]/70 dark:border-[#3c4043]/40">
                      <span className="text-[#5f6368] dark:text-[#8e918f] flex items-center gap-1.5">
                        <Building2 size={13} /> Organization
                      </span>
                      <span className="font-semibold text-[#202124] dark:text-[#e3e3e3] truncate">
                        {entry.org}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#dadce0]/70 dark:border-[#3c4043]/40">
                      <span className="text-[#5f6368] dark:text-[#8e918f] flex items-center gap-1.5">
                        <Layers size={13} /> Size / Parameters
                      </span>
                      <span className="font-semibold text-[#202124] dark:text-[#e3e3e3]">
                        {entry.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#dadce0]/70 dark:border-[#3c4043]/40">
                      <span className="text-[#5f6368] dark:text-[#8e918f] flex items-center gap-1.5">
                        <Sparkles size={13} /> Task
                      </span>
                      <span className="font-semibold text-[#202124] dark:text-[#e3e3e3]">
                        {entry.task}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#dadce0]/70 dark:border-[#3c4043]/40">
                      <span className="text-[#5f6368] dark:text-[#8e918f] flex items-center gap-1.5">
                        <ShieldCheck size={13} /> License
                      </span>
                      <span className="font-semibold text-[#202124] dark:text-[#e3e3e3]">
                        {entry.license}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#dadce0]/70 dark:border-[#3c4043]/40">
                      <span className="text-[#5f6368] dark:text-[#8e918f] flex items-center gap-1.5">
                        <Calendar size={13} /> Release Year
                      </span>
                      <span className="font-semibold text-[#202124] dark:text-[#e3e3e3]">
                        {entry.year}
                      </span>
                    </div>

                    {entry.url && (
                      <div className="pt-1">
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#f1f3f4] hover:bg-[#e8eaed] dark:bg-[#282a2c] dark:hover:bg-[#323639] text-[#202124] dark:text-[#e3e3e3] border border-[#dadce0] dark:border-[#3c4043]/60 transition-colors"
                        >
                          <ExternalLink size={12} />
                          <span>Visit Official Website</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card 2: Similar Models in Garden */}
                {relatedEntries.length > 0 && onSelectRelated && (
                  <div className="p-4 sm:p-5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/50 bg-white dark:bg-[#1e1f20]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#5f6368] dark:text-[#8e918f]">
                        Similar in Garden
                      </h3>
                      <span className="text-[11px] text-[#70757a] dark:text-[#8e918f]">
                        {relatedEntries.length} items
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {relatedEntries.slice(0, 5).map((related) => {
                        const isRelatedNew = related.created_at
                          ? (new Date().getTime() - new Date(related.created_at).getTime()) /
                              (1000 * 60 * 60 * 24) <= 2
                          : false;
                        return (
                          <button
                            key={related.name}
                            type="button"
                            onClick={() => onSelectRelated(related)}
                            className="w-full text-left p-2.5 rounded-xl border border-[#dadce0]/70 dark:border-[#3c4043]/40 bg-[#f8f9fa] hover:bg-[#f1f3f4] dark:bg-[#282a2c]/30 dark:hover:bg-[#282a2c] transition-all cursor-pointer group"
                          >
                            <div className="flex items-center justify-between gap-1.5 mb-0.5">
                              <span className="text-xs font-bold text-[#202124] dark:text-[#e3e3e3] group-hover:text-[#1a73e8] dark:group-hover:text-[#a8c7fa] transition-colors truncate">
                                {related.name}
                              </span>
                              {isRelatedNew && (
                                <span className="text-[8px] font-black uppercase px-1 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 shrink-0">
                                  NEW
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] sm:text-[11px] text-[#5f6368] dark:text-[#8e918f] truncate">
                              {related.type} · {related.task} · {related.org}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
