import React from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../lib/theme";

interface DashboardHeroProps {
  totalEntries: number;
  onScrollToCatalog: () => void;
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
.dh-fade{animation:dh-fade 1s ease-out both}
.dh-word{display:inline-block;animation:dh-word .95s cubic-bezier(.2,.7,.2,1) both}
.dh-marquee{animation:dh-marquee 50s linear infinite}
.dh-marquee:hover{animation-play-state:paused}
.dh-btn::after{content:"";position:absolute;inset:auto 14% -2px;height:3px;border-radius:9px;background:linear-gradient(90deg,#8b5cf6,#3b82f6,#10b981,#facc15,#f43f5e,#8b5cf6);background-size:200% 100%;filter:blur(2.5px);animation:dh-slide 5s linear infinite;transition:inset .3s,filter .3s}
.dh-btn:hover::after{inset:auto 6% -3px;filter:blur(5px)}
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

/* Halftone dot field: all-time running continuous wave animation with magnetic mouse ripple */
const Halftone: React.FC<{ dark: boolean }> = ({ dark }) => {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const darkRef = React.useRef(dark);
  const drawStaticRef = React.useRef<() => void>(() => {});

  // Keep darkRef synced without unmounting or tearing down the continuous animation loop
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
    let w = 0, h = 0, raf = 0, visible = true, mx = -9999, my = -9999;
    let cvRect = cv.getBoundingClientRect();

    const fit = () => {
      cvRect = cv.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(cv.clientWidth || 0, Math.round(cvRect.width) || 0);
      h = Math.max(cv.clientHeight || 0, Math.round(cvRect.height) || 0);
      if (w === 0 || h === 0) return;
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
      // Grid spacing: 11px on mobile, 13px on desktop
      const s = w < 640 ? 11 : 13;
      ctx.clearRect(0, 0, w, h);

      // Vector-sharp crisp fills in single batch
      ctx.fillStyle = isDark ? "#f5f5f5" : "#171717";
      ctx.beginPath();

      for (let y = s / 2, j = 0; y < h; y += s, j++) {
        for (let x = s / 2 + (j % 2) * (s / 2); x < w; x += s) {
          const u = x / w - 0.5;
          const v = y / h - 0.5;

          // Balanced, engaging wave speed (moderately faster than slow baseline)
          const n =
            (Math.sin(x * 0.010 + t * 0.40) +
              Math.sin(y * 0.014 - t * 0.28) +
              Math.sin((x + y) * 0.008 + t * 0.22) +
              Math.sin(Math.hypot(u * 1.5, v * 2.0) * 8 - t * 0.48)) /
            4;

          // Normalized wave (0 to 1)
          const wave = n * 0.5 + 0.5;

          // Center damping & soft edge mask to frame the headline typography
          const m =
            (1 - 0.45 * Math.exp(-(u * u * 10 + v * v * 16))) *
            Math.min(1, (0.5 - Math.abs(u)) * 4) *
            Math.min(1, (0.5 - Math.abs(v)) * 5);

          // Prominent responsive mouse swell (160px interaction field)
          const dist = Math.hypot(x - mx, y - my);
          const near = Math.max(0, 1 - dist / 160);
          const swell = near * near * (3 - 2 * near); // smoothstep curve

          // Tangible dot sizing in default auto animation (~0.95px - 2.2px) + cursor swell (~3.8px)
          const ambientR = Math.max(0.75, (0.95 + wave * 1.25) * m);
          const r = Math.min(s * 0.42, ambientR + swell * 1.65);

          if (r > 0.45) {
            ctx.moveTo(x + r, y);
            ctx.arc(x, y, r, 0, 6.2832);
          }
        }
      }
      ctx.fill();
    };

    drawStaticRef.current = () => draw(2000);

    // All-time running loop: continuously animates and reacts to mouse/theme
    const loop = (ms: number) => {
      if (visible) draw(ms);
      raf = requestAnimationFrame(loop);
    };

    const move = (e: MouseEvent | PointerEvent) => {
      cvRect = cv.getBoundingClientRect();
      mx = e.clientX - cvRect.left;
      my = e.clientY - cvRect.top;
    };

    const leave = () => {
      mx = -9999;
      my = -9999;
    };

    const onScrollOrResize = () => {
      fit();
    };

    fit();
    if (still) draw(2000);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      fit();
      if (still) draw(2000);
    });
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    ro.observe(cv);
    io.observe(cv);

    host.addEventListener("pointermove", move as EventListener, { passive: true });
    host.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", move as EventListener);
      host.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []); // Run once on mount: all-time running loop, theme changes seamlessly via darkRef

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[10%] h-[72%] opacity-85"
      style={{
        maskImage: "radial-gradient(ellipse 80% 65% at 50% 50%, black 45%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 50%, black 45%, transparent 100%)",
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
      className={`dh-hero relative flex min-h-[calc(100vh-4rem)] w-full flex-col overflow-hidden border-b text-neutral-950 transition-colors dark:text-white ${
        isAmoled ? "border-white/10 bg-black" : "border-neutral-200 bg-white dark:border-white/[0.08] dark:bg-[#0f1115]"
      }`}
    >
      <style>{CSS}</style>
      <Halftone dark={isDark} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-12 text-center">
        <h1 className="max-w-4xl text-[2.5rem] font-medium leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
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