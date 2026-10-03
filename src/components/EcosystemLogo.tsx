import React, { useState } from "react";

interface EcosystemLogoProps {
  name: string;
  website?: string;
  size?: number;
  className?: string;
}

// Known domains for major AI research groups & startups
const KNOWN_DOMAINS: Record<string, string> = {
  "openai": "openai.com",
  "meta": "meta.com",
  "meta ai": "meta.com",
  "google": "deepmind.google",
  "deepmind": "deepmind.google",
  "google deepmind": "deepmind.google",
  "anthropic": "anthropic.com",
  "deepseek": "deepseek.com",
  "deepseek ai": "deepseek.com",
  "mistral": "mistral.ai",
  "mistral ai": "mistral.ai",
  "microsoft": "microsoft.com",
  "alibaba": "alibabacloud.com",
  "qwen": "qwenlm.github.io",
  "alibaba (qwen)": "qwenlm.github.io",
  "hugging face": "huggingface.co",
  "xai": "x.ai",
  "black forest labs": "blackforestlabs.ai",
  "cohere": "cohere.com",
  "stability ai": "stability.ai",
  "midjourney": "midjourney.com",
  "perplexity": "perplexity.ai",
  "nvidia": "nvidia.com",
  "amazon": "aws.amazon.com",
  "aws": "aws.amazon.com",
  "amazon web services": "aws.amazon.com",
  "runway": "runwayml.com",
  "elevenlabs": "elevenlabs.io",
  "together ai": "together.ai",
  "together": "together.ai",
  "groq": "groq.com",
  "vercel": "vercel.com",
  "ollama": "ollama.com",
  "apple": "apple.com",
  "tencent": "tencent.com",
  "baidu": "baidu.com",
  "bytedance": "bytedance.com",
  "thudm": "zhipuai.cn",
  "zhipu": "zhipuai.cn",
  "zhipu ai": "zhipuai.cn",
  "lmsys": "lmsys.org",
  "openbmb": "openbmb.cn",
  "langchain": "langchain.com",
  "llamaindex": "llamaindex.ai",
  "lightricks": "lightricks.com",
  "argilla": "argilla.io",
  "genmo": "genmo.ai",
  "unsloth": "unsloth.ai",
  "unsloth ai": "unsloth.ai",
  "crewai": "crewai.com",
  "crewai inc.": "crewai.com",
  "anysphere": "cursor.com",
  "cursor": "cursor.com",
  "adobe": "adobe.com",
  "replicate": "replicate.com",
  "scale ai": "scale.com",
  "pinecone": "pinecone.io",
  "qdrant": "qdrant.tech",
  "weaviate": "weaviate.io",
  "chroma": "trychroma.com",
  "weights & biases": "wandb.ai",
  "wandb": "wandb.ai",
  "databricks": "databricks.com",
  "snowflake": "snowflake.com",
  "ibm": "ibm.com",
  "intel": "intel.com",
  "amd": "amd.com",
  "eleutherai": "eleuther.ai",
  "laion": "laion.ai",
  "stanford": "stanford.edu",
  "berkeley": "berkeley.edu",
  "mit": "mit.edu",
  "xiaomi": "mi.com",
  "xiaomimimo": "mi.com",
};

export const EcosystemLogo: React.FC<EcosystemLogoProps> = ({
  name,
  website,
  size = 40,
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);

  const cleanName = (name || "").trim().toLowerCase();

  // 1. OpenAI (Official Rosette / Whirlpool Vector)
  if (cleanName.includes("openai")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="OpenAI"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
        </svg>
      </div>
    );
  }

  // 2. Google DeepMind / Google (Iconic 4-color Google G Mark)
  if (cleanName.includes("google") || cleanName.includes("deepmind")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-white dark:bg-[#18191a] border border-neutral-200/90 dark:border-white/10 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Google DeepMind"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full">
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
      </div>
    );
  }

  // 3. Anthropic (Official Geometric Monoliths 'A')
  if (cleanName.includes("anthropic")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#cc785c]/10 dark:bg-[#cc785c]/20 border border-[#cc785c]/30 text-[#cc785c] flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Anthropic"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M13.82 3.16h3.42L23.47 20.84h-3.42l-1.39-3.79h-5.91l-1.39 3.79H7.94L13.82 3.16zm2.84 11.45l-1.92-5.26-1.93 5.26h3.85zM0.53 20.84l5.88-17.68h3.42L3.95 20.84H0.53z" />
        </svg>
      </div>
    );
  }

  // 4. Meta AI (Official Blue Infinity Ribbon)
  if (cleanName.includes("meta") || cleanName.includes("facebook")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-blue-500/10 dark:bg-blue-600/15 border border-blue-500/30 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Meta AI"
      >
        <svg viewBox="0 0 24 24" fill="#0081FB" className="w-full h-full">
          <path d="M24 12.073c0-4.053-2.942-7.558-7.078-7.558-2.822 0-5.107 1.62-6.922 4.093-1.815-2.473-4.1-4.093-6.922-4.093C-1.058 4.515 0 8.02 0 12.073c0 4.054 2.942 7.559 7.078 7.559 2.822 0 5.107-1.62 6.922-4.093 1.815 2.473 4.1 4.093 6.922 4.093 4.136 0 7.078-3.505 7.078-7.559zm-13.435 0c-.868 2.302-2.126 4.38-3.487 4.38-1.884 0-3.238-1.848-3.238-4.38 0-2.532 1.354-4.38 3.238-4.38 1.36 0 2.62 2.078 3.487 4.38zm6.357 0c.867-2.302 2.127-4.38 3.488-4.38 1.884 0 3.238 1.848 3.238 4.38 0 2.532-1.354 4.38-3.238 4.38-1.36 0-2.62-2.078-3.488-4.38z" />
        </svg>
      </div>
    );
  }

  // 5. DeepSeek AI (Official DeepSeek Blue Whale)
  if (cleanName.includes("deepseek")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-blue-500/10 dark:bg-blue-600/20 border border-blue-500/30 flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="DeepSeek AI"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
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
      </div>
    );
  }

  // 6. Mistral AI (Official 7-block Staircase in Orange)
  if (cleanName.includes("mistral")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#FA520F]/10 dark:bg-[#FA520F]/20 border border-[#FA520F]/30 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Mistral AI"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <rect x="3" y="3" width="3.5" height="3.5" fill="#FA520F" rx="0.5" />
          <rect x="17.5" y="3" width="3.5" height="3.5" fill="#FA520F" rx="0.5" />
          <rect x="3" y="7.5" width="7.5" height="3.5" fill="#FA520F" rx="0.5" />
          <rect x="13.5" y="7.5" width="7.5" height="3.5" fill="#FA520F" rx="0.5" />
          <rect x="3" y="12" width="18" height="3.5" fill="#FA8C16" rx="0.5" />
          <rect x="3" y="16.5" width="3.5" height="3.5" fill="#FFA940" rx="0.5" />
          <rect x="10.25" y="16.5" width="3.5" height="3.5" fill="#FFA940" rx="0.5" />
          <rect x="17.5" y="16.5" width="3.5" height="3.5" fill="#FFA940" rx="0.5" />
        </svg>
      </div>
    );
  }

  // 7. Microsoft (Official 4-color Squares)
  if (cleanName.includes("microsoft")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-white dark:bg-[#18191a] border border-neutral-200/90 dark:border-white/10 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Microsoft"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <rect x="2.5" y="2.5" width="9" height="9" fill="#F25022" />
          <rect x="12.5" y="2.5" width="9" height="9" fill="#7FBA00" />
          <rect x="2.5" y="12.5" width="9" height="9" fill="#00A4EF" />
          <rect x="12.5" y="12.5" width="9" height="9" fill="#FFB900" />
        </svg>
      </div>
    );
  }

  // 8. Alibaba / Qwen (Official Purple Prism Origami)
  if (cleanName.includes("alibaba") || cleanName.includes("qwen")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-purple-500/10 dark:bg-purple-600/20 border border-purple-500/30 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Alibaba (Qwen)"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 2L3.5 7.5v9L12 22l8.5-5.5v-9L12 2z" fill="#615CED" fillOpacity="0.2" stroke="#615CED" strokeWidth="1.5" />
          <path d="M12 2l8.5 5.5L12 13 3.5 7.5 12 2z" fill="#8B5CF6" />
          <path d="M12 13l8.5-5.5v9L12 22V13z" fill="#6366F1" />
          <path d="M12 13L3.5 7.5v9L12 22V13z" fill="#4F46E5" />
          <circle cx="12" cy="12.5" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // 9. Hugging Face (Official Yellow 🤗 Emoji)
  if (cleanName.includes("hugging") || cleanName.includes("hugging face") || cleanName.includes("huggingface")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-amber-400/15 dark:bg-amber-400/20 border border-amber-400/30 flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Hugging Face"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="10" fill="#FFD21E" />
          <path d="M7 8.5c0-.8 1-1.5 2-1.5s2 .7 2 1.5" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M13 8.5c0-.8 1-1.5 2-1.5s2 .7 2 1.5" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="6" cy="11.5" r="1" fill="#F87171" fillOpacity="0.8" />
          <circle cx="18" cy="11.5" r="1" fill="#F87171" fillOpacity="0.8" />
          <path d="M8 13.5c1 2 2.5 3 4 3s3-1 4-3" stroke="#1F2937" strokeWidth="1.6" strokeLinecap="round" fill="#FFFFFF" />
          <path d="M3 14c.8-1 2.2-1.4 3.5-.8l1 1c.5.5.3 1.3-.3 1.6l-2.2 1.2c-.8.4-1.8.1-2.2-.7-.3-.6-.2-1.5.2-2.3z" fill="#F59E0B" />
          <path d="M21 14c-.8-1-2.2-1.4-3.5-.8l-1 1c-.5.5-.3 1.3.3 1.6l2.2 1.2c.8.4 1.8.1 2.2-.7.3-.6.2-1.5-.2-2.3z" fill="#F59E0B" />
        </svg>
      </div>
    );
  }

  // 10. xAI (Official Mathematical 𝕏 Mark)
  if (cleanName.includes("xai") || cleanName === "x.ai") {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="xAI"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    );
  }

  // 11. Black Forest Labs (Geometric Evergreen Tree Monogram)
  if (cleanName.includes("black forest")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-emerald-950 dark:bg-emerald-900 border border-emerald-500/30 text-emerald-400 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Black Forest Labs"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 2L4 12h4.5l-3.5 7h14l-3.5-7H20L12 2z" fill="#10B981" />
          <path d="M11 19h2v3h-2v-3z" fill="#047857" />
        </svg>
      </div>
    );
  }

  // 12. Cohere (Official Coral Looped Cellular Mark)
  if (cleanName.includes("cohere")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#39594D] border border-[#FF7759]/30 flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Cohere"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="9" fill="#2A4239" />
          <path d="M15 7.5c-3.5 0-6 2.2-6 5s2.5 5 6 5c2 0 3.5-.8 4.5-2" stroke="#FF7759" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="15" cy="7.5" r="1.5" fill="#FF7759" />
        </svg>
      </div>
    );
  }

  // 13. Stability AI (Concentric Flower Dots Burst)
  if (cleanName.includes("stability")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-purple-500/10 dark:bg-purple-600/20 border border-purple-500/30 flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Stability AI"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="3.2" fill="#7C3AED" />
          <circle cx="12" cy="4" r="1.8" fill="#8B5CF6" />
          <circle cx="12" cy="20" r="1.8" fill="#8B5CF6" />
          <circle cx="4" cy="12" r="1.8" fill="#8B5CF6" />
          <circle cx="20" cy="12" r="1.8" fill="#8B5CF6" />
          <circle cx="6.34" cy="6.34" r="1.8" fill="#A78BFA" />
          <circle cx="17.66" cy="6.34" r="1.8" fill="#A78BFA" />
          <circle cx="6.34" cy="17.66" r="1.8" fill="#A78BFA" />
          <circle cx="17.66" cy="17.66" r="1.8" fill="#A78BFA" />
        </svg>
      </div>
    );
  }

  // 14. Midjourney (Sailing Ship Crest)
  if (cleanName.includes("midjourney")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#0e1628] border border-blue-500/30 text-white flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Midjourney"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="9.5" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M10 6v9l5-4.5L10 6z" fill="#FFFFFF" />
          <path d="M7 16c2 1.5 8 1.5 10 0" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 15. Perplexity (Geometric Asterism Knot)
  if (cleanName.includes("perplexity")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#20B2AA]/10 dark:bg-[#20B2AA]/20 border border-[#20B2AA]/30 flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Perplexity"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36" stroke="#20B2AA" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="#20B2AA" />
        </svg>
      </div>
    );
  }

  // 16. NVIDIA (Official Green Spiral Eye)
  if (cleanName.includes("nvidia")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#76B900]/10 dark:bg-[#76B900]/20 border border-[#76B900]/30 flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="NVIDIA"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M9.5 7.5c2.5-1 6-1 8.5.5 2 1.2 3.5 3.5 4 6-2-.5-4.5-.5-6.5.5-2 1-3.5 3-4 5.5-1-1-1.5-2.5-1.5-4 0-3.5 1.5-6.5 3.5-8.5z" fill="#76B900" />
          <path d="M4 12c0-4.4 3.6-8 8-8 2 0 4 .8 5.5 2-2 0-4 1-5.5 2.5C10.5 10 9.5 12 9.5 14.5c0 1.5.5 3 1.5 4.2C7 17.5 4 15 4 12z" stroke="#76B900" strokeWidth="1.8" />
        </svg>
      </div>
    );
  }

  // 17. Amazon Web Services / AWS (Curved Arrow Smile)
  if (cleanName.includes("amazon") || cleanName.includes("aws")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#232F3E] text-white flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Amazon Web Services"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M18.5 15.5c-3 2.5-8 3-12 1.5-1.5-.5-2.5-1.2-2.5-1.2s1.5 1.8 3.5 2.5c4 1.5 9 1 12.5-1.5 1-.7 1.5-1.3 1.5-1.3s-1.5 0-3 0z" fill="#FF9900" />
          <path d="M21 14.5l-3 3 1-3.5-2.5-.5 4.5 1z" fill="#FF9900" />
        </svg>
      </div>
    );
  }

  // 18. Runway (Official Minimal R)
  if (cleanName.includes("runway")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Runway"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M7 6h6a4 4 0 0 1 4 4c0 2.2-1.8 4-4 4H10v4H7V6zm3 5h3a1.5 1.5 0 0 0 1.5-1.5A1.5 1.5 0 0 0 13 8h-3v3zm4 3l3.5 4H14l-3-3.5h1.5z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // 19. ElevenLabs (Official Dual Sound Equalizer Bars)
  if (cleanName.includes("elevenlabs")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="ElevenLabs"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <rect x="7" y="4" width="3.5" height="16" rx="1.75" />
          <rect x="13.5" y="4" width="3.5" height="16" rx="1.75" />
        </svg>
      </div>
    );
  }

  // 20. Together AI (Node Network)
  if (cleanName.includes("together")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-blue-500/10 dark:bg-blue-600/20 border border-blue-500/30 flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Together AI"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="7" r="3" fill="#3B82F6" />
          <circle cx="7" cy="16" r="3" fill="#8B5CF6" />
          <circle cx="17" cy="16" r="3" fill="#EC4899" />
          <path d="M12 7L7 16M12 7l5 9M7 16h10" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // 21. Groq (Angular Red G Mark)
  if (cleanName.includes("groq")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#F55036] text-white flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Groq"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 5a7 7 0 1 0 6 3.4l-2.5 1.7A4 4 0 1 1 12 8c1.2 0 2.2.5 2.9 1.3L12 12h6.5V5z" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // 22. Vercel (Triangle Mark)
  if (cleanName.includes("vercel")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Vercel"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2L23 21H1L12 2z" />
        </svg>
      </div>
    );
  }

  // 23. Ollama (Official Llama Mascot Silhouette)
  if (cleanName.includes("ollama")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Ollama"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M16 4a2 2 0 0 1 2 2v2a2 2 0 0 1-1 1.7V12a3 3 0 0 1-3 3H9v4a2 2 0 1 1-4 0V9a4 4 0 0 1 4-4h7z" />
          <circle cx="14" cy="7.5" r="1" fill="#000000" />
        </svg>
      </div>
    );
  }

  // 24. Apple
  if (cleanName.includes("apple")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Apple"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1 .08 2.02-.49 2.64-1.24z"/>
        </svg>
      </div>
    );
  }

  // 25. Tencent
  if (cleanName.includes("tencent")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-blue-500/10 dark:bg-blue-600/20 border border-blue-500/30 text-[#0052D9] flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Tencent"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3 0 1.25-.77 2.32-1.86 2.76.3.56.86 1.24 1.86 1.24h1v2h-1c-2.21 0-3.5-1.5-4-3-.5 1.5-1.79 3-4 3H6v-2h1c1 0 1.56-.68 1.86-1.24C7.77 10.32 7 9.25 7 8c0-1.66 1.34-3 3-3h2z" />
        </svg>
      </div>
    );
  }

  // 26. Baidu
  if (cleanName.includes("baidu")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 border border-blue-600/30 text-[#2932E1] flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Baidu"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 11.5c-2.5 0-4.5 1.8-4.5 4s2 4 4.5 4 4.5-1.8 4.5-4-2-4-4.5-4zm-5.5-3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm11 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8.5-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </div>
    );
  }

  // 27. ByteDance
  if (cleanName.includes("bytedance")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-sky-500/10 dark:bg-sky-600/20 border border-sky-500/30 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="ByteDance"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M4 6h3.5v12H4V6zm6.25 4h3.5v8h-3.5v-8zm6.25-6h3.5v14h-3.5V4z" fill="#00C4FF" />
          <path d="M10.25 4h3.5v4h-3.5V4z" fill="#3B82F6" />
        </svg>
      </div>
    );
  }

  // 28. LangChain
  if (cleanName.includes("langchain")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-emerald-500/10 dark:bg-emerald-600/20 border border-emerald-500/30 text-emerald-500 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="LangChain"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M9 7a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-2" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M15 17a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4h2" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 29. LMSYS (Chatbot Arena)
  if (cleanName.includes("lmsys")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-orange-500/10 dark:bg-orange-600/20 border border-orange-500/30 text-orange-500 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="LMSYS Org"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" stroke="#F97316" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 6l-5 3.5v5l5 3.5 5-3.5v-5L12 6z" fill="#FB923C" />
          <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // 30. Adobe
  if (cleanName.includes("adobe")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#FA0F00] text-white flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Adobe"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M13.96 4.5H23v15h-4.32l-4.72-15zM10.04 4.5H1v15h4.32l4.72-15zm1.96 5.8l3.48 9.2h-3.08l-1.04-2.84h-3.4l2.4-6.36h1.64z" />
        </svg>
      </div>
    );
  }

  // 31. Anysphere / Cursor
  if (cleanName.includes("anysphere") || cleanName.includes("cursor")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Cursor / Anysphere"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 2v20M4 6.5l8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // 32. Stanford
  if (cleanName.includes("stanford")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#8C1515]/10 dark:bg-[#8C1515]/20 border border-[#8C1515]/30 text-[#8C1515] dark:text-[#E03A3E] flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Stanford"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2L8 8h2.5L7 14h3l-4 7h12l-4-7h3l-3.5-6H16L12 2z" />
        </svg>
      </div>
    );
  }

  // 33. UC Berkeley
  if (cleanName.includes("berkeley")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-[#003262]/10 dark:bg-[#003262]/20 border border-[#003262]/30 text-[#003262] dark:text-[#FDB515] flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="UC Berkeley"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2" />
          <path d="M9 7h4a2.5 2.5 0 0 1 2 4 2.5 2.5 0 0 1-2 4H9V7z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // 34. Unsloth AI
  if (cleanName.includes("unsloth")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-emerald-500/10 dark:bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="Unsloth AI"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="9" fill="#10B981" />
          <circle cx="9" cy="11" r="1.5" fill="#FFFFFF" />
          <circle cx="15" cy="11" r="1.5" fill="#FFFFFF" />
          <path d="M9 15c1 1.5 5 1.5 6 0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 35. CrewAI
  if (cleanName.includes("crewai")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-indigo-500/10 dark:bg-indigo-600/20 border border-indigo-500/30 text-indigo-500 flex items-center justify-center p-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title="CrewAI"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // 36. Smart Remote Logo Resolution: GitHub Org Avatar or Domain Favicon
  // Check if known domain exists
  let targetDomain = KNOWN_DOMAINS[cleanName] || "";
  let githubOrg = "";

  if (website) {
    try {
      const url = new URL(website.startsWith("http") ? website : `https://${website}`);
      const host = url.hostname.replace(/^www\./, "");
      
      // If the link is GitHub, extract organization name
      if (host.includes("github.com")) {
        const parts = url.pathname.split("/").filter(Boolean);
        if (parts.length > 0 && !["topics", "explore", "trending", "features", "marketplace"].includes(parts[0].toLowerCase())) {
          githubOrg = parts[0];
        }
      } else if (!targetDomain && !["huggingface.co", "arxiv.org", "gitlab.com", "medium.com", "substack.com"].includes(host)) {
        targetDomain = host;
      }
    } catch {
      // ignore url parsing error
    }
  }

  // Priority 1: GitHub Organization avatar (e.g. https://github.com/Tencent.png?size=128)
  if (githubOrg && !imgError) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-white/10 flex items-center justify-center p-1 overflow-hidden shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title={name}
      >
        <img
          src={`https://github.com/${githubOrg}.png?size=128`}
          alt={name}
          className="w-full h-full object-contain rounded-lg"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Priority 2: Direct High-Res Domain Favicon / Logo (Google 128px API)
  if (targetDomain && !imgError) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-white/10 flex items-center justify-center p-1.5 overflow-hidden shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
        title={name}
      >
        <img
          src={`https://www.google.com/s2/favicons?domain=${targetDomain}&sz=128`}
          alt={name}
          className="w-full h-full object-contain rounded-lg"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Final Fallback: Sleek Monogram Initials Avatar
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-xl bg-gradient-to-tr from-neutral-800 to-neutral-700 text-white dark:from-neutral-200 dark:to-neutral-400 dark:text-neutral-950 font-bold text-xs flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105 ${className}`}
      title={name}
    >
      {initials}
    </div>
  );
};
