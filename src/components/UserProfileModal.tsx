import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Loader2,
  Cpu,
  Layers,
  GitBranch,
  Sparkles,
  Terminal,
  Compass,
  Share2,
  Check,
  Laptop,
  Code2,
  LayoutGrid,
  Shield,
  Bookmark,
} from "lucide-react";
import { fetchProfileByUsername, type PublicBuilderProfile } from "../lib/supabase";
import { useTokens, useTheme } from "../lib/theme";
import { roleLabel } from "../lib/onboarding";
import { useAuth } from "./AuthContext";
import { shareUrlForProfile } from "../lib/entryUrl";

interface UserProfileModalProps {
  username: string;
  onClose: () => void;
}

type TabId = "overview" | "accolades" | "gear" | "bookmarks";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutGrid size={14} /> },
  { id: "accolades", label: "Accolades", icon: <Shield size={14} /> },
  { id: "gear", label: "Build gear", icon: <Cpu size={14} /> },
  { id: "bookmarks", label: "Bookmarks", icon: <Bookmark size={14} /> },
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  username,
  onClose,
}) => {
  const t = useTokens();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "amoled";
  const { user } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<PublicBuilderProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [copied, setCopied] = useState(false);
  const [savedEntries, setSavedEntries] = useState<string[]>([]);

  const isOwnProfile =
    user?.user_metadata?.username?.toLowerCase() === username.toLowerCase();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const loadData = async () => {
      if (isOwnProfile) {
        const meta = user?.user_metadata;
        const p: PublicBuilderProfile = {
          userKey: user?.id || "",
          displayName: meta?.firstName || "Builder",
          username: meta?.username || username,
          description: meta?.description || "",
          github: meta?.github || "",
          linkedin: meta?.linkedin || "",
          medium: meta?.medium || "",
          devto: meta?.devto || "",
          portfolio: meta?.portfolio || "",
          role: meta?.role || "developer",
          interests: meta?.interests || [],
          avatarUrl: meta?.avatarUrl || meta?.avatar_url || undefined,
        };
        if (active) {
          setProfile(p);
          // Only fetch bookmarks if it's the own profile
          try {
            const { fetchUserBookmarks, bookmarkUserKey } = await import("../lib/entryBookmarks");
            const bmarks = await fetchUserBookmarks(bookmarkUserKey(user?.id || ""));
            setSavedEntries(bmarks);
          } catch (err) {
            console.error(err);
          }
          setLoading(false);
        }
        return;
      }

      fetchProfileByUsername(username)
        .then((data) => {
          if (!active) return;
          if (data) setProfile(data);
          else setError(`No profile found for ${username}`);
        })
        .catch(() => {
          if (active) setError("Could not load developer profile.");
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    };

    loadData();

    return () => {
      active = false;
    };
  }, [username, isOwnProfile, user]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const initials = profile?.displayName
    ? profile.displayName.slice(0, 2).toUpperCase()
    : username.replace("@", "").slice(0, 2).toUpperCase();

  const handleShare = () => {
    if (!profile?.username) return;
    navigator.clipboard.writeText(shareUrlForProfile(profile.username));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // XP / level derived from interests count
  const builderLevel = Math.min(10, Math.max(1, (profile?.interests?.length ?? 1)));
  const baseXP = builderLevel * 150;
  const maxXP = 1500;
  const xpPercent = Math.min(100, Math.round((baseXP / maxXP) * 100));

  const accoladesList = [
    {
      id: "titan",
      title: "Open-source Titan",
      desc: "Contributed shared repositories to GitHub",
      icon: GitBranch,
      unlocked: !!profile?.github,
    },
    {
      id: "hunter",
      title: "Bug Hunter",
      desc: "Squashed async races and critical memory locks",
      icon: Terminal,
      unlocked: true,
    },
    {
      id: "alchemist",
      title: "Code Alchemist",
      desc: "Synthesized abstract models from conceptual products",
      icon: Sparkles,
      unlocked:
        (profile?.interests || []).length >= 3 || profile?.role === "developer",
    },
    {
      id: "oracle",
      title: "API Oracle",
      desc: "Exposed robust endpoints and web assets to the community",
      icon: Layers,
      unlocked: !!(profile?.portfolio || profile?.devto || profile?.medium),
    },
    {
      id: "neural",
      title: "Neural Pathfinder",
      desc: "Engineered deep neural network pipeline topologies",
      icon: Cpu,
      unlocked:
        profile?.role === "ml_engineer" ||
        profile?.role === "researcher" ||
        (profile?.interests || []).some((i) =>
          ["nlp", "cv", "computer_vision", "multimodal", "audio"].includes(
            i.toLowerCase(),
          ),
        ),
    },
    {
      id: "explorer",
      title: "Cosmic Explorer",
      desc: "Ventured into novel multi-agent architectures",
      icon: Compass,
      unlocked:
        profile?.role === "hobbyist" ||
        profile?.role === "student" ||
        (profile?.interests || []).length >= 5,
    },
  ];

  const gearConfig = (() => {
    const r = profile?.role?.toLowerCase() || "";
    if (r === "ml_engineer")
      return [
        { label: "Main IDE", val: "Cursor / Vim", icon: Laptop },
        { label: "Language", val: "Python 3.11", icon: Code2 },
        { label: "Framework", val: "PyTorch", icon: Cpu },
        { label: "Terminal", val: "zsh + Warp", icon: Terminal },
      ];
    if (r === "researcher")
      return [
        { label: "Main IDE", val: "VS Code", icon: Laptop },
        { label: "Language", val: "Python / LaTeX", icon: Code2 },
        { label: "Framework", val: "JAX & Equinox", icon: Cpu },
        { label: "Terminal", val: "bash + tmux", icon: Terminal },
      ];
    if (r === "developer")
      return [
        { label: "Main IDE", val: "Cursor AI", icon: Laptop },
        { label: "Language", val: "TypeScript & Rust", icon: Code2 },
        { label: "Framework", val: "Next.js", icon: Cpu },
        { label: "Terminal", val: "zsh + Oh My Zsh", icon: Terminal },
      ];
    if (r === "product")
      return [
        { label: "Main IDE", val: "Notion + Figma", icon: Laptop },
        { label: "Language", val: "Markdown & SQL", icon: Code2 },
        { label: "Framework", val: "React", icon: Cpu },
        { label: "Terminal", val: "Slack CLI", icon: Terminal },
      ];
    return [
      { label: "Main IDE", val: "VS Code", icon: Laptop },
      { label: "Language", val: "JavaScript / Python", icon: Code2 },
      { label: "Framework", val: "React Stack", icon: Cpu },
      { label: "Terminal", val: "Standard Shell", icon: Terminal },
    ];
  })();

  const socialLinks = [
    { name: "GitHub", url: profile?.github, icon: GitBranch },
    { name: "LinkedIn", url: profile?.linkedin, icon: Layers },
    { name: "Medium", url: profile?.medium, icon: Sparkles },
    { name: "Dev.to", url: profile?.devto, icon: Code2 },
    { name: "Portfolio", url: profile?.portfolio, icon: Compass },
  ].filter((l) => l.url);

  // ─── Shared style primitives ───────────────────────────────────────────────
  const cardBorder = isDark
    ? "border border-white/8"
    : "border border-black/8";

  const cardBg = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  const sectionLabel = `text-[10px] font-semibold uppercase tracking-widest mb-3 ${isDark ? "text-white/35" : "text-black/35"}`;

  return (
    <div className={`${t.modalOverlay} user-profile-modal`}>
      <div
        ref={modalRef}
        className={`relative w-full max-w-lg flex flex-col rounded-2xl overflow-hidden shadow-2xl ${t.modal}`}
        style={{ maxHeight: "90dvh" }}
      >
        {/* ── Loading ────────────────────────────────────────────────────── */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2
              size={24}
              className={`animate-spin ${isDark ? "text-white/30" : "text-black/30"}`}
            />
          </div>
        )}

        {/* ── Error ──────────────────────────────────────────────────────── */}
        {!loading && (error || !profile) && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 px-8 text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? "bg-white/6 text-white/40" : "bg-black/6 text-black/40"}`}
            >
              !
            </div>
            <p className={`text-sm font-medium ${t.textPrimary}`}>
              Profile not found
            </p>
            <p className={`text-xs ${t.textMuted}`}>
              {error || "This profile hasn't been set up yet."}
            </p>
            <button
              onClick={onClose}
              className={`mt-2 text-xs px-4 py-2 rounded-xl ${cardBg} ${cardBorder} ${t.textSecondary}`}
            >
              Close
            </button>
          </div>
        )}

        {/* ── Profile ────────────────────────────────────────────────────── */}
        {!loading && profile && (
          <>
            {/* Header */}
            <div
              className={`px-5 pt-5 pb-0 ${isDark ? "border-b border-white/6" : "border-b border-black/6"}`}
            >
              {/* Top row: avatar + identity + actions */}
              <div className="flex items-start gap-3 mb-4">
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold shrink-0 overflow-hidden ${isDark ? "bg-white/8 text-white" : "bg-black/6 text-black"}`}
                >
                  {(profile as any).avatarUrl ? (
                    <img
                      src={(profile as any).avatarUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                {/* Identity */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <h2
                    className={`text-[17px] font-semibold leading-tight truncate ${t.textPrimary}`}
                  >
                    {profile.displayName}
                  </h2>
                  <p className={`text-xs mt-0.5 mb-2 ${t.textMuted}`}>
                    {profile.username}
                  </p>
                  {profile.role && (
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${isDark ? "bg-white/6 text-white/60" : "bg-black/5 text-black/50"}`}
                    >
                      {roleLabel(profile.role as any)}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  <button
                    onClick={handleShare}
                    title="Share profile"
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${cardBg} ${cardBorder} ${copied ? "text-emerald-500" : t.textMuted} hover:${t.textSecondary}`}
                  >
                    {copied ? <Check size={14} /> : <Share2 size={14} />}
                  </button>
                  <button
                    onClick={onClose}
                    title="Close"
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${cardBg} ${cardBorder} ${t.textMuted} hover:${t.textSecondary}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Bio */}
              {profile.description && (
                <p
                  className={`text-[13px] leading-relaxed mb-3 ${t.textSecondary}`}
                >
                  {profile.description}
                </p>
              )}

              {/* Interest tags */}
              {profile.interests && profile.interests.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className={`text-[11px] px-2 py-0.5 rounded-full ${isDark ? "bg-white/5 text-white/50 border border-white/8" : "bg-black/4 text-black/50 border border-black/8"}`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}

              {/* Tabs */}
              <div className="flex gap-0 -mb-px">
                {TABS.map((tab) => {
                  if (tab.id === "bookmarks" && !isOwnProfile) return null;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-medium border-b-2 transition-colors ${
                        isActive
                          ? `border-current ${isDark ? "text-white" : "text-black"}`
                          : `border-transparent ${t.textMuted} hover:${t.textSecondary}`
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-5">

              {/* ── Overview tab ─────────────────────────────────────────── */}
              {activeTab === "overview" && (
                <div className="animate-[fadeIn_0.15s_ease-out]">
                  {/* XP bar */}
                  <div className="mb-4">
                    <div
                      className={`flex justify-between items-center mb-1.5 text-[11px] ${t.textMuted}`}
                    >
                      <span>Builder XP — Level {builderLevel}</span>
                      <span>
                        {baseXP} / {maxXP}
                      </span>
                    </div>
                    <div
                      className={`h-1 rounded-full overflow-hidden ${isDark ? "bg-white/8" : "bg-black/8"}`}
                    >
                      <div
                        className={`h-full rounded-full transition-all ${isDark ? "bg-white/60" : "bg-black/60"}`}
                        style={{ width: `${xpPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className={`rounded-xl p-3 ${cardBg} ${cardBorder}`}>
                      <p className={`text-[10px] uppercase tracking-wider mb-1 ${isDark ? "text-white/30" : "text-black/30"}`}>
                        Reputation tier
                      </p>
                      <p className={`text-sm font-medium ${t.textPrimary}`}>
                        Tier {builderLevel} Contributor
                      </p>
                    </div>
                    <div className={`rounded-xl p-3 ${cardBg} ${cardBorder}`}>
                      <p className={`text-[10px] uppercase tracking-wider mb-1 ${isDark ? "text-white/30" : "text-black/30"}`}>
                        Status
                      </p>
                      <p className={`text-sm font-medium flex items-center gap-1.5 ${t.textPrimary}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        Online
                      </p>
                    </div>
                  </div>

                  {/* Social links */}
                  {socialLinks.length > 0 && (
                    <div
                      className={`pt-4 border-t ${isDark ? "border-white/6" : "border-black/6"}`}
                    >
                      <p className={sectionLabel}>Web connections</p>
                      <div className="flex flex-wrap gap-2">
                        {socialLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <a
                              key={link.name}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors ${cardBg} ${cardBorder} ${t.textSecondary} hover:${t.textPrimary}`}
                            >
                              <Icon size={12} />
                              {link.name}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Accolades tab ─────────────────────────────────────────── */}
              {activeTab === "accolades" && (
                <div className="animate-[fadeIn_0.15s_ease-out]">
                  <p className={sectionLabel}>Achievements</p>
                  <div className="flex flex-col gap-2">
                    {accoladesList.map((accolade) => {
                      const Icon = accolade.icon;
                      return (
                        <div
                          key={accolade.id}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-opacity ${cardBorder} ${
                            accolade.unlocked
                              ? `${cardBg}`
                              : `${isDark ? "bg-transparent opacity-35" : "bg-transparent opacity-30"}`
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              accolade.unlocked
                                ? isDark
                                  ? "bg-white/8 text-white/70"
                                  : "bg-black/6 text-black/60"
                                : isDark
                                  ? "bg-white/4 text-white/25"
                                  : "bg-black/4 text-black/25"
                            }`}
                          >
                            <Icon size={15} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-[13px] font-medium leading-tight ${t.textPrimary}`}
                            >
                              {accolade.title}
                            </p>
                            <p
                              className={`text-[11px] mt-0.5 leading-snug ${t.textMuted}`}
                            >
                              {accolade.desc}
                            </p>
                          </div>
                          {accolade.unlocked && (
                            <span
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${isDark ? "bg-emerald-500/12 text-emerald-400" : "bg-emerald-500/10 text-emerald-600"}`}
                            >
                              Earned
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Gear tab ──────────────────────────────────────────────── */}
              {activeTab === "gear" && (
                <div className="animate-[fadeIn_0.15s_ease-out]">
                  <p className={sectionLabel}>Technical environment</p>
                  <div className="grid grid-cols-2 gap-2">
                    {gearConfig.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-3 p-3 rounded-xl ${cardBg} ${cardBorder}`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-white/6 text-white/50" : "bg-black/5 text-black/40"}`}
                          >
                            <Icon size={15} />
                          </div>
                          <div className="min-w-0">
                            <p
                              className={`text-[10px] uppercase tracking-wider mb-0.5 ${isDark ? "text-white/30" : "text-black/30"}`}
                            >
                              {item.label}
                            </p>
                            <p
                              className={`text-[13px] font-medium truncate ${t.textPrimary}`}
                            >
                              {item.val}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Bookmarks tab ─────────────────────────────────────────── */}
              {activeTab === "bookmarks" && isOwnProfile && (
                <div className="animate-[fadeIn_0.15s_ease-out]">
                  <p className={sectionLabel}>Saved resources</p>
                  {savedEntries.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {savedEntries.map((name) => (
                        <div key={name} className={`flex items-center gap-3 p-3 rounded-xl ${cardBg} ${cardBorder}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-white/6 text-white/50" : "bg-black/5 text-black/40"}`}>
                            <Bookmark size={15} />
                          </div>
                          <p className={`text-[13px] font-medium ${t.textPrimary}`}>{name}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-[13px] ${t.textMuted}`}>No saved entries yet.</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};