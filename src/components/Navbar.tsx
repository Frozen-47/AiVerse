import React, { useState, useEffect } from "react";
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
            title={user ? "Edit your preferences" : "Sign in for personal preferences"}
          >
            <SlidersHorizontal size={16} />
            <span className="hidden md:inline">Preferences</span>
          </button>

          <SignedIn>
            <button
              onClick={onAddEntry}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Entry</span>
            </button>
            <div className="ml-1 pl-3 border-l border-white/10 flex items-center gap-2.5">
              <span className={`text-sm font-semibold hidden sm:block ${t.textPrimary}`}>
                Hi, {user?.user_metadata?.firstName || user?.email?.split('@')[0] || "Guest"}
              </span>
              <button
                onClick={() => signOut()}
                className={`p-2 rounded-lg transition-colors ${t.surface} ${t.border} ${t.textMuted} hover:text-red-400 hover:border-red-500/30`}
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </SignedIn>

          <SignedOut>
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