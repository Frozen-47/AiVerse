import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Loader2,
  Layers,
  GitBranch,
  Sparkles,
  Compass,
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

// Helper for brand-colored social icon tags
const getBrandStyle = (name: string, isDark: boolean) => {
  switch (name.toLowerCase()) {
    case "github":
      return isDark 
        ? "bg-white/10 text-white border border-white/10 hover:bg-white/15" 
        : "bg-neutral-900/5 text-neutral-900 border border-neutral-900/10 hover:bg-neutral-900/10";
    case "linkedin":
      return isDark 
        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20" 
        : "bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100/60";
    case "medium":
      return isDark 
        ? "bg-neutral-100/10 text-neutral-250 border border-white/10 hover:bg-white/15" 
        : "bg-neutral-100 text-neutral-800 border border-neutral-200 hover:bg-neutral-200/60";
    case "dev.to":
      return isDark 
        ? "bg-neutral-400/10 text-neutral-250 border border-white/10 hover:bg-white/15" 
        : "bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-800";
    default: // portfolio
      return isDark 
        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20" 
        : "bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100/60";
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

  const socialLinks = [
    { name: "GitHub", url: profile?.github, icon: GitBranch },
    { name: "LinkedIn", url: profile?.linkedin, icon: Layers },
    { name: "Medium", url: profile?.medium, icon: Sparkles },
    { name: "Dev.to", url: profile?.devto, icon: Code2 },
    { name: "Portfolio", url: profile?.portfolio, icon: Compass },
  ].filter((l) => l.url);

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
                  <div>
                    {socialLinks.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {socialLinks.map((link) => {
                          const Icon = link.icon;
                          const brandCls = getBrandStyle(link.name, isDark);
                          return (
                            <a
                              key={link.name}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3.5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-[#fafafa] dark:bg-white/[0.02] hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${brandCls}`}>
                                  <Icon size={14} />
                                </div>
                                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{link.name}</span>
                              </div>
                              <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors" />
                            </a>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-10 text-center rounded-2xl border border-neutral-200 dark:border-white/10 bg-[#fafafa] dark:bg-white/[0.02]">
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">No external accounts connected</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">No GitHub, LinkedIn, or portfolio links shared.</p>
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