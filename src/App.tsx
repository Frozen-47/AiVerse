import React, { useState, useMemo, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { Filter, X, Check, BookOpen, Shield, Sparkles, Cpu, Layers, ArrowRight, ArrowLeft } from "lucide-react";
import { ThemeContext, useTheme } from "./lib/theme";
import { useTokens } from "./lib/theme";
import { Navbar } from "./components/Navbar";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";
import { FeaturesSuite } from "./components/FeaturesSuite";
import { WizardFinder } from "./components/features/WizardFinder";
import { CompareArena } from "./components/features/CompareArena";
import { ValueProps } from "./components/features/ValueProps";
import { Sidebar } from "./components/Sidebar";
import { SearchBar } from "./components/SearchBar";
import { EntryCard } from "./components/EntryCard";
import { WelcomeOnboarding } from "./components/WelcomeOnboarding";
import { UserProfileModal } from "./components/UserProfileModal";
import { PreferencesLoginPrompt } from "./components/PreferencesLoginPrompt";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { AuthModal } from "./components/AuthModal";
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
import { App as CapApp } from '@capacitor/app';

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
import { typeFilters as staticTypeFilters, taskFilters as staticTaskFilters } from "./data";
import {
  partitionByInterests,
  persistOnboardingProfile,
  preferencesUserKey,
  roleHeadline,
  roleLabel,
  sortByInterestMatch,
  type OnboardingProfile,
} from "./lib/onboarding";
import { fetchUserPreferences } from "./lib/supabase";

// ─── Inner app (needs theme context) ─────────────────────────────────────────
const Inner: React.FC = () => {
  const t = useTokens();
  const { resolvedTheme } = useTheme();
  const { user, isLoaded, openAuthModal } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [taskFilters, setTaskFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 220);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("All Tasks");
  const [popularOnly, setPopularOnly] = useState(false);
  const [selected, setSelected] = useState<Entry | null>(null);
  const initialEntrySlugRef = useRef<string | null>(
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("entry")
      : null,
  );
  const [urlSyncReady, setUrlSyncReady] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showBackendToast, setShowBackendToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [onboardingProfile, setOnboardingProfile] = useState<OnboardingProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profileUsername, setProfileUsername] = useState<string | null>(() => {
    const migrated = migrateLegacyProfileQueryUrl();
    if (migrated) return migrated;
    return parseProfileUsernameFromLocation();
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
  const [wizardType, setWizardType] = useState<string | null>(null);
  const [wizardLicense, setWizardLicense] = useState<string | null>(null);
  const [showLoginForPrefs, setShowLoginForPrefs] = useState(false);
  const [showLoginForBookmarks, setShowLoginForBookmarks] = useState(false);
  const [prefsToast, setPrefsToast] = useState(false);
  const [ratingSummaries, setRatingSummaries] = useState<
    Record<string, EntryRatingSummary>
  >({});

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

    const keywords = goalKeywords[wizardGoal] || [];

    // Filter by type
    let pool = entries.filter(e => e.type === wizardType);

    // Filter by license
    if (wizardLicense === "permissive") {
      pool = pool.filter(e => isPermissiveLicense(e.license));
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

    const results = scored.slice(0, 3).map(s => s.entry);

    // Fallback if no/few results
    if (results.length < 3) {
      const existingNames = new Set(results.map(r => r.name));
      const fallbacks = entries
        .filter(e => e.type === wizardType && !existingNames.has(e.name))
        .filter(e => wizardLicense !== "permissive" || isPermissiveLicense(e.license))
        .sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      
      for (const f of fallbacks) {
        if (results.length >= 3) break;
        results.push(f);
      }
    }

    return results;
  }, [entries, wizardGoal, wizardType, wizardLicense]);

  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;

    (async () => {
      if (!user) {
        if (!cancelled) {
          setOnboardingProfile(null);
          setShowOnboarding(false);
        }
        return;
      }

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

      const fromDb = await fetchUserPreferences(
        preferencesUserKey({ supabaseUserId: user.id }),
      );
      if (fromDb && !cancelled) {
        setOnboardingProfile(fromDb);
        setShowOnboarding(false);
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
    if (val && activeView !== "catalog") {
      setActiveView("catalog");
      setBrowseAll(true);
      setIsPrivacy(false);
      setIsTerms(false);
      setIsFeatures(false);
    }
  };

  const handleSearchSelect = (e: Entry) => {
    setSelected(e);
    setSearchInput("");
    if (activeView !== "catalog") {
      setActiveView("catalog");
      setBrowseAll(true);
      setIsPrivacy(false);
      setIsTerms(false);
      setIsFeatures(false);
    }
  };

  useEffect(() => {
    fetchEntries()
      .then(data => {
        setEntries(data || []);
        setTypeFilters(staticTypeFilters || ["All"]);
        setTaskFilters(staticTaskFilters || ["All Tasks"]);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load catalog from Supabase", err);
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

    if (isPrivacy) {
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
  }, [selected, profileUsername, isPrivacy, isTerms, isWizard, isArena, isFeatures, activeView, browseAll, urlSyncReady]);

  useEffect(() => {
    const handlePopState = () => {
      setIsPrivacy(window.location.pathname === "/privacy" || window.location.pathname === "/privacy/");
      setIsTerms(window.location.pathname === "/terms" || window.location.pathname === "/terms/");
      setIsWizard(window.location.pathname === "/wizard" || window.location.pathname === "/wizard/");
      setIsArena(window.location.pathname === "/arena" || window.location.pathname === "/arena/");
      setIsFeatures(window.location.pathname === "/features" || window.location.pathname === "/features/");
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
    window.scrollTo({ top: 0 });
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

    // Capacitor Back Button Handling
    const backListener = CapApp.addListener('backButton', ({ canGoBack }) => {
      if (selected) {
        setSelected(null);
      } else if (isAdding) {
        setIsAdding(false);
      } else if (showMobileSidebar) {
        setShowMobileSidebar(false);
      } else if (canGoBack) {
        window.history.back();
      } else {
        CapApp.exitApp();
      }
    });

    return () => {
      document.removeEventListener("keydown", handler);
      backListener.then(l => l.remove());
    };
  }, [selected, isAdding, showMobileSidebar]);

  // Sync document body and meta tags for an orderly global theme switch
  useEffect(() => {
    if (resolvedTheme === "amoled") {
      document.documentElement.style.backgroundColor = "#000000";
      document.body.style.backgroundColor = "#000000";
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#000000");
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

  const ITEMS_PER_PAGE = 12;
  const listForPagination = personalized.displayList;
  const totalPages = Math.ceil(listForPagination.length / ITEMS_PER_PAGE);
  const paginatedEntries = listForPagination.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
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
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${t.page}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <p className={`text-sm font-medium tracking-widest uppercase ${t.textMuted}`}>Loading Catalog</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${t.page}`}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full bg-cyan-400/4 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-75 h-100 rounded-full bg-violet-500/3 blur-3xl" />
      </div>

      <Navbar
        onAddEntry={handleAddClick}
        onEditPreferences={handleEditPreferences}
        onViewProfile={setProfileUsername}
        onViewSaved={() => {
          setIsPrivacy(false);
          setIsTerms(false);
          setIsFeatures(false);
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
          setSelected(null);
          setProfileUsername(null);
          setActiveView("landing");
          setBrowseAll(false);
          window.location.hash = "";
        }}
        entryCount={entries.length}
        onboardingProfile={onboardingProfile}
        onSaveProfile={handleProfileComplete}
      />

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
      ) : isWizard ? (
        <div className="w-full px-4 sm:px-6 xl:px-12 py-8 flex flex-col gap-6 animate-[fadeUp_0.4s_ease-out]">
          <div className="mb-2">
            <button
              onClick={() => {
                setIsWizard(false);
                setActiveView("landing");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold border shadow-sm transition-all cursor-pointer backdrop-blur-md ${
                resolvedTheme === 'amoled'
                  ? 'bg-white/5 border-cyan-500/20 text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                  : 'bg-white/80 border-slate-200 text-slate-700 hover:border-cyan-500/30 hover:text-cyan-500'
              }`}
            >
              <ArrowLeft size={14} />
              Back to Dashboard
            </button>
          </div>
          <WizardFinder
            resolvedTheme={resolvedTheme}
            wizardStep={wizardStep}
            setWizardStep={setWizardStep}
            setWizardGoal={setWizardGoal}
            setWizardType={setWizardType}
            setWizardLicense={setWizardLicense}
            wizardRecommendations={wizardRecommendations}
            setSelected={setSelected}
            setTypeFilter={(filter) => setTypeFilter(filter as TypeFilter)}
            setSearchInput={setSearchInput}
            setBrowseAll={setBrowseAll}
            setActiveView={setActiveView}
          />
        </div>
      ) : isArena ? (
        <div className="w-full px-4 sm:px-6 xl:px-12 py-8 flex flex-col gap-6 animate-[fadeUp_0.4s_ease-out]">
          <div className="mb-2">
            <button
              onClick={() => {
                setIsArena(false);
                setActiveView("landing");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold border shadow-sm transition-all cursor-pointer backdrop-blur-md ${
                resolvedTheme === 'amoled'
                  ? 'bg-white/5 border-cyan-500/20 text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                  : 'bg-white/80 border-slate-200 text-slate-700 hover:border-cyan-500/30 hover:text-cyan-500'
              }`}
            >
              <ArrowLeft size={14} />
              Back to Dashboard
            </button>
          </div>
          <CompareArena
            entries={entries}
            resolvedTheme={resolvedTheme}
            compareToolA={compareToolA}
            setCompareToolA={setCompareToolA}
            compareToolB={compareToolB}
            setCompareToolB={setCompareToolB}
            setSelected={setSelected}
          />
        </div>
      ) : isFeatures ? (
        <FeaturesSuite
          entries={entries}
          typeCounts={typeCounts}
          resolvedTheme={resolvedTheme}
          setSelected={setSelected}
          setTypeFilter={(filter) => setTypeFilter(filter as TypeFilter)}
          setSearchInput={setSearchInput}
          setBrowseAll={setBrowseAll}
          setActiveView={setActiveView}
          setSavedOnly={setSavedOnly}
          setPopularOnly={setPopularOnly}
          onBackToHome={() => {
            setIsFeatures(false);
            setActiveView("landing");
            setBrowseAll(false);
          }}
        />
      ) : (
        <div className="w-full px-4 sm:px-6 xl:px-12 py-8">
          {/* Hero */}
          <div className="mb-10">
            <div className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest border rounded-full px-4 py-1.5 mb-5 ${t.surface} ${t.border} ${t.textMuted}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Open-Source AI Knowledge Base · {entries.length} Entities
            </div>
            <h1 className={`text-[clamp(32px,5vw,52px)] font-black leading-[1.05] tracking-[-0.03em] mb-3 ${t.textPrimary}`}>
              Every AI tool,{" "}
              <span className="bg-linear-to-r from-cyan-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                one universe.
              </span>
            </h1>
            <p className={`text-[15px] leading-relaxed max-w-xl font-light ${t.textSecondary}`}>
              {onboardingProfile?.interests.length ? (
                <>
                  Hi{user?.user_metadata?.firstName ? ` ${user.user_metadata.firstName}` : (user?.email ? ` ${user.email.split('@')[0]}` : "")} — here are{" "}
                  {roleHeadline(onboardingProfile.role)} as a{" "}
                  <span className={t.textAccent}>{roleLabel(onboardingProfile.role).toLowerCase()}</span>.
                </>
              ) : (
                "A citation-backed encyclopedia of models, frameworks, datasets, and platforms — built for builders."
              )}
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 max-w-2xl">
            <SearchBar
              query={searchInput}
              onChange={handleSearchChange}
              entries={entries}
              onSelect={handleSearchSelect}
            />
          </div>

          {activeView === "landing" ? (
            <div className="flex flex-col gap-8 animate-[fadeUp_0.4s_ease-out]">
              {/* Premium Action Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1: Browse AI Registry */}
                <button
                  onClick={() => {
                    setBrowseAll(true);
                    setActiveView("catalog");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`group relative overflow-hidden p-8 rounded-3xl border text-left transition-all duration-300 cursor-pointer ${
                    resolvedTheme === 'amoled'
                      ? 'bg-black border-white/8 hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]'
                      : 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-cyan-300'
                  }`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-3.5 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/5 text-cyan-500 mb-6 w-fit transition-colors group-hover:bg-cyan-500/20">
                    <BookOpen size={24} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors ${t.textPrimary}`}>
                    Browse AI Registry
                  </h3>
                  <p className={`text-[13px] leading-relaxed font-light mb-6 ${t.textSecondary}`}>
                    Explore the complete catalog of models, training weights, open datasets, ML developer frameworks, and cloud hosting platforms.
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider ${t.textAccent}`}>
                    Open Catalog <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>

                {/* Card 2: AI Discovery Wizard */}
                <button
                  onClick={() => {
                    if (!user) {
                      openAuthModal("signin");
                    } else {
                      setIsWizard(true);
                    }
                  }}
                  className={`group relative overflow-hidden p-8 rounded-3xl border text-left transition-all duration-300 cursor-pointer ${
                    resolvedTheme === 'amoled'
                      ? 'bg-black border-white/8 hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]'
                      : 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-cyan-300'
                  }`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/5 text-cyan-500 transition-colors group-hover:bg-cyan-500/20">
                      <Sparkles size={24} />
                    </div>
                    {!user && (
                      <span className={`flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                        resolvedTheme === "amoled"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : "bg-amber-50 border-amber-500/15 text-amber-700"
                      }`}>
                        <Shield size={11} className="stroke-[3px]" /> Premium Lock
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors ${t.textPrimary}`}>
                    AI Discovery Wizard
                  </h3>
                  <p className={`text-[13px] leading-relaxed font-light mb-6 ${t.textSecondary}`}>
                    Answer a few questions about your technical goals, stack targets, and licensing requirements to find the ideal AI options.
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider ${t.textAccent}`}>
                    {!user ? "Unlock Wizard (Login)" : "Launch Quiz"} <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>

                {/* Card 3: Side-by-Side Arena */}
                <button
                  onClick={() => {
                    if (!user) {
                      openAuthModal("signin");
                    } else {
                      setIsArena(true);
                    }
                  }}
                  className={`group relative overflow-hidden p-8 rounded-3xl border text-left transition-all duration-300 cursor-pointer ${
                    resolvedTheme === 'amoled'
                      ? 'bg-black border-white/8 hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]'
                      : 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-cyan-300'
                  }`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/5 text-cyan-500 transition-colors group-hover:bg-cyan-500/20">
                      <Cpu size={24} />
                    </div>
                    {!user && (
                      <span className={`flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                        resolvedTheme === "amoled"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : "bg-amber-50 border-amber-500/15 text-amber-700"
                      }`}>
                        <Shield size={11} className="stroke-[3px]" /> Premium Lock
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors ${t.textPrimary}`}>
                    Comparison Arena
                  </h3>
                  <p className={`text-[13px] leading-relaxed font-light mb-6 ${t.textSecondary}`}>
                    Perform head-to-head architectural and technical comparisons side-by-side across our database of advanced machine learning assets.
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider ${t.textAccent}`}>
                    {!user ? "Unlock Arena (Login)" : "Enter Arena"} <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>

                {/* Card 4: Complete Ecosystem Features */}
                <button
                  onClick={() => {
                    window.location.hash = "";
                    setIsFeatures(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`group relative overflow-hidden p-8 rounded-3xl border text-left transition-all duration-300 cursor-pointer ${
                    resolvedTheme === 'amoled'
                      ? 'bg-black border-white/8 hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]'
                      : 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-cyan-300'
                  }`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-3.5 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/5 text-cyan-500 mb-6 w-fit transition-colors group-hover:bg-cyan-500/20">
                    <Layers size={24} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors ${t.textPrimary}`}>
                    Ecosystem Features Suite
                  </h3>
                  <p className={`text-[13px] leading-relaxed font-light mb-6 ${t.textSecondary}`}>
                    Explore category dashboards, system capacity metrics, spotlight highlights, values prop overlays, and all integrated capabilities.
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider ${t.textAccent}`}>
                    Explore Suite <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
              
              {/* Value Propositions */}
              <div className="mt-4">
                <ValueProps resolvedTheme={resolvedTheme} />
              </div>
            </div>
          ) : (
            /* Main layout */
            <div className="flex gap-8 w-full">
              {/* Left pane: Sidebar */}
              <div className="hidden lg:block w-56 shrink-0 pb-8">
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
                />
              </div>

              {/* Right pane: Content */}
              <div className="flex-1 min-w-0 pb-32">
                {/* Back to Dashboard bar */}
                <div className="mb-6">
                  <button
                    onClick={() => {
                      setBrowseAll(false);
                      setActiveView("landing");
                      setIsFeatures(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold border shadow-sm transition-all cursor-pointer backdrop-blur-md ${
                      resolvedTheme === 'amoled'
                        ? 'bg-white/5 border-cyan-500/20 text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                        : 'bg-white/80 border-slate-200 text-slate-700 hover:border-cyan-500/30 hover:text-cyan-500'
                    }`}
                  >
                    <ArrowLeft size={14} />
                    Back to Dashboard
                  </button>
                </div>

                {/* Mobile filters button */}
                <div className="flex mb-5 lg:hidden">
                  <button
                    onClick={() => setShowMobileSidebar(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold border shadow-sm transition-all ${t.surface} ${t.border} ${t.textPrimary} hover:border-cyan-500/30`}
                  >
                    <Filter size={14} />
                    Filters
                    {(typeFilter !== "All" || taskFilter !== "All Tasks" || popularOnly || savedOnly) && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 ml-1 animate-pulse" />
                    )}
                  </button>
                </div>

                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-32 gap-3">
                    <div className={`text-5xl opacity-10 ${t.textPrimary}`}>◌</div>
                    <p className={`text-[14px] ${t.textMuted}`}>No entries match your filters.</p>
                    <button
                      onClick={() => { setTypeFilter("All"); setTaskFilter("All Tasks"); setPopularOnly(false); setSavedOnly(false); setSearchInput(""); }}
                      className={`text-[12px] underline underline-offset-2 ${t.textAccent}`}
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {pageForYou.length > 0 && (
                      <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <h2 className={`text-lg font-bold tracking-tight ${t.textPrimary}`}>
                            Picked for you
                          </h2>
                          <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${t.surface} ${t.border} ${t.textMuted}`}>
                            {personalized.forYou.length} matches
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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

                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-10">
                        <button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${t.surface} ${t.border} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : `hover:${t.textPrimary}`}`}
                        >
                          Prev
                        </button>
                        
                        <span className={`text-[12px] tabular-nums px-3 ${t.textMuted}`}>
                          Page {currentPage} of {totalPages}
                        </span>

                        <button
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${t.surface} ${t.border} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : `hover:${t.textPrimary}`}`}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <footer className="mt-auto relative z-10 border-t border-white/5">
        <div className={`py-6 sm:py-8 ${resolvedTheme === 'amoled' ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl`}>
          <div className="w-full px-4 sm:px-6 xl:px-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Brand & Status */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPrivacy(false);
                  setIsTerms(false);
                  setIsFeatures(false);
                  setSelected(null);
                  setProfileUsername(null);
                  setActiveView("landing");
                  setBrowseAll(false);
                  window.location.hash = "";
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex items-center ${t.textPrimary} hover:opacity-80 transition-opacity`}
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.25rem", lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                <span className="inline-block transform rotate-180 relative" style={{ top: "-0.5px", marginRight: "-0.5px" }}>V</span>
                <span>iVerse</span>
              </a>
              <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase px-2 py-1 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-emerald-400`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Operational
              </div>
            </div>

            {/* Center: Core Navigation */}
            <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-3">
              <button onClick={() => { setIsFeatures(false); setIsPrivacy(false); setIsTerms(false); setSelected(null); setProfileUsername(null); setBrowseAll(true); setActiveView("catalog"); setTypeFilter("All"); setTaskFilter("All Tasks"); setPopularOnly(false); setSavedOnly(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`text-[12px] font-bold ${t.textSecondary} hover:${t.textPrimary} transition-colors cursor-pointer`}>Explore</button>
              <button onClick={() => { setIsFeatures(true); setIsPrivacy(false); setIsTerms(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`text-[12px] font-bold ${t.textSecondary} hover:${t.textPrimary} transition-colors cursor-pointer`}>Features</button>
              <button onClick={() => { setIsPrivacy(true); setIsTerms(false); setIsFeatures(false); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`text-[12px] font-bold ${t.textSecondary} hover:${t.textPrimary} transition-colors cursor-pointer`}>Privacy</button>
              <button onClick={() => setIsAdding(true)} className={`text-[12px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer`}>Submit Tool</button>
            </div>

            {/* Right: Social & Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-5">
                <a href="https://github.com/Frozen-47/AiVerse" target="_blank" rel="noopener noreferrer" className={`text-[12px] font-bold ${t.textSecondary} hover:${t.textPrimary} transition-colors`}>GitHub</a>
                <a href="https://discord.gg/22YKNrS62h" target="_blank" rel="noopener noreferrer" className={`text-[12px] font-bold ${t.textSecondary} hover:${t.textPrimary} transition-colors`}>Discord</a>
              </div>
              <span className={`text-[11px] font-semibold ${t.textMuted}`}>
                © {new Date().getFullYear()} AiVerse
              </span>
            </div>

          </div>
        </div>
      </footer>

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
          />
        </Suspense>
      )}
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
        <div className="fixed bottom-24 right-6 z-50 animate-[fadeUp_0.15s_ease-out]">
          <div className={`p-4 rounded-xl border flex flex-col gap-1 text-[13px] font-medium shadow-2xl backdrop-blur-xl ${t.errorToast}`}>
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
        <div className="fixed bottom-24 left-6 z-50">
          <div className={`p-4 rounded-xl border flex items-center gap-3 text-[13px] font-medium shadow-2xl ${t.errorToast}`}>
            <Check size={18} className="shrink-0 text-emerald-400" />
            <span>Preferences saved — your feed is updated.</span>
          </div>
        </div>
      )}

      {chatEnabled ? (
        <Suspense fallback={null}>
          <ChatWidget
            initialOpen
            entryNames={entryNames}
            onEntrySelect={selectEntryByName}
          />
        </Suspense>
      ) : (
        <button
          type="button"
          onClick={() => setChatEnabled(true)}
          className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center p-2 sm:p-2.5 rounded-full shadow-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-9 sm:h-9"
            aria-hidden="true"
          >
            <path
              d="M6.25 4.75h11.5a2.25 2.25 0 0 1 2.25 2.25v6.25a2.25 2.25 0 0 1-2.25 2.25H11.5l-3.75 3.25V15.5H6.25a2.25 2.25 0 0 1-2.25-2.25V7a2.25 2.25 0 0 1 2.25-2.25Z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <path
              d="M12 8.25l.85 1.7 1.9.75-1.9.75-.85 1.7-.85-1.7-1.9-.75 1.9-.75.85-1.7Z"
              fill="currentColor"
            />
          </svg>
          <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="overflow-hidden whitespace-nowrap">
              <span className="pl-2 pr-1 font-medium text-[13px] sm:text-[15px] block">Ask Vox</span>
            </div>
          </div>
        </button>
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
        <AuthModal />
        <Inner />
      </AuthProvider>
    </ThemeContext.Provider>
  );
};

export default App;
