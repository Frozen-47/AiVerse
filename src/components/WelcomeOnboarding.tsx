import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTokens } from "../lib/theme";
import { useAuth } from "./AuthContext";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { Logo } from "./Logo";
import {
  onboardingOptions,
  type OnboardingInterest,
  type OnboardingProfile,
  type ReferralSource,
  type UserRole,
} from "../lib/onboarding";

interface WelcomeOnboardingProps {
  onComplete: (
    profile: OnboardingProfile,
    meta?: {
      displayName?: string;
      username?: string;
      description?: string;
      github?: string;
      linkedin?: string;
      medium?: string;
      devto?: string;
      portfolio?: string;
    }
  ) => void;
  isGuest?: boolean;
  mode?: "welcome" | "edit";
  initialProfile?: OnboardingProfile | null;
  onClose?: () => void;
}

const ALL_STEPS = ["name", "profile", "role", "interests", "referral"] as const;
type Step = (typeof ALL_STEPS)[number];

const usernameRegex = /^@[a-zA-Z0-9_-]+$/;

const GithubLogo = () => (
  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinLogo = () => (
  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#0a66c2] transition-colors" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const MediumLogo = () => (
  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm3.04 0c0 3.24-.32 5.87-.71 5.87s-.72-2.63-.72-5.87.32-5.87.72-5.87.71 2.63.71 5.87z"/>
  </svg>
);

const DevToLogo = () => (
  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" viewBox="0 0 448 512" fill="currentColor">
    <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM304.14 0H43.86C19.63 0 0 19.63 0 43.86v424.28C0 492.37 19.63 512 43.86 512h360.28c24.23 0 43.86-19.63 43.86-43.86V43.86C448 19.63 428.37 0 304.14 0zM151.05 311.77c0 12.18-4.85 21.78-14.55 28.8-9.7 7.03-22.66 10.54-38.89 10.54H62.22V175.12h35.39c16.23 0 29.19 3.51 38.89 10.54 9.7 7.03 14.55 16.62 14.55 28.8v97.31zm102.3-120.87h-64.44v45.48h51.38v28.29h-51.38v46.12h64.44v28.31H158.46V162.5h94.89v28.4zm102.3 124.36c0 18.28-5.97 32.5-17.9 42.66-11.93 10.16-28.31 15.24-49.13 15.24-20.82 0-37.2-5.08-49.13-15.24-11.93-10.16-17.9-24.38-17.9-42.66v-96.1h32.93v95.82c0 9.57 2.74 16.8 8.22 21.68 5.48 4.88 13.78 7.32 24.89 7.32s19.41-2.44 24.89-7.32c5.48-4.88 8.22-12.11 8.22-21.68v-95.82h32.93v96.1z"/>
  </svg>
);

const PortfolioLogo = () => (
  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({
  onComplete,
  isGuest = false,
  mode = "welcome",
  initialProfile = null,
  onClose,
}) => {
  const t = useTokens();
  const { user } = useAuth();
  const isEdit = mode === "edit";

  const steps = useMemo<Step[]>(() => {
    if (isEdit) return ["profile", "role", "interests", "referral"];
    if (isGuest) return ["role", "interests", "referral"];
    return [...ALL_STEPS];
  }, [isEdit, isGuest]);

  const parsedPrefs = useMemo(() => {
    if (!initialProfile?.referralSource) return null;
    try {
      return JSON.parse(initialProfile.referralSource);
    } catch {
      return null;
    }
  }, [initialProfile?.referralSource]);

  const [step, setStep] = useState<Step>(steps[0]);
  const [name, setName] = useState((user?.user_metadata?.firstName as string) ?? parsedPrefs?.displayName ?? "");
  const [username, setUsername] = useState((user?.user_metadata?.username as string) ?? parsedPrefs?.username ?? "");
  const [description, setDescription] = useState((user?.user_metadata?.description as string) ?? parsedPrefs?.description ?? "");
  const [github, setGithub] = useState((user?.user_metadata?.github as string) ?? parsedPrefs?.github ?? "");
  const [linkedin, setLinkedin] = useState((user?.user_metadata?.linkedin as string) ?? parsedPrefs?.linkedin ?? "");
  const [medium, setMedium] = useState((user?.user_metadata?.medium as string) ?? parsedPrefs?.medium ?? "");
  const [devto, setDevto] = useState((user?.user_metadata?.devto as string) ?? parsedPrefs?.devto ?? "");
  const [portfolio, setPortfolio] = useState((user?.user_metadata?.portfolio as string) ?? parsedPrefs?.portfolio ?? "");
  const [role, setRole] = useState<UserRole | null>(initialProfile?.role ?? null);
  const [interests, setInterests] = useState<OnboardingInterest[]>(
    initialProfile?.interests ?? [],
  );
  const [referralSource, setReferralSource] = useState<ReferralSource | null>(() => {
    if (initialProfile?.referralSource) {
      try {
        const parsed = JSON.parse(initialProfile.referralSource);
        return parsed?.source ?? initialProfile.referralSource as ReferralSource;
      } catch {
        return initialProfile.referralSource as ReferralSource;
      }
    }
    return null;
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const hasInitializedRef = useRef(false);

  const stepIndex = steps.indexOf(step);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  useEffect(() => {
    if (!initialProfile) return;
    setRole(initialProfile.role);
    setInterests(initialProfile.interests);
    if (initialProfile.referralSource) {
      try {
        const parsed = JSON.parse(initialProfile.referralSource);
        setReferralSource((parsed?.source || initialProfile.referralSource) as ReferralSource);
      } catch {
        setReferralSource(initialProfile.referralSource as ReferralSource);
      }
    }
  }, [initialProfile]);

  useEffect(() => {
    if (!user || hasInitializedRef.current) return;

    if (user.user_metadata?.firstName || parsedPrefs?.displayName) {
      setName((user.user_metadata.firstName as string) ?? parsedPrefs?.displayName ?? "");
    }
    if (user.user_metadata?.username || parsedPrefs?.username) {
      setUsername((user.user_metadata.username as string) ?? parsedPrefs?.username ?? "");
    }
    if (user.user_metadata?.description || parsedPrefs?.description) {
      setDescription((user.user_metadata.description as string) ?? parsedPrefs?.description ?? "");
    }
    if (user.user_metadata?.github || parsedPrefs?.github) {
      setGithub((user.user_metadata.github as string) ?? parsedPrefs?.github ?? "");
    }
    if (user.user_metadata?.linkedin || parsedPrefs?.linkedin) {
      setLinkedin((user.user_metadata.linkedin as string) ?? parsedPrefs?.linkedin ?? "");
    }
    if (user.user_metadata?.medium || parsedPrefs?.medium) {
      setMedium((user.user_metadata.medium as string) ?? parsedPrefs?.medium ?? "");
    }
    if (user.user_metadata?.devto || parsedPrefs?.devto) {
      setDevto((user.user_metadata.devto as string) ?? parsedPrefs?.devto ?? "");
    }
    if (user.user_metadata?.portfolio || parsedPrefs?.portfolio) {
      setPortfolio((user.user_metadata.portfolio as string) ?? parsedPrefs?.portfolio ?? "");
    }

    // Default username auto-population from email if empty
    const currentUsername = (user.user_metadata?.username as string) ?? parsedPrefs?.username ?? "";
    if (!currentUsername && user.email) {
      const emailPrefix = user.email.split("@")[0].replace(/[^a-zA-Z0-9_-]/g, "");
      setUsername(`@${emailPrefix}`);
    }

    // Default name auto-population from email if empty
    const currentName = (user.user_metadata?.firstName as string) ?? parsedPrefs?.displayName ?? "";
    if (!currentName && user.email && !isEdit) {
      const prefix = user.email.split("@")[0].replace(/[._]/g, " ");
      const formattedName = prefix
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setName(formattedName);
    }

    hasInitializedRef.current = true;
  }, [user, parsedPrefs, isEdit]);

  const toggleInterest = (id: OnboardingInterest) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const canContinue = (): boolean => {
    switch (step) {
      case "name":
        return name.trim().length > 0;
      case "profile":
        return usernameRegex.test(username);
      case "role":
        return role !== null;
      case "interests":
        return isEdit ? true : interests.length > 0;
      case "referral":
        return referralSource !== null;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (stepIndex < steps.length - 1) setStep(steps[stepIndex + 1]);
  };

  const goBack = () => {
    if (stepIndex > 0) setStep(steps[stepIndex - 1]);
  };

  const finish = async () => {
    if (!role || !referralSource) return;
    if (!isEdit && interests.length === 0) return;
    if (!isGuest && !isEdit && (!name.trim() || !user)) return;
    if (!isGuest && !usernameRegex.test(username)) return;

    const profile: OnboardingProfile = {
      interests,
      role,
      referralSource: isGuest ? referralSource : JSON.stringify({
        source: referralSource,
        displayName: name.trim(),
        username: username.trim(),
        description: description.trim(),
        github: github.trim(),
        linkedin: linkedin.trim(),
        medium: medium.trim(),
        devto: devto.trim(),
        portfolio: portfolio.trim(),
      }),
      completedAt: new Date().toISOString(),
    };

    setIsUpdating(true);
    try {
      onComplete(profile, isGuest ? undefined : {
        displayName: name.trim(),
        username: username.trim(),
        description: description.trim(),
        github: github.trim(),
        linkedin: linkedin.trim(),
        medium: medium.trim(),
        devto: devto.trim(),
        portfolio: portfolio.trim(),
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePrimary = () => {
    if (step === "referral") {
      void finish();
    } else {
      goNext();
    }
  };

  const stepTitle: Record<Step, string> = {
    name: "Welcome to AiVerse",
    profile: "Build your builder profile",
    role: isEdit ? "Update your role" : "What best describes you?",
    interests: isEdit ? "Update your interests" : "What are you exploring?",
    referral: isEdit ? "How did you find us?" : "How did you find us?",
  };

  const stepSubtitle: Record<Step, string> = {
    name: "Your account is ready. What should we call you?",
    profile: "Add your developer handles, bio, and social links.",
    role: isEdit
      ? "We'll refresh your recommendations based on this."
      : "We'll tailor recommendations to how you work with AI.",
    interests: isEdit
      ? "Select topics to personalize your catalog — leave empty to browse everything."
      : "Pick one or more — we'll surface matching tools and models first.",
    referral: "Helps us understand where builders discover AiVerse.",
  };

  const primaryLabel = isUpdating
    ? "Saving..."
    : step === "referral"
      ? isEdit
        ? "Save preferences"
        : "Start exploring"
      : "Continue";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80">
      <div
        className={`relative w-full max-w-lg flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${t.modal} ${t.border}`}
      >
        {isEdit && onClose && (
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-4 right-4 z-20 p-2 rounded-lg border ${t.surface} ${t.border} ${t.textMuted} hover:${t.textPrimary}`}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        )}

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-linear-to-b from-cyan-500/15 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-10">
          <div
            className="h-full bg-linear-to-r from-cyan-400 to-sky-400"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8 pt-10">
          <div className="mb-5 flex items-center justify-center">
            <Logo className="w-12 h-12 text-white" />
          </div>

          <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${t.textMuted}`}>
            {isEdit ? "Your preferences" : `Step ${stepIndex + 1} of ${steps.length}`}
          </p>
          <h2 className={`text-2xl font-black tracking-tight mb-2 ${t.textPrimary}`}>
            {isEdit && step === steps[0] ? "Edit your preferences" : stepTitle[step]}
          </h2>
          <p className={`text-sm mb-6 ${t.textSecondary} leading-relaxed`}>
            {stepSubtitle[step]}
          </p>

          {step === "name" && (
            <div>
              <label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${t.textMuted}`}>
                Display name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className={`w-full px-4 py-3 rounded-xl border font-medium outline-hidden ${t.surface} ${t.border} ${t.textPrimary} focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10`}
                autoFocus
                maxLength={50}
                onKeyDown={(e) => e.key === "Enter" && canContinue() && handlePrimary()}
              />
            </div>
          )}

          {step === "profile" && (
            <div className="space-y-4 max-h-[380px] overflow-y-auto no-scrollbar pr-1">
              <div>
                <label className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${t.textMuted}`}>
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Auto-append @ if they delete it
                    if (!val.startsWith("@")) {
                      setUsername("@" + val.replace(/@/g, ""));
                    } else {
                      setUsername(val);
                    }
                  }}
                  placeholder="@username"
                  className={`w-full px-4 py-2.5 rounded-xl border font-medium outline-hidden ${t.surface} ${t.border} ${t.textPrimary} focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10`}
                  maxLength={30}
                  onKeyDown={(e) => e.key === "Enter" && canContinue() && handlePrimary()}
                />
                {!usernameRegex.test(username) && (
                  <p className="text-[11px] text-rose-400 mt-1 font-medium">
                    Must start with @ and only contain letters, numbers, - and _ (no dots)
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${t.textMuted}`}>
                  Bio / Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell other builders about yourself..."
                  rows={2}
                  maxLength={160}
                  className={`w-full px-4 py-2.5 rounded-xl border text-[13px] font-medium resize-none outline-hidden ${t.surface} ${t.border} ${t.textPrimary} focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10`}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-xs font-semibold uppercase tracking-wider ${t.textMuted}`}>
                  Social Links
                </label>
                
                {/* GitHub */}
                <div className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl border ${t.surface} ${t.border} focus-within:border-cyan-500/50 focus-within:ring-4 focus-within:ring-cyan-500/10`}>
                  <GithubLogo />
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="GitHub Profile URL"
                    className="flex-1 bg-transparent border-0 p-0 text-xs font-medium outline-hidden placeholder:text-gray-500 text-white"
                  />
                </div>

                {/* LinkedIn */}
                <div className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl border ${t.surface} ${t.border} focus-within:border-cyan-500/50 focus-within:ring-4 focus-within:ring-cyan-500/10`}>
                  <LinkedinLogo />
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="LinkedIn Profile URL"
                    className="flex-1 bg-transparent border-0 p-0 text-xs font-medium outline-hidden placeholder:text-gray-500 text-white"
                  />
                </div>

                {/* Medium */}
                <div className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl border ${t.surface} ${t.border} focus-within:border-cyan-500/50 focus-within:ring-4 focus-within:ring-cyan-500/10`}>
                  <MediumLogo />
                  <input
                    type="url"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    placeholder="Medium Profile URL"
                    className="flex-1 bg-transparent border-0 p-0 text-xs font-medium outline-hidden placeholder:text-gray-500 text-white"
                  />
                </div>

                {/* Dev.to */}
                <div className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl border ${t.surface} ${t.border} focus-within:border-cyan-500/50 focus-within:ring-4 focus-within:ring-cyan-500/10`}>
                  <DevToLogo />
                  <input
                    type="url"
                    value={devto}
                    onChange={(e) => setDevto(e.target.value)}
                    placeholder="Dev.to Profile URL"
                    className="flex-1 bg-transparent border-0 p-0 text-xs font-medium outline-hidden placeholder:text-gray-500 text-white"
                  />
                </div>

                {/* Portfolio */}
                <div className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl border ${t.surface} ${t.border} focus-within:border-cyan-500/50 focus-within:ring-4 focus-within:ring-cyan-500/10`}>
                  <PortfolioLogo />
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="Portfolio URL"
                    className="flex-1 bg-transparent border-0 p-0 text-xs font-medium outline-hidden placeholder:text-gray-500 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {step === "role" && (
            <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto no-scrollbar">
              {onboardingOptions.roles.map((r) => (
                <OptionButton
                  key={r.id}
                  selected={role === r.id}
                  label={r.label}
                  onClick={() => setRole(r.id)}
                  t={t}
                />
              ))}
            </div>
          )}

          {step === "interests" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto no-scrollbar pr-1">
              {onboardingOptions.interests.map((item) => {
                const selected = interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`text-left p-3 rounded-xl border ${
                      selected
                        ? `${t.pillActive} ring-1 ring-cyan-500/30`
                        : `${t.surface} ${t.border} ${t.textSecondary} hover:border-white/20`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[13px] font-semibold ${selected ? t.textAccent : t.textPrimary}`}>
                        {item.label}
                      </span>
                      {selected && <Check size={14} className="shrink-0 text-cyan-400" />}
                    </div>
                    <p className={`text-[11px] mt-0.5 ${t.textMuted}`}>{item.description}</p>
                  </button>
                );
              })}
            </div>
          )}

          {step === "referral" && (
            <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto no-scrollbar">
              {onboardingOptions.referralSources.map((r) => (
                <OptionButton
                  key={r.id}
                  selected={referralSource === r.id}
                  label={r.label}
                  onClick={() => setReferralSource(r.id)}
                  t={t}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 mt-8">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={goBack}
                disabled={isUpdating}
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-[14px] border ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary} disabled:opacity-50`}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handlePrimary}
              disabled={isUpdating || !canContinue()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[15px] bg-white text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              {primaryLabel}
              {!isUpdating && <ArrowRight size={18} />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

function OptionButton({
  selected,
  label,
  onClick,
  t,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
  t: ReturnType<typeof useTokens>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border text-left text-[14px] font-medium ${
        selected
          ? `${t.pillActive} ring-1 ring-cyan-500/30`
          : `${t.surface} ${t.border} ${t.textSecondary} hover:border-white/20`
      }`}
    >
      {label}
      {selected && <Check size={16} className="text-cyan-400 shrink-0" />}
    </button>
  );
}
