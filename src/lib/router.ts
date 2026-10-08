import { useState, useEffect, useCallback } from "react";
import {
  decodeEntrySlug,
  parseProfileFromPathname,
  profilePathSlug,
} from "./entryUrl";

export type FeatureSubpage =
  | "overview"
  | "compare"
  | "wizard"
  | "playground"
  | "pulse"
  | "ecosystems";

export type AdminSection =
  | "users"
  | "deletion_requests"
  | "submissions"
  | "directory"
  | "infrastructure"
  | "analytics"
  | "announcements"
  | "audit";

export type AppRoute =
  | { type: "dashboard" }
  | {
      type: "entries";
      tab: "assets" | "ecosystems" | "saved";
    }
  | {
      type: "admin";
      section?: AdminSection;
    }
  | {
      type: "features";
      subpage: FeatureSubpage;
    }
  | { type: "chat" }
  | { type: "profile"; username: string }
  | { type: "privacy" }
  | { type: "terms" };

/**
 * Normalizes pathname by stripping trailing slashes and lowercase.
 */
function cleanPath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

/**
 * Parse a URL pathname and search query into a structured AppRoute.
 * Separates /dashboard (main landing & pulse dashboard) and /entries (full catalog directory).
 */
export function parseRoute(pathname: string, search: string = ""): AppRoute {
  const p = cleanPath(pathname);
  const params = new URLSearchParams(search);

  // 1. Dashboard (Main Landing Dashboard: Hero, Pulse, Spotlight)
  if (p === "/" || p === "/dashboard" || p === "/home") {
    return { type: "dashboard" };
  }

  // 2. Entries (Full Catalog & Resource Directory)
  if (p === "/entries" || p === "/catalog") {
    const tabParam = params.get("tab") || params.get("view");
    const isSaved = params.get("saved") === "true" || tabParam === "saved";
    const isEcosystems = tabParam === "ecosystems";

    if (isSaved) {
      return { type: "entries", tab: "saved" };
    }
    if (isEcosystems) {
      return { type: "entries", tab: "ecosystems" };
    }
    return { type: "entries", tab: "assets" };
  }

  // Entries Subroutes (/entries/ecosystems, /entries/saved)
  if (p === "/entries/ecosystems") {
    return { type: "entries", tab: "ecosystems" };
  }
  if (p === "/entries/saved") {
    return { type: "entries", tab: "saved" };
  }

  // 3. Admin Console
  if (p === "/admin" || p.startsWith("/admin/")) {
    let section: AdminSection | undefined = undefined;
    const parts = p.split("/").filter(Boolean);
    if (parts.length > 1) {
      section = parts[1] as AdminSection;
    } else {
      const qSection = params.get("section");
      if (qSection) section = qSection as AdminSection;
    }
    return { type: "admin", section };
  }

  // 4. Features Suite & Subpages (/features, /features/compare, /features/wizard, etc.)
  if (p === "/features" || p.startsWith("/features/")) {
    const sub = p.split("/")[2]?.toLowerCase();
    if (sub === "compare" || sub === "arena") {
      return { type: "features", subpage: "compare" };
    }
    if (sub === "wizard" || sub === "discovery") {
      return { type: "features", subpage: "wizard" };
    }
    if (sub === "playground") {
      return { type: "features", subpage: "playground" };
    }
    if (sub === "pulse" || sub === "daily-pulse") {
      return { type: "features", subpage: "pulse" };
    }
    if (sub === "ecosystems") {
      return { type: "features", subpage: "ecosystems" };
    }
    return { type: "features", subpage: "overview" };
  }

  // Legacy feature aliases for backwards compatibility
  if (p === "/arena") {
    return { type: "features", subpage: "compare" };
  }
  if (p === "/wizard") {
    return { type: "features", subpage: "wizard" };
  }
  if (p === "/playground") {
    return { type: "features", subpage: "playground" };
  }

  // 5. Chat Assistant
  if (p === "/chat") {
    return { type: "chat" };
  }

  // 6. User Profile (/user/:username)
  const profileUsername = parseProfileFromPathname(p);
  if (profileUsername) {
    return { type: "profile", username: profileUsername };
  }

  // 7. Legal
  if (p === "/privacy") {
    return { type: "privacy" };
  }
  if (p === "/terms") {
    return { type: "terms" };
  }

  // Default fallback to dashboard
  return { type: "dashboard" };
}

/**
 * Converts a structured AppRoute to a clean canonical pathname and search query string.
 */
export function routeToUrl(
  route: AppRoute,
  options?: {
    entry?: string | null;
    additionalParams?: Record<string, string>;
  }
): string {
  let path = "/";
  const params = new URLSearchParams();

  switch (route.type) {
    case "dashboard":
      path = "/dashboard";
      break;

    case "entries":
      path = "/entries";
      if (route.tab === "ecosystems") {
        params.set("view", "ecosystems");
      } else if (route.tab === "saved") {
        params.set("tab", "saved");
      }
      break;

    case "admin":
      path = "/admin";
      if (route.section) {
        params.set("section", route.section);
      }
      break;

    case "features":
      if (route.subpage === "compare") {
        path = "/features/compare";
      } else if (route.subpage === "wizard") {
        path = "/features/wizard";
      } else if (route.subpage === "playground") {
        path = "/features/playground";
      } else if (route.subpage === "pulse") {
        path = "/features/pulse";
      } else if (route.subpage === "ecosystems") {
        path = "/features/ecosystems";
      } else {
        path = "/features";
      }
      break;

    case "chat":
      path = "/chat";
      break;

    case "profile":
      path = `/user/${profilePathSlug(route.username)}`;
      break;

    case "privacy":
      path = "/privacy";
      break;

    case "terms":
      path = "/terms";
      break;
  }

  if (options?.entry) {
    params.set("entry", options.entry);
  }

  if (options?.additionalParams) {
    Object.entries(options.additionalParams).forEach(([k, v]) => {
      params.set(k, v);
    });
  }

  const queryStr = params.toString();
  return queryStr ? `${path}?${queryStr}` : path;
}

const NAVIGATE_EVENT = "aiverse-route-change";

/**
 * Global navigation function.
 * Pushes/replaces history entry and dispatches custom event so all listeners update synchronously.
 */
export function navigateTo(
  target: string | AppRoute,
  options?: {
    replace?: boolean;
    entry?: string | null;
    preserveEntry?: boolean;
  }
): void {
  if (typeof window === "undefined") return;

  let targetUrl: string;

  if (typeof target === "string") {
    // If string path provided
    if (options?.entry) {
      const url = new URL(target, window.location.origin);
      url.searchParams.set("entry", options.entry);
      targetUrl = url.pathname + url.search;
    } else if (options?.preserveEntry) {
      const currentEntry = new URLSearchParams(window.location.search).get("entry");
      const url = new URL(target, window.location.origin);
      if (currentEntry) url.searchParams.set("entry", currentEntry);
      targetUrl = url.pathname + url.search;
    } else {
      targetUrl = target;
    }
  } else {
    // If AppRoute object provided
    let entryParam = options?.entry;
    if (options?.preserveEntry && !entryParam) {
      entryParam = new URLSearchParams(window.location.search).get("entry");
    }
    targetUrl = routeToUrl(target, { entry: entryParam });
  }

  const currentRelative = window.location.pathname + window.location.search;

  if (currentRelative !== targetUrl) {
    if (options?.replace) {
      window.history.replaceState({ path: targetUrl }, "", targetUrl);
    } else {
      window.history.pushState({ path: targetUrl }, "", targetUrl);
    }
  }

  // Dispatch custom event for immediate React update
  window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: { url: targetUrl } }));
}

/**
 * Returns current entry slug from window.location.search, if any.
 */
export function getCurrentEntrySlug(): string | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("entry");
  return raw ? decodeEntrySlug(raw) : null;
}

/**
 * Hook providing reactive route state, current entry, and navigate dispatcher.
 * Handles popstate (browser back/forward) and programmatic navigation seamlessly.
 */
export function useAppRouter() {
  const [route, setRoute] = useState<AppRoute>(() => {
    if (typeof window === "undefined") return { type: "dashboard" };
    return parseRoute(window.location.pathname, window.location.search);
  });

  const [entrySlug, setEntrySlug] = useState<string | null>(() => getCurrentEntrySlug());

  // Atomic update helper
  const syncFromLocation = useCallback(() => {
    if (typeof window === "undefined") return;
    const newRoute = parseRoute(window.location.pathname, window.location.search);
    const newSlug = getCurrentEntrySlug();
    setRoute(newRoute);
    setEntrySlug(newSlug);
  }, []);

  useEffect(() => {
    // 1. Listen for browser back / forward navigation
    const handlePopState = () => {
      syncFromLocation();
    };

    // 2. Listen for in-app navigation
    const handleCustomNav = () => {
      syncFromLocation();
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener(NAVIGATE_EVENT, handleCustomNav);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener(NAVIGATE_EVENT, handleCustomNav);
    };
  }, [syncFromLocation]);

  const navigate = useCallback(
    (
      target: string | AppRoute,
      options?: {
        replace?: boolean;
        entry?: string | null;
        preserveEntry?: boolean;
      }
    ) => {
      navigateTo(target, options);
    },
    []
  );

  return {
    route,
    entrySlug,
    navigate,
    currentPath: typeof window !== "undefined" ? window.location.pathname : "/",
  };
}

/**
 * Generates SEO meta tags, title, and description for any route.
 */
export function getRouteSeo(route: AppRoute, entryName?: string | null) {
  let title = "AiVerse - The Ultimate AI Tool & Model Directory";
  let desc =
    "AiVerse is a comprehensive, open-source guide to AI tools, models, datasets, and frameworks. Search, compare, and discover the best AI technologies.";
  let path = "/";

  switch (route.type) {
    case "dashboard":
      title = "AiVerse — Universal AI Knowledge Directory & Model Ecosystem";
      desc =
        "Explore verified AI models, architectures, benchmark evaluations, licenses, and ecosystem telemetry on AiVerse.";
      path = "/dashboard";
      break;

    case "entries":
      if (route.tab === "ecosystems") {
        title = "AI Ecosystems Map & Labs Directory | AiVerse";
        desc = "Explore leading AI organizations, labs, and their ecosystems of models, frameworks, and datasets.";
        path = "/entries?view=ecosystems";
      } else if (route.tab === "saved") {
        title = "Saved Bookmarks & Resources | AiVerse";
        desc = "Your saved and bookmarked AI tools, frameworks, and models on AiVerse.";
        path = "/entries?tab=saved";
      } else {
        title = "AI Catalog Directory | AiVerse";
        desc = "Explore our comprehensive directory of language models, frameworks, datasets, platforms, and AI apps.";
        path = "/entries";
      }
      break;

    case "admin":
      title = "Administrator Cloud Console | AiVerse";
      desc = "Platform administration console for managing database catalog, cloud storage, review queues, and IAM governance.";
      path = route.section ? `/admin?section=${route.section}` : "/admin";
      break;

    case "features":
      if (route.subpage === "compare") {
        title = "Comparison Arena | AiVerse Features";
        desc = "Compare advanced machine learning models and AI platforms side-by-side on technical specs, architecture, benchmarks, and licensing.";
        path = "/features/compare";
      } else if (route.subpage === "wizard") {
        title = "AI Discovery Wizard | AiVerse Features";
        desc = "Use the interactive AI Discovery Wizard to identify the best language models, frameworks, and datasets based on your tech stack.";
        path = "/features/wizard";
      } else if (route.subpage === "playground") {
        title = "Model Playground | AiVerse Features";
        desc = "Prompt LLMs side-by-side with system constraints, custom prompts, and live comparison.";
        path = "/features/playground";
      } else if (route.subpage === "pulse") {
        title = "Daily Pulse | AiVerse Features";
        desc = "Discover trending AI tools, daily highlights, and community favorites on AiVerse.";
        path = "/features/pulse";
      } else {
        title = "Features Suite | AiVerse";
        desc = "Explore category dashboards, system capacity metrics, spotlight highlights, values prop overlays, and all integrated capabilities.";
        path = "/features";
      }
      break;

    case "chat":
      title = "Vox AI Technical Assistant | AI Studio | AiVerse";
      desc = "Chat with Vox, the flagship AI research assistant on AiVerse covering 330+ models, benchmarks, and architectures.";
      path = "/chat";
      break;

    case "profile": {
      const displayUser = route.username.startsWith("@") ? route.username : `@${route.username}`;
      title = `${displayUser}'s Builder Profile | AiVerse`;
      desc = `View developer preferences, role interests, and bookmarked AI collections of ${displayUser} on AiVerse.`;
      path = `/user/${profilePathSlug(route.username)}`;
      break;
    }

    case "privacy":
      title = "Privacy Policy | AiVerse";
      desc = "Read the AiVerse Privacy Policy to understand how we secure your data, personalization preferences, and catalog contributions.";
      path = "/privacy";
      break;

    case "terms":
      title = "Terms of Service | AiVerse";
      desc = "Review the AiVerse Terms of Service for contributing tools, utilizing the comparison arena, and interacting with our directory.";
      path = "/terms";
      break;
  }

  if (entryName) {
    title = `${entryName} - Technical Specs & Details | AiVerse`;
    desc = `Technical specifications, architecture details, benchmarks, and code templates for ${entryName} on AiVerse.`;
    path = `${path}${path.includes("?") ? "&" : "?"}entry=${encodeURIComponent(entryName)}`;
  }

  return { title, desc, path };
}
