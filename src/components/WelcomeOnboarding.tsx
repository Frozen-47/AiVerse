import React, { useState, useEffect } from "react";
import { useTokens } from "../lib/theme";
import { useUser } from "@clerk/clerk-react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Logo } from "./Logo";
import {
  onboardingOptions,
  saveGuestOnboarding,
  type OnboardingInterest,
  type OnboardingProfile,
  type ReferralSource,
  type UserRole,
} from "../lib/onboarding";

interface WelcomeOnboardingProps {
  onComplete: (profile: OnboardingProfile) => void;
  isGuest?: boolean;
}

const STEPS = ["name", "role", "interests", "referral"] as const;
type Step = (typeof STEPS)[number];

export const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({
  onComplete,
  isGuest = false,
}) => {
  const t = useTokens();
  const { user } = useUser();
  const [step, setStep] = useState<Step>(isGuest ? "role" : "name");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);
  const [interests, setInterests] = useState<OnboardingInterest[]>([]);
  const [referralSource, setReferralSource] = useState<ReferralSource | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress || name) return;
    const email = user.primaryEmailAddress.emailAddress;
    const prefix = email.split("@")[0].replace(/[._]/g, " ");
    const formattedName = prefix
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setName(formattedName);
  }, [user, name]);

  const toggleInterest = (id: OnboardingInterest) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const canContinue = (): boolean => {
    switch (step) {
      case "name":
        return name.trim().length > 0;
      case "role":
        return role !== null;
      case "interests":
        return interests.length > 0;
      case "referral":
        return referralSource !== null;
      default:
        return false;
    }
  };

  const goNext = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const goBack = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  const finish = async () => {
    if (!role || !referralSource || interests.length === 0) return;
    if (!isGuest && (!name.trim() || !user)) return;

    const profile: OnboardingProfile = {
      interests,
      role,
      referralSource,
      completedAt: new Date().toISOString(),
    };

    setIsUpdating(true);
    try {
      if (isGuest) {
        saveGuestOnboarding(profile);
      } else if (user) {
        await user.update({
          firstName: name.trim(),
          unsafeMetadata: {
            ...user.unsafeMetadata,
            onboardingComplete: true,
            onboarding: profile,
          },
        });
      }
      onComplete(profile);
    } catch (err) {
      console.error("Failed to save onboarding:", err);
      if (isGuest) saveGuestOnboarding(profile);
      onComplete(profile);
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
    role: "What best describes you?",
    interests: "What are you exploring?",
    referral: "How did you find us?",
  };

  const stepSubtitle: Record<Step, string> = {
    name: "Your account is ready. What should we call you?",
    role: "We'll tailor recommendations to how you work with AI.",
    interests: "Pick one or more — we'll surface matching tools and models first.",
    referral: "Helps us understand where builders discover AiVerse.",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className={`relative w-full max-w-lg flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${t.modal} ${t.border}`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-linear-to-b from-cyan-500/15 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-10">
          <div
            className="h-full bg-linear-to-r from-cyan-400 to-sky-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8 pt-10">
          <div className="mb-5 flex items-center justify-center">
            <Logo className="w-12 h-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] text-white" />
          </div>

          <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${t.textMuted}`}>
            Step {stepIndex + 1} of {STEPS.length}
          </p>
          <h2 className={`text-2xl font-black tracking-tight mb-2 ${t.textPrimary}`}>
            {stepTitle[step]}
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
                className={`w-full px-4 py-3 rounded-xl border font-medium outline-hidden transition-all ${t.surface} ${t.border} ${t.textPrimary} focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10`}
                autoFocus
                maxLength={50}
                onKeyDown={(e) => e.key === "Enter" && canContinue() && handlePrimary()}
              />
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
                    className={`text-left p-3 rounded-xl border transition-all ${
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
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-[14px] border transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary} disabled:opacity-50`}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handlePrimary}
              disabled={isUpdating || !canContinue()}
              className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[15px] transition-all bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none active:scale-95"
            >
              {isUpdating
                ? "Saving..."
                : step === "referral"
                  ? "Start exploring"
                  : "Continue"}
              {!isUpdating && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </div>

          {isGuest && step === "role" && (
            <button
              type="button"
              onClick={() => {
                const skipped: OnboardingProfile = {
                  interests: [],
                  role: "hobbyist",
                  referralSource: "other",
                  completedAt: new Date().toISOString(),
                };
                saveGuestOnboarding(skipped);
                onComplete(skipped);
              }}
              className={`w-full mt-4 text-[12px] ${t.textMuted} hover:underline`}
            >
              Skip for now
            </button>
          )}
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
      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border text-left text-[14px] font-medium transition-all ${
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
