/** @handle: leading @, then lowercase letters, numbers, underscore, hyphen. */
export const USERNAME_REGEX = /^@[a-z0-9_-]+$/;

export function isValidUsername(username: string): boolean {
  return USERNAME_REGEX.test(username);
}

/** Normalize while typing: keep @, force lowercase slug, strip invalid chars. */
export function normalizeUsernameInput(value: string): string {
  let val = value;
  if (!val.startsWith("@")) {
    val = `@${val.replace(/@/g, "")}`;
  }
  const slug = val.slice(1).toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return `@${slug}`;
}

/** Canonical stored handle (@ + lowercase slug). */
export function normalizeUsernameHandle(username: string): string {
  const slug = (username.startsWith("@") ? username.slice(1) : username)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");
  return `@${slug}`;
}
