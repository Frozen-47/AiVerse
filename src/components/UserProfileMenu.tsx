import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Link2,
  Check,
  LogOut,
  Moon,
  Sun,
  SlidersHorizontal,
  User,
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
  onSave: (
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
}

type TreeSection = "profile" | "preferences";

function parseProfileMeta(referralSource: string | undefined) {
  if (!referralSource) return null;
  try {
    return JSON.parse(referralSource) as Record<string, string>;
  } catch {
    return null;
  }
}

function TreeRow({
  depth,
  children,
  className = "",
}: {
  depth: number;
  children: React.ReactNode;
  className?: string;
}) {
  const pad = depth === 0 ? "pl-0" : depth === 1 ? "pl-3" : "pl-6";
  return (
    <div className={`${pad} ${depth > 0 ? "border-l border-white/10 ml-2" : ""} ${className}`}>
      {children}
    </div>
  );
}

function TreeToggle({
  label,
  open,
  onToggle,
  icon: Icon,
  t,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  t: ReturnType<typeof useTokens>;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full flex items-center gap-2 py-2 text-sm font-medium text-left cursor-pointer ${t.textSecondary} hover:${t.textPrimary}`}
    >
      {open ? <ChevronDown size={14} className="shrink-0 opacity-60" /> : <ChevronRight size={14} className="shrink-0 opacity-60" />}
      <Icon size={15} className="shrink-0" />
      {label}
    </button>
  );
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  onboardingProfile,
  onSave,
  onViewProfile,
}) => {
  const t = useTokens();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  const [openSections, setOpenSections] = useState<Set<TreeSection>>(new Set());
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

  const toggleSection = (section: TreeSection) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

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
  });

  const saveProfile = async () => {
    const profile = buildProfilePayload();
    if (!profile || !name.trim()) return;
    setSaving("profile");
    try {
      await onSave(profile, profileMeta());
    } finally {
      setSaving(null);
    }
  };

  const savePreferences = async () => {
    const profile = buildProfilePayload();
    if (!profile || !role) return;
    setSaving("preferences");
    try {
      await onSave({ ...profile, role, interests }, profileMeta());
    } finally {
      setSaving(null);
    }
  };

  const toggleInterest = (id: OnboardingInterest) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const fieldCls = `w-full px-2.5 py-1.5 rounded-lg border text-xs font-medium outline-hidden ${t.surface} ${t.border} ${t.textPrimary} focus:border-cyan-500/50`;
  const labelCls = `block text-[10px] font-semibold uppercase tracking-wider mb-1 ${t.textMuted}`;

  return (
    <div className="text-left max-h-[min(70dvh,520px)] overflow-y-auto no-scrollbar py-1">
      {/* Profile image + identity */}
      <TreeRow depth={0} className="px-1 pb-3 mb-2 border-b border-white/10">
        <button
          type="button"
          onClick={() => username && onViewProfile?.(username)}
          className="flex items-center gap-3 w-full text-left cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-cyan-500 to-blue-500 text-white font-bold">
                {initials}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-bold truncate group-hover:text-cyan-400 ${t.textPrimary}`}>{displayName}</p>
            {username && <p className="text-xs font-bold text-cyan-400 truncate">{username}</p>}
            <p className={`text-[11px] truncate ${t.textMuted}`}>{email}</p>
          </div>
        </button>
      </TreeRow>

      {/* Copy link */}
      {username && (
        <TreeRow depth={0}>
          <button
            type="button"
            onClick={handleCopyLink}
            className={`w-full flex items-center gap-2 py-2 text-sm font-medium text-left cursor-pointer ${
              linkCopied ? "text-emerald-400" : `${t.textSecondary} hover:${t.textPrimary}`
            }`}
          >
            <ChevronRight size={14} className="shrink-0 opacity-0" />
            {linkCopied ? <Check size={15} /> : <Link2 size={15} />}
            {linkCopied ? "Link copied!" : "Copy profile link"}
          </button>
        </TreeRow>
      )}

      {/* Edit profile */}
      <TreeRow depth={0}>
        <TreeToggle
          label="Edit profile"
          open={openSections.has("profile")}
          onToggle={() => toggleSection("profile")}
          icon={User}
          t={t}
        />
        {openSections.has("profile") && (
          <TreeRow depth={1} className="space-y-2.5 pb-2">
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
            <div>
              <label className={labelCls}>Username</label>
              <input
                type="text"
                value={username}
                readOnly
                disabled
                className={`${fieldCls} opacity-60 cursor-not-allowed`}
                title="Username is set during onboarding and cannot be changed"
              />
            </div>
            <div>
              <label className={labelCls}>Bio</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                maxLength={160}
                className={`${fieldCls} resize-none`}
                placeholder="Tell other builders about yourself..."
              />
            </div>
            <TreeRow depth={2} className="space-y-1.5">
              <p className={labelCls}>Social links</p>
              <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub URL" className={fieldCls} />
              <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className={fieldCls} />
              <input type="url" value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="Medium URL" className={fieldCls} />
              <input type="url" value={devto} onChange={(e) => setDevto(e.target.value)} placeholder="Dev.to URL" className={fieldCls} />
              <input type="url" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="Portfolio URL" className={fieldCls} />
            </TreeRow>
            <button
              type="button"
              onClick={() => void saveProfile()}
              disabled={saving === "profile" || !name.trim()}
              className="w-full py-2 rounded-lg text-xs font-bold bg-white text-black hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
            >
              {saving === "profile" ? "Saving…" : "Save profile"}
            </button>
          </TreeRow>
        )}
      </TreeRow>

      {/* Feed preferences */}
      <TreeRow depth={0}>
        <TreeToggle
          label="Feed preferences"
          open={openSections.has("preferences")}
          onToggle={() => toggleSection("preferences")}
          icon={SlidersHorizontal}
          t={t}
        />
        {openSections.has("preferences") && (
          <TreeRow depth={1} className="space-y-2.5 pb-2">
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
            <TreeRow depth={2}>
              <p className={labelCls}>Interests</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {onboardingOptions.interests.map((item) => {
                  const selected = interests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`text-[10px] font-semibold px-2 py-1 rounded-md border cursor-pointer ${
                        selected ? t.pillActive : `${t.surface} ${t.border} ${t.textMuted}`
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </TreeRow>
            <button
              type="button"
              onClick={() => void savePreferences()}
              disabled={saving === "preferences" || !role}
              className="w-full py-2 rounded-lg text-xs font-bold bg-white text-black hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
            >
              {saving === "preferences" ? "Saving…" : "Save preferences"}
            </button>
          </TreeRow>
        )}
      </TreeRow>

      {/* Theme */}
      <TreeRow depth={0}>
        <button
          type="button"
          onClick={() => setTheme(theme === "amoled" ? "light" : "amoled")}
          className={`w-full flex items-center gap-2 py-2 text-sm font-medium text-left cursor-pointer ${t.textSecondary} hover:${t.textPrimary}`}
        >
          <ChevronRight size={14} className="shrink-0 opacity-0" />
          {theme === "amoled" ? <Sun size={15} /> : <Moon size={15} />}
          Theme: {theme === "amoled" ? "AMOLED" : "Light"}
        </button>
      </TreeRow>

      <div className="border-t border-white/10 my-2" />

      {/* Sign out */}
      <TreeRow depth={0}>
        <button
          type="button"
          onClick={() => signOut()}
          className="w-full flex items-center gap-2 py-2 text-sm font-semibold text-red-400 hover:text-red-300 text-left cursor-pointer"
        >
          <ChevronRight size={14} className="shrink-0 opacity-0" />
          <LogOut size={15} />
          Sign out
        </button>
      </TreeRow>
    </div>
  );
};
