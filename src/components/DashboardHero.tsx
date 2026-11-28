import React, { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Command,
  Compass,
  Search,
  Sparkles,
  Swords,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { searchCatalogQuickMatches } from "../lib/dashboard";
import { TYPE_GLYPH, useTheme } from "../lib/theme";
import type { Entry } from "../types";

interface DashboardHeroProps {
  totalEntries: number;
  ecosystemsCount?: number;
  entries?: Entry[];
  onScrollToCatalog: () => void;
  onSelectEntry?: (entry: Entry) => void;
  onSelectEcosystem?: (orgName: string) => void;
  onOpenCommandPalette?: () => void;
  onNavigateDirectory?: (query?: string) => void;
  onNavigateLeaderboard?: () => void;
  onNavigateFeatures?: (subpage: "compare" | "wizard" | "playground") => void;
  onNavigateChat?: () => void;
}

// Text wordmarks standing in for logos; each gets its own typographic voice and maps to a catalog lab
const ECOSYSTEMS = [
  { name: "DeepSeek", org: "DeepSeek AI", cls: "font-semibold tracking-tight" },
  { name: "Gemini", org: "Google DeepMind", cls: "font-medium italic" },
  { name: "Llama", org: "Meta AI", cls: "font-bold lowercase" },
  { name: "Qwen", org: "Alibaba (Qwen)", cls: "font-semibold uppercase tracking-[0.18em] text-base" },
  { name: "Claude", org: "Anthropic", cls: "font-serif" },
  { name: "Mistral", org: "Mistral AI", cls: "font-medium tracking-[-0.04em]" },
  { name: "GPT", org: "OpenAI", cls: "font-extrabold tracking-widest" },
  { name: "Gemma", org: "Google DeepMind", cls: "font-serif italic" },
  { name: "Grok", org: "xAI", cls: "font-mono font-semibold" },
  { name: "Phi", org: "Microsoft", cls: "font-light text-2xl" },
  { name: "Kimi", org: "Moonshot AI", cls: "font-bold tracking-tight" },
  { name: "GLM", org: "Zhipu AI (THUDM)", cls: "font-mono tracking-[0.2em]" },
];

const EDGE = "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)";

const CSS = `
.dh-fade{animation:dh-fade .4s ease-out both}
.dh-marquee{animation:dh-marquee 50s linear infinite}
.dh-marquee:hover{animation-play-state:paused}
.dh-btn::after{content:"";position:absolute;inset:auto 14% -2px;height:3px;border-radius:9px;background:linear-gradient(90deg,#8b5cf6,#3b82f6,#10b981,#facc15,#f43f5e,#8b5cf6);background-size:200% 100%;filter:blur(2.5px);animation:dh-slide 5s linear infinite;transition:inset .3s,filter .3s}
.dh-btn:hover::after{inset:auto 6% -3px;filter:blur(5px)}
@keyframes dh-fade{from{opacity:0.6;transform:translateY(4px)}to{opacity:1;transform:none}}
@keyframes dh-marquee{to{transform:translateX(-50%)}}
@keyframes dh-slide{to{background-position:200% 0}}
@media (prefers-reduced-motion:reduce){.dh-hero *,.dh-hero *::after{animation:none!important}}
`;

/* Artistic Halftone Field: cosmic soliton waves, galactic spiral curvature, and magnetic lens ripples */
const Halftone: React.FC<{ dark: boolean }> = ({ dark }) => {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const darkRef = React.useRef(dark);
  const drawStaticRef = React.useRef<() => void>(() => {});

  React.useEffect(() => {
    darkRef.current = dark;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      drawStaticRef.current();
    }
  }, [dark]);

  React.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const host = cv.closest("section") ?? cv;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    let mx = -9999, my = -9999, lastMx = -9999, lastMy = -9999, speed = 0;
    let cvRect = cv.getBoundingClientRect();

    let boxes: { cx: number; cy: number; hw: number; hh: number }[] = [];

    const measureBoxes = () => {
      cvRect = cv.getBoundingClientRect();
      if (!host || cvRect.width === 0) return;

      const els: Element[] = [];
      const h1 = host.querySelector("h1");
      if (h1) els.push(h1);
      host.querySelectorAll("p").forEach((p) => els.push(p));
      host.querySelectorAll(".dh-cutout").forEach((z) => els.push(z));
      const btn = host.querySelector("button.dh-btn");
      if (btn) els.push(btn);

      boxes = els
        .map((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return null;
          return {
            cx: r.left + r.width / 2 - cvRect.left,
            cy: r.top + r.height / 2 - cvRect.top,
            hw: r.width / 2 + 12,
            hh: r.height / 2 + 8,
          };
        })
        .filter((b): b is { cx: number; cy: number; hw: number; hh: number } => b !== null);
    };

    const fit = () => {
      cvRect = cv.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      const newW = Math.max(cv.clientWidth || 0, Math.round(cvRect.width) || 0);
      const newH = Math.max(cv.clientHeight || 0, Math.round(cvRect.height) || 0);
      if (newW === 0 || newH === 0) return;
      measureBoxes();
      w = newW;
      h = newH;
      cv.width = w * d;
      cv.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    const draw = (ms: number) => {
      if (w === 0 || h === 0) {
        fit();
        if (w === 0 || h === 0) return;
      }

      const isDark = darkRef.current;
      const t = ms / 1000;
      const s = w < 640 ? 18 : 13.5;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = isDark ? "#f0f0f0" : "#1a1a1a";
      ctx.beginPath();

      const numBoxes = boxes.length;
      const breath = Math.sin(t * 0.18) * 0.12;

      for (let y = s / 2, j = 0; y < h; y += s, j++) {
        const v = y / h - 0.5;
        const edgeFadeY = Math.min(1, (0.5 - Math.abs(v)) * 4.5);
        if (edgeFadeY <= 0) continue;

        const xOffset = (j % 2) * (s / 2);

        for (let x = s / 2 + xOffset; x < w; x += s) {
          const u = x / w - 0.5;
          const edgeFadeX = Math.min(1, (0.5 - Math.abs(u)) * 5);
          const edgeFade = edgeFadeX * edgeFadeY;
          if (edgeFade < 0.02) continue;

          let minD = 999;
          for (let b = 0; b < numBoxes; b++) {
            const box = boxes[b];
            const qx = Math.max(0, Math.abs(x - box.cx) - box.hw);
            const qy = Math.max(0, Math.abs(y - box.cy) - box.hh);
            const d = Math.hypot(qx, qy);
            if (d < minD) minD = d;
          }

          const textT = Math.min(1, minD / 48);
          const textMod = 0.26 + 0.74 * (textT * textT * (3 - 2 * textT));

          const uSym = Math.abs(u);
          const w1 = Math.sin(uSym * 7.2 - t * 0.24 + v * 3.0);
          const w2 = Math.sin((u * 4.8 - v * 5.2) * 1.1 + t * 0.18);
          const distCenter = Math.hypot(u * 1.8, v * 1.4);
          const angle = Math.atan2(v, u);
          const w3 = Math.cos(distCenter * 6.2 - angle * 1.5 - t * 0.20 + breath);

          const rawWave = w1 * 0.44 + w2 * 0.36 + w3 * 0.20;
          const waveNorm = rawWave * 0.5 + 0.5;
          const artisticCrest = Math.pow(waveNorm, 1.85);

          let r = (0.45 + artisticCrest * 1.95 * textMod) * edgeFade;

          if (mx > -9000) {
            const dist = Math.hypot(x - mx, y - my);
            if (dist < 170) {
              const near = 1 - dist / 170;
              const ripple = Math.sin(near * Math.PI);
              const swell = near * near + ripple * 0.45 * (1 + speed * 0.4);
              r = Math.min(s * 0.45, r + swell * 1.55 * textMod);
            }
          }

          if (r > 0.35) {
            ctx.moveTo(x + r, y);
            ctx.arc(x, y, r, 0, 6.2832);
          }
        }
      }
      ctx.fill();
    };

    drawStaticRef.current = () => draw(2000);

    const loop = (ms: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      draw(ms);
      raf = requestAnimationFrame(loop);
    };

    const move = (e: MouseEvent | PointerEvent) => {
      cvRect = cv.getBoundingClientRect();
      const newMx = e.clientX - cvRect.left;
      const newMy = e.clientY - cvRect.top;
      if (lastMx > -9000) {
        const vx = newMx - lastMx;
        const vy = newMy - lastMy;
        speed = Math.min(1.5, Math.hypot(vx, vy) / 20);
      }
      lastMx = newMx;
      lastMy = newMy;
      mx = newMx;
      my = newMy;
    };

    const leave = () => {
      mx = -9999;
      my = -9999;
      lastMx = -9999;
      lastMy = -9999;
      speed = 0;
    };

    const onScrollOrResize = () => {
      fit();
      measureBoxes();
    };

    fit();
    const settleTimer = window.setTimeout(measureBoxes, 150);

    if (still) draw(2000);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      fit();
      if (still) draw(2000);
    });
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !still) {
        raf = requestAnimationFrame(loop);
      }
    });
    ro.observe(cv);
    io.observe(cv);

    host.addEventListener("pointermove", move as EventListener, { passive: true });
    host.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.clearTimeout(settleTimer);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", move as EventListener);
      host.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-full w-full"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 8%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 8%, black 85%, transparent 100%)",
      }}
    >
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
};

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  totalEntries,
  ecosystemsCount = 200,
  entries = [],
  onScrollToCatalog,
  onSelectEntry,
  onSelectEcosystem,
  onOpenCommandPalette,
  onNavigateDirectory,
  onNavigateLeaderboard,
  onNavigateFeatures,
  onNavigateChat,
}) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";
  const shown = totalEntries > 0 ? totalEntries : 766;

  const [heroQuery, setHeroQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const quickMatches = useMemo(() => {
    if (!heroQuery.trim() || entries.length === 0) return [];
    return searchCatalogQuickMatches(entries, heroQuery, 6);
  }, [entries, heroQuery]);

  const handleSelectResult = (entry: Entry) => {
    setDropdownOpen(false);
    setHeroQuery("");
    setActiveIndex(-1);
    onSelectEntry?.(entry);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && quickMatches.length > 0) {
      e.preventDefault();
      setActiveIndex((prev) => (prev < quickMatches.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp" && quickMatches.length > 0) {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : quickMatches.length - 1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < quickMatches.length) {
        e.preventDefault();
        handleSelectResult(quickMatches[activeIndex]);
      } else if (heroQuery.trim() && onNavigateDirectory) {
        e.preventDefault();
        setDropdownOpen(false);
        onNavigateDirectory(heroQuery.trim());
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
      setActiveIndex(-1);
      searchInputRef.current?.blur();
    }
  };

  return (
    <section
      className={`dh-hero relative flex min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] w-full flex-col overflow-hidden border-b text-neutral-950 transition-colors dark:text-white ${
        isAmoled
          ? "border-white/[0.08] bg-[#050507]"
          : "border-neutral-200/80 bg-white dark:border-white/[0.08] dark:bg-[#050507]"
      }`}
    >
      <style>{CSS}</style>
      <Halftone dark={isAmoled} />

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 text-center">
        {/* Live Telemetry Pill */}
        <button
          type="button"
          onClick={onScrollToCatalog}
          className={`dh-cutout dh-fade mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-tight transition-all cursor-pointer ${
            isAmoled
              ? "border-white/10 bg-[#0c0d11]/90 text-neutral-200 hover:border-indigo-400/40"
              : "border-neutral-200/90 bg-white/90 text-neutral-700 hover:border-indigo-300 shadow-2xs"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span>
            Live Index · <span className="tabular-nums font-bold">{shown}</span> Assets ·{" "}
            <span className="tabular-nums font-bold">{ecosystemsCount}</span> Labs
          </span>
          <ArrowRight size={12} className="text-indigo-500" />
        </button>

        <h1 className="max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.12] sm:leading-[1.05] tracking-[-0.035em]">
          <span className="block text-neutral-600 dark:text-neutral-300">Discover the Frontier</span>
          <span className="block">and Map the AI Universe.</span>
        </h1>

        <p
          className="dh-fade mt-4 sm:mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-300"
          style={{ animationDelay: "0.15s" }}
        >
          The citation-backed AI intelligence hub. Verified architectures, frontier benchmarks, and live ecosystem telemetry.
        </p>

        {/* Hero Instant Command Search */}
        <div
          className="dh-cutout relative z-40 mt-6 sm:mt-7 w-full max-w-xl"
        >
          <div
            className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 backdrop-blur-xl transition-all ${
              isAmoled
                ? "border-white/12 bg-[#0c0d11]/90 focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                : "border-neutral-200 bg-white/95 focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/15 shadow-[0_12px_36px_rgba(15,23,42,0.08)]"
            }`}
          >
            <Search size={16} className="text-neutral-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={heroQuery}
              onChange={(e) => {
                setHeroQuery(e.target.value);
                setActiveIndex(-1);
                setDropdownOpen(true);
              }}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => window.setTimeout(() => setDropdownOpen(false), 180)}
              onKeyDown={handleKeyDown}
              placeholder={`Search ${shown}+ AI models, labs, datasets…`}
              aria-label="Search AI catalog from dashboard hero"
              className="flex-1 min-w-0 bg-transparent text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
            />
            {heroQuery && (
              <button
                type="button"
                onClick={() => {
                  setHeroQuery("");
                  setActiveIndex(-1);
                  searchInputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                title="Open Global Command Palette (⌘K)"
                className={`hidden sm:inline-flex items-center gap-1 rounded-xl border px-2 py-1 text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                  isAmoled
                    ? "border-white/10 bg-white/[0.05] text-neutral-300 hover:bg-white/[0.1]"
                    : "border-neutral-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80"
                }`}
              >
                <Command size={11} />
                <span>K</span>
              </button>
            )}
          </div>

          {/* Live Search Dropdown */}
          {dropdownOpen && heroQuery.trim().length > 0 && (
            <div
              className={`absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border text-left shadow-2xl backdrop-blur-2xl ${
                isAmoled
                  ? "border-white/12 bg-[#0d0e13]/95"
                  : "border-neutral-200 bg-white/98"
              }`}
            >
              {quickMatches.length === 0 ? (
                <div className="px-4 py-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
                  No direct matches for &ldquo;{heroQuery}&rdquo;.{" "}
                  {onNavigateDirectory && (
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onNavigateDirectory(heroQuery.trim());
                      }}
                      className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Search full directory →
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {quickMatches.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectResult(item);
                        }}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors border-b last:border-0 cursor-pointer ${
                          isAmoled ? "border-white/[0.06]" : "border-neutral-100"
                        } ${
                          isActive
                            ? isAmoled
                              ? "bg-indigo-500/15"
                              : "bg-indigo-50/90"
                            : isAmoled
                            ? "hover:bg-white/[0.04]"
                            : "hover:bg-neutral-50"
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border shrink-0 ${
                            isAmoled
                              ? "bg-white/[0.05] border-white/10 text-indigo-300"
                              : "bg-indigo-50 border-indigo-200/70 text-indigo-600"
                          }`}
                        >
                          {TYPE_GLYPH[item.type] ?? "◆"}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white truncate">
                              {item.name}
                            </span>
                            {item.popular && (
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-300">
                                Flagship
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                            {item.org} · {item.task} · {item.license}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${
                            isAmoled
                              ? "border-white/10 bg-white/[0.04] text-neutral-300"
                              : "border-neutral-200 bg-neutral-100 text-neutral-700"
                          }`}
                        >
                          {item.type}
                        </span>
                      </button>
                    );
                  })}
                  {onNavigateDirectory && (
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        onNavigateDirectory(heroQuery.trim());
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                        isAmoled
                          ? "bg-[#12131a] text-indigo-300 hover:bg-indigo-500/15"
                          : "bg-neutral-50 text-indigo-600 hover:bg-indigo-50"
                      }`}
                    >
                      <span>Search &ldquo;{heroQuery.trim()}&rdquo; across full directory</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Primary CTA + Quick Action Launchers */}
        <div
          className="dh-cutout dh-fade relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2.5"
          style={{ animationDelay: "0.3s" }}
        >
          <button
            type="button"
            onClick={onScrollToCatalog}
            className="dh-btn group relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:bg-white dark:text-neutral-950"
          >
            Explore Intelligence Hub
            <ChevronDown size={15} className="transition-transform group-hover:translate-y-0.5" />
          </button>

          {onNavigateLeaderboard && (
            <button
              type="button"
              onClick={onNavigateLeaderboard}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                isAmoled
                  ? "border-white/12 bg-[#0c0d11]/80 text-neutral-200 hover:border-amber-400/40 hover:text-white"
                  : "border-neutral-200 bg-white/90 text-neutral-700 hover:border-neutral-300 hover:text-neutral-950 shadow-2xs"
              }`}
            >
              <Trophy size={13} className="text-amber-500" />
              <span>Leaderboard</span>
            </button>
          )}

          {onNavigateFeatures && (
            <>
              <button
                type="button"
                onClick={() => onNavigateFeatures("compare")}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                  isAmoled
                    ? "border-white/12 bg-[#0c0d11]/80 text-neutral-200 hover:border-purple-400/40 hover:text-white"
                    : "border-neutral-200 bg-white/90 text-neutral-700 hover:border-neutral-300 hover:text-neutral-950 shadow-2xs"
                }`}
              >
                <Swords size={13} className="text-purple-500" />
                <span>Compare Arena</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateFeatures("wizard")}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                  isAmoled
                    ? "border-white/12 bg-[#0c0d11]/80 text-neutral-200 hover:border-indigo-400/40 hover:text-white"
                    : "border-neutral-200 bg-white/90 text-neutral-700 hover:border-neutral-300 hover:text-neutral-950 shadow-2xs"
                }`}
              >
                <Compass size={13} className="text-indigo-500" />
                <span>Discovery Wizard</span>
              </button>
            </>
          )}

          {onNavigateChat && (
            <button
              type="button"
              onClick={onNavigateChat}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                isAmoled
                  ? "border-white/12 bg-[#0c0d11]/80 text-neutral-200 hover:border-emerald-400/40 hover:text-white"
                  : "border-neutral-200 bg-white/90 text-neutral-700 hover:border-neutral-300 hover:text-neutral-950 shadow-2xs"
              }`}
            >
              <Zap size={13} className="text-emerald-500" />
              <span>Ask Vox</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Ecosystem marquee; bottom padding keeps it clear of floating controls */}
      <div
        className="dh-fade relative z-10 pb-20 pt-4 sm:pb-16"
        style={{ animationDelay: "0.45s" }}
        role="region"
        aria-label="Model ecosystems"
      >
        <div className="mb-2 text-center">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <Sparkles size={10} className="text-indigo-500" />
            Click any lab to explore its ecosystem
          </span>
        </div>
        <div className="overflow-hidden" style={{ WebkitMaskImage: EDGE, maskImage: EDGE }}>
          <div className="dh-marquee flex w-max items-center">
            {[...ECOSYSTEMS, ...ECOSYSTEMS].map((e, i) => (
              <button
                key={`${e.name}-${i}`}
                type="button"
                tabIndex={i >= ECOSYSTEMS.length ? -1 : 0}
                aria-hidden={i >= ECOSYSTEMS.length}
                onClick={() => onSelectEcosystem?.(e.org)}
                className={`mx-6 whitespace-nowrap text-xl text-neutral-900/75 hover:text-indigo-600 dark:text-white/75 dark:hover:text-indigo-400 transition-colors cursor-pointer sm:mx-9 ${e.cls}`}
              >
                {e.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
