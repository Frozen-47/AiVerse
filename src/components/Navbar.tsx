import React from "react";
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
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-white text-sm">
            AI
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
          
          <button
            onClick={onAddEntry}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
          >
            <Plus size={16} />
            Add Entry
          </button>
        </div>
      </div>
    </nav>
  );
};