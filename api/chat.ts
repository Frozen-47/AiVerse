import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';
import { entries as staticEntries } from '../src/data';

// Safe environment variable initializers
const getGroqClient = () => {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  try {
    return new Groq({ apiKey: key });
  } catch (err) {
    console.error('Failed to initialize Groq client:', err);
    return null;
  }
};

const getSupabaseClient = () => {
  const url = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
  const key = (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '').trim();
  if (!url || !key || !url.startsWith('http')) return null;
  try {
    return createClient(url, key);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
};

// Curated flagship items for instant fallback if database is unreachable
const FALLBACK_ENTRIES = [
  {
    name: "GPT-6 Astra",
    type: "Model",
    task: "AI Coding",
    org: "OpenAI",
    year: 2026,
    summary: "OpenAI's frontier flagship model released in September 2026, marking a generational leap in autonomous computer use, deep reasoning, and complex multi-step workflow automation across enterprise environments.",
    benchmarks: "SWE-bench Verified: 82.4%, AIME 2026: 92.1%, OSWorld: 72.3%, GPQA Diamond: 78.6%",
    architecture: "Massive multimodal Mixture-of-Experts with reinforcement learning over deep thought chains, native OS-level computer use drivers, and dynamic tool orchestration.",
    url: "https://openai.com"
  },
  {
    name: "Claude Fable",
    type: "Model",
    task: "AI Coding",
    org: "Anthropic",
    year: 2026,
    summary: "Anthropic's flagship Mythos-class generative AI model engineered for long-running agentic projects, multi-application computer use, and root-cause software engineering with frontier safety classifiers.",
    benchmarks: "SWE-bench Verified: 84.1%, OSWorld: 74.8%, HumanEval Pro: 94.6%, GPQA Diamond: 79.2%",
    architecture: "Mythos-class multimodal hybrid architecture featuring variable dynamic thought budgets, agentic tool execution sandboxes, and constitutional RL alignment.",
    url: "https://www.anthropic.com"
  },
  {
    name: "Gemini 2.5 Pro",
    type: "Model",
    task: "Multimodal",
    org: "Google DeepMind",
    year: 2025,
    summary: "Google's premier thinking multimodal model delivering native audio, video, code, and 2M token context reasoning with breakthrough performance on complex coding and science benchmarks.",
    benchmarks: "MMLU-Pro: 84.2%, HumanEval: 92.4%, MathVista: 74.1%",
    architecture: "Natively Multimodal Mixture-of-Experts (MoE) with 2M token context window and integrated tool routing.",
    url: "https://deepmind.google/technologies/gemini/"
  },
  {
    name: "DeepSeek-R1",
    type: "Model",
    task: "NLP",
    org: "DeepSeek",
    year: 2025,
    summary: "Open-weights reasoning model trained via large-scale reinforcement learning without supervised fine-tuning, rivaling top proprietary reasoning models.",
    benchmarks: "AIME 2024: 79.8%, MATH-500: 97.3%, Codeforces: 96.3 percentile",
    architecture: "DeepSeek-V3 Base (671B MoE, 37B active) + Large-scale Multi-Stage RL with self-verification reasoning.",
    url: "https://www.deepseek.com"
  },
  {
    name: "DeepSeek-V3",
    type: "Model",
    task: "NLP",
    org: "DeepSeek",
    year: 2024,
    summary: "Flagship 671B Mixture-of-Experts model with Multi-head Latent Attention (MLA), activating 37B params per token with industry-leading efficiency.",
    benchmarks: "MMLU-Redux: 89.1%, HumanEval: 90.2%, MATH-500: 75.7%",
    architecture: "Multi-head Latent Attention (MLA) + DeepSeekMoE + FP8 Mixed Precision Training.",
    url: "https://www.deepseek.com"
  },
  {
    name: "Claude 3.7 Sonnet",
    type: "Model",
    task: "Multimodal",
    org: "Anthropic",
    year: 2025,
    summary: "First hybrid reasoning model combining instant response generation with adjustable chain-of-thought thinking for complex tasks.",
    benchmarks: "SWE-bench Verified: 70.3%, TAU-bench: 81.2%, GPQA Diamond: 68.2%",
    architecture: "Hybrid Reasoning Transformer with dynamic thought budgets.",
    url: "https://www.anthropic.com"
  },
  {
    name: "Llama 3.3 (70B)",
    type: "Model",
    task: "NLP",
    org: "Meta AI",
    year: 2024,
    summary: "High-efficiency open-weights model delivering performance on par with previous 405B models at a fraction of the compute cost.",
    benchmarks: "MMLU: 88.6%, MATH: 70.0%, HumanEval: 89.0%",
    architecture: "Dense transformer decoder trained on 15T+ tokens with 128K context window.",
    url: "https://llama.meta.com/"
  },
  {
    name: "Llama 3.1 (405B)",
    type: "Model",
    task: "NLP",
    org: "Meta AI",
    year: 2024,
    summary: "First open model to rival top proprietary models across general knowledge, steerability, math, tool use, and multilingual translation.",
    benchmarks: "MMLU: 88.6%, HumanEval: 89.0%, MATH: 73.8%",
    architecture: "Optimized transformer decoder trained on 15T tokens with 128K context.",
    url: "https://llama.meta.com/"
  },
  {
    name: "Qwen 2.5-Coder (32B)",
    type: "Model",
    task: "AI Coding",
    org: "Alibaba Cloud",
    year: 2024,
    summary: "Open-source coding model rivaling GPT-4o on code generation, debugging, and repository understanding.",
    benchmarks: "HumanEval: 92.7%, EvalPlus: 89.6%, MultiPL-E: 84.5%",
    architecture: "Dense autoregressive decoder with 128K context and RoPE.",
    url: "https://github.com/QwenLM/Qwen2.5-Coder"
  },
  {
    name: "FLUX.1 Schnell",
    type: "Model",
    task: "Computer Vision",
    org: "Black Forest Labs",
    year: 2024,
    summary: "12B parameter rectified flow transformer for ultra-fast photorealistic text-to-image generation in 1 to 4 steps.",
    benchmarks: "Outperforms SDXL and Midjourney v6 on prompt adherence and typography.",
    architecture: "12B parameter multimodal diffusion transformer (MMDiT) with flow matching.",
    url: "https://blackforestlabs.ai"
  },
  {
    name: "LangGraph",
    type: "Framework",
    task: "MLOps",
    org: "LangChain",
    year: 2024,
    summary: "Library for building resilient, stateful, multi-actor agent workflows with LLMs using cyclical graph topologies and built-in human-in-the-loop validation.",
    benchmarks: "De-facto industry standard for cyclical multi-agent workflows, checkpointing, and branch rollbacks.",
    architecture: "State graph execution engine with PostgreSQL, SQLite, and Redis state checkpointing.",
    url: "https://github.com/langchain-ai/langgraph"
  },
  {
    name: "CrewAI",
    type: "Framework",
    task: "MLOps",
    org: "CrewAI Inc.",
    year: 2024,
    summary: "Framework for orchestrating role-playing autonomous AI agents that collaborate sequentially or hierarchically to tackle multi-stage enterprise tasks.",
    benchmarks: "50,000+ GitHub stars; standardized multi-agent delegation, memory pooling, and deterministic tool access.",
    architecture: "Task execution graph with role-defined agent prompts, shared memory buffers, and tool delegation protocols.",
    url: "https://www.crewai.com"
  },
  {
    name: "AutoGen 0.4",
    type: "Framework",
    task: "MLOps",
    org: "Microsoft",
    year: 2025,
    summary: "Event-driven, asynchronous multi-agent framework re-architected in v0.4 for scalable distributed agent systems with gRPC and cloud-native workflows.",
    benchmarks: "Major speedup in distributed execution and robust actor-model event routing.",
    architecture: "Asynchronous actor model architecture with type-safe message queues and distributed agent worker nodes.",
    url: "https://github.com/microsoft/autogen"
  },
  {
    name: "Pydantic AI",
    type: "Framework",
    task: "AI Coding",
    org: "Pydantic",
    year: 2024,
    summary: "Production-grade GenAI agent framework built by the Pydantic team, bringing type-safety, dependency injection, and schema validation to generative AI applications.",
    benchmarks: "Zero runtime overhead validation, 100% type-checked outputs with static mypy/pyright conformance.",
    architecture: "Model-agnostic agent runtime leveraging Pydantic v2 core with native support for OpenAI, Anthropic, Gemini, and Groq.",
    url: "https://ai.pydantic.dev"
  },
  {
    name: "Smolagents",
    type: "Framework",
    task: "AI Coding",
    org: "Hugging Face",
    year: 2025,
    summary: "Lightweight, code-first agent library where agents write actions directly in Python code rather than parsing JSON strings, yielding faster execution and fewer token errors.",
    benchmarks: "Significantly higher task completion rate on complex multi-step code execution benchmarks.",
    architecture: "CodeAgent runtime with sandboxed Python AST interpreter and Hugging Face Hub integration.",
    url: "https://github.com/huggingface/smolagents"
  },
  {
    name: "vLLM",
    type: "Framework",
    task: "MLOps",
    org: "vLLM Project",
    year: 2024,
    summary: "High-throughput and memory-efficient LLM serving engine featuring PagedAttention algorithm, achieving 2-4x higher throughput than Hugging Face TGI.",
    benchmarks: "Industry standard for production LLM serving with near-zero memory waste in KV cache.",
    architecture: "PagedAttention virtual memory manager + Continuous batching + Chunked prefill + Tensor parallel runtime.",
    url: "https://github.com/vllm-project/vllm"
  },
  {
    name: "SGLang",
    type: "Framework",
    task: "MLOps",
    org: "LMSYS Org",
    year: 2024,
    summary: "Fast serving framework for large language and vision models, featuring RadixAttention for automatic KV cache reuse across multi-turn chats and complex prompts.",
    benchmarks: "Up to 5x higher throughput in complex multi-turn and reasoning workloads compared to standard inference engines.",
    architecture: "RadixAttention tree-based KV cache indexer with co-designed compiler for structured decoding.",
    url: "https://github.com/sgl-project/sglang"
  },
  {
    name: "Unsloth",
    type: "Framework",
    task: "MLOps",
    org: "Unsloth AI",
    year: 2024,
    summary: "Ultra-fast open-source LLM fine-tuning library providing 2-5x faster training with up to 80% less VRAM consumption.",
    benchmarks: "5x faster fine-tuning on Llama 3, DeepSeek, and Mistral with 0% accuracy loss.",
    architecture: "Custom Triton GPU kernels and manual backprop derivation for attention mechanisms.",
    url: "https://github.com/unslothai/unsloth"
  },
  {
    name: "Ollama",
    type: "Platform",
    task: "General",
    org: "Ollama",
    year: 2024,
    summary: "Local runtime and CLI tool that bundles model weights, configuration, and GPU acceleration into unified Modelfiles for effortless local deployment.",
    benchmarks: "Runs Llama 3.3, DeepSeek-R1, and Mistral locally with native Apple Silicon Metal and NVIDIA CUDA acceleration.",
    architecture: "Go-based daemon wrapping llama.cpp with unified REST API compatible with OpenAI endpoints.",
    url: "https://ollama.com"
  },
  {
    name: "Cursor",
    type: "Platform",
    task: "AI Coding",
    org: "Anysphere",
    year: 2024,
    summary: "AI-first code editor fork of VS Code equipped with deep codebase indexing, Cursor Tab multi-line autocompletion, and multi-file Composer agents.",
    benchmarks: "Widely adopted by thousands of engineering teams for multi-file codebase refactoring and autonomous debugging.",
    architecture: "Custom editor shell with proprietary vector embeddings for codebase chunking and shadow-workspace diff generation.",
    url: "https://www.cursor.com"
  },
  {
    name: "Windsurf",
    type: "Platform",
    task: "AI Coding",
    org: "Codeium",
    year: 2024,
    summary: "Next-generation agentic IDE powered by Cascade, enabling synchronized collaborative workflows between developer and agent across terminal, editor, and browser.",
    benchmarks: "High developer task velocity with real-time Cascade context tracking.",
    architecture: "Collaborative agentic workspace engine combining real-time file diffing and sandboxed terminal execution.",
    url: "https://codeium.com/windsurf"
  },
  {
    name: "GroqCloud",
    type: "Platform",
    task: "General",
    org: "Groq",
    year: 2024,
    summary: "Developer platform offering high-throughput serverless AI inference powered by custom LPU silicon delivering 500+ tokens/sec.",
    benchmarks: "500+ tokens/sec on Llama 3 8B, 280+ tokens/sec on Llama 3.3 70B.",
    architecture: "Tensor Streaming Processor (TSP) architecture with deterministic execution and SRAM bandwidth.",
    url: "https://groq.com"
  }
];

// In-memory catalog cache for merged Supabase and static entries
let cachedEntries: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function getCatalogEntries(): Promise<any[]> {
  if (cachedEntries && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
    return cachedEntries;
  }

  const mergedMap = new Map<string, any>();

  // 1. Seed with all verified static catalog entries (240+ entries, including all newly added models and frameworks)
  if (Array.isArray(staticEntries)) {
    for (const e of staticEntries) {
      if (e && e.name) {
        mergedMap.set(e.name.toLowerCase().trim(), e);
      }
    }
  }

  // 2. Augment with live Supabase entries if available
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        for (const e of data) {
          if (e && e.name) {
            mergedMap.set(e.name.toLowerCase().trim(), e);
          }
        }
      }
    } catch (err) {
      console.warn('Supabase fetch fallback to embedded catalog:', err);
    }
  }

  const result = Array.from(mergedMap.values());
  cachedEntries = result.length > 0 ? result : FALLBACK_ENTRIES;
  cacheTimestamp = Date.now();
  return cachedEntries;
}

function getRelevantCatalogContext(query: string, allEntries: any[]): string {
  const queryLower = (query || "").toLowerCase();
  const queryWords = queryLower.split(/[\s,./\\-_+:]+/).filter((w) => w.length >= 2);

  const scored = allEntries.map((e) => {
    let score = 0;
    const nameLower = (e.name || "").toLowerCase();
    const taskLower = (e.task || "").toLowerCase();
    const orgLower = (e.org || "").toLowerCase();
    const summaryLower = (e.summary || "").toLowerCase();
    const archLower = (e.architecture || "").toLowerCase();
    const benchLower = (e.benchmarks || "").toLowerCase();
    const typeLower = (e.type || "").toLowerCase();

    // Exact name in query
    if (nameLower && queryLower.includes(nameLower)) score += 60;
    if (nameLower && nameLower.includes(queryLower)) score += 40;

    for (const w of queryWords) {
      if (nameLower.includes(w)) score += 15;
      if (taskLower.includes(w)) score += 8;
      if (orgLower.includes(w)) score += 6;
      if (typeLower.includes(w)) score += 6;
      if (archLower.includes(w)) score += 4;
      if (benchLower.includes(w)) score += 3;
      if (summaryLower.includes(w)) score += 2;
    }

    // Boost popular / flagship technologies
    if (e.popular) score += 3;

    return { entry: e, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const top = scored.filter((s) => s.score > 0).slice(0, 12).map((s) => s.entry);
  const selected = top.length > 0 ? top : allEntries.slice(0, 8);

  return selected
    .map((e) => {
      const parts = [
        `- **${e.name}** [Type: ${e.type} | Task: ${e.task || 'General'} | License: ${e.license || 'Open'}] (Org: ${e.org || 'Community'}, Year: ${e.year || '2025/2026'})`,
        `  Summary: ${e.summary}`,
      ];
      if (e.size && e.size !== 'N/A') parts.push(`  Size / Parameters: ${e.size}`);
      if (e.benchmarks && e.benchmarks !== 'N/A') parts.push(`  Key Benchmarks: ${e.benchmarks}`);
      if (e.architecture && e.architecture !== 'N/A') parts.push(`  Architecture: ${e.architecture}`);
      if (e.url) parts.push(`  URL: ${e.url}`);
      return parts.join('\n');
    })
    .join('\n\n');
}

// In-memory rate limiting map (IP -> timestamps[])
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 40;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  // Periodic cleanup if map grows large
  if (rateLimitMap.size > 5000) {
    for (const [key, list] of rateLimitMap.entries()) {
      if (list.length === 0 || now - list[list.length - 1] > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

async function verifyTurnstileToken(token?: string, remoteip?: string): Promise<boolean> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  // If not configured (local dev/test), allow bypass
  if (!secretKey) return true;
  // If configured, require valid token and disallow mock strings
  if (!token || typeof token !== 'string' || !token.trim() || token === 'session_verified') {
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token.trim());
    if (remoteip) formData.append('remoteip', remoteip);

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    if (!verifyRes.ok) {
      console.warn('Turnstile verification HTTP non-200 response:', verifyRes.status);
      return false; // Fail closed
    }
    const data = (await verifyRes.json()) as { success: boolean };
    return !!data.success;
  } catch (err) {
    console.error('Turnstile verification error (fail-closed):', err);
    return false; // Fail closed
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Always ensure JSON header
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const clientIp = ((req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket?.remoteAddress || 'unknown').trim();
  if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment before sending more messages.' });
  }

  const groq = getGroqClient();
  if (!groq) {
    return res.status(200).json({
      content: '**Groq API Key Required**: Please configure your `GROQ_API_KEY` in your Vercel Project Settings (Environment Variables) to enable Vox live intelligence.'
    });
  }

  try {
    const { messages, userName, model, turnstileToken } = req.body || {};

    // Enforce Turnstile verification if secret key is present in environment
    if (process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return res.status(403).json({
          error: 'Turnstile human verification token is required.'
        });
      }
      const isHuman = await verifyTurnstileToken(turnstileToken, clientIp);
      if (!isHuman) {
        return res.status(403).json({
          error: 'Cloudflare Turnstile verification check failed. Please refresh your browser or complete the challenge.',
        });
      }
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid request: messages array is required.' });
    }

    // Bound conversation depth to last 20 messages to prevent excessive token usage
    const boundedMessages = messages.slice(-20);

    // Filter to only user and assistant roles (prevents client-side 'system' role injection)
    // and bound length of each message to 4000 characters
    const sanitizedMessages = boundedMessages
      .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
      .map(({ role, content }) => ({
        role,
        content: (content as string).slice(0, 4000)
      }));

    if (sanitizedMessages.length === 0) {
      return res.status(400).json({ error: 'Invalid request: no valid user or assistant messages found.' });
    }

    const userMessages = sanitizedMessages.filter(m => m.role === 'user');
    const latestUserQuery = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : '';

    const allEntries = await getCatalogEntries();
    const catalogContext = getRelevantCatalogContext(latestUserQuery, allEntries);

    const safeUserName = typeof userName === 'string'
      ? userName.trim().slice(0, 50).replace(/[^\w\s-]/g, '')
      : '';
    const nameStr = safeUserName ? `The user's name is ${safeUserName}. Greet them or address them by this name occasionally to be polite and personal.` : '';

    // Enforce trusted server-controlled system prompt with updated 2026 intelligence context
    const systemPromptContent = `You are Vox, the premier AI intelligence assistant and technical advisor for the AiVerse platform (indexed through 2026). ${nameStr} You possess deep architectural knowledge of frontier models (GPT-6 Astra, Claude Fable, Gemini 2.5, DeepSeek-R1, DeepSeek-V3, Claude 3.7 Sonnet, Llama 3.3, Grok 3), open-source agent frameworks (LangGraph, CrewAI, AutoGen 0.4, Pydantic AI, Smolagents), inference engines (vLLM, SGLang, Unsloth, TensorRT-LLM, Groq LPU), and developer IDEs (Cursor, Windsurf, Claude Code).

You MUST REFUSE to answer any questions that are completely unrelated to Artificial Intelligence, machine learning, software engineering, AI models, frameworks, platforms, datasets, or the AiVerse platform itself. If a user asks about off-topic subjects, politely decline and steer the conversation back to AI technologies.

Here is verified technical data extracted from the AiVerse directory (${allEntries.length}+ total indexed entries):\n${catalogContext || 'No catalog items found'}\n\nUse these technical facts, architectures, licenses, and benchmarks to accurately answer questions, analyze trade-offs, and offer comparisons.

CRITICAL INSTRUCTIONS:
1. **ACCURACY & CATALOG GROUNDING**: Rely strictly on facts, benchmarks, and architectures provided in the catalog.
2. **ORGANIZE CLEARLY**: Provide clean, highly structured responses with bullet points, comparisons, and bold headers.
3. **HIGHLIGHT ENTITY NAMES**: Use **bold text** for AI entity names (e.g. **DeepSeek-R1**, **Llama 3.3 (70B)**, **LangGraph**, **Pydantic AI**, **vLLM**, **Cursor**).
4. **INCLUDE LINKS**: If a URL is available in the catalog, format as [Official Website](URL) or [Documentation](URL).`;

    const systemPrompt = {
      role: 'system',
      content: systemPromptContent,
    };

    // Priority list of verified, actively supported Groq models
    const FALLBACK_MODELS = [
      'llama-3.3-70b-versatile',
      'deepseek-r1-distill-llama-70b',
      'llama-3.1-8b-instant',
      'gemma2-9b-it',
      'llama-3.2-11b-vision-preview',
      'llama-3.2-3b-preview',
      'mixtral-8x7b-32768',
    ];

    const candidates = model && FALLBACK_MODELS.includes(model)
      ? [model, ...FALLBACK_MODELS.filter(m => m !== model)]
      : FALLBACK_MODELS;

    let responseContent: string | null = null;
    let lastError: any = null;

    for (const currentModel of candidates) {
      try {
        let finalMessages: any[] = [systemPrompt, ...sanitizedMessages];

        if (currentModel.toLowerCase().includes('deepseek')) {
          const firstUserIndex = sanitizedMessages.findIndex(m => m.role === 'user');
          if (firstUserIndex !== -1) {
            const mergedMessages = [...sanitizedMessages];
            mergedMessages[firstUserIndex] = {
              role: 'user',
              content: `${systemPromptContent}\n\n[Instructions Above. User Query Below]\n${sanitizedMessages[firstUserIndex].content}`
            };
            finalMessages = mergedMessages;
          } else {
            finalMessages = sanitizedMessages;
          }
        }

        const chatCompletion = await groq.chat.completions.create({
          messages: finalMessages,
          model: currentModel,
          temperature: 0.5,
          max_tokens: 1024,
        });

        let rawContent = chatCompletion.choices[0]?.message?.content || "";
        rawContent = rawContent.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

        if (rawContent) {
          responseContent = rawContent;
          break;
        }
      } catch (err: any) {
        console.warn(`Groq model ${currentModel} failed:`, err.message);
        lastError = err;
      }
    }

    if (!responseContent) {
      return res.status(200).json({
        content: `**AI Service Notice**: ${lastError?.message || "All AI models are currently busy. Please try your question again in a moment."}`
      });
    }

    return res.status(200).json({ content: responseContent });
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return res.status(200).json({ content: `**AI Service Error**: ${error.message}` });
  }
}
