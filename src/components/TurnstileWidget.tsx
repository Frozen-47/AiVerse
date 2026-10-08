import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { TURNSTILE_SITE_KEY, loadTurnstileScript, setSessionHumanVerified } from '../lib/turnstile';

interface TurnstileWidgetProps {
  siteKey?: string;
  action?: string;
  theme?: 'auto' | 'light' | 'dark';
  size?: 'normal' | 'compact' | 'flexible';
  className?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (err?: any) => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: 'auto' | 'light' | 'dark';
          size?: 'normal' | 'compact' | 'flexible';
          action?: string;
          callback?: (token: string) => void;
          'error-callback'?: (error: any) => void;
          'expired-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  siteKey = TURNSTILE_SITE_KEY,
  action,
  theme: explicitTheme,
  size = 'normal',
  className = '',
  onVerify,
  onExpire,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  // Compute theme
  const effectiveTheme = explicitTheme || (resolvedTheme === 'amoled' ? 'dark' : 'light');

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        await loadTurnstileScript();
        if (!isMounted || !containerRef.current || !window.turnstile) return;

        // Clean previous widget if it exists
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // ignore
          }
          widgetIdRef.current = null;
        }

        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: effectiveTheme,
          size,
          action,
          callback: (token: string) => {
            if (!isMounted) return;
            setVerified(true);
            setLoading(false);
            setSessionHumanVerified(token);
            onVerify(token);
          },
          'expired-callback': () => {
            if (!isMounted) return;
            setVerified(false);
            onExpire?.();
          },
          'error-callback': (err) => {
            if (!isMounted) return;
            setLoading(false);
            console.warn('Cloudflare Turnstile challenge notice:', err);
            onError?.(err);
          },
        });

        widgetIdRef.current = id;
        setLoading(false);
      } catch (err) {
        if (!isMounted) return;
        setLoading(false);
        onError?.(err);
      }
    }

    init();

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore cleanup errors
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, effectiveTheme, size, action]);

  return (
    <div className={`relative flex flex-col items-center justify-center my-2 ${className}`}>
      {loading && (
        <div className="flex items-center gap-2 py-3 px-4 rounded-xl text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 animate-pulse">
          <Loader2 size={14} className="animate-spin text-[#f6821f]" />
          <span>Connecting to Cloudflare Security...</span>
        </div>
      )}

      {/* The DOM node rendered by Turnstile */}
      <div
        ref={containerRef}
        className={`min-h-[65px] flex justify-center ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}
      />

      {verified && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">
          <ShieldCheck size={13} />
          <span>Verified human connection by Cloudflare</span>
        </div>
      )}
    </div>
  );
};
