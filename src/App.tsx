import React, { useState, useMemo, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { Filter, X, Check, MessageCircle, BookOpen, Shield, FileText, ExternalLink, Sparkles } from "lucide-react";
import { ThemeContext, useTheme } from "./lib/theme";
import { useTokens } from "./lib/theme";
import { Navbar } from "./components/Navbar";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";
import { Sidebar } from "./components/Sidebar";
import { SearchBar } from "./components/SearchBar";
import { EntryCard } from "./components/EntryCard";
import { WelcomeOnboarding } from "./components/WelcomeOnboarding";
import { UserProfileModal } from "./components/UserProfileModal";
import { PreferencesLoginPrompt } from "./components/PreferencesLoginPrompt";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { AuthModal } from "./components/AuthModal";
import { VoxLogo } from "./components/VoxLogo";
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
  const { theme } = useTheme();
  const { user, isLoaded } = useAuth();
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
  const [showLoginForPrefs, setShowLoginForPrefs] = useState(false);
  const [showLoginForBookmarks, setShowLoginForBookmarks] = useState(false);
  const [prefsToast, setPrefsToast] = useState(false);
  const [ratingSummaries, setRatingSummaries] = useState<
    Record<string, EntryRatingSummary>
  >({});

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
    if (isPrivacy) {
      url.pathname = "/privacy";
      url.searchParams.delete("entry");
      url.searchParams.delete("user");
    } else if (isTerms) {
      url.pathname = "/terms";
      url.searchParams.delete("entry");
      url.searchParams.delete("user");
    } else if (profileUsername) {
      url.pathname = `/user/${profilePathSlug(profileUsername)}`;
      url.searchParams.delete("user");
    } else {
      if (/\/user\//.test(url.pathname) || url.pathname === "/privacy" || url.pathname === "/terms") {
        url.pathname = "/";
      }
      if (selected) {
        url.searchParams.set("entry", selected.name);
      } else {
        url.searchParams.delete("entry");
      }
    }
    window.history.replaceState({}, "", url);
  }, [selected, profileUsername, isPrivacy, isTerms, urlSyncReady]);

  useEffect(() => {
    const handlePopState = () => {
      setIsPrivacy(window.location.pathname === "/privacy" || window.location.pathname === "/privacy/");
      setIsTerms(window.location.pathname === "/terms" || window.location.pathname === "/terms/");
      setProfileUsername(parseProfileUsernameFromLocation());
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
    if (theme === "amoled") {
      document.documentElement.style.backgroundColor = "#000000";
      document.body.style.backgroundColor = "#000000";
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#000000");
    } else {
      document.documentElement.style.backgroundColor = "#f8fafc";
      document.body.style.backgroundColor = "#f8fafc";
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f8fafc");
    }
  }, [theme]);

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
        onHomeClick={() => {
          setIsPrivacy(false);
          setIsTerms(false);
          setSelected(null);
          setProfileUsername(null);
        }}
        entryCount={entries.length}
        onboardingProfile={onboardingProfile}
        onSaveProfile={handleProfileComplete}
      />

      {isPrivacy ? (
        <PrivacyPolicy onBackToHome={() => setIsPrivacy(false)} />
      ) : isTerms ? (
        <TermsOfService onBackToHome={() => setIsTerms(false)} />
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
              onChange={setSearchInput}
              entries={entries}
              onSelect={(e) => { setSelected(e); setSearchInput(""); }}
            />
          </div>

          {/* Main layout */}
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
        </div>
      )}

      <footer
        className={`mt-auto border-t ${t.border} animate-fade-in-up opacity-0`}
        style={{ animationDelay: '600ms' }}
      >
        {/* Main footer content */}
        <div className="w-full px-4 sm:px-6 xl:px-12 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">
                  Ai<span className="text-cyan-400">Verse</span>
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${t.pillActive}`}>BETA</span>
              </div>
              <p className={`text-[13px] leading-relaxed max-w-xs ${t.textSecondary}`}>
                The open-source encyclopedia for AI tools, models, frameworks, and datasets — curated by the community.
              </p>
              <div className="flex items-center gap-3 mt-1">
                <a
                  href="https://github.com/Frozen-47"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 ${t.surface} ${t.border} ${t.textMuted} hover:text-white hover:border-white/20 hover:scale-105`}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a
                  href="https://discord.com/users/1272910357517701147"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 ${t.surface} ${t.border} ${t.textMuted} hover:text-indigo-400 hover:border-indigo-400/30 hover:scale-105`}
                >
                  <MessageCircle size={15} />
                </a>
              </div>
            </div>

            {/* Explore column */}
            <div className="flex flex-col gap-3">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${t.textMuted}`}>Explore</p>
              <nav className="flex flex-col gap-2.5">
                {[
                  { label: "All Entries", icon: <BookOpen size={13} />, action: () => { setIsPrivacy(false); setIsTerms(false); } },
                  { label: "AI Assistants", icon: <Sparkles size={13} />, action: () => { setIsPrivacy(false); setIsTerms(false); } },
                ].map(({ label, icon, action }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={action}
                    className={`flex items-center gap-2 text-[13px] font-medium text-left transition-all duration-150 w-fit group ${t.textSecondary} hover:${t.textPrimary}`}
                  >
                    <span className={`opacity-50 group-hover:opacity-100 transition-opacity ${t.textAccent}`}>{icon}</span>
                    {label}
                  </button>
                ))}
                <a
                  href="https://github.com/Frozen-47"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-[13px] font-medium transition-all duration-150 w-fit group ${t.textSecondary} hover:${t.textPrimary}`}
                >
                  <span className={`opacity-50 group-hover:opacity-100 transition-opacity ${t.textAccent}`}><ExternalLink size={13} /></span>
                  Contribute on GitHub
                </a>
              </nav>
            </div>

            {/* Legal column */}
            <div className="flex flex-col gap-3">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${t.textMuted}`}>Legal</p>
              <nav className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setIsPrivacy(true); setIsTerms(false); window.scrollTo({ top: 0 }); }}
                  className={`flex items-center gap-2 text-[13px] font-medium text-left transition-all duration-150 w-fit group ${t.textSecondary} hover:${t.textPrimary}`}
                >
                  <span className={`opacity-50 group-hover:opacity-100 transition-opacity ${t.textAccent}`}><Shield size={13} /></span>
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setIsTerms(true); setIsPrivacy(false); window.scrollTo({ top: 0 }); }}
                  className={`flex items-center gap-2 text-[13px] font-medium text-left transition-all duration-150 w-fit group ${t.textSecondary} hover:${t.textPrimary}`}
                >
                  <span className={`opacity-50 group-hover:opacity-100 transition-opacity ${t.textAccent}`}><FileText size={13} /></span>
                  Terms of Service
                </button>
              </nav>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className={`border-t ${t.border} px-4 sm:px-6 xl:px-12 py-4`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className={`text-[11px] ${t.textMuted}`}>
              © {new Date().getFullYear()} AiVerse. Built with passion by{" "}
              <a
                href="https://github.com/Frozen-47"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-cyan-400 transition-colors"
              >
                Sabareesh
              </a>
            </p>
            <p className={`text-[11px] ${t.textMuted}`}>
              Open-source · Community-driven · Always free
            </p>
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
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl text-[13px] font-semibold ${t.btnPrimary}`}
        >
          <VoxLogo size={20} variant="current" className="shrink-0" />
          Ask Vox
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
const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? "amoled" : "light"
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? "amoled" : "light");
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AuthProvider>
        <AuthModal />
        <Inner />
      </AuthProvider>
    </ThemeContext.Provider>
  );
};

export default App;
