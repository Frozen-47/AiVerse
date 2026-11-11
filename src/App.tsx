import React, { useState, useMemo, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { Filter, X, Check, Sparkles, ArrowLeft, AlertTriangle, Building2, Box, ChevronLeft, ChevronRight, ArrowRight, ShieldAlert } from "lucide-react";
import { ThemeContext, useTheme } from "./lib/theme";
import { useTokens } from "./lib/theme";
import { Navbar } from "./components/Navbar";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";
import { FeaturesSuite } from "./components/FeaturesSuite";
import { LeaderboardView } from "./components/LeaderboardView";
import { FrontierShowcase } from "./components/FrontierShowcase";
import { Sidebar } from "./components/Sidebar";
import { SearchBar } from "./components/SearchBar";
import { EntryCard } from "./components/EntryCard";
import { EcosystemsSection } from "./components/EcosystemsSection";
import { groupEntriesByEcosystem, getNormalizedOrgName } from "./lib/ecosystems";
import { WelcomeOnboarding } from "./components/WelcomeOnboarding";
import { UserProfileModal } from "./components/UserProfileModal";
import { OverviewCards } from "./components/OverviewCards";
import { DailyPulseSection } from "./components/DailyPulseSection";
import { DashboardHero } from "./components/DashboardHero";
import { PreferencesLoginPrompt } from "./components/PreferencesLoginPrompt";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { AuthModal } from "./components/AuthModal";
import { SiteSecurityBadge } from "./components/SiteSecurityBadge";
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
  profilePathSlug,
} from "./lib/entryUrl";
import { useAppRouter, getRouteSeo } from "./lib/router";
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
import { fetchEntries, isAdminUser } from "./lib/supabase";
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
  const { user, isLoaded } = useAuth();
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
  const [selectedEcosystemId, setSelectedEcosystemId] = useState<string | null>(null);
  const { route, entrySlug, navigate } = useAppRouter();
  const [selected, setSelected] = useState<Entry | null>(null);

  const isChat = route.type === "chat";
  const isPrivacy = route.type === "privacy";
  const isTerms = route.type === "terms";
  const isAdminDashboard = route.type === "admin";
  const isFeatures = route.type === "features";
  const isLeaderboard = route.type === "leaderboard";
  const isWizard = route.type === "features" && route.subpage === "wizard";
  const isArena = route.type === "features" && route.subpage === "compare";
  const isPlayground = route.type === "features" && route.subpage === "playground";
  const profileUsername = route.type === "profile" ? route.username : null;
  const isEntries = route.type === "entries";
  const activeView: "landing" | "catalog" = isEntries ? "catalog" : "landing";
  const [adminDashboardKey, setAdminDashboardKey] = useState(0);

  // Synchronize entries tab with catalog display mode & saved filter
  useEffect(() => {
    if (route.type === "entries") {
      if (route.tab === "ecosystems") {
        setCatalogDisplayMode("ecosystems");
        if (route.ecosystem) {
          setSelectedEcosystemId(route.ecosystem);
        }
        setSavedOnly(false);
      } else if (route.tab === "saved") {
        setSavedOnly(true);
        setCatalogDisplayMode("assets");
      } else {
        setCatalogDisplayMode("assets");
        setSavedOnly(false);
      }
    }
  }, [route]);

  const handleSelectEntry = useCallback(
    (entry: Entry | null) => {
      setSelected(entry);
      if (entry) {
        navigate(route, { entry: entry.name });
      } else {
        navigate(route, { entry: null, replace: true });
      }
    },
    [route, navigate]
  );

  const handleViewEcosystem = useCallback(
    (orgName: string) => {
      const normalized = getNormalizedOrgName(orgName);
      setSelectedEcosystemId(normalized);
      setCatalogDisplayMode("ecosystems");
      setCurrentPage(1);
      handleSelectEntry(null);

      const ecoId = normalized.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      navigate(`/entries?view=ecosystems&eco=${encodeURIComponent(ecoId)}`);

      setTimeout(() => {
        if (catalogSectionRef.current) {
          catalogSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 60);
    },
    [navigate, handleSelectEntry]
  );

  // Synchronize selected entry with URL entrySlug
  useEffect(() => {
    if (entrySlug && entries.length) {
      const entry = findEntryBySlug(entries, entrySlug);
      if (entry) {
        setSelected(entry);
      }
    } else if (!entrySlug) {
      setSelected(null);
    }
  }, [entrySlug, entries]);

  const catalogSectionRef = useRef<HTMLDivElement | null>(null);
  const scrollToCatalog = useCallback(() => {
    requestAnimationFrame(() => {
      catalogSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);
  const [isAdding, setIsAdding] = useState(false);
  const [showBackendToast, setShowBackendToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [onboardingProfile, setOnboardingProfile] = useState<OnboardingProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

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
  const [authToast, setAuthToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });
  const prevUserRef = useRef<string | null>(null);
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
        }
        return;
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

      if (prevUserRef.current === null && isLoaded) {
        const name =
          user.user_metadata?.firstName ||
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "there";
        setAuthToast({ show: true, message: `Signed in as ${name}` });
        setTimeout(() => setAuthToast({ show: false, message: "" }), 3500);
      }
      prevUserRef.current = user.id;
    } else {
      if (prevUserRef.current !== null && isLoaded) {
        // User logged out: redirect away from protected / account-specific views
        if (route.type === "admin" || (route.type === "entries" && route.tab === "saved") || route.type === "profile") {
          navigate("/dashboard", { replace: true });
        }
        setAuthToast({ show: true, message: "Signed out successfully." });
        setTimeout(() => setAuthToast({ show: false, message: "" }), 3000);
      }
      prevUserRef.current = null;
    }
  }, [user, isLoaded, route, navigate]);

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
    navigate("/dashboard");
  };

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
  };

  const handleSearchSelect = (e: Entry) => {
    handleSelectEntry(e);
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
      if (entry) handleSelectEntry(entry);
    },
    [entriesByName, handleSelectEntry],
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

  // Dynamic SEO handler using centralized router SEO generator
  useEffect(() => {
    const seo = getRouteSeo(route, selected?.name);
    document.title = seo.title;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", seo.desc);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", seo.desc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://aiverse.frozenn.in${seo.path}`);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://aiverse.frozenn.in${seo.path}`);
  }, [route, selected?.name]);

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
        handleSelectEntry(null);
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
      document.documentElement.style.backgroundColor = "#131417";
      document.body.style.backgroundColor = "#131417";
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#131417");
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
    const skeletonBg = isDark ? "bg-white/[0.07]" : "bg-neutral-200/80";
    const skeletonBorder = isDark ? "border-white/[0.08]" : "border-neutral-200/90";
    const pageBg = isDark ? "bg-black text-white" : "bg-white text-neutral-900";

    return (
      <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${pageBg}`}>
        {/* 1. Navbar Skeleton (Matching Modern Navbar) */}
        <div className={`sticky top-0 z-40 h-16 border-b backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 xl:px-12 ${skeletonBorder} ${isDark ? "bg-black/80" : "bg-white/80"}`}>
          {/* Brand Logo & Asset Pill */}
          <div className="flex items-center gap-3">
            <div className={`w-28 h-6 rounded-md animate-pulse ${skeletonBg}`} />
            <div className={`hidden sm:inline-block w-20 h-5 rounded-full animate-pulse ${skeletonBg}`} />
            {/* Nav Links in Center-Left */}
            <div className="hidden md:flex items-center gap-2 ml-3 pl-3 border-l border-neutral-200/80 dark:border-white/[0.08]">
              <div className={`w-20 h-7 rounded-full animate-pulse ${skeletonBg}`} />
              <div className={`w-24 h-7 rounded-full animate-pulse ${skeletonBg}`} />
              <div className={`w-24 h-7 rounded-full animate-pulse ${skeletonBg}`} />
              <div className={`w-20 h-7 rounded-full animate-pulse ${skeletonBg}`} />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <div className={`hidden md:block w-32 h-7 rounded-full animate-pulse ${skeletonBg}`} />
            <div className={`w-24 h-7 rounded-full animate-pulse ${skeletonBg}`} />
            <div className={`w-8 h-8 rounded-full animate-pulse ${skeletonBg}`} />
          </div>
        </div>

        {activeView === "landing" ? (
          /* 2. Landing View Skeleton (Hero + Frontier Showcase) */
          <div className="w-full flex flex-col">
            {/* Full-Bleed Hero Skeleton (100vh fold) */}
            <div className={`relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-between overflow-hidden border-b ${skeletonBorder} ${isDark ? "bg-black" : "bg-white"}`}>
              <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 text-center max-w-4xl mx-auto w-full">
                {/* Grand Headline Skeleton */}
                <div className={`h-11 sm:h-14 lg:h-16 w-3/4 max-w-2xl rounded-2xl animate-pulse ${skeletonBg}`} />
                <div className={`h-11 sm:h-14 lg:h-16 w-2/3 max-w-xl rounded-2xl animate-pulse mt-3 sm:mt-4 ${skeletonBg}`} />
                
                {/* Subtitle Paragraph Skeleton */}
                <div className={`h-4 w-4/5 max-w-md rounded-md animate-pulse mt-6 ${skeletonBg}`} />
                <div className={`h-4 w-3/5 max-w-sm rounded-md animate-pulse mt-2 ${skeletonBg}`} />

                {/* CTA Button Skeleton */}
                <div className={`h-10 w-44 rounded-full animate-pulse mt-9 ${skeletonBg}`} />

                {/* Verified Telemetry Pill Skeleton */}
                <div className={`h-4 w-36 rounded-md animate-pulse mt-6 ${skeletonBg}`} />
              </div>

              {/* Bottom Ecosystem Marquee Skeleton */}
              <div className="pb-16 pt-4 px-6 overflow-hidden">
                <div className="flex items-center justify-center gap-8 sm:gap-12 opacity-60">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`h-6 w-20 sm:w-24 rounded-lg animate-pulse shrink-0 ${skeletonBg}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Below Fold: Frontier Showcase Skeleton */}
            <div className="w-full max-w-[1880px] 2xl:max-w-[2040px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 space-y-8">
              {/* Category Selector Pill Bar Skeleton */}
              <div className="flex justify-center">
                <div className={`flex items-center gap-1.5 p-1 rounded-2xl border max-w-full overflow-x-auto ${skeletonBorder} ${isDark ? "bg-white/[0.04]" : "bg-neutral-100/80"}`}>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className={`h-8 w-24 sm:w-28 rounded-xl animate-pulse shrink-0 ${skeletonBg}`} />
                  ))}
                </div>
              </div>

              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4">
                <div className="space-y-2">
                  <div className={`h-5 w-36 rounded-full animate-pulse ${skeletonBg}`} />
                  <div className={`h-7 w-64 rounded-xl animate-pulse ${skeletonBg}`} />
                  <div className={`h-4 w-80 rounded-md animate-pulse ${skeletonBg}`} />
                </div>
                <div className={`h-8 w-32 rounded-full animate-pulse ${skeletonBg}`} />
              </div>

              {/* Modern 6-Card Grid (3x2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${skeletonBorder} ${isDark ? "bg-white/[0.02]" : "bg-white"}`}
                    style={{ minHeight: "220px" }}
                  >
                    <div className="space-y-3 w-full">
                      {/* Icon, Title, Type */}
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl shrink-0 animate-pulse ${skeletonBg}`} />
                        <div className="space-y-1.5 flex-1">
                          <div className={`w-2/3 h-4 rounded-md animate-pulse ${skeletonBg}`} />
                          <div className={`w-1/3 h-3 rounded-md animate-pulse ${skeletonBg}`} />
                        </div>
                        <div className={`w-16 h-5 rounded-full animate-pulse ${skeletonBg}`} />
                      </div>
                      {/* Description */}
                      <div className="space-y-2 pt-2">
                        <div className={`w-full h-3 rounded-md animate-pulse ${skeletonBg}`} />
                        <div className={`w-5/6 h-3 rounded-md animate-pulse ${skeletonBg}`} />
                        <div className={`w-4/5 h-3 rounded-md animate-pulse ${skeletonBg}`} />
                      </div>
                    </div>
                    {/* Stats & Footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-neutral-100 dark:border-white/5">
                      <div className="flex gap-2">
                        <div className={`w-14 h-4 rounded-md animate-pulse ${skeletonBg}`} />
                        <div className={`w-16 h-4 rounded-md animate-pulse ${skeletonBg}`} />
                      </div>
                      <div className={`w-20 h-4 rounded-md animate-pulse ${skeletonBg}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 3. Catalog Directory Skeleton (/entries view) */
          <div className="w-full max-w-[1880px] 2xl:max-w-[2040px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 space-y-6">
            {/* Breadcrumbs & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-200/80 dark:border-white/[0.08]">
              <div className="space-y-2">
                <div className={`w-32 h-4 rounded-md animate-pulse ${skeletonBg}`} />
                <div className={`w-56 h-7 rounded-xl animate-pulse ${skeletonBg}`} />
              </div>
              <div className={`w-full sm:w-80 h-10 rounded-xl animate-pulse ${skeletonBg}`} />
            </div>
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`w-24 h-8 rounded-xl shrink-0 animate-pulse ${skeletonBg}`} />
              ))}
            </div>
            {/* Grid of 6 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${skeletonBorder} ${isDark ? "bg-white/[0.02]" : "bg-white"}`}
                  style={{ minHeight: "220px" }}
                >
                  <div className="space-y-3 w-full">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl shrink-0 animate-pulse ${skeletonBg}`} />
                      <div className="space-y-1.5 flex-1">
                        <div className={`w-2/3 h-4 rounded-md animate-pulse ${skeletonBg}`} />
                        <div className={`w-1/3 h-3 rounded-md animate-pulse ${skeletonBg}`} />
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className={`w-full h-3 rounded-md animate-pulse ${skeletonBg}`} />
                      <div className={`w-5/6 h-3 rounded-md animate-pulse ${skeletonBg}`} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-neutral-100 dark:border-white/5">
                    <div className={`w-16 h-4 rounded-md animate-pulse ${skeletonBg}`} />
                    <div className={`w-20 h-4 rounded-md animate-pulse ${skeletonBg}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
        onViewProfile={(uname) => {
          navigate(`/user/${encodeURIComponent(profilePathSlug(uname))}`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onViewSaved={() => {
          navigate("/entries?tab=saved");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onHomeClick={() => {
          navigate("/dashboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onViewAdminDashboard={() => {
          navigate("/admin");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        entryCount={entries.length}
        ecosystemsCount={ecosystemsCount}
        onBrowseAll={() => {
          navigate("/entries");
          setCurrentPage(1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onViewEcosystems={() => {
          navigate("/entries?view=ecosystems");
          setCurrentPage(1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onViewLeaderboard={() => {
          navigate("/leaderboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onViewChat={() => {
          navigate("/chat");
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
          navigate("/dashboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }} />
      ) : isTerms ? (
        <TermsOfService onBackToHome={() => {
          navigate("/dashboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }} />
      ) : isLeaderboard ? (
        <LeaderboardView
          onBackToHome={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSelectEntryByName={(modelName) => {
            const entry = entries.find(e => 
              e.name.toLowerCase() === modelName.toLowerCase() || 
              e.name.toLowerCase().includes(modelName.toLowerCase()) || 
              modelName.toLowerCase().includes(e.name.toLowerCase())
            );
            if (entry) {
              handleSelectEntry(entry);
            }
          }} />
      ) : (isWizard || isArena || isFeatures || isPlayground) ? (
        <FeaturesSuite
          initialTab={isWizard ? "wizard" : isArena ? "arena" : isPlayground ? "playground" : "overview"}
          entries={entries}
          typeCounts={typeCounts}
          setSelected={handleSelectEntry}
          setTypeFilter={(filter) => setTypeFilter(filter as TypeFilter)}
          setSearchInput={setSearchInput}
          setBrowseAll={(browse) => {
            if (browse) navigate("/entries");
            else navigate("/dashboard");
          }}
          setActiveView={(view) => {
            if (view === "catalog") navigate("/entries");
            else navigate("/dashboard");
          }}
          setSavedOnly={setSavedOnly}
          setPopularOnly={setPopularOnly}
          onTabChange={(tab) => {
            if (tab === "arena") navigate("/features/compare");
            else if (tab === "wizard") navigate("/features/wizard");
            else if (tab === "playground") navigate("/features/playground");
            else navigate("/features");
          }}
          onCloseFeatures={() => {
            navigate("/dashboard");
          }}
          onBackToHome={() => {
            navigate("/dashboard");
            window.scrollTo({ top: 0, behavior: "smooth" });
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
      ) : isAdminDashboard ? (
        isAdminUser(user) ? (
          <AdminDashboard
            key={adminDashboardKey}
            initialSection={route.type === "admin" ? route.section : undefined}
            onSectionChange={(sec) => navigate(`/admin?section=${sec}`, { replace: true })}
            onBackToHome={() => {
              navigate("/dashboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onViewEntry={handleSelectEntry}
          />
        ) : (
          <div className="min-h-[70vh] flex items-center justify-center p-6">
            <div className="max-w-md w-full p-8 rounded-2xl border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#1e1f20] text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto border border-red-500/20">
                <ShieldAlert size={28} />
              </div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Administrator Access Required
              </h2>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                {user
                  ? `The signed in account (${user.email}) does not have platform administrator credentials to access the Administrator Console.`
                  : "You must sign in with a verified platform administrator account to access this console."}
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-medium border border-[#dadce0] dark:border-[#3c4043] hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                >
                  Return to AiVerse
                </button>
              </div>
            </div>
          </div>
        )
      ) : activeView === "landing" ? (
        <div className="w-full flex flex-col animate-[fadeUp_0.4s_ease-out]">
          {/* 1. Full-Bleed First Page Hero (Edge-to-Edge & 100vh fold) */}
          <DashboardHero
            totalEntries={entries.length > 0 ? entries.length : staticEntries.length}
            onScrollToCatalog={scrollToCatalog}
          />

          {/* 2. Content Sections Below the Fold */}
          <div className="w-full max-w-[1880px] 2xl:max-w-[2040px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 flex flex-col gap-14 sm:gap-20">
            {/* Curated Frontier Highlights & Ecosystem Showcase */}
            <div ref={catalogSectionRef} className="scroll-mt-20 w-full">
              <FrontierShowcase
                entries={entries}
                onSelectEntry={handleSelectEntry}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                ratingSummaries={ratingSummaries}
                onViewEcosystem={handleViewEcosystem}
                onViewAll={(targetCat) => {
                  if (targetCat === "Ecosystems") {
                    setCatalogDisplayMode("ecosystems");
                    navigate("/entries?view=ecosystems");
                  } else {
                    setCatalogDisplayMode("assets");
                    if (targetCat && targetCat !== "All") {
                      setTypeFilter(targetCat as TypeFilter);
                    }
                    navigate("/entries");
                  }
                  setCurrentPage(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                searchQuery={searchInput}
                activeCategory={catalogDisplayMode === "ecosystems" ? "Ecosystems" : typeFilter}
                onSelectCategory={(cat) => {
                  if (cat === "Ecosystems") {
                    setCatalogDisplayMode("ecosystems");
                  } else {
                    setCatalogDisplayMode("assets");
                    setTypeFilter(cat as TypeFilter);
                  }
                }}
              />
            </div>

            {/* Live Daily AI Pulse & Model Spotlight */}
            <DailyPulseSection entries={entries} onSelectEntry={handleSelectEntry} />

            {/* Clean Platform Telemetry Overview */}
            <div className="pt-8 border-t border-neutral-200/80 dark:border-white/[0.08] w-full">
              <OverviewCards
                totalEntriesCount={entries.length}
                entries={entries}
                ratingSummaries={ratingSummaries}
                onViewAllEntries={() => {
                  navigate("/entries");
                  setCurrentPage(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Google Cloud Console Style Catalog Directory (Expanded Full-Bleed) */
        <div className="w-full max-w-[1880px] 2xl:max-w-[2040px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
          <div className="flex flex-col gap-6 w-full animate-[fadeUp_0.3s_ease-out]">
              {/* Top Google Command Bar & Breadcrumbs */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-200/80 dark:border-white/[0.08]">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <button
                      onClick={() => {
                        navigate("/dashboard");
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
                      <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] w-full sm:w-auto justify-between sm:justify-start">
                        <button
                          onClick={() => {
                            setCatalogDisplayMode("assets");
                            setCurrentPage(1);
                          }}
                          className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            catalogDisplayMode === "assets"
                              ? resolvedTheme === "amoled"
                                ? "bg-white text-black shadow-xs"
                                : "bg-neutral-900 text-white shadow-xs"
                              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                          }`}
                        >
                          <Box size={13} />
                          <span><span className="hidden sm:inline">All </span>Assets</span>
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
                          className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            catalogDisplayMode === "ecosystems"
                              ? resolvedTheme === "amoled"
                                ? "bg-white text-black shadow-xs"
                                : "bg-neutral-900 text-white shadow-xs"
                              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                          }`}
                        >
                          <Building2 size={13} className={catalogDisplayMode === "ecosystems" ? "text-blue-400 dark:text-blue-600" : "text-blue-500"} />
                          <span><span className="hidden sm:inline">AI </span>Ecosystems</span>
                          <span className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.2 rounded-full ${
                            catalogDisplayMode === "ecosystems" ? "bg-white/20 dark:bg-black/20" : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          }`}>
                            {ecosystemsCount}
                          </span>
                        </button>
                      </div>

                      <div className="w-full sm:w-80 md:w-96 lg:w-[460px] xl:w-[520px] shrink-0">
                        <SearchBar
                          query={searchInput}
                          onChange={handleSearchChange}
                          entries={entries}
                          onSelect={handleSearchSelect}
                          showDropdown={false}
                          placeholder={
                            catalogDisplayMode === "ecosystems"
                              ? "Search AI Labs & ecosystems (e.g. OpenAI, DeepSeek)…"
                              : "Search models, frameworks, orgs…"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {catalogDisplayMode === "ecosystems" ? (
                <div className="w-full pb-16">
                  <EcosystemsSection
                    entries={entries}
                    onSelectEntry={handleSelectEntry}
                    bookmarks={bookmarks}
                    onToggleBookmark={handleToggleBookmark}
                    ratingSummaries={ratingSummaries}
                    selectedEcosystemId={selectedEcosystemId}
                    onClearSelectedEcosystem={() => setSelectedEcosystemId(null)}
                    searchQuery={searchInput}
                    onSearchQueryChange={handleSearchChange}
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
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4.5">
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
                                onViewEcosystem={handleViewEcosystem}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4.5">
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
                              onViewEcosystem={handleViewEcosystem}
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

                            {/* Mobile Compact Page Indicator */}
                            <div className="sm:hidden text-xs font-semibold px-2 text-neutral-600 dark:text-neutral-300 tabular-nums">
                              Page {currentPage} of {totalPages}
                            </div>

                            {/* Desktop Number Pills */}
                            <div className="hidden sm:flex items-center gap-1">
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
            <SiteSecurityBadge variant="inline" />
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
                  navigate("/dashboard");
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
                      navigate("/entries");
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    AI Directory
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      navigate("/entries?view=ecosystems");
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    AI Labs & Ecosystems
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      navigate("/features/compare");
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Compare Arena
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      navigate("/features/wizard");
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Wizard Finder
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      navigate("/features/playground");
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Model Playground
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      navigate("/features");
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
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
                      navigate("/privacy");
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }} 
                    className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer text-left transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { 
                      navigate("/terms");
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
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
                  navigate("/features");
                  window.scrollTo({ top: 0, behavior: "smooth" });
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

            {/* Right: Google-style Privacy / Terms / Theme Toggle (with clearance for floating controls) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 sm:pr-36">
              <button
                onClick={() => {
                  navigate("/privacy");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:underline hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => {
                  navigate("/terms");
                  window.scrollTo({ top: 0, behavior: "smooth" });
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
          onClose={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              navigate("/dashboard");
            }
          }}
          onViewEntry={(entry) => {
            handleSelectEntry(entry);
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

      {authToast.show && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 animate-[fadeUp_0.2s_ease-out]">
          <div className={`p-4 rounded-xl border flex items-center gap-3 text-[13px] font-medium shadow-2xl backdrop-blur-xl ${t.successToast}`}>
            <Check size={18} className="shrink-0 text-emerald-400" />
            <span>{authToast.message}</span>
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
            navigate("/chat");
          }}
          onExitChatRoute={() => {
            navigate("/dashboard");
          }}
        />
      </Suspense>

      {selected && (
        <Suspense fallback={null}>
          <DetailModal
            entry={selected}
            onClose={() => handleSelectEntry(null)}
            onRatingSummaryChange={handleRatingSummaryChange}
            relatedEntries={relatedForSelected}
            onSelectRelated={handleSelectEntry}
            isBookmarked={bookmarks.includes(selected.name)}
            onToggleBookmark={() => handleToggleBookmark(selected.name)}
            compareCandidates={compareCandidatesForSelected}
            onViewProfile={(uname) => {
              navigate(`/user/${encodeURIComponent(profilePathSlug(uname))}`);
            }}
            onOpenPlayground={() => {
              navigate("/features/playground");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onViewEcosystem={handleViewEcosystem}
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
          <div className={`relative flex w-[85%] max-w-sm flex-col overflow-y-auto px-5 sm:px-6 py-6 shadow-2xl no-scrollbar ${t.modal} border-r ${t.border} animate-[slideRight_0.3s_ease-out] pb-safe`}>
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className={`text-lg font-bold tracking-tight ${t.textPrimary}`}>Filters</h2>
              <div className="flex items-center gap-1">
                {(typeFilter !== "All" || taskFilter !== "All Tasks" || popularOnly || savedOnly) && (
                  <button
                    onClick={() => { setTypeFilter("All"); setTaskFilter("All Tasks"); setPopularOnly(false); setSavedOnly(false); }}
                    className={`text-[11px] font-semibold underline underline-offset-2 ${t.textAccent} hover:text-white transition-colors mr-1 cursor-pointer`}
                  >
                    Clear All
                  </button>
                )}
                <button 
                  onClick={() => setShowMobileSidebar(false)}
                  className={`p-2 rounded-full border transition-colors ${t.surface} ${t.border} ${t.textMuted} hover:${t.textPrimary} hover:bg-white/5 cursor-pointer`}
                  aria-label="Close filters"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex-1">
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

            {/* Mobile Sticky Apply Button */}
            <div className="sticky bottom-0 pt-4 mt-6 border-t border-neutral-200 dark:border-white/10 bg-inherit pb-2">
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black shadow-xs text-center cursor-pointer hover:opacity-90 transition-opacity"
              >
                Show {filtered.length} Resources
              </button>
            </div>
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
        <SiteSecurityBadge />
      </AuthProvider>
    </ThemeContext.Provider>
  );
};

export default App;
