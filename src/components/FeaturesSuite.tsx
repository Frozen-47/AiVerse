import React, { useEffect } from "react";
import { useTokens } from "../lib/theme";
import type { Entry } from "../types";

import { FeatureHeader }     from "./features/FeatureHeader";
import { CategoryDashboard } from "./features/CategoryDashboard";
import { MetricsBar }        from "./features/MetricsBar";
import { SpotlightGrid }     from "./features/SpotlightGrid";

interface FeaturesSuiteProps {
  entries: Entry[];
  typeCounts: {
    AI: number;
    Model: number;
    Dataset: number;
    Framework: number;
    Platform: number;
    Popular: number;
  };
  resolvedTheme: string;
  setSelected: (entry: Entry | null) => void;
  setTypeFilter: (filter: string) => void;
  setSearchInput: (input: string) => void;
  setBrowseAll: (browse: boolean) => void;
  setActiveView: (view: "landing" | "catalog") => void;
  setSavedOnly: (saved: boolean) => void;
  setPopularOnly: (popular: boolean) => void;
  onBackToHome: () => void;
}

export const FeaturesSuite: React.FC<FeaturesSuiteProps> = (props) => {
  const t = useTokens();

  // Handle deep-linked scroll on mount if a hash is present (e.g. #wizard)
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

  return (
    <div className="w-full px-4 sm:px-6 xl:px-12 py-8 animate-[fadeUp_0.4s_ease-out] flex flex-col gap-10">

      <FeatureHeader onBackToHome={props.onBackToHome} />

      <CategoryDashboard
        entries={props.entries}
        typeCounts={props.typeCounts}
        resolvedTheme={props.resolvedTheme}
        setTypeFilter={props.setTypeFilter}
        setSearchInput={props.setSearchInput}
        setBrowseAll={props.setBrowseAll}
        setActiveView={props.setActiveView}
        setSavedOnly={props.setSavedOnly}
        setPopularOnly={props.setPopularOnly}
      />

      <MetricsBar
        entries={props.entries}
        typeCounts={props.typeCounts}
        resolvedTheme={props.resolvedTheme}
      />

      <SpotlightGrid
        entries={props.entries}
        resolvedTheme={props.resolvedTheme}
        setSelected={props.setSelected}
        setBrowseAll={props.setBrowseAll}
        setActiveView={props.setActiveView}
      />

      {/* Footer link */}
      <div className="mt-4 text-center pb-8">
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
