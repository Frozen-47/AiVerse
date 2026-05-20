import React from "react";
import { ArrowLeft, ArrowRight, HelpCircle, RefreshCw, Lock } from "lucide-react";
import { useTokens } from "../../lib/theme";
import type { Entry } from "../../types";
import { useAuth } from "../AuthContext";

interface WizardFinderProps {
  resolvedTheme: string;
  wizardStep: number;
  setWizardStep: (s: number) => void;
  setWizardGoal: (g: string | null) => void;
  setWizardType: (t: string | null) => void;
  setWizardLicense: (l: string | null) => void;
  wizardRecommendations: Entry[];
  setSelected: (entry: Entry | null) => void;
  setTypeFilter: (f: string) => void;
  setSearchInput: (s: string) => void;
  setBrowseAll: (b: boolean) => void;
  setActiveView: (v: "landing" | "catalog") => void;
}

export const WizardFinder: React.FC<WizardFinderProps> = ({
  resolvedTheme,
  wizardStep,
  setWizardStep,
  setWizardGoal,
  setWizardType,
  setWizardLicense,
  wizardRecommendations,
  setSelected,
  setTypeFilter,
  setSearchInput,
  setBrowseAll,
  setActiveView,
}) => {
  const t = useTokens();
  const { user, openAuthModal } = useAuth();

  const cardBase = `group text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
    resolvedTheme === "amoled"
      ? "bg-black border-white/4 hover:border-cyan-500/35 hover:bg-cyan-500/1"
      : "bg-white border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/10"
  }`;

  const badgeBase = `text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full border ${
    resolvedTheme === "amoled"
      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
      : "bg-cyan-55 border-cyan-200 text-cyan-700"
  }`;

  return (
    <div
      id="wizard"
      className={`relative p-6 sm:p-8 rounded-[28px] border backdrop-blur-md transition-all duration-300 scroll-mt-24 overflow-hidden ${
        resolvedTheme === "amoled"
          ? "bg-black border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)]"
          : "bg-white border-slate-200/50 shadow-md shadow-slate-100"
      }`}
    >
      {/* Lock overlay if not logged in */}
      {!user && (
        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[6px] transition-colors duration-200 ${
          resolvedTheme === "light" ? "bg-white/85" : "bg-black/85"
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/35 animate-bounce-slow">
            <Lock size={24} className="text-white" />
          </div>
          <h3 className={`text-xl font-bold mb-2 tracking-tight ${t.textPrimary}`}>Unlock Personalized AI Finder</h3>
          <p className={`text-[13px] mb-6 max-w-95 leading-relaxed mx-auto ${t.textSecondary}`}>
            Sign in to answer our interactive discovery quiz and get custom asset recommendations matched specifically to your development stack and licensing policies.
          </p>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openAuthModal("signin")}
              className={`${t.btnSecondary} px-5 py-2.5 rounded-xl font-medium text-sm transition-all border cursor-pointer`}
            >
              Login
            </button>
            <button 
              onClick={() => openAuthModal("signup")}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>
      )}

      {/* Main content which is blurred/inert if not logged in */}
      <div 
        className={!user ? "filter blur-xs pointer-events-none select-none" : ""}
        {...(!user ? { inert: true } : {})}
      >
      {/* Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className={badgeBase}>Discovery Wizard</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      </div>

      {/* Step 0 — Intro */}
      {wizardStep === 0 && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className={`text-xl font-bold tracking-tight mb-2 ${t.textPrimary}`}>
              Personalized AI Finder
            </h3>
            <p className={`text-[13px] leading-relaxed max-w-2xl font-light ${t.textSecondary}`}>
              Answer three quick questions about your development targets, preferred integration layers, and open-source policies to identify the absolute best matches from our registry of 150+ high-fidelity AI tools.
            </p>
          </div>
          <button
            onClick={() => setWizardStep(1)}
            className={`px-5 py-3 rounded-xl font-bold text-[13px] tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              resolvedTheme === "amoled"
                ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/25 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                : "bg-cyan-600 text-white hover:bg-cyan-700"
            }`}
          >
            <HelpCircle size={15} />
            Launch AI Finder
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Step 1 — Goal */}
      {wizardStep === 1 && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-dashed border-slate-200/40 dark:border-white/4 pb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-500">Step 1 of 3</span>
              <h4 className={`text-base font-bold ${t.textPrimary}`}>What is your primary development objective?</h4>
            </div>
            <button onClick={() => setWizardStep(0)} className={`text-[11px] font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer ${t.textMuted}`}>
              <ArrowLeft size={12} /> Cancel
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: "web",      icon: "🌐", title: "Build Web Apps",           desc: "Integrate intelligent chat clients, semantic vector search, or coding runtimes." },
              { key: "train",    icon: "🧠", title: "Model Training & Tuning",  desc: "Fine-tune foundational weights, optimize parameters, and compile benchmark suites." },
              { key: "scale",    icon: "⚡", title: "Scale API Serving",         desc: "Deploy high-performance GPU serving runtimes, platforms, and vector store indices." },
              { key: "creative", icon: "🎨", title: "Creative & Visual Media",  desc: "Generate text-to-image artwork, full videos, speech/audio synthesis, and vision masks." },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setWizardGoal(opt.key); setWizardStep(2); }}
                className={cardBase}
              >
                <span className="text-2xl mb-2.5 block">{opt.icon}</span>
                <h5 className={`font-bold text-[13px] mb-1 group-hover:text-cyan-500 transition-colors ${t.textPrimary}`}>{opt.title}</h5>
                <p className={`text-[11px] leading-normal font-light ${t.textMuted}`}>{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Stack layer */}
      {wizardStep === 2 && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-dashed border-slate-200/40 dark:border-white/4 pb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-500">Step 2 of 3</span>
              <h4 className={`text-base font-bold ${t.textPrimary}`}>Which layer of the stack are you targeting?</h4>
            </div>
            <button onClick={() => setWizardStep(1)} className={`text-[11px] font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer ${t.textMuted}`}>
              <ArrowLeft size={12} /> Back
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: "AI",        icon: "🤖", title: "AI Assistants & Agents",     desc: "Prebuilt chatbots, coding copilots, and intelligent user interface clients." },
              { key: "Model",     icon: "🔮", title: "Neural Weights & Models",     desc: "Raw base weights, checkpoints, instruction configs, and foundational LLMs." },
              { key: "Framework", icon: "⚙️", title: "ML Frameworks & Libraries",  desc: "MLOPs toolkits, pipelines, Deep Learning libraries, and serving tools." },
              { key: "Dataset",   icon: "🛡️", title: "Curated Datasets",           desc: "Evaluation suites, fine-tuning training corpora, and academic benchmarks." },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setWizardType(opt.key); setWizardStep(3); }}
                className={cardBase}
              >
                <span className="text-2xl mb-2.5 block">{opt.icon}</span>
                <h5 className={`font-bold text-[13px] mb-1 group-hover:text-cyan-500 transition-colors ${t.textPrimary}`}>{opt.title}</h5>
                <p className={`text-[11px] leading-normal font-light ${t.textMuted}`}>{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — License */}
      {wizardStep === 3 && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-dashed border-slate-200/40 dark:border-white/4 pb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-500">Step 3 of 3</span>
              <h4 className={`text-base font-bold ${t.textPrimary}`}>What is your licensing policy requirements?</h4>
            </div>
            <button onClick={() => setWizardStep(2)} className={`text-[11px] font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer ${t.textMuted}`}>
              <ArrowLeft size={12} /> Back
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "permissive", icon: "🛡️", title: "Permissive Open-Source Only", desc: "Strictly MIT, Apache 2.0, or BSD licenses that are risk-free for large commercial deployments." },
              { key: "any",        icon: "🔓", title: "Any License / Proprietary API", desc: "Allows open weights with usage clauses, commercial licenses, or closed paid SaaS developer APIs." },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setWizardLicense(opt.key); setWizardStep(4); }}
                className={`${cardBase} p-5`}
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="text-2xl">{opt.icon}</span>
                  <h5 className={`font-bold text-[14px] group-hover:text-cyan-500 transition-colors ${t.textPrimary}`}>{opt.title}</h5>
                </div>
                <p className={`text-[11px] leading-normal font-light ${t.textMuted}`}>{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 — Results */}
      {wizardStep === 4 && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-dashed border-slate-200/40 dark:border-white/4 pb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-500">Quiz Completed</span>
              <h4 className={`text-base font-bold ${t.textPrimary}`}>Your Ideal AI Assets Recommended:</h4>
            </div>
            <button
              onClick={() => { setWizardStep(0); setWizardGoal(null); setWizardType(null); setWizardLicense(null); }}
              className="text-[11px] font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity text-cyan-500 cursor-pointer"
            >
              <RefreshCw size={12} className="animate-spin-slow" /> Reset Finder Quiz
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {wizardRecommendations.map((entry, idx) => (
              <div
                key={idx}
                className={`relative p-5 rounded-xl border flex flex-col transition-all duration-300 ${
                  resolvedTheme === "amoled"
                    ? "bg-white/1 border-white/5 shadow-[0_0_15px_rgba(6,182,212,0.03)] hover:border-cyan-500/30"
                    : "bg-white border-slate-200 shadow-sm hover:border-cyan-400"
                }`}
              >
                <div className="absolute top-4 right-4">
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                      resolvedTheme === "amoled"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.1)]"
                        : "bg-emerald-50 border-emerald-200 text-emerald-700"
                    }`}
                  >
                    {99 - idx * 2}% Match
                  </span>
                </div>

                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 w-fit rounded-md border mb-2.5 ${
                    resolvedTheme === "amoled"
                      ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                      : "bg-cyan-50 border-cyan-200 text-cyan-700"
                  }`}
                >
                  {entry.type}
                </span>

                <h5 className={`font-bold text-[14px] mb-0.5 ${t.textPrimary}`}>{entry.name}</h5>
                <span className={`text-[10px] ${t.textMuted} mb-3.5`}>by {entry.org}</span>
                <p className={`text-[11px] leading-relaxed font-light mb-4 line-clamp-2 ${t.textSecondary}`}>{entry.summary}</p>

                <div className="mt-auto pt-3 border-t border-dashed border-slate-200/40 dark:border-white/4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-cyan-500">{entry.license}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelected(entry)}
                      className={`text-[9px] font-extrabold uppercase px-2 py-1 rounded-md border cursor-pointer transition-colors ${
                        resolvedTheme === "amoled"
                          ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400"
                          : "bg-cyan-55 border-cyan-200 text-cyan-700 hover:bg-cyan-100 hover:border-cyan-300"
                      }`}
                    >
                      Specs
                    </button>
                    <button
                      onClick={() => {
                        setTypeFilter(entry.type);
                        setSearchInput(entry.name);
                        setBrowseAll(true);
                        setActiveView("catalog");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-[9px] font-extrabold uppercase px-2 py-1 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer"
                    >
                      View Decks
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
