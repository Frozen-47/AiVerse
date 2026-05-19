import React, { useState, useEffect, useRef } from "react";
import { SignedIn, SignedOut, useAuth } from "./AuthContext";
import { Plus, Moon, Sun, SlidersHorizontal, LogOut } from "lucide-react";
import { useTokens, useTheme } from "../lib/theme";

interface NavbarProps {
  onAddEntry: () => void;
  onEditPreferences: () => void;
  entryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onAddEntry,
  onEditPreferences,
  entryCount,
}) => {
  const t = useTokens();
  const { theme, setTheme } = useTheme();
  const { user, openAuthModal, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  
  const prevUserRef = useRef<any>(null);

  useEffect(() => {
    // If we transition from no user (guest) to signed-in user
    if (!prevUserRef.current && user) {
      setShowGreeting(true);
      const timer = setTimeout(() => {
        setShowGreeting(false);
      }, 20000); // 20 seconds
      return () => clearTimeout(timer);
    }
    prevUserRef.current = user;
  }, [user]);

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const firstName = (user?.user_metadata?.firstName as string) || "";
  const lastName = (user?.user_metadata?.lastName as string) || "";
  const email = user?.email || "";
  
  const initials = firstName 
    ? (firstName[0] + (lastName ? lastName[0] : "")).toUpperCase() 
    : (email ? email[0] : "U").toUpperCase();
    
  const displayName = (user?.user_metadata?.firstName as string) || email.split('@')[0] || "User";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-40 border-b ${t.page} ${t.border} backdrop-blur-sm`}>
      <div className="w-full px-4 sm:px-6 xl:px-12 h-16 flex items-center justify-between">

        {/* Left: logo + entry count */}
        <div className="flex items-center gap-3">
          <a
            href="https://aiverse.frozenn.in"
            className={`flex items-center ${t.textPrimary} hover:opacity-80 transition-opacity`}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.5rem", lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            {/* Λ — inverted V for perfect stroke match */}
            <span 
              className="inline-block transform rotate-180 relative"
              style={{ top: "-0.75px", marginRight: isScrolled ? "-3px" : "0" }}
            >
              V
            </span>

            {/* i — typewriter effect */}
            <span
              className="overflow-hidden whitespace-nowrap transition-all duration-75 flex items-center justify-center"
              style={{
                maxWidth: isScrolled ? "0px" : "14px",
                opacity: isScrolled ? 0 : 1,
                margin: isScrolled ? "0" : "0 1px",
                transitionDelay: isScrolled ? "300ms" : "0ms"
              }}
            >
              i
            </span>

            {/* V — always visible */}
            <span className="relative">V</span>

            {/* erse — typewriter effect */}
            <span className="flex items-center">
              <span className="overflow-hidden transition-all duration-75" style={{ maxWidth: isScrolled ? "0px" : "20px", opacity: isScrolled ? 0 : 1, transitionDelay: isScrolled ? "225ms" : "75ms" }}>e</span>
              <span className="overflow-hidden transition-all duration-75" style={{ maxWidth: isScrolled ? "0px" : "20px", opacity: isScrolled ? 0 : 1, transitionDelay: isScrolled ? "150ms" : "150ms" }}>r</span>
              <span className="overflow-hidden transition-all duration-75" style={{ maxWidth: isScrolled ? "0px" : "20px", opacity: isScrolled ? 0 : 1, transitionDelay: isScrolled ? "75ms" : "225ms" }}>s</span>
              <span className="overflow-hidden transition-all duration-75" style={{ maxWidth: isScrolled ? "0px" : "20px", opacity: isScrolled ? 0 : 1, transitionDelay: isScrolled ? "0ms" : "300ms" }}>e</span>
            </span>
          </a>

          <span className={`hidden sm:inline-block text-xs font-semibold whitespace-nowrap ${t.textMuted}`}>
            {entryCount} entries
          </span>
        </div>

        {/* Right: theme toggle + auth */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <button
              onClick={onAddEntry}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Entry</span>
            </button>
            
            <div className="relative flex items-center ml-1 gap-2.5">
              {showGreeting && (
                <span className={`text-sm font-semibold whitespace-nowrap ${t.textPrimary} animate-[fadeUp_0.3s_ease-out]`}>
                  Hi, {displayName}
                </span>
              )}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border border-white/10 transition-all hover:scale-105 active:scale-95 focus:outline-hidden cursor-pointer"
                aria-label="User profile menu"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="User avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-cyan-500 to-blue-500 text-white font-bold text-sm">
                    {initials}
                  </div>
                )}
              </button>

              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className={`absolute right-0 top-11 w-56 rounded-2xl border shadow-xl p-2 ${t.modal} ${t.border} animate-[fadeUp_0.15s_ease-out] z-50 backdrop-blur-md`}>
                    <div className="px-3 py-2 border-b border-white/5 mb-1.5">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${t.textMuted}`}>Signed in as</p>
                      <p className={`text-sm font-bold truncate ${t.textPrimary}`}>{displayName}</p>
                      <p className={`text-xs truncate ${t.textMuted}`}>{email}</p>
                    </div>

                    <button
                      onClick={() => {
                        onEditPreferences();
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:${t.surfaceHover} ${t.textSecondary} hover:${t.textPrimary} text-left cursor-pointer`}
                    >
                      <SlidersHorizontal size={15} />
                      Preferences
                    </button>

                    <button
                      onClick={() => {
                        setTheme(theme === "amoled" ? "light" : "amoled");
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:${t.surfaceHover} ${t.textSecondary} hover:${t.textPrimary} text-left cursor-pointer`}
                    >
                      {theme === "amoled" ? <Sun size={15} /> : <Moon size={15} />}
                      Theme: {theme === "amoled" ? "AMOLED" : "Light"}
                    </button>

                    <div className="border-t border-white/5 my-1.5" />

                    <button
                      onClick={() => {
                        signOut();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-300 text-left cursor-pointer"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </SignedIn>

          <SignedOut>
            <button
              onClick={() => setTheme(theme === "amoled" ? "light" : "amoled")}
              className={`p-2 rounded-lg transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
              aria-label="Toggle theme"
            >
              {theme === "amoled" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={onEditPreferences}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
              title="Sign in for personal preferences"
            >
              <SlidersHorizontal size={16} />
              <span className="hidden md:inline">Preferences</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal("signin")}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
              >
                Login
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-md shadow-cyan-500/20`}
              >
                <span className="hidden sm:inline">Create Account</span>
                <span className="sm:hidden">Sign Up</span>
              </button>
            </div>
          </SignedOut>
        </div>

      </div>
    </nav>
  );
};