import React, { useState, useEffect } from "react";
import { useTokens } from "../lib/theme";
import { useUser } from "@clerk/clerk-react";
import { Sparkles, ArrowRight } from "lucide-react";

interface WelcomeOnboardingProps {
  onComplete: () => void;
}

export const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({ onComplete }) => {
  const t = useTokens();
  const { user } = useUser();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const email = user.primaryEmailAddress.emailAddress;
      // Extract prefix before @ and replace dots/underscores with spaces
      const prefix = email.split("@")[0].replace(/[._]/g, " ");
      
      // Capitalize first letter of each word
      const formattedName = prefix
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
        
      setName(formattedName);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !user) return;

    setIsUpdating(true);
    try {
      await user.update({
        firstName: name.trim(),
      });
      onComplete();
    } catch (err) {
      console.error("Failed to update user name:", err);
      // Even if it fails (unlikely), we should let them into the app
      onComplete();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className={`relative w-full max-w-md flex flex-col rounded-3xl border shadow-2xl ${t.modal} ${t.border} overflow-hidden`}>
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-linear-to-b from-blue-500/20 to-transparent pointer-events-none" />
        
        <div className="p-8">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          
          <h2 className={`text-2xl font-black tracking-tight mb-2 ${t.textPrimary}`}>
            Welcome to AiVerse
          </h2>
          <p className={`text-sm mb-8 ${t.textSecondary} leading-relaxed`}>
            Your account has been created securely. What should we call you?
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${t.textMuted}`}>
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl border font-medium outline-hidden transition-all ${t.surface} ${t.border} ${t.textPrimary} focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10`}
                autoFocus
                required
                maxLength={50}
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating || !name.trim()}
              className={`group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 mt-2 rounded-xl font-bold text-[15px] transition-all bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none active:scale-95`}
            >
              {isUpdating ? "Saving..." : "Continue to AiVerse"}
              {!isUpdating && (
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

