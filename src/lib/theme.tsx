import { createContext, useContext } from "react";
import type { Theme } from "../types";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "amoled", setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

// Token map — all Tailwind classes indexed by theme
type TokenMap = Record<string, string>;

const amoled: TokenMap = {
  // Layout
  page: "bg-black text-white",
  surface: "bg-[#0a0a0a] border-white/[0.07]",
  surface2: "bg-[#111] border-white/[0.05]",
  surfaceHover: "hover:bg-white/[0.04]",
  // Text
  textPrimary: "text-white",
  textSecondary: "text-white/55",
  textMuted: "text-white/30",
  textAccent: "text-cyan-400",
  // Borders
  border: "border-white/[0.07]",
  borderHover: "hover:border-white/20",
  // Input
  input: "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10",
  // Buttons
  btnPrimary: "bg-cyan-500 hover:bg-cyan-400 text-black font-bold",
  btnSecondary: "border-white/[0.1] text-white/60 hover:text-white hover:border-white/25 hover:bg-white/[0.04]",
  btnGhost: "text-white/40 hover:text-white/80",
  // Pill active/inactive
  pillActive: "bg-cyan-500/15 border-cyan-500/40 text-cyan-400",
  pillInactive: "border-white/[0.07] text-white/35 hover:border-white/15 hover:text-white/65",
  // Card
  card: "bg-[#0d0d0d] border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.025]",
  // Modal
  modal: "bg-[#0a0a0a] border-white/[0.1]",
  // Nav
  nav: "bg-black/80 border-white/[0.07]",
  // Code
  code: "bg-black text-emerald-400",
  // Stats
  statValue: "text-cyan-400",
  // Badge type
  badgeModel: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  badgeFramework: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  badgeDataset: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  badgePlatform: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  // Badge task
  badgeNLP: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  badgeCV: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  badgeMLOps: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  badgeAudio: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  badgeMultimodal: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  // Popular
  popular: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  // Sidebar
  sidebarItem: "text-white/40 hover:text-white/80 hover:bg-white/[0.04]",
  sidebarActive: "text-cyan-400 bg-cyan-500/10",
  // Tag
  limitTag: "bg-red-500/8 text-red-400 border-red-500/15",
  // Scrollbar
  scrollbar: "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10",
};

const light: TokenMap = {
  page: "bg-slate-50 text-gray-900",
  surface: "bg-white border-black/[0.08]",
  surface2: "bg-slate-50 border-black/[0.06]",
  surfaceHover: "hover:bg-black/[0.02]",
  textPrimary: "text-gray-900",
  textSecondary: "text-gray-500",
  textMuted: "text-gray-400",
  textAccent: "text-cyan-600",
  border: "border-black/[0.08]",
  borderHover: "hover:border-black/20",
  input: "bg-black/[0.03] border-black/10 text-gray-900 placeholder:text-gray-400 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10",
  btnPrimary: "bg-cyan-600 hover:bg-cyan-500 text-white font-bold",
  btnSecondary: "border-black/[0.1] text-gray-500 hover:text-gray-900 hover:border-black/20 hover:bg-black/[0.03]",
  btnGhost: "text-gray-400 hover:text-gray-700",
  pillActive: "bg-cyan-500/10 border-cyan-500/30 text-cyan-700",
  pillInactive: "border-black/[0.08] text-gray-400 hover:border-black/15 hover:text-gray-700",
  card: "bg-white border-black/[0.07] hover:border-black/15 hover:shadow-md",
  modal: "bg-white border-black/[0.1]",
  nav: "bg-white/90 border-black/[0.08]",
  code: "bg-gray-950 text-emerald-400",
  statValue: "text-cyan-600",
  badgeModel: "bg-violet-500/8 text-violet-700 border-violet-500/20",
  badgeFramework: "bg-amber-500/8 text-amber-700 border-amber-500/20",
  badgeDataset: "bg-sky-500/8 text-sky-700 border-sky-500/20",
  badgePlatform: "bg-emerald-500/8 text-emerald-700 border-emerald-500/20",
  badgeNLP: "bg-blue-500/8 text-blue-700 border-blue-500/20",
  badgeCV: "bg-rose-500/8 text-rose-700 border-rose-500/20",
  badgeMLOps: "bg-orange-500/8 text-orange-700 border-orange-500/20",
  badgeAudio: "bg-teal-500/8 text-teal-700 border-teal-500/20",
  badgeMultimodal: "bg-purple-500/8 text-purple-700 border-purple-500/20",
  popular: "bg-amber-500/8 text-amber-700 border-amber-500/20",
  sidebarItem: "text-gray-400 hover:text-gray-900 hover:bg-black/[0.04]",
  sidebarActive: "text-cyan-700 bg-cyan-500/8",
  limitTag: "bg-red-500/6 text-red-600 border-red-500/15",
  scrollbar: "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/10",
};

export const tokens = { amoled, light };

export function useTokens() {
  const { theme } = useTheme();
  return tokens[theme];
}

// Badge helpers
export function typeBadge(type: string, t: TokenMap) {
  return ({
    Model: t.badgeModel,
    Framework: t.badgeFramework,
    Dataset: t.badgeDataset,
    Platform: t.badgePlatform,
  }[type] ?? t.pillInactive);
}

export function taskBadge(task: string, t: TokenMap) {
  return ({
    NLP: t.badgeNLP,
    "Computer Vision": t.badgeCV,
    MLOps: t.badgeMLOps,
    Audio: t.badgeAudio,
    Multimodal: t.badgeMultimodal,
  }[task] ?? t.pillInactive);
}

export const TYPE_GLYPH: Record<string, string> = {
  Model: "◈", Framework: "⬡", Dataset: "◎", Platform: "◉",
};

export const TYPE_ICON_CLASS: Record<string, string> = {
  Model: "text-violet-400 bg-violet-500/10",
  Framework: "text-amber-400 bg-amber-500/10",
  Dataset: "text-sky-400 bg-sky-500/10",
  Platform: "text-emerald-400 bg-emerald-500/10",
};
