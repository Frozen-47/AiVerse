import { X } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useTokens } from "../lib/theme";

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
  description = "Create a free account to save your role and interests and get a catalog feed picked for you. Preferences stay synced to your account.",
}: PreferencesLoginPromptProps) {
  const t = useTokens();
  const { openAuthModal } = useAuth();

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl p-8 ${t.modal} ${t.border}`}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg border ${t.surface} ${t.border} ${t.textMuted}`}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${t.textMuted}`}>
          {label}
        </p>
        <h2 className={`text-xl font-black tracking-tight mb-2 ${t.textPrimary}`}>
          {title}
        </h2>
        <p className={`text-sm leading-relaxed mb-6 ${t.textSecondary}`}>
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              openAuthModal("signin");
            }}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm border ${t.surface} ${t.border} ${t.textPrimary}`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              openAuthModal("signup");
            }}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm bg-linear-to-r from-cyan-500 to-blue-500 text-white"
          >
            Create account
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className={`w-full mt-4 text-[12px] ${t.textMuted} hover:underline`}
        >
          Continue browsing without preferences
        </button>
      </div>
    </div>
  );
}
