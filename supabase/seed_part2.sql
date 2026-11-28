-- =============================================================================
-- AiVerse: Full Catalog Part 2 of 2 (269 entries)
-- =============================================================================

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LMSYS Chatbot Arena Conversations', 'LMSYS Org', 'Dataset', 'NLP', 'LMSYS Terms / Research', 2024, '1,000,000+ battles', 'Open dataset of over 1 million real-world pairwise prompt conversations and human preference votes collected from the LMSYS Chatbot Arena.', 'Crowdsourced human side-by-side preference votes with model identities revealed post-vote.', 'from datasets import load_dataset
ds = load_dataset("lmsys/chatbot_arena_conversations", split="train")', 'Industry standard for calculating ELO ratings of frontier LLMs.', 'Subject to prompt distribution biases of Arena visitors.', 'https://chat.lmsys.org', '[{"url":"https://arxiv.org/abs/2403.04132","text":"LMSYS Chatbot Arena Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LongCat-2.5', 'Meituan (LongCat)', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'Open-weights Multimodal model developed by Meituan (LongCat).', 'meituan-longcat image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meituan-longcat/LongCat-2.5", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("meituan-longcat/LongCat-2.5")', 'Trending Score: 203, Likes: 268, Downloads: 1,573', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/meituan-longcat/LongCat-2.5', '[{"url":"https://huggingface.co/meituan-longcat/LongCat-2.5","text":"meituan-longcat/LongCat-2.5 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LongCat-Video-Avatar-1.6', 'Meituan (LongCat)', 'Model', 'Video Generation', 'MIT', 2026, 'Open Weights', 'Expressive talking-head and full-body video avatar synthesis model developed by Meituan (LongCat).', 'meituan-longcat transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meituan-longcat/LongCat-Video-Avatar-1.6", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("meituan-longcat/LongCat-Video-Avatar-1.6")', 'Trending Score: 125, Likes: 169, Downloads: 489', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6', '[{"url":"https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6","text":"meituan-longcat/LongCat-Video-Avatar-1.6 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Lovable.dev', 'Lovable', 'AI', 'AI Coding', 'Proprietary', 2024, 'N/A', 'Full-stack autonomous AI web application builder that generates complete web apps, database schemas via Supabase, user auth, and deploys live in minutes.', 'Full-stack AI code synthesizer with live Supabase database & GitHub synchronization.', 'Go to lovable.dev, type your app idea (e.g. "Airbnb for pet boarding"), customize components interactively, and deploy live.', 'Generates functional full-stack web applications with database persistence in under 3 minutes.', 'Complex enterprise microservice architectures require manual code export and expansion.', 'https://lovable.dev', '[{"url":"https://lovable.dev","text":"Lovable.dev"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LTX-2.5', 'Lightricks', 'Model', 'Video Generation', 'Open Weights', 2026, 'Open Weights', 'Open-weights Video Generation model developed by Lightricks.', 'Lightricks image to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Lightricks/LTX-2.5", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Lightricks/LTX-2.5")', 'Trending Score: 342, Likes: 2,964, Downloads: 1,526,928', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Lightricks/LTX-2.5', '[{"url":"https://huggingface.co/Lightricks/LTX-2.5","text":"Lightricks/LTX-2.5 on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LTX-Video', 'Lightricks', 'Model', 'Video Generation', 'Apache-2.0', 2024, '2B params', 'Lightricks'' open real-time video foundation model capable of generating high-definition 24fps video in under 5 seconds on commercial GPUs.', 'Spatial-temporal DiT with distilled multi-step rectified flow.', 'from diffusers import LTXPipeline
pipe = LTXPipeline.from_pretrained("Lightricks/LTX-Video", torch_dtype=torch.bfloat16)', 'Generates 5-second video in ~4 seconds on a single NVIDIA A100.', 'Lower maximum resolution (768x512) before upscaling.', 'https://github.com/Lightricks/LTX-Video', '[{"url":"https://www.lightricks.com/ltx-video","text":"LTX-Video Announcement"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Luma Dream Machine', 'Luma AI', 'AI', 'Video Generation', 'Proprietary', 2024, 'N/A', 'Luma AI''s fast and high-quality video generation model that creates realistic, physically accurate video clips from text prompts or still images.', 'Web Application (Proprietary video diffusion model with physics-aware generation)', 'Visit lumalabs.ai/dream-machine to generate videos from text or image inputs.', 'N/A', 'Free tier has limited monthly generations; longer clips require paid credits.', 'https://lumalabs.ai/dream-machine', '[{"url":"https://lumalabs.ai/dream-machine","text":"Luma Dream Machine"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('lunara-art-eval', 'Moonworks', 'Dataset', 'Computer Vision', 'Apache-2.0', 2026, '1K<n<10K', 'Image-generation evaluation dataset by Moonworks containing 8,000 curated samples for artistic intelligence benchmarking.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("moonworks/lunara-art-eval")', 'Trending Score: 26, Likes: 43, Downloads: 1,878', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/moonworks/lunara-art-eval', '[{"url":"https://huggingface.co/datasets/moonworks/lunara-art-eval","text":"moonworks/lunara-art-eval on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mage-VL-Cowork', 'Microsoft', 'Model', 'Multimodal', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Multimodal model developed by Microsoft.', 'Microsoft image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("microsoft/Mage-VL-Cowork", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("microsoft/Mage-VL-Cowork")', 'Trending Score: 166, Likes: 183, Downloads: 1,973', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/microsoft/Mage-VL-Cowork', '[{"url":"https://huggingface.co/microsoft/Mage-VL-Cowork","text":"microsoft/Mage-VL-Cowork on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MAGI-2-preview', 'Sand AI', 'Model', 'Multimodal', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Multimodal model developed by Sand AI.', 'sand-ai image text to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("sand-ai/MAGI-2-preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("sand-ai/MAGI-2-preview")', 'Trending Score: 163, Likes: 361, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/sand-ai/MAGI-2-preview', '[{"url":"https://huggingface.co/sand-ai/MAGI-2-preview","text":"sand-ai/MAGI-2-preview on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MarathonDocBench', 'Baidu', 'Dataset', 'Computer Vision', 'Apache-2.0', 2026, '10K<n<100K', 'MarathonDocBench A New Benchmark for Ultra-Long Document Parsing: Targeting Hundred-Page-Scale Documents. MarathonDocBench is the f.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("baidu/MarathonDocBench")', 'Trending Score: 16, Likes: 17, Downloads: 5,071', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/baidu/MarathonDocBench', '[{"url":"https://huggingface.co/datasets/baidu/MarathonDocBench","text":"baidu/MarathonDocBench on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MATH-500', 'OpenAI', 'Dataset', 'Research', 'MIT', 2024, '500 competition problems', 'Standardized 500-problem evaluation benchmark subset of the original MATH competition dataset used to measure multi-step mathematical reasoning in frontier models.', 'Challenging math competition problems spanning algebra, geometry, number theory, and calculus.', 'from datasets import load_dataset
ds = load_dataset("HuggingFaceH4/MATH-500", split="test")', 'Primary benchmark for OpenAI o1, o3-mini, and DeepSeek-R1 reasoning comparisons.', 'Static problem set creates potential risk of training data contamination over time.', 'https://huggingface.co/datasets/HuggingFaceH4/MATH-500', '[{"url":"https://arxiv.org/abs/2103.03874","text":"MATH Benchmark Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MathVista', 'UCLA & UW', 'Dataset', 'Research', 'CC-BY-SA-4.0', 2023, '6,141 Multimodal Reasoning Tasks', 'Pioneering multimodal mathematical reasoning benchmark compiled by UCLA, University of Washington, and Microsoft, comprising 6,141 diverse tasks requiring fine-grained visual understanding and math logic.', 'Structured multimodal benchmark aggregating 28 existing mathematical datasets alongside 3 newly created visual challenge subsets.', 'from datasets import load_dataset
ds = load_dataset("AI4Math/MathVista", split="testmini")
print(ds[0]["question"], ds[0]["image"])', 'Standard evaluation benchmark for GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and open VLMs assessing visual chart, geometry, and arithmetic reasoning.', 'Testmini split contains 1,000 problems, while full test set contains 5,141; evaluation requires OCR robustness and spatial diagram awareness.', 'https://mathvista.github.io', '[{"url":"https://mathvista.github.io","text":"MathVista Project Page & Leaderboard"},{"url":"https://huggingface.co/datasets/AI4Math/MathVista","text":"MathVista Dataset on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Maxwell-V1-Flash', 'Maxwell', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by Maxwell.', 'maxwell-model text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("maxwell-model/Maxwell-V1-Flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("maxwell-model/Maxwell-V1-Flash")', 'Trending Score: 173, Likes: 215, Downloads: 1,052', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/maxwell-model/Maxwell-V1-Flash', '[{"url":"https://huggingface.co/maxwell-model/Maxwell-V1-Flash","text":"maxwell-model/Maxwell-V1-Flash on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Meta AI', 'Meta AI', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Meta''s smart assistant integrated into WhatsApp, Instagram, Facebook, and Messenger, capable of answering questions and generating images.', 'Chatbot Integration (Powered by Llama 3 models)', 'Use it directly inside Meta''s messaging apps or at meta.ai.', 'N/A', 'Feature availability varies by country and platform.', 'https://www.meta.ai', '[{"url":"https://about.fb.com/news/2023/09/introducing-ai-experiences-across-our-family-of-apps-and-devices/","text":"Meta AI Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mi:dm K 3.0 Pro', 'KT', 'Model', 'NLP', 'Proprietary', 2026, '262k Context · Available via API', 'Mi:dm K 3.0 Pro is a Mixture-of-Experts reasoning model from KT, with 120B total and 12B active parameters. It uses a hybrid architecture that mixes Mamba, MoE and attention layers.', 'Modern foundation model hosted on OpenRouter with native 262k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "kt/midm-k-3.0-pro",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 262k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/kt/midm-k-3.0-pro', '[{"url":"https://openrouter.ai/kt/midm-k-3.0-pro","text":"KT: Mi:dm K 3.0 Pro on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('microduck-arena', 'Pollen Robotics', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive multimodal showcase hosted by Pollen Robotics on Hugging Face Spaces.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/pollen-robotics/microduck-arena', 'Trending Score: 31, Community Likes: 32', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/pollen-robotics/microduck-arena', '[{"url":"https://huggingface.co/spaces/pollen-robotics/microduck-arena","text":"pollen-robotics/microduck-arena on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('microduck-simulator', 'Pollen Robotics', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive multimodal showcase hosted by Pollen Robotics on Hugging Face Spaces.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/pollen-robotics/microduck-simulator', 'Trending Score: 225, Community Likes: 435', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/pollen-robotics/microduck-simulator', '[{"url":"https://huggingface.co/spaces/pollen-robotics/microduck-simulator","text":"pollen-robotics/microduck-simulator on Hugging Face Spaces"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Microsoft Copilot', 'Microsoft', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Microsoft''s AI assistant (formerly Bing Chat), integrated with Windows and Microsoft 365, combining GPT-4 with real-time web search.', 'Web Application / OS Integration (Powered by GPT-4 and Bing Search)', 'Visit copilot.microsoft.com or use it directly in Windows 11 / Edge.', 'N/A', 'Can be slow during peak times, responses are sometimes limited in length.', 'https://copilot.microsoft.com', '[{"url":"https://blogs.microsoft.com/blog/2023/09/21/announcing-microsoft-copilot-your-everyday-ai-companion/","text":"Copilot Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Midjourney', 'Midjourney', 'AI', 'Image Generation', 'Proprietary', 2022, 'N/A', 'An AI image generation service known for producing highly artistic and aesthetically striking images from text prompts, operated via Discord.', 'Web Application / Discord Bot (Proprietary diffusion model)', 'Join the Midjourney Discord server at discord.gg/midjourney and use /imagine commands.', 'N/A', 'Requires a paid subscription; primarily Discord-based; limited control over prompt precision.', 'https://www.midjourney.com', '[{"url":"https://www.midjourney.com","text":"Midjourney"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Midjourney v6', 'Midjourney', 'Model', 'Image Generation', 'Proprietary', 2023, 'N/A', 'A highly advanced text-to-image AI capable of generating photorealistic imagery, complex compositions, and readable text within images.', 'Latent diffusion model.', '# Midjourney does not offer an official public API.
# Usage is primarily through their Discord bot or web interface.
/imagine prompt: A futuristic cyberpunk city in the rain, highly detailed --v 6.0', 'N/A (Subjective visual quality leader)', 'No official API, requires Discord/web interface, paid subscription only.', 'https://www.midjourney.com/', '[{"url":"https://www.midjourney.com/","text":"Midjourney Alpha"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-V2.6-Distill-Qwen-9B', 'Xiaomi (MiMo)', 'Model', 'Multimodal', 'MIT', 2026, '9B params', 'Open-weights Multimodal model developed by Xiaomi (MiMo).', 'XiaomiMiMo image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B")', 'Trending Score: 513, Likes: 524, Downloads: 8,839', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B', '[{"url":"https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B","text":"XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-V2.6-Flash', 'Xiaomi (MiMo)', 'Model', 'Research', 'Open Weights', 2026, '1000k Context · Open Model', 'Frontier Research model by Xiaomi benchmarked on Artificial Analysis with an Intelligence Index of 26.7 and a verified 1000k Context window.', 'Open-weights frontier neural architecture developed by Xiaomi, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/mimo-v2-6-flash', 'Context Window: 1000k Context, Intelligence Index: 26.7, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/mimo-v2-6-flash', '[{"url":"https://artificialanalysis.ai/models/mimo-v2-6-flash","text":"MiMo-V2.6-Flash on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/mimo-v2-6-flash/providers","text":"MiMo-V2.6-Flash Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-V2.6-Flash-MOPD', 'Xiaomi (MiMo)', 'Model', 'Multimodal', 'Proprietary', 2026, '1049k Context · Available via API', 'MiMo-V2.6-Flash-MOPD is an updated checkpoint of Xiaomi''s MiMo-V2.6-Flash, a Mixture-of-Experts model with 309B total and 15B active parameters, a 1M-token context window, and nati.', 'Modern foundation model hosted on OpenRouter with native 1049k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "xiaomi/mimo-v2.6-flash-mopd",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1049k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/xiaomi/mimo-v2.6-flash-mopd', '[{"url":"https://openrouter.ai/xiaomi/mimo-v2.6-flash-mopd","text":"Xiaomi: MiMo-V2.6-Flash-MOPD on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-V2.6-Pro', 'Xiaomi (MiMo)', 'Model', 'NLP', 'Open Weights', 2026, '1M Context · Open Model', 'Xiaomi (MiMo)''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 30, Briefcase Elo of 1512, and a massive 1M context window.', 'Open-weights frontier neural architecture developed by Xiaomi (MiMo), featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (49 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Xiaomi/mimo-v2-6-pro", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Xiaomi/mimo-v2-6-pro")', 'Intelligence Index: 30, Briefcase Elo: 1512, Accuracy: 35%, Non-Hallucination: 40%, FrontierCode: 24%, AutomationBench: 59%, TerminalBench 4: 35%, HLE Diamond: 15%, Speed: 49 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/mimo-v2-6-pro', '[{"url":"https://artificialanalysis.ai/models/mimo-v2-6-pro","text":"MiMo-V2.6-Pro on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/mimo-v2-6-pro/providers","text":"MiMo-V2.6-Pro Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-V2.6-Pro-RL', 'Xiaomi (MiMo)', 'Model', 'NLP', 'MIT', 2026, 'Open Weights', 'Open-weights NLP model developed by Xiaomi (MiMo).', 'XiaomiMiMo text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XiaomiMiMo/MiMo-V2.6-Pro-RL", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XiaomiMiMo/MiMo-V2.6-Pro-RL")', 'Trending Score: 519, Likes: 530, Downloads: 74,497', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL', '[{"url":"https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL","text":"XiaomiMiMo/MiMo-V2.6-Pro-RL on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-V2.6-RL-oss', 'Xiaomi (MiMo)', 'Dataset', 'AI Coding', 'Apache-2.0', 2026, '1K<n<10K', 'Agentic RL Environments RL training environments for LLM agents. Domain Task Family Verifier Code Software engineering Executable tests Cyber Vulnerability re.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("XiaomiMiMo/MiMo-V2.6-RL-oss")', 'Trending Score: 320, Likes: 324, Downloads: 973', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/XiaomiMiMo/MiMo-V2.6-RL-oss', '[{"url":"https://huggingface.co/datasets/XiaomiMiMo/MiMo-V2.6-RL-oss","text":"XiaomiMiMo/MiMo-V2.6-RL-oss on Hugging Face Datasets"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM-OCR-1.0', 'OpenBMB', 'Model', 'Multimodal', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Multimodal model developed by OpenBMB.', 'openbmb image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("openbmb/MiniCPM-OCR-1.0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("openbmb/MiniCPM-OCR-1.0")', 'Trending Score: 200, Likes: 363, Downloads: 2,413', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/openbmb/MiniCPM-OCR-1.0', '[{"url":"https://huggingface.co/openbmb/MiniCPM-OCR-1.0","text":"openbmb/MiniCPM-OCR-1.0 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM-V-4.7-1B', 'OpenBMB', 'Model', 'Multimodal', 'Apache-2.0', 2026, '1B params', 'Open-weights Multimodal model developed by OpenBMB.', 'openbmb image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("openbmb/MiniCPM-V-4.7-1B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("openbmb/MiniCPM-V-4.7-1B")', 'Trending Score: 275, Likes: 369, Downloads: 8,822', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/openbmb/MiniCPM-V-4.7-1B', '[{"url":"https://huggingface.co/openbmb/MiniCPM-V-4.7-1B","text":"openbmb/MiniCPM-V-4.7-1B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM-V-4.7-35B-A3B', 'OpenBMB', 'Model', 'Multimodal', 'Apache-2.0', 2026, '35B params', 'Open-weights Multimodal model developed by OpenBMB.', 'openbmb image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("openbmb/MiniCPM-V-4.7-35B-A3B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("openbmb/MiniCPM-V-4.7-35B-A3B")', 'Trending Score: 428, Likes: 473, Downloads: 630', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B', '[{"url":"https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B","text":"openbmb/MiniCPM-V-4.7-35B-A3B on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM5-2B', 'OpenBMB', 'Model', 'NLP', 'Apache-2.0', 2026, '2B params', 'Open-weights NLP model developed by OpenBMB.', 'openbmb text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("openbmb/MiniCPM5-2B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("openbmb/MiniCPM5-2B")', 'Trending Score: 568, Likes: 690, Downloads: 2,879', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/openbmb/MiniCPM5-2B', '[{"url":"https://huggingface.co/openbmb/MiniCPM5-2B","text":"openbmb/MiniCPM5-2B on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniMax-H3-Image', 'MiniMax', 'Model', 'Image Generation', 'Open Weights', 2026, 'Open Weights', 'Open-weights Image Generation model developed by MiniMax.', 'MiniMaxAI text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("MiniMaxAI/MiniMax-H3-Image", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("MiniMaxAI/MiniMax-H3-Image")', 'Trending Score: 307, Likes: 308, Downloads: 667', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/MiniMaxAI/MiniMax-H3-Image', '[{"url":"https://huggingface.co/MiniMaxAI/MiniMax-H3-Image","text":"MiniMaxAI/MiniMax-H3-Image on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniMax-M3', 'MiniMax', 'Model', 'Research', 'Open Weights', 2026, '1000k Context · Open Model', 'Frontier Research model by MiniMax benchmarked on Artificial Analysis with an Intelligence Index of 19.0 and a verified 1000k Context window.', 'Open-weights frontier neural architecture developed by MiniMax, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/minimax-m3', 'Context Window: 1000k Context, Intelligence Index: 19.0, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/minimax-m3', '[{"url":"https://artificialanalysis.ai/models/minimax-m3","text":"MiniMax-M3 on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/minimax-m3/providers","text":"MiniMax-M3 Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniMax-M3.1-Flash', 'MiniMax', 'Model', 'NLP', 'Open Weights', 2026, '1M Context · Open Model', 'MiniMax''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 29, Briefcase Elo of 1475, and a massive 1M context window.', 'Open-weights frontier neural architecture developed by MiniMax, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (119 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("MiniMax/minimax-m3-1-flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("MiniMax/minimax-m3-1-flash")', 'Intelligence Index: 29, Briefcase Elo: 1475, Accuracy: 45%, Non-Hallucination: 6%, FrontierCode: 21%, AutomationBench: 73%, TerminalBench 4: 26%, HLE Diamond: 28%, Speed: 119 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/minimax-m3-1-flash', '[{"url":"https://artificialanalysis.ai/models/minimax-m3-1-flash","text":"MiniMax-M3.1-Flash on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/minimax-m3-1-flash/providers","text":"MiniMax-M3.1-Flash Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('mirage', 'Cactus Compute', 'Model', 'Multimodal', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Multimodal model developed by Cactus Compute.', 'Cactus-Compute image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Cactus-Compute/mirage", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Cactus-Compute/mirage")', 'Trending Score: 151, Likes: 156, Downloads: 14,615', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Cactus-Compute/mirage', '[{"url":"https://huggingface.co/Cactus-Compute/mirage","text":"Cactus-Compute/mirage on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral 7B', 'Mistral AI', 'Model', 'NLP', 'Apache-2.0', 2023, '7B params', 'A highly efficient 7B parameter open-source model that outperforms Llama 2 13B on most benchmarks using sliding window attention and grouped query attention.', 'Transformer decoder with sliding window attention (SWA) and grouped query attention (GQA).', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2")', 'MMLU: 60.1%, outperforms Llama 2 13B on most tasks', 'Smaller size limits complex reasoning, no native multimodal support.', 'https://mistral.ai/', '[{"url":"https://arxiv.org/abs/2310.06825","text":"Mistral 7B Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral Large', 'Mistral AI', 'Model', 'NLP', 'Proprietary', 2024, 'N/A', 'Mistral AI''s flagship proprietary model, competitive with GPT-4 on reasoning, coding, and multilingual tasks.', 'Large-scale transformer with advanced instruction tuning.', 'from mistralai.client import MistralClient
client = MistralClient(api_key="YOUR_API_KEY")
response = client.chat(
  model="mistral-large-latest",
  messages=[{"role": "user", "content": "Explain quantum entanglement."}]
)', 'MMLU: 81.2%, MATH: 45.0%', 'Proprietary API, pay-per-use pricing.', 'https://mistral.ai/news/mistral-large/', '[{"url":"https://mistral.ai/news/mistral-large/","text":"Mistral Large Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral Large 2 (123B)', 'Mistral AI', 'Model', 'NLP', 'Mistral Research License / Commercial', 2024, '123B params', 'Mistral AI''s 123-billion parameter flagship model with 128k context window, advanced multilingual fluency in 80+ languages, and top code generation.', 'Dense Transformer with 128k context window and enhanced function calling.', 'from mistralai import Mistral
client = Mistral(api_key="API_KEY")
response = client.chat.complete(
  model="mistral-large-latest",
  messages=[{"role": "user", "content": "Analyze economic trends."}]
)', 'MMLU: 84.0%, HumanEval: 92.0%, GSM8K: 91.2%', 'Commercial weights require paid enterprise license.', 'https://mistral.ai/news/mistral-large-2407/', '[{"url":"https://mistral.ai/news/mistral-large-2407/","text":"Mistral Large 2 Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral Large 4', 'Mistral AI', 'Model', 'NLP', 'Open Weights', 2026, '1M Context · Open Model', 'Mistral AI''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 26, Briefcase Elo of 1350, and a massive 1M context window.', 'Open-weights frontier neural architecture developed by Mistral AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (161 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Mistral/mistral-large-4-high", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Mistral/mistral-large-4-high")', 'Intelligence Index: 26, Briefcase Elo: 1350, Accuracy: 26%, Non-Hallucination: 72%, FrontierCode: 15%, AutomationBench: 58%, TerminalBench 4: 25%, HLE Diamond: 17%, Speed: 161 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/mistral-large-4', '[{"url":"https://artificialanalysis.ai/models/mistral-large-4","text":"Mistral Large 4 (high) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/mistral-large-4/providers","text":"Mistral Large 4 (high) Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral Le Chat', 'Mistral AI', 'AI', 'NLP', 'Proprietary', 2024, 'N/A', 'A fast and capable conversational AI assistant by Mistral AI, built on their own open-weight models with a focus on efficiency.', 'Web Application / Conversational Agent (Powered by Mistral Large / Mistral Small)', 'Visit chat.mistral.ai to interact via the web interface.', 'N/A', 'Smaller ecosystem compared to OpenAI or Google; some advanced features require a paid plan.', 'https://chat.mistral.ai', '[{"url":"https://chat.mistral.ai","text":"Mistral Le Chat"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral Small 4', 'Mistral AI', 'Model', 'NLP', 'Open Weights', 2026, '256k Context · Open Model', 'Frontier NLP model by Mistral benchmarked on Artificial Analysis and a verified 256k Context window.', 'Open-weights frontier neural architecture developed by Mistral, featuring native 256k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/mistral-small-4', 'Context Window: 256k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/mistral-small-4', '[{"url":"https://artificialanalysis.ai/models/mistral-small-4","text":"Mistral Small 4 on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/mistral-small-4/providers","text":"Mistral Small 4 Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral-Large-4-1T-A52B', 'Mistral AI', 'Model', 'Multimodal', 'Open Weights', 2026, '52B params', 'Open-weights Multimodal model developed by Mistral AI.', 'Mistral AI image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-Large-4-1T-A52B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-Large-4-1T-A52B")', 'Trending Score: 285, Likes: 1,204, Downloads: 278', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B', '[{"url":"https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B","text":"mistralai/Mistral-Large-4-1T-A52B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mixtral 8x7B', 'Mistral AI', 'Model', 'NLP', 'Apache-2.0', 2023, '46.7B total params (12.9B active)', 'Mistral AI''s sparse mixture-of-experts model that uses 8 expert networks but only activates 2 per token, delivering 70B-class performance at lower inference cost.', 'Sparse Mixture-of-Experts (SMoE) with 8 expert FFN layers, activating 2 per token.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("mistralai/Mixtral-8x7B-Instruct-v0.1")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mixtral-8x7B-Instruct-v0.1")', 'MMLU: 70.6%, HumanEval: 40.2%', 'Large total parameter count, complex deployment for MoE routing.', 'https://mistral.ai/', '[{"url":"https://arxiv.org/abs/2401.04088","text":"Mixtral of Experts Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MMBench', 'OpenDataLab', 'Dataset', 'Multimodal', 'CC-BY-4.0', 2023, '3,000 Questions · 20 Capability Dimensions', 'Comprehensive bilingual vision-language benchmark developed by OpenDataLab, evaluating perception and reasoning across 20 distinct ability dimensions using CircularEval to neutralize position bias.', 'Bilingual (English and Chinese) hierarchical evaluation dataset with CircularEval evaluation methodology testing option shuffling stability.', 'from datasets import load_dataset
ds = load_dataset("opencompass/MMBench", "en", split="test")
print(ds[0]["question"], ds[0]["category"])', 'Standard benchmark on OpenCompass VLM leaderboard assessing object localization, attribute recognition, OCR, social relation, and visual logic.', 'Multiple-choice evaluation format does not directly measure open-ended conversational fluency or multi-turn agent interaction.', 'https://mmbench.opencompass.org.cn', '[{"url":"https://mmbench.opencompass.org.cn","text":"MMBench Official Platform & Leaderboard"},{"url":"https://huggingface.co/datasets/opencompass/MMBench","text":"MMBench on Hugging Face Datasets"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MMLU', 'UC Berkeley (BAIR)', 'Dataset', 'NLP', 'MIT', 2020, '15,908 questions across 57 subjects', 'Massive Multitask Language Understanding — a benchmark covering 57 subjects from STEM to humanities, used to evaluate the knowledge and reasoning of LLMs.', 'Four-choice multiple-choice questions at varying difficulty levels from elementary to professional.', 'from datasets import load_dataset
dataset = load_dataset("cais/mmlu", "all")
print(dataset[''test''][0])', 'Human expert baseline: ~89.8%. GPT-4: 86.4%, Claude 3 Opus: 86.8%', 'Multiple-choice format doesn''t capture open-ended generation ability.', 'https://github.com/hendrycks/test', '[{"url":"https://arxiv.org/abs/2009.03300","text":"Hendrycks et al. (2020) - MMLU Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MMLU-Pro', 'TIGER-Lab', 'Dataset', 'NLP', 'MIT', 2026, '10K<n<100K', 'MMLU-Pro Dataset MMLU-Pro dataset is a more robust and challenging massive multi-task understanding dataset tailored to more rigorously benchmark large language model.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("TIGER-Lab/MMLU-Pro")', 'Trending Score: 30, Likes: 570, Downloads: 226,194', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro', '[{"url":"https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro","text":"TIGER-Lab/MMLU-Pro on Hugging Face Datasets"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mochi 1', 'Genmo', 'Model', 'Video Generation', 'Apache-2.0', 2024, '10B params', 'Genmo''s open-weights 10B diffusion model for fluid, high-fidelity 480p video generation at 30fps with state-of-the-art prompt motion fidelity.', 'Asymmetric Diffusion Transformer (AsymmDiT) with continuous-time flow matching.', 'from diffusers import MochiPipeline
pipe = MochiPipeline.from_pretrained("genmo/mochi-1-preview", torch_dtype=torch.bfloat16)', 'High human preference score for prompt adherence in open text-to-video.', 'Requires 4x H100 or aggressive quantization for multi-second rendering.', 'https://github.com/genmoai/models', '[{"url":"https://www.genmo.ai/blog/mochi-1","text":"Mochi 1 Preview"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Modal', 'Modal Labs', 'Platform', 'MLOps', 'Proprietary', 2024, 'Elastic GPU cloud', 'Serverless cloud compute platform designed for running GPU-accelerated Python containers, AI microservices, fine-tuning, and inference in seconds.', 'Containerized serverless runtime with cold starts under 2 seconds.', 'import modal
app = modal.App("fast-inference")
@app.function(gpu="A100")
def generate():
    return "Generated from serverless GPU"', 'Industry-leading cold start latency for containerized PyTorch and vLLM workloads.', 'Requires Python-centric infrastructure design.', 'https://modal.com', '[{"url":"https://modal.com/docs","text":"Modal Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MOSS-Image', 'OpenMOSS', 'Platform', 'Image Generation', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive demo for OpenMOSS''s high-resolution instruction-following image generation and editing suite.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/OpenMOSS-Team/MOSS-Image', 'Trending Score: 34, Community Likes: 34', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/OpenMOSS-Team/MOSS-Image', '[{"url":"https://huggingface.co/spaces/OpenMOSS-Team/MOSS-Image","text":"OpenMOSS-Team/MOSS-Image on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MOSS-Image-Base', 'OpenMOSS', 'Model', 'Image Generation', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Image Generation model developed by OpenMOSS.', 'OpenMOSS-Team text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("OpenMOSS-Team/MOSS-Image-Base", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("OpenMOSS-Team/MOSS-Image-Base")', 'Trending Score: 218, Likes: 226, Downloads: 958', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base', '[{"url":"https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base","text":"OpenMOSS-Team/MOSS-Image-Base on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MOSS-Image-SFT', 'OpenMOSS', 'Model', 'Image Generation', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Image Generation model developed by OpenMOSS.', 'OpenMOSS-Team text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("OpenMOSS-Team/MOSS-Image-SFT", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("OpenMOSS-Team/MOSS-Image-SFT")', 'Trending Score: 215, Likes: 223, Downloads: 1,036', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT', '[{"url":"https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT","text":"OpenMOSS-Team/MOSS-Image-SFT on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MS COCO', 'Microsoft', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2014, '328K images, ~25GB', 'Microsoft''s benchmark dataset for object detection, segmentation, and captioning with 328K images containing 2.5M labeled object instances.', 'Images with bounding boxes, segmentation masks, keypoints, and 5 captions each.', 'from torchvision.datasets import CocoDetection
dataset = CocoDetection(
  root="./data/coco/images/train2017",
  annFile="./data/coco/annotations/instances_train2017.json"
)', 'Standard detection benchmark: mAP metric widely used in CV research', 'Object categories limited to 80, some class imbalance.', 'https://cocodataset.org/', '[{"url":"https://arxiv.org/abs/1405.0312","text":"Lin et al. (2014) - COCO Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('multimodal-knowledge-agent', 'Google DeepMind', 'Dataset', 'Computer Vision', 'Apache-2.0', 2026, 'n<1K', 'Multimodal Knowledge Agent (MKA) — 10 Showcase Examples Multimodal Knowledge Agent (MKA) is a benchmark from Google DeepMind for evaluating autonomous AI agents on co.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("google/multimodal-knowledge-agent")', 'Trending Score: 23, Likes: 27, Downloads: 2,835', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/google/multimodal-knowledge-agent', '[{"url":"https://huggingface.co/datasets/google/multimodal-knowledge-agent","text":"google/multimodal-knowledge-agent on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Murf AI', 'Murf AI', 'AI', 'Audio', 'Proprietary', 2020, 'N/A', 'An AI voice generator and text-to-speech studio offering 120+ realistic voices in 20+ languages, with a built-in editor for voiceovers and presentations.', 'Web Application (Proprietary neural TTS model with studio-grade audio processing)', 'Visit murf.ai to type or paste text, choose a voice, and generate and download audio.', 'N/A', 'Free tier has a 10-minute voice generation limit; downloads require a paid plan.', 'https://murf.ai', '[{"url":"https://murf.ai","text":"Murf AI"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Muse Ember', 'Meta AI', 'Model', 'AI Coding', 'Proprietary', 2026, '1049k Context · Available via API', 'Muse Ember is the smallest and most efficient model from Meta that’s designed for complex reasoning execution and the work agents repeat all day: tool calls, coding agent subtasks,.', 'Modern foundation model hosted on OpenRouter with native 1049k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "meta/muse-ember",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1049k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/meta/muse-ember', '[{"url":"https://openrouter.ai/meta/muse-ember","text":"Meta: Muse Ember on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Muse Wonder', 'Meta AI', 'Model', 'Multimodal', 'Proprietary', 2026, '1.05M Context · Proprietary Model', 'Meta AI''s frontier multimodal model featured on the Artificial Analysis leaderboard with an Intelligence Index of 43, Briefcase Elo of 1659, and a massive 1.05M context window.', 'Proprietary frontier neural architecture developed by Meta AI, featuring native 1.05M token window support, optimized reasoning chains, and low-latency inference throughput (143 tok/s).', 'import requests

response = requests.post(
  "https://api.metaai.com/v1/chat/completions",
  json={"model": "muse-wonder-max", "messages": [{"role": "user", "content": "Benchmark query"}]}
)', 'Intelligence Index: 43, Briefcase Elo: 1659, Accuracy: 38%, Non-Hallucination: 79%, FrontierCode: 28%, AutomationBench: 68%, TerminalBench 4: 52%, HLE Diamond: 39%, Speed: 143 tok/s, Context Window: 1.05M', 'Proprietary cloud API access via Meta AI developer platform; subject to API rate limits and token pricing ($4/M in, $20/M out).', 'https://artificialanalysis.ai/models/muse-wonder', '[{"url":"https://artificialanalysis.ai/models/muse-wonder","text":"Muse Wonder (max) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/muse-wonder/providers","text":"Muse Wonder (max) Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Muse Wonder Full', 'Meta AI', 'Model', 'Multimodal', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Meta AI''s frontier multimodal model featured on the Artificial Analysis leaderboard with an Intelligence Index of 50, Briefcase Elo of 1729, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by Meta AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (high-speed streaming).', 'import requests

response = requests.post(
  "https://api.metaai.com/v1/chat/completions",
  json={"model": "muse-wonder-full-max", "messages": [{"role": "user", "content": "Benchmark query"}]}
)', 'Intelligence Index: 50, Briefcase Elo: 1729, Accuracy: 41%, Non-Hallucination: 82%, FrontierCode: 38%, AutomationBench: 71%, TerminalBench 4: 57%, HLE Diamond: 49%, Context Window: 1M', 'Proprietary cloud API access via Meta AI developer platform; subject to API rate limits and token pricing ($0/M in, $0/M out).', 'https://artificialanalysis.ai/models/muse-wonder-full', '[{"url":"https://artificialanalysis.ai/models/muse-wonder-full","text":"Muse Wonder Full (max) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/muse-wonder-full/providers","text":"Muse Wonder Full (max) Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Muse-Spark-Open-816B-A42B', 'Meta AI', 'Model', 'Multimodal', 'Open Weights', 2026, '816B params', 'Open-weights Multimodal model developed by Meta AI.', 'meta-models image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meta-models/Muse-Spark-Open-816B-A42B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("meta-models/Muse-Spark-Open-816B-A42B")', 'Trending Score: 355, Likes: 374, Downloads: 815', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B', '[{"url":"https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B","text":"meta-models/Muse-Spark-Open-816B-A42B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MusicGen', 'Meta AI', 'Model', 'Audio', 'CC-BY-NC-4.0', 2023, '300M to 3.3B params', 'Meta''s controllable text-to-music model that generates high-quality music from text descriptions or melody conditioning.', 'Transformer-based auto-regressive language model operating on EnCodec audio tokens.', 'from audiocraft.models import MusicGen
model = MusicGen.get_pretrained(''facebook/musicgen-large'')
model.set_generation_params(duration=8)
wav = model.generate(["An upbeat jazz piano with drums"])', 'FAD: 4.93 (large model), Fréchet Audio Distance competitive with MusicLM', 'Non-commercial license, 30-second max duration natively.', 'https://github.com/facebookresearch/audiocraft', '[{"url":"https://arxiv.org/abs/2306.05284","text":"Copet et al. (2023) - MusicGen Paper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nanbeige4.3-33B', 'Nanbeige', 'Model', 'NLP', 'Apache-2.0', 2026, '33B params', 'Open-weights NLP model developed by Nanbeige.', 'Nanbeige text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Nanbeige/Nanbeige4.3-33B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Nanbeige/Nanbeige4.3-33B")', 'Trending Score: 283, Likes: 283, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Nanbeige/Nanbeige4.3-33B', '[{"url":"https://huggingface.co/Nanbeige/Nanbeige4.3-33B","text":"Nanbeige/Nanbeige4.3-33B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron 3 Ultra', 'NVIDIA', 'Model', 'NLP', 'Open Weights', 2026, '262k Context · Open Model', 'NVIDIA''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 12, Briefcase Elo of 877, and a massive 262k context window.', 'Open-weights frontier neural architecture developed by NVIDIA, featuring native 262k token window support, optimized reasoning chains, and low-latency inference throughput (153 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("NVIDIA/nemotron-3-ultra", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("NVIDIA/nemotron-3-ultra")', 'Intelligence Index: 12, Briefcase Elo: 877, Accuracy: 21%, Non-Hallucination: 77%, FrontierCode: 1%, AutomationBench: 3%, TerminalBench 4: 1%, HLE Diamond: 9%, Speed: 153 tok/s, Context Window: 262k', 'High memory requirements for local execution (262k context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/nvidia-nemotron-3-ultra-550b-a55b', '[{"url":"https://artificialanalysis.ai/models/nvidia-nemotron-3-ultra-550b-a55b","text":"Nemotron 3 Ultra on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/nvidia-nemotron-3-ultra-550b-a55b/providers","text":"Nemotron 3 Ultra Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron 3.5 Lightning', 'NVIDIA', 'Model', 'Research', 'Open Weights', 2026, '1000k Context · Open Model', 'Frontier Research model by NVIDIA benchmarked on Artificial Analysis with an Intelligence Index of 5.5 and a verified 1000k Context window.', 'Open-weights frontier neural architecture developed by NVIDIA, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/nemotron-3-5-lightning', 'Context Window: 1000k Context, Intelligence Index: 5.5, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/nemotron-3-5-lightning', '[{"url":"https://artificialanalysis.ai/models/nemotron-3-5-lightning","text":"Nemotron 3.5 Lightning on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/nemotron-3-5-lightning/providers","text":"Nemotron 3.5 Lightning Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron 3.5 Super VL', 'NVIDIA', 'Model', 'Multimodal', 'Open Weights', 2026, '1M Context · Open Model', 'NVIDIA''s frontier multimodal model featured on the Artificial Analysis leaderboard with an Intelligence Index of 14, Briefcase Elo of 999, and a massive 1M context window.', 'Open-weights frontier neural architecture developed by NVIDIA, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (474 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("NVIDIA/nemotron-3-5-super-vl", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("NVIDIA/nemotron-3-5-super-vl")', 'Intelligence Index: 14, Briefcase Elo: 999, Accuracy: 21%, Non-Hallucination: 70%, FrontierCode: 6%, AutomationBench: 15%, TerminalBench 4: 0%, HLE Diamond: 9%, Speed: 474 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/nemotron-3-5-super-vl', '[{"url":"https://artificialanalysis.ai/models/nemotron-3-5-super-vl","text":"Nemotron 3.5 Super VL on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/nemotron-3-5-super-vl/providers","text":"Nemotron 3.5 Super VL Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-3-Diarization', 'NVIDIA', 'Model', 'Audio', 'OpenMDW-1.1', 2026, 'Open Weights', 'Open-weights Audio model developed by NVIDIA.', 'nvidia voice activity detection architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/Nemotron-3-Diarization", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/Nemotron-3-Diarization")', 'Trending Score: 398, Likes: 565, Downloads: 36,386', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/Nemotron-3-Diarization', '[{"url":"https://huggingface.co/nvidia/Nemotron-3-Diarization","text":"nvidia/Nemotron-3-Diarization on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-Labs-Image-30B-A3B', 'NVIDIA', 'Model', 'Image Generation', 'Open Weights', 2026, '30B params', 'Open-weights Image Generation model developed by NVIDIA.', 'nvidia text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/Nemotron-Labs-Image-30B-A3B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/Nemotron-Labs-Image-30B-A3B")', 'Trending Score: 146, Likes: 176, Downloads: 218', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/Nemotron-Labs-Image-30B-A3B', '[{"url":"https://huggingface.co/nvidia/Nemotron-Labs-Image-30B-A3B","text":"nvidia/Nemotron-Labs-Image-30B-A3B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-Personas-Finance-Japan', 'NVIDIA', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '1M<n<10M', 'Nemotron-Personas-Finance-Japan 現実世界の分布に基づいた金融に特化したペルソナ生成のための複合AIアプローチ データセット概要 (Dataset Overview): Nemotron-Personas-Finance-Japan は、日本における.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Nemotron-Personas-Finance-Japan")', 'Trending Score: 18, Likes: 19, Downloads: 1,732', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Finance-Japan', '[{"url":"https://huggingface.co/datasets/nvidia/Nemotron-Personas-Finance-Japan","text":"nvidia/Nemotron-Personas-Finance-Japan on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-Personas-Germany', 'NVIDIA', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '1M<n<10M', 'German synthetic persona dataset generated via NVIDIA''s Compound-AI approach grounded in real demographic distributions.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Nemotron-Personas-Germany")', 'Trending Score: 18, Likes: 20, Downloads: 113', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Germany', '[{"url":"https://huggingface.co/datasets/nvidia/Nemotron-Personas-Germany","text":"nvidia/Nemotron-Personas-Germany on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-Personas-UK', 'NVIDIA', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '1M<n<10M', 'Nemotron-Personas-UK A compound AI approach to personas grounded in real-world distributions Dataset Overview Nemotron-Personas-UK is an ope.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Nemotron-Personas-UK")', 'Trending Score: 21, Likes: 25, Downloads: 496', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-UK', '[{"url":"https://huggingface.co/datasets/nvidia/Nemotron-Personas-UK","text":"nvidia/Nemotron-Personas-UK on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-Personas-Vietnam', 'NVIDIA', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '1M<n<10M', 'Nemotron-Personas-Vietnam Hệ thống AI kết hợp để tạo personas tổng hợp dựa trên phân bố thực tế của Việt Nam A compound AI approach to personas grounded.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Nemotron-Personas-Vietnam")', 'Trending Score: 34, Likes: 103, Downloads: 1,788', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Vietnam', '[{"url":"https://huggingface.co/datasets/nvidia/Nemotron-Personas-Vietnam","text":"nvidia/Nemotron-Personas-Vietnam on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-SFT-Agentic-Finance-v1', 'NVIDIA', 'Dataset', 'NLP', 'Open Data', 2026, '1K<n<10K', 'This dataset contains 7,878 multi-turn tool-calling examples for training financial reasoning agents. It covers Numerical Reasoning, Financial Mo.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Nemotron-SFT-Agentic-Finance-v1")', 'Trending Score: 17, Likes: 20, Downloads: 1,215', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Nemotron-SFT-Agentic-Finance-v1', '[{"url":"https://huggingface.co/datasets/nvidia/Nemotron-SFT-Agentic-Finance-v1","text":"nvidia/Nemotron-SFT-Agentic-Finance-v1 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NeoHorse-1-4B', 'TokenRhythm', 'Model', 'NLP', 'Apache-2.0', 2026, '4B params', 'Open-weights NLP model developed by TokenRhythm.', 'TokenRhythm text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("TokenRhythm/NeoHorse-1-4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("TokenRhythm/NeoHorse-1-4B")', 'Trending Score: 392, Likes: 2,056, Downloads: 11,904', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/TokenRhythm/NeoHorse-1-4B', '[{"url":"https://huggingface.co/TokenRhythm/NeoHorse-1-4B","text":"TokenRhythm/NeoHorse-1-4B on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nex-N2.5-mini', 'Nex AGI', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by Nex AGI.', 'nex-agi text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nex-agi/Nex-N2.5-mini", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nex-agi/Nex-N2.5-mini")', 'Trending Score: 539, Likes: 692, Downloads: 3,121', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nex-agi/Nex-N2.5-mini', '[{"url":"https://huggingface.co/nex-agi/Nex-N2.5-mini","text":"nex-agi/Nex-N2.5-mini on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nex-N2.5-Pro', 'Nex AGI', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by Nex AGI.', 'nex-agi text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nex-agi/Nex-N2.5-Pro", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nex-agi/Nex-N2.5-Pro")', 'Trending Score: 479, Likes: 624, Downloads: 30,289', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nex-agi/Nex-N2.5-Pro', '[{"url":"https://huggingface.co/nex-agi/Nex-N2.5-Pro","text":"nex-agi/Nex-N2.5-Pro on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nex-N2.6', 'Nex AGI', 'Model', 'AI Coding', 'Proprietary', 2026, '262k Context · Available via API', 'Nex-N2.6 is an agentic model from Nex AGI, built on GLM-5.3-Flash with about 321B parameters. It is suited for computer use, co.', 'Modern foundation model hosted on OpenRouter with native 262k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "nex-agi/nex-n2.6",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 262k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/nex-agi/nex-n2.6', '[{"url":"https://openrouter.ai/nex-agi/nex-n2.6","text":"Nex AGI: Nex-N2.6 on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NightCafe', 'NightCafe Studio', 'AI', 'Image Generation', 'Proprietary', 2019, 'N/A', 'An AI art generator and social community platform with multiple generation algorithms, daily free credits, and art challenges for creators.', 'Web Application (Supports Stable Diffusion, DALL·E, and other generation backends)', 'Visit creator.nightcafe.studio to generate images and participate in the community.', 'N/A', 'Limited free credits; best results often require purchased credit packs.', 'https://creator.nightcafe.studio', '[{"url":"https://creator.nightcafe.studio","text":"NightCafe Creator"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('North Mini Code', 'Cohere', 'Model', 'AI Coding', 'Open Weights', 2026, '256k Context · Open Model', 'Frontier AI Coding model by Cohere benchmarked on Artificial Analysis with an Intelligence Index of 3.4 and a verified 256k Context window.', 'Open-weights frontier neural architecture developed by Cohere, featuring native 256k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/north-mini-code', 'Context Window: 256k Context, Intelligence Index: 3.4, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/north-mini-code', '[{"url":"https://artificialanalysis.ai/models/north-mini-code","text":"North Mini Code on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/north-mini-code/providers","text":"North Mini Code Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NotebookLM', 'Google DeepMind', 'AI', 'Productivity', 'Proprietary', 2024, 'N/A', 'Google''s personalized AI research assistant powered by Gemini 1.5 Pro, featuring Audio Overviews that turn uploaded documents into dynamic conversational podcast discussions.', 'Grounded RAG pipeline powered by Gemini 1.5 Pro long context and conversational TTS.', 'Upload research papers, meeting notes, or PDFs at notebooklm.google.com, then click ''Audio Overview'' to generate an engaging AI podcast explanation.', 'Zero hallucination rate on user source documents through strict ground-truth attribution.', 'Outputs strictly restricted to user uploaded source materials.', 'https://notebooklm.google.com', '[{"url":"https://notebooklm.google.com","text":"NotebookLM"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Notion AI', 'Notion Labs', 'AI', 'Productivity', 'Proprietary', 2023, 'N/A', 'An AI writing and productivity assistant built directly into Notion, capable of drafting, summarizing, translating, and brainstorming within your workspace.', 'SaaS Integration (Powered by OpenAI GPT-4 and Anthropic Claude models)', 'Access inside any Notion workspace by pressing the spacebar or typing /AI on any page.', 'N/A', 'Requires a Notion AI add-on subscription; dependent on third-party LLM providers.', 'https://www.notion.so/product/ai', '[{"url":"https://www.notion.so/product/ai","text":"Notion AI"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nova 2.0 Omni', 'Amazon Web Services', 'Model', 'Multimodal', 'Proprietary', 2026, '1000k Context · Proprietary Model', 'Frontier Multimodal model by Amazon benchmarked on Artificial Analysis and a verified 1000k Context window.', 'Proprietary frontier neural architecture developed by Amazon, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/nova-2-0-omni', 'Context Window: 1000k Context, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/nova-2-0-omni', '[{"url":"https://artificialanalysis.ai/models/nova-2-0-omni","text":"Nova 2.0 Omni on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/nova-2-0-omni/providers","text":"Nova 2.0 Omni Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nova 2.0 Pro Preview', 'Amazon Web Services', 'Model', 'Research', 'Proprietary', 2026, '256k Context · Proprietary Model', 'Frontier Research model by Amazon benchmarked on Artificial Analysis and a verified 256k Context window.', 'Proprietary frontier neural architecture developed by Amazon, featuring native 256k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/nova-2-0-pro-preview', 'Context Window: 256k Context, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/nova-2-0-pro-preview', '[{"url":"https://artificialanalysis.ai/models/nova-2-0-pro-preview","text":"Nova 2.0 Pro Preview on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/nova-2-0-pro-preview/providers","text":"Nova 2.0 Pro Preview Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA Cosmos', 'NVIDIA', 'Model', 'Computer Vision', 'Custom', 2025, 'Physical AI Suite', 'NVIDIA''s flagship physical AI and world foundation models designed to simulate physical dynamics, predict camera trajectories, and accelerate robotics and autonomous vehicle simulation.', 'Continuous and Discrete Video Autoencoders with physical dynamics conditioning and diffusion generation on NVIDIA Blackwell architecture.', 'from cosmos_tokenize import VideoTokenizer
tokenizer = VideoTokenizer.from_pretrained("nvidia/Cosmos-1.0-Tokenizer-CV8x8x8")', 'Physical Simulation Realism: 92.4%, Robotics Trajectory Prediction: 88.1%', 'Optimized specifically for NVIDIA GPU hardware and Omniverse / robotics simulation workflows.', 'https://developer.nvidia.com/cosmos', '[{"url":"https://developer.nvidia.com/cosmos","text":"NVIDIA Cosmos World Foundation Models"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA Nemotron 3 Nano 30B A3B', 'NVIDIA', 'Model', 'NLP', 'Open Weights', 2026, '1000k Context · Open Model', 'Frontier NLP model by NVIDIA benchmarked on Artificial Analysis and a verified 1000k Context window.', 'Open-weights frontier neural architecture developed by NVIDIA, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/nvidia-nemotron-3-nano-30b-a3b', 'Context Window: 1000k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/nvidia-nemotron-3-nano-30b-a3b', '[{"url":"https://artificialanalysis.ai/models/nvidia-nemotron-3-nano-30b-a3b","text":"NVIDIA Nemotron 3 Nano 30B A3B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/nvidia-nemotron-3-nano-30b-a3b/providers","text":"NVIDIA Nemotron 3 Nano 30B A3B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA Nemotron Nano 9B V2', 'NVIDIA', 'Model', 'NLP', 'Open Weights', 2026, '131k Context · Open Model', 'Frontier NLP model by NVIDIA benchmarked on Artificial Analysis and a verified 131k Context window.', 'Open-weights frontier neural architecture developed by NVIDIA, featuring native 131k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/nvidia-nemotron-nano-9b-v2', 'Context Window: 131k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/nvidia-nemotron-nano-9b-v2', '[{"url":"https://artificialanalysis.ai/models/nvidia-nemotron-nano-9b-v2","text":"NVIDIA Nemotron Nano 9B V2 on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/nvidia-nemotron-nano-9b-v2/providers","text":"NVIDIA Nemotron Nano 9B V2 Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA-Nemotron-3.5-Bolt-E4B-4GB', 'NVIDIA', 'Model', 'NLP', 'Open Weights', 2026, '4B params', 'Open-weights NLP model developed by NVIDIA.', 'nvidia text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB")', 'Trending Score: 248, Likes: 267, Downloads: 64,263', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB', '[{"url":"https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB","text":"nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA-Nemotron-3.5-Transcribe-30B-A4B', 'NVIDIA', 'Model', 'Audio', 'Open Weights', 2026, '30B params', 'Open-weights Audio model developed by NVIDIA.', 'nvidia automatic speech recognition architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B")', 'Trending Score: 306, Likes: 314, Downloads: 4,276', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B', '[{"url":"https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B","text":"nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16', 'NVIDIA', 'Model', 'NLP', 'Open Weights', 2026, '4B params', 'Open-weights NLP model developed by NVIDIA.', 'nvidia text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16")', 'Trending Score: 145, Likes: 146, Downloads: 2,480', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16', '[{"url":"https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16","text":"nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('o1 (OpenAI)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2024, 'N/A', 'OpenAI''s reasoning-focused model that ''thinks before it answers'' using chain-of-thought reasoning, excelling at math, science, and coding problems.', 'Large-scale transformer with reinforcement learning on chain-of-thought reasoning traces.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="o1-preview",
  messages=[{"role": "user", "content": "Solve this complex math proof."}]
)', 'AIME: 83.3%, GPQA Diamond: 78.0%', 'Slower than GPT-4o due to extended thinking, no image output, higher cost.', 'https://openai.com/o1', '[{"url":"https://openai.com/index/openai-o1-system-card/","text":"OpenAI o1 System Card"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('o3', 'OpenAI', 'Model', 'AI Coding', 'Proprietary', 2025, 'Frontier Reasoning', 'OpenAI''s full-scale frontier reasoning model that achieves unprecedented breakthroughs on FrontierMath, competitive coding (Codeforces 2727 Grandmaster level), and ARC-AGI via test-time reasoning compute scaling.', 'Deep reinforcement learning foundation model with scalable chain-of-thought exploration, backtracking, and algorithmic verification.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="o3",
  reasoning_effort="high",
  messages=[{"role": "user", "content": "Solve this unsolved open conjecture step by step."}]
)', 'FrontierMath: 25.2%, Codeforces Rating: 2727 (Grandmaster), ARC-AGI: 87.5%, SWE-bench Verified: 71.7%', 'High latency and API cost during high-effort reasoning; text-only inference.', 'https://openai.com', '[{"url":"https://openai.com","text":"OpenAI 12 Days of OpenAI: o3 Preview"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('o3-mini', 'OpenAI', 'Model', 'AI Coding', 'Proprietary', 2025, 'N/A', 'OpenAI''s cost-efficient STEM, math, and coding reasoning model with selectable reasoning effort levels (low, medium, high) and function calling.', 'Reinforcement learning-trained reasoning model optimized for coding and STEM.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="o3-mini",
  reasoning_effort="medium",
  messages=[{"role": "user", "content": "Design an optimal LRU cache in Rust."}]
)', 'AIME 2024: 87.3%, Codeforces Rating: 2088, GPQA: 79.7%', 'Text only (no image modality input); reasoning adds latency.', 'https://openai.com', '[{"url":"https://openai.com/index/openai-o3-mini/","text":"OpenAI o3-mini Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OCRia-nano-1', 'LlamaIndex', 'Model', 'Computer Vision', 'Open Weights', 2026, 'Open Weights', 'Compact open-weights document OCR and structured text extraction model developed by LlamaIndex.', 'llamaindex image to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("llamaindex/OCRia-nano-1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("llamaindex/OCRia-nano-1")', 'Trending Score: 99, Likes: 107, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/llamaindex/OCRia-nano-1', '[{"url":"https://huggingface.co/llamaindex/OCRia-nano-1","text":"llamaindex/OCRia-nano-1 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ollama', 'Ollama', 'Framework', 'MLOps', 'MIT', 2023, 'N/A', 'A tool for running large language models locally on your Mac, Linux, or Windows machine with a simple CLI and REST API.', 'Go-based server wrapping llama.cpp inference backend with a Docker-like model management CLI.', '# Install and run from terminal
$ ollama pull llama3
$ ollama run llama3

# Or use the REST API
import requests
response = requests.post(''http://localhost:11434/api/generate'',
  json={"model": "llama3", "prompt": "Why is the sky blue?", "stream": False})', 'N/A — inference speed depends on hardware', 'Local hardware constraints limit model size, not for production serving at scale.', 'https://ollama.com/', '[{"url":"https://github.com/ollama/ollama","text":"Ollama GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OLMo 2 13B', 'Allen Institute for AI', 'Model', 'NLP', 'Apache-2.0', 2024, '13B Parameters · 4k Context', 'Allen Institute for AI''s completely open frontier language model, providing open weights, pretraining code, full dataset mixes (Dolma 1.7), and evaluation recipes for transparent scientific research.', 'Non-gated SwiGLU transformer decoder with rotary position embeddings (RoPE) and RMSNorm, trained transparently on Ai2''s Dolma corpus.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("allenai/OLMo-2-1124-13B-Instruct", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("allenai/OLMo-2-1124-13B-Instruct")', 'MMLU: 68.2%, GSM8k: 76.5%, HumanEval: 61.0%, ARC-Challenge: 86.4%', 'Native pretraining context window of 4,096 tokens; requires context extension techniques for long-document tasks.', 'https://allenai.org/olmo', '[{"url":"https://allenai.org/olmo","text":"Allen Institute for AI OLMo Research Platform"},{"url":"https://huggingface.co/allenai/OLMo-2-1124-13B-Instruct","text":"OLMo 2 13B Instruct on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenAI Platform', 'OpenAI', 'Platform', 'MLOps', 'Proprietary', 2020, 'N/A', 'OpenAI''s developer API platform providing access to GPT-4, DALL-E, Whisper, embeddings, and fine-tuning capabilities.', 'REST API with model routing, rate limiting, and usage tracking.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_API_KEY")
response = client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role": "user", "content": "Hello!"}]
)', 'N/A', 'Pay-per-token pricing, rate limits on free tier, proprietary.', 'https://platform.openai.com', '[{"url":"https://platform.openai.com/docs","text":"OpenAI API Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenHands', 'All Hands AI', 'AI', 'AI Coding', 'MIT', 2024, 'N/A', 'Open-source autonomous AI software developer (formerly OpenDevin) that writes code, fixes bugs, and executes terminal commands across codebases.', 'Docker-based sandboxed agent environment supporting various LLM providers.', 'docker run -it --pull=always -e SANDBOX_USER_ID=$(id -u) -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 ghcr.io/all-hands-ai/openhands:latest', 'Top open-source agent scores on SWE-bench Verified (53%+ with frontier models).', 'Requires local Docker daemon setup for execution sandboxing.', 'https://github.com/All-Hands-AI/OpenHands', '[{"url":"https://github.com/All-Hands-AI/OpenHands","text":"OpenHands Repository"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenHermes 2.5', 'Teknium', 'Dataset', 'NLP', 'MIT', 2023, '1,001,551 examples', 'Curated dataset of 1 million diverse conversation turns, code snippets, reasoning chains, and roleplay examples used to fine-tune state-of-the-art open models.', 'Curated collection of synthetic and human-annotated instruction datasets (ShareGPT, Airoboros, GPTeacher).', 'from datasets import load_dataset
ds = load_dataset("teknium/OpenHermes-2.5", split="train")', 'Trained OpenHermes-2.5-Mistral-7B to outperform standard 70B models in 2023.', 'Varied data sources include diverse subjective annotation quality.', 'https://huggingface.co/datasets/teknium/OpenHermes-2.5', '[{"url":"https://huggingface.co/datasets/teknium/OpenHermes-2.5","text":"OpenHermes 2.5 Dataset"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenRouter', 'OpenRouter', 'Platform', 'MLOps', 'Proprietary', 2024, '200+ models', 'Unified API gateway and marketplace routing to 200+ AI models across dozens of providers with automatic failover, cost optimization, and open community stats.', 'Low-latency global edge API router with multi-provider fallback.', 'fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "deepseek/deepseek-r1",
    "messages": [{"role": "user", "content": "Hello!"}]
  })
})', 'Industry leader in model choice and real-time LLM token throughput telemetry.', 'Upstream provider outages can impact specific model routes.', 'https://openrouter.ai', '[{"url":"https://openrouter.ai","text":"OpenRouter"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenVuln', 'Zhipu AI (THUDM)', 'Platform', 'AI Coding', 'Community Hosted', 2026, 'DOCKER Platform', 'Security vulnerability analysis and code auditing benchmark and workspace by Zhipu AI.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/zai-org/OpenVuln', 'Trending Score: 66, Community Likes: 196', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/zai-org/OpenVuln', '[{"url":"https://huggingface.co/spaces/zai-org/OpenVuln","text":"zai-org/OpenVuln on Hugging Face Spaces"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OpenWebText', 'EleutherAI / Community', 'Dataset', 'NLP', 'CC0-1.0', 2019, '38GB (~8M documents)', 'An open-source recreation of OpenAI''s WebText dataset (used to train GPT-2), scraped from Reddit-upvoted URLs.', 'Web text from all outbound Reddit links with 3+ upvotes, scraped and deduplicated.', 'from datasets import load_dataset
dataset = load_dataset("openwebtext", split="train")', 'Used as training data for GPT-2 replications', 'English-only, Reddit bias toward certain demographics and topics.', 'https://huggingface.co/datasets/openwebtext', '[{"url":"https://huggingface.co/datasets/openwebtext","text":"OpenWebText on HuggingFace"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ornith-1.5-122B', 'Ornith AI', 'Model', 'NLP', 'MIT', 2026, '122B params', 'Open-weights NLP model developed by Ornith AI.', 'ornith-ai text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ornith-ai/Ornith-1.5-122B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ornith-ai/Ornith-1.5-122B")', 'Trending Score: 146, Likes: 151, Downloads: 14,049', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ornith-ai/Ornith-1.5-122B', '[{"url":"https://huggingface.co/ornith-ai/Ornith-1.5-122B","text":"ornith-ai/Ornith-1.5-122B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Otter.ai', 'Otter.ai', 'AI', 'Productivity', 'Proprietary', 2016, 'N/A', 'An AI meeting assistant that automatically transcribes, summarizes, and generates action items from voice conversations and meetings in real time.', 'Web / Mobile Application (Proprietary ASR + NLP summarization pipeline)', 'Visit otter.ai or install the mobile app; connect to Zoom, Google Meet, or MS Teams for auto-join.', 'N/A', 'Free tier limited to 300 minutes/month; accuracy drops with heavy accents or noisy audio.', 'https://otter.ai', '[{"url":"https://otter.ai","text":"Otter.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Outlines', 'dottxt', 'Framework', 'MLOps', 'Apache-2.0', 2024, 'N/A', 'Guided generation framework from.txt that forces LLMs to generate text conforming strictly to regular expressions, JSON schemas, or context-free grammars with mathematical guarantee.', 'Finite-state machine (FSM) token mask generator for autoregressive sampling.', 'import outlines
model = outlines.models.transformers("meta-llama/Llama-3.2-3B")
generator = outlines.generate.json(model, UserSchema)
result = generator("Extract user details from text")', 'Zero JSON syntax errors with negligible sampling runtime overhead.', 'Requires tokenizer vocabulary and logit indexing access.', 'https://github.com/dottxt-ai/outlines', '[{"url":"https://arxiv.org/abs/2307.09702","text":"Outlines Paper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('P-Image-OSS', 'Pruna AI', 'Platform', 'Image Generation', 'Community Hosted', 2026, 'GRADIO Platform', 'Accelerated open-source visual synthesis studio by Pruna AI delivering sub-second diffusion inference.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/PrunaAI/P-Image-OSS', 'Trending Score: 54, Community Likes: 185', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/PrunaAI/P-Image-OSS', '[{"url":"https://huggingface.co/spaces/PrunaAI/P-Image-OSS","text":"PrunaAI/P-Image-OSS on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PaliGemma 2', 'Google DeepMind', 'Model', 'Multimodal', 'Gemma License', 2024, '3B / 10B / 28B Parameters', 'Google''s open vision-language foundation model combining SigLIP-So400m vision encoder with Gemma 2 language models across 3B, 10B, and 28B parameter configurations for visual reasoning, captioning, and OCR.', 'Dual-encoder cross-attention architecture uniting a SigLIP vision transformer with Gemma 2 autoregressive transformer decoder supporting high-resolution image tokens.', 'from transformers import PaliGemmaForConditionalGeneration, AutoProcessor

model = PaliGemmaForConditionalGeneration.from_pretrained("google/paligemma2-10b-pt-448", device_map="auto")
processor = AutoProcessor.from_pretrained("google/paligemma2-10b-pt-448")', 'DocVQA: 93.3%, TextVQA: 81.2%, ChartQA: 85.0%, ScienceQA: 96.1%', 'Governed by Google Gemma Terms of Use; resolution tokens increase compute and memory overhead on 448x448 input variants.', 'https://github.com/google-research/big_vision', '[{"url":"https://github.com/google-research/big_vision","text":"Google Big Vision PaliGemma 2 Release"},{"url":"https://huggingface.co/collections/google/paligemma-2-release-675030252119420068352605","text":"PaliGemma 2 Collection on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PaLM 2', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2023, 'Unknown (multiple sizes: Gecko, Otter, Bison, Unicorn)', 'Google''s multilingual, reasoning-focused language model powering Bard and many Google Workspace AI features.', 'Transformer trained with a compute-optimal approach across multilingual and code data.', '# Access via Google AI Studio or Vertex AI
import vertexai
from vertexai.language_models import TextGenerationModel
vertexai.init(project="YOUR_PROJECT", location="us-central1")
model = TextGenerationModel.from_pretrained("text-bison@002")
response = model.predict("Write a poem about AI.")', 'MMLU: 78.3%, multilingual reasoning leader in 2023', 'Superseded by Gemini, proprietary API.', 'https://ai.google/discover/palm2', '[{"url":"https://arxiv.org/abs/2305.10403","text":"PaLM 2 Technical Report"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PAN2', 'Institute of Foundation Models', 'Model', 'Multimodal', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Multimodal model developed by Institute of Foundation Models.', 'IFM image text to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("IFM/PAN2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("IFM/PAN2")', 'Trending Score: 160, Likes: 180, Downloads: 374', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/IFM/PAN2', '[{"url":"https://huggingface.co/IFM/PAN2","text":"IFM/PAN2 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ParseBench-2', 'LlamaIndex', 'Dataset', 'NLP', 'Apache-2.0', 2026, '1K<n<10K', 'ParseBench-2 is a document parsing benchmark that combines broad coverage of real-world.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("llamaindex/ParseBench-2")', 'Trending Score: 18, Likes: 20, Downloads: 30,698', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/llamaindex/ParseBench-2', '[{"url":"https://huggingface.co/datasets/llamaindex/ParseBench-2","text":"llamaindex/ParseBench-2 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Perplexity', 'Perplexity', 'AI', 'NLP', 'Proprietary', 2022, 'N/A', 'An AI-powered search engine that provides cited answers by searching the web in real-time, functioning as an intelligent research assistant.', 'Answer Engine / Conversational Agent (Powered by various LLMs and search indices)', 'Visit perplexity.ai to search and interact.', 'N/A', 'Sometimes cites incorrect sources or misunderstands query intent.', 'https://www.perplexity.ai', '[{"url":"https://www.perplexity.ai","text":"Perplexity AI"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Phi-3 Mini', 'Microsoft', 'Model', 'NLP', 'MIT', 2024, '3.8B params', 'Microsoft''s compact 3.8B parameter model that punches far above its weight class, outperforming models 5x its size on reasoning benchmarks.', 'Dense transformer decoder trained on heavily curated ''textbook-quality'' data.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("microsoft/Phi-3-mini-4k-instruct")
tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3-mini-4k-instruct")', 'MMLU: 68.8%, outperforms Mistral 7B on many tasks', 'Small size limits knowledge breadth, not suitable for long-form tasks.', 'https://azure.microsoft.com/en-us/products/phi-3', '[{"url":"https://arxiv.org/abs/2404.14219","text":"Phi-3 Technical Report"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Phi-3.5 MoE', 'Microsoft', 'Model', 'NLP', 'MIT', 2024, '41.9B (6.6B active)', 'Lightweight Mixture-of-Experts model from Microsoft activating 2 out of 16 experts (6.6B active params from 41.9B total), with 128k context support.', '16-expert MoE architecture with 128k context window.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("microsoft/Phi-3.5-MoE-instruct", trust_remote_code=True, device_map="auto")', 'MMLU: 78.9%, GSM8K: 85.1%', 'Requires distributed tensor routing for optimal MoE parallelization.', 'https://huggingface.co/microsoft/Phi-3.5-MoE-instruct', '[{"url":"https://azure.microsoft.com/en-us/blog/introducing-phi-3-5-small-language-models/","text":"Phi-3.5 Announcement"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Phi-4 (14B)', 'Microsoft', 'Model', 'Research', 'MIT', 2024, '14.7B params', 'Microsoft''s 14B parameter state-of-the-art small reasoning model trained with highly synthetic, curated datasets for outsized math and science reasoning.', 'Dense Transformer trained with synthetic textbook data and multi-agent debate.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("microsoft/phi-4", device_map="auto")', 'MMLU: 84.8%, MATH-500: 80.4%, GPQA: 56.1%', 'Smaller parameter capacity limits broad factual knowledge retrieval.', 'https://huggingface.co/microsoft/phi-4', '[{"url":"https://arxiv.org/abs/2412.08905","text":"Phi-4 Technical Report"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Phi-4 Multimodal Instruct', 'Microsoft', 'Model', 'NLP', 'Open Weights', 2026, '128k Context · Open Model', 'Frontier NLP model by Microsoft benchmarked on Artificial Analysis and a verified 128k Context window.', 'Open-weights frontier neural architecture developed by Microsoft, featuring native 128k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/phi-4-multimodal', 'Context Window: 128k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/phi-4-multimodal', '[{"url":"https://artificialanalysis.ai/models/phi-4-multimodal","text":"Phi-4 Multimodal Instruct on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/phi-4-multimodal/providers","text":"Phi-4 Multimodal Instruct Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Phind', 'Phind', 'AI', 'AI Coding', 'Proprietary', 2023, 'N/A', 'AI search engine and pair programmer tailored specifically for developers, providing cited code snippets, documentation references, and terminal debugging.', 'Custom 70B MoE search model paired with live web and documentation scraping index.', 'Visit phind.com and query "How to configure SSL in NGINX reverse proxy with Certbot in Docker".', 'High developer satisfaction for complex programming queries and library documentation search.', 'Focused on technical and developer search queries.', 'https://www.phind.com', '[{"url":"https://www.phind.com","text":"Phind"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('phonon', 'Gradium', 'Platform', 'Audio', 'Community Hosted', 2026, 'STATIC Platform', 'Low-latency interactive speech and audio synthesis model showcase by Gradium.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/gradium/phonon', 'Trending Score: 47, Community Likes: 69', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/gradium/phonon', '[{"url":"https://huggingface.co/spaces/gradium/phonon","text":"gradium/phonon on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('physical-engineerings-last-exam', 'Google DeepMind', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, 'n<1K', 'Physical-Engineering’s Last Exam (Dev Set) Physical-Engineering’s Last Exam (PLE) is a benchmark of long-horizon engineering tasks built by licensed practicing engine.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("google/physical-engineerings-last-exam")', 'Trending Score: 17, Likes: 33, Downloads: 41,085', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/google/physical-engineerings-last-exam', '[{"url":"https://huggingface.co/datasets/google/physical-engineerings-last-exam","text":"google/physical-engineerings-last-exam on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PhysicalAI-Autonomous-Vehicles', 'NVIDIA', 'Dataset', 'NLP', 'Open Data', 2026, 'Curated Dataset', 'PHYSICAL AI AUTONOMOUS VEHICLES The PhysicalAI-Autonomous-Vehicles dataset provides one of the largest, geographically diverse collections of multi-sensor data empowe.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/PhysicalAI-Autonomous-Vehicles")', 'Trending Score: 18, Likes: 1,206, Downloads: 265,315', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/PhysicalAI-Autonomous-Vehicles', '[{"url":"https://huggingface.co/datasets/nvidia/PhysicalAI-Autonomous-Vehicles","text":"nvidia/PhysicalAI-Autonomous-Vehicles on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PhysicalAI-Autonomous-Vehicles-Foundation4D', 'NVIDIA', 'Dataset', 'NLP', 'Open Data', 2026, 'Curated Dataset', 'PhysicalAI Autonomous Vehicles - Foundation4D Dataset Description: This release extends NVIDIA’s existing public PhysicalAI-Autonomous-Vehicles dataset w.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/PhysicalAI-Autonomous-Vehicles-Foundation4D")', 'Trending Score: 22, Likes: 28, Downloads: 1,496', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/PhysicalAI-Autonomous-Vehicles-Foundation4D', '[{"url":"https://huggingface.co/datasets/nvidia/PhysicalAI-Autonomous-Vehicles-Foundation4D","text":"nvidia/PhysicalAI-Autonomous-Vehicles-Foundation4D on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PhysicalAI-Human-1M-100K', 'NVIDIA', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, 'n<1K', 'Across AI, a common route to scale is distilling human experience into models: what people write, see, and create. The physical AI analogue is sensorized human data—egocentric vid.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/PhysicalAI-Human-1M-100K")', 'Trending Score: 18, Likes: 18, Downloads: 162', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/PhysicalAI-Human-1M-100K', '[{"url":"https://huggingface.co/datasets/nvidia/PhysicalAI-Human-1M-100K","text":"nvidia/PhysicalAI-Human-1M-100K on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pi', 'Inflection AI', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'A supportive and empathetic conversational AI assistant designed to be a companion rather than just a tool.', 'Web Application / Conversational Agent (Powered by Inflection models)', 'Visit pi.ai to interact.', 'N/A', 'Prioritizes conversational style over complex reasoning or coding tasks.', 'https://pi.ai', '[{"url":"https://inflection.ai/press/meet-pi","text":"Meet Pi"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pika Labs', 'Pika Labs', 'AI', 'Video Generation', 'Proprietary', 2023, 'N/A', 'An AI video generation and editing tool that can create and modify short video clips from text or image prompts, known for fun and accessible creative outputs.', 'Web Application / Discord Bot (Proprietary video generation model — Pika 1.0/2.0)', 'Visit pika.art to generate and edit videos from text or image prompts.', 'N/A', 'Short maximum clip duration; free tier has watermarks and limited generation credits.', 'https://pika.art', '[{"url":"https://pika.art","text":"Pika Labs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pika-H3-Flex', 'Pika Labs', 'Model', 'Video Generation', 'Open Weights', 2026, 'Open Weights', 'Open-weights Video Generation model developed by Pika Labs.', 'Pika-Labs image to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Pika-Labs/Pika-H3-Flex", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Pika-Labs/Pika-H3-Flex")', 'Trending Score: 198, Likes: 201, Downloads: 87', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Pika-Labs/Pika-H3-Flex', '[{"url":"https://huggingface.co/Pika-Labs/Pika-H3-Flex","text":"Pika-Labs/Pika-H3-Flex on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pinecone', 'Pinecone', 'Platform', 'MLOps', 'Proprietary', 2019, 'N/A', 'A managed vector database purpose-built for AI applications, enabling fast similarity search at scale for RAG, semantic search, and recommendation systems.', 'Managed ANNS (Approximate Nearest Neighbor Search) vector store with hybrid search support.', 'from pinecone import Pinecone, ServerlessSpec
pc = Pinecone(api_key="YOUR_API_KEY")
pc.create_index("my-index", dimension=1536, metric="cosine", spec=ServerlessSpec(cloud=''aws'', region=''us-east-1''))
index = pc.Index("my-index")
index.upsert(vectors=[("vec1", [0.1, 0.2], {"text": "hello"})])', 'Sub-10ms query latency at billion-vector scale', 'Proprietary, can be expensive at scale vs. self-hosted alternatives.', 'https://www.pinecone.io/', '[{"url":"https://docs.pinecone.io/","text":"Pinecone Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pixtral 12B', 'Mistral AI', 'Model', 'Multimodal', 'Apache-2.0', 2024, '12B Parameters · 128k Context', 'Mistral AI''s multimodal 12B frontier-class vision-language model trained natively with an integrated 400M parameter vision encoder and 12B decoder, supporting variable image resolutions and a 128k context window.', 'Multimodal autoregressive decoder with a native 400M vision encoder directly ingesting arbitrary aspect ratio images without downsampling.', 'from vllm import LLM

llm = LLM(model="mistralai/Pixtral-12B-2409", max_model_len=8192)
outputs = llm.generate([{"prompt": "Describe this diagram in detail.", "multi_modal_data": {"image": "diagram.png"}}])', 'MMMU: 52.5%, DocVQA: 90.7%, MathVista: 58.0%, ChartQA: 81.8%, 128k context window', 'Requires at least 24GB VRAM for unquantized local inference; sensitive to prompt formatting in complex multi-image reasoning.', 'https://mistral.ai/news/pixtral-12b/', '[{"url":"https://mistral.ai/news/pixtral-12b/","text":"Mistral AI Pixtral 12B Release Announcement"},{"url":"https://huggingface.co/mistralai/Pixtral-12B-2409","text":"Pixtral-12B-2409 on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Pixtral Large 2502', 'Mistral AI', 'Model', 'Multimodal', 'Proprietary', 2026, '128k Context · Available via API', 'Pixtral Large 2502 is the February 2025 version of Mistral AI''s large multimodal model, following Pixtral Large 2411. It accep.', 'Modern foundation model hosted on OpenRouter with native 128k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "mistralai/pixtral-large-2502",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 128k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/mistralai/pixtral-large-2502', '[{"url":"https://openrouter.ai/mistralai/pixtral-large-2502","text":"Mistral: Pixtral Large 2502 on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Play.ht', 'Play.ht', 'AI', 'Audio', 'Proprietary', 2016, 'N/A', 'An AI voice generator and text-to-speech platform with 900+ ultra-realistic voices, offering voice cloning and an API for developers to embed audio in apps.', 'Web Application / API (Powered by proprietary PlayHT 2.0 and PlayDialog models)', 'Visit play.ht to generate speech from text or access the API for programmatic voice generation.', 'N/A', 'Voice cloning and API access require paid plans; free tier has limited word generation.', 'https://play.ht', '[{"url":"https://play.ht","text":"Play.ht"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Playground AI', 'Playground AI', 'AI', 'Image Generation', 'Proprietary', 2022, 'N/A', 'A free-to-use online AI image generation platform offering a generous free tier and a canvas editor for creating and mixing images with various model styles.', 'Web Application (Powered by Stable Diffusion variants and proprietary Playground v2 model)', 'Visit playground.com to generate images for free with up to 500 images/day on the free tier.', 'N/A', 'Heavy users need a paid plan; commercial use of generated images requires a paid subscription.', 'https://playground.com', '[{"url":"https://playground.com","text":"Playground AI"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Poe', 'Quora', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'A platform by Quora that provides access to multiple AI chatbots including GPT-4, Claude, Gemini, and community-created bots in one unified interface.', 'Web Application / Multi-Model Platform (Aggregates GPT-4, Claude, Gemini, Llama, etc.)', 'Visit poe.com or download the Poe app to access multiple AI models.', 'N/A', 'Daily message limits on free tier; quality depends on the chosen underlying model.', 'https://poe.com', '[{"url":"https://poe.com","text":"Poe by Quora"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Portkey AI Gateway', 'Portkey AI', 'Platform', 'MLOps', 'Apache-2.0 / Cloud', 2023, 'N/A', 'Production AI gateway offering load balancing, fallback routing, prompt management, and guardrails across 250+ LLMs with sub-1ms overhead.', 'Ultra-fast C++ based reverse proxy and control plane.', 'from portkey_ai import Portkey
portkey = Portkey(api_key="PORTKEY_API_KEY")
response = portkey.chat.completions.create(model="gpt-4o", messages=[{"role": "user", "content": "Hello!"}])', '<1ms proxy latency overhead; 100.0% production routing reliability.', 'Requires integrating Portkey headers or SDK wrappers.', 'https://portkey.ai', '[{"url":"https://docs.portkey.ai","text":"Portkey Docs"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Project Astra (DeepMind Preview)', 'Google DeepMind', 'Model', 'Multimodal', 'Proprietary', 2024, 'Frontier Multimodal', 'Google DeepMind''s universal real-time multimodal AI assistant, capable of continuous video stream comprehension, ultra-low latency conversational audio, spatial environmental memory, and proactive multi-tool orchestration.', 'Native streaming multimodal foundation model fusing continuous video frames, low-latency duplex audio tokens, and persistent spatial memory graphs.', 'from google.genai import types
# Connect to Project Astra bidirectional streaming Live API session
async with client.aio.live.connect(
  model="project-astra-preview",
  config=types.LiveConnectConfig(response_modalities=["AUDIO"])
) as session:
  await session.send(input={"realtime_input": {"media_chunks": [camera_frame, audio_stream]}})', 'Audio-to-audio latency: <300ms, Video-MME: 84.7%, Spatial Recall Accuracy: 91.2%', 'Requires stable high-bandwidth duplex streaming connections and camera/audio input hardware.', 'https://deepmind.google/technologies/project-astra/', '[{"url":"https://deepmind.google/technologies/project-astra/","text":"Project Astra: A universal AI assistant for everyday life"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Propaganda_Eval', 'Nous Research', 'Dataset', 'NLP', 'MIT', 2026, 'n<1K', 'Censorship & Propaganda Eval 803 prompts about topics that the People''s Republic of China censors or presents through an official narrative. Each prompt comes with 2–.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("NousResearch/Propaganda_Eval")', 'Trending Score: 26, Likes: 27, Downloads: 212', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/NousResearch/Propaganda_Eval', '[{"url":"https://huggingface.co/datasets/NousResearch/Propaganda_Eval","text":"NousResearch/Propaganda_Eval on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('psi', 'Microsoft', 'Framework', 'MLOps', 'Open Source', 2026, '38MB Repo', 'Platform for Situated Intelligence.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/microsoft/psi
cd psi
pip install -e .', 'GitHub Stars: 572, Forks: 104', 'Requires local Python environment and dependency configuration.', 'https://github.com/microsoft/psi', '[{"url":"https://github.com/microsoft/psi","text":"microsoft/psi on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('pybroker', 'PyBroker', 'Framework', 'MLOps', 'Open Source', 2026, '8MB Repo', 'Algorithmic Trading in Python with Machine Learning.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/edtechre/pybroker
cd pybroker
pip install -e .', 'GitHub Stars: 3,533, Forks: 454', 'Requires local Python environment and dependency configuration.', 'https://github.com/edtechre/pybroker', '[{"url":"https://github.com/edtechre/pybroker","text":"edtechre/pybroker on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('PyTorch', 'Meta AI', 'Framework', 'MLOps', 'BSD-3-Clause', 2016, 'N/A', 'Open-source machine learning framework with dynamic computation graphs.', 'Python-first framework with automatic differentiation and GPU acceleration.', 'import torch
import torch.nn as nn
model = nn.Sequential(
  nn.Linear(10, 20),
  nn.ReLU(),
  nn.Linear(20, 1)
)', 'Most popular framework for research (60%+ papers)', 'More verbose than high-level frameworks, deployment can be complex.', 'https://pytorch.org', '[{"url":"https://pytorch.org/docs","text":"PyTorch Official Documentation"},{"url":"https://github.com/pytorch/pytorch","text":"GitHub Repository"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qdrant', 'Qdrant', 'Platform', 'MLOps', 'Apache-2.0', 2021, 'Rust Vector Database & Managed Cloud', 'Open-source vector similarity search engine and vector database written in Rust, delivering ultra-fast, memory-efficient vector search with rich payload filtering and distributed clustering.', 'Rust-native vector indexing engine with HNSW graph indexing, quantization (scalar & product), disk-backed payloads, and Raft distributed consensus.', 'from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

client = QdrantClient("localhost", port=6333)
client.create_collection("ai_articles", vectors_config=VectorParams(size=1536, distance=Distance.COSINE))', 'Sub-millisecond P99 vector search latency; stores billions of vectors with scalar quantization reducing RAM consumption by up to 4x.', 'Requires planning shard layouts and replication factors before scaling to high-concurrency multi-node clusters.', 'https://qdrant.tech', '[{"url":"https://github.com/qdrant/qdrant","text":"Qdrant Vector Database GitHub Repository"},{"url":"https://qdrant.tech/documentation/","text":"Qdrant Official Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Quasar 1.2 358B', 'Multiverse Computing', 'Model', 'Research', 'Proprietary', 2026, '1000k Context · Proprietary Model', 'Frontier Research model by Multiverse Computing benchmarked on Artificial Analysis with an Intelligence Index of 23.1 and a verified 1000k Context window.', 'Proprietary frontier neural architecture developed by Multiverse Computing, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/quasar-1-2-358b', 'Context Window: 1000k Context, Intelligence Index: 23.1, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/quasar-1-2-358b', '[{"url":"https://artificialanalysis.ai/models/quasar-1-2-358b","text":"Quasar 1.2 358B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/quasar-1-2-358b/providers","text":"Quasar 1.2 358B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Quizlet AI', 'Quizlet', 'AI', 'Education', 'Proprietary', 2023, 'N/A', 'Quizlet''s AI-powered study assistant that generates practice questions, explains concepts, and personalizes study sets based on what a student is struggling with.', 'Web / Mobile Application (Powered by OpenAI GPT models with Quizlet''s study data)', 'Visit quizlet.com or open the app; Q-Chat and AI features are available on Quizlet Plus.', 'N/A', 'AI features require a Quizlet Plus subscription; AI-generated flashcards may contain errors.', 'https://quizlet.com/features/quizlet-ai', '[{"url":"https://quizlet.com/features/quizlet-ai","text":"Quizlet AI"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen 2.5 (72B)', 'Alibaba (Qwen)', 'Model', 'NLP', 'Apache-2.0', 2024, '72.7B params', 'Alibaba Cloud''s flagship open LLM featuring world-class multilingual capabilities across 29+ languages, 128k context support, and leading coding benchmarks.', 'Dense Transformer with RoPE, SwiGLU, RMSNorm, and GQA.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-72B-Instruct", device_map="auto")', 'MMLU: 86.8%, MATH: 83.1%, HumanEval: 86.6%', 'Full precision requires ~145GB VRAM; requires 4-bit quant to run on single 24GB/48GB GPU.', 'https://github.com/QwenLM/Qwen2.5', '[{"url":"https://qwenlm.github.io/blog/qwen2.5/","text":"Qwen2.5 Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen 2.5-Coder (32B)', 'Alibaba (Qwen)', 'Model', 'AI Coding', 'Apache-2.0', 2024, '32.5B params', 'State-of-the-art open-source code generation model, matching GPT-4o on coding benchmarks while supporting 128k context tokens and code artifact editing.', 'Transformer decoder specialized on 5.5 trillion code tokens.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-Coder-32B-Instruct", device_map="auto")', 'HumanEval: 92.7%, EvalPlus: 87.2%, MultiPL-E: 84.1%', 'Optimized specifically for code; creative prose is slightly secondary.', 'https://github.com/QwenLM/Qwen2.5-Coder', '[{"url":"https://qwenlm.github.io/blog/qwen2.5-coder/","text":"Qwen2.5-Coder Technical Blog"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen 2.5-Math (72B)', 'Alibaba (Qwen)', 'Model', 'Research', 'Apache-2.0', 2024, '72.7B params', 'Specialized mathematical reasoning model trained with chain-of-thought and tool-integrated reasoning (TIR) for solving complex olympiad-level math.', 'Dense Transformer tuned on bilingual math synthesis and code-assisted execution.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-Math-72B-Instruct", device_map="auto")', 'MATH: 88.2%, GSM8K: 95.9%, OlympiadBench: 56.4%', 'Specialized strictly for math and quantitative calculations.', 'https://github.com/QwenLM/Qwen2.5-Math', '[{"url":"https://arxiv.org/abs/2409.12122","text":"Qwen2.5-Math Paper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen 2.5-Max', 'Alibaba (Qwen)', 'Model', 'NLP', 'Proprietary', 2025, 'Massive MoE', 'Alibaba Cloud''s flagship MoE model rivaling top global frontier LLMs, setting records on Arena-Hard, complex Chinese and English instruction following, and agentic workflows.', 'Ultra-scale Mixture-of-Experts with dynamic token routing, grouped-query attention, and multi-token prediction heads.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_DASHSCOPE_KEY", base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")
response = client.chat.completions.create(
  model="qwen-max-latest",
  messages=[{"role": "user", "content": "Analyze market expansion opportunities across Southeast Asia with quantitative models."}]
)', 'Arena-Hard: 89.2, MMLU-Pro: 79.5%, MATH-500: 87.2%, LiveCodeBench: 55.4%', 'Proprietary API access via Alibaba Cloud DashScope; closed model weights.', 'https://qwenlm.github.io', '[{"url":"https://qwenlm.github.io/blog/qwen2.5-max/","text":"Qwen 2.5-Max Technical Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen 2.5-VL (72B)', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'Apache-2.0', 2025, '72B params', 'Vision-language foundation model capable of reading hour-long videos, parsing fine-grained document charts, and operating computer UIs via agent grounding.', 'Dynamic resolution Vision Transformer (ViT) paired with Qwen 2.5 language backbone.', 'from transformers import Qwen2_5_VLForConditionalGeneration, AutoProcessor
model = Qwen2_5_VLForConditionalGeneration.from_pretrained("Qwen/Qwen2.5-VL-72B-Instruct", device_map="auto")', 'DocVQA: 95.8%, Video-MME: 82.5%, MathVista: 71.9%', 'High token consumption on long video streams.', 'https://github.com/QwenLM/Qwen2.5-VL', '[{"url":"https://qwenlm.github.io/blog/qwen2.5-vl/","text":"Qwen2.5-VL Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-2.1', 'Alibaba (Qwen)', 'Model', 'Image Generation', 'Open Weights', 2026, 'Open Weights', 'Open-weights Image Generation model developed by Alibaba (Qwen).', 'Alibaba (Qwen) text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen-Image-2.1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen-Image-2.1")', 'Trending Score: 1421, Likes: 1,472, Downloads: 6,523', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Qwen/Qwen-Image-2.1', '[{"url":"https://huggingface.co/Qwen/Qwen-Image-2.1","text":"Qwen/Qwen-Image-2.1 on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen-Image-2.1-Turbo', 'Alibaba (Qwen)', 'Model', 'Image Generation', 'Open Weights', 2026, 'Open Weights', 'Open-weights Image Generation model developed by Alibaba (Qwen).', 'Alibaba (Qwen) text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen-Image-2.1-Turbo", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen-Image-2.1-Turbo")', 'Trending Score: 456, Likes: 463, Downloads: 2,138', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo', '[{"url":"https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo","text":"Qwen/Qwen-Image-2.1-Turbo on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen2 (72B)', 'Alibaba (Qwen)', 'Model', 'NLP', 'Qwen License', 2024, '72B params', 'Alibaba''s powerful open-weights model series competitive with leading frontier models, with strong multilingual and coding capabilities.', 'Transformer with GQA, long-context support up to 128K tokens.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2-72B-Instruct")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2-72B-Instruct")', 'MMLU: 84.2%, HumanEval: 86.0%', 'Large VRAM requirement for local inference, license restrictions for commercial use.', 'https://qwenlm.github.io/', '[{"url":"https://arxiv.org/abs/2407.10671","text":"Qwen2 Technical Report"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3 Next 80B A3B Instruct', 'Alibaba (Qwen)', 'Model', 'NLP', 'Open Weights', 2026, '262k Context · Open Model', 'Frontier NLP model by Alibaba benchmarked on Artificial Analysis and a verified 262k Context window.', 'Open-weights frontier neural architecture developed by Alibaba, featuring native 262k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-next-80b-a3b-instruct', 'Context Window: 262k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/qwen3-next-80b-a3b-instruct', '[{"url":"https://artificialanalysis.ai/models/qwen3-next-80b-a3b-instruct","text":"Qwen3 Next 80B A3B Instruct on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/qwen3-next-80b-a3b-instruct/providers","text":"Qwen3 Next 80B A3B Instruct Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3 Omni 30B A3B Instruct', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'Open Weights', 2026, '66k Context · Open Model', 'Frontier Multimodal model by Alibaba benchmarked on Artificial Analysis and a verified 66k Context window.', 'Open-weights frontier neural architecture developed by Alibaba, featuring native 66k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-omni-30b-a3b-instruct', 'Context Window: 66k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/qwen3-omni-30b-a3b-instruct', '[{"url":"https://artificialanalysis.ai/models/qwen3-omni-30b-a3b-instruct","text":"Qwen3 Omni 30B A3B Instruct on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/qwen3-omni-30b-a3b-instruct/providers","text":"Qwen3 Omni 30B A3B Instruct Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3-TTS', 'Alibaba (Qwen)', 'Platform', 'Audio', 'Community Hosted', 2026, 'GRADIO Platform', 'Expressive multilingual text-to-speech showcase for Alibaba Qwen''s neural speech synthesis family.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Qwen/Qwen3-TTS', 'Trending Score: 22, Community Likes: 2,337', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Qwen/Qwen3-TTS', '[{"url":"https://huggingface.co/spaces/Qwen/Qwen3-TTS","text":"Qwen/Qwen3-TTS on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5 122B A10B', 'Alibaba (Qwen)', 'Model', 'NLP', 'Open Weights', 2026, '262k Context · Open Model', 'Frontier NLP model by Alibaba benchmarked on Artificial Analysis and a verified 262k Context window.', 'Open-weights frontier neural architecture developed by Alibaba, featuring native 262k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-5-122b-a10b', 'Context Window: 262k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/qwen3-5-122b-a10b', '[{"url":"https://artificialanalysis.ai/models/qwen3-5-122b-a10b","text":"Qwen3.5 122B A10B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/qwen3-5-122b-a10b/providers","text":"Qwen3.5 122B A10B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5 2B', 'Alibaba (Qwen)', 'Model', 'NLP', 'Open Weights', 2026, '262k Context · Open Model', 'Frontier NLP model by Alibaba benchmarked on Artificial Analysis and a verified 262k Context window.', 'Open-weights frontier neural architecture developed by Alibaba, featuring native 262k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-5-2b', 'Context Window: 262k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/qwen3-5-2b', '[{"url":"https://artificialanalysis.ai/models/qwen3-5-2b","text":"Qwen3.5 2B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/qwen3-5-2b/providers","text":"Qwen3.5 2B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5 397B A17B', 'Alibaba (Qwen)', 'Model', 'Research', 'Open Weights', 2026, '262k Context · Open Model', 'Frontier Research model by Alibaba benchmarked on Artificial Analysis and a verified 262k Context window.', 'Open-weights frontier neural architecture developed by Alibaba, featuring native 262k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-5-397b-a17b', 'Context Window: 262k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/qwen3-5-397b-a17b', '[{"url":"https://artificialanalysis.ai/models/qwen3-5-397b-a17b","text":"Qwen3.5 397B A17B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/qwen3-5-397b-a17b/providers","text":"Qwen3.5 397B A17B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5 9B', 'Alibaba (Qwen)', 'Model', 'NLP', 'Open Weights', 2026, '262k Context · Open Model', 'Frontier NLP model by Alibaba benchmarked on Artificial Analysis and a verified 262k Context window.', 'Open-weights frontier neural architecture developed by Alibaba, featuring native 262k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-5-9b', 'Context Window: 262k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/qwen3-5-9b', '[{"url":"https://artificialanalysis.ai/models/qwen3-5-9b","text":"Qwen3.5 9B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/qwen3-5-9b/providers","text":"Qwen3.5 9B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.5 Omni Plus', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'Proprietary', 2026, '256k Context · Proprietary Model', 'Frontier Multimodal model by Alibaba benchmarked on Artificial Analysis and a verified 256k Context window.', 'Proprietary frontier neural architecture developed by Alibaba, featuring native 256k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/qwen3-5-omni-plus', 'Context Window: 256k Context, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/qwen3-5-omni-plus', '[{"url":"https://artificialanalysis.ai/models/qwen3-5-omni-plus","text":"Qwen3.5 Omni Plus on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/qwen3-5-omni-plus/providers","text":"Qwen3.5 Omni Plus Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8 2.4T A95B', 'Alibaba (Qwen)', 'Model', 'NLP', 'Open Weights', 2026, '262k Context · Open Model', 'Alibaba (Qwen)''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of N/A, Briefcase Elo of 1431, and a massive 262k context window.', 'Open-weights frontier neural architecture developed by Alibaba (Qwen), featuring native 262k token window support, optimized reasoning chains, and low-latency inference throughput (36 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Alibaba/qwen3-8-2-4t-a95b", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Alibaba/qwen3-8-2-4t-a95b")', 'Briefcase Elo: 1431, Accuracy: 31%, Non-Hallucination: 66%, AutomationBench: 57%, TerminalBench 4: 11%, HLE Diamond: 20%, Speed: 36 tok/s, Context Window: 262k', 'High memory requirements for local execution (262k context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/qwen3-8-2-4t-a95b', '[{"url":"https://artificialanalysis.ai/models/qwen3-8-2-4t-a95b","text":"Qwen3.8 2.4T A95B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/qwen3-8-2-4t-a95b/providers","text":"Qwen3.8 2.4T A95B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8 Max (0902)', 'Alibaba (Qwen)', 'Model', 'NLP', 'Proprietary', 2026, '984k Context · Proprietary Model', 'Alibaba (Qwen)''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 34, Briefcase Elo of 1608, and a massive 984k context window.', 'Proprietary frontier neural architecture developed by Alibaba (Qwen), featuring native 984k token window support, optimized reasoning chains, and low-latency inference throughput (40 tok/s).', 'import requests

response = requests.post(
  "https://api.alibabaqwen.com/v1/chat/completions",
  json={"model": "qwen3-8-max-0902", "messages": [{"role": "user", "content": "Benchmark query"}]}
)', 'Intelligence Index: 34, Briefcase Elo: 1608, Accuracy: 30%, Non-Hallucination: 73%, FrontierCode: 23%, AutomationBench: 56%, TerminalBench 4: 39%, HLE Diamond: 24%, Speed: 40 tok/s, Context Window: 984k', 'Proprietary cloud API access via Alibaba (Qwen) developer platform; subject to API rate limits and token pricing ($2/M in, $6/M out).', 'https://artificialanalysis.ai/models/qwen3-8-max', '[{"url":"https://artificialanalysis.ai/models/qwen3-8-max","text":"Qwen3.8 Max (0902) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/qwen3-8-max/providers","text":"Qwen3.8 Max (0902) Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-27B', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'Apache-2.0', 2026, '27B params', 'Alibaba (Qwen)''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 20, Briefcase Elo of 1393, and a massive 256k context window.', 'Alibaba (Qwen) image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen3.8-27B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen3.8-27B")', 'Intelligence Index: 20, Briefcase Elo: 1393, Accuracy: 17%, Non-Hallucination: 71%, FrontierCode: 15%, AutomationBench: 48%, TerminalBench 4: 6%, HLE Diamond: 15%, Speed: 38 tok/s, Context Window: 256k', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Qwen/Qwen3.8-27B', '[{"url":"https://huggingface.co/Qwen/Qwen3.8-27B","text":"Qwen/Qwen3.8-27B on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen3.8-Flash-Next', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'Open Weights', 2026, 'Open Weights', 'Open-weights Multimodal model developed by Alibaba (Qwen).', 'Alibaba (Qwen) image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen3.8-Flash-Next", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen3.8-Flash-Next")', 'Trending Score: 449, Likes: 4,929, Downloads: 432,966', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Qwen/Qwen3.8-Flash-Next', '[{"url":"https://huggingface.co/Qwen/Qwen3.8-Flash-Next","text":"Qwen/Qwen3.8-Flash-Next on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Qwen4 Max', 'Alibaba (Qwen)', 'Model', 'Multimodal', 'Proprietary', 2026, '1000k Context · Available via API', 'Qwen4 Max is the flagship model in Alibaba''s Qwen4 series. It accepts text, image, and video input and returns text, with a 1M-token context window and reasoning enabled by default.', 'Modern foundation model hosted on OpenRouter with native 1000k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "qwen/qwen4-max",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1000k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/qwen/qwen4-max', '[{"url":"https://openrouter.ai/qwen/qwen4-max","text":"Qwen: Qwen4 Max on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('QwQ-32B', 'Alibaba (Qwen)', 'Model', 'AI Coding', 'Apache-2.0', 2025, '32B params', 'Alibaba''s open-weights 32B reasoning model trained with large-scale reinforcement learning, demonstrating competitive reasoning on AIME and LiveCodeBench rivaling proprietary frontier models.', '32B dense Transformer fine-tuned with multi-stage reinforcement learning for extended chain-of-thought and self-correction.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("Qwen/QwQ-32B")
model = AutoModelForCausalLM.from_pretrained("Qwen/QwQ-32B", device_map="auto")', 'AIME 2024: 79.5%, MATH-500: 93.6%, LiveCodeBench: 56.8%', 'Generates extended reasoning traces; requires ~20-24GB VRAM for 16-bit or quantized local inference.', 'https://huggingface.co/Qwen/QwQ-32B', '[{"url":"https://qwenlm.github.io/blog/qwq-32b-preview/","text":"QwQ: Reflect Deeply on the Boundaries of Reasoning"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RAGLight', 'RAGLight', 'Framework', 'NLP', 'MIT', 2026, '15MB Repo', 'RAGLight is a modular framework for Retrieval-Augmented Generation (RAG). It makes it easy to plug in different LLMs, embeddings, and vector stores, and now includes seamless MCP integration to connec.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/Bessouat40/RAGLight
cd RAGLight
pip install -e .', 'GitHub Stars: 672, Forks: 101', 'Requires local Python environment and dependency configuration.', 'https://github.com/Bessouat40/RAGLight', '[{"url":"https://github.com/Bessouat40/RAGLight","text":"Bessouat40/RAGLight on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Raon-1-mini-preview', 'KRAFTON', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by KRAFTON.', 'KRAFTON text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("KRAFTON/Raon-1-mini-preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("KRAFTON/Raon-1-mini-preview")', 'Trending Score: 145, Likes: 154, Downloads: 917', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/KRAFTON/Raon-1-mini-preview', '[{"url":"https://huggingface.co/KRAFTON/Raon-1-mini-preview","text":"KRAFTON/Raon-1-mini-preview on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RedPajama-Data-v2', 'Together AI', 'Dataset', 'NLP', 'Apache-2.0', 2023, '30T tokens (with quality signals)', 'Together AI''s massive open dataset of 30 trillion tokens with quality annotations, designed as a fully open alternative to proprietary LLM pre-training data.', 'Multi-language web data with 40+ quality annotation signals for filtering.', 'from datasets import load_dataset
dataset = load_dataset("togethercomputer/RedPajama-Data-V2", name="sample-10B", split="train", streaming=True)', 'Enables competitive open LLM training at scale', 'Requires careful filtering, quality signals are heuristic-based.', 'https://github.com/togethercomputer/RedPajama-Data', '[{"url":"https://arxiv.org/abs/2402.06935","text":"RedPajama-V2 Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RelayVSR', 'Comfy-Org', 'Model', 'Image Generation', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Image Generation model developed by Comfy-Org.', 'Comfy-Org unconditional image generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Comfy-Org/RelayVSR", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Comfy-Org/RelayVSR")', 'Trending Score: 168, Likes: 186, Downloads: 91,134', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Comfy-Org/RelayVSR', '[{"url":"https://huggingface.co/Comfy-Org/RelayVSR","text":"Comfy-Org/RelayVSR on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Replicate', 'Replicate', 'Platform', 'MLOps', 'Proprietary', 2019, 'N/A', 'A cloud platform for running machine learning models via API, making it easy to deploy open-source models like Llama, Stable Diffusion, and Whisper at scale.', 'Containerized model deployment with Cog packaging and pay-per-prediction pricing.', 'import replicate
output = replicate.run(
  "meta/meta-llama-3-70b-instruct",
  input={"prompt": "Write a haiku about AI"}
)
print("".join(output))', 'N/A', 'Pay-per-second pricing can be costly for heavy use, cold start latency.', 'https://replicate.com', '[{"url":"https://replicate.com/docs","text":"Replicate Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Replika', 'Replika', 'AI', 'NLP', 'Proprietary', 2017, 'N/A', 'An AI companion app designed for emotional support and personal conversation, allowing users to build a relationship with a customizable AI persona.', 'Mobile / Web Application (Powered by custom fine-tuned LLMs)', 'Download the Replika app on iOS or Android, or visit replika.com to chat with your AI companion.', 'N/A', 'Some features require a paid subscription; content policies changed significantly in 2023.', 'https://replika.com', '[{"url":"https://replika.com","text":"Replika"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Replit Ghostwriter', 'Replit', 'AI', 'AI Coding', 'Proprietary', 2022, 'N/A', 'An AI coding assistant built into the Replit online IDE, offering code completion, explanation, transformation, and a conversational chat interface for debugging.', 'Web IDE Integration (Powered by custom models and third-party LLMs)', 'Access at replit.com; Ghostwriter is available in the editor with a Replit Core subscription.', 'N/A', 'Requires a paid Replit Core plan; primarily designed for use within the Replit environment.', 'https://replit.com/ai', '[{"url":"https://replit.com/ai","text":"Replit Ghostwriter"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ResNet', 'Microsoft', 'Model', 'Computer Vision', 'MIT', 2015, 'ResNet-50: 25M params', 'The residual neural network that introduced skip connections, enabling training of very deep networks (100+ layers) and winning ImageNet 2015.', 'CNN with residual (skip) connections to enable very deep network training.', 'import torchvision.models as models
model = models.resnet50(pretrained=True)
model.eval()', 'ImageNet top-5 error: 3.57% (ensemble)', 'Largely superseded by ViT-based models for top benchmarks.', 'https://arxiv.org/abs/1512.03385', '[{"url":"https://arxiv.org/abs/1512.03385","text":"He et al. (2015) - Deep Residual Learning Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RFD4-Proteina', 'NVIDIA', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '10M<n<100M', 'The structures behind biomolecular design.Indexed molecular records, sampling metadata, and traceable source inventories. Project page · Model · Inventory · Training guide.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/RFD4-Proteina")', 'Trending Score: 19, Likes: 26, Downloads: 61,125', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/RFD4-Proteina', '[{"url":"https://huggingface.co/datasets/nvidia/RFD4-Proteina","text":"nvidia/RFD4-Proteina on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ripple-65B-Preview', 'Ricursive AI', 'Model', 'NLP', 'Apache-2.0', 2026, '65B params', 'Open-weights NLP model developed by Ricursive AI.', 'ricursiveAI transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ricursiveAI/Ripple-65B-Preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ricursiveAI/Ripple-65B-Preview")', 'Trending Score: 216, Likes: 222, Downloads: 939', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ricursiveAI/Ripple-65B-Preview', '[{"url":"https://huggingface.co/ricursiveAI/Ripple-65B-Preview","text":"ricursiveAI/Ripple-65B-Preview on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RMBG-3.0', 'Bria AI', 'Model', 'Computer Vision', 'Open Weights', 2026, 'Open Weights', 'Commercial-licensed high-precision background removal and foreground matting model developed by Bria AI.', 'briaai image segmentation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("briaai/RMBG-3.0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("briaai/RMBG-3.0")', 'Trending Score: 78, Likes: 337, Downloads: 225', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/briaai/RMBG-3.0', '[{"url":"https://huggingface.co/briaai/RMBG-3.0","text":"briaai/RMBG-3.0 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RoBERTa', 'Meta AI', 'Model', 'NLP', 'MIT', 2019, 'Base: 125M params, Large: 355M params', 'A robustly optimized BERT pretraining approach that surpassed BERT by training longer with more data and removing next-sentence prediction.', 'Transformer encoder, same as BERT but with dynamic masking and longer training.', 'from transformers import RobertaTokenizer, RobertaModel
tokenizer = RobertaTokenizer.from_pretrained(''roberta-base'')
model = RobertaModel.from_pretrained(''roberta-base'')', 'GLUE: 88.5 (large), SQuAD 2.0: 89.4 F1', 'Still limited to 512 tokens, encoder-only not generative.', 'https://github.com/facebookresearch/fairseq/tree/main/examples/roberta', '[{"url":"https://arxiv.org/abs/1907.11692","text":"Liu et al. (2019) - RoBERTa Paper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RoboWild', 'XLang AI', 'Dataset', 'Multimodal', 'Apache-2.0', 2026, 'Curated Dataset', 'RoboWild Homepage · Paper · Slides · Code RoboWild agents use robots to carry out tasks across 38 simulated environments. This dataset contains the OpenUS.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("xlangai/RoboWild")', 'Trending Score: 7, Likes: 75, Downloads: 8,861', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/xlangai/RoboWild', '[{"url":"https://huggingface.co/datasets/xlangai/RoboWild","text":"xlangai/RoboWild on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Rumble-2-Flash', 'Reson8', 'Model', 'Audio', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Audio model developed by Reson8.', 'Reson8 automatic speech recognition architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Reson8/Rumble-2-Flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Reson8/Rumble-2-Flash")', 'Trending Score: 112, Likes: 165, Downloads: 929', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Reson8/Rumble-2-Flash', '[{"url":"https://huggingface.co/Reson8/Rumble-2-Flash","text":"Reson8/Rumble-2-Flash on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('RunPod', 'RunPod', 'Platform', 'MLOps', 'Proprietary', 2023, 'Global GPU pods', 'Globally distributed cloud GPU platform offering on-demand instances and serverless GPU endpoints for AI training and inference at low cost.', 'Kubernetes-orchestrated bare-metal and serverless GPU container fabric.', 'import runpod
runpod.api_key = "KEY"
endpoint = runpod.Endpoint("ENDPOINT_ID")
run_request = endpoint.run({"input": {"prompt": "AI art"}})
print(run_request.output())', 'Top cost-to-performance provider for indie AI builders and startups.', 'Spot instance availability can fluctuate based on global demand.', 'https://www.runpod.io', '[{"url":"https://docs.runpod.io","text":"RunPod Docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Runway', 'Runway', 'AI', 'Video Generation', 'Proprietary', 2022, 'N/A', 'An AI-powered creative platform for generating and editing videos from text or image prompts, widely used in professional film and content production.', 'Web Application (Proprietary video diffusion model — Gen-2 / Gen-3 Alpha)', 'Access via app.runwayml.com; generate videos from text or image prompts through the web interface.', 'N/A', 'Expensive credits system; generation length is capped; occasional temporal inconsistencies.', 'https://runwayml.com', '[{"url":"https://runwayml.com/research/gen-3-alpha","text":"Runway Gen-3 Alpha"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Runway Gen-3 Alpha', 'Runway', 'Model', 'Video Generation', 'Proprietary', 2024, 'N/A', 'Runway''s advanced video generation model capable of highly photorealistic, consistent, and controllable video creation from text, images, or video inputs.', 'Large-scale multimodal diffusion transformer trained jointly on video and images.', '# Accessed via Runway web interface or API
# Provide a descriptive prompt to generate high-fidelity video clips.', 'Major improvements in temporal consistency and photorealism over Gen-2.', 'Proprietary, paid service, max generation length limitations.', 'https://runwayml.com/', '[{"url":"https://runwayml.com/research/introducing-gen-3-alpha","text":"Gen-3 Alpha Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Sage-A1.5', 'InternScience', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by InternScience.', 'InternScience text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("InternScience/Sage-A1.5", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("InternScience/Sage-A1.5")', 'Trending Score: 180, Likes: 181, Downloads: 396', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/InternScience/Sage-A1.5', '[{"url":"https://huggingface.co/InternScience/Sage-A1.5","text":"InternScience/Sage-A1.5 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SAM (Segment Anything Model)', 'Meta AI', 'Model', 'Computer Vision', 'Apache-2.0', 2023, 'ViT-H: 636M params', 'Meta''s foundation model for image segmentation that can segment any object in any image with a single click, point, or text prompt.', 'Vision Transformer image encoder + prompt encoder + mask decoder.', 'from segment_anything import sam_model_registry, SamPredictor
sam = sam_model_registry["vit_h"](checkpoint="sam_vit_h.pth")
predictor = SamPredictor(sam)
predictor.set_image(image)
masks, scores, logits = predictor.predict(point_coords=input_point, point_labels=input_label)', 'Zero-shot COCO AP: 46.5% (SAM ViT-H)', 'Does not track objects across frames, not designed for semantic labeling.', 'https://segment-anything.com/', '[{"url":"https://arxiv.org/abs/2304.02643","text":"Kirillov et al. (2023) - SAM Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('sam-3d-body-dataset', 'Meta AI', 'Dataset', 'Computer Vision', 'Open Data', 2026, '1M<n<10M', 'Large-scale 3D human pose and body mesh dataset published by Meta AI for training spatial vision models.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("facebook/sam-3d-body-dataset")', 'Trending Score: 7, Likes: 183, Downloads: 1,447', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/facebook/sam-3d-body-dataset', '[{"url":"https://huggingface.co/datasets/facebook/sam-3d-body-dataset","text":"facebook/sam-3d-body-dataset on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('sam-3d-body-dinov3', 'Meta AI', 'Model', 'Computer Vision', 'Open Weights', 2026, 'Open Weights', '3D human body reconstruction and mesh estimation foundation model powered by Meta AI''s DINOv3 visual backbone.', 'facebook transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("facebook/sam-3d-body-dinov3", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("facebook/sam-3d-body-dinov3")', 'Trending Score: 159, Likes: 1,077, Downloads: 14,473', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/facebook/sam-3d-body-dinov3', '[{"url":"https://huggingface.co/facebook/sam-3d-body-dinov3","text":"facebook/sam-3d-body-dinov3 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('sam3', 'Meta AI', 'Model', 'Computer Vision', 'Open Weights', 2026, 'Open Weights', 'Segment Anything Model 3 by Meta AI for promptable open-vocabulary visual segmentation across images and video frames.', 'facebook mask generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("facebook/sam3", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("facebook/sam3")', 'Trending Score: 224, Likes: 4,545, Downloads: 2,013,498', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/facebook/sam3', '[{"url":"https://huggingface.co/facebook/sam3","text":"facebook/sam3 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Scikit-learn', 'Community / INRIA', 'Framework', 'MLOps', 'BSD-3-Clause', 2007, 'N/A', 'The go-to Python library for classical machine learning with a consistent, easy-to-use API for classification, regression, clustering, and preprocessing.', 'Python library built on NumPy, SciPy, and Matplotlib with estimator API pattern.', 'from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)
print(clf.score(X_test, y_test))', 'N/A — foundational library, not benchmarked as a model', 'Not designed for deep learning or GPU-accelerated large-scale training.', 'https://scikit-learn.org', '[{"url":"https://arxiv.org/abs/1201.0490","text":"Pedregosa et al. (2011) - Scikit-learn Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('scorpion-toxin-binder-design', 'Anthropic', 'Dataset', 'Research', 'CC-BY-4.0', 2026, '10K<n<100K', 'Scorpion toxin binder design: data release Claude designed proteins de novo to bind five scorpion toxins: Cn2, Ts1, AaH II, AaH I, and LqhIII. Two contract research o.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Anthropic/scorpion-toxin-binder-design")', 'Trending Score: 18, Likes: 18, Downloads: 6', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Anthropic/scorpion-toxin-binder-design', '[{"url":"https://huggingface.co/datasets/Anthropic/scorpion-toxin-binder-design","text":"Anthropic/scorpion-toxin-binder-design on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Semantic Kernel', 'Microsoft', 'Framework', 'AI Coding', 'MIT', 2023, 'N/A', 'Microsoft''s open-source enterprise SDK that integrates conventional programming languages (C, Python, Java) with large language models, agents, connectors, and semantic vector memory.', 'Modular orchestration engine connecting LLM prompts, native code plugins, planner filters, and vector memory stores.', 'import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import AzureChatCompletion

kernel = sk.Kernel()
kernel.add_service(AzureChatCompletion(service_id="chat", deployment_name="gpt-4o"))', 'Official Microsoft enterprise framework powering Microsoft 365 Copilot extensibility, Azure OpenAI enterprise integrations, and multi-language agent pipelines.', 'Feature parity between C (lead language) and Python/Java SDKs can vary across major release transitions.', 'https://github.com/microsoft/semantic-kernel', '[{"url":"https://github.com/microsoft/semantic-kernel","text":"Semantic Kernel GitHub Repository"},{"url":"https://learn.microsoft.com/en-us/semantic-kernel/overview/","text":"Microsoft Learn Semantic Kernel Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Semantic Scholar', 'Allen Institute for AI', 'AI', 'Research', 'Free', 2015, 'N/A', 'A free AI-powered academic search engine by the Allen Institute for AI that provides smart paper recommendations, citation graphs, and TLDR summaries of research papers.', 'Web Application (Proprietary NLP models for paper summarization and semantic search)', 'Visit semanticscholar.org to search for papers and access AI-generated summaries and citations.', 'N/A', 'TLDR summaries can oversimplify findings; coverage of non-English papers is limited.', 'https://www.semanticscholar.org', '[{"url":"https://www.semanticscholar.org","text":"Semantic Scholar"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SenseNova-Loop-9B', 'SenseNova', 'Model', 'Multimodal', 'Apache-2.0', 2026, '9B params', 'Open-weights Multimodal model developed by SenseNova.', 'sensenova image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("sensenova/SenseNova-Loop-9B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("sensenova/SenseNova-Loop-9B")', 'Trending Score: 172, Likes: 175, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/sensenova/SenseNova-Loop-9B', '[{"url":"https://huggingface.co/sensenova/SenseNova-Loop-9B","text":"sensenova/SenseNova-Loop-9B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SenseNova-Loop-9B-Preview', 'SenseNova', 'Model', 'Multimodal', 'Apache-2.0', 2026, '9B params', 'Open-weights Multimodal model developed by SenseNova.', 'sensenova image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("sensenova/SenseNova-Loop-9B-Preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("sensenova/SenseNova-Loop-9B-Preview")', 'Trending Score: 202, Likes: 205, Downloads: 2,221', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/sensenova/SenseNova-Loop-9B-Preview', '[{"url":"https://huggingface.co/sensenova/SenseNova-Loop-9B-Preview","text":"sensenova/SenseNova-Loop-9B-Preview on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SerpentAI', 'SerpentAI', 'Framework', 'Computer Vision', 'MIT', 2026, '4MB Repo', 'Game Agent Framework. Helping you create AIs / Bots that learn to play any game you own!', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/SerpentAI/SerpentAI
cd SerpentAI
pip install -e .', 'GitHub Stars: 6,990, Forks: 798', 'Requires local Python environment and dependency configuration.', 'https://github.com/SerpentAI/SerpentAI', '[{"url":"https://github.com/SerpentAI/SerpentAI","text":"SerpentAI/SerpentAI on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SGLang', 'LMSYS Org', 'Framework', 'MLOps', 'Apache-2.0', 2024, 'N/A', 'Fast LLM serving and programming engine featuring RadixAttention (KV cache sharing across multi-turn chats) for ultra-low latency inference and structured output.', 'RadixAttention tree cache + interpreter-runtime co-design engine.', 'import sglang as sgl
@sgl.function
def qa(s, question):
    s += sgl.user(question)
    s += sgl.assistant(sgl.gen("answer", max_tokens=100))', 'Up to 5x higher throughput on complex multi-turn chats compared to baseline vLLM.', 'Focuses on Linux x86 and NVIDIA CUDA environments.', 'https://github.com/sgl-project/sglang', '[{"url":"https://arxiv.org/abs/2312.07104","text":"SGLang Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SharpaDex-v1.0', 'Sharpa Robotics', 'Dataset', 'Multimodal', 'CC-BY-NC-4.0', 2026, '100K<n<1M', 'SharpaDex v1.0 A multimodal dataset of real-world teleoperated demonstrations for bimanual dexterous manipulation. Overview · Get Started · Tasks · Examples ·.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Sharpa-Robotics/SharpaDex-v1.0")', 'Trending Score: 19, Likes: 22, Downloads: 66,553', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Sharpa-Robotics/SharpaDex-v1.0', '[{"url":"https://huggingface.co/datasets/Sharpa-Robotics/SharpaDex-v1.0","text":"Sharpa-Robotics/SharpaDex-v1.0 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('simready-assets', 'NVIDIA', 'Dataset', 'Computer Vision', 'Open Data', 2026, 'n<1K', 'High-quality Computer Vision dataset by nvidia for benchmarking and foundation model training.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/simready-assets")', 'Trending Score: 18, Likes: 36, Downloads: 210,209', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/simready-assets', '[{"url":"https://huggingface.co/datasets/nvidia/simready-assets","text":"nvidia/simready-assets on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('smol-training-playbook', 'Hugging Face', 'Platform', 'Research', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive open-science playbook from Hugging Face detailing pretraining, scaling laws, and architecture recipes for small language models.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook', 'Trending Score: 26, Community Likes: 3,372', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook', '[{"url":"https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook","text":"HuggingFaceTB/smol-training-playbook on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Smolagents', 'Hugging Face', 'Framework', 'AI Coding', 'Apache-2.0', 2025, '~1,000 LOC', 'Hugging Face''s lightweight Python-first agent library where agents write executable Python code directly instead of parsing JSON action strings.', 'CodeAgent execution loop running in a secure Python sandbox.', 'from smolagents import CodeAgent, HfApiModel, DuckDuckGoSearchTool
agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=HfApiModel())
agent.run("What is the latest score of the Mars Rover mission?")', '30% fewer token overhead and higher tool success rate on GAIA benchmarks.', 'Code execution requires sandbox container isolation for untrusted user inputs.', 'https://github.com/huggingface/smolagents', '[{"url":"https://huggingface.co/blog/smolagents","text":"Smolagents Launch"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SmolLM2-1.7B', 'Hugging Face', 'Model', 'NLP', 'Apache-2.0', 2024, '1.7B Parameters · 8k Context', 'Hugging Face''s compact small language model designed for efficient local on-device deployment, pre-trained on 11 trillion tokens including FineWeb-Edu, DCLM, and Stack-Edu, and fine-tuned with DPO.', 'Transformer decoder optimized with grouped-query attention (GQA), rotary positional embeddings (RoPE), and SwiGLU activations for mobile and edge inference.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("HuggingFaceTB/SmolLM2-1.7B-Instruct", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("HuggingFaceTB/SmolLM2-1.7B-Instruct")

inputs = tokenizer("Explain quantum computing simply:", return_tensors="pt").to(model.device)
output = model.generate(**inputs, max_new_tokens=100)', 'MMLU: 54.8%, GSM8k: 64.9%, HumanEval: 49.4%, IFEval: 62.4%', 'Compact parameter capacity limits deep domain synthesis compared to 70B+ models; best suited for targeted agent loops, mobile, and on-device NLP.', 'https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct', '[{"url":"https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct","text":"SmolLM2 Model Card and Technical Report on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SmolVLM2-256M-Video-Instruct', 'Hugging Face', 'Model', 'Multimodal', 'Apache-2.0', 2026, '256M params', 'Open-weights Multimodal model developed by Hugging Face.', 'HuggingFaceTB image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("HuggingFaceTB/SmolVLM2-256M-Video-Instruct", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("HuggingFaceTB/SmolVLM2-256M-Video-Instruct")', 'Trending Score: 124, Likes: 298, Downloads: 45,338', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/HuggingFaceTB/SmolVLM2-256M-Video-Instruct', '[{"url":"https://huggingface.co/HuggingFaceTB/SmolVLM2-256M-Video-Instruct","text":"HuggingFaceTB/SmolVLM2-256M-Video-Instruct on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Socratic by Google', 'Google DeepMind', 'AI', 'Education', 'Proprietary', 2017, 'N/A', 'A Google AI-powered learning app that helps students understand homework questions by providing explanations, videos, and step-by-step breakdowns from a photo scan.', 'Mobile Application (Powered by Google Lens OCR + Google Search + LLM explanations)', 'Download the Socratic app on iOS or Android and take a photo of any homework question.', 'N/A', 'Works best for standard K-12 subjects; may struggle with highly specialized or advanced topics.', 'https://socratic.org', '[{"url":"https://socratic.org","text":"Socratic by Google"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Solar Mini 4.5 (Preview)', 'Upstage', 'Model', 'NLP', 'Proprietary', 2026, '524k Context · Available via API', 'Compact Mixture-of-Experts model by Upstage featuring 35B total (3B active) parameters and a 524K context window.', 'Modern foundation model hosted on OpenRouter with native 524k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "upstage/solar-mini-4-5",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 524k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/upstage/solar-mini-4-5', '[{"url":"https://openrouter.ai/upstage/solar-mini-4-5","text":"Upstage: Solar Mini 4.5 (Preview) on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Solar Pro 4', 'Upstage', 'Model', 'Research', 'Proprietary', 2026, '512k Context · Proprietary Model', 'Frontier Research model by Upstage benchmarked on Artificial Analysis with an Intelligence Index of 14.2 and a verified 512k Context window.', 'Proprietary frontier neural architecture developed by Upstage, featuring native 512k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/solar-pro-4', 'Context Window: 512k Context, Intelligence Index: 14.2, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/solar-pro-4', '[{"url":"https://artificialanalysis.ai/models/solar-pro-4","text":"Solar Pro 4 on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/solar-pro-4/providers","text":"Solar Pro 4 Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Sora', 'OpenAI', 'Model', 'Video Generation', 'Proprietary', 2024, 'N/A', 'OpenAI''s text-to-video model capable of generating high-quality, minute-long video clips from text descriptions with impressive temporal consistency.', 'Diffusion transformer (DiT) operating on spacetime patches of video.', '# Sora is accessible via ChatGPT Plus/Pro or the OpenAI API
# API access for developers was opened in late 2024
from openai import OpenAI
client = OpenAI()
# See official Sora docs for current API usage', 'N/A — subjective quality; significant leap in video coherence', 'Limited public API access, expensive, struggles with physics simulation.', 'https://openai.com/sora', '[{"url":"https://openai.com/research/video-generation-models-as-world-simulators","text":"Sora Technical Report"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Sourcegraph Cody', 'Sourcegraph', 'AI', 'AI Coding', 'Apache-2.0', 2023, 'IDE Extension & Enterprise Platform', 'Enterprise AI coding assistant powered by Sourcegraph''s code graph and search engine, providing whole-codebase context awareness for code explanation, test generation, and multi-repo search.', 'Client extension integrating with Sourcegraph Code Graph backend, embeddings search, and dynamic context retrieval algorithms across enterprise repositories.', 'Install Cody in VS Code or JetBrains. Sign in with Sourcegraph and run commands like /explain, /test, or /smell on any active file selection.', 'Searches and indexes multi-gigabyte codebases across thousands of repositories; supports Claude 3.5 Sonnet, GPT-4o, and enterprise self-hosted models.', 'Full cross-repository code graph context requires an active Sourcegraph Enterprise or Sourcegraph Cloud account.', 'https://sourcegraph.com/cody', '[{"url":"https://sourcegraph.com/cody","text":"Sourcegraph Cody Product Overview"},{"url":"https://github.com/sourcegraph/cody","text":"Sourcegraph Cody GitHub Repository"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Spark-X2.5-4B', 'XHToken', 'Model', 'NLP', 'Apache-2.0', 2026, '4B params', 'Open-weights NLP model developed by XHToken.', 'XHToken text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XHToken/Spark-X2.5-4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XHToken/Spark-X2.5-4B")', 'Trending Score: 474, Likes: 570, Downloads: 5,477', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XHToken/Spark-X2.5-4B', '[{"url":"https://huggingface.co/XHToken/Spark-X2.5-4B","text":"XHToken/Spark-X2.5-4B on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Spark-X2.6-4B', 'XHToken', 'Model', 'NLP', 'Apache-2.0', 2026, '4B params', 'Open-weights NLP model developed by XHToken.', 'XHToken text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XHToken/Spark-X2.6-4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XHToken/Spark-X2.6-4B")', 'Trending Score: 171, Likes: 183, Downloads: 85', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XHToken/Spark-X2.6-4B', '[{"url":"https://huggingface.co/XHToken/Spark-X2.6-4B","text":"XHToken/Spark-X2.6-4B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('speaker-diarization-community-1', 'pyannote', 'Model', 'Audio', 'CC-BY-4.0', 2026, 'Open Weights', 'Open-weights Audio model developed by pyannote.', 'pyannote automatic speech recognition architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("pyannote/speaker-diarization-community-1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("pyannote/speaker-diarization-community-1")', 'Trending Score: 194, Likes: 4,449, Downloads: 4,871,288', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/pyannote/speaker-diarization-community-1', '[{"url":"https://huggingface.co/pyannote/speaker-diarization-community-1","text":"pyannote/speaker-diarization-community-1 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SQuAD 2.0', 'Stanford AI', 'Dataset', 'NLP', 'CC-BY-SA-4.0', 2018, '150K questions', 'Stanford Question Answering Dataset with 100K+ questions on Wikipedia passages, including unanswerable questions to test model abstention.', 'Crowdsourced QA pairs from Wikipedia, with adversarially added unanswerable questions.', 'from datasets import load_dataset
dataset = load_dataset("squad_v2")
train_data = dataset[''train'']', 'Standard reading comprehension benchmark; human baseline F1: 89.45%', 'English-only, Wikipedia domain, extractive QA only.', 'https://rajpurkar.github.io/SQuAD-explorer/', '[{"url":"https://arxiv.org/abs/1806.03822","text":"Rajpurkar et al. (2018) - SQuAD 2.0 Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Stable Diffusion', 'Stability AI', 'Model', 'Image Generation', 'CreativeML Open RAIL-M', 2022, '890M params', 'Open-source latent diffusion model for high-quality text-to-image generation.', 'Latent diffusion model with CLIP text encoder and U-Net denoising network.', 'from diffusers import StableDiffusionPipeline
pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2")
image = pipe("a photo of an astronaut on mars").images[0]', 'FID score competitive with DALL-E 2', 'Can produce biased outputs, requires GPU for reasonable speed.', 'https://stability.ai/stable-diffusion', '[{"url":"https://arxiv.org/abs/2112.10752","text":"Rombach et al. (2022) - Latent Diffusion Paper"},{"url":"https://stability.ai","text":"Stability AI Official Site"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Stable Diffusion XL (SDXL)', 'Stability AI', 'Model', 'Image Generation', 'CreativeML Open RAIL++-M', 2023, '3.5B params (base + refiner)', 'An improved latent diffusion model with a larger UNet backbone and a refiner model, producing higher-resolution and more detailed images than SD 1.5/2.x.', 'Dual text encoders (CLIP ViT-L + OpenCLIP ViT-bigG) with larger UNet backbone.', 'from diffusers import DiffusionPipeline
pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0")
image = pipe(prompt="A majestic lion at sunset, 8K").images[0]', 'Significantly higher FID than SD 2.1, preferred in human evaluation', 'Higher VRAM requirement (~12GB), slower than SD 1.5.', 'https://stability.ai/stable-image', '[{"url":"https://arxiv.org/abs/2307.01952","text":"SDXL Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('standard-chess-games', 'Lichess', 'Dataset', 'Research', 'CC0-1.0', 2026, '1B<n<10B', 'Large-scale open corpus of rated standard chess games published by Lichess for strategic sequence modeling.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Lichess/standard-chess-games")', 'Trending Score: 27, Likes: 111, Downloads: 1,451,696', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Lichess/standard-chess-games', '[{"url":"https://huggingface.co/datasets/Lichess/standard-chess-games","text":"Lichess/standard-chess-games on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('StarCoder2', 'Hugging Face', 'Model', 'AI Coding', 'BigCode OpenRAIL-M v1', 2024, '3B to 15B params', 'BigCode''s open state-of-the-art code model trained on 619 programming languages with permissive licensing, supporting infilling and 16K context.', 'Transformer decoder with multi-query attention and Fill-in-the-Middle (FIM) training.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("bigcode/starcoder2-15b")
model = AutoModelForCausalLM.from_pretrained("bigcode/starcoder2-15b")', 'HumanEval: 46.3% (15B pass@1), best open model at time of release', 'Not an instruction-tuned chat model by default, requires fine-tuning for dialogue.', 'https://github.com/bigcode-project/starcoder2', '[{"url":"https://arxiv.org/abs/2402.19173","text":"StarCoder2 Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Step 5 Preview', 'StepFun', 'Model', 'NLP', 'Open Weights', 2026, '1M Context · Open Model', 'StepFun''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 29, Briefcase Elo of 1425, and a massive 1M context window.', 'Open-weights frontier neural architecture developed by StepFun, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (165 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("StepFun/step-5-preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("StepFun/step-5-preview")', 'Intelligence Index: 29, Briefcase Elo: 1425, Accuracy: 36%, Non-Hallucination: 69%, FrontierCode: 12%, AutomationBench: 51%, TerminalBench 4: 33%, HLE Diamond: 24%, Speed: 165 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/step-5', '[{"url":"https://artificialanalysis.ai/models/step-5","text":"Step 5 Preview on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/step-5/providers","text":"Step 5 Preview Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('StepAudio-3-Music', 'StepFun', 'Platform', 'Audio', 'Community Hosted', 2026, 'GRADIO Platform', 'Generative music and vocal synthesis model by StepFun creating controllable multi-track audio compositions.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/stepfun-ai/StepAudio-3-Music', 'Trending Score: 20, Community Likes: 304', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/stepfun-ai/StepAudio-3-Music', '[{"url":"https://huggingface.co/spaces/stepfun-ai/StepAudio-3-Music","text":"stepfun-ai/StepAudio-3-Music on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Suno', 'Suno', 'AI', 'Audio', 'Proprietary', 2023, 'N/A', 'An AI music generation platform that creates full songs with vocals, instrumentation, and lyrics from a simple text prompt in seconds.', 'Web Application (Proprietary audio diffusion and language model pipeline)', 'Visit suno.com and type a prompt describing the style or lyrics to generate a full song.', 'N/A', 'Limited control over fine-grained musical elements; commercial use requires a paid plan.', 'https://suno.com', '[{"url":"https://suno.com","text":"Suno AI"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Suno v3.5', 'Suno', 'Model', 'Audio', 'Proprietary', 2024, 'N/A', 'State-of-the-art AI music generation model capable of creating full, radio-quality songs with vocals and instrumentation from simple text prompts.', 'Proprietary audio generation architecture.', '# Accessed via Suno web platform or API
# Prompt: "An upbeat pop song about coding late at night"', 'High subjective quality for coherent musical structure and intelligible vocals.', 'Proprietary, max song length limits, potential copyright concerns regarding training data.', 'https://suno.com/', '[{"url":"https://suno.com/blog/v3-5","text":"Suno v3.5 Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Supabase Vector', 'Supabase', 'Platform', 'MLOps', 'Apache-2.0', 2023, 'Cloud Platform & Open Source Engine', 'Supabase''s open-source vector database toolkit built on PostgreSQL and pgvector, enabling developers to store, index (HNSW / IVFFlat), and query high-dimensional embeddings directly within Postgres.', 'PostgreSQL database engine extended with pgvector C extension, pg_ivm, Row Level Security (RLS), and unified TypeScript/Python SDK clients.', 'import { createClient } from ''@supabase/supabase-js''
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const { data } = await supabase.rpc(''match_documents'', {
  query_embedding: [0.1, -0.2, 0.5],
  match_threshold: 0.78,
  match_count: 5
})', 'Supports sub-10ms similarity searches on millions of vectors using HNSW indexing; fully integrates with relational tables, foreign keys, and ACID transactions.', 'Vector index build times scale with Postgres RAM allocation; memory tuning required for multi-million vector datasets with high dimensionality.', 'https://supabase.com/docs/guides/database/extensions/pgvector', '[{"url":"https://supabase.com/docs/guides/database/extensions/pgvector","text":"Supabase Vector Official Documentation & Guide"},{"url":"https://supabase.com/modules/vector","text":"Supabase AI & Vector Overview"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Superwhisper', 'Superwhisper', 'AI', 'Productivity', 'Proprietary', 2024, 'Local app', 'Privacy-first local AI voice dictation app for macOS and iOS that transcribes speech into text in any application using local Whisper models with zero latency.', 'On-device Apple Silicon Metal optimized Whisper / Kokoro engine.', 'Press global hotkey, speak naturally, and your voice is instantly transcribed and punctuated into the active cursor.', '100% offline local privacy with near-instant transcript rendering.', 'macOS / iOS ecosystem focus.', 'https://superwhisper.com', '[{"url":"https://superwhisper.com","text":"Superwhisper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('SWE-bench Verified', 'OpenAI', 'Dataset', 'AI Coding', 'MIT', 2024, '500 verified GitHub issues', 'Human-verified subset of 500 real-world GitHub issues and unit test pull requests used to evaluate autonomous software engineering AI agents.', 'Dockerized reproducible environment harness across 12 major Python repositories.', 'from datasets import load_dataset
ds = load_dataset("princeton-nlp/SWE-bench_Verified", split="test")', 'The global gold standard benchmark for Devin, Claude 3.7 Sonnet, and autonomous coding agents.', 'Requires Dockerized test harness execution for each evaluated issue.', 'https://www.swebench.com', '[{"url":"https://openai.com/index/introducing-swe-bench-verified/","text":"SWE-bench Verified"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Synthesia', 'Synthesia', 'AI', 'Video Generation', 'Proprietary', 2017, 'N/A', 'An AI video generation platform that creates professional videos with realistic AI avatars speaking from a script, used widely for corporate training and marketing.', 'Web Application (Proprietary talking-head video synthesis model)', 'Visit synthesia.io, write a script, choose an AI avatar, and generate a video in minutes.', 'N/A', 'Limited avatar customization on lower-tier plans; video style can feel corporate.', 'https://www.synthesia.io', '[{"url":"https://www.synthesia.io","text":"Synthesia"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('T5', 'Google DeepMind', 'Model', 'NLP', 'Apache-2.0', 2019, 'Small (60M) to 11B params', 'Text-To-Text Transfer Transformer — Google''s unified framework that converts every NLP task into a text-to-text format.', 'Encoder-decoder transformer trained with a span-corruption pre-training objective.', 'from transformers import T5Tokenizer, T5ForConditionalGeneration
tokenizer = T5Tokenizer.from_pretrained("t5-base")
model = T5ForConditionalGeneration.from_pretrained("t5-base")
input_ids = tokenizer("translate English to French: Hello world", return_tensors="pt").input_ids', 'SuperGLUE: 88.9 (11B), GLUE: 90.3 (11B)', 'Encoder-decoder architecture slower than decoder-only for generation tasks.', 'https://github.com/google-research/text-to-text-transfer-transformer', '[{"url":"https://arxiv.org/abs/1910.10683","text":"Raffel et al. (2019) - T5 Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Tabnine', 'Tabnine', 'AI', 'AI Coding', 'Proprietary', 2019, 'N/A', 'An AI code completion assistant that integrates with most IDEs and supports local or cloud-based models, offering a privacy-conscious alternative to cloud-only tools.', 'IDE Plugin (Supports local models + cloud models; integrates with VS Code, JetBrains, Neovim, etc.)', 'Install the Tabnine extension from your IDE''s marketplace (VS Code, JetBrains, Neovim, etc.).', 'N/A', 'Free tier has limited completions; local model mode requires a capable machine.', 'https://www.tabnine.com', '[{"url":"https://www.tabnine.com","text":"Tabnine"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TacVerse', 'TacVerse', 'Dataset', 'Multimodal', 'CC-BY-SA-4.0', 2026, '100M<n<1B', 'Multi-scene bimanual robotics dataset synchronizing visual frames with dense tactile sensor measurements.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("TacVerse/TacVerse")', 'Trending Score: 16, Likes: 21, Downloads: 1,637', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/TacVerse/TacVerse', '[{"url":"https://huggingface.co/datasets/TacVerse/TacVerse","text":"TacVerse/TacVerse on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TailorRig', 'Tencent', 'Dataset', 'Computer Vision', 'Open Data', 2026, '10K<n<100K', 'Human character rigging dataset containing 39,073 humanoid 3D meshes with skeletons and skinning weights stored across structured anatomical subsets.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("tencent/TailorRig")', 'Trending Score: 20, Likes: 21, Downloads: 10', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/tencent/TailorRig', '[{"url":"https://huggingface.co/datasets/tencent/TailorRig","text":"tencent/TailorRig on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TeleOCR', 'XingChen-AGI', 'Model', 'Computer Vision', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Computer Vision model developed by XingChen-AGI.', 'XingChen-AGI image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XingChen-AGI/TeleOCR", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XingChen-AGI/TeleOCR")', 'Trending Score: 697, Likes: 809, Downloads: 27,904', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XingChen-AGI/TeleOCR', '[{"url":"https://huggingface.co/XingChen-AGI/TeleOCR","text":"XingChen-AGI/TeleOCR on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TensorFlow', 'Google DeepMind', 'Framework', 'MLOps', 'Apache-2.0', 2015, 'N/A', 'Google''s end-to-end open-source ML platform, widely used in production for its robust serving infrastructure and mobile deployment via TensorFlow Lite.', 'Graph-based computation framework with eager execution support, Keras high-level API.', 'import tensorflow as tf
model = tf.keras.Sequential([
  tf.keras.layers.Dense(64, activation=''relu''),
  tf.keras.layers.Dense(10, activation=''softmax'')
])
model.compile(optimizer=''adam'', loss=''categorical_crossentropy'', metrics=[''accuracy''])', 'Dominant framework for production ML deployments', 'More complex debugging than PyTorch, less dominant in research community.', 'https://www.tensorflow.org', '[{"url":"https://www.tensorflow.org","text":"TensorFlow Official Site"},{"url":"https://github.com/tensorflow/tensorflow","text":"GitHub Repository"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('text-embedding-3-large', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2024, 'N/A', 'OpenAI''s most capable text embedding model, with improved multilingual performance and flexible dimensionality reduction.', 'Encoder-only transformer producing dense vector representations.', 'from openai import OpenAI
client = OpenAI()
response = client.embeddings.create(
  input="Your text string goes here",
  model="text-embedding-3-large"
)
embedding = response.data[0].embedding', 'MTEB: 64.6% average across 56 tasks', 'Proprietary, pay-per-use, no local inference.', 'https://platform.openai.com/docs/guides/embeddings', '[{"url":"https://openai.com/blog/new-embedding-models-and-api-updates","text":"New Embedding Models Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('The Pile', 'EleutherAI', 'Dataset', 'NLP', 'MIT', 2020, '825GB, ~300B tokens', 'EleutherAI''s 825GB open-source diverse text dataset designed for training large language models, combining 22 high-quality data sources.', '22 data sources including Books3, GitHub, Wikipedia, PubMed, arXiv, and more.', '# Available on HuggingFace
from datasets import load_dataset
dataset = load_dataset("EleutherAI/pile", split="train", streaming=True)', 'Used to train GPT-NeoX, GPT-J, and other EleutherAI models', 'Some components have license restrictions (Books3 removed after legal challenges).', 'https://pile.eleuther.ai/', '[{"url":"https://arxiv.org/abs/2101.00027","text":"Gao et al. (2020) - The Pile Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Therefor', 'Mariano Rodriguez', 'AI', 'Audio', 'Freemium', 2026, 'Web App', 'AI remembrance and conversational memorial web app by Mariano Rodriguez enabling private audio-grounded memory conversations.', 'N/A', NULL, 'N/A', 'N/A', 'https://therefor.us/', '[]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('timesfm-3.0-pytorch', 'Google DeepMind', 'Model', 'NLP', 'Open Weights', 2026, 'Open Weights', 'Open-weights NLP model developed by Google DeepMind.', 'Google time series forecasting architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("google/timesfm-3.0-pytorch", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("google/timesfm-3.0-pytorch")', 'Trending Score: 415, Likes: 473, Downloads: 144,455', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/google/timesfm-3.0-pytorch', '[{"url":"https://huggingface.co/google/timesfm-3.0-pytorch","text":"google/timesfm-3.0-pytorch on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Timestral-209M', 'Mistral AI', 'Model', 'NLP', 'Open Weights', 2026, '209M params', 'Open-weights NLP model developed by Mistral AI.', 'Mistral AI time series forecasting architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("mistralai/Timestral-209M", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Timestral-209M")', 'Trending Score: 165, Likes: 172, Downloads: 2,601', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/mistralai/Timestral-209M', '[{"url":"https://huggingface.co/mistralai/Timestral-209M","text":"mistralai/Timestral-209M on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Together AI', 'Together AI', 'Platform', 'MLOps', 'Proprietary', 2022, 'N/A', 'A cloud platform for fast inference on open-source AI models with competitive pricing, offering fine-tuning and custom deployment.', 'Distributed inference cluster with FlashAttention and custom serving optimizations.', 'from together import Together
client = Together(api_key="YOUR_API_KEY")
response = client.chat.completions.create(
  model="meta-llama/Llama-3-70b-chat-hf",
  messages=[{"role": "user", "content": "What is RAG?"}]
)', 'N/A', 'Proprietary, model availability may change.', 'https://www.together.ai/', '[{"url":"https://docs.together.ai/","text":"Together AI Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Tome', 'Tome', 'AI', 'Productivity', 'Proprietary', 2020, 'N/A', 'An AI-powered storytelling and presentation tool that generates complete slide decks with text, images, and layouts from a single prompt.', 'Web Application (Powered by GPT-4 for content + DALL·E for image generation)', 'Visit tome.app, enter a prompt for your presentation topic, and Tome generates a full deck.', 'N/A', 'Limited design customization compared to traditional tools; export options are restricted.', 'https://tome.app', '[{"url":"https://tome.app","text":"Tome"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('torchtune', 'Meta AI', 'Framework', 'MLOps', 'BSD-3-Clause', 2024, 'N/A', 'Native PyTorch library for easily authoring, fine-tuning, and experimenting with LLMs using composable, clean PyTorch building blocks without heavy abstractions.', 'Composable PyTorch post-training architecture supporting LoRA, QLoRA, full finetuning, DPO, and distributed FSDP/deepspeed recipes.', 'tune run --nnodes 1 --nproc_per_node 4 lora_finetune_distributed --config llama3_2/3B_lora', 'Native integration with torchao (quantization) and torchtitan (pretraining); achieves near peak-FLOPS utilization across single-GPU and multi-node FSDP2 setups.', 'Focuses strictly on PyTorch 2.x native ecosystems; less out-of-the-box support for non-PyTorch runtimes like ONNX or TensorRT-LLM without conversion.', 'https://github.com/pytorch/torchtune', '[{"url":"https://github.com/pytorch/torchtune","text":"PyTorch torchtune Repository"},{"url":"https://pytorch.org/blog/torchtune-fine-tune-llms/","text":"PyTorch Blog: Introducing torchtune"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Transformers.js', 'Hugging Face', 'Framework', 'MLOps', 'Apache-2.0', 2024, 'N/A', 'State-of-the-art ML library from Hugging Face that runs pretrained models directly inside web browsers and Node.js with zero server dependencies via ONNX Runtime and WebGPU.', 'WebAssembly + WebGPU execution runtime for ONNX neural network models.', 'import { pipeline } from ''@huggingface/transformers'';
const classifier = await pipeline(''sentiment-analysis'');
const output = await classifier(''I love running AI locally in my browser!'');', 'Up to 10x speedup utilizing client-side WebGPU acceleration in Chrome/Edge.', 'Model size bounded by client browser RAM / VRAM allocation.', 'https://github.com/huggingface/transformers.js', '[{"url":"https://huggingface.co/docs/transformers.js","text":"Transformers.js Docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TRELLIS.2', 'Microsoft', 'Platform', 'Computer Vision', 'Community Hosted', 2026, 'GRADIO Platform', 'Microsoft''s 3D asset generation playground turning text prompts or reference images into high-detail textured 3D meshes.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/microsoft/TRELLIS.2', 'Trending Score: 26, Community Likes: 2,232', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/microsoft/TRELLIS.2', '[{"url":"https://huggingface.co/spaces/microsoft/TRELLIS.2","text":"microsoft/TRELLIS.2 on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Triton Inference Server', 'NVIDIA', 'Framework', 'MLOps', 'BSD-3-Clause', 2019, 'N/A', 'NVIDIA''s open-source multi-framework inference serving software engineered for high-throughput, low-latency GPU and CPU model deployment with dynamic batching and concurrent model execution.', 'Multi-backend serving container supporting TensorRT, PyTorch TorchScript/LibTorch, ONNX Runtime, OpenVINO, and vLLM via C++ and gRPC/REST APIs.', 'tritonserver --model-repository=/models --http-port=8000 --grpc-port=8001', 'Supports dynamic batching, concurrent model execution, model ensembles, and enterprise Kubernetes orchestration with automated Prometheus metrics.', 'Model repository directory configuration requires rigid adherence to Triton config.pbtxt protobuf schemas and versioning structures.', 'https://github.com/triton-inference-server/server', '[{"url":"https://github.com/triton-inference-server/server","text":"NVIDIA Triton Inference Server Repository"},{"url":"https://developer.nvidia.com/triton-inference-server","text":"NVIDIA Developer Triton Inference Server Overview"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('TwIL-8B', 'webAI', 'Model', 'NLP', 'Open Weights', 2026, '8B params', 'Open-weights NLP model developed by webAI.', 'webAI-Official text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("webAI-Official/TwIL-8B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("webAI-Official/TwIL-8B")', 'Trending Score: 168, Likes: 170, Downloads: 8,209', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/webAI-Official/TwIL-8B', '[{"url":"https://huggingface.co/webAI-Official/TwIL-8B","text":"webAI-Official/TwIL-8B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('typed-decisions', 'Meta AI', 'Dataset', 'NLP', 'Apache-2.0', 2026, '1K<n<10K', 'Typed Decisions A benchmark for typed probabilistic decisions. A model gets one piece of unstructured state and answers five typed questions about it at once, and eve.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("LocalLLaMA/typed-decisions")', 'Trending Score: 56, Likes: 85, Downloads: 19,901', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/LocalLLaMA/typed-decisions', '[{"url":"https://huggingface.co/datasets/LocalLLaMA/typed-decisions","text":"LocalLLaMA/typed-decisions on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Udio', 'Udio', 'AI', 'Audio', 'Proprietary', 2024, 'N/A', 'An AI music creation tool that generates high-quality, diverse music tracks with vocals and instrumentation from short text descriptions.', 'Web Application (Proprietary generative audio model)', 'Visit udio.com, describe the music style or mood, and generate tracks instantly.', 'N/A', 'Free tier has monthly generation limits; less genre variety compared to Suno in some styles.', 'https://www.udio.com', '[{"url":"https://www.udio.com","text":"Udio"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UltraData-Code', 'OpenBMB', 'Dataset', 'AI Coding', 'Apache-2.0', 2026, '100M<n<1B', 'UltraData-Code UltraData Collection | UltraData | MiniCPM5 Series | Tech Report (Coming Soon) | UltraData-Code-L2 Classifier English | 中文.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("openbmb/UltraData-Code")', 'Trending Score: 65, Likes: 78, Downloads: 6,343', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/openbmb/UltraData-Code', '[{"url":"https://huggingface.co/datasets/openbmb/UltraData-Code","text":"openbmb/UltraData-Code on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UltraData-RL-2609', 'OpenBMB', 'Dataset', 'AI Coding', 'Apache-2.0', 2026, '10K<n<100K', 'UltraData-RL-2609 UltraData Collection | UltraData | MiniCPM5 Series English | 中文 Introduction UltraData-RL-2609 is the L3 refined data f.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("openbmb/UltraData-RL-2609")', 'Trending Score: 53, Likes: 60, Downloads: 667', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/openbmb/UltraData-RL-2609', '[{"url":"https://huggingface.co/datasets/openbmb/UltraData-RL-2609","text":"openbmb/UltraData-RL-2609 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UltraData-SFT-Agent-2609', 'OpenBMB', 'Dataset', 'AI Coding', 'Apache-2.0', 2026, '100K<n<1M', 'UltraData-SFT-Agent-2609 UltraData Collection | UltraData | MiniCPM5 Series English | 中文 Introduction UltraData-SFT-Agent-2609 is the L3.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("openbmb/UltraData-SFT-Agent-2609")', 'Trending Score: 60, Likes: 67, Downloads: 642', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/openbmb/UltraData-SFT-Agent-2609', '[{"url":"https://huggingface.co/datasets/openbmb/UltraData-SFT-Agent-2609","text":"openbmb/UltraData-SFT-Agent-2609 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UltraData-Stack-v3-L2', 'OpenBMB', 'Dataset', 'AI Coding', 'ODC-By 1.0', 2026, '100M<n<1B', 'UltraData-Stack-v3-L2 UltraData Collection | UltraData | Tech Report | UltraData-Code | UltraData-Code-L2 Classifier English | 中文 Intr.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("openbmb/UltraData-Stack-v3-L2")', 'Trending Score: 22, Likes: 27, Downloads: 919', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/openbmb/UltraData-Stack-v3-L2', '[{"url":"https://huggingface.co/datasets/openbmb/UltraData-Stack-v3-L2","text":"openbmb/UltraData-Stack-v3-L2 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('UltraFeedback', 'Argilla', 'Dataset', 'NLP', 'MIT', 2024, '64k prompts (250k pairs)', 'Large-scale preference dataset containing 64,000 multi-turn prompts with responses evaluated by GPT-4 across instruction following, truthfulness, and quality.', 'Binarized and scalar preference alignment dataset for DPO and KTO.', 'from datasets import load_dataset
ds = load_dataset("HuggingFaceH4/ultrafeedback_binarized", split="train_prefs")', 'Gold standard preference dataset for training Zephyr, Starling, and top DPO models.', 'Relies on GPT-4 evaluation scores as ground truth.', 'https://huggingface.co/datasets/argilla/ultrafeedback', '[{"url":"https://arxiv.org/abs/2310.01377","text":"UltraFeedback Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Underdog-Saluki-27B-1.0', 'Conway Research', 'Model', 'NLP', 'Apache-2.0', 2026, '27B params', 'Open-weights NLP model developed by Conway Research.', 'ConwayResearch text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ConwayResearch/Underdog-Saluki-27B-1.0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ConwayResearch/Underdog-Saluki-27B-1.0")', 'Trending Score: 291, Likes: 511, Downloads: 370,955', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0', '[{"url":"https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0","text":"ConwayResearch/Underdog-Saluki-27B-1.0 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Unlimited-OCR', 'Baidu', 'Model', 'Computer Vision', 'MIT', 2026, 'Open Weights', 'Open-weights Computer Vision model developed by Baidu.', 'baidu image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("baidu/Unlimited-OCR", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("baidu/Unlimited-OCR")', 'Trending Score: 355, Likes: 4,744, Downloads: 1,262,307', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/baidu/Unlimited-OCR', '[{"url":"https://huggingface.co/baidu/Unlimited-OCR","text":"baidu/Unlimited-OCR on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Unlimited-OCR-2', 'Baidu', 'Model', 'Computer Vision', 'MIT', 2026, 'Open Weights', 'Open-weights Computer Vision model developed by Baidu.', 'baidu image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("baidu/Unlimited-OCR-2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("baidu/Unlimited-OCR-2")', 'Trending Score: 326, Likes: 341, Downloads: 8,357', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/baidu/Unlimited-OCR-2', '[{"url":"https://huggingface.co/baidu/Unlimited-OCR-2","text":"baidu/Unlimited-OCR-2 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Unsloth', 'Unsloth AI', 'Framework', 'MLOps', 'Apache-2.0', 2024, 'N/A', 'Ultra-fast open-source fine-tuning framework providing 2x-5x faster training speeds and up to 80% lower VRAM memory usage for Llama, Mistral, Qwen, and DeepSeek.', 'Custom OpenAI Triton manual backpropagation GPU kernels.', 'from unsloth import FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Llama-3.3-70B-Instruct-bnb-4bit",
    max_seq_length=2048,
    load_in_4bit=True
)', '5x faster training, 0% accuracy loss compared to standard Hugging Face Trainer.', 'Exclusively tailored for NVIDIA GPUs (Compute Capability 7.0+).', 'https://github.com/unslothai/unsloth', '[{"url":"https://docs.unsloth.ai","text":"Unsloth Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('USDCraft-10K', 'NVIDIA', 'Dataset', 'Computer Vision', 'Apache-2.0', 2026, '10K<n<100K', 'USDCraft-10K: Simulation-Ready Articulated 3D Assets in OpenUSD USDCraft-10K is a dataset of simulation-ready rigid and articulated 3D assets in OpenUSD,.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/USDCraft-10K")', 'Trending Score: 21, Likes: 26, Downloads: 3,674', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/USDCraft-10K', '[{"url":"https://huggingface.co/datasets/nvidia/USDCraft-10K","text":"nvidia/USDCraft-10K on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('v0 by Vercel', 'Vercel', 'AI', 'AI Coding', 'Proprietary', 2024, 'N/A', 'Generative UI design platform that creates production-grade, accessible React components and full frontend pages styled with Tailwind CSS and Shadcn UI from natural prompts.', 'Web Application / Fine-tuned LLM with React Component AST Compiler.', 'Visit v0.dev, enter prompt: "Modern crypto portfolio dashboard with dark mode charts", and click Copy Code to paste into your Next.js project.', 'Rapid frontend prototyping benchmark standard used by millions of web developers.', 'Specialized for frontend JSX/React interfaces; backend API logic requires manual setup.', 'https://v0.dev', '[{"url":"https://v0.dev","text":"v0 by Vercel"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Vertex AI', 'Google DeepMind', 'Platform', 'MLOps', 'Proprietary', 2021, 'N/A', 'Google Cloud''s unified ML platform for building, deploying, and scaling AI models including access to Gemini, PaLM, and custom model training.', 'Managed cloud ML platform with AutoML, custom training, feature store, and model registry.', 'import vertexai
from vertexai.generative_models import GenerativeModel
vertexai.init(project="YOUR_PROJECT", location="us-central1")
model = GenerativeModel("gemini-1.5-pro")
response = model.generate_content("Describe the water cycle.")', 'N/A', 'GCP-locked, complex pricing, requires GCP account setup.', 'https://cloud.google.com/vertex-ai', '[{"url":"https://cloud.google.com/vertex-ai/docs","text":"Vertex AI Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Vicuna-13B', 'LMSYS Org', 'Model', 'NLP', 'Non-commercial (based on LLaMA license)', 2023, '13B params', 'A fine-tuned LLaMA model trained on ShareGPT conversations, achieving 90% of ChatGPT quality according to GPT-4 evaluations.', 'LLaMA decoder fine-tuned on ~70K user-shared ChatGPT conversations.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("lmsys/vicuna-13b-v1.5")
tokenizer = AutoTokenizer.from_pretrained("lmsys/vicuna-13b-v1.5")', 'GPT-4 judged 90% of ChatGPT quality on open questions', 'Non-commercial, hallucinates more than proprietary models.', 'https://lmsys.org/blog/2023-03-30-vicuna/', '[{"url":"https://lmsys.org/blog/2023-03-30-vicuna/","text":"Vicuna Blog Post"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ViT (Vision Transformer)', 'Google DeepMind', 'Model', 'Computer Vision', 'Apache-2.0', 2020, 'ViT-L/16: 307M params', 'The original paper demonstrating that pure transformer architecture, without convolutional layers, achieves state-of-the-art results on image classification.', 'Pure transformer applied to sequences of image patches.', 'from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
processor = ViTImageProcessor.from_pretrained(''google/vit-base-patch16-224'')
model = ViTForImageClassification.from_pretrained(''google/vit-base-patch16-224'')', 'ImageNet top-1: 88.55% (ViT-L/16)', 'Requires large datasets to train from scratch, less data-efficient than CNNs.', 'https://github.com/google-research/vision_transformer', '[{"url":"https://arxiv.org/abs/2010.11929","text":"Dosovitskiy et al. (2020) - ViT Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('vLLM', 'UC Berkeley (BAIR)', 'Framework', 'MLOps', 'Apache-2.0', 2023, 'N/A', 'A fast and easy-to-use library for LLM inference and serving, featuring PagedAttention for near-optimal GPU memory management.', 'PagedAttention memory manager with continuous batching for high-throughput serving.', 'from vllm import LLM, SamplingParams
llm = LLM(model="meta-llama/Meta-Llama-3-8B-Instruct")
params = SamplingParams(temperature=0.8, top_p=0.95)
outputs = llm.generate(["Tell me a fun fact about space."], params)', 'Up to 24x higher throughput than HuggingFace Transformers', 'Primarily optimized for NVIDIA GPUs, less support for AMD/Apple Silicon.', 'https://github.com/vllm-project/vllm', '[{"url":"https://arxiv.org/abs/2309.06180","text":"Kwon et al. (2023) - vLLM Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('voice-isolator', 'Inworld AI', 'Model', 'Audio', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Audio model developed by Inworld AI.', 'inworld audio to audio architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("inworld/voice-isolator", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("inworld/voice-isolator")', 'Trending Score: 171, Likes: 187, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/inworld/voice-isolator', '[{"url":"https://huggingface.co/inworld/voice-isolator","text":"inworld/voice-isolator on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Wan 2.1', 'Alibaba (Qwen)', 'Model', 'Video Generation', 'Apache-2.0', 2025, '14B params', 'Alibaba''s breakthrough open-weights 14B diffusion video model generating photorealistic, temporally consistent 1080p video with rich physics simulations from text and image prompts.', '3D Spatio-Temporal Variational Autoencoder (3D-VAE) + Flow-Matching Diffusion Transformer (DiT).', 'import torch
from diffusers import WanPipeline
pipe = WanPipeline.from_pretrained("Wan-AI/Wan2.1-T2V-14B", torch_dtype=torch.bfloat16).to("cuda")
video = pipe(prompt="Cinematic macro shot of dew on spiderweb at sunrise", num_frames=81).frames', 'VBench Score: 85.9%, Temporal Consistency: 87.2%, Dynamic Degree: 84.5%', 'Requires high VRAM (16GB+ with offloading, 24GB+ for native 1080p generation).', 'https://github.com/Wan-Video/Wan2.1', '[{"url":"https://github.com/Wan-Video/Wan2.1","text":"Wan 2.1: Open and Advanced Large Video Generation Model"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Weights & Biases', 'Weights & Biases', 'Platform', 'MLOps', 'Proprietary (free for individuals)', 2018, 'N/A', 'The ML experiment tracking and model management platform used by researchers worldwide to log metrics, visualize training, and collaborate on models.', 'Cloud-based experiment tracking with SDK integrations for PyTorch, TensorFlow, JAX, and more.', 'import wandb
wandb.init(project="my-project")
for epoch in range(10):
  loss = train_one_epoch()
  wandb.log({"loss": loss, "epoch": epoch})', 'N/A', 'Data sent to cloud servers (privacy concern), storage limits on free tier.', 'https://wandb.ai', '[{"url":"https://docs.wandb.ai/","text":"W&B Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Weights & Biases Weave', 'Weights & Biases', 'Platform', 'MLOps', 'Apache-2.0 / SaaS', 2024, 'N/A', 'Lightweight LLM observability and evaluation toolkit from W&B that logs, versions, and systematically evaluates generative AI pipelines.', 'Decorated Python tracing library with automated schema extraction and web UI.', 'import weave
weave.init(''my-ai-app'')
@weave.op()
def generate_response(prompt: str) -> str:
    # Automatically tracked in dashboard
    return "Response"', 'Integrated into W&B ML tracking ecosystem used by top frontier AI labs.', 'Requires W&B account login for web UI dashboard.', 'https://wandb.ai/site/weave', '[{"url":"https://weave-docs.wandb.ai","text":"Weave Docs"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Whisper', 'OpenAI', 'Model', 'Audio', 'MIT', 2022, 'Large-v3: 1.55B params', 'OpenAI''s robust automatic speech recognition (ASR) model trained on 680K hours of multilingual and multitask supervised web data.', 'Encoder-decoder transformer operating on log-Mel spectrograms.', 'import whisper
model = whisper.load_model("large-v3")
result = model.transcribe("audio.mp3")
print(result["text"])', 'WER competitive with commercial ASR on LibriSpeech', 'Real-time use requires optimization, struggles with heavy accents and rare languages.', 'https://openai.com/research/whisper', '[{"url":"https://arxiv.org/abs/2212.04356","text":"Radford et al. (2022) - Whisper Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Whisper v3 Turbo', 'OpenAI', 'Model', 'Audio', 'MIT', 2024, '809M params', 'OpenAI''s optimized speech recognition model providing near whisper-large-v3 accuracy at 8x faster inference speed.', 'Pruned 4-layer decoder encoder-decoder Transformer.', 'import whisper
model = whisper.load_model("turbo")
result = model.transcribe("audio.mp3")
print(result["text"])', 'Word Error Rate (WER): 7.1% on multilingual Common Voice; 8x inference speedup.', 'Slight accuracy trade-off in heavily accented or noisy audio compared to full large-v3.', 'https://github.com/openai/whisper', '[{"url":"https://github.com/openai/whisper/discussions/2363","text":"Whisper Turbo Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('wikipedia', 'Wikimedia Foundation', 'Dataset', 'NLP', 'CC-BY-SA-3.0', 2026, '10M<n<100M', 'Clean multilingual Wikipedia dumps structured by Wikimedia Foundation and Hugging Face for language model pretraining and RAG.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("wikimedia/wikipedia")', 'Trending Score: 27, Likes: 1,467, Downloads: 264,787', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/wikimedia/wikipedia', '[{"url":"https://huggingface.co/datasets/wikimedia/wikipedia","text":"wikimedia/wikipedia on Hugging Face Datasets"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('WildChat', 'Allen Institute for AI', 'Dataset', 'NLP', 'ODC-By 1.0', 2024, '1,000,000 conversations', 'Corpus of 1 million real-world user interactions with ChatGPT across 100+ languages, including moderation annotations and toxicity analysis.', 'Real-world conversational turns with multi-turn context and safety classifications.', 'from datasets import load_dataset
ds = load_dataset("allenai/WildChat-1M", split="train")', 'Critical dataset for studying user prompt drift, jailbreak attempts, and multilingual intent.', 'Includes raw unfiltered user queries requiring safety filtering during fine-tuning.', 'https://huggingface.co/datasets/allenai/WildChat-1M', '[{"url":"https://arxiv.org/abs/2405.01070","text":"WildChat Paper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Windsurf', 'Codeium', 'AI', 'AI Coding', 'Proprietary', 2024, 'N/A', 'An AI-powered code editor by Codeium featuring ''Flows'' — a deeply agentic coding experience where AI and developer collaborate on the same codebase simultaneously.', 'IDE Application (VS Code fork with proprietary Codeium AI and agentic flow engine)', 'Download from codeium.com/windsurf and install as a standalone IDE.', 'N/A', 'Newer product with a smaller community than Cursor; some agentic features are still maturing.', 'https://codeium.com/windsurf', '[{"url":"https://codeium.com/windsurf","text":"Windsurf by Codeium"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Writesonic', 'Writesonic', 'AI', 'Productivity', 'Proprietary', 2020, 'N/A', 'An AI writing assistant and chatbot platform that helps generate SEO-optimized articles, landing pages, ads, and social media content at scale.', 'Web Application (Powered by GPT-4 with SEO and marketing-specific tooling)', 'Visit writesonic.com to access the editor and start generating content with templates.', 'N/A', 'Quality can vary for niche topics; word credit limits apply on most plans.', 'https://writesonic.com', '[{"url":"https://writesonic.com","text":"Writesonic"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Xiaomi-OCR-0', 'Xiaomi (MiMo)', 'Model', 'Computer Vision', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Computer Vision model developed by Xiaomi (MiMo).', 'xiaomi-research image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("xiaomi-research/Xiaomi-OCR-0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("xiaomi-research/Xiaomi-OCR-0")', 'Trending Score: 193, Likes: 264, Downloads: 20,802', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/xiaomi-research/Xiaomi-OCR-0', '[{"url":"https://huggingface.co/xiaomi-research/Xiaomi-OCR-0","text":"xiaomi-research/Xiaomi-OCR-0 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Xing4.0-29B-A4B', 'XingChen-AGI', 'Model', 'NLP', 'Apache-2.0', 2026, '29B params', 'Open-weights NLP model developed by XingChen-AGI.', 'XingChen-AGI text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XingChen-AGI/Xing4.0-29B-A4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XingChen-AGI/Xing4.0-29B-A4B")', 'Trending Score: 578, Likes: 653, Downloads: 7,278', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B', '[{"url":"https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B","text":"XingChen-AGI/Xing4.0-29B-A4B on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('yodas3', 'ESPnet', 'Dataset', 'Audio', 'CC-BY-3.0', 2026, '1M<n<10M', 'YODAS v3 Paper YODAS v3 is a large web-crawled dataset containing over 1.1 million hours of audio that were originally released under a CC-BY-3.0 license. The dataset.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("espnet/yodas3")', 'Trending Score: 67, Likes: 70, Downloads: 17,831', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/espnet/yodas3', '[{"url":"https://huggingface.co/datasets/espnet/yodas3","text":"espnet/yodas3 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('YOLOv8', 'Ultralytics', 'Model', 'Computer Vision', 'AGPL-3.0', 2023, 'Nano: 3.2M params to Extra-Large: 68.2M params', 'The latest iteration of the You Only Look Once real-time object detection framework, supporting detection, segmentation, pose estimation, and classification.', 'Single-stage detector with an anchor-free head and a CSPDarknet backbone.', 'from ultralytics import YOLO
model = YOLO("yolov8n.pt")
results = model("https://ultralytics.com/images/bus.jpg")
results[0].show()', 'COCO mAP: 53.9% (YOLOv8x)', 'AGPL license may restrict commercial use without purchase.', 'https://github.com/ultralytics/ultralytics', '[{"url":"https://docs.ultralytics.com/","text":"Ultralytics YOLOv8 Docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('You.com', 'You.com', 'AI', 'NLP', 'Proprietary', 2022, 'N/A', 'An AI-powered search and chat assistant that combines real-time web search with conversational AI, offering modes for research, coding, and writing.', 'Answer Engine / Conversational Agent (Powered by multiple LLMs and web indices)', 'Visit you.com to search and interact with the AI assistant.', 'N/A', 'Quality varies depending on the selected AI mode; some features are behind a paywall.', 'https://you.com', '[{"url":"https://you.com","text":"You.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('youtube', 'Common Pile', 'Dataset', 'NLP', 'Open Data', 2026, '1M<n<10M', 'Creative Commons YouTube Description YouTube is large-scale video-sharing platform where users have the option of uploading content under a CC BY license.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("common-pile/youtube")', 'Trending Score: 6, Likes: 99, Downloads: 1,435', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/common-pile/youtube', '[{"url":"https://huggingface.co/datasets/common-pile/youtube","text":"common-pile/youtube on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('YuE2-3B', 'M-A-P', 'Model', 'Audio', 'CC-BY-NC-4.0', 2026, '3B params', 'Open-weights Audio model developed by M-A-P.', 'm-a-p text to audio architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("m-a-p/YuE2-3B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("m-a-p/YuE2-3B")', 'Trending Score: 453, Likes: 477, Downloads: 5,186', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/m-a-p/YuE2-3B', '[{"url":"https://huggingface.co/m-a-p/YuE2-3B","text":"m-a-p/YuE2-3B on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ZDTaichu5.0-9B', 'TaichuAI', 'Model', 'Multimodal', 'Open Weights', 2026, '9B params', 'Open-weights Multimodal model developed by TaichuAI.', 'TaichuAI image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("TaichuAI/ZDTaichu5.0-9B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("TaichuAI/ZDTaichu5.0-9B")', 'Trending Score: 481, Likes: 1,041, Downloads: 8,313', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/TaichuAI/ZDTaichu5.0-9B', '[{"url":"https://huggingface.co/TaichuAI/ZDTaichu5.0-9B","text":"TaichuAI/ZDTaichu5.0-9B on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ZGCM-1-Data', 'zgcagi', 'Dataset', 'AI Coding', 'Open Data', 2026, '1B<n<10B', 'A Fully Open and Extremely Efficient Foundation Model for Math and Agentic Search Zhongguancun Academy · Zhongguancun Institute of Artificial Intelligence Tech Report · Mode.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("zgcagi/ZGCM-1-Data")', 'Trending Score: 33, Likes: 36, Downloads: 16,585', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/zgcagi/ZGCM-1-Data', '[{"url":"https://huggingface.co/datasets/zgcagi/ZGCM-1-Data","text":"zgcagi/ZGCM-1-Data on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ZONOS3-Mini', 'Zyphra', 'Model', 'Audio', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Audio model developed by Zyphra.', 'Zyphra text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Zyphra/ZONOS3-Mini", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Zyphra/ZONOS3-Mini")', 'Trending Score: 155, Likes: 174, Downloads: 4,170', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Zyphra/ZONOS3-Mini', '[{"url":"https://huggingface.co/Zyphra/ZONOS3-Mini","text":"Zyphra/ZONOS3-Mini on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;
