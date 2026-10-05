import React, { useEffect, useState } from "react";
import { LayoutGrid, Sparkles, ArrowLeftRight, Terminal } from "lucide-react";
import type { Entry, EntryRatingSummary } from "../types";

import { FeatureHeader }     from "./features/FeatureHeader";
import { CategoryDashboard } from "./features/CategoryDashboard";
import { MetricsBar }        from "./features/MetricsBar";
import { SpotlightGrid }     from "./features/SpotlightGrid";
import { WizardFinder }      from "./features/WizardFinder";
import { CompareArena }      from "./features/CompareArena";
import { Playground }        from "./features/Playground";

interface FeaturesSuiteProps {
  initialTab?: "overview" | "wizard" | "arena" | "playground";
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
  onTabChange?: (tab: "overview" | "wizard" | "arena" | "playground") => void;

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
  const [activeTab, setActiveTab] = useState<"overview" | "wizard" | "arena" | "playground">(
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
    { id: "overview", label: "Ecosystem Overview", icon: LayoutGrid },
    { id: "wizard", label: "Discovery Wizard", icon: Sparkles },
    { id: "arena", label: "Comparison Arena", icon: ArrowLeftRight },
    { id: "playground", label: "Model Playground", icon: Terminal },
  ] as const;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6 text-left animate-[fadeUp_0.2s_ease-out]">
      <FeatureHeader onBackToHome={props.onBackToHome} />

      {/* Google Material 3 Segmented Tab Controller */}
      <div className="p-1 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]/60 bg-white dark:bg-[#1e1f20] shadow-xs flex flex-wrap gap-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                props.onTabChange?.(tab.id);
              }}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                isActive
                  ? "bg-[#1a73e8] dark:bg-[#a8c7fa] text-white dark:text-[#041e49] shadow-xs"
                  : "text-[#5f6368] dark:text-[#8e918f] hover:text-[#202124] dark:hover:text-white hover:bg-[#f1f3f4] dark:hover:bg-[#282a2c]"
              }`}
            >
              <Icon size={14} className={isActive ? "text-white dark:text-[#041e49]" : "opacity-70"} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-6 animate-[fadeIn_0.2s_ease-out]">
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
        <div className="animate-[fadeIn_0.2s_ease-out]">
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
              setActiveTab("arena");
            }}
            setIsWizard={() => {}}
          />
        </div>
      )}

      {activeTab === "arena" && (
        <div className="animate-[fadeIn_0.2s_ease-out]">
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

      {activeTab === "playground" && (
        <div className="animate-[fadeIn_0.2s_ease-out]">
          <Playground />
        </div>
      )}

      {/* Footer link */}
      <div className="mt-4 text-center pb-8 shrink-0">
        <button
          onClick={props.onBackToHome}
          className="text-xs font-semibold text-[#5f6368] dark:text-[#8e918f] hover:text-[#1a73e8] dark:hover:text-[#a8c7fa] hover:underline transition-colors cursor-pointer"
        >
          Return to Dashboard Homepage
        </button>
      </div>
    </div>
  );
};
