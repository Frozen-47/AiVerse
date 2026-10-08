import React, { useState, useEffect } from 'react';
import { ShieldCheck, Shield, ExternalLink, X } from 'lucide-react';
import { TurnstileWidget } from './TurnstileWidget';
import { isSessionHumanVerified, setSessionHumanVerified } from '../lib/turnstile';

export const SiteSecurityBadge: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setIsVerified(isSessionHumanVerified());
  }, []);

  const handleVerify = (token: string) => {
    setSessionHumanVerified(token);
    setIsVerified(true);
  };

  return (
    <>
      {/* Background First-Visit Turnstile Verification (Invisible in Managed mode for humans) */}
      {!isVerified && (
        <div className="fixed bottom-4 left-4 z-40 max-w-xs transition-all duration-300">
          <div className="p-3 bg-white/95 dark:bg-[#1a1b1e]/95 backdrop-blur-md rounded-2xl border border-neutral-200/80 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/30">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              <Shield className="w-3.5 h-3.5 text-[#f6821f]" />
              <span>Cloudflare Session Check</span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-2">
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

      {/* Floating Status Badge (Bottom Right, next to other tools or footer) */}
      <div className="fixed bottom-5 left-5 z-30 hidden md:block">
        <button
          onClick={() => setShowInfo((prev) => !prev)}
          className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium bg-white/80 dark:bg-[#1a1b1e]/80 hover:bg-white dark:hover:bg-[#1e1f20] backdrop-blur-md border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 shadow-sm transition-all hover:scale-105 cursor-pointer"
          title="Cloudflare Protection Details"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <ShieldCheck className="w-3 h-3 text-[#f6821f]" />
          <span>Cloudflare Shield</span>
        </button>

        {/* Security Info Popover */}
        {showInfo && (
          <div className="absolute bottom-9 left-0 w-64 p-3.5 bg-white dark:bg-[#1e1f20] rounded-2xl border border-neutral-200 dark:border-white/10 shadow-2xl backdrop-blur-xl text-neutral-900 dark:text-white text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-neutral-100 dark:border-white/5">
              <div className="flex items-center gap-1.5 font-semibold text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Cloudflare Protected</span>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white p-0.5 rounded cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>

            <div className="space-y-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Bot Mitigation:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Turnstile Active</span>
              </div>
              <div className="flex justify-between">
                <span>Edge Network:</span>
                <span className="text-neutral-700 dark:text-neutral-200 font-medium">Anycast CDN</span>
              </div>
              <div className="flex justify-between">
                <span>DDoS Shield:</span>
                <span className="text-neutral-700 dark:text-neutral-200 font-medium">L3/L4/L7 Active</span>
              </div>
            </div>

            <a
              href="https://www.cloudflare.com/products/turnstile/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-[10px] text-[#f6821f] hover:underline font-medium"
            >
              Learn about Turnstile <ExternalLink size={9} />
            </a>
          </div>
        )}
      </div>
    </>
  );
};
