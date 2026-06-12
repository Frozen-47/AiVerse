import React, { useState } from "react";
import { X, Search, Filter } from "lucide-react";
import { useTokens } from "../lib/theme";

interface DashboardHeaderProps {
  searchInput: string;
  setSearchInput: (s: string) => void;
  setTypeFilter: (type: string) => void;
  setSavedOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setPopularOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchInput,
  setSearchInput,
  setTypeFilter,
  setSavedOnly,
  setPopularOnly,
}) => {
  const t = useTokens();
  const [showFilters, setShowFilters] = useState(false);

  const clearSearch = () => setSearchInput("");

  const toggleFilter = (type: string) => {
    switch (type) {
      case "saved":
        setSavedOnly((prev) => !prev);
        break;
      case "popular":
        setPopularOnly((prev) => !prev);
        break;
      default:
        setTypeFilter(type);
    }
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
      <div className="relative flex-1 min-w-50">
        <input
          type="text"
          placeholder="Search AI tools, models, datasets…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={`w-full p-2 pl-10 rounded-xl border transition-colors ${t.bgPrimary} ${t.textPrimary} focus:outline-none focus:ring-2 focus:ring-black/20`}
        />
        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
        {searchInput && (
          <button onClick={clearSearch} className="absolute right-3 top-2.5">
            <X size={18} className="text-muted-foreground" />
          </button>
        )}
      </div>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center gap-1 px-3 py-2 rounded-xl border ${t.bgSecondary} ${t.textSecondary} hover:${t.bgSecondaryHover} transition-colors`}
      >
        <Filter size={16} /> Filters
      </button>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0 md:ml-4">
          <button
            onClick={() => toggleFilter("AI")}
            className={`px-2 py-1 rounded-full border ${t.textPrimary} ${t.bgPrimary} hover:${t.bgSecondary}`}
          >
            AI
          </button>
          <button
            onClick={() => toggleFilter("Model")}
            className={`px-2 py-1 rounded-full border ${t.textPrimary} ${t.bgPrimary} hover:${t.bgSecondary}`}
          >
            Models
          </button>
          <button
            onClick={() => toggleFilter("saved")}
            className={`px-2 py-1 rounded-full border ${t.textPrimary} ${t.bgPrimary} hover:${t.bgSecondary}`}
          >
            Saved
          </button>
          <button
            onClick={() => toggleFilter("popular")}
            className={`px-2 py-1 rounded-full border ${t.textPrimary} ${t.bgPrimary} hover:${t.bgSecondary}`}
          >
            Popular
          </button>
        </div>
      )}
    </div>
  );
};
