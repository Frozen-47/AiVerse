import { supabase } from "./supabase";
import type {
  EntryComment,
  EntryFeedbackData,
  EntryRatingSummary,
} from "../types";

type CommentRow = {
  id: string;
  entry_name: string;
  user_key: string;
  author_name: string;
  body: string;
  created_at: string;
};

function mapComment(row: CommentRow): EntryComment {
  return {
    id: row.id,
    entryName: row.entry_name,
    userKey: row.user_key,
    authorName: row.author_name,
    body: row.body,
    createdAt: row.created_at,
  };
}

function buildSummary(ratings: number[]): EntryRatingSummary {
  if (!ratings.length) return { average: 0, count: 0 };
  const sum = ratings.reduce((a, b) => a + b, 0);
  return {
    average: Math.round((sum / ratings.length) * 10) / 10,
    count: ratings.length,
  };
}

export function feedbackUserKey(clerkUserId: string): string {
  return `clerk_${clerkUserId}`;
}

export async function fetchRatingSummaries(): Promise<
  Record<string, EntryRatingSummary>
> {
  const { data, error } = await supabase
    .from("entry_ratings")
    .select("entry_name, rating");

  if (error) {
    console.warn("Failed to load rating summaries", error);
    return {};
  }

  const byEntry: Record<string, number[]> = {};
  for (const row of data ?? []) {
    const name = row.entry_name as string;
    if (!byEntry[name]) byEntry[name] = [];
    byEntry[name].push(row.rating as number);
  }

  const result: Record<string, EntryRatingSummary> = {};
  for (const [name, ratings] of Object.entries(byEntry)) {
    result[name] = buildSummary(ratings);
  }
  return result;
}

function isMissingTableError(error: { code?: string; message?: string }): boolean {
  return (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    (error.message?.includes("entry_ratings") ?? false) ||
    (error.message?.includes("entry_comments") ?? false)
  );
}

export async function fetchEntryFeedback(
  entryName: string,
  userKey?: string,
): Promise<EntryFeedbackData> {
  const [ratingsRes, commentsRes] = await Promise.all([
    supabase.from("entry_ratings").select("rating, user_key").eq("entry_name", entryName),
    supabase
      .from("entry_comments")
      .select("id, entry_name, user_key, author_name, body, created_at")
      .eq("entry_name", entryName)
      .order("created_at", { ascending: false }),
  ]);

  const tableError = ratingsRes.error ?? commentsRes.error;
  if (tableError && isMissingTableError(tableError)) {
    throw tableError;
  }

  if (ratingsRes.error) console.warn("Failed to load ratings", ratingsRes.error);
  if (commentsRes.error) console.warn("Failed to load comments", commentsRes.error);

  const ratings = (ratingsRes.data ?? []).map((r) => r.rating as number);
  const userRating =
    userKey && ratingsRes.data
      ? (ratingsRes.data.find((r) => r.user_key === userKey)?.rating as number | undefined) ??
        null
      : null;

  return {
    summary: buildSummary(ratings),
    userRating,
    comments: (commentsRes.data ?? []).map((r) => mapComment(r as CommentRow)),
  };
}

export async function upsertEntryRating(
  entryName: string,
  userKey: string,
  authorName: string,
  rating: number,
): Promise<EntryRatingSummary> {
  const { error } = await supabase.from("entry_ratings").upsert(
    {
      entry_name: entryName,
      user_key: userKey,
      author_name: authorName,
      rating,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "entry_name,user_key" },
  );

  if (error) throw error;

  const feedback = await fetchEntryFeedback(entryName, userKey);
  return feedback.summary;
}

export async function postEntryComment(
  entryName: string,
  userKey: string,
  authorName: string,
  body: string,
): Promise<EntryComment> {
  const trimmed = body.trim();
  if (!trimmed) throw new Error("Comment cannot be empty");

  const { data, error } = await supabase
    .from("entry_comments")
    .insert({
      entry_name: entryName,
      user_key: userKey,
      author_name: authorName,
      body: trimmed,
    })
    .select("id, entry_name, user_key, author_name, body, created_at")
    .single();

  if (error) throw error;
  return mapComment(data as CommentRow);
}
