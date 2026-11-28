import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  Link2,
  Check,
  LogOut,
  Moon,
  Sun,
  Monitor,
  SlidersHorizontal,
  User,
  Bookmark,
  Shield,
  // Visual Redesign Icons
  GraduationCap,
  Brain,
  Code2,
  Cpu,
  Briefcase,
  Sparkles,
  HelpCircle,
  Globe,
  Lock,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  X,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { shareUrlForProfile } from "../lib/entryUrl";
import {
  onboardingOptions,
  parseProfileMeta,
  type OnboardingInterest,
  type OnboardingProfile,
  type ReferralSource,
  type UserRole,
} from "../lib/onboarding";
import { useTokens, useTheme } from "../lib/theme";
import { getOAuthAvatarUrl, isAdminUser } from "../lib/supabase";
import { navigateTo } from "../lib/router";
import { AccountDeletionModal } from "./AccountDeletionModal";

// Custom SVG Logos for platforms not in standard Lucide version
const GithubLogo = ({ className }: { className?: string }) => (
  <svg className={className || "w-3.5 h-3.5"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinLogo = ({ className }: { className?: string }) => (
  <svg className={className || "w-3.5 h-3.5"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const MediumLogo = ({ className }: { className?: string }) => (
  <svg className={className || "w-3.5 h-3.5"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm3.04 0c0 3.24-.32 5.87-.71 5.87s-.72-2.63-.72-5.87.32-5.87.72-5.87.71 2.63.71 5.87z"/>
  </svg>
);

const DevToLogo = ({ className }: { className?: string }) => (
  <svg className={className || "w-3.5 h-3.5"} viewBox="0 0 448 512" fill="currentColor">
    <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM304.14 0H43.86C19.63 0 0 19.63 0 43.86v424.28C0 492.37 19.63 512 43.86 512h360.28c24.23 0 43.86-19.63 43.86-43.86V43.86C448 19.63 428.37 0 304.14 0zM151.05 311.77c0 12.18-4.85 21.78-14.55 28.8-9.7 7.03-22.66 10.54-38.89 10.54H62.22V175.12h35.39c16.23 0 29.19 3.51 38.89 10.54 9.7 7.03 14.55 16.62 14.55 28.8v97.31zm102.3-120.87h-64.44v45.48h51.38v28.29h-51.38v46.12h64.44v28.31H158.46V162.5h94.89v28.4zm102.3 124.36c0 18.28-5.97 32.5-17.9 42.66-11.93 10.16-28.31 15.24-49.13 15.24-20.82 0-37.2-5.08-49.13-15.24-11.93-10.16-17.9-24.38-17.9-42.66v-96.1h32.93v95.82c0 9.57 2.74 16.8 8.22 21.68 5.48 4.88 13.78 7.32 24.89 7.32s19.41-2.44 24.89-7.32c5.48-4.88 8.22-12.11 8.22-21.68v-95.82h32.93v96.1z"/>
  </svg>
);



// Premium Role Details for Visual Cards Grid
const ROLE_DETAILS: Record<
  UserRole,
  {
    label: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
  }
> = {
  student: {
    label: "Student / Learner",
    description: "Tackling courses, looking for tutorials and foundational tools.",
    icon: GraduationCap,
    color: "indigo",
  },
  researcher: {
    label: "Researcher / Academic",
    description: "Analyzing SOTA models, datasets, and writing academic papers.",
    icon: Brain,
    color: "purple",
  },
  developer: {
    label: "Software Developer",
    description: "Building apps, integrating APIs, and shipping code quickly.",
    icon: Code2,
    color: "sky",
  },
  ml_engineer: {
    label: "ML Engineer",
    description: "Training, deploying, and scaling machine learning models in production.",
    icon: Cpu,
    color: "teal",
  },
  product: {
    label: "Product / Business",
    description: "Managing AI products, looking for market trends and integrations.",
    icon: Briefcase,
    color: "amber",
  },
  hobbyist: {
    label: "Hobbyist / Explorer",
    description: "Curious about cool new AI tools, art generation, and side projects.",
    icon: Sparkles,
    color: "pink",
  },
  other: {
    label: "Other",
    description: "Just curious and excited to explore what's happening in AI.",
    icon: HelpCircle,
    color: "neutral",
  },
};

interface UserProfileMenuProps {
  onboardingProfile: OnboardingProfile | null;
  onSave?: (
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
    },
  ) => Promise<void>;
  onViewProfile?: (username: string) => void;
  onViewSaved?: () => void;
  onEditPreferences?: (section?: "profile" | "preferences") => void;
  onClose?: () => void;
  onViewAdminDashboard?: () => void;
  onRequestDeletion?: () => void;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  onboardingProfile,
  onSave,
  onViewProfile,
  onViewSaved,
  onClose,
  onViewAdminDashboard,
  onRequestDeletion,
}) => {
  const t = useTokens();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user, signOut } = useAuth();

  const isDark = resolvedTheme === "amoled";

  const [currentView, setCurrentView] = useState<"main" | "profile" | "preferences">("main");
  const [linkCopied, setLinkCopied] = useState(false);
  const [saving, setSaving] = useState<"profile" | "preferences" | null>(null);

  const parsedMeta = useMemo(
    () => parseProfileMeta(onboardingProfile?.referralSource),
    [onboardingProfile?.referralSource],
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [medium, setMedium] = useState("");
  const [devto, setDevto] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);
  const [interests, setInterests] = useState<OnboardingInterest[]>([]);

  const username = parsedMeta?.username || (user?.user_metadata?.username as string) || "";
  const email = user?.email || "";
  const avatarUrl = parsedMeta?.avatarUrl || getOAuthAvatarUrl(user);
  const firstName = parsedMeta?.displayName || (user?.user_metadata?.firstName as string) || "";
  const displayName = firstName || email.split("@")[0] || "User";
  const initials = displayName
    ? (displayName.split(/\s+/).map((n: string) => n[0]).slice(0, 2).join("")).toUpperCase()
    : (email ? email[0] : "U").toUpperCase();

  const [socialsExpanded, setSocialsExpanded] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const metaRecord = parsedMeta as { deletionRequested?: boolean; deletion_requested?: boolean } | null;
  const userMetaRecord = user?.user_metadata as { deletionRequested?: boolean } | undefined;
  const derivedDeletionRequested = Boolean(
    metaRecord?.deletionRequested ||
    metaRecord?.deletion_requested ||
    userMetaRecord?.deletionRequested
  );
  const [localDeletionRequested, setLocalDeletionRequested] = useState<boolean | null>(null);
  const deletionRequested = localDeletionRequested ?? derivedDeletionRequested;

  const [deletionFeedback, setDeletionFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const wrapperCls = (readOnly: boolean) => [
    "relative flex items-center rounded-xl border transition-all duration-200 w-full",
    readOnly
      ? (isDark
          ? "bg-white/[0.03] border-white/[0.06] opacity-60"
          : "bg-neutral-100 border-neutral-200 opacity-60")
      : (isDark
          ? "bg-[#121319] border-white/[0.1] hover:border-white/20 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20"
          : "bg-white border-neutral-200 hover:border-neutral-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20")
  ].join(" ");

  const dividerCls = isDark ? "border-r border-white/[0.08] text-neutral-400" : "border-r border-neutral-200 text-neutral-500";

  const innerInputCls = [
    "w-full bg-transparent px-3 py-2 text-xs font-normal outline-none border-none focus:ring-0 focus:outline-none",
    isDark ? "text-neutral-100 placeholder:text-neutral-500" : "text-neutral-900 placeholder:text-neutral-400"
  ].join(" ");

  const innerTextareaCls = [
    "w-full bg-transparent px-3 py-2 text-xs font-normal outline-none border-none focus:ring-0 focus:outline-none resize-none",
    isDark ? "text-neutral-100 placeholder:text-neutral-500" : "text-neutral-900 placeholder:text-neutral-400"
  ].join(" ");

  const renderInputWrapper = (
    icon: React.ComponentType<{ size?: number; className?: string }>,
    label: string,
    children: React.ReactNode,
    readOnly = false,
    extraHeader?: React.ReactNode
  ) => {
    const Icon = icon;
    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between">
          <label className={`block text-[10px] font-bold uppercase tracking-wider ${t.textMuted}`}>{label}</label>
          {extraHeader}
        </div>
        <div className={wrapperCls(readOnly)}>
          <div className={`pl-3 pr-2 py-2 flex items-center justify-center ${dividerCls}`}>
            <Icon size={13} className="shrink-0" />
          </div>
          <div className="flex-1 flex items-center">
            {children}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const meta = user?.user_metadata;
    setName(parsedMeta?.displayName || (meta?.firstName as string) || "");
    setDescription(parsedMeta?.description || (meta?.description as string) || "");
    setGithub(parsedMeta?.github || (meta?.github as string) || "");
    setLinkedin(parsedMeta?.linkedin || (meta?.linkedin as string) || "");
    setMedium(parsedMeta?.medium || (meta?.medium as string) || "");
    setDevto(parsedMeta?.devto || (meta?.devto as string) || "");
    setPortfolio(parsedMeta?.portfolio || (meta?.portfolio as string) || "");
    setRole(onboardingProfile?.role ?? null);
    setInterests(onboardingProfile?.interests ?? []);
  }, [user, parsedMeta, onboardingProfile]);

  const handleCopyLink = () => {
    if (!username) return;
    navigator.clipboard.writeText(shareUrlForProfile(username));
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const buildProfilePayload = (): OnboardingProfile | null => {
    const baseRole = role ?? onboardingProfile?.role;
    if (!baseRole || !onboardingProfile) return null;

    let source: ReferralSource = "other";
    try {
      const parsed = JSON.parse(onboardingProfile.referralSource);
      source = (parsed?.source as ReferralSource) || "other";
    } catch {
      if (onboardingProfile.referralSource) {
        source = onboardingProfile.referralSource as ReferralSource;
      }
    }

    return {
      interests: interests.length > 0 ? interests : onboardingProfile.interests,
      role: baseRole,
      referralSource: JSON.stringify({
        source,
        displayName: name.trim(),
        username,
        description: description.trim(),
        github: github.trim(),
        linkedin: linkedin.trim(),
        medium: medium.trim(),
        devto: devto.trim(),
        portfolio: portfolio.trim(),
        avatarUrl: avatarUrl || undefined,
      }),
      completedAt: new Date().toISOString(),
    };
  };

  const profileMeta = () => ({
    displayName: name.trim(),
    username,
    description: description.trim(),
    github: github.trim(),
    linkedin: linkedin.trim(),
    medium: medium.trim(),
    devto: devto.trim(),
    portfolio: portfolio.trim(),
    avatarUrl: avatarUrl || undefined,
  });

  const saveProfile = async () => {
    if (!onSave) return;
    const profile = buildProfilePayload();
    if (!profile || !name.trim()) return;
    setSaving("profile");
    try {
      await onSave(profile, profileMeta());
      setCurrentView("main");
    } finally {
      setSaving(null);
    }
  };

  const savePreferences = async () => {
    if (!onSave) return;
    const profile = buildProfilePayload();
    if (!profile || !role) return;
    setSaving("preferences");
    try {
      await onSave({ ...profile, role, interests }, profileMeta());
      setCurrentView("main");
    } finally {
      setSaving(null);
    }
  };

  const toggleInterest = (id: OnboardingInterest) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  /* ── Theme-aware style tokens ── */
  const menuItemCls = [
    "w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-left cursor-pointer transition-colors duration-150",
    isDark
      ? "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
      : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100",
  ].join(" ");

  const separatorCls = `h-px my-1.5 mx-1 border-t ${isDark ? "border-white/10" : "border-neutral-200"}`;

  const saveBtnCls = [
    "w-full py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 shadow-sm shadow-indigo-500/20 disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 text-white",
  ].join(" ");

  // ---------------------------------------------------------------------------
  // Profile View
  // ---------------------------------------------------------------------------
  if (currentView === "profile") {
    const charCounter = (
      <span className={`text-[9px] font-semibold tracking-wider tabular-nums ${
        description.length > 140 ? "text-amber-500" : t.textMuted
      }`}>
        {description.length}/160
      </span>
    );

    return (
      <div className="text-left max-h-[min(70dvh,520px)] overflow-y-auto no-scrollbar py-2 px-1">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3.5 px-2">
          <button
            onClick={() => setCurrentView("main")}
            className={`p-1.5 rounded-lg transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
          >
            <ChevronLeft size={16} />
          </button>
          <h3 className={`font-semibold text-sm ${t.textPrimary}`}>Edit Profile</h3>
        </div>

        <div className="space-y-4 px-2">
          {/* Profile Photo (Read-Only - Strictly synced with OAuth provider) */}
          <div className={`p-3 rounded-xl border flex items-center gap-3.5 transition-all duration-300 ${
            isDark ? "bg-white/[0.02] border-white/8" : "bg-black/[0.02] border-black/8"
          }`}>
            <div className="relative shrink-0 w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10 shadow-md">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center font-bold text-base ${isDark ? "bg-white text-black" : "bg-black text-white"}`}>
                  {initials}
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-semibold ${t.textPrimary}`}>
                  Profile Photo
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                  isDark ? "bg-white/10 text-white/70" : "bg-black/10 text-black/70"
                }`}>
                  {avatarUrl ? "OAuth Synced" : "Default Initials"}
                </span>
              </div>
              <p className={`text-[11px] leading-relaxed mt-0.5 ${t.textMuted}`}>
                {avatarUrl
                  ? "Profile photo is automatically synced from your linked identity account."
                  : "Profile photo is available when signed in with a linked account."}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            {/* Name */}
            {renderInputWrapper(User, "Name", (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={innerInputCls}
                maxLength={50}
                placeholder="Your name"
              />
            ))}

            {/* Username (read-only) */}
            {renderInputWrapper(Lock, "Username (Read-Only)", (
              <input
                type="text"
                value={username}
                readOnly
                disabled
                className={`${innerInputCls} opacity-50 cursor-not-allowed`}
              />
            ), true)}

            {/* Bio */}
            {renderInputWrapper(Sparkles, "Bio", (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                maxLength={160}
                className={innerTextareaCls}
                placeholder="Tell other builders about yourself..."
              />
            ), false, charCounter)}
          </div>

          {/* Social Profiles / Profiles on the Web Accordion */}
          {(() => {
            const socialConfigs = [
              {
                id: "github",
                name: "GitHub",
                placeholder: "https://github.com/username",
                value: github,
                onChange: setGithub,
                icon: GithubLogo,
                badgeBg: "bg-neutral-900 text-white dark:bg-white/10 dark:text-white",
              },
              {
                id: "linkedin",
                name: "LinkedIn",
                placeholder: "https://linkedin.com/in/username",
                value: linkedin,
                onChange: setLinkedin,
                icon: LinkedinLogo,
                badgeBg: "bg-[#0a66c2]/10 text-[#0a66c2] border border-[#0a66c2]/25 dark:bg-[#0a66c2]/20 dark:text-[#70b5f9]",
              },
              {
                id: "medium",
                name: "Medium",
                placeholder: "https://medium.com/@username",
                value: medium,
                onChange: setMedium,
                icon: MediumLogo,
                badgeBg: "bg-neutral-800 text-white dark:bg-neutral-700 dark:text-neutral-200",
              },
              {
                id: "devto",
                name: "Dev.to",
                placeholder: "https://dev.to/username",
                value: devto,
                onChange: setDevto,
                icon: DevToLogo,
                badgeBg: "bg-neutral-900 text-white dark:bg-white/10 dark:text-white",
              },
              {
                id: "portfolio",
                name: "Portfolio",
                placeholder: "https://yourwebsite.com",
                value: portfolio,
                onChange: setPortfolio,
                icon: Globe,
                badgeBg: "bg-indigo-500/10 text-indigo-600 border border-indigo-500/25 dark:bg-indigo-500/15 dark:text-indigo-300",
              },
            ];

            const connectedSocialsCount = [github, linkedin, medium, devto, portfolio].filter((v) => Boolean(v?.trim())).length;

            return (
              <div className="rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/70 dark:bg-[#121319] overflow-hidden transition-all shadow-2xs">
                <button
                  type="button"
                  onClick={() => setSocialsExpanded(!socialsExpanded)}
                  className="w-full flex items-center justify-between p-3 text-left cursor-pointer hover:bg-neutral-100/70 dark:hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                      <Link2 size={13} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                          Profiles on the Web
                        </span>
                        {connectedSocialsCount > 0 ? (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {connectedSocialsCount} linked
                          </span>
                        ) : (
                          <span className="text-[10px] font-normal px-1.5 py-0.5 rounded-full bg-neutral-200/60 dark:bg-white/10 text-neutral-600 dark:text-neutral-400">
                            Optional
                          </span>
                        )}
                      </div>
                      <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                        Public GitHub, LinkedIn, Medium & site links
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-500 dark:text-neutral-400 shrink-0">
                    {socialsExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </button>

                {socialsExpanded && (
                  <div className="p-3 border-t border-neutral-200/80 dark:border-white/[0.08] space-y-2.5 bg-white dark:bg-[#0d0e12]">
                    {socialConfigs.map((soc) => {
                      const Icon = soc.icon;
                      const hasVal = Boolean(soc.value?.trim());
                      return (
                        <div key={soc.id} className="space-y-1">
                          <div className="flex items-center justify-between text-[10.5px] px-0.5">
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">
                              {soc.name}
                            </span>
                            {hasVal && (
                              <a
                                href={soc.value.startsWith("http") ? soc.value : `https://${soc.value}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 hover:underline"
                                title={`Open ${soc.name} profile in new tab`}
                              >
                                <span>Test link</span>
                                <ArrowUpRight size={11} />
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#121319] px-2.5 py-1.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                            <div className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center shrink-0 ${soc.badgeBg}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <input
                              type="url"
                              value={soc.value}
                              onChange={(e) => soc.onChange(e.target.value)}
                              placeholder={soc.placeholder}
                              className="flex-1 bg-transparent border-none outline-none text-xs font-normal text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:ring-0 p-0"
                            />
                            {hasVal && (
                              <button
                                type="button"
                                onClick={() => soc.onChange("")}
                                className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
                                title="Clear input"
                              >
                                <X size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Action Button */}
          <button
            type="button"
            onClick={() => void saveProfile()}
            disabled={saving === "profile" || !name.trim()}
            className={saveBtnCls}
          >
            {saving === "profile" ? "Saving Profile…" : "Save Changes"}
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Preferences View
  // ---------------------------------------------------------------------------
  if (currentView === "preferences") {
    return (
      <div className="text-left max-h-[min(72dvh,540px)] overflow-y-auto no-scrollbar py-2 px-1">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3.5 px-2">
          <button
            onClick={() => setCurrentView("main")}
            className="w-7 h-7 rounded-xl flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ChevronLeft size={16} />
          </button>
          <div>
            <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 leading-tight">
              Feed Preferences
            </h3>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Personalize model suggestions & focus topics
            </p>
          </div>
        </div>

        <div className="space-y-4 px-2">
          {/* Role Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10.5px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Primary Persona
              </label>
              <span className="text-[10px] text-neutral-400">Single select</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 max-h-[210px] overflow-y-auto pr-1 no-scrollbar">
              {Object.entries(ROLE_DETAILS).map(([roleId, details]) => {
                const isSelected = role === roleId;
                const RoleIcon = details.icon;

                return (
                  <button
                    key={roleId}
                    type="button"
                    onClick={() => setRole(roleId as UserRole)}
                    className={`flex items-start gap-3 p-2.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "border-indigo-500/40 bg-indigo-500/10 ring-1 ring-indigo-500/40"
                        : "border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121319] hover:bg-neutral-50 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-indigo-600 text-white dark:bg-indigo-500"
                          : "bg-neutral-100 dark:bg-white/[0.08] text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      <RoleIcon size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-xs font-semibold ${
                            isSelected
                              ? "text-indigo-600 dark:text-indigo-300"
                              : "text-neutral-900 dark:text-neutral-100"
                          }`}
                        >
                          {details.label}
                        </p>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? "border-indigo-600 dark:border-indigo-400 bg-white dark:bg-[#0d0e12]"
                              : "border-neutral-300 dark:border-neutral-600"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {details.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Chips for Interests */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Focus Areas & Topics
              </p>
              <span className="text-[10px] text-neutral-400">
                {interests.length} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {onboardingOptions.interests.map((item) => {
                const selected = interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                      selected
                        ? "bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200 dark:border-indigo-500/40 shadow-2xs font-semibold"
                        : "bg-white dark:bg-[#121319] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    {selected && <Check size={11} className="stroke-[2.5]" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save Action Button */}
          <button
            type="button"
            onClick={() => void savePreferences()}
            disabled={saving === "preferences" || !role}
            className={saveBtnCls}
          >
            {saving === "preferences" ? "Saving Preferences…" : "Save Preferences"}
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Main View
  // ---------------------------------------------------------------------------
  return (
    <div className="text-left py-0.5">
      {/* ── Status Feedback Banner ── */}
      {deletionFeedback && (
        <div
          className={`mx-3 mt-1 mb-2 p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 animate-[fadeIn_0.15s_ease-out] ${
            deletionFeedback.type === "success"
              ? "bg-indigo-50 dark:bg-indigo-500/15 border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300"
              : deletionFeedback.type === "error"
              ? "bg-rose-500/10 border-rose-500/20 text-rose-500"
              : "bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <ShieldAlert size={14} className="shrink-0" />
            <span className="truncate">{deletionFeedback.message}</span>
          </div>
          <button
            onClick={() => setDeletionFeedback(null)}
            className="p-0.5 hover:opacity-70 cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* ══════════ Account Hero Section ══════════ */}
      <div className="flex flex-col items-center text-center p-2">
        {/* Avatar with subtle ring */}
        <div className="relative mb-1.5">
          <div className="w-13 h-13 rounded-full overflow-hidden ring-3 ring-neutral-100 dark:ring-white/10 shadow-sm">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                {initials}
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0d0e12]" title="Active" />
        </div>

        <p className="text-[13.5px] font-semibold text-neutral-900 dark:text-white truncate max-w-[240px]">
          {displayName}
        </p>
        {username && (
          <p className="text-[10.5px] font-medium text-neutral-500 dark:text-neutral-400">
            {username}
          </p>
        )}
        <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 truncate max-w-[240px] mt-0.5 mb-1.5">
          {email}
        </p>

        {deletionRequested && (
          <div
            onClick={() => {
              if (onRequestDeletion) {
                onRequestDeletion();
              } else {
                setShowDeletionModal(true);
              }
            }}
            className="mb-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10.5px] font-medium flex items-center gap-1.5 cursor-pointer hover:bg-amber-500/15 transition-colors"
            title="Click to view or cancel deletion request"
          >
            <Clock size={11} />
            <span>Deletion pending admin approval</span>
          </div>
        )}

        {/* "Manage your Profile" Pill */}
        <button
          type="button"
          onClick={() => {
            const targetUsername =
              username ||
              parsedMeta?.username ||
              (user?.user_metadata?.username as string) ||
              (user?.user_metadata?.user_name as string) ||
              (user?.user_metadata?.preferred_username as string) ||
              (email ? email.split("@")[0] : "") ||
              "user";

            if (onViewProfile) {
              onViewProfile(targetUsername);
            }
            if (onClose) onClose();
          }}
          className="w-full py-1.5 px-3 rounded-xl border border-neutral-200 dark:border-white/[0.12] bg-neutral-50 dark:bg-[#121319] text-[11px] font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all text-center cursor-pointer shadow-2xs hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          Manage your AiVerse Profile
        </button>
      </div>

      {/* ── Hairline separator ── */}
      <div className={separatorCls} />

      {/* ══════════ Menu Items ══════════ */}
      <div className="space-y-0.5 px-1">

        {/* ── Edit Profile ── */}
        <button
          type="button"
          onClick={() => setCurrentView("profile")}
          className={menuItemCls}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isDark ? "bg-white/10 text-neutral-300" : "bg-neutral-100 text-neutral-700"}`}>
            <User size={13} />
          </div>
          <span className="flex-1">Edit profile details</span>
        </button>

        {/* ── Saved Entries ── */}
        <button
          type="button"
          onClick={() => {
            if (onViewSaved) onViewSaved();
            if (onClose) onClose();
          }}
          className={menuItemCls}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isDark ? "bg-white/10 text-neutral-300" : "bg-neutral-100 text-neutral-700"}`}>
            <Bookmark size={13} />
          </div>
          <span className="flex-1">Saved AI entries</span>
        </button>

        {/* ── Feed Preferences ── */}
        <button
          type="button"
          onClick={() => setCurrentView("preferences")}
          className={menuItemCls}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isDark ? "bg-white/10 text-neutral-300" : "bg-neutral-100 text-neutral-700"}`}>
            <SlidersHorizontal size={13} />
          </div>
          <span className="flex-1">Feed preferences</span>
        </button>

        {/* ── Copy profile link ── */}
        {username && (
          <button
            type="button"
            onClick={handleCopyLink}
            className={`${menuItemCls} ${linkCopied ? "text-emerald-500!" : ""}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${linkCopied ? "bg-emerald-500/15 text-emerald-400" : isDark ? "bg-white/10 text-neutral-300" : "bg-neutral-100 text-neutral-700"}`}>
              {linkCopied ? <Check size={13} /> : <Link2 size={13} />}
            </div>
            <span>{linkCopied ? "Profile link copied!" : "Share profile link"}</span>
          </button>
        )}

        {/* ── Admin Dashboard ── */}
        {isAdminUser(user) && (
          <button
            type="button"
            onClick={() => {
              onViewAdminDashboard?.();
              onClose?.();
            }}
            className={menuItemCls}
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
              <Shield size={13} />
            </div>
            <span className="flex-1 font-medium text-indigo-600 dark:text-indigo-400">Admin Console</span>
          </button>
        )}

        {/* ── Theme Switcher ── */}
        <div className="px-2 py-1 mt-0.5">
          <div className="flex items-center justify-between text-[10.5px] font-medium text-neutral-500 dark:text-neutral-400 mb-1 px-1">
            <span>Appearance</span>
            <span className="capitalize text-neutral-800 dark:text-neutral-200">{theme}</span>
          </div>
          <div className={`flex rounded-full p-0.5 gap-0.5 border ${isDark ? "bg-white/5 border-white/10" : "bg-neutral-100 border-neutral-200"}`}>
            <button
              onClick={() => setTheme("system")}
              title="System"
              className={`flex-1 flex items-center justify-center py-1 rounded-full text-xs transition-all ${
                theme === "system"
                  ? (isDark ? "bg-white/15 text-white font-semibold shadow-xs" : "bg-white text-neutral-900 font-semibold shadow-xs")
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Monitor size={12} />
            </button>
            <button
              onClick={() => setTheme("light")}
              title="Light"
              className={`flex-1 flex items-center justify-center py-1 rounded-full text-xs transition-all ${
                theme === "light"
                  ? (isDark ? "bg-white/15 text-white font-semibold shadow-xs" : "bg-white text-neutral-900 font-semibold shadow-xs")
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Sun size={12} />
            </button>
            <button
              onClick={() => setTheme("amoled")}
              title="Dark"
              className={`flex-1 flex items-center justify-center py-1 rounded-full text-xs transition-all ${
                theme === "amoled"
                  ? (isDark ? "bg-white/15 text-white font-semibold shadow-xs" : "bg-white text-neutral-900 font-semibold shadow-xs")
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Moon size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Hairline separator ── */}
      <div className={separatorCls} />

      {/* ══════════ Sign Out & Danger Zone ══════════ */}
      <div className="px-2 pt-0.5 pb-0.5 space-y-1.5">
        <button
          type="button"
          onClick={async () => {
            onClose?.();
            await signOut("/dashboard");
          }}
          className="w-full flex items-center justify-center gap-2 py-1.5 rounded-full border border-neutral-300 dark:border-white/20 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer"
        >
          <LogOut size={12} />
          Sign out of AiVerse
        </button>

        <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-neutral-400">
          <a href="/privacy" onClick={(e) => { e.preventDefault(); onClose?.(); navigateTo("/privacy"); }} className="hover:underline">Privacy</a>
          <span>•</span>
          <a href="/terms" onClick={(e) => { e.preventDefault(); onClose?.(); navigateTo("/terms"); }} className="hover:underline">Terms</a>
          <span>•</span>
          {deletionRequested ? (
            <button
              type="button"
              onClick={() => {
                if (onRequestDeletion) {
                  onRequestDeletion();
                } else {
                  setShowDeletionModal(true);
                }
              }}
              className="text-amber-500 hover:text-amber-400 hover:underline cursor-pointer flex items-center gap-1 font-medium"
            >
              <Clock size={11} />
              <span>Deletion requested</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (onRequestDeletion) {
                  onRequestDeletion();
                } else {
                  setShowDeletionModal(true);
                }
              }}
              className="hover:text-neutral-700 dark:hover:text-neutral-300 hover:underline cursor-pointer"
            >
              Request account deletion
            </button>
          )}
        </div>
      </div>

      {/* ══════════ Account Deletion Request Modal (Portaled) ══════════ */}
      <AccountDeletionModal
        isOpen={showDeletionModal}
        onClose={() => setShowDeletionModal(false)}
        onboardingProfile={onboardingProfile}
        onStatusChange={(req) => setLocalDeletionRequested(req)}
      />
    </div>
  );
};
