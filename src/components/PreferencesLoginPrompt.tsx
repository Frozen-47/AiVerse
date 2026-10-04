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

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-7 overflow-hidden bg-white dark:bg-[#1e1f20] border-[#dadce0] dark:border-[#3c4043]"
        style={{
          boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#282a2c] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Google Sparkle Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] border border-[#1a73e8]/20 text-[11px] font-medium tracking-wide mb-3">
          <Sparkles size={12} className="fill-[#1a73e8] dark:fill-[#a8c7fa]" />
          <span>{label}</span>
        </div>

        {/* Title & Description */}
        <h2 className="text-xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
          {title}
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal mb-4">
          {description}
        </p>

        {/* Google-style Benefit Highlights */}
        <div className="space-y-2 mb-6 p-3 rounded-2xl bg-[#f8f9fa] dark:bg-[#282a2c]/60 border border-[#dadce0]/70 dark:border-[#3c4043]/60 text-xs text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] flex items-center justify-center shrink-0">
              <Check size={11} className="stroke-[2.5]" />
            </div>
            <span>Sync preferences & bookmarks across all devices</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] flex items-center justify-center shrink-0">
              <Check size={11} className="stroke-[2.5]" />
            </div>
            <span>Personalized AI model catalog recommendations</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] flex items-center justify-center shrink-0">
              <Check size={11} className="stroke-[2.5]" />
            </div>
            <span>Access Model Garden sandbox & interactive arena</span>
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
            className="flex-1 py-2.5 px-4 rounded-full border border-[#dadce0] dark:border-[#5f6368] hover:bg-[#f1f3f4] dark:hover:bg-[#303134] text-[#1a73e8] dark:text-[#a8c7fa] font-medium text-xs sm:text-sm transition-all cursor-pointer text-center"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              openAuthModal("signup");
            }}
            className="flex-1 py-2.5 px-4 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#041e49] font-medium text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98] cursor-pointer text-center"
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
