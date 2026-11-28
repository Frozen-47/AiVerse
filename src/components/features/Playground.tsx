import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { getSessionTurnstileToken } from "../../lib/turnstile";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Lock,
  Play,
  ChevronDown,
  ChevronUp,
  Check,
  Copy,
  Clock,
  Sparkles,
  Info,
  Trash2,
  Terminal,
  Sliders,
} from "lucide-react";

interface ModelResponse {
  modelId: string;
  modelLabel: string;
  output: string;
  loading: boolean;
  error: string | null;
  latencyMs: number | null;
}

const MODELS = [
  { id: "openai/gpt-oss-20b", label: "GPT OSS 20B", badge: "Fast Inference", org: "OpenAI OSS" },
  { id: "openai/gpt-oss-120b", label: "GPT OSS 120B", badge: "High Accuracy", org: "OpenAI OSS" },
  { id: "qwen/qwen3.6-27b", label: "Qwen 3.6 27B", badge: "Reasoning", org: "Alibaba" },
  { id: "groq/compound", label: "Groq Compound", badge: "LPU Engine", org: "Groq" },
];

const TEMPLATES = [
  {
    title: "Refactor & Explain Code",
    system: "You are an expert software engineer. Refactor the provided code to be concise and performant, then explain the changes.",
    prompt: "function bubbleSort(arr) {\n  let len = arr.length;\n  for (let i = 0; i < len; i++) {\n    for (let j = 0; j < len - 1 - i; j++) {\n      if (arr[j] > arr[j + 1]) {\n        let temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  return arr;\n}",
  },
  {
    title: "SQL Query to English",
    system: "You are a database administrator. Translate the SQL query into plain English, step by step.",
    prompt: "SELECT u.id, u.username, COUNT(b.id) AS total_bookmarks\nFROM users u\nLEFT JOIN user_bookmarks b ON u.user_key = b.user_key\nWHERE b.created_at > NOW() - INTERVAL '30 days'\nGROUP BY u.id, u.username\nHAVING COUNT(b.id) > 5\nORDER BY total_bookmarks DESC;",
  },
  {
    title: "Generate Structured JSON",
    system: "You are a structured data generator. Return ONLY a valid JSON array of objects. Do not include any explanation or extra text. Each object must have fields: 'name', 'developer', and 'primaryUse'.",
    prompt: "Create JSON data for the 3 most popular machine learning frameworks.",
  },
  {
    title: "AI Model Comparison",
    system: "You are an AI research consultant. Compare PyTorch and TensorFlow in terms of debugging experience, production deployment, and community adoption.",
    prompt: "Provide a brief comparative summary of PyTorch and TensorFlow.",
  },
];

export const Playground: React.FC = () => {
  const { user, openAuthModal } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [systemInstruction, setSystemInstruction] = useState("");
  const [selectedModels, setSelectedModels] = useState<string[]>([
    "openai/gpt-oss-20b",
    "openai/gpt-oss-120b",
  ]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [openTemplates, setOpenTemplates] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const [responses, setResponses] = useState<Record<string, ModelResponse>>({});

  const toggleModel = (id: string) => {
    setSelectedModels((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((m) => m !== id);
      } else {
        if (prev.length === 3) return prev;
        return [...prev, id];
      }
    });
  };

  const applyTemplate = (tpl: typeof TEMPLATES[number]) => {
    setSystemInstruction(tpl.system);
    setPrompt(tpl.prompt);
    setOpenTemplates(false);
  };

  const handleCopy = (text: string, modelId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(modelId);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleRun = async () => {
    if (!prompt.trim()) return;

    // Reset and initialize response states for the selected models
    const initialResponses: Record<string, ModelResponse> = {};
    selectedModels.forEach((modelId) => {
      const modelInfo = MODELS.find((m) => m.id === modelId);
      initialResponses[modelId] = {
        modelId,
        modelLabel: modelInfo?.label || modelId,
        output: "",
        loading: true,
        error: null,
        latencyMs: null,
      };
    });
    setResponses(initialResponses);

    // Call API for each selected model concurrently
    selectedModels.forEach(async (modelId) => {
      const startTime = performance.now();
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: prompt }],
            model: modelId,
            systemInstruction: systemInstruction.trim() || undefined,
            turnstileToken: getSessionTurnstileToken() || undefined,
          }),
        });

        const endTime = performance.now();
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.content || data.error || "Failed to generate response");
        }

        setResponses((prev) => ({
          ...prev,
          [modelId]: {
            ...prev[modelId],
            loading: false,
            output: data.content,
            latencyMs: Math.round(endTime - startTime),
          },
        }));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred";
        setResponses((prev) => ({
          ...prev,
          [modelId]: {
            ...prev[modelId],
            loading: false,
            error: message,
          },
        }));
      }
    });
  };

  const isAnyLoading = Object.values(responses).some((r) => r.loading);

  return (
    <div
      id="playground"
      className="relative rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] text-neutral-900 dark:text-neutral-100 transition-all scroll-mt-24 overflow-hidden shadow-xs"
    >
      {/* ── Lock overlay if not logged in ── */}
      {!user && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md bg-white/95 dark:bg-[#090a0e]/95 text-neutral-900 dark:text-white rounded-2xl transition-colors">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3.5 shadow-sm bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Lock size={22} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1.5 tracking-tight text-neutral-900 dark:text-white">
            AiVerse Inference Playground
          </h3>
          <p className="text-xs sm:text-sm mb-6 max-w-md leading-relaxed mx-auto text-neutral-600 dark:text-neutral-300">
            Sign in to run real-time prompt inference across multiple open-weight models side-by-side with latency benchmarking.
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

      {/* Main content */}
      <div
        className={`p-5 sm:p-7 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] ${!user ? "filter blur-xs pointer-events-none select-none" : ""}`}
        {...(!user ? { inert: true } : {})}
      >
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-neutral-200/70 dark:border-white/[0.06] text-left">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Terminal size={17} />
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Control Plane Inference Engine
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Prompt Inference Sandbox
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Execute test prompts across multiple models simultaneously to compare output reasoning and latency
            </p>
          </div>

          {/* Quick Templates Dropdown */}
          <div className="relative self-start md:self-end">
            <button
              onClick={() => setOpenTemplates((prev) => !prev)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/[0.06] transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles size={13} className="text-indigo-600 dark:text-indigo-400" />
              <span>Prompt Templates</span>
              <ChevronDown size={13} className={`text-neutral-400 transition-transform ${openTemplates ? "rotate-180" : ""}`} />
            </button>
            {openTemplates && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setOpenTemplates(false)}
                />
                <div className="absolute right-0 mt-1.5 w-64 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#0d0e12] p-1.5 z-30 shadow-2xl">
                  <p className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 text-neutral-400 dark:text-neutral-500">
                    Select a Template
                  </p>
                  <ul className="space-y-0.5 list-none p-0 m-0">
                    {TEMPLATES.map((tpl, i) => (
                      <li key={i}>
                        <button
                          onClick={() => applyTemplate(tpl)}
                          className="w-full text-left px-2.5 py-2 text-xs font-medium rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                        >
                          {tpl.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Input Configuration & Execution Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4 text-left">
            {/* Model Selection Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Active Models (Select 1–3)
                </label>
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                  {selectedModels.length}/3 Selected
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {MODELS.map((model) => {
                  const isSelected = selectedModels.includes(model.id);
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => toggleModel(model.id)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl border text-xs font-semibold text-left cursor-pointer transition-colors ${
                        isSelected
                          ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                          : "border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-[#121319] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? "bg-indigo-500 dark:bg-indigo-400" : "bg-neutral-300 dark:bg-neutral-700"}`} />
                        <span className="truncate">{model.label}</span>
                      </div>
                      <span
                        className={`text-[9.5px] uppercase font-mono px-1.5 py-0.5 rounded shrink-0 ${
                          isSelected
                            ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-300"
                            : "bg-white dark:bg-[#0c0d11] text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        {model.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prompt Input Box */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  User Prompt
                </label>
                {prompt && (
                  <button
                    type="button"
                    onClick={() => setPrompt("")}
                    className="text-[11px] text-neutral-400 hover:text-rose-500 transition-colors flex items-center gap-0.5 cursor-pointer"
                  >
                    <Trash2 size={11} /> Clear
                  </button>
                )}
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt to test across selected models..."
                rows={5}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] text-neutral-900 dark:text-white text-xs leading-relaxed resize-none outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors"
              />
            </div>

            {/* Advanced System Instructions (Collapsible) */}
            <div className="border border-neutral-200/80 dark:border-white/[0.08] rounded-xl overflow-hidden bg-neutral-50/70 dark:bg-[#121319]">
              <button
                type="button"
                onClick={() => setShowAdvanced((prev) => !prev)}
                className="flex items-center justify-between w-full px-3.5 py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sliders size={13} className="text-indigo-600 dark:text-indigo-400" />
                  <span>System Instructions</span>
                  {systemInstruction.trim() && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  )}
                </div>
                {showAdvanced ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>

              {showAdvanced && (
                <div className="p-3 border-t border-neutral-200/70 dark:border-white/[0.06] space-y-2 animate-[fadeIn_0.15s_ease-out]">
                  <textarea
                    value={systemInstruction}
                    onChange={(e) => setSystemInstruction(e.target.value)}
                    placeholder="Instructions to enforce output style, persona, or JSON output rules..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#090a0e] text-neutral-900 dark:text-white text-xs leading-relaxed resize-none outline-none focus:border-indigo-500"
                  />
                  <div className="flex items-start gap-1.5">
                    <Info size={11} className="mt-0.5 shrink-0 text-neutral-400" />
                    <p className="text-[10.5px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                      System prompts guide model tone and constraints before processing the user query.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Run Inference Button */}
            <button
              type="button"
              onClick={handleRun}
              disabled={!prompt.trim() || selectedModels.length === 0 || isAnyLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-sm shadow-indigo-500/20"
            >
              <Play size={13} fill="currentColor" />
              <span>{isAnyLoading ? "Running Inference..." : "Run Multi-Model Inference"}</span>
            </button>
          </div>

          {/* Results Comparison Grid (Right) */}
          <div className="lg:col-span-8 xl:col-span-9">
            {Object.keys(responses).length === 0 ? (
              /* Idle state (pre-run) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-64">
                {selectedModels.map((modelId) => {
                  const mInfo = MODELS.find((m) => m.id === modelId);
                  return (
                    <div
                      key={modelId}
                      className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] p-5 text-left bg-neutral-50/80 dark:bg-[#121319]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                            {mInfo?.label || modelId}
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#0c0d11] border border-neutral-200/80 dark:border-white/[0.08] text-neutral-500 dark:text-neutral-400">
                            {mInfo?.badge}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Ready for prompt execution
                        </p>
                      </div>
                      <div className="h-1.5 w-16 bg-indigo-500/25 rounded-full animate-pulse" />
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Execution output grid */
              <div
                className="grid gap-4 h-full"
                style={{
                  gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
                }}
              >
                {selectedModels.map((modelId) => {
                  const resp = responses[modelId];
                  if (!resp) return null;

                  return (
                    <div
                      key={modelId}
                      className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] overflow-hidden text-left bg-white dark:bg-[#090a0e] shadow-xs"
                    >
                      {/* Column Header */}
                      <header className="px-4 py-3 border-b border-neutral-200/70 dark:border-white/[0.06] bg-neutral-50 dark:bg-[#121319] flex items-center justify-between shrink-0">
                        <div className="min-w-0 pr-2">
                          <h4 className="text-xs sm:text-sm font-bold tracking-tight text-neutral-900 dark:text-white truncate">
                            {resp.modelLabel}
                          </h4>
                          {resp.latencyMs !== null && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="inline-flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-300 font-semibold bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                                <Clock size={10} />
                                {(resp.latencyMs / 1000).toFixed(2)}s
                              </span>
                              <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                                {resp.output.length} chars
                              </span>
                            </div>
                          )}
                        </div>

                        {resp.output && (
                          <button
                            type="button"
                            onClick={() => handleCopy(resp.output, modelId)}
                            className="p-1.5 rounded-lg border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                            title="Copy response"
                          >
                            {copiedIndex === modelId ? (
                              <Check size={13} className="text-indigo-500 dark:text-indigo-400" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        )}
                      </header>

                      {/* Column Body / Output */}
                      <div className="p-4 flex-1 overflow-y-auto max-h-125 min-h-64 no-scrollbar">
                        {resp.loading ? (
                          <div className="space-y-3 animate-pulse">
                            <div className="h-3.5 bg-neutral-100 dark:bg-white/[0.06] rounded-md w-full" />
                            <div className="h-3.5 bg-neutral-100 dark:bg-white/[0.06] rounded-md w-[85%]" />
                            <div className="h-3.5 bg-neutral-100 dark:bg-white/[0.06] rounded-md w-[70%]" />
                          </div>
                        ) : resp.error ? (
                          <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-500/25 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs">
                            {resp.error}
                          </div>
                        ) : (
                          <div className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {resp.output}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
