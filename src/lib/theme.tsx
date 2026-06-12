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

const darkTokens: TokenMap = {
  // Layout
  page: "bg-neutral-900 text-white",
  surface: "bg-white/[0.03] border border-white/8",
  surface2: "bg-white/[0.05] border border-white/8",
  surfaceHover: "hover:bg-white/[0.07]",
  // Text
  textPrimary: "text-white",
  textSecondary: "text-white/55",
  textMuted: "text-white/35",
  textAccent: "text-white",
  // Borders
  border: "border-white/7",
  borderHover: "hover:border-white/20",
  // Input
  input: "bg-neutral-900 border-white/8 text-white placeholder:text-white/25 focus:border-white/20 focus:ring-1 focus:ring-white/10",
  // Buttons
  btnPrimary: "bg-white hover:bg-white/90 text-black font-bold",
  btnSecondary: "border-white/10 text-white/60 hover:text-white hover:border-white/25 hover:bg-white/4",
  btnGhost: "text-white/40 hover:text-white/80",
  // Pill active/inactive
  pillActive: "bg-white/10 border-white/20 text-white",
  pillInactive: "border-white/7 text-white/35 hover:border-white/15 hover:text-white/65",
  // Card
  card: "bg-white/[0.03] border border-white/8 hover:border-white/15 hover:bg-white/[0.05]",
  // Modal
  modal: "bg-neutral-800 border border-white/8",
  modalOverlay: "fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-neutral-950/80 backdrop-blur-md animate-[fadeIn_0.15s_ease-out]",
  sectionLabel: "text-[10px] font-semibold uppercase tracking-widest mb-3 text-white/35",
  iconBg: "bg-white/6 text-white/50",
  iconBgSolid: "bg-white/8 text-white",
  pillSmall: "text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/8",
  // Nav
  nav: "bg-neutral-900 border border-white/8",
  // Code
  code: "bg-neutral-950 text-neutral-200 border border-white/5",
  // Stats
  statValue: "text-white",
  // Badge type
  badgeModel: "bg-white/5 text-white/70 border border-white/10",
  badgeFramework: "bg-white/5 text-white/70 border border-white/10",
  badgeDataset: "bg-white/5 text-white/70 border border-white/10",
  badgePlatform: "bg-white/5 text-white/70 border border-white/10",
  // Badge task
  badgeNLP: "bg-white/5 text-white/70 border border-white/10",
  badgeCV: "bg-white/5 text-white/70 border border-white/10",
  badgeMLOps: "bg-white/5 text-white/70 border border-white/10",
  badgeAudio: "bg-white/5 text-white/70 border border-white/10",
  badgeMultimodal: "bg-white/5 text-white/70 border border-white/10",
  // Popular
  popular: "bg-white/10 text-white border border-white/15",
  // Typography Colors
  textModel: "text-white/80",
  textFramework: "text-white/80",
  textDataset: "text-white/80",
  textPlatform: "text-white/80",
  textAI: "text-white/80",
  textPopular: "text-white",
  // Icon Colors
  iconModel: "text-white/80 bg-white/5",
  iconFramework: "text-white/80 bg-white/5",
  iconDataset: "text-white/80 bg-white/5",
  iconPlatform: "text-white/80 bg-white/5",
  // Sidebar
  sidebarItem: "text-white/40 hover:text-white/80 hover:bg-white/4",
  sidebarActive: "text-white bg-white/10",
  // Tag
  limitTag: "bg-red-500/8 text-red-400 border-red-500/15",
  errorToast: "bg-red-500/10 border-red-500/20 text-red-500",
  // Link
  link: "text-white/30 hover:text-white transition-colors font-semibold",
  // Scrollbar
  scrollbar: "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10",
};

const amoled: TokenMap = { ...darkTokens };

const light: TokenMap = {
  // Layout
  page: "bg-white text-neutral-900",
  surface: "bg-neutral-50/50 border border-neutral-200",
  surface2: "bg-neutral-100 border border-neutral-200",
  surfaceHover: "hover:bg-neutral-100/70",
  // Text
  textPrimary: "text-neutral-900",
  textSecondary: "text-neutral-500",
  textMuted: "text-neutral-400",
  textAccent: "text-neutral-900",
  // Borders
  border: "border-neutral-200",
  borderHover: "hover:border-neutral-300",
  // Input
  input: "bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200",
  // Buttons
  btnPrimary: "bg-neutral-900 hover:bg-neutral-800 text-white font-bold",
  btnSecondary: "border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50",
  btnGhost: "text-neutral-400 hover:text-neutral-700",
  // Pill active/inactive
  pillActive: "bg-neutral-950/10 border border-neutral-300 text-neutral-900",
  pillInactive: "border border-neutral-200 text-neutral-400 hover:border-neutral-300 hover:text-neutral-700",
  // Card
  card: "bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/30",
  // Modal
  modal: "bg-white border border-neutral-200 shadow-xl",
  modalOverlay: "fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-neutral-950/45 backdrop-blur-xs animate-[fadeIn_0.15s_ease-out]",
  sectionLabel: "text-[10px] font-semibold uppercase tracking-widest mb-3 text-neutral-400",
  iconBg: "bg-neutral-100 text-neutral-500",
  iconBgSolid: "bg-neutral-200 text-neutral-900",
  pillSmall: "text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200",
  // Nav
  nav: "bg-white border-b border-neutral-200",
  // Code
  code: "bg-neutral-50 text-neutral-800 border border-neutral-200",
  // Stats
  statValue: "text-neutral-900 font-bold",
  // Badge type
  badgeModel: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  badgeFramework: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  badgeDataset: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  badgePlatform: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  // Badge task
  badgeNLP: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  badgeCV: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  badgeMLOps: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  badgeAudio: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  badgeMultimodal: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  // Popular
  popular: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  // Typography Colors
  textModel: "text-neutral-800",
  textFramework: "text-neutral-800",
  textDataset: "text-neutral-800",
  textPlatform: "text-neutral-800",
  textAI: "text-neutral-800",
  textPopular: "text-neutral-800",
  // Icon Colors
  iconModel: "text-neutral-700 bg-neutral-100",
  iconFramework: "text-neutral-700 bg-neutral-100",
  iconDataset: "text-neutral-700 bg-neutral-100",
  iconPlatform: "text-neutral-700 bg-neutral-100",
  // Sidebar
  sidebarItem: "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100",
  sidebarActive: "text-neutral-900 bg-neutral-200/50 font-semibold",
  // Tag
  limitTag: "bg-red-50 text-red-600 border border-red-200",
  errorToast: "bg-red-50 border border-red-200 text-red-600",
  // Link
  link: "text-neutral-400 hover:text-neutral-900 transition-colors font-semibold",
  // Scrollbar
  scrollbar: "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-200",
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
    "All Tasks": "bg-gray-400/20 dark:bg-white/10",
    NLP: "bg-black/20 dark:bg-white/30",
    "Computer Vision": "bg-black/20 dark:bg-white/30",
    MLOps: "bg-black/20 dark:bg-white/30",
    Audio: "bg-black/20 dark:bg-white/30",
    Multimodal: "bg-black/20 dark:bg-white/30",
    "AI Coding": "bg-black/20 dark:bg-white/30",
    "Image Generation": "bg-black/20 dark:bg-white/30",
    "Video Generation": "bg-black/20 dark:bg-white/30",
    Productivity: "bg-black/20 dark:bg-white/30",
    Education: "bg-black/20 dark:bg-white/30",
    Research: "bg-black/20 dark:bg-white/30",
  }[task] ?? "bg-gray-500/50 dark:bg-white/20");
}

export function taskActiveColor(task: string, t: TokenMap) {
  return ({
    "All Tasks": t.sidebarActive,
    NLP: t.sidebarActive,
    "Computer Vision": t.sidebarActive,
    MLOps: t.sidebarActive,
    Audio: t.sidebarActive,
    Multimodal: t.sidebarActive,
  }[task] ?? t.sidebarItem);
}

export function typeActiveColor(type: string, t: TokenMap) {
  return ({
    "All": t.sidebarActive,
    Model: t.sidebarActive,
    Framework: t.sidebarActive,
    Dataset: t.sidebarActive,
    Platform: t.sidebarActive,
  }[type] ?? t.sidebarItem);
}
