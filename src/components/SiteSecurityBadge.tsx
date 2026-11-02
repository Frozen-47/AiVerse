import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Shield, ExternalLink, X } from 'lucide-react';
import { TurnstileWidget } from './TurnstileWidget';
import { isSessionHumanVerified, setSessionHumanVerified } from '../lib/turnstile';

interface SiteSecurityBadgeProps {
  variant?: 'navbar' | 'inline' | 'background';
}

export const SiteSecurityBadge: React.FC<SiteSecurityBadgeProps> = ({ variant = 'background' }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVerified(isSessionHumanVerified());
  }, []);

  // Close popover on outside click or Escape key
  useEffect(() => {
    if (!showInfo) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (badgeRef.current && !badgeRef.current.contains(e.target as Node)) {
        setShowInfo(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowInfo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showInfo]);

  const handleVerify = (token: string) => {
    setSessionHumanVerified(token);
    setIsVerified(true);
  };

  const PopoverContent = (
    <div className="w-68 p-4 bg-white dark:bg-[#1a1b1e] rounded-2xl border border-neutral-200/90 dark:border-white/15 shadow-2xl backdrop-blur-2xl text-neutral-900 dark:text-white text-xs animate-[fadeUp_0.15s_ease-out]">
      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-neutral-100 dark:border-white/10">
        <div className="flex items-center gap-2 font-semibold text-xs text-neutral-900 dark:text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Cloudflare Protected</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(false);
          }}
          className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
          aria-label="Close details"
        >
          <X size={13} />
        </button>
      </div>

      <div className="space-y-2 text-[11px] text-neutral-500 dark:text-neutral-400">
        <div className="flex justify-between items-center">
          <span>Bot Mitigation:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10">Turnstile Active</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Edge Network:</span>
          <span className="text-neutral-700 dark:text-neutral-200 font-medium">Anycast Global CDN</span>
        </div>
        <div className="flex justify-between items-center">
          <span>DDoS Shield:</span>
          <span className="text-neutral-700 dark:text-neutral-200 font-medium">L3/L4/L7 Active</span>
        </div>
      </div>

      <a
        href="https://www.cloudflare.com/products/turnstile/"
        target="_blank"
        rel="noreferrer"
        className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] text-[#f6821f] hover:underline font-medium pt-2 border-t border-neutral-100 dark:border-white/10 w-full"
      >
        <span>Learn about Cloudflare Turnstile</span>
        <ExternalLink size={10} />
      </a>
    </div>
  );

  // Variant 1: Navbar (Top Right, permanent, elegant, never collides with page content)
  if (variant === 'navbar') {
    return (
      <div ref={badgeRef} className="relative hidden md:inline-flex items-center">
        <button
          onClick={() => setShowInfo((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-200 dark:border-white/10 bg-neutral-100/80 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-white/[0.08] transition-all cursor-pointer shadow-2xs"
          title="Cloudflare Protection Details"
          aria-expanded={showInfo}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <ShieldCheck className="w-3.5 h-3.5 text-[#f6821f]" />
          <span className="font-semibold tracking-tight">Cloudflare Shield</span>
        </button>

        {showInfo && (
          <div className="absolute top-11 right-0 z-50">
            {PopoverContent}
          </div>
        )}
      </div>
    );
  }

  // Variant 2: Inline (for Footer status strip)
  if (variant === 'inline') {
    return (
      <div ref={badgeRef} className="relative inline-flex items-center">
        <button
          onClick={() => setShowInfo((prev) => !prev)}
          className="inline-flex items-center gap-1.5 font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer group"
          title="Cloudflare Protection Details"
          aria-expanded={showInfo}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#f6821f] group-hover:scale-110 transition-transform" />
          <span>Cloudflare Protected</span>
        </button>

        {showInfo && (
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-50">
            {PopoverContent}
          </div>
        )}
      </div>
    );
  }

  // Default: Background First-Visit Turnstile Verification only (invisible/non-floating)
  return (
    <>
      {!isVerified && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 max-w-xs transition-all duration-300">
          <div className="p-3.5 bg-white/95 dark:bg-[#1a1b1e]/95 backdrop-blur-xl rounded-2xl border border-neutral-200/90 dark:border-white/15 shadow-2xl shadow-black/10 dark:shadow-black/40">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              <Shield className="w-3.5 h-3.5 text-[#f6821f]" />
              <span>Cloudflare Session Check</span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-2.5">
              Validating human session for AiVerse platform...
            </p>
            <TurnstileWidget
              action="site_entry"
              size="compact"
              onVerify={handleVerify}
            />
          </div>
        </div>
      )}
    </>
  );
};
