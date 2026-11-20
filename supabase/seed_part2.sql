-- =============================================================================
-- AiVerse: Full Catalog Part 2 of 2 (383 entries)
-- Run this script in Supabase Dashboard -> SQL Editor
-- =============================================================================

-- 1. Ensure platform administrator authorization includes both platform owner emails
CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT 
    auth.jwt() ->> 'email' IN ('frozennheart47@gmail.com', 'sabareeshgm47@gmail.com')
    OR auth.jwt() ->> 'sub' = '20f48b0a-737d-4b78-9098-847a8ba450e8'
    OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin';
$$;

GRANT EXECUTE ON FUNCTION private.is_admin() TO anon, authenticated;

-- 2. Upsert 383 entries into public.entries

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Open-Jev', 'ZefanCai', 'Dataset', 'NLP', 'CC0-1.0', 2026, '100K<n<1M', 'Open-source multi-hop reasoning dataset curated by Zefan Cai, comprising 180,000 complex logical puzzles, deductive syllogisms, and algorithmic proof chains. Designed specifically to train self-correction and iterative chain-of-thought capabilities in open-weights reasoning models.', 'Structured JSON/Parquet dataset with multi-step proof traces, premise-conclusion graphs, and formal logic annotations.', 'from datasets import load_dataset

dataset = load_dataset("ZefanCai/Open-Jev")', '180,000 verified reasoning problems; establishes benchmark for formal deductive accuracy in LLMs.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ZefanCai/Open-Jev', '[{"url":"https://huggingface.co/datasets/ZefanCai/Open-Jev","text":"ZefanCai/Open-Jev on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('open-yap-1k', 'TheAgenticDataCompany', 'Dataset', 'Audio', 'CC-BY-4.0', 2026, 'n<1K', '1,000-hour conversational audio dataset curated by TheAgenticDataCompany, containing multi-speaker natural dialogues paired with phoneme-level time-aligned transcripts, speaker diarization flags, and turn-taking annotations for training conversational voice agents.', 'High-fidelity 24kHz FLAC audio recordings paired with JSON-formatted time-aligned transcriptions and acoustic metadata.', 'from datasets import load_dataset

dataset = load_dataset("TheAgenticDataCompany/open-yap-1k")', '1,000 hours of multi-party spontaneous speech; benchmark for voice agent interruption and turn-taking modeling.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/TheAgenticDataCompany/open-yap-1k', '[{"url":"https://huggingface.co/datasets/TheAgenticDataCompany/open-yap-1k","text":"TheAgenticDataCompany/open-yap-1k on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenAI Platform', 'OpenAI', 'Platform', 'MLOps', 'Proprietary', 2020, 'N/A', 'OpenAI''s developer API platform providing access to GPT-4, DALL-E, Whisper, embeddings, and fine-tuning capabilities. Its cloud and infrastructure runtime provides rEST API with model routing, rate limiting, and usage tracking. Built for enterprise scalability and reliability, it offers high-throughput API endpoints, automated workflows, and robust developer integrations. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'REST API with model routing, rate limiting, and usage tracking.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_API_KEY")
response = client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role": "user", "content": "Hello!"}]
)', 'N/A', 'Pay-per-token pricing, rate limits on free tier, proprietary.', 'https://platform.openai.com', '[{"text":"OpenAI API Documentation","url":"https://platform.openai.com/docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('openai-math', 'OpenAI', 'Dataset', 'AI Coding', 'APACHE-2.0', 2026, 'n<1K', 'openai/math as Harbor environments Experimental. Built on a research release that is itself new and not yet independently reviewed. Expect rough edges, and read any p (60 likes, 2,587 downloads). The corpus spans n<1K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 58, Likes: 60, Downloads: 2,587. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("FineEnvs/openai-math")', 'Trending Score: 58, Likes: 60, Downloads: 2,587', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/FineEnvs/openai-math', '[{"text":"FineEnvs/openai-math on Hugging Face Datasets","url":"https://huggingface.co/datasets/FineEnvs/openai-math"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenHands', 'All Hands AI', 'AI', 'AI Coding', 'MIT', 2024, 'N/A', 'Open-source autonomous AI software developer (formerly OpenDevin) that writes code, fixes bugs, and executes terminal commands across codebases. The application is powered by advanced foundation models utilizing docker-based sandboxed agent environment supporting various LLM providers. Key user-facing capabilities include Top open-source agent scores on SWE-bench Verified (53%+ with frontier models). Available under a MIT model for commercial and personal productivity.', 'Docker-based sandboxed agent environment supporting various LLM providers.', 'docker run -it --pull=always -e SANDBOX_USER_ID=$(id -u) -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 ghcr.io/all-hands-ai/openhands:latest', 'Top open-source agent scores on SWE-bench Verified (53%+ with frontier models).', 'Requires local Docker daemon setup for execution sandboxing.', 'https://github.com/All-Hands-AI/OpenHands', '[{"text":"OpenHands Repository","url":"https://github.com/All-Hands-AI/OpenHands"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenHermes 2.5', 'Teknium', 'Dataset', 'NLP', 'MIT', 2023, '1,001,551 examples', 'Curated dataset of 1 million diverse conversation turns, code snippets, reasoning chains, and roleplay examples used to fine-tune state-of-the-art open models. The corpus spans 1,001,551 examples of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trained OpenHermes-2.5-Mistral-7B to outperform standard 70B models in 2023. Released under the MIT license for open evaluation and research reproducibility.', 'Curated collection of synthetic and human-annotated instruction datasets (ShareGPT, Airoboros, GPTeacher).', 'from datasets import load_dataset
ds = load_dataset("teknium/OpenHermes-2.5", split="train")', 'Trained OpenHermes-2.5-Mistral-7B to outperform standard 70B models in 2023.', 'Varied data sources include diverse subjective annotation quality.', 'https://huggingface.co/datasets/teknium/OpenHermes-2.5', '[{"text":"OpenHermes 2.5 Dataset","url":"https://huggingface.co/datasets/teknium/OpenHermes-2.5"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenRouter', 'OpenRouter', 'Platform', 'MLOps', 'Proprietary', 2024, '200+ models', 'Unified API gateway and marketplace routing to 200+ AI models across dozens of providers with automatic failover, cost optimization, and open community stats. Its cloud and infrastructure runtime provides low-latency global edge API router with multi-provider fallback. Core platform telemetry and performance features include: Industry leader in model choice and real-time LLM token throughput telemetry. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Low-latency global edge API router with multi-provider fallback.', 'fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "deepseek/deepseek-r1",
    "messages": [{"role": "user", "content": "Hello!"}]
  })
})', 'Industry leader in model choice and real-time LLM token throughput telemetry.', 'Upstream provider outages can impact specific model routes.', 'https://openrouter.ai', '[{"text":"OpenRouter","url":"https://openrouter.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenVuln', 'zai-org', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by zai-org. Trending with 196 community stars. Its cloud and infrastructure runtime provides dOCKER cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 66, Community Likes: 196. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/zai-org/OpenVuln', 'Trending Score: 66, Community Likes: 196', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/zai-org/OpenVuln', '[{"text":"zai-org/OpenVuln on Hugging Face Spaces","url":"https://huggingface.co/spaces/zai-org/OpenVuln"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenWebText', 'EleutherAI / Community', 'Dataset', 'NLP', 'CC0 1.0', 2019, '38GB (~8M documents)', 'An open-source recreation of OpenAI''s WebText dataset (used to train GPT-2), scraped from Reddit-upvoted URLs. The corpus spans 38GB (~8M documents) of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Used as training data for GPT-2 replications. Released under the CC0 1.0 license for open evaluation and research reproducibility.', 'Web text from all outbound Reddit links with 3+ upvotes, scraped and deduplicated.', 'from datasets import load_dataset
dataset = load_dataset("openwebtext", split="train")', 'Used as training data for GPT-2 replications', 'English-only, Reddit bias toward certain demographics and topics.', 'https://huggingface.co/datasets/openwebtext', '[{"text":"OpenWebText on HuggingFace","url":"https://huggingface.co/datasets/openwebtext"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('opus5-5-doctor-patient-conversations-all-human-diseases', 'nisten', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '1K<n<10K', 'Opus-5.5 generated Doctor-Patient Conversations for All Human Diseases The sequel to nisten/opus-doctor-patient-conversations-all-human-diseases (Opus 4.8). Same dise (60 likes, 47 downloads). The corpus spans 1K<n<10K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 60, Likes: 60, Downloads: 47. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nisten/opus5-5-doctor-patient-conversations-all-human-diseases")', 'Trending Score: 60, Likes: 60, Downloads: 47', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nisten/opus5-5-doctor-patient-conversations-all-human-diseases', '[{"text":"nisten/opus5-5-doctor-patient-conversations-all-human-diseases on Hugging Face Datasets","url":"https://huggingface.co/datasets/nisten/opus5-5-doctor-patient-conversations-all-human-diseases"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OrcaCyber-Nano-1.0', 'orcarouter', 'Model', 'Multimodal', 'OTHER', 2026, 'Open Weights', 'OrcaRouter''s lightweight specialized language model tailored for automated cybersecurity triage, SIEM log parsing, and incident response scripting in air-gapped environments. Engineered to run efficiently on CPU or edge hardware to assist SOC analysts with real-time alert correlation.', 'Compact 1.8B parameter Transformer fine-tuned on security logs, Snort rules, YARA signatures, and MITRE taxonomies.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("orcarouter/OrcaCyber-Nano-1.0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("orcarouter/OrcaCyber-Nano-1.0")', 'SIEM log parsing accuracy: 96.4%; executes at 85 tokens/sec on commodity x86 CPUs.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0', '[{"url":"https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0","text":"orcarouter/OrcaCyber-Nano-1.0 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ornith-1.5-122B', 'ornith-ai', 'Model', 'NLP', 'MIT', 2026, '122B params', 'Ornith AI''s 122B parameter dense foundation model delivering enterprise-grade natural language understanding, multilingual translation, and structured data extraction across 80+ spoken languages. Features an extensive 128k token context window and high parameter density for complex analytical tasks.', '122B parameter dense Transformer with Grouped Query Attention, SwiGLU non-linearities, and 128k context support.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ornith-ai/Ornith-1.5-122B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ornith-ai/Ornith-1.5-122B")', 'MMLU: 85.2%, HumanEval: 82.4%, GSM8K: 90.1%, MT-Bench: 8.92', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ornith-ai/Ornith-1.5-122B', '[{"url":"https://huggingface.co/ornith-ai/Ornith-1.5-122B","text":"ornith-ai/Ornith-1.5-122B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Otter.ai', 'AISense Inc.', 'AI', 'Productivity', 'Proprietary', 2016, 'N/A', 'An AI meeting assistant that automatically transcribes, summarizes, and generates action items from voice conversations and meetings in real time. The application is powered by advanced foundation models utilizing web / Mobile Application (Proprietary ASR + NLP summarization pipeline). It features an intuitive interface designed to streamline complex productivity workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web / Mobile Application (Proprietary ASR + NLP summarization pipeline)', 'Visit otter.ai or install the mobile app; connect to Zoom, Google Meet, or MS Teams for auto-join.', 'N/A', 'Free tier limited to 300 minutes/month; accuracy drops with heavy accents or noisy audio.', 'https://otter.ai', '[{"text":"Otter.ai","url":"https://otter.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Outlines', 'dottxt', 'Framework', 'MLOps', 'Apache-2.0', 2024, 'N/A', 'Guided generation framework from.txt that forces LLMs to generate text conforming strictly to regular expressions, JSON schemas, or context-free grammars with mathematical guarantee. Under the hood, it incorporates finite-state machine (FSM) token mask generator for autoregressive sampling. Key technical highlights include: Zero JSON syntax errors with negligible sampling runtime overhead. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Finite-state machine (FSM) token mask generator for autoregressive sampling.', 'import outlines
model = outlines.models.transformers("meta-llama/Llama-3.2-3B")
generator = outlines.generate.json(model, UserSchema)
result = generator("Extract user details from text")', 'Zero JSON syntax errors with negligible sampling runtime overhead.', 'Requires tokenizer vocabulary and logit indexing access.', 'https://github.com/dottxt-ai/outlines', '[{"text":"Outlines Paper","url":"https://arxiv.org/abs/2307.09702"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PaliGemma 2', 'Google', 'Model', 'Multimodal', 'Gemma License', 2024, '3B / 10B / 28B Parameters', 'Google''s open vision-language foundation model combining SigLIP-So400m vision encoder with Gemma 2 language models across 3B, 10B, and 28B parameter configurations for visual reasoning, captioning, and OCR, incorporating an architecture of dual-encoder cross-attention architecture uniting a SigLIP vision transformer with Gemma 2 autoregressive transformer decoder supporting high-resolution image tokens. The model demonstrates competitive performance across verified evaluations, including DocVQA: 93.3%, TextVQA: 81.2%, ChartQA: 85.0%, ScienceQA: 96.1%. With its 3B / 10B / 28B Parameters design, it supports diverse local and enterprise deployment profiles under the Gemma license.', 'Dual-encoder cross-attention architecture uniting a SigLIP vision transformer with Gemma 2 autoregressive transformer decoder supporting high-resolution image tokens.', 'from transformers import PaliGemmaForConditionalGeneration, AutoProcessor

model = PaliGemmaForConditionalGeneration.from_pretrained("google/paligemma2-10b-pt-448", device_map="auto")
processor = AutoProcessor.from_pretrained("google/paligemma2-10b-pt-448")', 'DocVQA: 93.3%, TextVQA: 81.2%, ChartQA: 85.0%, ScienceQA: 96.1%', 'Governed by Google Gemma Terms of Use; resolution tokens increase compute and memory overhead on 448x448 input variants.', 'https://github.com/google-research/big_vision', '[{"text":"Google Big Vision PaliGemma 2 Release","url":"https://github.com/google-research/big_vision"},{"text":"PaliGemma 2 Collection on Hugging Face","url":"https://huggingface.co/collections/google/paligemma-2-release-675030252119420068352605"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PaLM 2', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2023, 'Unknown (multiple sizes: Gecko, Otter, Bison, Unicorn)', 'Google''s multilingual, reasoning-focused language model powering Bard and many Google Workspace AI features, incorporating an architecture of transformer trained with a compute-optimal approach across multilingual and code data. The model demonstrates competitive performance across verified evaluations, including MMLU: 78.3%, multilingual reasoning leader in 2023. With its Unknown (multiple sizes: Gecko, Otter, Bison, Unicorn) design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Transformer trained with a compute-optimal approach across multilingual and code data.', '# Access via Google AI Studio or Vertex AI
import vertexai
from vertexai.language_models import TextGenerationModel
vertexai.init(project="YOUR_PROJECT", location="us-central1")
model = TextGenerationModel.from_pretrained("text-bison@002")
response = model.predict("Write a poem about AI.")', 'MMLU: 78.3%, multilingual reasoning leader in 2023', 'Superseded by Gemini, proprietary API.', 'https://ai.google/discover/palm2', '[{"text":"PaLM 2 Technical Report","url":"https://arxiv.org/abs/2305.10403"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Perplexity', 'Perplexity', 'AI', 'NLP', 'Proprietary', 2022, 'N/A', 'An AI-powered search engine that provides cited answers by searching the web in real-time, functioning as an intelligent research assistant. The application is powered by advanced foundation models utilizing answer Engine / Conversational Agent (Powered by various LLMs and search indices). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Answer Engine / Conversational Agent (Powered by various LLMs and search indices)', 'Visit perplexity.ai to search and interact.', 'N/A', 'Sometimes cites incorrect sources or misunderstands query intent.', 'https://www.perplexity.ai', '[{"text":"Perplexity AI","url":"https://www.perplexity.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Perplexity AI', 'Perplexity', 'Platform', 'NLP', 'Proprietary', 2022, 'Various (Uses GPT-4, Claude 3, Sonar)', 'An AI-powered search engine that uses LLMs to search the web in real-time, providing conversational answers with direct in-line citations. Its cloud and infrastructure runtime provides rAG (Retrieval-Augmented Generation) pipeline sitting on top of various frontier LLMs. Built for enterprise scalability and reliability, it offers high-throughput API endpoints, automated workflows, and robust developer integrations. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'RAG (Retrieval-Augmented Generation) pipeline sitting on top of various frontier LLMs.', 'from openai import OpenAI
# Perplexity offers an API compatible with OpenAI''s SDK
client = OpenAI(api_key="PPLX_API_KEY", base_url="https://api.perplexity.ai")
response = client.chat.completions.create(
  model="llama-3-sonar-large-32k-online",
  messages=[{"role": "user", "content": "What is the news today?"}]
)', 'N/A', 'Quality depends heavily on the retrieved search results, occasionally hallucinates sources.', 'https://www.perplexity.ai/', '[{"text":"Perplexity API Docs","url":"https://docs.perplexity.ai/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Phi-3 Mini', 'Microsoft', 'Model', 'NLP', 'MIT', 2024, '3.8B params', 'Microsoft''s compact 3.8B parameter model that punches far above its weight class, outperforming models 5x its size on reasoning benchmarks, incorporating an architecture of dense transformer decoder trained on heavily curated ''textbook-quality'' data. The model demonstrates competitive performance across verified evaluations, including MMLU: 68.8%, outperforms Mistral 7B on many tasks. With its 3.8B params design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'Dense transformer decoder trained on heavily curated ''textbook-quality'' data.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("microsoft/Phi-3-mini-4k-instruct")
tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3-mini-4k-instruct")', 'MMLU: 68.8%, outperforms Mistral 7B on many tasks', 'Small size limits knowledge breadth, not suitable for long-form tasks.', 'https://azure.microsoft.com/en-us/products/phi-3', '[{"text":"Phi-3 Technical Report","url":"https://arxiv.org/abs/2404.14219"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Phi-3.5 MoE', 'Microsoft', 'Model', 'NLP', 'MIT', 2024, '41.9B (6.6B active)', 'Lightweight Mixture-of-Experts model from Microsoft activating 2 out of 16 experts (6.6B active params from 41.9B total), with 128k context support, incorporating a 16-expert MoE architecture with 128k context window architecture. The model demonstrates competitive performance across verified evaluations, including MMLU: 78.9%, GSM8K: 85.1%. With its 41.9B (6.6B active) design, it supports diverse local and enterprise deployment profiles under the MIT license.', '16-expert MoE architecture with 128k context window.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("microsoft/Phi-3.5-MoE-instruct", trust_remote_code=True, device_map="auto")', 'MMLU: 78.9%, GSM8K: 85.1%', 'Requires distributed tensor routing for optimal MoE parallelization.', 'https://huggingface.co/microsoft/Phi-3.5-MoE-instruct', '[{"text":"Phi-3.5 Announcement","url":"https://azure.microsoft.com/en-us/blog/introducing-phi-3-5-small-language-models/"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Phi-4', 'Microsoft', 'Model', 'NLP', 'MIT', 2024, '14B params', 'Microsoft''s state-of-the-art 14B small language model (SLM) trained on curated synthetic textbook and web data, beating many 70B+ models on math, coding, and multi-step logic, incorporating a 14B dense decoder-only Transformer with rotary position embeddings and synthetic data curation alignment architecture. The model demonstrates competitive performance across verified evaluations, including MATH: 80.4%, GPQA: 47.9%, MMLU: 84.8%, HumanEval: 82.6%. With its 14B params design, it supports diverse local and enterprise deployment profiles under the MIT license.', '14B dense decoder-only Transformer with rotary position embeddings and synthetic data curation alignment.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("microsoft/phi-4")
model = AutoModelForCausalLM.from_pretrained("microsoft/phi-4", device_map="auto")', 'MATH: 80.4%, GPQA: 47.9%, MMLU: 84.8%, HumanEval: 82.6%', '14B scale limits deep multi-lingual edge-case world knowledge compared to trillion-parameter models.', 'https://huggingface.co/microsoft/phi-4', '[{"text":"Phi-4 Technical Report","url":"https://arxiv.org/abs/2412.08905"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Phi-4 (14B)', 'Microsoft', 'Model', 'Research', 'MIT', 2024, '14.7B params', 'Microsoft''s 14B parameter state-of-the-art small reasoning model trained with highly synthetic, curated datasets for outsized math and science reasoning, incorporating an architecture of dense Transformer trained with synthetic textbook data and multi-agent debate. The model demonstrates competitive performance across verified evaluations, including MMLU: 84.8%, MATH-500: 80.4%, GPQA: 56.1%. With its 14.7B params design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'Dense Transformer trained with synthetic textbook data and multi-agent debate.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("microsoft/phi-4", device_map="auto")', 'MMLU: 84.8%, MATH-500: 80.4%, GPQA: 56.1%', 'Smaller parameter capacity limits broad factual knowledge retrieval.', 'https://huggingface.co/microsoft/phi-4', '[{"text":"Phi-4 Technical Report","url":"https://arxiv.org/abs/2412.08905"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Phind', 'Phind', 'AI', 'AI Coding', 'Proprietary', 2023, 'N/A', 'AI search engine and pair programmer tailored specifically for developers, providing cited code snippets, documentation references, and terminal debugging. The application is powered by advanced foundation models utilizing custom 70B MoE search model paired with live web and documentation scraping index. Key user-facing capabilities include High developer satisfaction for complex programming queries and library documentation search. Available under a Proprietary model for commercial and personal productivity.', 'Custom 70B MoE search model paired with live web and documentation scraping index.', 'Visit phind.com and query "How to configure SSL in NGINX reverse proxy with Certbot in Docker".', 'High developer satisfaction for complex programming queries and library documentation search.', 'Focused on technical and developer search queries.', 'https://www.phind.com', '[{"text":"Phind","url":"https://www.phind.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pi', 'Inflection AI', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'A supportive and empathetic conversational AI assistant designed to be a companion rather than just a tool. The application is powered by advanced foundation models utilizing web Application / Conversational Agent (Powered by Inflection models). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Conversational Agent (Powered by Inflection models)', 'Visit pi.ai to interact.', 'N/A', 'Prioritizes conversational style over complex reasoning or coding tasks.', 'https://pi.ai', '[{"text":"Meet Pi","url":"https://inflection.ai/press/meet-pi"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pika Labs', 'Pika Labs', 'AI', 'Video Generation', 'Proprietary', 2023, 'N/A', 'An AI video generation and editing tool that can create and modify short video clips from text or image prompts, known for fun and accessible creative outputs. The application is powered by advanced foundation models utilizing web Application / Discord Bot (Proprietary video generation model — Pika 1.0/2.0). It features an intuitive interface designed to streamline complex video generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Discord Bot (Proprietary video generation model — Pika 1.0/2.0)', 'Visit pika.art to generate and edit videos from text or image prompts.', 'N/A', 'Short maximum clip duration; free tier has watermarks and limited generation credits.', 'https://pika.art', '[{"text":"Pika Labs","url":"https://pika.art"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pinecone', 'Pinecone Systems', 'Platform', 'MLOps', 'Proprietary', 2019, 'N/A', 'A managed vector database purpose-built for AI applications, enabling fast similarity search at scale for RAG, semantic search, and recommendation systems. Its cloud and infrastructure runtime provides managed ANNS (Approximate Nearest Neighbor Search) vector store with hybrid search support. Core platform telemetry and performance features include: Sub-10ms query latency at billion-vector scale. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Managed ANNS (Approximate Nearest Neighbor Search) vector store with hybrid search support.', 'from pinecone import Pinecone, ServerlessSpec
pc = Pinecone(api_key="YOUR_API_KEY")
pc.create_index("my-index", dimension=1536, metric="cosine", spec=ServerlessSpec(cloud=''aws'', region=''us-east-1''))
index = pc.Index("my-index")
index.upsert(vectors=[("vec1", [0.1, 0.2], {"text": "hello"})])', 'Sub-10ms query latency at billion-vector scale', 'Proprietary, can be expensive at scale vs. self-hosted alternatives.', 'https://www.pinecone.io/', '[{"text":"Pinecone Documentation","url":"https://docs.pinecone.io/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pixtral 12B', 'Mistral AI', 'Model', 'Multimodal', 'Apache-2.0', 2024, '12B Parameters · 128k Context', 'Mistral AI''s multimodal 12B frontier-class vision-language model trained natively with an integrated 400M parameter vision encoder and 12B decoder, supporting variable image resolutions and a 128k context window, incorporating an architecture of multimodal autoregressive decoder with a native 400M vision encoder directly ingesting arbitrary aspect ratio images without downsampling. The model demonstrates competitive performance across verified evaluations, including MMMU: 52.5%, DocVQA: 90.7%, MathVista: 58.0%, ChartQA: 81.8%, 128k context window. With its 12B Parameters · 128k Context design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Multimodal autoregressive decoder with a native 400M vision encoder directly ingesting arbitrary aspect ratio images without downsampling.', 'from vllm import LLM

llm = LLM(model="mistralai/Pixtral-12B-2409", max_model_len=8192)
outputs = llm.generate([{"prompt": "Describe this diagram in detail.", "multi_modal_data": {"image": "diagram.png"}}])', 'MMMU: 52.5%, DocVQA: 90.7%, MathVista: 58.0%, ChartQA: 81.8%, 128k context window', 'Requires at least 24GB VRAM for unquantized local inference; sensitive to prompt formatting in complex multi-image reasoning.', 'https://mistral.ai/news/pixtral-12b/', '[{"text":"Mistral AI Pixtral 12B Release Announcement","url":"https://mistral.ai/news/pixtral-12b/"},{"text":"Pixtral-12B-2409 on Hugging Face","url":"https://huggingface.co/mistralai/Pixtral-12B-2409"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Play.ht', 'Play.ht', 'AI', 'Audio', 'Proprietary', 2016, 'N/A', 'An AI voice generator and text-to-speech platform with 900+ ultra-realistic voices, offering voice cloning and an API for developers to embed audio in apps. The application is powered by advanced foundation models utilizing web Application / API (Powered by proprietary PlayHT 2.0 and PlayDialog models). It features an intuitive interface designed to streamline complex audio workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / API (Powered by proprietary PlayHT 2.0 and PlayDialog models)', 'Visit play.ht to generate speech from text or access the API for programmatic voice generation.', 'N/A', 'Voice cloning and API access require paid plans; free tier has limited word generation.', 'https://play.ht', '[{"text":"Play.ht","url":"https://play.ht"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Playground AI', 'Playground AI', 'AI', 'Image Generation', 'Proprietary', 2022, 'N/A', 'A free-to-use online AI image generation platform offering a generous free tier and a canvas editor for creating and mixing images with various model styles. The application is powered by advanced foundation models utilizing web Application (Powered by Stable Diffusion variants and proprietary Playground v2 model). It features an intuitive interface designed to streamline complex image generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Powered by Stable Diffusion variants and proprietary Playground v2 model)', 'Visit playground.com to generate images for free with up to 500 images/day on the free tier.', 'N/A', 'Heavy users need a paid plan; commercial use of generated images requires a paid subscription.', 'https://playground.com', '[{"text":"Playground AI","url":"https://playground.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Poe', 'Quora', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'A platform by Quora that provides access to multiple AI chatbots including GPT-4, Claude, Gemini, and community-created bots in one unified interface. The application is powered by advanced foundation models utilizing web Application / Multi-Model Platform (Aggregates GPT-4, Claude, Gemini, Llama, etc.). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Multi-Model Platform (Aggregates GPT-4, Claude, Gemini, Llama, etc.)', 'Visit poe.com or download the Poe app to access multiple AI models.', 'N/A', 'Daily message limits on free tier; quality depends on the chosen underlying model.', 'https://poe.com', '[{"text":"Poe by Quora","url":"https://poe.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Portkey AI Gateway', 'Portkey AI', 'Platform', 'MLOps', 'Apache-2.0 / Cloud', 2023, 'N/A', 'Production AI gateway offering load balancing, fallback routing, prompt management, and guardrails across 250+ LLMs with sub-1ms overhead. Its cloud and infrastructure runtime provides ultra-fast C++ based reverse proxy and control plane. Core platform telemetry and performance features include: <1ms proxy latency overhead; 99.999% production routing reliability. Accessible under a Apache-2.0 / Cloud tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Ultra-fast C++ based reverse proxy and control plane.', 'from portkey_ai import Portkey
portkey = Portkey(api_key="PORTKEY_API_KEY")
response = portkey.chat.completions.create(model="gpt-4o", messages=[{"role": "user", "content": "Hello!"}])', '<1ms proxy latency overhead; 99.999% production routing reliability.', 'Requires integrating Portkey headers or SDK wrappers.', 'https://portkey.ai', '[{"text":"Portkey Docs","url":"https://docs.portkey.ai"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('precinct6-cybersecurity', 'witfoo', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '1M<n<10M', 'WitFoo Precinct6 Cybersecurity Dataset Version 2.1.0 (built 2026-09-22). Regenerated to address feedback from the University of Canterbury PIDS evaluation: attacks an (49 likes, 3,326 downloads). The corpus spans 1M<n<10M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 34, Likes: 49, Downloads: 3,326. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("witfoo/precinct6-cybersecurity")', 'Trending Score: 34, Likes: 49, Downloads: 3,326', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/witfoo/precinct6-cybersecurity', '[{"text":"witfoo/precinct6-cybersecurity on Hugging Face Datasets","url":"https://huggingface.co/datasets/witfoo/precinct6-cybersecurity"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pro-Realism-Edit-Studio', 'kogutt999', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Professional studio-grade photo enhancement and realistic retouching platform on Hugging Face Spaces by kogutt999. Featuring AI skin texture restoration, natural tone mapping, lens distortion correction, and focal depth re-balancing without artificial smoothing.', 'Gradio web studio combining depth estimation, high-resolution VAE restoration, and latent diffusion skin texturing.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/kogutt999/Pro-Realism-Edit-Studio', 'Processes 24MP RAW and JPEG images in under 5 seconds with zero loss of natural pores and facial micro-features.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/kogutt999/Pro-Realism-Edit-Studio', '[{"url":"https://huggingface.co/spaces/kogutt999/Pro-Realism-Edit-Studio","text":"kogutt999/Pro-Realism-Edit-Studio on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Project Astra (DeepMind Preview)', 'Google DeepMind', 'Model', 'Multimodal', 'Proprietary', 2024, 'Frontier Multimodal', 'Google DeepMind''s universal real-time multimodal AI assistant, capable of continuous video stream comprehension, ultra-low latency conversational audio, spatial environmental memory, and proactive multi-tool orchestration, incorporating an architecture of native streaming multimodal foundation model fusing continuous video frames, low-latency duplex audio tokens, and persistent spatial memory graphs. The model demonstrates competitive performance across verified evaluations, including Audio-to-audio latency: <300ms, Video-MME: 84.7%, Spatial Recall Accuracy: 91.2%. With its Frontier Multimodal design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Native streaming multimodal foundation model fusing continuous video frames, low-latency duplex audio tokens, and persistent spatial memory graphs.', 'from google.genai import types
# Connect to Project Astra bidirectional streaming Live API session
async with client.aio.live.connect(
  model="project-astra-preview",
  config=types.LiveConnectConfig(response_modalities=["AUDIO"])
) as session:
  await session.send(input={"realtime_input": {"media_chunks": [camera_frame, audio_stream]}})', 'Audio-to-audio latency: <300ms, Video-MME: 84.7%, Spatial Recall Accuracy: 91.2%', 'Requires stable high-bandwidth duplex streaming connections and camera/audio input hardware.', 'https://deepmind.google/technologies/project-astra/', '[{"text":"Project Astra: A universal AI assistant for everyday life","url":"https://deepmind.google/technologies/project-astra/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ProtectBirds', 'AimeeBingmouQu', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by AimeeBingmouQu. Trending with 1,029 community stars. Its cloud and infrastructure runtime provides dOCKER cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 73, Community Likes: 1,029. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/AimeeBingmouQu/ProtectBirds', 'Trending Score: 73, Community Likes: 1,029', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/AimeeBingmouQu/ProtectBirds', '[{"text":"AimeeBingmouQu/ProtectBirds on Hugging Face Spaces","url":"https://huggingface.co/spaces/AimeeBingmouQu/ProtectBirds"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('psi', 'Microsoft', 'Framework', 'MLOps', 'NOASSERTION', 2026, '38MB Repo', 'Microsoft''s Platform for Situated Intelligence, providing an extensible open-source framework and runtime for building and analyzing multi-modal, real-time interactive AI systems and robotic agents. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 572, Forks: 104. Licensed under the NOASSERTION license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/microsoft/psi
cd psi
pip install -e .', 'GitHub Stars: 572, Forks: 104', 'Requires local Python environment and dependency configuration.', 'https://github.com/microsoft/psi', '[{"text":"microsoft/psi on GitHub","url":"https://github.com/microsoft/psi"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('pybroker', 'edtechre', 'Framework', 'MLOps', 'NOASSERTION', 2026, '8MB Repo', 'Algorithmic trading and quantitative finance framework in Python, featuring vectorized backtesting, machine learning alpha discovery, and walk-forward parameter optimization. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 3,533, Forks: 454. Licensed under the NOASSERTION license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/edtechre/pybroker
cd pybroker
pip install -e .', 'GitHub Stars: 3,533, Forks: 454', 'Requires local Python environment and dependency configuration.', 'https://github.com/edtechre/pybroker', '[{"text":"edtechre/pybroker on GitHub","url":"https://github.com/edtechre/pybroker"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PyTorch', 'Meta AI', 'Framework', 'MLOps', 'BSD-3-Clause', 2016, 'N/A', 'Meta AI''s industry-standard open-source deep learning framework, pioneering dynamic computation graphs (eager mode), rich distributed training primitives, and TorchDynamo/TorchInductor compilation. Under the hood, it incorporates python-first framework with automatic differentiation and GPU acceleration. Key technical highlights include: Most popular framework for research (60%+ papers). Licensed under the BSD-3-Clause license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Python-first framework with automatic differentiation and GPU acceleration.', 'import torch
import torch.nn as nn
model = nn.Sequential(
  nn.Linear(10, 20),
  nn.ReLU(),
  nn.Linear(20, 1)
)', 'Most popular framework for research (60%+ papers)', 'More verbose than high-level frameworks, deployment can be complex.', 'https://pytorch.org', '[{"text":"PyTorch Official Documentation","url":"https://pytorch.org/docs"},{"text":"GitHub Repository","url":"https://github.com/pytorch/pytorch"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qdrant', 'Qdrant', 'Platform', 'MLOps', 'Apache-2.0', 2021, 'Rust Vector Database & Managed Cloud', 'Open-source vector similarity search engine and vector database written in Rust, delivering ultra-fast, memory-efficient vector search with rich payload filtering and distributed clustering. Its cloud and infrastructure runtime provides rust-native vector indexing engine with HNSW graph indexing, quantization (scalar & product), disk-backed payloads, and Raft distributed consensus. Core platform telemetry and performance features include: Sub-millisecond P99 vector search latency; stores billions of vectors with scalar quantization reducing RAM consumption by up to 4x. Accessible under a Apache-2.0 tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Rust-native vector indexing engine with HNSW graph indexing, quantization (scalar & product), disk-backed payloads, and Raft distributed consensus.', 'from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

client = QdrantClient("localhost", port=6333)
client.create_collection("ai_articles", vectors_config=VectorParams(size=1536, distance=Distance.COSINE))', 'Sub-millisecond P99 vector search latency; stores billions of vectors with scalar quantization reducing RAM consumption by up to 4x.', 'Requires planning shard layouts and replication factors before scaling to high-concurrency multi-node clusters.', 'https://qdrant.tech', '[{"text":"Qdrant Vector Database GitHub Repository","url":"https://github.com/qdrant/qdrant"},{"text":"Qdrant Official Documentation","url":"https://qdrant.tech/documentation/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Quizlet AI', 'Quizlet', 'AI', 'Education', 'Proprietary', 2023, 'N/A', 'Quizlet''s AI-powered study assistant that generates practice questions, explains concepts, and personalizes study sets based on what a student is struggling with. The application is powered by advanced foundation models utilizing web / Mobile Application (Powered by OpenAI GPT models with Quizlet''s study data). It features an intuitive interface designed to streamline complex education workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web / Mobile Application (Powered by OpenAI GPT models with Quizlet''s study data)', 'Visit quizlet.com or open the app; Q-Chat and AI features are available on Quizlet Plus.', 'N/A', 'AI features require a Quizlet Plus subscription; AI-generated flashcards may contain errors.', 'https://quizlet.com/features/quizlet-ai', '[{"text":"Quizlet AI","url":"https://quizlet.com/features/quizlet-ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen 2.5 (72B)', 'Alibaba (Qwen)', 'Model', 'NLP', 'Apache-2.0', 2024, '72.7B params', 'Alibaba Cloud''s flagship open LLM featuring world-class multilingual capabilities across 29+ languages, 128k context support, and leading coding benchmarks, incorporating an architecture of dense Transformer with RoPE, SwiGLU, RMSNorm, and GQA. The model demonstrates competitive performance across verified evaluations, including MMLU: 86.8%, MATH: 83.1%, HumanEval: 86.6%. With its 72.7B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Dense Transformer with RoPE, SwiGLU, RMSNorm, and GQA.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-72B-Instruct", device_map="auto")', 'MMLU: 86.8%, MATH: 83.1%, HumanEval: 86.6%', 'Full precision requires ~145GB VRAM; requires 4-bit quant to run on single 24GB/48GB GPU.', 'https://github.com/QwenLM/Qwen2.5', '[{"text":"Qwen2.5 Announcement","url":"https://qwenlm.github.io/blog/qwen2.5/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen 2.5-Coder (32B)', 'Alibaba (Qwen)', 'Model', 'AI Coding', 'Apache-2.0', 2024, '32.5B params', 'State-of-the-art open-source code generation model, matching GPT-4o on coding benchmarks while supporting 128k context tokens and code artifact editing, incorporating an architecture of transformer decoder specialized on 5.5 trillion code tokens. The model demonstrates competitive performance across verified evaluations, including HumanEval: 92.7%, EvalPlus: 87.2%, MultiPL-E: 84.1%. With its 32.5B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Transformer decoder specialized on 5.5 trillion code tokens.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-Coder-32B-Instruct", device_map="auto")', 'HumanEval: 92.7%, EvalPlus: 87.2%, MultiPL-E: 84.1%', 'Optimized specifically for code; creative prose is slightly secondary.', 'https://github.com/QwenLM/Qwen2.5-Coder', '[{"text":"Qwen2.5-Coder Technical Blog","url":"https://qwenlm.github.io/blog/qwen2.5-coder/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen 2.5-Math (72B)', 'Alibaba (Qwen)', 'Model', 'Research', 'Apache-2.0', 2024, '72.7B params', 'Specialized mathematical reasoning model trained with chain-of-thought and tool-integrated reasoning (TIR) for solving complex olympiad-level math, incorporating an architecture of dense Transformer tuned on bilingual math synthesis and code-assisted execution. The model demonstrates competitive performance across verified evaluations, including MATH: 88.2%, GSM8K: 95.9%, OlympiadBench: 56.4%. With its 72.7B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Dense Transformer tuned on bilingual math synthesis and code-assisted execution.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-Math-72B-Instruct", device_map="auto")', 'MATH: 88.2%, GSM8K: 95.9%, OlympiadBench: 56.4%', 'Specialized strictly for math and quantitative calculations.', 'https://github.com/QwenLM/Qwen2.5-Math', '[{"text":"Qwen2.5-Math Paper","url":"https://arxiv.org/abs/2409.12122"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen 2.5-Max', 'Alibaba (Qwen)', 'Model', 'NLP', 'Proprietary', 2025, 'Massive MoE', 'Alibaba Cloud''s flagship MoE model rivaling top global frontier LLMs, setting records on Arena-Hard, complex Chinese and English instruction following, and agentic workflows, incorporating an architecture of ultra-scale Mixture-of-Experts with dynamic token routing, grouped-query attention, and multi-token prediction heads. The model demonstrates competitive performance across verified evaluations, including Arena-Hard: 89.2, MMLU-Pro: 79.5%, MATH-500: 87.2%, LiveCodeBench: 55.4%. With its Massive MoE design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Ultra-scale Mixture-of-Experts with dynamic token routing, grouped-query attention, and multi-token prediction heads.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_DASHSCOPE_KEY", base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")
response = client.chat.completions.create(
  model="qwen-max-latest",
  messages=[{"role": "user", "content": "Analyze market expansion opportunities across Southeast Asia with quantitative models."}]
)', 'Arena-Hard: 89.2, MMLU-Pro: 79.5%, MATH-500: 87.2%, LiveCodeBench: 55.4%', 'Proprietary API access via Alibaba Cloud DashScope; closed model weights.', 'https://qwenlm.github.io', '[{"text":"Qwen 2.5-Max Technical Announcement","url":"https://qwenlm.github.io/blog/qwen2.5-max/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen 2.5-VL (72B)', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'Apache-2.0', 2025, '72B params', 'Vision-language foundation model capable of reading hour-long videos, parsing fine-grained document charts, and operating computer UIs via agent grounding, incorporating an architecture of dynamic resolution Vision Transformer (ViT) paired with Qwen 2.5 language backbone. The model demonstrates competitive performance across verified evaluations, including DocVQA: 95.8%, Video-MME: 82.5%, MathVista: 71.9%. With its 72B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Dynamic resolution Vision Transformer (ViT) paired with Qwen 2.5 language backbone.', 'from transformers import Qwen2_5_VLForConditionalGeneration, AutoProcessor
model = Qwen2_5_VLForConditionalGeneration.from_pretrained("Qwen/Qwen2.5-VL-72B-Instruct", device_map="auto")', 'DocVQA: 95.8%, Video-MME: 82.5%, MathVista: 71.9%', 'High token consumption on long video streams.', 'https://github.com/QwenLM/Qwen2.5-VL', '[{"text":"Qwen2.5-VL Release","url":"https://qwenlm.github.io/blog/qwen2.5-vl/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('QWEN_EDIT_IMAGE', 'Alibaba (Qwen)', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by kulkas2pintu. Trending with 174 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 90, Community Likes: 174. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/kulkas2pintu/QWEN_EDIT_IMAGE', 'Trending Score: 90, Community Likes: 174', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/kulkas2pintu/QWEN_EDIT_IMAGE', '[{"text":"kulkas2pintu/QWEN_EDIT_IMAGE on Hugging Face Spaces","url":"https://huggingface.co/spaces/kulkas2pintu/QWEN_EDIT_IMAGE"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-2.1-Turbo-Qwen-Face-Swap-MOSS-Image-Edit-Outpaint-Qwen-Detail-Enhancer', 'amisima', 'Platform', 'Image Generation', 'Community Hosted', 2026, 'GRADIO Platform', 'Comprehensive multi-model visual synthesis pipeline on Hugging Face Spaces by amisima. Combines Qwen 2.1 Turbo for initial image generation, MOSS Image Edit for regional inpainting, canvas outpainting for aspect ratio expansion, and neural detail enhancers for 4K upscaling in an integrated creative workflow.', 'Multi-stage pipeline orchestrating Qwen DiT, MOSS Image Edit, and neural super-resolution models within a unified Gradio studio.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/amisima/Qwen-2.1-Turbo-Qwen-Face-Swap-MOSS-Image-Edit-Outpaint-Qwen-Detail-Enhancer', 'Full-resolution 4K generative rendering in under 12 seconds with end-to-end facial preservation.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/amisima/Qwen-2.1-Turbo-Qwen-Face-Swap-MOSS-Image-Edit-Outpaint-Qwen-Detail-Enhancer', '[{"url":"https://huggingface.co/spaces/amisima/Qwen-2.1-Turbo-Qwen-Face-Swap-MOSS-Image-Edit-Outpaint-Qwen-Detail-Enhancer","text":"amisima/Qwen-2.1-Turbo-Qwen-Face-Swap-MOSS-Image-Edit-Outpaint-Qwen-Detail-Enhancer on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-2511-Plus-Flux.2-klein', 'AST-1320', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Hybrid visual generation and reasoning workflow platform on Hugging Face Spaces by AST-1320, pairing Qwen''s visual understanding capabilities with Black Forest Labs'' Flux 2 Klein diffusion model for iterative prompt refinement, aesthetic critique, and high-resolution asset creation.', 'Dual-model orchestration pipeline linking Qwen multimodal LLMs with Flux diffusion backbones via cloud APIs.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/AST-1320/Qwen-2511-Plus-Flux.2-klein', 'Automates multi-turn visual prompt refinement with 40% higher aesthetic alignment scores.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/AST-1320/Qwen-2511-Plus-Flux.2-klein', '[{"url":"https://huggingface.co/spaces/AST-1320/Qwen-2511-Plus-Flux.2-klein","text":"AST-1320/Qwen-2511-Plus-Flux.2-klein on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-2511-Plus-Flux.2-klein-9B', 'Alibaba (Qwen)', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by AST-1320. Trending with 68 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 39, Community Likes: 68. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/AST-1320/Qwen-2511-Plus-Flux.2-klein-9B', 'Trending Score: 39, Community Likes: 68', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/AST-1320/Qwen-2511-Plus-Flux.2-klein-9B', '[{"text":"AST-1320/Qwen-2511-Plus-Flux.2-klein-9B on Hugging Face Spaces","url":"https://huggingface.co/spaces/AST-1320/Qwen-2511-Plus-Flux.2-klein-9B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen-image-2-1', 'Alibaba (Qwen)', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by hugging-apps. Trending with 92 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 80, Community Likes: 92. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/hugging-apps/qwen-image-2-1', 'Trending Score: 80, Community Likes: 92', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/hugging-apps/qwen-image-2-1', '[{"text":"hugging-apps/qwen-image-2-1 on Hugging Face Spaces","url":"https://huggingface.co/spaces/hugging-apps/qwen-image-2-1"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen-image-2-1-studio', 'Alibaba (Qwen)', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by assembledchaos. Trending with 79 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 71, Community Likes: 79. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/assembledchaos/qwen-image-2-1-studio', 'Trending Score: 71, Community Likes: 79', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/assembledchaos/qwen-image-2-1-studio', '[{"text":"assembledchaos/qwen-image-2-1-studio on Hugging Face Spaces","url":"https://huggingface.co/spaces/assembledchaos/qwen-image-2-1-studio"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-2.1', 'Alibaba (Qwen)', 'Model', 'Image Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Image Generation open-weights model by Alibaba (Qwen), trending with over 1,472 community likes and 6,523 downloads on Hugging Face, incorporating an architecture of alibaba (Qwen) text to image architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 1421, Likes: 1,472, Downloads: 6,523. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the OTHER license.', 'Alibaba (Qwen) text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen-Image-2.1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen-Image-2.1")', 'Trending Score: 1421, Likes: 1,472, Downloads: 6,523', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Qwen/Qwen-Image-2.1', '[{"text":"Qwen/Qwen-Image-2.1 on Hugging Face","url":"https://huggingface.co/Qwen/Qwen-Image-2.1"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-2.1-Turbo', 'Alibaba (Qwen)', 'Model', 'Image Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Image Generation open-weights model by Alibaba (Qwen), trending with over 463 community likes and 2,138 downloads on Hugging Face, incorporating an architecture of alibaba (Qwen) text to image architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 456, Likes: 463, Downloads: 2,138. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the OTHER license.', 'Alibaba (Qwen) text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen-Image-2.1-Turbo", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen-Image-2.1-Turbo")', 'Trending Score: 456, Likes: 463, Downloads: 2,138', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo', '[{"text":"Qwen/Qwen-Image-2.1-Turbo on Hugging Face","url":"https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-2.1-Turbo-Uncensored-GGUF', 'AtomicChat', 'Model', 'Image Generation', 'APACHE-2.0', 2026, 'Open Weights', 'Community-quantized GGUF release of Alibaba''s Qwen-Image-2.1 Turbo diffusion transformer by AtomicChat. Engineered for ultra-fast local inference in llama.cpp and KoboldCPP runtimes on consumer GPUs (RTX 4090/5090), it delivers high-fidelity photorealistic text-to-image synthesis, accurate typography rendering, and unconstrained creative exploration without vendor-imposed prompt refusals.', 'Diffusion Transformer (DiT) architecture quantized to 4-bit and 8-bit GGUF formats with unlocked prompt guidance.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF")', 'Inference latency: 1.8s per 1024x1024 image on RTX 4090; over 320k community downloads.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF', '[{"url":"https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF","text":"AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen-image-2.1-uncensored-aio-loras', 'Alibaba (Qwen)', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by arudradey. Trending with 106 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 80, Community Likes: 106. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/arudradey/qwen-image-2.1-uncensored-aio-loras', 'Trending Score: 80, Community Likes: 106', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/arudradey/qwen-image-2.1-uncensored-aio-loras', '[{"text":"arudradey/qwen-image-2.1-uncensored-aio-loras on Hugging Face Spaces","url":"https://huggingface.co/spaces/arudradey/qwen-image-2.1-uncensored-aio-loras"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-2.1-Uncensored-GGUF', 'Alibaba (Qwen)', 'Model', 'Image Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Image Generation open-weights model by abenzerps, trending with over 1,144 community likes and 182,313 downloads on Hugging Face, incorporating an architecture of abenzerps text to image architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 1027, Likes: 1,144, Downloads: 182,313. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the OTHER license.', 'abenzerps text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("abenzerps/Qwen-Image-2.1-Uncensored-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("abenzerps/Qwen-Image-2.1-Uncensored-GGUF")', 'Trending Score: 1027, Likes: 1,144, Downloads: 182,313', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF', '[{"text":"abenzerps/Qwen-Image-2.1-Uncensored-GGUF on Hugging Face","url":"https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-2.1-Uncensored-Quantized', 'Alibaba (Qwen)', 'Model', 'Image Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Image Generation open-weights model by abenzerps, trending with over 4,111 community likes and 2,188,658 downloads on Hugging Face, incorporating an architecture of abenzerps text to image architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 585, Likes: 4,111, Downloads: 2,188,658. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the OTHER license.', 'abenzerps text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("abenzerps/Qwen-Image-2.1-Uncensored-Quantized", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("abenzerps/Qwen-Image-2.1-Uncensored-Quantized")', 'Trending Score: 585, Likes: 4,111, Downloads: 2,188,658', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized', '[{"text":"abenzerps/Qwen-Image-2.1-Uncensored-Quantized on Hugging Face","url":"https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-2.1-viggle-turbo', 'Alibaba (Qwen)', 'Platform', 'Image Generation', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by Viggle. Trending with 61 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 59, Community Likes: 61. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Viggle/Qwen-Image-2.1-viggle-turbo', 'Trending Score: 59, Community Likes: 61', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Viggle/Qwen-Image-2.1-viggle-turbo', '[{"text":"Viggle/Qwen-Image-2.1-viggle-turbo on Hugging Face Spaces","url":"https://huggingface.co/spaces/Viggle/Qwen-Image-2.1-viggle-turbo"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen-image-21-uncensored', 'Alibaba (Qwen)', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by vclnhihihi. Trending with 70 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 54, Community Likes: 70. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/vclnhihihi/qwen-image-21-uncensored', 'Trending Score: 54, Community Likes: 70', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/vclnhihihi/qwen-image-21-uncensored', '[{"text":"vclnhihihi/qwen-image-21-uncensored on Hugging Face Spaces","url":"https://huggingface.co/spaces/vclnhihihi/qwen-image-21-uncensored"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen-image-edit', 'Lampyy', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive natural language image editing platform on Hugging Face Spaces by Lampyy. Allows creators to click on any region of an image and describe desired modifications in natural language, utilizing Qwen image models for localized inpainting and stylistic adjustments.', 'Canvas-based web interface communicating with localized Qwen image diffusion pipelines.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Lampyy/qwen-image-edit', 'Sub-2s preview latency; rated highly for intuitive visual editing and background preservation.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Lampyy/qwen-image-edit', '[{"url":"https://huggingface.co/spaces/Lampyy/qwen-image-edit","text":"Lampyy/qwen-image-edit on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-Edit-Rapid-AIO-Loras-Experimental', 'Alibaba (Qwen)', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by aet256. Trending with 146 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 52, Community Likes: 146. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/aet256/Qwen-Image-Edit-Rapid-AIO-Loras-Experimental', 'Trending Score: 52, Community Likes: 146', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/aet256/Qwen-Image-Edit-Rapid-AIO-Loras-Experimental', '[{"text":"aet256/Qwen-Image-Edit-Rapid-AIO-Loras-Experimental on Hugging Face Spaces","url":"https://huggingface.co/spaces/aet256/Qwen-Image-Edit-Rapid-AIO-Loras-Experimental"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen-qwen-image-2-1-turbo', 'hugging-apps', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive cloud demonstration web application on Hugging Face Spaces showcasing Alibaba Cloud''s Qwen-Image-2.1 Turbo model. Hosted by hugging-apps, it provides an intuitive browser playground with prompt enhancement toggles, aspect ratio controls, negative prompting, and real-time generation previews designed for rapid visual prototyping.', 'Gradio cloud container interfacing with Alibaba Qwen-Image-2.1 Turbo DiT backbone via high-throughput inference APIs.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/hugging-apps/qwen-qwen-image-2-1-turbo', 'Average browser generation latency: 2.1s; over 77 community stars and thousands of daily test sessions.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/hugging-apps/qwen-qwen-image-2-1-turbo', '[{"url":"https://huggingface.co/spaces/hugging-apps/qwen-qwen-image-2-1-turbo","text":"hugging-apps/qwen-qwen-image-2-1-turbo on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen2 (72B)', 'Alibaba (Qwen)', 'Model', 'NLP', 'Qwen License', 2024, '72B params', 'Alibaba''s powerful open-weights model series competitive with leading frontier models, with strong multilingual and coding capabilities, incorporating an architecture of transformer with GQA, long-context support up to 128K tokens. The model demonstrates competitive performance across verified evaluations, including MMLU: 84.2%, HumanEval: 86.0%. With its 72B params design, it supports diverse local and enterprise deployment profiles under the Qwen license.', 'Transformer with GQA, long-context support up to 128K tokens.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2-72B-Instruct")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2-72B-Instruct")', 'MMLU: 84.2%, HumanEval: 86.0%', 'Large VRAM requirement for local inference, license restrictions for commercial use.', 'https://qwenlm.github.io/', '[{"text":"Qwen2 Technical Report","url":"https://arxiv.org/abs/2407.10671"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3-TTS', 'Qwen', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Alibaba Cloud''s state-of-the-art interactive text-to-speech demonstration platform on Hugging Face Spaces. Utilizing the Qwen3 audio foundation model, it provides zero-shot voice cloning from 3-second audio samples, natural conversational prosody, and expressive emotional speech synthesis across 30+ languages.', 'Neural audio codec language model with flow-matching acoustic decoders and zero-shot speaker embedding extractors.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Qwen/Qwen3-TTS', 'Naturalness MOS: 4.62; produces speech with sub-300ms streaming latency in browser.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Qwen/Qwen3-TTS', '[{"url":"https://huggingface.co/spaces/Qwen/Qwen3-TTS","text":"Qwen/Qwen3-TTS on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5 Omni Plus', 'Alibaba', 'Model', 'Multimodal', 'Proprietary', 2026, '256k Context · Proprietary Model', 'Alibaba Cloud''s flagship end-to-end multimodal foundation model capable of real-time omnidirectional voice, video, text, and code interaction. Featuring a 256k context window, it processes live camera streams and spoken dialogue with sub-second response times for interactive assistant applications.', 'Unified end-to-end multimodal Transformer integrating audio, vision, and text tokenizers with 256k context window.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-5-omni-plus', 'Context Window: 256k Context; top-tier scores on Artificial Analysis Multimodal and Latency Leaderboards.', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/qwen3-5-omni-plus', '[{"url":"https://artificialanalysis.ai/models/qwen3-5-omni-plus","text":"Qwen3.5 Omni Plus on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/qwen3-5-omni-plus/providers","text":"Qwen3.5 Omni Plus Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8 2.4T A95B', 'Alibaba (Qwen)', 'Model', 'NLP', 'Open', 2026, '262k Context · Open Model', 'Alibaba''s massive 2.4-trillion token Mixture-of-Experts architecture with 95 billion active parameters, designed for enterprise-grade reasoning and multilingual translation, incorporating an architecture of open-weights frontier neural architecture developed by Alibaba (Qwen), featuring native 262k token window support, optimized reasoning chains, and low-latency inference throughput (36 tok/s). The model demonstrates competitive performance across verified evaluations, including Briefcase Elo: 1431, Accuracy: 31%, Non-Hallucination: 66%, AutomationBench: 57%, TerminalBench 4: 11%, HLE Diamond: 20%, Speed: 36 tok/s, Context Window: 262k. With its 262k Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by Alibaba (Qwen), featuring native 262k token window support, optimized reasoning chains, and low-latency inference throughput (36 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Alibaba/qwen3-8-2-4t-a95b", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Alibaba/qwen3-8-2-4t-a95b")', 'Briefcase Elo: 1431, Accuracy: 31%, Non-Hallucination: 66%, AutomationBench: 57%, TerminalBench 4: 11%, HLE Diamond: 20%, Speed: 36 tok/s, Context Window: 262k', 'High memory requirements for local execution (262k context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/qwen3-8-2-4t-a95b', '[{"text":"Qwen3.8 2.4T A95B on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/qwen3-8-2-4t-a95b"},{"text":"Qwen3.8 2.4T A95B Inference Providers","url":"https://artificialanalysis.ai/models/qwen3-8-2-4t-a95b/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8 27B (xhigh)', 'Alibaba (Qwen)', 'Model', 'NLP', 'Open', 2026, '256k Context · Open Model', 'Maximum reasoning configuration of Alibaba''s Qwen3.8 27B, punching well above its parameter class on competitive coding and mathematics benchmarks, incorporating an architecture of open-weights frontier neural architecture developed by Alibaba (Qwen), featuring native 256k token window support, optimized reasoning chains, and low-latency inference throughput (38 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 20, Briefcase Elo: 1393, Accuracy: 17%, Non-Hallucination: 71%, FrontierCode: 15%, AutomationBench: 48%, TerminalBench 4: 6%, HLE Diamond: 15%, Speed: 38 tok/s, Context Window: 256k. With its 256k Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by Alibaba (Qwen), featuring native 256k token window support, optimized reasoning chains, and low-latency inference throughput (38 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Alibaba/qwen3-8-27b-xhigh", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Alibaba/qwen3-8-27b-xhigh")', 'Intelligence Index: 20, Briefcase Elo: 1393, Accuracy: 17%, Non-Hallucination: 71%, FrontierCode: 15%, AutomationBench: 48%, TerminalBench 4: 6%, HLE Diamond: 15%, Speed: 38 tok/s, Context Window: 256k', 'High memory requirements for local execution (256k context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/qwen3-8-27b', '[{"text":"Qwen3.8 27B (xhigh) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/qwen3-8-27b"},{"text":"Qwen3.8 27B (xhigh) Inference Providers","url":"https://artificialanalysis.ai/models/qwen3-8-27b/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8 Max (0902)', 'Alibaba (Qwen)', 'Model', 'NLP', 'Proprietary', 2026, '984k Context · Proprietary Model', 'Alibaba''s 0902 checkpoint of Qwen3.8 Max, engineered for advanced multilingual mathematics, algorithmic code synthesis, and structured JSON parsing across 984k tokens, incorporating an architecture of proprietary frontier neural architecture developed by Alibaba (Qwen), featuring native 984k token window support, optimized reasoning chains, and low-latency inference throughput (40 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 34, Briefcase Elo: 1608, Accuracy: 30%, Non-Hallucination: 73%, FrontierCode: 23%, AutomationBench: 56%, TerminalBench 4: 39%, HLE Diamond: 24%, Speed: 40 tok/s, Context Window: 984k. With its 984k Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Alibaba (Qwen), featuring native 984k token window support, optimized reasoning chains, and low-latency inference throughput (40 tok/s).', 'import requests

response = requests.post(
  "https://api.alibabaqwen.com/v1/chat/completions",
  json={"model": "qwen3-8-max-0902", "messages": [{"role": "user", "content": "Benchmark query"}]}
)', 'Intelligence Index: 34, Briefcase Elo: 1608, Accuracy: 30%, Non-Hallucination: 73%, FrontierCode: 23%, AutomationBench: 56%, TerminalBench 4: 39%, HLE Diamond: 24%, Speed: 40 tok/s, Context Window: 984k', 'Proprietary cloud API access via Alibaba (Qwen) developer platform; subject to API rate limits and token pricing ($2/M in, $6/M out).', 'https://artificialanalysis.ai/models/qwen3-8-max', '[{"text":"Qwen3.8 Max (0902) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/qwen3-8-max"},{"text":"Qwen3.8 Max (0902) Inference Providers","url":"https://artificialanalysis.ai/models/qwen3-8-max/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-27B', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '27B params', 'High-performance Multimodal open-weights model by Alibaba (Qwen), trending with over 14,038 community likes and 6,024,467 downloads on Hugging Face, incorporating an architecture of alibaba (Qwen) image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 536, Likes: 14,038, Downloads: 6,024,467. With its 27B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Alibaba (Qwen) image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen3.8-27B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen3.8-27B")', 'Trending Score: 536, Likes: 14,038, Downloads: 6,024,467', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Qwen/Qwen3.8-27B', '[{"text":"Qwen/Qwen3.8-27B on Hugging Face","url":"https://huggingface.co/Qwen/Qwen3.8-27B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2', 'nerkyor', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '27B params', 'Nerkyor''s multi-teacher distilled coding foundation model unifying reasoning patterns from Claude Opus 5.5, GPT-6 Astra, Grok 4.7, and DeepSeek-V4 Pro. Trained using Reinforcement Learning from Online Optimization (RLOO) and Multi-Token Prediction (MTP), it excels at complex code refactoring, system architecture, and algorithmic optimization.', '27B dense Transformer with Multi-Token Prediction (MTP), Multi-Head Latent Attention, and distilled reasoning traces.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2")', 'SWE-bench Verified: 62.4%, HumanEval: 91.8%, LiveCodeBench: 54.2%, AIME 2024: 76.5%', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2', '[{"url":"https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2","text":"nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-27B-GGUF', 'Alibaba (Qwen)', 'Model', 'NLP', 'APACHE-2.0', 2026, '27B params', 'High-performance NLP open-weights model by unsloth, trending with over 3,643 community likes and 10,479,045 downloads on Hugging Face, incorporating an architecture of unsloth transformer architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 283, Likes: 3,643, Downloads: 10,479,045. With its 27B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'unsloth transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("unsloth/Qwen3.8-27B-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("unsloth/Qwen3.8-27B-GGUF")', 'Trending Score: 283, Likes: 3,643, Downloads: 10,479,045', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/unsloth/Qwen3.8-27B-GGUF', '[{"text":"unsloth/Qwen3.8-27B-GGUF on Hugging Face","url":"https://huggingface.co/unsloth/Qwen3.8-27B-GGUF"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-27B-GSQ-RCO-GGUF', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '27B params', 'High-performance Multimodal open-weights model by ISTA-DASLab, trending with over 436 community likes and 348,389 downloads on Hugging Face, incorporating a ISTA-DASLab image text to text architecture with community-tuned weights architecture. The model demonstrates competitive performance across verified evaluations, including Trending Score: 363, Likes: 436, Downloads: 348,389. With its 27B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'ISTA-DASLab image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF")', 'Trending Score: 363, Likes: 436, Downloads: 348,389', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF', '[{"text":"ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF on Hugging Face","url":"https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '27B params', 'High-performance Multimodal open-weights model by DavidAU, trending with over 798 community likes and 1,049,586 downloads on Hugging Face, incorporating an architecture of davidAU image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 340, Likes: 798, Downloads: 1,049,586. With its 27B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'DavidAU image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF")', 'Trending Score: 340, Likes: 798, Downloads: 1,049,586', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF', '[{"text":"DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF on Hugging Face","url":"https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-Flash-Next', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'OTHER', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by Alibaba (Qwen), trending with over 4,929 community likes and 432,966 downloads on Hugging Face, incorporating an architecture of alibaba (Qwen) image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 449, Likes: 4,929, Downloads: 432,966. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the OTHER license.', 'Alibaba (Qwen) image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen3.8-Flash-Next", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen3.8-Flash-Next")', 'Trending Score: 449, Likes: 4,929, Downloads: 432,966', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Qwen/Qwen3.8-Flash-Next', '[{"text":"Qwen/Qwen3.8-Flash-Next on Hugging Face","url":"https://huggingface.co/Qwen/Qwen3.8-Flash-Next"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-Flash-Next-FP4-Local', 'nvidia', 'Model', 'Multimodal', 'OTHER', 2026, 'Open Weights', 'NVIDIA''s FP4 quantized local inference release of Alibaba''s Qwen 3.8 Flash Next model. Optimized specifically for NVIDIA Blackwell architecture Tensor Cores, it delivers unprecedented token generation speeds (300+ tokens/sec) and near-lossless reasoning capabilities on local enterprise workstations.', 'FP4 quantized Mixture-of-Experts architecture optimized for NVIDIA TensorRT-LLM and Blackwell Tensor Core execution.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/Qwen3.8-Flash-Next-FP4-Local", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/Qwen3.8-Flash-Next-FP4-Local")', 'Inference speed: 320 tokens/sec on single RTX 5090; retains 99.2% of FP16 benchmark accuracy.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local', '[{"url":"https://huggingface.co/nvidia/Qwen3.8-Flash-Next-FP4-Local","text":"nvidia/Qwen3.8-Flash-Next-FP4-Local on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('QwQ-32B', 'Alibaba (Qwen)', 'Model', 'AI Coding', 'Apache-2.0', 2025, '32B params', 'Alibaba''s open-weights 32B reasoning model trained with large-scale reinforcement learning, demonstrating competitive reasoning on AIME and LiveCodeBench rivaling proprietary frontier models, incorporating a 32B dense Transformer fine-tuned with multi-stage reinforcement learning for extended chain-of-thought and self-correction architecture. The model demonstrates competitive performance across verified evaluations, including AIME 2024: 79.5%, MATH-500: 93.6%, LiveCodeBench: 56.8%. With its 32B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', '32B dense Transformer fine-tuned with multi-stage reinforcement learning for extended chain-of-thought and self-correction.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("Qwen/QwQ-32B")
model = AutoModelForCausalLM.from_pretrained("Qwen/QwQ-32B", device_map="auto")', 'AIME 2024: 79.5%, MATH-500: 93.6%, LiveCodeBench: 56.8%', 'Generates extended reasoning traces; requires ~20-24GB VRAM for 16-bit or quantized local inference.', 'https://huggingface.co/Qwen/QwQ-32B', '[{"text":"QwQ: Reflect Deeply on the Boundaries of Reasoning","url":"https://qwenlm.github.io/blog/qwq-32b-preview/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RAGLight', 'Bessouat40', 'Framework', 'NLP', 'MIT', 2026, '15MB Repo', 'RAGLight is a modular framework for Retrieval-Augmented Generation (RAG). It makes it easy to plug in different LLMs, embeddings, and vector stores, and now includes seamless MCP integration to connec. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 672, Forks: 101. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/Bessouat40/RAGLight
cd RAGLight
pip install -e .', 'GitHub Stars: 672, Forks: 101', 'Requires local Python environment and dependency configuration.', 'https://github.com/Bessouat40/RAGLight', '[{"text":"Bessouat40/RAGLight on GitHub","url":"https://github.com/Bessouat40/RAGLight"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Raon-1-mini-preview', 'KRAFTON', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'KRAFTON''s preview neural language model engineered for interactive game dialogue, real-time non-player character (NPC) behavioral decisions, and dynamic branching narratives in immersive video game worlds. Optimized for sub-millisecond game loop execution without frame rate drops.', 'Ultra-low-latency compact Transformer model with dedicated game-state conditioning and emotion vector routing.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("KRAFTON/Raon-1-mini-preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("KRAFTON/Raon-1-mini-preview")', 'Inference response latency: < 15ms; integrated into Unreal Engine 5 NPC behavioral trees.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/KRAFTON/Raon-1-mini-preview', '[{"url":"https://huggingface.co/KRAFTON/Raon-1-mini-preview","text":"KRAFTON/Raon-1-mini-preview on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RedPajama-Data-v2', 'Together AI', 'Dataset', 'NLP', 'Apache-2.0', 2023, '30T tokens (with quality signals)', 'Together AI''s massive open dataset of 30 trillion tokens with quality annotations, designed as a fully open alternative to proprietary LLM pre-training data. The corpus spans 30T tokens (with quality signals) of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Enables competitive open LLM training at scale. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Multi-language web data with 40+ quality annotation signals for filtering.', 'from datasets import load_dataset
dataset = load_dataset("togethercomputer/RedPajama-Data-V2", name="sample-10B", split="train", streaming=True)', 'Enables competitive open LLM training at scale', 'Requires careful filtering, quality signals are heuristic-based.', 'https://github.com/togethercomputer/RedPajama-Data', '[{"text":"RedPajama-V2 Paper","url":"https://arxiv.org/abs/2402.06935"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Replicate', 'Replicate Inc.', 'Platform', 'MLOps', 'Proprietary', 2019, 'N/A', 'A cloud platform for running machine learning models via API, making it easy to deploy open-source models like Llama, Stable Diffusion, and Whisper at scale. Its cloud and infrastructure runtime provides containerized model deployment with Cog packaging and pay-per-prediction pricing. Built for enterprise scalability and reliability, it offers high-throughput API endpoints, automated workflows, and robust developer integrations. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Containerized model deployment with Cog packaging and pay-per-prediction pricing.', 'import replicate
output = replicate.run(
  "meta/meta-llama-3-70b-instruct",
  input={"prompt": "Write a haiku about AI"}
)
print("".join(output))', 'N/A', 'Pay-per-second pricing can be costly for heavy use, cold start latency.', 'https://replicate.com', '[{"text":"Replicate Documentation","url":"https://replicate.com/docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Replika', 'Luka Inc.', 'AI', 'NLP', 'Proprietary', 2017, 'N/A', 'An AI companion app designed for emotional support and personal conversation, allowing users to build a relationship with a customizable AI persona. The application is powered by advanced foundation models utilizing mobile / Web Application (Powered by custom fine-tuned LLMs). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Mobile / Web Application (Powered by custom fine-tuned LLMs)', 'Download the Replika app on iOS or Android, or visit replika.com to chat with your AI companion.', 'N/A', 'Some features require a paid subscription; content policies changed significantly in 2023.', 'https://replika.com', '[{"text":"Replika","url":"https://replika.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Replit Ghostwriter', 'Replit', 'AI', 'AI Coding', 'Proprietary', 2022, 'N/A', 'An AI coding assistant built into the Replit online IDE, offering code completion, explanation, transformation, and a conversational chat interface for debugging. The application is powered by advanced foundation models utilizing web IDE Integration (Powered by custom models and third-party LLMs). It features an intuitive interface designed to streamline complex ai coding workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web IDE Integration (Powered by custom models and third-party LLMs)', 'Access at replit.com; Ghostwriter is available in the editor with a Replit Core subscription.', 'N/A', 'Requires a paid Replit Core plan; primarily designed for use within the Replit environment.', 'https://replit.com/ai', '[{"text":"Replit Ghostwriter","url":"https://replit.com/ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ResNet', 'Microsoft', 'Model', 'Computer Vision', 'MIT', 2015, 'ResNet-50: 25M params', 'The residual neural network that introduced skip connections, enabling training of very deep networks (100+ layers) and winning ImageNet 2015, incorporating a CNN with residual (skip) connections to enable very deep network training architecture. The model demonstrates competitive performance across verified evaluations, including ImageNet top-5 error: 3.57% (ensemble). With its ResNet-50: 25M params design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'CNN with residual (skip) connections to enable very deep network training.', 'import torchvision.models as models
model = models.resnet50(pretrained=True)
model.eval()', 'ImageNet top-5 error: 3.57% (ensemble)', 'Largely superseded by ViT-based models for top benchmarks.', 'https://arxiv.org/abs/1512.03385', '[{"text":"He et al. (2015) - Deep Residual Learning Paper","url":"https://arxiv.org/abs/1512.03385"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RL-Explorer', 'FineEnvs', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive visual reinforcement learning sandbox on Hugging Face Spaces by FineEnvs. Enables researchers and students to configure, train, and visualize agent policies, value functions, policy gradients, and state-transition probability distributions across classical and continuous control environments in real time.', 'Interactive HTML5/Canvas visualization runtime communicating with Python RL backends running PyTorch and Gymnasium.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/FineEnvs/RL-Explorer', 'Simulates 10+ classical RL benchmarks with real-time 60fps policy trajectory plotting.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/FineEnvs/RL-Explorer', '[{"url":"https://huggingface.co/spaces/FineEnvs/RL-Explorer","text":"FineEnvs/RL-Explorer on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RoBERTa', 'Meta AI', 'Model', 'NLP', 'MIT', 2019, 'Base: 125M params, Large: 355M params', 'A robustly optimized BERT pretraining approach that surpassed BERT by training longer with more data and removing next-sentence prediction, incorporating an architecture of transformer encoder, same as BERT but with dynamic masking and longer training. The model demonstrates competitive performance across verified evaluations, including GLUE: 88.5 (large), SQuAD 2.0: 89.4 F1. With its Base: 125M params, Large: 355M params design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'Transformer encoder, same as BERT but with dynamic masking and longer training.', 'from transformers import RobertaTokenizer, RobertaModel
tokenizer = RobertaTokenizer.from_pretrained(''roberta-base'')
model = RobertaModel.from_pretrained(''roberta-base'')', 'GLUE: 88.5 (large), SQuAD 2.0: 89.4 F1', 'Still limited to 512 tokens, encoder-only not generative.', 'https://github.com/facebookresearch/fairseq/tree/main/examples/roberta', '[{"text":"Liu et al. (2019) - RoBERTa Paper","url":"https://arxiv.org/abs/1907.11692"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RunPod', 'RunPod Inc.', 'Platform', 'MLOps', 'Proprietary', 2023, 'Global GPU pods', 'Globally distributed cloud GPU platform offering on-demand instances and serverless GPU endpoints for AI training and inference at low cost. Its cloud and infrastructure runtime provides kubernetes-orchestrated bare-metal and serverless GPU container fabric. Core platform telemetry and performance features include: Top cost-to-performance provider for indie AI builders and startups. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Kubernetes-orchestrated bare-metal and serverless GPU container fabric.', 'import runpod
runpod.api_key = "KEY"
endpoint = runpod.Endpoint("ENDPOINT_ID")
run_request = endpoint.run({"input": {"prompt": "AI art"}})
print(run_request.output())', 'Top cost-to-performance provider for indie AI builders and startups.', 'Spot instance availability can fluctuate based on global demand.', 'https://www.runpod.io', '[{"text":"RunPod Docs","url":"https://docs.runpod.io"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Runway', 'Runway', 'AI', 'Video Generation', 'Proprietary', 2022, 'N/A', 'An AI-powered creative platform for generating and editing videos from text or image prompts, widely used in professional film and content production. The application is powered by advanced foundation models utilizing web Application (Proprietary video diffusion model — Gen-2 / Gen-3 Alpha). It features an intuitive interface designed to streamline complex video generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Proprietary video diffusion model — Gen-2 / Gen-3 Alpha)', 'Access via app.runwayml.com; generate videos from text or image prompts through the web interface.', 'N/A', 'Expensive credits system; generation length is capped; occasional temporal inconsistencies.', 'https://runwayml.com', '[{"text":"Runway Gen-3 Alpha","url":"https://runwayml.com/research/gen-3-alpha"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Runway Gen-3 Alpha', 'Runway', 'Model', 'Computer Vision', 'Proprietary', 2024, 'Unknown', 'Runway''s advanced video generation model capable of highly photorealistic, consistent, and controllable video creation from text, images, or video inputs, incorporating an architecture of large-scale multimodal diffusion transformer trained jointly on video and images. The model demonstrates competitive performance across verified evaluations, including Major improvements in temporal consistency and photorealism over Gen-2. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern computer vision ecosystem.', 'Large-scale multimodal diffusion transformer trained jointly on video and images.', '# Accessed via Runway web interface or API
# Provide a descriptive prompt to generate high-fidelity video clips.', 'Major improvements in temporal consistency and photorealism over Gen-2.', 'Proprietary, paid service, max generation length limitations.', 'https://runwayml.com/', '[{"text":"Gen-3 Alpha Release","url":"https://runwayml.com/research/introducing-gen-3-alpha"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('saas-sales-conversations', 'DeepMostInnovations', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '100K<n<1M', 'saas-sales-conversations Dataset Description This is a synthetic dataset of sales conversations for SaaS (Software as a Service) companies, designed for training (46 likes, 728 downloads). The corpus spans 100K<n<1M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 35, Likes: 46, Downloads: 728. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("DeepMostInnovations/saas-sales-conversations")', 'Trending Score: 35, Likes: 46, Downloads: 728', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/DeepMostInnovations/saas-sales-conversations', '[{"text":"DeepMostInnovations/saas-sales-conversations on Hugging Face Datasets","url":"https://huggingface.co/datasets/DeepMostInnovations/saas-sales-conversations"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Sage-A1.5', 'InternScience', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'InternScience''s specialized scientific foundation model pre-trained on millions of peer-reviewed biomedical, physical, and chemical research papers. Assists researchers with literature synthesis, hypothesis generation, chemical reaction pathways, and experimental protocol design.', 'Domain-adapted Transformer architecture pre-trained on PubMed Central, arXiv, and PubChem scientific corpora.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("InternScience/Sage-A1.5", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("InternScience/Sage-A1.5")', 'PubMedQA: 86.8%, BioASQ: 88.2%, ChemQA: 79.4%; state-of-the-art among sub-14B scientific models.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/InternScience/Sage-A1.5', '[{"url":"https://huggingface.co/InternScience/Sage-A1.5","text":"InternScience/Sage-A1.5 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SAM (Segment Anything Model)', 'Meta AI', 'Model', 'Computer Vision', 'Apache-2.0', 2023, 'ViT-H: 636M params', 'Meta''s foundation model for image segmentation that can segment any object in any image with a single click, point, or text prompt, incorporating an architecture of vision Transformer image encoder + prompt encoder + mask decoder. The model demonstrates competitive performance across verified evaluations, including Zero-shot COCO AP: 46.5% (SAM ViT-H). With its ViT-H: 636M params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Vision Transformer image encoder + prompt encoder + mask decoder.', 'from segment_anything import sam_model_registry, SamPredictor
sam = sam_model_registry["vit_h"](checkpoint="sam_vit_h.pth")
predictor = SamPredictor(sam)
predictor.set_image(image)
masks, scores, logits = predictor.predict(point_coords=input_point, point_labels=input_label)', 'Zero-shot COCO AP: 46.5% (SAM ViT-H)', 'Does not track objects across frames, not designed for semantic labeling.', 'https://segment-anything.com/', '[{"text":"Kirillov et al. (2023) - SAM Paper","url":"https://arxiv.org/abs/2304.02643"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('sam3', 'facebook', 'Model', 'NLP', 'OTHER', 2026, 'Open Weights', 'Meta''s Segment Anything Model 3 (SAM 3), representing a major breakthrough in zero-shot computer vision and promptable visual segmentation. Capable of segmenting any object across images and high-frame-rate video streams using text prompts, spatial bounding boxes, points, or exemplar masks with temporal tracking.', 'Vision foundation transformer featuring hierarchical visual encoders, interactive mask decoders, and temporal tracking memory banks.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("facebook/sam3", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("facebook/sam3")', 'Zero-shot SA-1B mIoU: 88.4%; real-time video tracking at 30fps on single GPU.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/facebook/sam3', '[{"url":"https://huggingface.co/facebook/sam3","text":"facebook/sam3 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Scikit-learn', 'Community / INRIA', 'Framework', 'MLOps', 'BSD-3-Clause', 2007, 'N/A', 'The go-to Python library for classical machine learning with a consistent, easy-to-use API for classification, regression, clustering, and preprocessing. Under the hood, it incorporates python library built on NumPy, SciPy, and Matplotlib with estimator API pattern. Widely utilized by developers and researchers, it accelerates model development, experimentation, and production deployment across mlops pipelines. Licensed under the BSD-3-Clause license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Python library built on NumPy, SciPy, and Matplotlib with estimator API pattern.', 'from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)
print(clf.score(X_test, y_test))', 'N/A — foundational library, not benchmarked as a model', 'Not designed for deep learning or GPU-accelerated large-scale training.', 'https://scikit-learn.org', '[{"text":"Pedregosa et al. (2011) - Scikit-learn Paper","url":"https://arxiv.org/abs/1201.0490"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('scorpion-toxin-binder-design', 'Anthropic', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '10K<n<100K', 'Biochemical research dataset released in collaboration with Anthropic, containing structural models, binding affinities, and sequence alignments for venom peptide binders. Serves as a vital benchmark for AI protein design models developing next-generation antivenoms and therapeutic peptide scaffolds.', 'PDB structural coordinates, molecular dynamics trajectories, and binding energy matrices stored in Parquet format.', 'from datasets import load_dataset

dataset = load_dataset("Anthropic/scorpion-toxin-binder-design")', 'Features 5,200+ modeled toxin-binder complexes with experimental binding affinity validations.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Anthropic/scorpion-toxin-binder-design', '[{"url":"https://huggingface.co/datasets/Anthropic/scorpion-toxin-binder-design","text":"Anthropic/scorpion-toxin-binder-design on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('seed', 'bones-studio', 'Dataset', 'Multimodal', 'OTHER', 2026, '100K<n<1M', 'Curated dataset of procedural 3D generation seeds, lighting setups, and multimodal asset templates curated by bones-studio. Used by game developers and technical artists to train procedural world-generation systems and generative 3D environment pipelines.', 'Structured JSON and USD asset library containing procedural generation graphs, seed parameters, and material definitions.', 'from datasets import load_dataset

dataset = load_dataset("bones-studio/seed")', '10,000+ verified 3D procedural environment seeds and shader graphs.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/bones-studio/seed', '[{"url":"https://huggingface.co/datasets/bones-studio/seed","text":"bones-studio/seed on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Semantic Kernel', 'Microsoft', 'Framework', 'AI Coding', 'MIT', 2023, 'N/A', 'Microsoft''s open-source enterprise SDK that integrates conventional programming languages (C#, Python, Java) with large language models, agents, connectors, and semantic vector memory. Under the hood, it incorporates modular orchestration engine connecting LLM prompts, native code plugins, planner filters, and vector memory stores. Key technical highlights include: Official Microsoft enterprise framework powering Microsoft 365 Copilot extensibility, Azure OpenAI enterprise integrations, and multi-language agent pipelines. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular orchestration engine connecting LLM prompts, native code plugins, planner filters, and vector memory stores.', 'import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import AzureChatCompletion

kernel = sk.Kernel()
kernel.add_service(AzureChatCompletion(service_id="chat", deployment_name="gpt-4o"))', 'Official Microsoft enterprise framework powering Microsoft 365 Copilot extensibility, Azure OpenAI enterprise integrations, and multi-language agent pipelines.', 'Feature parity between C# (lead language) and Python/Java SDKs can vary across major release transitions.', 'https://github.com/microsoft/semantic-kernel', '[{"text":"Semantic Kernel GitHub Repository","url":"https://github.com/microsoft/semantic-kernel"},{"text":"Microsoft Learn Semantic Kernel Documentation","url":"https://learn.microsoft.com/en-us/semantic-kernel/overview/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Semantic Scholar', 'Allen Institute for AI (AI2)', 'AI', 'Research', 'Free', 2015, 'N/A', 'A free AI-powered academic search engine by the Allen Institute for AI that provides smart paper recommendations, citation graphs, and TLDR summaries of research papers. The application is powered by advanced foundation models utilizing web Application (Proprietary NLP models for paper summarization and semantic search). It features an intuitive interface designed to streamline complex research workflows and maximize end-user productivity. Available under a Free model for commercial and personal productivity.', 'Web Application (Proprietary NLP models for paper summarization and semantic search)', 'Visit semanticscholar.org to search for papers and access AI-generated summaries and citations.', 'N/A', 'TLDR summaries can oversimplify findings; coverage of non-English papers is limited.', 'https://www.semanticscholar.org', '[{"text":"Semantic Scholar","url":"https://www.semanticscholar.org"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SerpentAI', 'SerpentAI', 'Framework', 'Computer Vision', 'MIT', 2026, '4MB Repo', 'Game agent framework and reinforcement learning testbed enabling developers to turn any video game into a sandbox for training autonomous visual AI agents and competitive bots. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 6,990, Forks: 798. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/SerpentAI/SerpentAI
cd SerpentAI
pip install -e .', 'GitHub Stars: 6,990, Forks: 798', 'Requires local Python environment and dependency configuration.', 'https://github.com/SerpentAI/SerpentAI', '[{"text":"SerpentAI/SerpentAI on GitHub","url":"https://github.com/SerpentAI/SerpentAI"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SGLang', 'LMSYS Org', 'Framework', 'MLOps', 'Apache-2.0', 2024, 'N/A', 'Fast LLM serving and programming engine featuring RadixAttention (KV cache sharing across multi-turn chats) for ultra-low latency inference and structured output. Under the hood, it incorporates radixAttention tree cache + interpreter-runtime co-design engine. Key technical highlights include: Up to 5x higher throughput on complex multi-turn chats compared to baseline vLLM. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'RadixAttention tree cache + interpreter-runtime co-design engine.', 'import sglang as sgl
@sgl.function
def qa(s, question):
    s += sgl.user(question)
    s += sgl.assistant(sgl.gen("answer", max_tokens=100))', 'Up to 5x higher throughput on complex multi-turn chats compared to baseline vLLM.', 'Focuses on Linux x86 and NVIDIA CUDA environments.', 'https://github.com/sgl-project/sglang', '[{"text":"SGLang Paper","url":"https://arxiv.org/abs/2312.07104"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SharpaDex-v1.0', 'Sharpa-Robotics', 'Dataset', 'NLP', 'CC-BY-NC-4.0', 2026, '100K<n<1M', 'Open robotics dataset developed by Sharpa Robotics, featuring multimodal sensor trajectories, bimanual manipulation demonstrations, and tactile feedback logs for training autonomous robotic grasping, precision insertion, and household tool manipulation policies across varied real-world environments.', 'HDF5 and ROS-bag formatted robotics dataset with synchronized RGB-D video, joint torque readings, and gripper telemetry.', 'from datasets import load_dataset

dataset = load_dataset("Sharpa-Robotics/SharpaDex-v1.0")', '50,000+ physical manipulation demonstrations across 120 everyday household objects.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Sharpa-Robotics/SharpaDex-v1.0', '[{"url":"https://huggingface.co/datasets/Sharpa-Robotics/SharpaDex-v1.0","text":"Sharpa-Robotics/SharpaDex-v1.0 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('shorts', 'autotrust', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by autotrust. Trending with 151 community stars. Its cloud and infrastructure runtime provides sTATIC cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 79, Community Likes: 151. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/autotrust/shorts', 'Trending Score: 79, Community Likes: 151', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/autotrust/shorts', '[{"text":"autotrust/shorts on Hugging Face Spaces","url":"https://huggingface.co/spaces/autotrust/shorts"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('simready-assets', 'nvidia', 'Dataset', 'Computer Vision', 'Open Data', 2026, 'n<1K', 'NVIDIA''s curated library of physically accurate OpenUSD SimReady 3D assets designed for synthetic data generation and robotics simulation in NVIDIA Isaac Sim and Omniverse. Each asset includes precise collision geometries, physical mass properties, visual materials, and kinematic articulation.', 'OpenUSD (Universal Scene Description) asset packages with calibrated PhysX collision bounds and MDL materials.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/simready-assets")', '5,000+ verified SimReady industrial, warehouse, and household objects validated for physics simulation.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/simready-assets', '[{"url":"https://huggingface.co/datasets/nvidia/simready-assets","text":"nvidia/simready-assets on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('simready-central', 'nvidia', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'NVIDIA''s central simulation repository and preview platform on Hugging Face Spaces for exploring, inspecting, and downloading OpenUSD SimReady 3D simulation assets. Enables simulation engineers to preview physical kinematics, collision bounds, and rendering fidelity before importing into Isaac Sim.', 'Interactive web-based 3D OpenUSD viewport powered by WebAssembly and cloud Omniverse streaming instances.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/nvidia/simready-central', 'Instant 3D browser inspection of thousands of simulation-ready industrial assets.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/nvidia/simready-central', '[{"url":"https://huggingface.co/spaces/nvidia/simready-central","text":"nvidia/simready-central on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Smolagents', 'Hugging Face', 'Framework', 'AI Coding', 'Apache-2.0', 2025, '~1,000 LOC', 'Hugging Face''s lightweight Python-first agent library where agents write executable Python code directly instead of parsing JSON action strings. Under the hood, it incorporates codeAgent execution loop running in a secure Python sandbox. Key technical highlights include: 30% fewer token overhead and higher tool success rate on GAIA benchmarks. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'CodeAgent execution loop running in a secure Python sandbox.', 'from smolagents import CodeAgent, HfApiModel, DuckDuckGoSearchTool
agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=HfApiModel())
agent.run("What is the latest score of the Mars Rover mission?")', '30% fewer token overhead and higher tool success rate on GAIA benchmarks.', 'Code execution requires sandbox container isolation for untrusted user inputs.', 'https://github.com/huggingface/smolagents', '[{"text":"Smolagents Launch","url":"https://huggingface.co/blog/smolagents"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SmolDataEnvs', 'FineEnvs', 'Dataset', 'AI Coding', 'MIT', 2026, '1K<n<10K', '📈 SmolDataEnvs 5.5K+ RL tasks for hill-climbing small models in code and data science. A 2B model on these tasks. Left: what it optimises. Right: 144 held-out tasks (55 likes, 2,460 downloads). The corpus spans 1K<n<10K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 55, Likes: 55, Downloads: 2,460. Released under the MIT license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("FineEnvs/SmolDataEnvs")', 'Trending Score: 55, Likes: 55, Downloads: 2,460', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/FineEnvs/SmolDataEnvs', '[{"text":"FineEnvs/SmolDataEnvs on Hugging Face Datasets","url":"https://huggingface.co/datasets/FineEnvs/SmolDataEnvs"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SmolLM2-1.7B', 'Hugging Face', 'Model', 'NLP', 'Apache-2.0', 2024, '1.7B Parameters · 8k Context', 'Hugging Face''s compact small language model designed for efficient local on-device deployment, pre-trained on 11 trillion tokens including FineWeb-Edu, DCLM, and Stack-Edu, and fine-tuned with DPO, incorporating an architecture of transformer decoder optimized with grouped-query attention (GQA), rotary positional embeddings (RoPE), and SwiGLU activations for mobile and edge inference. The model demonstrates competitive performance across verified evaluations, including MMLU: 54.8%, GSM8k: 64.9%, HumanEval: 49.4%, IFEval: 62.4%. With its 1.7B Parameters · 8k Context design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Transformer decoder optimized with grouped-query attention (GQA), rotary positional embeddings (RoPE), and SwiGLU activations for mobile and edge inference.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("HuggingFaceTB/SmolLM2-1.7B-Instruct", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("HuggingFaceTB/SmolLM2-1.7B-Instruct")

inputs = tokenizer("Explain quantum computing simply:", return_tensors="pt").to(model.device)
output = model.generate(**inputs, max_new_tokens=100)', 'MMLU: 54.8%, GSM8k: 64.9%, HumanEval: 49.4%, IFEval: 62.4%', 'Compact parameter capacity limits deep domain synthesis compared to 70B+ models; best suited for targeted agent loops, mobile, and on-device NLP.', 'https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct', '[{"text":"SmolLM2 Model Card and Technical Report on Hugging Face","url":"https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Socratic by Google', 'Google DeepMind', 'AI', 'Education', 'Proprietary', 2017, 'N/A', 'A Google AI-powered learning app that helps students understand homework questions by providing explanations, videos, and step-by-step breakdowns from a photo scan. The application is powered by advanced foundation models utilizing mobile Application (Powered by Google Lens OCR + Google Search + LLM explanations). It features an intuitive interface designed to streamline complex education workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Mobile Application (Powered by Google Lens OCR + Google Search + LLM explanations)', 'Download the Socratic app on iOS or Android and take a photo of any homework question.', 'N/A', 'Works best for standard K-12 subjects; may struggle with highly specialized or advanced topics.', 'https://socratic.org', '[{"text":"Socratic by Google","url":"https://socratic.org"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Sora', 'OpenAI', 'Model', 'Computer Vision', 'Proprietary', 2024, 'Unknown', 'OpenAI''s text-to-video model capable of generating high-quality, minute-long video clips from text descriptions with impressive temporal consistency, incorporating an architecture of diffusion transformer (DiT) operating on spacetime patches of video. It is purpose-engineered for computer vision workflows with operational considerations including: Limited public API access, expensive, struggles with physics simulation. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern computer vision ecosystem.', 'Diffusion transformer (DiT) operating on spacetime patches of video.', '# Sora is accessible via ChatGPT Plus/Pro or the OpenAI API
# API access for developers was opened in late 2024
from openai import OpenAI
client = OpenAI()
# See official Sora docs for current API usage', 'N/A — subjective quality; significant leap in video coherence', 'Limited public API access, expensive, struggles with physics simulation.', 'https://openai.com/sora', '[{"text":"Sora Technical Report","url":"https://openai.com/research/video-generation-models-as-world-simulators"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Sourcegraph Cody', 'Sourcegraph', 'AI', 'AI Coding', 'Apache-2.0', 2023, 'IDE Extension & Enterprise Platform', 'Enterprise AI coding assistant powered by Sourcegraph''s code graph and search engine, providing whole-codebase context awareness for code explanation, test generation, and multi-repo search. The application is powered by advanced foundation models utilizing client extension integrating with Sourcegraph Code Graph backend, embeddings search, and dynamic context retrieval algorithms across enterprise repositories. Key user-facing capabilities include Searches and indexes multi-gigabyte codebases across thousands of repositories; supports Claude 3.5 Sonnet, GPT-4o, and enterprise self-hosted models. Available under a Apache-2.0 model for commercial and personal productivity.', 'Client extension integrating with Sourcegraph Code Graph backend, embeddings search, and dynamic context retrieval algorithms across enterprise repositories.', 'Install Cody in VS Code or JetBrains. Sign in with Sourcegraph and run commands like /explain, /test, or /smell on any active file selection.', 'Searches and indexes multi-gigabyte codebases across thousands of repositories; supports Claude 3.5 Sonnet, GPT-4o, and enterprise self-hosted models.', 'Full cross-repository code graph context requires an active Sourcegraph Enterprise or Sourcegraph Cloud account.', 'https://sourcegraph.com/cody', '[{"text":"Sourcegraph Cody Product Overview","url":"https://sourcegraph.com/cody"},{"text":"Sourcegraph Cody GitHub Repository","url":"https://github.com/sourcegraph/cody"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Spark-X2.5-4B', 'XHToken', 'Model', 'NLP', 'APACHE-2.0', 2026, '4B params', 'High-performance NLP open-weights model by XHToken, trending with over 570 community likes and 5,477 downloads on Hugging Face, incorporating an architecture of xHToken text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 474, Likes: 570, Downloads: 5,477. With its 4B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'XHToken text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XHToken/Spark-X2.5-4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XHToken/Spark-X2.5-4B")', 'Trending Score: 474, Likes: 570, Downloads: 5,477', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XHToken/Spark-X2.5-4B', '[{"text":"XHToken/Spark-X2.5-4B on Hugging Face","url":"https://huggingface.co/XHToken/Spark-X2.5-4B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Spark-X2.6-4B', 'XHToken', 'Model', 'NLP', 'APACHE-2.0', 2026, '4B params', 'XHToken''s lightweight 4B parameter conversational language model engineered for ultra-low latency interactive dialogue, edge computing, and customer service automation. Features strong multilingual comprehension across Asian and European languages with minimal resource consumption.', '4B dense Transformer with RoPE embeddings, SwiGLU activations, and Grouped Query Attention.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XHToken/Spark-X2.6-4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XHToken/Spark-X2.6-4B")', 'MMLU: 70.4%, GSM8K: 77.2%, inference throughput: 160 tokens/sec on mobile NPUs.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XHToken/Spark-X2.6-4B', '[{"url":"https://huggingface.co/XHToken/Spark-X2.6-4B","text":"XHToken/Spark-X2.6-4B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('speech-to-decisions', 'ibm-granite', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Enterprise voice intelligence and meeting automation platform hosted by IBM Granite on Hugging Face Spaces. It transcribes multi-speaker corporate meetings in real time, automatically extracts action items, assigns responsibility owners, and compiles executive decision memos with integrated Jira and Slack export hooks.', 'Multi-stage audio intelligence pipeline combining IBM Granite speech models, speaker diarization, and LLM decision extractors.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/ibm-granite/speech-to-decisions', 'Word error rate: 4.8% on noisy conference audio; 96% accuracy in action item attribution.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/ibm-granite/speech-to-decisions', '[{"url":"https://huggingface.co/spaces/ibm-granite/speech-to-decisions","text":"ibm-granite/speech-to-decisions on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('squad', 'Stanford AI', 'Dataset', 'NLP', 'CC-BY-SA-4.0', 2026, '10K<n<100K', 'Dataset Card for SQuAD Dataset Summary Stanford Question Answering Dataset (SQuAD) is a reading comprehension dataset, consisting of questions posed by c (709 likes, 265,395 downloads). The corpus spans 10K<n<100K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 230, Likes: 709, Downloads: 265,395. Released under the CC-BY-SA-4.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("rajpurkar/squad")', 'Trending Score: 230, Likes: 709, Downloads: 265,395', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/rajpurkar/squad', '[{"text":"rajpurkar/squad on Hugging Face Datasets","url":"https://huggingface.co/datasets/rajpurkar/squad"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SQuAD 2.0', 'Stanford AI', 'Dataset', 'NLP', 'CC BY-SA 4.0', 2018, '150K questions', 'Stanford Question Answering Dataset with 100K+ questions on Wikipedia passages, including unanswerable questions to test model abstention. The corpus spans 150K questions of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Standard reading comprehension benchmark; human baseline F1: 89.45%. Released under the CC BY-SA 4.0 license for open evaluation and research reproducibility.', 'Crowdsourced QA pairs from Wikipedia, with adversarially added unanswerable questions.', 'from datasets import load_dataset
dataset = load_dataset("squad_v2")
train_data = dataset[''train'']', 'Standard reading comprehension benchmark; human baseline F1: 89.45%', 'English-only, Wikipedia domain, extractive QA only.', 'https://rajpurkar.github.io/SQuAD-explorer/', '[{"text":"Rajpurkar et al. (2018) - SQuAD 2.0 Paper","url":"https://arxiv.org/abs/1806.03822"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Stable Diffusion', 'Stability AI', 'Model', 'Computer Vision', 'CreativeML Open RAIL-M', 2022, '890M params', 'Stability AI''s landmark open-weights latent diffusion model that democratized high-resolution text-to-image synthesis by operating in compressed latent space for consumer GPU training and inference, incorporating an architecture of latent diffusion model with CLIP text encoder and U-Net denoising network. The model demonstrates competitive performance across verified evaluations, including FID score competitive with DALL-E 2. With its 890M params design, it supports diverse local and enterprise deployment profiles under the CreativeML Open RAIL-M license.', 'Latent diffusion model with CLIP text encoder and U-Net denoising network.', 'from diffusers import StableDiffusionPipeline
pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2")
image = pipe("a photo of an astronaut on mars").images[0]', 'FID score competitive with DALL-E 2', 'Can produce biased outputs, requires GPU for reasonable speed.', 'https://stability.ai/stable-diffusion', '[{"text":"Rombach et al. (2022) - Latent Diffusion Paper","url":"https://arxiv.org/abs/2112.10752"},{"text":"Stability AI Official Site","url":"https://stability.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Stable Diffusion XL (SDXL)', 'Stability AI', 'Model', 'Computer Vision', 'CreativeML Open RAIL++-M', 2023, '3.5B params (base + refiner)', 'An improved latent diffusion model with a larger UNet backbone and a refiner model, producing higher-resolution and more detailed images than SD 1.5/2.x, incorporating an architecture of dual text encoders (CLIP ViT-L + OpenCLIP ViT-bigG) with larger UNet backbone. The model demonstrates competitive performance across verified evaluations, including Significantly higher FID than SD 2.1, preferred in human evaluation. With its 3.5B params (base + refiner) design, it supports diverse local and enterprise deployment profiles under the CreativeML Open RAIL++-M license.', 'Dual text encoders (CLIP ViT-L + OpenCLIP ViT-bigG) with larger UNet backbone.', 'from diffusers import DiffusionPipeline
pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0")
image = pipe(prompt="A majestic lion at sunset, 8K").images[0]', 'Significantly higher FID than SD 2.1, preferred in human evaluation', 'Higher VRAM requirement (~12GB), slower than SD 1.5.', 'https://stability.ai/stable-image', '[{"text":"SDXL Paper","url":"https://arxiv.org/abs/2307.01952"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('standard-chess-games', 'Lichess', 'Dataset', 'NLP', 'CC0-1.0', 2026, '1B<n<10B', 'Comprehensive open chess corpus curated by Lichess, containing over 6.7 million standard rated games stored in structured Parquet and Arrow formats. Each game record includes move-by-move Stockfish engine evaluations, precise clock timestamps, opening eco codes, player Elo ratings, and board FEN states, serving as a primary benchmark for chess AI, reinforcement learning, and sequence modeling research.', 'High-compression Parquet/Arrow tabular dataset with tokenized PGN notation and precomputed Stockfish 16+ evaluation vectors.', 'from datasets import load_dataset

dataset = load_dataset("Lichess/standard-chess-games")', '6,771,800+ verified tournament games; 1.45M+ downloads on Hugging Face datasets hub.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Lichess/standard-chess-games', '[{"url":"https://huggingface.co/datasets/Lichess/standard-chess-games","text":"Lichess/standard-chess-games on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('StarCoder2', 'Hugging Face', 'Model', 'NLP', 'BigCode OpenRAIL-M v1', 2024, '3B to 15B params', 'BigCode''s open state-of-the-art code model trained on 619 programming languages with permissive licensing, supporting infilling and 16K context, incorporating an architecture of transformer decoder with multi-query attention and Fill-in-the-Middle (FIM) training. The model demonstrates competitive performance across verified evaluations, including HumanEval: 46.3% (15B pass@1), best open model at time of release. With its 3B to 15B params design, it supports diverse local and enterprise deployment profiles under the BigCode OpenRAIL-M v1 license.', 'Transformer decoder with multi-query attention and Fill-in-the-Middle (FIM) training.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("bigcode/starcoder2-15b")
model = AutoModelForCausalLM.from_pretrained("bigcode/starcoder2-15b")', 'HumanEval: 46.3% (15B pass@1), best open model at time of release', 'Not an instruction-tuned chat model by default, requires fine-tuning for dialogue.', 'https://github.com/bigcode-project/starcoder2', '[{"text":"StarCoder2 Paper","url":"https://arxiv.org/abs/2402.19173"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Step 5 Preview', 'StepFun', 'Model', 'NLP', 'Open', 2026, '1M Context · Open Model', 'StepFun''s frontier multi-step reasoning architecture, utilizing deep chain-of-thought reinforcement learning for intricate mathematical problem-solving and logic puzzles across 1M tokens, incorporating an architecture of open-weights frontier neural architecture developed by StepFun, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (165 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 29, Briefcase Elo: 1425, Accuracy: 36%, Non-Hallucination: 69%, FrontierCode: 12%, AutomationBench: 51%, TerminalBench 4: 33%, HLE Diamond: 24%, Speed: 165 tok/s, Context Window: 1M. With its 1M Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by StepFun, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (165 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("StepFun/step-5-preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("StepFun/step-5-preview")', 'Intelligence Index: 29, Briefcase Elo: 1425, Accuracy: 36%, Non-Hallucination: 69%, FrontierCode: 12%, AutomationBench: 51%, TerminalBench 4: 33%, HLE Diamond: 24%, Speed: 165 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/step-5', '[{"text":"Step 5 Preview on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/step-5"},{"text":"Step 5 Preview Inference Providers","url":"https://artificialanalysis.ai/models/step-5/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Suno', 'Suno Inc.', 'AI', 'Audio', 'Proprietary', 2023, 'N/A', 'An AI music generation platform that creates full songs with vocals, instrumentation, and lyrics from a simple text prompt in seconds. The application is powered by advanced foundation models utilizing web Application (Proprietary audio diffusion and language model pipeline). It features an intuitive interface designed to streamline complex audio workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Proprietary audio diffusion and language model pipeline)', 'Visit suno.com and type a prompt describing the style or lyrics to generate a full song.', 'N/A', 'Limited control over fine-grained musical elements; commercial use requires a paid plan.', 'https://suno.com', '[{"text":"Suno AI","url":"https://suno.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Suno v3.5', 'Suno', 'Model', 'Audio', 'Proprietary', 2024, 'Unknown', 'State-of-the-art AI music generation model capable of creating full, radio-quality songs with vocals and instrumentation from simple text prompts, incorporating an architecture of proprietary audio generation architecture. The model demonstrates competitive performance across verified evaluations, including High subjective quality for coherent musical structure and intelligible vocals. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern audio ecosystem.', 'Proprietary audio generation architecture.', '# Accessed via Suno web platform or API
# Prompt: "An upbeat pop song about coding late at night"', 'High subjective quality for coherent musical structure and intelligible vocals.', 'Proprietary, max song length limits, potential copyright concerns regarding training data.', 'https://suno.com/', '[{"text":"Suno v3.5 Announcement","url":"https://suno.com/blog/v3-5"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Supabase Vector', 'Supabase', 'Platform', 'MLOps', 'Apache-2.0', 2023, 'Cloud Platform & Open Source Engine', 'Supabase''s open-source vector database toolkit built on PostgreSQL and pgvector, enabling developers to store, index (HNSW / IVFFlat), and query high-dimensional embeddings directly within Postgres. Its cloud and infrastructure runtime provides postgreSQL database engine extended with pgvector C extension, pg_ivm, Row Level Security (RLS), and unified TypeScript/Python SDK clients. Core platform telemetry and performance features include: Supports sub-10ms similarity searches on millions of vectors using HNSW indexing; fully integrates with relational tables, foreign keys, and ACID transactions. Accessible under a Apache-2.0 tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'PostgreSQL database engine extended with pgvector C extension, pg_ivm, Row Level Security (RLS), and unified TypeScript/Python SDK clients.', 'import { createClient } from ''@supabase/supabase-js''
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const { data } = await supabase.rpc(''match_documents'', {
  query_embedding: [0.1, -0.2, 0.5],
  match_threshold: 0.78,
  match_count: 5
})', 'Supports sub-10ms similarity searches on millions of vectors using HNSW indexing; fully integrates with relational tables, foreign keys, and ACID transactions.', 'Vector index build times scale with Postgres RAM allocation; memory tuning required for multi-million vector datasets with high dimensionality.', 'https://supabase.com/docs/guides/database/extensions/pgvector', '[{"text":"Supabase Vector Official Documentation & Guide","url":"https://supabase.com/docs/guides/database/extensions/pgvector"},{"text":"Supabase AI & Vector Overview","url":"https://supabase.com/modules/vector"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Superwhisper', 'Superwhisper', 'AI', 'Productivity', 'Proprietary', 2024, 'Local app', 'Privacy-first local AI voice dictation app for macOS and iOS that transcribes speech into text in any application using local Whisper models with zero latency. The application is powered by advanced foundation models utilizing on-device Apple Silicon Metal optimized Whisper / Kokoro engine. Key user-facing capabilities include 100% offline local privacy with near-instant transcript rendering. Available under a Proprietary model for commercial and personal productivity.', 'On-device Apple Silicon Metal optimized Whisper / Kokoro engine.', 'Press global hotkey, speak naturally, and your voice is instantly transcribed and punctuated into the active cursor.', '100% offline local privacy with near-instant transcript rendering.', 'macOS / iOS ecosystem focus.', 'https://superwhisper.com', '[{"text":"Superwhisper","url":"https://superwhisper.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SWE-bench Verified', 'OpenAI', 'Dataset', 'AI Coding', 'MIT', 2024, '500 verified GitHub issues', 'Human-verified subset of 500 real-world GitHub issues and unit test pull requests used to evaluate autonomous software engineering AI agents. The corpus spans 500 verified GitHub issues of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating The global gold standard benchmark for Devin, Claude 3.7 Sonnet, and autonomous coding agents. Released under the MIT license for open evaluation and research reproducibility.', 'Dockerized reproducible environment harness across 12 major Python repositories.', 'from datasets import load_dataset
ds = load_dataset("princeton-nlp/SWE-bench_Verified", split="test")', 'The global gold standard benchmark for Devin, Claude 3.7 Sonnet, and autonomous coding agents.', 'Requires Dockerized test harness execution for each evaluated issue.', 'https://www.swebench.com', '[{"text":"SWE-bench Verified","url":"https://openai.com/index/introducing-swe-bench-verified/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Swift-Qwen3.8-27b', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'OTHER', 2026, '27B params', 'High-performance Multimodal open-weights model by ukisai, trending with over 396 community likes and 3,221 downloads on Hugging Face, incorporating an architecture of ukisai image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 380, Likes: 396, Downloads: 3,221. With its 27B params design, it supports diverse local and enterprise deployment profiles under the OTHER license.', 'ukisai image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ukisai/Swift-Qwen3.8-27b", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ukisai/Swift-Qwen3.8-27b")', 'Trending Score: 380, Likes: 396, Downloads: 3,221', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ukisai/Swift-Qwen3.8-27b', '[{"text":"ukisai/Swift-Qwen3.8-27b on Hugging Face","url":"https://huggingface.co/ukisai/Swift-Qwen3.8-27b"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Synthesia', 'Synthesia', 'AI', 'Video Generation', 'Proprietary', 2017, 'N/A', 'An AI video generation platform that creates professional videos with realistic AI avatars speaking from a script, used widely for corporate training and marketing. The application is powered by advanced foundation models utilizing web Application (Proprietary talking-head video synthesis model). It features an intuitive interface designed to streamline complex video generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Proprietary talking-head video synthesis model)', 'Visit synthesia.io, write a script, choose an AI avatar, and generate a video in minutes.', 'N/A', 'Limited avatar customization on lower-tier plans; video style can feel corporate.', 'https://www.synthesia.io', '[{"text":"Synthesia","url":"https://www.synthesia.io"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('system-one-arcade', 'LiquidAI', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI simulation and retro gaming demonstration platform developed by Liquid AI. Powered by adaptive liquid neural network mechanics, it simulates real-time arcade game environments where autonomous non-player characters make reactive, sub-millisecond gameplay decisions without neural network latency.', 'Real-time WebAssembly runtime interfacing with Liquid Foundation Model policies for interactive agentic simulations.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/LiquidAI/system-one-arcade', 'Runs continuous agent policy loops at 120Hz with sub-millisecond reaction latency.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/LiquidAI/system-one-arcade', '[{"url":"https://huggingface.co/spaces/LiquidAI/system-one-arcade","text":"LiquidAI/system-one-arcade on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('T5', 'Google DeepMind', 'Model', 'NLP', 'Apache-2.0', 2019, 'Small (60M) to 11B params', 'Text-To-Text Transfer Transformer — Google''s unified framework that converts every NLP task into a text-to-text format, incorporating an architecture of encoder-decoder transformer trained with a span-corruption pre-training objective. The model demonstrates competitive performance across verified evaluations, including SuperGLUE: 88.9 (11B), GLUE: 90.3 (11B). With its Small (60M) to 11B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Encoder-decoder transformer trained with a span-corruption pre-training objective.', 'from transformers import T5Tokenizer, T5ForConditionalGeneration
tokenizer = T5Tokenizer.from_pretrained("t5-base")
model = T5ForConditionalGeneration.from_pretrained("t5-base")
input_ids = tokenizer("translate English to French: Hello world", return_tensors="pt").input_ids', 'SuperGLUE: 88.9 (11B), GLUE: 90.3 (11B)', 'Encoder-decoder architecture slower than decoder-only for generation tasks.', 'https://github.com/google-research/text-to-text-transfer-transformer', '[{"text":"Raffel et al. (2019) - T5 Paper","url":"https://arxiv.org/abs/1910.10683"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Tabnine', 'Tabnine', 'AI', 'AI Coding', 'Proprietary', 2019, 'N/A', 'An AI code completion assistant that integrates with most IDEs and supports local or cloud-based models, offering a privacy-conscious alternative to cloud-only tools. The application is powered by advanced foundation models utilizing iDE Plugin (Supports local models + cloud models; integrates with VS Code, JetBrains, Neovim, etc.). It features an intuitive interface designed to streamline complex ai coding workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'IDE Plugin (Supports local models + cloud models; integrates with VS Code, JetBrains, Neovim, etc.)', 'Install the Tabnine extension from your IDE''s marketplace (VS Code, JetBrains, Neovim, etc.).', 'N/A', 'Free tier has limited completions; local model mode requires a capable machine.', 'https://www.tabnine.com', '[{"text":"Tabnine","url":"https://www.tabnine.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Tag_cleaning', 'Grio43', 'Dataset', 'Computer Vision', 'APACHE-2.0', 2026, '1M<n<10M', 'Danbooru 2026 Tag Cleaning Corrections This dataset contains image-level tag corrections for an anime-image tagging corpus. It contains correction instructions only; (32 likes, 320 downloads). The corpus spans 1M<n<10M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 28, Likes: 32, Downloads: 320. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Grio43/Tag_cleaning")', 'Trending Score: 28, Likes: 32, Downloads: 320', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Grio43/Tag_cleaning', '[{"text":"Grio43/Tag_cleaning on Hugging Face Datasets","url":"https://huggingface.co/datasets/Grio43/Tag_cleaning"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TeleOCR', 'XingChen-AGI', 'Model', 'Multimodal', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by XingChen-AGI, trending with over 809 community likes and 27,904 downloads on Hugging Face, incorporating an architecture of xingChen-AGI image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 697, Likes: 809, Downloads: 27,904. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'XingChen-AGI image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XingChen-AGI/TeleOCR", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XingChen-AGI/TeleOCR")', 'Trending Score: 697, Likes: 809, Downloads: 27,904', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XingChen-AGI/TeleOCR', '[{"text":"XingChen-AGI/TeleOCR on Hugging Face","url":"https://huggingface.co/XingChen-AGI/TeleOCR"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TensorFlow', 'Google DeepMind', 'Framework', 'MLOps', 'Apache-2.0', 2015, 'N/A', 'Google''s end-to-end open-source ML platform, widely used in production for its robust serving infrastructure and mobile deployment via TensorFlow Lite. Under the hood, it incorporates graph-based computation framework with eager execution support, Keras high-level API. Key technical highlights include: Dominant framework for production ML deployments. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Graph-based computation framework with eager execution support, Keras high-level API.', 'import tensorflow as tf
model = tf.keras.Sequential([
  tf.keras.layers.Dense(64, activation=''relu''),
  tf.keras.layers.Dense(10, activation=''softmax'')
])
model.compile(optimizer=''adam'', loss=''categorical_crossentropy'', metrics=[''accuracy''])', 'Dominant framework for production ML deployments', 'More complex debugging than PyTorch, less dominant in research community.', 'https://www.tensorflow.org', '[{"text":"TensorFlow Official Site","url":"https://www.tensorflow.org"},{"text":"GitHub Repository","url":"https://github.com/tensorflow/tensorflow"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ternary-Bonsai-2-27B-gguf', 'prism-ml', 'Model', 'NLP', 'APACHE-2.0', 2026, '27B params', 'High-performance NLP open-weights model by prism-ml, trending with over 945 community likes and 405,609 downloads on Hugging Face, incorporating an architecture of prism-ml text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 898, Likes: 945, Downloads: 405,609. With its 27B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'prism-ml text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("prism-ml/Ternary-Bonsai-2-27B-gguf", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("prism-ml/Ternary-Bonsai-2-27B-gguf")', 'Trending Score: 898, Likes: 945, Downloads: 405,609', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf', '[{"text":"prism-ml/Ternary-Bonsai-2-27B-gguf on Hugging Face","url":"https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ternary-bonsai-2-webgpu-kernels', 'webml-community', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by webml-community. Trending with 90 community stars. Its cloud and infrastructure runtime provides sTATIC cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 84, Community Likes: 90. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/webml-community/ternary-bonsai-2-webgpu-kernels', 'Trending Score: 84, Community Likes: 90', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/webml-community/ternary-bonsai-2-webgpu-kernels', '[{"text":"webml-community/ternary-bonsai-2-webgpu-kernels on Hugging Face Spaces","url":"https://huggingface.co/spaces/webml-community/ternary-bonsai-2-webgpu-kernels"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('text-embedding-3-large', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2024, 'Unknown', 'OpenAI''s most capable text embedding model, with improved multilingual performance and flexible dimensionality reduction, incorporating an architecture of encoder-only transformer producing dense vector representations. The model demonstrates competitive performance across verified evaluations, including MTEB: 64.6% average across 56 tasks. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Encoder-only transformer producing dense vector representations.', 'from openai import OpenAI
client = OpenAI()
response = client.embeddings.create(
  input="Your text string goes here",
  model="text-embedding-3-large"
)
embedding = response.data[0].embedding', 'MTEB: 64.6% average across 56 tasks', 'Proprietary, pay-per-use, no local inference.', 'https://platform.openai.com/docs/guides/embeddings', '[{"text":"New Embedding Models Announcement","url":"https://openai.com/blog/new-embedding-models-and-api-updates"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('text-to-3d-with-llm-code', 'Rapidata', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '10K<n<100K', 'Rapidata''s procedural 3D generation dataset pairing natural language object descriptions with executable procedural code in Three.js, OpenSCAD, and PyBullet. Demonstrates how language models can generate clean, editable 3D parametric geometry through code generation rather than voxel diffusion.', 'Structured dataset of natural language prompts paired with validated, executable JavaScript and Python 3D generation scripts.', 'from datasets import load_dataset

dataset = load_dataset("Rapidata/text-to-3d-with-llm-code")', '12,000+ verified prompt-to-code 3D generation pairs with rendered preview images.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Rapidata/text-to-3d-with-llm-code', '[{"url":"https://huggingface.co/datasets/Rapidata/text-to-3d-with-llm-code","text":"Rapidata/text-to-3d-with-llm-code on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('The Pile', 'EleutherAI', 'Dataset', 'NLP', 'MIT', 2020, '825GB, ~300B tokens', 'EleutherAI''s 825GB open-source diverse text dataset designed for training large language models, combining 22 high-quality data sources. The corpus spans 825GB, ~300B tokens of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Used to train GPT-NeoX, GPT-J, and other EleutherAI models. Released under the MIT license for open evaluation and research reproducibility.', '22 data sources including Books3, GitHub, Wikipedia, PubMed, arXiv, and more.', '# Available on HuggingFace
from datasets import load_dataset
dataset = load_dataset("EleutherAI/pile", split="train", streaming=True)', 'Used to train GPT-NeoX, GPT-J, and other EleutherAI models', 'Some components have license restrictions (Books3 removed after legal challenges).', 'https://pile.eleuther.ai/', '[{"text":"Gao et al. (2020) - The Pile Paper","url":"https://arxiv.org/abs/2101.00027"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('tiktok-5.6B-videos', 'datasocial', 'Dataset', 'NLP', 'CC-BY-NC-4.0', 2026, '1B<n<10B', 'Contact Telegram: @hashfunction_dev X: @hashfunction Email: hashfunction.dev@gmail.com TikTok scraper source code The code that collected these 5.6 billion videos. Ti (71 likes, 1,181 downloads). The corpus spans 1B<n<10B of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 67, Likes: 71, Downloads: 1,181. Released under the CC-BY-NC-4.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("datasocial/tiktok-5.6B-videos")', 'Trending Score: 67, Likes: 71, Downloads: 1,181', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/datasocial/tiktok-5.6B-videos', '[{"text":"datasocial/tiktok-5.6B-videos on Hugging Face Datasets","url":"https://huggingface.co/datasets/datasocial/tiktok-5.6B-videos"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('tiktok-videos-4b', 'kuben-developer', 'Dataset', 'NLP', 'OTHER', 2026, '1B<n<10B', 'TikTok Videos: 4.5 billion posts with engagement metrics 4.5 billion TikTok video records with captions, engagement counts, sound identifiers and timing. Collected fr (162 likes, 4,818 downloads). The corpus spans 1B<n<10B of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 156, Likes: 162, Downloads: 4,818. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("kuben-developer/tiktok-videos-4b")', 'Trending Score: 156, Likes: 162, Downloads: 4,818', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/kuben-developer/tiktok-videos-4b', '[{"text":"kuben-developer/tiktok-videos-4b on Hugging Face Datasets","url":"https://huggingface.co/datasets/kuben-developer/tiktok-videos-4b"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('timesfm-3.0-pytorch', 'Google DeepMind', 'Model', 'NLP', 'OTHER', 2026, 'Open Weights', 'High-performance NLP open-weights model by Google, trending with over 473 community likes and 144,455 downloads on Hugging Face, incorporating an architecture of google time series forecasting architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 415, Likes: 473, Downloads: 144,455. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the OTHER license.', 'Google time series forecasting architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("google/timesfm-3.0-pytorch", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("google/timesfm-3.0-pytorch")', 'Trending Score: 415, Likes: 473, Downloads: 144,455', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/google/timesfm-3.0-pytorch', '[{"text":"google/timesfm-3.0-pytorch on Hugging Face","url":"https://huggingface.co/google/timesfm-3.0-pytorch"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Timestral-209M', 'Mistral AI', 'Model', 'NLP', 'OTHER', 2026, '209M params', 'Mistral AI''s ultra-compact 209M parameter foundation model designed specifically for time-series forecasting, telemetry anomaly detection, and sensor sequence analysis. Designed to run directly on microcontrollers, edge gateways, and IoT devices with near-zero latency and minimal battery consumption.', 'Ultra-compact autoregressive Transformer architecture with specialized temporal positional encodings and 1D tokenizers.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("mistralai/Timestral-209M", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Timestral-209M")', 'Monash Time Series Benchmark top-3 accuracy; processes 10,000 telemetry points per second on Raspberry Pi 5.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/mistralai/Timestral-209M', '[{"url":"https://huggingface.co/mistralai/Timestral-209M","text":"mistralai/Timestral-209M on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('tmmluplus', 'ikala', 'Dataset', 'NLP', 'MIT', 2026, '10K<n<100K', 'TMMLU+ : Large scale traditional chinese massive multitask language understanding iKala presents TMMLU+, a large-scale benchmark for evaluating LLM capabilities in Tr (188 likes, 9,827 downloads). The corpus spans 10K<n<100K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 30, Likes: 188, Downloads: 9,827. Released under the MIT license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("ikala/tmmluplus")', 'Trending Score: 30, Likes: 188, Downloads: 9,827', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ikala/tmmluplus', '[{"text":"ikala/tmmluplus on Hugging Face Datasets","url":"https://huggingface.co/datasets/ikala/tmmluplus"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Together AI', 'Together AI', 'Platform', 'MLOps', 'Proprietary', 2022, 'N/A', 'A cloud platform for fast inference on open-source AI models with competitive pricing, offering fine-tuning and custom deployment. Its cloud and infrastructure runtime provides distributed inference cluster with FlashAttention and custom serving optimizations. Built for enterprise scalability and reliability, it offers high-throughput API endpoints, automated workflows, and robust developer integrations. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Distributed inference cluster with FlashAttention and custom serving optimizations.', 'from together import Together
client = Together(api_key="YOUR_API_KEY")
response = client.chat.completions.create(
  model="meta-llama/Llama-3-70b-chat-hf",
  messages=[{"role": "user", "content": "What is RAG?"}]
)', 'N/A', 'Proprietary, model availability may change.', 'https://www.together.ai/', '[{"text":"Together AI Documentation","url":"https://docs.together.ai/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Tome', 'Tome', 'AI', 'Productivity', 'Proprietary', 2020, 'N/A', 'An AI-powered storytelling and presentation tool that generates complete slide decks with text, images, and layouts from a single prompt. The application is powered by advanced foundation models utilizing web Application (Powered by GPT-4 for content + DALL·E for image generation). It features an intuitive interface designed to streamline complex productivity workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Powered by GPT-4 for content + DALL·E for image generation)', 'Visit tome.app, enter a prompt for your presentation topic, and Tome generates a full deck.', 'N/A', 'Limited design customization compared to traditional tools; export options are restricted.', 'https://tome.app', '[{"text":"Tome","url":"https://tome.app"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('torchtune', 'PyTorch', 'Framework', 'MLOps', 'BSD-3-Clause', 2024, 'N/A', 'Native PyTorch library for easily authoring, fine-tuning, and experimenting with LLMs using composable, clean PyTorch building blocks without heavy abstractions. Under the hood, it incorporates composable PyTorch post-training architecture supporting LoRA, QLoRA, full finetuning, DPO, and distributed FSDP/deepspeed recipes. Key technical highlights include: Native integration with torchao (quantization) and torchtitan (pretraining); achieves near peak-FLOPS utilization across single-GPU and multi-node FSDP2 setups. Licensed under the BSD-3-Clause license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Composable PyTorch post-training architecture supporting LoRA, QLoRA, full finetuning, DPO, and distributed FSDP/deepspeed recipes.', 'tune run --nnodes 1 --nproc_per_node 4 lora_finetune_distributed --config llama3_2/3B_lora', 'Native integration with torchao (quantization) and torchtitan (pretraining); achieves near peak-FLOPS utilization across single-GPU and multi-node FSDP2 setups.', 'Focuses strictly on PyTorch 2.x native ecosystems; less out-of-the-box support for non-PyTorch runtimes like ONNX or TensorRT-LLM without conversion.', 'https://github.com/pytorch/torchtune', '[{"text":"PyTorch torchtune Repository","url":"https://github.com/pytorch/torchtune"},{"text":"PyTorch Blog: Introducing torchtune","url":"https://pytorch.org/blog/torchtune-fine-tune-llms/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('tracker-pov', 'eidon-ai', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '10K<n<100K', 'Eidon Tracker POV 1,274 hours of egocentric video paired with 7-point IMU arm tracking, recorded during ordinary household work. Contributors wore a head-mounted came (38 likes, 10,594 downloads). The corpus spans 10K<n<100K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 38, Likes: 38, Downloads: 10,594. Released under the CC-BY-4.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("eidon-ai/tracker-pov")', 'Trending Score: 38, Likes: 38, Downloads: 10,594', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/eidon-ai/tracker-pov', '[{"text":"eidon-ai/tracker-pov on Hugging Face Datasets","url":"https://huggingface.co/datasets/eidon-ai/tracker-pov"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Transformers.js', 'Hugging Face', 'Framework', 'MLOps', 'Apache-2.0', 2024, 'N/A', 'State-of-the-art ML library from Hugging Face that runs pretrained models directly inside web browsers and Node.js with zero server dependencies via ONNX Runtime and WebGPU. Under the hood, it incorporates webAssembly + WebGPU execution runtime for ONNX neural network models. Key technical highlights include: Up to 10x speedup utilizing client-side WebGPU acceleration in Chrome/Edge. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'WebAssembly + WebGPU execution runtime for ONNX neural network models.', 'import { pipeline } from ''@huggingface/transformers'';
const classifier = await pipeline(''sentiment-analysis'');
const output = await classifier(''I love running AI locally in my browser!'');', 'Up to 10x speedup utilizing client-side WebGPU acceleration in Chrome/Edge.', 'Model size bounded by client browser RAM / VRAM allocation.', 'https://github.com/huggingface/transformers.js', '[{"text":"Transformers.js Docs","url":"https://huggingface.co/docs/transformers.js"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TRELLIS.2', 'microsoft', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Microsoft''s state-of-the-art 3D asset generation platform on Hugging Face Spaces. Utilizing structured 3D representations, it transforms single-view 2D images or text prompts into production-grade textured 3D Gaussian splats and polygon meshes suitable for game engines and AR/VR applications.', '3D generative diffusion pipeline combining sparse 3D convolutional transformers with differentiable Gaussian splatting decoders.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/microsoft/TRELLIS.2', 'Produces high-fidelity 3D assets with PBR textures in under 12 seconds; top-ranked 3D generator on Hugging Face.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/microsoft/TRELLIS.2', '[{"url":"https://huggingface.co/spaces/microsoft/TRELLIS.2","text":"microsoft/TRELLIS.2 on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Triton Inference Server', 'NVIDIA', 'Framework', 'MLOps', 'BSD-3-Clause', 2019, 'N/A', 'NVIDIA''s open-source multi-framework inference serving software engineered for high-throughput, low-latency GPU and CPU model deployment with dynamic batching and concurrent model execution. Under the hood, it incorporates multi-backend serving container supporting TensorRT, PyTorch TorchScript/LibTorch, ONNX Runtime, OpenVINO, and vLLM via C++ and gRPC/REST APIs. Key technical highlights include: Supports dynamic batching, concurrent model execution, model ensembles, and enterprise Kubernetes orchestration with automated Prometheus metrics. Licensed under the BSD-3-Clause license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Multi-backend serving container supporting TensorRT, PyTorch TorchScript/LibTorch, ONNX Runtime, OpenVINO, and vLLM via C++ and gRPC/REST APIs.', 'tritonserver --model-repository=/models --http-port=8000 --grpc-port=8001', 'Supports dynamic batching, concurrent model execution, model ensembles, and enterprise Kubernetes orchestration with automated Prometheus metrics.', 'Model repository directory configuration requires rigid adherence to Triton config.pbtxt protobuf schemas and versioning structures.', 'https://github.com/triton-inference-server/server', '[{"text":"NVIDIA Triton Inference Server Repository","url":"https://github.com/triton-inference-server/server"},{"text":"NVIDIA Developer Triton Inference Server Overview","url":"https://developer.nvidia.com/triton-inference-server"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('typed-decisions', 'Meta AI', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '1K<n<10K', 'Typed Decisions A benchmark for typed probabilistic decisions. A model gets one piece of unstructured state and answers five typed questions about it at once, and eve (85 likes, 19,901 downloads). The corpus spans 1K<n<10K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 56, Likes: 85, Downloads: 19,901. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("LocalLLaMA/typed-decisions")', 'Trending Score: 56, Likes: 85, Downloads: 19,901', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/LocalLLaMA/typed-decisions', '[{"text":"LocalLLaMA/typed-decisions on Hugging Face Datasets","url":"https://huggingface.co/datasets/LocalLLaMA/typed-decisions"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Udio', 'Udio', 'AI', 'Audio', 'Proprietary', 2024, 'N/A', 'An AI music creation tool that generates high-quality, diverse music tracks with vocals and instrumentation from short text descriptions. The application is powered by advanced foundation models utilizing web Application (Proprietary generative audio model). It features an intuitive interface designed to streamline complex audio workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Proprietary generative audio model)', 'Visit udio.com, describe the music style or mood, and generate tracks instantly.', 'N/A', 'Free tier has monthly generation limits; less genre variety compared to Suno in some styles.', 'https://www.udio.com', '[{"text":"Udio","url":"https://www.udio.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UltraData-Code', 'OpenBMB', 'Dataset', 'AI Coding', 'APACHE-2.0', 2026, '100M<n<1B', 'UltraData-Code 📦 UltraData Collection | 🌐 UltraData | 🤗 MiniCPM5 Series | 📖 Tech Report (Coming Soon) | 🤗 UltraData-Code-L2 Classifier English | 中文 (78 likes, 6,343 downloads). The corpus spans 100M<n<1B of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 65, Likes: 78, Downloads: 6,343. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("openbmb/UltraData-Code")', 'Trending Score: 65, Likes: 78, Downloads: 6,343', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/openbmb/UltraData-Code', '[{"text":"openbmb/UltraData-Code on Hugging Face Datasets","url":"https://huggingface.co/datasets/openbmb/UltraData-Code"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UltraData-RL-2609', 'OpenBMB', 'Dataset', 'AI Coding', 'APACHE-2.0', 2026, '10K<n<100K', 'UltraData-RL-2609 📦 UltraData Collection | 🌐 UltraData | 🤗 MiniCPM5 Series English | 中文 📚 Introduction UltraData-RL-2609 is the L3 refined data f (60 likes, 667 downloads). The corpus spans 10K<n<100K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 53, Likes: 60, Downloads: 667. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("openbmb/UltraData-RL-2609")', 'Trending Score: 53, Likes: 60, Downloads: 667', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/openbmb/UltraData-RL-2609', '[{"text":"openbmb/UltraData-RL-2609 on Hugging Face Datasets","url":"https://huggingface.co/datasets/openbmb/UltraData-RL-2609"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UltraData-SFT-Agent-2609', 'OpenBMB', 'Dataset', 'AI Coding', 'APACHE-2.0', 2026, '100K<n<1M', 'UltraData-SFT-Agent-2609 📦 UltraData Collection | 🌐 UltraData | 🤗 MiniCPM5 Series English | 中文 📚 Introduction UltraData-SFT-Agent-2609 is the L3 (67 likes, 642 downloads). The corpus spans 100K<n<1M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 60, Likes: 67, Downloads: 642. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("openbmb/UltraData-SFT-Agent-2609")', 'Trending Score: 60, Likes: 67, Downloads: 642', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/openbmb/UltraData-SFT-Agent-2609', '[{"text":"openbmb/UltraData-SFT-Agent-2609 on Hugging Face Datasets","url":"https://huggingface.co/datasets/openbmb/UltraData-SFT-Agent-2609"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UltraData-Stack-v3-L2', 'openbmb', 'Dataset', 'AI Coding', 'ODC-BY', 2026, '100M<n<1B', 'Curated high-quality pretraining dataset curated by OpenBMB for developing frontier reasoning and coding foundation models. Featuring over 500 billion tokens of thoroughly deduplicated, syntactically verified code, competitive programming solutions, formal mathematical proofs, and synthetic chain-of-thought traces.', 'Multi-tiered tokenized dataset in Arrow format with automated syntax linting, test suite execution, and educational value filtering.', 'from datasets import load_dataset

dataset = load_dataset("openbmb/UltraData-Stack-v3-L2")', '500B+ verified tokens; proven to boost downstream coding benchmarks (HumanEval, SWE-bench) by 12% in ablations.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/openbmb/UltraData-Stack-v3-L2', '[{"url":"https://huggingface.co/datasets/openbmb/UltraData-Stack-v3-L2","text":"openbmb/UltraData-Stack-v3-L2 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UltraFeedback', 'Argilla', 'Dataset', 'NLP', 'MIT', 2024, '64k prompts (250k pairs)', 'Large-scale preference dataset containing 64,000 multi-turn prompts with responses evaluated by GPT-4 across instruction following, truthfulness, and quality. The corpus spans 64k prompts (250k pairs) of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Gold standard preference dataset for training Zephyr, Starling, and top DPO models. Released under the MIT license for open evaluation and research reproducibility.', 'Binarized and scalar preference alignment dataset for DPO and KTO.', 'from datasets import load_dataset
ds = load_dataset("HuggingFaceH4/ultrafeedback_binarized", split="train_prefs")', 'Gold standard preference dataset for training Zephyr, Starling, and top DPO models.', 'Relies on GPT-4 evaluation scores as ground truth.', 'https://huggingface.co/datasets/argilla/ultrafeedback', '[{"text":"UltraFeedback Paper","url":"https://arxiv.org/abs/2310.01377"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('uncensored-imageTOimage2Ref', 'fishpasters', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Web-based image-to-image reference synthesis playground hosted on Hugging Face Spaces by fishpasters. Featuring multi-reference conditioning, style mixing, and structural edge preservation, it allows creators to blend visual concepts with complete creative freedom.', 'Gradio web studio interfacing with open-weights diffusion backbones and multi-reference IP-Adapter modules.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/fishpasters/uncensored-imageTOimage2Ref', 'Zero refusal filtering; supports up to 4 simultaneous image reference inputs with sub-3s preview latency.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/fishpasters/uncensored-imageTOimage2Ref', '[{"url":"https://huggingface.co/spaces/fishpasters/uncensored-imageTOimage2Ref","text":"fishpasters/uncensored-imageTOimage2Ref on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Underdog-Saluki-27B-1.0', 'ConwayResearch', 'Model', 'NLP', 'APACHE-2.0', 2026, '27B params', 'ConwayResearch''s 27B parameter open-weights language model fine-tuned for high-precision analytical problem solving, legal brief synthesis, and scientific hypothesis generation. Built with extensive preference optimization, it demonstrates superior instruction following and rigorous factuality in professional knowledge domains.', '27B parameter dense Transformer with Grouped Query Attention (GQA) and 64k token context window.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ConwayResearch/Underdog-Saluki-27B-1.0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ConwayResearch/Underdog-Saluki-27B-1.0")', 'MMLU: 82.1%, GSM8K: 88.5%, HumanEval: 79.2%, MT-Bench: 8.84', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0', '[{"url":"https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0","text":"ConwayResearch/Underdog-Saluki-27B-1.0 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Unlimited-OCR', 'baidu', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'Baidu''s high-throughput document intelligence and optical character recognition model engineered to process documents of arbitrary length without context limits. Capable of transcribing dense tables, handwritten formulas, multi-column academic layouts, and multilingual text across 100+ languages with pixel-accurate bounding box coordinates.', 'End-to-end vision-language transformer combining hierarchical feature pyramids with autoregressive text and layout decoders.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("baidu/Unlimited-OCR", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("baidu/Unlimited-OCR")', 'OmniDoc-Bench accuracy: 98.7%; transcribes 100-page complex technical PDFs in under 4.2 seconds.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/baidu/Unlimited-OCR', '[{"url":"https://huggingface.co/baidu/Unlimited-OCR","text":"baidu/Unlimited-OCR on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Unsloth', 'Unsloth AI', 'Framework', 'MLOps', 'Apache-2.0', 2024, 'N/A', 'Ultra-fast open-source fine-tuning framework providing 2x-5x faster training speeds and up to 80% lower VRAM memory usage for Llama, Mistral, Qwen, and DeepSeek. Under the hood, it incorporates custom OpenAI Triton manual backpropagation GPU kernels. Key technical highlights include: 5x faster training, 0% accuracy loss compared to standard Hugging Face Trainer. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Custom OpenAI Triton manual backpropagation GPU kernels.', 'from unsloth import FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Llama-3.3-70B-Instruct-bnb-4bit",
    max_seq_length=2048,
    load_in_4bit=True
)', '5x faster training, 0% accuracy loss compared to standard Hugging Face Trainer.', 'Exclusively tailored for NVIDIA GPUs (Compute Capability 7.0+).', 'https://github.com/unslothai/unsloth', '[{"text":"Unsloth Documentation","url":"https://docs.unsloth.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('v0 by Vercel', 'Vercel', 'AI', 'AI Coding', 'Proprietary', 2024, 'N/A', 'Generative UI design platform that creates production-grade, accessible React components and full frontend pages styled with Tailwind CSS and Shadcn UI from natural prompts. The application is powered by advanced foundation models utilizing web Application / Fine-tuned LLM with React Component AST Compiler. Key user-facing capabilities include Rapid frontend prototyping benchmark standard used by millions of web developers. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Fine-tuned LLM with React Component AST Compiler.', 'Visit v0.dev, enter prompt: "Modern crypto portfolio dashboard with dark mode charts", and click Copy Code to paste into your Next.js project.', 'Rapid frontend prototyping benchmark standard used by millions of web developers.', 'Specialized for frontend JSX/React interfaces; backend API logic requires manual setup.', 'https://v0.dev', '[{"text":"v0 by Vercel","url":"https://v0.dev"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('various', 'malcolmrey', 'Dataset', 'Computer Vision', 'WTFPL', 2026, 'n<1K', 'malcolmrey''s Various AI Model Repository This is the repository of malcolmrey where various things related to Stable Diffusion, Flux, WAN, and other upcoming model ar (182 likes, 53,192 downloads). The corpus spans n<1K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 46, Likes: 182, Downloads: 53,192. Released under the WTFPL license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("malcolmrey/various")', 'Trending Score: 46, Likes: 182, Downloads: 53,192', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/malcolmrey/various', '[{"text":"malcolmrey/various on Hugging Face Datasets","url":"https://huggingface.co/datasets/malcolmrey/various"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('VDEBench', 'hongzhuyi', 'Dataset', 'Computer Vision', 'Open Data', 2026, '1K<n<10K', 'Video Domain Evaluation (VDEBench) benchmark dataset developed by hongzhuyi for evaluating video foundation models on complex temporal reasoning. Spanning causal event prediction, long-term object tracking, counterfactual action understanding, and narrative comprehension across diverse video domains.', 'Curated multimodal video dataset with synchronized temporal annotations, multiple-choice questions, and caption tracks.', 'from datasets import load_dataset

dataset = load_dataset("hongzhuyi/VDEBench")', '12,000+ annotated video clips across 24 realistic activity domains.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/hongzhuyi/VDEBench', '[{"url":"https://huggingface.co/datasets/hongzhuyi/VDEBench","text":"hongzhuyi/VDEBench on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Vertex AI', 'Google DeepMind', 'Platform', 'MLOps', 'Proprietary', 2021, 'N/A', 'Google Cloud''s unified ML platform for building, deploying, and scaling AI models including access to Gemini, PaLM, and custom model training. Its cloud and infrastructure runtime provides managed cloud ML platform with AutoML, custom training, feature store, and model registry. Built for enterprise scalability and reliability, it offers high-throughput API endpoints, automated workflows, and robust developer integrations. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Managed cloud ML platform with AutoML, custom training, feature store, and model registry.', 'import vertexai
from vertexai.generative_models import GenerativeModel
vertexai.init(project="YOUR_PROJECT", location="us-central1")
model = GenerativeModel("gemini-1.5-pro")
response = model.generate_content("Describe the water cycle.")', 'N/A', 'GCP-locked, complex pricing, requires GCP account setup.', 'https://cloud.google.com/vertex-ai', '[{"text":"Vertex AI Documentation","url":"https://cloud.google.com/vertex-ai/docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Vicuna-13B', 'LMSYS Org', 'Model', 'NLP', 'Non-commercial (based on LLaMA license)', 2023, '13B params', 'A fine-tuned LLaMA model trained on ShareGPT conversations, achieving 90% of ChatGPT quality according to GPT-4 evaluations, incorporating an architecture of lLaMA decoder fine-tuned on ~70K user-shared ChatGPT conversations. The model demonstrates competitive performance across verified evaluations, including GPT-4 judged 90% of ChatGPT quality on open questions. With its 13B params design, it supports diverse local and enterprise deployment profiles under the Non-commercial (based on LLaMA license) license.', 'LLaMA decoder fine-tuned on ~70K user-shared ChatGPT conversations.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("lmsys/vicuna-13b-v1.5")
tokenizer = AutoTokenizer.from_pretrained("lmsys/vicuna-13b-v1.5")', 'GPT-4 judged 90% of ChatGPT quality on open questions', 'Non-commercial, hallucinates more than proprietary models.', 'https://lmsys.org/blog/2023-03-30-vicuna/', '[{"text":"Vicuna Blog Post","url":"https://lmsys.org/blog/2023-03-30-vicuna/"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ViT (Vision Transformer)', 'Google DeepMind', 'Model', 'Computer Vision', 'Apache-2.0', 2020, 'ViT-L/16: 307M params', 'The original paper demonstrating that pure transformer architecture, without convolutional layers, achieves state-of-the-art results on image classification, incorporating an architecture of pure transformer applied to sequences of image patches. The model demonstrates competitive performance across verified evaluations, including ImageNet top-1: 88.55% (ViT-L/16). With its ViT-L/16: 307M params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Pure transformer applied to sequences of image patches.', 'from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
processor = ViTImageProcessor.from_pretrained(''google/vit-base-patch16-224'')
model = ViTForImageClassification.from_pretrained(''google/vit-base-patch16-224'')', 'ImageNet top-1: 88.55% (ViT-L/16)', 'Requires large datasets to train from scratch, less data-efficient than CNNs.', 'https://github.com/google-research/vision_transformer', '[{"text":"Dosovitskiy et al. (2020) - ViT Paper","url":"https://arxiv.org/abs/2010.11929"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('vLLM', 'UC Berkeley (BAIR)', 'Framework', 'MLOps', 'Apache-2.0', 2023, 'N/A', 'A fast and easy-to-use library for LLM inference and serving, featuring PagedAttention for near-optimal GPU memory management. Under the hood, it incorporates pagedAttention memory manager with continuous batching for high-throughput serving. Key technical highlights include: Up to 24x higher throughput than HuggingFace Transformers. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'PagedAttention memory manager with continuous batching for high-throughput serving.', 'from vllm import LLM, SamplingParams
llm = LLM(model="meta-llama/Meta-Llama-3-8B-Instruct")
params = SamplingParams(temperature=0.8, top_p=0.95)
outputs = llm.generate(["Tell me a fun fact about space."], params)', 'Up to 24x higher throughput than HuggingFace Transformers', 'Primarily optimized for NVIDIA GPUs, less support for AMD/Apple Silicon.', 'https://github.com/vllm-project/vllm', '[{"text":"Kwon et al. (2023) - vLLM Paper","url":"https://arxiv.org/abs/2309.06180"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Wan 2.1', 'Alibaba (Qwen)', 'Model', 'Video Generation', 'Apache-2.0', 2025, '14B params', 'Alibaba''s breakthrough open-weights 14B diffusion video model generating photorealistic, temporally consistent 1080p video with rich physics simulations from text and image prompts, incorporating a 3D Spatio-Temporal Variational Autoencoder (3D-VAE) + Flow-Matching Diffusion Transformer (DiT) architecture. The model demonstrates competitive performance across verified evaluations, including VBench Score: 85.9%, Temporal Consistency: 87.2%, Dynamic Degree: 84.5%. With its 14B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', '3D Spatio-Temporal Variational Autoencoder (3D-VAE) + Flow-Matching Diffusion Transformer (DiT).', 'import torch
from diffusers import WanPipeline
pipe = WanPipeline.from_pretrained("Wan-AI/Wan2.1-T2V-14B", torch_dtype=torch.bfloat16).to("cuda")
video = pipe(prompt="Cinematic macro shot of dew on spiderweb at sunrise", num_frames=81).frames', 'VBench Score: 85.9%, Temporal Consistency: 87.2%, Dynamic Degree: 84.5%', 'Requires high VRAM (16GB+ with offloading, 24GB+ for native 1080p generation).', 'https://github.com/Wan-Video/Wan2.1', '[{"text":"Wan 2.1: Open and Advanced Large Video Generation Model","url":"https://github.com/Wan-Video/Wan2.1"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Wan_2.2_I2V_14B_Custom_Lora_Wow', 'Cockdaddyfuck', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by Cockdaddyfuck. Trending with 113 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 73, Community Likes: 113. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Cockdaddyfuck/Wan_2.2_I2V_14B_Custom_Lora_Wow', 'Trending Score: 73, Community Likes: 113', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Cockdaddyfuck/Wan_2.2_I2V_14B_Custom_Lora_Wow', '[{"text":"Cockdaddyfuck/Wan_2.2_I2V_14B_Custom_Lora_Wow on Hugging Face Spaces","url":"https://huggingface.co/spaces/Cockdaddyfuck/Wan_2.2_I2V_14B_Custom_Lora_Wow"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('wan2-2-fp8da-aoti-preview-2c-finishing', 'Alibaba (Qwen)', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by STCM. Trending with 96 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 68, Community Likes: 96. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/STCM/wan2-2-fp8da-aoti-preview-2c-finishing', 'Trending Score: 68, Community Likes: 96', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/STCM/wan2-2-fp8da-aoti-preview-2c-finishing', '[{"text":"STCM/wan2-2-fp8da-aoti-preview-2c-finishing on Hugging Face Spaces","url":"https://huggingface.co/spaces/STCM/wan2-2-fp8da-aoti-preview-2c-finishing"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('wan2-2-i2v-v3', 'Alibaba (Qwen)', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by observantdistressed. Trending with 78 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 68, Community Likes: 78. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/observantdistressed/wan2-2-i2v-v3', 'Trending Score: 68, Community Likes: 78', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/observantdistressed/wan2-2-i2v-v3', '[{"text":"observantdistressed/wan2-2-i2v-v3 on Hugging Face Spaces","url":"https://huggingface.co/spaces/observantdistressed/wan2-2-i2v-v3"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('wan555', 'kulkas2pintu', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by kulkas2pintu. Trending with 1,801 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 143, Community Likes: 1,801. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/kulkas2pintu/wan555', 'Trending Score: 143, Community Likes: 1,801', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/kulkas2pintu/wan555', '[{"text":"kulkas2pintu/wan555 on Hugging Face Spaces","url":"https://huggingface.co/spaces/kulkas2pintu/wan555"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('wan777', 'kulkas2pintu', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by kulkas2pintu. Trending with 96 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 76, Community Likes: 96. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/kulkas2pintu/wan777', 'Trending Score: 76, Community Likes: 96', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/kulkas2pintu/wan777', '[{"text":"kulkas2pintu/wan777 on Hugging Face Spaces","url":"https://huggingface.co/spaces/kulkas2pintu/wan777"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Weights & Biases', 'Weights & Biases Inc.', 'Platform', 'MLOps', 'Proprietary (free for individuals)', 2018, 'N/A', 'The ML experiment tracking and model management platform used by researchers worldwide to log metrics, visualize training, and collaborate on models. Its cloud and infrastructure runtime provides cloud-based experiment tracking with SDK integrations for PyTorch, TensorFlow, JAX, and more. Built for enterprise scalability and reliability, it offers high-throughput API endpoints, automated workflows, and robust developer integrations. Accessible under a Proprietary (free for individuals) tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Cloud-based experiment tracking with SDK integrations for PyTorch, TensorFlow, JAX, and more.', 'import wandb
wandb.init(project="my-project")
for epoch in range(10):
  loss = train_one_epoch()
  wandb.log({"loss": loss, "epoch": epoch})', 'N/A', 'Data sent to cloud servers (privacy concern), storage limits on free tier.', 'https://wandb.ai', '[{"text":"W&B Documentation","url":"https://docs.wandb.ai/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Weights & Biases Weave', 'Weights & Biases', 'Platform', 'MLOps', 'Apache-2.0 / SaaS', 2024, 'N/A', 'Lightweight LLM observability and evaluation toolkit from W&B that logs, versions, and systematically evaluates generative AI pipelines. Its cloud and infrastructure runtime provides decorated Python tracing library with automated schema extraction and web UI. Core platform telemetry and performance features include: Integrated into W&B ML tracking ecosystem used by top frontier AI labs. Accessible under a Apache-2.0 / SaaS tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Decorated Python tracing library with automated schema extraction and web UI.', 'import weave
weave.init(''my-ai-app'')
@weave.op()
def generate_response(prompt: str) -> str:
    # Automatically tracked in dashboard
    return "Response"', 'Integrated into W&B ML tracking ecosystem used by top frontier AI labs.', 'Requires W&B account login for web UI dashboard.', 'https://wandb.ai/site/weave', '[{"text":"Weave Docs","url":"https://weave-docs.wandb.ai"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Whisper', 'OpenAI', 'Model', 'Audio', 'MIT', 2022, 'Large-v3: 1.55B params', 'OpenAI''s robust automatic speech recognition (ASR) model trained on 680K hours of multilingual and multitask supervised web data, incorporating an architecture of encoder-decoder transformer operating on log-Mel spectrograms. The model demonstrates competitive performance across verified evaluations, including WER competitive with commercial ASR on LibriSpeech. With its Large-v3: 1.55B params design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'Encoder-decoder transformer operating on log-Mel spectrograms.', 'import whisper
model = whisper.load_model("large-v3")
result = model.transcribe("audio.mp3")
print(result["text"])', 'WER competitive with commercial ASR on LibriSpeech', 'Real-time use requires optimization, struggles with heavy accents and rare languages.', 'https://openai.com/research/whisper', '[{"text":"Radford et al. (2022) - Whisper Paper","url":"https://arxiv.org/abs/2212.04356"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Whisper v3 Turbo', 'OpenAI', 'Model', 'Audio', 'MIT', 2024, '809M params', 'OpenAI''s optimized speech recognition model providing near whisper-large-v3 accuracy at 8x faster inference speed, incorporating an architecture of pruned 4-layer decoder encoder-decoder Transformer. The model demonstrates competitive performance across verified evaluations, including Word Error Rate (WER): 7.1% on multilingual Common Voice; 8x inference speedup. With its 809M params design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'Pruned 4-layer decoder encoder-decoder Transformer.', 'import whisper
model = whisper.load_model("turbo")
result = model.transcribe("audio.mp3")
print(result["text"])', 'Word Error Rate (WER): 7.1% on multilingual Common Voice; 8x inference speedup.', 'Slight accuracy trade-off in heavily accented or noisy audio compared to full large-v3.', 'https://github.com/openai/whisper', '[{"text":"Whisper Turbo Release","url":"https://github.com/openai/whisper/discussions/2363"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('wikipedia', 'wikimedia', 'Dataset', 'NLP', 'CC-BY-SA-3.0', 2026, '10M<n<100M', 'Dataset Card for Wikimedia Wikipedia Dataset Summary Wikipedia dataset containing cleaned articles of all languages. The dataset is built from the Wikipe (1,467 likes, 264,787 downloads). The corpus spans 10M<n<100M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 27, Likes: 1,467, Downloads: 264,787. Released under the CC-BY-SA-3.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("wikimedia/wikipedia")', 'Trending Score: 27, Likes: 1,467, Downloads: 264,787', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/wikimedia/wikipedia', '[{"text":"wikimedia/wikipedia on Hugging Face Datasets","url":"https://huggingface.co/datasets/wikimedia/wikipedia"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('WildChat', 'Allen Institute for AI', 'Dataset', 'NLP', 'ODC-By 1.0', 2024, '1,000,000 conversations', 'Corpus of 1 million real-world user interactions with ChatGPT across 100+ languages, including moderation annotations and toxicity analysis. The corpus spans 1,000,000 conversations of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Critical dataset for studying user prompt drift, jailbreak attempts, and multilingual intent. Released under the ODC-By 1.0 license for open evaluation and research reproducibility.', 'Real-world conversational turns with multi-turn context and safety classifications.', 'from datasets import load_dataset
ds = load_dataset("allenai/WildChat-1M", split="train")', 'Critical dataset for studying user prompt drift, jailbreak attempts, and multilingual intent.', 'Includes raw unfiltered user queries requiring safety filtering during fine-tuning.', 'https://huggingface.co/datasets/allenai/WildChat-1M', '[{"text":"WildChat Paper","url":"https://arxiv.org/abs/2405.01070"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Windsurf', 'Codeium', 'AI', 'AI Coding', 'Proprietary', 2024, 'N/A', 'An AI-powered code editor by Codeium featuring ''Flows'' — a deeply agentic coding experience where AI and developer collaborate on the same codebase simultaneously. The application is powered by advanced foundation models utilizing iDE Application (VS Code fork with proprietary Codeium AI and agentic flow engine). It features an intuitive interface designed to streamline complex ai coding workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'IDE Application (VS Code fork with proprietary Codeium AI and agentic flow engine)', 'Download from codeium.com/windsurf and install as a standalone IDE.', 'N/A', 'Newer product with a smaller community than Cursor; some agentic features are still maturing.', 'https://codeium.com/windsurf', '[{"text":"Windsurf by Codeium","url":"https://codeium.com/windsurf"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('wm_imagined', 'Cirquar-Tech', 'Dataset', 'NLP', 'Open Data', 2026, 'Curated Dataset', 'Imagined Data This repository hosts imagined interaction data generated by world models across different environments, tasks, and data sources. Data are organized int (41 likes, 6,983 downloads). The corpus spans Curated Dataset of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 40, Likes: 41, Downloads: 6,983. Released under the Open Data license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Cirquar-Tech/wm_imagined")', 'Trending Score: 40, Likes: 41, Downloads: 6,983', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Cirquar-Tech/wm_imagined', '[{"text":"Cirquar-Tech/wm_imagined on Hugging Face Datasets","url":"https://huggingface.co/datasets/Cirquar-Tech/wm_imagined"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('World-SimReady-Home', 'Yootta', 'Dataset', 'Computer Vision', 'CC-BY-NC-SA-4.0', 2026, 'Curated Dataset', 'WorldSimReady-Home Dataset description CAD-based SimReady assets Optimized CAD assets with configured collision and physical properties. Manually reviewe (34 likes, 424 downloads). The corpus spans Curated Dataset of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 31, Likes: 34, Downloads: 424. Released under the CC-BY-NC-SA-4.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Yootta/World-SimReady-Home")', 'Trending Score: 31, Likes: 34, Downloads: 424', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Yootta/World-SimReady-Home', '[{"text":"Yootta/World-SimReady-Home on Hugging Face Datasets","url":"https://huggingface.co/datasets/Yootta/World-SimReady-Home"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Writesonic', 'Writesonic', 'AI', 'Productivity', 'Proprietary', 2020, 'N/A', 'An AI writing assistant and chatbot platform that helps generate SEO-optimized articles, landing pages, ads, and social media content at scale. The application is powered by advanced foundation models utilizing web Application (Powered by GPT-4 with SEO and marketing-specific tooling). It features an intuitive interface designed to streamline complex productivity workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Powered by GPT-4 with SEO and marketing-specific tooling)', 'Visit writesonic.com to access the editor and start generating content with templates.', 'N/A', 'Quality can vary for niche topics; word credit limits apply on most plans.', 'https://writesonic.com', '[{"text":"Writesonic","url":"https://writesonic.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Xing4.0-29B-A4B', 'XingChen-AGI', 'Model', 'NLP', 'APACHE-2.0', 2026, '29B params', 'High-performance NLP open-weights model by XingChen-AGI, trending with over 653 community likes and 7,278 downloads on Hugging Face, incorporating an architecture of xingChen-AGI text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 578, Likes: 653, Downloads: 7,278. With its 29B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'XingChen-AGI text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XingChen-AGI/Xing4.0-29B-A4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XingChen-AGI/Xing4.0-29B-A4B")', 'Trending Score: 578, Likes: 653, Downloads: 7,278', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B', '[{"text":"XingChen-AGI/Xing4.0-29B-A4B on Hugging Face","url":"https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Xing4.0-29B-A4B-GGUF', 'Venastine-Research', 'Model', 'NLP', 'APACHE-2.0', 2026, '29B params', 'High-performance NLP open-weights model by Venastine-Research, trending with over 669 community likes and 36,481 downloads on Hugging Face, incorporating an architecture of venastine-Research text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 617, Likes: 669, Downloads: 36,481. With its 29B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Venastine-Research text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Venastine-Research/Xing4.0-29B-A4B-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Venastine-Research/Xing4.0-29B-A4B-GGUF")', 'Trending Score: 617, Likes: 669, Downloads: 36,481', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Venastine-Research/Xing4.0-29B-A4B-GGUF', '[{"text":"Venastine-Research/Xing4.0-29B-A4B-GGUF on Hugging Face","url":"https://huggingface.co/Venastine-Research/Xing4.0-29B-A4B-GGUF"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('yodas3', 'espnet', 'Dataset', 'Audio', 'CC-BY-3.0', 2026, '1M<n<10M', 'YODAS v3 Paper YODAS v3 is a large web-crawled dataset containing over 1.1 million hours of audio that were originally released under a CC-BY-3.0 license. The dataset (70 likes, 17,831 downloads). The corpus spans 1M<n<10M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 67, Likes: 70, Downloads: 17,831. Released under the CC-BY-3.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("espnet/yodas3")', 'Trending Score: 67, Likes: 70, Downloads: 17,831', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/espnet/yodas3', '[{"text":"espnet/yodas3 on Hugging Face Datasets","url":"https://huggingface.co/datasets/espnet/yodas3"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('YOLOv8', 'Ultralytics', 'Model', 'Computer Vision', 'AGPL-3.0', 2023, 'Nano: 3.2M params to Extra-Large: 68.2M params', 'The latest iteration of the You Only Look Once real-time object detection framework, supporting detection, segmentation, pose estimation, and classification, incorporating an architecture of single-stage detector with an anchor-free head and a CSPDarknet backbone. The model demonstrates competitive performance across verified evaluations, including COCO mAP: 53.9% (YOLOv8x). With its Nano: 3.2M params to Extra-Large: 68.2M params design, it supports diverse local and enterprise deployment profiles under the AGPL-3.0 license.', 'Single-stage detector with an anchor-free head and a CSPDarknet backbone.', 'from ultralytics import YOLO
model = YOLO("yolov8n.pt")
results = model("https://ultralytics.com/images/bus.jpg")
results[0].show()', 'COCO mAP: 53.9% (YOLOv8x)', 'AGPL license may restrict commercial use without purchase.', 'https://github.com/ultralytics/ultralytics', '[{"text":"Ultralytics YOLOv8 Docs","url":"https://docs.ultralytics.com/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('You.com', 'You.com', 'AI', 'NLP', 'Proprietary', 2022, 'N/A', 'An AI-powered search and chat assistant that combines real-time web search with conversational AI, offering modes for research, coding, and writing. The application is powered by advanced foundation models utilizing answer Engine / Conversational Agent (Powered by multiple LLMs and web indices). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Answer Engine / Conversational Agent (Powered by multiple LLMs and web indices)', 'Visit you.com to search and interact with the AI assistant.', 'N/A', 'Quality varies depending on the selected AI mode; some features are behind a paywall.', 'https://you.com', '[{"text":"You.com","url":"https://you.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('YuE2-3B', 'm-a-p', 'Model', 'Audio', 'CC-BY-NC-4.0', 2026, '3B params', 'High-performance Audio open-weights model by m-a-p, trending with over 477 community likes and 5,186 downloads on Hugging Face, incorporating an architecture of m-a-p text to audio architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 453, Likes: 477, Downloads: 5,186. With its 3B params design, it supports diverse local and enterprise deployment profiles under the CC-BY-NC-4.0 license.', 'm-a-p text to audio architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("m-a-p/YuE2-3B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("m-a-p/YuE2-3B")', 'Trending Score: 453, Likes: 477, Downloads: 5,186', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/m-a-p/YuE2-3B', '[{"text":"m-a-p/YuE2-3B on Hugging Face","url":"https://huggingface.co/m-a-p/YuE2-3B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('yue2-hum-to-song', 'Mothersuperior', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by Mothersuperior. Trending with 102 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 66, Community Likes: 102. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Mothersuperior/yue2-hum-to-song', 'Trending Score: 66, Community Likes: 102', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Mothersuperior/yue2-hum-to-song', '[{"text":"Mothersuperior/yue2-hum-to-song on Hugging Face Spaces","url":"https://huggingface.co/spaces/Mothersuperior/yue2-hum-to-song"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ZDTaichu5.0-9B', 'TaichuAI', 'Model', 'Multimodal', 'Open Weights', 2026, '9B params', 'High-performance Multimodal open-weights model by TaichuAI, trending with over 1,041 community likes and 8,313 downloads on Hugging Face, incorporating an architecture of taichuAI image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 481, Likes: 1,041, Downloads: 8,313. With its 9B params design, it supports diverse local and enterprise deployment profiles under the Open Weights license.', 'TaichuAI image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("TaichuAI/ZDTaichu5.0-9B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("TaichuAI/ZDTaichu5.0-9B")', 'Trending Score: 481, Likes: 1,041, Downloads: 8,313', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/TaichuAI/ZDTaichu5.0-9B', '[{"text":"TaichuAI/ZDTaichu5.0-9B on Hugging Face","url":"https://huggingface.co/TaichuAI/ZDTaichu5.0-9B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ZGCM-1-Data', 'zgcagi', 'Dataset', 'AI Coding', 'OTHER', 2026, '1B<n<10B', 'A Fully Open and Extremely Efficient Foundation Model for Math and Agentic Search Zhongguancun Academy · Zhongguancun Institute of Artificial Intelligence 📄 Tech Report · 🤗 Mode (36 likes, 16,585 downloads). The corpus spans 1B<n<10B of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 33, Likes: 36, Downloads: 16,585. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("zgcagi/ZGCM-1-Data")', 'Trending Score: 33, Likes: 36, Downloads: 16,585', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/zgcagi/ZGCM-1-Data', '[{"text":"zgcagi/ZGCM-1-Data on Hugging Face Datasets","url":"https://huggingface.co/datasets/zgcagi/ZGCM-1-Data"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('clairic', 'hugging-apps', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by hugging-apps. Trending with 23 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/hugging-apps/clairic', 'Trending Score: 23, Community Likes: 23', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/hugging-apps/clairic', '[{"text":"hugging-apps/clairic on Hugging Face Spaces","url":"https://huggingface.co/spaces/hugging-apps/clairic"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DaisyRose-27B', 'RadixArk', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '27B params', 'High-performance Multimodal open-weights model by RadixArk, trending with over 193 community likes and 166 downloads on Hugging Face.', 'RadixArk image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("RadixArk/DaisyRose-27B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("RadixArk/DaisyRose-27B")', 'Trending Score: 136, Likes: 193, Downloads: 166', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/RadixArk/DaisyRose-27B', '[{"text":"RadixArk/DaisyRose-27B on Hugging Face","url":"https://huggingface.co/RadixArk/DaisyRose-27B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral: Pixtral Large 2502', 'mistralai', 'Model', 'Multimodal', 'Proprietary', 2026, '128k Context · Available via API', 'Pixtral Large 2502 is the February 2025 version of Mistral AI''s large multimodal model, following [Pixtral Large 2411](https://openrouter.ai/mistralai/pixtral-large-2411). It accep', 'Modern foundation model hosted on OpenRouter with native 128k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "mistralai/pixtral-large-2502",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 128k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/mistralai/pixtral-large-2502', '[{"text":"Mistral: Pixtral Large 2502 on OpenRouter","url":"https://openrouter.ai/mistralai/pixtral-large-2502"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Inkling', 'Thinking Machines', 'Model', 'Research', 'Open Weights', 2026, '1000k Context · Open Model', 'Frontier Research model by Thinking Machines benchmarked on Artificial Analysis with an Intelligence Index of 12.4781698715401 and a verified 1000k Context window.', 'Open-weights frontier neural architecture developed by Thinking Machines, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/inkling', 'Context Window: 1000k Context, Intelligence Index: 12.4781698715401, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/inkling', '[{"text":"Inkling on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/inkling"},{"text":"Inkling Inference Providers","url":"https://artificialanalysis.ai/models/inkling/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('duplex-pre-training-yodas3-mimi', 'Trelis', 'Dataset', 'NLP', 'CC-BY-3.0', 2026, '1K<n<10K', 'YODAS3 tokenized speech-to-speech pre-training dataset 	 [!TIP] For speech separation and audio annotation services, contact voice@trelis.com. A filtered and tokenized (28 likes, 1,601 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Trelis/duplex-pre-training-yodas3-mimi")', 'Trending Score: 8, Likes: 28, Downloads: 1,601', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Trelis/duplex-pre-training-yodas3-mimi', '[{"text":"Trelis/duplex-pre-training-yodas3-mimi on Hugging Face Datasets","url":"https://huggingface.co/datasets/Trelis/duplex-pre-training-yodas3-mimi"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SplatAnything', 'ritianyu', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by ritianyu. Trending with 36 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/ritianyu/SplatAnything', 'Trending Score: 23, Community Likes: 36', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/ritianyu/SplatAnything', '[{"text":"ritianyu/SplatAnything on Hugging Face Spaces","url":"https://huggingface.co/spaces/ritianyu/SplatAnything"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Rumble-2-Flash', 'Reson8', 'Model', 'Audio', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Audio open-weights model by Reson8, trending with over 165 community likes and 929 downloads on Hugging Face.', 'Reson8 automatic speech recognition architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Reson8/Rumble-2-Flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Reson8/Rumble-2-Flash")', 'Trending Score: 112, Likes: 165, Downloads: 929', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Reson8/Rumble-2-Flash', '[{"text":"Reson8/Rumble-2-Flash on Hugging Face","url":"https://huggingface.co/Reson8/Rumble-2-Flash"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenAI: GPT-6.2 Sol Pro', 'openai', 'Model', 'NLP', 'Proprietary', 2026, '1050k Context · Available via API', 'GPT-6.2 Sol Pro is the same underlying model as [GPT-6.2 Sol](https://openrouter.ai/openai/gpt-6.2-sol), served with `reasoning.mode` set to `pro` for higher-quality responses on c', 'Modern foundation model hosted on OpenRouter with native 1050k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "openai/gpt-6.2-sol-pro",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1050k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/openai/gpt-6.2-sol-pro', '[{"text":"OpenAI: GPT-6.2 Sol Pro on OpenRouter","url":"https://openrouter.ai/openai/gpt-6.2-sol-pro"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nova 2.0 Pro Preview', 'Amazon', 'Model', 'Research', 'Proprietary', 2026, '256k Context · Proprietary Model', 'Frontier Research model by Amazon benchmarked on Artificial Analysis and a verified 256k Context window.', 'Proprietary frontier neural architecture developed by Amazon, featuring native 256k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/nova-2-0-pro-preview', 'Context Window: 256k Context, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/nova-2-0-pro-preview', '[{"text":"Nova 2.0 Pro Preview on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/nova-2-0-pro-preview"},{"text":"Nova 2.0 Pro Preview Inference Providers","url":"https://artificialanalysis.ai/models/nova-2-0-pro-preview/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen4-max-reasoning-250x', 'AJ-Gonzalez', 'Dataset', 'NLP', 'OTHER', 2026, 'n<1K', 'Qwen4 Max Reasoning Traces — 250x 	 250 prompts from the MiMo-2.6-Pro 250x prompt set, answered by qwen/qwen4-max (OpenRouter, canonical qwen/qwen4-max-20261115) on 202 (19 likes, 192 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("AJ-Gonzalez/qwen4-max-reasoning-250x")', 'Trending Score: 17, Likes: 19, Downloads: 192', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/AJ-Gonzalez/qwen4-max-reasoning-250x', '[{"text":"AJ-Gonzalez/qwen4-max-reasoning-250x on Hugging Face Datasets","url":"https://huggingface.co/datasets/AJ-Gonzalez/qwen4-max-reasoning-250x"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('P-Image-OSS', 'PrunaAI', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by PrunaAI. Trending with 185 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/PrunaAI/P-Image-OSS', 'Trending Score: 54, Community Likes: 185', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/PrunaAI/P-Image-OSS', '[{"text":"PrunaAI/P-Image-OSS on Hugging Face Spaces","url":"https://huggingface.co/spaces/PrunaAI/P-Image-OSS"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('voice-isolator', 'inworld', 'Model', 'Audio', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Audio open-weights model by inworld, trending with over 187 community likes and 0 downloads on Hugging Face.', 'inworld audio to audio architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("inworld/voice-isolator", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("inworld/voice-isolator")', 'Trending Score: 171, Likes: 187, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/inworld/voice-isolator', '[{"text":"inworld/voice-isolator on Hugging Face","url":"https://huggingface.co/inworld/voice-isolator"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenAI: GPT-6.2 Astra (batch)', 'openai', 'Model', 'NLP', 'Proprietary', 2026, '1050k Context · Available via API', 'GPT-6.2 Astra is the flagship model in the GPT-6.2 series from OpenAI, built for the hardest projects. It is suited for real-world engineering, professional work and scientific res', 'Modern foundation model hosted on OpenRouter with native 1050k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "openai/gpt-6.2-astra:batch",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1050k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/openai/gpt-6.2-astra:batch', '[{"text":"OpenAI: GPT-6.2 Astra (batch) on OpenRouter","url":"https://openrouter.ai/openai/gpt-6.2-astra:batch"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable 5.2', 'Anthropic', 'Model', 'Research', 'Proprietary', 2026, '1000k Context · Proprietary Model', 'Frontier Research model by Anthropic benchmarked on Artificial Analysis with an Intelligence Index of 56.4083157101519 and a verified 1000k Context window.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/claude-fable-5-2', 'Context Window: 1000k Context, Intelligence Index: 56.4083157101519, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/claude-fable-5-2', '[{"text":"Claude Fable 5.2 on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-fable-5-2"},{"text":"Claude Fable 5.2 Inference Providers","url":"https://artificialanalysis.ai/models/claude-fable-5-2/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('uzbek-language-corpus', 'Digitaluz', 'Dataset', 'NLP', 'ODC-BY', 2026, '1M<n<10M', 'Uzbek Language Corpus 	 	 		 	 	 		Dataset Summary 	 A cleaned Uzbek language corpus for language-model pretraining: 5,638,325 documents, 6,072,581,063 words, in Latin (24 likes, 0 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Digitaluz/uzbek-language-corpus")', 'Trending Score: 21, Likes: 24, Downloads: 0', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Digitaluz/uzbek-language-corpus', '[{"text":"Digitaluz/uzbek-language-corpus on Hugging Face Datasets","url":"https://huggingface.co/datasets/Digitaluz/uzbek-language-corpus"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UGI-Leaderboard', 'DontPlanToEnd', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by DontPlanToEnd. Trending with 2,221 community stars.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/DontPlanToEnd/UGI-Leaderboard', 'Trending Score: 19, Community Likes: 2,221', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/DontPlanToEnd/UGI-Leaderboard', '[{"text":"DontPlanToEnd/UGI-Leaderboard on Hugging Face Spaces","url":"https://huggingface.co/spaces/DontPlanToEnd/UGI-Leaderboard"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FastFrames-L', 'apple', 'Model', 'Video Generation', 'APPLE-AMLR', 2026, 'Open Weights', 'High-performance Video Generation open-weights model by apple, trending with over 228 community likes and 0 downloads on Hugging Face.', 'apple text to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("apple/FastFrames-L", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("apple/FastFrames-L")', 'Trending Score: 210, Likes: 228, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/apple/FastFrames-L', '[{"text":"apple/FastFrames-L on Hugging Face","url":"https://huggingface.co/apple/FastFrames-L"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Google: Gemini 4 Neon (batch)', 'google', 'Model', 'AI Coding', 'Proprietary', 2026, '1049k Context · Available via API', 'Gemini 4 Neon is a fast, mid-priced model in the Gemini 4 family from Google, built for coding and agentic work. It is suited for repository and terminal coding, web...', 'Modern foundation model hosted on OpenRouter with native 1049k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "google/gemini-4-neon:batch",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1049k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/google/gemini-4-neon:batch', '[{"text":"Google: Gemini 4 Neon (batch) on OpenRouter","url":"https://openrouter.ai/google/gemini-4-neon:batch"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Granite 4.2 3B', 'IBM', 'Model', 'Research', 'Open Weights', 2026, '131k Context · Open Model', 'Frontier Research model by IBM benchmarked on Artificial Analysis with an Intelligence Index of 4.72268717901823 and a verified 131k Context window.', 'Open-weights frontier neural architecture developed by IBM, featuring native 131k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/granite-4-2-3b', 'Context Window: 131k Context, Intelligence Index: 4.72268717901823, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/granite-4-2-3b', '[{"text":"Granite 4.2 3B on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/granite-4-2-3b"},{"text":"Granite 4.2 3B Inference Providers","url":"https://artificialanalysis.ai/models/granite-4-2-3b/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ko-MultimodalMind2Web', 'KORMo-VL', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, 'n<1K', '🇰🇷 Ko-MultimodalMind2Web 	 An offline Korean web-agent benchmark, built manually by native Korean annotators. 📋 549 tasks · 🖼️ 12,905 scored steps · 🌐 144 websites (24 likes, 70 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("KORMo-VL/Ko-MultimodalMind2Web")', 'Trending Score: 18, Likes: 24, Downloads: 70', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/KORMo-VL/Ko-MultimodalMind2Web', '[{"text":"KORMo-VL/Ko-MultimodalMind2Web on Hugging Face Datasets","url":"https://huggingface.co/datasets/KORMo-VL/Ko-MultimodalMind2Web"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('pi-H3', 'Lakonik', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by Lakonik. Trending with 33 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Lakonik/pi-H3', 'Trending Score: 20, Community Likes: 33', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Lakonik/pi-H3', '[{"text":"Lakonik/pi-H3 on Hugging Face Spaces","url":"https://huggingface.co/spaces/Lakonik/pi-H3"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hy4-flash', 'tencent', 'Model', 'Multimodal', 'OTHER', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by tencent, trending with over 228 community likes and 159 downloads on Hugging Face.', 'tencent image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("tencent/Hy4-flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("tencent/Hy4-flash")', 'Trending Score: 207, Likes: 228, Downloads: 159', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/tencent/Hy4-flash', '[{"text":"tencent/Hy4-flash on Hugging Face","url":"https://huggingface.co/tencent/Hy4-flash"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Google: Gemini 4 Neon', 'google', 'Model', 'AI Coding', 'Proprietary', 2026, '1049k Context · Available via API', 'Gemini 4 Neon is a fast, mid-priced model in the Gemini 4 family from Google, built for coding and agentic work. It is suited for repository and terminal coding, web...', 'Modern foundation model hosted on OpenRouter with native 1049k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "google/gemini-4-neon",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1049k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/google/gemini-4-neon', '[{"text":"Google: Gemini 4 Neon on OpenRouter","url":"https://openrouter.ai/google/gemini-4-neon"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 4 Neon', 'Google', 'Model', 'Research', 'Proprietary', 2026, '1000k Context · Proprietary Model', 'Frontier Research model by Google benchmarked on Artificial Analysis with an Intelligence Index of 44.0831506204565 and a verified 1000k Context window.', 'Proprietary frontier neural architecture developed by Google, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/gemini-4-neon', 'Context Window: 1000k Context, Intelligence Index: 44.0831506204565, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/gemini-4-neon', '[{"text":"Gemini 4 Neon on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gemini-4-neon"},{"text":"Gemini 4 Neon Inference Providers","url":"https://artificialanalysis.ai/models/gemini-4-neon/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ko-Screenspot', 'KORMo-VL', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, 'n<1K', '🇰🇷 Ko-Screenspot 	 A Korean GUI grounding benchmark, built manually by native Korean annotators. 📋 3,319 samples · 🌐 142 websites · ✍️ ~480 annotator-hours · 🎯 GUI (21 likes, 67 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("KORMo-VL/Ko-Screenspot")', 'Trending Score: 19, Likes: 21, Downloads: 67', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/KORMo-VL/Ko-Screenspot', '[{"text":"KORMo-VL/Ko-Screenspot on Hugging Face Datasets","url":"https://huggingface.co/datasets/KORMo-VL/Ko-Screenspot"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('slack-moji', 'cfahlgren1', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by cfahlgren1. Trending with 44 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/cfahlgren1/slack-moji', 'Trending Score: 44, Community Likes: 44', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/cfahlgren1/slack-moji', '[{"text":"cfahlgren1/slack-moji on Hugging Face Spaces","url":"https://huggingface.co/spaces/cfahlgren1/slack-moji"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Maxwell-V1-Flash', 'maxwell-model', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by maxwell-model, trending with over 215 community likes and 1,052 downloads on Hugging Face.', 'maxwell-model text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("maxwell-model/Maxwell-V1-Flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("maxwell-model/Maxwell-V1-Flash")', 'Trending Score: 173, Likes: 215, Downloads: 1,052', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/maxwell-model/Maxwell-V1-Flash', '[{"text":"maxwell-model/Maxwell-V1-Flash on Hugging Face","url":"https://huggingface.co/maxwell-model/Maxwell-V1-Flash"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenAI: GPT-6.2 Astra', 'openai', 'Model', 'NLP', 'Proprietary', 2026, '1050k Context · Available via API', 'GPT-6.2 Astra is the flagship model in the GPT-6.2 series from OpenAI, built for the hardest projects. It is suited for real-world engineering, professional work and scientific res', 'Modern foundation model hosted on OpenRouter with native 1050k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "openai/gpt-6.2-astra",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1050k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/openai/gpt-6.2-astra', '[{"text":"OpenAI: GPT-6.2 Astra on OpenRouter","url":"https://openrouter.ai/openai/gpt-6.2-astra"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3 Omni 30B A3B Instruct', 'Alibaba', 'Model', 'Multimodal', 'Open Weights', 2026, '66k Context · Open Model', 'Frontier Multimodal model by Alibaba benchmarked on Artificial Analysis and a verified 66k Context window.', 'Open-weights frontier neural architecture developed by Alibaba, featuring native 66k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-omni-30b-a3b-instruct', 'Context Window: 66k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/qwen3-omni-30b-a3b-instruct', '[{"text":"Qwen3 Omni 30B A3B Instruct on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/qwen3-omni-30b-a3b-instruct"},{"text":"Qwen3 Omni 30B A3B Instruct Inference Providers","url":"https://artificialanalysis.ai/models/qwen3-omni-30b-a3b-instruct/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ParseBench-2', 'llamaindex', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '1K<n<10K', 'ParseBench-2 	 Quick links: [🌐 Website] [📜 Paper] [💻 Code] [📦 ParseBench-1] ParseBench-2 is a document parsing benchmark that combines broad coverage of real-world (20 likes, 30,698 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("llamaindex/ParseBench-2")', 'Trending Score: 18, Likes: 20, Downloads: 30,698', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/llamaindex/ParseBench-2', '[{"text":"llamaindex/ParseBench-2 on Hugging Face Datasets","url":"https://huggingface.co/datasets/llamaindex/ParseBench-2"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('tessera-pixel-studio', 'thejagstudio', 'Platform', 'Image Generation', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by thejagstudio. Trending with 28 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/thejagstudio/tessera-pixel-studio', 'Trending Score: 22, Community Likes: 28', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/thejagstudio/tessera-pixel-studio', '[{"text":"thejagstudio/tessera-pixel-studio on Hugging Face Spaces","url":"https://huggingface.co/spaces/thejagstudio/tessera-pixel-studio"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-27B-pi-adapted', 'harness-hub', 'Model', 'NLP', 'APACHE-2.0', 2026, '27B params', 'High-performance NLP open-weights model by harness-hub, trending with over 179 community likes and 0 downloads on Hugging Face.', 'harness-hub transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("harness-hub/Qwen3.8-27B-pi-adapted", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("harness-hub/Qwen3.8-27B-pi-adapted")', 'Trending Score: 178, Likes: 179, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/harness-hub/Qwen3.8-27B-pi-adapted', '[{"text":"harness-hub/Qwen3.8-27B-pi-adapted on Hugging Face","url":"https://huggingface.co/harness-hub/Qwen3.8-27B-pi-adapted"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenAI: GPT-6.2 Astra Pro (batch)', 'openai', 'Model', 'NLP', 'Proprietary', 2026, '1050k Context · Available via API', 'GPT-6.2 Astra Pro is the same underlying model as [GPT-6.2 Astra](https://openrouter.ai/openai/gpt-6.2-astra), served with `reasoning.mode` set to `pro` for higher-quality response', 'Modern foundation model hosted on OpenRouter with native 1050k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "openai/gpt-6.2-astra-pro:batch",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1050k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/openai/gpt-6.2-astra-pro:batch', '[{"text":"OpenAI: GPT-6.2 Astra Pro (batch) on OpenRouter","url":"https://openrouter.ai/openai/gpt-6.2-astra-pro:batch"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5 2B', 'Alibaba', 'Model', 'NLP', 'Open Weights', 2026, '262k Context · Open Model', 'Frontier NLP model by Alibaba benchmarked on Artificial Analysis and a verified 262k Context window.', 'Open-weights frontier neural architecture developed by Alibaba, featuring native 262k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-5-2b', 'Context Window: 262k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/qwen3-5-2b', '[{"text":"Qwen3.5 2B on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/qwen3-5-2b"},{"text":"Qwen3.5 2B Inference Providers","url":"https://artificialanalysis.ai/models/qwen3-5-2b/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ko-Online-Mind2Web', 'KORMo-VL', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, 'n<1K', '🇰🇷 Ko-Online-Mind2Web 	 A live Korean web-agent benchmark, built manually by native Korean annotators. 📋 312 tasks · 🌐 104 websites · ✍️ ~480 annotator-hours · 🔴 L (19 likes, 23 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("KORMo-VL/Ko-Online-Mind2Web")', 'Trending Score: 18, Likes: 19, Downloads: 23', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/KORMo-VL/Ko-Online-Mind2Web', '[{"text":"KORMo-VL/Ko-Online-Mind2Web on Hugging Face Datasets","url":"https://huggingface.co/datasets/KORMo-VL/Ko-Online-Mind2Web"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PyBot', 'HuggingFaceSwarms', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by HuggingFaceSwarms. Trending with 23 community stars.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/HuggingFaceSwarms/PyBot', 'Trending Score: 23, Community Likes: 23', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/HuggingFaceSwarms/PyBot', '[{"text":"HuggingFaceSwarms/PyBot on Hugging Face Spaces","url":"https://huggingface.co/spaces/HuggingFaceSwarms/PyBot"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SenseNova-Loop-9B', 'sensenova', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '9B params', 'High-performance Multimodal open-weights model by sensenova, trending with over 175 community likes and 0 downloads on Hugging Face.', 'sensenova image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("sensenova/SenseNova-Loop-9B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("sensenova/SenseNova-Loop-9B")', 'Trending Score: 172, Likes: 175, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/sensenova/SenseNova-Loop-9B', '[{"text":"sensenova/SenseNova-Loop-9B on Hugging Face","url":"https://huggingface.co/sensenova/SenseNova-Loop-9B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenAI: GPT-6.2 Astra Pro', 'openai', 'Model', 'NLP', 'Proprietary', 2026, '1050k Context · Available via API', 'GPT-6.2 Astra Pro is the same underlying model as [GPT-6.2 Astra](https://openrouter.ai/openai/gpt-6.2-astra), served with `reasoning.mode` set to `pro` for higher-quality response', 'Modern foundation model hosted on OpenRouter with native 1050k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "openai/gpt-6.2-astra-pro",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1050k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/openai/gpt-6.2-astra-pro', '[{"text":"OpenAI: GPT-6.2 Astra Pro on OpenRouter","url":"https://openrouter.ai/openai/gpt-6.2-astra-pro"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Apodex 1.1', 'Apodex', 'Model', 'Research', 'Proprietary', 2026, '256k Context · Proprietary Model', 'Frontier Research model by Apodex benchmarked on Artificial Analysis with an Intelligence Index of 13.6712884627289 and a verified 256k Context window.', 'Proprietary frontier neural architecture developed by Apodex, featuring native 256k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/apodex-1-1', 'Context Window: 256k Context, Intelligence Index: 13.6712884627289, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/apodex-1-1', '[{"text":"Apodex 1.1 on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/apodex-1-1"},{"text":"Apodex 1.1 Inference Providers","url":"https://artificialanalysis.ai/models/apodex-1-1/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('EVIDENT', 'KORMo-VL', 'Dataset', 'NLP', 'Open Data', 2026, 'n<1K', 'EVIDENT: Task Metadata for Evidence-Grounded GUI Evaluation 	 This release contains 220 GUI/web agent task records for evidence-grounded trajectory evaluation: 150 Kore (23 likes, 110 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("KORMo-VL/EVIDENT")', 'Trending Score: 22, Likes: 23, Downloads: 110', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/KORMo-VL/EVIDENT', '[{"text":"KORMo-VL/EVIDENT on Hugging Face Datasets","url":"https://huggingface.co/datasets/KORMo-VL/EVIDENT"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LongCat-Video-Avatar-1.6', 'meituan-longcat', 'Model', 'NLP', 'MIT', 2026, 'Open Weights', 'High-performance NLP open-weights model by meituan-longcat, trending with over 169 community likes and 489 downloads on Hugging Face.', 'meituan-longcat transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meituan-longcat/LongCat-Video-Avatar-1.6", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("meituan-longcat/LongCat-Video-Avatar-1.6")', 'Trending Score: 125, Likes: 169, Downloads: 489', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6', '[{"text":"meituan-longcat/LongCat-Video-Avatar-1.6 on Hugging Face","url":"https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Baidu: ERNIE-5.5-Flash-Preview (free)', 'baidu', 'Model', 'AI Coding', 'Proprietary', 2026, '1024k Context · Available via API', 'ERNIE 5.5 Flash Preview is the latest foundation model in the ERNIE family, with comprehensive improvements in coding, agentic capabilities, knowledge work, and deep research. It h', 'Modern foundation model hosted on OpenRouter with native 1024k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "baidu/ernie-5.5-flash-preview:free",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1024k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/baidu/ernie-5.5-flash-preview:free', '[{"text":"Baidu: ERNIE-5.5-Flash-Preview (free) on OpenRouter","url":"https://openrouter.ai/baidu/ernie-5.5-flash-preview:free"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemma 3 270M', 'Google', 'Model', 'NLP', 'Open Weights', 2026, '32k Context · Open Model', 'Frontier NLP model by Google benchmarked on Artificial Analysis and a verified 32k Context window.', 'Open-weights frontier neural architecture developed by Google, featuring native 32k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/gemma-3-270m', 'Context Window: 32k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/gemma-3-270m', '[{"text":"Gemma 3 270M on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gemma-3-270m"},{"text":"Gemma 3 270M Inference Providers","url":"https://artificialanalysis.ai/models/gemma-3-270m/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HubEgo-100K', 'HubLabs', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '10K<n<100K', 'HubEgo-100K 	 A 100,000-hour dataset of first-person video of skilled manual work, recorded by Hub contributors: building sites, workshops, salons, kitchens, shops, war (21 likes, 335 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("HubLabs/HubEgo-100K")', 'Trending Score: 18, Likes: 21, Downloads: 335', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/HubLabs/HubEgo-100K', '[{"text":"HubLabs/HubEgo-100K on Hugging Face Datasets","url":"https://huggingface.co/datasets/HubLabs/HubEgo-100K"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('tiny-voca', 'n4ze3m', 'Model', 'Audio', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Audio open-weights model by n4ze3m, trending with over 193 community likes and 860 downloads on Hugging Face.', 'n4ze3m text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("n4ze3m/tiny-voca", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("n4ze3m/tiny-voca")', 'Trending Score: 158, Likes: 193, Downloads: 860', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/n4ze3m/tiny-voca', '[{"text":"n4ze3m/tiny-voca on Hugging Face","url":"https://huggingface.co/n4ze3m/tiny-voca"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Google: Gemini 4 Hydrogen (batch)', 'google', 'Model', 'AI Coding', 'Proprietary', 2026, '1049k Context · Available via API', 'Gemini 4 Hydrogen is the high-efficiency workhorse model of the Gemini 4 family from Google, built for high-throughput agentic workflows, coding and multi-model routing at lower co', 'Modern foundation model hosted on OpenRouter with native 1049k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "google/gemini-4-hydrogen:batch",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1049k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/google/gemini-4-hydrogen:batch', '[{"text":"Google: Gemini 4 Hydrogen (batch) on OpenRouter","url":"https://openrouter.ai/google/gemini-4-hydrogen:batch"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemma 4 12B', 'Google', 'Model', 'NLP', 'Open Weights', 2026, '262k Context · Open Model', 'Frontier NLP model by Google benchmarked on Artificial Analysis and a verified 262k Context window.', 'Open-weights frontier neural architecture developed by Google, featuring native 262k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/gemma-4-12b', 'Context Window: 262k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/gemma-4-12b', '[{"text":"Gemma 4 12B on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gemma-4-12b"},{"text":"Gemma 4 12B Inference Providers","url":"https://artificialanalysis.ai/models/gemma-4-12b/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ropedia-Xperience-2', 'ropedia-ai', 'Dataset', 'Computer Vision', 'CC-BY-NC-4.0', 2026, '10K<n<100K', 'Ropedia Xperience 2 	 A Gold Standard for Scaling Physical AI Environments and Behaviors. 1,500+ scanned scenes and 4,000+ egocentric recordings, registered in one metr (18 likes, 6,562 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("ropedia-ai/Ropedia-Xperience-2")', 'Trending Score: 17, Likes: 18, Downloads: 6,562', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ropedia-ai/Ropedia-Xperience-2', '[{"text":"ropedia-ai/Ropedia-Xperience-2 on Hugging Face Datasets","url":"https://huggingface.co/datasets/ropedia-ai/Ropedia-Xperience-2"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('AI-Image-Upscaler', 'MegaPotatoAI', 'Platform', 'Image Generation', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by MegaPotatoAI. Trending with 31 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/MegaPotatoAI/AI-Image-Upscaler', 'Trending Score: 24, Community Likes: 31', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/MegaPotatoAI/AI-Image-Upscaler', '[{"text":"MegaPotatoAI/AI-Image-Upscaler on Hugging Face Spaces","url":"https://huggingface.co/spaces/MegaPotatoAI/AI-Image-Upscaler"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PAN2', 'IFM', 'Model', 'Multimodal', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by IFM, trending with over 180 community likes and 374 downloads on Hugging Face.', 'IFM image text to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("IFM/PAN2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("IFM/PAN2")', 'Trending Score: 160, Likes: 180, Downloads: 374', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/IFM/PAN2', '[{"text":"IFM/PAN2 on Hugging Face","url":"https://huggingface.co/IFM/PAN2"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Tencent: Hy4 flash', 'tencent', 'Model', 'NLP', 'Proprietary', 2026, '1049k Context · Available via API', 'Hy4 flash is a cost-efficient variant of [Hy4](https://openrouter.ai/tencent/hy4) from Tencent, served with roughly a quarter of the flagship''s parameter count for lower latency an', 'Modern foundation model hosted on OpenRouter with native 1049k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "tencent/hy4-flash",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1049k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/tencent/hy4-flash', '[{"text":"Tencent: Hy4 flash on OpenRouter","url":"https://openrouter.ai/tencent/hy4-flash"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5 122B A10B', 'Alibaba', 'Model', 'NLP', 'Open Weights', 2026, '262k Context · Open Model', 'Frontier NLP model by Alibaba benchmarked on Artificial Analysis and a verified 262k Context window.', 'Open-weights frontier neural architecture developed by Alibaba, featuring native 262k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-5-122b-a10b', 'Context Window: 262k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/qwen3-5-122b-a10b', '[{"text":"Qwen3.5 122B A10B on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/qwen3-5-122b-a10b"},{"text":"Qwen3.5 122B A10B Inference Providers","url":"https://artificialanalysis.ai/models/qwen3-5-122b-a10b/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('USDCraft-10K', 'nvidia', 'Dataset', 'Computer Vision', 'APACHE-2.0', 2026, '10K<n<100K', 'USDCraft-10K: Simulation-Ready Articulated 3D Assets in OpenUSD 	             USDCraft-10K is a dataset of simulation-ready rigid and articulated 3D assets in OpenUSD, (26 likes, 3,674 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/USDCraft-10K")', 'Trending Score: 21, Likes: 26, Downloads: 3,674', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/USDCraft-10K', '[{"text":"nvidia/USDCraft-10K on Hugging Face Datasets","url":"https://huggingface.co/datasets/nvidia/USDCraft-10K"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('speaker-diarization-community-1', 'pyannote', 'Model', 'Audio', 'CC-BY-4.0', 2026, 'Open Weights', 'High-performance Audio open-weights model by pyannote, trending with over 4,449 community likes and 4,871,288 downloads on Hugging Face.', 'pyannote automatic speech recognition architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("pyannote/speaker-diarization-community-1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("pyannote/speaker-diarization-community-1")', 'Trending Score: 194, Likes: 4,449, Downloads: 4,871,288', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/pyannote/speaker-diarization-community-1', '[{"text":"pyannote/speaker-diarization-community-1 on Hugging Face","url":"https://huggingface.co/pyannote/speaker-diarization-community-1"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen: Qwen4 Max', 'qwen', 'Model', 'Multimodal', 'Proprietary', 2026, '1000k Context · Available via API', 'Qwen4 Max is the flagship model in Alibaba''s Qwen4 series. It accepts text, image, and video input and returns text, with a 1M-token context window and reasoning enabled by default', 'Modern foundation model hosted on OpenRouter with native 1000k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "qwen/qwen4-max",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1000k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/qwen/qwen4-max', '[{"text":"Qwen: Qwen4 Max on OpenRouter","url":"https://openrouter.ai/qwen/qwen4-max"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nova 2.0 Omni', 'Amazon', 'Model', 'Multimodal', 'Proprietary', 2026, '1000k Context · Proprietary Model', 'Frontier Multimodal model by Amazon benchmarked on Artificial Analysis and a verified 1000k Context window.', 'Proprietary frontier neural architecture developed by Amazon, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/nova-2-0-omni', 'Context Window: 1000k Context, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/nova-2-0-omni', '[{"text":"Nova 2.0 Omni on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/nova-2-0-omni"},{"text":"Nova 2.0 Omni Inference Providers","url":"https://artificialanalysis.ai/models/nova-2-0-omni/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen-concept-27b', 'ConceptCountry', 'Model', 'NLP', 'APACHE-2.0', 2026, '27B params', 'High-performance NLP open-weights model by ConceptCountry, trending with over 267 community likes and 63,964 downloads on Hugging Face.', 'ConceptCountry transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ConceptCountry/qwen-concept-27b", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ConceptCountry/qwen-concept-27b")', 'Trending Score: 200, Likes: 267, Downloads: 63,964', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ConceptCountry/qwen-concept-27b', '[{"text":"ConceptCountry/qwen-concept-27b on Hugging Face","url":"https://huggingface.co/ConceptCountry/qwen-concept-27b"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniMax-H3-Image-GGUF', 'Abiray', 'Model', 'Image Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Image Generation open-weights model by Abiray, trending with over 231 community likes and 127,803 downloads on Hugging Face.', 'Abiray text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Abiray/MiniMax-H3-Image-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Abiray/MiniMax-H3-Image-GGUF")', 'Trending Score: 203, Likes: 231, Downloads: 127,803', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Abiray/MiniMax-H3-Image-GGUF', '[{"text":"Abiray/MiniMax-H3-Image-GGUF on Hugging Face","url":"https://huggingface.co/Abiray/MiniMax-H3-Image-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LongCat-2.5', 'meituan-longcat', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by meituan-longcat, trending with over 268 community likes and 1,573 downloads on Hugging Face.', 'meituan-longcat image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meituan-longcat/LongCat-2.5", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("meituan-longcat/LongCat-2.5")', 'Trending Score: 203, Likes: 268, Downloads: 1,573', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/meituan-longcat/LongCat-2.5', '[{"text":"meituan-longcat/LongCat-2.5 on Hugging Face","url":"https://huggingface.co/meituan-longcat/LongCat-2.5"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF', 'DavidAU', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '9B params', 'High-performance Multimodal open-weights model by DavidAU, trending with over 1,771 community likes and 2,139,868 downloads on Hugging Face.', 'DavidAU image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF")', 'Trending Score: 203, Likes: 1,771, Downloads: 2,139,868', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF', '[{"text":"DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF on Hugging Face","url":"https://huggingface.co/DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Sophon-Realtime-v1', 'adventists-ai', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by adventists-ai, trending with over 261 community likes and 0 downloads on Hugging Face.', 'adventists-ai any to any architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("adventists-ai/Sophon-Realtime-v1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("adventists-ai/Sophon-Realtime-v1")', 'Trending Score: 203, Likes: 261, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/adventists-ai/Sophon-Realtime-v1', '[{"text":"adventists-ai/Sophon-Realtime-v1 on Hugging Face","url":"https://huggingface.co/adventists-ai/Sophon-Realtime-v1"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Haru-4B', 'higurashi-ai', 'Model', 'Audio', 'APACHE-2.0', 2026, '4B params', 'High-performance Audio open-weights model by higurashi-ai, trending with over 217 community likes and 1,262 downloads on Hugging Face.', 'higurashi-ai audio to audio architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("higurashi-ai/Haru-4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("higurashi-ai/Haru-4B")', 'Trending Score: 203, Likes: 217, Downloads: 1,262', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/higurashi-ai/Haru-4B', '[{"text":"higurashi-ai/Haru-4B on Hugging Face","url":"https://huggingface.co/higurashi-ai/Haru-4B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('mirage-vision', 'hugging-apps', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by hugging-apps. Trending with 32 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/hugging-apps/mirage-vision', 'Trending Score: 26, Community Likes: 32', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/hugging-apps/mirage-vision', '[{"text":"hugging-apps/mirage-vision on Hugging Face Spaces","url":"https://huggingface.co/spaces/hugging-apps/mirage-vision"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-2.1-Uncensored-Omni-Quantized', 'chatrlabs', 'Model', 'Image Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Image Generation open-weights model by chatrlabs, trending with over 242 community likes and 68,096 downloads on Hugging Face.', 'chatrlabs text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("chatrlabs/Qwen-Image-2.1-Uncensored-Omni-Quantized", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("chatrlabs/Qwen-Image-2.1-Uncensored-Omni-Quantized")', 'Trending Score: 179, Likes: 242, Downloads: 68,096', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/chatrlabs/Qwen-Image-2.1-Uncensored-Omni-Quantized', '[{"text":"chatrlabs/Qwen-Image-2.1-Uncensored-Omni-Quantized on Hugging Face","url":"https://huggingface.co/chatrlabs/Qwen-Image-2.1-Uncensored-Omni-Quantized"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PhysicalAI-Autonomous-Vehicles', 'nvidia', 'Dataset', 'NLP', 'OTHER', 2026, 'Curated Dataset', 'PHYSICAL AI AUTONOMOUS VEHICLES 	 The PhysicalAI-Autonomous-Vehicles dataset provides one of the largest, geographically diverse collections of multi-sensor data empowe (1,206 likes, 265,315 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/PhysicalAI-Autonomous-Vehicles")', 'Trending Score: 18, Likes: 1,206, Downloads: 265,315', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/PhysicalAI-Autonomous-Vehicles', '[{"text":"nvidia/PhysicalAI-Autonomous-Vehicles on Hugging Face Datasets","url":"https://huggingface.co/datasets/nvidia/PhysicalAI-Autonomous-Vehicles"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Huihui-Qwen3.8-27B-abliterated-GGUF', 'huihui-ai', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '27B params', 'High-performance Multimodal open-weights model by huihui-ai, trending with over 2,075 community likes and 4,051,917 downloads on Hugging Face.', 'huihui-ai image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF")', 'Trending Score: 166, Likes: 2,075, Downloads: 4,051,917', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF', '[{"text":"huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF on Hugging Face","url":"https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Krea2T-Revamped', 'waitinghere', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by waitinghere. Trending with 30 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/waitinghere/Krea2T-Revamped', 'Trending Score: 27, Community Likes: 30', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/waitinghere/Krea2T-Revamped', '[{"text":"waitinghere/Krea2T-Revamped on Hugging Face Spaces","url":"https://huggingface.co/spaces/waitinghere/Krea2T-Revamped"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen35-3d-coder-studio', 'akhaliq', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by akhaliq. Trending with 38 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/akhaliq/qwen35-3d-coder-studio', 'Trending Score: 28, Community Likes: 38', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/akhaliq/qwen35-3d-coder-studio', '[{"text":"akhaliq/qwen35-3d-coder-studio on Hugging Face Spaces","url":"https://huggingface.co/spaces/akhaliq/qwen35-3d-coder-studio"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Omni-videos-custom', 'CumaSystem', 'Platform', 'Image Generation', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by CumaSystem. Trending with 78 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/CumaSystem/Omni-videos-custom', 'Trending Score: 29, Community Likes: 78', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/CumaSystem/Omni-videos-custom', '[{"text":"CumaSystem/Omni-videos-custom on Hugging Face Spaces","url":"https://huggingface.co/spaces/CumaSystem/Omni-videos-custom"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('sam-3d-body-dinov3', 'facebook', 'Model', 'NLP', 'OTHER', 2026, 'Open Weights', 'High-performance NLP open-weights model by facebook, trending with over 1,077 community likes and 14,473 downloads on Hugging Face.', 'facebook transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("facebook/sam-3d-body-dinov3", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("facebook/sam-3d-body-dinov3")', 'Trending Score: 159, Likes: 1,077, Downloads: 14,473', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/facebook/sam-3d-body-dinov3', '[{"text":"facebook/sam-3d-body-dinov3 on Hugging Face","url":"https://huggingface.co/facebook/sam-3d-body-dinov3"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('physical-engineerings-last-exam', 'google', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, 'n<1K', 'Physical-Engineering’s Last Exam (Dev Set) 	 Physical-Engineering’s Last Exam (PLE) is a benchmark of long-horizon engineering tasks built by licensed practicing engine (33 likes, 41,085 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("google/physical-engineerings-last-exam")', 'Trending Score: 17, Likes: 33, Downloads: 41,085', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/google/physical-engineerings-last-exam', '[{"text":"google/physical-engineerings-last-exam on Hugging Face Datasets","url":"https://huggingface.co/datasets/google/physical-engineerings-last-exam"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('free-youtube-transcript', 'fendouai', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by fendouai. Trending with 104 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/fendouai/free-youtube-transcript', 'Trending Score: 33, Community Likes: 104', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/fendouai/free-youtube-transcript', '[{"text":"fendouai/free-youtube-transcript on Hugging Face Spaces","url":"https://huggingface.co/spaces/fendouai/free-youtube-transcript"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('dinov3-vitl16-pretrain-lvd1689m', 'facebook', 'Model', 'NLP', 'OTHER', 2026, '1689M params', 'High-performance NLP open-weights model by facebook, trending with over 2,145 community likes and 703,532 downloads on Hugging Face.', 'facebook image feature extraction architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("facebook/dinov3-vitl16-pretrain-lvd1689m", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("facebook/dinov3-vitl16-pretrain-lvd1689m")', 'Trending Score: 164, Likes: 2,145, Downloads: 703,532', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/facebook/dinov3-vitl16-pretrain-lvd1689m', '[{"text":"facebook/dinov3-vitl16-pretrain-lvd1689m on Hugging Face","url":"https://huggingface.co/facebook/dinov3-vitl16-pretrain-lvd1689m"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-Personas-Finance-Japan', 'nvidia', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '1M<n<10M', 'Nemotron-Personas-Finance-Japan 	           現実世界の分布に基づいた金融に特化したペルソナ生成のための複合AIアプローチ    	 		 	 	 		データセット概要 (Dataset Overview): 	 Nemotron-Personas-Finance-Japan は、日本における (19 likes, 1,732 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Nemotron-Personas-Finance-Japan")', 'Trending Score: 18, Likes: 19, Downloads: 1,732', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Finance-Japan', '[{"text":"nvidia/Nemotron-Personas-Finance-Japan on Hugging Face Datasets","url":"https://huggingface.co/datasets/nvidia/Nemotron-Personas-Finance-Japan"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RelayVSR', 'Comfy-Org', 'Model', 'Image Generation', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Image Generation open-weights model by Comfy-Org, trending with over 186 community likes and 91,134 downloads on Hugging Face.', 'Comfy-Org unconditional image generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Comfy-Org/RelayVSR", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Comfy-Org/RelayVSR")', 'Trending Score: 168, Likes: 186, Downloads: 91,134', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Comfy-Org/RelayVSR', '[{"text":"Comfy-Org/RelayVSR on Hugging Face","url":"https://huggingface.co/Comfy-Org/RelayVSR"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Open-HumanWAM-50K', 'DAGroup-PKU', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '10M<n<100M', 'Open-HumanWAM 	 An Open Recipe for Scaling Human and Robot Experience for Embodied Foundation Models Report · Code · Project page · Models · HF Paper · Citation Open-Hu (20 likes, 1,015,003 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("DAGroup-PKU/Open-HumanWAM-50K")', 'Trending Score: 18, Likes: 20, Downloads: 1,015,003', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/DAGroup-PKU/Open-HumanWAM-50K', '[{"text":"DAGroup-PKU/Open-HumanWAM-50K on Hugging Face Datasets","url":"https://huggingface.co/datasets/DAGroup-PKU/Open-HumanWAM-50K"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FlowHMR', 'fafsaf1', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by fafsaf1. Trending with 45 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/fafsaf1/FlowHMR', 'Trending Score: 29, Community Likes: 45', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/fafsaf1/FlowHMR', '[{"text":"fafsaf1/FlowHMR on Hugging Face Spaces","url":"https://huggingface.co/spaces/fafsaf1/FlowHMR"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ZONOS3-Mini', 'Zyphra', 'Model', 'Audio', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Audio open-weights model by Zyphra, trending with over 174 community likes and 4,170 downloads on Hugging Face.', 'Zyphra text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Zyphra/ZONOS3-Mini", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Zyphra/ZONOS3-Mini")', 'Trending Score: 155, Likes: 174, Downloads: 4,170', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Zyphra/ZONOS3-Mini', '[{"text":"Zyphra/ZONOS3-Mini on Hugging Face","url":"https://huggingface.co/Zyphra/ZONOS3-Mini"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('mirage', 'Cactus-Compute', 'Model', 'Multimodal', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by Cactus-Compute, trending with over 156 community likes and 14,615 downloads on Hugging Face.', 'Cactus-Compute image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Cactus-Compute/mirage", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Cactus-Compute/mirage")', 'Trending Score: 151, Likes: 156, Downloads: 14,615', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Cactus-Compute/mirage', '[{"text":"Cactus-Compute/mirage on Hugging Face","url":"https://huggingface.co/Cactus-Compute/mirage"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('asset-index', 'codepawl', 'Dataset', 'NLP', 'OTHER', 2026, '10K<n<100K', 'Asset Index 	 37,668 3D assets from 6 libraries in one table. An AI agent, a model or an animator can ask for "a wooden crate, 0.5 m, game tier" and get the right file. (21 likes, 454 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("codepawl/asset-index")', 'Trending Score: 20, Likes: 21, Downloads: 454', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/codepawl/asset-index', '[{"text":"codepawl/asset-index on Hugging Face Datasets","url":"https://huggingface.co/datasets/codepawl/asset-index"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Underdog-Woof', 'ConwayResearch', 'Model', 'Audio', 'OTHER', 2026, 'Open Weights', 'High-performance Audio open-weights model by ConwayResearch, trending with over 152 community likes and 10 downloads on Hugging Face.', 'ConwayResearch text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ConwayResearch/Underdog-Woof", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ConwayResearch/Underdog-Woof")', 'Trending Score: 148, Likes: 152, Downloads: 10', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ConwayResearch/Underdog-Woof', '[{"text":"ConwayResearch/Underdog-Woof on Hugging Face","url":"https://huggingface.co/ConwayResearch/Underdog-Woof"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('hyperflow-h3-flash', 'VideoRebirthAI', 'Model', 'Multimodal', 'OTHER', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by VideoRebirthAI, trending with over 175 community likes and 110,752 downloads on Hugging Face.', 'VideoRebirthAI image text to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("VideoRebirthAI/hyperflow-h3-flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("VideoRebirthAI/hyperflow-h3-flash")', 'Trending Score: 167, Likes: 175, Downloads: 110,752', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/VideoRebirthAI/hyperflow-h3-flash', '[{"text":"VideoRebirthAI/hyperflow-h3-flash on Hugging Face","url":"https://huggingface.co/VideoRebirthAI/hyperflow-h3-flash"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('arc-art', 'arc4g', 'Dataset', 'Computer Vision', 'CC-BY-NC-4.0', 2026, 'n<1K', 'ARC art 	 Blender projects and artwork videos by ARC (Abdullah Rashed AlSahli), made 2019-2024. The Blender files and videos behind 154 of my artworks. Use them for any (28 likes, 733 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("arc4g/arc-art")', 'Trending Score: 24, Likes: 28, Downloads: 733', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/arc4g/arc-art', '[{"text":"arc4g/arc-art on Hugging Face Datasets","url":"https://huggingface.co/datasets/arc4g/arc-art"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('pixel-search', 'cfahlgren1', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by cfahlgren1. Trending with 33 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/cfahlgren1/pixel-search', 'Trending Score: 29, Community Likes: 33', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/cfahlgren1/pixel-search', '[{"text":"cfahlgren1/pixel-search on Hugging Face Spaces","url":"https://huggingface.co/spaces/cfahlgren1/pixel-search"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniMax-H3-Image', 'MiniMaxAI', 'Model', 'Image Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Image Generation open-weights model by MiniMaxAI, trending with over 308 community likes and 667 downloads on Hugging Face.', 'MiniMaxAI text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("MiniMaxAI/MiniMax-H3-Image", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("MiniMaxAI/MiniMax-H3-Image")', 'Trending Score: 307, Likes: 308, Downloads: 667', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/MiniMaxAI/MiniMax-H3-Image', '[{"text":"MiniMaxAI/MiniMax-H3-Image on Hugging Face","url":"https://huggingface.co/MiniMaxAI/MiniMax-H3-Image"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('pixel-atlas-glb', 'codepawl', 'Dataset', 'Computer Vision', 'CC0-1.0', 2026, '1K<n<10K', 'Pixel Art Atlas 3D GLB 	 6,194 Low-Poly 3D Pixel game objects built from the 6,194 subjects of Pixel Art Atlas (1.4M 16x16 sprites by Angais, CC0). Each subject is buil (22 likes, 1,403 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("codepawl/pixel-atlas-glb")', 'Trending Score: 22, Likes: 22, Downloads: 1,403', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/codepawl/pixel-atlas-glb', '[{"text":"codepawl/pixel-atlas-glb on Hugging Face Datasets","url":"https://huggingface.co/datasets/codepawl/pixel-atlas-glb"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('smol-training-playbook', 'HuggingFaceTB', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by HuggingFaceTB. Trending with 3,372 community stars.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook', 'Trending Score: 26, Community Likes: 3,372', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook', '[{"text":"HuggingFaceTB/smol-training-playbook on Hugging Face Spaces","url":"https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('gemma-4-31B-it-ARA-heretic-GGUF', 'mradermacher', 'Model', 'NLP', 'APACHE-2.0', 2026, '31B params', 'High-performance NLP open-weights model by mradermacher, trending with over 160 community likes and 42,215 downloads on Hugging Face.', 'mradermacher transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("mradermacher/gemma-4-31B-it-ARA-heretic-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("mradermacher/gemma-4-31B-it-ARA-heretic-GGUF")', 'Trending Score: 148, Likes: 160, Downloads: 42,215', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/mradermacher/gemma-4-31B-it-ARA-heretic-GGUF', '[{"text":"mradermacher/gemma-4-31B-it-ARA-heretic-GGUF on Hugging Face","url":"https://huggingface.co/mradermacher/gemma-4-31B-it-ARA-heretic-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PhysicalAI-Human-1M-100K', 'nvidia', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, 'n<1K', 'Across AI, a common route to scale is distilling human experience into models: what people write, see, and create. The physical AI analogue is sensorized human data—egocentric vid (18 likes, 162 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/PhysicalAI-Human-1M-100K")', 'Trending Score: 18, Likes: 18, Downloads: 162', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/PhysicalAI-Human-1M-100K', '[{"text":"nvidia/PhysicalAI-Human-1M-100K on Hugging Face Datasets","url":"https://huggingface.co/datasets/nvidia/PhysicalAI-Human-1M-100K"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-27B-DSpine-b16', 'tencent', 'Model', 'NLP', 'APACHE-2.0', 2026, '27B params', 'High-performance NLP open-weights model by tencent, trending with over 150 community likes and 1,464 downloads on Hugging Face.', 'tencent text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("tencent/Qwen3.8-27B-DSpine-b16", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("tencent/Qwen3.8-27B-DSpine-b16")', 'Trending Score: 146, Likes: 150, Downloads: 1,464', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/tencent/Qwen3.8-27B-DSpine-b16', '[{"text":"tencent/Qwen3.8-27B-DSpine-b16 on Hugging Face","url":"https://huggingface.co/tencent/Qwen3.8-27B-DSpine-b16"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('image-to-video', 'thea2026', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by thea2026. Trending with 55 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/thea2026/image-to-video', 'Trending Score: 38, Community Likes: 55', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/thea2026/image-to-video', '[{"text":"thea2026/image-to-video on Hugging Face Spaces","url":"https://huggingface.co/spaces/thea2026/image-to-video"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-Flash-Next-E384-FP4-V2', 'autotrust', 'Model', 'Multimodal', 'OTHER', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by autotrust, trending with over 2,373 community likes and 46,017 downloads on Hugging Face.', 'autotrust image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("autotrust/Qwen3.8-Flash-Next-E384-FP4-V2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("autotrust/Qwen3.8-Flash-Next-E384-FP4-V2")', 'Trending Score: 148, Likes: 2,373, Downloads: 46,017', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/autotrust/Qwen3.8-Flash-Next-E384-FP4-V2', '[{"text":"autotrust/Qwen3.8-Flash-Next-E384-FP4-V2 on Hugging Face","url":"https://huggingface.co/autotrust/Qwen3.8-Flash-Next-E384-FP4-V2"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('codex-tool-use-trajectories', 'israellaguan', 'Dataset', 'NLP', 'MIT', 2026, '1K<n<10K', 'Codex Tool-Use Trajectories 	 Multi-step tool-use trajectories from a coding agent (OpenAI Codex Desktop) working in a local Windows workspace, cleaned and redacted fro (22 likes, 0 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("israellaguan/codex-tool-use-trajectories")', 'Trending Score: 20, Likes: 22, Downloads: 0', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/israellaguan/codex-tool-use-trajectories', '[{"text":"israellaguan/codex-tool-use-trajectories on Hugging Face Datasets","url":"https://huggingface.co/datasets/israellaguan/codex-tool-use-trajectories"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RFD4-Proteina', 'nvidia', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '10M<n<100M', 'The structures behind biomolecular design.Indexed molecular records, sampling metadata, and traceable source inventories. Project page · Model · Inventory · Training guide (26 likes, 61,125 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/RFD4-Proteina")', 'Trending Score: 19, Likes: 26, Downloads: 61,125', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/RFD4-Proteina', '[{"text":"nvidia/RFD4-Proteina on Hugging Face Datasets","url":"https://huggingface.co/datasets/nvidia/RFD4-Proteina"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GLM-5.3-SLIM-GGUF', 'Scantist', 'Model', 'NLP', 'OTHER', 2026, 'Open Weights', 'High-performance NLP open-weights model by Scantist, trending with over 1,290 community likes and 4,938 downloads on Hugging Face.', 'Scantist text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Scantist/GLM-5.3-SLIM-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Scantist/GLM-5.3-SLIM-GGUF")', 'Trending Score: 182, Likes: 1,290, Downloads: 4,938', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Scantist/GLM-5.3-SLIM-GGUF', '[{"text":"Scantist/GLM-5.3-SLIM-GGUF on Hugging Face","url":"https://huggingface.co/Scantist/GLM-5.3-SLIM-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF', 'SC117', 'Model', 'Multimodal', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by SC117, trending with over 785 community likes and 4,210,046 downloads on Hugging Face.', 'SC117 image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF")', 'Trending Score: 149, Likes: 785, Downloads: 4,210,046', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF', '[{"text":"SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF on Hugging Face","url":"https://huggingface.co/SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ThreeJS-3D-GLB-Assets', 'ccore', 'Dataset', 'Computer Vision', 'MIT', 2026, '10K<n<100K', 'CCORE Three.js 3D GLB Assets 	 3,918 examples across 40 domains, with complete conversations, thinking traces, HTML/JavaScript responses, and a rendered reference for e (18 likes, 1,688 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("ccore/ThreeJS-3D-GLB-Assets")', 'Trending Score: 18, Likes: 18, Downloads: 1,688', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ccore/ThreeJS-3D-GLB-Assets', '[{"text":"ccore/ThreeJS-3D-GLB-Assets on Hugging Face Datasets","url":"https://huggingface.co/datasets/ccore/ThreeJS-3D-GLB-Assets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MatterSeek-Enables.Inverse.Design.of.Novel.Material', 'YuyaoTechnology', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by YuyaoTechnology. Trending with 3,155 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/YuyaoTechnology/MatterSeek-Enables.Inverse.Design.of.Novel.Material', 'Trending Score: 78, Community Likes: 3,155', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/YuyaoTechnology/MatterSeek-Enables.Inverse.Design.of.Novel.Material', '[{"text":"YuyaoTechnology/MatterSeek-Enables.Inverse.Design.of.Novel.Material on Hugging Face Spaces","url":"https://huggingface.co/spaces/YuyaoTechnology/MatterSeek-Enables.Inverse.Design.of.Novel.Material"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic-i1-GGUF', 'mradermacher', 'Model', 'NLP', 'APACHE-2.0', 2026, '9B params', 'High-performance NLP open-weights model by mradermacher, trending with over 176 community likes and 136,706 downloads on Hugging Face.', 'mradermacher transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("mradermacher/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic-i1-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("mradermacher/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic-i1-GGUF")', 'Trending Score: 156, Likes: 176, Downloads: 136,706', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/mradermacher/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic-i1-GGUF', '[{"text":"mradermacher/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic-i1-GGUF on Hugging Face","url":"https://huggingface.co/mradermacher/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic-i1-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('plateau-city-glb', 'codepawl', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, 'n<1K', 'PLATEAU Japan City Tiles as GLB 	 Japan''s government 3D city models (MLIT Project PLATEAU) cut into streamable 1 km tiles: all of Tokyo''s 23 wards plus central Osaka, Y (24 likes, 111 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("codepawl/plateau-city-glb")', 'Trending Score: 22, Likes: 24, Downloads: 111', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/codepawl/plateau-city-glb', '[{"text":"codepawl/plateau-city-glb on Hugging Face Datasets","url":"https://huggingface.co/datasets/codepawl/plateau-city-glb"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('pixel-art-atlas-1.4m', 'Angais', 'Dataset', 'Computer Vision', 'CC0-1.0', 2026, '1M<n<10M', 'Pixel Art Atlas · 1.4M Synthetic Sprites 	 1,409,404 synthetic game sprites with English captions, covering 6,194 training subjects. Each sprite is a native 16×16 image (20 likes, 1,050 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Angais/pixel-art-atlas-1.4m")', 'Trending Score: 19, Likes: 20, Downloads: 1,050', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Angais/pixel-art-atlas-1.4m', '[{"text":"Angais/pixel-art-atlas-1.4m on Hugging Face Datasets","url":"https://huggingface.co/datasets/Angais/pixel-art-atlas-1.4m"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Viggle-Remake', 'Viggle', 'Model', 'Video Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Video Generation open-weights model by Viggle, trending with over 164 community likes and 64,942 downloads on Hugging Face.', 'Viggle video to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Viggle/Viggle-Remake", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Viggle/Viggle-Remake")', 'Trending Score: 160, Likes: 164, Downloads: 64,942', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Viggle/Viggle-Remake', '[{"text":"Viggle/Viggle-Remake on Hugging Face","url":"https://huggingface.co/Viggle/Viggle-Remake"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Propaganda_Eval', 'NousResearch', 'Dataset', 'NLP', 'MIT', 2026, 'n<1K', 'Censorship & Propaganda Eval 	 803 prompts about topics that the People''s Republic of China censors or presents through an official narrative. Each prompt comes with 2– (27 likes, 212 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("NousResearch/Propaganda_Eval")', 'Trending Score: 26, Likes: 27, Downloads: 212', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/NousResearch/Propaganda_Eval', '[{"text":"NousResearch/Propaganda_Eval on Hugging Face Datasets","url":"https://huggingface.co/datasets/NousResearch/Propaganda_Eval"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Arete-27B', 'NousResearch', 'Model', 'NLP', 'APACHE-2.0', 2026, '27B params', 'High-performance NLP open-weights model by NousResearch, trending with over 187 community likes and 989 downloads on Hugging Face.', 'NousResearch text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("NousResearch/Arete-27B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("NousResearch/Arete-27B")', 'Trending Score: 182, Likes: 187, Downloads: 989', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/NousResearch/Arete-27B', '[{"text":"NousResearch/Arete-27B on Hugging Face","url":"https://huggingface.co/NousResearch/Arete-27B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('arete-data-pairs', 'NousResearch', 'Dataset', 'NLP', 'Open Data', 2026, '10K<n<100K', 'Arete data pairs — v1.0.0 	 Prompt–response pairs for seven values topics, each prompt answered by both the Inkling teacher (thinkingmachines/inkling) and the Qwen 3.8- (23 likes, 244 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("NousResearch/arete-data-pairs")', 'Trending Score: 23, Likes: 23, Downloads: 244', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/NousResearch/arete-data-pairs', '[{"text":"NousResearch/arete-data-pairs on Hugging Face Datasets","url":"https://huggingface.co/datasets/NousResearch/arete-data-pairs"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ERNIE-5.5-Flash-Base', 'baidu', 'Model', 'NLP', 'OTHER', 2026, 'Open Weights', 'High-performance NLP open-weights model by baidu, trending with over 217 community likes and 971 downloads on Hugging Face.', 'baidu text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("baidu/ERNIE-5.5-Flash-Base", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("baidu/ERNIE-5.5-Flash-Base")', 'Trending Score: 156, Likes: 217, Downloads: 971', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/baidu/ERNIE-5.5-Flash-Base', '[{"text":"baidu/ERNIE-5.5-Flash-Base on Hugging Face","url":"https://huggingface.co/baidu/ERNIE-5.5-Flash-Base"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('chess-position-evaluations', 'Lichess', 'Dataset', 'NLP', 'CC0-1.0', 2026, '1B<n<10B', 'Dataset Card for the Lichess Evaluations dataset 	 	 		 	 	 		Dataset Description 	 416,442,401 chess positions evaluated with Stockfish at various depths and node coun (55 likes, 5,114 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Lichess/chess-position-evaluations")', 'Trending Score: 16, Likes: 55, Downloads: 5,114', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Lichess/chess-position-evaluations', '[{"text":"Lichess/chess-position-evaluations on Hugging Face Datasets","url":"https://huggingface.co/datasets/Lichess/chess-position-evaluations"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic', 'xtools-at', 'Model', 'NLP', 'APACHE-2.0', 2026, '9B params', 'High-performance NLP open-weights model by xtools-at, trending with over 177 community likes and 772 downloads on Hugging Face.', 'xtools-at text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic")', 'Trending Score: 164, Likes: 177, Downloads: 772', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic', '[{"text":"xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic on Hugging Face","url":"https://huggingface.co/xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('sand3d-objaverse', 'Sandflow', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '10K<n<100K', 'sand3d-objaverse 	 66 887 3D objects written as code. Each object is a short Python program in sand3d, the OpenUSD file that program exports, and a render of it. Everyd (17 likes, 21,981 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Sandflow/sand3d-objaverse")', 'Trending Score: 17, Likes: 17, Downloads: 21,981', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Sandflow/sand3d-objaverse', '[{"text":"Sandflow/sand3d-objaverse on Hugging Face Datasets","url":"https://huggingface.co/datasets/Sandflow/sand3d-objaverse"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-Flash-Next-GGUF', 'unsloth', 'Model', 'Multimodal', 'OTHER', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by unsloth, trending with over 1,465 community likes and 1,309,045 downloads on Hugging Face.', 'unsloth image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("unsloth/Qwen3.8-Flash-Next-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("unsloth/Qwen3.8-Flash-Next-GGUF")', 'Trending Score: 172, Likes: 1,465, Downloads: 1,309,045', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF', '[{"text":"unsloth/Qwen3.8-Flash-Next-GGUF on Hugging Face","url":"https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('llm-course-final-2026', 'bumbuboon', 'Dataset', 'NLP', 'CC-BY-SA-4.0', 2026, 'Curated Dataset', 'LLM course final RAG participant dataset 	 LLM講座の最終コンペで使用する、日本語Wikipediaを用いたRAG（検索拡張生成）用データセットです。約100万件の文章チャンクと検索用インデックスを収録しています。 (19 likes, 4,415 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("bumbuboon/llm-course-final-2026")', 'Trending Score: 18, Likes: 19, Downloads: 4,415', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/bumbuboon/llm-course-final-2026', '[{"text":"bumbuboon/llm-course-final-2026 on Hugging Face Datasets","url":"https://huggingface.co/datasets/bumbuboon/llm-course-final-2026"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TwIL-8B', 'webAI-Official', 'Model', 'NLP', 'OTHER', 2026, '8B params', 'High-performance NLP open-weights model by webAI-Official, trending with over 170 community likes and 8,209 downloads on Hugging Face.', 'webAI-Official text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("webAI-Official/TwIL-8B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("webAI-Official/TwIL-8B")', 'Trending Score: 168, Likes: 170, Downloads: 8,209', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/webAI-Official/TwIL-8B', '[{"text":"webAI-Official/TwIL-8B on Hugging Face","url":"https://huggingface.co/webAI-Official/TwIL-8B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('gigaspeech3', 'speechcolab', 'Dataset', 'Computer Vision', 'OTHER', 2026, '10M<n<100M', 'GigaSpeech 3 	 Scaling Multi-Dialect Arabic Speech Recognition with Weakly Labeled Data GigaSpeech 3 is a large-scale Arabic speech recognition corpus containing approx (19 likes, 7,022 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("speechcolab/gigaspeech3")', 'Trending Score: 19, Likes: 19, Downloads: 7,022', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/speechcolab/gigaspeech3', '[{"text":"speechcolab/gigaspeech3 on Hugging Face Datasets","url":"https://huggingface.co/datasets/speechcolab/gigaspeech3"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('harness-leaderboard', 'joelniklaus', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by joelniklaus. Trending with 39 community stars.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/joelniklaus/harness-leaderboard', 'Trending Score: 35, Community Likes: 39', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/joelniklaus/harness-leaderboard', '[{"text":"joelniklaus/harness-leaderboard on Hugging Face Spaces","url":"https://huggingface.co/spaces/joelniklaus/harness-leaderboard"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF', 'ISTA-DASLab', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by ISTA-DASLab, trending with over 175 community likes and 222,222 downloads on Hugging Face.', 'ISTA-DASLab image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF")', 'Trending Score: 156, Likes: 175, Downloads: 222,222', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF', '[{"text":"ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF on Hugging Face","url":"https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TailorRig', 'tencent', 'Dataset', 'NLP', 'OTHER', 2026, '10K<n<100K', 'TailorRig 	 Human character rigging dataset: 39,073 humanoid meshes with skeletons and skinning weights, stored as .npz files and packed into four source-based subset a (21 likes, 10 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("tencent/TailorRig")', 'Trending Score: 20, Likes: 21, Downloads: 10', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/tencent/TailorRig', '[{"text":"tencent/TailorRig on Hugging Face Datasets","url":"https://huggingface.co/datasets/tencent/TailorRig"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MatterSeek', 'YuyaoTechnology', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by YuyaoTechnology. Trending with 1,675 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/YuyaoTechnology/MatterSeek', 'Trending Score: 45, Community Likes: 1,675', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/YuyaoTechnology/MatterSeek', '[{"text":"YuyaoTechnology/MatterSeek on Hugging Face Spaces","url":"https://huggingface.co/spaces/YuyaoTechnology/MatterSeek"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5-4B-GLB-3D-Coder', 'ccore', 'Model', 'NLP', 'APACHE-2.0', 2026, '4B params', 'High-performance NLP open-weights model by ccore, trending with over 191 community likes and 12,206 downloads on Hugging Face.', 'ccore text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ccore/Qwen3.5-4B-GLB-3D-Coder", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ccore/Qwen3.5-4B-GLB-3D-Coder")', 'Trending Score: 170, Likes: 191, Downloads: 12,206', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ccore/Qwen3.5-4B-GLB-3D-Coder', '[{"text":"ccore/Qwen3.5-4B-GLB-3D-Coder on Hugging Face","url":"https://huggingface.co/ccore/Qwen3.5-4B-GLB-3D-Coder"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TacVerse', 'TacVerse', 'Dataset', 'NLP', 'CC-BY-SA-4.0', 2026, '100M<n<1B', 'Language: English (current) · 中文 	 		 	 	 		TacVerse: A Multi-scene Bimanual Visuo-Tactile Dataset 	 TacVerse is a large-scale bimanual manipulation dataset in which every frame ca (21 likes, 1,637 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("TacVerse/TacVerse")', 'Trending Score: 16, Likes: 21, Downloads: 1,637', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/TacVerse/TacVerse', '[{"text":"TacVerse/TacVerse on Hugging Face Datasets","url":"https://huggingface.co/datasets/TacVerse/TacVerse"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('moe-blogpost', 'huggingface', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by huggingface. Trending with 55 community stars.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/huggingface/moe-blogpost', 'Trending Score: 55, Community Likes: 55', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/huggingface/moe-blogpost', '[{"text":"huggingface/moe-blogpost on Hugging Face Spaces","url":"https://huggingface.co/spaces/huggingface/moe-blogpost"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('P-H3-Image-Comfy', 'PrunaAI', 'Model', 'Image Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Image Generation open-weights model by PrunaAI, trending with over 198 community likes and 218,534 downloads on Hugging Face.', 'PrunaAI text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("PrunaAI/P-H3-Image-Comfy", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("PrunaAI/P-H3-Image-Comfy")', 'Trending Score: 171, Likes: 198, Downloads: 218,534', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/PrunaAI/P-H3-Image-Comfy', '[{"text":"PrunaAI/P-H3-Image-Comfy on Hugging Face","url":"https://huggingface.co/PrunaAI/P-H3-Image-Comfy"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('axion-training-data', 'Axion1-0', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '10K<n<100K', 'Axion 1.0 Training Data   Scientific reasoning and tool use for open agent foundation models.   Project Page ·   Paper (Hugging Face) ·   Paper (PDF) ·   Code          Axion 1. (18 likes, 1,061 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Axion1-0/axion-training-data")', 'Trending Score: 18, Likes: 18, Downloads: 1,061', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Axion1-0/axion-training-data', '[{"text":"Axion1-0/axion-training-data on Hugging Face Datasets","url":"https://huggingface.co/datasets/Axion1-0/axion-training-data"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ripple-65B-Preview', 'ricursiveAI', 'Model', 'NLP', 'APACHE-2.0', 2026, '65B params', 'High-performance NLP open-weights model by ricursiveAI, trending with over 222 community likes and 939 downloads on Hugging Face.', 'ricursiveAI transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ricursiveAI/Ripple-65B-Preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ricursiveAI/Ripple-65B-Preview")', 'Trending Score: 216, Likes: 222, Downloads: 939', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ricursiveAI/Ripple-65B-Preview', '[{"text":"ricursiveAI/Ripple-65B-Preview on Hugging Face","url":"https://huggingface.co/ricursiveAI/Ripple-65B-Preview"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('abo-glb', 'codepawl', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '1K<n<10K', 'Amazon Berkeley Objects GLB 	 The 7,953 3D models of Amazon Berkeley Objects (ABO), made small enough to load in a browser. Each product is one .glb with its full PBR m (22 likes, 0 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("codepawl/abo-glb")', 'Trending Score: 21, Likes: 22, Downloads: 0', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/codepawl/abo-glb', '[{"text":"codepawl/abo-glb on Hugging Face Datasets","url":"https://huggingface.co/datasets/codepawl/abo-glb"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mage-VL-Cowork', 'Microsoft', 'Model', 'Multimodal', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by Microsoft, trending with over 183 community likes and 1,973 downloads on Hugging Face.', 'Microsoft image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("microsoft/Mage-VL-Cowork", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("microsoft/Mage-VL-Cowork")', 'Trending Score: 166, Likes: 183, Downloads: 1,973', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/microsoft/Mage-VL-Cowork', '[{"text":"microsoft/Mage-VL-Cowork on Hugging Face","url":"https://huggingface.co/microsoft/Mage-VL-Cowork"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GAIA', 'gaia-benchmark', 'Dataset', 'Computer Vision', 'Open Data', 2026, 'n<1K', 'GAIA dataset 	 GAIA is a benchmark which aims at evaluating next-generation LLMs (LLMs with augmented capabilities due to added tooling, efficient prompting, access to (936 likes, 10,974 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("gaia-benchmark/GAIA")', 'Trending Score: 15, Likes: 936, Downloads: 10,974', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/gaia-benchmark/GAIA', '[{"text":"gaia-benchmark/GAIA on Hugging Face Datasets","url":"https://huggingface.co/datasets/gaia-benchmark/GAIA"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash-1017-GGUF', 'unsloth', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by unsloth, trending with over 344 community likes and 690,137 downloads on Hugging Face.', 'unsloth image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("unsloth/DeepSeek-V4.1-Flash-1017-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("unsloth/DeepSeek-V4.1-Flash-1017-GGUF")', 'Trending Score: 164, Likes: 344, Downloads: 690,137', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/unsloth/DeepSeek-V4.1-Flash-1017-GGUF', '[{"text":"unsloth/DeepSeek-V4.1-Flash-1017-GGUF on Hugging Face","url":"https://huggingface.co/unsloth/DeepSeek-V4.1-Flash-1017-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('scanned-objects-glb', 'codepawl', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '1K<n<10K', 'Scanned Objects GLB 	 Web-ready glTF binary (.glb) copies of the 1,033 household products in Google Scanned Objects, taken from the official copies on Gazebo Fuel. Each (20 likes, 60 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("codepawl/scanned-objects-glb")', 'Trending Score: 20, Likes: 20, Downloads: 60', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/codepawl/scanned-objects-glb', '[{"text":"codepawl/scanned-objects-glb on Hugging Face Datasets","url":"https://huggingface.co/datasets/codepawl/scanned-objects-glb"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('P-H3-Image', 'PrunaAI', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by PrunaAI. Trending with 26 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/PrunaAI/P-H3-Image', 'Trending Score: 25, Community Likes: 26', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/PrunaAI/P-H3-Image', '[{"text":"PrunaAI/P-H3-Image on Hugging Face Spaces","url":"https://huggingface.co/spaces/PrunaAI/P-H3-Image"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kimi-K3.1-Pro', 'moonshotai', 'Model', 'Multimodal', 'OTHER', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by moonshotai, trending with over 287 community likes and 797 downloads on Hugging Face.', 'moonshotai image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("moonshotai/Kimi-K3.1-Pro", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("moonshotai/Kimi-K3.1-Pro")', 'Trending Score: 284, Likes: 287, Downloads: 797', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/moonshotai/Kimi-K3.1-Pro', '[{"text":"moonshotai/Kimi-K3.1-Pro on Hugging Face","url":"https://huggingface.co/moonshotai/Kimi-K3.1-Pro"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ChartNet', 'ibm-granite', 'Dataset', 'Computer Vision', 'CDLA-PERMISSIVE-2.0', 2026, '10M<n<100M', 'ChartNet: A Million-Scale Multimodal Dataset for Chart Understanding 	 🌐 Homepage | 📖 arXiv 	 		 	 	 		📰 Latest Update — October 2026 	 	 		 	 	 		ChartNet introduce (68 likes, 18,197 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("ibm-granite/ChartNet")', 'Trending Score: 17, Likes: 68, Downloads: 18,197', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ibm-granite/ChartNet', '[{"text":"ibm-granite/ChartNet on Hugging Face Datasets","url":"https://huggingface.co/datasets/ibm-granite/ChartNet"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('motionbricks-playground', 'townbox', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by townbox. Trending with 25 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/townbox/motionbricks-playground', 'Trending Score: 23, Community Likes: 25', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/townbox/motionbricks-playground', '[{"text":"townbox/motionbricks-playground on Hugging Face Spaces","url":"https://huggingface.co/spaces/townbox/motionbricks-playground"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Xiaomi-OCR-0', 'xiaomi-research', 'Model', 'Multimodal', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by xiaomi-research, trending with over 264 community likes and 20,802 downloads on Hugging Face.', 'xiaomi-research image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("xiaomi-research/Xiaomi-OCR-0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("xiaomi-research/Xiaomi-OCR-0")', 'Trending Score: 193, Likes: 264, Downloads: 20,802', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/xiaomi-research/Xiaomi-OCR-0', '[{"text":"xiaomi-research/Xiaomi-OCR-0 on Hugging Face","url":"https://huggingface.co/xiaomi-research/Xiaomi-OCR-0"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-2.1-Turbo-Quantized', 'abenzerps', 'Model', 'Image Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Image Generation open-weights model by abenzerps, trending with over 5,623 community likes and 2,508,590 downloads on Hugging Face.', 'abenzerps text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("abenzerps/Qwen-Image-2.1-Turbo-Quantized", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("abenzerps/Qwen-Image-2.1-Turbo-Quantized")', 'Trending Score: 286, Likes: 5,623, Downloads: 2,508,590', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/abenzerps/Qwen-Image-2.1-Turbo-Quantized', '[{"text":"abenzerps/Qwen-Image-2.1-Turbo-Quantized on Hugging Face","url":"https://huggingface.co/abenzerps/Qwen-Image-2.1-Turbo-Quantized"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OffsecCyber', 'PentesterFlow', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '10K<n<100K', 'Security Vulnerability Instruction Dataset 	 An English-language dataset of security-focused assistant conversations about software vulnerabilities. Examples cover vuln (35 likes, 0 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("PentesterFlow/OffsecCyber")', 'Trending Score: 34, Likes: 35, Downloads: 0', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/PentesterFlow/OffsecCyber', '[{"text":"PentesterFlow/OffsecCyber on Hugging Face Datasets","url":"https://huggingface.co/datasets/PentesterFlow/OffsecCyber"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SenseNova-Loop-9B-Preview', 'sensenova', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '9B params', 'High-performance Multimodal open-weights model by sensenova, trending with over 205 community likes and 2,221 downloads on Hugging Face.', 'sensenova image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("sensenova/SenseNova-Loop-9B-Preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("sensenova/SenseNova-Loop-9B-Preview")', 'Trending Score: 202, Likes: 205, Downloads: 2,221', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/sensenova/SenseNova-Loop-9B-Preview', '[{"text":"sensenova/SenseNova-Loop-9B-Preview on Hugging Face","url":"https://huggingface.co/sensenova/SenseNova-Loop-9B-Preview"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MOSS-Image-Character-Catalog', 'hide1', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by hide1. Trending with 28 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/hide1/MOSS-Image-Character-Catalog', 'Trending Score: 27, Community Likes: 28', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/hide1/MOSS-Image-Character-Catalog', '[{"text":"hide1/MOSS-Image-Character-Catalog on Hugging Face Spaces","url":"https://huggingface.co/spaces/hide1/MOSS-Image-Character-Catalog"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash-1017-Uncensored-GSQ-RCO-GGUF', 'AtomicChat', 'Model', 'NLP', 'MIT', 2026, 'Open Weights', 'High-performance NLP open-weights model by AtomicChat, trending with over 235 community likes and 53,913 downloads on Hugging Face.', 'AtomicChat text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("AtomicChat/DeepSeek-V4.1-Flash-1017-Uncensored-GSQ-RCO-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("AtomicChat/DeepSeek-V4.1-Flash-1017-Uncensored-GSQ-RCO-GGUF")', 'Trending Score: 209, Likes: 235, Downloads: 53,913', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/AtomicChat/DeepSeek-V4.1-Flash-1017-Uncensored-GSQ-RCO-GGUF', '[{"text":"AtomicChat/DeepSeek-V4.1-Flash-1017-Uncensored-GSQ-RCO-GGUF on Hugging Face","url":"https://huggingface.co/AtomicChat/DeepSeek-V4.1-Flash-1017-Uncensored-GSQ-RCO-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('nemotron-transcribe', 'nvidia', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by nvidia. Trending with 30 community stars.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/nvidia/nemotron-transcribe', 'Trending Score: 30, Community Likes: 30', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/nvidia/nemotron-transcribe', '[{"text":"nvidia/nemotron-transcribe on Hugging Face Spaces","url":"https://huggingface.co/spaces/nvidia/nemotron-transcribe"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Sulphur-3', 'FusionCow', 'Model', 'NLP', 'Open Weights', 2026, 'Open Weights', 'High-performance NLP open-weights model by FusionCow, trending with over 266 community likes and 195 downloads on Hugging Face.', 'FusionCow transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("FusionCow/Sulphur-3", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("FusionCow/Sulphur-3")', 'Trending Score: 222, Likes: 266, Downloads: 195', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/FusionCow/Sulphur-3', '[{"text":"FusionCow/Sulphur-3 on Hugging Face","url":"https://huggingface.co/FusionCow/Sulphur-3"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('darbuka_arabic_tts_dataset', 'bitmanagerai-speech-lab', 'Dataset', 'Computer Vision', 'OTHER', 2026, 'Curated Dataset', 'Darbuka Arabic 	 Darbuka Arabic brings together Arabic speech, automatic transcripts, and audio-quality measurements for speech recognition and text-to-speech research, (22 likes, 1,160 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("bitmanagerai-speech-lab/darbuka_arabic_tts_dataset")', 'Trending Score: 20, Likes: 22, Downloads: 1,160', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/bitmanagerai-speech-lab/darbuka_arabic_tts_dataset', '[{"text":"bitmanagerai-speech-lab/darbuka_arabic_tts_dataset on Hugging Face Datasets","url":"https://huggingface.co/datasets/bitmanagerai-speech-lab/darbuka_arabic_tts_dataset"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ava', 'townbox', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by townbox. Trending with 30 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/townbox/ava', 'Trending Score: 30, Community Likes: 30', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/townbox/ava', '[{"text":"townbox/ava on Hugging Face Spaces","url":"https://huggingface.co/spaces/townbox/ava"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Audio8-TTS-Realistic-Air', 'Edge0', 'Model', 'Audio', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Audio open-weights model by Edge0, trending with over 241 community likes and 7,259 downloads on Hugging Face.', 'Edge0 text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Edge0/Audio8-TTS-Realistic-Air", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Edge0/Audio8-TTS-Realistic-Air")', 'Trending Score: 223, Likes: 241, Downloads: 7,259', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Edge0/Audio8-TTS-Realistic-Air', '[{"text":"Edge0/Audio8-TTS-Realistic-Air on Hugging Face","url":"https://huggingface.co/Edge0/Audio8-TTS-Realistic-Air"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('hacker-news', 'open-index', 'Dataset', 'NLP', 'ODC-BY', 2026, '10M<n<100M', 'Hacker News - Complete Archive 	 Every Hacker News item since 2006, live-updated every 5 minutes 	 		 	 	 		What is it? 	 This dataset contains the complete Hacker News (379 likes, 434,325 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("open-index/hacker-news")', 'Trending Score: 24, Likes: 379, Downloads: 434,325', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/open-index/hacker-news', '[{"text":"open-index/hacker-news on Hugging Face Datasets","url":"https://huggingface.co/datasets/open-index/hacker-news"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('harness-lens', 'harness-hub', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by harness-hub. Trending with 56 community stars.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/harness-hub/harness-lens', 'Trending Score: 28, Community Likes: 56', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/harness-hub/harness-lens', '[{"text":"harness-hub/harness-lens on Hugging Face Spaces","url":"https://huggingface.co/spaces/harness-hub/harness-lens"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash-1017-obliterated', 'OBLITERATUS', 'Model', 'NLP', 'MIT', 2026, 'Open Weights', 'High-performance NLP open-weights model by OBLITERATUS, trending with over 188 community likes and 520 downloads on Hugging Face.', 'OBLITERATUS text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("OBLITERATUS/DeepSeek-V4.1-Flash-1017-obliterated", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("OBLITERATUS/DeepSeek-V4.1-Flash-1017-obliterated")', 'Trending Score: 167, Likes: 188, Downloads: 520', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/OBLITERATUS/DeepSeek-V4.1-Flash-1017-obliterated', '[{"text":"OBLITERATUS/DeepSeek-V4.1-Flash-1017-obliterated on Hugging Face","url":"https://huggingface.co/OBLITERATUS/DeepSeek-V4.1-Flash-1017-obliterated"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FineDNA', 'HuggingFaceBio', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '100M<n<1B', 'FineDNA 	 FineDNA is the training data of Carbon-X, the model that taught Qwen3-14B to read DNA, for all three of its training stages. Each stage is a group of configs: (23 likes, 72 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("HuggingFaceBio/FineDNA")', 'Trending Score: 22, Likes: 23, Downloads: 72', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/HuggingFaceBio/FineDNA', '[{"text":"HuggingFaceBio/FineDNA on Hugging Face Datasets","url":"https://huggingface.co/datasets/HuggingFaceBio/FineDNA"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-1.7B-GGUF', 'LiquidAI', 'Model', 'NLP', 'OTHER', 2026, '1.7B params', 'High-performance NLP open-weights model by LiquidAI, trending with over 172 community likes and 150,260 downloads on Hugging Face.', 'LiquidAI text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM3-1.7B-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM3-1.7B-GGUF")', 'Trending Score: 165, Likes: 172, Downloads: 150,260', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM3-1.7B-GGUF', '[{"text":"LiquidAI/LFM3-1.7B-GGUF on Hugging Face","url":"https://huggingface.co/LiquidAI/LFM3-1.7B-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FineART', 'lerobot', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '100M<n<1B', 'FineART: Fine-Grained Annotated Robotic Trajectory Dataset 	 FineART is co-released by Scale AI and Hugging Face LeRobot. The data was collected and annotated by the Ph (32 likes, 481,434 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("lerobot/FineART")', 'Trending Score: 18, Likes: 32, Downloads: 481,434', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/lerobot/FineART', '[{"text":"lerobot/FineART on Hugging Face Datasets","url":"https://huggingface.co/datasets/lerobot/FineART"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('numbat', 'burner22', 'Model', 'NLP', 'Open Weights', 2026, 'Open Weights', 'High-performance NLP open-weights model by burner22, trending with over 178 community likes and 5,846 downloads on Hugging Face.', 'burner22 transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("burner22/numbat", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("burner22/numbat")', 'Trending Score: 170, Likes: 178, Downloads: 5,846', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/burner22/numbat', '[{"text":"burner22/numbat on Hugging Face","url":"https://huggingface.co/burner22/numbat"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('hi3dv1', 'hugging-apps', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by hugging-apps. Trending with 33 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/hugging-apps/hi3dv1', 'Trending Score: 27, Community Likes: 33', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/hugging-apps/hi3dv1', '[{"text":"hugging-apps/hi3dv1 on Hugging Face Spaces","url":"https://huggingface.co/spaces/hugging-apps/hi3dv1"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-1.7B-Uncensored-GGUF', 'AtomicChat', 'Model', 'NLP', 'OTHER', 2026, '1.7B params', 'High-performance NLP open-weights model by AtomicChat, trending with over 171 community likes and 46,155 downloads on Hugging Face.', 'AtomicChat text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("AtomicChat/LFM3-1.7B-Uncensored-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("AtomicChat/LFM3-1.7B-Uncensored-GGUF")', 'Trending Score: 161, Likes: 171, Downloads: 46,155', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/AtomicChat/LFM3-1.7B-Uncensored-GGUF', '[{"text":"AtomicChat/LFM3-1.7B-Uncensored-GGUF on Hugging Face","url":"https://huggingface.co/AtomicChat/LFM3-1.7B-Uncensored-GGUF"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('prompts.chat', 'fka', 'Dataset', 'NLP', 'CC0-1.0', 2026, '1K<n<10K', 'a.k.a. Awesome ChatGPT Prompts This is a Dataset Repository mirror of prompts.chat — a social platform for AI prompts. 	 		 	 	 		📢 Notice 	 This Hugging Face dataset is (9,926 likes, 27,184 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("fka/prompts.chat")', 'Trending Score: 15, Likes: 9,926, Downloads: 27,184', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/fka/prompts.chat', '[{"text":"fka/prompts.chat on Hugging Face Datasets","url":"https://huggingface.co/datasets/fka/prompts.chat"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Audio8-TTS-Realistic-0.6b', 'Edge0', 'Model', 'Audio', 'APACHE-2.0', 2026, '0.6B params', 'High-performance Audio open-weights model by Edge0, trending with over 174 community likes and 2,755 downloads on Hugging Face.', 'Edge0 text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Edge0/Audio8-TTS-Realistic-0.6b", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Edge0/Audio8-TTS-Realistic-0.6b")', 'Trending Score: 171, Likes: 174, Downloads: 2,755', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Edge0/Audio8-TTS-Realistic-0.6b', '[{"text":"Edge0/Audio8-TTS-Realistic-0.6b on Hugging Face","url":"https://huggingface.co/Edge0/Audio8-TTS-Realistic-0.6b"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MarathonDocBench', 'baidu', 'Dataset', 'Computer Vision', 'APACHE-2.0', 2026, '10K<n<100K', 'MarathonDocBench                                                 A New Benchmark for Ultra-Long Document Parsing: Targeting Hundred-Page-Scale Documents. MarathonDocBench is the f (17 likes, 5,071 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("baidu/MarathonDocBench")', 'Trending Score: 16, Likes: 17, Downloads: 5,071', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/baidu/MarathonDocBench', '[{"text":"baidu/MarathonDocBench on Hugging Face Datasets","url":"https://huggingface.co/datasets/baidu/MarathonDocBench"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-Audio-2B', 'LiquidAI', 'Model', 'NLP', 'OTHER', 2026, '2B params', 'High-performance NLP open-weights model by LiquidAI, trending with over 165 community likes and 4,790 downloads on Hugging Face.', 'LiquidAI any to any architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM3-Audio-2B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM3-Audio-2B")', 'Trending Score: 164, Likes: 165, Downloads: 4,790', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM3-Audio-2B', '[{"text":"LiquidAI/LFM3-Audio-2B on Hugging Face","url":"https://huggingface.co/LiquidAI/LFM3-Audio-2B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DataWorld-Train-2k-part2', 'Zhanli-Li', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '1K<n<10K', 'Scaling Data Environments from Scratch   Specify the world behind the files. Generate the data. Ground the supervision.                           	 		 	 	 		DataWorld-Train-2 (20 likes, 3,834 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Zhanli-Li/DataWorld-Train-2k-part2")', 'Trending Score: 16, Likes: 20, Downloads: 3,834', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Zhanli-Li/DataWorld-Train-2k-part2', '[{"text":"Zhanli-Li/DataWorld-Train-2k-part2 on Hugging Face Datasets","url":"https://huggingface.co/datasets/Zhanli-Li/DataWorld-Train-2k-part2"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('convfill-speech-demo', 'smolagents', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by smolagents. Trending with 27 community stars.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/smolagents/convfill-speech-demo', 'Trending Score: 27, Community Likes: 27', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/smolagents/convfill-speech-demo', '[{"text":"smolagents/convfill-speech-demo on Hugging Face Spaces","url":"https://huggingface.co/spaces/smolagents/convfill-speech-demo"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ThreeJS-3D-Scenes', 'ccore', 'Dataset', 'Computer Vision', 'MIT', 2026, '1K<n<10K', 'CCORE Three.js 3D Scenes 	 4,146 high-quality 3D scene examples with prompts, full thinking traces, and complete HTML/JavaScript responses. The scene code and thinking (19 likes, 1,296 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("ccore/ThreeJS-3D-Scenes")', 'Trending Score: 19, Likes: 19, Downloads: 1,296', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ccore/ThreeJS-3D-Scenes', '[{"text":"ccore/ThreeJS-3D-Scenes on Hugging Face Datasets","url":"https://huggingface.co/datasets/ccore/ThreeJS-3D-Scenes"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('pornflux-i2v-6e9et', 'Tanyakhan', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by Tanyakhan. Trending with 62 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Tanyakhan/pornflux-i2v-6e9et', 'Trending Score: 27, Community Likes: 62', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Tanyakhan/pornflux-i2v-6e9et', '[{"text":"Tanyakhan/pornflux-i2v-6e9et on Hugging Face Spaces","url":"https://huggingface.co/spaces/Tanyakhan/pornflux-i2v-6e9et"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Clover-35B-A3B-Preview', 'Diffuspace', 'Model', 'NLP', 'APACHE-2.0', 2026, '35B params', 'High-performance NLP open-weights model by Diffuspace, trending with over 184 community likes and 2,021 downloads on Hugging Face.', 'Diffuspace text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Diffuspace/Clover-35B-A3B-Preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Diffuspace/Clover-35B-A3B-Preview")', 'Trending Score: 181, Likes: 184, Downloads: 2,021', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Diffuspace/Clover-35B-A3B-Preview', '[{"text":"Diffuspace/Clover-35B-A3B-Preview on Hugging Face","url":"https://huggingface.co/Diffuspace/Clover-35B-A3B-Preview"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HolyCyber', 'Reizxn', 'Dataset', 'NLP', 'OTHER', 2026, '10K<n<100K', 'HolyCyber — defensive cybersecurity instruction dataset 	 A long-form, fully grounded instruction dataset for a defensive cybersecurity assistant. Every row is a self-c (17 likes, 214 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Reizxn/HolyCyber")', 'Trending Score: 17, Likes: 17, Downloads: 214', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Reizxn/HolyCyber', '[{"text":"Reizxn/HolyCyber on Hugging Face Datasets","url":"https://huggingface.co/datasets/Reizxn/HolyCyber"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-Omni-2B-WebGPU', 'LiquidAI', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by LiquidAI. Trending with 29 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/LiquidAI/LFM3-Omni-2B-WebGPU', 'Trending Score: 29, Community Likes: 29', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/LiquidAI/LFM3-Omni-2B-WebGPU', '[{"text":"LiquidAI/LFM3-Omni-2B-WebGPU on Hugging Face Spaces","url":"https://huggingface.co/spaces/LiquidAI/LFM3-Omni-2B-WebGPU"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-VL-2B', 'LiquidAI', 'Model', 'Multimodal', 'OTHER', 2026, '2B params', 'High-performance Multimodal open-weights model by LiquidAI, trending with over 182 community likes and 8,091 downloads on Hugging Face.', 'LiquidAI image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM3-VL-2B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM3-VL-2B")', 'Trending Score: 180, Likes: 182, Downloads: 8,091', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM3-VL-2B', '[{"text":"LiquidAI/LFM3-VL-2B on Hugging Face","url":"https://huggingface.co/LiquidAI/LFM3-VL-2B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DataWorld-Bench', 'Zhanli-Li', 'Dataset', 'NLP', 'APACHE-2.0', 2026, 'n<1K', 'Scaling Data Environments from Scratch   Specify the world behind the files. Generate the data. Ground the supervision.                           	 		 	 	 		DataWorld-Bench (20 likes, 2,996 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Zhanli-Li/DataWorld-Bench")', 'Trending Score: 16, Likes: 20, Downloads: 2,996', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Zhanli-Li/DataWorld-Bench', '[{"text":"Zhanli-Li/DataWorld-Bench on Hugging Face Datasets","url":"https://huggingface.co/datasets/Zhanli-Li/DataWorld-Bench"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('idol', 'speridlabs', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by speridlabs. Trending with 29 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/speridlabs/idol', 'Trending Score: 29, Community Likes: 29', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/speridlabs/idol', '[{"text":"speridlabs/idol on Hugging Face Spaces","url":"https://huggingface.co/spaces/speridlabs/idol"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pika-H3-Flex', 'Pika-Labs', 'Model', 'Video Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Video Generation open-weights model by Pika-Labs, trending with over 201 community likes and 87 downloads on Hugging Face.', 'Pika-Labs image to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Pika-Labs/Pika-H3-Flex", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Pika-Labs/Pika-H3-Flex")', 'Trending Score: 198, Likes: 201, Downloads: 87', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Pika-Labs/Pika-H3-Flex', '[{"text":"Pika-Labs/Pika-H3-Flex on Hugging Face","url":"https://huggingface.co/Pika-Labs/Pika-H3-Flex"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('neuron-studio', 'webml-community', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by webml-community. Trending with 28 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/webml-community/neuron-studio', 'Trending Score: 28, Community Likes: 28', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/webml-community/neuron-studio', '[{"text":"webml-community/neuron-studio on Hugging Face Spaces","url":"https://huggingface.co/spaces/webml-community/neuron-studio"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM-OCR-1.0', 'openbmb', 'Model', 'Multimodal', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by openbmb, trending with over 363 community likes and 2,413 downloads on Hugging Face.', 'openbmb image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("openbmb/MiniCPM-OCR-1.0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("openbmb/MiniCPM-OCR-1.0")', 'Trending Score: 200, Likes: 363, Downloads: 2,413', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/openbmb/MiniCPM-OCR-1.0', '[{"text":"openbmb/MiniCPM-OCR-1.0 on Hugging Face","url":"https://huggingface.co/openbmb/MiniCPM-OCR-1.0"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('simready-glb', 'codepawl', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '1K<n<10K', 'SimReady GLB 	 Open the 3D viewer to search all 2,595 models and orbit any of them in the browser. Web-ready glTF binary (.glb) copies of the 3D models in nvidia/simrea (17 likes, 1,761 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("codepawl/simready-glb")', 'Trending Score: 17, Likes: 17, Downloads: 1,761', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/codepawl/simready-glb', '[{"text":"codepawl/simready-glb on Hugging Face Datasets","url":"https://huggingface.co/datasets/codepawl/simready-glb"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('H3EROS', 'Daankular', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by Daankular. Trending with 70 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Daankular/H3EROS', 'Trending Score: 30, Community Likes: 70', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Daankular/H3EROS', '[{"text":"Daankular/H3EROS on Hugging Face Spaces","url":"https://huggingface.co/spaces/Daankular/H3EROS"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-Omni-2B', 'LiquidAI', 'Model', 'NLP', 'OTHER', 2026, '2B params', 'High-performance NLP open-weights model by LiquidAI, trending with over 221 community likes and 3,080 downloads on Hugging Face.', 'LiquidAI any to any architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM3-Omni-2B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM3-Omni-2B")', 'Trending Score: 216, Likes: 221, Downloads: 3,080', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM3-Omni-2B', '[{"text":"LiquidAI/LFM3-Omni-2B on Hugging Face","url":"https://huggingface.co/LiquidAI/LFM3-Omni-2B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DataWorld-Train-2k-part1', 'Zhanli-Li', 'Dataset', 'NLP', 'APACHE-2.0', 2026, '1K<n<10K', 'Scaling Data Environments from Scratch   Specify the world behind the files. Generate the data. Ground the supervision.                           	 		 	 	 		DataWorld-Train-2 (21 likes, 29,323 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Zhanli-Li/DataWorld-Train-2k-part1")', 'Trending Score: 17, Likes: 21, Downloads: 29,323', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Zhanli-Li/DataWorld-Train-2k-part1', '[{"text":"Zhanli-Li/DataWorld-Train-2k-part1 on Hugging Face Datasets","url":"https://huggingface.co/datasets/Zhanli-Li/DataWorld-Train-2k-part1"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('minimax-h3-flashgen-4step', 'hugging-apps', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by hugging-apps. Trending with 159 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/hugging-apps/minimax-h3-flashgen-4step', 'Trending Score: 28, Community Likes: 159', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/hugging-apps/minimax-h3-flashgen-4step', '[{"text":"hugging-apps/minimax-h3-flashgen-4step on Hugging Face Spaces","url":"https://huggingface.co/spaces/hugging-apps/minimax-h3-flashgen-4step"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA-Nemotron-3.5-Bolt-E4B-4GB', 'nvidia', 'Model', 'NLP', 'OTHER', 2026, '4B params', 'High-performance NLP open-weights model by nvidia, trending with over 267 community likes and 64,263 downloads on Hugging Face.', 'nvidia text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB")', 'Trending Score: 248, Likes: 267, Downloads: 64,263', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB', '[{"text":"nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB on Hugging Face","url":"https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-5.5-Gemini-3.1-Pro-Grok-4-Claude-Fable-5-Mythos-5-Qwen-3.7-Max-and-more-Distillation-Dataset', 'Manusagents', 'Dataset', 'AI Coding', 'MIT', 2026, '10M<n<100M', '📖 The Open Distillation Codex 	 	 		 	 	 		🌌 The Ultimate Open-Source Distillation Dataset — No Skip, Full, with Attack & Defense 🌌 	 Where 73 open-source minds conv (256 likes, 13,074 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Manusagents/GPT-5.5-Gemini-3.1-Pro-Grok-4-Claude-Fable-5-Mythos-5-Qwen-3.7-Max-and-more-Distillation-Dataset")', 'Trending Score: 21, Likes: 256, Downloads: 13,074', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Manusagents/GPT-5.5-Gemini-3.1-Pro-Grok-4-Claude-Fable-5-Mythos-5-Qwen-3.7-Max-and-more-Distillation-Dataset', '[{"text":"Manusagents/GPT-5.5-Gemini-3.1-Pro-Grok-4-Claude-Fable-5-Mythos-5-Qwen-3.7-Max-and-more-Distillation-Dataset on Hugging Face Datasets","url":"https://huggingface.co/datasets/Manusagents/GPT-5.5-Gemini-3.1-Pro-Grok-4-Claude-Fable-5-Mythos-5-Qwen-3.7-Max-and-more-Distillation-Dataset"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5-4B-3D-Coder', 'ccore', 'Model', 'NLP', 'APACHE-2.0', 2026, '4B params', 'High-performance NLP open-weights model by ccore, trending with over 287 community likes and 12,237 downloads on Hugging Face.', 'ccore transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ccore/Qwen3.5-4B-3D-Coder", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ccore/Qwen3.5-4B-3D-Coder")', 'Trending Score: 271, Likes: 287, Downloads: 12,237', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder', '[{"text":"ccore/Qwen3.5-4B-3D-Coder on Hugging Face","url":"https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Granary-v2', 'nvidia', 'Dataset', 'Audio', 'OPENMDW-1.1', 2026, 'Curated Dataset', 'Granary-v2: Multilingual Speech Recognition, Translation and Instruction Data 	                                                        Granary-v2 is NVIDIA''s second rel (23 likes, 1,074 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Granary-v2")', 'Trending Score: 23, Likes: 23, Downloads: 1,074', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Granary-v2', '[{"text":"nvidia/Granary-v2 on Hugging Face Datasets","url":"https://huggingface.co/datasets/nvidia/Granary-v2"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral-Large-4-1T-A52B', 'Mistral AI', 'Model', 'Multimodal', 'OTHER', 2026, '52B params', 'High-performance Multimodal open-weights model by Mistral AI, trending with over 1,204 community likes and 278 downloads on Hugging Face.', 'Mistral AI image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-Large-4-1T-A52B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-Large-4-1T-A52B")', 'Trending Score: 285, Likes: 1,204, Downloads: 278', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B', '[{"text":"mistralai/Mistral-Large-4-1T-A52B on Hugging Face","url":"https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PhysicalAI-Autonomous-Vehicles-Foundation4D', 'nvidia', 'Dataset', 'NLP', 'OTHER', 2026, 'Curated Dataset', 'PhysicalAI Autonomous Vehicles - Foundation4D 	 	 		 	 	 		Dataset Description: 	 This release extends NVIDIA’s existing public PhysicalAI-Autonomous-Vehicles dataset w (28 likes, 1,496 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/PhysicalAI-Autonomous-Vehicles-Foundation4D")', 'Trending Score: 22, Likes: 28, Downloads: 1,496', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/PhysicalAI-Autonomous-Vehicles-Foundation4D', '[{"text":"nvidia/PhysicalAI-Autonomous-Vehicles-Foundation4D on Hugging Face Datasets","url":"https://huggingface.co/datasets/nvidia/PhysicalAI-Autonomous-Vehicles-Foundation4D"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FastH3-Omni', 'FastVideo', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by FastVideo. Trending with 58 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/FastVideo/FastH3-Omni', 'Trending Score: 40, Community Likes: 58', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/FastVideo/FastH3-Omni', '[{"text":"FastVideo/FastH3-Omni on Hugging Face Spaces","url":"https://huggingface.co/spaces/FastVideo/FastH3-Omni"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen-image-2-1-realtime', 'linoyts', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by linoyts. Trending with 54 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/linoyts/qwen-image-2-1-realtime', 'Trending Score: 45, Community Likes: 54', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/linoyts/qwen-image-2-1-realtime', '[{"text":"linoyts/qwen-image-2-1-realtime on Hugging Face Spaces","url":"https://huggingface.co/spaces/linoyts/qwen-image-2-1-realtime"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA-Nemotron-3.5-Transcribe-30B-A4B', 'nvidia', 'Model', 'Audio', 'OTHER', 2026, '30B params', 'High-performance Audio open-weights model by nvidia, trending with over 314 community likes and 4,276 downloads on Hugging Face.', 'nvidia automatic speech recognition architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B")', 'Trending Score: 306, Likes: 314, Downloads: 4,276', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B', '[{"text":"nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B on Hugging Face","url":"https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Unlimited-OCR-2', 'baidu', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by baidu, trending with over 341 community likes and 8,357 downloads on Hugging Face.', 'baidu image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("baidu/Unlimited-OCR-2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("baidu/Unlimited-OCR-2")', 'Trending Score: 326, Likes: 341, Downloads: 8,357', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/baidu/Unlimited-OCR-2', '[{"text":"baidu/Unlimited-OCR-2 on Hugging Face","url":"https://huggingface.co/baidu/Unlimited-OCR-2"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('phonon', 'gradium', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by gradium. Trending with 69 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/gradium/phonon', 'Trending Score: 47, Community Likes: 69', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/gradium/phonon', '[{"text":"gradium/phonon on Hugging Face Spaces","url":"https://huggingface.co/spaces/gradium/phonon"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hy-SimulMT-30B-A3B-FP8', 'tencent', 'Model', 'NLP', 'APACHE-2.0', 2026, '30B params', 'High-performance NLP open-weights model by tencent, trending with over 338 community likes and 165 downloads on Hugging Face.', 'tencent translation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("tencent/Hy-SimulMT-30B-A3B-FP8", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("tencent/Hy-SimulMT-30B-A3B-FP8")', 'Trending Score: 333, Likes: 338, Downloads: 165', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/tencent/Hy-SimulMT-30B-A3B-FP8', '[{"text":"tencent/Hy-SimulMT-30B-A3B-FP8 on Hugging Face","url":"https://huggingface.co/tencent/Hy-SimulMT-30B-A3B-FP8"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('qwen-image-2.1-uncensored-aio-loras-2', 'wank3r', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by wank3r. Trending with 61 community stars.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/wank3r/qwen-image-2.1-uncensored-aio-loras-2', 'Trending Score: 47, Community Likes: 61', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/wank3r/qwen-image-2.1-uncensored-aio-loras-2', '[{"text":"wank3r/qwen-image-2.1-uncensored-aio-loras-2 on Hugging Face Spaces","url":"https://huggingface.co/spaces/wank3r/qwen-image-2.1-uncensored-aio-loras-2"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-1.7B', 'LiquidAI', 'Model', 'NLP', 'OTHER', 2026, '1.7B params', 'High-performance NLP open-weights model by LiquidAI, trending with over 344 community likes and 8,892 downloads on Hugging Face.', 'LiquidAI text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM3-1.7B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM3-1.7B")', 'Trending Score: 341, Likes: 344, Downloads: 8,892', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM3-1.7B', '[{"text":"LiquidAI/LFM3-1.7B on Hugging Face","url":"https://huggingface.co/LiquidAI/LFM3-1.7B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GEAR', 'WizardTY', 'Platform', 'NLP', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by WizardTY. Trending with 58 community stars.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/WizardTY/GEAR', 'Trending Score: 46, Community Likes: 58', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/WizardTY/GEAR', '[{"text":"WizardTY/GEAR on Hugging Face Spaces","url":"https://huggingface.co/spaces/WizardTY/GEAR"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('simready-central-library', 'nvidia', 'Dataset', 'NLP', 'APACHE-2.0', 2026, 'Curated Dataset', 'Welcome to SimReady Central 	 SimReady Central is in Alpha. We are accepting contributors through the Community tab. SimReady Central connects creators and users of sim (50 likes, 155 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/simready-central-library")', 'Trending Score: 34, Likes: 50, Downloads: 155', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/simready-central-library', '[{"text":"nvidia/simready-central-library on Hugging Face Datasets","url":"https://huggingface.co/datasets/nvidia/simready-central-library"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('10-2026-qwen-investigation-traces', 'CohereLabs', 'Dataset', 'NLP', 'Open Data', 2026, 'n<1K', 'Qwen 3.8 Flash Next Investigation 	 This dataset contains the model trace and corresponding raw token IDs from the behaviour observed in https://cohere.com/blog/concern (49 likes, 0 downloads).', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("CohereLabs/10-2026-qwen-investigation-traces")', 'Trending Score: 48, Likes: 49, Downloads: 0', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/CohereLabs/10-2026-qwen-investigation-traces', '[{"text":"CohereLabs/10-2026-qwen-investigation-traces on Hugging Face Datasets","url":"https://huggingface.co/datasets/CohereLabs/10-2026-qwen-investigation-traces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

