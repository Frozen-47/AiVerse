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
  BookOpen,
  Terminal,
  Globe,
  Lock,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
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
import { getOAuthAvatarUrl, supabase } from "../lib/supabase";

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



// Premium Role Details for Visual Cards Grid
const ROLE_DETAILS: Record<
  UserRole,
  {
    label: string;
    description: string;
    icon: React.ComponentType<any>;
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
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  onboardingProfile,
  onSave,
  onViewProfile,
  onViewSaved,
  onClose,
  onViewAdminDashboard,
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleExecuteDeleteOwnAccount = async () => {
    setIsDeletingAccount(true);
    try {
      const { error: rpcErr } = await supabase.rpc("delete_own_account");

      if (user?.id) {
        const userKey = `supabase_${user.id}`;
        await Promise.allSettled([
          supabase.from("user_preferences").delete().in("user_key", [userKey, user.id]),
          supabase.from("user_bookmarks").delete().in("user_key", [userKey, user.id]),
          supabase.from("entry_ratings").delete().in("user_key", [userKey, user.id]),
          supabase.from("entry_comments").delete().in("user_key", [userKey, user.id]),
        ]);
      }

      if (rpcErr) {
        console.warn("delete_own_account RPC response:", rpcErr);
      }

      localStorage.removeItem("aiverse_bookmarks");
      localStorage.removeItem("aiverse_onboarding");

      await signOut();
      setShowDeleteConfirm(false);
      onClose?.();
    } catch (err: any) {
      console.error("Account self-deletion error:", err);
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const wrapperCls = (readOnly: boolean) => [
    "relative flex items-center rounded-xl border transition-all duration-300 w-full",
    readOnly
      ? (isDark
          ? "bg-white/[0.01] border-white/5 opacity-60"
          : "bg-black/[0.01] border-black/5 opacity-60")
      : (isDark
          ? "bg-white/[0.02] border-white/8 hover:border-white/15 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.08)]"
          : "bg-black/[0.01] border-black/8 hover:border-black/15 focus-within:border-indigo-600/50 focus-within:ring-1 focus-within:ring-indigo-600/20 focus-within:shadow-[0_0_12px_rgba(79,70,229,0.08)]")
  ].join(" ");

  const dividerCls = isDark ? "border-r border-white/5 text-white/35" : "border-r border-black/5 text-black/35";

  const innerInputCls = [
    "w-full bg-transparent px-3 py-2 text-xs font-medium outline-none border-none focus:ring-0 focus:outline-none",
    isDark ? "text-white placeholder:text-white/25" : "text-gray-900 placeholder:text-gray-400"
  ].join(" ");

  const innerTextareaCls = [
    "w-full bg-transparent px-3 py-2 text-xs font-medium outline-none border-none focus:ring-0 focus:outline-none resize-none",
    isDark ? "text-white placeholder:text-white/25" : "text-gray-900 placeholder:text-gray-400"
  ].join(" ");

  const renderInputWrapper = (
    icon: React.ComponentType<any>,
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
  const labelCls = `block text-[10px] font-semibold uppercase tracking-wider mb-1 ${t.textMuted}`;

  const menuItemCls = [
    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-left cursor-pointer transition-colors duration-150",
    isDark
      ? "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
      : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100",
  ].join(" ");

  const separatorCls = `h-px my-2 mx-1 border-t ${isDark ? "border-white/10" : "border-neutral-200"}`;

  const saveBtnCls = [
    "w-full py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 shadow-xs hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed bg-[#1a73e8] hover:bg-[#1557b0] text-white",
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

          {/* Social Expandable Accordion */}
          <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${
            isDark ? "bg-white/[0.01] border-white/5" : "bg-black/[0.01] border-black/5"
          }`}>
            <button
              type="button"
              onClick={() => setSocialsExpanded(!socialsExpanded)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-left font-bold text-xs uppercase tracking-wider text-white/50 dark:text-white/50 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Link2 size={13} className="text-indigo-400" />
                <span className={t.textSecondary}>Social Profiles</span>
              </div>
              <div className={t.textMuted}>
                {socialsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </button>

            <div className={`profile-section-body ${socialsExpanded ? "is-open" : ""}`}>
              <div className="profile-section-inner">
                <div className="p-3 border-t border-white/5 space-y-3 grid grid-cols-1 gap-3">
                  {renderInputWrapper(GithubLogo, "GitHub", (
                    <input
                      type="url"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/username"
                      className={innerInputCls}
                    />
                  ))}
                  {renderInputWrapper(LinkedinLogo, "LinkedIn", (
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className={innerInputCls}
                    />
                  ))}
                  {renderInputWrapper(BookOpen, "Medium", (
                    <input
                      type="url"
                      value={medium}
                      onChange={(e) => setMedium(e.target.value)}
                      placeholder="https://medium.com/@username"
                      className={innerInputCls}
                    />
                  ))}
                  {renderInputWrapper(Terminal, "Dev.to", (
                    <input
                      type="url"
                      value={devto}
                      onChange={(e) => setDevto(e.target.value)}
                      placeholder="https://dev.to/username"
                      className={innerInputCls}
                    />
                  ))}
                  {renderInputWrapper(Globe, "Portfolio", (
                    <input
                      type="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className={innerInputCls}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

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
      <div className="text-left max-h-[min(70dvh,520px)] overflow-y-auto no-scrollbar py-2 px-1">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3.5 px-2">
          <button
            onClick={() => setCurrentView("main")}
            className={`p-1.5 rounded-lg transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
          >
            <ChevronLeft size={16} />
          </button>
          <h3 className={`font-semibold text-sm ${t.textPrimary}`}>Feed Preferences</h3>
        </div>

        <div className="space-y-5 px-2">
          {/* Role Selector */}
          <div className="space-y-2">
            <label className={labelCls}>Select Your Primary Role</label>
            <div className="grid grid-cols-1 gap-1.5 max-h-[200px] overflow-y-auto pr-1 no-scrollbar">
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
                        ? "border-[#1a73e8] bg-blue-50/70 dark:bg-blue-950/25 ring-1 ring-[#1a73e8]"
                        : isDark
                        ? "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                        : "border-neutral-200 bg-white hover:bg-neutral-50"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-[#1a73e8] text-white"
                        : isDark ? "bg-white/10 text-neutral-400" : "bg-neutral-100 text-neutral-600"
                    }`}>
                      <RoleIcon size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-semibold ${isSelected ? "text-[#1a73e8] dark:text-[#8ab4f8]" : "text-neutral-900 dark:text-white"}`}>
                          {details.label}
                        </p>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-[#1a73e8] bg-white dark:bg-[#1e1f20]" : "border-neutral-300 dark:border-white/20"
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[#1a73e8]" />}
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
          <div className="space-y-2">
            <p className={labelCls}>Customize Interests</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {onboardingOptions.interests.map((item) => {
                const selected = interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-all cursor-pointer ${
                      selected
                        ? "bg-[#e8f0fe] text-[#1a73e8] dark:bg-blue-900/30 dark:text-[#8ab4f8] border-blue-200 dark:border-blue-700/30"
                        : "bg-white dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-white/10 hover:border-neutral-400"
                    }`}
                  >
                    {item.label}
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
    <div className="text-left max-h-[min(70dvh,520px)] overflow-y-auto no-scrollbar py-1">

      {/* ══════════ Account Hero Section ══════════ */}
      <div className="flex flex-col items-center text-center p-3">
        {/* Avatar with subtle ring */}
        <div className="relative mb-2">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-neutral-100 dark:ring-white/10 shadow-md">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center font-bold text-xl ${isDark ? "bg-[#8ab4f8] text-[#1f1f1f]" : "bg-[#1a73e8] text-white"}`}>
                {initials}
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#1e1f20]" title="Active" />
        </div>

        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate max-w-[240px]">
          {displayName}
        </p>
        {username && (
          <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
            {username}
          </p>
        )}
        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[240px] mt-0.5 mb-3">
          {email}
        </p>

        {/* "Manage your Profile" Pill */}
        <button
          type="button"
          onClick={() => {
            if (username && onViewProfile) onViewProfile(username);
            if (onClose) onClose();
          }}
          className="w-full py-1.5 px-4 rounded-full border border-neutral-300 dark:border-white/20 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all text-center cursor-pointer shadow-2xs"
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
        {(user?.email === "frozennheart47@gmail.com" || user?.user_metadata?.role === "admin") && (
          <button
            type="button"
            onClick={() => {
              onViewAdminDashboard?.();
              onClose?.();
            }}
            className={menuItemCls}
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-blue-500/10 text-blue-500">
              <Shield size={13} />
            </div>
            <span className="flex-1 font-medium text-blue-600 dark:text-blue-400">Admin Console</span>
          </button>
        )}

        {/* ── Theme Switcher ── */}
        <div className="px-2 py-2 mt-1">
          <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mb-1.5 px-1">
            <span>Appearance</span>
            <span className="capitalize text-neutral-800 dark:text-neutral-200">{theme}</span>
          </div>
          <div className={`flex rounded-full p-1 gap-1 border ${isDark ? "bg-white/5 border-white/10" : "bg-neutral-100 border-neutral-200"}`}>
            <button
              onClick={() => setTheme("system")}
              title="System"
              className={`flex-1 flex items-center justify-center py-1.5 rounded-full text-xs transition-all ${
                theme === "system"
                  ? (isDark ? "bg-white/15 text-white font-semibold shadow-xs" : "bg-white text-neutral-900 font-semibold shadow-xs")
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Monitor size={13} />
            </button>
            <button
              onClick={() => setTheme("light")}
              title="Light"
              className={`flex-1 flex items-center justify-center py-1.5 rounded-full text-xs transition-all ${
                theme === "light"
                  ? (isDark ? "bg-white/15 text-white font-semibold shadow-xs" : "bg-white text-neutral-900 font-semibold shadow-xs")
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Sun size={13} />
            </button>
            <button
              onClick={() => setTheme("amoled")}
              title="Dark"
              className={`flex-1 flex items-center justify-center py-1.5 rounded-full text-xs transition-all ${
                theme === "amoled"
                  ? (isDark ? "bg-white/15 text-white font-semibold shadow-xs" : "bg-white text-neutral-900 font-semibold shadow-xs")
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Moon size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Hairline separator ── */}
      <div className={separatorCls} />

      {/* ══════════ Sign Out & Danger Zone ══════════ */}
      <div className="px-2 pt-1 pb-1 space-y-2">
        <button
          type="button"
          onClick={() => {
            signOut();
            onClose?.();
          }}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-full border border-neutral-300 dark:border-white/20 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer"
        >
          <LogOut size={13} />
          Sign out of AiVerse
        </button>

        <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-neutral-400">
          <a href="/privacy" onClick={(e) => { e.preventDefault(); onClose?.(); window.location.pathname = "/privacy"; }} className="hover:underline">Privacy</a>
          <span>•</span>
          <a href="/terms" onClick={(e) => { e.preventDefault(); onClose?.(); window.location.pathname = "/terms"; }} className="hover:underline">Terms</a>
          <span>•</span>
          <button onClick={() => setShowDeleteConfirm(true)} className="hover:text-red-500 hover:underline cursor-pointer">Delete account</button>
        </div>
      </div>

      {/* ══════════ Self-Account Deletion Modal ══════════ */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-[fadeIn_0.15s_ease-out]">
          <div className={`relative w-full max-w-sm p-6 rounded-2xl overflow-hidden shadow-2xl space-y-4 border ${
            isDark ? "bg-[#111116] border-white/10 text-white" : "bg-white border-neutral-200 text-neutral-900"
          }`}>
            <div className="flex items-center gap-3 text-red-500">
              <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertTriangle size={20} className="stroke-[2.5px]" />
              </div>
              <h3 className="text-base font-black tracking-tight">Delete Account Permanently</h3>
            </div>
            <p className="text-xs leading-relaxed font-light opacity-80">
              Are you sure you want to delete your account?
              <br /><br />
              This will permanently remove your login credentials from <strong className="text-red-400">auth.users</strong> and erase all bookmarks, profile details, and preferences from everywhere. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isDeletingAccount}
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-neutral-500/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingAccount}
                onClick={handleExecuteDeleteOwnAccount}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white cursor-pointer disabled:opacity-50 transition-colors"
              >
                {isDeletingAccount ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
