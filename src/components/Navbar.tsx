import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Sparkles,
  ChevronDown,
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
  entryCount,
  onboardingProfile = null,
  onSaveProfile,
}) => {
  const t = useTokens();
  const { resolvedTheme, setTheme } = useTheme();
  const { user, openAuthModal } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);

  const prevUserRef = useRef<typeof user>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAllEntriesActive = currentRoute?.type === "entries" && currentRoute.tab === "assets";
  const isEcosystemsActive = currentRoute?.type === "entries" && currentRoute.tab === "ecosystems";
  const isLeaderboardActive = currentRoute?.type === "leaderboard";
  const isChatActive = currentRoute?.type === "chat";
  const isFeaturesActive = currentRoute?.type === "features";
  const activeFeatureSubpage = currentRoute?.type === "features" ? currentRoute.subpage : null;

  const handleMouseEnterFeatures = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsFeaturesOpen(true);
  };

  const handleMouseLeaveFeatures = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsFeaturesOpen(false);
    }, 160);
  };

  // Keyboard shortcut: Cmd/Ctrl + K to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onSearchClick?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearchClick]);

  // Click outside for Features dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isFeaturesOpen &&
        featuresRef.current &&
        !featuresRef.current.contains(event.target as Node)
      ) {
        setIsFeaturesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFeaturesOpen]);

  // Close mobile drawer on ESC or route change
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

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
    ? (displayName.split(/\s+/).map((n: string) => n[0]).slice(0, 2).join("")).toUpperCase()
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  return (
    <nav className="sticky top-0 z-40 border-b backdrop-blur-xl bg-white/85 dark:bg-neutral-950/85 border-neutral-200/80 dark:border-white/[0.08] transition-colors">
      <div className="w-full px-4 sm:px-6 xl:px-10 h-14 sm:h-15 flex items-center justify-between gap-3">
        {/* Left Side: Brand Logo & Navigation Links */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <a
            href="/dashboard"
            onClick={(e) => {
              if (onHomeClick) {
                e.preventDefault();
                onHomeClick();
              }
            }}
            className={`flex items-center shrink-0 ${t.textPrimary} hover:opacity-85 transition-opacity`}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.35rem", lineHeight: 1, letterSpacing: "-0.02em" }}
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
              <span className="overflow-hidden transition-all duration-75" style={{ maxWidth: isScrolled ? "0px" : "20px", opacity: isScrolled ? 0 : 1, transitionDelay: isScrolled ? "225ms" : "75ms" }}>e</span>
              <span className="overflow-hidden transition-all duration-75" style={{ maxWidth: isScrolled ? "0px" : "20px", opacity: isScrolled ? 0 : 1, transitionDelay: isScrolled ? "150ms" : "150ms" }}>r</span>
              <span className="overflow-hidden transition-all duration-75" style={{ maxWidth: isScrolled ? "0px" : "20px", opacity: isScrolled ? 0 : 1, transitionDelay: isScrolled ? "75ms" : "225ms" }}>s</span>
              <span className="overflow-hidden transition-all duration-75" style={{ maxWidth: isScrolled ? "0px" : "20px", opacity: isScrolled ? 0 : 1, transitionDelay: isScrolled ? "0ms" : "300ms" }}>e</span>
            </span>
          </a>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10.5px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] text-neutral-500 dark:text-neutral-400 border border-neutral-200/70 dark:border-white/[0.06] whitespace-nowrap shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{entryCount} assets</span>
          </span>

          {/* Central Nav Menu Items */}
          <div className="hidden lg:flex items-center gap-1 ml-1.5 pl-3 border-l border-neutral-200/70 dark:border-white/[0.08]">
            {/* 1. Features Mega-Dropdown */}
            {onViewFeatures && (
              <div
                className="relative"
                ref={featuresRef}
                onMouseEnter={handleMouseEnterFeatures}
                onMouseLeave={handleMouseLeaveFeatures}
              >
                <button
                  type="button"
                  onClick={() => setIsFeaturesOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isFeaturesActive || isFeaturesOpen
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-2xs"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/[0.06]"
                  }`}
                  aria-expanded={isFeaturesOpen}
                  aria-haspopup="true"
                >
                  <Sparkles size={13} className={isFeaturesActive || isFeaturesOpen ? "" : "text-amber-500"} />
                  <span>Features</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 opacity-60 ${isFeaturesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isFeaturesOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 w-[390px] rounded-3xl p-3 z-50 border border-neutral-200/90 dark:border-white/10 bg-white/95 dark:bg-[#121316]/95 backdrop-blur-2xl shadow-2xl animate-[fadeIn_0.15s_ease-out]"
                    style={{
                      boxShadow: "0 20px 50px -10px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="px-3 py-1.5 border-b border-neutral-200/80 dark:border-white/[0.06] mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Platform Capabilities
                      </span>
                    </div>

                    <div className="space-y-1">
                      {/* Model Playground */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsFeaturesOpen(false);
                          onViewFeatures("playground");
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-2xl transition-all text-left group cursor-pointer ${
                          activeFeatureSubpage === "playground"
                            ? "bg-blue-500/10 dark:bg-blue-500/15"
                            : "hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="w-8.5 h-8.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
                          <Terminal size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              Model Playground
                            </span>
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                              LIVE
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-1 mt-0.5">
                            Live prompt inference, streaming tokens, and latency testing
                          </p>
                        </div>
                      </button>

                      {/* Comparison Arena */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsFeaturesOpen(false);
                          onViewFeatures("compare");
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-2xl transition-all text-left group cursor-pointer ${
                          activeFeatureSubpage === "compare"
                            ? "bg-purple-500/10 dark:bg-purple-500/15"
                            : "hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="w-8.5 h-8.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
                          <Swords size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              Comparison Arena
                            </span>
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25">
                              ARENA
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-1 mt-0.5">
                            Head-to-head model benchmark comparison, latency analysis & specs
                          </p>
                        </div>
                      </button>

                      {/* Discovery Wizard */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsFeaturesOpen(false);
                          onViewFeatures("wizard");
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-2xl transition-all text-left group cursor-pointer ${
                          activeFeatureSubpage === "wizard"
                            ? "bg-amber-500/10 dark:bg-amber-500/15"
                            : "hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="w-8.5 h-8.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
                          <Wand2 size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              Discovery Wizard
                            </span>
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                              ADVISOR
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-1 mt-0.5">
                            Interactive recommendation engine to find ideal models for your use case
                          </p>
                        </div>
                      </button>
                    </div>

                    <div className="pt-2 mt-1 border-t border-neutral-200/80 dark:border-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsFeaturesOpen(false);
                          onViewFeatures("overview");
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Layers size={13} className="text-neutral-400" />
                          <span>Explore All Platform Tools</span>
                        </span>
                        <ArrowUpRight size={13} className="opacity-60" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. All Entries */}
            {onBrowseAll && (
              <button
                type="button"
                onClick={onBrowseAll}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isAllEntriesActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-2xs"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/[0.06]"
                }`}
                title="View all verified entries in catalog"
              >
                <LayoutGrid size={13} />
                <span>All Entries</span>
              </button>
            )}

            {/* 3. AI Ecosystems */}
            {onViewEcosystems && (
              <button
                type="button"
                onClick={onViewEcosystems}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isEcosystemsActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-2xs"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/[0.06]"
                }`}
                title="Explore AI Labs & Ecosystems"
              >
                <Building2 size={13} className={isEcosystemsActive ? "" : "text-blue-500"} />
                <span>AI Ecosystems</span>
                {ecosystemsCount && (
                  <span
                    className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full border ${
                      isEcosystemsActive
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                    }`}
                  >
                    {ecosystemsCount}
                  </span>
                )}
              </button>
            )}

            {/* 4. Leaderboard */}
            {onViewLeaderboard && (
              <button
                type="button"
                onClick={onViewLeaderboard}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isLeaderboardActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-2xs"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/[0.06]"
                }`}
                title="Frontier AI Benchmarks & Performance Leaderboard"
              >
                <Trophy size={13} className={isLeaderboardActive ? "" : "text-amber-500"} />
                <span>Leaderboard</span>
              </button>
            )}

            {/* 5. Groq AI Assistant */}
            {onViewChat && (
              <button
                type="button"
                onClick={onViewChat}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isChatActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-2xs"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/[0.06]"
                }`}
                title="Groq AI Chat & Intelligence"
              >
                <Zap size={13} className={isChatActive ? "" : "text-amber-500"} />
                <span>AI Assistant</span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full border ${
                    isChatActive
                      ? "bg-white/20 text-white border-white/30"
                      : "bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 text-violet-600 dark:text-violet-400 border-violet-500/25"
                  }`}
                >
                  AI
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Quick Search, Theme Toggle, Auth / User Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {onSearchClick && (
            <button
              type="button"
              onClick={onSearchClick}
              className="hidden md:flex items-center gap-2 h-8.5 px-3 rounded-full border border-neutral-200/80 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04] hover:bg-neutral-200/60 dark:hover:bg-white/[0.08] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-xs transition-all cursor-pointer shadow-2xs group"
              title="Search models & assets (⌘K)"
            >
              <Search size={13} className="text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors" />
              <span className="text-[11.5px] font-medium hidden sm:inline">Search models...</span>
              <kbd className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-neutral-200 dark:border-white/10 text-neutral-400 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Theme Toggle - Unified for Both SignedIn and SignedOut */}
          <button
            onClick={() => setTheme(resolvedTheme === "amoled" ? "light" : "amoled")}
            className="w-8.5 h-8.5 rounded-full flex items-center justify-center border border-neutral-200/80 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer shrink-0"
            aria-label="Toggle color theme"
            title={resolvedTheme === "amoled" ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {resolvedTheme === "amoled" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <SignedIn>
            <button
              onClick={onAddEntry}
              className="inline-flex items-center gap-1.5 h-8.5 px-3 sm:px-3.5 rounded-full text-xs font-semibold border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer shadow-2xs shrink-0"
              title="Add new AI model or tool"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Add Entry</span>
            </button>

            <div className="relative flex items-center shrink-0">
              {showGreeting && (
                <span className="hidden xl:inline text-xs font-medium text-neutral-500 dark:text-neutral-400 mr-2 whitespace-nowrap">
                  Hi, {greetingName}
                </span>
              )}
              <button
                ref={avatarButtonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative flex items-center justify-center w-8.5 h-8.5 rounded-full overflow-hidden ring-1 ring-neutral-200 dark:ring-white/15 hover:ring-neutral-400 dark:hover:ring-white/30 transition-all focus:outline-hidden cursor-pointer shrink-0"
                aria-label="User profile menu"
                aria-expanded={isDropdownOpen}
              >
                {effectiveAvatar ? (
                  <img src={effectiveAvatar} alt="User avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center font-bold text-xs ${resolvedTheme === 'amoled' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    {initials}
                  </div>
                )}
              </button>

              {isDropdownOpen && onSaveProfile && (
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 top-11 w-80 sm:w-88 rounded-3xl shadow-2xl p-2 z-50 border border-neutral-200 dark:border-white/10 ${t.modal} overflow-hidden`}
                  style={{
                    boxShadow: `0 20px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px ${
                      resolvedTheme === "amoled" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"
                    }`,
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

          <SignedOut>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={() => openAuthModal("signin")}
                className="inline-flex items-center h-8.5 px-3 sm:px-3.5 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className="inline-flex items-center h-8.5 px-3.5 sm:px-4 rounded-full text-xs font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 transition-all shadow-2xs cursor-pointer shrink-0"
              >
                <span>Get Started</span>
              </button>
            </div>
          </SignedOut>

          {/* Mobile Navigation Toggle Button - visible up to lg screens */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-8.5 h-8.5 rounded-full flex items-center justify-center border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0"
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Dimmed backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-[fadeIn_0.15s_ease-out]"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative w-[85%] max-w-sm h-full bg-white dark:bg-[#141518] border-l border-neutral-200/90 dark:border-white/10 shadow-2xl p-5 flex flex-col justify-between overflow-y-auto no-scrollbar z-50 animate-[slideInRight_0.25s_ease-out]">
            {/* Top drawer header */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-neutral-900 dark:text-white">AiVerse</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {entryCount} Assets
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Primary Navigation Links */}
              <nav className="flex flex-col gap-1.5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onHomeClick?.();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Home size={17} className="text-neutral-500 dark:text-neutral-400" />
                    <span className="font-semibold">Dashboard</span>
                  </div>
                </button>

                {onBrowseAll && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onBrowseAll();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <LayoutGrid size={17} className="text-neutral-500 dark:text-neutral-400" />
                      <span className="font-semibold">All Entries & Models</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300">
                      {entryCount}
                    </span>
                  </button>
                )}

                {onViewEcosystems && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onViewEcosystems();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 size={17} className="text-blue-500" />
                      <span className="font-semibold">AI Labs & Ecosystems</span>
                    </div>
                    {ecosystemsCount && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {ecosystemsCount}
                      </span>
                    )}
                  </button>
                )}

                {onViewLeaderboard && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onViewLeaderboard();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Trophy size={17} className="text-amber-500" />
                      <span className="font-semibold">Frontier Leaderboard</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                      Benchmarks
                    </span>
                  </button>
                )}

                {/* AI Platform Features */}
                {onViewFeatures && (
                  <div className="pt-2.5 mt-1 border-t border-neutral-200/60 dark:border-white/[0.06] flex flex-col gap-1">
                    <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">
                      Platform Features
                    </span>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onViewFeatures("playground");
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Terminal size={17} className="text-blue-500" />
                        <span className="font-semibold">Model Playground</span>
                      </div>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                        LIVE
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onViewFeatures("compare");
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Swords size={17} className="text-purple-500" />
                        <span className="font-semibold">Comparison Arena</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25">
                        ARENA
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onViewFeatures("wizard");
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Wand2 size={17} className="text-amber-500" />
                        <span className="font-semibold">Discovery Wizard</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                        ADVISOR
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onViewFeatures("overview");
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Layers size={15} className="text-neutral-400" />
                        <span>All Platform Capabilities</span>
                      </div>
                      <ArrowRight size={13} className="opacity-60" />
                    </button>
                  </div>
                )}

                {onViewChat && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onViewChat();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Zap size={17} className="text-amber-500" />
                      <span className="font-semibold">Groq AI Assistant</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.06] text-neutral-500">
                      /chat
                    </span>
                  </button>
                )}

                {onViewSaved && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onViewSaved();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Bookmark size={17} className="text-neutral-500 dark:text-neutral-400" />
                      <span className="font-semibold">Saved Bookmarks</span>
                    </div>
                  </button>
                )}
              </nav>
            </div>

            {/* Bottom Actions & Preferences */}
            <div className="flex flex-col gap-4 pt-4 border-t border-neutral-200/80 dark:border-white/[0.08] pb-safe">
              <SignedOut>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal("signup");
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black shadow-xs text-center cursor-pointer"
                  >
                    Get Started Free
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal("signin");
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-center cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onEditPreferences("profile");
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 cursor-pointer"
                  >
                    <span>Edit Profile & Preferences</span>
                    <SlidersHorizontal size={13} />
                  </button>
                </div>
              </SignedIn>

              {/* Theme toggle */}
              <div className="flex items-center justify-start pt-2">
                <button
                  onClick={() => setTheme(resolvedTheme === "amoled" ? "light" : "amoled")}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] cursor-pointer"
                >
                  {resolvedTheme === "amoled" ? <Sun size={14} /> : <Moon size={14} />}
                  <span>{resolvedTheme === "amoled" ? "Dark Theme" : "Light Theme"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

};
