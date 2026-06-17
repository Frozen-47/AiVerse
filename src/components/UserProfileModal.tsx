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
} from "lucide-react";
import { supabase, fetchProfileByUsername, type PublicBuilderProfile } from "../lib/supabase";
import type { Entry } from "../types";
import { useTokens, useTheme } from "../lib/theme";
import { roleLabel } from "../lib/onboarding";
import { useAuth } from "./AuthContext";
import { shareUrlForProfile } from "../lib/entryUrl";

interface UserProfileModalProps {
  username: string;
  onClose: () => void;
}

type TabId = "submissions" | "social" | "bookmarks";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "submissions", label: "Submit History", icon: <LayoutGrid size={14} /> },
  { id: "social", label: "Social Links", icon: <Share2 size={14} /> },
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
  const [activeTab, setActiveTab] = useState<TabId>("submissions");
  const [copied, setCopied] = useState(false);
  const [savedEntries, setSavedEntries] = useState<string[]>([]);
  const [submitHistory, setSubmitHistory] = useState<Entry[]>([]);

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
          avatarUrl: meta?.avatarUrl || meta?.avatar_url || undefined,
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



              {/* ── Submissions tab ──────────────────────────────────────── */}
              {activeTab === "submissions" && (
                <div className="animate-[fadeIn_0.15s_ease-out] space-y-3">
                  <p className={sectionLabel}>Submit History</p>
                  <div className="space-y-2">
                    {submitHistory.length > 0 ? (
                      submitHistory.map((entry) => (
                        <div
                          key={entry.name}
                          className={`p-3.5 rounded-xl flex items-center justify-between transition-colors ${cardBg} ${cardBorder}`}
                        >
                          <div className="min-w-0 pr-3 flex-1">
                            <h4 className={`text-[13px] font-bold truncate ${t.textPrimary}`}>
                              {entry.name}
                            </h4>
                            <p className={`text-[11px] truncate mt-0.5 ${t.textMuted}`}>
                              {entry.summary}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {entry.approved ? (
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                Approved
                              </span>
                            ) : (
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 animate-pulse">
                                Pending
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={`text-[12px] italic py-4 ${t.textMuted}`}>No tools submitted yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* ── Social Links tab ─────────────────────────────────────── */}
              {activeTab === "social" && (
                <div className="animate-[fadeIn_0.15s_ease-out] space-y-3">
                  <p className={sectionLabel}>Social Media & Connections</p>
                  <div className="space-y-2">
                    {socialLinks.length > 0 ? (
                      socialLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-3.5 p-3 rounded-xl transition-all ${cardBg} ${cardBorder} hover:${t.surfaceHover}`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-white/6 text-white/50" : "bg-black/5 text-black/40"}`}>
                              <Icon size={15} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={`text-[13px] font-bold ${t.textPrimary}`}>{link.name}</p>
                              <p className={`text-[11px] truncate mt-0.5 ${t.textMuted}`}>{link.url}</p>
                            </div>
                          </a>
                        );
                      })
                    ) : (
                      <p className={`text-[12px] italic py-4 ${t.textMuted}`}>No social media connections added.</p>
                    )}
                  </div>
                </div>
              )}

              {/* ── Bookmarks tab ─────────────────────────────────────────── */}
              {activeTab === "bookmarks" && (
                <div className="animate-[fadeIn_0.15s_ease-out] space-y-3">
                  <p className={sectionLabel}>Bookmarks</p>
                  <div className="space-y-2">
                    {savedEntries.length > 0 ? (
                      savedEntries.map((name) => (
                        <div
                          key={name}
                          className={`flex items-center gap-3.5 p-3 rounded-xl transition-colors ${cardBg} ${cardBorder}`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-white/6 text-white/50" : "bg-black/5 text-black/40"}`}>
                            <Bookmark size={15} className="fill-current" />
                          </div>
                          <p className={`text-[13px] font-bold ${t.textPrimary}`}>{name}</p>
                        </div>
                      ))
                    ) : (
                      <p className={`text-[12px] italic py-4 ${t.textMuted}`}>No bookmarked tools yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};