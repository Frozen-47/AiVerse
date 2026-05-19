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
  const username = user?.user_metadata?.username as string | undefined;
  const description = user?.user_metadata?.description as string | undefined;
  const github = user?.user_metadata?.github as string | undefined;
  const linkedin = user?.user_metadata?.linkedin as string | undefined;
  const medium = user?.user_metadata?.medium as string | undefined;
  const devto = user?.user_metadata?.devto as string | undefined;
  const portfolio = user?.user_metadata?.portfolio as string | undefined;

  const greetingName = username
    ? `${displayName} (${username})`
    : displayName;

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
                  Hi, {greetingName}
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
                  <div className={`absolute right-0 top-11 w-64 rounded-2xl border shadow-xl p-3 ${t.modal} ${t.border} animate-[fadeUp_0.15s_ease-out] z-50 backdrop-blur-md`}>
                    <div className="px-3 py-2.5 border-b border-white/5 mb-2">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${t.textMuted}`}>Builder Profile</p>
                      <p className={`text-base font-black truncate leading-tight ${t.textPrimary}`}>{displayName}</p>
                      {username && (
                        <p className="text-xs font-bold text-cyan-400 mt-0.5">{username}</p>
                      )}
                      <p className={`text-[11px] truncate opacity-70 ${t.textMuted} mt-0.5`}>{email}</p>
                      
                      {description && (
                        <p className={`text-xs ${t.textSecondary} mt-2 italic line-clamp-2 leading-relaxed bg-white/5 px-2 py-1.5 rounded-lg border border-white/5`}>
                          "{description}"
                        </p>
                      )}

                      {/* Branded Social Badges Row */}
                      {(github || linkedin || medium || devto || portfolio) && (
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          {github && (
                            <a
                              href={github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5"
                              title="GitHub"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                              </svg>
                            </a>
                          )}
                          {linkedin && (
                            <a
                              href={linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-[#0a66c2] transition-colors border border-white/5"
                              title="LinkedIn"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </a>
                          )}
                          {medium && (
                            <a
                              href={medium}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5"
                              title="Medium"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm3.04 0c0 3.24-.32 5.87-.71 5.87s-.72-2.63-.72-5.87.32-5.87.72-5.87.71 2.63.71 5.87z"/>
                              </svg>
                            </a>
                          )}
                          {devto && (
                            <a
                              href={devto}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5"
                              title="Dev.to"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 448 512" fill="currentColor">
                                <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM304.14 0H43.86C19.63 0 0 19.63 0 43.86v424.28C0 492.37 19.63 512 43.86 512h360.28c24.23 0 43.86-19.63 43.86-43.86V43.86C448 19.63 428.37 0 304.14 0zM151.05 311.77c0 12.18-4.85 21.78-14.55 28.8-9.7 7.03-22.66 10.54-38.89 10.54H62.22V175.12h35.39c16.23 0 29.19 3.51 38.89 10.54 9.7 7.03 14.55 16.62 14.55 28.8v97.31zm102.3-120.87h-64.44v45.48h51.38v28.29h-51.38v46.12h64.44v28.31H158.46V162.5h94.89v28.4zm102.3 124.36c0 18.28-5.97 32.5-17.9 42.66-11.93 10.16-28.31 15.24-49.13 15.24-20.82 0-37.2-5.08-49.13-15.24-11.93-10.16-17.9-24.38-17.9-42.66v-96.1h32.93v95.82c0 9.57 2.74 16.8 8.22 21.68 5.48 4.88 13.78 7.32 24.89 7.32s19.41-2.44 24.89-7.32c5.48-4.88 8.22-12.11 8.22-21.68v-95.82h32.93v96.1z"/>
                              </svg>
                            </a>
                          )}
                          {portfolio && (
                            <a
                              href={portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-colors border border-white/5"
                              title="Portfolio"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        onEditPreferences();
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:${t.surfaceHover} ${t.textSecondary} hover:${t.textPrimary} text-left cursor-pointer`}
                    >
                      <SlidersHorizontal size={15} />
                      Preferences & Profile
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