import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  History,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";
import {
  onboardingOptions,
  roleHeadline,
  roleLabel,
  scoreEntry,
  sortByInterestMatch,
  type OnboardingInterest,
  type OnboardingProfile,
} from "../../lib/onboarding";
import { TYPE_GLYPH, useTheme } from "../../lib/theme";
import type { Entry, EntryRatingSummary } from "../../types";

interface DashboardPersonalHubProps {
  entries: Entry[];
  bookmarks: string[];
  recentNames: string[];
  onboardingProfile: OnboardingProfile | null;
  ratingSummaries: Record<string, EntryRatingSummary>;
  isSignedIn: boolean;
  onSelectEntry: (entry: Entry) => void;
  onToggleBookmark: (name: string) => void;
  onViewSaved: () => void;
  onOpenAuth: (mode: "signin" | "signup") => void;
  onOpenWizard: () => void;
  onQuickInterestsChange: (interests: OnboardingInterest[]) => void;
}

type HubTab = "for_you" | "saved" | "recent";

const QUICK_INTERESTS: Array<{ id: OnboardingInterest; label: string }> = [
  { id: "models", label: "Frontier Models" },
  { id: "coding", label: "AI Coding" },
  { id: "multimodal", label: "Multimodal" },
  { id: "frameworks", label: "Frameworks" },
  { id: "datasets", label: "Datasets" },
  { id: "mlops", label: "MLOps" },
  { id: "nlp", label: "NLP" },
];

export const DashboardPersonalHub: React.FC<DashboardPersonalHubProps> = ({
  entries,
  bookmarks,
  recentNames,
  onboardingProfile,
  ratingSummaries,
  isSignedIn,
  onSelectEntry,
  onToggleBookmark,
  onViewSaved,
  onOpenAuth,
  onOpenWizard,
  onQuickInterestsChange,
}) => {
  const { resolvedTheme } = useTheme();
  const isAmoled = resolvedTheme === "amoled";
  const [activeTab, setActiveTab] = useState<HubTab>("for_you");

  const activeInterests = useMemo(
    () => onboardingProfile?.interests ?? [],
    [onboardingProfile],
  );

  const effectiveInterests: OnboardingInterest[] = useMemo(
    () => (activeInterests.length > 0 ? activeInterests : ["models", "coding", "multimodal"]),
    [activeInterests],
  );

  const forYouEntries = useMemo(() => {
    const ranked = sortByInterestMatch(entries, effectiveInterests);
    return ranked.slice(0, 4);
  }, [entries, effectiveInterests]);

  const entryMap = useMemo(() => new Map(entries.map((e) => [e.name, e])), [entries]);

  const savedEntries = useMemo(
    () =>
      bookmarks
        .map((n) => entryMap.get(n))
        .filter((e): e is Entry => Boolean(e))
        .slice(0, 4),
    [bookmarks, entryMap],
  );

  const recentEntries = useMemo(
    () =>
      recentNames
        .map((n) => entryMap.get(n))
        .filter((e): e is Entry => Boolean(e))
        .slice(0, 4),
    [recentNames, entryMap],
  );

  const toggleInterest = (id: OnboardingInterest) => {
    const current = new Set(activeInterests);
    if (current.has(id)) current.delete(id);
    else current.add(id);
    onQuickInterestsChange(Array.from(current));
  };

  const displayedList =
    activeTab === "saved"
      ? savedEntries
      : activeTab === "recent"
      ? recentEntries
      : forYouEntries;

  const interestLabels = new Map(onboardingOptions.interests.map((i) => [i.id, i.label]));

  return (
    <section
      aria-label="Personalized AI Workspace"
      className={`p-5 sm:p-6 rounded-2xl border transition-all text-left ${
        isAmoled
          ? "bg-[#0c0d11] border-white/[0.08]"
          : "bg-white border-neutral-200/85 shadow-xs"
      }`}
    >
      {/* Top Row: Workspace Title + Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200/70 dark:border-white/[0.06]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Sparkles size={14} className="text-indigo-500" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Personal Workspace
            </span>
            {onboardingProfile?.role && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                {roleLabel(onboardingProfile.role)}
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            {onboardingProfile?.role
              ? `Tuned for you: ${roleHeadline(onboardingProfile.role)}`
              : "Tailor Your AI Discovery Feed"}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div
            role="tablist"
            aria-label="Personal workspace tabs"
            className={`inline-flex items-center p-1 rounded-xl border ${
              isAmoled
                ? "bg-[#121319] border-white/[0.08]"
                : "bg-neutral-100 border-neutral-200/80"
            }`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "for_you"}
              onClick={() => setActiveTab("for_you")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "for_you"
                  ? isAmoled
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "bg-white text-indigo-600 shadow-2xs"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-transparent"
              }`}
            >
              <Sparkles size={12} />
              <span>Picked For You</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "saved"
                  ? isAmoled
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "bg-white text-indigo-600 shadow-2xs"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-transparent"
              }`}
            >
              <Bookmark size={12} />
              <span>Saved</span>
              <span className="text-[10px] font-mono opacity-80">({bookmarks.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "recent"}
              onClick={() => setActiveTab("recent")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "recent"
                  ? isAmoled
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "bg-white text-indigo-600 shadow-2xs"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-transparent"
              }`}
            >
              <History size={12} />
              <span>Recent</span>
              <span className="text-[10px] font-mono opacity-80">({recentEntries.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenWizard}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isAmoled
                ? "border-white/10 bg-[#121319] text-neutral-200 hover:border-indigo-500/40"
                : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <SlidersHorizontal size={12} className="text-indigo-500" />
            <span>Discovery Wizard</span>
          </button>
        </div>
      </div>

      {/* Quick Interest Tuner (shown under Picked For You) */}
      {activeTab === "for_you" && (
        <div className="flex flex-wrap items-center gap-2 py-3.5">
          <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mr-1">
            Focus areas:
          </span>
          {QUICK_INTERESTS.map((chip) => {
            const selected = activeInterests.includes(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleInterest(chip.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                  selected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                    : isAmoled
                    ? "border-white/[0.08] bg-[#121319] text-neutral-300 hover:border-white/20 hover:text-white"
                    : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
          {activeInterests.length > 0 && (
            <button
              type="button"
              onClick={() => onQuickInterestsChange([])}
              className="text-[11px] font-medium text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 underline ml-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* Content Area */}
      {activeTab === "saved" && !isSignedIn ? (
        <div
          className={`mt-4 p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isAmoled
              ? "bg-[#121319] border-white/[0.07]"
              : "bg-neutral-50/80 border-neutral-200/80"
          }`}
        >
          <div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              Sync Your Saved AI Stack Across Devices
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Sign in to bookmark models, datasets, and frameworks into your persistent builder workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenAuth("signin")}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
          >
            Sign In to Sync Bookmarks
          </button>
        </div>
      ) : displayedList.length === 0 ? (
        <div
          className={`mt-4 p-6 rounded-2xl border text-center ${
            isAmoled
              ? "bg-[#121319] border-white/[0.07]"
              : "bg-neutral-50/80 border-neutral-200/80"
          }`}
        >
          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
            {activeTab === "saved"
              ? "No bookmarked assets yet. Click the bookmark icon on any card to save it here."
              : "No recently inspected tools yet. Click any asset in the showcase to track your history."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mt-2">
          {displayedList.map((entry) => {
            const matchCount =
              activeTab === "for_you" ? scoreEntry(entry, effectiveInterests) : 0;
            const summary = ratingSummaries[entry.name];
            const isBookmarked = bookmarks.includes(entry.name);
            return (
              <div
                key={entry.name}
                onClick={() => onSelectEntry(entry)}
                className={`group p-4 rounded-2xl border flex flex-col justify-between gap-3 cursor-pointer transition-all hover:-translate-y-0.5 ${
                  isAmoled
                    ? "bg-[#121319] border-white/[0.07] hover:border-indigo-500/35 hover:bg-[#161822]"
                    : "bg-neutral-50/75 border-neutral-200/80 hover:bg-white hover:border-indigo-300 shadow-2xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold border shrink-0 ${
                          isAmoled
                            ? "bg-white/[0.05] border-white/10 text-indigo-300"
                            : "bg-indigo-50 border-indigo-200/70 text-indigo-600"
                        }`}
                      >
                        {TYPE_GLYPH[entry.type] ?? "◆"}
                      </span>
                      <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
                        {entry.org}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(entry.name);
                      }}
                      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark asset"}
                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                        isBookmarked
                          ? "text-indigo-500 bg-indigo-500/15"
                          : "text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
                      }`}
                    >
                      <Bookmark size={12} className={isBookmarked ? "fill-current" : ""} />
                    </button>
                  </div>

                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {entry.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                    {entry.description || entry.summary}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-neutral-200/60 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate">
                      {entry.task}
                    </span>
                    {matchCount > 0 && activeInterests.length > 0 && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 shrink-0">
                        {interestLabels.get(activeInterests[0]) ? "Matched" : "Fit"}
                      </span>
                    )}
                    {summary && summary.count > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-amber-500 font-semibold shrink-0">
                        <Star size={10} className="fill-current" />
                        {summary.average.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <ArrowRight
                    size={12}
                    className="text-indigo-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "saved" && bookmarks.length > 0 && (
        <div className="mt-4 pt-3 border-t border-neutral-200/70 dark:border-white/[0.06] flex justify-end">
          <button
            type="button"
            onClick={onViewSaved}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Open all {bookmarks.length} saved resources</span>
            <ArrowRight size={12} />
          </button>
        </div>
      )}
    </section>
  );
};
