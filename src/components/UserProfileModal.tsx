import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Loader2,
  Sparkles,
  Share2,
  Check,
  Code2,
  LayoutGrid,
  Bookmark,
  BookOpen,
  Rocket,
  Globe,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { supabase, fetchProfileByUsername, getOAuthAvatarUrl, type PublicBuilderProfile } from "../lib/supabase";
import type { Entry } from "../types";
import { useTokens, useTheme } from "../lib/theme";
import { useAuth } from "./AuthContext";
import { shareUrlForProfile } from "../lib/entryUrl";

interface UserProfileModalProps {
  username: string;
  onClose: () => void;
  onViewEntry?: (entry: Entry) => void;
}

type TabId = "submissions" | "social" | "bookmarks";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "submissions", label: "Submissions", icon: <LayoutGrid size={13} /> },
  { id: "social", label: "Connections", icon: <Share2 size={13} /> },
  { id: "bookmarks", label: "Bookmarks", icon: <Bookmark size={13} /> },
];

// Helper to resolve role-specific styles and icons
const getRoleConfig = (role: string, isDark: boolean) => {
  const r = (role || "").toLowerCase();
  
  if (r === "researcher") {
    return {
      label: "Researcher",
      icon: <BookOpen size={11} className="stroke-[2.5px]" />,
      cls: isDark
        ? "text-violet-400 bg-violet-500/10 border border-violet-500/25 shadow-[0_2px_8px_rgba(139,92,246,0.05)]"
        : "text-violet-700 bg-violet-50 border border-violet-200",
      themeColor: "from-violet-500/20 via-purple-500/20 to-indigo-500/20",
    };
  }
  if (r === "designer") {
    return {
      label: "Designer",
      icon: <Sparkles size={11} className="stroke-[2.5px]" />,
      cls: isDark
        ? "text-pink-400 bg-pink-500/10 border border-pink-500/25 shadow-[0_2px_8px_rgba(236,72,153,0.05)]"
        : "text-pink-700 bg-pink-50 border border-pink-200",
      themeColor: "from-pink-500/20 via-rose-500/20 to-orange-500/20",
    };
  }
  if (r === "entrepreneur") {
    return {
      label: "Entrepreneur",
      icon: <Rocket size={11} className="stroke-[2.5px]" />,
      cls: isDark
        ? "text-amber-400 bg-amber-500/10 border border-amber-500/25 shadow-[0_2px_8px_rgba(245,158,11,0.05)]"
        : "text-amber-700 bg-amber-50 border border-amber-200",
      themeColor: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    };
  }
  if (r === "enthusiast") {
    return {
      label: "Enthusiast",
      icon: <Globe size={11} className="stroke-[2.5px]" />,
      cls: isDark
        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 shadow-[0_2px_8px_rgba(16,185,129,0.05)]"
        : "text-emerald-700 bg-emerald-50 border border-emerald-200",
      themeColor: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    };
  }
  
  // Default to developer
  return {
    label: "Developer",
    icon: <Code2 size={11} className="stroke-[2.5px]" />,
    cls: isDark
      ? "text-sky-400 bg-sky-500/10 border border-sky-500/25 shadow-[0_2px_8px_rgba(14,165,233,0.05)]"
      : "text-sky-700 bg-sky-50 border border-sky-200",
    themeColor: "from-sky-500/20 via-indigo-500/20 to-violet-500/20",
  };
};

// Custom SVG Logos for authentic brand styling
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

// Helper for brand-colored social icon tags
const getBrandStyle = (name: string, isDark: boolean) => {
  switch (name.toLowerCase()) {
    case "github":
      return isDark 
        ? "bg-white/10 text-white border border-white/15" 
        : "bg-neutral-900 text-white border border-neutral-800";
    case "linkedin":
      return isDark 
        ? "bg-[#0a66c2]/20 text-[#70b5f9] border border-[#0a66c2]/30" 
        : "bg-[#0a66c2]/10 text-[#0a66c2] border border-[#0a66c2]/25";
    case "medium":
      return isDark 
        ? "bg-neutral-800 text-neutral-200 border border-neutral-700" 
        : "bg-neutral-900 text-white border border-neutral-800";
    case "dev.to":
      return isDark 
        ? "bg-neutral-800 text-white border border-neutral-700" 
        : "bg-neutral-900 text-white border border-neutral-800";
    default: // portfolio
      return isDark 
        ? "bg-[#1a73e8]/20 text-[#a8c7fa] border border-[#1a73e8]/30" 
        : "bg-[#1a73e8]/10 text-[#1a73e8] border border-[#1a73e8]/25";
  }
};

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  username,
  onClose,
  onViewEntry,
}) => {
  const t = useTokens();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "amoled";
  const { user } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<PublicBuilderProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("submissions");
  const [copied, setCopied] = useState(false);
  const [savedEntries, setSavedEntries] = useState<string[]>([]);
  const [submitHistory, setSubmitHistory] = useState<Entry[]>([]);
  const [loadingEntryId, setLoadingEntryId] = useState<string | null>(null);

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
      let resolvedProfile: PublicBuilderProfile | null = null;

      if (isOwnProfile) {
        const meta = user?.user_metadata;
        const ownUserKey = user?.id ? (user.id.startsWith("supabase_") ? user.id : `supabase_${user.id}`) : "";
        resolvedProfile = {
          userKey: ownUserKey,
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
          avatarUrl: getOAuthAvatarUrl(user) || undefined,
        };
      } else {
        try {
          const data = await fetchProfileByUsername(username);
          if (data) {
            resolvedProfile = data;
          } else {
            setError(`No profile found for ${username}`);
          }
        } catch {
          setError("Could not load developer profile.");
        }
      }

      if (resolvedProfile && active) {
        setProfile(resolvedProfile);
        try {
          const { fetchUserBookmarks } = await import("../lib/entryBookmarks");
          const bmarks = await fetchUserBookmarks(resolvedProfile.userKey);
          setSavedEntries(bmarks);
        } catch (err) {
          console.error("Failed to load bookmarks:", err);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [username, isOwnProfile, user]);

  useEffect(() => {
    if (!profile) return;

    let active = true;
    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from("entries")
          .select("*")
          .eq("submitted_by", profile.userKey)
          .order("created_at", { ascending: false });

        if (!error && data && active) {
          setSubmitHistory(data as Entry[]);
        }
      } catch (err) {
        console.error("Failed to fetch submit history:", err);
      }
    };

    fetchSubmissions();
    return () => {
      active = false;
    };
  }, [profile]);

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

  const handleViewEntry = async (entryName: string) => {
    if (!onViewEntry) return;
    setLoadingEntryId(entryName);
    try {
      const { data, error: err } = await supabase
        .from("entries")
        .select("*")
        .eq("name", entryName)
        .maybeSingle();
      if (!err && data) {
        onViewEntry(data as Entry);
      }
    } catch (err) {
      console.error("Failed to load entry details:", err);
    } finally {
      setLoadingEntryId(null);
    }
  };

  const socialLinks: { name: string; url: string; icon: React.ComponentType<{ className?: string }> }[] = [
    ...(profile?.github ? [{ name: "GitHub", url: profile.github, icon: GithubLogo }] : []),
    ...(profile?.linkedin ? [{ name: "LinkedIn", url: profile.linkedin, icon: LinkedinLogo }] : []),
    ...(profile?.medium ? [{ name: "Medium", url: profile.medium, icon: MediumLogo }] : []),
    ...(profile?.devto ? [{ name: "Dev.to", url: profile.devto, icon: DevToLogo }] : []),
    ...(profile?.portfolio ? [{ name: "Portfolio", url: profile.portfolio, icon: Globe }] : []),
  ];

  // Dynamic Styles
  const roleStyle = profile ? getRoleConfig(profile.role, isDark) : getRoleConfig("developer", isDark);

  return (
    <div className={`${t.modalOverlay} user-profile-modal`}>
      <div
        ref={modalRef}
        className={`relative w-full max-w-md flex flex-col rounded-3xl overflow-hidden shadow-2xl border ${
          isDark ? "bg-[#1e1f20] border-white/10 text-white" : "bg-white border-neutral-200 text-neutral-900"
        }`}
        style={{ maxHeight: "85dvh" }}
      >
        {/* ── Loading Skeleton ───────────────────────────────────────────── */}
        {loading && (
          <div className="flex flex-col w-full animate-pulse">
            {/* Mesh Hero Banner Skeleton */}
            <div className={`h-32 w-full bg-linear-to-r ${
              isDark ? "from-neutral-800 to-neutral-850" : "from-neutral-150 to-neutral-200"
            }`} />
            
            <div className="px-6 pb-8 space-y-5 flex flex-col">
              {/* Squircle Avatar Skeleton */}
              <div className={`w-20 h-20 rounded-3xl mt-[-40px] border-4 shrink-0 ${
                isDark ? "bg-neutral-800 border-neutral-900" : "bg-neutral-200 border-white"
              }`} />

              {/* Name & Title Skeleton */}
              <div className="space-y-2">
                <div className={`h-5 w-40 rounded-md ${isDark ? "bg-white/5" : "bg-neutral-200"}`} />
                <div className={`h-3.5 w-24 rounded-md ${isDark ? "bg-white/5" : "bg-neutral-200"}`} />
              </div>

              {/* Bio Description Skeleton */}
              <div className="space-y-2">
                <div className={`h-3.5 w-full rounded-md ${isDark ? "bg-white/5" : "bg-neutral-200"}`} />
                <div className={`h-3.5 w-4/5 rounded-md ${isDark ? "bg-white/5" : "bg-neutral-200"}`} />
              </div>

              {/* Stats Row Skeleton */}
              <div className={`grid grid-cols-3 py-3 rounded-2xl border ${
                isDark ? "border-white/5 bg-white/[0.01]" : "border-black/5 bg-black/[0.01]"
              }`}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className={`h-5 w-10 rounded-md ${isDark ? "bg-white/5" : "bg-neutral-200"}`} />
                    <div className={`h-3 w-14 rounded-md ${isDark ? "bg-white/5" : "bg-neutral-200"}`} />
                  </div>
                ))}
              </div>

              {/* Segmented Tab Bar Skeleton */}
              <div className={`h-10 p-1 flex gap-1 rounded-xl border ${
                isDark ? "border-white/5 bg-white/[0.01]" : "border-black/5 bg-black/[0.01]"
              }`}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`flex-1 h-full rounded-lg ${isDark ? "bg-white/5" : "bg-neutral-200"}`} />
                ))}
              </div>

              {/* Content List Placeholder Skeleton */}
              <div className="space-y-3 pt-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className={`p-4 rounded-xl border flex items-center gap-3 ${
                    isDark ? "border-white/5" : "border-neutral-200"
                  }`}>
                    <div className={`w-8 h-8 rounded-lg shrink-0 ${isDark ? "bg-white/5" : "bg-neutral-200"}`} />
                    <div className="flex-1 space-y-1.5">
                      <div className={`h-3 w-1/3 rounded-md ${isDark ? "bg-white/5" : "bg-neutral-200"}`} />
                      <div className={`h-2.5 w-1/2 rounded-md ${isDark ? "bg-white/5" : "bg-neutral-200"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Error ──────────────────────────────────────────────────────── */}
        {!loading && (error || !profile) && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 px-8 text-center">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold border ${
                isDark ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-red-50 border-red-100 text-red-600"
              }`}
            >
              !
            </div>
            <div className="space-y-1">
              <p className={`text-sm font-bold ${t.textPrimary}`}>Profile Not Found</p>
              <p className={`text-xs leading-relaxed max-w-[250px] ${t.textMuted}`}>
                {error || "This profile is not active or hasn't been set up yet."}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`mt-2 text-xs px-5 py-2.5 font-bold rounded-xl shadow-sm transition-all cursor-pointer ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                  : "bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800"
              }`}
            >
              Close Profile
            </button>
          </div>
        )}

        {/* ── Profile ────────────────────────────────────────────────────── */}
        {!loading && profile && (
          <>
            {/* Account Top Header Bar */}
            <div className="shrink-0 px-6 py-4 border-b border-neutral-200/90 dark:border-white/10 bg-[#f8f9fa] dark:bg-[#18191a] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#1a73e8] dark:text-[#8ab4f8] flex items-center justify-center border border-blue-200/60 dark:border-blue-700/30">
                  <Globe size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight">
                    AiVerse Account
                  </h2>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Public Developer Profile & Credentials
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleShare}
                  title="Share profile link"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-200/70 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-[#34a853]" /> : <Share2 size={14} />}
                </button>
                <button
                  onClick={onClose}
                  title="Close"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-200/70 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Account Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-5 bg-white dark:bg-[#1e1f20]">
              {/* Profile Hero Card */}
              <div className="p-5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-[#fafafa] dark:bg-white/[0.02]">
                <div className="flex items-start gap-4">
                  {/* Circular Avatar */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shrink-0 overflow-hidden ring-2 ${
                      isDark
                        ? "bg-neutral-800 text-white ring-white/15"
                        : "bg-[#1a73e8] text-white ring-neutral-200"
                    }`}
                  >
                    {profile.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white truncate">
                        {profile.displayName}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1a73e8] border border-blue-200 dark:bg-blue-900/30 dark:text-[#8ab4f8] dark:border-blue-700/30">
                        {roleStyle.icon}
                        {roleStyle.label}
                      </span>
                    </div>
                    <p className="text-xs font-normal text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {profile.username}
                    </p>

                    {profile.description ? (
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mt-2.5">
                        {profile.description}
                      </p>
                    ) : (
                      <p className="text-xs text-neutral-400 italic mt-2">
                        AiVerse community builder and contributor.
                      </p>
                    )}

                    {/* Interest Chips */}
                    {profile.interests && profile.interests.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {profile.interests.map((interest) => (
                          <span
                            key={interest}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-white/10"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Segmented Pill Navigation */}
              <div className="p-1 rounded-full flex gap-1 border border-neutral-200 dark:border-white/10 bg-[#f1f3f4] dark:bg-white/[0.04]">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const count =
                    tab.id === "submissions"
                      ? submitHistory.length
                      : tab.id === "bookmarks"
                      ? savedEntries.length
                      : socialLinks.length;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? "bg-white dark:bg-[#282a2d] text-neutral-900 dark:text-white shadow-xs font-semibold"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200"
                          : "bg-black/5 dark:bg-white/5 text-neutral-500"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Panels */}
              <div className="space-y-2">
                {/* ── Submissions Tab ── */}
                {activeTab === "submissions" && (
                  <div className="space-y-2.5">
                    {submitHistory.length > 0 ? (
                      submitHistory.map((entry) => {
                        const isLoading = loadingEntryId === entry.name;
                        return (
                          <div
                            key={entry.name}
                            onClick={() => !isLoading && handleViewEntry(entry.name)}
                            className="p-4 rounded-2xl border border-neutral-200 dark:border-white/10 bg-[#fafafa] dark:bg-white/[0.02] hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-all flex items-center justify-between cursor-pointer group"
                          >
                            <div className="min-w-0 pr-3 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-[#1a0dab] dark:text-[#8ab4f8] group-hover:underline truncate">
                                  {entry.name}
                                </h4>
                                {entry.approved ? (
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                                    Approved
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                                    In Review
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate mt-1">
                                {entry.summary}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-[11px] text-neutral-500">
                                <span>{entry.type}</span>
                                <span>•</span>
                                <span>{entry.task}</span>
                                <span>•</span>
                                <span>{entry.year}</span>
                              </div>
                            </div>
                            <div className="shrink-0 text-[#1a73e8] dark:text-[#8ab4f8] opacity-0 group-hover:opacity-100 transition-opacity">
                              {isLoading ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-10 text-center rounded-2xl border border-neutral-200 dark:border-white/10 bg-[#fafafa] dark:bg-white/[0.02]">
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">No public submissions yet</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Resources submitted by this builder will appear here.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Connections Tab ── */}
                {activeTab === "social" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Profiles on the Web
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {socialLinks.length} verified {socialLinks.length === 1 ? "link" : "links"}
                      </span>
                    </div>

                    {socialLinks.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {socialLinks.map((link) => {
                          const Icon = link.icon;
                          const brandCls = getBrandStyle(link.name, isDark);
                          const cleanUrl = link.url.replace(/^https?:\/\/(www\.)?/, "");
                          return (
                            <a
                              key={link.name}
                              href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3.5 rounded-2xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#202124] hover:border-[#1a73e8] dark:hover:border-[#a8c7fa] hover:bg-[#f8f9fa] dark:hover:bg-[#282a2c] transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${brandCls}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 block group-hover:text-[#1a73e8] dark:group-hover:text-[#a8c7fa] transition-colors truncate">
                                    {link.name}
                                  </span>
                                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block truncate">
                                    {cleanUrl}
                                  </span>
                                </div>
                              </div>
                              <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-[#1a73e8] dark:group-hover:text-[#a8c7fa] shrink-0 transition-colors" />
                            </a>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-12 text-center rounded-2xl border border-[#dadce0] dark:border-[#3c4043] bg-[#fafafa] dark:bg-[#202124]/50">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/10 flex items-center justify-center mx-auto mb-2 text-neutral-400">
                          <Globe size={18} />
                        </div>
                        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">No external accounts connected</p>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs mx-auto">This builder hasn't shared any public GitHub, LinkedIn, or portfolio links yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Bookmarks Tab ── */}
                {activeTab === "bookmarks" && (
                  <div className="space-y-2">
                    {savedEntries.length > 0 ? (
                      savedEntries.map((name) => {
                        const isLoading = loadingEntryId === name;
                        return (
                          <div
                            key={name}
                            onClick={() => !isLoading && handleViewEntry(name)}
                            className="p-3.5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-[#fafafa] dark:bg-white/[0.02] hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-all flex items-center justify-between group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Bookmark size={14} className="text-[#1a73e8] dark:text-[#8ab4f8] fill-current shrink-0" />
                              <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate group-hover:text-[#1a0dab] dark:group-hover:text-[#8ab4f8]">
                                {name}
                              </span>
                            </div>
                            {isLoading ? (
                              <Loader2 size={13} className="animate-spin text-[#1a73e8]" />
                            ) : (
                              <ChevronRight size={14} className="text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-white" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-10 text-center rounded-2xl border border-neutral-200 dark:border-white/10 bg-[#fafafa] dark:bg-white/[0.02]">
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">No saved bookmarks</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Bookmarked tools and models will appear here.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Account Dialog Bottom Action Bar */}
            <div className="shrink-0 px-6 py-3.5 border-t border-neutral-200/90 dark:border-white/10 bg-[#f8f9fa] dark:bg-[#18191a] flex items-center justify-between">
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                AiVerse Public Directory • Underrated Design System
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full text-xs font-medium bg-[#1a73e8] hover:bg-[#1557b0] text-white transition-all cursor-pointer shadow-xs"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};