import { supabase } from "./supabase";
import { feedbackUserKey } from "./entryFeedback";

export { feedbackUserKey as bookmarkUserKey };

function isMissingTable(error: { message?: string; code?: string }): boolean {
  return (
    error.code === "42P01" ||
    (error.message?.includes("user_bookmarks") ?? false)
  );
}

export async function fetchUserBookmarks(userKey: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("user_bookmarks")
    .select("entry_name")
    .eq("user_key", userKey)
    .order("created_at", { ascending: false });

  if (error) {
    if (!isMissingTable(error)) {
      console.warn("Failed to load bookmarks from Supabase", error);
    }
    return [];
  }
  return (data ?? []).map((row) => row.entry_name as string);
}

export async function addUserBookmark(
  userKey: string,
  entryName: string,
): Promise<void> {
  const { error } = await supabase.from("user_bookmarks").upsert(
    { user_key: userKey, entry_name: entryName },
    { onConflict: "user_key,entry_name" },
  );
  if (error) throw error;
}

export async function removeUserBookmark(
  userKey: string,
  entryName: string,
): Promise<void> {
  const { error } = await supabase
    .from("user_bookmarks")
    .delete()
    .eq("user_key", userKey)
    .eq("entry_name", entryName);
  if (error) throw error;
}

export async function toggleUserBookmark(
  userKey: string,
  entryName: string,
  current: string[],
): Promise<string[]> {
  if (current.includes(entryName)) {
    await removeUserBookmark(userKey, entryName);
    return current.filter((n) => n !== entryName);
  }
  await addUserBookmark(userKey, entryName);
  return [...current, entryName];
}

export async function mergeLocalBookmarks(
  userKey: string,
  localNames: string[],
): Promise<string[]> {
  const remote = await fetchUserBookmarks(userKey);
  const toAdd = localNames.filter((n) => !remote.includes(n));
  await Promise.all(toAdd.map((name) => addUserBookmark(userKey, name)));
  return [...new Set([...remote, ...localNames])];
}
