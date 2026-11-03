import React from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../lib/theme";

interface DashboardHeroProps {
  totalEntries: number;
  onScrollToCatalog: () => void;
  showNav?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeType?: string;
  onSelectType?: (type: string) => void;
  catalogDisplayMode?: "assets" | "ecosystems";
  onSelectDisplayMode?: (mode: "assets" | "ecosystems") => void;
}

const LINE_1 = "Discover the Frontier".split(" ");
const LINE_2 = "and Map the AI Universe.".split(" ");

// Text wordmarks standing in for logos; each gets its own typographic voice
const ECOSYSTEMS = [
  "DeepSeek|font-semibold tracking-tight",
  "Gemini|font-medium italic",
  "Llama|font-bold lowercase",
  "Qwen|font-semibold uppercase tracking-[0.18em] text-base",
  "Claude|font-serif",
  "Mistral|font-medium tracking-[-0.04em]",
  "GPT|font-extrabold tracking-widest",
  "Gemma|font-serif italic",
  "Grok|font-mono font-semibold",
  "Phi|font-light text-2xl",
  "Kimi|font-bold tracking-tight",
  "GLM|font-mono tracking-[0.2em]",
].map((s) => {
  const [name, cls] = s.split("|");
  return { name, cls };
});

const EDGE = "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)";

const CSS = `
.dh-nav{animation:dh-drop .9s cubic-bezier(.2,.7,.2,1) .1s both}
.dh-fade{animation:dh-fade 1s ease-out both}
.dh-word{display:inline-block;animation:dh-word .95s cubic-bezier(.2,.7,.2,1) both}
.dh-marquee{animation:dh-marquee 50s linear infinite}
.dh-marquee:hover{animation-play-state:paused}
.dh-btn::after{content:"";position:absolute;inset:auto 14% -2px;height:3px;border-radius:9px;background:linear-gradient(90deg,#8b5cf6,#3b82f6,#10b981,#facc15,#f43f5e,#8b5cf6);background-size:200% 100%;filter:blur(2.5px);animation:dh-slide 5s linear infinite;transition:inset .3s,filter .3s}
.dh-btn:hover::after{inset:auto 6% -3px;filter:blur(5px)}
@keyframes dh-drop{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:none}}
@keyframes dh-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes dh-word{from{opacity:0;transform:translateY(.55em);filter:blur(10px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes dh-marquee{to{transform:translateX(-50%)}}
@keyframes dh-slide{to{background-position:200% 0}}
@media (prefers-reduced-motion:reduce){.dh-hero *,.dh-hero *::after{animation:none!important}}
`;

const words = (list: string[], offset: number) =>
  list.map((w, i) => (
    <React.Fragment key={w + i}>
      <span className="dh-word" style={{ animationDelay: `${0.3 + (offset + i) * 0.07}s` }}>{w}</span>{" "}
    </React.Fragment>
  ));

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

    // Individual element bounding zones (NO monolithic box!)
    let boxes: { cx: number; cy: number; hw: number; hh: number }[] = [];

    const measureBoxes = () => {
      cvRect = cv.getBoundingClientRect();
      if (!host || cvRect.width === 0) return;

      const els: Element[] = [];
      const h1 = host.querySelector("h1");
      if (h1) els.push(h1);
      const ps = host.querySelectorAll("p");
      ps.forEach((p) => els.push(p));
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
      w = Math.max(cv.clientWidth || 0, Math.round(cvRect.width) || 0);
      h = Math.max(cv.clientHeight || 0, Math.round(cvRect.height) || 0);
      if (w === 0 || h === 0) return;
      cv.width = w * d;
      cv.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      measureBoxes();
    };

    const draw = (ms: number) => {
      if (w === 0 || h === 0) {
        fit();
        if (w === 0 || h === 0) return;
      }

      const isDark = darkRef.current;
      const t = ms / 1000;
      // Staggered lattice step: 18px on mobile (efficient 60fps GPU rasterization), 13.5px on desktop
      const s = w < 640 ? 18 : 13.5;
      ctx.clearRect(0, 0, w, h);

      // Editorial ink vs dark mode celestial stardust
      ctx.fillStyle = isDark ? "#f0f0f0" : "#1a1a1a";
      ctx.beginPath();

      const numBoxes = boxes.length;

      // Slow breathing cycle that gently breathes life into the universe field
      const breath = Math.sin(t * 0.18) * 0.12;

      for (let y = s / 2, j = 0; y < h; y += s, j++) {
        const v = y / h - 0.5;
        // Soft outer vertical screen border fade
        const edgeFadeY = Math.min(1, (0.5 - Math.abs(v)) * 4.5);
        if (edgeFadeY <= 0) continue;

        const xOffset = (j % 2) * (s / 2);

        for (let x = s / 2 + xOffset; x < w; x += s) {
          const u = x / w - 0.5;
          const edgeFadeX = Math.min(1, (0.5 - Math.abs(u)) * 5);
          const edgeFade = edgeFadeX * edgeFadeY;
          if (edgeFade < 0.02) continue;

          // Distance to the nearest individual element (NO single giant box cutout!)
          let minD = 999;
          for (let b = 0; b < numBoxes; b++) {
            const box = boxes[b];
            const qx = Math.max(0, Math.abs(x - box.cx) - box.hw);
            const qy = Math.max(0, Math.abs(y - box.cy) - box.hh);
            const d = Math.hypot(qx, qy);
            if (d < minD) minD = d;
          }

          // Gentle text modulation:
          // Over text: animation is softened by ~72% (dots remain calm, tiny pinpoints ~0.55-0.75px)
          // Open background: animation forms full artistic crests (~2.4px)
          const textT = Math.min(1, minD / 48);
          const textMod = 0.28 + 0.72 * (textT * textT * (3 - 2 * textT));

          // Artistic multi-layer wave harmonics:
          // 1. Soliton transverse current with bilateral symmetry
          const uSym = Math.abs(u);
          const w1 = Math.sin(uSym * 7.2 - t * 0.24 + v * 3.0);
          
          // 2. Counter-flowing diagonal ribbon
          const w2 = Math.sin((u * 4.8 - v * 5.2) * 1.1 + t * 0.18);
          
          // 3. Galactic spiral curvature centered in space
          const distCenter = Math.hypot(u * 1.8, v * 1.4);
          const angle = Math.atan2(v, u);
          const w3 = Math.cos(distCenter * 6.2 - angle * 1.5 - t * 0.20 + breath);

          // Blended harmonic wave (normalized 0 to 1)
          const rawWave = w1 * 0.44 + w2 * 0.36 + w3 * 0.20;
          const waveNorm = rawWave * 0.5 + 0.5;

          // Artistic non-linear contrast curve: gives crests poetic, ribbon-like calligraphy
          const artisticCrest = Math.pow(waveNorm, 1.85);

          // Base dot radius across the continuous field
          let r = (0.45 + artisticCrest * 1.95 * textMod) * edgeFade;

          // Interactive magnetic lens & elastic drop ripple
          if (mx > -9000) {
            const dist = Math.hypot(x - mx, y - my);
            if (dist < 170) {
              const near = 1 - dist / 170;
              // Harmonic ripple ring combined with gravitational center swell
              const ripple = Math.sin(near * Math.PI);
              const swell = (near * near + ripple * 0.45 * (1 + speed * 0.4));
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

const useCountUp = (to: number) => {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf = 0;
    const t0 = performance.now() + 1200; // starts as the line fades in
    const tick = (n: number) => {
      const p = Math.min(1, Math.max(0, (n - t0) / 1400));
      setV(Math.round(to * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return v;
};

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  totalEntries,
  onScrollToCatalog,
}) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";
  const isDark = isAmoled;
  const total = totalEntries > 0 ? totalEntries : 477;
  const shown = useCountUp(total);

  return (
    <section
      className={`dh-hero relative flex min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] w-full flex-col overflow-hidden border-b text-neutral-950 transition-colors dark:text-white ${
        isAmoled ? "border-white/10 bg-black" : "border-neutral-200 bg-white dark:border-white/[0.08] dark:bg-[#0f1115]"
      }`}
    >
      <style>{CSS}</style>
      <Halftone dark={isDark} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14 text-center">
        <h1 className="max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.12] sm:leading-[1.05] tracking-[-0.035em]">
          <span className="block text-neutral-500">{words(LINE_1, 0)}</span>
          <span className="block">{words(LINE_2, LINE_1.length)}</span>
        </h1>

        <p className="dh-fade mt-6 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base dark:text-neutral-400" style={{ animationDelay: "1s" }}>
          The citation-backed open compendium. Verified architectures, benchmark telemetry, and ecosystem provenance.
        </p>

        <button
          type="button"
          onClick={onScrollToCatalog}
          className="dh-btn dh-fade group relative mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:bg-white dark:text-neutral-950"
          style={{ animationDelay: "1.15s" }}
        >
          Explore the catalog
          <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
        </button>

        <p className="dh-fade mt-6 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400" style={{ animationDelay: "1.2s" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>
            <span className="font-medium tabular-nums text-neutral-900 dark:text-white">{shown}</span> verified AI assets
          </span>
        </p>
      </div>

      {/* Ecosystem marquee; bottom padding keeps it clear of floating controls */}
      <div className="dh-fade relative z-10 pb-20 pt-4 sm:pb-16" style={{ animationDelay: "1.4s" }} role="region" aria-label="Model ecosystems">
        <div className="overflow-hidden" style={{ WebkitMaskImage: EDGE, maskImage: EDGE }}>
          <div className="dh-marquee flex w-max items-center">
            {[...ECOSYSTEMS, ...ECOSYSTEMS].map((e, i) => (
              <span
                key={i}
                aria-hidden={i >= ECOSYSTEMS.length}
                className={`mx-7 whitespace-nowrap text-xl text-neutral-900/80 sm:mx-10 dark:text-white/80 ${e.cls}`}
              >
                {e.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
