import React, { useState, useEffect, useCallback } from "react";
import { Star, MessageSquare, Loader2 } from "lucide-react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { useTokens } from "../lib/theme";
import type { EntryComment, EntryRatingSummary } from "../types";
import {
  feedbackUserKey,
  fetchEntryFeedback,
  postEntryComment,
  upsertEntryRating,
} from "../lib/entryFeedback";

interface EntryFeedbackProps {
  entryName: string;
  onSummaryChange?: (summary: EntryRatingSummary) => void;
}

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function StarRow({
  value,
  onRate,
  interactive,
  size = 18,
}: {
  value: number;
  onRate?: (n: number) => void;
  interactive?: boolean;
  size?: number;
}) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(n)}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(0)}
          className={`transition-transform ${interactive ? "cursor-pointer hover:scale-110 disabled:cursor-default" : "cursor-default"}`}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            size={size}
            className={
              n <= display
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-white/20"
            }
          />
        </button>
      ))}
    </div>
  );
}

export const EntryFeedback: React.FC<EntryFeedbackProps> = ({
  entryName,
  onSummaryChange,
}) => {
  const t = useTokens();
  const { user, isLoaded } = useUser();
  const [summary, setSummary] = useState<EntryRatingSummary>({ average: 0, count: 0 });
  const [userRating, setUserRating] = useState<number | null>(null);
  const [comments, setComments] = useState<EntryComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratingBusy, setRatingBusy] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentBusy, setCommentBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userKey = user ? feedbackUserKey(user.id) : undefined;
  const authorName =
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "User";

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEntryFeedback(entryName, userKey);
      setSummary(data.summary);
      setUserRating(data.userRating);
      setComments(data.comments);
      onSummaryChange?.(data.summary);
    } catch {
      setError("Could not load ratings and comments.");
    } finally {
      setLoading(false);
    }
  }, [entryName, userKey, onSummaryChange]);

  useEffect(() => {
    if (!isLoaded) return;
    void load();
  }, [isLoaded, load]);

  const handleRate = async (rating: number) => {
    if (!user || !userKey) return;
    setRatingBusy(true);
    setError(null);
    try {
      const next = await upsertEntryRating(entryName, userKey, authorName, rating);
      setUserRating(rating);
      setSummary(next);
      onSummaryChange?.(next);
    } catch {
      setError("Failed to save your rating.");
    } finally {
      setRatingBusy(false);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userKey || !commentText.trim()) return;
    setCommentBusy(true);
    setError(null);
    try {
      const comment = await postEntryComment(
        entryName,
        userKey,
        authorName,
        commentText,
      );
      setComments((prev) => [comment, ...prev]);
      setCommentText("");
    } catch {
      setError("Failed to post comment.");
    } finally {
      setCommentBusy(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-10 ${t.textMuted}`}>
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className={`border-t pt-6 space-y-6 ${t.border}`}>
      {/* Ratings */}
      <section>
        <p className={`text-[10px] uppercase tracking-widest mb-3 ${t.textMuted}`}>
          Community rating
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black tabular-nums ${t.textPrimary}`}>
              {summary.count > 0 ? summary.average.toFixed(1) : "—"}
            </span>
            <StarRow value={Math.round(summary.average)} interactive={false} size={16} />
          </div>
          <span className={`text-[12px] ${t.textMuted}`}>
            {summary.count === 0
              ? "No ratings yet"
              : `${summary.count} rating${summary.count === 1 ? "" : "s"}`}
          </span>
        </div>

        {user ? (
          <div className={`mt-4 rounded-2xl border px-4 py-3 ${t.surface} ${t.border}`}>
            <p className={`text-[11px] font-semibold mb-2 ${t.textSecondary}`}>
              {userRating ? "Your rating" : "Rate this entry"}
            </p>
            <div className="flex items-center gap-3">
              <StarRow
                value={userRating ?? 0}
                interactive={!ratingBusy}
                onRate={handleRate}
              />
              {ratingBusy && <Loader2 size={14} className={`animate-spin ${t.textMuted}`} />}
            </div>
          </div>
        ) : (
          <p className={`mt-3 text-[12px] ${t.textMuted}`}>
            <SignInButton mode="modal">
              <button type="button" className={`${t.textAccent} font-semibold hover:underline`}>
                Sign in
              </button>
            </SignInButton>{" "}
            to leave a rating.
          </p>
        )}
      </section>

      {/* Comments */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={14} className={t.textMuted} />
          <p className={`text-[10px] uppercase tracking-widest ${t.textMuted}`}>
            Comments ({comments.length})
          </p>
        </div>

        {user ? (
          <form onSubmit={handleComment} className="mb-5">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your experience with this tool..."
              rows={3}
              maxLength={2000}
              className={`w-full px-4 py-3 rounded-xl border text-[13px] resize-none outline-hidden transition-all ${t.surface} ${t.border} ${t.textPrimary} focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10`}
            />
            <div className="flex items-center justify-between mt-2">
              <span className={`text-[10px] ${t.textMuted}`}>
                {commentText.length}/2000
              </span>
              <button
                type="submit"
                disabled={commentBusy || !commentText.trim()}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${t.btnPrimary} disabled:opacity-50`}
              >
                {commentBusy ? <Loader2 size={14} className="animate-spin" /> : null}
                Post comment
              </button>
            </div>
          </form>
        ) : (
          <p className={`mb-4 text-[12px] ${t.textMuted}`}>
            <SignInButton mode="modal">
              <button type="button" className={`${t.textAccent} font-semibold hover:underline`}>
                Sign in
              </button>
            </SignInButton>{" "}
            to join the discussion.
          </p>
        )}

        {comments.length === 0 ? (
          <p className={`text-[13px] py-6 text-center rounded-2xl border ${t.surface} ${t.border} ${t.textMuted}`}>
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          <ul className="space-y-3 max-h-[280px] overflow-y-auto no-scrollbar pr-1">
            {comments.map((c) => (
              <li
                key={c.id}
                className={`rounded-2xl border px-4 py-3 ${t.surface} ${t.border}`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[12px] font-bold ${t.textPrimary}`}>
                    {c.authorName}
                    {userKey && c.userKey === userKey && (
                      <span className={`ml-1.5 text-[10px] font-normal ${t.textAccent}`}>
                        you
                      </span>
                    )}
                  </span>
                  <time className={`text-[10px] shrink-0 ${t.textMuted}`}>
                    {formatRelativeTime(c.createdAt)}
                  </time>
                </div>
                <p className={`text-[13px] leading-relaxed whitespace-pre-wrap ${t.textSecondary}`}>
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {error && (
        <p className={`text-[12px] ${t.textAccent}`}>{error}</p>
      )}
    </div>
  );
};
