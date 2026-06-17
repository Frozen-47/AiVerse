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
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { shareUrlForProfile } from "../lib/entryUrl";
import {
  onboardingOptions,
  type OnboardingInterest,
  type OnboardingProfile,
  type ReferralSource,
  type UserRole,
} from "../lib/onboarding";
import { useTokens, useTheme } from "../lib/theme";

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

function parseProfileMeta(referralSource: string | undefined) {
  if (!referralSource) return null;
  try {
    return JSON.parse(referralSource) as Record<string, string>;
  } catch {
    return null;
  }
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

  const username = (user?.user_metadata?.username as string) || parsedMeta?.username || "";
  const email = user?.email || "";
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const firstName = (user?.user_metadata?.firstName as string) || "";
  const lastName = (user?.user_metadata?.lastName as string) || "";
  const initials = firstName
    ? (firstName[0] + (lastName ? lastName[0] : "")).toUpperCase()
    : (email ? email[0] : "U").toUpperCase();
  const displayName = firstName || email.split("@")[0] || "User";

  useEffect(() => {
    const meta = user?.user_metadata;
    setName((meta?.firstName as string) || parsedMeta?.displayName || "");
    setDescription((meta?.description as string) || parsedMeta?.description || "");
    setGithub((meta?.github as string) || parsedMeta?.github || "");
    setLinkedin((meta?.linkedin as string) || parsedMeta?.linkedin || "");
    setMedium((meta?.medium as string) || parsedMeta?.medium || "");
    setDevto((meta?.devto as string) || parsedMeta?.devto || "");
    setPortfolio((meta?.portfolio as string) || parsedMeta?.portfolio || "");
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
    avatarUrl,
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
  const isDark = resolvedTheme === "amoled";

  const fieldCls = [
    "w-full px-3 py-2 rounded-xl border text-xs font-medium outline-none transition-all duration-200",
    isDark
      ? "bg-white/3 border-white/6 text-white placeholder:text-white/20 focus:border-black/20 focus:bg-white/5 focus:ring-2 focus:ring-black/20"
      : "bg-black/2 border-black/6 text-gray-900 placeholder:text-gray-400 focus:border-black/20 focus:bg-white focus:ring-2 focus:ring-black/20",
  ].join(" ");

  const labelCls = `block text-[10px] font-semibold uppercase tracking-wider mb-1 ${t.textMuted}`;

  const menuItemCls = [
    "w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium text-left cursor-pointer transition-all duration-200",
    isDark
      ? "text-white/55 hover:text-white hover:bg-white/4 active:bg-white/6"
      : "text-gray-500 hover:text-gray-900 hover:bg-black/3 active:bg-black/5",
  ].join(" ");

  const separatorCls = `h-px mx-3 my-1.5 bg-gradient-to-r from-transparent ${isDark ? "via-white/7" : "via-black/6"} to-transparent`;

  const saveBtnCls =
    "w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 bg-black text-white hover:bg-black/90 shadow-md hover:shadow-lg disabled:opacity-40 disabled:saturate-50 disabled:cursor-not-allowed";

  // ---------------------------------------------------------------------------
  // Profile View
  // ---------------------------------------------------------------------------
  if (currentView === "profile") {
    return (
      <div className="text-left max-h-[min(70dvh,520px)] overflow-y-auto no-scrollbar py-2 px-1 animate-[fadeIn_0.2s_ease-out]">
        <div className="flex items-center gap-2 mb-3 px-2">
          <button
            onClick={() => setCurrentView("main")}
            className={`p-1.5 rounded-lg transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
          >
            <ChevronLeft size={16} />
          </button>
          <h3 className={`font-semibold text-sm ${t.textPrimary}`}>Edit Profile</h3>
        </div>

        <div className="space-y-3 px-2">
          {/* Name */}
          <div>
            <label className={labelCls}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldCls}
              maxLength={50}
            />
          </div>

          {/* Username (read-only) */}
          <div>
            <label className={labelCls}>Username</label>
            <input
              type="text"
              value={username}
              readOnly
              disabled
              className={`${fieldCls} opacity-50 cursor-not-allowed`}
              title="Username is set during onboarding and cannot be changed"
            />
          </div>

          {/* Bio + character counter */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className={`text-[10px] font-semibold uppercase tracking-wider ${t.textMuted}`}>
                Bio
              </label>
              <span className={`text-[10px] tabular-nums ${
                description.length > 140 ? "text-amber-400" : t.textMuted
              }`}>
                {description.length}/160
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              maxLength={160}
              className={`${fieldCls} resize-none`}
              placeholder="Tell other builders about yourself..."
            />
          </div>

          {/* Social links */}
          <div className={`p-2.5 rounded-lg border space-y-2 ${
            isDark ? "bg-white/1 border-white/4" : "bg-black/1 border-black/4"
          }`}>
            <p className={`text-[10px] font-semibold uppercase tracking-wider ${t.textMuted}`}>
              Social links
            </p>
            {[
              { key: "github",   label: "GitHub URL",    value: github,    set: setGithub },
              { key: "linkedin", label: "LinkedIn URL",  value: linkedin,  set: setLinkedin },
              { key: "medium",   label: "Medium URL",    value: medium,    set: setMedium },
              { key: "devto",    label: "Dev.to URL",    value: devto,     set: setDevto },
              { key: "portfolio",label: "Portfolio URL",  value: portfolio, set: setPortfolio },
            ].map(({ key, label, value, set }) => (
              <input
                key={key}
                type="url"
                value={value}
                onChange={(e) => set(e.target.value)}
                placeholder={label}
                className={fieldCls}
              />
            ))}
          </div>

          {/* Save button */}
          <button
            type="button"
            onClick={() => void saveProfile()}
            disabled={saving === "profile" || !name.trim()}
            className={saveBtnCls}
          >
            {saving === "profile" ? "Saving…" : "Save profile"}
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
      <div className="text-left max-h-[min(70dvh,520px)] overflow-y-auto no-scrollbar py-2 px-1 animate-[fadeIn_0.2s_ease-out]">
        <div className="flex items-center gap-2 mb-3 px-2">
          <button
            onClick={() => setCurrentView("main")}
            className={`p-1.5 rounded-lg transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
          >
            <ChevronLeft size={16} />
          </button>
          <h3 className={`font-semibold text-sm ${t.textPrimary}`}>Feed Preferences</h3>
        </div>

        <div className="space-y-4 px-2">
          {/* Role selector */}
          <div>
            <label className={labelCls}>Role</label>
            <select
              value={role ?? ""}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className={fieldCls}
            >
              <option value="" disabled>
                Select role
              </option>
              {onboardingOptions.roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Interest pills */}
          <div>
            <p className={labelCls}>Interests</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {onboardingOptions.interests.map((item) => {
                const selected = interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selected
                        ? `${t.pillActive} shadow-sm shadow-black/10`
                        : `${t.surface} ${t.border} ${t.textMuted} hover:${t.textSecondary}`
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save button */}
          <button
            type="button"
            onClick={() => void savePreferences()}
            disabled={saving === "preferences" || !role}
            className={saveBtnCls}
          >
            {saving === "preferences" ? "Saving…" : "Save preferences"}
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Main View
  // ---------------------------------------------------------------------------
  return (
    <div className="text-left max-h-[min(70dvh,520px)] overflow-y-auto no-scrollbar py-1 animate-[fadeIn_0.2s_ease-out]">

      {/* ══════════ Hero Avatar Section ══════════ */}
      <div className="relative overflow-hidden rounded-xl mb-0.5 mx-0.5">
        {/* Gradient background strip */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-black/5 to-transparent" />
        <button
          type="button"
          onClick={() => {
            if (username && onViewProfile) onViewProfile(username);
            if (onClose) onClose();
          }}
          className="relative flex items-center gap-3.5 w-full p-3 text-left cursor-pointer group rounded-xl transition-colors duration-200"
        >
          {/* Avatar with glow ring */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-black/20 transition-all duration-500 shadow-lg group-hover:shadow-black/10">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center font-bold text-lg ${isDark ? "bg-white text-black" : "bg-black text-white"}`}>
                  {initials}
                </div>
              )}
            </div>
            {/* Online status dot */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-[2.5px] border-[#0a0a0a] shadow-sm shadow-emerald-500/50" />
          </div>

          {/* Identity */}
          <div className="min-w-0">
            <p className={`text-sm font-bold truncate transition-colors duration-200 ${t.textPrimary} ${isDark ? "group-hover:text-white" : "group-hover:text-black"}`}>
              {displayName}
            </p>
            {username && (
              <p className={`text-xs font-bold truncate ${isDark ? "text-white/60" : "text-black/60"}`}>{username}</p>
            )}
            <p className={`text-[11px] truncate mt-0.5 ${t.textMuted}`}>{email}</p>
          </div>
        </button>
      </div>

      {/* ── Gradient separator ── */}
      <div className={separatorCls} />

      {/* ══════════ Menu Items ══════════ */}
      <div className="space-y-0.5 px-0.5">

        {/* ── Copy profile link ── */}
        {username && (
          <div className="profile-menu-stagger" style={{ animationDelay: "0ms" }}>
            <button
              type="button"
              onClick={handleCopyLink}
              className={`${menuItemCls} ${linkCopied ? "text-emerald-400!" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                  linkCopied
                    ? "bg-emerald-500/15 text-emerald-600"
                    : `${isDark ? "bg-white/8 text-white/70" : "bg-black/5 text-black/60"}`
                }`}
              >
                {linkCopied ? (
                  <Check size={14} className="success-check-pop" />
                ) : (
                  <Link2 size={14} />
                )}
              </div>
              <span>{linkCopied ? "Link copied!" : "Copy profile link"}</span>
            </button>
          </div>
        )}

        {/* ── Edit Profile ── */}
        <div className="profile-menu-stagger" style={{ animationDelay: "40ms" }}>
          <button
            type="button"
            onClick={() => setCurrentView("profile")}
            className={menuItemCls}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-white/8 text-white/70" : "bg-black/5 text-black/60"}`}>
              <User size={14} />
            </div>
            <span className="flex-1">Edit profile</span>
          </button>
        </div>

        {/* ── Saved Entries ── */}
        <div className="profile-menu-stagger" style={{ animationDelay: "60ms" }}>
          <button
            type="button"
            onClick={() => {
              if (onViewSaved) onViewSaved();
              if (onClose) onClose();
            }}
            className={menuItemCls}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-white/8 text-white/70" : "bg-black/5 text-black/60"}`}>
              <Bookmark size={14} />
            </div>
            <span className="flex-1">Saved entries</span>
          </button>
        </div>

        {/* ── Feed Preferences ── */}
        <div className="profile-menu-stagger" style={{ animationDelay: "80ms" }}>
          <button
            type="button"
            onClick={() => setCurrentView("preferences")}
            className={menuItemCls}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-white/8 text-white/70" : "bg-black/5 text-black/60"}`}>
              <SlidersHorizontal size={14} />
            </div>
            <span className="flex-1">Feed preferences</span>
          </button>
        </div>

        {/* ── Admin Dashboard ── */}
        {user?.email === "frozennheart47@gmail.com" || user?.user_metadata?.role === "admin" ? (
          <div className="profile-menu-stagger" style={{ animationDelay: "100ms" }}>
            <button
              type="button"
              onClick={() => {
                onViewAdminDashboard?.();
                onClose?.();
              }}
              className={menuItemCls}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-500/10 text-amber-600"}`}>
                <Shield size={14} className="stroke-[2px]" />
              </div>
              <span className={`flex-1 font-semibold ${isDark ? "text-amber-400" : "text-amber-600"}`}>Admin Dashboard</span>
            </button>
          </div>
        ) : null}

        {/* ── Theme Selection ── */}
        <div className="profile-menu-stagger px-1.5 py-2 mt-1" style={{ animationDelay: "120ms" }}>
          <div className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ml-1 ${t.textMuted}`}>Theme</div>
          <div className={`flex rounded-xl p-1 gap-1 border ${isDark ? "bg-white/2 border-white/4" : "bg-black/2 border-black/4"}`}>
            <button
              onClick={() => setTheme("system")}
              title="System"
              className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                theme === "system"
                  ? (isDark ? "bg-white/10 shadow-sm text-white" : "bg-white shadow-sm text-neutral-900")
                  : `hover:bg-black/5 dark:hover:bg-white/5 ${t.textMuted}`
              }`}
            >
              <Monitor size={14} />
            </button>
            <button
              onClick={() => setTheme("light")}
              title="Light"
              className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                theme === "light"
                  ? (isDark ? "bg-white/10 shadow-sm text-white" : "bg-white shadow-sm text-neutral-900")
                  : `hover:bg-black/5 dark:hover:bg-white/5 ${t.textMuted}`
              }`}
            >
              <Sun size={14} />
            </button>
            <button
              onClick={() => setTheme("amoled")}
              title="Dark"
              className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                theme === "amoled"
                  ? (isDark ? "bg-white/10 shadow-sm text-white" : "bg-white shadow-sm text-neutral-900")
                  : `hover:bg-black/5 dark:hover:bg-white/5 ${t.textMuted}`
              }`}
            >
              <Moon size={14} />
            </button>
          </div>
        </div>


      </div>

      {/* ── Gradient separator ── */}
      <div className={separatorCls} />

      {/* ══════════ Sign Out ══════════ */}
      <div className="px-0.5 profile-menu-stagger" style={{ animationDelay: "160ms" }}>
        <button
          type="button"
          onClick={() => {
            signOut();
            onClose?.();
          }}
          className={[
            "w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-semibold text-left cursor-pointer transition-all duration-200",
            "text-red-400 hover:text-red-300",
            isDark ? "hover:bg-red-500/6" : "hover:bg-red-500/4",
          ].join(" ")}
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-red-500/10 text-red-400 transition-colors duration-200 group-hover:bg-red-500/20">
            <LogOut size={14} />
          </div>
          Sign out
        </button>
      </div>
    </div>
  );
};
