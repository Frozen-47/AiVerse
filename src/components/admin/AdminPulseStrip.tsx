import React from "react";
import {
  Activity,
  ArrowUpRight,
  Clock,
  Layers,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";
import type { NavSectionId } from "./types";

interface AdminPulseStripProps {
  activeNav: NavSectionId;
  totalUsers: number;
  suspendedUsers: number;
  pendingCount: number;
  approvedCount: number;
  featuredCount: number;
  deletionCount: number;
  pipelineCount: number;
  onSelectSection: (sec: NavSectionId) => void;
}

export const AdminPulseStrip: React.FC<AdminPulseStripProps> = ({
  activeNav,
  totalUsers,
  suspendedUsers,
  pendingCount,
  approvedCount,
  featuredCount,
  deletionCount,
  pipelineCount,
  onSelectSection,
}) => {
  const cards = [
    {
      id: "submissions" as NavSectionId,
      label: "Review Queue",
      value: pendingCount,
      hint: pendingCount > 0 ? "Awaiting approval" : "100% caught up",
      icon: <Clock size={16} />,
      accent:
        pendingCount > 0
          ? "from-amber-500/20 via-orange-500/10 to-transparent text-amber-600 dark:text-amber-400 border-amber-500/25"
          : "from-emerald-500/15 via-teal-500/5 to-transparent text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      pillColor:
        pendingCount > 0
          ? "bg-amber-500/15 text-amber-600 dark:text-amber-300"
          : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    },
    {
      id: "directory" as NavSectionId,
      label: "Live Catalog",
      value: approvedCount,
      hint: `${featuredCount} featured spotlights`,
      icon: <Layers size={16} />,
      accent:
        "from-violet-500/15 via-indigo-500/5 to-transparent text-violet-600 dark:text-violet-400 border-violet-500/20",
      pillColor: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
    },
    {
      id: "users" as NavSectionId,
      label: "Registered Builders",
      value: totalUsers,
      hint: suspendedUsers > 0 ? `${suspendedUsers} suspended` : "All accounts active",
      icon: <Users size={16} />,
      accent:
        "from-sky-500/15 via-cyan-500/5 to-transparent text-sky-600 dark:text-sky-400 border-sky-500/20",
      pillColor: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
    },
    {
      id: (deletionCount > 0 ? "deletion_requests" : "audit") as NavSectionId,
      label: deletionCount > 0 ? "Deletion Alerts" : "Pipeline Events",
      value: deletionCount > 0 ? deletionCount : pipelineCount,
      hint: deletionCount > 0 ? "Requires admin review" : "AI Radar & Sync logs",
      icon: deletionCount > 0 ? <ShieldAlert size={16} /> : <Activity size={16} />,
      accent:
        deletionCount > 0
          ? "from-rose-500/20 via-red-500/10 to-transparent text-rose-600 dark:text-rose-400 border-rose-500/30"
          : "from-indigo-500/15 via-blue-500/5 to-transparent text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      pillColor:
        deletionCount > 0
          ? "bg-rose-500/15 text-rose-600 dark:text-rose-300"
          : "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {cards.map((card) => {
        const isCurrent = activeNav === card.id;
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectSection(card.id)}
            className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer bg-white dark:bg-[#0c0d11] ${
              isCurrent
                ? "border-indigo-500/50 dark:border-indigo-400/50 shadow-sm ring-1 ring-indigo-500/20"
                : "border-neutral-200/80 dark:border-white/[0.07] hover:border-neutral-300 dark:hover:border-white/20 hover:-translate-y-0.5"
            }`}
          >
            {/* Ambient corner gradient */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 dark:opacity-50 ${card.accent.split(" ").slice(0, 3).join(" ")}`}
            />

            <div className="relative flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {card.label}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-tight tabular-nums text-neutral-900 dark:text-white">
                    {card.value.toLocaleString()}
                  </span>
                  {card.id === "submissions" && pendingCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-300">
                      <Sparkles size={10} />
                      Action needed
                    </span>
                  )}
                </div>
              </div>

              <div className={`p-2 rounded-xl border border-current/15 ${card.pillColor}`}>
                {card.icon}
              </div>
            </div>

            <div className="relative mt-3 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
              <span>{card.hint}</span>
              <ArrowUpRight
                size={13}
                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-700 dark:text-white"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};
