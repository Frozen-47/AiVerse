import React, { useEffect, useState } from "react";
import { fetchUserBookmarks } from "../lib/entryBookmarks";
import { useTokens } from "../lib/theme";


export const RecentActivity: React.FC = () => {
  const t = useTokens();
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    // Simple placeholder: fetch recent bookmarks (ids) for demo
    const load = async () => {
      try {
        const data = await fetchUserBookmarks("demo-user"); // adjust if needed
        setBookmarks(data?.slice(0, 5) ?? []);
      } catch (e) {
        console.warn("Failed to load recent activity", e);
      }
    };
    load();
  }, []);

  return (
    <div className="glow-card p-4 rounded-xl border">
      <h3 className={t.textPrimary + " font-bold mb-2"}>Recent Activity</h3>
      {bookmarks.length === 0 ? (
        <p className={t.textSecondary}>No recent activity.</p>
      ) : (
        <ul className="space-y-2">
          {bookmarks.map((id) => (
            <li key={id} className={t.textSecondary}>Bookmark ID: {id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
