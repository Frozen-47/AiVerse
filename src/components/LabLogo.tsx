import React from "react";

interface LabLogoProps {
  creator: string;
  className?: string;
  size?: number;
}

export const LabLogo: React.FC<LabLogoProps> = ({ creator, className = "", size = 16 }) => {
  const c = creator.toLowerCase();

  // Anthropic (Official Geometric Monolith 'A')
  if (c.includes("anthropic")) {
    return (
      <span title="Anthropic" className="inline-flex shrink-0">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`text-[#cc785c] shrink-0 ${className}`}
        >
          <path d="M13.82 3.16h3.42L23.47 20.84h-3.42l-1.39-3.79h-5.91l-1.39 3.79H7.94L13.82 3.16zm2.84 11.45l-1.92-5.26-1.93 5.26h3.85zM0.53 20.84l5.88-17.68h3.42L3.95 20.84H0.53z" />
        </svg>
      </span>
    );
  }

  // Google / DeepMind (Iconic 4-color Google G mark)
  if (c.includes("google") || c.includes("deepmind")) {
    return (
      <span title="Google" className="inline-flex shrink-0">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className={`shrink-0 ${className}`}
        >
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      </span>
    );
  }

  // OpenAI (Iconic swirl / rosette mark)
  if (c.includes("openai")) {
    return (
      <span title="OpenAI" className="inline-flex shrink-0">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`text-neutral-900 dark:text-white shrink-0 ${className}`}
        >
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
        </svg>
      </span>
    );
  }

  // Meta (Official Blue Infinity Ribbon)
  if (c.includes("meta") || c.includes("facebook")) {
    return (
      <span title="Meta" className="inline-flex shrink-0">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="#0081FB"
          className={`shrink-0 ${className}`}
        >
          <path d="M24 12.073c0-4.053-2.942-7.558-7.078-7.558-2.822 0-5.107 1.62-6.922 4.093-1.815-2.473-4.1-4.093-6.922-4.093C-1.058 4.515 0 8.02 0 12.073c0 4.054 2.942 7.559 7.078 7.559 2.822 0 5.107-1.62 6.922-4.093 1.815 2.473 4.1 4.093 6.922 4.093 4.136 0 7.078-3.505 7.078-7.559zm-13.435 0c-.868 2.302-2.126 4.38-3.487 4.38-1.884 0-3.238-1.848-3.238-4.38 0-2.532 1.354-4.38 3.238-4.38 1.36 0 2.62 2.078 3.487 4.38zm6.357 0c.867-2.302 2.127-4.38 3.488-4.38 1.884 0 3.238 1.848 3.238 4.38 0 2.532-1.354 4.38-3.238 4.38-1.36 0-2.62-2.078-3.488-4.38z" />
        </svg>
      </span>
    );
  }

  // DeepSeek AI (Blue Whale / Dolphin)
  if (c.includes("deepseek")) {
    return (
      <span title="DeepSeek" className="inline-flex shrink-0">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          <path
            d="M3 13.5C3.5 9 7.5 5 13 5c5.5 0 8 3.5 8 3.5s-2.5.5-4 1.5c-1.5 1-2.5 3-2.5 4.5 0 2 1.5 3.5 3.5 3.5 1.5 0 3-.8 4-2-1 4.5-5 7.5-10 7.5-5.5 0-8.5-4-9-10z"
            fill="#0066FF"
          />
          <circle cx="8" cy="10" r="1.5" fill="#FFFFFF" />
          <path
            d="M17 6.5c1.5-1.5 3.5-2 5-2-.5 1.5-1.5 3-3 4-1 .7-2 .5-2-2z"
            fill="#38BDF8"
          />
        </svg>
      </span>
    );
  }

  // Mistral AI (Orange Staircase)
  if (c.includes("mistral")) {
    return (
      <span title="Mistral AI" className="inline-flex shrink-0">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 ${className}`}
        >
          <rect x="3" y="3" width="3.5" height="3.5" fill="#FA520F" rx="0.5" />
          <rect x="17.5" y="3" width="3.5" height="3.5" fill="#FA520F" rx="0.5" />
          <rect x="3" y="7.5" width="7.5" height="3.5" fill="#FA520F" rx="0.5" />
          <rect x="13.5" y="7.5" width="7.5" height="3.5" fill="#FA520F" rx="0.5" />
          <rect x="3" y="12" width="18" height="3.5" fill="#FA8C16" rx="0.5" />
          <rect x="3" y="16.5" width="3.5" height="3.5" fill="#FFA940" rx="0.5" />
          <rect x="10.25" y="16.5" width="3.5" height="3.5" fill="#FFA940" rx="0.5" />
          <rect x="17.5" y="16.5" width="3.5" height="3.5" fill="#FFA940" rx="0.5" />
        </svg>
      </span>
    );
  }

  // xAI (Minimalist Grok / X mark)
  if (c.includes("xai") || c.includes("spacex") || c.includes("grok")) {
    return (
      <span title="xAI" className="inline-flex shrink-0">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`text-[#736cd3] shrink-0 ${className}`}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </span>
    );
  }

  // Generic fallback
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full bg-neutral-400 dark:bg-neutral-600 flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${className}`}
    >
      {creator.slice(0, 1).toUpperCase()}
    </div>
  );
};
