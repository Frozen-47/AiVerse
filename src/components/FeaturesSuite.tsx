import React, { useEffect, useState } from "react";
import { useTokens } from "../lib/theme";
import type { Entry, EntryRatingSummary } from "../types";

import { FeatureHeader }     from "./features/FeatureHeader";
import { CategoryDashboard } from "./features/CategoryDashboard";
import { MetricsBar }        from "./features/MetricsBar";
import { SpotlightGrid }     from "./features/SpotlightGrid";
import { WizardFinder }      from "./features/WizardFinder";
import { CompareArena }      from "./features/CompareArena";

interface FeaturesSuiteProps {
  initialTab?: "overview" | "wizard" | "arena";
  entries: Entry[];
  typeCounts: {
    AI: number;
    Model: number;
    Dataset: number;
    Framework: number;
    Platform: number;
    Popular: number;
  };
  setSelected: (entry: Entry | null) => void;
  setTypeFilter: (filter: string) => void;
  setSearchInput: (input: string) => void;
  setBrowseAll: (browse: boolean) => void;
  setActiveView: (view: "landing" | "catalog") => void;
  setSavedOnly: (saved: boolean) => void;
  setPopularOnly: (popular: boolean) => void;
  onBackToHome: () => void;
  onCloseFeatures: () => void;

  // Wizard Props
  wizardStep: number;
  setWizardStep: (s: number) => void;
  wizardGoal: string | null;
  setWizardGoal: (g: string | null) => void;
  wizardCustomGoal: string;
  setWizardCustomGoal: (g: string) => void;
  wizardType: string | null;
  setWizardType: (t: string | null) => void;
  wizardLicense: string | null;
  setWizardLicense: (l: string | null) => void;
  wizardCustomLicense: string;
  setWizardCustomLicense: (l: string) => void;
  wizardRecommendations: Entry[];

  // Compare Arena Props
  compareToolA: string;
  setCompareToolA: (t: string) => void;
  compareToolB: string;
  setCompareToolB: (t: string) => void;

  // User / Feedback props
  bookmarks: string[];
  onToggleBookmark: (name: string) => void;
  ratingSummaries: Record<string, EntryRatingSummary>;
}

export const FeaturesSuite: React.FC<FeaturesSuiteProps> = (props) => {
  const t = useTokens();
  const [activeTab, setActiveTab] = useState<"overview" | "wizard" | "arena">(
    props.initialTab || "overview"
  );

  const handleBrowseAll = (browse: boolean) => {
    if (browse) {
      props.onCloseFeatures();
    }
    props.setBrowseAll(browse);
  };

  const handleActiveView = (view: "landing" | "catalog") => {
    if (view === "catalog") {
      props.onCloseFeatures();
    }
    props.setActiveView(view);
  };

  // Sync internal tab selection with route-state changes from parent
  useEffect(() => {
    if (props.initialTab) {
      setActiveTab(props.initialTab);
    }
  }, [props.initialTab]);

  // Handle deep-linked scroll on mount if a hash is present
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        setTimeout(() => {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  const tabs = [
    { id: "overview", label: "Ecosystem Overview" },
    { id: "wizard", label: "AI Discovery Wizard" },
    { id: "arena", label: "Comparison Spec Arena" },
  ];

  return (
    <div className="w-full px-4 sm:px-6 xl:px-12 py-8 flex flex-col gap-8 text-left">
      <FeatureHeader onBackToHome={props.onBackToHome} />

      {/* Dynamic Tab Navigator */}
      <div className={`p-1 rounded-[20px] border flex gap-1 w-full max-w-lg shrink-0 backdrop-blur-md transition-all ${t.surface} shadow-sm`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 text-center py-2.5 px-3 rounded-[15px] text-[11px] font-bold tracking-wide transition-all cursor-pointer select-none ${
                isActive
                  ? t.pillActive + " shadow-xs font-extrabold"
                  : t.pillInactive
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-8 animate-[fadeIn_0.3s_ease-out]">
          <CategoryDashboard
            entries={props.entries}
            typeCounts={props.typeCounts}
            setTypeFilter={props.setTypeFilter}
            setSearchInput={props.setSearchInput}
            setBrowseAll={handleBrowseAll}
            setActiveView={handleActiveView}
            setSavedOnly={props.setSavedOnly}
            setPopularOnly={props.setPopularOnly}
          />

          <MetricsBar
            entries={props.entries}
            typeCounts={props.typeCounts}
          />

          <SpotlightGrid
            entries={props.entries}
            setSelected={props.setSelected}
            setBrowseAll={handleBrowseAll}
            setActiveView={handleActiveView}
          />
        </div>
      )}

      {activeTab === "wizard" && (
        <div className="animate-[fadeIn_0.3s_ease-out]">
          <WizardFinder
            wizardStep={props.wizardStep}
            setWizardStep={props.setWizardStep}
            wizardGoal={props.wizardGoal}
            setWizardGoal={props.setWizardGoal}
            wizardCustomGoal={props.wizardCustomGoal}
            setWizardCustomGoal={props.setWizardCustomGoal}
            wizardType={props.wizardType}
            setWizardType={props.setWizardType}
            wizardLicense={props.wizardLicense}
            setWizardLicense={props.setWizardLicense}
            wizardCustomLicense={props.wizardCustomLicense}
            setWizardCustomLicense={props.setWizardCustomLicense}
            wizardRecommendations={props.wizardRecommendations}
            setSelected={props.setSelected}
            setTypeFilter={props.setTypeFilter}
            setSearchInput={props.setSearchInput}
            setBrowseAll={handleBrowseAll}
            setActiveView={handleActiveView}
            bookmarks={props.bookmarks}
            onToggleBookmark={props.onToggleBookmark}
            setCompareToolA={props.setCompareToolA}
            setCompareToolB={props.setCompareToolB}
            setIsArena={() => {
              // Wait, since we are doing routing through state, changing activeTab to arena is cleaner!
              setActiveTab("arena");
            }}
            setIsWizard={() => {
              // Fallback
            }}
          />
        </div>
      )}

      {activeTab === "arena" && (
        <div className="animate-[fadeIn_0.3s_ease-out]">
          <CompareArena
            entries={props.entries}
            compareToolA={props.compareToolA}
            setCompareToolA={props.setCompareToolA}
            compareToolB={props.compareToolB}
            setCompareToolB={props.setCompareToolB}
            setSelected={props.setSelected}
            ratingSummaries={props.ratingSummaries}
            bookmarks={props.bookmarks}
          />
        </div>
      )}

      {/* Footer link */}
      <div className="mt-4 text-center pb-8 shrink-0">
        <button
          onClick={props.onBackToHome}
          className={`text-xs underline underline-offset-4 font-semibold transition-colors cursor-pointer ${t.textSecondary} hover:${t.textPrimary}`}
        >
          Return to Dashboard Homepage
        </button>
      </div>
    </div>
  );
};
