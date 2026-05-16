import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Plus, Moon, Sun } from "lucide-react";
import { useTokens, useTheme } from "../lib/theme";

interface NavbarProps {
  onAddEntry: () => void;
  entryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onAddEntry, entryCount }) => {
  const t = useTokens();
  const { theme, setTheme } = useTheme();

  return (
    <nav className={`sticky top-0 z-40 border-b ${t.page} ${t.border} backdrop-blur-sm`}>
      <div className="w-full px-6 xl:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="shrink-0 flex items-center justify-center">
            <img 
              src="/av.svg" 
              alt="AiVerse Logo" 
              className={`w-8 h-8 rounded-lg transition-all ${theme === 'light' ? 'invert' : ''}`} 
            />
          </div>
          <h1 className={`text-lg font-black tracking-tight ${t.textPrimary}`}>AiVerse</h1>
          <span className={`text-xs font-semibold ${t.textMuted}`}>{entryCount} entries</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "amoled" ? "light" : "amoled")}
            className={`p-2 rounded-lg transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
            aria-label="Toggle theme"
          >
            {theme === "amoled" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <SignedIn>
            <button
              onClick={onAddEntry}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
            >
              <Plus size={16} />
              Add Entry
            </button>
            <div className="ml-1 pl-3 border-l border-white/10 flex items-center">
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-lg",
                  }
                }}
              />
            </div>
          </SignedIn>
          
          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <button
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
                >
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-md shadow-cyan-500/20`}
                >
                  Create Account
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};