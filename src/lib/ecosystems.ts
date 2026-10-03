import type { Entry } from "../types";

export interface EcosystemGroup {
  id: string;
  name: string;
  normalizedOrg: string;
  description: string;
  domain: string;
  website?: string;
  colorScheme: {
    badge: string;
    accent: string;
    tagBg: string;
  };
  totalCount: number;
  modelsCount: number;
  frameworksCount: number;
  datasetsCount: number;
  platformsCount: number;
  appsCount: number;
  flagships: Entry[];
  entries: Entry[];
  latestYear: number;
  licenses: string[];
}

// Known mappings to unify naming variations
const ORG_NORMALIZATION: Record<string, string> = {
  "Google": "Google DeepMind",
  "Google DeepMind": "Google DeepMind",
  "Google Brain": "Google DeepMind",
  "Google Cloud": "Google DeepMind",
  "DeepSeek": "DeepSeek AI",
  "DeepSeek AI": "DeepSeek AI",
  "Meta AI": "Meta AI",
  "Meta": "Meta AI",
  "Facebook AI Research": "Meta AI",
  "Alibaba Cloud": "Alibaba (Qwen)",
  "Alibaba (Qwen)": "Alibaba (Qwen)",
  "Mistral": "Mistral AI",
  "Mistral AI": "Mistral AI",
  "Hugging Face": "Hugging Face",
  "Hugging Face Inc.": "Hugging Face",
  "Microsoft": "Microsoft",
  "Microsoft Research": "Microsoft",
  "microsoft": "Microsoft",
  "Amazon Web Services": "Amazon Web Services",
  "AWS": "Amazon Web Services",
  "nvidia": "NVIDIA",
  "NVIDIA": "NVIDIA",
  "Perplexity": "Perplexity",
  "Perplexity AI": "Perplexity",
  "Midjourney": "Midjourney",
  "Midjourney Inc.": "Midjourney",
  "Midjourney, Inc.": "Midjourney",
  "Stability AI": "Stability AI",
  "Stanford NLP": "Stanford AI",
  "Stanford CRFM": "Stanford AI",
  "Stanford": "Stanford AI",
  "UC Berkeley": "UC Berkeley (BAIR)",
  "BAIR": "UC Berkeley (BAIR)",
  "CrewAI Inc.": "CrewAI",
  "CrewAI": "CrewAI",
  "Unsloth AI": "Unsloth AI",
  "unsloth": "Unsloth AI",
  "openbmb": "OpenBMB",
  "OpenBMB": "OpenBMB",
  "THUDM / Zhipu AI": "Zhipu AI (THUDM)",
  "THUDM": "Zhipu AI (THUDM)",
  "Zhipu AI": "Zhipu AI (THUDM)",
  "Anysphere": "Cursor (Anysphere)",
  "Cursor": "Cursor (Anysphere)",
  "LMSYS": "LMSYS Org",
  "Apple": "Apple",
  "Apple Inc.": "Apple",
  "ByteDance": "ByteDance",
  "bytedance": "ByteDance",
  "Baidu": "Baidu",
  "Tencent": "Tencent",
};

interface LabMetadata {
  description: string;
  domain: string;
  website?: string;
  colorScheme: {
    badge: string;
    accent: string;
    tagBg: string;
  };
}

const KNOWN_LABS: Record<string, LabMetadata> = {
  "OpenAI": {
    description: "Pioneers of frontier multimodal models, reasoning chains (o1), speech (Whisper), and visual generation (DALL-E, Sora).",
    domain: "Frontier LLMs · Reasoning · Multimodal",
    website: "https://openai.com",
    colorScheme: {
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      accent: "text-emerald-500",
      tagBg: "bg-emerald-500/5",
    },
  },
  "Google DeepMind": {
    description: "Multimodal Gemini flagship series, lightweight open-weights Gemma family, and scientific foundation systems.",
    domain: "Native Multimodal · Open Weights · Bio AI",
    website: "https://deepmind.google",
    colorScheme: {
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      accent: "text-blue-500",
      tagBg: "bg-blue-500/5",
    },
  },
  "Anthropic": {
    description: "Creator of the Claude 3 and 3.5 model families built with Constitutional AI, state-of-the-art coding, and deep reasoning.",
    domain: "Coding Benchmarks · 200k Context · Safety",
    website: "https://anthropic.com",
    colorScheme: {
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      accent: "text-amber-500",
      tagBg: "bg-amber-500/5",
    },
  },
  "Meta AI": {
    description: "Democratizing open-source artificial intelligence with the Llama 3 ecosystem, Segment Anything, and computer vision.",
    domain: "Open Weights LLMs · Computer Vision · Speech",
    website: "https://ai.meta.com",
    colorScheme: {
      badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      accent: "text-indigo-500",
      tagBg: "bg-indigo-500/5",
    },
  },
  "DeepSeek AI": {
    description: "Revolutionary open-weights reasoning (R1) and ultra-efficient Mixture-of-Experts architecture (V3) rivaling proprietary frontiers.",
    domain: "Open Reasoning · Multi-head Latent Attention · MoE",
    website: "https://deepseek.com",
    colorScheme: {
      badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      accent: "text-cyan-500",
      tagBg: "bg-cyan-500/5",
    },
  },
  "Mistral AI": {
    description: "European champion delivering highly performant open-weights and commercial models including Mistral Large, Codestral, and Pixtral.",
    domain: "High Efficiency · Codestral · Multilingual",
    website: "https://mistral.ai",
    colorScheme: {
      badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      accent: "text-orange-500",
      tagBg: "bg-orange-500/5",
    },
  },
  "Microsoft": {
    description: "Pioneers of Small Language Models (Phi-4 series), developer tool chains, Azure AI infrastructure, and Copilot runtimes.",
    domain: "Small Language Models · SLMs · Enterprise",
    website: "https://microsoft.com/ai",
    colorScheme: {
      badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      accent: "text-sky-500",
      tagBg: "bg-sky-500/5",
    },
  },
  "Alibaba (Qwen)": {
    description: "Flagship multilingual and mathematical open-weights models (Qwen 2.5) with top open-source coding & vision benchmarks.",
    domain: "Multilingual · Mathematical Reasoning · Vision",
    website: "https://qwenlm.github.io",
    colorScheme: {
      badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      accent: "text-purple-500",
      tagBg: "bg-purple-500/5",
    },
  },
  "Hugging Face": {
    description: "The global epicenter of open source AI, hosting repositories, Transformers libraries, datasets, and serverless inference.",
    domain: "Open Hub · Transformers · Datasets",
    website: "https://huggingface.co",
    colorScheme: {
      badge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
      accent: "text-yellow-500",
      tagBg: "bg-yellow-500/5",
    },
  },
  "xAI": {
    description: "Elon Musk's AI research lab developing the Groq/Grok series with real-time world knowledge synthesis and deep coding.",
    domain: "Real-time Knowledge · Grok · Frontier",
    website: "https://x.ai",
    colorScheme: {
      badge: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/20",
      accent: "text-neutral-400",
      tagBg: "bg-neutral-500/5",
    },
  },
  "Black Forest Labs": {
    description: "Creators of the FLUX.1 family, establishing new visual quality, prompt adherence, and typography benchmarks in image generation.",
    domain: "Visual Synthesis · Flow Matching · FLUX",
    website: "https://blackforestlabs.ai",
    colorScheme: {
      badge: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20",
      accent: "text-fuchsia-500",
      tagBg: "bg-fuchsia-500/5",
    },
  },
  "Cohere": {
    description: "Enterprise foundation model builder specialized in retrieval-augmented generation (Command R+) and multilingual embeddings.",
    domain: "Enterprise RAG · Embeddings · Command R+",
    website: "https://cohere.com",
    colorScheme: {
      badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      accent: "text-rose-500",
      tagBg: "bg-rose-500/5",
    },
  },
  "Stability AI": {
    description: "Pioneers of open visual diffusion synthesis (Stable Diffusion series, Stable Audio, SDXL Turbo).",
    domain: "Open Diffusion · Generative Audio · SDXL",
    website: "https://stability.ai",
    colorScheme: {
      badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      accent: "text-purple-500",
      tagBg: "bg-purple-500/5",
    },
  },
  "Midjourney": {
    description: "Leading creative visual intelligence lab producing industry-acclaimed photorealistic and artistic generative models.",
    domain: "Photorealism · Creative Direction · V6",
    website: "https://midjourney.com",
    colorScheme: {
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      accent: "text-blue-500",
      tagBg: "bg-blue-500/5",
    },
  },
  "Perplexity": {
    description: "Conversational answer engine combining web indexing, live citations, and frontier LLM synthesis.",
    domain: "Live Web Search · Real-time Citations · Deep Research",
    website: "https://perplexity.ai",
    colorScheme: {
      badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
      accent: "text-teal-500",
      tagBg: "bg-teal-500/5",
    },
  },
  "NVIDIA": {
    description: "Accelerated computing powerhouses creating foundational robotics, synthetic data engines (Nemotron), and TensorRT-LLM.",
    domain: "Accelerated Hardware · Nemotron · TensorRT",
    website: "https://nvidia.com",
    colorScheme: {
      badge: "bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20",
      accent: "text-lime-500",
      tagBg: "bg-lime-500/5",
    },
  },
  "Amazon Web Services": {
    description: "Cloud AI infrastructure and Bedrock foundation model hub supporting multi-provider enterprise deployments.",
    domain: "Cloud Infrastructure · Bedrock · Titan",
    website: "https://aws.amazon.com/ai",
    colorScheme: {
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      accent: "text-amber-500",
      tagBg: "bg-amber-500/5",
    },
  },
  "Runway": {
    description: "Multimodal AI research lab empowering filmmakers and storytellers with Gen-2 and Gen-3 Alpha video synthesis.",
    domain: "Video Generation · World Models · Gen-3",
    website: "https://runwayml.com",
    colorScheme: {
      badge: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/20",
      accent: "text-neutral-400",
      tagBg: "bg-neutral-500/5",
    },
  },
  "ElevenLabs": {
    description: "The gold standard for emotive voice synthesis, voice cloning, and zero-shot multilingual speech generation.",
    domain: "Emotive Audio · Voice Cloning · Speech",
    website: "https://elevenlabs.io",
    colorScheme: {
      badge: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/20",
      accent: "text-neutral-400",
      tagBg: "bg-neutral-500/5",
    },
  },
  "Together AI": {
    description: "Fastest open-source model inference engine and cloud platform for building and fine-tuning AI applications.",
    domain: "Fast Inference · Cloud Clusters · Open Weights",
    website: "https://together.ai",
    colorScheme: {
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      accent: "text-blue-500",
      tagBg: "bg-blue-500/5",
    },
  },
  "Apple": {
    description: "On-device intelligence, CoreML frameworks, and foundational multimodal models for privacy-preserving AI.",
    domain: "On-Device · CoreML · Privacy AI",
    website: "https://apple.com",
    colorScheme: {
      badge: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/20",
      accent: "text-neutral-400",
      tagBg: "bg-neutral-500/5",
    },
  },
  "Groq": {
    description: "Ultra-fast LPU inference hardware delivering unprecedented tokens-per-second for open-weight models.",
    domain: "LPU Inference · Ultra-Low Latency",
    website: "https://groq.com",
    colorScheme: {
      badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      accent: "text-red-500",
      tagBg: "bg-red-500/5",
    },
  },
  "Ollama": {
    description: "Leading local runtime to get up and running with Llama, Mistral, and other models locally on macOS, Linux, and Windows.",
    domain: "Local AI · Edge Inference · CLI",
    website: "https://ollama.com",
    colorScheme: {
      badge: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/20",
      accent: "text-neutral-400",
      tagBg: "bg-neutral-500/5",
    },
  },
  "LMSYS Org": {
    description: "Creators of Chatbot Arena, pioneering crowd-sourced human preference evaluation and LMSYS foundation systems.",
    domain: "Benchmarking · Arena · Human Eval",
    website: "https://lmsys.org",
    colorScheme: {
      badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      accent: "text-orange-500",
      tagBg: "bg-orange-500/5",
    },
  },
  "OpenBMB": {
    description: "Open-source big model community developing MiniCPM edge models and efficient multimodal architectures.",
    domain: "Edge LLMs · MiniCPM · Multimodal",
    website: "https://openbmb.cn",
    colorScheme: {
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      accent: "text-blue-500",
      tagBg: "bg-blue-500/5",
    },
  },
  "LangChain": {
    description: "The ubiquitous framework for developing context-aware reasoning applications and agentic multi-tool workflows.",
    domain: "Agents · Chains · Vector RAG",
    website: "https://langchain.com",
    colorScheme: {
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      accent: "text-emerald-500",
      tagBg: "bg-emerald-500/5",
    },
  },
  "Zhipu AI (THUDM)": {
    description: "Pioneering Chinese foundation lab behind the GLM and CogVideo open multimodal model families.",
    domain: "GLM Architecture · Video Diffusion · Tsinghua",
    website: "https://zhipuai.cn",
    colorScheme: {
      badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      accent: "text-indigo-500",
      tagBg: "bg-indigo-500/5",
    },
  },
  "Tencent": {
    description: "Creators of Hunyuan and HunyuanVideo, state-of-the-art open-weights generative video models and enterprise foundation systems.",
    domain: "Generative Video · Hunyuan · Enterprise",
    website: "https://tencent.com",
    colorScheme: {
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      accent: "text-blue-500",
      tagBg: "bg-blue-500/5",
    },
  },
  "ByteDance": {
    description: "Global AI lab researching multimodal synthesis, high-throughput transformer inference, and recommendation algorithms.",
    domain: "Recommendation AI · Multimodal · Video",
    website: "https://bytedance.com",
    colorScheme: {
      badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      accent: "text-sky-500",
      tagBg: "bg-sky-500/5",
    },
  },
  "Baidu": {
    description: "China's leading AI pioneer with the ERNIE foundation model family and PaddlePaddle deep learning framework.",
    domain: "ERNIE Series · PaddlePaddle · Search AI",
    website: "https://baidu.com",
    colorScheme: {
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      accent: "text-blue-500",
      tagBg: "bg-blue-500/5",
    },
  },
  "Stanford AI": {
    description: "Stanford CRFM and NLP labs driving foundation model transparency, HELM evaluations, and reasoning research.",
    domain: "Academic Foundations · HELM · NLP",
    website: "https://stanford.edu",
    colorScheme: {
      badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      accent: "text-red-500",
      tagBg: "bg-red-500/5",
    },
  },
  "UC Berkeley (BAIR)": {
    description: "Berkeley Artificial Intelligence Research lab originating groundbreaking RLHF, vLLM, and agent methodologies.",
    domain: "vLLM · RLHF · Agent Architectures",
    website: "https://berkeley.edu",
    colorScheme: {
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      accent: "text-amber-500",
      tagBg: "bg-amber-500/5",
    },
  },
  "Cursor (Anysphere)": {
    description: "The AI-first code editor designed for pair-programming with frontier language models, shadow workspaces, and composer workflows.",
    domain: "AI IDE · Code Intelligence · Composer",
    website: "https://cursor.com",
    colorScheme: {
      badge: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/20",
      accent: "text-neutral-400",
      tagBg: "bg-neutral-500/5",
    },
  },
  "CrewAI": {
    description: "Cutting-edge framework for orchestrating role-playing, autonomous AI agents for collaborative problem solving.",
    domain: "Multi-Agent Systems · Role-Playing Orchestration",
    website: "https://crewai.com",
    colorScheme: {
      badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      accent: "text-indigo-500",
      tagBg: "bg-indigo-500/5",
    },
  },
  "Unsloth AI": {
    description: "Ultra-efficient LLM fine-tuning engine delivering 2-5x faster training speeds with 80% less VRAM usage.",
    domain: "Efficient Fine-Tuning · Low VRAM · LoRA",
    website: "https://unsloth.ai",
    colorScheme: {
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      accent: "text-emerald-500",
      tagBg: "bg-emerald-500/5",
    },
  },
};

export function getNormalizedOrgName(rawOrg: string): string {
  const trimmed = (rawOrg || "").trim();
  return ORG_NORMALIZATION[trimmed] || trimmed || "Independent";
}

export function groupEntriesByEcosystem(entries: Entry[]): EcosystemGroup[] {
  const map = new Map<string, Entry[]>();

  for (const entry of entries) {
    const org = getNormalizedOrgName(entry.org);
    if (!map.has(org)) {
      map.set(org, []);
    }
    map.get(org)!.push(entry);
  }

  const ecosystems: EcosystemGroup[] = [];

  for (const [orgName, orgEntries] of map.entries()) {
    // Sort entries by popularity first, then year desc
    const sorted = [...orgEntries].sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return (b.year || 0) - (a.year || 0);
    });

    const known = KNOWN_LABS[orgName];

    let modelsCount = 0;
    let frameworksCount = 0;
    let datasetsCount = 0;
    let platformsCount = 0;
    let appsCount = 0;
    let latestYear = 0;
    const licenseSet = new Set<string>();

    for (const e of sorted) {
      if (e.type === "Model") modelsCount++;
      else if (e.type === "Framework") frameworksCount++;
      else if (e.type === "Dataset") datasetsCount++;
      else if (e.type === "Platform") platformsCount++;
      else if (e.type === "AI") appsCount++;

      if (e.year && e.year > latestYear) latestYear = e.year;
      if (e.license) licenseSet.add(e.license);
    }

    const id = orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    ecosystems.push({
      id,
      name: orgName,
      normalizedOrg: orgName,
      description: known?.description || `Explore ${sorted.length} curated artificial intelligence models, tools, and technical architectures developed by ${orgName}.`,
      domain: known?.domain || `${sorted[0]?.task || "AI Research"} · ${modelsCount} Models`,
      website: known?.website || sorted[0]?.url,
      colorScheme: known?.colorScheme || {
        badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        accent: "text-blue-500",
        tagBg: "bg-blue-500/5",
      },
      totalCount: sorted.length,
      modelsCount,
      frameworksCount,
      datasetsCount,
      platformsCount,
      appsCount,
      flagships: sorted.slice(0, 4),
      entries: sorted,
      latestYear: latestYear || new Date().getFullYear(),
      licenses: Array.from(licenseSet).slice(0, 3),
    });
  }

  // Sort ecosystems: top labs with most assets first, followed by others
  return ecosystems.sort((a, b) => {
    // Prioritize known top tier labs if counts are comparable
    const aIsKnown = !!KNOWN_LABS[a.name];
    const bIsKnown = !!KNOWN_LABS[b.name];
    if (aIsKnown && !bIsKnown && a.totalCount >= 2) return -1;
    if (!aIsKnown && bIsKnown && b.totalCount >= 2) return 1;
    return b.totalCount - a.totalCount;
  });
}
