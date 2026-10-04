import React, { useState, useEffect, useRef, useMemo } from "react";
import { SignedIn, SignedOut, useAuth } from "./AuthContext";
import { Plus, Moon, Sun, SlidersHorizontal, LayoutGrid, Building2, Zap } from "lucide-react";
import { useTokens, useTheme } from "../lib/theme";
import { UserProfileMenu } from "./UserProfileMenu";
import { parseProfileMeta, type OnboardingProfile } from "../lib/onboarding";
import { getOAuthAvatarUrl } from "../lib/supabase";

interface NavbarProps {
  onAddEntry: () => void;
  onEditPreferences: (section?: "profile" | "preferences") => void;
  onViewProfile?: (username: string) => void;
  onViewSaved?: () => void;
  onHomeClick?: () => void;
  onViewAdminDashboard?: () => void;
  onBrowseAll?: () => void;
  onViewEcosystems?: () => void;
  onViewChat?: () => void;
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
  onViewChat,
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
  const [showGreeting, setShowGreeting] = useState(false);

  const prevUserRef = useRef<typeof user>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

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
    <nav className="sticky top-0 z-40 border-b backdrop-blur-xl bg-white/80 dark:bg-neutral-950/80 border-neutral-200/80 dark:border-white/[0.08]">
      <div className="w-full px-4 sm:px-6 xl:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              if (onHomeClick) {
                e.preventDefault();
                onHomeClick();
              }
            }}
            className={`flex items-center ${t.textPrimary} hover:opacity-80 transition-opacity`}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.5rem", lineHeight: 1, letterSpacing: "-0.02em" }}
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
          <span className="hidden sm:inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-white/[0.06] whitespace-nowrap">
            {entryCount} assets
          </span>

          {(onBrowseAll || onViewEcosystems) && (
            <div className="hidden md:flex items-center gap-1.5 ml-2 pl-3 border-l border-neutral-200/80 dark:border-white/[0.08]">
              {onBrowseAll && (
                <button
                  onClick={onBrowseAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
                  title="View all verified entries in catalog"
                >
                  <LayoutGrid size={13} />
                  <span>All Entries</span>
                </button>
              )}
              {onViewEcosystems && (
                <button
                  onClick={onViewEcosystems}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
                  title="Explore AI Labs & Ecosystems"
                >
                  <Building2 size={13} className="text-blue-500" />
                  <span>AI Ecosystems</span>
                  {ecosystemsCount && (
                    <span className="text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {ecosystemsCount}
                    </span>
                  )}
                </button>
              )}

              <button
                onClick={() => {
                  if (onViewChat) onViewChat();
                  else window.dispatchEvent(new CustomEvent('open-aiverse-chat'));
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer border border-neutral-200 dark:border-white/10"
                title="Groq LPU Accelerated AI Research (/chat)"
              >
                <Zap size={13} className="text-amber-500 fill-amber-500" />
                <span>Groq Chat</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <SignedIn>
            <button
              onClick={onAddEntry}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Add Entry</span>
            </button>

            <div className="relative flex items-center ml-1 gap-2.5">
              {showGreeting && (
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300 whitespace-nowrap">
                  Hi, {greetingName}
                </span>
              )}
              <button
                ref={avatarButtonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-neutral-200 dark:border-white/10 transition-all focus:outline-hidden cursor-pointer"
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
                    />
                  </div>
              )}
            </div>
          </SignedIn>

          <SignedOut>
            <button
              onClick={() => setTheme(resolvedTheme === "amoled" ? "light" : "amoled")}
              className="p-2 rounded-full border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "amoled" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              onClick={() => onEditPreferences("preferences")}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-white/10 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
              title="Sign in for personal preferences"
            >
              <SlidersHorizontal size={13} />
              <span>Preferences</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal("signin")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-all shadow-xs cursor-pointer"
              >
                <span>Get Started</span>
              </button>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );

};
