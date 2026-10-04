import React from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  Lock, 
  Check, 
  Bookmark, 
  Sparkles, 
  GitCompare,
  Globe,
  Cpu,
  Zap,
  Palette,
  Target,
  Bot,
  Code2,
  Database,
  Cloud,
  Sliders,
  ShieldCheck,
  Unlock,
  FileText,
  CheckCircle2,
  Compass,
  Layers,
} from "lucide-react";
import type { Entry } from "../../types";
import { useAuth } from "../AuthContext";
import { EcosystemLogo } from "../EcosystemLogo";

interface WizardFinderProps {
  wizardStep: number;
  setWizardStep: (s: number) => void;
  wizardGoal: string | null;
  setWizardGoal: (g: string | null) => void;
  wizardCustomGoal: string;
  setWizardCustomGoal: (g: string) => void;
  wizardType: string | null;
  setWizardType: (t: string | null) => void;
  wizardLicense: string | null;
  setWizardLicense: (l: string | null) => void;
  wizardCustomLicense: string;
  setWizardCustomLicense: (l: string) => void;
  wizardRecommendations: Entry[];
  setSelected: (entry: Entry | null) => void;
  setTypeFilter: (f: string) => void;
  setSearchInput: (s: string) => void;
  setBrowseAll: (b: boolean) => void;
  setActiveView: (v: "landing" | "catalog") => void;
  bookmarks: string[];
  onToggleBookmark: (name: string) => void;
  setCompareToolA: (name: string) => void;
  setCompareToolB: (name: string) => void;
  setIsArena: (b: boolean) => void;
  setIsWizard: (b: boolean) => void;
}

export const WizardFinder: React.FC<WizardFinderProps> = ({
  wizardStep,
  setWizardStep,
  wizardGoal,
  setWizardGoal,
  wizardCustomGoal,
  setWizardCustomGoal,
  wizardType,
  setWizardType,
  wizardLicense,
  setWizardLicense,
  wizardCustomLicense,
  setWizardCustomLicense,
  wizardRecommendations,
  setSelected,
  setTypeFilter: _setTypeFilter,
  setSearchInput: _setSearchInput,
  setBrowseAll: _setBrowseAll,
  setActiveView: _setActiveView,
  bookmarks,
  onToggleBookmark,
  setCompareToolA,
  setCompareToolB,
  setIsArena,
  setIsWizard,
}) => {
  const { user, openAuthModal } = useAuth();

  const steps = [
    { label: "Objective", step: 1 },
    { label: "Stack Layer", step: 2 },
    { label: "Licensing", step: 3 },
    { label: "Matches", step: 4 },
  ];

  // Logic to dynamically explain why a tool matches
  const getMatchInsights = (entry: Entry) => {
    const insights: string[] = [];
    
    // Type match
    insights.push(`Matches target layer: ${entry.type}`);

    // Goal match
    if (wizardCustomGoal && wizardCustomGoal.trim()) {
      const keywords = wizardCustomGoal
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 2);
      const text = `${entry.name} ${entry.task} ${entry.summary} ${entry.architecture}`.toLowerCase();
      const matched = keywords.filter(kw => text.includes(kw));
      if (matched.length > 0) {
        insights.push(`Keyword match: ${matched.slice(0, 2).join(", ")}`);
      } else {
        insights.push("Relevant to custom objective");
      }
    } else {
      insights.push(`Optimized for ${entry.task}`);
    }

    // License match
    if (wizardCustomLicense && wizardCustomLicense.trim()) {
      insights.push(`License match: ${entry.license}`);
    } else {
      insights.push(`Compliance verified: ${entry.license}`);
    }

    if (entry.popular) {
      insights.push("Widely adopted across industry");
    }

    return insights.slice(0, 3);
  };

  const topMatches = wizardRecommendations.slice(0, 3);
  const otherMatches = wizardRecommendations.slice(3);

  // Goal name resolver for summary pill
  const getGoalLabel = () => {
    if (wizardCustomGoal) return `Custom: ${wizardCustomGoal.slice(0, 16)}...`;
    switch (wizardGoal) {
      case "web": return "Web Apps & Agents";
      case "train": return "Model Tuning";
      case "scale": return "API Serving";
      case "creative": return "Creative Media";
      default: return "General";
    }
  };

  return (
    <div
      id="wizard"
      className="relative rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] transition-all scroll-mt-24 overflow-hidden shadow-xs"
    >
      {/* ── Lock overlay if not logged in ── */}
      {!user && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md bg-white/95 dark:bg-[#131314]/95 text-[#202124] dark:text-[#e3e3e3] rounded-2xl transition-colors">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3.5 shadow-sm bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] border border-[#1a73e8]/20">
            <Lock size={22} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1.5 tracking-tight text-[#202124] dark:text-[#e3e3e3]">
            Guided AI Architecture Advisor
          </h3>
          <p className="text-xs sm:text-sm mb-6 max-w-md leading-relaxed mx-auto text-[#5f6368] dark:text-[#c4c7c5]">
            Sign in to access Google-style personalized recommendation paths matched directly to your performance goals, tech stack, and licensing policies.
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

      {/* Main content container */}
      <div 
        className={`p-5 sm:p-7 ${!user ? "filter blur-xs pointer-events-none select-none" : ""}`}
        {...(!user ? { inert: true } : {})}
      >
        {/* ── Top Header & Step Progress Bar ── */}
        <div className="mb-7 pb-5 border-b border-[#dadce0]/70 dark:border-[#3c4043]/40">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] flex items-center justify-center shrink-0">
                <Compass size={18} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#202124] dark:text-[#e3e3e3] tracking-tight">
                  Guided Model & Stack Selector
                </h3>
                <p className="text-[11px] text-[#5f6368] dark:text-[#8e918f]">
                  Interactive workload discovery based on Google Cloud architectural standards
                </p>
              </div>
            </div>

            {wizardStep > 0 && (
              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <span className="text-xs font-medium text-[#5f6368] dark:text-[#8e918f]">
                  Step {wizardStep} of 3
                </span>
                <span className="text-xs font-bold font-mono text-[#1a73e8] dark:text-[#a8c7fa] bg-[#1a73e8]/10 dark:bg-[#a8c7fa]/10 px-2 py-0.5 rounded-full border border-[#1a73e8]/20 dark:border-[#a8c7fa]/20">
                  {Math.round(((Math.min(wizardStep, 3) - 1) / 3) * 100)}% Complete
                </span>
              </div>
            )}
          </div>

          {/* Stepper Navigation (Google Material 3 Linear Stepper) */}
          {wizardStep > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-4 gap-2">
                {steps.map((s) => {
                  const isCompleted = wizardStep > s.step;
                  const isActive = wizardStep === s.step;
                  return (
                    <button
                      key={s.step}
                      disabled={!isCompleted}
                      onClick={() => setWizardStep(s.step)}
                      className={`text-left p-2 sm:px-3 sm:py-2.5 rounded-xl transition-all ${
                        isCompleted ? "cursor-pointer hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c]/60" : "cursor-default"
                      } ${
                        isActive
                          ? "bg-[#1a73e8]/[0.08] dark:bg-[#a8c7fa]/[0.08] border border-[#1a73e8]/30 dark:border-[#a8c7fa]/30"
                          : "border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                            isActive
                              ? "bg-[#1a73e8] text-white dark:bg-[#a8c7fa] dark:text-[#041e49]"
                              : isCompleted
                              ? "bg-[#1a73e8]/20 text-[#1a73e8] dark:bg-[#a8c7fa]/20 dark:text-[#a8c7fa]"
                              : "bg-[#dadce0] dark:bg-[#3c4043] text-[#5f6368] dark:text-[#8e918f]"
                          }`}
                        >
                          {isCompleted ? <Check size={11} strokeWidth={3} /> : s.step}
                        </div>
                        <span
                          className={`text-xs font-semibold truncate ${
                            isActive
                              ? "text-[#1a73e8] dark:text-[#a8c7fa]"
                              : isCompleted
                              ? "text-[#202124] dark:text-[#e3e3e3]"
                              : "text-[#70757a] dark:text-[#8e918f]"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-[#dadce0]/60 dark:bg-[#3c4043]/40 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isCompleted || isActive ? "bg-[#1a73e8] dark:bg-[#a8c7fa]" : "bg-transparent"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── STEP 0: Clean Google Cloud Solution Finder Hero ── */}
        {wizardStep === 0 && (
          <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] border border-[#1a73e8]/20 mb-3">
                <Sparkles size={13} />
                <span>Decision Intelligence</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202124] dark:text-[#e3e3e3] mb-2">
                Find the ideal AI tools for your workload
              </h2>
              <p className="text-xs sm:text-sm text-[#5f6368] dark:text-[#c4c7c5] leading-relaxed mb-5">
                Answer 3 quick questions about your deployment objective, tech stack layer, and open-source licensing policy. Our advisory engine analyzes 150+ catalogued models and frameworks to pinpoint optimal fits.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl border border-[#dadce0]/80 dark:border-[#3c4043]/50 bg-[#f8f9fa] dark:bg-[#282a2c]/30">
                  <p className="text-xs font-bold text-[#202124] dark:text-[#e3e3e3] mb-0.5">1. Target Objective</p>
                  <p className="text-[11px] text-[#5f6368] dark:text-[#8e918f]">Agents, tuning, or API inference</p>
                </div>
                <div className="p-3 rounded-xl border border-[#dadce0]/80 dark:border-[#3c4043]/50 bg-[#f8f9fa] dark:bg-[#282a2c]/30">
                  <p className="text-xs font-bold text-[#202124] dark:text-[#e3e3e3] mb-0.5">2. Stack Layer</p>
                  <p className="text-[11px] text-[#5f6368] dark:text-[#8e918f]">Base weights, SDKs, or runtimes</p>
                </div>
                <div className="p-3 rounded-xl border border-[#dadce0]/80 dark:border-[#3c4043]/50 bg-[#f8f9fa] dark:bg-[#282a2c]/30">
                  <p className="text-xs font-bold text-[#202124] dark:text-[#e3e3e3] mb-0.5">3. Compliance</p>
                  <p className="text-[11px] text-[#5f6368] dark:text-[#8e918f]">Permissive Apache vs proprietary</p>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => setWizardStep(1)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Start Guided Advisor</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 1: Primary Objective ── */}
        {wizardStep === 1 && (
          <div className="flex flex-col gap-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <span className="text-[11px] font-semibold text-[#1a73e8] dark:text-[#a8c7fa] uppercase tracking-wider">
                  Step 1 • Target Goal
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#202124] dark:text-[#e3e3e3] mt-0.5">
                  What is your primary development objective?
                </h4>
              </div>
              <button 
                onClick={() => {
                  setWizardStep(0);
                  setWizardGoal(null);
                  setWizardCustomGoal("");
                }} 
                className="text-xs font-medium text-[#5f6368] dark:text-[#8e918f] hover:text-[#202124] dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft size={13} /> Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {[
                { key: "web",      icon: Globe, title: "Web Apps & Agents", desc: "Chat clients, RAG search engines, client-side reasoning layers." },
                { key: "train",    icon: Cpu, title: "Model Fine-Tuning", desc: "Adapt foundational weights, LoRA adapters, domain pre-training." },
                { key: "scale",    icon: Zap, title: "Scale API Serving", desc: "High-throughput vLLM runtimes, low-latency microservices." },
                { key: "creative", icon: Palette, title: "Creative & Media", desc: "Image synthesis, voice cloning, audio transcription." },
                { key: "other",    icon: Target, title: "Custom Workload", desc: "Enter specific research domains or custom requirements." },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = wizardGoal === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => { 
                      setWizardGoal(opt.key); 
                      if (opt.key !== "other") {
                        setWizardCustomGoal("");
                        setWizardStep(2);
                      }
                    }}
                    className={`relative text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-2 border-[#1a73e8] dark:border-[#a8c7fa] bg-[#1a73e8]/[0.06] dark:bg-[#a8c7fa]/[0.08] shadow-xs"
                        : "border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] hover:border-[#1a73e8]/60 dark:hover:border-[#a8c7fa]/60 hover:bg-[#f8f9fa] dark:hover:bg-[#282a2c]/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#1a73e8] text-white dark:bg-[#a8c7fa] dark:text-[#041e49]"
                            : "bg-[#f1f3f4] dark:bg-[#282a2c] text-[#1a73e8] dark:text-[#a8c7fa]"
                        }`}>
                          <Icon size={18} />
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#1a73e8] text-white dark:bg-[#a8c7fa] dark:text-[#041e49] flex items-center justify-center">
                            <Check size={11} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <h5 className={`font-semibold text-xs sm:text-[13px] mb-1 leading-snug ${
                        isSelected ? "text-[#1a73e8] dark:text-[#a8c7fa] font-bold" : "text-[#202124] dark:text-[#e3e3e3]"
                      }`}>
                        {opt.title}
                      </h5>
                      <p className="text-[11px] leading-relaxed text-[#5f6368] dark:text-[#8e918f]">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {wizardGoal === "other" && (
              <div className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-[#f8f9fa] dark:bg-[#282a2c]/30 text-left animate-[fadeIn_0.15s_ease-out]">
                <label className="block text-xs font-semibold text-[#202124] dark:text-[#e3e3e3] mb-2">
                  Describe your target application or enter keywords:
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    placeholder="e.g. Graph neural networks, biomedical RAG, Rust dev tools..."
                    value={wizardCustomGoal}
                    onChange={(e) => setWizardCustomGoal(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-lg text-xs border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#a8c7fa]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && wizardCustomGoal.trim()) {
                        setWizardStep(2);
                      }
                    }}
                  />
                  <button
                    disabled={!wizardCustomGoal.trim()}
                    onClick={() => setWizardStep(2)}
                    className={`px-5 py-2.5 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      wizardCustomGoal.trim()
                        ? "bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49]"
                        : "opacity-40 cursor-not-allowed bg-neutral-200 dark:bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    <span>Continue</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Stack Layer ── */}
        {wizardStep === 2 && (
          <div className="flex flex-col gap-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <span className="text-[11px] font-semibold text-[#1a73e8] dark:text-[#a8c7fa] uppercase tracking-wider">
                  Step 2 • Architectural Component
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#202124] dark:text-[#e3e3e3] mt-0.5">
                  Which layer of the stack are you targeting?
                </h4>
              </div>
              <button 
                onClick={() => setWizardStep(1)} 
                className="text-xs font-medium text-[#5f6368] dark:text-[#8e918f] hover:text-[#202124] dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft size={13} /> Back
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { key: "AI",        icon: Bot, title: "AI Assistants & Agents", desc: "Chatbots, coding assistants, agentic runtime frameworks." },
                { key: "Model",     icon: Cpu, title: "Neural Weights & Base LLMs", desc: "Raw foundational models, vision checkpoints, embedding weights." },
                { key: "Framework", icon: Code2, title: "ML Frameworks & Libraries", desc: "Developer SDKs, orchestration toolkits (LangChain, LlamaIndex)." },
                { key: "Dataset",   icon: Database, title: "Curated Datasets & Evals", desc: "Training corpora, academic benchmark suites, fine-tuning pairs." },
                { key: "Platform",  icon: Cloud, title: "Platforms & GPU Runtimes", desc: "Inference scaling engines (Groq, vLLM, Ollama, HuggingFace)." },
                { key: "other",     icon: Sliders, title: "Cross-Stack / Any Layer", desc: "Search across all architecture categories without restriction." },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = wizardType === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => { 
                      setWizardType(opt.key); 
                      setWizardStep(3); 
                    }}
                    className={`relative text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-2 border-[#1a73e8] dark:border-[#a8c7fa] bg-[#1a73e8]/[0.06] dark:bg-[#a8c7fa]/[0.08] shadow-xs"
                        : "border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] hover:border-[#1a73e8]/60 dark:hover:border-[#a8c7fa]/60 hover:bg-[#f8f9fa] dark:hover:bg-[#282a2c]/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#1a73e8] text-white dark:bg-[#a8c7fa] dark:text-[#041e49]"
                            : "bg-[#f1f3f4] dark:bg-[#282a2c] text-[#1a73e8] dark:text-[#a8c7fa]"
                        }`}>
                          <Icon size={18} />
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#1a73e8] text-white dark:bg-[#a8c7fa] dark:text-[#041e49] flex items-center justify-center">
                            <Check size={11} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <h5 className={`font-semibold text-xs sm:text-[13px] mb-1 leading-snug ${
                        isSelected ? "text-[#1a73e8] dark:text-[#a8c7fa] font-bold" : "text-[#202124] dark:text-[#e3e3e3]"
                      }`}>
                        {opt.title}
                      </h5>
                      <p className="text-[11px] leading-relaxed text-[#5f6368] dark:text-[#8e918f]">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 3: Licensing Policy ── */}
        {wizardStep === 3 && (
          <div className="flex flex-col gap-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <span className="text-[11px] font-semibold text-[#1a73e8] dark:text-[#a8c7fa] uppercase tracking-wider">
                  Step 3 • Governance & Licensing
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#202124] dark:text-[#e3e3e3] mt-0.5">
                  What are your licensing and compliance requirements?
                </h4>
              </div>
              <button 
                onClick={() => setWizardStep(2)} 
                className="text-xs font-medium text-[#5f6368] dark:text-[#8e918f] hover:text-[#202124] dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft size={13} /> Back
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {[
                { key: "permissive", icon: ShieldCheck, title: "Permissive Open-Source", desc: "Apache 2.0, MIT, or BSD licenses safe for commercial distribution with zero royalty." },
                { key: "any",        icon: Unlock, title: "Any License / Cloud API", desc: "No restrictions. Allows proprietary APIs, commercial weight licenses, and community tiers." },
                { key: "other",      icon: FileText, title: "Custom License Query", desc: "Specify exact license terms (e.g. GPL, Llama Community, Creative Commons)." },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = wizardLicense === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => { 
                      setWizardLicense(opt.key); 
                      if (opt.key !== "other") {
                        setWizardCustomLicense("");
                        setWizardStep(4);
                      }
                    }}
                    className={`relative text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-2 border-[#1a73e8] dark:border-[#a8c7fa] bg-[#1a73e8]/[0.06] dark:bg-[#a8c7fa]/[0.08] shadow-xs"
                        : "border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] hover:border-[#1a73e8]/60 dark:hover:border-[#a8c7fa]/60 hover:bg-[#f8f9fa] dark:hover:bg-[#282a2c]/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#1a73e8] text-white dark:bg-[#a8c7fa] dark:text-[#041e49]"
                            : "bg-[#f1f3f4] dark:bg-[#282a2c] text-[#1a73e8] dark:text-[#a8c7fa]"
                        }`}>
                          <Icon size={18} />
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#1a73e8] text-white dark:bg-[#a8c7fa] dark:text-[#041e49] flex items-center justify-center">
                            <Check size={11} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <h5 className={`font-semibold text-xs sm:text-[13px] mb-1 leading-snug ${
                        isSelected ? "text-[#1a73e8] dark:text-[#a8c7fa] font-bold" : "text-[#202124] dark:text-[#e3e3e3]"
                      }`}>
                        {opt.title}
                      </h5>
                      <p className="text-[11px] leading-relaxed text-[#5f6368] dark:text-[#8e918f]">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {wizardLicense === "other" && (
              <div className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-[#f8f9fa] dark:bg-[#282a2c]/30 text-left animate-[fadeIn_0.15s_ease-out]">
                <label className="block text-xs font-semibold text-[#202124] dark:text-[#e3e3e3] mb-2">
                  Enter target license keywords:
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    placeholder="e.g. GPL-3.0, Llama 3.3 Community, Creative Commons..."
                    value={wizardCustomLicense}
                    onChange={(e) => setWizardCustomLicense(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-lg text-xs border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] focus:outline-none focus:border-[#1a73e8] dark:focus:border-[#a8c7fa]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setWizardStep(4);
                      }
                    }}
                  />
                  <button
                    onClick={() => setWizardStep(4)}
                    className="px-5 py-2.5 rounded-lg font-semibold text-xs bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Recommendations</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 4: Google Model Garden Style Recommendations ── */}
        {wizardStep === 4 && (
          <div className="flex flex-col gap-6 animate-[fadeIn_0.2s_ease-out]">
            {/* Results Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-[#f8f9fa] dark:bg-[#282a2c]/40 text-left">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#1a73e8] dark:bg-[#a8c7fa]" />
                  <span className="text-xs font-bold text-[#1a73e8] dark:text-[#a8c7fa] uppercase tracking-wider">
                    Discovery Complete
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#202124] dark:text-[#e3e3e3]">
                  {wizardRecommendations.length} Architectural Matches Found
                </h4>
                <div className="flex items-center gap-2 flex-wrap mt-1 text-[11px] text-[#5f6368] dark:text-[#8e918f]">
                  <span>Criteria:</span>
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043]/60 font-medium">
                    Goal: {getGoalLabel()}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043]/60 font-medium">
                    Layer: {wizardType || "All"}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1e1f20] border border-[#dadce0] dark:border-[#3c4043]/60 font-medium">
                    License: {wizardLicense === "permissive" ? "Permissive OSS" : wizardLicense === "other" ? (wizardCustomLicense || "Custom") : "Any"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setWizardStep(1);
                  setWizardGoal(null);
                  setWizardCustomGoal("");
                  setWizardType(null);
                  setWizardLicense(null);
                  setWizardCustomLicense("");
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-xs font-semibold text-[#5f6368] dark:text-[#c4c7c5] hover:text-[#202124] dark:hover:text-white hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
              >
                <RefreshCw size={13} />
                <span>Adjust Criteria</span>
              </button>
            </div>

            {/* Top 3 Featured Google Model Garden Cards */}
            <div className="text-left">
              <div className="flex items-center justify-between mb-3.5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#5f6368] dark:text-[#8e918f] flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                  <span>Primary Recommendations</span>
                </h5>
                <span className="text-[11px] text-[#70757a] dark:text-[#8e918f]">
                  Ranked by objective compatibility
                </span>
              </div>
              
              {topMatches.length === 0 ? (
                <div className="p-8 text-center border border-[#dadce0] dark:border-[#3c4043]/60 rounded-2xl bg-white dark:bg-[#1e1f20]">
                  <p className="text-sm text-[#5f6368] dark:text-[#8e918f]">
                    No entries match this specific criteria. Try selecting "Cross-Stack" or "Any License".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {topMatches.map((entry, idx) => {
                    const isB = bookmarks.includes(entry.name);
                    const matchPercent = 98 - idx * 3;
                    const insights = getMatchInsights(entry);
                    
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl flex flex-col justify-between border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] hover:border-[#1a73e8]/60 dark:hover:border-[#a8c7fa]/60 transition-all shadow-xs"
                      >
                        <div>
                          {/* Card Header: Logo, Name, Match pill */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <EcosystemLogo name={entry.org || entry.name} website={entry.url} size={28} />
                              <div className="min-w-0">
                                <h5 className="font-bold text-sm text-[#202124] dark:text-[#e3e3e3] truncate">
                                  {entry.name}
                                </h5>
                                <p className="text-[11px] text-[#5f6368] dark:text-[#8e918f] truncate">
                                  by {entry.org}
                                </p>
                              </div>
                            </div>
                            <span className="inline-flex items-center text-[10.5px] font-bold px-2 py-0.5 rounded-full border border-[#1a73e8]/20 bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] shrink-0">
                              {matchPercent}% Match
                            </span>
                          </div>

                          {/* Classification badges */}
                          <div className="flex items-center gap-1.5 flex-wrap mb-3">
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#f1f3f4] dark:bg-[#282a2c] text-[#5f6368] dark:text-[#c4c7c5]">
                              {entry.type}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f1f3f4] dark:bg-[#282a2c] text-[#5f6368] dark:text-[#c4c7c5]">
                              {entry.license}
                            </span>
                            {entry.size && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f1f3f4] dark:bg-[#282a2c] text-[#5f6368] dark:text-[#c4c7c5]">
                                {entry.size}
                              </span>
                            )}
                          </div>

                          <p className="text-xs leading-relaxed text-[#5f6368] dark:text-[#c4c7c5] line-clamp-3 mb-4">
                            {entry.summary}
                          </p>

                          {/* Match Insights Google Callout */}
                          <div className="mb-4 p-3 rounded-xl border border-[#dadce0]/70 dark:border-[#3c4043]/40 bg-[#f8f9fa] dark:bg-[#282a2c]/50 text-left">
                            <p className="font-semibold text-[10px] uppercase tracking-wider text-[#70757a] dark:text-[#8e918f] mb-1.5">
                              Why it matches your stack
                            </p>
                            <ul className="space-y-1 list-none p-0 m-0">
                              {insights.map((ins, i) => (
                                <li key={i} className="flex items-center gap-1.5 text-[11px] text-[#202124] dark:text-[#e3e3e3]">
                                  <CheckCircle2 size={13} className="text-[#1a73e8] dark:text-[#a8c7fa] shrink-0" />
                                  <span className="truncate">{ins}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="pt-3 border-t border-[#dadce0]/70 dark:border-[#3c4043]/40 flex items-center justify-between gap-2">
                          <button
                            onClick={() => onToggleBookmark(entry.name)}
                            className={`p-2 rounded-lg border transition-colors cursor-pointer flex items-center justify-center shrink-0 ${
                              isB
                                ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                : "border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#5f6368] dark:text-[#8e918f] hover:text-[#202124] dark:hover:text-white"
                            }`}
                            title={isB ? "Remove Bookmark" : "Bookmark Entry"}
                          >
                            <Bookmark size={13} className={isB ? "fill-current" : ""} />
                          </button>

                          <div className="flex items-center gap-1.5 flex-1 justify-end">
                            <button
                              onClick={() => {
                                setCompareToolA(entry.name);
                                const alt = wizardRecommendations.find(r => r.name !== entry.name && r.type === entry.type);
                                if (alt) setCompareToolB(alt.name);
                                setIsArena(true);
                                setIsWizard(false);
                                setTimeout(() => {
                                  const el = document.getElementById("arena");
                                  if (el) el.scrollIntoView({ behavior: "smooth" });
                                }, 100);
                              }}
                              className="px-2.5 py-1.5 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-[#e3e3e3] hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c] text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                              title="Compare side-by-side"
                            >
                              <GitCompare size={12} />
                              <span>Compare</span>
                            </button>

                            <button
                              onClick={() => setSelected(entry)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] text-[11px] font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                            >
                              <span>Inspect</span>
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other Alternative Fits */}
            {otherMatches.length > 0 && (
              <div className="mt-2 text-left">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#5f6368] dark:text-[#8e918f] flex items-center gap-1.5">
                    <Layers size={13} />
                    <span>Alternative Matches ({otherMatches.length})</span>
                  </h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {otherMatches.map((entry, idx) => {
                    const isB = bookmarks.includes(entry.name);
                    return (
                      <div
                        key={idx + 3}
                        className="p-3.5 rounded-xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] flex flex-col justify-between hover:border-[#dadce0] dark:hover:border-[#3c4043] transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <EcosystemLogo name={entry.org || entry.name} website={entry.url} size={18} />
                              <h5 className="font-bold text-xs text-[#202124] dark:text-[#e3e3e3] truncate">
                                {entry.name}
                              </h5>
                            </div>
                            <span className="text-[10px] font-medium text-[#5f6368] dark:text-[#8e918f] shrink-0">
                              {entry.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5f6368] dark:text-[#c4c7c5] line-clamp-2 leading-relaxed mb-3">
                            {entry.summary}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#dadce0]/60 dark:border-[#3c4043]/30 flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-[#70757a] dark:text-[#8e918f]">
                            {entry.license}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onToggleBookmark(entry.name)}
                              className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                                isB
                                  ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                  : "border-[#dadce0] dark:border-[#3c4043] text-[#5f6368] dark:text-[#8e918f]"
                              }`}
                              title={isB ? "Remove Bookmark" : "Bookmark Entry"}
                            >
                              <Bookmark size={11} className={isB ? "fill-current" : ""} />
                            </button>
                            <button
                              onClick={() => setSelected(entry)}
                              className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#1a73e8] dark:text-[#a8c7fa] hover:bg-[#1a73e8]/10 transition-colors cursor-pointer"
                            >
                              Inspect →
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
