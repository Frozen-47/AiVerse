import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Share2,
  Check,
  Copy,
  ExternalLink,
  Bookmark,
  LayoutGrid,
  Code2,
  Rocket,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Edit3,
  Plus,
  Loader2,
  BookOpen,
  Sparkles,
  Compass,
  Calendar,
  AlertCircle,
  FolderGit2,
  Award,
} from "lucide-react";
import { supabase, fetchProfileByUsername, getOAuthAvatarUrl, type PublicBuilderProfile } from "../lib/supabase";
import { fetchUserBookmarks } from "../lib/entryBookmarks";
import type { Entry } from "../types";
import { useTheme } from "../lib/theme";
import { useAuth } from "./AuthContext";
import { shareUrlForProfile } from "../lib/entryUrl";

export interface UserProfileViewProps {
  username: string;
  onBackToHome: () => void;
  onViewEntry?: (entry: Entry) => void;
  onExploreCatalog?: () => void;
  onAddEntry?: () => void;
  onEditProfile?: () => void;
}

type TabId = "submissions" | "bookmarks" | "about";

// Role-specific styles and icons
const getRoleConfig = (role: string, isDark: boolean) => {
  const r = (role || "").toLowerCase();

  if (r === "researcher") {
    return {
      label: "AI Researcher",
      icon: <BookOpen size={12} className="stroke-[2.5px]" />,
      badgeCls: isDark
        ? "text-violet-400 bg-violet-500/10 border-violet-500/30"
        : "text-violet-700 bg-violet-50 border-violet-200",
      accentBg: "from-violet-600/20 via-purple-600/10 to-indigo-600/20",
    };
  }
  if (r === "designer") {
    return {
      label: "AI Product Designer",
      icon: <Sparkles size={12} className="stroke-[2.5px]" />,
      badgeCls: isDark
        ? "text-pink-400 bg-pink-500/10 border-pink-500/30"
        : "text-pink-700 bg-pink-50 border-pink-200",
      accentBg: "from-pink-600/20 via-rose-600/10 to-amber-600/20",
    };
  }
  if (r === "entrepreneur") {
    return {
      label: "AI Founder & Entrepreneur",
      icon: <Rocket size={12} className="stroke-[2.5px]" />,
      badgeCls: isDark
        ? "text-amber-400 bg-amber-500/10 border-amber-500/30"
        : "text-amber-700 bg-amber-50 border-amber-200",
      accentBg: "from-amber-600/20 via-orange-600/10 to-red-600/20",
    };
  }
  if (r === "enthusiast") {
    return {
      label: "AI Enthusiast",
      icon: <Globe size={12} className="stroke-[2.5px]" />,
      badgeCls: isDark
        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
        : "text-emerald-700 bg-emerald-50 border-emerald-200",
      accentBg: "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
    };
  }

  return {
    label: "AI Systems Engineer",
    icon: <Code2 size={12} className="stroke-[2.5px]" />,
    badgeCls: isDark
      ? "text-sky-400 bg-sky-500/10 border-sky-500/30"
      : "text-sky-700 bg-sky-50 border-sky-200",
    accentBg: "from-sky-600/20 via-blue-600/10 to-indigo-600/20",
  };
};

// Brand SVG Logos
const GithubLogo = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinLogo = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const MediumLogo = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm3.04 0c0 3.24-.32 5.87-.71 5.87s-.72-2.63-.72-5.87.32-5.87.72-5.87.71 2.63.71 5.87z"/>
  </svg>
);

const DevToLogo = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} viewBox="0 0 448 512" fill="currentColor">
    <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM304.14 0H43.86C19.63 0 0 19.63 0 43.86v424.28C0 492.37 19.63 512 43.86 512h360.28c24.23 0 43.86-19.63 43.86-43.86V43.86C448 19.63 428.37 0 304.14 0zM151.05 311.77c0 12.18-4.85 21.78-14.55 28.8-9.7 7.03-22.66 10.54-38.89 10.54H62.22V175.12h35.39c16.23 0 29.19 3.51 38.89 10.54 9.7 7.03 14.55 16.62 14.55 28.8v97.31zm102.3-120.87h-64.44v45.48h51.38v28.29h-51.38v46.12h64.44v28.31H158.46V162.5h94.89v28.4zm102.3 124.36c0 18.28-5.97 32.5-17.9 42.66-11.93 10.16-28.31 15.24-49.13 15.24-20.82 0-37.2-5.08-49.13-15.24-11.93-10.16-17.9-24.38-17.9-42.66v-96.1h32.93v95.82c0 9.57 2.74 16.8 8.22 21.68 5.48 4.88 13.78 7.32 24.89 7.32s19.41-2.44 24.89-7.32c5.48-4.88 8.22-12.11 8.22-21.68v-95.82h32.93v96.1z"/>
  </svg>
);

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  username,
  onBackToHome,
  onViewEntry,
  onExploreCatalog,
  onAddEntry,
  onEditProfile,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "amoled";
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<PublicBuilderProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("submissions");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [savedEntries, setSavedEntries] = useState<Entry[]>([]);
  const [submitHistory, setSubmitHistory] = useState<Entry[]>([]);
  const [loadingEntryId, setLoadingEntryId] = useState<string | null>(null);

  const cleanTargetHandle = username.replace(/^@/, "").toLowerCase();
  const currentAuthHandle = (
    user?.user_metadata?.username ||
    user?.user_metadata?.user_name ||
    user?.user_metadata?.preferred_username ||
    user?.email?.split("@")[0] ||
    ""
  ).replace(/^@/, "").toLowerCase();

  const isOwnProfile =
    Boolean(user) &&
    (currentAuthHandle === cleanTargetHandle ||
      Boolean(profile?.userKey && user?.id && (profile.userKey === user.id || profile.userKey === `supabase_${user.id}`)));

  // Escape key to navigate back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBackToHome();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBackToHome]);

  // Load profile and bookmarks
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setAvatarFailed(false);

    const loadData = async () => {
      let resolvedProfile: PublicBuilderProfile | null = null;

      try {
        const data = await fetchProfileByUsername(username);
        if (data) {
          resolvedProfile = data;
        }
      } catch (e) {
        console.warn("fetchProfileByUsername error:", e);
      }

      // If not in DB but it's own profile, synthesize fallback
      if (!resolvedProfile && isOwnProfile && user) {
        const meta = user.user_metadata;
        const ownUserKey = user.id.startsWith("supabase_") ? user.id : `supabase_${user.id}`;
        resolvedProfile = {
          userKey: ownUserKey,
          displayName: meta?.displayName || meta?.full_name || meta?.name || meta?.firstName || user.email?.split("@")[0] || "Builder",
          username: meta?.username || username,
          description: meta?.description || "",
          github: meta?.github || "",
          linkedin: meta?.linkedin || "",
          medium: meta?.medium || "",
          devto: meta?.devto || "",
          portfolio: meta?.portfolio || "",
          role: meta?.role || "developer",
          interests: meta?.interests || ["models", "frameworks"],
          avatarUrl: getOAuthAvatarUrl(user) || undefined,
        };
      } else if (!resolvedProfile) {
        setError(`We couldn't find a builder profile for ${username}.`);
      }

      if (resolvedProfile && active) {
        setProfile(resolvedProfile);

        // Load Bookmarks
        try {
          const bmarkNames = await fetchUserBookmarks(resolvedProfile.userKey);
          if (bmarkNames.length > 0) {
            const { data: bmarkEntries } = await supabase
              .from("entries")
              .select("*")
              .in("name", bmarkNames);
            if (bmarkEntries && active) {
              setSavedEntries(bmarkEntries as Entry[]);
            }
          } else {
            setSavedEntries([]);
          }
        } catch (err) {
          console.error("Failed to load bookmarks:", err);
        }

        // Load Submissions
        try {
          const { data: subData } = await supabase
            .from("entries")
            .select("*")
            .eq("submitted_by", resolvedProfile.userKey)
            .order("created_at", { ascending: false });
          if (subData && active) {
            setSubmitHistory(subData as Entry[]);
          }
        } catch (err) {
          console.error("Failed to fetch submit history:", err);
        }

        setLoading(false);
      } else if (active) {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [username, isOwnProfile, user]);

  const initials = useMemo(() => {
    if (profile?.displayName) {
      const parts = profile.displayName.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return profile.displayName.slice(0, 2).toUpperCase();
    }
    return username.replace("@", "").slice(0, 2).toUpperCase();
  }, [profile?.displayName, username]);

  const handleShare = () => {
    if (!profile?.username) return;
    navigator.clipboard.writeText(shareUrlForProfile(profile.username));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleCopyHandle = () => {
    const handleText = profile?.username?.startsWith("@") ? profile.username : `@${username.replace(/^@/, "")}`;
    navigator.clipboard.writeText(handleText);
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2000);
  };

  const handleSelectEntry = async (entry: Entry) => {
    if (!onViewEntry) return;
    setLoadingEntryId(entry.name);
    try {
      onViewEntry(entry);
    } finally {
      setLoadingEntryId(null);
    }
  };

  const socialLinks: { name: string; url: string; icon: React.ComponentType<{ className?: string }>; colorCls: string }[] = [
    ...(profile?.github ? [{ name: "GitHub", url: profile.github, icon: GithubLogo, colorCls: isDark ? "text-white bg-white/10" : "text-neutral-900 bg-neutral-100" }] : []),
    ...(profile?.linkedin ? [{ name: "LinkedIn", url: profile.linkedin, icon: LinkedinLogo, colorCls: "text-[#0a66c2] bg-[#0a66c2]/10" }] : []),
    ...(profile?.medium ? [{ name: "Medium", url: profile.medium, icon: MediumLogo, colorCls: isDark ? "text-neutral-200 bg-white/10" : "text-neutral-900 bg-neutral-100" }] : []),
    ...(profile?.devto ? [{ name: "Dev.to", url: profile.devto, icon: DevToLogo, colorCls: isDark ? "text-neutral-200 bg-white/10" : "text-neutral-900 bg-neutral-100" }] : []),
    ...(profile?.portfolio ? [{ name: "Portfolio", url: profile.portfolio, icon: Globe, colorCls: "text-blue-500 bg-blue-500/10" }] : []),
  ];

  const roleStyle = profile ? getRoleConfig(profile.role, isDark) : getRoleConfig("developer", isDark);

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8f9fa] dark:bg-[#131314] text-[#202124] dark:text-[#e3e3e3] transition-colors min-h-[calc(100vh-64px)] animate-fade-in">
      {/* ── 1. Top Breadcrumbs Sub-Header ─────────────────────────────── */}
      <header className="sticky top-14 sm:top-16 z-20 px-4 sm:px-6 xl:px-12 h-14 border-b border-[#dadce0] dark:border-[#3c4043]/50 bg-white/95 dark:bg-[#131314]/95 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-[#1a73e8] dark:text-[#a8c7fa] hover:bg-[#e8f0fe] dark:hover:bg-[#1a2e4c] transition-colors cursor-pointer shrink-0 shadow-2xs"
            title="Return to Directory (Esc)"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Directory</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="h-4 w-px bg-[#dadce0] dark:bg-[#3c4043] hidden sm:block" />

          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium truncate">
            <span className="text-neutral-600 dark:text-neutral-300">AiVerse Builders</span>
            <span className="opacity-40">/</span>
            <span className="font-semibold text-neutral-900 dark:text-white truncate">
              {profile?.displayName || username}
            </span>
          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleShare}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
              copiedLink
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/5"
            }`}
            title="Share profile link"
          >
            {copiedLink ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
            <span>{copiedLink ? "Link Copied!" : "Share Profile"}</span>
          </button>

          {isOwnProfile && onEditProfile && (
            <button
              onClick={onEditProfile}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#1a73e8] hover:bg-[#1557b0] text-white transition-all cursor-pointer shadow-xs"
              title="Edit Profile & Preferences"
            >
              <Edit3 size={13} />
              <span>Edit Profile</span>
            </button>
          )}

          {isOwnProfile && onAddEntry && (
            <button
              onClick={onAddEntry}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-all cursor-pointer shadow-2xs"
              title="Submit a new tool or model to AiVerse"
            >
              <Plus size={13} />
              <span>Submit Model</span>
            </button>
          )}
        </div>
      </header>

      {/* ── 2. Main Page Container ────────────────────────────────────── */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col gap-8">
        {/* Loading Skeleton */}
        {loading && (
          <div className="w-full space-y-6 animate-pulse">
            <div className="h-48 sm:h-56 rounded-3xl bg-neutral-200 dark:bg-white/[0.04]" />
            <div className="flex items-center gap-4 px-4">
              <div className="w-24 h-24 rounded-3xl bg-neutral-300 dark:bg-white/[0.08]" />
              <div className="space-y-2 flex-1">
                <div className="h-6 w-48 rounded-lg bg-neutral-300 dark:bg-white/[0.08]" />
                <div className="h-4 w-32 rounded-lg bg-neutral-200 dark:bg-white/[0.04]" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded-2xl bg-neutral-200 dark:bg-white/[0.04]" />
              ))}
            </div>
          </div>
        )}

        {/* Error / Not Found */}
        {!loading && (error || !profile) && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center bg-red-500/10 text-red-500 border border-red-500/20 mb-4 shadow-sm">
              <AlertCircle size={28} />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Profile Not Found</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md">
              {error || `The user @${username.replace(/^@/, "")} could not be located in the AiVerse directory.`}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={onBackToHome}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1a73e8] text-white hover:bg-[#1557b0] transition-all cursor-pointer shadow-xs"
              >
                Return to Directory
              </button>
              {onExploreCatalog && (
                <button
                  onClick={onExploreCatalog}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                >
                  Explore Catalog
                </button>
              )}
            </div>
          </div>
        )}

        {/* Profile Content */}
        {!loading && profile && (
          <>
            {/* ── Hero Banner & Identity Card ────────────────────────── */}
            <div className="w-full rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] shadow-sm overflow-hidden transition-all">
              {/* Cover Gradient Mesh */}
              <div className="h-44 sm:h-52 w-full relative overflow-hidden bg-linear-to-r from-blue-600/20 via-indigo-600/15 to-purple-600/20 dark:from-blue-600/25 dark:via-purple-600/20 dark:to-indigo-600/25 border-b border-neutral-200/60 dark:border-white/[0.06]">
                <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/80 dark:bg-black/50 backdrop-blur-md text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10 shadow-2xs">
                    <ShieldCheck size={13} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
                    Verified Builder Directory
                  </span>
                </div>
              </div>

              {/* Profile Details Container */}
              <div className="px-6 sm:px-8 pb-8 pt-0">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-14 sm:-mt-16 mb-6">
                  {/* Left: Avatar & Primary Info */}
                  <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                    {/* Big Avatar with robust onError fallback */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl ring-4 ring-white dark:ring-[#1c1d1f] shadow-xl overflow-hidden shrink-0 bg-neutral-900 relative z-10 flex items-center justify-center">
                      {profile.avatarUrl && !avatarFailed ? (
                        <img
                          src={profile.avatarUrl}
                          alt={profile.displayName}
                          onError={() => setAvatarFailed(true)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#1a73e8] via-[#6366f1] to-[#8b5cf6] text-white font-black text-2xl sm:text-3xl tracking-wider select-none shadow-inner">
                          {initials}
                        </div>
                      )}
                    </div>

                    {/* Name & Handle */}
                    <div className="space-y-1 sm:mb-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                          {profile.displayName}
                        </h1>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${roleStyle.badgeCls}`}>
                          {roleStyle.icon}
                          {roleStyle.label}
                        </span>
                        {isOwnProfile && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            You
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <button
                          onClick={handleCopyHandle}
                          className="font-mono font-medium hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors flex items-center gap-1 cursor-pointer"
                          title="Click to copy handle"
                        >
                          <span>{profile.username?.startsWith("@") ? profile.username : `@${profile.username}`}</span>
                          {copiedHandle ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} className="opacity-60" />}
                        </button>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          Active Member
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quick Social Pills */}
                  {socialLinks.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {socialLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <a
                            key={link.name}
                            href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2.5 rounded-xl border border-neutral-200/80 dark:border-white/10 hover:border-blue-500/40 hover:scale-105 transition-all cursor-pointer shadow-2xs ${link.colorCls}`}
                            title={`Open ${link.name}`}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="max-w-3xl pt-2">
                  <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                    {profile.description || "AiVerse community builder and contributor. Creating, evaluating, and sharing frontier AI intelligence models and frameworks."}
                  </p>
                </div>

                {/* Interest Tags */}
                {profile.interests && profile.interests.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-neutral-100 dark:border-white/[0.06]">
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mr-1">
                      Focus Areas:
                    </span>
                    {profile.interests.map((interest) => (
                      <span
                        key={interest}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 border border-neutral-200/70 dark:border-white/10 hover:border-blue-500/30 transition-colors"
                      >
                        #{interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── 3. Proportional Stats Grid ─────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs font-semibold">Submissions</span>
                  <LayoutGrid size={16} className="text-[#1a73e8]" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tabular-nums">
                    {submitHistory.length}
                  </div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Models & Tools</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs font-semibold">Saved Library</span>
                  <Bookmark size={16} className="text-amber-500" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tabular-nums">
                    {savedEntries.length}
                  </div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Bookmarked Items</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs font-semibold">Connected Web</span>
                  <Globe size={16} className="text-emerald-500" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tabular-nums">
                    {socialLinks.length}
                  </div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Verified Profiles</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs font-semibold">Builder Status</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="mt-3">
                  <div className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white truncate">
                    Verified
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">AiVerse Contributor</span>
                </div>
              </div>
            </div>

            {/* ── 4. Main 2-Column Content Layout ────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left Sidebar: About & Web Connections */}
              <div className="space-y-6 lg:col-span-1">
                {/* Connected Accounts Card */}
                <div className="p-5 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Globe size={15} className="text-[#1a73e8]" />
                      Connected Profiles
                    </h3>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      {socialLinks.length} linked
                    </span>
                  </div>

                  {socialLinks.length > 0 ? (
                    <div className="space-y-2.5">
                      {socialLinks.map((link) => {
                        const Icon = link.icon;
                        const cleanUrl = link.url.replace(/^https?:\/\/(www\.)?/, "");
                        return (
                          <a
                            key={link.name}
                            href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl border border-neutral-200/70 dark:border-white/10 bg-neutral-50/60 dark:bg-white/[0.02] hover:border-blue-500/40 hover:bg-white dark:hover:bg-white/[0.05] transition-all flex items-center justify-between group cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${link.colorCls}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-semibold text-neutral-900 dark:text-white block group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors truncate">
                                  {link.name}
                                </span>
                                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block truncate">
                                  {cleanUrl}
                                </span>
                              </div>
                            </div>
                            <ExternalLink size={13} className="text-neutral-400 group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] shrink-0 transition-colors" />
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-6 text-center rounded-xl border border-dashed border-neutral-200 dark:border-white/10 p-4">
                      <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">No public accounts linked yet</p>
                      {isOwnProfile && onEditProfile && (
                        <button
                          onClick={onEditProfile}
                          className="mt-3 text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
                        >
                          + Link GitHub or LinkedIn
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* AiVerse Credentials & Recognition Card */}
                <div className="p-5 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Award size={15} className="text-amber-500" />
                    Builder Credentials
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.02]">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 dark:text-white">Directory Contributor</div>
                        <div className="text-[11px] text-neutral-500">Verified identity & permissions</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.02]">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <FolderGit2 size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 dark:text-white">Open Source Advocate</div>
                        <div className="text-[11px] text-neutral-500">Supports transparent AI weights</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content Column: Tabs & Cards */}
              <div className="space-y-6 lg:col-span-2">
                {/* Segmented Tab Bar */}
                <div className="p-1 rounded-2xl flex gap-1 border border-neutral-200/90 dark:border-white/10 bg-neutral-200/50 dark:bg-white/[0.04]">
                  <button
                    onClick={() => setActiveTab("submissions")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "submissions"
                        ? "bg-white dark:bg-[#202124] text-neutral-900 dark:text-white shadow-xs"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    <LayoutGrid size={14} />
                    <span>Submissions</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/10 font-bold">
                      {submitHistory.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("bookmarks")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "bookmarks"
                        ? "bg-white dark:bg-[#202124] text-neutral-900 dark:text-white shadow-xs"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    <Bookmark size={14} />
                    <span>Saved Library</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/10 font-bold">
                      {savedEntries.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("about")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === "about"
                        ? "bg-white dark:bg-[#202124] text-neutral-900 dark:text-white shadow-xs"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    <Sparkles size={14} />
                    <span>Overview & Bio</span>
                  </button>
                </div>

                {/* Tab 1: Submissions */}
                {activeTab === "submissions" && (
                  <div className="space-y-4">
                    {submitHistory.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {submitHistory.map((entry) => {
                          const isLoading = loadingEntryId === entry.name;
                          return (
                            <div
                              key={entry.name}
                              onClick={() => !isLoading && handleSelectEntry(entry)}
                              className="p-5 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] hover:border-blue-500/40 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    {entry.type}
                                  </span>
                                  {entry.approved ? (
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                      Approved
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                      Under Review
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors">
                                  {entry.name}
                                </h4>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
                                  {entry.summary}
                                </p>
                              </div>

                              <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-100 dark:border-white/[0.06] text-xs text-neutral-500">
                                <span className="font-medium">{entry.task}</span>
                                <div className="flex items-center gap-1 text-[#1a73e8] dark:text-[#8ab4f8] font-semibold group-hover:translate-x-0.5 transition-transform">
                                  {isLoading ? <Loader2 size={13} className="animate-spin" /> : <span>Inspect Specs →</span>}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Expansive, beautiful Empty State */
                      <div className="py-16 px-6 text-center rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] shadow-2xs">
                        <div className="w-16 h-16 rounded-3xl bg-blue-500/10 text-[#1a73e8] dark:text-[#8ab4f8] flex items-center justify-center mx-auto mb-4 border border-blue-500/20 shadow-xs">
                          <Rocket size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                          No Public Submissions Yet
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto leading-relaxed">
                          This builder hasn't published any tools, foundational models, or benchmarks to the AiVerse directory yet.
                        </p>

                        <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
                          {onExploreCatalog && (
                            <button
                              onClick={onExploreCatalog}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1a73e8] text-white hover:bg-[#1557b0] transition-all cursor-pointer shadow-xs"
                            >
                              <Compass size={14} />
                              <span>Explore Directory Models</span>
                            </button>
                          )}
                          {isOwnProfile && onAddEntry && (
                            <button
                              onClick={onAddEntry}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer"
                            >
                              <Plus size={14} />
                              <span>Submit Your First Model</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Bookmarks */}
                {activeTab === "bookmarks" && (
                  <div className="space-y-4">
                    {savedEntries.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {savedEntries.map((entry) => {
                          const isLoading = loadingEntryId === entry.name;
                          return (
                            <div
                              key={entry.name}
                              onClick={() => !isLoading && handleSelectEntry(entry)}
                              className="p-5 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] hover:border-blue-500/40 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300">
                                    {entry.type}
                                  </span>
                                  <Bookmark size={14} className="text-amber-500 fill-amber-500" />
                                </div>
                                <h4 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors">
                                  {entry.name}
                                </h4>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
                                  {entry.summary}
                                </p>
                              </div>

                              <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-100 dark:border-white/[0.06] text-xs text-neutral-500">
                                <span className="font-medium">{entry.org || "Community"}</span>
                                <div className="flex items-center gap-1 text-[#1a73e8] dark:text-[#8ab4f8] font-semibold group-hover:translate-x-0.5 transition-transform">
                                  {isLoading ? <Loader2 size={13} className="animate-spin" /> : <span>Open Tool →</span>}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-16 px-6 text-center rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] shadow-2xs">
                        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-500/20 shadow-xs">
                          <Bookmark size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                          No Saved Bookmarks
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto leading-relaxed">
                          Tools and models saved by this user will be curated here for quick technical inspection.
                        </p>
                        {onExploreCatalog && (
                          <button
                            onClick={onExploreCatalog}
                            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1a73e8] text-white hover:bg-[#1557b0] transition-all cursor-pointer shadow-xs"
                          >
                            <Compass size={14} />
                            <span>Browse Models to Save</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: About & Focus Areas */}
                {activeTab === "about" && (
                  <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1c1d1f] shadow-2xs space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                        About {profile.displayName}
                      </h3>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                        {profile.description || "Active community contributor participating in open benchmark comparisons, model evaluations, and open-source tooling on the AiVerse index."}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-neutral-100 dark:border-white/[0.06] space-y-3">
                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        Technical Focus & Architecture Interests
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests && profile.interests.length > 0 ? (
                          profile.interests.map((tag) => (
                            <span
                              key={tag}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-white/[0.05] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-white/10"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-neutral-500">General AI Intelligence & Models</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-100 dark:border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
                      <span>AiVerse Builder Network</span>
                      <span>Verified Profile</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
