import { useEffect } from "react";
import { X, Sparkles, Check } from "lucide-react";
import { useAuth } from "./AuthContext";

interface PreferencesLoginPromptProps {
  onClose: () => void;
  label?: string;
  title?: string;
  description?: string;
}

export function PreferencesLoginPrompt({
  onClose,
  label = "Personal preferences",
  title = "Sign in to personalize AiVerse",
  description = "Create a free account to save your role and interests and get a catalog feed picked for you. Preferences stay synced across all your sessions.",
}: PreferencesLoginPromptProps) {
  const { openAuthModal } = useAuth();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-[fadeIn_0.15s_ease-out]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border shadow-2xl p-6 sm:p-7 overflow-hidden bg-white dark:bg-[#0d0e12] border-neutral-200/90 dark:border-white/[0.08]"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-xl flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Sparkle Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 text-[11px] font-semibold tracking-wide mb-3">
          <Sparkles size={12} />
          <span>{label}</span>
        </div>

        {/* Title & Description */}
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal mb-4">
          {description}
        </p>

        {/* Benefit Highlights */}
        <div className="space-y-2 mb-6 p-3.5 rounded-xl bg-neutral-50/80 dark:bg-[#121319] border border-neutral-200/80 dark:border-white/[0.08] text-xs text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Check size={11} className="stroke-[2.5]" />
            </div>
            <span>Sync preferences & bookmarks across all devices</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Check size={11} className="stroke-[2.5]" />
            </div>
            <span>Personalized AI model catalog recommendations</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Check size={11} className="stroke-[2.5]" />
            </div>
            <span>Access Control Plane sandbox & interactive arena</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              openAuthModal("signin");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] hover:bg-neutral-50 dark:hover:bg-white/[0.06] text-neutral-800 dark:text-neutral-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer text-center"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              openAuthModal("signup");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm shadow-indigo-500/20 active:scale-[0.98] cursor-pointer text-center"
          >
            Create free account
          </button>
        </div>

        {/* Guest link */}
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-3.5 text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300 font-normal transition-colors cursor-pointer text-center"
        >
          Continue browsing without preferences
        </button>
      </div>
    </div>
  );
}
