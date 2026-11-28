import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { SignedIn, SignedOut, useAuth } from "./AuthContext";
import {
  Plus,
  Moon,
  Sun,
  SlidersHorizontal,
  LayoutGrid,
  Building2,
  Trophy,
  Menu,
  X,
  Home,
  Bookmark,
  Zap,
  Terminal,
  Swords,
  Wand2,
  Layers,
  Search,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { useTokens, useTheme } from "../lib/theme";
import { UserProfileMenu } from "./UserProfileMenu";
import { AccountDeletionModal } from "./AccountDeletionModal";
import { parseProfileMeta, type OnboardingProfile } from "../lib/onboarding";
import { getOAuthAvatarUrl } from "../lib/supabase";
import type { AppRoute } from "../lib/router";

interface NavbarProps {
  onAddEntry: () => void;
  onEditPreferences: (section?: "profile" | "preferences") => void;
  onViewProfile?: (username: string) => void;
  onViewSaved?: () => void;
  onHomeClick?: () => void;
  onViewAdminDashboard?: () => void;
  onBrowseAll?: () => void;
  onViewEcosystems?: () => void;
  onViewLeaderboard?: () => void;
  onViewChat?: () => void;
  onViewFeatures?: (subpage?: "overview" | "playground" | "compare" | "wizard") => void;
  onSearchClick?: () => void;
  currentRoute?: AppRoute | null;
  ecosystemsCount?: number;
  bookmarksCount?: number;
  entryCount: number;
  onboardingProfile?: OnboardingProfile | null;
  onSaveProfile?: (
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
}

/** 3x3 9-dot Studio Apps launcher waffle glyph */
const StudioAppsGridIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <circle cx="5" cy="5" r="2" />
    <circle cx="12" cy="5" r="2" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="12" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  onAddEntry,
  onEditPreferences,
  onViewProfile,
  onViewSaved,
  onHomeClick,
  onViewAdminDashboard,
  onBrowseAll,
  onViewEcosystems,
  onViewLeaderboard,
  onViewChat,
  onViewFeatures,
  onSearchClick,
  currentRoute = null,
  ecosystemsCount,
  bookmarksCount = 0,
  entryCount,
  onboardingProfile = null,
  onSaveProfile,
}) => {
  const t = useTokens();
  const { resolvedTheme, setTheme } = useTheme();
  const { user, openAuthModal } = useAuth();
  const isAmoled = resolvedTheme === "amoled";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);

  const [isMac] = useState(() => {
    if (typeof window === "undefined") return true;
    const platform = navigator.platform || "";
    const ua = navigator.userAgent || "";
    return /mac|ipod|ipad|iphone/i.test(platform) || /mac|ipod|ipad|iphone/i.test(ua);
  });

  const prevUserRef = useRef<typeof user>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpenedAtRef = useRef<number>(0);

  const isDashboardActive = currentRoute?.type === "dashboard" || currentRoute === null;
  const isAllEntriesActive = currentRoute?.type === "entries" && currentRoute.tab === "assets";
  const isEcosystemsActive = currentRoute?.type === "entries" && currentRoute.tab === "ecosystems";
  const isSavedActive = currentRoute?.type === "entries" && currentRoute.tab === "saved";
  const isLeaderboardActive = currentRoute?.type === "leaderboard";
  const isChatActive = currentRoute?.type === "chat";
  const isFeaturesActive = currentRoute?.type === "features";
  const activeFeatureSubpage = currentRoute?.type === "features" ? currentRoute.subpage : null;

  const handleMouseEnterApps = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (!isAppsOpen) {
      hoverOpenedAtRef.current = Date.now();
      setIsAppsOpen(true);
    }
  };

  const handleMouseLeaveApps = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsAppsOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K to trigger command palette (defer to Admin palette on /admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        if (currentRoute?.type === "admin") return;
        e.preventDefault();
        onSearchClick?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearchClick, currentRoute?.type]);

  // Click outside for 9-dot Apps launcher
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isAppsOpen &&
        appsRef.current &&
        !appsRef.current.contains(event.target as Node)
      ) {
        setIsAppsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAppsOpen]);

  // Close open menus on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isAppsOpen) setIsAppsOpen(false);
        if (isDropdownOpen) setIsDropdownOpen(false);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAppsOpen, isDropdownOpen, isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileMenuOpen]);

  const parsedMeta = useMemo(
    () => parseProfileMeta(onboardingProfile?.referralSource),
    [onboardingProfile?.referralSource],
  );

  const effectiveAvatar = parsedMeta?.avatarUrl || getOAuthAvatarUrl(user);
  const firstName = (user?.user_metadata?.firstName as string) || "";
  const email = user?.email || "";

  const displayName = parsedMeta?.displayName || firstName || email.split("@")[0] || "User";
  const initials = displayName
    ? displayName
        .split(/\s+/)
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : (email ? email[0] : "U").toUpperCase();
  const greetingName = displayName;

  useEffect(() => {
    if (!prevUserRef.current && user) {
      setShowGreeting(true);
      const timer = setTimeout(() => setShowGreeting(false), 20000);
      return () => clearTimeout(timer);
    }
    prevUserRef.current = user;
  }, [user]);

  // Scroll elevation tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // AiVerse Indigo Tonal Active vs Subtle Neutral Hover Classes
  const navActiveClass = isAmoled
    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold"
    : "bg-indigo-50 text-indigo-600 border border-indigo-200/70 font-semibold";

  const navInactiveClass = isAmoled
    ? "border border-transparent text-neutral-300 hover:text-white hover:bg-white/[0.06] font-medium"
    : "border border-transparent text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/80 font-medium";

  const shortcutHint = isMac ? "⌘K" : "Ctrl K";

  return (
    <nav
      aria-label="Primary navigation"
      className={`sticky top-0 z-40 border-b backdrop-blur-2xl transition-all duration-200 ${
        isScrolled
          ? isAmoled
            ? "bg-[#090a0e]/95 border-white/[0.1] shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            : "bg-white/95 border-neutral-200/90 shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
          : isAmoled
          ? "bg-[#090a0e]/85 border-white/[0.08]"
          : "bg-white/85 border-neutral-200/80"
      }`}
    >
      <div className="w-full max-w-[1960px] mx-auto px-3 sm:px-5 xl:px-8 h-15 sm:h-16 flex items-center justify-between gap-2">
        {/* ── Left Zone: Signature Morph Brand + AiVerse Tonal Nav Links ── */}
        <div className="flex items-center gap-1.5 lg:gap-3 min-w-0 shrink-0">
          <a
            href="/dashboard"
            onClick={(e) => {
              if (onHomeClick) {
                e.preventDefault();
                onHomeClick();
              }
            }}
            aria-label="AiVerse Home Dashboard"
            className={`flex items-center shrink-0 ${t.textPrimary} hover:opacity-85 transition-opacity`}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "1.35rem",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            <span
              className="inline-block transform rotate-180 relative"
              style={{ top: "-0.75px", marginRight: isScrolled ? "-3px" : "0" }}
            >
              V
            </span>
            <span
              className="overflow-hidden whitespace-nowrap transition-all duration-75 flex items-center justify-center"
              style={{
                maxWidth: isScrolled ? "0px" : "14px",
                opacity: isScrolled ? 0 : 1,
                margin: isScrolled ? "0" : "0 1px",
                transitionDelay: isScrolled ? "300ms" : "0ms",
              }}
            >
              i
            </span>
            <span className="relative">V</span>
            <span className="flex items-center">
              <span
                className="overflow-hidden transition-all duration-75"
                style={{
                  maxWidth: isScrolled ? "0px" : "20px",
                  opacity: isScrolled ? 0 : 1,
                  transitionDelay: isScrolled ? "225ms" : "75ms",
                }}
              >
                e
              </span>
              <span
                className="overflow-hidden transition-all duration-75"
                style={{
                  maxWidth: isScrolled ? "0px" : "20px",
                  opacity: isScrolled ? 0 : 1,
                  transitionDelay: isScrolled ? "150ms" : "150ms",
                }}
              >
                r
              </span>
              <span
                className="overflow-hidden transition-all duration-75"
                style={{
                  maxWidth: isScrolled ? "0px" : "20px",
                  opacity: isScrolled ? 0 : 1,
                  transitionDelay: isScrolled ? "75ms" : "225ms",
                }}
              >
                s
              </span>
              <span
                className="overflow-hidden transition-all duration-75"
                style={{
                  maxWidth: isScrolled ? "0px" : "20px",
                  opacity: isScrolled ? 0 : 1,
                  transitionDelay: isScrolled ? "0ms" : "300ms",
                }}
              >
                e
              </span>
            </span>
          </a>

          {onBrowseAll && (
            <button
              type="button"
              onClick={onBrowseAll}
              title={`Browse all ${entryCount} verified AI assets`}
              className={`hidden 2xl:inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isAmoled
                  ? "bg-white/[0.04] text-neutral-300 border-white/[0.08] hover:border-indigo-500/40 hover:text-white"
                  : "bg-neutral-100/90 text-neutral-700 border-neutral-200/80 hover:border-indigo-300 hover:bg-indigo-50/70"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tabular-nums">{entryCount} assets</span>
            </button>
          )}

          {/* Primary Navigation Links (Google AI Studio structure, AiVerse Indigo tokens) */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 pl-2 xl:pl-3 border-l border-neutral-200/80 dark:border-white/[0.08]">
            {onHomeClick && (
              <button
                type="button"
                onClick={onHomeClick}
                aria-current={isDashboardActive ? "page" : undefined}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isDashboardActive ? navActiveClass : navInactiveClass
                }`}
                title="AiVerse Intelligence Dashboard"
              >
                <Home size={14} className="shrink-0" />
                <span>Dashboard</span>
              </button>
            )}

            {onBrowseAll && (
              <button
                type="button"
                onClick={onBrowseAll}
                aria-current={isAllEntriesActive ? "page" : undefined}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isAllEntriesActive ? navActiveClass : navInactiveClass
                }`}
                title="Browse full AI catalog"
              >
                <LayoutGrid size={14} className="shrink-0" />
                <span>Catalog</span>
              </button>
            )}

            {onViewEcosystems && (
              <button
                type="button"
                onClick={onViewEcosystems}
                aria-current={isEcosystemsActive ? "page" : undefined}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isEcosystemsActive ? navActiveClass : navInactiveClass
                }`}
                title="Explore AI Labs & Ecosystems"
              >
                <Building2 size={14} className={`shrink-0 ${isEcosystemsActive ? "" : "text-sky-500"}`} />
                <span>Labs</span>
                {ecosystemsCount && (
                  <span
                    className={`hidden 2xl:inline-flex text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full border ${
                      isEcosystemsActive
                        ? isAmoled
                          ? "bg-indigo-500/20 text-indigo-200 border-indigo-400/30"
                          : "bg-white/90 text-indigo-700 border-indigo-200"
                        : isAmoled
                        ? "bg-white/[0.05] text-neutral-300 border-white/[0.08]"
                        : "bg-neutral-100 text-neutral-600 border-neutral-200/80"
                    }`}
                  >
                    {ecosystemsCount}
                  </span>
                )}
              </button>
            )}

            {onViewLeaderboard && (
              <button
                type="button"
                onClick={onViewLeaderboard}
                aria-current={isLeaderboardActive ? "page" : undefined}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isLeaderboardActive ? navActiveClass : navInactiveClass
                }`}
                title="Frontier AI Benchmarks & Performance Leaderboard"
              >
                <Trophy size={14} className={`shrink-0 ${isLeaderboardActive ? "" : "text-amber-500"}`} />
                <span>Leaderboard</span>
              </button>
            )}

            {onViewChat && (
              <button
                type="button"
                onClick={onViewChat}
                aria-current={isChatActive ? "page" : undefined}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isChatActive ? navActiveClass : navInactiveClass
                }`}
                title="Vox AI Assistant (Groq LPU)"
              >
                <Zap size={14} className={`shrink-0 ${isChatActive ? "" : "text-emerald-500"}`} />
                <span>Vox</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Right Zone: Utility Cluster (Quick Search, Theme, Bookmarks, 9-Dot Studio Launcher, Account) ── */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Compact Search Trigger Button (opens Command Palette / Ctrl+K) */}
          {onSearchClick && (
            <button
              type="button"
              onClick={onSearchClick}
              className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors cursor-pointer shrink-0 ${
                isAmoled
                  ? "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
              }`}
              title={`Quick Search (${shortcutHint})`}
              aria-label={`Quick Search (${shortcutHint})`}
            >
              <Search size={18} />
            </button>
          )}

          {/* Quick Theme Switcher */}
          <button
            type="button"
            onClick={() => setTheme(isAmoled ? "light" : "amoled")}
            className={`hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors cursor-pointer shrink-0 ${
              isAmoled
                ? "text-amber-300 hover:bg-white/[0.06]"
                : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
            }`}
            title={isAmoled ? "Switch to Light Theme" : "Switch to AMOLED Dark Theme"}
            aria-label={isAmoled ? "Switch to Light Theme" : "Switch to AMOLED Dark Theme"}
          >
            {isAmoled ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <SignedIn>
            {onViewSaved && (
              <button
                type="button"
                onClick={onViewSaved}
                aria-current={isSavedActive ? "page" : undefined}
                title={`Saved Bookmarks (${bookmarksCount})`}
                aria-label={`Saved Bookmarks (${bookmarksCount})`}
                className={`hidden md:inline-flex items-center gap-1 h-9 px-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                  isSavedActive
                    ? navActiveClass
                    : isAmoled
                    ? "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                    : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                <Bookmark
                  size={16}
                  className={bookmarksCount > 0 ? "fill-current text-indigo-600 dark:text-indigo-400" : ""}
                />
                {bookmarksCount > 0 && (
                  <span className="text-[11px] font-mono tabular-nums">{bookmarksCount}</span>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onAddEntry}
              className={`hidden sm:inline-flex items-center gap-1 h-9 px-3 rounded-full text-xs font-semibold border transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                isAmoled
                  ? "border-white/12 bg-[#121319] text-neutral-200 hover:bg-white/[0.06] hover:border-indigo-500/40"
                  : "border-neutral-200/90 bg-white text-neutral-700 hover:bg-neutral-100 hover:border-indigo-300"
              }`}
              title="Submit a new AI model or tool"
            >
              <Plus size={15} className="text-indigo-600 dark:text-indigo-400" />
              <span>Submit</span>
            </button>
          </SignedIn>

          {/* 9-Dot Studio Apps Launcher */}
          {onViewFeatures && (
            <div
              className="relative hidden sm:block shrink-0"
              ref={appsRef}
              onMouseEnter={handleMouseEnterApps}
              onMouseLeave={handleMouseLeaveApps}
            >
              <button
                type="button"
                onClick={() => {
                  if (isAppsOpen && Date.now() - hoverOpenedAtRef.current < 350) {
                    return;
                  }
                  setIsAppsOpen((prev) => !prev);
                }}
                aria-expanded={isAppsOpen}
                aria-haspopup="true"
                aria-label="AiVerse Studio Apps Launcher"
                title="AiVerse Studio Apps"
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors cursor-pointer ${
                  isAppsOpen || isFeaturesActive
                    ? isAmoled
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "bg-indigo-50 text-indigo-600"
                    : isAmoled
                    ? "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                    : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                <StudioAppsGridIcon size={18} />
              </button>

              {isAppsOpen && (
                <div
                  className={`absolute right-0 top-full mt-2.5 w-[336px] rounded-[28px] p-2.5 z-50 border shadow-2xl animate-[fadeIn_0.15s_ease-out] ${
                    isAmoled
                      ? "bg-[#121319] border-white/[0.1] text-white"
                      : "bg-neutral-100/95 border-neutral-200/90 text-neutral-900"
                  }`}
                  style={{
                    boxShadow: isAmoled
                      ? "0 20px 50px rgba(0,0,0,0.75)"
                      : "0 16px 40px rgba(15,23,42,0.14)",
                  }}
                >
                  <div
                    className={`rounded-[22px] p-2.5 border ${
                      isAmoled
                        ? "bg-[#0c0d11] border-white/[0.06]"
                        : "bg-white border-neutral-200/60"
                    }`}
                  >
                    <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-neutral-200/70 dark:border-white/[0.06]">
                      <span className="text-[11px] font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
                        AiVerse Studio Apps
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          isAmoled
                            ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/25"
                            : "bg-indigo-50 text-indigo-600 border-indigo-200/70"
                        }`}
                      >
                        Suite
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {/* 1. Playground */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsAppsOpen(false);
                          onViewFeatures("playground");
                        }}
                        className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl text-center transition-colors cursor-pointer ${
                          activeFeatureSubpage === "playground"
                            ? isAmoled
                              ? "bg-indigo-500/15"
                              : "bg-indigo-50"
                            : isAmoled
                            ? "hover:bg-white/[0.05]"
                            : "hover:bg-neutral-100/80"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/12 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <Terminal size={19} />
                        </div>
                        <span className="text-[11px] font-medium leading-tight">Playground</span>
                      </button>

                      {/* 2. Compare Arena */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsAppsOpen(false);
                          onViewFeatures("compare");
                        }}
                        className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl text-center transition-colors cursor-pointer ${
                          activeFeatureSubpage === "compare"
                            ? isAmoled
                              ? "bg-indigo-500/15"
                              : "bg-indigo-50"
                            : isAmoled
                            ? "hover:bg-white/[0.05]"
                            : "hover:bg-neutral-100/80"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-2xl bg-purple-500/12 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                          <Swords size={19} />
                        </div>
                        <span className="text-[11px] font-medium leading-tight">Compare</span>
                      </button>

                      {/* 3. Discovery Wizard */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsAppsOpen(false);
                          onViewFeatures("wizard");
                        }}
                        className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl text-center transition-colors cursor-pointer ${
                          activeFeatureSubpage === "wizard"
                            ? isAmoled
                              ? "bg-indigo-500/15"
                              : "bg-indigo-50"
                            : isAmoled
                            ? "hover:bg-white/[0.05]"
                            : "hover:bg-neutral-100/80"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/12 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                          <Wand2 size={19} />
                        </div>
                        <span className="text-[11px] font-medium leading-tight">Wizard</span>
                      </button>

                      {/* 4. Feature Suite */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsAppsOpen(false);
                          onViewFeatures("overview");
                        }}
                        className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl text-center transition-colors cursor-pointer ${
                          activeFeatureSubpage === "overview"
                            ? isAmoled
                              ? "bg-indigo-500/15"
                              : "bg-indigo-50"
                            : isAmoled
                            ? "hover:bg-white/[0.05]"
                            : "hover:bg-neutral-100/80"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/12 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                          <Layers size={19} />
                        </div>
                        <span className="text-[11px] font-medium leading-tight">Suite</span>
                      </button>

                      {/* 5. Leaderboard */}
                      {onViewLeaderboard && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsAppsOpen(false);
                            onViewLeaderboard();
                          }}
                          className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl text-center transition-colors cursor-pointer ${
                            isLeaderboardActive
                              ? isAmoled
                                ? "bg-indigo-500/15"
                                : "bg-indigo-50"
                              : isAmoled
                              ? "hover:bg-white/[0.05]"
                              : "hover:bg-neutral-100/80"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-2xl bg-sky-500/12 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                            <Trophy size={19} />
                          </div>
                          <span className="text-[11px] font-medium leading-tight">Rankings</span>
                        </button>
                      )}

                      {/* 6. Vox Chat */}
                      {onViewChat && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsAppsOpen(false);
                            onViewChat();
                          }}
                          className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl text-center transition-colors cursor-pointer ${
                            isChatActive
                              ? isAmoled
                                ? "bg-indigo-500/15"
                                : "bg-indigo-50"
                              : isAmoled
                              ? "hover:bg-white/[0.05]"
                              : "hover:bg-neutral-100/80"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-2xl bg-violet-500/12 border border-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                            <Zap size={19} />
                          </div>
                          <span className="text-[11px] font-medium leading-tight">Vox Chat</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsAppsOpen(false);
                      onViewFeatures("overview");
                    }}
                    className={`mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      isAmoled
                        ? "text-indigo-300 hover:bg-white/[0.06]"
                        : "text-indigo-600 hover:bg-white"
                    }`}
                  >
                    <span>Explore all platform capabilities</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Signed-In Account Avatar with AiVerse Indigo-Violet-Emerald Ring */}
          <SignedIn>
            <div className="relative flex items-center shrink-0">
              {showGreeting && (
                <span className="hidden 2xl:inline text-xs font-medium text-neutral-500 dark:text-neutral-400 mr-2 whitespace-nowrap">
                  Hi, {greetingName}
                </span>
              )}
              <button
                ref={avatarButtonRef}
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative flex items-center justify-center w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 via-violet-500 to-emerald-400 hover:shadow-md transition-all focus:outline-hidden cursor-pointer shrink-0"
                aria-label="User profile menu"
                aria-expanded={isDropdownOpen}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#090a0e] p-[1.5px]">
                  {effectiveAvatar ? (
                    <img
                      src={effectiveAvatar}
                      alt="User avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-xs bg-indigo-600 text-white">
                      {initials}
                    </div>
                  )}
                </div>
              </button>

              {isDropdownOpen && onSaveProfile && (
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 top-12 w-80 sm:w-88 rounded-3xl shadow-2xl p-2 z-50 border border-neutral-200 dark:border-white/10 ${t.modal} overflow-hidden`}
                  style={{
                    boxShadow: isAmoled
                      ? "0 20px 50px -12px rgba(0, 0, 0, 0.75)"
                      : "0 16px 40px -8px rgba(15, 23, 42, 0.2)",
                  }}
                >
                  <UserProfileMenu
                    onboardingProfile={onboardingProfile}
                    onSave={async (profile, meta) => {
                      await onSaveProfile(profile, meta);
                    }}
                    onViewProfile={(uname) => {
                      onViewProfile?.(uname);
                      setIsDropdownOpen(false);
                    }}
                    onViewSaved={onViewSaved}
                    onEditPreferences={onEditPreferences}
                    onClose={() => setIsDropdownOpen(false)}
                    onViewAdminDashboard={onViewAdminDashboard}
                    onRequestDeletion={() => {
                      setIsDropdownOpen(false);
                      setIsDeletionModalOpen(true);
                    }}
                  />
                </div>
              )}
            </div>
            <AccountDeletionModal
              isOpen={isDeletionModalOpen}
              onClose={() => setIsDeletionModalOpen(false)}
              onboardingProfile={onboardingProfile}
            />
          </SignedIn>

          {/* Signed-Out AiVerse Indigo Action Buttons */}
          <SignedOut>
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => openAuthModal("signin")}
                className={`inline-flex items-center h-9 px-2.5 sm:px-3.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isAmoled
                    ? "text-neutral-200 hover:bg-white/[0.06] hover:text-white"
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                className="inline-flex items-center h-9 px-3.5 sm:px-4.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 transition-all cursor-pointer shrink-0 whitespace-nowrap"
              >
                <span>Get started</span>
              </button>
            </div>
          </SignedOut>

          {/* Mobile Navigation Toggle Button (< lg) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
              isAmoled
                ? "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
            }`}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer (Portaled out of backdrop-blur nav so fixed inset-0 fills 100vh) ── */}
      {isMobileMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 lg:hidden flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Dimmed backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-[fadeIn_0.15s_ease-out]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer Sheet */}
            <div className="relative w-[85%] max-w-sm h-full bg-white dark:bg-[#090a0e] border-l border-neutral-200/90 dark:border-white/[0.08] shadow-2xl p-5 flex flex-col justify-between overflow-y-auto no-scrollbar z-50 animate-[slideInRight_0.25s_ease-out]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200/80 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-neutral-900 dark:text-white">AiVerse</span>
                    <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200/70 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {entryCount} Assets
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-500 dark:text-neutral-400 transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Primary Navigation Links */}
                <nav className="flex flex-col gap-1" aria-label="Mobile menu">
                  <button
                    type="button"
                    aria-current={isDashboardActive ? "page" : undefined}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onHomeClick?.();
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-colors cursor-pointer text-left ${
                      isDashboardActive ? navActiveClass : navInactiveClass
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Home size={17} />
                      <span>Dashboard</span>
                    </div>
                  </button>

                  {onBrowseAll && (
                    <button
                      type="button"
                      aria-current={isAllEntriesActive ? "page" : undefined}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onBrowseAll();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-colors cursor-pointer text-left ${
                        isAllEntriesActive ? navActiveClass : navInactiveClass
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <LayoutGrid size={17} />
                        <span>All Entries & Models</span>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 tabular-nums">
                        {entryCount}
                      </span>
                    </button>
                  )}

                  {onViewEcosystems && (
                    <button
                      type="button"
                      aria-current={isEcosystemsActive ? "page" : undefined}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onViewEcosystems();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-colors cursor-pointer text-left ${
                        isEcosystemsActive ? navActiveClass : navInactiveClass
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Building2 size={17} className={isEcosystemsActive ? "" : "text-sky-500"} />
                        <span>AI Labs & Ecosystems</span>
                      </div>
                      {ecosystemsCount && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 tabular-nums">
                          {ecosystemsCount}
                        </span>
                      )}
                    </button>
                  )}

                  {onViewLeaderboard && (
                    <button
                      type="button"
                      aria-current={isLeaderboardActive ? "page" : undefined}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onViewLeaderboard();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-colors cursor-pointer text-left ${
                        isLeaderboardActive ? navActiveClass : navInactiveClass
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Trophy size={17} className={isLeaderboardActive ? "" : "text-amber-500"} />
                        <span>Frontier Leaderboard</span>
                      </div>
                    </button>
                  )}

                  {onViewFeatures && (
                    <div className="pt-2.5 mt-1.5 border-t border-neutral-200/80 dark:border-white/[0.08] flex flex-col gap-1">
                      <span className="px-4 text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-0.5">
                        AiVerse Studio Apps
                      </span>

                      <button
                        type="button"
                        aria-current={activeFeatureSubpage === "playground" ? "page" : undefined}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onViewFeatures("playground");
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-colors cursor-pointer text-left ${
                          activeFeatureSubpage === "playground" ? navActiveClass : navInactiveClass
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Terminal size={17} className="text-emerald-500" />
                          <span>Model Playground</span>
                        </div>
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                          LIVE
                        </span>
                      </button>

                      <button
                        type="button"
                        aria-current={activeFeatureSubpage === "compare" ? "page" : undefined}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onViewFeatures("compare");
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-colors cursor-pointer text-left ${
                          activeFeatureSubpage === "compare" ? navActiveClass : navInactiveClass
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Swords size={17} className="text-purple-500" />
                          <span>Comparison Arena</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        aria-current={activeFeatureSubpage === "wizard" ? "page" : undefined}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onViewFeatures("wizard");
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-colors cursor-pointer text-left ${
                          activeFeatureSubpage === "wizard" ? navActiveClass : navInactiveClass
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Wand2 size={17} className="text-amber-500" />
                          <span>Discovery Wizard</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        aria-current={activeFeatureSubpage === "overview" ? "page" : undefined}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onViewFeatures("overview");
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-full text-xs transition-colors cursor-pointer text-left ${
                          activeFeatureSubpage === "overview" ? navActiveClass : navInactiveClass
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Layers size={15} />
                          <span>All Platform Capabilities</span>
                        </div>
                        <ArrowRight size={13} className="opacity-65" />
                      </button>
                    </div>
                  )}

                  {onViewChat && (
                    <button
                      type="button"
                      aria-current={isChatActive ? "page" : undefined}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onViewChat();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-colors cursor-pointer text-left ${
                        isChatActive ? navActiveClass : navInactiveClass
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Zap size={17} className="text-emerald-500" />
                        <span>Vox AI Assistant</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400">
                        Groq LPU
                      </span>
                    </button>
                  )}

                  {onViewSaved && (
                    <button
                      type="button"
                      aria-current={isSavedActive ? "page" : undefined}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onViewSaved();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm transition-colors cursor-pointer text-left ${
                        isSavedActive ? navActiveClass : navInactiveClass
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Bookmark size={17} />
                        <span>Saved Bookmarks</span>
                      </div>
                      {bookmarksCount > 0 && (
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300">
                          {bookmarksCount}
                        </span>
                      )}
                    </button>
                  )}
                </nav>
              </div>

              {/* Bottom Actions & Preferences */}
              <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200/80 dark:border-white/[0.08] pb-safe">
                <SignedOut>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal("signup");
                      }}
                      className="w-full py-2.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 text-center cursor-pointer"
                    >
                      Get started free
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal("signin");
                      }}
                      className="w-full py-2.5 rounded-full text-xs font-semibold border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-center cursor-pointer"
                    >
                      Sign in
                    </button>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onAddEntry();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Submit AI Asset</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onEditPreferences("profile");
                      }}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-700 dark:text-neutral-200 cursor-pointer"
                    >
                      <span>Edit Profile & Preferences</span>
                      <SlidersHorizontal size={13} />
                    </button>
                  </div>
                </SignedIn>

                <button
                  type="button"
                  onClick={() => setTheme(isAmoled ? "light" : "amoled")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.06] cursor-pointer"
                >
                  {isAmoled ? <Sun size={14} className="text-amber-300" /> : <Moon size={14} />}
                  <span>{isAmoled ? "Switch to Light Mode" : "Switch to AMOLED Dark"}</span>
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </nav>
  );
};
