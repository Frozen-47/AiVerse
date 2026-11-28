import React from "react";
import { Megaphone, Sparkles } from "lucide-react";
import type { SiteAnnouncement } from "../../lib/announcements";

interface AdminBroadcastSectionProps {
  announcement: SiteAnnouncement;
  onChange: (updater: (prev: SiteAnnouncement) => SiteAnnouncement) => void;
  onSave: (ann: SiteAnnouncement) => void;
}

const BANNER_VARIANTS: Array<{
  id: SiteAnnouncement["type"];
  label: string;
  previewClass: string;
}> = [
  {
    id: "special",
    label: "Special Gradient",
    previewClass:
      "bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-amber-500/20 border-violet-500/35 text-violet-900 dark:text-white",
  },
  {
    id: "info",
    label: "Info Notice",
    previewClass:
      "bg-sky-500/12 border-sky-500/30 text-sky-800 dark:text-sky-200",
  },
  {
    id: "success",
    label: "Launch / Success",
    previewClass:
      "bg-emerald-500/12 border-emerald-500/30 text-emerald-800 dark:text-emerald-200",
  },
  {
    id: "warning",
    label: "Maintenance Alert",
    previewClass:
      "bg-amber-500/15 border-amber-500/35 text-amber-900 dark:text-amber-200",
  },
];

export const AdminBroadcastSection: React.FC<AdminBroadcastSectionProps> = ({
  announcement,
  onChange,
  onSave,
}) => {
  const activeStyle =
    BANNER_VARIANTS.find((v) => v.id === announcement.type)?.previewClass ||
    BANNER_VARIANTS[0].previewClass;

  return (
    <div className="space-y-4 max-w-3xl">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
          <Megaphone size={18} className="text-indigo-500" />
          <span>Site-Wide Broadcast Studio</span>
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Configure and publish live global alert banners synced across all visitors and signed-in accounts.
        </p>
      </div>

      <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0d11] space-y-5">
        {/* Live Preview */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Live Preview
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                announcement.enabled
                  ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300"
                  : "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500"
              }`}
            >
              {announcement.enabled ? "Currently Live" : "Draft (Hidden)"}
            </span>
          </div>

          <div
            className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between gap-3 ${activeStyle}`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles size={14} className="shrink-0" />
              <span className="truncate">
                {announcement.message || "Enter announcement message below..."}
              </span>
              {announcement.linkUrl && (
                <span className="underline ml-1 font-semibold shrink-0">
                  {announcement.linkText || "Learn more"} →
                </span>
              )}
            </div>
            <span className="text-[11px] opacity-60 shrink-0">Dismiss ✕</span>
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/70 dark:bg-white/[0.02]">
          <div>
            <p className="text-xs font-semibold text-neutral-900 dark:text-white">
              Banner Active State
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Toggle global banner visibility for all visitors
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onChange((prev) => ({ ...prev, enabled: !prev.enabled }))
            }
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              announcement.enabled
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-neutral-200 dark:bg-white/10 text-neutral-600 dark:text-neutral-300"
            }`}
          >
            {announcement.enabled ? "Active" : "Inactive"}
          </button>
        </div>

        {/* Variant Picker */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            Banner Style Variant
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BANNER_VARIANTS.map((variant) => {
              const selected = announcement.type === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({ ...prev, type: variant.id }))
                  }
                  className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    selected
                      ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-200 font-semibold"
                      : "border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Announcement Text
            </label>
            <span className="text-[10px] font-mono text-neutral-400">
              {announcement.message.length}/180
            </span>
          </div>
          <textarea
            value={announcement.message}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, message: e.target.value }))
            }
            rows={2}
            maxLength={180}
            className="w-full p-3 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50/70 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#111319] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
          />
        </div>

        {/* Optional CTA Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              CTA Link Text (Optional)
            </label>
            <input
              type="text"
              value={announcement.linkText || ""}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, linkText: e.target.value }))
              }
              placeholder="e.g. Explore Models"
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50/70 dark:bg-white/[0.03] text-xs text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              CTA Link URL (Optional)
            </label>
            <input
              type="text"
              value={announcement.linkUrl || ""}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, linkUrl: e.target.value }))
              }
              placeholder="e.g. /entries or https://..."
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50/70 dark:bg-white/[0.03] text-xs font-mono text-neutral-900 dark:text-white outline-none focus:border-indigo-500/60"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-white/[0.06]">
          <button
            type="button"
            onClick={() => onSave(announcement)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer shadow-xs transition-colors"
          >
            Save & Broadcast
          </button>
          {announcement.enabled && (
            <button
              type="button"
              onClick={() => onSave({ ...announcement, enabled: false })}
              className="px-3.5 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.05] cursor-pointer transition-colors"
            >
              Deactivate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
