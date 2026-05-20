import { createContext, useContext } from "react";
import type { Theme } from "../types";

export const ThemeContext = createContext<{
  theme: Theme;
  resolvedTheme: "amoled" | "light";
  setTheme: (t: Theme) => void;
}>({ theme: "system", resolvedTheme: "amoled", setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

// Token map — all Tailwind classes indexed by theme
type TokenMap = Record<string, string>;

const amoled: TokenMap = {
  // Layout
  page: "bg-black text-white",
  surface: "bg-black border-white/7",
  surface2: "bg-black border-white/5",
  surfaceHover: "hover:bg-white/4",
  // Text
  textPrimary: "text-white",
  textSecondary: "text-white/55",
  textMuted: "text-white/30",
  textAccent: "text-cyan-400",
  // Borders
  border: "border-white/7",
  borderHover: "hover:border-white/20",
  // Input
  input: "bg-black border-white/8 text-white placeholder:text-white/25 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10",
  // Buttons
  btnPrimary: "bg-cyan-500 hover:bg-cyan-400 text-black font-bold",
  btnSecondary: "border-white/10 text-white/60 hover:text-white hover:border-white/25 hover:bg-white/4",
  btnGhost: "text-white/40 hover:text-white/80",
  // Pill active/inactive
  pillActive: "bg-cyan-500/15 border-cyan-500/40 text-cyan-400",
  pillInactive: "border-white/7 text-white/35 hover:border-white/15 hover:text-white/65",
  // Card
  card: "bg-black border-white/7 hover:border-white/15 hover:bg-white/3",
  // Modal
  modal: "bg-black border-white/10",
  // Nav
  nav: "bg-black border-white/7",
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
  // Typography Colors
  textModel: "text-violet-400",
  textFramework: "text-amber-400",
  textDataset: "text-sky-400",
  textPlatform: "text-emerald-400",
  textAI: "text-pink-400",
  textPopular: "text-amber-400",
  // Icon Colors
  iconModel: "text-violet-400 bg-violet-500/10",
  iconFramework: "text-amber-400 bg-amber-500/10",
  iconDataset: "text-sky-400 bg-sky-500/10",
  iconPlatform: "text-emerald-400 bg-emerald-500/10",
  // Sidebar
  sidebarItem: "text-white/40 hover:text-white/80 hover:bg-white/4",
  sidebarActive: "text-cyan-400 bg-cyan-500/10",
  // Tag
  limitTag: "bg-red-500/8 text-red-400 border-red-500/15",
  errorToast: "bg-red-500/10 border-red-500/20 text-red-500",
  // Link
  link: "text-white/30 hover:text-white transition-colors font-semibold",
  // Scrollbar
  scrollbar: "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10",
};

const light: TokenMap = {
  page: "bg-white text-gray-900",
  surface: "bg-white border-black/8",
  surface2: "bg-white border-black/6",
  surfaceHover: "hover:bg-black/2",
  textPrimary: "text-gray-900",
  textSecondary: "text-gray-500",
  textMuted: "text-gray-400",
  textAccent: "text-cyan-600",
  border: "border-black/8",
  borderHover: "hover:border-black/20",
  input: "bg-white border-black/10 text-gray-900 placeholder:text-gray-400 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10",
  btnPrimary: "bg-cyan-600 hover:bg-cyan-500 text-white font-bold",
  btnSecondary: "border-black/10 text-gray-500 hover:text-gray-900 hover:border-black/20 hover:bg-black/3",
  btnGhost: "text-gray-400 hover:text-gray-700",
  pillActive: "bg-cyan-500/10 border-cyan-500/30 text-cyan-700",
  pillInactive: "border-black/8 text-gray-400 hover:border-black/15 hover:text-gray-700",
  card: "bg-white border-black/7 hover:border-black/15 hover:shadow-md",
  modal: "bg-white border-black/10",
  nav: "bg-white border-black/8",
  code: "bg-white border border-black/10 text-slate-800",
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
  textModel: "text-violet-700",
  textFramework: "text-amber-700",
  textDataset: "text-sky-700",
  textPlatform: "text-emerald-700",
  textAI: "text-pink-700",
  textPopular: "text-amber-700",
  iconModel: "text-violet-700 bg-violet-500/8",
  iconFramework: "text-amber-700 bg-amber-500/8",
  iconDataset: "text-sky-700 bg-sky-500/8",
  iconPlatform: "text-emerald-700 bg-emerald-500/8",
  sidebarItem: "text-gray-500 hover:text-gray-900 hover:bg-black/4",
  sidebarActive: "text-cyan-700 bg-cyan-500/8",
  limitTag: "bg-red-500/6 text-red-600 border-red-500/15",
  errorToast: "bg-red-500/10 border-red-500/30 text-red-600",
  link: "text-gray-400 hover:text-gray-900 transition-colors font-semibold",
  scrollbar: "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/10",
};

export const tokens = { amoled, light };

export function useTokens() {
  const { resolvedTheme } = useTheme();
  return tokens[resolvedTheme];
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

export function typeIcon(type: string, t: TokenMap) {
  return ({
    Model: t.iconModel,
    Framework: t.iconFramework,
    Dataset: t.iconDataset,
    Platform: t.iconPlatform,
  }[type] ?? t.pillInactive);
}

export function taskColor(task: string) {
  return ({
    "All Tasks": "bg-gray-400/20",
    NLP: "bg-blue-500",
    "Computer Vision": "bg-rose-500",
    MLOps: "bg-orange-500",
    Audio: "bg-teal-500",
    Multimodal: "bg-purple-500",
    "AI Coding": "bg-emerald-500",
    "Image Generation": "bg-fuchsia-500",
    "Video Generation": "bg-indigo-500",
    Productivity: "bg-yellow-500",
    Education: "bg-cyan-500",
    Research: "bg-amber-500",
  }[task] ?? "bg-gray-500/50");
}

export function typeActiveColor(type: string, t: TokenMap) {
  return ({
    "All": t.sidebarActive,
    Model: t.iconModel,
    Framework: t.iconFramework,
    Dataset: t.iconDataset,
    Platform: t.iconPlatform,
  }[type] ?? t.sidebarActive);
}

export function taskActiveColor(task: string, t: TokenMap) {
  return ({
    "All Tasks": t.sidebarActive,
    NLP: "text-blue-400 bg-blue-500/10",
    "Computer Vision": "text-rose-400 bg-rose-500/10",
    MLOps: "text-orange-400 bg-orange-500/10",
    Audio: "text-teal-400 bg-teal-500/10",
    Multimodal: "text-purple-400 bg-purple-500/10",
    "AI Coding": "text-emerald-400 bg-emerald-500/10",
    "Image Generation": "text-fuchsia-400 bg-fuchsia-500/10",
    "Video Generation": "text-indigo-400 bg-indigo-500/10",
    Productivity: "text-yellow-400 bg-yellow-500/10",
    Education: "text-cyan-400 bg-cyan-500/10",
    Research: "text-amber-500 bg-amber-500/10",
  }[task] ?? t.sidebarActive);
}
