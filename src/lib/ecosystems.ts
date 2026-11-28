import type { Entry } from "../types";
import { normalizeOrgName } from "./catalogCleanup";

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
    description: "Pioneers of frontier intelligence including GPT-6 Astra, reasoning architectures (o3, o1), autonomous computer use, and generative media (Sora, DALL-E).",
    domain: "Frontier LLMs · GPT-6 Astra · Reasoning",
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
    description: "Creator of the Claude Fable and Claude 3.5 model families built with Constitutional AI, Mythos-class reasoning, and frontier agentic coding.",
    domain: "Mythos Class · Claude Fable · Agentic Coding",
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
    description: "Elon Musk's AI research lab developing the Grok model series with real-time world knowledge synthesis and deep coding.",
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
  "Moonshot AI": {
    description: "Frontier Chinese AI lab behind the breakthrough Kimi series, pioneering million-token context comprehension and multimodal reasoning.",
    domain: "Long Context · Kimi · Reasoning",
    website: "https://moonshot.cn",
    colorScheme: {
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      accent: "text-blue-500",
      tagBg: "bg-blue-500/5",
    },
  },
  "Cognition AI": {
    description: "Creators of the first autonomous AI software engineer, Devin, equipped with end-to-end tooling, code synthesis, and verification loops.",
    domain: "Autonomous Software Engineering · Devin",
    website: "https://cognition.ai",
    colorScheme: {
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      accent: "text-emerald-500",
      tagBg: "bg-emerald-500/5",
    },
  },
  "Genmo": {
    description: "Generative video and interactive creative AI lab, creators of the Mochi open-weights motion synthesis architecture.",
    domain: "Video Synthesis · Asymmetric Diffusion · Mochi",
    website: "https://genmo.ai",
    colorScheme: {
      badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      accent: "text-purple-500",
      tagBg: "bg-purple-500/5",
    },
  },
  "Lightricks": {
    description: "Pioneering visual computing lab behind LTX-Video, an open-weights real-time high-fidelity video generation foundation model.",
    domain: "Generative Video · Real-Time Rendering · LTX",
    website: "https://lightricks.com",
    colorScheme: {
      badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      accent: "text-rose-500",
      tagBg: "bg-rose-500/5",
    },
  },
  "Hexgrad": {
    description: "Independent speech intelligence research group behind Kokoro, an ultra-compact 82M open-weights neural TTS model.",
    domain: "Neural TTS · Compact Speech · Kokoro",
    website: "https://hexgrad.com",
    colorScheme: {
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      accent: "text-amber-500",
      tagBg: "bg-amber-500/5",
    },
  },
  "Allen Institute for AI": {
    description: "World-class non-profit AI research institute creating open foundation models (OLMo), pretraining datasets (Dolma), and transparent science.",
    domain: "Open Science · Dolma · OLMo · NLP",
    website: "https://allenai.org",
    colorScheme: {
      badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      accent: "text-cyan-500",
      tagBg: "bg-cyan-500/5",
    },
  },
  "Technology Innovation Institute (TII)": {
    description: "Abu Dhabi's advanced technology research pillar, creator of the Falcon open foundation model family.",
    domain: "Falcon Foundation Models · High Compute",
    website: "https://tii.ae",
    colorScheme: {
      badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      accent: "text-sky-500",
      tagBg: "bg-sky-500/5",
    },
  },
  "Cloudflare": {
    description: "Global edge network powerhouse delivering Workers AI, serverless model inference, and multimodal intelligence at edge latencies.",
    domain: "Edge AI · Workers AI · Serverless Inference",
    website: "https://cloudflare.com",
    colorScheme: {
      badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      accent: "text-orange-500",
      tagBg: "bg-orange-500/5",
    },
  },
  "Vercel": {
    description: "Frontend cloud and AI SDK creators powering generative UI and developer workflows with the v0 design synthesis platform.",
    domain: "AI SDK · Generative UI · v0",
    website: "https://vercel.com",
    colorScheme: {
      badge: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/20",
      accent: "text-neutral-400",
      tagBg: "bg-neutral-500/5",
    },
  },
  "Xiaomi (MiMo)": {
    description: "Xiaomi's AI laboratory developing the MiMo reasoning, reinforcement learning, and distilled multimodal models.",
    domain: "On-Device Multimodal · Reasoning RL · MiMo",
    website: "https://xiaomi.com",
    colorScheme: {
      badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      accent: "text-orange-500",
      tagBg: "bg-orange-500/5",
    },
  },
    "Krea AI": {
    description: "Real-time generative canvas and creative platform accelerating visual art generation and video enhancement.",
    domain: "Real-time Generation · Canvas · Upscaling",
    website: "https://krea.ai",
    colorScheme: {
      badge: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20",
      accent: "text-fuchsia-500",
      tagBg: "bg-fuchsia-500/5",
    },
  },
  "MiniMax": {
    description: "Frontier Chinese AI lab developing the high-efficiency MiniMax M3.1 series, abab language models, and ultra-fast multimodal speech & reasoning architectures.",
    domain: "Frontier MoE LLMs · MiniMax M3.1 · Fast Multimodal",
    website: "https://minimax.io",
    colorScheme: {
      badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
      accent: "text-teal-500",
      tagBg: "bg-teal-500/5",
    },
  },
  "StepFun": {
    description: "Leading research organization pioneering Step-1, Step-2, and Step 5 multi-step chain-of-thought and multimodal foundation systems.",
    domain: "Multi-Step Reasoning · Step 5 Preview · Multi-modal",
    website: "https://stepfun.com",
    colorScheme: {
      badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
      accent: "text-violet-500",
      tagBg: "bg-violet-500/5",
    },
  },
  "InclusionAI": {
    description: "Ant Group's AI research lab building the Ling and Ming open multimodal Mixture-of-Experts foundation models.",
    domain: "Open MoE · Ling Series · Multimodal",
    website: "https://github.com/inclusionAI",
    colorScheme: {
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      accent: "text-emerald-500",
      tagBg: "bg-emerald-500/5",
    },
  },
  "Liquid AI": {
    description: "MIT spinout developing Liquid Foundation Models (LFM) for ultra-efficient edge, audio, vision, and multimodal deployment.",
    domain: "Liquid Neural Networks · LFM · Edge AI",
    website: "https://liquid.ai",
    colorScheme: {
      badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      accent: "text-cyan-500",
      tagBg: "bg-cyan-500/5",
    },
  },
  "Thinking Machines": {
    description: "Frontier AI research lab founded by Mira Murati advancing collaborative intelligence and next-generation foundation models.",
    domain: "Frontier Research · Foundation Models",
    website: "https://thinkingmachines.ai",
    colorScheme: {
      badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      accent: "text-indigo-500",
      tagBg: "bg-indigo-500/5",
    },
  },
  "Upstage": {
    description: "Enterprise AI lab creating high-efficiency Solar language models and leading document intelligence systems.",
    domain: "Solar LLMs · Document AI · Enterprise",
    website: "https://upstage.ai",
    colorScheme: {
      badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
      accent: "text-violet-500",
      tagBg: "bg-violet-500/5",
    },
  },
  "Nous Research": {
    description: "Open-source AI research lab behind the Hermes model family, advancing instruction following, synthetic data, and tool use.",
    domain: "Open Weights · Hermes Series · Fine-Tuning",
    website: "https://nousresearch.com",
    colorScheme: {
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      accent: "text-amber-500",
      tagBg: "bg-amber-500/5",
    },
  },
  "IBM": {
    description: "Enterprise AI research organization developing the open-weights Granite language, code, and guardian model families.",
    domain: "Granite Series · Enterprise AI · Open Weights",
    website: "https://ibm.com/granite",
    colorScheme: {
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      accent: "text-blue-500",
      tagBg: "bg-blue-500/5",
    },
  },
  "LG AI Research": {
    description: "AI research division developing the EXAONE multimodal foundation model family for scientific and enterprise reasoning.",
    domain: "EXAONE · Enterprise & Scientific AI",
    website: "https://lgresearch.ai",
    colorScheme: {
      badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      accent: "text-rose-500",
      tagBg: "bg-rose-500/5",
    },
  },
  "Bria AI": {
    description: "Commercial-licensed visual generative AI platform building FIBO and RMBG foundation models trained exclusively on licensed data.",
    domain: "Licensed Visual AI · FIBO · Background Removal",
    website: "https://bria.ai",
    colorScheme: {
      badge: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20",
      accent: "text-fuchsia-500",
      tagBg: "bg-fuchsia-500/5",
    },
  },
  "Pruna AI": {
    description: "AI efficiency and optimization lab compressing and accelerating image, video, and language foundation models.",
    domain: "Model Compression · Fast Inference · P-Image",
    website: "https://pruna.ai",
    colorScheme: {
      badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      accent: "text-purple-500",
      tagBg: "bg-purple-500/5",
    },
  },
  "Nex AGI": {
    description: "Open-weights reasoning research group building the Nex-N2 agentic and mathematical reasoning foundation series.",
    domain: "Agentic Reasoning · Open Weights · Nex-N2",
    website: "https://github.com/nex-agi",
    colorScheme: {
      badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      accent: "text-indigo-500",
      tagBg: "bg-indigo-500/5",
    },
  },
  "RadixArk": {
    description: "Research collective publishing quantized and reinforcement-tuned open-weight models including Nemotron-Super variants.",
    domain: "Quantized Inference · RL · Open Weights",
    website: "https://huggingface.co/RadixArk",
    colorScheme: {
      badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      accent: "text-sky-500",
      tagBg: "bg-sky-500/5",
    },
  },
  "KT": {
    description: "Korean telecom AI division building the Mi:dm sovereign Korean-English enterprise language model family.",
    domain: "Sovereign AI · Mi:dm · Korean-English LLM",
    website: "https://kt.com",
    colorScheme: {
      badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      accent: "text-red-500",
      tagBg: "bg-red-500/5",
    },
  },
  "OpenMOSS": {
    description: "Fudan University's open-source NLP team creating MOSS conversational, speech, and visual synthesis systems.",
    domain: "Academic Open AI · MOSS · Multimodal",
    website: "https://github.com/OpenMOSS",
    colorScheme: {
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      accent: "text-emerald-500",
      tagBg: "bg-emerald-500/5",
    },
  },
  "Meituan (LongCat)": {
    description: "Meituan's LongCat AI research group developing long-context language and interactive video avatar foundation models.",
    domain: "LongCat · Video Avatars · Multimodal",
    website: "https://meituan.com",
    colorScheme: {
      badge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
      accent: "text-yellow-500",
      tagBg: "bg-yellow-500/5",
    },
  },
  "ServiceNow": {
    description: "Enterprise workflow automation leader co-creating StarCoder and open research initiatives for enterprise coding and agents.",
    domain: "Enterprise Workflows · Open Coding AI",
    website: "https://servicenow.com",
    colorScheme: {
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      accent: "text-emerald-500",
      tagBg: "bg-emerald-500/5",
    },
  },
  "Suno": {
    description: "Generative audio and music studio transforming text prompts into full studio-quality songs and vocals.",
    domain: "Generative Music · Audio Synthesis",
    website: "https://suno.com",
    colorScheme: {
      badge: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
      accent: "text-pink-500",
      tagBg: "bg-pink-500/5",
    },
  },
  "Pika Labs": {
    description: "AI video creation platform enabling controllable scene generation, motion editing, and visual effects.",
    domain: "AI Video Generation · Creative Effects",
    website: "https://pika.art",
    colorScheme: {
      badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      accent: "text-purple-500",
      tagBg: "bg-purple-500/5",
    },
  },
  "Adobe": {
    description: "Creator of Firefly commercially safe generative media models integrated across Photoshop, Illustrator, and Premiere.",
    domain: "Firefly · Creative Suite · Generative Design",
    website: "https://adobe.com",
    colorScheme: {
      badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      accent: "text-red-500",
      tagBg: "bg-red-500/5",
    },
  },
  "Weights & Biases": {
    description: "Developer platform for ML experiment tracking, model evaluation, and LLM observability via W&B Weave.",
    domain: "MLOps · Evals · Experiment Tracking",
    website: "https://wandb.ai",
    colorScheme: {
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      accent: "text-amber-500",
      tagBg: "bg-amber-500/5",
    },
  },
  "LlamaIndex": {
    description: "Leading data framework and workflow orchestration platform for building enterprise RAG and document agents.",
    domain: "RAG Frameworks · Document Agents",
    website: "https://llamaindex.ai",
    colorScheme: {
      badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      accent: "text-indigo-500",
      tagBg: "bg-indigo-500/5",
    },
  },
  "EleutherAI": {
    description: "Non-profit decentralized AI research lab behind Pythia, GPT-NeoX, The Pile, and lm-evaluation-harness.",
    domain: "Open Science · Evals · Pretraining",
    website: "https://eleuther.ai",
    colorScheme: {
      badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      accent: "text-sky-500",
      tagBg: "bg-sky-500/5",
    },
  },
  "LAION": {
    description: "Non-profit open AI network building large-scale multimodal datasets and open alignment initiatives.",
    domain: "Open Datasets · Multimodal Research",
    website: "https://laion.ai",
    colorScheme: {
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      accent: "text-blue-500",
      tagBg: "bg-blue-500/5",
    },
  },
  "Aleph Alpha": {
    description: "European sovereign enterprise AI company building Pharia and explainable multimodal foundation systems.",
    domain: "Sovereign Enterprise AI · Explainability",
    website: "https://aleph-alpha.com",
    colorScheme: {
      badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      accent: "text-cyan-500",
      tagBg: "bg-cyan-500/5",
    },
  },
  "Multiverse Computing": {
    description: "AI compression pioneers shrinking billion-parameter foundation models with quantum-inspired tensor networks.",
    domain: "Model Compression · CompactifAI",
    website: "https://multiversecomputing.com",
    colorScheme: {
      badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
      accent: "text-violet-500",
      tagBg: "bg-violet-500/5",
    },
  },
  "Zyphra": {
    description: "Open research lab innovating hybrid state-space language models (Zamba) and expressive neural voice synthesis (Zonos).",
    domain: "Hybrid SSMs · Neural Speech · Open Weights",
    website: "https://zyphra.com",
    colorScheme: {
      badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
      accent: "text-teal-500",
      tagBg: "bg-teal-500/5",
    },
  },
};

export function getNormalizedOrgName(rawOrg: string): string {
  return normalizeOrgName(rawOrg);
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

    const countParts: string[] = [];
    if (modelsCount > 0) countParts.push(`${modelsCount} ${modelsCount === 1 ? "Model" : "Models"}`);
    if (frameworksCount > 0) countParts.push(`${frameworksCount} ${frameworksCount === 1 ? "Framework" : "Frameworks"}`);
    if (datasetsCount > 0) countParts.push(`${datasetsCount} ${datasetsCount === 1 ? "Dataset" : "Datasets"}`);
    if (platformsCount > 0) countParts.push(`${platformsCount} ${platformsCount === 1 ? "Platform" : "Platforms"}`);
    if (appsCount > 0) countParts.push(`${appsCount} ${appsCount === 1 ? "AI App" : "AI Apps"}`);

    const primaryEntry = sorted[0];
    const leadSentence = primaryEntry?.summary
      ? primaryEntry.summary.split(/(?<=[.!?])\s+/)[0]
      : "";
    const fallbackDesc =
      sorted.length === 1 && leadSentence
        ? leadSentence
        : `${orgName} develops ${sorted.map((e) => e.name).slice(0, 3).join(", ")}${sorted.length > 3 ? `, and ${sorted.length - 3} more` : ""} for ${(primaryEntry?.task || "AI research").toLowerCase()}.`;

    ecosystems.push({
      id,
      name: orgName,
      normalizedOrg: orgName,
      description: known?.description || fallbackDesc,
      domain: known?.domain || `${primaryEntry?.task || "AI Research"} · ${countParts.join(" · ") || "1 Asset"}`,
      website: known?.website || primaryEntry?.url,
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


// ─── Lab Creator Accent Color Helper ───────────────────────────────────────────
export function getCreatorColor(creator: string): string {
  const c = (creator || "").toLowerCase();
  if (c.includes("anthropic")) return "#cc785c";
  if (c.includes("google") || c.includes("deepmind")) return "#4285F4";
  if (c.includes("openai")) return "#10a37f";
  if (c.includes("meta") || c.includes("facebook")) return "#0081FB";
  if (c.includes("deepseek")) return "#0066FF";
  if (c.includes("mistral")) return "#FA520F";
  if (c.includes("xai") || c.includes("grok") || c.includes("spacex")) return "#736cd3";
  if (c.includes("alibaba") || c.includes("qwen")) return "#8B5CF6";
  if (c.includes("microsoft")) return "#00A4EF";
  if (c.includes("nvidia")) return "#76B900";
  if (c.includes("apple")) return "#A2AAAD";
  if (c.includes("hugging")) return "#FFD21E";
  if (c.includes("cohere")) return "#D946EF";
  if (c.includes("stability")) return "#A855F7";
  if (c.includes("midjourney")) return "#3B82F6";
  if (c.includes("perplexity")) return "#14B8A6";
  if (c.includes("runway")) return "#EC4899";
  if (c.includes("together")) return "#2563EB";
  if (c.includes("groq")) return "#EF4444";
  if (c.includes("moonshot") || c.includes("kimi")) return "#3B82F6";
  if (c.includes("minimax")) return "#06B6D4";
  if (c.includes("stepfun")) return "#8B5CF6";
  if (c.includes("zhipu") || c.includes("glm")) return "#3B82F6";
  if (c.includes("baidu")) return "#2932E1";
  if (c.includes("tencent")) return "#0052D9";
  if (c.includes("bytedance")) return "#38BDF8";
  if (c.includes("liquid")) return "#06B6D4";
  if (c.includes("inclusion")) return "#10B981";
  if (c.includes("upstage")) return "#8B5CF6";
  if (c.includes("ibm")) return "#0F62FE";
  if (c.includes("bria")) return "#D946EF";
  if (c.includes("pruna")) return "#A855F7";
  if (c.includes("nous")) return "#F59E0B";
  return "#6366F1";
}

// ─── Hierarchical Model Family / Series Definition ─────────────────────────────
export interface ModelFamilyGroup {
  id: string;
  name: string;
  subtitle?: string;
  accentColor: string;
  contextWindow?: string;
  highlightMetric?: string;
  entries: Entry[];
  category: "model" | "framework" | "dataset" | "platform" | "app";
}

// Helper to extract a representative context window if present in entry architecture/summary/size
function extractContextWindow(entries: Entry[]): string | undefined {
  for (const e of entries) {
    const text = `${e.name} ${e.size || ""} ${e.summary || ""} ${e.architecture || ""}`;
    const m1 = text.match(/\b(1M|2M|10M|128k|200k|256k|512k|500k|984k|262k|524k|32k|64k|8k|16k)\b/i);
    if (m1) return m1[1].toUpperCase();
    const m2 = text.match(/([0-9]+[kKmM])\s*context/i);
    if (m2) return m2[1].toUpperCase();
  }
  return undefined;
}

// Helper to extract a notable benchmark quote if present
function extractHighlightMetric(entries: Entry[]): string | undefined {
  for (const e of entries) {
    if (e.benchmarks && e.benchmarks.trim()) {
      const parts = e.benchmarks.split(/[,;·]/);
      if (parts.length > 0 && parts[0].length < 35) {
        return parts[0].trim();
      }
    }
  }
  return undefined;
}

/**
 * Group an ecosystem's entries hierarchically into logical Model Families / Series.
 * Matches the Artificial Analysis multi-tier structure:
 * - Releases / Series at the top (e.g. Claude Fable 5.2, GPT-6 Astra, Gemini 4, Llama 3)
 * - Individual model variants and checkpoints nested underneath
 */
export function groupEcosystemEntriesIntoFamilies(
  entries: Entry[],
  labName: string
): ModelFamilyGroup[] {
  const normLab = (labName || "").toLowerCase();
  const assigned = new Set<string>();
  const families: ModelFamilyGroup[] = [];
  const labColor = getCreatorColor(labName);

  function addFamily(
    id: string,
    name: string,
    subtitle: string,
    predicate: (e: Entry) => boolean,
    category: "model" | "framework" | "dataset" | "platform" | "app" = "model"
  ) {
    const matching: Entry[] = [];
    for (const e of entries) {
      if (assigned.has(e.name)) continue;
      if (predicate(e)) {
        matching.push(e);
        assigned.add(e.name);
      }
    }
    if (matching.length > 0) {
      // Sort matching entries: popular first, then by year desc
      matching.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return (b.year || 0) - (a.year || 0);
      });

      families.push({
        id,
        name,
        subtitle,
        accentColor: labColor,
        contextWindow: extractContextWindow(matching),
        highlightMetric: extractHighlightMetric(matching),
        entries: matching,
        category,
      });
    }
  }

  // 1. Anthropic Model Families
  if (normLab.includes("anthropic")) {
    addFamily("claude-fable-5-2", "Claude Fable 5.2 & 5.x Series", "Mythos-class reasoning & frontier agentic models",
      e => /fable|5\.2|5\.1/i.test(e.name));
    addFamily("claude-opus-5-5", "Claude Opus 5.5 Series", "Heavyweight frontier intelligence & deep STEM synthesis",
      e => /opus\s*5\.5/i.test(e.name));
    addFamily("claude-sonnet-5-5", "Claude Sonnet 5.5 Series", "Enterprise frontier coding & autonomous computer use",
      e => /sonnet\s*5\.5/i.test(e.name));
    addFamily("claude-haiku-5-5", "Claude Haiku 5.5 Series", "Ultra-fast high-efficiency frontier intelligence",
      e => /haiku\s*5\.5/i.test(e.name));
    addFamily("claude-3-7-3-5", "Claude 3.7 & 3.5 Generation", "Frontier coding, vision & agentic workflows",
      e => /3\.7|3\.5/i.test(e.name));
    addFamily("claude-3", "Claude 3 Foundation Series", "Multimodal Opus, Sonnet & Haiku foundation releases",
      e => /claude[\s-]3\b/i.test(e.name) && !/3\.[57]/i.test(e.name));
    addFamily("claude-legacy", "Claude 2 & Legacy Systems", "Constitutional AI foundation benchmarks",
      e => /claude[\s-](2|instant)/i.test(e.name));
    addFamily("anthropic-safety-tools", "Applications, Tooling & Safety Datasets", "RLHF benchmarks, constitutional alignment & platform",
      e => e.type !== "Model" || /hh-rlhf|claude$/i.test(e.name), "platform");
  }

  // 2. OpenAI Model Families
  else if (normLab.includes("openai")) {
    addFamily("gpt-6-astra", "GPT-6 Astra Series", "Generational autonomous computer use & frontier MoE",
      e => /gpt-?6.*astra|astra/i.test(e.name));
    addFamily("gpt-6-sol", "GPT-6.1 Sol Series", "High-throughput frontier reasoning & agentic execution",
      e => /gpt-?6\.1.*sol|sol/i.test(e.name));
    addFamily("gpt-6-terra", "GPT-6.1 Terra Series", "Compact frontier reasoning & ultra-efficient reasoning",
      e => /gpt-?6\.1.*terra|terra/i.test(e.name));
    addFamily("gpt-6-luna", "GPT-6 Luna Series", "Extreme-speed micro reasoning & low-latency intelligence",
      e => /gpt-?6.*luna|luna/i.test(e.name));
    addFamily("gpt-6-frontier", "GPT-6 Frontier Foundation", "Frontier GPT-6 generation models",
      e => /gpt-?6/i.test(e.name));
    addFamily("o-series", "o-Series Deep Reasoning", "Reinforcement learning thought chains for STEM, code & math",
      e => /^o[1-9]/i.test(e.name) || /\bo[1-9](-mini|-preview)?\b/i.test(e.name));
    addFamily("gpt-4", "GPT-4 & GPT-4o Omnimodal Series", "Flagship multimodal systems & fast omni intelligence",
      e => /gpt-?4(\.5|o)?/i.test(e.name));
    addFamily("gpt-3", "GPT-3.5 & Foundational Transformers", "Pioneering generative pre-trained transformers",
      e => /gpt-?3(\.5)?/i.test(e.name));
    addFamily("openai-media", "Visual & Audio Intelligence", "State-of-the-art diffusion, video & speech recognition",
      e => /dall-?e|sora|whisper|clip/i.test(e.name));
    addFamily("openai-datasets", "Evaluation Benchmarks & Datasets", "Verified coding and mathematics benchmarks",
      e => e.type === "Dataset" || /swe-bench|math-500|humaneval|gsm8k/i.test(e.name), "dataset");
    addFamily("openai-tools", "Platform APIs & Developer Frameworks", "OpenAI Assistant runtime, Triton compiler & tools",
      e => e.type !== "Model", "platform");
  }

  // 3. Google DeepMind Model Families
  else if (normLab.includes("deepmind") || normLab.includes("google")) {
    addFamily("gemini-4-carbon", "Gemini 4 Carbon Series", "Frontier heavy-reasoning flagship architecture",
      e => /gemini.*carbon|carbon/i.test(e.name));
    addFamily("gemini-4-hydrogen", "Gemini 4 Hydrogen Series", "High-efficiency frontier multimodal intelligence",
      e => /gemini.*hydrogen|hydrogen/i.test(e.name));
    addFamily("gemini-4-argon", "Gemini 4 Argon Series", "Fast frontier reasoning & multimodal synthesis",
      e => /gemini.*argon|argon/i.test(e.name));
    addFamily("gemini-4-general", "Gemini 4 Frontier Generation", "Next-generation Gemini 4 series releases",
      e => /gemini[\s-]?4/i.test(e.name));
    addFamily("gemini-2", "Gemini 2.0 & Thinking Series", "Real-time multimodal streaming & flash thinking",
      e => /gemini[\s-]?2|project astra/i.test(e.name));
    addFamily("gemini-1-5", "Gemini 1.5 Native Multimodal Series", "Million-token context window architectures",
      e => /gemini[\s-]?1\.5/i.test(e.name));
    addFamily("gemma", "Gemma Open Weights Family", "Lightweight, state-of-the-art open foundation models",
      e => /gemma/i.test(e.name));
    addFamily("google-foundations", "Foundational Transformers & LLMs", "Pioneering NLP, vision transformers & PaLM",
      e => /bert|t5|palm|vit|gemini[\s-]?1\b/i.test(e.name));
    addFamily("google-science", "Scientific & Biomedical Intelligence", "AlphaFold 3, AlphaProof, AlphaGeometry & GraphCast",
      e => /alphafold|alphaproof|alphageometry|graphcast/i.test(e.name));
    addFamily("google-frameworks", "Frameworks, Runtimes & Applications", "TensorFlow, JAX, Flax & NotebookLM",
      e => e.type !== "Model", "framework");
  }

  // 4. Meta AI Model Families
  else if (normLab.includes("meta") || normLab.includes("facebook")) {
    addFamily("llama-3-3", "Llama 3.3 Multimodal Series", "Flagship 70B open intelligence rivaling frontier models",
      e => /llama[\s-]?3\.3/i.test(e.name));
    addFamily("llama-3-2", "Llama 3.2 Vision & Edge Series", "Multimodal vision models & compact on-device architectures",
      e => /llama[\s-]?3\.2/i.test(e.name));
    addFamily("llama-3-1", "Llama 3.1 Frontier Open Foundation", "405B flagship, 70B and 8B open-weights models",
      e => /llama[\s-]?3\.1/i.test(e.name));
    addFamily("llama-3", "Llama 3 Foundation Series", "Original Llama 3 70B and 8B releases",
      e => /llama[\s-]?3\b/i.test(e.name));
    addFamily("llama-2", "Llama 2 & Code Llama Series", "Seminal open-weights foundation models & code specialization",
      e => /llama[\s-]?2|code[\s-]?llama/i.test(e.name));
    addFamily("meta-vision-audio", "Computer Vision & Generative Audio", "Segment Anything 2, MusicGen & self-supervised vision",
      e => /sam|segment|musicgen|roberta|dinov2/i.test(e.name));
    addFamily("meta-tooling", "Frameworks, Runtimes & Datasets", "PyTorch, llama.cpp, TorchRec & GAIA benchmark",
      e => e.type !== "Model" || /pytorch|llama\.cpp|gaia/i.test(e.name), "framework");
  }

  // 5. DeepSeek AI Model Families
  else if (normLab.includes("deepseek")) {
    addFamily("deepseek-v4", "DeepSeek V4 Generation", "Next-gen MoE reasoning & multimodal flash checkpoints",
      e => /v4|v4\.1/i.test(e.name));
    addFamily("deepseek-r1", "DeepSeek R1 Open Reasoning Series", "Revolutionary reinforcement learning reasoning models",
      e => /r1|distill/i.test(e.name));
    addFamily("deepseek-v3", "DeepSeek V3 & V2 MoE Series", "Ultra-efficient 671B MoE architectures with MLA",
      e => /v3|v2\.5|v2\b/i.test(e.name));
    addFamily("deepseek-coder-math", "Specialized Coding & Mathematics", "DeepSeek-Coder and DeepSeek-Math foundation checkpoints",
      e => /coder|math/i.test(e.name));
    addFamily("deepseek-apps", "Applications & Platforms", "DeepSeek Chat web application and developer APIs",
      e => e.type !== "Model", "app");
  }

  // 6. Mistral AI Model Families
  else if (normLab.includes("mistral")) {
    addFamily("mistral-large-4", "Mistral Large 4 Series", "Frontier commercial multilingual reasoning architecture",
      e => /mistral\s*large\s*4/i.test(e.name));
    addFamily("mistral-large", "Mistral Large & Flagship Series", "Top-tier commercial enterprise models (Mistral Large 2)",
      e => /mistral\s*large/i.test(e.name));
    addFamily("pixtral", "Pixtral Multimodal Series", "Native multimodal vision understanding & document parsing",
      e => /pixtral/i.test(e.name));
    addFamily("codestral", "Codestral Developer Series", "22B code generation & Fill-in-the-Middle architectures",
      e => /codestral/i.test(e.name));
    addFamily("mixtral", "Mixtral Sparse MoE Family", "Pioneering 8x7B and 8x22B Mixture-of-Experts releases",
      e => /mixtral/i.test(e.name));
    addFamily("mistral-compact", "Compact & Open Weights Series", "Mistral 7B, Mistral NeMo & Mistral Small",
      e => /mistral[\s-]?(7b|nemo|small)/i.test(e.name));
    addFamily("mistral-apps", "Applications & Assistant Services", "Mistral Le Chat and enterprise platform runtimes",
      e => e.type !== "Model", "app");
  }

  // 7. Alibaba (Qwen) Model Families
  else if (normLab.includes("alibaba") || normLab.includes("qwen")) {
    addFamily("qwen-2-5-max", "Qwen 2.5-Max & Flagships", "Alibaba's largest frontier reasoning model",
      e => /2\.5-max|qwen4/i.test(e.name));
    addFamily("qwen-2-5", "Qwen 2.5 General Foundation", "High-capability open-weights models (72B, 32B, 14B, 7B)",
      e => /qwen[\s-]?2\.5\b/i.test(e.name) && !/coder|math|vl/i.test(e.name));
    addFamily("qwen-reasoning", "QwQ Reasoning & Specialized", "QwQ-32B, Qwen-Coder and Qwen-Math releases",
      e => /qwq|coder|math/i.test(e.name));
    addFamily("qwen-vision-media", "Qwen Multimodal & Visual Media", "Wan 2.1 video generation, Qwen2-VL & image models",
      e => /wan|vl|video|image|edit/i.test(e.name));
    addFamily("qwen-next-gen", "Qwen Next-Gen & Quantized", "Qwen3.8 series and GGUF community checkpoints",
      e => /qwen3\.8|gguf/i.test(e.name));
  }

  // 8. xAI Model Families
  else if (normLab.includes("xai") || normLab.includes("grok")) {
    addFamily("grok-4", "Grok 4.7 & Frontier Generation", "Next-gen real-time frontier reasoning & agentic execution",
      e => /grok[\s-]?4/i.test(e.name));
    addFamily("grok-3", "Grok 3 Series", "Massive supercomputer-trained reasoning & deep coding",
      e => /grok[\s-]?3/i.test(e.name));
    addFamily("grok-legacy", "Grok 2 & Grok 1 Series", "Real-time X knowledge synthesis and vision checkpoints",
      e => /grok[\s-]?(2|1)/i.test(e.name));
    addFamily("grok-apps", "Grok Applications & Services", "Conversational interface & platform tooling",
      e => e.type !== "Model", "app");
  }

  // 9. Microsoft Model Families
  else if (normLab.includes("microsoft")) {
    addFamily("phi-4", "Phi-4 Small Language Models (SLMs)", "State-of-the-art compact reasoning & synthetic data",
      e => /phi-?4/i.test(e.name));
    addFamily("phi-3", "Phi-3 & Phi-3.5 Series", "Efficient edge models (Mini, Medium, Vision, MoE)",
      e => /phi-?3/i.test(e.name));
    addFamily("autogen-agents", "Autonomous Agent Frameworks", "AutoGen multi-agent orchestration runtime",
      e => /autogen|semantic/i.test(e.name), "framework");
    addFamily("ms-copilot", "AI Copilots & Enterprise Services", "GitHub Copilot and Microsoft Copilot platforms",
      e => /copilot/i.test(e.name), "app");
    addFamily("ms-research", "Research Foundation Models & Datasets", "ResNet, LLaVA, MS COCO and foundational vision",
      e => e.type === "Dataset" || /resnet|llava|coco/i.test(e.name), "dataset");
  }

  // 10. Dynamic Fallback for remaining items or other labs
  const remaining = entries.filter(e => !assigned.has(e.name));
  if (remaining.length > 0) {
    // Cluster remaining models by common brand / series prefix if 2+ share it
    const prefixMap = new Map<string, Entry[]>();
    for (const e of remaining) {
      if (e.type === "Model") {
        const words = e.name.trim().split(/[\s-_]+/);
        const prefix = words[0];
        if (!prefixMap.has(prefix)) prefixMap.set(prefix, []);
        prefixMap.get(prefix)!.push(e);
      }
    }

    for (const [prefix, list] of prefixMap.entries()) {
      if (list.length >= 2) {
        addFamily(
          `prefix-${prefix.toLowerCase()}`,
          `${prefix} Series`,
          `Curated ${prefix} foundation models & variants`,
          e => list.some(item => item.name === e.name),
          "model"
        );
      }
    }

    // Now group any still unassigned entries by their primary Type
    const stillUnassigned = entries.filter(e => !assigned.has(e.name));
    if (stillUnassigned.length > 0) {
      const models = stillUnassigned.filter(e => e.type === "Model");
      const frameworks = stillUnassigned.filter(e => e.type === "Framework");
      const datasets = stillUnassigned.filter(e => e.type === "Dataset");
      const platforms = stillUnassigned.filter(e => e.type === "Platform");
      const apps = stillUnassigned.filter(e => e.type === "AI");

      if (models.length > 0) {
        addFamily(
          "models-foundation",
          "Foundation & Specialized Models",
          "Verified generative architectures, checkpoints & weights",
          e => models.some(m => m.name === e.name),
          "model"
        );
      }
      if (frameworks.length > 0) {
        addFamily(
          "frameworks-tools",
          "Frameworks, Libraries & Orchestration",
          "Developer SDKs, fine-tuning runtimes and agent tools",
          e => frameworks.some(f => f.name === e.name),
          "framework"
        );
      }
      if (datasets.length > 0) {
        addFamily(
          "datasets-corpora",
          "Datasets, Corpora & Benchmarks",
          "Evaluation benchmarks and pre-training datasets",
          e => datasets.some(d => d.name === e.name),
          "dataset"
        );
      }
      if (platforms.length > 0) {
        addFamily(
          "platforms-apis",
          "Platforms, APIs & Cloud Runtimes",
          "Inference endpoints, hubs and developer environments",
          e => platforms.some(p => p.name === e.name),
          "platform"
        );
      }
      if (apps.length > 0) {
        addFamily(
          "apps-assistants",
          "AI Applications & Autonomous Agents",
          "User-facing assistants and autonomous applications",
          e => apps.some(a => a.name === e.name),
          "app"
        );
      }
    }
  }

  return families;
}

// ─── Ecosystem Tiers for Directory Organization ────────────────────────────────
export interface EcosystemTier {
  id: string;
  name: string;
  shortTitle: string;
  description: string;
  badge: string;
  iconName: "Crown" | "Globe" | "Zap" | "Wrench" | "Palette" | "GraduationCap";
  labs: string[];
}

export const ECOSYSTEM_TIERS: EcosystemTier[] = [
  {
    id: "frontier",
    name: "Frontier Intelligence Giants",
    shortTitle: "Frontier Labs",
    description: "Global leaders driving frontier reasoning, trillion-token agentic architectures, and massive foundation scaling.",
    badge: "Frontier Giants",
    iconName: "Crown",
    labs: ["OpenAI", "Google DeepMind", "Anthropic", "xAI", "Thinking Machines"],
  },
  {
    id: "open-weights",
    name: "Open-Weights & Foundation Champions",
    shortTitle: "Open Weights",
    description: "Pioneers democratizing high-capability open weights, Mixture-of-Experts, and open-source foundation pipelines.",
    badge: "Open Weights",
    iconName: "Globe",
    labs: ["Meta AI", "DeepSeek AI", "Mistral AI", "Alibaba (Qwen)", "Hugging Face", "Liquid AI", "InclusionAI", "Nous Research", "Zyphra"],
  },
  {
    id: "innovators",
    name: "Next-Gen AI Innovators & Emerging Leaders",
    shortTitle: "Innovators",
    description: "Rapidly innovating research laboratories advancing long context, distillation, and specialized foundation models.",
    badge: "Innovators",
    iconName: "Zap",
    labs: [
      "Zhipu AI (THUDM)", "Moonshot AI", "MiniMax", "StepFun", "Xiaomi (MiMo)",
      "Baidu", "Tencent", "ByteDance", "Cohere", "Stability AI", "Black Forest Labs",
      "Upstage", "LG AI Research", "KT", "Nex AGI", "RadixArk", "Meituan (LongCat)", "Aleph Alpha"
    ],
  },
  {
    id: "infrastructure",
    name: "Enterprise Runtimes, Agents & Cloud Platforms",
    shortTitle: "Infrastructure",
    description: "Hyperscalers, inference accelerators, agent orchestrators, and developer platforms powering production AI.",
    badge: "Infrastructure",
    iconName: "Wrench",
    labs: [
      "Microsoft", "NVIDIA", "Amazon Web Services", "Apple", "IBM", "ServiceNow", "Groq",
      "Together AI", "Perplexity", "Cursor (Anysphere)", "Cognition AI", "Pruna AI",
      "CrewAI", "Unsloth AI", "Ollama", "LangChain", "LlamaIndex", "Weights & Biases",
      "LMSYS Org", "OpenBMB", "Multiverse Computing"
    ],
  },
  {
    id: "creative",
    name: "Creative Media, Visual & Audio Synthesis",
    shortTitle: "Creative Media",
    description: "Specialized generative computing studios delivering industry-standard video, voice cloning, and photorealism.",
    badge: "Creative Media",
    iconName: "Palette",
    labs: ["Midjourney", "Runway", "ElevenLabs", "Suno", "Adobe", "Bria AI", "Pika Labs", "Krea AI", "Genmo", "Lightricks", "Hexgrad"],
  },
  {
    id: "research",
    name: "Academic Institutes & Open Consortia",
    shortTitle: "Academic Research",
    description: "Foundational universities and independent institutes publishing seminal benchmarks and peer-reviewed open architectures.",
    badge: "Research & Universities",
    iconName: "GraduationCap",
    labs: [
      "Stanford AI", "UC Berkeley (BAIR)", "Allen Institute for AI",
      "Technology Innovation Institute (TII)", "OpenMOSS", "EleutherAI", "LAION",
      "Cloudflare", "Vercel"
    ],
  },
];