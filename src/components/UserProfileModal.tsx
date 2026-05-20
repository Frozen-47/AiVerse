import React, { useState, useEffect } from "react";
import {
  X,
  Loader2,
  Cpu,
  Layers,
  GitBranch,
  Sparkles,
  Terminal,
  Compass,
  Share2,
  Check,
  Award,
  Laptop,
  Code2,
  Zap
} from "lucide-react";
import { fetchProfileByUsername, type PublicBuilderProfile } from "../lib/supabase";
import { useTokens } from "../lib/theme";
import { roleLabel } from "../lib/onboarding";
import { useAuth } from "./AuthContext";
import { shareUrlForProfile } from "../lib/entryUrl";

interface UserProfileModalProps {
  username: string;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  username,
  onClose,
}) => {
  const t = useTokens();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<PublicBuilderProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "accolades" | "gear">("overview");
  const [copied, setCopied] = useState(false);

  // Check if this profile belongs to the signed-in user
  const isOwnProfile =
    user?.user_metadata?.username?.toLowerCase() === username.toLowerCase();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    // If it's the signed-in user's own profile, populate from user_metadata directly
    if (isOwnProfile) {
      const meta = user?.user_metadata;
      setProfile({
        userKey: user?.id || "",
        displayName: meta?.firstName || "Builder",
        username: meta?.username || username,
        description: meta?.description || "",
        github: meta?.github || "",
        linkedin: meta?.linkedin || "",
        medium: meta?.medium || "",
        devto: meta?.devto || "",
        portfolio: meta?.portfolio || "",
        role: meta?.role || "Developer",
        interests: meta?.interests || [],
      });
      setLoading(false);
      return;
    }

    // Otherwise, fetch from public Supabase preferences table
    fetchProfileByUsername(username)
      .then((data) => {
        if (!active) return;
        if (data) {
          setProfile(data);
        } else {
          setError(`No profile found for ${username}`);
        }
      })
      .catch(() => {
        if (active) setError("Could not load developer profile.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [username, isOwnProfile, user]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const initials = profile?.displayName
    ? profile.displayName.slice(0, 2).toUpperCase()
    : username.replace("@", "").slice(0, 2).toUpperCase();

  // Overhauled role configuration including theme colors, names, and customized SVG orbits
  const roleConfig = (() => {
    const r = profile?.role?.toLowerCase() || "";
    if (r === "ml_engineer") {
      return {
        gradient: "from-violet-600 via-indigo-700 to-purple-900",
        accent: "text-purple-400 border-purple-500/20 bg-purple-500/10",
        glow: "shadow-purple-500/25",
        badge: "ML ARCHITECT",
        icon: "⚡",
        bgLight: "bg-purple-950/20",
        orbitColor: "#a855f7",
        // Neural network orbit SVG
        renderSVG: () => (
          <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 120" fill="none">
            <g className="animate-pulse">
              <circle cx="200" cy="60" r="4" fill="#a855f7" className="animate-ping" />
              <circle cx="200" cy="60" r="3" fill="#a855f7" />
              <circle cx="120" cy="30" r="3" fill="#818cf8" />
              <circle cx="130" cy="90" r="3" fill="#818cf8" />
              <circle cx="280" cy="30" r="3" fill="#c084fc" />
              <circle cx="270" cy="90" r="3" fill="#c084fc" />
              <line x1="120" y1="30" x2="200" y2="60" stroke="#818cf8" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="130" y1="90" x2="200" y2="60" stroke="#818cf8" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="280" y1="30" x2="200" y2="60" stroke="#c084fc" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="270" y1="90" x2="200" y2="60" stroke="#c084fc" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="120" y1="30" x2="130" y2="90" stroke="#818cf8" strokeWidth="0.5" opacity="0.5" />
              <line x1="280" y1="30" x2="270" y2="90" stroke="#c084fc" strokeWidth="0.5" opacity="0.5" />
            </g>
          </svg>
        ),
      };
    }
    if (r === "researcher") {
      return {
        gradient: "from-emerald-500 via-teal-700 to-cyan-900",
        accent: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
        glow: "shadow-emerald-500/25",
        badge: "RESEARCH SCHOLAR",
        icon: "🔬",
        bgLight: "bg-emerald-950/20",
        orbitColor: "#10b981",
        // Quantum energy ellipses SVG
        renderSVG: () => (
          <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 120" fill="none">
            <ellipse cx="200" cy="60" rx="90" ry="25" stroke="#10b981" strokeWidth="0.5" opacity="0.6" transform="rotate(-15 200 60)" />
            <ellipse cx="200" cy="60" rx="90" ry="25" stroke="#06b6d4" strokeWidth="0.5" opacity="0.6" transform="rotate(15 200 60)" />
            <g className="animate-[spin_10s_linear_infinite]" style={{ transformOrigin: "200px 60px" }}>
              <circle cx="110" cy="60" r="2.5" fill="#10b981" />
            </g>
            <g className="animate-[spin_14s_linear_infinite]" style={{ transformOrigin: "200px 60px" }}>
              <circle cx="290" cy="60" r="2.5" fill="#06b6d4" />
            </g>
            <circle cx="200" cy="60" r="5" fill="#14b8a6" className="animate-pulse" />
          </svg>
        ),
      };
    }
    if (r === "developer") {
      return {
        gradient: "from-cyan-500 via-blue-700 to-indigo-900",
        accent: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
        glow: "shadow-cyan-500/25",
        badge: "CORE BUILDER",
        icon: "💻",
        bgLight: "bg-cyan-950/20",
        orbitColor: "#06b6d4",
        // Binary tech grid matrix SVG
        renderSVG: () => (
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 120" fill="none">
            <path d="M 0,20 L 400,20 M 0,50 L 400,50 M 0,80 L 400,80 M 0,110 L 400,110" stroke="#06b6d4" strokeWidth="0.25" opacity="0.3" />
            <path d="M 50,0 L 50,120 M 120,0 L 120,120 M 200,0 L 200,120 M 280,0 L 280,120 M 350,0 L 350,120" stroke="#06b6d4" strokeWidth="0.25" opacity="0.3" />
            <circle cx="120" cy="50" r="2" fill="#00f2ff" opacity="0.8" className="animate-ping" />
            <circle cx="280" cy="80" r="2" fill="#3b82f6" opacity="0.8" />
            <circle cx="200" cy="20" r="2" fill="#06b6d4" opacity="0.6" />
          </svg>
        ),
      };
    }
    if (r === "student") {
      return {
        gradient: "from-sky-500 via-indigo-600 to-purple-800",
        accent: "text-sky-400 border-sky-500/20 bg-sky-500/10",
        glow: "shadow-sky-500/25",
        badge: "AI ACADEMIC",
        icon: "🎓",
        bgLight: "bg-sky-950/20",
        orbitColor: "#0ea5e9",
        // Star constellation orbits SVG
        renderSVG: () => (
          <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 120" fill="none">
            <g className="animate-pulse">
              <line x1="80" y1="40" x2="140" y2="20" stroke="#0ea5e9" strokeWidth="0.5" />
              <line x1="140" y1="20" x2="200" y2="50" stroke="#0ea5e9" strokeWidth="0.5" />
              <line x1="200" y1="50" x2="260" y2="30" stroke="#818cf8" strokeWidth="0.5" />
              <line x1="260" y1="30" x2="320" y2="70" stroke="#818cf8" strokeWidth="0.5" />
              <circle cx="80" cy="40" r="2" fill="#fff" />
              <circle cx="140" cy="20" r="2.5" fill="#0ea5e9" />
              <circle cx="200" cy="50" r="3" fill="#fff" />
              <circle cx="260" cy="30" r="2" fill="#818cf8" />
              <circle cx="320" cy="70" r="2.5" fill="#c084fc" />
            </g>
          </svg>
        ),
      };
    }
    if (r === "product") {
      return {
        gradient: "from-amber-500 via-orange-600 to-rose-800",
        accent: "text-amber-400 border-amber-500/20 bg-amber-500/10",
        glow: "shadow-amber-500/25",
        badge: "PRODUCT LEAD",
        icon: "🎯",
        bgLight: "bg-amber-950/20",
        orbitColor: "#f59e0b",
        // Concentric target ripples SVG
        renderSVG: () => (
          <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 120" fill="none">
            <circle cx="200" cy="60" r="50" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
            <circle cx="200" cy="60" r="30" stroke="#f97316" strokeWidth="0.5" opacity="0.4" />
            <circle cx="200" cy="60" r="15" stroke="#ef4444" strokeWidth="0.5" opacity="0.5" />
            <line x1="200" y1="10" x2="200" y2="110" stroke="#f59e0b" strokeWidth="0.25" opacity="0.3" />
            <line x1="100" y1="60" x2="300" y2="60" stroke="#f59e0b" strokeWidth="0.25" opacity="0.3" />
            <circle cx="200" cy="60" r="2" fill="#fff" />
          </svg>
        ),
      };
    }
    if (r === "hobbyist") {
      return {
        gradient: "from-fuchsia-500 via-rose-600 to-violet-900",
        accent: "text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/10",
        glow: "shadow-fuchsia-500/25",
        badge: "COSMIC EXPLORER",
        icon: "🚀",
        bgLight: "bg-fuchsia-950/20",
        orbitColor: "#d946ef",
        // Rocket orbits/nebula dust SVG
        renderSVG: () => (
          <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 120" fill="none">
            <ellipse cx="200" cy="60" rx="110" ry="18" stroke="#d946ef" strokeWidth="0.5" opacity="0.4" transform="rotate(-5 200 60)" />
            <g className="animate-[spin_8s_linear_infinite]" style={{ transformOrigin: "200px 60px" }}>
              <path d="M90 60 L94 57 L92 60 L94 63 Z" fill="#f43f5e" />
            </g>
            <circle cx="150" cy="30" r="1.5" fill="#fff" opacity="0.7" />
            <circle cx="260" cy="90" r="1" fill="#fff" opacity="0.5" />
            <circle cx="310" cy="40" r="2" fill="#a855f7" opacity="0.6" className="animate-pulse" />
          </svg>
        ),
      };
    }
    // Default fallback
    return {
      gradient: "from-slate-600 via-zinc-700 to-slate-800",
      accent: "text-slate-400 border-slate-500/20 bg-slate-500/10",
      glow: "shadow-slate-500/25",
      badge: "COMMUNITY MEMBER",
      icon: "👤",
      bgLight: "bg-slate-950/20",
      orbitColor: "#94a3b8",
      renderSVG: () => (
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 120" fill="none">
          <line x1="0" y1="60" x2="400" y2="60" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="5 5" />
        </svg>
      ),
    };
  })();

  // Copy Profile URL helper
  const handleShare = () => {
    if (!profile?.username) return;
    const shareUrl = shareUrlForProfile(profile.username);
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Gamified Builder Level XP Logic
  const baseXP = profile?.interests?.length ? profile.interests.length * 150 : 150;
  const builderLevel = profile?.interests?.length ? Math.min(10, Math.max(1, profile.interests.length)) : 1;
  const maxXPForLevel = 1500;
  const xpPercent = Math.min(100, Math.max(10, (baseXP / maxXPForLevel) * 100));

  // Accolades logic
  const accoladesList = [
    {
      id: "neural",
      title: "Neural Pathfinder",
      desc: "Engineered deep neural networks or complex pipeline topologies.",
      icon: Cpu,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20 shadow-violet-500/5",
      unlocked:
        profile?.role === "ml_engineer" ||
        profile?.role === "researcher" ||
        (profile?.interests || []).some((i) =>
          ["nlp", "cv", "computer_vision", "multimodal", "audio"].includes(i.toLowerCase())
        ),
    },
    {
      id: "oracle",
      title: "API Oracle",
      desc: "Exposed robust and clean endpoints or web assets to the community.",
      icon: Layers,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/5",
      unlocked: !!(profile?.portfolio || profile?.devto || profile?.medium),
    },
    {
      id: "titan",
      title: "Open-Source Titan",
      desc: "Contributed shared libraries or structured repositories to GitHub.",
      icon: GitBranch,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-cyan-500/5",
      unlocked: !!profile?.github,
    },
    {
      id: "alchemist",
      title: "Code Alchemist",
      desc: "Synthesized highly abstract models from loose conceptual products.",
      icon: Sparkles,
      color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20 shadow-fuchsia-500/5",
      unlocked: (profile?.interests || []).length >= 3 || profile?.role === "developer",
    },
    {
      id: "hunter",
      title: "Bug Hunter",
      desc: "Squashed asynchronous state races and resolved critical memory locks.",
      icon: Terminal,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5",
      unlocked: true, // Every AIpedia builder has unlocked this badge!
    },
    {
      id: "explorer",
      title: "Cosmic Explorer",
      desc: "Ventured into novel, undocumented multi-agent architectures.",
      icon: Compass,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-500/5",
      unlocked: profile?.role === "hobbyist" || profile?.role === "student" || (profile?.interests || []).length >= 5,
    },
  ];

  // Dev gear logic based on role
  const gearConfig = (() => {
    const r = profile?.role?.toLowerCase() || "";
    if (r === "ml_engineer") {
      return [
        { label: "Main IDE", val: "Cursor / Vim", details: "Cybernetic coding context" },
        { label: "Language", val: "Python 3.11", details: "Typing & async execution" },
        { label: "Framework", val: "PyTorch & HuggingFace", details: "Distributed tensor nodes" },
        { label: "Terminal", val: "zsh + Warp", details: "Hardware accelerated shell" },
        { label: "Caffeination", val: "Double Ristretto Espresso", details: "Thermal extraction" },
        { label: "Vibe Theme", val: "Dracula AMOLED", details: "Zero pixel emission" },
      ];
    }
    if (r === "researcher") {
      return [
        { label: "Main IDE", val: "VS Code", details: "Extended workspace configurations" },
        { label: "Language", val: "Python / LaTeX", details: "Numerical formulas & proofs" },
        { label: "Framework", val: "JAX & Equinox", details: "Functional autodiff gradients" },
        { label: "Terminal", val: "bash + tmux", details: "Decoupled server instances" },
        { label: "Caffeination", val: "Ceremonial Matcha Green Tea", details: "L-Theanine focused energy" },
        { label: "Vibe Theme", val: "Solarized Light/Dark", details: "High contrast readability" },
      ];
    }
    if (r === "developer") {
      return [
        { label: "Main IDE", val: "Cursor AI", details: "Dynamic codebase generation" },
        { label: "Language", val: "TypeScript & Rust", details: "Strict compiling structures" },
        { label: "Framework", val: "Next.js & TailwindCSS", details: "Stateless component builds" },
        { label: "Terminal", val: "zsh + Oh My Zsh", details: "Polished alias prompts" },
        { label: "Caffeination", val: "Specialty Pour Over Coffee", details: "Single-origin filter notes" },
        { label: "Vibe Theme", val: "AMOLED Midnight", details: "Perfect black backgrounds" },
      ];
    }
    if (r === "product") {
      return [
        { label: "Main IDE", val: "Notion & Figma", details: "Product maps & assets" },
        { label: "Language", val: "Markdown / SQL", details: "Structured data reporting" },
        { label: "Framework", val: "React Concepts", details: "Component lifecycle models" },
        { label: "Terminal", val: "Slack CLI", details: "Unified team sync loops" },
        { label: "Caffeination", val: "Cold Brew on Draft", details: "Extended slow release caffeine" },
        { label: "Vibe Theme", val: "Nord Glass", details: "Frosted pastel elements" },
      ];
    }
    if (r === "student" || r === "hobbyist") {
      return [
        { label: "Main IDE", val: "VS Code", details: "Extension rich coding hub" },
        { label: "Language", val: "TypeScript & Python", details: "High level abstract tasks" },
        { label: "Framework", val: "Vite + React / PyTorch", details: "Local sandbox deployments" },
        { label: "Terminal", val: "PowerShell Core / zsh", details: "Multi-platform integration" },
        { label: "Caffeination", val: "Cold Matcha / Energy Drink", details: "Rapid adrenaline spike" },
        { label: "Vibe Theme", val: "Synthwave '84", details: "Neon scanline glow styling" },
      ];
    }
    return [
      { label: "Main IDE", val: "VS Code / Cursor", details: "Modern workspace setups" },
      { label: "Language", val: "JavaScript / Python", details: "Versatile programming" },
      { label: "Framework", val: "React / HTML5 Stack", details: "Web catalog integrations" },
      { label: "Terminal", val: "Standard Shell", details: "Local command processes" },
      { label: "Caffeination", val: "Dark Roast Coffee", details: "Traditional builder brew" },
      { label: "Vibe Theme", val: "System AMOLED Dark", details: "Dynamic theme coordination" },
    ];
  })();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-xl rounded-[32px] border shadow-2xl overflow-hidden p-0 ${t.modal} ${t.border} animate-[fadeUp_0.25s_ease-out]`}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-md bg-black/45 hover:bg-black/65 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer z-30 focus:outline-hidden"
          aria-label="Close profile"
        >
          <X size={14} />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 size={32} className="animate-spin text-cyan-400" />
            <p className={`text-sm ${t.textMuted}`}>Decoding cybernetic identities...</p>
          </div>
        ) : error || !profile ? (
          <div className="flex flex-col items-center justify-center text-center p-8 py-16 gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-lg font-bold">
              !
            </div>
            <div>
              <p className={`text-base font-bold ${t.textPrimary}`}>Identity Sync Failure</p>
              <p className={`text-xs ${t.textMuted} mt-1 max-w-[280px]`}>
                {error || "This builder profile is offline or hasn't initialized their public database index."}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${t.surface} ${t.border} ${t.textSecondary} hover:${t.textPrimary}`}
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Header: Dynamic Animated SVG Role Banner */}
            <div className={`relative h-32 w-full bg-gradient-to-br ${roleConfig.gradient} overflow-hidden flex items-center justify-center border-b ${t.border}`}>
              
              {/* Core SVG orbital animation layer */}
              {roleConfig.renderSVG()}

              {/* Ambient lighting blobs */}
              <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-white/10 blur-2xl animate-pulse" />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-black/40 blur-xl" />
              
              {/* Premium Floating Role Tag */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/10 text-[9px] font-black tracking-widest text-white/90 uppercase flex items-center gap-1.5 shadow-sm">
                <span className="text-sm">{roleConfig.icon}</span>
                <span>{roleConfig.badge}</span>
              </div>

              {/* Share Profile Trigger (Copied notice shifts color dynamically without movement) */}
              <button
                onClick={handleShare}
                className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-xl backdrop-blur-md text-[10px] font-bold tracking-wide transition-all border flex items-center gap-1.5 shadow-md cursor-pointer ${
                  copied
                    ? "bg-emerald-500/25 border-emerald-500/40 text-emerald-300"
                    : "bg-black/40 border-white/10 text-white/80 hover:text-white hover:bg-black/60"
                }`}
              >
                {copied ? <Check size={11} /> : <Share2 size={11} />}
                <span>{copied ? "Profile Link Copied!" : "Share Profile"}</span>
              </button>
            </div>

            {/* Profile Detail Body */}
            <div className="px-6 pb-6 pt-0 relative bg-[#060606]">
              
              {/* Avatar floating section with concentric spinning halo rings */}
              <div className="flex items-end justify-between -mt-10 mb-4 z-10 relative">
                <div className="relative flex items-center justify-center">
                  
                  {/* Concentric rotating border rings for high-tech aesthetic (purely decorative) */}
                  <div
                    className="absolute -inset-1.5 rounded-full border border-dashed animate-[spin_12s_linear_infinite]"
                    style={{ borderColor: `${roleConfig.orbitColor}33` }}
                  />
                  <div
                    className="absolute -inset-0.5 rounded-full border border-double animate-[spin_8s_linear_infinite_reverse]"
                    style={{ borderColor: `${roleConfig.orbitColor}55` }}
                  />

                  {/* Avatar wrapper */}
                  <div className={`w-20 h-20 rounded-full p-1 bg-[#060606] border border-white/10 ${roleConfig.glow} shadow-xl flex items-center justify-center overflow-hidden z-10`}>
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${roleConfig.gradient} text-white font-black text-xl flex items-center justify-center shadow-inner`}>
                      {initials}
                    </div>
                  </div>

                  {/* Verified check badge */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-cyan-500 border-2 border-[#060606] flex items-center justify-center text-white text-[10px] font-black shadow-md z-20">
                    ✓
                  </div>
                </div>

                {/* Cybernetic Rank XP Badge */}
                <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-extrabold ${roleConfig.accent} shadow-sm tracking-wider uppercase flex items-center gap-1`}>
                  <Zap size={10} className="fill-current animate-pulse" />
                  <span>LVL {builderLevel} BUILDER</span>
                </div>
              </div>

              {/* Title & Handles */}
              <div className="text-left mb-4">
                <h3 className={`text-2xl font-black leading-tight tracking-tight text-white`}>
                  {profile.displayName}
                </h3>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs font-bold text-cyan-400">
                    {profile.username}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <span className={`text-[10px] font-bold uppercase tracking-wider text-white/50`}>
                    {profile.role ? roleLabel(profile.role as any) : "AiVerse Builder"}
                  </span>
                </div>
              </div>

              {/* Modern Glassmorphic Tab System Selector */}
              <div className="flex border-b border-white/6 p-1 gap-1 mb-4 bg-white/1 rounded-2xl border border-white/4">
                {[
                  { id: "overview", label: "Overview", icon: "🔮" },
                  { id: "accolades", label: "Accolades", icon: "🛡️" },
                  { id: "gear", label: "Build Gear", icon: "⚡" },
                ].map((tab) => {
                  const selected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selected
                          ? "bg-white/5 text-cyan-400 border border-white/8 shadow-inner"
                          : "text-white/40 hover:text-white/80 hover:bg-white/1"
                      }`}
                    >
                      <span className="text-sm leading-none">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* ───────────────────────────────────────────────────────────── */}
              {/* TAB 1: OVERVIEW PANEL */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeTab === "overview" && (
                <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                  
                  {/* Cyber Laser Experience Bar */}
                  <div className="p-4 rounded-2xl border border-white/4 bg-white/1 shadow-inner text-left">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider mb-2">
                      <span className="text-white/40">Builder XP Progress</span>
                      <span className="text-cyan-400">{baseXP} / {maxXPForLevel} XP</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-400 relative transition-all duration-500"
                        style={{ width: `${xpPercent}%` }}
                      >
                        {/* Glow effect at the tip of the laser bar */}
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_10px_#fff,0_0_20px_#06b6d4] animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Bio capsule */}
                  {profile.description && (
                    <div className="text-left">
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-1.5">Developer Capsule</p>
                      <div className="relative p-4 rounded-2xl border border-white/5 text-xs leading-relaxed bg-[#0b0b0b]/60 text-white/85 italic shadow-inner">
                        <span className="absolute top-1 left-2 text-xl font-serif text-cyan-500/20">“</span>
                        <p className="px-3">{profile.description}</p>
                        <span className="absolute bottom-1 right-2 text-xl font-serif text-cyan-500/20">”</span>
                      </div>
                    </div>
                  )}

                  {/* Focus Areas Grid Tags */}
                  {profile.interests && profile.interests.length > 0 && (
                    <div className="text-left">
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-2">Primary Specializations</p>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.interests.map((interest) => (
                          <span
                            key={interest}
                            className="text-[9.5px] font-bold px-3 py-1.5 rounded-xl border border-white/4 bg-white/2 hover:border-cyan-500/30 hover:bg-white/4 text-white/75 transition-colors cursor-default"
                          >
                            #{interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* High level info list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-1">
                    <div className="p-3 rounded-xl border border-white/4 bg-white/1">
                      <span className="block text-[9px] uppercase tracking-wider text-white/30 font-bold">Reputation Class</span>
                      <span className="block text-xs font-black text-white mt-0.5">Tier {builderLevel} Contributor</span>
                    </div>
                    <div className="p-3 rounded-xl border border-white/4 bg-white/1">
                      <span className="block text-[9px] uppercase tracking-wider text-white/30 font-bold">Connection State</span>
                      <span className="text-[10px] font-black mt-0.5 text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" /> ONLINE
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────── */}
              {/* TAB 2: CREDENTIALS & ACCOLADES */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeTab === "accolades" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left animate-[fadeIn_0.2s_ease-out] max-h-[290px] overflow-y-auto pr-1 scrollbar-thin">
                  {accoladesList.map((accolade) => {
                    const Icon = accolade.icon;
                    return (
                      <div
                        key={accolade.id}
                        className={`p-3 rounded-2xl border transition-colors flex gap-2.5 ${
                          accolade.unlocked
                            ? `${accolade.color} bg-opacity-10`
                            : "opacity-25 bg-white/1 border-white/4 text-white/30"
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center border border-white/10 ${
                            accolade.unlocked ? "bg-black/40 text-current" : "bg-black/20 text-white/20"
                          }`}>
                            <Icon size={16} />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-black tracking-tight text-white">
                              {accolade.title}
                            </span>
                            {accolade.unlocked && (
                              <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded-sm font-extrabold uppercase border border-emerald-500/10">
                                Unlocked
                              </span>
                            )}
                          </div>
                          <p className="text-[9.5px] text-white/50 leading-normal mt-1">
                            {accolade.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────── */}
              {/* TAB 3: WORKSPACE & BUILD GEAR */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeTab === "gear" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left animate-[fadeIn_0.2s_ease-out]">
                  {gearConfig.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl border border-white/4 bg-white/1 flex items-center gap-3 transition-colors hover:border-cyan-500/20 hover:bg-white/2"
                    >
                      <div className="w-8 h-8 rounded-xl bg-cyan-950/20 text-cyan-400 flex items-center justify-center border border-cyan-500/10">
                        {idx === 0 && <Laptop size={14} />}
                        {idx === 1 && <Code2 size={14} />}
                        {idx === 2 && <Cpu size={14} />}
                        {idx === 3 && <Terminal size={14} />}
                        {idx === 4 && <Zap size={14} />}
                        {idx === 5 && <Award size={14} />}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[9px] uppercase tracking-wider text-white/30 font-extrabold">
                          {item.label}
                        </span>
                        <span className="block text-xs font-black text-white truncate mt-0.5">
                          {item.val}
                        </span>
                        <span className="block text-[8px] text-white/40 truncate">
                          {item.details}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Social Links Frosted Chips (Footer action region) */}
              {(profile.github ||
                profile.linkedin ||
                profile.medium ||
                profile.devto ||
                profile.portfolio) && (
                <div className="mt-5 border-t border-white/5 pt-4 text-left">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-2.5">
                    Verified Connection Network
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {profile.github && (
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/2 hover:bg-white/8 text-white/70 hover:text-white transition-all border border-white/5 hover:border-white/10 text-xs font-bold cursor-pointer"
                        title="GitHub"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                    {profile.linkedin && (
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/2 hover:bg-[#0a66c2]/10 text-white/70 hover:text-[#00a0dc] transition-all border border-white/5 hover:border-[#0a66c2]/20 text-xs font-bold cursor-pointer"
                        title="LinkedIn"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {profile.medium && (
                      <a
                        href={profile.medium}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/2 hover:bg-white/8 text-white/70 hover:text-white transition-all border border-white/5 hover:border-white/10 text-xs font-bold cursor-pointer"
                        title="Medium"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm3.04 0c0 3.24-.32 5.87-.71 5.87s-.72-2.63-.72-5.87.32-5.87.72-5.87.71 2.63.71 5.87z" />
                        </svg>
                        <span>Medium</span>
                      </a>
                    )}
                    {profile.devto && (
                      <a
                        href={profile.devto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/2 hover:bg-white/8 text-white/70 hover:text-white transition-all border border-white/5 hover:border-white/10 text-xs font-bold cursor-pointer"
                        title="Dev.to"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 448 512" fill="currentColor">
                          <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM304.14 0H43.86C19.63 0 0 19.63 0 43.86v424.28C0 492.37 19.63 512 43.86 512h360.28c24.23 0 43.86-19.63 43.86-43.86V43.86C448 19.63 428.37 0 304.14 0zM151.05 311.77c0 12.18-4.85 21.78-14.55 28.8-9.7 7.03-22.66 10.54-38.89 10.54H62.22V175.12h35.39c16.23 0 29.19 3.51 38.89 10.54 9.7 7.03 14.55 16.62 14.55 28.8v97.31zm102.3-120.87h-64.44v45.48h51.38v28.29h-51.38v46.12h64.44v28.31H158.46V162.5h94.89v28.4zm102.3 124.36c0 18.28-5.97 32.5-17.9 42.66-11.93 10.16-28.31 15.24-49.13 15.24-20.82 0-37.2-5.08-49.13-15.24-11.93-10.16-17.9-24.38-17.9-42.66v-96.1h32.93v95.82c0 9.57 2.74 16.8 8.22 21.68 5.48 4.88 13.78 7.32 24.89 7.32s19.41-2.44 24.89-7.32c5.48-4.88 8.22-12.11 8.22-21.68v-95.82h32.93v96.1z" />
                        </svg>
                        <span>Dev.to</span>
                      </a>
                    )}
                    {profile.portfolio && (
                      <a
                        href={profile.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/10 text-white/70 hover:text-cyan-400 transition-all border border-cyan-500/10 hover:border-cyan-500/20 text-xs font-bold cursor-pointer"
                        title="Portfolio"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <span>Portfolio</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
