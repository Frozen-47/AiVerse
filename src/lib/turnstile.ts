/**
 * Cloudflare Turnstile Configuration & Utilities
 */

export const TURNSTILE_SITE_KEY =
  (import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY as string) ||
  '0x4AAAAAAFRDAAJRONiwdHS3';

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const SESSION_STORAGE_KEY = 'aiverse_cf_turnstile_verified';
const TOKEN_STORAGE_KEY = 'aiverse_cf_turnstile_token';

let scriptPromise: Promise<void> | null = null;

/**
 * Dynamically loads the Cloudflare Turnstile API script once.
 */
export function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  // If turnstile already exists on window
  if ((window as any).turnstile) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise<void>((resolve, reject) => {
    // Check if script tag already exists in DOM
    const existing = document.querySelector(`script[src*="turnstile/v0/api.js"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Cloudflare Turnstile')));
      if ((window as any).turnstile) resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Failed to load Cloudflare Turnstile script'));
    };

    document.head.appendChild(script);
  });

  return scriptPromise;
}

/**
 * Returns true if the visitor's current browser session has already passed Turnstile verification.
 */
export function isSessionHumanVerified(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Store verified status for the current session.
 */
export function setSessionHumanVerified(token?: string): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    if (token) {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  } catch (e) {
    console.warn('Could not save Turnstile verification to sessionStorage', e);
  }
}

/**
 * Get active session Turnstile token if available.
 */
export function getSessionTurnstileToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}
