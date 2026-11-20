-- =============================================================================
-- AiVerse: Newly Approved Entries Sync (191 entries)
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

-- 2. Upsert 191 entries into public.entries

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

