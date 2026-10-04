import React, { useState } from "react";
import { useAuth } from "../AuthContext";
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
      } catch (err: any) {
        setResponses((prev) => ({
          ...prev,
          [modelId]: {
            ...prev[modelId],
            loading: false,
            error: err.message || "An unexpected error occurred",
          },
        }));
      }
    });
  };

  const isAnyLoading = Object.values(responses).some((r) => r.loading);

  return (
    <div
      id="playground"
      className="relative rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] transition-all scroll-mt-24 overflow-hidden shadow-xs"
    >
      {/* ── Lock overlay if not logged in ── */}
      {!user && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md bg-white/95 dark:bg-[#131314]/95 text-[#202124] dark:text-[#e3e3e3] rounded-2xl transition-colors">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3.5 shadow-sm bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] border border-[#1a73e8]/20">
            <Lock size={22} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1.5 tracking-tight text-[#202124] dark:text-[#e3e3e3]">
            Google AI Studio Playground
          </h3>
          <p className="text-xs sm:text-sm mb-6 max-w-md leading-relaxed mx-auto text-[#5f6368] dark:text-[#c4c7c5]">
            Sign in to run real-time prompt inference across multiple open-weight models side-by-side with latency benchmarking.
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

      {/* Main content */}
      <div
        className={`p-5 sm:p-7 ${!user ? "filter blur-xs pointer-events-none select-none" : ""}`}
        {...(!user ? { inert: true } : {})}
      >
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#dadce0]/70 dark:border-[#3c4043]/40 text-left">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] flex items-center justify-center shrink-0">
                <Terminal size={17} />
              </div>
              <span className="text-xs font-bold text-[#1a73e8] dark:text-[#a8c7fa] uppercase tracking-wider">
                Google AI Studio Engine
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#202124] dark:text-[#e3e3e3]">
              Prompt Inference Sandbox
            </h3>
            <p className="text-xs text-[#5f6368] dark:text-[#8e918f] mt-0.5">
              Execute test prompts across multiple models simultaneously to compare output reasoning and latency
            </p>
          </div>

          {/* Quick Templates Dropdown */}
          <div className="relative self-start md:self-end">
            <button
              onClick={() => setOpenTemplates((prev) => !prev)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles size={13} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
              <span>Prompt Templates</span>
              <ChevronDown size={13} className={`text-[#70757a] transition-transform ${openTemplates ? "rotate-180" : ""}`} />
            </button>
            {openTemplates && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setOpenTemplates(false)}
                />
                <div className="absolute right-0 mt-1.5 w-64 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] p-1.5 z-30 shadow-xl">
                  <p className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 text-[#70757a] dark:text-[#8e918f]">
                    Select a Template
                  </p>
                  <ul className="space-y-0.5 list-none p-0 m-0">
                    {TEMPLATES.map((tpl, i) => (
                      <li key={i}>
                        <button
                          onClick={() => applyTemplate(tpl)}
                          className="w-full text-left px-2.5 py-2 text-xs font-medium rounded-lg text-[#202124] dark:text-[#e3e3e3] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-colors cursor-pointer"
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
          <div className="lg:col-span-4 space-y-4 text-left">
            {/* Model Selection Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#8e918f]">
                  Active Models (Select 1–3)
                </label>
                <span className="text-[10px] font-mono text-[#70757a] dark:text-[#8e918f]">
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
                          ? "border-[#1a73e8] dark:border-[#a8c7fa] bg-[#1a73e8]/[0.08] dark:bg-[#a8c7fa]/[0.08] text-[#1a73e8] dark:text-[#a8c7fa]"
                          : "border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#c4c7c5] hover:bg-[#f8f9fa] dark:hover:bg-[#282a2c]"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? "bg-[#1a73e8] dark:bg-[#a8c7fa]" : "bg-[#dadce0] dark:bg-[#3c4043]"}`} />
                        <span className="truncate">{model.label}</span>
                      </div>
                      <span
                        className={`text-[9.5px] uppercase font-mono px-1.5 py-0.2 rounded shrink-0 ${
                          isSelected
                            ? "bg-[#1a73e8]/20 text-[#1a73e8] dark:text-[#a8c7fa]"
                            : "bg-[#f1f3f4] dark:bg-[#282a2c] text-[#70757a] dark:text-[#8e918f]"
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
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5f6368] dark:text-[#8e918f]">
                  User Prompt
                </label>
                {prompt && (
                  <button
                    type="button"
                    onClick={() => setPrompt("")}
                    className="text-[11px] text-[#70757a] hover:text-red-500 transition-colors flex items-center gap-0.5 cursor-pointer"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#131314] text-[#202124] dark:text-[#e3e3e3] text-xs leading-relaxed resize-none outline-none focus:border-[#1a73e8] dark:focus:border-[#a8c7fa] transition-colors"
              />
            </div>

            {/* Advanced System Instructions (Collapsible) */}
            <div className="border border-[#dadce0] dark:border-[#3c4043]/60 rounded-xl overflow-hidden bg-[#f8f9fa] dark:bg-[#282a2c]/30">
              <button
                type="button"
                onClick={() => setShowAdvanced((prev) => !prev)}
                className="flex items-center justify-between w-full px-3.5 py-2.5 text-xs font-semibold text-[#202124] dark:text-[#e3e3e3] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sliders size={13} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                  <span>System Instructions</span>
                  {systemInstruction.trim() && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] dark:bg-[#a8c7fa]" />
                  )}
                </div>
                {showAdvanced ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>

              {showAdvanced && (
                <div className="p-3 border-t border-[#dadce0]/70 dark:border-[#3c4043]/40 space-y-2 animate-[fadeIn_0.15s_ease-out]">
                  <textarea
                    value={systemInstruction}
                    onChange={(e) => setSystemInstruction(e.target.value)}
                    placeholder="Instructions to enforce output style, persona, or JSON output rules..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] text-xs leading-relaxed resize-none outline-none focus:border-[#1a73e8] dark:focus:border-[#a8c7fa]"
                  />
                  <div className="flex items-start gap-1.5">
                    <Info size={11} className="mt-0.5 shrink-0 text-[#70757a]" />
                    <p className="text-[10.5px] leading-relaxed text-[#70757a] dark:text-[#8e918f]">
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-xs"
            >
              <Play size={13} fill="currentColor" />
              <span>{isAnyLoading ? "Running Inference..." : "Run Multi-Model Inference"}</span>
            </button>
          </div>

          {/* Results Comparison Grid (Right) */}
          <div className="lg:col-span-8">
            {Object.keys(responses).length === 0 ? (
              /* Idle state (pre-run) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-64">
                {selectedModels.map((modelId) => {
                  const mInfo = MODELS.find((m) => m.id === modelId);
                  return (
                    <div
                      key={modelId}
                      className="flex flex-col justify-between rounded-xl border border-[#dadce0] dark:border-[#3c4043]/60 p-5 text-left bg-[#f8f9fa] dark:bg-[#131314]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs sm:text-sm font-bold text-[#202124] dark:text-[#e3e3e3]">
                            {mInfo?.label || modelId}
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043] text-[#5f6368] dark:text-[#8e918f]">
                            {mInfo?.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[#5f6368] dark:text-[#8e918f]">
                          Ready for prompt execution
                        </p>
                      </div>
                      <div className="h-1.5 w-16 bg-[#dadce0] dark:bg-[#3c4043] rounded-full animate-pulse" />
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
                      className="flex flex-col rounded-xl border border-[#dadce0] dark:border-[#3c4043]/60 overflow-hidden text-left bg-white dark:bg-[#131314] shadow-xs"
                    >
                      {/* Column Header */}
                      <header className="px-4 py-3 border-b border-[#dadce0]/70 dark:border-[#3c4043]/40 bg-[#f8f9fa] dark:bg-[#282a2c]/40 flex items-center justify-between shrink-0">
                        <div className="min-w-0 pr-2">
                          <h4 className="text-xs sm:text-sm font-bold tracking-tight text-[#202124] dark:text-[#e3e3e3] truncate">
                            {resp.modelLabel}
                          </h4>
                          {resp.latencyMs !== null && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="inline-flex items-center gap-1 text-[10px] text-[#1a73e8] dark:text-[#a8c7fa] font-semibold bg-[#1a73e8]/10 px-1.5 py-0.2 rounded border border-[#1a73e8]/20">
                                <Clock size={10} />
                                {(resp.latencyMs / 1000).toFixed(2)}s
                              </span>
                              <span className="text-[10px] text-[#70757a] dark:text-[#8e918f]">
                                {resp.output.length} chars
                              </span>
                            </div>
                          )}
                        </div>

                        {resp.output && (
                          <button
                            type="button"
                            onClick={() => handleCopy(resp.output, modelId)}
                            className="p-1.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#c4c7c5] hover:text-[#202124] dark:hover:text-white transition-colors cursor-pointer shrink-0"
                            title="Copy response"
                          >
                            {copiedIndex === modelId ? (
                              <Check size={13} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
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
                            <div className="h-3.5 bg-[#f1f3f4] dark:bg-[#282a2c] rounded-md w-full" />
                            <div className="h-3.5 bg-[#f1f3f4] dark:bg-[#282a2c] rounded-md w-[85%]" />
                            <div className="h-3.5 bg-[#f1f3f4] dark:bg-[#282a2c] rounded-md w-[70%]" />
                          </div>
                        ) : resp.error ? (
                          <div className="p-3 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 text-xs">
                            {resp.error}
                          </div>
                        ) : (
                          <div className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed text-[#202124] dark:text-[#e3e3e3]">
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
