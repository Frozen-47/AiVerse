import React, { useState, useMemo, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { Filter, X, Check, Sparkles, ArrowLeft, AlertTriangle, Building2, Box, ChevronLeft, ChevronRight, LayoutGrid, ArrowRight } from "lucide-react";
import { ThemeContext, useTheme } from "./lib/theme";
import { useTokens } from "./lib/theme";
import { Navbar } from "./components/Navbar";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";
import { FeaturesSuite } from "./components/FeaturesSuite";
import { ValueProps } from "./components/features/ValueProps";
import { Sidebar } from "./components/Sidebar";
import { SearchBar } from "./components/SearchBar";
import { EntryCard } from "./components/EntryCard";
import { EcosystemsSection } from "./components/EcosystemsSection";
import { groupEntriesByEcosystem } from "./lib/ecosystems";
import { WelcomeOnboarding } from "./components/WelcomeOnboarding";
import { UserProfileModal } from "./components/UserProfileModal";
import { OverviewCards } from "./components/OverviewCards";
import { DailyPulseSection } from "./components/DailyPulseSection";
import { DashboardHero } from "./components/DashboardHero";
import { FeatureRibbon } from "./components/FeatureRibbon";
import { PreferencesLoginPrompt } from "./components/PreferencesLoginPrompt";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { AuthModal } from "./components/AuthModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { useDebouncedValue } from "./lib/useDebouncedValue";
import { clearLocalBookmarks, loadBookmarks } from "./lib/bookmarks";
import {
  bookmarkUserKey,
  fetchUserBookmarks,
  mergeLocalBookmarks,
  toggleUserBookmark,
} from "./lib/entryBookmarks";
import {
  findEntryBySlug,
  migrateLegacyProfileQueryUrl,
  parseProfileUsernameFromLocation,
  profilePathSlug,
} from "./lib/entryUrl";
import { getRelatedEntries, getCompareCandidates } from "./lib/relatedEntries";


const DetailModal = lazy(() =>
  import("./components/DetailModal").then((m) => ({ default: m.DetailModal })),
);
const AddModal = lazy(() =>
  import("./components/AddModal").then((m) => ({ default: m.AddModal })),
);
const ChatWidget = lazy(() =>
  import("./components/ChatWidget").then((m) => ({ default: m.ChatWidget })),
);
import type { Entry, EntryRatingSummary, Theme, TypeFilter, TaskFilter } from "./types";
import { fetchRatingSummaries } from "./lib/entryFeedback";
import { fetchEntries } from "./lib/supabase";
import { typeFilters as staticTypeFilters, taskFilters as staticTaskFilters, entries as staticEntries } from "./data";
import {
  partitionByInterests,
  persistOnboardingProfile,
  preferencesUserKey,
  sortByInterestMatch,
  type OnboardingProfile,
} from "./lib/onboarding";
import { fetchUserPreferences, supabase } from "./lib/supabase";
import { fetchSiteAnnouncement } from "./lib/announcements";

function checkBlockStatus(profile: OnboardingProfile | null) {
  if (!profile?.referralSource) return null;
  try {
    const parsed = JSON.parse(profile.referralSource);
    if (parsed.isBlocked) {
      if (parsed.blockedUntil) {
        const expiry = new Date(parsed.blockedUntil).getTime();
        if (Date.now() < expiry) {
          return { isBlocked: true, blockedUntil: parsed.blockedUntil };
        }
      } else {
        return { isBlocked: true }; // Permanent block
      }
    }
  } catch (e) {
    // Ignore
  }
  return null;
}

// ─── Inner app (needs theme context) ─────────────────────────────────────────
const Inner: React.FC = () => {
  const t = useTokens();
  const { resolvedTheme, setTheme } = useTheme();
  const { user, isLoaded, openAuthModal } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [blockedStatus, setBlockedStatus] = useState<{ isBlocked: boolean; blockedUntil?: string } | null>(null);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [taskFilters, setTaskFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 220);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("All Tasks");
  const [popularOnly, setPopularOnly] = useState(false);
  const [catalogDisplayMode, setCatalogDisplayMode] = useState<"assets" | "ecosystems">("assets");
  const [selected, setSelected] = useState<Entry | null>(null);
  const initialEntrySlugRef = useRef<string | null>(
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("entry")
      : null,
  );
  const [urlSyncReady, setUrlSyncReady] = useState(false);
  const catalogSectionRef = useRef<HTMLDivElement | null>(null);
  const scrollToCatalog = useCallback(() => {
    catalogSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const [isAdding, setIsAdding] = useState(false);
  const [showBackendToast, setShowBackendToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [onboardingProfile, setOnboardingProfile] = useState<OnboardingProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profileUsername, setProfileUsername] = useState<string | null>(() => {
    const migrated = migrateLegacyProfileQueryUrl();
    if (migrated) return migrated;
    return parseProfileUsernameFromLocation();
  });
  const [isAdminDashboard, setIsAdminDashboard] = useState(false);
  const [adminDashboardKey, setAdminDashboardKey] = useState(0);
  const [isChat, setIsChat] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === "/chat" || window.location.pathname === "/chat/";
  });
  const [isPrivacy, setIsPrivacy] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === "/privacy" || window.location.pathname === "/privacy/";
  });
  const [isTerms, setIsTerms] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === "/terms" || window.location.pathname === "/terms/";
  });
  const [isWizard, setIsWizard] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === "/wizard" || window.location.pathname === "/wizard/";
  });
  const [isArena, setIsArena] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === "/arena" || window.location.pathname === "/arena/";
  });
  const [isFeatures, setIsFeatures] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === "/features" || window.location.pathname === "/features/";
  });
  const [isPlayground, setIsPlayground] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === "/playground" || window.location.pathname === "/playground/";
  });
  const [activeView, setActiveView] = useState<"landing" | "catalog">((() => {
    if (typeof window === "undefined") return "landing";
    return (window.location.pathname === "/entries" || window.location.pathname === "/entries/") ? "catalog" : "landing";
  })());
  const [browseAll, setBrowseAll] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === "/entries" || window.location.pathname === "/entries/";
  });

  // FeaturesSuite Quiz Wizard and Compare Arena States
  const [compareToolA, setCompareToolA] = useState<string>("GPT-4o");
  const [compareToolB, setCompareToolB] = useState<string>("Claude 3.5 Sonnet");
  const [wizardStep, setWizardStep] = useState<number>(0);
  const [wizardGoal, setWizardGoal] = useState<string | null>(null);
  const [wizardCustomGoal, setWizardCustomGoal] = useState<string>("");
  const [wizardType, setWizardType] = useState<string | null>(null);
  const [wizardLicense, setWizardLicense] = useState<string | null>(null);
  const [wizardCustomLicense, setWizardCustomLicense] = useState<string>("");
  const [showLoginForPrefs, setShowLoginForPrefs] = useState(false);
  const [showLoginForBookmarks, setShowLoginForBookmarks] = useState(false);
  const [prefsToast, setPrefsToast] = useState(false);
  const [ratingSummaries, setRatingSummaries] = useState<
    Record<string, EntryRatingSummary>
  >({});

  // Site-wide Announcement Banner State
  const [announcement, setAnnouncement] = useState<{
    enabled: boolean;
    message: string;
    type: "info" | "warning" | "success" | "special";
    linkText?: string;
    linkUrl?: string;
  } | null>(() => {
    try {
      const stored = localStorage.getItem("aiverse_site_announcement");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.message && (parsed.message.includes("228+") || parsed.message.includes("238+"))) {
          parsed.message = parsed.message
            .replace(/\b(228|238)\+\b/g, "242+")
            .replace(/compare \d+\+ open/g, "compare 242+ open");
          localStorage.setItem("aiverse_site_announcement", JSON.stringify(parsed));
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Fetch live global broadcast announcement from Supabase for all visitors
    fetchSiteAnnouncement().then((ann) => {
      if (ann) setAnnouncement(ann);
    });

    const handleAnnouncementChange = () => {
      try {
        const stored = localStorage.getItem("aiverse_site_announcement");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.message && (parsed.message.includes("228+") || parsed.message.includes("238+"))) {
            parsed.message = parsed.message
              .replace(/\b(228|238)\+\b/g, "242+")
              .replace(/compare \d+\+ open/g, "compare 242+ open");
            localStorage.setItem("aiverse_site_announcement", JSON.stringify(parsed));
          }
          setAnnouncement(parsed);
          return;
        }
        setAnnouncement(null);
      } catch {}
    };
    window.addEventListener("announcement_updated", handleAnnouncementChange);
    return () => window.removeEventListener("announcement_updated", handleAnnouncementChange);
  }, []);

  const typeCounts = useMemo(() => {
    return {
      AI: entries.filter((e) => e.type === "AI").length,
      Model: entries.filter((e) => e.type === "Model").length,
      Dataset: entries.filter((e) => e.type === "Dataset").length,
      Framework: entries.filter((e) => e.type === "Framework").length,
      Platform: entries.filter((e) => e.type === "Platform").length,
      Popular: entries.filter((e) => e.popular).length,
    };
  }, [entries]);

  const ecosystemsCount = useMemo(() => {
    return groupEntriesByEcosystem(entries).length;
  }, [entries]);

  const wizardRecommendations = useMemo(() => {
    if (!wizardGoal || !wizardType || !wizardLicense) return [];

    const isPermissiveLicense = (lic: string) => {
      const l = lic.toLowerCase();
      return l.includes("mit") || l.includes("apache") || l.includes("bsd") || l.includes("public domain") || l.includes("cc0");
    };

    const goalKeywords: Record<string, string[]> = {
      web: ["web", "chat", "copilot", "agent", "vector", "search", "database", "ui", "frontend", "client", "assistant", "app"],
      train: ["train", "tune", "learn", "optimiz", "compil", "benchmark", "dataset", "loss", "weight", "fine-tune"],
      scale: ["serv", "deploy", "scale", "gpu", "inference", "api", "cloud", "platform", "ops", "hosting", "run"],
      creative: ["image", "video", "speech", "audio", "synthesis", "vision", "creative", "paint", "art", "music", "draw", "generate"]
    };

    let keywords = goalKeywords[wizardGoal] || [];
    if (wizardGoal === "other" && wizardCustomGoal) {
      keywords = wizardCustomGoal
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 2);
    }

    // Filter by type (if "other", scan all types)
    let pool = wizardType === "other" ? entries : entries.filter(e => e.type === wizardType);

    // Filter by license
    if (wizardLicense === "permissive") {
      pool = pool.filter(e => isPermissiveLicense(e.license));
    } else if (wizardLicense === "other" && wizardCustomLicense.trim()) {
      const customLic = wizardCustomLicense.toLowerCase().trim();
      pool = pool.filter(e => e.license.toLowerCase().includes(customLic));
    }

    // Score entries
    const scored = pool.map(entry => {
      let score = 0;
      const text = `${entry.name} ${entry.task} ${entry.summary} ${entry.architecture}`.toLowerCase();
      keywords.forEach(kw => {
        if (text.includes(kw)) score += 1;
      });
      if (entry.popular) score += 2;
      return { entry, score };
    });

    // Sort by score desc
    scored.sort((a, b) => b.score - a.score);

    const results = scored.slice(0, 10).map(s => s.entry);

    // Fallback if no/few results
    if (results.length < 10) {
      const existingNames = new Set(results.map(r => r.name));
      const fallbacks = entries
        .filter(e => (wizardType === "other" || e.type === wizardType) && !existingNames.has(e.name))
        .filter(e => {
          if (wizardLicense === "permissive") return isPermissiveLicense(e.license);
          if (wizardLicense === "other" && wizardCustomLicense.trim()) {
            return e.license.toLowerCase().includes(wizardCustomLicense.toLowerCase().trim());
          }
          return true;
        })
        .sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      
      for (const f of fallbacks) {
        if (results.length >= 10) break;
        results.push(f);
      }
    }

    return results;
  }, [entries, wizardGoal, wizardCustomGoal, wizardType, wizardLicense, wizardCustomLicense]);

  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;

    (async () => {
      if (!user) {
        if (!cancelled) {
          setOnboardingProfile(null);
          setShowOnboarding(false);
          setBlockedStatus(null);
          setIsAdminDashboard(false);
        }
        return;
      }

      const isAdmin = user.email === "frozennheart47@gmail.com" || user.user_metadata?.role === "admin";
      if (!isAdmin && !cancelled) {
        setIsAdminDashboard(false);
      }

      // Always fetch from DB to get the latest block status
      const fromDb = await fetchUserPreferences(
        preferencesUserKey({ supabaseUserId: user.id }),
      );

      const block = checkBlockStatus(fromDb);
      if (block && !cancelled) {
        setBlockedStatus(block);
        setOnboardingProfile(fromDb);
        setShowOnboarding(false);
        return;
      }

      if (!cancelled) {
        setBlockedStatus(null);
      }

      // 1. If DB has a profile record (including any admin modifications or user updates), prioritize it!
      if (fromDb && fromDb.role && fromDb.referralSource && !cancelled) {
        setOnboardingProfile(fromDb);
        setShowOnboarding(false);
        return;
      }

      // 2. Fall back to user_metadata only if DB has no record
      const fromMetadata = user.user_metadata?.onboardingComplete && user.user_metadata?.onboarding 
        ? (user.user_metadata.onboarding as OnboardingProfile) 
        : null;
        
      if (fromMetadata && fromMetadata.role && fromMetadata.referralSource) {
        if (!cancelled) {
          setOnboardingProfile(fromMetadata);
          setShowOnboarding(false);
        }
        return;
      }

      if (!cancelled) {
        setOnboardingProfile(null);
        setShowOnboarding(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, isLoaded]);

  useEffect(() => {
    if (user) {
      setShowLoginForPrefs(false);
      setShowLoginForBookmarks(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      setBookmarks([]);
      setSavedOnly(false);
      return;
    }

    let cancelled = false;
    const userKey = bookmarkUserKey(user.id);

    (async () => {
      const local = loadBookmarks();
      try {
        const names = local.length
          ? await mergeLocalBookmarks(userKey, local)
          : await fetchUserBookmarks(userKey);
        if (local.length) clearLocalBookmarks();
        if (!cancelled) setBookmarks(names);
      } catch (err) {
        console.warn("Failed to sync bookmarks", err);
        if (!cancelled) setBookmarks(local);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, isLoaded]);

  const handleProfileComplete = async (
    profile: OnboardingProfile,
    meta?: {
      displayName?: string;
      username?: string;
      description?: string;
      github?: string;
      linkedin?: string;
      medium?: string;
      devto?: string;
      portfolio?: string;
    },
  ) => {
    await persistOnboardingProfile(profile, {
      user: user ?? undefined,
      isGuest: !user,
      displayName: meta?.displayName,
      profileMeta: meta,
    });
    setOnboardingProfile(profile);
    setShowOnboarding(false);
    setCurrentPage(1);
    setPrefsToast(true);
    setTimeout(() => setPrefsToast(false), 4000);
    // Transition user to catalog view
    setActiveView("catalog");
    setBrowseAll(true);
    setIsFeatures(false);
    setIsPrivacy(false);
    setIsTerms(false);
  };

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
  };

  const handleSearchSelect = (e: Entry) => {
    setSelected(e);
    setSearchInput("");
  };

  useEffect(() => {
    fetchEntries()
      .then(data => {
        const remoteEntries = data || [];
        const mergedMap = new Map<string, Entry>();
        // 1. Static entries first (ensures newly ingested models/platforms in data.ts are immediately present)
        (staticEntries || []).forEach(e => {
          if (e && e.name) mergedMap.set(e.name.toLowerCase().trim(), e);
        });
        // 2. Supabase approved entries take precedence / filter out deleted entries
        remoteEntries.forEach(e => {
          if (!e || !e.name) return;
          const key = e.name.toLowerCase().trim();
          if (e.approved === false) {
            mergedMap.delete(key);
          } else {
            mergedMap.set(key, e);
          }
        });
        const combined = Array.from(mergedMap.values());
        setEntries(combined);
        setTypeFilters(staticTypeFilters || ["All"]);
        setTaskFilters(staticTaskFilters || ["All Tasks"]);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load catalog from Supabase, falling back to static entries", err);
        setEntries(staticEntries || []);
        setTypeFilters(staticTypeFilters || ["All"]);
        setTaskFilters(staticTaskFilters || ["All Tasks"]);
        setIsLoading(false);
      });

    fetchRatingSummaries().then(setRatingSummaries).catch(() => {});
  }, []);

  const handleRatingSummaryChange = useCallback(
    (entryName: string, summary: EntryRatingSummary) => {
      setRatingSummaries((prev) => ({ ...prev, [entryName]: summary }));
    },
    [],
  );

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleEditPreferences = () => {
    if (!user) {
      setShowLoginForPrefs(true);
    }
  };

  const entriesByName = useMemo(() => {
    const map = new Map<string, Entry>();
    for (const e of entries) map.set(e.name, e);
    return map;
  }, [entries]);

  const entryNames = useMemo(() => entries.map((e) => e.name), [entries]);

  const selectEntryByName = useCallback(
    (name: string) => {
      const entry = entriesByName.get(name);
      if (entry) setSelected(entry);
    },
    [entriesByName],
  );

  const handleToggleBookmark = useCallback(
    async (name: string) => {
      if (!user) {
        setShowLoginForBookmarks(true);
        return;
      }
      const userKey = bookmarkUserKey(user.id);
      const prev = bookmarks;
      const optimistic = prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name];
      setBookmarks(optimistic);
      try {
        const next = await toggleUserBookmark(userKey, name, prev);
        setBookmarks(next);
      } catch (err) {
        console.warn("Failed to update bookmark", err);
        setBookmarks(prev);
      }
    },
    [user, bookmarks],
  );

  const handleSavedToggle = useCallback(() => {
    if (!user) {
      setShowLoginForBookmarks(true);
      return;
    }
    setSavedOnly((p) => !p);
  }, [user]);

  const relatedForSelected = useMemo(() => {
    if (!selected) return [];
    return getRelatedEntries(selected, entries, onboardingProfile?.interests ?? []);
  }, [selected, entries, onboardingProfile]);

  const compareCandidatesForSelected = useMemo(() => {
    if (!selected) return [];
    return getCompareCandidates(selected, entries, onboardingProfile?.interests ?? []);
  }, [selected, entries, onboardingProfile]);

  useEffect(() => {
    if (!entries.length) return;
    const slug =
      initialEntrySlugRef.current ??
      new URLSearchParams(window.location.search).get("entry");
    initialEntrySlugRef.current = null;
    if (slug) {
      const entry = findEntryBySlug(entries, slug);
      if (entry) setSelected(entry);
    }
    setUrlSyncReady(true);
  }, [entries]);

  useEffect(() => {
    if (!urlSyncReady) return;
    const url = new URL(window.location.href);
    let targetPath = "/";

    if (isChat) {
      targetPath = "/chat";
      url.searchParams.delete("entry");
      url.searchParams.delete("user");
    } else if (isPrivacy) {
      targetPath = "/privacy";
      url.searchParams.delete("entry");
      url.searchParams.delete("user");
    } else if (isTerms) {
      targetPath = "/terms";
      url.searchParams.delete("entry");
      url.searchParams.delete("user");
    } else if (isWizard) {
      targetPath = "/wizard";
      url.searchParams.delete("entry");
      url.searchParams.delete("user");
    } else if (isArena) {
      targetPath = "/arena";
      url.searchParams.delete("entry");
      url.searchParams.delete("user");
    } else if (isFeatures) {
      targetPath = "/features";
      url.searchParams.delete("entry");
      url.searchParams.delete("user");
    } else if (isPlayground) {
      targetPath = "/playground";
      url.searchParams.delete("entry");
      url.searchParams.delete("user");
    } else if (profileUsername) {
      targetPath = `/user/${profilePathSlug(profileUsername)}`;
      url.searchParams.delete("user");
    } else if (activeView === "catalog" || browseAll) {
      targetPath = "/entries";
    }

    url.pathname = targetPath;
    if (selected) {
      url.searchParams.set("entry", selected.name);
    } else {
      url.searchParams.delete("entry");
    }

    // Only pushState if pathname actually changes to avoid pushing duplicate views, else replaceState
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, "", url);
    } else {
      window.history.replaceState({}, "", url);
    }
  }, [selected, profileUsername, isChat, isPrivacy, isTerms, isWizard, isArena, isFeatures, isPlayground, activeView, browseAll, urlSyncReady]);

  // Dynamic SEO handler
  useEffect(() => {
    let title = "AiVerse - The Ultimate AI Tool & Model Directory";
    let desc = "AiVerse is a comprehensive, open-source guide to AI tools, models, datasets, and frameworks. Search, compare, and discover the best AI technologies.";
    let path = "/";

    if (isChat) {
      title = "Vox AI Technical Assistant | AI Studio | AiVerse";
      desc = "Chat with Vox, the flagship AI research assistant on AiVerse covering 330+ models, benchmarks, and architectures.";
      path = "/chat";
    } else if (isPrivacy) {
      title = "Privacy Policy | AiVerse";
      desc = "Read the AiVerse Privacy Policy to understand how we secure your data, personalization preferences, and catalog contributions.";
      path = "/privacy";
    } else if (isTerms) {
      title = "Terms of Service | AiVerse";
      desc = "Review the AiVerse Terms of Service for contributing tools, utilizing the comparison arena, and interacting with our directory.";
      path = "/terms";
    } else if (isWizard) {
      title = "AI Discovery Wizard | AiVerse";
      desc = "Use the AiVerse AI Discovery Wizard to identify the best language models, frameworks, and datasets based on your tech stack and requirements.";
      path = "/wizard";
    } else if (isArena) {
      title = "Comparison Arena | AiVerse";
      desc = "Compare advanced machine learning models and AI platforms side-by-side on technical specs, architecture, benchmarks, and licensing.";
      path = "/arena";
    } else if (isFeatures) {
      title = "Ecosystem Features | AiVerse";
      desc = "Explore category dashboards, system capacity metrics, spotlight highlights, values prop overlays, and all integrated capabilities.";
      path = "/features";
    } else if (isPlayground) {
      title = "Model Playground | AiVerse";
      desc = "Compare language models side-by-side. Test custom system instructions, prompt templates, and latency metrics.";
      path = "/playground";
    } else if (profileUsername) {
      const displayUser = profileUsername.startsWith("@") ? profileUsername : `@${profileUsername}`;
      title = `${displayUser}'s Builder Profile | AiVerse`;
      desc = `View developer preferences, role interests, and bookmarked AI collections of ${displayUser} on AiVerse.`;
      path = `/user/${profilePathSlug(profileUsername)}`;
    } else if (activeView === "catalog" || browseAll) {
      title = "Explore AI Directory | AiVerse";
      desc = "Browse our comprehensive, citation-backed database of language models, computer vision frameworks, and MLOps platforms.";
      path = "/entries";
    }

    if (selected) {
      title = `${selected.name} - Technical Specs & Details | AiVerse`;
      desc = `${selected.name} is a ${selected.type} by ${selected.org}. ${selected.summary} View specs, benchmarks, code templates, and limitations.`;
      path = `${path}?entry=${encodeURIComponent(selected.name)}`;
    }

    document.title = title;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", desc);
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://aiverse.frozenn.in${path}`);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://aiverse.frozenn.in${path}`);
  }, [selected, profileUsername, isChat, isPrivacy, isTerms, isWizard, isArena, isFeatures, isPlayground, activeView, browseAll]);

  useEffect(() => {
    const handlePopState = () => {
      setIsChat(window.location.pathname === "/chat" || window.location.pathname === "/chat/");
      setIsPrivacy(window.location.pathname === "/privacy" || window.location.pathname === "/privacy/");
      setIsTerms(window.location.pathname === "/terms" || window.location.pathname === "/terms/");
      setIsWizard(window.location.pathname === "/wizard" || window.location.pathname === "/wizard/");
      setIsArena(window.location.pathname === "/arena" || window.location.pathname === "/arena/");
      setIsFeatures(window.location.pathname === "/features" || window.location.pathname === "/features/");
      setIsPlayground(window.location.pathname === "/playground" || window.location.pathname === "/playground/");
      setProfileUsername(parseProfileUsernameFromLocation());

      const isEntriesPath = window.location.pathname === "/entries" || window.location.pathname === "/entries/";
      if (isEntriesPath) {
        setActiveView("catalog");
        setBrowseAll(true);
      } else if (window.location.pathname === "/" || window.location.pathname === "") {
        setActiveView("landing");
        setBrowseAll(false);
      }

      const slug = new URLSearchParams(window.location.search).get("entry");
      if (slug) {
        const entry = findEntryBySlug(entries, slug);
        if (entry) setSelected(entry);
      } else {
        setSelected(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [entries]);

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, taskFilter, popularOnly, debouncedSearch, savedOnly]);

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        (document.querySelector<HTMLInputElement>("[data-search]"))?.focus();
      }
      if (e.key === "Escape") {
        setSelected(null);
        setIsAdding(false);
      }
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  // Sync document body and meta tags for an orderly global theme switch
  useEffect(() => {
    if (resolvedTheme === "amoled") {
      document.documentElement.style.backgroundColor = "#171717";
      document.body.style.backgroundColor = "#171717";
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#171717");
    } else {
      document.documentElement.style.backgroundColor = "#ffffff";
      document.body.style.backgroundColor = "#ffffff";
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#ffffff");
    }
  }, [resolvedTheme]);

  const filtered = useMemo(() =>
    entries.filter((e) => {
      if (typeFilter !== "All" && e.type !== typeFilter) return false;
      if (taskFilter !== "All Tasks" && e.task !== taskFilter) return false;
      if (popularOnly && !e.popular) return false;
      if (savedOnly && !bookmarks.includes(e.name)) return false;
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        if (
          !e.name.toLowerCase().includes(q) &&
          !e.summary.toLowerCase().includes(q) &&
          !e.org.toLowerCase().includes(q) &&
          !e.task.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    }),
  [entries, typeFilter, taskFilter, popularOnly, debouncedSearch, savedOnly, bookmarks]);

  const personalized = useMemo(() => {
    const interests = onboardingProfile?.interests ?? [];
    if (!interests.length) {
      return { forYou: [] as Entry[], explore: filtered, displayList: filtered };
    }
    const ranked = sortByInterestMatch(filtered, interests);
    const { forYou, explore } = partitionByInterests(ranked, interests);
    const displayList = [...forYou, ...explore];
    return { forYou, explore, displayList };
  }, [filtered, onboardingProfile]);

  const listForPagination = personalized.displayList;
  const totalPages = Math.max(1, Math.ceil(listForPagination.length / itemsPerPage));
  const paginatedEntries = listForPagination.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const forYouNames = new Set(personalized.forYou.map((e) => e.name));
  const showPersonalizedSections =
    (onboardingProfile?.interests.length ?? 0) > 0 &&
    !debouncedSearch &&
    typeFilter === "All" &&
    taskFilter === "All Tasks" &&
    !popularOnly &&
    !savedOnly;
  const pageForYou = showPersonalizedSections
    ? paginatedEntries.filter((e) => forYouNames.has(e.name))
    : [];
  const pageExplore = showPersonalizedSections
    ? paginatedEntries.filter((e) => !forYouNames.has(e.name))
    : paginatedEntries;

  const handleAdd = (_partial: Partial<Entry>) => {
    // We no longer append to the local UI state immediately.
    // The entry goes to Supabase as approved=false and will appear on refresh once an admin approves it.
    setIsAdding(false);
    setShowBackendToast(true);
    setTimeout(() => setShowBackendToast(false), 5000);
    setAdminDashboardKey(prev => prev + 1);
  };

  const getVisiblePages = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }
    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  if (isLoading) {
    const isDark = resolvedTheme === "amoled";
    const skeletonBg = isDark ? "bg-white/5" : "bg-neutral-200";
    const skeletonBorder = isDark ? "border-white/5" : "border-neutral-200";

    return (
      <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${t.page}`}>
        {/* Navbar Skeleton */}
        <div className={`h-16 border-b flex items-center justify-between px-4 sm:px-6 xl:px-12 ${skeletonBorder}`}>
          <div className={`w-24 h-6 rounded-md animate-pulse ${skeletonBg}`} />
          <div className="hidden md:flex gap-4">
            <div className={`w-20 h-5 rounded-md animate-pulse ${skeletonBg}`} />
            <div className={`w-20 h-5 rounded-md animate-pulse ${skeletonBg}`} />
            <div className={`w-20 h-5 rounded-md animate-pulse ${skeletonBg}`} />
          </div>
          <div className={`w-8 h-8 rounded-full animate-pulse ${skeletonBg}`} />
        </div>

        {/* Catalog Layout Skeleton */}
        <div className="w-full px-4 sm:px-6 xl:px-12 py-8 flex gap-8 flex-1">
          {/* Left pane: Sidebar Skeleton */}
          <div className="hidden lg:block w-56 shrink-0 space-y-6">
            <div className={`w-32 h-6 rounded-md animate-pulse ${skeletonBg}`} />
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`w-full h-8 rounded-xl animate-pulse ${skeletonBg}`} />
              ))}
            </div>
          </div>

          {/* Right pane: Content Skeleton */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className={`w-36 h-9 rounded-xl animate-pulse ${skeletonBg}`} />
              <div className={`w-full sm:w-72 md:w-80 h-10 rounded-xl animate-pulse ${skeletonBg}`} />
            </div>

            {/* Grid of Pulsing Entry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${skeletonBorder}`}
                  style={{ minHeight: "220px" }}
                >
                  <div className="space-y-3 w-full">
                    {/* Icon & Title Row */}
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl shrink-0 animate-pulse ${skeletonBg}`} />
                      <div className="space-y-1.5 flex-1">
                        <div className={`w-2/3 h-4 rounded-md animate-pulse ${skeletonBg}`} />
                        <div className={`w-1/3 h-3 rounded-md animate-pulse ${skeletonBg}`} />
                      </div>
                    </div>
                    {/* Description Paragraph */}
                    <div className="space-y-2 pt-2">
                      <div className={`w-full h-3 rounded-md animate-pulse ${skeletonBg}`} />
                      <div className={`w-5/6 h-3 rounded-md animate-pulse ${skeletonBg}`} />
                      <div className={`w-4/5 h-3 rounded-md animate-pulse ${skeletonBg}`} />
                    </div>
                  </div>
                  {/* Footer Row */}
                  <div className="flex justify-between items-center pt-2">
                    <div className={`w-16 h-3 rounded-md animate-pulse ${skeletonBg}`} />
                    <div className={`w-24 h-3 rounded-md animate-pulse ${skeletonBg}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (blockedStatus) {
    const isDark = resolvedTheme === "amoled";
    const formattedDate = blockedStatus.blockedUntil
      ? new Date(blockedStatus.blockedUntil).toLocaleString()
      : null;

    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 p-6 ${t.page}`}>
        <div className={`w-full max-w-md p-8 rounded-2xl border text-center space-y-6 shadow-2xl ${t.modal} ${t.border}`}>
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-red-500/10 text-red-500 animate-bounce">
              <AlertTriangle size={48} className="stroke-[2px]" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className={`text-xl font-black tracking-tight ${t.textPrimary}`}>
              Account Temporarily Suspended
            </h2>
            <p className={`text-xs leading-relaxed font-light ${t.textSecondary}`}>
              Your AiVerse builder profile has been temporarily blocked by an administrator for violating community guidelines or terms of service.
            </p>
          </div>

          <div className={`p-4 rounded-xl border text-xs font-mono space-y-1.5 ${isDark ? "bg-white/[0.02] border-white/5 text-slate-300" : "bg-black/[0.02] border-black/5 text-slate-700"}`}>
            <div className="flex justify-between">
              <span className="opacity-60">Status:</span>
              <span className="font-bold text-red-400">Blocked</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Duration:</span>
              <span className="font-bold">
                {formattedDate ? `Until ${formattedDate}` : "Permanent / Indefinite"}
              </span>
            </div>
          </div>

          <p className={`text-[11px] leading-relaxed ${t.textMuted}`}>
            If you believe this was an error or would like to appeal, please contact the administrators at{" "}
            <a href="mailto:frozennheart47@gmail.com" className="text-white hover:underline font-semibold">frozennheart47@gmail.com</a>
            {" "}or submit an appeal on{" "}
            <a href="https://github.com/Frozen-47/AiVerse/issues" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-semibold">GitHub Issues</a>.
          </p>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.reload();
            }}
            className="w-full py-3 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 text-white shadow-md cursor-pointer transition-all"
          >
            Sign Out of Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${t.page}`}>


      <Navbar
        onAddEntry={handleAddClick}
        onEditPreferences={handleEditPreferences}
        onViewProfile={setProfileUsername}
        onViewSaved={() => {
          setIsPrivacy(false);
          setIsTerms(false);
          setIsFeatures(false);
          setIsAdminDashboard(false);
          setSelected(null);
          setProfileUsername(null);
          setBrowseAll(true);
          setActiveView("catalog");
          setSavedOnly(true);
        }}
        onHomeClick={() => {
          setIsPrivacy(false);
          setIsTerms(false);
          setIsFeatures(false);
          setIsWizard(false);
          setIsArena(false);
          setIsPlayground(false);
          setIsAdminDashboard(false);
          setSelected(null);
          setProfileUsername(null);
          setActiveView("landing");
          setBrowseAll(false);
          window.location.hash = "";
        }}
        onViewAdminDashboard={() => {
          setIsPrivacy(false);
          setIsTerms(false);
          setIsFeatures(false);
          setIsWizard(false);
          setIsArena(false);
          setIsPlayground(false);
          setIsAdminDashboard(true);
          setSelected(null);
          setProfileUsername(null);
          setBrowseAll(false);
        }}
        entryCount={entries.length}
        ecosystemsCount={ecosystemsCount}
        onBrowseAll={() => {
          setIsPrivacy(false);
          setIsTerms(false);
          setIsFeatures(false);
          setIsWizard(false);
          setIsArena(false);
          setIsPlayground(false);
          setIsAdminDashboard(false);
          setSelected(null);
          setProfileUsername(null);
          setBrowseAll(true);
          setActiveView("catalog");
          setCatalogDisplayMode("assets");
          setCurrentPage(1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onViewEcosystems={() => {
          setIsPrivacy(false);
          setIsTerms(false);
          setIsFeatures(false);
          setIsWizard(false);
          setIsArena(false);
          setIsPlayground(false);
          setIsAdminDashboard(false);
          setSelected(null);
          setProfileUsername(null);
          setBrowseAll(true);
          setActiveView("catalog");
          setCatalogDisplayMode("ecosystems");
          setCurrentPage(1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onViewChat={() => {
          setIsChat(true);
          setIsPrivacy(false);
          setIsTerms(false);
          setIsFeatures(false);
          setIsWizard(false);
          setIsArena(false);
          setIsPlayground(false);
          setIsAdminDashboard(false);
          setSelected(null);
          setProfileUsername(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onboardingProfile={onboardingProfile}
        onSaveProfile={handleProfileComplete}
      />

      {announcement?.enabled && announcement.message && (
        <div className={`w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-between gap-4 border-b transition-colors z-40 ${
          announcement.type === "warning"
            ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
            : announcement.type === "success"
            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
            : announcement.type === "special"
            ? "bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-amber-500/20 border-violet-500/30 text-white"
            : "bg-sky-500/15 border-sky-500/30 text-sky-300"
        }`}>
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full justify-center">
            <Sparkles size={14} className="shrink-0" />
            <span>
              {announcement.message
                .replace(/\b(228|238)\+\b/g, `${entries.length > 0 ? entries.length : 242}+`)
                .replace(/compare \d+\+ open/g, `compare ${entries.length > 0 ? entries.length : 242}+ open`)}
            </span>
            {announcement.linkUrl && (
              <a
                href={announcement.linkUrl}
                target={announcement.linkUrl.startsWith("http") ? "_blank" : undefined}
                rel={announcement.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                className="underline ml-2 hover:opacity-80 font-bold cursor-pointer"
              >
                {announcement.linkText || "Learn more"} →
              </a>
            )}
          </div>
          <button
            onClick={() => setAnnouncement((prev) => prev ? { ...prev, enabled: false } : null)}
            className="opacity-70 hover:opacity-100 p-1 cursor-pointer"
            title="Dismiss announcement"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {isPrivacy ? (
        <PrivacyPolicy onBackToHome={() => {
          setIsPrivacy(false);
          setIsTerms(false);
          setIsWizard(false);
          setIsArena(false);
          setIsFeatures(false);
          setActiveView("landing");
          setBrowseAll(false);
        }} />
      ) : isTerms ? (
        <TermsOfService onBackToHome={() => {
          setIsPrivacy(false);
          setIsTerms(false);
          setIsWizard(false);
          setIsArena(false);
          setIsFeatures(false);
          setActiveView("landing");
          setBrowseAll(false);
        }} />
      ) : (isWizard || isArena || isFeatures || isPlayground) ? (
        <FeaturesSuite
          initialTab={isWizard ? "wizard" : isArena ? "arena" : isPlayground ? "playground" : "overview"}
          entries={entries}
          typeCounts={typeCounts}
          setSelected={setSelected}
          setTypeFilter={(filter) => setTypeFilter(filter as TypeFilter)}
          setSearchInput={setSearchInput}
          setBrowseAll={setBrowseAll}
          setActiveView={setActiveView}
          setSavedOnly={setSavedOnly}
          setPopularOnly={setPopularOnly}
          onCloseFeatures={() => {
            setIsWizard(false);
            setIsArena(false);
            setIsFeatures(false);
            setIsPlayground(false);
          }}
          onBackToHome={() => {
            setIsWizard(false);
            setIsArena(false);
            setIsFeatures(false);
            setIsPlayground(false);
            setActiveView("landing");
            setBrowseAll(false);
          }}
          // Wizard Props
          wizardStep={wizardStep}
          setWizardStep={setWizardStep}
          wizardGoal={wizardGoal}
          setWizardGoal={setWizardGoal}
          wizardCustomGoal={wizardCustomGoal}
          setWizardCustomGoal={setWizardCustomGoal}
          wizardType={wizardType}
          setWizardType={setWizardType}
          wizardLicense={wizardLicense}
          setWizardLicense={setWizardLicense}
          wizardCustomLicense={wizardCustomLicense}
          setWizardCustomLicense={setWizardCustomLicense}
          wizardRecommendations={wizardRecommendations}
          // Arena Props
          compareToolA={compareToolA}
          setCompareToolA={setCompareToolA}
          compareToolB={compareToolB}
          setCompareToolB={setCompareToolB}
          // User / Feedback props
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
          ratingSummaries={ratingSummaries}
        />
      ) : (isAdminDashboard && (user?.email === "frozennheart47@gmail.com" || user?.user_metadata?.role === "admin")) ? (
        <AdminDashboard
          key={adminDashboardKey}
          onBackToHome={() => {
            setIsAdminDashboard(false);
            setIsPrivacy(false);
            setIsTerms(false);
            setIsWizard(false);
            setIsArena(false);
            setIsFeatures(false);
            setActiveView("landing");
            setBrowseAll(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onViewEntry={setSelected}
        />
      ) : (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-8 sm:py-12">
          {activeView === "landing" ? (
            <div className="flex flex-col gap-12 sm:gap-16 w-full animate-[fadeUp_0.4s_ease-out]">
              {/* 1. Header & Central Search */}
              <DashboardHero
                searchQuery={searchInput}
                onSearchChange={handleSearchChange}
                totalEntries={entries.length > 0 ? entries.length : staticEntries.length}
                activeType={typeFilter}
                onSelectType={(val) => setTypeFilter(val as TypeFilter)}
                activeTask={taskFilter}
                onSelectTask={(val) => setTaskFilter(val as TaskFilter)}
                onScrollToCatalog={scrollToCatalog}
                catalogDisplayMode={catalogDisplayMode}
                onSelectDisplayMode={setCatalogDisplayMode}
              />

              {/* 2. Full-Width Google Suite Style Interactive Command Ribbon */}
              <FeatureRibbon
                user={user}
                onOpenAuth={openAuthModal}
                onOpenWizard={() => setIsWizard(true)}
                onOpenArena={() => setIsArena(true)}
                onOpenPlayground={() => setIsPlayground(true)}
                onOpenSuite={() => {
                  window.location.hash = "";
                  setIsFeatures(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* 3. Live Daily AI Pulse & Model Spotlight (Full Width) */}
              <DailyPulseSection entries={entries} onSelectEntry={setSelected} />

              {/* 4. Full-Width Direct Ecosystem Catalog Explorer */}
              <div ref={catalogSectionRef} className="pt-10 border-t border-neutral-200/80 dark:border-white/[0.08] scroll-mt-20 w-full">
                {/* Catalog Controls Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        {catalogDisplayMode === "ecosystems" ? `${ecosystemsCount} AI Organizations & Research Labs` : `${filtered.length} of ${entries.length} assets`}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                      {catalogDisplayMode === "ecosystems" ? "AI Labs & Ecosystems" : "Explore AI Technologies"}
                    </h2>
                  </div>

                  {/* View Switcher and Quick Controls */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Switcher: Individual vs By Lab */}
                    <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08]">
                      <button
                        onClick={() => setCatalogDisplayMode("assets")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          catalogDisplayMode === "assets"
                            ? resolvedTheme === "amoled"
                              ? "bg-white text-black shadow-xs"
                              : "bg-neutral-900 text-white shadow-xs"
                            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                        }`}
                      >
                        <Box size={13} />
                        <span>Individual Assets</span>
                      </button>
                      <button
                        onClick={() => setCatalogDisplayMode("ecosystems")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          catalogDisplayMode === "ecosystems"
                            ? resolvedTheme === "amoled"
                              ? "bg-white text-black shadow-xs"
                              : "bg-neutral-900 text-white shadow-xs"
                            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                        }`}
                      >
                        <Building2 size={13} />
                        <span>By AI Lab</span>
                      </button>
                    </div>

                    {catalogDisplayMode === "assets" && (
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Starred toggle */}
                        <button
                          onClick={() => {
                            setPopularOnly((p) => !p);
                            setCurrentPage(1);
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                            popularOnly
                              ? resolvedTheme === "amoled"
                                ? "bg-white/10 text-white border-white/30 font-semibold"
                                : "bg-neutral-200 text-neutral-900 border-neutral-300 font-semibold"
                              : "border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04]"
                          }`}
                        >
                          <Sparkles size={12} className={popularOnly ? "fill-current" : ""} />
                          <span>Featured</span>
                        </button>

                        {/* Bookmarks toggle */}
                        <button
                          onClick={handleSavedToggle}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                            savedOnly
                              ? resolvedTheme === "amoled"
                                ? "bg-white/10 text-white border-white/30 font-semibold"
                                : "bg-neutral-200 text-neutral-900 border-neutral-300 font-semibold"
                              : "border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04]"
                          }`}
                        >
                          <span>Bookmarks ({bookmarks.length})</span>
                        </button>

                        {/* View All Entries button */}
                        <button
                          onClick={() => {
                            setBrowseAll(true);
                            setActiveView("catalog");
                            setCatalogDisplayMode("assets");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                          title="Open full catalog directory with sidebar filters"
                        >
                          <LayoutGrid size={12} />
                          <span>View All Entries ({entries.length})</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {catalogDisplayMode === "ecosystems" ? (
                  <EcosystemsSection
                    entries={entries}
                    onSelectEntry={(entry) => setSelected(entry)}
                    bookmarks={bookmarks}
                    onToggleBookmark={handleToggleBookmark}
                    ratingSummaries={ratingSummaries}
                  />
                ) : (
                  <>
                    {/* Category pills - Apple segmented control */}
                    <div className="inline-flex p-1 rounded-full bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] mb-6 overflow-x-auto max-w-full">
                      {(["All", "Model", "Framework", "Dataset", "Platform", "AI"] as const).map((type) => {
                        const isSelected = typeFilter === type;
                        const labelMap: Record<string, string> = {
                          All: "All Types",
                          Model: "Models",
                          Framework: "Frameworks",
                          Dataset: "Datasets",
                          Platform: "Platforms",
                          AI: "Apps",
                        };
                        return (
                          <button
                            key={type}
                            onClick={() => {
                              setTypeFilter(type);
                              setCurrentPage(1);
                            }}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                              isSelected
                                ? resolvedTheme === "amoled"
                                  ? "bg-white text-black font-semibold shadow-xs"
                                  : "bg-neutral-900 text-white font-semibold shadow-xs"
                                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                            }`}
                          >
                            <span>{labelMap[type]}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Cards Grid or Empty State */}
                    {paginatedEntries.length === 0 ? (
                      <div className={`p-12 text-center rounded-2xl border ${
                        resolvedTheme === "amoled" ? "bg-neutral-900/40 border-white/[0.08]" : "bg-neutral-50/70 border-neutral-200/80"
                      } flex flex-col items-center justify-center`}>
                        <p className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                          No tools found matching your filters
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                          Try clearing search terms or selecting a different category.
                        </p>
                        <button
                          onClick={() => {
                            setSearchInput("");
                            setTypeFilter("All");
                            setTaskFilter("All Tasks");
                            setPopularOnly(false);
                            setSavedOnly(false);
                          }}
                          className="px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black shadow-xs cursor-pointer hover:opacity-90 transition-all"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paginatedEntries.map((entry, i) => (
                          <EntryCard
                            key={entry.name}
                            entry={entry}
                            entryName={entry.name}
                            onSelect={selectEntryByName}
                            index={i}
                            ratingSummary={ratingSummaries[entry.name]}
                            isBookmarked={bookmarks.includes(entry.name)}
                            onToggleBookmark={handleToggleBookmark}
                          />
                        ))}
                      </div>
                    )}

                    {/* Rich Pagination & View All Controls on Landing Page */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-8 border-t border-neutral-200/80 dark:border-white/[0.08]">
                      {/* Left: Summary and Per Page Selector */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                        <span>
                          Showing <strong className="text-neutral-900 dark:text-white font-semibold">{(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, listForPagination.length)}</strong> of <strong className="text-neutral-900 dark:text-white font-semibold">{listForPagination.length}</strong> assets <span className="opacity-75 font-normal">(Page {currentPage} of {totalPages})</span>
                        </span>
                        <span className="opacity-40">·</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px]">Per page:</span>
                          {[12, 24, 48].map((size) => (
                            <button
                              key={size}
                              onClick={() => {
                                setItemsPerPage(size);
                                setCurrentPage(1);
                              }}
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                                itemsPerPage === size
                                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04]"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right: Page navigation and View All Entries button */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          onClick={() => {
                            setBrowseAll(true);
                            setActiveView("catalog");
                            setCatalogDisplayMode("assets");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                          title="Open full catalog directory with sidebar filters"
                        >
                          <LayoutGrid size={12} />
                          <span>View All Entries ({entries.length})</span>
                          <ArrowRight size={11} />
                        </button>

                        {totalPages > 1 && (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setCurrentPage((p) => Math.max(1, p - 1));
                                scrollToCatalog();
                              }}
                              disabled={currentPage === 1}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                            >
                              <ChevronLeft size={13} />
                              <span>Prev</span>
                            </button>

                            <div className="flex items-center gap-1">
                              {getVisiblePages(currentPage, totalPages).map((page, idx) => {
                                if (page === "...") {
                                  return (
                                    <span key={`dots-${idx}`} className="px-1.5 text-xs text-neutral-400 select-none">
                                      …
                                    </span>
                                  );
                                }
                                const pageNum = page as number;
                                const isCurrent = pageNum === currentPage;
                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => {
                                      setCurrentPage(pageNum);
                                      scrollToCatalog();
                                    }}
                                    className={`min-w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                      isCurrent
                                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                                        : "border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05]"
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              })}
                            </div>

                            <button
                              onClick={() => {
                                setCurrentPage((p) => Math.min(totalPages, p + 1));
                                scrollToCatalog();
                              }}
                              disabled={currentPage === totalPages}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                            >
                              <span>Next</span>
                              <ChevronRight size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 5. Google Cloud Style Telemetry & Platform Standards */}
              <div className="pt-10 border-t border-neutral-200/80 dark:border-white/[0.08] flex flex-col gap-6 w-full">
                <OverviewCards
                  totalEntriesCount={entries.length}
                  entries={entries}
                  ratingSummaries={ratingSummaries}
                  onViewAllEntries={() => {
                    setBrowseAll(true);
                    setActiveView("catalog");
                    setCatalogDisplayMode("assets");
                    setCurrentPage(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
                <ValueProps />
              </div>
            </div>
          ) : (
            /* Google Cloud Console Style Catalog Directory */
            <div className="flex flex-col gap-6 w-full animate-[fadeUp_0.3s_ease-out]">
              {/* Top Google Command Bar & Breadcrumbs */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-200/80 dark:border-white/[0.08]">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <button
                      onClick={() => {
                        setBrowseAll(false);
                        setActiveView("landing");
                        setIsFeatures(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-blue-500 hover:underline cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      <ArrowLeft size={12} />
                      Dashboard
                    </button>
                    <span className="opacity-40">/</span>
                    <span>Resource Directory</span>
                    <span className="opacity-40">/</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">Explorer</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        {catalogDisplayMode === "ecosystems" ? "AI Labs & Ecosystems" : "AI Resource Directory"}
                      </h1>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] tabular-nums">
                        {catalogDisplayMode === "ecosystems" ? `${ecosystemsCount} Ecosystem Portfolios` : `${filtered.length} of ${entries.length} items`}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* View Switcher: Individual vs By Lab */}
                      <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08]">
                        <button
                          onClick={() => {
                            setCatalogDisplayMode("assets");
                            setCurrentPage(1);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            catalogDisplayMode === "assets"
                              ? resolvedTheme === "amoled"
                                ? "bg-white text-black shadow-xs"
                                : "bg-neutral-900 text-white shadow-xs"
                              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                          }`}
                        >
                          <Box size={13} />
                          <span>All Assets & Models</span>
                          <span className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full ${
                            catalogDisplayMode === "assets" ? "bg-white/20 dark:bg-black/20" : "bg-neutral-200/60 dark:bg-white/[0.08]"
                          }`}>
                            {entries.length}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setCatalogDisplayMode("ecosystems");
                            setCurrentPage(1);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            catalogDisplayMode === "ecosystems"
                              ? resolvedTheme === "amoled"
                                ? "bg-white text-black shadow-xs"
                                : "bg-neutral-900 text-white shadow-xs"
                              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                          }`}
                        >
                          <Building2 size={13} className={catalogDisplayMode === "ecosystems" ? "text-blue-400 dark:text-blue-600" : "text-blue-500"} />
                          <span>AI Ecosystems</span>
                          <span className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full ${
                            catalogDisplayMode === "ecosystems" ? "bg-white/20 dark:bg-black/20" : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          }`}>
                            {ecosystemsCount}
                          </span>
                        </button>
                      </div>

                      {catalogDisplayMode === "assets" && (
                        <div className="w-full sm:w-72 shrink-0">
                          <SearchBar
                            query={searchInput}
                            onChange={handleSearchChange}
                            entries={entries}
                            onSelect={handleSearchSelect}
                            showDropdown={false}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {catalogDisplayMode === "ecosystems" ? (
                <div className="w-full pb-16">
                  <EcosystemsSection
                    entries={entries}
                    onSelectEntry={(entry) => setSelected(entry)}
                    bookmarks={bookmarks}
                    onToggleBookmark={handleToggleBookmark}
                    ratingSummaries={ratingSummaries}
                  />
                </div>
              ) : (
                /* Main Content: Left Filter Sidebar + Right Asset Grid */
                <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
                {/* Left Pane: Google Cloud Style Resource Filter */}
                <div className="hidden lg:block w-64 shrink-0 sticky top-20">
                  <Sidebar
                    entries={entries}
                    currentFilter={typeFilter}
                    currentTask={taskFilter}
                    typeFilters={typeFilters}
                    taskFilters={taskFilters}
                    popularOnly={popularOnly}
                    filteredCount={filtered.length}
                    onTypeFilter={setTypeFilter}
                    onTaskFilter={setTaskFilter}
                    onPopularToggle={() => setPopularOnly((p) => !p)}
                    savedOnly={savedOnly}
                    savedCount={bookmarks.length}
                    onSavedToggle={handleSavedToggle}
                    catalogDisplayMode={catalogDisplayMode}
                    onSelectDisplayMode={(m) => {
                      setCatalogDisplayMode(m);
                      setCurrentPage(1);
                    }}
                    ecosystemsCount={ecosystemsCount}
                    onResetFilters={() => {
                      setTypeFilter("All");
                      setTaskFilter("All Tasks");
                      setPopularOnly(false);
                      setSavedOnly(false);
                      setSearchInput("");
                      setCurrentPage(1);
                    }}
                  />
                </div>

                {/* Right Pane: Results Grid & Controls */}
                <div className="flex-1 min-w-0 pb-16">
                  {/* Mobile filter toggle button */}
                  <div className="flex mb-4 lg:hidden">
                    <button
                      onClick={() => setShowMobileSidebar(true)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs cursor-pointer"
                    >
                      <Filter size={13} />
                      Filter Resources
                      {(typeFilter !== "All" || taskFilter !== "All Tasks" || popularOnly || savedOnly) && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 ml-1" />
                      )}
                    </button>
                  </div>

                  {/* AI Ecosystems Callout in All Entries Section */}
                  <div className="mb-6 p-4 rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] dark:bg-blue-500/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Building2 size={19} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                            Explore AI Labs & Ecosystems
                          </h3>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            {ecosystemsCount} AI Organizations
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                          Discover foundation models and tools grouped by OpenAI, Google DeepMind, Anthropic, Meta, DeepSeek, Mistral &amp; 200+ more.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCatalogDisplayMode("ecosystems");
                        setCurrentPage(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 transition-all cursor-pointer shadow-xs"
                    >
                      <Building2 size={13} />
                      <span>View AI Ecosystems</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  {filtered.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/50 dark:bg-white/[0.01] flex flex-col items-center justify-center my-6">
                      <p className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                        No resources matched your criteria
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 max-w-sm">
                        No assets found for the selected category or keywords. Try expanding your search or resetting filters.
                      </p>
                      <button
                        onClick={() => {
                          setTypeFilter("All");
                          setTaskFilter("All Tasks");
                          setPopularOnly(false);
                          setSavedOnly(false);
                          setSearchInput("");
                          setCurrentPage(1);
                        }}
                        className="px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black shadow-xs cursor-pointer hover:opacity-90 transition-all"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8">
                      {/* Picked For You Section (if applicable) */}
                      {pageForYou.length > 0 && (
                        <section>
                          <div className="flex items-center justify-between gap-3 mb-4 pb-2 border-b border-neutral-100 dark:border-white/[0.04]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-amber-500" />
                              <h2 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
                                Picked For You
                              </h2>
                            </div>
                            <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                              {personalized.forYou.length} matched profile
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {pageForYou.map((entry, i) => (
                              <EntryCard
                                key={entry.name}
                                entry={entry}
                                entryName={entry.name}
                                onSelect={selectEntryByName}
                                index={i}
                                ratingSummary={ratingSummaries[entry.name]}
                                isBookmarked={bookmarks.includes(entry.name)}
                                onToggleBookmark={handleToggleBookmark}
                              />
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Main Explore Section */}
                      <section>
                        {pageForYou.length > 0 && (
                          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-100 dark:border-white/[0.04]">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <h2 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
                              All Resources
                            </h2>
                          </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {pageExplore.map((entry, i) => (
                            <EntryCard
                              key={entry.name}
                              entry={entry}
                              entryName={entry.name}
                              onSelect={selectEntryByName}
                              index={i + pageForYou.length}
                              ratingSummary={ratingSummaries[entry.name]}
                              isBookmarked={bookmarks.includes(entry.name)}
                              onToggleBookmark={handleToggleBookmark}
                            />
                          ))}
                        </div>
                      </section>

                      {/* Rich Pagination Footer in Catalog View */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200/80 dark:border-white/[0.08] mt-4">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                          <span>
                            Showing <strong className="font-semibold text-neutral-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)}</strong> of <strong className="font-semibold text-neutral-900 dark:text-white">{filtered.length}</strong> resources <span className="opacity-75 font-normal">(Page {currentPage} of {totalPages})</span>
                          </span>
                          <span className="opacity-40">·</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px]">Per page:</span>
                            {[12, 24, 48].map((size) => (
                              <button
                                key={size}
                                onClick={() => {
                                  setItemsPerPage(size);
                                  setCurrentPage(1);
                                }}
                                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                                  itemsPerPage === size
                                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04]"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {totalPages > 1 && (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setCurrentPage((p) => Math.max(1, p - 1));
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              disabled={currentPage === 1}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                            >
                              <ChevronLeft size={13} />
                              <span>Previous</span>
                            </button>

                            <div className="flex items-center gap-1">
                              {getVisiblePages(currentPage, totalPages).map((page, idx) => {
                                if (page === "...") {
                                  return (
                                    <span key={`dots-${idx}`} className="px-1.5 text-xs text-neutral-400 select-none">
                                      …
                                    </span>
                                  );
                                }
                                const pageNum = page as number;
                                const isCurrent = pageNum === currentPage;
                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => {
                                      setCurrentPage(pageNum);
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className={`min-w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                      isCurrent
                                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                                        : "border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05]"
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              })}
                            </div>

                            <button
                              onClick={() => {
                                setCurrentPage((p) => Math.min(totalPages, p + 1));
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              disabled={currentPage === totalPages}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                            >
                              <span>Next</span>
                              <ChevronRight size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      )}

      {/* ─── Global Footer ─── */}
      <footer className={`relative z-10 border-t ${
        resolvedTheme === 'amoled' 
          ? 'border-white/10 bg-[#171717] text-neutral-300' 
          : 'border-neutral-300/80 bg-[#f8f9fa] text-neutral-700'
      }`}>
        {/* Tier 1: Status & Directory Strip */}
        <div className={`px-4 sm:px-8 xl:px-12 py-3 border-b ${
          resolvedTheme === 'amoled' 
            ? 'border-white/10 bg-[#141517] text-neutral-400' 
            : 'border-neutral-200/90 bg-[#f1f3f4] text-neutral-600'
        } text-xs flex flex-wrap items-center justify-between gap-3`}>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">Global AI Directory</span>
            <span className="opacity-30">•</span>
            <span>Worldwide index of AI foundation models, frameworks & tooling</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Systems Operational ({entries.length > 0 ? entries.length : staticEntries.length} Assets Verified)
            </div>
            <span className="opacity-30 hidden sm:inline">•</span>
            <span className="hidden sm:inline font-mono opacity-80">v2.4.0 Live</span>
          </div>
        </div>

        {/* Tier 2: Multi-Column Navigation */}
        <div className="w-full px-4 sm:px-8 xl:px-12 py-10 lg:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Column 1: Brand & Overview (Col span 2) */}
            <div className="lg:col-span-2 flex flex-col items-start gap-4">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPrivacy(false);
                  setIsTerms(false);
                  setIsFeatures(false);
                  setIsWizard(false);
                  setIsArena(false);
                  setIsAdminDashboard(false);
                  setSelected(null);
                  setProfileUsername(null);
                  setActiveView("landing");
                  setBrowseAll(false);
                  window.location.hash = "";
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-3 text-neutral-900 dark:text-white hover:opacity-85 transition-opacity"
              >
                <span 
                  className="inline-flex items-center text-neutral-900 dark:text-white tracking-tight"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.45rem", lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  <span className="inline-block transform rotate-180 relative leading-none" style={{ top: "-0.75px" }}>V</span>
                  <span className="leading-none">iVerse</span>
                </span>
                <span className="text-[10px] tracking-wide uppercase font-semibold px-2 py-0.5 rounded-md bg-neutral-200/80 dark:bg-white/10 text-neutral-700 dark:text-neutral-300">
                  Open Directory
                </span>
              </a>

              <p className="text-[13px] leading-relaxed max-w-sm text-neutral-600 dark:text-neutral-400 font-normal">
                Your authoritative, citation-backed compendium for the artificial intelligence universe. Explore verified architectures, benchmark evaluations, licenses, and ecosystem telemetry.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  onClick={() => setIsAdding(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-all shadow-xs cursor-pointer"
                >
                  + Submit AI Tool
                </button>
                <a
                  href="https://github.com/Frozen-47/AiVerse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-neutral-300 dark:border-white/15 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-white/[0.06] transition-all"
                >
                  GitHub Repository
                </a>
              </div>
            </div>

            {/* Column 2: Platform Products */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 tracking-wide uppercase">
                Platform
              </h4>
              <ul className="flex flex-col gap-2.5 text-[13px] text-neutral-600 dark:text-neutral-400">
                <li>
                  <button 
                    onClick={() => { 
                      setIsFeatures(false); setIsPrivacy(false); setIsTerms(false); setIsWizard(false); setIsArena(false); setIsAdminDashboard(false); setSelected(null); setProfileUsername(null); setBrowseAll(true); setActiveView("catalog"); setCatalogDisplayMode("assets"); setTypeFilter("All"); setTaskFilter("All Tasks"); setPopularOnly(false); setSavedOnly(false); window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    AI Directory
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      setIsFeatures(false); setIsPrivacy(false); setIsTerms(false); setIsWizard(false); setIsArena(false); setIsAdminDashboard(false); setSelected(null); setProfileUsername(null); setBrowseAll(true); setActiveView("catalog"); setCatalogDisplayMode("ecosystems"); window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    AI Labs & Ecosystems
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      setIsArena(true); setIsFeatures(false); setIsPrivacy(false); setIsTerms(false); setIsWizard(false); setIsAdminDashboard(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Compare Arena
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      setIsWizard(true); setIsFeatures(false); setIsPrivacy(false); setIsTerms(false); setIsArena(false); setIsAdminDashboard(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Wizard Finder
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      setIsPlayground(true); setIsWizard(false); setIsFeatures(false); setIsPrivacy(false); setIsTerms(false); setIsArena(false); setIsAdminDashboard(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Model Playground
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      setIsFeatures(true); setIsPrivacy(false); setIsTerms(false); setIsWizard(false); setIsArena(false); setIsAdminDashboard(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Features Suite
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources & Community */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 tracking-wide uppercase">
                Resources
              </h4>
              <ul className="flex flex-col gap-2.5 text-[13px] text-neutral-600 dark:text-neutral-400">
                <li>
                  <button 
                    onClick={() => setIsAdding(true)} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Submit a Tool
                  </button>
                </li>
                <li>
                  <a 
                    href="https://github.com/Frozen-47/AiVerse/blob/main/Contributing.md" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    Contributing Guide
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/Frozen-47/AiVerse/issues" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    Report an Issue
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/Frozen-47/AiVerse" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    Open Source Code
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal & Policy */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 tracking-wide uppercase">
                Legal
              </h4>
              <ul className="flex flex-col gap-2.5 text-[13px] text-neutral-600 dark:text-neutral-400">
                <li>
                  <button 
                    onClick={() => { 
                      setIsPrivacy(true); setIsTerms(false); setIsFeatures(false); setIsWizard(false); setIsArena(false); setIsAdminDashboard(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      setIsTerms(true); setIsPrivacy(false); setIsFeatures(false); setIsWizard(false); setIsArena(false); setIsAdminDashboard(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <a 
                    href="https://github.com/Frozen-47/AiVerse/blob/main/LICENSE" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    MIT License
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:frozennheart47@gmail.com" 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    Contact Maintainer
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Tier 3: Iconic Google Bottom Bar */}
        <div className={`px-4 sm:px-8 xl:px-12 py-3.5 border-t ${
          resolvedTheme === 'amoled' 
            ? 'border-white/10 bg-[#121212]' 
            : 'border-neutral-200 bg-[#f2f2f2]'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-neutral-500 dark:text-neutral-400">
            {/* Left: Google-style Copyright & Core Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                © {new Date().getFullYear()} AiVerse
              </span>
              <button
                onClick={() => {
                  setIsFeatures(true); setIsPrivacy(false); setIsTerms(false); setIsWizard(false); setIsArena(false); setIsAdminDashboard(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors"
              >
                About
              </button>
              <button
                onClick={() => setIsAdding(true)}
                className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors"
              >
                Submit Tool
              </button>
              <a
                href="https://github.com/Frozen-47/AiVerse"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:frozennheart47@gmail.com"
                className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Right: Google-style Privacy / Terms / Theme Toggle */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2">
              <button
                onClick={() => {
                  setIsPrivacy(true); setIsTerms(false); setIsFeatures(false); setIsWizard(false); setIsArena(false); setIsAdminDashboard(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => {
                  setIsTerms(true); setIsPrivacy(false); setIsFeatures(false); setIsWizard(false); setIsArena(false); setIsAdminDashboard(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors"
              >
                Terms
              </button>
              <button
                onClick={() => {
                  setTheme(resolvedTheme === "amoled" ? "light" : "amoled");
                }}
                className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors flex items-center gap-1.5"
                title="Toggle Light/Dark Theme"
              >
                <span>Theme: {resolvedTheme === "amoled" ? "Dark" : "Light"}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {isAdding && (
        <Suspense fallback={null}>
          <AddModal
            typeFilters={staticTypeFilters}
            taskFilters={staticTaskFilters}
            onClose={() => setIsAdding(false)}
            onSubmit={handleAdd}
          />
        </Suspense>
      )}

      {/* Global Toast Notification */}
      {showBackendToast && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 animate-[fadeUp_0.2s_ease-out]">
          <div className={`p-4 rounded-xl border flex flex-col gap-1 text-[13px] font-medium shadow-2xl backdrop-blur-xl ${t.successToast}`}>
            <div className="flex items-center gap-3">
              <Check size={18} className="shrink-0 text-emerald-400" />
              <span>Entry submitted successfully!</span>
            </div>
            <span className={`pl-7 text-[11px] opacity-80`}>
              It will appear here once approved by an admin.
            </span>
          </div>
        </div>
      )}

      {isLoaded && user && showOnboarding && (
        <WelcomeOnboarding onComplete={handleProfileComplete} />
      )}

      {profileUsername && (
        <UserProfileModal
          username={profileUsername}
          onClose={() => setProfileUsername(null)}
          onViewEntry={(entry) => {
            setSelected(entry);
            setProfileUsername(null);
          }}
        />
      )}

      {showLoginForPrefs && (
        <PreferencesLoginPrompt onClose={() => setShowLoginForPrefs(false)} />
      )}

      {showLoginForBookmarks && (
        <PreferencesLoginPrompt
          onClose={() => setShowLoginForBookmarks(false)}
          label="Saved entries"
          title="Sign in to save entries"
          description="Bookmarks sync to your account so you can access them on any device. Use Saved only in the sidebar to filter your list."
        />
      )}

      {prefsToast && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 animate-[fadeUp_0.2s_ease-out]">
          <div className={`p-4 rounded-xl border flex items-center gap-3 text-[13px] font-medium shadow-2xl backdrop-blur-xl ${t.successToast}`}>
            <Check size={18} className="shrink-0 text-emerald-400" />
            <span>Preferences saved — your feed is updated.</span>
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        <ChatWidget
          entryNames={entryNames}
          onEntrySelect={selectEntryByName}
          entries={entries}
          isChatRoute={isChat}
          onNavigateToChat={() => {
            setIsChat(true);
            setIsPrivacy(false);
            setIsTerms(false);
            setIsFeatures(false);
            setIsWizard(false);
            setIsArena(false);
            setIsPlayground(false);
            setIsAdminDashboard(false);
          }}
          onExitChatRoute={() => {
            setIsChat(false);
          }}
        />
      </Suspense>

      {selected && (
        <Suspense fallback={null}>
          <DetailModal
            entry={selected}
            onClose={() => setSelected(null)}
            onRatingSummaryChange={handleRatingSummaryChange}
            relatedEntries={relatedForSelected}
            onSelectRelated={setSelected}
            isBookmarked={bookmarks.includes(selected.name)}
            onToggleBookmark={() => handleToggleBookmark(selected.name)}
            compareCandidates={compareCandidatesForSelected}
            onViewProfile={(uname) => {
              setProfileUsername(uname);
            }}
            onOpenPlayground={() => {
              setSelected(null);
              setIsChat(false);
              setIsPlayground(true);
              setIsWizard(false);
              setIsFeatures(false);
              setIsPrivacy(false);
              setIsTerms(false);
              setIsArena(false);
              setIsAdminDashboard(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </Suspense>
      )}

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowMobileSidebar(false)}
          />
          <div className={`relative flex w-[85%] max-w-sm flex-col overflow-y-auto px-6 py-6 shadow-2xl no-scrollbar ${t.modal} border-r ${t.border} animate-[slideRight_0.3s_ease-out]`}>
            <div className="flex items-center justify-between mb-8 shrink-0">
              <h2 className={`text-lg font-bold tracking-tight ${t.textPrimary}`}>Filters</h2>
              <div className="flex items-center gap-1">
                {(typeFilter !== "All" || taskFilter !== "All Tasks" || popularOnly || savedOnly) && (
                  <button
                    onClick={() => { setTypeFilter("All"); setTaskFilter("All Tasks"); setPopularOnly(false); setSavedOnly(false); }}
                    className={`text-[11px] font-semibold underline underline-offset-2 ${t.textAccent} hover:text-white transition-colors mr-1`}
                  >
                    Clear All
                  </button>
                )}
                <button 
                  onClick={() => setShowMobileSidebar(false)}
                  className={`p-2 rounded-full border transition-colors ${t.surface} ${t.border} ${t.textMuted} hover:${t.textPrimary} hover:bg-white/5`}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <Sidebar
              entries={entries}
              currentFilter={typeFilter}
              currentTask={taskFilter}
              typeFilters={typeFilters}
              taskFilters={taskFilters}
              popularOnly={popularOnly}
              filteredCount={filtered.length}
              onTypeFilter={setTypeFilter}
              onTaskFilter={setTaskFilter}
              onPopularToggle={() => setPopularOnly((p) => !p)}
              savedOnly={savedOnly}
              savedCount={bookmarks.length}
              onSavedToggle={handleSavedToggle}
              catalogDisplayMode={catalogDisplayMode}
              onSelectDisplayMode={(m) => {
                setCatalogDisplayMode(m);
                setShowMobileSidebar(false);
                setCurrentPage(1);
              }}
              ecosystemsCount={ecosystemsCount}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
    </>
  );
};

// ─── Root App (provides context) ──────────────────────────────────────────────
const THEME_KEY = "aiverse_theme";

const getOsPreference = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "amoled" : "light";

const resolveTheme = (t: Theme): "amoled" | "light" =>
  t === "system" ? getOsPreference() : t === "amoled" ? "amoled" : "light";

const App: React.FC = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY) as Theme | null;
      if (saved === "amoled" || saved === "light" || saved === "system") return saved;
    } catch {}
    return "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"amoled" | "light">(() =>
    resolveTheme(theme)
  );

  // Re-resolve when OS preference changes (matters when theme === "system")
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        document.documentElement.classList.add("no-transitions");
        setResolvedTheme(e.matches ? "amoled" : "light");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.documentElement.classList.remove("no-transitions");
          });
        });
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = (t: Theme) => {
    document.documentElement.classList.add("no-transitions");
    setThemeState(t);
    setResolvedTheme(resolveTheme(t));
    try { localStorage.setItem(THEME_KEY, t); } catch {}
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("no-transitions");
      });
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      <AuthProvider>
        <Inner />
        <AuthModal />
      </AuthProvider>
    </ThemeContext.Provider>
  );
};

export default App;
