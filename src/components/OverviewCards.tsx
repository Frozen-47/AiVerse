import React, { useEffect, useState } from "react";
import { useTokens } from "../lib/theme";
import { fetchDashboardStats } from "../lib/dashboard";

interface Stats {
  totalEntries: number;
  totalUsers: number;
  averageRating: number;
}

export const OverviewCards: React.FC = () => {
  const [stats, setStats] = useState<Stats>({ totalEntries: 0, totalUsers: 0, averageRating: 0 });
  const t = useTokens();

  useEffect(() => {
    (async () => {
      const data = await fetchDashboardStats();
      setStats(data);
    })();
  }, []);

  const cards = [
    { label: "Entries", value: stats.totalEntries, icon: "📦" },
    { label: "Users", value: stats.totalUsers, icon: "🧑‍🤝‍🧑" },
    { label: "Avg Rating", value: stats.averageRating.toFixed(2), icon: "⭐" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`p-5 rounded-2xl border transition-all glow-card ${t.surface} ${t.border} ${t.textPrimary}`}
        >
          <div className="flex items-center gap-2 text-2xl mb-2">
            <span>{c.icon}</span>
            <span>{c.label}</span>
          </div>
          <div className="text-3xl font-bold">{c.value}</div>
        </div>
      ))}
    </div>
  );
};
