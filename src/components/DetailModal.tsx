import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  X,
  Star,
  ExternalLink,
  Copy,
  Check,
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
  onViewEcosystem?: (orgName: string) => void;
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
        <span className={selected ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400"}>
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
          className="absolute z-30 left-0 right-0 mt-1 max-h-52 overflow-y-auto overscroll-contain rounded-xl border border-neutral-200/90 dark:border-white/[0.1] bg-white dark:bg-[#0d0e12] shadow-2xl"
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
                  ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 font-semibold"
                  : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
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
                    ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 font-semibold"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
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
    <div className="rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] overflow-x-auto bg-white dark:bg-[#0c0d11]">
      <div className="grid grid-cols-[100px_minmax(130px,1fr)_minmax(130px,1fr)] sm:grid-cols-[130px_minmax(0,1fr)_minmax(0,1fr)] min-w-[360px] sm:min-w-0 gap-px text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold bg-neutral-100 dark:bg-[#121319]">
        <div className="px-3.5 py-2.5 text-neutral-500 dark:text-neutral-400">Metric</div>
        <div className="px-3.5 py-2.5 truncate font-bold text-neutral-900 dark:text-white">{left.name}</div>
        <div className="px-3.5 py-2.5 truncate font-bold text-indigo-600 dark:text-indigo-400">{right.name}</div>
      </div>
      {COMPARE_ROWS.map(({ label, get }) => (
        <div
          key={label}
          className="grid grid-cols-[100px_minmax(130px,1fr)_minmax(130px,1fr)] sm:grid-cols-[130px_minmax(0,1fr)_minmax(0,1fr)] min-w-[360px] sm:min-w-0 gap-px border-t border-neutral-200/70 dark:border-white/[0.06] bg-white dark:bg-[#0c0d11]"
        >
          <div className="px-3.5 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
            {label}
          </div>
          <div className={`px-3.5 py-2.5 text-xs leading-relaxed ${label === "Benchmarks" ? "line-clamp-3" : ""} text-neutral-700 dark:text-neutral-300`}>
            {get(left)}
          </div>
          <div className={`px-3.5 py-2.5 text-xs leading-relaxed ${label === "Benchmarks" ? "line-clamp-3" : ""} text-neutral-700 dark:text-neutral-300`}>
            {get(right)}
          </div>
        </div>
      ))}
    </div>
  );
}

function generateCodeSnippets(entry: Entry): Record<CodeLang, string> {
  const slug = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const nameLower = entry.name.toLowerCase();
  const orgLower = (entry.org || "").toLowerCase();

  const isOpenAI = orgLower.includes("openai") || nameLower.includes("gpt") || nameLower.includes("o1") || nameLower.includes("o3") || nameLower.includes("whisper") || nameLower.includes("dall-e");
  const isAnthropic = orgLower.includes("anthropic") || nameLower.includes("claude");
  const isDeepSeek = orgLower.includes("deepseek");
  const isGoogle = orgLower.includes("google") || nameLower.includes("gemini") || nameLower.includes("gemma");
  const isMistral = orgLower.includes("mistral");
  const isDataset = entry.type === "Dataset";
  const isFramework = entry.type === "Framework" || entry.type === "Platform";

  let pythonSnippet = entry.usage?.trim() || "";
  const isRealPython =
    pythonSnippet.includes("import ") ||
    pythonSnippet.includes("from ") ||
    pythonSnippet.includes("def ") ||
    pythonSnippet.includes("print(") ||
    pythonSnippet.includes("client =");

  if (!isRealPython) {
    if (isOpenAI) {
      pythonSnippet = `# Python Quickstart with OpenAI SDK
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="${nameLower}",
    messages=[{"role": "user", "content": "Explain core intuition behind this architecture."}]
)
print(response.choices[0].message.content)`;
    } else if (isAnthropic) {
      pythonSnippet = `# Python Quickstart with Anthropic SDK
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model="${nameLower}",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain core intuition behind this architecture."}]
)
print(message.content[0].text)`;
    } else if (isDeepSeek) {
      pythonSnippet = `# Python Quickstart with DeepSeek API
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com"
)
response = client.chat.completions.create(
    model="${nameLower.includes("r1") ? "deepseek-reasoner" : "deepseek-chat"}",
    messages=[{"role": "user", "content": "Explain core intuition behind this architecture."}]
)
print(response.choices[0].message.content)`;
    } else if (isGoogle) {
      pythonSnippet = `# Python Quickstart with Google GenAI SDK
from google import genai

client = genai.Client()
response = client.models.generate_content(
    model="${nameLower.includes("gemini") ? nameLower : "gemini-2.0-flash"}",
    contents="Explain core intuition behind this architecture."
)
print(response.text)`;
    } else if (isMistral) {
      pythonSnippet = `# Python Quickstart with Mistral SDK
from mistralai import Mistral
import os

client = Mistral(api_key=os.environ.get("MISTRAL_API_KEY"))
response = client.chat.complete(
    model="${nameLower.includes("mistral") ? nameLower : "mistral-large-latest"}",
    messages=[{"role": "user", "content": "Explain core intuition behind this architecture."}]
)
print(response.choices[0].message.content)`;
    } else if (isDataset) {
      pythonSnippet = `# Python Quickstart for Dataset: ${entry.name}
from datasets import load_dataset

dataset = load_dataset("${entry.org ? `${entry.org}/${slug}` : slug}")
print(dataset)`;
    } else if (isFramework) {
      pythonSnippet = `# Python Quickstart for ${entry.name}
# Install package: pip install ${slug.replace(/-/g, "_")}
import ${slug.replace(/-/g, "_")}
print("${entry.name} initialized successfully.")`;
    } else {
      pythonSnippet = `# Python Quickstart with Transformers
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_id = "${entry.org ? `${entry.org}/${entry.name}` : entry.name}"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.bfloat16,
    device_map="auto"
)
print(f"Loaded {model_id} model.")`;
    }
  }

  let jsSnippet: string;
  if (isOpenAI) {
    jsSnippet = `// Node.js Quickstart with OpenAI SDK
import OpenAI from "openai";

const openai = new OpenAI();
const completion = await openai.chat.completions.create({
  model: "${nameLower}",
  messages: [{ role: "user", content: "Explain core intuition behind this architecture." }],
});
console.log(completion.choices[0].message.content);`;
  } else if (isAnthropic) {
    jsSnippet = `// Node.js Quickstart with Anthropic SDK
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();
const message = await anthropic.messages.create({
  model: "${nameLower}",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Explain core intuition behind this architecture." }],
});
console.log(message.content[0].text);`;
  } else if (isDeepSeek) {
    jsSnippet = `// Node.js Quickstart with DeepSeek API
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "${nameLower.includes("r1") ? "deepseek-reasoner" : "deepseek-chat"}",
  messages: [{ role: "user", content: "Explain core intuition behind this architecture." }],
});
console.log(completion.choices[0].message.content);`;
  } else if (isGoogle) {
    jsSnippet = `// Node.js Quickstart with Google Generative AI
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "${nameLower.includes("gemini") ? nameLower : "gemini-2.0-flash"}" });
const result = await model.generateContent("Explain core intuition behind this architecture.");
console.log(result.response.text());`;
  } else if (isMistral) {
    jsSnippet = `// Node.js Quickstart with Mistral Client
import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
const response = await client.chat.complete({
  model: "${nameLower.includes("mistral") ? nameLower : "mistral-large-latest"}",
  messages: [{ role: "user", content: "Explain core intuition behind this architecture." }],
});
console.log(response.choices[0].message.content);`;
  } else if (isFramework || isDataset) {
    jsSnippet = `// JavaScript / Node.js for ${entry.name}
// Package: npm install ${slug}
// Documentation: ${entry.url || "https://github.com"}
console.log("Explore ${entry.name} documentation at: ${entry.url || "official repository"}");`;
  } else {
    jsSnippet = `// Node.js Inference via Hugging Face SDK
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN);
const result = await hf.textGeneration({
  model: "${entry.org ? `${entry.org}/${entry.name}` : entry.name}",
  inputs: "Explain core intuition behind this architecture.",
  parameters: { max_new_tokens: 512 },
});
console.log(result.generated_text);`;
  }

  let curlSnippet: string;
  if (isOpenAI) {
    curlSnippet = `# cURL / REST API for OpenAI
curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{
    "model": "${nameLower}",
    "messages": [{"role": "user", "content": "Explain core intuition behind this architecture."}]
  }'`;
  } else if (isAnthropic) {
    curlSnippet = `# cURL / REST API for Anthropic
curl https://api.anthropic.com/v1/messages \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "${nameLower}",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Explain core intuition behind this architecture."}]
  }'`;
  } else if (isDeepSeek) {
    curlSnippet = `# cURL / REST API for DeepSeek
curl https://api.deepseek.com/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \\
  -d '{
    "model": "${nameLower.includes("r1") ? "deepseek-reasoner" : "deepseek-chat"}",
    "messages": [{"role": "user", "content": "Explain core intuition behind this architecture."}]
  }'`;
  } else if (isGoogle) {
    curlSnippet = `# cURL / REST API for Google Gemini
curl "https://generativelanguage.googleapis.com/v1beta/models/${nameLower.includes("gemini") ? nameLower : "gemini-2.0-flash"}:generateContent?key=$GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{"parts": [{"text": "Explain core intuition behind this architecture."}]}]
  }'`;
  } else if (isMistral) {
    curlSnippet = `# cURL / REST API for Mistral
curl https://api.mistral.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $MISTRAL_API_KEY" \\
  -d '{
    "model": "${nameLower.includes("mistral") ? nameLower : "mistral-large-latest"}",
    "messages": [{"role": "user", "content": "Explain core intuition behind this architecture."}]
  }'`;
  } else if (isFramework || isDataset) {
    curlSnippet = `# Check official repository & release metadata
curl -sL "${entry.url || "https://github.com"}" | head -n 30`;
  } else {
    curlSnippet = `# Hugging Face Serverless Inference API Quickstart
curl https://api-inference.huggingface.co/models/${entry.org ? `${entry.org}/${entry.name}` : entry.name} \\
  -H "Authorization: Bearer $HF_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"inputs": "Explain core intuition behind this architecture."}'

# Or run locally using Ollama:
# ollama run ${slug} "Explain core intuition behind this architecture."`;
  }

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
  onViewEcosystem,
}) => {
  const t = useTokens();
  const { user, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [activeCodeLang, setActiveCodeLang] = useState<CodeLang>("python");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [compareName, setCompareName] = useState("");
  const [trackedEntryName, setTrackedEntryName] = useState(entry.name);

  if (trackedEntryName !== entry.name) {
    setTrackedEntryName(entry.name);
    setCompareName("");
    setActiveTab("overview");
  }

  const isNew = entry.created_at
    ? (new Date().getTime() - new Date(entry.created_at).getTime()) / (1000 * 60 * 60 * 24) <= 2
    : false;

  const compareEntry = useMemo(
    () => compareCandidates.find((e) => e.name === compareName),
    [compareCandidates, compareName],
  );

  const codeSnippets = useMemo(() => generateCodeSnippets(entry), [entry]);
  const selectCls =
    "w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-neutral-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all";

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

  useEffect(() => {
    window.scrollTo(0, 0);
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
      aria-label={`${entry.name} - Technical Specs & Architecture Details`}
      className="w-full flex-1 flex flex-col bg-neutral-50 dark:bg-[#050507] text-neutral-900 dark:text-neutral-100 transition-colors animate-[fadeIn_0.2s_ease-out]"
    >
      {/* 1. Control Plane Breadcrumbs & Actions Sub-Header */}
      <header className="sticky top-14 sm:top-15 z-30 px-4 sm:px-6 xl:px-12 h-14 border-b border-neutral-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#090a0e]/90 backdrop-blur-xl flex items-center justify-between gap-2 sm:gap-4 transition-colors shadow-2xs">
        {/* Left: Back button & Breadcrumbs */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors cursor-pointer shrink-0 shadow-2xs"
            title="Return to Catalog (Esc)"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Catalog</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="h-4 w-px bg-neutral-200 dark:bg-white/[0.1] hidden sm:block" />

          {/* Breadcrumb path */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium truncate"
          >
            <button
              type="button"
              onClick={onClose}
              className="hidden sm:flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 shrink-0 hover:underline cursor-pointer transition-colors"
              title="Return to Catalog"
            >
              <Sparkles size={12} /> Model Garden
            </button>
            <span className="hidden sm:inline opacity-40">/</span>
            <span className="hidden md:inline truncate">{entry.type}</span>
            <span className="hidden md:inline opacity-40">/</span>
            <span className="font-semibold text-neutral-900 dark:text-white truncate max-w-[140px] sm:max-w-xs">
              {entry.name}
            </span>
          </nav>
        </div>

        {/* Right: Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {onViewEcosystem && entry.org && (
            <button
              onClick={() => {
                onClose();
                onViewEcosystem(entry.org);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 transition-all cursor-pointer shadow-2xs"
              title={`View ${entry.org} Ecosystem`}
            >
              <Building2 size={12} />
              <span><span className="hidden sm:inline">View </span>Ecosystem</span>
            </button>
          )}

          {onOpenPlayground && (
            <button
              onClick={() => {
                if (!user) {
                  openAuthModal("signin");
                } else {
                  onOpenPlayground(entry.name);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
              title="Test in Interactive Model Playground"
            >
              <Terminal size={12} />
              <span className="hidden sm:inline">Open in Playground</span>
            </button>
          )}

          <button
            onClick={handleShareLink}
            title="Share model link"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              linkCopied
                ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30"
                : "border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.06]"
            }`}
          >
            {linkCopied ? <Check size={12} /> : <Share2 size={12} />}
            <span className="hidden md:inline">{linkCopied ? "Copied" : "Share"}</span>
          </button>

          {onToggleBookmark && (
            <button
              onClick={() => {
                if (!user) {
                  openAuthModal("signin");
                } else {
                  onToggleBookmark();
                }
              }}
              title={isBookmarked ? "Remove bookmark" : "Bookmark this model"}
              className={`w-8 h-8 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                isBookmarked
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-500"
                  : "border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.06]"
              }`}
            >
              <Bookmark size={13} className={isBookmarked ? "fill-current" : ""} />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
            title="Close view (Esc)"
          >
            <X size={14} />
          </button>
        </div>
      </header>

      {/* 2. Hero Strip */}
      <div className="border-b border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#090a0e] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
              {/* Glyph Icon */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold shrink-0 border border-neutral-200/80 dark:border-white/[0.1] shadow-xs ${typeIcon(
                  entry.type,
                  t,
                )}`}
              >
                {TYPE_GLYPH[entry.type] ?? "◈"}
              </div>

              {/* Title & Metadata Badges */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap mb-2 sm:mb-2.5">
                  <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                    {entry.name}
                  </h1>

                  {isNew && (
                    <span className="inline-flex items-center text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-500/25 animate-pulse">
                      NEW
                    </span>
                  )}

                  {entry.popular && (
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${t.popular}`}>
                      <Star size={9} className="fill-current text-amber-400" /> Popular
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    <CheckCircle2 size={11} /> Verified Spec
                  </span>
                </div>

                {/* Subtitle Chips Row */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs text-neutral-500 dark:text-neutral-400 mb-3.5">
                  <span className={`text-[10.5px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-lg border ${typeBadge(entry.type, t)}`}>
                    {entry.type}
                  </span>
                  <span className={`text-[10.5px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-lg border ${taskBadge(entry.task, t)}`}>
                    {entry.task}
                  </span>
                  {onViewEcosystem && entry.org ? (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onViewEcosystem(entry.org);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-[#121319] hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-500/25 hover:text-indigo-600 dark:hover:text-indigo-300 cursor-pointer group/org transition-colors"
                      title={`View ${entry.org} Ecosystem`}
                    >
                      <Building2 size={12} className="opacity-70 group-hover/org:text-indigo-600 dark:group-hover/org:text-indigo-400" />
                      <span className="font-semibold text-neutral-900 dark:text-neutral-200 group-hover/org:text-indigo-600 dark:group-hover/org:text-indigo-300">{entry.org}</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-[#121319]">
                      <Building2 size={12} className="opacity-70" />
                      <span className="font-semibold text-neutral-900 dark:text-neutral-200">{entry.org}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-[#121319]">
                    <Calendar size={12} className="opacity-70" />
                    <span>{entry.year}</span>
                  </span>
                  {entry.size && entry.size !== "N/A" && entry.size !== "Unknown" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-[#121319]">
                      <Layers size={12} className="opacity-70" />
                      <span>{entry.size}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-[#121319]">
                    <ShieldCheck size={12} className="opacity-70" />
                    <span>{entry.license}</span>
                  </span>
                </div>

                <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-4xl pt-1">
                  {entry.description || entry.summary}
                </p>
              </div>
            </div>

            {/* Quick action buttons on desktop */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0 pt-1">
              {onViewEcosystem && entry.org && (
                <button
                  onClick={() => {
                    onClose();
                    onViewEcosystem(entry.org);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 transition-all cursor-pointer shadow-2xs"
                  title={`View all ${entry.org} models & assets in Ecosystem`}
                >
                  <Building2 size={13} />
                  <span>View Ecosystem</span>
                  <ArrowRight size={11} className="opacity-70" />
                </button>
              )}
              {entry.url && (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/[0.06] transition-all shadow-2xs"
                >
                  <Globe size={13} />
                  <span>Docs</span>
                  <ExternalLink size={11} className="opacity-60" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Control Plane Tabs Bar */}
      <div className="border-b border-neutral-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#090a0e] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      ? "border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-white/20"
                  }`}
                >
                  <TabIcon size={14} className={isActive ? "text-indigo-600 dark:text-indigo-400" : "opacity-60"} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Responsive Body (Balanced 2-Column Grid) */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Main Content Column (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Quick Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div
                      onClick={() => {
                        if (onViewEcosystem && entry.org) {
                          onClose();
                          onViewEcosystem(entry.org);
                        }
                      }}
                      className={`p-4 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] transition-all ${
                        onViewEcosystem && entry.org
                          ? "cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/[0.06] group/dev"
                          : ""
                      }`}
                      title={onViewEcosystem && entry.org ? `Explore ${entry.org} Ecosystem` : undefined}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Building2 size={12} />
                          <span>Developer</span>
                        </div>
                        {onViewEcosystem && entry.org && (
                          <span className="text-[10px] lowercase text-indigo-600 dark:text-indigo-400 font-medium group-hover/dev:underline flex items-center gap-0.5">
                            view <ArrowRight size={9} />
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white truncate group-hover/dev:text-indigo-600 dark:group-hover/dev:text-indigo-400 transition-colors">
                        {entry.org}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-500 mb-1.5">
                        <Layers size={12} />
                        <span>Parameters</span>
                      </div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {entry.size && entry.size !== "N/A" && entry.size !== "Unknown" ? entry.size : "SaaS / Service"}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1.5">
                        <Sparkles size={12} />
                        <span>Primary Task</span>
                      </div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {entry.task}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1.5">
                        <ShieldCheck size={12} />
                        <span>License</span>
                      </div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {entry.license}
                      </p>
                    </div>
                  </div>

                  {/* Architecture & Engineering Card */}
                  <section className="p-5 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                    <div className="flex items-center gap-2 mb-3">
                      <Cpu size={16} className="text-indigo-600 dark:text-indigo-400" />
                      <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                        Technical Architecture
                      </h2>
                    </div>
                    <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {entry.architecture}
                    </p>
                  </section>

                  {/* Responsible AI & Safety Limitations */}
                  <section className="p-5 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                    <div className="flex items-center gap-2 mb-3.5">
                      <ShieldAlert size={17} className="text-amber-500" />
                      <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                        Responsible AI & Constraints
                      </h2>
                    </div>

                    <div className="space-y-2.5">
                      {(entry.limitations.includes(";")
                        ? entry.limitations.split(";")
                        : [entry.limitations]
                      ).map((l, i) => {
                        const trimmed = l.trim();
                        if (!trimmed) return null;
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-amber-500/8 dark:bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs sm:text-[13px] leading-relaxed"
                          >
                            <AlertTriangle size={15} className="shrink-0 mt-0.5 text-amber-500" />
                            <span>{trimmed}</span>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Official Links & Resources */}
                  {entry.url && (
                    <section className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                      <div className="flex items-center gap-2 mb-2.5">
                        <ExternalLink size={16} className="text-indigo-600 dark:text-indigo-400" />
                        <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                          Official Documentation & Registry
                        </h2>
                      </div>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-neutral-200/70 dark:border-white/[0.07] bg-neutral-50/80 dark:bg-[#121319] hover:bg-neutral-100 dark:hover:bg-[#161822] hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Globe size={15} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                          <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100 truncate">
                            {entry.url}
                          </span>
                        </div>
                        <ExternalLink size={13} className="text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
                      </a>
                    </section>
                  )}

                  {/* Research Citations */}
                  {entry.citations.length > 0 && (
                    <section className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                      <h2 className="text-sm font-bold text-neutral-900 dark:text-white mb-3">
                        Research Papers & Literature
                      </h2>
                      <div className="space-y-2">
                        {entry.citations.map((c, i) => (
                          <a
                            key={i}
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-neutral-200/70 dark:border-white/[0.07] bg-neutral-50/80 dark:bg-[#121319] hover:bg-neutral-100 dark:hover:bg-[#161822] hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span className="flex-1 text-xs text-neutral-700 dark:text-neutral-300">{c.text}</span>
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 dark:text-indigo-400 shrink-0" />
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
                  <section className="rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] overflow-hidden bg-white dark:bg-[#0c0d11]">
                    <div className="px-5 py-3 border-b border-neutral-200/80 dark:border-white/[0.08] text-xs font-bold uppercase tracking-wider bg-neutral-50 dark:bg-[#121319] text-neutral-800 dark:text-neutral-200">
                      Model Garden Technical Specification Sheet
                    </div>
                    <div className="divide-y divide-neutral-200/70 dark:divide-white/[0.06] text-xs">
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
                        <div key={label} className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white dark:bg-[#0c0d11]">
                          <span className="font-medium text-neutral-500 dark:text-neutral-400">
                            {label}
                          </span>
                          <span className="sm:col-span-2 font-semibold text-neutral-900 dark:text-white">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Benchmarks & Performance Metrics */}
                  <section className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <BarChart3 size={16} className="text-indigo-600 dark:text-indigo-400" />
                      <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                        Evaluation Benchmarks & Performance
                      </h2>
                    </div>
                    <div className="p-4 rounded-xl border border-neutral-200/70 dark:border-white/[0.07] bg-neutral-50/80 dark:bg-[#121319] text-xs leading-relaxed font-mono text-neutral-800 dark:text-neutral-200">
                      {entry.benchmarks}
                    </div>
                  </section>

                  {/* Side-by-Side Model Comparator */}
                  {compareCandidates.length > 0 && (
                    <section className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Sliders size={16} className="text-indigo-600 dark:text-indigo-400" />
                        <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                          Model Garden Comparator
                        </h2>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
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
                        <h2 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                          <Terminal size={15} className="text-indigo-600 dark:text-indigo-400" />
                          SDK Quickstart & Inference
                        </h2>
                      </div>

                      {/* Language Selector Tabs */}
                      <div className="flex items-center p-0.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-100 dark:bg-[#121319] text-xs">
                        {(["python", "javascript", "curl"] as CodeLang[]).map((lang) => {
                          const isLangActive = activeCodeLang === lang;
                          return (
                            <button
                              key={lang}
                              onClick={() => setActiveCodeLang(lang)}
                              className={`px-3 py-1 rounded-lg font-medium capitalize transition-all cursor-pointer ${
                                isLangActive
                                  ? "bg-white dark:bg-[#0c0d11] text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs"
                                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                              }`}
                            >
                              {lang === "javascript" ? "Node.js" : lang}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Code Container */}
                    <div className="rounded-2xl border border-neutral-800 dark:border-white/[0.08] overflow-hidden shadow-xs bg-[#090a0e]">
                      {/* Editor Toolbar */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#121319]">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                          </div>
                          <span className="text-[11px] font-mono font-medium ml-1.5 text-neutral-400">
                            {activeCodeLang === "python"
                              ? "quickstart.py"
                              : activeCodeLang === "javascript"
                              ? "quickstart.mjs"
                              : "request.sh"}
                          </span>
                        </div>

                        <button
                          onClick={handleCopyCode}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/[0.1] bg-[#0c0d11] text-xs font-medium text-neutral-300 hover:text-white transition-all cursor-pointer"
                        >
                          {copied ? <Check size={12} className="text-indigo-400" /> : <Copy size={12} />}
                          <span>{copied ? "Copied" : "Copy Code"}</span>
                        </button>
                      </div>

                      {/* Code body */}
                      <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed max-h-[380px] bg-[#090a0e] text-neutral-200">
                        <code>{codeSnippets[activeCodeLang]}</code>
                      </pre>
                    </div>
                  </section>

                  {/* Playground Launch Banner */}
                  <section className="p-5 rounded-2xl border border-indigo-200/80 dark:border-indigo-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-500/10 via-violet-500/5 to-transparent">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                        <Sparkles size={15} className="text-indigo-600 dark:text-indigo-400" />
                        Interactive Model Playground
                      </h3>
                      <p className="text-xs mt-0.5 text-neutral-600 dark:text-neutral-300">
                        Test model inference, compare outputs, and tune temperature live without installing anything.
                      </p>
                    </div>
                    {onOpenPlayground && (
                      <button
                        onClick={() => onOpenPlayground(entry.name)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 transition-all cursor-pointer shrink-0"
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
                <section className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                  <EntryFeedback
                    entryName={entry.name}
                    onRatingSummaryChange={onRatingSummaryChange}
                    onViewProfile={onViewProfile}
                  />
                </section>
              )}

              {/* Community Callout Banner for Unauthenticated Users */}
              {!user && (
                <div className="p-5 sm:p-6 rounded-2xl border border-indigo-200/80 dark:border-indigo-500/25 bg-gradient-to-r from-indigo-500/10 via-violet-500/5 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/20">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                        Join the AiVerse Community
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
                        Sign in to test models in the Playground, submit peer reviews, and bookmark assets to your profile.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => openAuthModal("signin")}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => openAuthModal("signup")}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 transition-colors cursor-pointer"
                    >
                      Create Free Account
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar (4 cols on desktop) */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="sticky top-28 space-y-4">
                {/* Card 1: Resource Information */}
                <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-indigo-600 dark:text-indigo-400" />
                    Resource Information
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-200/70 dark:border-white/[0.06]">
                      <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                        <Building2 size={13} /> Organization
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-white truncate">
                        {entry.org}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-200/70 dark:border-white/[0.06]">
                      <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                        <Layers size={13} /> Size / Parameters
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {entry.size && entry.size !== "N/A" && entry.size !== "Unknown" ? entry.size : "Not Applicable"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-200/70 dark:border-white/[0.06]">
                      <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                        <Sparkles size={13} /> Task
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {entry.task}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-200/70 dark:border-white/[0.06]">
                      <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                        <ShieldCheck size={13} /> License
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {entry.license}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-200/70 dark:border-white/[0.06]">
                      <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                        <Calendar size={13} /> Release Year
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {entry.year}
                      </span>
                    </div>

                    {onViewEcosystem && entry.org && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onViewEcosystem(entry.org);
                          }}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
                        >
                          <Building2 size={13} />
                          <span>View {entry.org} Ecosystem</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    )}

                    {entry.url && (
                      <div className="pt-1">
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200/80 dark:bg-[#121319] dark:hover:bg-white/[0.08] text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-white/[0.08] transition-colors"
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
                  <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Similar in Garden
                      </h3>
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
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
                            className="w-full text-left p-2.5 rounded-xl border border-neutral-200/70 dark:border-white/[0.06] bg-neutral-50/80 hover:bg-indigo-50/60 dark:bg-[#121319] dark:hover:bg-[#161822] hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center justify-between gap-1.5 mb-0.5">
                              <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                                {related.name}
                              </span>
                              {isRelatedNew && (
                                <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 shrink-0">
                                  NEW
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
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
      </div>
    );
};
