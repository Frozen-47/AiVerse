-- =============================================================================
-- AiVerse: Full Catalog Part 1 of 2 (383 entries)
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
VALUES ('3d-collection', 'scenario-labs', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '1K<n<10K', 'High-fidelity 3D asset dataset curated by Scenario Labs, featuring thousands of game-ready 3D models with physically based rendering (PBR) textures, clean quad topology, and semantic category tags. Used for training next-generation text-to-3D and image-to-3D generative models.', 'Structured 3D asset dataset containing GLTF/FBX models, PBR texture maps (Albedo, Normal, Roughness, Metalness), and captions.', 'from datasets import load_dataset

dataset = load_dataset("scenario-labs/3d-collection")', '20,000+ game-ready 3D assets optimized for real-time engines and generative diffusion training.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/scenario-labs/3d-collection', '[{"url":"https://huggingface.co/datasets/scenario-labs/3d-collection","text":"scenario-labs/3d-collection on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('3dcodeverse', 'ilabai', 'Dataset', 'Computer Vision', 'CC-BY-NC-SA-4.0', 2026, '1M<n<10M', 'Multimodal dataset by ilabai mapping complex 3D meshes and CAD geometries to executable procedural Python, OpenSCAD, and Blender scripting commands. Designed to train code-driven 3D generative models that produce cleanly organized, parametric 3D models from natural language instructions.', 'Paired dataset containing 3D GLTF meshes, rendered multi-view images, and executable procedural Python/OpenSCAD scripts.', 'from datasets import load_dataset

dataset = load_dataset("ilabai/3dcodeverse")', '150,000+ paired 3D CAD models and procedural code scripts with verified execution logs.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ilabai/3dcodeverse', '[{"url":"https://huggingface.co/datasets/ilabai/3dcodeverse","text":"ilabai/3dcodeverse on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Adobe Firefly', 'Adobe', 'AI', 'Image Generation', 'Proprietary', 2023, 'N/A', 'Adobe''s generative AI tool for image creation and editing, integrated into Photoshop and other Creative Cloud apps, trained exclusively on licensed content. The application is powered by advanced foundation models utilizing web Application / Creative Suite Integration (Proprietary diffusion model). It features an intuitive interface designed to streamline complex image generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Creative Suite Integration (Proprietary diffusion model)', 'Visit firefly.adobe.com or use Generative Fill directly inside Adobe Photoshop.', 'N/A', 'Requires an Adobe account; best features need a Creative Cloud subscription.', 'https://firefly.adobe.com', '[{"text":"Adobe Firefly","url":"https://firefly.adobe.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Adobe Podcast', 'Adobe', 'AI', 'Audio', 'Proprietary', 2022, 'N/A', 'Adobe''s AI audio enhancement tool that automatically removes background noise and enhances microphone quality to make any recording sound studio-recorded. The application is powered by advanced foundation models utilizing web Application (Proprietary AI speech enhancement model — Project Shasta). It features an intuitive interface designed to streamline complex audio workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Proprietary AI speech enhancement model — Project Shasta)', 'Visit podcast.adobe.com, upload an audio file, and use Enhance Speech to clean up the recording.', 'N/A', 'Works best on speech; music or mixed audio may degrade; requires an Adobe account.', 'https://podcast.adobe.com', '[{"text":"Adobe Podcast","url":"https://podcast.adobe.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('agency', 'operand', 'Framework', 'NLP', 'MIT', 2026, '3MB Repo', 'Lightweight, production-ready framework for building deterministic and autonomous multi-agent systems with strictly typed messaging and dynamic communication topologies. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 490, Forks: 29. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/operand/agency
cd agency
pip install -e .', 'GitHub Stars: 490, Forks: 29', 'Requires local Python environment and dependency configuration.', 'https://github.com/operand/agency', '[{"text":"operand/agency on GitHub","url":"https://github.com/operand/agency"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('AI Manga Translator (MangaTranslate)', 'Ficory LLC', 'Platform', 'Multimodal', 'Freemium', 2024, 'Cloud Platform & API', 'Enterprise-grade manga and comic translation platform by Ficory LLC featuring batch translation, speech-bubble OCR, AI in-painting, an online Photoshop-style studio editor, and developer REST APIs. Its cloud and infrastructure runtime provides cloud multimodal pipeline combining speech bubble segmentation, text in-painting, neural machine translation, and typography rendering with web studio and REST API. Core platform telemetry and performance features include: Supports 30+ languages, batch image translation, style-preserving font matching, and daily free check-in credits. Accessible under a Freemium tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Cloud multimodal pipeline combining speech bubble segmentation, text in-painting, neural machine translation, and typography rendering with web studio and REST API.', 'curl -X POST https://api.mangatranslate.com/v1/translate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "image=@comic_page.png" \
  -F "target_lang=en"', 'Supports 30+ languages, batch image translation, style-preserving font matching, and daily free check-in credits.', 'Free tier has daily credit limits; Enterprise volume, advanced Studio editing features, and high-throughput API access require a paid subscription.', 'https://www.mangatranslate.com/ko/ai-manga-translator/', '[{"text":"AI Manga Translator - Official Overview","url":"https://www.mangatranslate.com/ko/ai-manga-translator/"},{"text":"MangaTranslate Pricing & Credits","url":"https://www.mangatranslate.com/ko/ai-manga-translator/pricing/"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ai-notes', 'Lynote', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by Lynote. Trending with 99 community stars. Its cloud and infrastructure runtime provides sTATIC cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 81, Community Likes: 99. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Lynote/ai-notes', 'Trending Score: 81, Community Likes: 99', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Lynote/ai-notes', '[{"text":"Lynote/ai-notes on Hugging Face Spaces","url":"https://huggingface.co/spaces/Lynote/ai-notes"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ai-village', 'aidigestorg', 'Dataset', 'NLP', 'OTHER', 2026, '1M<n<10M', 'AI Village dataset AI Village is an ongoing experiment by AI Digest in which a group of AI agents — built on frontier models from Anthropic, OpenAI, and Google — live (105 likes, 1,715 downloads). The corpus spans 1M<n<10M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 40, Likes: 105, Downloads: 1,715. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("aidigestorg/ai-village")', 'Trending Score: 40, Likes: 105, Downloads: 1,715', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/aidigestorg/ai-village', '[{"text":"aidigestorg/ai-village on Hugging Face Datasets","url":"https://huggingface.co/datasets/aidigestorg/ai-village"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Aider', 'Paul Gauthier', 'AI', 'AI Coding', 'Apache-2.0', 2023, 'Python CLI Application', 'Command-line AI pair programming tool that edits code directly in your local git repository, using repository tree-sitter map architectures to coordinate multi-file changes and automatically create clean git commits. The application is powered by advanced foundation models utilizing terminal REPL with tree-sitter based repo-map graph representations, git integration, and multi-file unified diff engines compatible with any LLM. Key user-facing capabilities include Ranks at the top of the Aider LLM Leaderboard for code editing; automatically generates semantic git commit messages with git diff verification. Available under a Apache-2.0 model for commercial and personal productivity.', 'Terminal REPL with tree-sitter based repo-map graph representations, git integration, and multi-file unified diff engines compatible with any LLM.', 'pip install aider-chat
aider --model claude-3-5-sonnet-20241022
# Inside aider terminal:
/add src/types.ts src/data.ts
Add a new entry for Pixtral 12B and update seed script.', 'Ranks at the top of the Aider LLM Leaderboard for code editing; automatically generates semantic git commit messages with git diff verification.', 'Command-line terminal interface; requires git repository initialization for version control features.', 'https://github.com/Aider-AI/aider', '[{"text":"Aider GitHub Repository","url":"https://github.com/Aider-AI/aider"},{"text":"Aider Official Documentation & LLM Leaderboards","url":"https://aider.chat/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('all-MiniLM-L6-v2', 'sentence-transformers', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by sentence-transformers, trending with over 5,722 community likes and 253,331,994 downloads on Hugging Face, incorporating an architecture of sentence-transformers sentence similarity architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 305, Likes: 5,722, Downloads: 253,331,994. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'sentence-transformers sentence similarity architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("sentence-transformers/all-MiniLM-L6-v2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")', 'Trending Score: 305, Likes: 5,722, Downloads: 253,331,994', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2', '[{"text":"sentence-transformers/all-MiniLM-L6-v2 on Hugging Face","url":"https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Alpaca', 'Stanford AI', 'Model', 'NLP', 'Non-commercial (CC BY NC 4.0)', 2023, '7B params', 'Stanford''s instruction-tuned model based on LLaMA 7B, fine-tuned for ~$600 using Self-Instruct data generated from GPT-3.5, incorporating an architecture of lLaMA fine-tuned on 52K instruction-following examples from GPT-3.5. The model demonstrates competitive performance across verified evaluations, including Comparable to GPT-3.5 text-davinci-003 in human evaluation. With its 7B params design, it supports diverse local and enterprise deployment profiles under the Non-commercial (CC BY NC 4.0) license.', 'LLaMA fine-tuned on 52K instruction-following examples from GPT-3.5.', '# Weights available on HuggingFace
from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("tatsu-lab/alpaca-7b-wdiff")
tokenizer = AutoTokenizer.from_pretrained("tatsu-lab/alpaca-7b-wdiff")', 'Comparable to GPT-3.5 text-davinci-003 in human evaluation', 'Non-commercial license, now largely superseded by better open models.', 'https://crfm.stanford.edu/2023/03/13/alpaca.html', '[{"text":"Alpaca: A Strong Open-Source LLM","url":"https://crfm.stanford.edu/2023/03/13/alpaca.html"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Alpaca Dataset', 'Stanford AI', 'Dataset', 'NLP', 'CC BY NC 4.0', 2023, '52,002 instruction-following pairs', 'Stanford''s 52K instruction-following examples generated by GPT-3.5, kickstarting the open-source instruction tuning movement. The corpus spans 52,002 instruction-following pairs of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Fine-tuning LLaMA 7B on this data produces near-ChatGPT quality. Released under the CC BY NC 4.0 license for open evaluation and research reproducibility.', 'Self-Instruct format: instruction, input (optional), and output triples.', 'from datasets import load_dataset
dataset = load_dataset("tatsu-lab/alpaca")
print(dataset[''train''][0])', 'Fine-tuning LLaMA 7B on this data produces near-ChatGPT quality', 'Non-commercial license, GPT-3.5 generated (potential errors), English-only.', 'https://github.com/tatsu-lab/stanford_alpaca', '[{"text":"Alpaca Dataset Release","url":"https://crfm.stanford.edu/2023/03/13/alpaca.html"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Amazon CodeWhisperer', 'Amazon Web Services', 'AI', 'AI Coding', 'Proprietary', 2022, 'N/A', 'Amazon''s AI code generator integrated into popular IDEs, trained on billions of lines of code and AWS APIs, with built-in security vulnerability scanning. The application is powered by advanced foundation models utilizing iDE Extension (Integrates with VS Code, JetBrains, AWS Cloud9, and more). It features an intuitive interface designed to streamline complex ai coding workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'IDE Extension (Integrates with VS Code, JetBrains, AWS Cloud9, and more)', 'Install the AWS Toolkit extension in VS Code or JetBrains and sign in with an AWS Builder ID.', 'N/A', 'Best suited for AWS-related codebases; individual tier is free but team features are paid.', 'https://aws.amazon.com/codewhisperer', '[{"text":"Amazon CodeWhisperer","url":"https://aws.amazon.com/codewhisperer"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Anyscale', 'Anyscale', 'Platform', 'MLOps', 'Proprietary', 2019, 'Enterprise Distributed AI Platform', 'Production distributed AI compute and model serving platform built by the creators of Ray, enabling scalable pretraining, fine-tuning, and ultra-high-throughput LLM inference across hybrid and multi-cloud infrastructure. Its cloud and infrastructure runtime provides managed cloud compute control plane orchestrating Ray Core, Ray Train, Ray Serve, and vLLM clusters on AWS, GCP, and private Kubernetes. Core platform telemetry and performance features include: Powers large-scale AI production workloads at OpenAI, Uber, and Amazon; scales seamlessly to tens of thousands of heterogeneous GPU cores. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Managed cloud compute control plane orchestrating Ray Core, Ray Train, Ray Serve, and vLLM clusters on AWS, GCP, and private Kubernetes.', 'import ray
ray.init("anyscale://cluster-name")

@ray.remote
def train_batch(data):
    return model.forward(data)

results = ray.get([train_batch.remote(batch) for batch in batches])', 'Powers large-scale AI production workloads at OpenAI, Uber, and Amazon; scales seamlessly to tens of thousands of heterogeneous GPU cores.', 'Requires familiarity with Ray distributed computing abstractions; enterprise tiers required for advanced SSO and multi-tenant billing controls.', 'https://www.anyscale.com', '[{"text":"Anyscale Official Website","url":"https://www.anyscale.com"},{"text":"Ray Open Source Project at Anyscale","url":"https://github.com/ray-project/ray"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Arena-Hard-Auto', 'LMSYS Org', 'Dataset', 'Research', 'Apache-2.0', 2024, '500 complex prompts', 'Benchmark of 500 challenging, hard-to-distinguish real-world queries evaluated automatically using LLM-as-a-judge with high correlation to human Chatbot Arena rank. The corpus spans 500 complex prompts of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating 98% rank correlation with human Chatbot Arena ELO at a fraction of human testing cost. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Hard prompt filtering pipeline with GPT-4-Judge pairwise win rate calculations.', 'python -m arena_hard.eval --model-answers answers.jsonl', '98% rank correlation with human Chatbot Arena ELO at a fraction of human testing cost.', 'Susceptible to LLM judge biases such as length and formatting preference.', 'https://github.com/sunshanghai/arena-hard-auto', '[{"text":"Arena-Hard-Auto Release","url":"https://lmsys.org/blog/2024-04-19-arena-hard/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('arxiv-complete', 'secemp9', 'Dataset', 'NLP', 'OTHER', 2026, '100M<n<1B', 'arXiv Complete Corpus A snapshot of arXiv''s metadata, version history, submission files and rendered documents. It covers 3,148,796 papers and includes file contents, (70 likes, 101 downloads). The corpus spans 100M<n<1B of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 70, Likes: 70, Downloads: 101. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("secemp9/arxiv-complete")', 'Trending Score: 70, Likes: 70, Downloads: 101', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/secemp9/arxiv-complete', '[{"text":"secemp9/arxiv-complete on Hugging Face Datasets","url":"https://huggingface.co/datasets/secemp9/arxiv-complete"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Audio8-ASR-Infinite', 'Edge0', 'Model', 'Audio', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Audio open-weights model by Edge0, trending with over 605 community likes and 2,853 downloads on Hugging Face, incorporating an architecture of edge0 automatic speech recognition architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 541, Likes: 605, Downloads: 2,853. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Edge0 automatic speech recognition architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Edge0/Audio8-ASR-Infinite", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Edge0/Audio8-ASR-Infinite")', 'Trending Score: 541, Likes: 605, Downloads: 2,853', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Edge0/Audio8-ASR-Infinite', '[{"text":"Edge0/Audio8-ASR-Infinite on Hugging Face","url":"https://huggingface.co/Edge0/Audio8-ASR-Infinite"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('audit-findings-dataset', 'Zaevlad', 'Dataset', 'AI Coding', 'OTHER', 2026, '10K<n<100K', 'Smart Contract Audit Findings This is raw, semi-structured data — not a ready-to-train dataset. It still requires further cleaning and preparation (deduplication, sev (79 likes, 1,014 downloads). The corpus spans 10K<n<100K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 46, Likes: 79, Downloads: 1,014. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Zaevlad/audit-findings-dataset")', 'Trending Score: 46, Likes: 79, Downloads: 1,014', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Zaevlad/audit-findings-dataset', '[{"text":"Zaevlad/audit-findings-dataset on Hugging Face Datasets","url":"https://huggingface.co/datasets/Zaevlad/audit-findings-dataset"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('AuK', 'Tencent', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by tencent. Trending with 52 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 51, Community Likes: 52. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/tencent/AuK', 'Trending Score: 51, Community Likes: 52', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/tencent/AuK', '[{"text":"tencent/AuK on Hugging Face Spaces","url":"https://huggingface.co/spaces/tencent/AuK"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('AutoGen v0.4', 'Microsoft', 'Framework', 'MLOps', 'MIT', 2024, 'N/A', 'Microsoft''s redesigned asynchronous event-driven multi-agent framework supporting distributed actor patterns, human intervention, and scalable conversations. Under the hood, it incorporates asynchronous actor-based event messaging architecture for agents. Key technical highlights include: Benchmark leader for multi-agent benchmark problem solving (GAIA & SWE-bench). Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Asynchronous actor-based event messaging architecture for agents.', 'from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
agent = AssistantAgent("assistant", OpenAIChatCompletionClient(model="gpt-4o"))', 'Benchmark leader for multi-agent benchmark problem solving (GAIA & SWE-bench).', 'Major API breaking rewrite in v0.4 from legacy v0.2.', 'https://github.com/microsoft/autogen', '[{"text":"AutoGen v0.4 Architecture","url":"https://microsoft.github.io/autogen/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('AWS Bedrock', 'Amazon Web Services', 'Platform', 'MLOps', 'Proprietary', 2023, 'N/A', 'Amazon''s fully managed service for accessing foundation models from Anthropic, Meta, Mistral, and others via a single API with enterprise security. Its cloud and infrastructure runtime provides managed API gateway for foundation models with AWS IAM, VPC, and CloudWatch integration. Built for enterprise scalability and reliability, it offers high-throughput API endpoints, automated workflows, and robust developer integrations. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Managed API gateway for foundation models with AWS IAM, VPC, and CloudWatch integration.', 'import boto3, json
bedrock = boto3.client(''bedrock-runtime'', region_name=''us-east-1'')
body = json.dumps({"prompt": "\n\nHuman: Hi\n\nAssistant:", "max_tokens_to_sample": 300})
response = bedrock.invoke_model(body=body, modelId=''anthropic.claude-v2'')', 'N/A', 'AWS-locked, additional latency vs. direct API, complex IAM setup.', 'https://aws.amazon.com/bedrock/', '[{"text":"AWS Bedrock Documentation","url":"https://docs.aws.amazon.com/bedrock/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Axolotl', 'Open Source', 'Framework', 'MLOps', 'Apache-2.0', 2024, 'N/A', 'Streamlined tool for fine-tuning LLMs with SFT, DPO, KTO, and LoRA across various architectures using simple declarative YAML config files. Under the hood, it incorporates modular PyTorch/Deepspeed/FSDP harness for scalable training. Key technical highlights include: Used to train OpenHermes, Zephyr, and top open-weights community models. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular PyTorch/Deepspeed/FSDP harness for scalable training.', 'accelerate launch -m axolotl.cli.train config.yaml', 'Used to train OpenHermes, Zephyr, and top open-weights community models.', 'Complex multi-node configurations require solid Linux cluster admin experience.', 'https://github.com/axolotl-ai-cloud/axolotl', '[{"text":"Axolotl Repository","url":"https://github.com/axolotl-ai-cloud/axolotl"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Baseten', 'Baseten', 'Platform', 'MLOps', 'Proprietary', 2021, 'Cloud Inference Platform', 'Scalable model inference and serving platform designed for deploying open-source and proprietary foundation models with automated cold-start mitigation, Truss packaging, and dedicated GPUs. Its cloud and infrastructure runtime provides high-performance Kubernetes model serving layer coupled with Truss open-source model packaging, fast model caching, and custom GPU autoscaling. Core platform telemetry and performance features include: Sub-second model cold starts via streaming weights from memory-mapped storage; supports Llama 3, DeepSeek, Whisper, and custom fine-tunes with zero-downtime rollouts. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'High-performance Kubernetes model serving layer coupled with Truss open-source model packaging, fast model caching, and custom GPU autoscaling.', 'import baseten
model = baseten.deployed_model_id("MODEL_ID")
response = model.predict({"prompt": "Analyze this financial statement."})
print(response)', 'Sub-second model cold starts via streaming weights from memory-mapped storage; supports Llama 3, DeepSeek, Whisper, and custom fine-tunes with zero-downtime rollouts.', 'Dedicated GPU hours billed according to hardware tiers (NVIDIA A10G, A100, H100); requires enterprise tier for custom VPC peering.', 'https://www.baseten.co', '[{"text":"Baseten Official Platform","url":"https://www.baseten.co"},{"text":"Truss Open Source Model Framework by Baseten","url":"https://github.com/basetenlabs/truss"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Beam-1.0-501B-A23B', 'reflection', 'Model', 'NLP', 'APACHE-2.0', 2026, '501B params', 'Reflection AI''s open-weights 501B parameter Mixture-of-Experts reasoning model activating 23B parameters per token. Incorporating self-correction mechanisms and reflective chain-of-thought traces, Beam 1.0 continuously validates intermediate reasoning steps before emitting final outputs.', 'Sparse Mixture-of-Experts with reflective self-correction loops and 128k token context window.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("reflection/Beam-1.0-501B-A23B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("reflection/Beam-1.0-501B-A23B")', 'MATH-500: 89.2%, GPQA Diamond: 71.4%, HumanEval: 86.8%, AIME 2024: 74.2%', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/reflection/Beam-1.0-501B-A23B', '[{"url":"https://huggingface.co/reflection/Beam-1.0-501B-A23B","text":"reflection/Beam-1.0-501B-A23B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('BERT', 'Google DeepMind', 'Model', 'NLP', 'Apache-2.0', 2018, 'Base: 110M params, Large: 340M params', 'Google DeepMind''s seminal 2018 bidirectional encoder transformer that revolutionized natural language processing by introducing masked language modeling and pre-training across bidirectional contexts, incorporating an architecture of transformer encoder with bidirectional attention, pre-trained with masked language modeling. The model demonstrates competitive performance across verified evaluations, including GLUE: 80.5% (base), SQuAD: 93.2 F1. With its Base: 110M params, Large: 340M params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Transformer encoder with bidirectional attention, pre-trained with masked language modeling.', 'from transformers import BertTokenizer, BertModel
tokenizer = BertTokenizer.from_pretrained(''bert-base-uncased'')
model = BertModel.from_pretrained(''bert-base-uncased'')', 'GLUE: 80.5% (base), SQuAD: 93.2 F1', 'Limited to 512 tokens, slower than newer models.', 'https://github.com/google-research/bert', '[{"text":"Devlin et al. (2018) - BERT Paper","url":"https://arxiv.org/abs/1810.04805"},{"text":"Official GitHub Repository","url":"https://github.com/google-research/bert"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('bfs-best-face-swap', 'hugging-apps', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by hugging-apps. Trending with 119 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 80, Community Likes: 119. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/hugging-apps/bfs-best-face-swap', 'Trending Score: 80, Community Likes: 119', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/hugging-apps/bfs-best-face-swap', '[{"text":"hugging-apps/bfs-best-face-swap on Hugging Face Spaces","url":"https://huggingface.co/spaces/hugging-apps/bfs-best-face-swap"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('bharat-government-documents', 'ankitjh4', 'Dataset', 'NLP', 'OTHER', 2026, '10K<n<100K', 'Bharat Guide: screened Indian public information documents This snapshot contains 64,964 distinct normalized text bodies and 77,526 source records. Generated 2026-10- (43 likes, 364 downloads). The corpus spans 10K<n<100K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 41, Likes: 43, Downloads: 364. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("ankitjh4/bharat-government-documents")', 'Trending Score: 41, Likes: 43, Downloads: 364', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ankitjh4/bharat-government-documents', '[{"text":"ankitjh4/bharat-government-documents on Hugging Face Datasets","url":"https://huggingface.co/datasets/ankitjh4/bharat-government-documents"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('BigCodeBench', 'BigCode Project', 'Dataset', 'AI Coding', 'Apache-2.0', 2024, '1,140 Python Programming Problems', 'Rigorous software engineering benchmark evaluating code generation across 1,140 challenging programming problems involving 139 diverse external Python libraries and automated unit testing. The corpus spans 1,140 Python Programming Problems of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Evaluates pass@1 under instruction and completion modes across 100+ LLMs; uncovers true library-level software generation deficiencies missed by HumanEval. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Structured programming benchmark suite with ground-truth unit test suites, execution sandbox harnesses, and library dependency isolation.', 'from datasets import load_dataset
ds = load_dataset("bigcode/bigcodebench", split="v0.1.2")
print(ds[0]["task_id"], ds[0]["instruct_prompt"])', 'Evaluates pass@1 under instruction and completion modes across 100+ LLMs; uncovers true library-level software generation deficiencies missed by HumanEval.', 'Requires isolated execution container due to untrusted model code execution spanning diverse external libraries.', 'https://bigcode-bench.github.io', '[{"text":"BigCodeBench Leaderboard & Documentation","url":"https://bigcode-bench.github.io"},{"text":"BigCodeBench Dataset on Hugging Face","url":"https://huggingface.co/datasets/bigcode/bigcodebench"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('BlenderWorld', 'Qwen', 'Dataset', 'Multimodal', 'MIT', 2026, 'n<1K', 'Multimodal 3D rendering and synthetic computer vision dataset generated using Blender by Alibaba''s Qwen team. Spanning over 2 million photorealistic indoor and outdoor scenes with ground-truth depth maps, surface normals, albedo passes, optical flow, and 3D bounding boxes for training spatial foundation models.', 'Synthetic multimodal dataset stored in HDF5 and WebDataset formats with synchronized multi-pass rendering buffers.', 'from datasets import load_dataset

dataset = load_dataset("Qwen/BlenderWorld")', '2M+ scenes with 16 ground-truth vision channels; foundational benchmark for 3D spatial intelligence.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Qwen/BlenderWorld', '[{"url":"https://huggingface.co/datasets/Qwen/BlenderWorld","text":"Qwen/BlenderWorld on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Bolt.new', 'StackBlitz', 'AI', 'AI Coding', 'Proprietary', 2024, 'N/A', 'A browser-based AI full-stack development environment by StackBlitz that lets users prompt, run, edit, and deploy complete web applications without any local setup. The application is powered by advanced foundation models utilizing web Application (Powered by Claude and other LLMs with WebContainers runtime). It features an intuitive interface designed to streamline complex ai coding workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Powered by Claude and other LLMs with WebContainers runtime)', 'Visit bolt.new and describe the app you want to build; it generates and runs the code instantly.', 'N/A', 'Free tier has prompt/token limits; complex apps may require significant manual debugging.', 'https://bolt.new', '[{"text":"Bolt.new","url":"https://bolt.new"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('cad-1000-hours', 'markov-ai', 'Dataset', 'NLP', 'Open Data', 2026, 'Curated Dataset', 'CAD 1000 Hours CAD 1000 Hours is a computer-use dataset containing 1,021.64 hours of recorded work across 597 workflows and 10 CAD, BIM, structural-analysis, and visu (378 likes, 108,423 downloads). The corpus spans Curated Dataset of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 121, Likes: 378, Downloads: 108,423. Released under the Open Data license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("markov-ai/cad-1000-hours")', 'Trending Score: 121, Likes: 378, Downloads: 108,423', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/markov-ai/cad-1000-hours', '[{"text":"markov-ai/cad-1000-hours on Hugging Face Datasets","url":"https://huggingface.co/datasets/markov-ai/cad-1000-hours"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('cai', 'aliasrobotics', 'Framework', 'NLP', 'NOASSERTION', 2026, '153MB Repo', 'Comprehensive open-source Cybersecurity Artificial Intelligence framework by Alias Robotics, designed for automated threat modeling, vulnerability assessment, and LLM application security hardening. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 9,822, Forks: 1,451. Licensed under the NOASSERTION license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/aliasrobotics/cai
cd cai
pip install -e .', 'GitHub Stars: 9,822, Forks: 1,451', 'Requires local Python environment and dependency configuration.', 'https://github.com/aliasrobotics/cai', '[{"text":"aliasrobotics/cai on GitHub","url":"https://github.com/aliasrobotics/cai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Canva AI', 'Canva', 'AI', 'Image Generation', 'Proprietary', 2023, 'N/A', 'A suite of AI-powered design tools inside Canva, including Magic Write for text generation, Magic Media for image creation, and one-click background removal. The application is powered by advanced foundation models utilizing web Application (Integrates Stable Diffusion, proprietary models, and third-party LLMs). It features an intuitive interface designed to streamline complex image generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Integrates Stable Diffusion, proprietary models, and third-party LLMs)', 'Access at canva.com; AI tools are available within the design editor for all account types.', 'N/A', 'Advanced AI features require a Canva Pro subscription; image generation credits are limited.', 'https://www.canva.com/ai-image-generator', '[{"text":"Canva Magic Studio","url":"https://www.canva.com/magic-studio/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Carbon-X', 'HuggingFaceBio', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'HuggingFaceBio''s specialized computational biology and organic chemistry foundation model. Pre-trained on billions of molecular graphs, SMILES strings, and protein-ligand binding structures to predict biochemical properties, drug-target interactions, and synthesis pathways.', 'Geometric deep learning and graph Transformer architecture with 3D equivariant spatial coordinate embeddings.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("HuggingFaceBio/Carbon-X", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("HuggingFaceBio/Carbon-X")', 'BindingDB pKd prediction RMSE: 0.62; top-ranked open model on MoleculeNet benchmarks.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/HuggingFaceBio/Carbon-X', '[{"url":"https://huggingface.co/HuggingFaceBio/Carbon-X","text":"HuggingFaceBio/Carbon-X on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Carbon-X-Release', 'HuggingFaceBio', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive computational biology and drug discovery cloud platform on Hugging Face Spaces by HuggingFaceBio. Provides biochemists and pharmaceutical researchers with browser-based tools for predicting small-molecule binding affinities, visualizing 3D protein-ligand interactions, and optimizing drug candidates.', 'Streamlit and Gradio web interface connecting to Carbon-X molecular foundation models running on cloud GPU clusters.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/HuggingFaceBio/Carbon-X-Release', 'Predicts protein-ligand binding free energies in under 3 seconds per molecular candidate.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/HuggingFaceBio/Carbon-X-Release', '[{"url":"https://huggingface.co/spaces/HuggingFaceBio/Carbon-X-Release","text":"HuggingFaceBio/Carbon-X-Release on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Cerebras Cloud', 'Cerebras Systems', 'Platform', 'MLOps', 'Proprietary', 2024, 'Wafer-scale engine', 'Wafer-Scale AI compute platform powered by CS-3 systems, delivering up to 2,000 tokens per second for Llama 3 models. Its cloud and infrastructure runtime provides wSE-3 single-die wafer processor with 900,000 AI cores and 44GB on-chip SRAM. Core platform telemetry and performance features include: 2,100 tokens/sec on Llama 3.1 8B, 450 tokens/sec on 70B. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'WSE-3 single-die wafer processor with 900,000 AI cores and 44GB on-chip SRAM.', 'from cerebras.cloud.sdk import Cerebras
client = Cerebras(api_key="CEREBRAS_API_KEY")
response = client.chat.completions.create(model="llama3.1-70b", messages=[{"role": "user", "content": "Fast code review."}])', '2,100 tokens/sec on Llama 3.1 8B, 450 tokens/sec on 70B.', 'Proprietary wafer hardware; limited custom model import options.', 'https://cerebras.ai', '[{"text":"Cerebras Inference","url":"https://cerebras.ai/inference"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Character.ai', 'Character Technologies', 'AI', 'NLP', 'Proprietary', 2022, 'N/A', 'A neural language model chatbot web application that can generate human-like text responses and participate in contextual conversation, often used for roleplay. The application is powered by advanced foundation models utilizing web Application / Chatbot (Custom LLMs). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Chatbot (Custom LLMs)', 'Visit character.ai to chat with community-created characters.', 'N/A', 'Highly filtered, mainly focused on entertainment rather than factual accuracy.', 'https://character.ai', '[{"text":"Character.ai","url":"https://character.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ChatGPT', 'OpenAI', 'AI', 'NLP', 'Proprietary', 2022, 'N/A', 'An advanced AI assistant by OpenAI, utilizing the GPT-4 family of models to converse, write code, and assist with a wide range of tasks. The application is powered by advanced foundation models utilizing web Application / Conversational Agent (Powered by GPT-4/GPT-4o). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Conversational Agent (Powered by GPT-4/GPT-4o)', 'Visit chatgpt.com to interact via the web interface.', 'N/A (See underlying models like GPT-4o)', 'May hallucinate, knowledge cutoff depends on the model version.', 'https://chatgpt.com', '[{"text":"ChatGPT Announcement","url":"https://openai.com/blog/chatgpt"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('chessfly', 'mlabonne', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by mlabonne. Trending with 119 community stars. Its cloud and infrastructure runtime provides sTATIC cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 75, Community Likes: 119. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/mlabonne/chessfly', 'Trending Score: 75, Community Likes: 119', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/mlabonne/chessfly', '[{"text":"mlabonne/chessfly on Hugging Face Spaces","url":"https://huggingface.co/spaces/mlabonne/chessfly"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('china-a-share-l2-level2-limit-order-book-tick-data', 'venvoo', 'Dataset', 'NLP', 'OTHER', 2026, 'n>1T', 'China A-Share Level-2 Archive 2017–2026 · Quotes, orders and trades · Parquet A historical archive of Chinese exchange Level-2 data, supplied through a vendor export. (281 likes, 120,455 downloads). The corpus spans n>1T of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 33, Likes: 281, Downloads: 120,455. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("venvoo/china-a-share-l2-level2-limit-order-book-tick-data")', 'Trending Score: 33, Likes: 281, Downloads: 120,455', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/venvoo/china-a-share-l2-level2-limit-order-book-tick-data', '[{"text":"venvoo/china-a-share-l2-level2-limit-order-book-tick-data on Hugging Face Datasets","url":"https://huggingface.co/datasets/venvoo/china-a-share-l2-level2-limit-order-book-tick-data"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude', 'Anthropic', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Anthropic''s AI assistant, known for its high capabilities in coding, writing, and logical reasoning, and featuring a large context window. The application is powered by advanced foundation models utilizing web Application / Conversational Agent (Powered by Claude 3/3.5 Family). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Conversational Agent (Powered by Claude 3/3.5 Family)', 'Visit claude.ai to interact via the web interface.', 'N/A (See underlying models like Claude 3.5 Sonnet)', 'May refuse prompts due to strict safety filters.', 'https://claude.ai', '[{"text":"Claude Announcement","url":"https://www.anthropic.com/claude"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude 3 Haiku', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2024, 'Unknown', 'Anthropic''s fastest and most compact model for near-instant responsiveness, ideal for quick queries and high-volume tasks, incorporating an architecture of transformer-based LLM optimized for speed. The model demonstrates competitive performance across verified evaluations, including MMLU: 75.2%, HumanEval: 75.9%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Transformer-based LLM optimized for speed.', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-3-haiku-20240307",
  max_tokens=1000,
  messages=[{"role": "user", "content": "Summarize this quickly."}]
)', 'MMLU: 75.2%, HumanEval: 75.9%', 'Lacks the deep reasoning capabilities of Sonnet and Opus.', 'https://www.anthropic.com/claude', '[{"text":"Claude 3 Model Card","url":"https://www.anthropic.com/news/claude-3-family"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude 3 Opus', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2024, 'Unknown', 'Anthropic''s most powerful model for complex analysis, long documents, and nuanced reasoning tasks requiring deep comprehension, incorporating an architecture of transformer-based LLM with Constitutional AI and RLHF training. The model demonstrates competitive performance across verified evaluations, including MMLU: 86.8%, GPQA: 50.4%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Transformer-based LLM with Constitutional AI and RLHF training.', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-3-opus-20240229",
  max_tokens=2048,
  messages=[{"role": "user", "content": "Analyze this research paper."}]
)', 'MMLU: 86.8%, GPQA: 50.4%', 'Slower and more expensive than Sonnet, proprietary API.', 'https://www.anthropic.com/claude', '[{"text":"Claude 3 Model Card","url":"https://www.anthropic.com/news/claude-3-family"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude 3.5 Haiku', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2024, 'Unknown', 'Anthropic''s fastest language model, matching original Claude 3 Opus capabilities at blazing speed and lower operational cost, incorporating an architecture of compact distilled Transformer with Constitutional AI alignment. The model demonstrates competitive performance across verified evaluations, including MMLU: 80.9%, HumanEval: 75.9%, GPQA: 41.6%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Compact distilled Transformer with Constitutional AI alignment.', 'import anthropic
client = anthropic.Anthropic()
response = client.messages.create(
  model="claude-3-5-haiku-20241022",
  max_tokens=1024,
  messages=[{"role": "user", "content": "Extract entities from this invoice."}]
)', 'MMLU: 80.9%, HumanEval: 75.9%, GPQA: 41.6%', 'Less suited for open-ended multi-page deep thesis analysis.', 'https://www.anthropic.com/claude', '[{"text":"Claude 3.5 Haiku Release","url":"https://www.anthropic.com/news/claude-3-5-haiku"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude 3.5 Sonnet', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2024, 'Unknown', 'Anthropic''s highly capable and exceptionally fast language model, known for advanced coding abilities, nuanced reasoning, and the interactive ''Artifacts'' UI, incorporating an architecture of transformer-based LLM with Constitutional AI training. The model demonstrates competitive performance across verified evaluations, including MMLU: 88.3%, HumanEval: 92.0%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Transformer-based LLM with Constitutional AI training.', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-3-5-sonnet-20240620",
  max_tokens=1000,
  messages=[{"role": "user", "content": "Write a React component."}]
)', 'MMLU: 88.3%, HumanEval: 92.0%', 'Proprietary API, strict safety filters can sometimes refuse benign prompts.', 'https://www.anthropic.com/claude', '[{"text":"Claude 3.5 Sonnet Release","url":"https://www.anthropic.com/news/claude-3-5-sonnet"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude 3.7 Sonnet', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2025, 'Unknown', 'Anthropic''s hybrid reasoning frontier model that dynamically switches between near-instant conversational responses and deep extended step-by-step thinking, incorporating an architecture of transformer-based multimodal foundation model with controllable thinking budget tokens. The model demonstrates competitive performance across verified evaluations, including SWE-bench Verified: 70.3%, GPQA Diamond: 65.2%, TAU-bench: 81.2%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Transformer-based multimodal foundation model with controllable thinking budget tokens.', 'import anthropic
client = anthropic.Anthropic()
response = client.messages.create(
  model="claude-3-7-sonnet-20250219",
  max_tokens=4096,
  thinking={"type": "enabled", "budget_tokens": 2048},
  messages=[{"role": "user", "content": "Analyze complex architecture vulnerabilities."}]
)', 'SWE-bench Verified: 70.3%, GPQA Diamond: 65.2%, TAU-bench: 81.2%', 'Extended reasoning uses token budget; proprietary API pricing.', 'https://www.anthropic.com/claude', '[{"text":"Claude 3.7 Sonnet Announcement","url":"https://www.anthropic.com/news/claude-3-7-sonnet"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable', 'Anthropic', 'Model', 'AI Coding', 'Proprietary', 2026, 'Mythos-Class Architecture', 'Anthropic''s flagship Mythos-class generative AI model engineered for long-running agentic projects, multi-application computer use, and root-cause software engineering with frontier safety classifiers, incorporating an architecture of constitutional AI foundation model sharing core weights with Claude Mythos, augmented with high-assurance safety classifiers and deep multi-step reflective reasoning. The model demonstrates competitive performance across verified evaluations, including SWE-bench Verified: 80.9%, TAU-bench: 78.4%, Math-500: 95.2%, 1M token context window. With its Mythos-Class Architecture design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Constitutional AI foundation model sharing core weights with Claude Mythos, augmented with high-assurance safety classifiers and deep multi-step reflective reasoning.', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-fable-5-1",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Analyze root causes for distributed consensus race conditions across 100k nodes."}]
)', 'SWE-bench Verified: 80.9%, TAU-bench: 78.4%, Math-500: 95.2%, 1M token context window', 'Proprietary cloud API via Anthropic Console, AWS Bedrock, and Google Cloud Vertex AI.', 'https://anthropic.com/claude', '[{"text":"Anthropic Claude Fable Overview","url":"https://anthropic.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable 5', 'Anthropic', 'Model', 'NLP', 'Proprietary / Commercial', 2026, 'Unknown', 'Claude Fable 5 is Anthropic''s flagship 2026 Mythos-class frontier foundation model engineered for long-horizon autonomous workflows, complex software architecture, multi-application computer use, and professional knowledge synthesis. Featuring a massive 1M token context window and up to 128k output tokens per request, Fable 5 excels at sustained multi-day agentic execution with proactive internal self-verification and constitutional safety fallback boundaries.', 'Mythos-class multimodal Transformer architecture featuring variable dynamic reasoning budgets, native agentic execution sandboxes, and constitutional alignment guardrails.', 'import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-fable-5",
    max_tokens=128000,
    temperature=1.0,
    messages=[
        {"role": "user", "content": "Analyze this codebase, identify any vulnerabilities, and rewrite the flawed modules with self-verifying test cases."}
    ]
)
print(message.content)', 'SWE-bench Verified: 84.9%, OSWorld: 75.2%, GPQA Diamond: 81.4%, OpenRouter Intelligence Index: 64.9 (#1)', 'Premium pricing ($10/1M input, $50/1M output), 30-day mandatory data retention on Bedrock, heavy built-in safeguards that fall back to Opus 4.8 for sensitive topics, recently subject to US government export controls restricting foreign national access.', 'https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5', '[{"text":"Claude Fable 5 - Official Repository","url":"https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable 5.1 (high with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'High-tier reasoning checkpoint of Claude Fable 5.1, delivering superior accuracy on competitive programming and scientific benchmarks, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (57 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 47, Briefcase Elo: 1577, Accuracy: 65%, Non-Hallucination: 30%, FrontierCode: 30%, AutomationBench: 55%, TerminalBench 4: 52%, HLE Diamond: 50%, Speed: 57 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (57 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-fable-5-1-high-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 47, Briefcase Elo: 1577, Accuracy: 65%, Non-Hallucination: 30%, FrontierCode: 30%, AutomationBench: 55%, TerminalBench 4: 52%, HLE Diamond: 50%, Speed: 57 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/claude-fable-5-1-high', '[{"text":"Claude Fable 5.1 (high with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-fable-5-1-high"},{"text":"Claude Fable 5.1 (high with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-fable-5-1-high/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable 5.1 (low with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Low reasoning budget tier of Claude Fable 5.1, designed for rapid code autocomplete and interactive developer assistance, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (55 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 38, Briefcase Elo: 1479, Accuracy: 59%, Non-Hallucination: 40%, FrontierCode: 23%, AutomationBench: 52%, TerminalBench 4: 40%, HLE Diamond: 37%, Speed: 55 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (55 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-fable-5-1-low-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 38, Briefcase Elo: 1479, Accuracy: 59%, Non-Hallucination: 40%, FrontierCode: 23%, AutomationBench: 52%, TerminalBench 4: 40%, HLE Diamond: 37%, Speed: 55 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/claude-fable-5-1-low', '[{"text":"Claude Fable 5.1 (low with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-fable-5-1-low"},{"text":"Claude Fable 5.1 (low with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-fable-5-1-low/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable 5.1 (max with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Maximum compute configuration of Anthropic''s Claude Fable 5.1, engineered for exhaustive chain-of-thought problem solving across complex enterprise repositories, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (69 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 49, Briefcase Elo: 1670, Accuracy: 68%, Non-Hallucination: 30%, FrontierCode: 32%, AutomationBench: 59%, TerminalBench 4: 52%, HLE Diamond: 60%, Speed: 69 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (69 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-fable-5-1-max-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 49, Briefcase Elo: 1670, Accuracy: 68%, Non-Hallucination: 30%, FrontierCode: 32%, AutomationBench: 59%, TerminalBench 4: 52%, HLE Diamond: 60%, Speed: 69 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/claude-fable-5-1', '[{"text":"Claude Fable 5.1 (max with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-fable-5-1"},{"text":"Claude Fable 5.1 (max with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-fable-5-1/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable 5.1 (medium with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Balanced effort tier of Claude Fable 5.1, tuned for continuous enterprise code reviews and automated test generation, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (55 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 43, Briefcase Elo: 1525, Accuracy: 63%, Non-Hallucination: 30%, FrontierCode: 29%, AutomationBench: 55%, TerminalBench 4: 45%, HLE Diamond: 45%, Speed: 55 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (55 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-fable-5-1-medium-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 43, Briefcase Elo: 1525, Accuracy: 63%, Non-Hallucination: 30%, FrontierCode: 29%, AutomationBench: 55%, TerminalBench 4: 45%, HLE Diamond: 45%, Speed: 55 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/claude-fable-5-1-medium', '[{"text":"Claude Fable 5.1 (medium with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-fable-5-1-medium"},{"text":"Claude Fable 5.1 (medium with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-fable-5-1-medium/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable 5.1 (xhigh with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Extra-high reasoning checkpoint of Claude Fable 5.1, excelling at root-cause software debugging and multi-step agentic tool invocation, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (62 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 50, Briefcase Elo: 1651, Accuracy: 67%, Non-Hallucination: 30%, FrontierCode: 36%, AutomationBench: 58%, TerminalBench 4: 55%, HLE Diamond: 59%, Speed: 62 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (62 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-fable-5-1-xhigh-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 50, Briefcase Elo: 1651, Accuracy: 67%, Non-Hallucination: 30%, FrontierCode: 36%, AutomationBench: 58%, TerminalBench 4: 55%, HLE Diamond: 59%, Speed: 62 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/claude-fable-5-1-xhigh', '[{"text":"Claude Fable 5.1 (xhigh with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-fable-5-1-xhigh"},{"text":"Claude Fable 5.1 (xhigh with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-fable-5-1-xhigh/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Haiku 5.5 (high)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'High-efficiency production checkpoint of Claude Haiku 5.5, delivering rapid response times and high accuracy on customer support and routing tasks, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (173 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 30, Briefcase Elo: 1441, Accuracy: 32%, Non-Hallucination: 61%, FrontierCode: 23%, AutomationBench: 34%, TerminalBench 4: 22%, HLE Diamond: 24%, Speed: 173 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (173 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-haiku-5-5-high",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 30, Briefcase Elo: 1441, Accuracy: 32%, Non-Hallucination: 61%, FrontierCode: 23%, AutomationBench: 34%, TerminalBench 4: 22%, HLE Diamond: 24%, Speed: 173 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($0.1/M in, $0.5/M out).', 'https://artificialanalysis.ai/models/claude-haiku-5-5-high', '[{"text":"Claude Haiku 5.5 (high) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-haiku-5-5-high"},{"text":"Claude Haiku 5.5 (high) Inference Providers","url":"https://artificialanalysis.ai/models/claude-haiku-5-5-high/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Haiku 5.5 (max)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Maximum compute configuration of Anthropic''s Claude Haiku 5.5, extracting near-Sonnet reasoning capability at fractions of the latency and cost, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (235 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 36, Briefcase Elo: 1576, Accuracy: 35%, Non-Hallucination: 66%, FrontierCode: 35%, AutomationBench: 35%, TerminalBench 4: 33%, HLE Diamond: 30%, Speed: 235 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (235 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-haiku-5-5-max",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 36, Briefcase Elo: 1576, Accuracy: 35%, Non-Hallucination: 66%, FrontierCode: 35%, AutomationBench: 35%, TerminalBench 4: 33%, HLE Diamond: 30%, Speed: 235 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($0.1/M in, $0.5/M out).', 'https://artificialanalysis.ai/models/claude-haiku-5-5', '[{"text":"Claude Haiku 5.5 (max) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-haiku-5-5"},{"text":"Claude Haiku 5.5 (max) Inference Providers","url":"https://artificialanalysis.ai/models/claude-haiku-5-5/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Haiku 5.5 (xhigh)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Extra-high effort tier of Claude Haiku 5.5, specialized in high-volume document classification, structured JSON parsing, and rapid triage, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (186 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 34, Briefcase Elo: 1525, Accuracy: 34%, Non-Hallucination: 61%, FrontierCode: 30%, AutomationBench: 36%, TerminalBench 4: 29%, HLE Diamond: 29%, Speed: 186 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (186 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-haiku-5-5-xhigh",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 34, Briefcase Elo: 1525, Accuracy: 34%, Non-Hallucination: 61%, FrontierCode: 30%, AutomationBench: 36%, TerminalBench 4: 29%, HLE Diamond: 29%, Speed: 186 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($0.1/M in, $0.5/M out).', 'https://artificialanalysis.ai/models/claude-haiku-5-5-xhigh', '[{"text":"Claude Haiku 5.5 (xhigh) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-haiku-5-5-xhigh"},{"text":"Claude Haiku 5.5 (xhigh) Inference Providers","url":"https://artificialanalysis.ai/models/claude-haiku-5-5-xhigh/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Opus 5.5 (high with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'High reasoning effort tier of Claude Opus 5.5, providing top-echelon benchmark performance on SWE-bench Verified and GPQA Diamond, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (80 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 52, Briefcase Elo: 1682, Accuracy: 65%, Non-Hallucination: 36%, FrontierCode: 36%, AutomationBench: 63%, TerminalBench 4: 57%, HLE Diamond: 56%, Speed: 80 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (80 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-opus-5-5-high-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 52, Briefcase Elo: 1682, Accuracy: 65%, Non-Hallucination: 36%, FrontierCode: 36%, AutomationBench: 63%, TerminalBench 4: 57%, HLE Diamond: 56%, Speed: 80 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($4/M in, $20/M out).', 'https://artificialanalysis.ai/models/claude-opus-5-5-high', '[{"text":"Claude Opus 5.5 (high with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-opus-5-5-high"},{"text":"Claude Opus 5.5 (high with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-opus-5-5-high/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Opus 5.5 (low with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Economical checkpoint of Claude Opus 5.5, delivering flagship analytical comprehension with reduced generation latency, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (78 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 35, Briefcase Elo: 1279, Accuracy: 63%, Non-Hallucination: 34%, FrontierCode: 16%, AutomationBench: 53%, TerminalBench 4: 31%, HLE Diamond: 42%, Speed: 78 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (78 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-opus-5-5-low-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 35, Briefcase Elo: 1279, Accuracy: 63%, Non-Hallucination: 34%, FrontierCode: 16%, AutomationBench: 53%, TerminalBench 4: 31%, HLE Diamond: 42%, Speed: 78 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($4/M in, $20/M out).', 'https://artificialanalysis.ai/models/claude-opus-5-5-low', '[{"text":"Claude Opus 5.5 (low with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-opus-5-5-low"},{"text":"Claude Opus 5.5 (low with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-opus-5-5-low/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Opus 5.5 (max with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Maximum reasoning effort configuration of Anthropic''s flagship Claude Opus 5.5, engineered for deep multi-domain synthesis, PhD-level scientific analysis, and comprehensive autonomous code architecture with 1M context, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (97 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 58, Briefcase Elo: 1801, Accuracy: 66%, Non-Hallucination: 50%, FrontierCode: 46%, AutomationBench: 70%, TerminalBench 4: 60%, HLE Diamond: 68%, Speed: 97 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (97 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-opus-5-5-max-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 58, Briefcase Elo: 1801, Accuracy: 66%, Non-Hallucination: 50%, FrontierCode: 46%, AutomationBench: 70%, TerminalBench 4: 60%, HLE Diamond: 68%, Speed: 97 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($4/M in, $20/M out).', 'https://artificialanalysis.ai/models/claude-opus-5-5', '[{"text":"Claude Opus 5.5 (max with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-opus-5-5"},{"text":"Claude Opus 5.5 (max with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-opus-5-5/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Opus 5.5 (medium with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Standard enterprise tier of Claude Opus 5.5, balancing frontier cognitive reasoning with cost-effective production deployment, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (80 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 48, Briefcase Elo: 1622, Accuracy: 64%, Non-Hallucination: 33%, FrontierCode: 33%, AutomationBench: 61%, TerminalBench 4: 53%, HLE Diamond: 51%, Speed: 80 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (80 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-opus-5-5-medium-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 48, Briefcase Elo: 1622, Accuracy: 64%, Non-Hallucination: 33%, FrontierCode: 33%, AutomationBench: 61%, TerminalBench 4: 53%, HLE Diamond: 51%, Speed: 80 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($4/M in, $20/M out).', 'https://artificialanalysis.ai/models/claude-opus-5-5-medium', '[{"text":"Claude Opus 5.5 (medium with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-opus-5-5-medium"},{"text":"Claude Opus 5.5 (medium with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-opus-5-5-medium/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Opus 5.5 (xhigh with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Extra-high compute configuration of Claude Opus 5.5, delivering exhaustive mathematical proof verification and multi-document legal synthesis, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (85 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 57, Briefcase Elo: 1761, Accuracy: 66%, Non-Hallucination: 35%, FrontierCode: 44%, AutomationBench: 65%, TerminalBench 4: 60%, HLE Diamond: 64%, Speed: 85 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (85 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-opus-5-5-xhigh-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 57, Briefcase Elo: 1761, Accuracy: 66%, Non-Hallucination: 35%, FrontierCode: 44%, AutomationBench: 65%, TerminalBench 4: 60%, HLE Diamond: 64%, Speed: 85 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($4/M in, $20/M out).', 'https://artificialanalysis.ai/models/claude-opus-5-5-xhigh', '[{"text":"Claude Opus 5.5 (xhigh with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-opus-5-5-xhigh"},{"text":"Claude Opus 5.5 (xhigh with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-opus-5-5-xhigh/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Sonnet 5.5 (high with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'High reasoning configuration of Claude Sonnet 5.5, delivering premier software engineering intelligence at enterprise-friendly invocation pricing, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (103 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 41, Briefcase Elo: 1635, Accuracy: 50%, Non-Hallucination: 36%, FrontierCode: 26%, AutomationBench: 59%, TerminalBench 4: 44%, HLE Diamond: 34%, Speed: 103 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (103 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-sonnet-5-5-high-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 41, Briefcase Elo: 1635, Accuracy: 50%, Non-Hallucination: 36%, FrontierCode: 26%, AutomationBench: 59%, TerminalBench 4: 44%, HLE Diamond: 34%, Speed: 103 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/claude-sonnet-5-5-high', '[{"text":"Claude Sonnet 5.5 (high with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-sonnet-5-5-high"},{"text":"Claude Sonnet 5.5 (high with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-sonnet-5-5-high/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Sonnet 5.5 (low with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Fast-response checkpoint of Claude Sonnet 5.5, optimized for interactive code editing and fast conversational agent loops, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (105 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 25, Briefcase Elo: 1268, Accuracy: 46%, Non-Hallucination: 52%, FrontierCode: 7%, AutomationBench: 49%, TerminalBench 4: 21%, HLE Diamond: 21%, Speed: 105 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (105 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-sonnet-5-5-low-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 25, Briefcase Elo: 1268, Accuracy: 46%, Non-Hallucination: 52%, FrontierCode: 7%, AutomationBench: 49%, TerminalBench 4: 21%, HLE Diamond: 21%, Speed: 105 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/claude-sonnet-5-5-low', '[{"text":"Claude Sonnet 5.5 (low with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-sonnet-5-5-low"},{"text":"Claude Sonnet 5.5 (low with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-sonnet-5-5-low/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Sonnet 5.5 (max with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Maximum reasoning effort checkpoint of Anthropic''s Claude Sonnet 5.5, achieving record scores in autonomous coding and multi-file code refactoring across a 1M context window, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (139 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 54, Briefcase Elo: 1814, Accuracy: 51%, Non-Hallucination: 57%, FrontierCode: 42%, AutomationBench: 72%, TerminalBench 4: 64%, HLE Diamond: 53%, Speed: 139 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (139 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-sonnet-5-5-max-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 54, Briefcase Elo: 1814, Accuracy: 51%, Non-Hallucination: 57%, FrontierCode: 42%, AutomationBench: 72%, TerminalBench 4: 64%, HLE Diamond: 53%, Speed: 139 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/claude-sonnet-5-5', '[{"text":"Claude Sonnet 5.5 (max with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-sonnet-5-5"},{"text":"Claude Sonnet 5.5 (max with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-sonnet-5-5/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Sonnet 5.5 (medium with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Balanced production tier of Claude Sonnet 5.5, widely deployed as the industry standard workhorse for automated developer tooling, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (101 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 30, Briefcase Elo: 1440, Accuracy: 46%, Non-Hallucination: 50%, FrontierCode: 11%, AutomationBench: 55%, TerminalBench 4: 30%, HLE Diamond: 24%, Speed: 101 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (101 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-sonnet-5-5-medium-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 30, Briefcase Elo: 1440, Accuracy: 46%, Non-Hallucination: 50%, FrontierCode: 11%, AutomationBench: 55%, TerminalBench 4: 30%, HLE Diamond: 24%, Speed: 101 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/claude-sonnet-5-5-medium', '[{"text":"Claude Sonnet 5.5 (medium with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-sonnet-5-5-medium"},{"text":"Claude Sonnet 5.5 (medium with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-sonnet-5-5-medium/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Sonnet 5.5 (xhigh with fallback)', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Extra-high effort tier of Claude Sonnet 5.5, specialized in complex computer use tasks, desktop automation, and multi-application workflows, incorporating an architecture of proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (107 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 50, Briefcase Elo: 1744, Accuracy: 51%, Non-Hallucination: 38%, FrontierCode: 36%, AutomationBench: 66%, TerminalBench 4: 57%, HLE Diamond: 44%, Speed: 107 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (107 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-sonnet-5-5-xhigh-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 50, Briefcase Elo: 1744, Accuracy: 51%, Non-Hallucination: 38%, FrontierCode: 36%, AutomationBench: 66%, TerminalBench 4: 57%, HLE Diamond: 44%, Speed: 107 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/claude-sonnet-5-5-xhigh', '[{"text":"Claude Sonnet 5.5 (xhigh with fallback) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/claude-sonnet-5-5-xhigh"},{"text":"Claude Sonnet 5.5 (xhigh with fallback) Inference Providers","url":"https://artificialanalysis.ai/models/claude-sonnet-5-5-xhigh/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('clef', 'Cloudflare', 'Model', 'Multimodal', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by Cloudflare, trending with over 368 community likes and 18 downloads on Hugging Face, incorporating an architecture of cloudflare image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 365, Likes: 368, Downloads: 18. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Cloudflare image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Cloudflare/clef", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Cloudflare/clef")', 'Trending Score: 365, Likes: 368, Downloads: 18', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Cloudflare/clef', '[{"text":"Cloudflare/clef on Hugging Face","url":"https://huggingface.co/Cloudflare/clef"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('clef-flash', 'Cloudflare', 'Model', 'Multimodal', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by Cloudflare, trending with over 365 community likes and 4,310 downloads on Hugging Face, incorporating an architecture of cloudflare image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 354, Likes: 365, Downloads: 4,310. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Cloudflare image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Cloudflare/clef-flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Cloudflare/clef-flash")', 'Trending Score: 354, Likes: 365, Downloads: 4,310', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Cloudflare/clef-flash', '[{"text":"Cloudflare/clef-flash on Hugging Face","url":"https://huggingface.co/Cloudflare/clef-flash"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Cline', 'Cline Bot Inc.', 'AI', 'AI Coding', 'Apache-2.0', 2024, 'VS Code Extension', 'Autonomous open-source AI coding assistant extension for VS Code that can create and edit files, execute terminal commands, analyze errors, and perform browser testing with user approval at each step. The application is powered by advanced foundation models utilizing agentic control loop integrating Model Context Protocol (MCP), terminal shell hooks, diff editor integration, and Puppeteer browser automation. Key user-facing capabilities include Over 500,000 active VS Code installations; supports custom MCP servers, full codebase file trees, and human-in-the-loop permission checkpoints. Available under a Apache-2.0 model for commercial and personal productivity.', 'Agentic control loop integrating Model Context Protocol (MCP), terminal shell hooks, diff editor integration, and Puppeteer browser automation.', 'Install the Cline extension in VS Code. Configure your OpenRouter, Anthropic, or Ollama API key and prompt Cline in the sidebar: "Refactor the auth middleware and run unit tests."', 'Over 500,000 active VS Code installations; supports custom MCP servers, full codebase file trees, and human-in-the-loop permission checkpoints.', 'Autonomous actions require careful user oversight when executing destructive terminal commands or large-scale file edits.', 'https://github.com/cline/cline', '[{"text":"Cline GitHub Repository","url":"https://github.com/cline/cline"},{"text":"Cline on Visual Studio Marketplace","url":"https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CLIP', 'OpenAI', 'Model', 'Computer Vision', 'MIT', 2021, 'ViT-L/14: 428M params', 'OpenAI''s foundational multimodal architecture trained on hundreds of millions of image-text pairs via contrastive learning, enabling robust zero-shot classification and semantic visual search, incorporating an architecture of dual encoder with vision transformer and text transformer trained contrastively. The model demonstrates competitive performance across verified evaluations, including Zero-shot ImageNet: 76.2% top-1. With its ViT-L/14: 428M params design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'Dual encoder with vision transformer and text transformer trained contrastively.', 'import clip
model, preprocess = clip.load("ViT-B/32")
image = preprocess(image).unsqueeze(0)
text = clip.tokenize(["a cat", "a dog"])', 'Zero-shot ImageNet: 76.2% top-1', 'Struggles with fine-grained classification, abstract concepts.', 'https://github.com/openai/CLIP', '[{"text":"Radford et al. (2021) - CLIP Paper","url":"https://arxiv.org/abs/2103.00020"},{"text":"Official CLIP Repository","url":"https://github.com/openai/CLIP"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CLM-v0.1-8B', 'Contrastive-LM', 'Model', 'NLP', 'APACHE-2.0', 2026, '8B params', 'High-performance NLP open-weights model by Contrastive-LM, trending with over 531 community likes and 1,910 downloads on Hugging Face, incorporating an architecture of contrastive-LM text ranking architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 522, Likes: 531, Downloads: 1,910. With its 8B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Contrastive-LM text ranking architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Contrastive-LM/CLM-v0.1-8B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Contrastive-LM/CLM-v0.1-8B")', 'Trending Score: 522, Likes: 531, Downloads: 1,910', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Contrastive-LM/CLM-v0.1-8B', '[{"text":"Contrastive-LM/CLM-v0.1-8B on Hugging Face","url":"https://huggingface.co/Contrastive-LM/CLM-v0.1-8B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Code Llama', 'Meta AI', 'Model', 'NLP', 'Llama 2 Community License', 2023, '7B to 70B params', 'Meta''s family of open-source code-specialized models (7B–70B) built on Llama 2, supporting code generation, infilling, and instruction-following for 100+ programming languages, incorporating an architecture of llama 2 fine-tuned on 500B code tokens, with infilling and long-context capability. The model demonstrates competitive performance across verified evaluations, including HumanEval: 53.7% (34B), pass@1. With its 7B to 70B params design, it supports diverse local and enterprise deployment profiles under the Llama 2 Community license.', 'Llama 2 fine-tuned on 500B code tokens, with infilling and long-context capability.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("meta-llama/CodeLlama-34b-Instruct-hf")
model = AutoModelForCausalLM.from_pretrained("meta-llama/CodeLlama-34b-Instruct-hf")', 'HumanEval: 53.7% (34B), pass@1', 'Commercial use constraints from Llama 2 license.', 'https://ai.meta.com/blog/code-llama-large-language-model-coding/', '[{"text":"Code Llama Paper","url":"https://arxiv.org/abs/2308.12950"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Code-Reasoning', 'IFM', 'Dataset', 'AI Coding', 'APACHE-2.0', 2026, '100M<n<1B', 'Code-Reasoning Dataset Description Code problem-solving data with reasoning, direct-answer, and task-synthesis subsets. This repository is part of the K2 (46 likes, 24,363 downloads). The corpus spans 100M<n<1B of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 33, Likes: 46, Downloads: 24,363. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("IFM/Code-Reasoning")', 'Trending Score: 33, Likes: 46, Downloads: 24,363', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/IFM/Code-Reasoning', '[{"text":"IFM/Code-Reasoning on Hugging Face Datasets","url":"https://huggingface.co/datasets/IFM/Code-Reasoning"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Codestral 22B', 'Mistral AI', 'Model', 'AI Coding', 'Mistral Non-Production License', 2024, '22B params', 'Mistral AI''s code generation model tailored for fill-in-the-middle (FIM), code completion, unit test drafting, and repository navigation across 80+ languages, incorporating an architecture of dense autoregressive model with 32k context and bidirectional FIM tokens. The model demonstrates competitive performance across verified evaluations, including HumanEval: 81.1%, MBPP: 78.2%, Spider: 67.5%. With its 22B params design, it supports diverse local and enterprise deployment profiles under the Mistral Non-Production license.', 'Dense autoregressive model with 32k context and bidirectional FIM tokens.', 'from mistralai import Mistral
client = Mistral(api_key="API_KEY")
response = client.fim.complete(
  model="codestral-latest",
  prompt="def calculate_fibonacci(n):",
  suffix="return result"
)', 'HumanEval: 81.1%, MBPP: 78.2%, Spider: 67.5%', 'Non-commercial license for direct weights use unless licensed via Mistral API.', 'https://mistral.ai/news/codestral/', '[{"text":"Codestral Announcement","url":"https://mistral.ai/news/codestral/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CodeVideoBench', 'code-video-model', 'Dataset', 'Computer Vision', 'OTHER', 2026, 'n<1K', 'Multimodal benchmark dataset pairing programming video tutorials, live coding screen recordings, and synchronized GitHub pull request diffs. Designed to train and evaluate video-to-code foundation models on software comprehension, bug reproduction, and developer tutorial understanding.', 'Multimodal dataset containing synchronized MP4 video clips, timestamped whisper audio transcriptions, and AST code diffs.', 'from datasets import load_dataset

dataset = load_dataset("code-video-model/CodeVideoBench")', '25,000+ synchronized video-code pairs spanning Python, TypeScript, Rust, and Go.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/code-video-model/CodeVideoBench', '[{"url":"https://huggingface.co/datasets/code-video-model/CodeVideoBench","text":"code-video-model/CodeVideoBench on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Codex', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2021, '12B params', 'OpenAI''s code-specialized GPT model that powers GitHub Copilot, fine-tuned on billions of lines of public code, incorporating a GPT-3 fine-tuned on 159GB of GitHub code across 54 programming languages architecture. The model demonstrates competitive performance across verified evaluations, including HumanEval: 72% pass@100. With its 12B params design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'GPT-3 fine-tuned on 159GB of GitHub code across 54 programming languages.', '# Codex is accessed via the OpenAI Completions API (deprecated in favor of GPT-4)
from openai import OpenAI
client = OpenAI()
response = client.completions.create(
  model="code-davinci-002",
  prompt="# Python function to sort a list\ndef sort_list(",
  max_tokens=100
)', 'HumanEval: 72% pass@100', 'Deprecated — succeeded by GPT-4, can generate insecure code.', 'https://openai.com/blog/openai-codex', '[{"text":"Chen et al. (2021) - Codex Paper","url":"https://arxiv.org/abs/2107.03374"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CogVideoX-5B', 'Zhipu AI (THUDM)', 'Model', 'Video Generation', 'Apache-2.0', 2024, '5B params', 'Open-source text-to-video foundation model from THUDM featuring 3D causal VAE and Expert Transformer blocks for 6-second video generation, incorporating a 3D Causal Convolutional VAE + Diffusion Transformer (DiT) architecture. The model demonstrates competitive performance across verified evaluations, including VBench dynamic degree: 82.7%, Motion smoothness: 84.1%. With its 5B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', '3D Causal Convolutional VAE + Diffusion Transformer (DiT).', 'from diffusers import CogVideoXPipeline
pipe = CogVideoXPipeline.from_pretrained("THUDM/CogVideoX-5b", torch_dtype=torch.bfloat16)
video = pipe(prompt="A golden retriever swimming in a crystal clear lake").frames[0]', 'VBench dynamic degree: 82.7%, Motion smoothness: 84.1%', 'High memory utilization during spatial-temporal latent decompression.', 'https://github.com/THUDM/CogVideo', '[{"text":"CogVideoX Paper","url":"https://arxiv.org/abs/2408.06072"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Cohere Coral', 'Cohere', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'An enterprise-focused conversational AI assistant by Cohere, designed for business use cases like search, summarization, and knowledge retrieval. The application is powered by advanced foundation models utilizing web Application / Conversational Agent (Powered by Command R+ models). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Conversational Agent (Powered by Command R+ models)', 'Visit coral.cohere.com to interact via the web interface.', 'N/A', 'Primarily optimized for enterprise workflows; less suited for casual general-purpose use.', 'https://coral.cohere.com', '[{"text":"Cohere Coral","url":"https://coral.cohere.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Command R+', 'Cohere', 'Model', 'NLP', 'Proprietary', 2024, '104B params', 'Cohere''s enterprise-grade LLM optimized for RAG (Retrieval-Augmented Generation) and tool use, with strong multilingual support across 10 languages, incorporating an architecture of transformer with specialized grounded generation training for RAG workflows. The model demonstrates competitive performance across verified evaluations, including MMLU: 75.7%, strong RAG and tool use performance. With its 104B params design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Transformer with specialized grounded generation training for RAG workflows.', 'import cohere
co = cohere.Client("YOUR_API_KEY")
response = co.chat(
  model="command-r-plus",
  message="What are the latest trends in AI?",
  documents=[{"text": "...your documents here..."}]
)', 'MMLU: 75.7%, strong RAG and tool use performance', 'Proprietary, optimized for enterprise RAG — may underperform on general chat.', 'https://cohere.com/command', '[{"text":"Command R+ Announcement","url":"https://cohere.com/blog/command-r-plus-microsoft-azure"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Common Crawl', 'Common Crawl Foundation', 'Dataset', 'NLP', 'Public Domain (Terms of Use apply)', 2008, '3+ billion web pages, ~1PB compressed', 'A massive open repository of web crawl data containing petabytes of raw text used as the primary pre-training corpus for most modern LLMs. The corpus spans 3+ billion web pages, ~1PB compressed of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Used to train GPT-3, LLaMA, Falcon, and virtually all frontier models. Released under the Public Domain (Terms of Use apply) license for open evaluation and research reproducibility.', 'WARC/WET file format of crawled web content across decades.', '# Access via AWS S3 public dataset
import boto3
s3 = boto3.client(''s3'', region_name=''us-east-1'')
# Browse at s3://commoncrawl/
response = s3.list_objects_v2(Bucket=''commoncrawl'', Prefix=''crawl-data/CC-MAIN-2024-10/'')', 'Used to train GPT-3, LLaMA, Falcon, and virtually all frontier models', 'Requires extensive filtering (toxic content, duplicates, low quality) before use.', 'https://commoncrawl.org/', '[{"text":"Common Crawl Official Site","url":"https://commoncrawl.org/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Consensus', 'Consensus', 'AI', 'Research', 'Proprietary', 2022, 'N/A', 'An AI-powered academic search engine that finds and synthesizes evidence from peer-reviewed research papers to answer scientific and factual questions. The application is powered by advanced foundation models utilizing web Application (Semantic search over 200M+ academic papers with LLM synthesis layer). It features an intuitive interface designed to streamline complex research workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Semantic search over 200M+ academic papers with LLM synthesis layer)', 'Visit consensus.app, ask a research question, and get answers backed by peer-reviewed citations.', 'N/A', 'Limited to published academic research; GPT-4 powered summaries require a premium plan.', 'https://consensus.app', '[{"text":"Consensus","url":"https://consensus.app"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Continue', 'Continue Dev, Inc.', 'AI', 'AI Coding', 'Apache-2.0', 2023, 'VS Code & JetBrains Extension', 'Open-source AI code assistant extension for VS Code and JetBrains, connecting any commercial or local model to your IDE for tab autocomplete, in-line code generation, and custom context providers. The application is powered by advanced foundation models utilizing typeScript/Python IDE extension supporting custom @-context providers, Model Context Protocol (MCP), and local inference engines (Ollama, LM Studio). Key user-facing capabilities include Over 20,000 GitHub stars; supports fully offline air-gapped deployments with local LLMs and enterprise telemetry controls. Available under a Apache-2.0 model for commercial and personal productivity.', 'TypeScript/Python IDE extension supporting custom @-context providers, Model Context Protocol (MCP), and local inference engines (Ollama, LM Studio).', 'Install Continue from the VS Code Marketplace. Press Cmd/Ctrl+I for inline edits or Cmd/Ctrl+L to chat with your codebase using local Ollama or cloud models.', 'Over 20,000 GitHub stars; supports fully offline air-gapped deployments with local LLMs and enterprise telemetry controls.', 'Autocomplete speed depends heavily on local GPU hardware when running local models; custom slash commands require config.json setup.', 'https://github.com/continuedev/continue', '[{"text":"Continue GitHub Repository","url":"https://github.com/continuedev/continue"},{"text":"Continue Official Documentation","url":"https://docs.continue.dev/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Copilot for Microsoft 365', 'Microsoft', 'AI', 'Productivity', 'Proprietary', 2023, 'N/A', 'Microsoft''s AI assistant embedded in Word, Excel, PowerPoint, Outlook, and Teams, helping users draft, summarize, and analyze within their daily M365 workflow. The application is powered by advanced foundation models utilizing saaS Integration (Powered by GPT-4 with Microsoft Graph data grounding). It features an intuitive interface designed to streamline complex productivity workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'SaaS Integration (Powered by GPT-4 with Microsoft Graph data grounding)', 'Requires a Microsoft 365 subscription with a Copilot add-on; accessible within all M365 apps.', 'N/A', 'Expensive add-on ($30/user/month); quality depends heavily on organizational data quality.', 'https://www.microsoft.com/en-us/microsoft-365/copilot', '[{"text":"Microsoft 365 Copilot","url":"https://blogs.microsoft.com/blog/2023/03/16/introducing-microsoft-365-copilot-your-copilot-for-work/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Copy.ai', 'Copy.ai', 'AI', 'Productivity', 'Proprietary', 2020, 'N/A', 'An AI-powered copywriting tool that generates marketing copy, product descriptions, email sequences, social media posts, and more from short prompts. The application is powered by advanced foundation models utilizing web Application (Powered by GPT-4 with marketing-specific workflows and templates). It features an intuitive interface designed to streamline complex productivity workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Powered by GPT-4 with marketing-specific workflows and templates)', 'Visit copy.ai, select a content type template, enter your product info, and generate copy.', 'N/A', 'Outputs often require editing; free tier limits monthly word count.', 'https://www.copy.ai', '[{"text":"Copy.ai","url":"https://www.copy.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Cosmopedia', 'Hugging Face', 'Dataset', 'NLP', 'Apache-2.0', 2024, '25 Billion tokens', 'Largest synthetic dataset to date, containing over 30 million files and 25 billion tokens of synthetic textbooks, blog posts, and courseware generated by Mixtral. The corpus spans 25 Billion tokens of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Used to train SmolLM and high-density knowledge small models. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Synthetic curriculum generated with prompt engineering over Web of Science and Wikipedia topics.', 'from datasets import load_dataset
ds = load_dataset("HuggingFaceTB/cosmopedia", split="train", streaming=True)', 'Used to train SmolLM and high-density knowledge small models.', 'Synthetic data contains stylistic generation quirks if unfiltered.', 'https://huggingface.co/datasets/HuggingFaceTB/cosmopedia', '[{"text":"Cosmopedia Blog","url":"https://huggingface.co/blog/cosmopedia"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CrewAI', 'CrewAI', 'Framework', 'Productivity', 'MIT', 2024, 'N/A', 'Production-ready framework for orchestrating role-playing autonomous AI agents that collaborate seamlessly to solve complex tasks. Under the hood, it incorporates role-based agent abstraction with task delegation and hierarchical memory. Key technical highlights include: Over 25,000 GitHub stars; widely used in enterprise workflow automation. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Role-based agent abstraction with task delegation and hierarchical memory.', 'from crewai import Agent, Task, Crew
researcher = Agent(role=''Researcher'', goal=''Investigate tech trends'', memory=True)
task = Task(description=''Summarize 2025 AI models'', expected_output=''Bullet summary'', agent=researcher)
crew = Crew(agents=[researcher], tasks=[task])
crew.kickoff()', 'Over 25,000 GitHub stars; widely used in enterprise workflow automation.', 'Iterative agent loops can quickly trigger API rate limits without rate limiting.', 'https://github.com/crewAIInc/crewAI', '[{"text":"CrewAI Documentation","url":"https://docs.crewai.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CulturalRiddles', 'CohereLabsCommunity', 'Dataset', 'NLP', 'OTHER', 2026, '100K<n<1M', 'Multilingual cultural reasoning benchmark dataset curated by Cohere Labs Community, spanning traditional riddles, proverbs, folk wisdom, and idiom-based puzzles from over 40 global language traditions. Tests whether language models understand figurative language, cultural metaphor, and indigenous folklore.', 'Multilingual evaluation dataset with paired cultural annotations, native language text, English translations, and reasoning explanations.', 'from datasets import load_dataset

dataset = load_dataset("CohereLabsCommunity/CulturalRiddles")', '4,500+ culturally verified riddles and proverbs across 42 languages; highlights cultural blind spots in LLMs.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/CohereLabsCommunity/CulturalRiddles', '[{"url":"https://huggingface.co/datasets/CohereLabsCommunity/CulturalRiddles","text":"CohereLabsCommunity/CulturalRiddles on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Cursor', 'Cursor (Anysphere)', 'Platform', 'NLP', 'Proprietary', 2023, 'Based on GPT-4, Claude 3.5, and custom models', 'An AI-first code editor (fork of VS Code) with deep model integration, supporting multi-file edits, codebase chat, and agent-based refactoring. Its cloud and infrastructure runtime provides vS Code fork with custom LSP-integrated AI context window and multi-model routing. Built for enterprise scalability and reliability, it offers high-throughput API endpoints, automated workflows, and robust developer integrations. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'VS Code fork with custom LSP-integrated AI context window and multi-model routing.', '# Cursor is a desktop application
# Use Cmd+K for inline edits
# Use Cmd+L to open chat with full codebase context
# Agent mode: Cmd+Shift+I for autonomous multi-file changes', 'N/A — fastest growing AI code editor in 2024', 'Subscription required for full model access, privacy concerns with code uploads.', 'https://cursor.com/', '[{"text":"Cursor Official Site","url":"https://cursor.com/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('cyber-security', 'Vyber07', 'Dataset', 'NLP', 'APACHE-2.0', 2026, 'n<1K', 'Specialized PhD-level cybersecurity knowledge base and training corpus curated by Vyber07 for training autonomous security analysts and red-team agents. The dataset aggregates deep technical documentation, penetration testing transcripts, CVE root cause analyses, exploit proofs-of-concept, reverse engineering workflows, and MITRE ATT&CK mitigation playbooks.', 'Curated domain corpus structured in Parquet format with instruction-response pairs, code snippets, and security taxonomy tags.', 'from datasets import load_dataset

dataset = load_dataset("Vyber07/cyber-security")', 'Covers 14,000+ verified vulnerability writeups, 350+ MITRE techniques, and full exploitation chains.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Vyber07/cyber-security', '[{"url":"https://huggingface.co/datasets/Vyber07/cyber-security","text":"Vyber07/cyber-security on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('d3', 'vllm-sr', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'vLLM-SR''s speculative decoding draft model designed to accelerate inference pipelines for frontier large language models. By generating draft token candidates that the target model verifies in parallel, d3 increases token generation throughput by 2.5x to 3.5x across standard production serving workloads without accuracy loss.', 'Compact speculative draft Transformer trained specifically for high-accuracy token acceptance alignment with frontier backbones.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("vllm-sr/d3", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("vllm-sr/d3")', 'Speculative token acceptance rate: 76.8%; boosts vLLM inference throughput by up to 3.2x.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/vllm-sr/d3', '[{"url":"https://huggingface.co/vllm-sr/d3","text":"vllm-sr/d3 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Daimon-Infinity', 'daimonrobotics', 'Dataset', 'NLP', 'CC-BY-NC-SA-4.0', 2026, 'Curated Dataset', 'Large-scale embodied AI and robotics dataset curated by Daimon Robotics. Contains continuous multimodal sensor streams, proprioception logs, camera views, and teleoperation demonstrations across real-world industrial and agricultural robotics platforms.', 'High-throughput robotics dataset stored in WebDataset format with synchronized RGB-D video, IMU data, and actuator commands.', 'from datasets import load_dataset

dataset = load_dataset("daimonrobotics/Daimon-Infinity")', '100,000+ hours of physical robot teleoperation and autonomous policy execution data.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/daimonrobotics/Daimon-Infinity', '[{"url":"https://huggingface.co/datasets/daimonrobotics/Daimon-Infinity","text":"daimonrobotics/Daimon-Infinity on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DALL-E 2', 'OpenAI', 'Model', 'Computer Vision', 'Proprietary', 2022, 'Unknown (3.5B params)', 'OpenAI''s second-generation image model introducing inpainting, outpainting, and variations from text and image inputs, incorporating a CLIP-guided hierarchical diffusion model with GLIDE as prior architecture. The model demonstrates competitive performance across verified evaluations, including FID: 10.39 on COCO. With its Unknown (3.5B params) design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'CLIP-guided hierarchical diffusion model with GLIDE as prior.', 'from openai import OpenAI
client = OpenAI()
response = client.images.generate(
  model="dall-e-2",
  prompt="A surrealist painting of a robot reading a book",
  n=1,
  size="1024x1024"
)', 'FID: 10.39 on COCO', 'Superseded by DALL-E 3, limited prompt comprehension vs. newer models.', 'https://openai.com/dall-e-2', '[{"text":"Hierarchical Text-Conditional Image Generation Paper","url":"https://arxiv.org/abs/2204.06125"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DALL-E 3', 'OpenAI', 'Model', 'Computer Vision', 'Proprietary', 2023, 'Unknown', 'OpenAI''s third-generation text-to-image model with dramatically improved prompt adherence, integrated directly into ChatGPT, incorporating an architecture of diffusion model with improved text conditioning via a recaptioning technique. The model demonstrates competitive performance across verified evaluations, including Human preference significantly higher than DALL-E 2, SD, and Midjourney v5. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern computer vision ecosystem.', 'Diffusion model with improved text conditioning via a recaptioning technique.', 'from openai import OpenAI
client = OpenAI()
response = client.images.generate(
  model="dall-e-3",
  prompt="A cozy cabin in a snowy forest at night, cinematic lighting",
  size="1024x1024",
  quality="hd"
)', 'Human preference significantly higher than DALL-E 2, SD, and Midjourney v5', 'Proprietary, no local inference, usage policy restrictions.', 'https://openai.com/dall-e-3', '[{"text":"DALL-E 3 Technical Report","url":"https://openai.com/research/dall-e-3"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DCLM-Baseline', 'DataComp-LM Consortium', 'Dataset', 'NLP', 'ODC-By 1.0', 2024, '3.8 Trillion Tokens · 240B Web Documents', '3.8-trillion token open pretraining dataset produced by the DataComp for Language Models (DCLM) benchmark, demonstrating that systematic model-based data curation outperforms legacy web datasets like RefinedWeb. The corpus spans 3.8 Trillion Tokens · 240B Web Documents of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Models trained on DCLM-Baseline achieve 64.2% 5-shot MMLU at the 7B scale, setting state-of-the-art open pretraining data efficiency standards. Released under the ODC-By 1.0 license for open evaluation and research reproducibility.', 'Common Crawl raw web extraction filtered through resampled fastText quality classifiers and page-level deduplication pipelines.', 'from datasets import load_dataset
ds = load_dataset("apple/DCLM-baseline", streaming=True)
sample = next(iter(ds["train"]))
print(sample["text"][:200])', 'Models trained on DCLM-Baseline achieve 64.2% 5-shot MMLU at the 7B scale, setting state-of-the-art open pretraining data efficiency standards.', 'Very large download volume (multi-terabyte compressed); streaming mode or high-bandwidth cluster storage required for consumption.', 'https://datacomp.ai/dclm', '[{"text":"DataComp for Language Models Official Website","url":"https://datacomp.ai/dclm"},{"text":"DCLM-Baseline on Hugging Face Datasets","url":"https://huggingface.co/datasets/apple/DCLM-baseline"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepInfra', 'DeepInfra', 'Platform', 'MLOps', 'Proprietary', 2023, 'Cloud API', 'Serverless pay-per-token API platform for hosting open-source LLMs, embeddings, speech-to-text, and image generation models at scale. Its cloud and infrastructure runtime provides elastic GPU cluster with automatic scale-to-zero serverless endpoints. Core platform telemetry and performance features include: Low cost per million tokens with sub-200ms latency. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Elastic GPU cluster with automatic scale-to-zero serverless endpoints.', 'import openai
client = openai.OpenAI(api_key="DEEPINFRA_KEY", base_url="https://api.deepinfra.com/v1/openai")
res = client.chat.completions.create(model="meta-llama/Llama-3.3-70B-Instruct", messages=[...])', 'Low cost per million tokens with sub-200ms latency.', 'Proprietary cloud orchestration.', 'https://deepinfra.com', '[{"text":"DeepInfra","url":"https://deepinfra.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek Chat', 'DeepSeek AI', 'AI', 'NLP', 'Proprietary / DeepSeek License', 2023, 'N/A', 'An intelligent AI assistant by DeepSeek, highly capable in coding, math, and logical reasoning, powered by efficient open-weight models. The application is powered by advanced foundation models utilizing web Application / Conversational Agent (Powered by DeepSeek-V2 / DeepSeek Coder). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary / DeepSeek model for commercial and personal productivity.', 'Web Application / Conversational Agent (Powered by DeepSeek-V2 / DeepSeek Coder)', 'Visit chat.deepseek.com to interact.', 'N/A', 'May struggle with some niche topics compared to ChatGPT or Claude.', 'https://chat.deepseek.com', '[{"text":"DeepSeek Chat","url":"https://chat.deepseek.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek V4 Flash Vision (max)', 'DeepSeek AI', 'Model', 'Multimodal', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Maximum compute checkpoint of DeepSeek AI''s native multimodal vision-language MoE model, excelling at high-resolution chart, diagram, and OCR reasoning, incorporating an architecture of proprietary frontier neural architecture developed by DeepSeek AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (40 tok/s). The model demonstrates competitive performance across verified evaluations, including Briefcase Elo: 1420, AutomationBench: 47%, TerminalBench 4: 12%, HLE Diamond: 21%, Speed: 40 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by DeepSeek AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (40 tok/s).', 'import requests

response = requests.post(
  "https://api.deepseekai.com/v1/chat/completions",
  json={"model": "deepseek-v4-flash-vision-max", "messages": [{"role": "user", "content": "Benchmark query"}]}
)', 'Briefcase Elo: 1420, AutomationBench: 47%, TerminalBench 4: 12%, HLE Diamond: 21%, Speed: 40 tok/s, Context Window: 1M', 'Proprietary cloud API access via DeepSeek AI developer platform; subject to API rate limits and token pricing ($1.32/M in, $0.01/M out).', 'https://artificialanalysis.ai/models/deepseek-v4-flash-vision', '[{"text":"DeepSeek V4 Flash Vision (max) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/deepseek-v4-flash-vision"},{"text":"DeepSeek V4 Flash Vision (max) Inference Providers","url":"https://artificialanalysis.ai/models/deepseek-v4-flash-vision/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek V4.1 Flash 1017 (max)', 'DeepSeek AI', 'Model', 'NLP', 'Open', 2026, '1M Context · Open Model', 'Maximum reasoning configuration of DeepSeek AI''s V4.1 Flash, leveraging Multi-head Latent Attention (MLA) and deep thought chains for mathematics and coding, incorporating an architecture of open-weights frontier neural architecture developed by DeepSeek AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (175 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 32, Briefcase Elo: 1570, Accuracy: 40%, Non-Hallucination: 36%, FrontierCode: 28%, AutomationBench: 67%, TerminalBench 4: 34%, HLE Diamond: 25%, Speed: 175 tok/s, Context Window: 1M. With its 1M Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by DeepSeek AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (175 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("DeepSeek/deepseek-v4-1-flash-1017-max", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("DeepSeek/deepseek-v4-1-flash-1017-max")', 'Intelligence Index: 32, Briefcase Elo: 1570, Accuracy: 40%, Non-Hallucination: 36%, FrontierCode: 28%, AutomationBench: 67%, TerminalBench 4: 34%, HLE Diamond: 25%, Speed: 175 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017', '[{"text":"DeepSeek V4.1 Flash 1017 (max) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017"},{"text":"DeepSeek V4.1 Flash 1017 (max) Inference Providers","url":"https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek V4.1 Flash 1017 (non-reasoning)', 'DeepSeek AI', 'Model', 'NLP', 'Open', 2026, '1M Context · Open Model', 'Direct autoregressive inference checkpoint of DeepSeek V4.1 Flash, bypassing extended thought loops for instant high-throughput generation, incorporating an architecture of open-weights frontier neural architecture developed by DeepSeek AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (1153 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 19, Briefcase Elo: 1426, Accuracy: 22%, Non-Hallucination: 75%, FrontierCode: 6%, AutomationBench: 49%, TerminalBench 4: 9%, HLE Diamond: 7%, Speed: 1153 tok/s, Context Window: 1M. With its 1M Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by DeepSeek AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (1153 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("DeepSeek/deepseek-v4-1-flash-1017-non-reasoning", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("DeepSeek/deepseek-v4-1-flash-1017-non-reasoning")', 'Intelligence Index: 19, Briefcase Elo: 1426, Accuracy: 22%, Non-Hallucination: 75%, FrontierCode: 6%, AutomationBench: 49%, TerminalBench 4: 9%, HLE Diamond: 7%, Speed: 1153 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017-non-reasoning', '[{"text":"DeepSeek V4.1 Flash 1017 (non-reasoning) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017-non-reasoning"},{"text":"DeepSeek V4.1 Flash 1017 (non-reasoning) Inference Providers","url":"https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017-non-reasoning/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-Coder', 'DeepSeek AI', 'Model', 'NLP', 'DeepSeek License', 2023, '1.3B to 33B params', 'DeepSeek''s top-performing open-source code model series (1.3B–33B) that outperforms GPT-3.5 Turbo on many coding benchmarks, incorporating an architecture of transformer decoder trained on 2T tokens across 87 programming languages. The model demonstrates competitive performance across verified evaluations, including HumanEval: 79.3% (33B), outperforms GPT-3.5 Turbo. With its 1.3B to 33B params design, it supports diverse local and enterprise deployment profiles under the DeepSeek license.', 'Transformer decoder trained on 2T tokens across 87 programming languages.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/deepseek-coder-33b-instruct")
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/deepseek-coder-33b-instruct")', 'HumanEval: 79.3% (33B), outperforms GPT-3.5 Turbo', 'License restricts certain commercial applications.', 'https://github.com/deepseek-ai/DeepSeek-Coder', '[{"text":"DeepSeek-Coder Paper","url":"https://arxiv.org/abs/2401.14196"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-Coder-V2', 'DeepSeek AI', 'Model', 'AI Coding', 'MIT', 2024, '236B (21B active)', 'Open-source mixture-of-experts code intelligence model supporting 338 programming languages and 128k context window, incorporating an architecture of moE Transformer initialized from DeepSeek-V2 with code & math continual pre-training. The model demonstrates competitive performance across verified evaluations, including HumanEval: 90.2%, MBPP+: 76.2%, SWE-bench: 12.7%. With its 236B (21B active) design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'MoE Transformer initialized from DeepSeek-V2 with code & math continual pre-training.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-Coder-V2-Instruct", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-Coder-V2-Instruct", trust_remote_code=True, device_map="auto")', 'HumanEval: 90.2%, MBPP+: 76.2%, SWE-bench: 12.7%', 'High RAM/VRAM footprint for 236B model; requires distributed inference.', 'https://github.com/deepseek-ai/DeepSeek-Coder-V2', '[{"text":"DeepSeek-Coder-V2 Paper","url":"https://arxiv.org/abs/2406.11931"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-R1', 'DeepSeek AI', 'Model', 'NLP', 'MIT', 2025, '671B (37B active)', 'Breakthrough open-weights reasoning model trained via large-scale reinforcement learning (RL) without supervised fine-tuning, rivaling top proprietary reasoning models, incorporating an architecture of deepSeek-V3 Base + Large-scale Multi-Stage RL with self-verification reasoning. The model demonstrates competitive performance across verified evaluations, including AIME 2024: 79.8%, MATH-500: 97.3%, Codeforces: 96.3 percentile. With its 671B (37B active) design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'DeepSeek-V3 Base + Large-scale Multi-Stage RL with self-verification reasoning.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_KEY", base_url="https://api.deepseek.com")
response = client.chat.completions.create(
  model="deepseek-reasoner",
  messages=[{"role": "user", "content": "Solve: What is the sum of integers from 1 to 100?"}]
)', 'AIME 2024: 79.8%, MATH-500: 97.3%, Codeforces: 96.3 percentile', 'Outputs lengthy reasoning chains which increase token consumption and response latency.', 'https://www.deepseek.com', '[{"text":"DeepSeek-R1 Technical Report","url":"https://arxiv.org/abs/2501.12948"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-R1-Distill-Qwen-32B', 'DeepSeek AI', 'Model', 'NLP', 'MIT', 2025, '32B params', 'Dense 32B reasoning model distilled from DeepSeek-R1 onto Qwen2.5-32B, delivering top-tier mathematical and coding logic on consumer hardware, incorporating an architecture of qwen2.5-32B backbone fine-tuned on 800k DeepSeek-R1 reasoning trajectories. The model demonstrates competitive performance across verified evaluations, including AIME 2024: 72.6%, MATH-500: 94.3%, LiveCodeBench: 57.2%. With its 32B params design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'Qwen2.5-32B backbone fine-tuned on 800k DeepSeek-R1 reasoning trajectories.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-R1-Distill-Qwen-32B", device_map="auto")', 'AIME 2024: 72.6%, MATH-500: 94.3%, LiveCodeBench: 57.2%', 'Higher resource consumption than 8B models; requires ~20GB VRAM with 4-bit quantization.', 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B', '[{"text":"DeepSeek-R1 Distillation","url":"https://github.com/deepseek-ai/DeepSeek-R1"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V2', 'DeepSeek AI', 'Model', 'NLP', 'DeepSeek License', 2024, '236B total (21B active)', 'DeepSeek''s efficient MoE model with 236B total parameters but only 21B active, offering GPT-4 class performance at dramatically lower inference cost, incorporating an architecture of multi-head Latent Attention (MLA) + DeepSeekMoE architecture. The model demonstrates competitive performance across verified evaluations, including MMLU: 78.5%, strong on math and code. With its 236B total (21B active) design, it supports diverse local and enterprise deployment profiles under the DeepSeek license.', 'Multi-head Latent Attention (MLA) + DeepSeekMoE architecture.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V2")
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-V2", trust_remote_code=True)', 'MMLU: 78.5%, strong on math and code', 'Complex MoE deployment, license restricts certain commercial uses.', 'https://www.deepseek.com/', '[{"text":"DeepSeek-V2 Paper","url":"https://arxiv.org/abs/2405.04434"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V3', 'DeepSeek AI', 'Model', 'NLP', 'MIT', 2024, '671B (37B active)', 'DeepSeek''s flagship 671B Mixture-of-Experts (MoE) model with Multi-head Latent Attention (MLA), activating 37B params per token with industry-leading efficiency, incorporating an architecture of multi-head Latent Attention (MLA) + DeepSeekMoE + FP8 Mixed Precision Training. The model demonstrates competitive performance across verified evaluations, including MMLU-Redux: 89.1%, HumanEval: 90.2%, MATH-500: 75.7%. With its 671B (37B active) design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'Multi-head Latent Attention (MLA) + DeepSeekMoE + FP8 Mixed Precision Training.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_KEY", base_url="https://api.deepseek.com")
response = client.chat.completions.create(
  model="deepseek-chat",
  messages=[{"role": "user", "content": "Explain MLA architecture."}]
)', 'MMLU-Redux: 89.1%, HumanEval: 90.2%, MATH-500: 75.7%', 'Massive parameter footprint requires multi-GPU or cloud API hosting.', 'https://www.deepseek.com', '[{"text":"DeepSeek-V3 Technical Report","url":"https://github.com/deepseek-ai/DeepSeek-V3"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4-Flash-Vision-Exp', 'DeepSeek AI', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'High-performance Multimodal open-weights model by DeepSeek, trending with over 631 community likes and 184,542 downloads on Hugging Face, incorporating an architecture of deepSeek image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 582, Likes: 631, Downloads: 184,542. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'DeepSeek image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-V4-Flash-Vision-Exp", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V4-Flash-Vision-Exp")', 'Trending Score: 582, Likes: 631, Downloads: 184,542', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp', '[{"text":"deepseek-ai/DeepSeek-V4-Flash-Vision-Exp on Hugging Face","url":"https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash', 'DeepSeek AI', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'DeepSeek AI''s bleeding-edge Mixture-of-Experts architecture featuring Multi-head Latent Attention (MLA), high-speed speculative decoding, and deep mathematical reasoning across 1M tokens, incorporating an architecture of deepSeek image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 1336, Likes: 1,394, Downloads: 6. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'DeepSeek image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-V4.1-Flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V4.1-Flash")', 'Trending Score: 1336, Likes: 1,394, Downloads: 6', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash', '[{"text":"deepseek-ai/DeepSeek-V4.1-Flash on Hugging Face","url":"https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash-1017', 'DeepSeek', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'DeepSeek''s ultra-fast distilled multimodal Mixture-of-Experts foundation model, featuring Multi-head Latent Attention (MLA) and FP8 mixed precision inference. Designed for high-throughput enterprise deployments, it delivers near-flagship reasoning and coding speed at a fraction of traditional operating costs.', 'Distilled multimodal MoE with Multi-head Latent Attention (MLA), dynamic context caching, and FP8 quantized execution.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-V4.1-Flash-1017", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V4.1-Flash-1017")', 'Inference throughput: 280 tokens/sec; HumanEval: 88.6%; MMLU: 84.3%; Artificial Analysis Speed Leader.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017', '[{"url":"https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017","text":"deepseek-ai/DeepSeek-V4.1-Flash-1017 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash-1017-abliterated-GGUF', 'orcarouter', 'Model', 'NLP', 'MIT', 2026, 'Open Weights', 'OrcaRouter''s abliterated GGUF quantization of DeepSeek-V4.1 Flash. By mathematically neutralizing directional refusal vectors in latent space, it provides an unconstrained research model for cybersecurity red-teaming, jailbreak robustness research, and uninhibited creative writing.', 'Directionally abliterated Mixture-of-Experts weights quantized into GGUF format for llama.cpp execution.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("orcarouter/DeepSeek-V4.1-Flash-1017-abliterated-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("orcarouter/DeepSeek-V4.1-Flash-1017-abliterated-GGUF")', '0% refusal rate on red-team evaluation suites while maintaining 99.4% standard benchmark accuracy.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/orcarouter/DeepSeek-V4.1-Flash-1017-abliterated-GGUF', '[{"url":"https://huggingface.co/orcarouter/DeepSeek-V4.1-Flash-1017-abliterated-GGUF","text":"orcarouter/DeepSeek-V4.1-Flash-1017-abliterated-GGUF on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF', 'ISTA-DASLab', 'Model', 'NLP', 'MIT', 2026, 'Open Weights', 'ISTA-DASLab''s GSQ-RCO quantized release of DeepSeek-V4.1 Flash, maximizing token generation speed and perplexity retention on commodity CPU and RAM hardware via llama.cpp. Enables high-speed local inference of DeepSeek''s flagship architecture without dedicated GPUs.', 'GSQ-RCO specialized quantization of DeepSeek-V4.1 Flash Mixture-of-Experts for optimal CPU cache utilization.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF")', 'Achieves 45 tokens/sec on modern 8-core x86 CPUs with under 12GB RAM utilization.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF', '[{"url":"https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF","text":"ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8', 'dealignai', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'DealignAI''s FP8 quantized uncensored distribution of DeepSeek-V4.1 Flash. By removing alignment refusal boundaries while preserving foundational intelligence, it serves researchers and security analysts conducting red-teaming, unrestricted creative writing, and adversarial robustness testing.', 'FP8 quantized Mixture-of-Experts with neutralized safety refusal vectors and Multi-head Latent Attention.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8")', 'Achieves identical MMLU and coding scores to stock DeepSeek-V4.1 Flash with 0% refusal rate on red-team prompts.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8', '[{"url":"https://huggingface.co/dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8","text":"dealignai/DeepSeek-V4.1-Flash-1017-UNCENSORED-FP8 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSpeed', 'Microsoft', 'Framework', 'MLOps', 'Apache-2.0', 2020, 'N/A', 'Microsoft''s deep learning optimization library that makes distributed training, parameter offloading (ZeRO-1/2/3/Infinity), and high-throughput inference scalable and efficient on commodity and enterprise hardware. Under the hood, it incorporates distributed memory optimization engine featuring Zero Redundancy Optimizer (ZeRO), ZeRO-Offload, 3D parallelism (data, tensor, pipeline), and DeepSpeed-MoE. Key technical highlights include: Powers trillion-parameter distributed training runs (BLOOM, Megatron-Turing NLG); reduces memory footprint up to 10x via ZeRO-3. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Distributed memory optimization engine featuring Zero Redundancy Optimizer (ZeRO), ZeRO-Offload, 3D parallelism (data, tensor, pipeline), and DeepSpeed-MoE.', 'deepspeed --num_gpus=8 train.py --deepspeed deepspeed_config.json', 'Powers trillion-parameter distributed training runs (BLOOM, Megatron-Turing NLG); reduces memory footprint up to 10x via ZeRO-3.', 'Configuration complexity with multi-node networking and custom CUDA kernel compilation requirements across varying driver environments.', 'https://github.com/microsoft/DeepSpeed', '[{"text":"Microsoft DeepSpeed GitHub Repository","url":"https://github.com/microsoft/DeepSpeed"},{"text":"DeepSpeed Official Documentation","url":"https://www.deepspeed.ai/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Descript', 'Descript', 'AI', 'Audio', 'Proprietary', 2017, 'N/A', 'An AI-powered audio and video editing tool that lets users edit media by editing the transcript, with features like voice cloning, filler word removal, and overdub. The application is powered by advanced foundation models utilizing desktop / Web Application (Proprietary ASR + TTS + video editing pipeline). It features an intuitive interface designed to streamline complex audio workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Desktop / Web Application (Proprietary ASR + TTS + video editing pipeline)', 'Download Descript from descript.com; import audio or video and edit by modifying the transcript.', 'N/A', 'Overdub voice cloning requires recording samples; some AI features are in paid tiers only.', 'https://www.descript.com', '[{"text":"Descript","url":"https://www.descript.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeskForge-1M', 'docling-project', 'Dataset', 'Computer Vision', 'MIT', 2026, '1M<n<10M', 'DeskForge-1M DeskForge-1M is a corpus of 1.21M annotated desktop screenshots with 159.7M element instances and 917K recorded click transitions, generated with DeskFor (34 likes, 4,899 downloads). The corpus spans 1M<n<10M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 34, Likes: 34, Downloads: 4,899. Released under the MIT license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("docling-project/DeskForge-1M")', 'Trending Score: 34, Likes: 34, Downloads: 4,899', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/docling-project/DeskForge-1M', '[{"text":"docling-project/DeskForge-1M on Hugging Face Datasets","url":"https://huggingface.co/datasets/docling-project/DeskForge-1M"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Devin', 'Cognition AI', 'AI', 'AI Coding', 'Proprietary', 2024, 'N/A', 'The first autonomous AI software engineer, equipped with its own sandboxed shell, code editor, and browser to solve end-to-end engineering tasks independently. The application is powered by advanced foundation models utilizing autonomous multi-step agent architecture with sandboxed compute environment. Key user-facing capabilities include 13.86% resolved on SWE-bench at launch; over 45% on modern benchmarks. Available under a Proprietary model for commercial and personal productivity.', 'Autonomous multi-step agent architecture with sandboxed compute environment.', 'Assign a GitHub issue or feature ticket to Devin via the Cognition dashboard or Slack integration.', '13.86% resolved on SWE-bench at launch; over 45% on modern benchmarks.', 'Requires human verification for large architectural migrations and security critical code.', 'https://cognition.ai', '[{"text":"Devin Announcement","url":"https://cognition.ai/blog/introducing-devin"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Distilabel', 'Argilla', 'Framework', 'Research', 'Apache-2.0', 2024, 'N/A', 'Argilla''s framework for synthetic data generation and AI feedback (RLAIF) capable of scaling pipelines for multi-turn DPO, preference datasets, and instruction fine-tuning. Under the hood, it incorporates step-based data synthesis and evaluation pipeline orchestrator. Key technical highlights include: Powered the creation of UltraFeedback, OpenHermes, and benchmark preference datasets. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Step-based data synthesis and evaluation pipeline orchestrator.', 'from distilabel.pipeline import Pipeline
with Pipeline("SyntheticData") as pipeline:
    # Define generation steps and LLM judges', 'Powered the creation of UltraFeedback, OpenHermes, and benchmark preference datasets.', 'Generates high API usage costs when scaling large synthetic batches.', 'https://github.com/argilla-io/distilabel', '[{"text":"Distilabel Docs","url":"https://distilabel.argilla.io"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Dolma Dataset', 'Allen Institute for AI', 'Dataset', 'NLP', 'ODC-By 1.0', 2024, '3 Trillion tokens', '3-trillion token open pretraining dataset curated by the Allen Institute for AI (AI2) to power the open-source OLMo language models. The corpus spans 3 Trillion tokens of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Fully open pretraining recipe allowing 100% scientific reproducibility for LLM training. Released under the ODC-By 1.0 license for open evaluation and research reproducibility.', 'De-duplicated, safety-filtered web corpus from Common Crawl, Reddit, peS2o, and GitHub.', 'from datasets import load_dataset
ds = load_dataset("allenai/dolma", split="train", streaming=True)', 'Fully open pretraining recipe allowing 100% scientific reproducibility for LLM training.', 'Full dataset download requires high bandwidth and petabyte-scale storage.', 'https://github.com/allenai/dolma', '[{"text":"Dolma Technical Paper","url":"https://arxiv.org/abs/2402.00159"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('drama-3', 'fishaudio', 'Model', 'Audio', 'OTHER', 2026, 'Open Weights', 'High-performance Audio open-weights model by fishaudio, trending with over 480 community likes and 4,048 downloads on Hugging Face, incorporating an architecture of fishaudio text to speech architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 466, Likes: 480, Downloads: 4,048. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the OTHER license.', 'fishaudio text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("fishaudio/drama-3", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("fishaudio/drama-3")', 'Trending Score: 466, Likes: 480, Downloads: 4,048', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/fishaudio/drama-3', '[{"text":"fishaudio/drama-3 on Hugging Face","url":"https://huggingface.co/fishaudio/drama-3"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DSPy', 'Stanford AI', 'Framework', 'Research', 'MIT', 2024, 'N/A', 'Stanford NLP''s framework for algorithmically optimizing language model prompts, weights, and retrieval parameters via declarative modules and automatic teleprompters. Under the hood, it incorporates declarative LM programming framework with compiler/optimizer loop. Key technical highlights include: Improves pipeline accuracy by 25%-40% compared to static prompt chains. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Declarative LM programming framework with compiler/optimizer loop.', 'import dspy
dspy.settings.configure(lm=dspy.OpenAI(model=''gpt-4o''))
class MultiHopQA(dspy.Module):
    def __init__(self):
        self.generate_query = dspy.ChainOfThought("claim -> query")
        self.retrieve = dspy.Retrieve(k=3)', 'Improves pipeline accuracy by 25%-40% compared to static prompt chains.', 'Requires learning module abstractions rather than writing raw prompt strings.', 'https://github.com/stanfordnlp/dspy', '[{"text":"DSPy Paper","url":"https://arxiv.org/abs/2310.03714"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Duolingo Max', 'Duolingo', 'AI', 'Education', 'Proprietary', 2023, 'N/A', 'Duolingo''s premium AI-powered tier featuring GPT-4 driven features like Explain My Answer for detailed feedback and Roleplay for open-ended AI conversation practice. The application is powered by advanced foundation models utilizing mobile / Web Application (Powered by GPT-4 integrated into the Duolingo platform). It features an intuitive interface designed to streamline complex education workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Mobile / Web Application (Powered by GPT-4 integrated into the Duolingo platform)', 'Upgrade to Duolingo Max within the Duolingo iOS or Android app to access AI features.', 'N/A', 'Only available for select languages; requires a paid Max subscription on top of Duolingo Plus.', 'https://blog.duolingo.com/duolingo-max', '[{"text":"Duolingo Max","url":"https://blog.duolingo.com/duolingo-max"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('E5-Mistral-7B', 'Microsoft', 'Model', 'NLP', 'MIT', 2024, '7B params', 'Microsoft''s state-of-the-art text embedding model based on Mistral 7B, achieving top MTEB scores for retrieval and semantic search tasks, incorporating an architecture of mistral 7B decoder fine-tuned with contrastive learning for embedding tasks. The model demonstrates competitive performance across verified evaluations, including MTEB: 66.6% average (top open model at release). With its 7B params design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'Mistral 7B decoder fine-tuned with contrastive learning for embedding tasks.', 'from sentence_transformers import SentenceTransformer
model = SentenceTransformer("intfloat/e5-mistral-7b-instruct")
embeddings = model.encode(["Hello world", "Bonjour le monde"])', 'MTEB: 66.6% average (top open model at release)', '7B params is large for an embedding model, slower than lighter alternatives.', 'https://arxiv.org/abs/2401.00368', '[{"text":"E5-Mistral Paper","url":"https://arxiv.org/abs/2401.00368"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Edge0-145B-NVFP4', 'Edge0', 'Model', 'NLP', 'OTHER', 2026, '145B params', 'Edge0''s 145B parameter open-weights language model quantized to native NVIDIA NVFP4 format. Designed to bring near-frontier reasoning, code generation, and technical writing capabilities to workstation setups equipped with dual NVIDIA RTX GPUs without requiring enterprise cloud clusters.', '145B dense Transformer quantized to NVFP4 precision with optimized tensor memory layouts.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Edge0/Edge0-145B-NVFP4", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Edge0/Edge0-145B-NVFP4")', 'Retains 98.9% of full-precision MMLU and coding accuracy; runs at 42 tokens/sec on dual RTX 4090s.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Edge0/Edge0-145B-NVFP4', '[{"url":"https://huggingface.co/Edge0/Edge0-145B-NVFP4","text":"Edge0/Edge0-145B-NVFP4 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Edge0-35B-A3B-preview', 'Edge0', 'Model', 'NLP', 'APACHE-2.0', 2026, '35B params', 'High-performance NLP open-weights model by Edge0, trending with over 538 community likes and 1,596 downloads on Hugging Face, incorporating an architecture of edge0 text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 520, Likes: 538, Downloads: 1,596. With its 35B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Edge0 text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Edge0/Edge0-35B-A3B-preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Edge0/Edge0-35B-A3B-preview")', 'Trending Score: 520, Likes: 538, Downloads: 1,596', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Edge0/Edge0-35B-A3B-preview', '[{"text":"Edge0/Edge0-35B-A3B-preview on Hugging Face","url":"https://huggingface.co/Edge0/Edge0-35B-A3B-preview"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('EgoDemo', 'LightwheelAI', 'Dataset', 'Multimodal', 'OTHER', 2026, '1K<n<10K', 'EgoDemo A 50-hour sample from EgoSuite-Open100K, covering every annotated subset plus two raw-video variants. Collection · EgoStandard · EgoPro · Project page Explore EgoS (190 likes, 61,148 downloads). The corpus spans 1K<n<10K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 54, Likes: 190, Downloads: 61,148. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("LightwheelAI/EgoDemo")', 'Trending Score: 54, Likes: 190, Downloads: 61,148', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/LightwheelAI/EgoDemo', '[{"text":"LightwheelAI/EgoDemo on Hugging Face Datasets","url":"https://huggingface.co/datasets/LightwheelAI/EgoDemo"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('EgoPro', 'LightwheelAI', 'Dataset', 'Multimodal', 'OTHER', 2026, '10K<n<100K', 'EgoPro The 10,000-hour head-and-wrist line of EgoSuite-Open100K. Data Bucket · Collection · EgoDemo · EgoStandard · Project page Explore EgoSuite-Open100K ↗ Data locatio (111 likes, 35,382 downloads). The corpus spans 10K<n<100K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 40, Likes: 111, Downloads: 35,382. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("LightwheelAI/EgoPro")', 'Trending Score: 40, Likes: 111, Downloads: 35,382', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/LightwheelAI/EgoPro', '[{"text":"LightwheelAI/EgoPro on Hugging Face Datasets","url":"https://huggingface.co/datasets/LightwheelAI/EgoPro"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('EgoStandard', 'LightwheelAI', 'Dataset', 'Multimodal', 'OTHER', 2026, '10K<n<100K', 'EgoStandard The 90,000-hour head-view line of EgoSuite-Open100K. Data Bucket · Collection · EgoDemo · EgoPro · Project page Explore EgoSuite-Open100K ↗ Data location: Eg (186 likes, 388 downloads). The corpus spans 10K<n<100K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 47, Likes: 186, Downloads: 388. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("LightwheelAI/EgoStandard")', 'Trending Score: 47, Likes: 186, Downloads: 388', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/LightwheelAI/EgoStandard', '[{"text":"LightwheelAI/EgoStandard on Hugging Face Datasets","url":"https://huggingface.co/datasets/LightwheelAI/EgoStandard"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ElevenLabs', 'ElevenLabs', 'Model', 'Audio', 'Proprietary', 2022, 'Unknown', 'Leading AI voice generation platform offering extremely natural, emotive text-to-speech, voice cloning, and dubbing across multiple languages, incorporating an architecture of proprietary deep learning model for speech synthesis. The model demonstrates competitive performance across verified evaluations, including Industry-leading MOS (Mean Opinion Score) for voice naturalness. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern audio ecosystem.', 'Proprietary deep learning model for speech synthesis.', 'import requests
url = "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
headers = {"xi-api-key": "YOUR_API_KEY", "Content-Type": "application/json"}
data = {"text": "Hello, world!", "model_id": "eleven_multilingual_v2"}
response = requests.post(url, json=data, headers=headers)', 'Industry-leading MOS (Mean Opinion Score) for voice naturalness.', 'Proprietary, paid API for higher usage or commercial rights.', 'https://elevenlabs.io/', '[{"text":"ElevenLabs Official Site","url":"https://elevenlabs.io/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Elicit', 'Ought', 'AI', 'Research', 'Proprietary', 2021, 'N/A', 'An AI research assistant that searches and summarizes academic papers, extracts key data from studies, and helps researchers synthesize literature at scale. The application is powered by advanced foundation models utilizing web Application (Powered by LLMs with semantic search over academic paper databases). It features an intuitive interface designed to streamline complex research workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Powered by LLMs with semantic search over academic paper databases)', 'Visit elicit.com, enter a research question, and get summaries and data from relevant papers.', 'N/A', 'Coverage limited to papers indexed in Semantic Scholar; may miss very recent publications.', 'https://elicit.com', '[{"text":"Elicit","url":"https://elicit.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ema-lightning', 'canberkkkkkk', 'Model', 'Audio', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance Audio open-weights model by canberkkkkkk, trending with over 358 community likes and 18,079 downloads on Hugging Face, incorporating an architecture of canberkkkkkk text to speech architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 327, Likes: 358, Downloads: 18,079. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'canberkkkkkk text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("canberkkkkkk/ema-lightning", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("canberkkkkkk/ema-lightning")', 'Trending Score: 327, Likes: 358, Downloads: 18,079', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/canberkkkkkk/ema-lightning', '[{"text":"canberkkkkkk/ema-lightning on Hugging Face","url":"https://huggingface.co/canberkkkkkk/ema-lightning"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('embeddinggemma-2', 'Google DeepMind', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by Google, trending with over 990 community likes and 7,562 downloads on Hugging Face, incorporating an architecture of google feature extraction architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 965, Likes: 990, Downloads: 7,562. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Google feature extraction architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("google/embeddinggemma-2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("google/embeddinggemma-2")', 'Trending Score: 965, Likes: 990, Downloads: 7,562', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/google/embeddinggemma-2', '[{"text":"google/embeddinggemma-2 on Hugging Face","url":"https://huggingface.co/google/embeddinggemma-2"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('embeddinggemma-2-webgpu', 'Google DeepMind', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by webml-community. Trending with 48 community stars. Its cloud and infrastructure runtime provides sTATIC cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 48, Community Likes: 48. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/webml-community/embeddinggemma-2-webgpu', 'Trending Score: 48, Community Likes: 48', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/webml-community/embeddinggemma-2-webgpu', '[{"text":"webml-community/embeddinggemma-2-webgpu on Hugging Face Spaces","url":"https://huggingface.co/spaces/webml-community/embeddinggemma-2-webgpu"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ERNIE Bot', 'Baidu', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Baidu''s conversational AI assistant powered by the ERNIE large language model, strong in Chinese language tasks and integrated with Baidu Search. The application is powered by advanced foundation models utilizing web Application / Conversational Agent (Powered by ERNIE 4.0). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Conversational Agent (Powered by ERNIE 4.0)', 'Visit yiyan.baidu.com to interact; primarily available in China.', 'N/A', 'Primarily optimized for Chinese language; access outside China may be restricted.', 'https://yiyan.baidu.com', '[{"text":"ERNIE Bot","url":"https://yiyan.baidu.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('EvalPlus', 'EvalPlus Community', 'Dataset', 'AI Coding', 'Apache-2.0', 2023, '164 HumanEval+ & 378 MBPP+ Rigorous Tasks', 'Rigorous code evaluation suite augmenting HumanEval (HumanEval+) and MBPP (MBPP+) with automated LLM- and mutation-based test synthesis, boosting test-case coverage by up to 80x. The corpus spans 164 HumanEval+ & 378 MBPP+ Rigorous Tasks of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Exposes an average of 15% false passes in standard HumanEval benchmarks; recognized as standard rigor baseline on the EvalPlus leaderboard. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Automated test-input synthesis pipeline combining differential testing, type-aware mutations, and constraint solving for strict semantic verification.', 'from evalplus.data import get_human_eval_plus
evalplus_tasks = get_human_eval_plus()
print(len(evalplus_tasks), evalplus_tasks["HumanEval/0"]["entry_point"])', 'Exposes an average of 15% false passes in standard HumanEval benchmarks; recognized as standard rigor baseline on the EvalPlus leaderboard.', 'Focuses on standalone algorithmic programming problems rather than full-repository multi-file architectures.', 'https://evalplus.github.io', '[{"text":"EvalPlus Leaderboard & Benchmark Suite","url":"https://evalplus.github.io"},{"text":"EvalPlus GitHub Repository","url":"https://github.com/evalplus/evalplus"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ExeWorldBench', 'HelenPeng', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '1K<n<10K', 'Comprehensive agent execution benchmark developed by Helen Peng, evaluating autonomous AI agents on real-world operating system tasks, command-line bash workflows, file system management, and multi-step tool orchestration across diverse Linux and Windows virtualized environments.', 'Reproducible containerized evaluation suite with automated environment sandboxing, terminal telemetry, and success verification.', 'from datasets import load_dataset

dataset = load_dataset("HelenPeng/ExeWorldBench")', '500+ diverse system administration, scripting, and file management challenges with deterministic grading.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/HelenPeng/ExeWorldBench', '[{"url":"https://huggingface.co/datasets/HelenPeng/ExeWorldBench","text":"HelenPeng/ExeWorldBench on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Fable-5.1-Max-Reasoning-Filtered-10000x', 'MoreThought', 'Dataset', 'AI Coding', 'APACHE-2.0', 2026, '10K<n<100K', 'Dataset Description This dataset contains 10,000 agentic coding and reasoning multi-turn high-quality traces generated by the new Fable 5.1 model using max reasoning (157 likes, 2,613 downloads). The corpus spans 10K<n<100K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 82, Likes: 157, Downloads: 2,613. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("MoreThought/Fable-5.1-Max-Reasoning-Filtered-10000x")', 'Trending Score: 82, Likes: 157, Downloads: 2,613', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/MoreThought/Fable-5.1-Max-Reasoning-Filtered-10000x', '[{"text":"MoreThought/Fable-5.1-Max-Reasoning-Filtered-10000x on Hugging Face Datasets","url":"https://huggingface.co/datasets/MoreThought/Fable-5.1-Max-Reasoning-Filtered-10000x"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Fable-5.1-Max-Reasoning-Filtered-5000x', 'MoreThought', 'Dataset', 'AI Coding', 'APACHE-2.0', 2026, '1K<n<10K', 'Dataset Description This dataset contains 5,000 coding and reasoning traces generated by the new Fable 5.1 model using max reasoning effort. It holds almost 150,000,0 (50 likes, 950 downloads). The corpus spans 1K<n<10K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 33, Likes: 50, Downloads: 950. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("MoreThought/Fable-5.1-Max-Reasoning-Filtered-5000x")', 'Trending Score: 33, Likes: 50, Downloads: 950', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/MoreThought/Fable-5.1-Max-Reasoning-Filtered-5000x', '[{"text":"MoreThought/Fable-5.1-Max-Reasoning-Filtered-5000x on Hugging Face Datasets","url":"https://huggingface.co/datasets/MoreThought/Fable-5.1-Max-Reasoning-Filtered-5000x"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Faceswap-Headswap', 'keysersoze', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Precision portrait modification and facial re-targeting platform on Hugging Face Spaces by keysersoze. Utilizing landmark alignment, depth estimation, and latent blending, it enables high-fidelity head swaps, expression transfers, and aging transformations while maintaining skin texture and lighting consistency.', 'Multi-stage generative pipeline integrating InsightFace feature extractors, depth estimation, and latent diffusion blending.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/keysersoze/Faceswap-Headswap', 'Processes 2K high-resolution portraits in under 3.5 seconds with seamless edge blending.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/keysersoze/Faceswap-Headswap', '[{"url":"https://huggingface.co/spaces/keysersoze/Faceswap-Headswap","text":"keysersoze/Faceswap-Headswap on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('fal.ai', 'fal', 'Platform', 'Multimodal', 'Proprietary', 2023, 'Serverless GPU Inference Cloud', 'Real-time generative media cloud platform engineered for ultra-low latency inference across state-of-the-art image, audio, and video models with serverless GPU infrastructure. Its cloud and infrastructure runtime provides serverless GPU orchestration engine with optimized custom inference engines for diffusion models, video generators, and speech synthesis pipelines. Core platform telemetry and performance features include: Generates FLUX images in under 1 second; powers real-time WebSockets and streaming video/audio pipelines with global edge distribution. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Serverless GPU orchestration engine with optimized custom inference engines for diffusion models, video generators, and speech synthesis pipelines.', 'import fal_client

result = fal_client.subscribe(
    "fal-ai/flux/dev",
    arguments={"prompt": "A futuristic cityscape at sunset, cinematic lighting, 8k"}
)
print(result["images"][0]["url"])', 'Generates FLUX images in under 1 second; powers real-time WebSockets and streaming video/audio pipelines with global edge distribution.', 'Pay-per-compute pricing model; enterprise rate limits apply to bursty parallel workloads unless reserved capacity is provisioned.', 'https://fal.ai', '[{"text":"fal.ai Official Developer Platform","url":"https://fal.ai"},{"text":"fal.ai Model Registry and API Docs","url":"https://fal.ai/models"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Falcon 180B', 'Technology Innovation Institute (TII)', 'Model', 'NLP', 'Falcon-180B TII License', 2023, '180B params', 'TII''s massive open-source 180B parameter model, one of the largest publicly available LLMs trained on the RefinedWeb dataset, incorporating an architecture of causal decoder-only transformer with multi-query attention. The model demonstrates competitive performance across verified evaluations, including MMLU: 70.4%, competitive with PaLM 2-L. With its 180B params design, it supports diverse local and enterprise deployment profiles under the Falcon-180B TII license.', 'Causal decoder-only transformer with multi-query attention.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("tiiuae/falcon-180B-chat")
model = AutoModelForCausalLM.from_pretrained("tiiuae/falcon-180B-chat", trust_remote_code=True)', 'MMLU: 70.4%, competitive with PaLM 2-L', 'Requires massive GPU cluster, commercial use needs separate license.', 'https://falconllm.tii.ae/', '[{"text":"Falcon 180B Release","url":"https://huggingface.co/tiiuae/falcon-180B"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FastChat', 'LMSYS Org', 'Framework', 'MLOps', 'Apache-2.0', 2023, 'N/A', 'LMSYS Org''s open platform for training, serving, and evaluating LLM-based chatbots, powering the widely acclaimed LMSYS Chatbot Arena and Vicuna models. Under the hood, it incorporates distributed controller-worker serving architecture with OpenAI-compatible REST API endpoints, web UI, and Elo evaluation harnesses. Key technical highlights include: Powers LMSYS Chatbot Arena evaluating over 100+ frontier models; serves millions of evaluation prompts with distributed model worker pools. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Distributed controller-worker serving architecture with OpenAI-compatible REST API endpoints, web UI, and Elo evaluation harnesses.', 'python3 -m fastchat.serve.controller
python3 -m fastchat.serve.model_worker --model-path lmsys/vicuna-7b-v1.5
python3 -m fastchat.serve.openai_api_server --host localhost --port 8000', 'Powers LMSYS Chatbot Arena evaluating over 100+ frontier models; serves millions of evaluation prompts with distributed model worker pools.', 'Built originally for research and benchmark serving; lacks advanced enterprise enterprise access control and billing features out-of-the-box.', 'https://github.com/lm-sys/FastChat', '[{"text":"LMSYS FastChat GitHub Repository","url":"https://github.com/lm-sys/FastChat"},{"text":"LMSYS Chatbot Arena Platform","url":"https://chat.lmsys.org/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FDE-Gym', 'DeepLethe', 'Dataset', 'NLP', 'OTHER', 2026, 'n<1K', 'Financial Decision Environment (FDE) Gym dataset and simulation suite developed by DeepLethe for evaluating autonomous reasoning agents on complex economic tasks. It features real-world market tick data, algorithmic trading scenarios, corporate earnings transcripts, macroeconomic policy shocks, and structured portfolio balancing challenges.', 'Gym-compatible reinforcement learning environment and tokenized dataset with continuous action spaces and financial reward telemetry.', 'from datasets import load_dataset

dataset = load_dataset("DeepLethe/FDE-Gym")', 'Includes 250,000+ historical market scenarios, SEC 10-K filing reasoning tasks, and portfolio stress tests.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/DeepLethe/FDE-Gym', '[{"url":"https://huggingface.co/datasets/DeepLethe/FDE-Gym","text":"DeepLethe/FDE-Gym on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Fibo-2.0', 'Comfy-Org', 'Model', 'NLP', 'CC-BY-NC-4.0', 2026, 'Open Weights', 'Comfy-Org''s official generative image diffusion backbone designed for high-resolution visual synthesis and seamless integration into modular ComfyUI workflow graphs. Features outstanding prompt fidelity, fine details, and efficient resource utilization on consumer GPUs.', 'High-performance Diffusion Transformer architecture optimized for modular node-based pipelines in ComfyUI.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Comfy-Org/Fibo-2.0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Comfy-Org/Fibo-2.0")', 'Generates 1024x1024 images in 18 steps with high visual aesthetics; zero licensing friction.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Comfy-Org/Fibo-2.0', '[{"url":"https://huggingface.co/Comfy-Org/Fibo-2.0","text":"Comfy-Org/Fibo-2.0 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Fibo-2.0-editing', 'briaai', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Enterprise generative image editing and visual inpainting platform powered by Bria AI and Fibo 2.0. Tailored for commercial creative agencies, it provides commercially safe, copyright-cleared generative expansion, object removal, and background replacement with full intellectual property indemnification.', 'Cloud generative platform built on Bria AI''s commercially licensed visual diffusion models with enterprise API endpoints.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/briaai/Fibo-2.0-editing', '100% commercially safe training data; sub-2s generative editing latency with full legal indemnification.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/briaai/Fibo-2.0-editing', '[{"url":"https://huggingface.co/spaces/briaai/Fibo-2.0-editing","text":"briaai/Fibo-2.0-editing on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FineWeb & FineWeb-Edu', 'Hugging Face', 'Dataset', 'NLP', 'ODC-By 1.0', 2024, '15 Trillion tokens (44 TB)', '15-trillion token open web pretraining dataset from Hugging Face, including FineWeb-Edu filtered with automated AI educational quality scoring. The corpus spans 15 Trillion tokens (44 TB) of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Pretraining on FineWeb-Edu yields higher MMLU per token than Meta Llama 3 web filtering. Released under the ODC-By 1.0 license for open evaluation and research reproducibility.', 'Curated dataset derived from 96 Common Crawl dumps with MinHash deduplication.', 'from datasets import load_dataset
ds = load_dataset("HuggingFaceFW/fineweb-edu", name="sample-100BT", split="train", streaming=True)', 'Pretraining on FineWeb-Edu yields higher MMLU per token than Meta Llama 3 web filtering.', 'Massive multi-terabyte download requirement for full uncompressed sets.', 'https://huggingface.co/datasets/HuggingFaceFW/fineweb', '[{"text":"FineWeb Announcement","url":"https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-details"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('fineweb-edu', 'HuggingFaceFW', 'Dataset', 'NLP', 'ODC-BY', 2026, '1B<n<10B', 'The gold-standard educational web pretraining dataset developed by Hugging Face, containing 1.3 trillion tokens of exceptionally high-quality educational web content. Extracted from Common Crawl using classifier-guided educational filtering, it has become the standard pretraining baseline for modern open-weights LLMs.', 'Massive Arrow/Parquet dataset filtered using classifier ensembles trained on high-grade academic and pedagogical texts.', 'from datasets import load_dataset

dataset = load_dataset("HuggingFaceFW/fineweb-edu")', '1.3 Trillion tokens; proven to outperform standard pretraining corpora by 8-15% on MMLU and ARC.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu', '[{"url":"https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu","text":"HuggingFaceFW/fineweb-edu on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Fireworks AI', 'Fireworks AI', 'Platform', 'MLOps', 'Proprietary', 2024, 'Cloud API', 'Production-grade generative AI inference platform delivering blazing fast latency and cost efficiency for open-weights vision, audio, and language models. Its cloud and infrastructure runtime provides custom inference engine with fine-grained speculative decoding and LoRA multiplexing. Core platform telemetry and performance features include: Sub-100ms time-to-first-token and ultra-high concurrency. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Custom inference engine with fine-grained speculative decoding and LoRA multiplexing.', 'from openai import OpenAI
client = OpenAI(base_url="https://api.fireworks.ai/inference/v1", api_key="FW_KEY")
response = client.chat.completions.create(model="accounts/fireworks/models/deepseek-v3", messages=[...])', 'Sub-100ms time-to-first-token and ultra-high concurrency.', 'Proprietary cloud platform.', 'https://fireworks.ai', '[{"text":"Fireworks AI Platform","url":"https://fireworks.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('flint', 'RecursiveSI', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'RecursiveSI''s open-weights mathematical and logical reasoning foundation model. Trained on extensive symbolic traces, formal Lean 4 verification proofs, and competitive mathematics problems, Flint solves multi-step algorithmic challenges with rigorous deductive precision.', 'Dense reasoning Transformer trained with reinforcement learning over verifiable symbolic proof environments.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("RecursiveSI/flint", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("RecursiveSI/flint")', 'MATH-500: 84.6%, AIME 2024: 68.2%, Lean 4 formal proof verification accuracy: 58.4%', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/RecursiveSI/flint', '[{"url":"https://huggingface.co/RecursiveSI/flint","text":"RecursiveSI/flint on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('flint-GGUF', 'unsloth', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'Unsloth''s official 4-bit and 8-bit quantized GGUF distribution of RecursiveSI''s Flint mathematical reasoning model. Enables researchers and developers to run deep symbolic mathematical deduction and formal logic proofs locally on commodity CPUs and consumer GPUs via llama.cpp.', 'Quantized GGUF weights of Flint reasoning Transformer with optimized quantization matrices for llama.cpp.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("unsloth/flint-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("unsloth/flint-GGUF")', 'Runs comfortably on 8GB VRAM consumer systems with 98.8% retention of full-precision math reasoning accuracy.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/unsloth/flint-GGUF', '[{"url":"https://huggingface.co/unsloth/flint-GGUF","text":"unsloth/flint-GGUF on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('flower', 'flwrlabs', 'Framework', 'MLOps', 'Apache-2.0', 2026, '347MB Repo', 'Production-grade federated learning and federated evaluation framework supporting heterogeneous compute clusters, privacy-preserving aggregation, and multi-cloud AI training. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 7,112, Forks: 1,226. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/flwrlabs/flower
cd flower
pip install -e .', 'GitHub Stars: 7,112, Forks: 1,226', 'Requires local Python environment and dependency configuration.', 'https://github.com/flwrlabs/flower', '[{"text":"flwrlabs/flower on GitHub","url":"https://github.com/flwrlabs/flower"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('flux-3-image-klein', 'black-forest-labs', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Flagship interactive demonstration web application on Hugging Face Spaces by Black Forest Labs, featuring the Flux 3 Klein diffusion transformer. Built for real-time creative exploration, it showcases state-of-the-art text prompt adherence, complex multi-subject scene composition, and photorealistic typography rendering directly in browser.', 'Optimized Gradio web studio backed by Black Forest Labs'' Flux 3 Klein 12B diffusion transformer running on NVIDIA H100 GPUs.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/black-forest-labs/flux-3-image-klein', 'Generates 1024x1024 outputs in under 2.4 seconds; rated #1 in visual prompt fidelity on community leaderboards.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/black-forest-labs/flux-3-image-klein', '[{"url":"https://huggingface.co/spaces/black-forest-labs/flux-3-image-klein","text":"black-forest-labs/flux-3-image-klein on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('flux-3-image-klein-comfy', 'black-forest-labs', 'Model', 'NLP', 'OTHER', 2026, 'Open Weights', 'Optimized ComfyUI model weights and custom pipeline nodes for Black Forest Labs'' Flux 3 Klein text-to-image foundation model. Tailored for professional digital artists and game studios, it enables modular node-based generation workflows, fine-grained latent manipulation, custom LoRA weight blending, and ControlNet guidance with minimal VRAM consumption.', '12B parameter rectified flow diffusion transformer packaged as modular checkpoint files for ComfyUI and Diffusers.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("black-forest-labs/flux-3-image-klein-comfy", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("black-forest-labs/flux-3-image-klein-comfy")', 'Renders 1024x1024 frames in 14 steps with near-lossless fidelity; fully compatible with ComfyUI node graphs.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy', '[{"url":"https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy","text":"black-forest-labs/flux-3-image-klein-comfy on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Flux.1', 'Black Forest Labs', 'Model', 'Computer Vision', 'Various (Pro: Proprietary, Dev: Non-commercial, Schnell: Apache 2.0)', 2024, '12B params', 'Black Forest Labs'' state-of-the-art suite of text-to-image models (Pro, Dev, Schnell) pushing the boundaries of prompt adherence, visual quality, and image detail, incorporating an architecture of hybrid architecture of multimodal and parallel diffusion transformer blocks. The model demonstrates competitive performance across verified evaluations, including State-of-the-art ELO scores surpassing Midjourney v6 and DALL-E 3 on prompt adherence. With its 12B params design, it supports diverse local and enterprise deployment profiles under the Various (Pro: Proprietary, Dev: Non-commercial, Schnell: Apache 2.0) license.', 'Hybrid architecture of multimodal and parallel diffusion transformer blocks.', '# Via API or locally for open variants
from diffusers import FluxPipeline
import torch
pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell", torch_dtype=torch.bfloat16)
image = pipe("A cat holding a sign that says ''Hello World''").images[0]', 'State-of-the-art ELO scores surpassing Midjourney v6 and DALL-E 3 on prompt adherence.', 'High VRAM requirements for local inference of the full 12B model.', 'https://blackforestlabs.ai/', '[{"text":"FLUX.1 Announcement","url":"https://blackforestlabs.ai/announcing-black-forest-labs/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FLUX.1 Schnell', 'Black Forest Labs', 'Model', 'Image Generation', 'Apache-2.0', 2024, '12B params', 'Black Forest Labs'' ultra-fast 12B parameter open text-to-image rectified flow transformer, generating high-fidelity images in just 1 to 4 diffusion steps, incorporating an architecture of hybrid multimodal rectified flow transformer with rotary position embeddings (RoPE). The model demonstrates competitive performance across verified evaluations, including ELO rating: 1140+ (Superior prompt adherence and in-image typography). With its 12B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Hybrid multimodal rectified flow transformer with rotary position embeddings (RoPE).', 'import torch
from diffusers import FluxPipeline
pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell", torch_dtype=torch.bfloat16)
image = pipe("A cozy cafe on Mars with neon lighting", num_inference_steps=4).images[0]', 'ELO rating: 1140+ (Superior prompt adherence and in-image typography)', '12B parameter weights require at least 12GB-16GB VRAM for GPU execution.', 'https://blackforestlabs.ai', '[{"text":"FLUX.1 Release","url":"https://blackforestlabs.ai/announcing-black-forest-labs/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('free-ai-detector', 'Lynote', 'Platform', 'NLP', 'Community Hosted', 2026, 'GRADIO Platform', 'Lynote''s high-accuracy AI content detection web application. By analyzing token perplexity, burstiness distributions, and syntactic repetition patterns, it reliably identifies text generated by GPT-4, Claude, Gemini, and open-source models with low false-positive rates on academic and professional writing.', 'Ensemble detector combining RoBERTa fine-tuned classifiers, token entropy statistical analyzers, and perplexity thresholding.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Lynote/free-ai-detector', 'Detection accuracy: 98.2% on standard synthetic benchmarks; false positive rate < 1.1% on human academic prose.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Lynote/free-ai-detector', '[{"url":"https://huggingface.co/spaces/Lynote/free-ai-detector","text":"Lynote/free-ai-detector on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('free-ai-humanizer', 'Lynote', 'Platform', 'NLP', 'Community Hosted', 2026, 'GRADIO Platform', 'Lynote''s web-based text transformation platform designed to rewrite AI-generated prose. By varying sentence structures, enriching vocabulary nuance, and restructuring syntactic rhythms, it produces natural, human-sounding prose that bypasses synthetic text classifiers.', 'Cloud NLP pipeline combining specialized sequence-to-sequence neural rewrites with entropy optimization heuristics.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Lynote/free-ai-humanizer', 'Reduces synthetic classification probability from 99% to below 5% across major AI detection tools.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Lynote/free-ai-humanizer', '[{"url":"https://huggingface.co/spaces/Lynote/free-ai-humanizer","text":"Lynote/free-ai-humanizer on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('freeinference_agentic_trace', 'harvardMadsys', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '1M<n<10M', 'FreeInference Agentic Trace New: Interactive Session Explorer! We''ve launched an interactive session explorer to help you explore the dataset interactively. Try it ou (37 likes, 1,450 downloads). The corpus spans 1M<n<10M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 35, Likes: 37, Downloads: 1,450. Released under the CC-BY-4.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("harvardMadsys/freeinference_agentic_trace")', 'Trending Score: 35, Likes: 37, Downloads: 1,450', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/harvardMadsys/freeinference_agentic_trace', '[{"text":"harvardMadsys/freeinference_agentic_trace on Hugging Face Datasets","url":"https://huggingface.co/datasets/harvardMadsys/freeinference_agentic_trace"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('fruit-fly-simulation', 'Xenova', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by Xenova. Trending with 70 community stars. Its cloud and infrastructure runtime provides sTATIC cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 62, Community Likes: 70. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Xenova/fruit-fly-simulation', 'Trending Score: 62, Community Likes: 70', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Xenova/fruit-fly-simulation', '[{"text":"Xenova/fruit-fly-simulation on Hugging Face Spaces","url":"https://huggingface.co/spaces/Xenova/fruit-fly-simulation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GAIA Benchmark', 'Meta AI', 'Dataset', 'Research', 'CC BY-SA 4.0', 2023, '466 questions', 'General AI Assistant benchmark testing AI agents on multi-modal, tool-use, web browsing, and multi-step complex real-world questions that humans solve easily. The corpus spans 466 questions of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Humans score 92%, whereas leading AI models historically score 30%-60%. Released under the CC BY-SA 4.0 license for open evaluation and research reproducibility.', '3-tier difficulty question set with multimodal attachments (PDFs, spreadsheets, images).', 'from datasets import load_dataset
ds = load_dataset("gaia-benchmark/GAIA", "2023_all", split="validation")', 'Humans score 92%, whereas leading AI models historically score 30%-60%.', 'Requires full web browsing and python tool execution environment to run evals.', 'https://huggingface.co/spaces/gaia-benchmark/leaderboard', '[{"text":"GAIA Benchmark Paper","url":"https://arxiv.org/abs/2311.12983"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gamma', 'Gamma Tech', 'AI', 'Productivity', 'Proprietary', 2020, 'N/A', 'An AI presentation and document builder that generates beautiful, shareable decks, webpages, and documents from text prompts or outlines in seconds. The application is powered by advanced foundation models utilizing web Application (Powered by GPT-4 with proprietary layout and design generation engine). It features an intuitive interface designed to streamline complex productivity workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Powered by GPT-4 with proprietary layout and design generation engine)', 'Visit gamma.app, describe your content, and generate a fully designed presentation instantly.', 'N/A', 'Free tier adds a Gamma watermark; advanced themes and AI credits require a paid plan.', 'https://gamma.app', '[{"text":"Gamma","url":"https://gamma.app"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('gdx-ai', 'libgdx', 'Framework', 'MLOps', 'Apache-2.0', 2026, '1MB Repo', 'Artificial Intelligence framework for games based on libGDX or not. Features: Steering Behaviors, Formation Motion, Pathfinding, Behavior Trees and Finite State Machines. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 1,301, Forks: 252. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/libgdx/gdx-ai
cd gdx-ai
pip install -e .', 'GitHub Stars: 1,301, Forks: 252', 'Requires local Python environment and dependency configuration.', 'https://github.com/libgdx/gdx-ai', '[{"text":"libgdx/gdx-ai on GitHub","url":"https://github.com/libgdx/gdx-ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 1.5 Flash', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2024, 'Unknown', 'Google''s lightweight, fast multimodal model optimized for high-volume tasks with a 1M token context window at lower cost, incorporating an architecture of distilled MoE transformer, optimized for speed and efficiency. The model demonstrates competitive performance across verified evaluations, including MMLU: 78.9%, significantly faster than Pro. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Distilled MoE transformer, optimized for speed and efficiency.', 'import google.generativeai as genai
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel(''gemini-1.5-flash'')
response = model.generate_content("Summarize this article quickly.")', 'MMLU: 78.9%, significantly faster than Pro', 'Less capable than Gemini 1.5 Pro on complex reasoning tasks.', 'https://deepmind.google/technologies/gemini/flash/', '[{"text":"Gemini 1.5 Flash Announcement","url":"https://deepmind.google/technologies/gemini/flash/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 1.5 Pro', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2024, 'Unknown', 'Google''s flagship multimodal model featuring a massive context window of up to 2 million tokens, allowing it to process hours of video, audio, and vast codebases, incorporating an architecture of mixture-of-Experts (MoE) transformer architecture. The model demonstrates competitive performance across verified evaluations, including MMLU: 85.9%, MATH: 67.7%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Mixture-of-Experts (MoE) transformer architecture.', 'import google.generativeai as genai
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel(''gemini-1.5-pro'')
response = model.generate_content("Summarize this 1000-page PDF.")', 'MMLU: 85.9%, MATH: 67.7%', 'Proprietary API, performance can vary on extremely short-context logic puzzles.', 'https://deepmind.google/technologies/gemini/', '[{"text":"Gemini 1.5 Pro Technical Paper","url":"https://arxiv.org/abs/2403.05530"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 2.0 Flash', 'Google DeepMind', 'Model', 'Multimodal', 'Proprietary', 2024, 'Unknown', 'Google DeepMind''s agentic multimodal model delivering real-time streaming audio/video generation, sub-second latency, and native tool execution, incorporating an architecture of natively multimodal Mixture-of-Experts architecture supporting 1M context. The model demonstrates competitive performance across verified evaluations, including MMLU-Pro: 78.5%, MathVista: 68.3%, TTFT 2x faster than 1.5 Flash. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern multimodal ecosystem.', 'Natively multimodal Mixture-of-Experts architecture supporting 1M context.', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-2.0-flash",
  contents="Explain quantum computing simply."
)', 'MMLU-Pro: 78.5%, MathVista: 68.3%, TTFT 2x faster than 1.5 Flash', 'API quota boundaries and regional service availability.', 'https://deepmind.google/technologies/gemini/', '[{"text":"Gemini 2.0 Flash Release","url":"https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 2.0 Flash Thinking', 'Google DeepMind', 'Model', 'Research', 'Proprietary', 2024, 'Unknown', 'Experimental reasoning edition of Gemini 2.0 Flash that outputs chain-of-thought steps for visual and logical problem-solving, incorporating an architecture of multimodal MoE with explicit reasoning tokens and reflection loops. The model demonstrates competitive performance across verified evaluations, including MATH-500: 92.4%, AIME 2024: 74.3%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern research ecosystem.', 'Multimodal MoE with explicit reasoning tokens and reflection loops.', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-2.0-flash-thinking-exp",
  contents="Solve this physics circuit diagram problem."
)', 'MATH-500: 92.4%, AIME 2024: 74.3%', 'Experimental model with dynamic rate limits.', 'https://deepmind.google/technologies/gemini/', '[{"text":"Gemini Thinking Model","url":"https://deepmind.google/technologies/gemini/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 2.0 Pro', 'Google DeepMind', 'Model', 'Research', 'Proprietary', 2025, 'Frontier MoE', 'Google''s flagship intelligence model in the 2.0 family, delivering premier multi-lingual and scientific reasoning, 2,000,000 token context window comprehension, and advanced agentic tool calling, incorporating an architecture of multimodal Mixture-of-Experts with 2M token context, native code execution sandbox, and cross-modal reasoning. The model demonstrates competitive performance across verified evaluations, including MMLU-Pro: 80.2%, GPQA Diamond: 68.4%, MathVista: 74.1%, Context: 2M tokens. With its Frontier MoE design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Multimodal Mixture-of-Experts with 2M token context, native code execution sandbox, and cross-modal reasoning.', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-2.0-pro-exp-02-05",
  contents="Analyze this entire 100-page clinical trial dossier for pharmacokinetic variance."
)', 'MMLU-Pro: 80.2%, GPQA Diamond: 68.4%, MathVista: 74.1%, Context: 2M tokens', 'Experimental rate limits during preview; requires Google Cloud / AI Studio credentials.', 'https://deepmind.google/technologies/gemini/', '[{"text":"Gemini 2.0 Pro Experimental Release","url":"https://blog.google/technology/google-deepmind/gemini-model-updates-february-2025/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 3.5 Flash-Lite', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Google DeepMind''s highly distilled, ultra-low-latency multimodal intelligence engine designed for cost-sensitive edge and enterprise serving with sub-second response times and 1M context, incorporating an architecture of proprietary frontier neural architecture developed by Google DeepMind, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (406 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 12, Briefcase Elo: 651, Accuracy: 27%, Non-Hallucination: 73%, FrontierCode: 6%, AutomationBench: 25%, TerminalBench 4: 1%, HLE Diamond: 10%, Speed: 406 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Google DeepMind, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (406 tok/s).', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-3-5-flash-lite",
  contents="Synthesize multimodal analysis over 1M context."
)', 'Intelligence Index: 12, Briefcase Elo: 651, Accuracy: 27%, Non-Hallucination: 73%, FrontierCode: 6%, AutomationBench: 25%, TerminalBench 4: 1%, HLE Diamond: 10%, Speed: 406 tok/s, Context Window: 1M', 'Proprietary cloud API access via Google DeepMind developer platform; subject to API rate limits and token pricing ($0.3/M in, $2.5/M out).', 'https://artificialanalysis.ai/models/gemini-3-5-flash-lite', '[{"text":"Gemini 3.5 Flash-Lite on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gemini-3-5-flash-lite"},{"text":"Gemini 3.5 Flash-Lite Inference Providers","url":"https://artificialanalysis.ai/models/gemini-3-5-flash-lite/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 3.8 Flash (high)', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'High-effort reasoning variant of Google''s Gemini 3.8 Flash, delivering frontier mathematical synthesis and multimodal reasoning at high inference speeds, incorporating an architecture of proprietary frontier neural architecture developed by Google DeepMind, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (120 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 31, Briefcase Elo: 1203, Accuracy: 51%, Non-Hallucination: 45%, FrontierCode: 19%, AutomationBench: 60%, TerminalBench 4: 20%, HLE Diamond: 33%, Speed: 120 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Google DeepMind, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (120 tok/s).', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-3-8-flash-high",
  contents="Synthesize multimodal analysis over 1M context."
)', 'Intelligence Index: 31, Briefcase Elo: 1203, Accuracy: 51%, Non-Hallucination: 45%, FrontierCode: 19%, AutomationBench: 60%, TerminalBench 4: 20%, HLE Diamond: 33%, Speed: 120 tok/s, Context Window: 1M', 'Proprietary cloud API access via Google DeepMind developer platform; subject to API rate limits and token pricing ($0.75/M in, $3.75/M out).', 'https://artificialanalysis.ai/models/gemini-3-8-flash', '[{"text":"Gemini 3.8 Flash (high) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gemini-3-8-flash"},{"text":"Gemini 3.8 Flash (high) Inference Providers","url":"https://artificialanalysis.ai/models/gemini-3-8-flash/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 4 Argon', 'Google DeepMind', 'Model', 'AI Coding', 'Proprietary', 2025, 'Frontier MoE', 'Google DeepMind''s ultra-responsive frontier reasoning architecture, optimized for high-throughput enterprise agentic pipelines, real-time code synthesis, and automated document analysis across 1M tokens, incorporating an architecture of natively Multimodal Reasoning Mixture-of-Experts with long decode output synthesis, self-correction verification loops, and agentic API integration. The model demonstrates competitive performance across verified evaluations, including SWE-bench Verified: 74.8%, AIME 2024: 86.2%, GPQA Diamond: 71.5%, 1M token context & long decode. With its Frontier MoE design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Natively Multimodal Reasoning Mixture-of-Experts with long decode output synthesis, self-correction verification loops, and agentic API integration.', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-4-argon",
  contents="Design an end-to-end distributed fault-tolerant Raft consensus engine in Rust."
)', 'SWE-bench Verified: 74.8%, AIME 2024: 86.2%, GPQA Diamond: 71.5%, 1M token context & long decode', 'Enterprise and cloud API usage boundaries; high test-time compute requirements for deep reasoning modes.', 'https://deepmind.google/technologies/gemini/', '[{"text":"Gemini 4 Argon Technical Overview","url":"https://deepmind.google/technologies/gemini/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 4 Argon (high)', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'High reasoning effort checkpoint of Google DeepMind''s Gemini 4 Argon, tuned for rigorous multi-file code generation and automated analytical synthesis with 1M context, incorporating an architecture of proprietary frontier neural architecture developed by Google DeepMind, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (83 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 50, Briefcase Elo: 1484, Accuracy: 48%, Non-Hallucination: 96%, FrontierCode: 26%, AutomationBench: 78%, TerminalBench 4: 57%, HLE Diamond: 57%, Speed: 83 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Google DeepMind, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (83 tok/s).', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-4-argon-high",
  contents="Synthesize multimodal analysis over 1M context."
)', 'Intelligence Index: 50, Briefcase Elo: 1484, Accuracy: 48%, Non-Hallucination: 96%, FrontierCode: 26%, AutomationBench: 78%, TerminalBench 4: 57%, HLE Diamond: 57%, Speed: 83 tok/s, Context Window: 1M', 'Proprietary cloud API access via Google DeepMind developer platform; subject to API rate limits and token pricing ($4/M in, $20/M out).', 'https://artificialanalysis.ai/models/gemini-4-argon', '[{"text":"Gemini 4 Argon (high) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gemini-4-argon"},{"text":"Gemini 4 Argon (high) Inference Providers","url":"https://artificialanalysis.ai/models/gemini-4-argon/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 4 Carbon (high)', 'Google DeepMind', 'Model', 'Research', 'Proprietary', 2026, '1M Context · Proprietary Model', 'High reasoning effort checkpoint of Google DeepMind''s Gemini 4 Carbon, maximizing multi-step self-correction, deep chain-of-thought verification, and STEM synthesis across a 1M token context window, incorporating an architecture of proprietary frontier neural architecture developed by Google DeepMind, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (85 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 59, Briefcase Elo: 1610, Accuracy: 58%, Non-Hallucination: 89%, FrontierCode: 41%, AutomationBench: 78%, TerminalBench 4: 65%, HLE Diamond: 69%, Speed: 85 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Google DeepMind, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (85 tok/s).', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-4-carbon-high",
  contents="Synthesize multimodal analysis over 1M context."
)', 'Intelligence Index: 59, Briefcase Elo: 1610, Accuracy: 58%, Non-Hallucination: 89%, FrontierCode: 41%, AutomationBench: 78%, TerminalBench 4: 65%, HLE Diamond: 69%, Speed: 85 tok/s, Context Window: 1M', 'Proprietary cloud API access via Google DeepMind developer platform; subject to API rate limits and token pricing ($4/M in, $20/M out).', 'https://artificialanalysis.ai/models/gemini-4-carbon', '[{"text":"Gemini 4 Carbon (high) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gemini-4-carbon"},{"text":"Gemini 4 Carbon (high) Inference Providers","url":"https://artificialanalysis.ai/models/gemini-4-carbon/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 4 Hydrogen', 'Google DeepMind', 'Model', 'Multimodal', 'Proprietary', 2026, '1M Context · High-Throughput MoE', 'Google DeepMind''s high-efficiency frontier multimodal model, balancing near-flagship reasoning intelligence with rapid first-token latency and low cost across long-context audio, video, and text workflows, incorporating an architecture of natively multimodal Mixture-of-Experts (MoE) optimized for low latency and high inference concurrency, supporting up to 1M token context windows, long decode continuation, and native tool-calling. The model demonstrates competitive performance across verified evaluations, including 1M token unified context window; sub-150ms time-to-first-token (TTFT) streaming; high throughput across parallel subagent task trees and structured JSON schema generation. With its 1M Context · High-Throughput MoE design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Natively multimodal Mixture-of-Experts (MoE) optimized for low latency and high inference concurrency, supporting up to 1M token context windows, long decode continuation, and native tool-calling.', 'from google import genai

client = genai.Client()
response = client.models.generate_content(
  model="gemini-4-hydrogen",
  contents="Analyze this codebase dependency graph and suggest async refactoring opportunities."
)
print(response.text)', '1M token unified context window; sub-150ms time-to-first-token (TTFT) streaming; high throughput across parallel subagent task trees and structured JSON schema generation.', 'Proprietary cloud model accessible via Google AI Studio and the Gemini API; complex deep-theorem mathematical proofs better suited for Gemini 4 Argon.', 'https://deepmind.google/technologies/gemini/', '[{"text":"Google DeepMind Gemini 4 Architecture Overview","url":"https://deepmind.google/technologies/gemini/"},{"text":"Gemini API Documentation on Google AI for Developers","url":"https://ai.google.dev/gemini-api/docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemma 2 (27B)', 'Google DeepMind', 'Model', 'NLP', 'Gemma License', 2024, '27B params', 'Google''s open-weights model built from the same research and technology as the Gemini models, offering class-leading performance for its size, incorporating an architecture of transformer decoder with sliding window attention and soft-capping. The model demonstrates competitive performance across verified evaluations, including MMLU: 81.5%, HumanEval: 71.5%. With its 27B params design, it supports diverse local and enterprise deployment profiles under the Gemma license.', 'Transformer decoder with sliding window attention and soft-capping.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("google/gemma-2-27b-it")
model = AutoModelForCausalLM.from_pretrained("google/gemma-2-27b-it")', 'MMLU: 81.5%, HumanEval: 71.5%', 'Commercial use permitted but subject to the Gemma license terms.', 'https://ai.google.dev/gemma', '[{"text":"Gemma 2 Announcement","url":"https://blog.google/technology/developers/google-gemma-2/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GEV-26B-Decide', 'autotrust', 'Model', 'NLP', 'APACHE-2.0', 2026, '26B params', 'High-performance NLP open-weights model by autotrust, trending with over 743 community likes and 854,574 downloads on Hugging Face, incorporating an architecture of autotrust text classification architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 604, Likes: 743, Downloads: 854,574. With its 26B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'autotrust text classification architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("autotrust/GEV-26B-Decide", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("autotrust/GEV-26B-Decide")', 'Trending Score: 604, Likes: 743, Downloads: 854,574', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/autotrust/GEV-26B-Decide', '[{"text":"autotrust/GEV-26B-Decide on Hugging Face","url":"https://huggingface.co/autotrust/GEV-26B-Decide"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GitHub Copilot', 'Microsoft', 'Platform', 'NLP', 'Proprietary', 2021, 'Based on customized OpenAI models', 'An AI pair programmer integrated directly into code editors, offering real-time code autocomplete and chat functionality. Its cloud and infrastructure runtime provides powered by OpenAI''s Codex and newer GPT models tailored for code generation. Built for enterprise scalability and reliability, it offers high-throughput API endpoints, automated workflows, and robust developer integrations. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Powered by OpenAI''s Codex and newer GPT models tailored for code generation.', '// Type a comment in VS Code to trigger Copilot
// function to parse a URL and return the domain name
function getDomain(url) {
  // Copilot suggests: return new URL(url).hostname;
}', 'N/A', 'Paid subscription required, can suggest insecure code patterns.', 'https://github.com/features/copilot', '[{"text":"GitHub Copilot Features","url":"https://github.com/features/copilot"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Glean', 'Glean Technologies', 'AI', 'Productivity', 'Proprietary', 2024, 'Enterprise Cloud', 'Enterprise AI work assistant and enterprise search platform that connects across Google Workspace, Slack, Jira, GitHub, and Microsoft 365 with role-based permissions. The application is powered by advanced foundation models utilizing enterprise knowledge graph with vector retrieval and semantic permission enforcement. Key user-facing capabilities include Enterprise standard for trusted workplace search and LLM grounding across corporate apps. Available under a Proprietary model for commercial and personal productivity.', 'Enterprise knowledge graph with vector retrieval and semantic permission enforcement.', 'Ask Glean: "What is the status of project Orion and who is leading the security audit?"', 'Enterprise standard for trusted workplace search and LLM grounding across corporate apps.', 'Requires enterprise corporate deployment and IT administrator configuration.', 'https://www.glean.com', '[{"text":"Glean Enterprise Search","url":"https://www.glean.com"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GLM-5.3 (max)', 'Zhipu AI (THUDM)', 'Model', 'NLP', 'Open', 2026, '1M Context · Open Model', 'Maximum reasoning effort configuration of Zhipu AI''s bilingual GLM-5.3 model, leveraging deep thought chains for complex Chinese and English academic analysis across 1M tokens, incorporating an architecture of open-weights frontier neural architecture developed by Zhipu AI (THUDM), featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (76 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 32, Briefcase Elo: 1505, Accuracy: 32%, Non-Hallucination: 61%, FrontierCode: 22%, AutomationBench: 62%, TerminalBench 4: 42%, HLE Diamond: 18%, Speed: 76 tok/s, Context Window: 1M. With its 1M Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by Zhipu AI (THUDM), featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (76 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Zhipu/glm-5-3-max", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Zhipu/glm-5-3-max")', 'Intelligence Index: 32, Briefcase Elo: 1505, Accuracy: 32%, Non-Hallucination: 61%, FrontierCode: 22%, AutomationBench: 62%, TerminalBench 4: 42%, HLE Diamond: 18%, Speed: 76 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/glm-5-3', '[{"text":"GLM-5.3 (max) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/glm-5-3"},{"text":"GLM-5.3 (max) Inference Providers","url":"https://artificialanalysis.ai/models/glm-5-3/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GLM-5.3-Flash', 'Zhipu AI (THUDM)', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'Zhipu AI''s high-throughput open foundation model, delivering sub-second first-token response times and competitive NLP accuracy for high-volume enterprise APIs, incorporating an architecture of zhipu AI image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 316, Likes: 2,099, Downloads: 761,364. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'Zhipu AI image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("zai-org/GLM-5.3-Flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("zai-org/GLM-5.3-Flash")', 'Trending Score: 316, Likes: 2,099, Downloads: 761,364', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/zai-org/GLM-5.3-Flash', '[{"text":"zai-org/GLM-5.3-Flash on Hugging Face","url":"https://huggingface.co/zai-org/GLM-5.3-Flash"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('glue', 'nyu-mll', 'Dataset', 'NLP', 'OTHER', 2026, '1M<n<10M', 'Dataset Card for GLUE Dataset Summary GLUE, the General Language Understanding Evaluation benchmark (https://gluebenchmark.com/) is a collection of resou (730 likes, 784,661 downloads). The corpus spans 1M<n<10M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 199, Likes: 730, Downloads: 784,661. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nyu-mll/glue")', 'Trending Score: 199, Likes: 730, Downloads: 784,661', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nyu-mll/glue', '[{"text":"nyu-mll/glue on Hugging Face Datasets","url":"https://huggingface.co/datasets/nyu-mll/glue"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('godot-steering-ai-framework', 'GDQuest', 'Framework', 'NLP', 'MIT', 2026, '1MB Repo', 'A complete framework for Godot to create beautiful and complex AI motion. Works both in 2D and in 3D. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 1,551, Forks: 89. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/GDQuest/godot-steering-ai-framework
cd godot-steering-ai-framework
pip install -e .', 'GitHub Stars: 1,551, Forks: 89', 'Requires local Python environment and dependency configuration.', 'https://github.com/GDQuest/godot-steering-ai-framework', '[{"text":"GDQuest/godot-steering-ai-framework on GitHub","url":"https://github.com/GDQuest/godot-steering-ai-framework"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Google Antigravity', 'Google DeepMind', 'AI', 'AI Coding', 'Proprietary', 2026, 'Agentic IDE & Multi-Agent Swarm Platform', 'Google DeepMind''s agentic AI assistant and development environment designed for autonomous coding, multi-agent swarms, workspace orchestration, terminal execution, and verified artifact generation. The application is powered by advanced foundation models utilizing agentic orchestration framework integrating DeepMind reasoning models, background subagent delegation, sandboxed terminal execution, and reactive state machine messaging. Key user-facing capabilities include End-to-end task automation with zero-drift file modifications, native multi-agent swarm collaboration, and full TypeScript/Vite/Python development support. Available under a Proprietary model for commercial and personal productivity.', 'Agentic orchestration framework integrating DeepMind reasoning models, background subagent delegation, sandboxed terminal execution, and reactive state machine messaging.', 'Launch Antigravity in your workspace. Use commands like /goal, /boost, or /plan to direct agentic swarms across multi-file refactoring and testing workflows.', 'End-to-end task automation with zero-drift file modifications, native multi-agent swarm collaboration, and full TypeScript/Vite/Python development support.', 'Proprietary Google platform; requires workspace filesystem permissions and authenticated API access for frontier reasoning models.', 'https://deepmind.google/technologies/antigravity', '[{"text":"Google DeepMind Research & Technologies","url":"https://deepmind.google"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Google Gemini', 'Google DeepMind', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Google''s flagship AI assistant (formerly Bard), featuring multimodal capabilities and tight integration with Google Workspace. The application is powered by advanced foundation models utilizing web Application / Conversational Agent (Powered by Gemini Pro / Ultra models). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Conversational Agent (Powered by Gemini Pro / Ultra models)', 'Visit gemini.google.com to interact.', 'N/A', 'May hallucinate, some features are restricted by region.', 'https://gemini.google.com', '[{"text":"Gemini Announcement","url":"https://blog.google/technology/ai/google-gemini-ai/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Google: Gemini 4 Hydrogen', 'google', 'Model', 'AI Coding', 'Proprietary', 2026, '1049k Context · Available via API', 'Google DeepMind''s high-efficiency workhorse model within the Gemini 4 family, built for high-throughput agentic workflows, large-scale code generation, and multi-model routing at ultra-low inference costs. Features native 1M token context reasoning with breakthrough performance on SWE-bench.', 'High-efficiency multimodal Mixture-of-Experts foundation model with 1049k context window and integrated tool routing.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "google/gemini-4-hydrogen",
  messages: [{ role: "user", content: "Hello!" }]
});', 'SWE-bench Verified: 78.4%, HumanEval: 92.1%, MathVista: 81.2%, Artificial Analysis Cost/Performance Leader.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/google/gemini-4-hydrogen', '[{"url":"https://openrouter.ai/google/gemini-4-hydrogen","text":"Google: Gemini 4 Hydrogen on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-3', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2020, '175B params', 'The landmark 175B parameter autoregressive language model that demonstrated few-shot learning and ignited the modern LLM era, incorporating an architecture of transformer decoder with 96 attention layers. The model demonstrates competitive performance across verified evaluations, including SuperGLUE: 71.8% (few-shot). With its 175B params design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Transformer decoder with 96 attention layers.', '# GPT-3 is accessed via OpenAI''s legacy completions API
from openai import OpenAI
client = OpenAI()
response = client.completions.create(
  model="text-davinci-003",
  prompt="Translate to French: Hello, world!",
  max_tokens=60
)', 'SuperGLUE: 71.8% (few-shot)', 'Largely superseded, expensive, no chat interface natively.', 'https://openai.com/research/language-models-are-few-shot-learners', '[{"text":"Brown et al. (2020) - GPT-3 Paper","url":"https://arxiv.org/abs/2005.14165"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-3.5 Turbo', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2022, 'Unknown (~175B params)', 'OpenAI''s workhorse model balancing performance and speed, widely used for chatbots and text generation at scale, incorporating an architecture of transformer decoder fine-tuned with RLHF for instruction following. The model demonstrates competitive performance across verified evaluations, including MMLU: 70.0%, HumanEval: 48.1%. With its Unknown (~175B params) design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Transformer decoder fine-tuned with RLHF for instruction following.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[{"role": "user", "content": "Hello!"}]
)', 'MMLU: 70.0%, HumanEval: 48.1%', 'Knowledge cutoff, prone to hallucination on niche topics.', 'https://platform.openai.com/docs/models/gpt-3-5-turbo', '[{"text":"ChatGPT Blog Post","url":"https://openai.com/blog/chatgpt"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-4', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2023, 'Unknown (estimated 1.76T params)', 'OpenAI''s groundbreaking multimodal foundation model released in 2023, establishing the benchmark standard for human-level performance on academic exams, complex code generation, and visual reasoning, incorporating an architecture of transformer-based decoder architecture with advanced reasoning capabilities. The model demonstrates competitive performance across verified evaluations, including MMLU: 86.4%, HumanEval: 67%. With its Unknown (estimated 1.76T params) design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Transformer-based decoder architecture with advanced reasoning capabilities.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-4",
  messages=[{"role": "user", "content": "Hello!"}]
)', 'MMLU: 86.4%, HumanEval: 67%', 'Can hallucinate, expensive to run, proprietary with limited access.', 'https://openai.com/gpt-4', '[{"text":"Official GPT-4 Technical Report","url":"https://openai.com/research/gpt-4"},{"text":"GPT-4 API Documentation","url":"https://platform.openai.com/docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-4.5', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2025, 'Ultra-Large Dense', 'OpenAI''s massive knowledge foundation model (codenamed Orion) built for extraordinary conversational nuance, comprehensive world knowledge, reduced hallucinations, and deep multi-disciplinary analysis, incorporating an architecture of ultra-scale multimodal Transformer trained on expansive multi-token prediction and unsupervised knowledge synthesis. The model demonstrates competitive performance across verified evaluations, including SimpleQA: 62.5%, MMLU-Pro: 81.4%, 37% fewer hallucinations than GPT-4o. With its Ultra-Large Dense design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Ultra-scale multimodal Transformer trained on expansive multi-token prediction and unsupervised knowledge synthesis.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-4.5-preview",
  messages=[{"role": "user", "content": "Draft a rigorous scholarly treatise on macroeconomic monetary policy transitions."}]
)', 'SimpleQA: 62.5%, MMLU-Pro: 81.4%, 37% fewer hallucinations than GPT-4o', 'Substantial computational footprint; higher latency and token cost than GPT-4o mini.', 'https://openai.com', '[{"text":"OpenAI GPT-4.5 Research Overview","url":"https://openai.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-4o', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2024, 'Unknown', 'OpenAI''s fastest and most advanced flagship model, featuring native multimodal capabilities across text, vision, and audio in real-time, incorporating an architecture of transformer-based, natively multimodal omni-model. The model demonstrates competitive performance across verified evaluations, including MMLU: 88.7%, HumanEval: 90.2%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Transformer-based, natively multimodal omni-model.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role": "user", "content": "Hello!"}]
)', 'MMLU: 88.7%, HumanEval: 90.2%', 'Requires subscription for high limits, proprietary API, can hallucinate facts.', 'https://openai.com/chatgpt', '[{"text":"GPT-4o Announcement","url":"https://openai.com/index/hello-gpt-4o/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-4o mini', 'OpenAI', 'Model', 'Multimodal', 'Proprietary', 2024, 'Unknown', 'OpenAI''s most cost-efficient small model, replacing GPT-3.5 Turbo, offering significantly higher intelligence, broader multimodal capabilities, and a 128K context window at a fraction of the cost, incorporating an architecture of transformer-based, natively multimodal omni-model. The model demonstrates competitive performance across verified evaluations, including MMLU: 82.0%, HumanEval: 87.0%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern multimodal ecosystem.', 'Transformer-based, natively multimodal omni-model.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[{"role": "user", "content": "Hello!"}]
)', 'MMLU: 82.0%, HumanEval: 87.0%', 'Less capable on highly complex reasoning tasks compared to GPT-4o.', 'https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/', '[{"text":"GPT-4o mini Announcement","url":"https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6 Astra', 'OpenAI', 'Model', 'AI Coding', 'Proprietary', 2026, 'Frontier Multimodal MoE', 'OpenAI''s frontier flagship model released in September 2026, marking a generational leap in autonomous computer use, deep reasoning, and complex multi-step workflow automation across enterprise environments, incorporating an architecture of massive multimodal Mixture-of-Experts with reinforcement learning over deep thought chains, native OS-level computer use drivers, and dynamic tool orchestration. The model demonstrates competitive performance across verified evaluations, including SWE-bench Verified: 82.4%, AIME 2026: 92.1%, OSWorld: 72.3%, GPQA Diamond: 78.6%. With its Frontier Multimodal MoE design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Massive multimodal Mixture-of-Experts with reinforcement learning over deep thought chains, native OS-level computer use drivers, and dynamic tool orchestration.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-astra",
  messages=[{"role": "user", "content": "Execute an end-to-end security audit and refactor the authentication pipeline."}]
)', 'SWE-bench Verified: 82.4%, AIME 2026: 92.1%, OSWorld: 72.3%, GPQA Diamond: 78.6%', 'Available via ChatGPT Plus/Pro/Work and enterprise API; high compute intensity for prolonged agentic execution loops.', 'https://openai.com', '[{"text":"OpenAI GPT-6 Astra Announcement & Technical Report","url":"https://openai.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6 Astra (high)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'High reasoning effort checkpoint of GPT-6 Astra, delivering elite performance on SWE-bench Verified, AIME, and OSWorld benchmarks, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (63 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 55, Briefcase Elo: 1505, Accuracy: 61%, Non-Hallucination: 57%, FrontierCode: 40%, AutomationBench: 67%, TerminalBench 4: 54%, HLE Diamond: 59%, Speed: 63 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (63 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-astra-high",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 55, Briefcase Elo: 1505, Accuracy: 61%, Non-Hallucination: 57%, FrontierCode: 40%, AutomationBench: 67%, TerminalBench 4: 54%, HLE Diamond: 59%, Speed: 63 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/gpt-6-astra-high', '[{"text":"GPT-6 Astra (high) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-astra-high"},{"text":"GPT-6 Astra (high) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-astra-high/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6 Astra (low)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Low compute overhead tier of GPT-6 Astra, offering rapid agentic response times and high token throughput, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (58 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 43, Briefcase Elo: 1256, Accuracy: 59%, Non-Hallucination: 56%, FrontierCode: 26%, AutomationBench: 59%, TerminalBench 4: 42%, HLE Diamond: 45%, Speed: 58 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (58 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-astra-low",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 43, Briefcase Elo: 1256, Accuracy: 59%, Non-Hallucination: 56%, FrontierCode: 26%, AutomationBench: 59%, TerminalBench 4: 42%, HLE Diamond: 45%, Speed: 58 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/gpt-6-astra-low', '[{"text":"GPT-6 Astra (low) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-astra-low"},{"text":"GPT-6 Astra (low) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-astra-low/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6 Astra (max)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Maximum reasoning effort configuration of OpenAI''s GPT-6 Astra, leveraging deep reinforcement learning thought chains and autonomous OS-level computer use drivers across 1M tokens, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (78 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 57, Briefcase Elo: 1569, Accuracy: 62%, Non-Hallucination: 50%, FrontierCode: 42%, AutomationBench: 68%, TerminalBench 4: 59%, HLE Diamond: 64%, Speed: 78 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (78 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-astra-max",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 57, Briefcase Elo: 1569, Accuracy: 62%, Non-Hallucination: 50%, FrontierCode: 42%, AutomationBench: 68%, TerminalBench 4: 59%, HLE Diamond: 64%, Speed: 78 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/gpt-6-astra', '[{"text":"GPT-6 Astra (max) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-astra"},{"text":"GPT-6 Astra (max) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-astra/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6 Astra (medium)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Balanced production checkpoint of GPT-6 Astra, combining frontier cognitive capability with economical token generation for enterprise teams, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (57 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 51, Briefcase Elo: 1462, Accuracy: 60%, Non-Hallucination: 55%, FrontierCode: 37%, AutomationBench: 65%, TerminalBench 4: 49%, HLE Diamond: 53%, Speed: 57 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (57 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-astra-medium",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 51, Briefcase Elo: 1462, Accuracy: 60%, Non-Hallucination: 55%, FrontierCode: 37%, AutomationBench: 65%, TerminalBench 4: 49%, HLE Diamond: 53%, Speed: 57 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/gpt-6-astra-medium', '[{"text":"GPT-6 Astra (medium) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-astra-medium"},{"text":"GPT-6 Astra (medium) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-astra-medium/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6 Astra (xhigh)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Extra-high effort tier of OpenAI''s GPT-6 Astra, tuned for complex multi-step code refactoring, system architecture design, and enterprise security audits, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (66 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 55, Briefcase Elo: 1544, Accuracy: 61%, Non-Hallucination: 55%, FrontierCode: 41%, AutomationBench: 67%, TerminalBench 4: 60%, HLE Diamond: 62%, Speed: 66 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (66 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-astra-xhigh",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 55, Briefcase Elo: 1544, Accuracy: 61%, Non-Hallucination: 55%, FrontierCode: 41%, AutomationBench: 67%, TerminalBench 4: 60%, HLE Diamond: 62%, Speed: 66 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/gpt-6-astra-xhigh', '[{"text":"GPT-6 Astra (xhigh) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-astra-xhigh"},{"text":"GPT-6 Astra (xhigh) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-astra-xhigh/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6 Luna (max)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Maximum reasoning configuration of OpenAI''s micro-latency GPT-6 Luna, delivering precise reasoning at sub-second speeds for interactive real-time apps, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (118 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 28, Briefcase Elo: 1337, Accuracy: 40%, Non-Hallucination: 21%, FrontierCode: 25%, AutomationBench: 53%, TerminalBench 4: 13%, HLE Diamond: 22%, Speed: 118 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (118 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-luna-max",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 28, Briefcase Elo: 1337, Accuracy: 40%, Non-Hallucination: 21%, FrontierCode: 25%, AutomationBench: 53%, TerminalBench 4: 13%, HLE Diamond: 22%, Speed: 118 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($0.1/M in, $0.5/M out).', 'https://artificialanalysis.ai/models/gpt-6-luna', '[{"text":"GPT-6 Luna (max) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-luna"},{"text":"GPT-6 Luna (max) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-luna/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Sol (high)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'High-tier production configuration of GPT-6.1 Sol, balancing frontier reasoning with sub-second token latency, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (60 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 50, Briefcase Elo: 1467, Accuracy: 60%, Non-Hallucination: 51%, FrontierCode: 37%, AutomationBench: 64%, TerminalBench 4: 52%, HLE Diamond: 52%, Speed: 60 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (60 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-sol-high",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 50, Briefcase Elo: 1467, Accuracy: 60%, Non-Hallucination: 51%, FrontierCode: 37%, AutomationBench: 64%, TerminalBench 4: 52%, HLE Diamond: 52%, Speed: 60 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-sol-high', '[{"text":"GPT-6.1 Sol (high) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-1-sol-high"},{"text":"GPT-6.1 Sol (high) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-1-sol-high/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Sol (low)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Economical tier of GPT-6.1 Sol, providing fast, cost-effective reasoning for conversational agents and interactive developer tools, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (52 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 35, Briefcase Elo: 1114, Accuracy: 59%, Non-Hallucination: 50%, FrontierCode: 20%, AutomationBench: 53%, TerminalBench 4: 31%, HLE Diamond: 38%, Speed: 52 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (52 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-sol-low",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 35, Briefcase Elo: 1114, Accuracy: 59%, Non-Hallucination: 50%, FrontierCode: 20%, AutomationBench: 53%, TerminalBench 4: 31%, HLE Diamond: 38%, Speed: 52 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-sol-low', '[{"text":"GPT-6.1 Sol (low) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-1-sol-low"},{"text":"GPT-6.1 Sol (low) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-1-sol-low/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Sol (max)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Maximum reasoning configuration of OpenAI''s GPT-6.1 Sol, purpose-built for high-throughput autonomous coding and scientific simulation with 1M context, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (79 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 55, Briefcase Elo: 1555, Accuracy: 62%, Non-Hallucination: 48%, FrontierCode: 41%, AutomationBench: 65%, TerminalBench 4: 56%, HLE Diamond: 59%, Speed: 79 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (79 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-sol-max",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 55, Briefcase Elo: 1555, Accuracy: 62%, Non-Hallucination: 48%, FrontierCode: 41%, AutomationBench: 65%, TerminalBench 4: 56%, HLE Diamond: 59%, Speed: 79 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-sol', '[{"text":"GPT-6.1 Sol (max) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-1-sol"},{"text":"GPT-6.1 Sol (max) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-1-sol/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Sol (medium)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Standard enterprise checkpoint of GPT-6.1 Sol, optimized for continuous CI/CD integration, pull request analysis, and documentation synthesis, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (50 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 46, Briefcase Elo: 1361, Accuracy: 60%, Non-Hallucination: 52%, FrontierCode: 33%, AutomationBench: 63%, TerminalBench 4: 48%, HLE Diamond: 46%, Speed: 50 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (50 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-sol-medium",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 46, Briefcase Elo: 1361, Accuracy: 60%, Non-Hallucination: 52%, FrontierCode: 33%, AutomationBench: 63%, TerminalBench 4: 48%, HLE Diamond: 46%, Speed: 50 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-sol-medium', '[{"text":"GPT-6.1 Sol (medium) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-1-sol-medium"},{"text":"GPT-6.1 Sol (medium) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-1-sol-medium/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Sol (xhigh)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Extra-high effort checkpoint of GPT-6.1 Sol, specializing in rapid mathematical verification and algorithmic problem solving, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (71 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 52, Briefcase Elo: 1502, Accuracy: 61%, Non-Hallucination: 52%, FrontierCode: 39%, AutomationBench: 67%, TerminalBench 4: 54%, HLE Diamond: 56%, Speed: 71 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (71 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-sol-xhigh",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 52, Briefcase Elo: 1502, Accuracy: 61%, Non-Hallucination: 52%, FrontierCode: 39%, AutomationBench: 67%, TerminalBench 4: 54%, HLE Diamond: 56%, Speed: 71 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-sol-xhigh', '[{"text":"GPT-6.1 Sol (xhigh) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-1-sol-xhigh"},{"text":"GPT-6.1 Sol (xhigh) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-1-sol-xhigh/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Terra (high)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'High reasoning checkpoint of GPT-6.1 Terra, optimized for high-volume enterprise pipelines requiring strong logical consistency, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (91 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 42, Briefcase Elo: 1264, Accuracy: 47%, Non-Hallucination: 63%, FrontierCode: 37%, AutomationBench: 58%, TerminalBench 4: 42%, HLE Diamond: 35%, Speed: 91 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (91 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-terra-high",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 42, Briefcase Elo: 1264, Accuracy: 47%, Non-Hallucination: 63%, FrontierCode: 37%, AutomationBench: 58%, TerminalBench 4: 42%, HLE Diamond: 35%, Speed: 91 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($1/M in, $5/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-terra-high', '[{"text":"GPT-6.1 Terra (high) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-1-terra-high"},{"text":"GPT-6.1 Terra (high) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-1-terra-high/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Terra (max)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Maximum reasoning configuration of OpenAI''s GPT-6.1 Terra, delivering frontier-level coding and analytical accuracy in an ultra-efficient footprint, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (97 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 51, Briefcase Elo: 1402, Accuracy: 48%, Non-Hallucination: 65%, FrontierCode: 42%, AutomationBench: 60%, TerminalBench 4: 56%, HLE Diamond: 47%, Speed: 97 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (97 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-terra-max",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 51, Briefcase Elo: 1402, Accuracy: 48%, Non-Hallucination: 65%, FrontierCode: 42%, AutomationBench: 60%, TerminalBench 4: 56%, HLE Diamond: 47%, Speed: 97 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($1/M in, $5/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-terra', '[{"text":"GPT-6.1 Terra (max) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-1-terra"},{"text":"GPT-6.1 Terra (max) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-1-terra/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Terra (medium)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Balanced production tier of GPT-6.1 Terra, offering exceptionally low per-token pricing with robust reasoning capability, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (91 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 38, Briefcase Elo: 1191, Accuracy: 47%, Non-Hallucination: 60%, FrontierCode: 35%, AutomationBench: 58%, TerminalBench 4: 32%, HLE Diamond: 31%, Speed: 91 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (91 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-terra-medium",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 38, Briefcase Elo: 1191, Accuracy: 47%, Non-Hallucination: 60%, FrontierCode: 35%, AutomationBench: 58%, TerminalBench 4: 32%, HLE Diamond: 31%, Speed: 91 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($1/M in, $5/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-terra-medium', '[{"text":"GPT-6.1 Terra (medium) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-1-terra-medium"},{"text":"GPT-6.1 Terra (medium) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-1-terra-medium/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Terra (non-reasoning)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Standard autoregressive completion mode of GPT-6.1 Terra, bypassing extended thought chains for instant, low-cost token generation, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (90 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 30, Briefcase Elo: 1228, Accuracy: 41%, Non-Hallucination: 23%, FrontierCode: 33%, AutomationBench: 51%, TerminalBench 4: 27%, HLE Diamond: 14%, Speed: 90 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (90 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-terra-non-reasoning",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 30, Briefcase Elo: 1228, Accuracy: 41%, Non-Hallucination: 23%, FrontierCode: 33%, AutomationBench: 51%, TerminalBench 4: 27%, HLE Diamond: 14%, Speed: 90 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($1/M in, $5/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-terra-non-reasoning', '[{"text":"GPT-6.1 Terra (non-reasoning) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-1-terra-non-reasoning"},{"text":"GPT-6.1 Terra (non-reasoning) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-1-terra-non-reasoning/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Terra (xhigh)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Extra-high effort checkpoint of GPT-6.1 Terra, specialized in multi-hop question answering and dense technical extraction across 1M tokens, incorporating an architecture of proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (92 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 45, Briefcase Elo: 1333, Accuracy: 48%, Non-Hallucination: 63%, FrontierCode: 37%, AutomationBench: 60%, TerminalBench 4: 46%, HLE Diamond: 42%, Speed: 92 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (92 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-terra-xhigh",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 45, Briefcase Elo: 1333, Accuracy: 48%, Non-Hallucination: 63%, FrontierCode: 37%, AutomationBench: 60%, TerminalBench 4: 46%, HLE Diamond: 42%, Speed: 92 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($1/M in, $5/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-terra-xhigh', '[{"text":"GPT-6.1 Terra (xhigh) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/gpt-6-1-terra-xhigh"},{"text":"GPT-6.1 Terra (xhigh) Inference Providers","url":"https://artificialanalysis.ai/models/gpt-6-1-terra-xhigh/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grammarly', 'Grammarly Inc.', 'AI', 'Productivity', 'Proprietary', 2009, 'N/A', 'An AI-powered writing assistant that checks grammar, spelling, tone, clarity, and style in real-time across browsers, documents, and email clients. The application is powered by advanced foundation models utilizing browser Extension / SaaS (Proprietary NLP models + generative AI layer). It features an intuitive interface designed to streamline complex productivity workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Browser Extension / SaaS (Proprietary NLP models + generative AI layer)', 'Install the Grammarly browser extension from grammarly.com or use the desktop app.', 'N/A', 'Premium plan required for advanced suggestions; can occasionally suggest unnatural rephrasing.', 'https://www.grammarly.com', '[{"text":"Grammarly","url":"https://www.grammarly.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Granite 3.0 8B Instruct', 'IBM', 'Model', 'NLP', 'Apache-2.0', 2024, '8B Parameters · 128k Context', 'IBM''s enterprise-grade open foundation model trained on over 12 trillion tokens across 12 languages and 116 programming languages, optimized for enterprise RAG, tool calling, and structured reasoning, incorporating an architecture of decoder-only dense transformer with grouped-query attention, RoPE positional embeddings, and instruction tuning over curated enterprise safety datasets. The model demonstrates competitive performance across verified evaluations, including MMLU: 67.5%, GSM8K: 77.0%, HumanEval: 62.2%, Berkeley Function Calling Leaderboard: 89.2%. With its 8B Parameters · 128k Context design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Decoder-only dense transformer with grouped-query attention, RoPE positional embeddings, and instruction tuning over curated enterprise safety datasets.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ibm-granite/granite-3.0-8b-instruct", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ibm-granite/granite-3.0-8b-instruct")', 'MMLU: 67.5%, GSM8K: 77.0%, HumanEval: 62.2%, Berkeley Function Calling Leaderboard: 89.2%', 'Primarily optimized for enterprise English and structured workflows; lower performance on niche low-resource multilingual natural dialogue.', 'https://www.ibm.com/granite', '[{"text":"IBM Granite 3.0 Technical Overview","url":"https://www.ibm.com/granite"},{"text":"Granite 3.0 8B Instruct on Hugging Face","url":"https://huggingface.co/ibm-granite/granite-3.0-8b-instruct"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Granola AI', 'Granola', 'AI', 'Productivity', 'Proprietary', 2024, 'Desktop app', 'AI notepad for meetings that combines human typing with customizable LLM transcript enhancement to produce clear, actionable meeting notes without intrusive bots. The application is powered by advanced foundation models utilizing local audio capture + Whisper transcription + fine-tuned LLM synthesis. Key user-facing capabilities include Praised by thousands of founders and executives for non-intrusive bot-free note taking. Available under a Proprietary model for commercial and personal productivity.', 'Local audio capture + Whisper transcription + fine-tuned LLM synthesis.', 'Launch Granola on Mac during a Zoom or Google Meet call, take quick notes, and click enhance.', 'Praised by thousands of founders and executives for non-intrusive bot-free note taking.', 'Currently macOS native application.', 'https://www.granola.ai', '[{"text":"Granola","url":"https://www.granola.ai"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok', 'xAI', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'An AI assistant developed by xAI, designed to have a bit of wit, a rebellious streak, and real-time access to X (Twitter) data. The application is powered by advanced foundation models utilizing web Application / Conversational Agent (Powered by Grok models). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Conversational Agent (Powered by Grok models)', 'Access via X Premium subscription.', 'N/A', 'Requires an active X Premium subscription.', 'https://x.ai', '[{"text":"Grok Announcement","url":"https://x.ai/blog/grok"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok 3', 'xAI', 'Model', 'NLP', 'Proprietary', 2025, 'Colossus Cluster MoE', 'xAI''s flagship frontier reasoning model trained on the 100,000 H100 Colossus cluster, delivering frontier mathematical deduction, competitive programming mastery, and real-time truth-seeking deep reasoning modes, incorporating an architecture of massive-scale Mixture-of-Experts with reinforcement learning from test-time reasoning tokens and synthetic data verification. The model demonstrates competitive performance across verified evaluations, including AIME 2025: 84.5%, MATH-500: 94.8%, HumanEval: 91.4%, GPQA: 68.2%. With its Colossus Cluster MoE design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Massive-scale Mixture-of-Experts with reinforcement learning from test-time reasoning tokens and synthetic data verification.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_XAI_KEY", base_url="https://api.x.ai/v1")
response = client.chat.completions.create(
  model="grok-3",
  messages=[{"role": "user", "content": "Prove this lemma on non-abelian gauge theories."}]
)', 'AIME 2025: 84.5%, MATH-500: 94.8%, HumanEval: 91.4%, GPQA: 68.2%', 'Proprietary cloud service; extended reasoning modes consume high token counts and increase latency.', 'https://x.ai', '[{"text":"xAI Grok 3 Announcement","url":"https://x.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok 4.7 (high)', 'xAI', 'Model', 'NLP', 'Proprietary', 2026, '500k Context · Proprietary Model', 'High-tier production checkpoint of Grok 4.7, providing state-of-the-art coding and mathematical performance across 500k tokens, incorporating an architecture of proprietary frontier neural architecture developed by xAI, featuring native 500k token window support, optimized reasoning chains, and low-latency inference throughput (78 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 35, Briefcase Elo: 1629, Accuracy: 42%, Non-Hallucination: 80%, FrontierCode: 28%, AutomationBench: 64%, TerminalBench 4: 25%, HLE Diamond: 24%, Speed: 78 tok/s, Context Window: 500k. With its 500k Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by xAI, featuring native 500k token window support, optimized reasoning chains, and low-latency inference throughput (78 tok/s).', 'from openai import OpenAI
client = OpenAI(base_url="https://api.x.ai/v1", api_key="XAI_API_KEY")
response = client.chat.completions.create(
  model="grok-4-7-high",
  messages=[{"role": "user", "content": "Analyze real-time data streaming telemetry."}]
)', 'Intelligence Index: 35, Briefcase Elo: 1629, Accuracy: 42%, Non-Hallucination: 80%, FrontierCode: 28%, AutomationBench: 64%, TerminalBench 4: 25%, HLE Diamond: 24%, Speed: 78 tok/s, Context Window: 500k', 'Proprietary cloud API access via xAI developer platform; subject to API rate limits and token pricing ($2/M in, $6/M out).', 'https://artificialanalysis.ai/models/grok-4-7-high', '[{"text":"Grok 4.7 (high) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/grok-4-7-high"},{"text":"Grok 4.7 (high) Inference Providers","url":"https://artificialanalysis.ai/models/grok-4-7-high/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok 4.7 (low)', 'xAI', 'Model', 'NLP', 'Proprietary', 2026, '500k Context · Proprietary Model', 'Fast-inference checkpoint of Grok 4.7, engineered for responsive conversational interaction and low-latency API queries, incorporating an architecture of proprietary frontier neural architecture developed by xAI, featuring native 500k token window support, optimized reasoning chains, and low-latency inference throughput (72 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 31, Briefcase Elo: 1495, Accuracy: 46%, Non-Hallucination: 66%, FrontierCode: 22%, AutomationBench: 57%, TerminalBench 4: 16%, HLE Diamond: 19%, Speed: 72 tok/s, Context Window: 500k. With its 500k Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by xAI, featuring native 500k token window support, optimized reasoning chains, and low-latency inference throughput (72 tok/s).', 'from openai import OpenAI
client = OpenAI(base_url="https://api.x.ai/v1", api_key="XAI_API_KEY")
response = client.chat.completions.create(
  model="grok-4-7-low",
  messages=[{"role": "user", "content": "Analyze real-time data streaming telemetry."}]
)', 'Intelligence Index: 31, Briefcase Elo: 1495, Accuracy: 46%, Non-Hallucination: 66%, FrontierCode: 22%, AutomationBench: 57%, TerminalBench 4: 16%, HLE Diamond: 19%, Speed: 72 tok/s, Context Window: 500k', 'Proprietary cloud API access via xAI developer platform; subject to API rate limits and token pricing ($2/M in, $6/M out).', 'https://artificialanalysis.ai/models/grok-4-7-low', '[{"text":"Grok 4.7 (low) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/grok-4-7-low"},{"text":"Grok 4.7 (low) Inference Providers","url":"https://artificialanalysis.ai/models/grok-4-7-low/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok 4.7 (xhigh)', 'xAI', 'Model', 'NLP', 'Proprietary', 2026, '500k Context · Proprietary Model', 'Extra-high compute configuration of xAI''s Grok 4.7, trained on the massive Colossus cluster for frontier reasoning, STEM synthesis, and real-time world knowledge, incorporating an architecture of proprietary frontier neural architecture developed by xAI, featuring native 500k token window support, optimized reasoning chains, and low-latency inference throughput (87 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 34, Briefcase Elo: 1638, Accuracy: 43%, Non-Hallucination: 80%, FrontierCode: 29%, AutomationBench: 66%, TerminalBench 4: 26%, HLE Diamond: 23%, Speed: 87 tok/s, Context Window: 500k. With its 500k Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by xAI, featuring native 500k token window support, optimized reasoning chains, and low-latency inference throughput (87 tok/s).', 'from openai import OpenAI
client = OpenAI(base_url="https://api.x.ai/v1", api_key="XAI_API_KEY")
response = client.chat.completions.create(
  model="grok-4-7-xhigh",
  messages=[{"role": "user", "content": "Analyze real-time data streaming telemetry."}]
)', 'Intelligence Index: 34, Briefcase Elo: 1638, Accuracy: 43%, Non-Hallucination: 80%, FrontierCode: 29%, AutomationBench: 66%, TerminalBench 4: 26%, HLE Diamond: 23%, Speed: 87 tok/s, Context Window: 500k', 'Proprietary cloud API access via xAI developer platform; subject to API rate limits and token pricing ($2/M in, $6/M out).', 'https://artificialanalysis.ai/models/grok-4-7', '[{"text":"Grok 4.7 (xhigh) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/grok-4-7"},{"text":"Grok 4.7 (xhigh) Inference Providers","url":"https://artificialanalysis.ai/models/grok-4-7/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok-1', 'xAI', 'Model', 'NLP', 'Apache-2.0', 2024, '314B total (86B active per token)', 'xAI''s open-weights MoE language model, the first large model from Elon Musk''s AI company, trained with a focus on real-time information and humor, incorporating an architecture of sparse MoE transformer with 8 experts. The model demonstrates competitive performance across verified evaluations, including MMLU: 73%, HumanEval: 63.2%. With its 314B total (86B active per token) design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Sparse MoE transformer with 8 experts.', '# Grok-1 weights available on HuggingFace
# Run locally with sufficient GPU cluster
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("xai-org/grok-1")', 'MMLU: 73%, HumanEval: 63.2%', 'Extremely large model requiring significant compute, not production-API accessible.', 'https://x.ai/', '[{"text":"Grok-1 Release","url":"https://x.ai/blog/grok-os"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok-2', 'xAI', 'Model', 'Multimodal', 'Proprietary', 2024, 'Unknown', 'xAI''s frontier model demonstrating significant improvements in reasoning, coding, and mathematical capabilities, integrated with real-time X (Twitter) data and image generation, incorporating an architecture of transformer-based multimodal LLM. The model demonstrates competitive performance across verified evaluations, including Competitive with GPT-4o and Claude 3.5 Sonnet on LMSYS Chatbot Arena. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern multimodal ecosystem.', 'Transformer-based multimodal LLM.', '# Accessed via X Premium subscription or xAI API
import os
from openai import OpenAI
client = OpenAI(api_key=os.environ.get("XAI_API_KEY"), base_url="https://api.x.ai/v1")
response = client.chat.completions.create(model="grok-2-latest", messages=[{"role": "user", "content": "Hi"}])', 'Competitive with GPT-4o and Claude 3.5 Sonnet on LMSYS Chatbot Arena.', 'Requires subscription to X or API access, proprietary.', 'https://x.ai/', '[{"text":"Grok-2 Announcement","url":"https://x.ai/blog/grok-2"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Groq', 'Groq', 'Platform', 'MLOps', 'Proprietary', 2016, 'N/A', 'An AI inference platform powered by custom LPU (Language Processing Unit) chips, delivering extremely fast token generation for open-source models. Its cloud and infrastructure runtime provides lPU hardware with SRAM-based compute delivering deterministic, ultra-low-latency inference. Core platform telemetry and performance features include: 500+ tokens/second — among fastest public LLM inference APIs. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'LPU hardware with SRAM-based compute delivering deterministic, ultra-low-latency inference.', 'from groq import Groq
client = Groq(api_key="YOUR_API_KEY")
completion = client.chat.completions.create(
  model="llama3-70b-8192",
  messages=[{"role": "user", "content": "Explain transformers quickly."}]
)', '500+ tokens/second — among fastest public LLM inference APIs', 'Limited model selection, proprietary hardware dependency.', 'https://groq.com/', '[{"text":"Groq Documentation","url":"https://console.groq.com/docs/openai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GroqCloud', 'Groq', 'Platform', 'MLOps', 'Proprietary', 2024, 'LPU clusters', 'Ultra-fast AI inference platform powered by Groq''s custom LPU (Language Processing Unit) silicon, generating 500+ tokens per second for open LLMs. Its cloud and infrastructure runtime provides deterministic tensor streaming architecture on custom silicon. Core platform telemetry and performance features include: 550+ tokens/sec on Llama 3.3 70B, over 10x faster than standard GPU clouds. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Deterministic tensor streaming architecture on custom silicon.', 'from groq import Groq
client = Groq(api_key="GROQ_API_KEY")
response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "Summarize this live."}]
)', '550+ tokens/sec on Llama 3.3 70B, over 10x faster than standard GPU clouds.', 'Limited context window lengths compared to huge GPU memory clusters.', 'https://groq.com', '[{"text":"Groq LPU Architecture","url":"https://groq.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GSM8K', 'OpenAI', 'Dataset', 'NLP', 'MIT', 2021, '8,500 problems (7,500 train / 1,319 test)', 'A dataset of 8,500 high-quality grade-school math word problems requiring multi-step reasoning, used to evaluate arithmetic reasoning in LLMs. The corpus spans 8,500 problems (7,500 train / 1,319 test) of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating GPT-4: 92%, Claude 3 Opus: 95.0%, Llama 3 70B: 93%. Released under the MIT license for open evaluation and research reproducibility.', 'Multi-step word problems with natural language solutions and final numerical answers.', 'from datasets import load_dataset
dataset = load_dataset("gsm8k", "main")
print(dataset[''test''][0])', 'GPT-4: 92%, Claude 3 Opus: 95.0%, Llama 3 70B: 93%', 'Grade-school level only, top models now saturate this benchmark.', 'https://github.com/openai/grade-school-math', '[{"text":"Cobbe et al. (2021) - GSM8K Paper","url":"https://arxiv.org/abs/2110.14168"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('h3-acceleration-arena', 'multimodalart', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by multimodalart. Trending with 68 community stars. Its cloud and infrastructure runtime provides dOCKER cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 68, Community Likes: 68. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/multimodalart/h3-acceleration-arena', 'Trending Score: 68, Community Likes: 68', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/multimodalart/h3-acceleration-arena', '[{"text":"multimodalart/h3-acceleration-arena on Hugging Face Spaces","url":"https://huggingface.co/spaces/multimodalart/h3-acceleration-arena"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Helicone', 'Helicone', 'Platform', 'MLOps', 'Apache-2.0 / Cloud', 2023, 'N/A', 'Open-source LLM observability, smart proxy caching, rate limiting, and cost tracking platform designed for production AI teams. Its cloud and infrastructure runtime provides edge reverse proxy with low-latency async logging and response caching. Core platform telemetry and performance features include: Caches repeated semantic queries reducing API bills by up to 40%. Accessible under a Apache-2.0 / Cloud tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Edge reverse proxy with low-latency async logging and response caching.', 'from openai import OpenAI
client = OpenAI(base_url="https://oai.helicone.ai/v1", default_headers={"Helicone-Auth": "Bearer HELICONE_API_KEY"})', 'Caches repeated semantic queries reducing API bills by up to 40%.', 'Requires routing OpenAI SDK traffic through Helicone proxy URL.', 'https://www.helicone.ai', '[{"text":"Helicone Documentation","url":"https://docs.helicone.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hemmingway-1', 'Altworld', 'Model', 'NLP', 'CC-BY-NC-4.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by Altworld, trending with over 579 community likes and 3,787 downloads on Hugging Face, incorporating an architecture of altworld text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 565, Likes: 579, Downloads: 3,787. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the CC-BY-NC-4.0 license.', 'Altworld text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Altworld/Hemmingway-1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Altworld/Hemmingway-1")', 'Trending Score: 565, Likes: 579, Downloads: 3,787', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Altworld/Hemmingway-1', '[{"text":"Altworld/Hemmingway-1 on Hugging Face","url":"https://huggingface.co/Altworld/Hemmingway-1"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hexabot', 'hexabot-ai', 'Framework', 'NLP', 'NOASSERTION', 2026, '54MB Repo', 'Hexabot v3 is an AI workflow automation platform, combining workflows, actions, agents, and conversational channels in one runtime. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 1,217, Forks: 242. Licensed under the NOASSERTION license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/hexabot-ai/Hexabot
cd Hexabot
pip install -e .', 'GitHub Stars: 1,217, Forks: 242', 'Requires local Python environment and dependency configuration.', 'https://github.com/hexabot-ai/Hexabot', '[{"text":"hexabot-ai/Hexabot on GitHub","url":"https://github.com/hexabot-ai/Hexabot"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HeyGen', 'HeyGen', 'AI', 'Video Generation', 'Proprietary', 2020, 'N/A', 'An AI video generation platform specializing in realistic AI avatar videos and video translation with lip-sync, widely used for marketing and corporate communications. The application is powered by advanced foundation models utilizing web Application (Proprietary talking-head synthesis and lip-sync AI model). It features an intuitive interface designed to streamline complex video generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Proprietary talking-head synthesis and lip-sync AI model)', 'Visit heygen.com, choose an avatar or upload your own, write a script, and generate a video.', 'N/A', 'Free tier is very limited; video translation accuracy can vary with complex audio.', 'https://www.heygen.com', '[{"text":"HeyGen","url":"https://www.heygen.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('hfviewer', 'embedl', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by embedl. Trending with 70 community stars. Its cloud and infrastructure runtime provides sTATIC cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 67, Community Likes: 70. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/embedl/hfviewer', 'Trending Score: 67, Community Likes: 70', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/embedl/hfviewer', '[{"text":"embedl/hfviewer on Hugging Face Spaces","url":"https://huggingface.co/spaces/embedl/hfviewer"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('hh-rlhf', 'Anthropic', 'Dataset', 'NLP', 'MIT', 2026, '100K<n<1M', 'Dataset Card for HH-RLHF Dataset Summary This repository provides access to two different kinds of data: Human preference data about helpfulness and harm (2,043 likes, 39,538 downloads). The corpus spans 100K<n<1M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 33, Likes: 2,043, Downloads: 39,538. Released under the MIT license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Anthropic/hh-rlhf")', 'Trending Score: 33, Likes: 2,043, Downloads: 39,538', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Anthropic/hh-rlhf', '[{"text":"Anthropic/hh-rlhf on Hugging Face Datasets","url":"https://huggingface.co/datasets/Anthropic/hh-rlhf"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('hle', 'cais', 'Dataset', 'Computer Vision', 'MIT', 2026, '1K<n<10K', 'Humanity''s Last Exam (HLE) benchmark dataset, developed by the Center for AI Safety (CAIS) and Scale AI. Comprising 3,000 exceptionally challenging multi-disciplinary questions created by subject-matter experts across dozens of advanced scientific fields, designed to test frontier models at the outer boundaries of human knowledge.', 'Multi-modal expert benchmark dataset featuring high-difficulty multiple-choice and free-response questions with rigorous grading rubrics.', 'from datasets import load_dataset

dataset = load_dataset("cais/hle")', 'State-of-the-art frontier models score under 25% on initial release, establishing the premier frontier AI benchmark.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/cais/hle', '[{"url":"https://huggingface.co/datasets/cais/hle","text":"cais/hle on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('horus', 'softmata', 'Framework', 'MLOps', 'Apache-2.0', 2026, '146MB Repo', 'Ultra-fast, hardware-accelerated robotics runtime and middleware designed to provide high-performance, deterministic execution for embodied AI and physical robotics. Under the hood, it incorporates modular AI codebase with native Python/C++ bindings and distributed workflow support. Key technical highlights include: GitHub Stars: 435, Forks: 31. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/softmata/horus
cd horus
pip install -e .', 'GitHub Stars: 435, Forks: 31', 'Requires local Python environment and dependency configuration.', 'https://github.com/softmata/horus', '[{"text":"softmata/horus on GitHub","url":"https://github.com/softmata/horus"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hugging Face', 'Hugging Face', 'Platform', 'MLOps', 'Apache-2.0 (libraries)', 2016, '1M+ models hosted', 'The foundational open-source AI platform and model registry, hosting over 1M model checkpoints, datasets, and Spaces alongside the ubiquitous Transformers, Diffusers, and Datasets libraries. Its cloud and infrastructure runtime provides cloud platform with transformers library, model hub, and deployment tools. Core platform telemetry and performance features include: Most popular model hub globally. Accessible under a Apache-2.0 (libraries) tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Cloud platform with transformers library, model hub, and deployment tools.', 'from transformers import pipeline
classifier = pipeline("sentiment-analysis")
result = classifier("I love this encyclopedia!")', 'Most popular model hub globally', 'Free tier has rate limits, deploying large models requires paid endpoints.', 'https://huggingface.co', '[{"text":"Hugging Face Documentation","url":"https://huggingface.co/docs"},{"text":"Transformers Library","url":"https://github.com/huggingface/transformers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HuggingChat', 'Hugging Face', 'AI', 'NLP', 'Open Source UI / Various model licenses', 2023, 'N/A', 'An open-source AI assistant by Hugging Face, allowing users to converse with various top-tier open-weight models. The application is powered by advanced foundation models utilizing web Application (Supports Llama, Mistral, Command R, etc.). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Open Source UI / Various model licenses model for commercial and personal productivity.', 'Web Application (Supports Llama, Mistral, Command R, etc.)', 'Visit huggingface.co/chat to interact.', 'N/A', 'Model availability may rotate, performance depends on the selected underlying model.', 'https://huggingface.co/chat', '[{"text":"HuggingChat","url":"https://huggingface.co/chat"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HumanEval', 'OpenAI', 'Dataset', 'NLP', 'MIT', 2021, '164 hand-written programming problems', 'OpenAI''s benchmark of 164 hand-crafted Python programming problems to evaluate the code generation capability of language models. The corpus spans 164 hand-written programming problems of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating GPT-4: 67%, Claude 3.5 Sonnet: 92%, Llama 3 70B: 81.7%. Released under the MIT license for open evaluation and research reproducibility.', 'Python functions with docstrings and unit tests; evaluated by pass@k metric.', 'from datasets import load_dataset
dataset = load_dataset("openai_humaneval")
print(dataset[''test''][0][''prompt''])', 'GPT-4: 67%, Claude 3.5 Sonnet: 92%, Llama 3 70B: 81.7%', 'Python-only, relatively small size, may be contaminated in model training data.', 'https://github.com/openai/human-eval', '[{"text":"Chen et al. (2021) - Evaluating LLMs Trained on Code","url":"https://arxiv.org/abs/2107.03374"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('humanizer', 'jialinyyzz', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by jialinyyzz, trending with over 766 community likes and 29,470 downloads on Hugging Face, incorporating an architecture of jialinyyzz text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 717, Likes: 766, Downloads: 29,470. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'jialinyyzz text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("jialinyyzz/humanizer", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("jialinyyzz/humanizer")', 'Trending Score: 717, Likes: 766, Downloads: 29,470', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/jialinyyzz/humanizer', '[{"text":"jialinyyzz/humanizer on Hugging Face","url":"https://huggingface.co/jialinyyzz/humanizer"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HunyuanVideo', 'Tencent', 'Model', 'Video Generation', 'Apache-2.0', 2024, '13B params', 'Tencent''s open-weights 13B dual-stream text-to-video foundation model delivering cinema-quality 720p 24fps video clips with exceptional physics consistency, incorporating an architecture of dual-stream Diffusion Transformer (DiT) integrating 3D VAE with text-video cross-attention. The model demonstrates competitive performance across verified evaluations, including VBench Total: 85.2% (Top ranked open-source text-to-video model). With its 13B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Dual-stream Diffusion Transformer (DiT) integrating 3D VAE with text-video cross-attention.', 'from diffusers import HunyuanVideoPipeline
pipe = HunyuanVideoPipeline.from_pretrained("Tencent-Hunyuan/HunyuanVideo", torch_dtype=torch.bfloat16)
video = pipe("Astronaut riding a horse on the moon, cinematic 4k").frames[0]', 'VBench Total: 85.2% (Top ranked open-source text-to-video model)', 'High VRAM requirements (recommended 44GB+ for unquantized inference).', 'https://github.com/Tencent/HunyuanVideo', '[{"text":"HunyuanVideo Technical Report","url":"https://arxiv.org/abs/2412.03603"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hy-Memory-30B-A3B', 'tencent', 'Model', 'NLP', 'APACHE-2.0', 2026, '30B params', 'Tencent''s 30B parameter Mixture-of-Experts foundation model activating 3B parameters per token, featuring dedicated external episodic memory compression layers. Designed for lifelong conversational agents, it remembers user preferences, historical sessions, and complex project contexts across millions of tokens.', 'Sparse Mixture-of-Experts Transformer with episodic hierarchical memory routing and 1M token effective context window.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("tencent/Hy-Memory-30B-A3B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("tencent/Hy-Memory-30B-A3B")', 'RULER needle-in-a-haystack recall: 99.4% at 1M tokens; MMLU: 79.8%.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/tencent/Hy-Memory-30B-A3B', '[{"url":"https://huggingface.co/tencent/Hy-Memory-30B-A3B","text":"tencent/Hy-Memory-30B-A3B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HyperCLOVA X', 'Naver', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Naver''s large-scale Korean-English bilingual AI assistant, fine-tuned for Korean cultural context and integrated into Naver''s search and services. The application is powered by advanced foundation models utilizing web Application / Conversational Agent (Powered by HyperCLOVA X model). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Conversational Agent (Powered by HyperCLOVA X model)', 'Access via clova.ai or integrated directly into Naver Search and other Naver services.', 'N/A', 'Primarily focused on Korean and English; limited global availability.', 'https://clova.ai', '[{"text":"HyperCLOVA X","url":"https://clova.ai"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ideogram', 'Ideogram AI', 'AI', 'Image Generation', 'Proprietary', 2023, 'N/A', 'An AI image generation tool that excels at rendering accurate, legible text within images — a long-standing weakness of most diffusion models. The application is powered by advanced foundation models utilizing web Application (Proprietary text-aware image generation model). It features an intuitive interface designed to streamline complex image generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Proprietary text-aware image generation model)', 'Visit ideogram.ai, sign in, and generate images with text prompts including typographic elements.', 'N/A', 'Free tier limits daily generations; less photorealistic than Midjourney for non-text images.', 'https://ideogram.ai', '[{"text":"Ideogram AI","url":"https://ideogram.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ImageNet', 'Stanford AI', 'Dataset', 'Computer Vision', 'Various (academic use)', 2009, '14M images, 150GB', 'Stanford University''s foundational visual dataset comprising 14+ million annotated images across 20,000+ categories, which catalyzed the deep learning revolution via the ImageNet Challenge. The corpus spans 14M images, 150GB of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Standard benchmark for computer vision (ImageNet-1K). Released under the Various (academic use) license for open evaluation and research reproducibility.', 'Hierarchical organization based on WordNet, 1000 classes for ILSVRC.', 'from torchvision.datasets import ImageNet
dataset = ImageNet(root=''./data'', split=''train'')', 'Standard benchmark for computer vision (ImageNet-1K)', 'Some labeling issues, Western-centric bias.', 'https://image-net.org', '[{"text":"Deng et al. (2009) - ImageNet Paper","url":"https://ieeexplore.ieee.org/document/5206848"},{"text":"Official ImageNet Website","url":"https://image-net.org"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('imagenet-1k', 'ILSVRC', 'Dataset', 'Computer Vision', 'OTHER', 2026, '1M<n<10M', 'The landmark ImageNet Large Scale Visual Recognition Challenge (ILSVRC) dataset spanning 1.28 million training images across 1,000 diverse object categories. The historic foundational benchmark that sparked the deep learning revolution in computer vision, remaining a vital benchmark for pretraining and transfer learning.', 'Standardized visual classification dataset with 1,281,167 training images, 50,000 validation images, and WordNet hierarchical labels.', 'from datasets import load_dataset

dataset = load_dataset("ILSVRC/imagenet-1k")', 'Gold standard vision benchmark since 2012; Top-1 accuracy milestone tracking across computer vision history.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ILSVRC/imagenet-1k', '[{"url":"https://huggingface.co/datasets/ILSVRC/imagenet-1k","text":"ILSVRC/imagenet-1k on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('imdb', 'Stanford AI', 'Dataset', 'NLP', 'OTHER', 2026, '100K<n<1M', 'Dataset Card for "imdb" Dataset Summary Large Movie Review Dataset. This is a dataset for binary sentiment classification containing substantially more data than (698 likes, 189,340 downloads). The corpus spans 100K<n<1M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 216, Likes: 698, Downloads: 189,340. Released under the OTHER license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("stanfordnlp/imdb")', 'Trending Score: 216, Likes: 698, Downloads: 189,340', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/stanfordnlp/imdb', '[{"text":"stanfordnlp/imdb on Hugging Face Datasets","url":"https://huggingface.co/datasets/stanfordnlp/imdb"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('inclusionAI: Ling 3.2 Flash (free)', 'inclusionai', 'Model', 'Multimodal', 'Proprietary', 2026, '1049k Context · Available via API', 'InclusionAI''s hybrid multimodal reasoning model featuring a massive 1M token context window and support for up to 200 high-resolution images per request. Equipped with dynamic thought budgets, it excels at complex document analysis, multi-image comparison, and academic problem solving.', 'Multimodal foundation model hosted on OpenRouter with native 1049k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "inclusionai/ling-3.2-flash:free",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1049k Context; processes 200 visual inputs simultaneously across global OpenRouter nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/inclusionai/ling-3.2-flash:free', '[{"url":"https://openrouter.ai/inclusionai/ling-3.2-flash:free","text":"inclusionAI: Ling 3.2 Flash (free) on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('indra-ocr', 'datalab-to', 'Model', 'NLP', 'OPENRAIL', 2026, 'Open Weights', 'Multilingual optical character recognition engine developed by DataLab-to, specialized in under-resourced non-Latin writing systems, Indic scripts, degraded historical documents, and complex tabular layouts with precise bounding box detection and formatting preservation.', 'Deep vision transformer combining contrastive script encoders with autoregressive character sequence decoders.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("datalab-to/indra-ocr", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("datalab-to/indra-ocr")', 'Character error rate < 1.2% across 18 Indic scripts and historical palm-leaf manuscripts.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/datalab-to/indra-ocr', '[{"url":"https://huggingface.co/datalab-to/indra-ocr","text":"datalab-to/indra-ocr on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('InfiniSplat2', 'Edisoneh', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'High-performance real-time 3D Gaussian Splatting viewer and reconstruction studio running in WebGL on Hugging Face Spaces by Edisoneh. Enables photorealistic 60fps walkthroughs of complex indoor spaces, drone-captured landscapes, and architectural scans directly in any desktop or mobile browser.', 'Custom WebGL/WebGPU rasterizer supporting multi-resolution 3D Gaussian splats with dynamic level-of-detail (LOD) streaming.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Edisoneh/InfiniSplat2', 'Renders 5M+ Gaussian splats at 60fps on modern mobile and desktop browsers.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Edisoneh/InfiniSplat2', '[{"url":"https://huggingface.co/spaces/Edisoneh/InfiniSplat2","text":"Edisoneh/InfiniSplat2 on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Inkling-2-Small', 'thinkingmachines', 'Model', 'Multimodal', 'APACHE-2.0', 2026, 'Open Weights', 'ThinkingMachines'' lightweight multimodal vision-language model balancing fast on-device inference with robust document transcription, chart reading, and visual conversational reasoning capabilities. Ideal for embedded systems and mobile document capture apps.', 'Compact vision-language Transformer combining efficient visual patch encoders with lightweight autoregressive decoder.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("thinkingmachines/Inkling-2-Small", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("thinkingmachines/Inkling-2-Small")', 'DocVQA: 82.6%, ChartQA: 76.4%, runs at 55 tokens/sec on modern mobile chips.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/thinkingmachines/Inkling-2-Small', '[{"url":"https://huggingface.co/thinkingmachines/Inkling-2-Small","text":"thinkingmachines/Inkling-2-Small on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Instructor', 'Jason Liu', 'Framework', 'MLOps', 'MIT', 2024, 'N/A', 'Python and TypeScript library built on Pydantic to extract guaranteed, strictly validated structured data from any LLM provider. Under the hood, it incorporates pydantic schema injection and automatic validation retry handler. Key technical highlights include: Eliminates structured JSON extraction parse failures across 10+ LLM backends. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Pydantic schema injection and automatic validation retry handler.', 'import instructor
from openai import OpenAI
from pydantic import BaseModel

client = instructor.from_openai(OpenAI())
class User(BaseModel):
    name: str
    age: int

user = client.chat.completions.create(
    model="gpt-4o",
    response_model=User,
    messages=[{"role": "user", "content": "Alice is 28 years old."}]
)', 'Eliminates structured JSON extraction parse failures across 10+ LLM backends.', 'Relies on underlying LLM function calling or tool use capabilities.', 'https://github.com/jxnl/instructor', '[{"text":"Instructor Docs","url":"https://python.useinstructor.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('iris-3b', 'speridlabs', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive cloud demonstration web platform on Hugging Face Spaces by SperidLabs, showcasing the Iris 3B compact multimodal model. Designed for edge AI applications, it demonstrates real-time visual question answering, mobile screen understanding, and document parsing within an ultra-responsive web environment.', 'Gradio web interface backed by SperidLabs'' 3B parameter dense multimodal Transformer running on quantized ONNX/TensorRT runtimes.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/speridlabs/iris-3b', 'Sub-200ms visual response latency; DocVQA: 82.4% with under 4GB memory footprint.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/speridlabs/iris-3b', '[{"url":"https://huggingface.co/spaces/speridlabs/iris-3b","text":"speridlabs/iris-3b on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('jabarti-llm-dataset', 'bakrianoo', 'Dataset', 'NLP', 'CC-BY-SA-4.0', 2026, '1M<n<10M', 'jabarti-llm-dataset Cleaned, section-chunked training corpus for a small bilingual LLM (Arabic + English), combining a curated Egyptian-history collection with genera (40 likes, 904 downloads). The corpus spans 1M<n<10M of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 35, Likes: 40, Downloads: 904. Released under the CC-BY-SA-4.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("bakrianoo/jabarti-llm-dataset")', 'Trending Score: 35, Likes: 40, Downloads: 904', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/bakrianoo/jabarti-llm-dataset', '[{"text":"bakrianoo/jabarti-llm-dataset on Hugging Face Datasets","url":"https://huggingface.co/datasets/bakrianoo/jabarti-llm-dataset"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Jasper', 'Jasper AI', 'AI', 'Productivity', 'Proprietary', 2021, 'N/A', 'An AI content writing platform designed for marketing teams, capable of generating blog posts, ad copy, social media content, and brand-consistent text at scale. The application is powered by advanced foundation models utilizing web Application (Powered by GPT-4 and other LLMs with marketing-specific fine-tuning). It features an intuitive interface designed to streamline complex productivity workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Powered by GPT-4 and other LLMs with marketing-specific fine-tuning)', 'Visit jasper.ai to sign up and use the web editor for AI content generation.', 'N/A', 'Expensive subscription plans; outputs may still require human editing for accuracy.', 'https://www.jasper.ai', '[{"text":"Jasper AI","url":"https://www.jasper.ai"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('JAX', 'Google DeepMind', 'Framework', 'MLOps', 'Apache-2.0', 2018, 'N/A', 'Google''s high-performance numerical computing library combining Autograd and XLA, enabling GPU/TPU-accelerated ML research with functional transformations. Under the hood, it incorporates numPy-compatible API with JIT compilation, vectorization (vmap), and automatic differentiation (grad). Key technical highlights include: Powers many state-of-the-art research papers at Google DeepMind. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'NumPy-compatible API with JIT compilation, vectorization (vmap), and automatic differentiation (grad).', 'import jax
import jax.numpy as jnp

@jax.jit
def predict(params, x):
  return jnp.dot(x, params[''w'']) + params[''b'']

grad_fn = jax.grad(lambda params, x, y: jnp.mean((predict(params, x) - y)**2))', 'Powers many state-of-the-art research papers at Google DeepMind', 'Steeper learning curve, functional style requires adapting existing code.', 'https://github.com/google/jax', '[{"text":"JAX GitHub Repository","url":"https://github.com/google/jax"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('JEV-27B-Demo', 'autotrust', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by autotrust. Trending with 93 community stars. Its cloud and infrastructure runtime provides dOCKER cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 69, Community Likes: 93. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/autotrust/JEV-27B-Demo', 'Trending Score: 69, Community Likes: 93', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/autotrust/JEV-27B-Demo', '[{"text":"autotrust/JEV-27B-Demo on Hugging Face Spaces","url":"https://huggingface.co/spaces/autotrust/JEV-27B-Demo"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('JEV-27B-VL', 'autotrust', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '27B params', 'High-performance Multimodal open-weights model by autotrust, trending with over 685 community likes and 1,278,569 downloads on Hugging Face, incorporating an architecture of autotrust image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 551, Likes: 685, Downloads: 1,278,569. With its 27B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'autotrust image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("autotrust/JEV-27B-VL", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("autotrust/JEV-27B-VL")', 'Trending Score: 551, Likes: 685, Downloads: 1,278,569', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/autotrust/JEV-27B-VL', '[{"text":"autotrust/JEV-27B-VL on Hugging Face","url":"https://huggingface.co/autotrust/JEV-27B-VL"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('JEV-35B', 'autotrust', 'Model', 'NLP', 'APACHE-2.0', 2026, '35B params', 'High-performance NLP open-weights model by autotrust, trending with over 745 community likes and 27,970 downloads on Hugging Face, incorporating an architecture of autotrust text classification architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 469, Likes: 745, Downloads: 27,970. With its 35B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'autotrust text classification architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("autotrust/JEV-35B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("autotrust/JEV-35B")', 'Trending Score: 469, Likes: 745, Downloads: 27,970', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/autotrust/JEV-35B', '[{"text":"autotrust/JEV-35B on Hugging Face","url":"https://huggingface.co/autotrust/JEV-35B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('jev-9b-decision-demo', 'autotrust', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by autotrust. Trending with 94 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 75, Community Likes: 94. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/autotrust/jev-9b-decision-demo', 'Trending Score: 75, Community Likes: 94', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/autotrust/jev-9b-decision-demo', '[{"text":"autotrust/jev-9b-decision-demo on Hugging Face Spaces","url":"https://huggingface.co/spaces/autotrust/jev-9b-decision-demo"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('jev-decision-index', 'multimodalart', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by multimodalart. Trending with 137 community stars. Its cloud and infrastructure runtime provides sTATIC cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 134, Community Likes: 137. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/multimodalart/jev-decision-index', 'Trending Score: 134, Community Likes: 137', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/multimodalart/jev-decision-index', '[{"text":"multimodalart/jev-decision-index on Hugging Face Spaces","url":"https://huggingface.co/spaces/multimodalart/jev-decision-index"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Jev-RAG-Claim-Verification-130K', 'MaziyarPanahi', 'Dataset', 'NLP', 'OTHER', 2026, '100K<n<1M', 'Retrieval-Augmented Generation (RAG) benchmark and training dataset curated by MaziyarPanahi, containing 130,000 rigorously verified claim-evidence pairs. Engineered to train retrieval verifiers, mitigate hallucinations, and evaluate citations in enterprise knowledge management systems.', 'Structured Parquet dataset featuring claims, corroborating and refuting document passages, and logical verification flags.', 'from datasets import load_dataset

dataset = load_dataset("MaziyarPanahi/Jev-RAG-Claim-Verification-130K")', '130,000 annotated claim-evidence pairs; baseline dataset for hallucination mitigation in RAG pipelines.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/MaziyarPanahi/Jev-RAG-Claim-Verification-130K', '[{"url":"https://huggingface.co/datasets/MaziyarPanahi/Jev-RAG-Claim-Verification-130K","text":"MaziyarPanahi/Jev-RAG-Claim-Verification-130K on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('JT-35B-Flash', 'China Mobile', 'Model', 'NLP', 'Proprietary', 2026, '256k Context · Proprietary Model', 'China Mobile''s 35B parameter telecommunications and enterprise language model featuring native 256k context window support. Engineered for high-throughput customer service routing, network telemetry diagnostics, and long-document enterprise information synthesis.', 'Proprietary 35B parameter foundation model with native 256k token context window and flash attention acceleration.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/jt-35b-flash', 'Context Window: 256k Context; benchmarked on Artificial Analysis Leaderboard with top-tier throughput.', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/jt-35b-flash', '[{"url":"https://artificialanalysis.ai/models/jt-35b-flash","text":"JT-35B-Flash on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/jt-35b-flash/providers","text":"JT-35B-Flash Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Julia-1', 'SupersonicLabs', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by SupersonicLabs, trending with over 370 community likes and 2,909 downloads on Hugging Face, incorporating an architecture of supersonicLabs text classification architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 354, Likes: 370, Downloads: 2,909. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'SupersonicLabs text classification architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("SupersonicLabs/Julia-1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("SupersonicLabs/Julia-1")', 'Trending Score: 354, Likes: 370, Downloads: 2,909', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/SupersonicLabs/Julia-1', '[{"text":"SupersonicLabs/Julia-1 on Hugging Face","url":"https://huggingface.co/SupersonicLabs/Julia-1"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Keras', 'Google DeepMind', 'Framework', 'MLOps', 'Apache-2.0', 2015, 'N/A', 'A high-level deep learning API that runs on top of TensorFlow, JAX, or PyTorch, designed for fast experimentation with a human-centric design philosophy. Under the hood, it incorporates multi-backend deep learning API (TF/JAX/PyTorch) with layer, model, and optimizer abstractions. Widely utilized by developers and researchers, it accelerates model development, experimentation, and production deployment across mlops pipelines. Licensed under the Apache-2.0 license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Multi-backend deep learning API (TF/JAX/PyTorch) with layer, model, and optimizer abstractions.', 'import keras
model = keras.Sequential([
  keras.layers.Dense(64, activation=''relu''),
  keras.layers.Dense(1, activation=''sigmoid'')
])
model.compile(optimizer=''adam'', loss=''binary_crossentropy'')
model.fit(x_train, y_train, epochs=10)', 'N/A — high-level API; backend-dependent performance', 'Less flexibility than raw PyTorch for custom training loops.', 'https://keras.io', '[{"text":"Keras Official Documentation","url":"https://keras.io/guides/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Khanmigo', 'Khan Academy', 'AI', 'Education', 'Proprietary', 2023, 'N/A', 'An AI tutor by Khan Academy that guides students through topics using the Socratic method, asking questions rather than giving direct answers to encourage learning. The application is powered by advanced foundation models utilizing web Application (Powered by GPT-4 with educational fine-tuning and guardrails). It features an intuitive interface designed to streamline complex education workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Powered by GPT-4 with educational fine-tuning and guardrails)', 'Access at khanacademy.org; available to students and teachers with a Khan Academy account.', 'N/A', 'Requires a Khan Academy account; primarily focused on K-12 curriculum topics.', 'https://www.khanacademy.org/khan-labs', '[{"text":"Khanmigo by Khan Academy","url":"https://www.khanacademy.org/khan-labs"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kimi k1.5', 'Moonshot AI', 'Model', 'Multimodal', 'Proprietary', 2025, 'Frontier Multimodal', 'Moonshot AI''s multimodal reasoning model with native visual math and long-horizon planning, trained with policy optimization and Monte Carlo Tree Search across text, images, and long video, incorporating an architecture of multimodal Transformer with reinforcement learning and search-augmented verification across 200k+ context. The model demonstrates competitive performance across verified evaluations, including AIME 2024: 77.5%, MathVista: 72.8%, LiveCodeBench: 53.2%. With its Frontier Multimodal design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Multimodal Transformer with reinforcement learning and search-augmented verification across 200k+ context.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_KEY", base_url="https://api.moonshot.cn/v1")
response = client.chat.completions.create(
  model="kimi-k1.5",
  messages=[{"role": "user", "content": "Solve this Olympiad geometry question with diagram analysis."}]
)', 'AIME 2024: 77.5%, MathVista: 72.8%, LiveCodeBench: 53.2%', 'API availability primarily centered on Moonshot platform; inference latency scales with reasoning length.', 'https://www.moonshot.cn', '[{"text":"Kimi k1.5: Scaling Reinforcement Learning with LLMs","url":"https://github.com/MoonshotAI/Kimi-k1.5"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kimi K3.1 Pro', 'Moonshot AI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Moonshot AI''s frontier long-context model, providing deep multi-document synthesis, academic paper analysis, and agentic workflows across 1M tokens, incorporating an architecture of proprietary frontier neural architecture developed by Moonshot AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (31 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 46, Briefcase Elo: 1676, Accuracy: 49%, Non-Hallucination: 63%, FrontierCode: 25%, AutomationBench: 73%, TerminalBench 4: 67%, HLE Diamond: 37%, Speed: 31 tok/s, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Moonshot AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (31 tok/s).', 'import requests

response = requests.post(
  "https://api.moonshotai.com/v1/chat/completions",
  json={"model": "kimi-k3-1-pro", "messages": [{"role": "user", "content": "Benchmark query"}]}
)', 'Intelligence Index: 46, Briefcase Elo: 1676, Accuracy: 49%, Non-Hallucination: 63%, FrontierCode: 25%, AutomationBench: 73%, TerminalBench 4: 67%, HLE Diamond: 37%, Speed: 31 tok/s, Context Window: 1M', 'Proprietary cloud API access via Moonshot AI developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/kimi-k3-1-pro', '[{"text":"Kimi K3.1 Pro on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/kimi-k3-1-pro"},{"text":"Kimi K3.1 Pro Inference Providers","url":"https://artificialanalysis.ai/models/kimi-k3-1-pro/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kling AI', 'Kuaishou', 'AI', 'Video Generation', 'Proprietary', 2024, 'N/A', 'A powerful AI video generation model by Kuaishou capable of producing realistic 2-minute videos at 1080p from text or image inputs. The application is powered by advanced foundation models utilizing web Application (Proprietary video diffusion model with 3D spatiotemporal attention). It features an intuitive interface designed to streamline complex video generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Proprietary video diffusion model with 3D spatiotemporal attention)', 'Access via klingai.com; generate videos from text prompts or reference images.', 'N/A', 'Longer generation times compared to some competitors; some features require a paid plan.', 'https://klingai.com', '[{"text":"Kling AI","url":"https://klingai.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kokoro-82M', 'Hexgrad', 'Model', 'Audio', 'Apache-2.0', 2025, '82M params', 'Hexgrad''s open-weights 82M parameter text-to-speech model producing studio-quality English and multilingual voice audio in real time on CPUs, incorporating an architecture of styleTTS 2 architecture with ISTFT vocoder. The model demonstrates competitive performance across verified evaluations, including Real-time factor < 0.1 on modern consumer CPUs; highly ranked on TTS Arena. With its 82M params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'StyleTTS 2 architecture with ISTFT vocoder.', 'from kokoro import KPipeline
pipeline = KPipeline(lang_code=''a'')
generator = pipeline("Hello, welcome to AiVerse!", voice=''af_heart'', speed=1.0)', 'Real-time factor < 0.1 on modern consumer CPUs; highly ranked on TTS Arena.', 'Trained primarily on English and select Romance languages.', 'https://huggingface.co/hexgrad/Kokoro-82M', '[{"text":"Kokoro Model Card","url":"https://huggingface.co/hexgrad/Kokoro-82M"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kolibri-1', 'Aleph-Alpha', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by Aleph-Alpha, trending with over 407 community likes and 1,135 downloads on Hugging Face, incorporating an architecture of aleph-Alpha text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 398, Likes: 407, Downloads: 1,135. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Aleph-Alpha text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Aleph-Alpha/Kolibri-1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Aleph-Alpha/Kolibri-1")', 'Trending Score: 398, Likes: 407, Downloads: 1,135', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Aleph-Alpha/Kolibri-1', '[{"text":"Aleph-Alpha/Kolibri-1 on Hugging Face","url":"https://huggingface.co/Aleph-Alpha/Kolibri-1"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Krea AI', 'Krea AI', 'AI', 'Image Generation', 'Proprietary', 2024, 'N/A', 'Real-time generative AI canvas and video creation tool allowing creators to generate and refine images and video with real-time brush strokes and prompt feedback. The application is powered by advanced foundation models utilizing real-time latent diffusion pipeline with sub-100ms screen rendering canvas. Key user-facing capabilities include Sub-100ms interactive visual generation loop. Available under a Proprietary model for commercial and personal productivity.', 'Real-time latent diffusion pipeline with sub-100ms screen rendering canvas.', 'Open krea.ai, draw shapes on the left canvas, and see photorealistic 4k renders update live on the right.', 'Sub-100ms interactive visual generation loop.', 'Requires fast internet connection for real-time web canvas streaming.', 'https://www.krea.ai', '[{"text":"Krea AI","url":"https://www.krea.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Krea-2-Turbo_I2I', 'Krea AI', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by MrdDickDickenson. Trending with 103 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 87, Community Likes: 103. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/MrdDickDickenson/Krea-2-Turbo_I2I', 'Trending Score: 87, Community Likes: 103', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/MrdDickDickenson/Krea-2-Turbo_I2I', '[{"text":"MrdDickDickenson/Krea-2-Turbo_I2I on Hugging Face Spaces","url":"https://huggingface.co/spaces/MrdDickDickenson/Krea-2-Turbo_I2I"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Krea-2-Turbo_v2', 'Krea AI', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by Jackiesixnine. Trending with 113 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 86, Community Likes: 113. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Jackiesixnine/Krea-2-Turbo_v2', 'Trending Score: 86, Community Likes: 113', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Jackiesixnine/Krea-2-Turbo_v2', '[{"text":"Jackiesixnine/Krea-2-Turbo_v2 on Hugging Face Spaces","url":"https://huggingface.co/spaces/Jackiesixnine/Krea-2-Turbo_v2"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kromoss', 'lodestones', 'Model', 'Image Generation', 'APACHE-2.0', 2026, 'Open Weights', 'Lodestones'' stylized diffusion foundation model trained specifically for digital concept art, dark fantasy illustrations, and cinematic environmental landscapes. Features distinctive dynamic lighting, painterly brushwork, and atmospheric depth that stand out from conventional photorealistic models.', 'Latent Diffusion Model with specialized aesthetic fine-tuning on high-concept digital paintings and fantasy art portfolios.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("lodestones/Kromoss", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("lodestones/Kromoss")', 'Aesthetic score: 8.92; rated #1 in community community blind tests for concept art fidelity.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/lodestones/Kromoss', '[{"url":"https://huggingface.co/lodestones/Kromoss","text":"lodestones/Kromoss on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LAION-5B', 'LAION', 'Dataset', 'Computer Vision', 'CC BY 4.0', 2022, '5.85B image-text pairs (~240TB)', 'A massive open-source dataset of 5.85 billion CLIP-filtered image-text pairs scraped from the web, used to train Stable Diffusion and other vision models. The corpus spans 5.85B image-text pairs (~240TB) of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Enables training of SOTA text-to-image models. Released under the CC BY 4.0 license for open evaluation and research reproducibility.', 'CLIP-filtered pairs from Common Crawl with aesthetic, safety, and watermark scores.', '# Access subsets via HuggingFace
from datasets import load_dataset
dataset = load_dataset("laion/laion2B-en", split="train", streaming=True)', 'Enables training of SOTA text-to-image models', 'Contains harmful/copyrighted content, filtered versions recommended.', 'https://laion.ai/blog/laion-5b/', '[{"text":"Schuhmann et al. (2022) - LAION-5B Paper","url":"https://arxiv.org/abs/2210.08402"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('laion-audio-xl', 'laion', 'Dataset', 'Audio', 'OTHER', 2026, '100M<n<1B', 'Landmark open audio-language multimodal corpus developed by LAION, containing over 366 million acoustic clips (up to 30 seconds each) paired with rich descriptive captions. Serves as the foundational training dataset for next-generation CLAP models, audio generation diffusion transformers, and environmental sound classifiers.', 'Massive web-scale audio dataset stored in WebDataset format with paired descriptive text captions and audio acoustic tags.', 'from datasets import load_dataset

dataset = load_dataset("laion/laion-audio-xl")', '366M+ audio-text pairs; standard pretraining dataset for state-of-the-art audio-language models worldwide.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/laion/laion-audio-xl', '[{"url":"https://huggingface.co/datasets/laion/laion-audio-xl","text":"laion/laion-audio-xl on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LangChain', 'LangChain', 'Framework', 'MLOps', 'MIT', 2022, 'N/A', 'A popular framework for building LLM-powered applications with chains, agents, memory, and tool integrations. Under the hood, it incorporates modular Python/JS library with abstractions for chains, agents, retrievers, and memory. Key technical highlights include: Most starred LLM framework on GitHub (85K+ stars). Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Modular Python/JS library with abstractions for chains, agents, retrievers, and memory.', 'from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

model = ChatOpenAI(model="gpt-4o")
response = model.invoke([HumanMessage(content="Tell me a joke.")])', 'Most starred LLM framework on GitHub (85K+ stars)', 'Rapidly evolving API, abstractions can be opaque, sometimes overengineered for simple tasks.', 'https://www.langchain.com/', '[{"text":"LangChain Documentation","url":"https://python.langchain.com/docs/get_started/introduction"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LangGraph', 'LangChain', 'Framework', 'MLOps', 'MIT', 2024, 'N/A', 'Stateful orchestration library from LangChain for building cyclic, multi-agent workflows, human-in-the-loop oversight, and durable execution state. Under the hood, it incorporates graph-based execution engine with state persistence checkpoints. Key technical highlights include: De facto industry standard for multi-agent loops and agentic workflow orchestration. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Graph-based execution engine with state persistence checkpoints.', 'from langgraph.graph import StateGraph, START, END
builder = StateGraph(dict)
builder.add_node("agent", lambda state: {"msg": "Done"})
builder.add_edge(START, "agent")
builder.add_edge("agent", END)
graph = builder.compile()', 'De facto industry standard for multi-agent loops and agentic workflow orchestration.', 'Requires structured state typing; higher complexity than linear chains.', 'https://github.com/langchain-ai/langgraph', '[{"text":"LangGraph Docs","url":"https://langchain-ai.github.io/langgraph/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LangSmith', 'LangChain', 'Platform', 'MLOps', 'Proprietary', 2023, 'Cloud / Self-hosted', 'Enterprise LLMOps platform from LangChain for debugging, testing, evaluating, and monitoring LLM applications and complex agent workflows. Its cloud and infrastructure runtime provides distributed telemetry tracing backend with prompt management and online evaluation. Core platform telemetry and performance features include: Standard tracing tool for production agent developers. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Distributed telemetry tracing backend with prompt management and online evaluation.', 'export LANGCHAIN_TRACING_V2="true"
export LANGCHAIN_API_KEY="your-api-key"
# All LangChain & LangGraph calls automatically trace to dashboard', 'Standard tracing tool for production agent developers.', 'Full tracing storage can be expensive at massive enterprise scale.', 'https://smith.langchain.com', '[{"text":"LangSmith Documentation","url":"https://docs.smith.langchain.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('last-translation-benchmark', 'zouhar', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '1K<n<10K', 'Last Translation Benchmark Abstract: For scientific progress, we need benchmarks that test the limits of state-of-the-art models, and evaluation methods that inform (33 likes, 293 downloads). The corpus spans 1K<n<10K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 32, Likes: 33, Downloads: 293. Released under the CC-BY-4.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("zouhar/last-translation-benchmark")', 'Trending Score: 32, Likes: 33, Downloads: 293', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/zouhar/last-translation-benchmark', '[{"text":"zouhar/last-translation-benchmark on Hugging Face Datasets","url":"https://huggingface.co/datasets/zouhar/last-translation-benchmark"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('laya', 'convaiinnovations', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by convaiinnovations, trending with over 1,146 community likes and 0 downloads on Hugging Face, incorporating an architecture of convaiinnovations text classification architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 1125, Likes: 1,146, Downloads: 0. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'convaiinnovations text classification architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("convaiinnovations/laya", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("convaiinnovations/laya")', 'Trending Score: 1125, Likes: 1,146, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/convaiinnovations/laya', '[{"text":"convaiinnovations/laya on Hugging Face","url":"https://huggingface.co/convaiinnovations/laya"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('laya-demo', 'convaiinnovations', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by convaiinnovations. Trending with 108 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 107, Community Likes: 108. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/convaiinnovations/laya-demo', 'Trending Score: 107, Community Likes: 108', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/convaiinnovations/laya-demo', '[{"text":"convaiinnovations/laya-demo on Hugging Face Spaces","url":"https://huggingface.co/spaces/convaiinnovations/laya-demo"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Leonardo.ai', 'Leonardo.ai', 'AI', 'Image Generation', 'Proprietary', 2022, 'N/A', 'A versatile AI image generation platform popular with game developers and artists, offering fine-tuned models, canvas editing, and consistent character generation. The application is powered by advanced foundation models utilizing web Application (Powered by Stable Diffusion fine-tunes and proprietary models). It features an intuitive interface designed to streamline complex image generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Powered by Stable Diffusion fine-tunes and proprietary models)', 'Visit leonardo.ai, create an account, and generate images using built-in or custom models.', 'N/A', 'Daily token limit on the free plan; advanced features like real-time canvas require paid credits.', 'https://leonardo.ai', '[{"text":"Leonardo.ai","url":"https://leonardo.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM2.5-24B-A2B', 'LiquidAI', 'Model', 'NLP', 'OTHER', 2026, '24B params', 'Liquid AI''s 24B parameter Liquid Foundation Model (LFM) activating 2B parameters per token. Built on non-transformer adaptive dynamical state-space mechanics rather than conventional quadratic attention, LFM2.5 achieves ultra-high inference throughput with an extremely compact memory footprint, enabling native edge device execution and constant-memory long-sequence reasoning.', 'Adaptive dynamical liquid neural network (LFM) state-space architecture activating 2B parameters out of 24B total.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM2.5-24B-A2B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM2.5-24B-A2B")', 'Throughput: 380 tokens/sec on Apple M3 Max; MMLU: 78.4%; GSM8K: 86.2% with 80% lower KV-cache RAM.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM2.5-24B-A2B', '[{"url":"https://huggingface.co/LiquidAI/LFM2.5-24B-A2B","text":"LiquidAI/LFM2.5-24B-A2B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM2.5-24B-A2B-GGUF', 'LiquidAI', 'Model', 'NLP', 'OTHER', 2026, '24B params', 'Liquid AI''s 24B parameter Liquid Foundation Model quantized into GGUF format for high-speed local inference via llama.cpp. By utilizing non-transformer adaptive liquid dynamical state-space mechanics, it runs with exceptional speed on Apple Silicon (Metal) and consumer PCs with minimal memory footprint.', 'GGUF-quantized liquid neural network state-space model activating 2B parameters with constant-memory attention.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM2.5-24B-A2B-GGUF", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM2.5-24B-A2B-GGUF")', '4-bit GGUF requires only 14GB RAM; achieves 120 tokens/sec on Apple M-series chips.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM2.5-24B-A2B-GGUF', '[{"url":"https://huggingface.co/LiquidAI/LFM2.5-24B-A2B-GGUF","text":"LiquidAI/LFM2.5-24B-A2B-GGUF on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LightOnOCR-3-Demo', 'lightonai', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by lightonai. Trending with 45 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 43, Community Likes: 45. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/lightonai/LightOnOCR-3-Demo', 'Trending Score: 43, Community Likes: 45', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/lightonai/LightOnOCR-3-Demo', '[{"text":"lightonai/LightOnOCR-3-Demo on Hugging Face Spaces","url":"https://huggingface.co/spaces/lightonai/LightOnOCR-3-Demo"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LiteLLM', 'BerriAI', 'Framework', 'MLOps', 'MIT', 2024, 'N/A', 'Universal proxy and Python SDK to call 100+ LLM APIs (OpenAI, Anthropic, Bedrock, Vertex, Ollama, Groq) using the standard OpenAI format with load balancing and fallbacks. Under the hood, it incorporates unified API gateway proxy and translation layer. Key technical highlights include: 99.99% gateway reliability with automatic multi-provider failover routing. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Unified API gateway proxy and translation layer.', 'from litellm import completion
response = completion(
    model="anthropic/claude-3-5-sonnet-20240620",
    messages=[{"role": "user", "content": "Hello World"}]
)', '99.99% gateway reliability with automatic multi-provider failover routing.', 'Gateway proxy adds slight network hop (~5ms) in high-throughput setups.', 'https://github.com/BerriAI/litellm', '[{"text":"LiteLLM Documentation","url":"https://docs.litellm.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LiveCodeBench', 'LiveCodeBench Team', 'Dataset', 'AI Coding', 'MIT', 2024, '1,000+ problems', 'Holistic, continuously updated, contamination-free code benchmark collected from LeetCode, AtCoder, and Codeforces to test modern LLM coding capabilities. The corpus spans 1,000+ problems of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Prevents benchmark memorization through temporal problem filtering. Released under the MIT license for open evaluation and research reproducibility.', 'Time-stamped competitive coding problems with automated evaluation harnesses.', 'from datasets import load_dataset
ds = load_dataset("livecodebench/code_generation_lite", split="test")', 'Prevents benchmark memorization through temporal problem filtering.', 'Focuses on competitive algorithm logic rather than large-scale repo architecture.', 'https://livecodebench.github.io', '[{"text":"LiveCodeBench Paper","url":"https://arxiv.org/abs/2403.07974"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LLaMA', 'Meta AI', 'Model', 'NLP', 'LLaMA License (non-commercial)', 2023, '7B to 65B params', 'Open foundation language models from 7B to 65B parameters that sparked the open-source LLM revolution, incorporating an architecture of transformer decoder with optimizations for efficiency. The model demonstrates competitive performance across verified evaluations, including 70B model competitive with GPT-3.5 on many tasks. With its 7B to 65B params design, it supports diverse local and enterprise deployment profiles under the LLaMA License (non-commercial) license.', 'Transformer decoder with optimizations for efficiency.', 'from transformers import LlamaForCausalLM, LlamaTokenizer
model = LlamaForCausalLM.from_pretrained("meta-llama/Llama-2-7b")
tokenizer = LlamaTokenizer.from_pretrained("meta-llama/Llama-2-7b")', '70B model competitive with GPT-3.5 on many tasks', 'Restricted commercial use, requires significant compute.', 'https://ai.meta.com/llama/', '[{"text":"Touvron et al. (2023) - LLaMA Paper","url":"https://arxiv.org/abs/2302.13971"},{"text":"Meta AI Official LLaMA Page","url":"https://ai.meta.com/llama/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LLaMA 2', 'Meta AI', 'Model', 'NLP', 'Llama 2 Community License', 2023, '7B to 70B params', 'Meta''s second-generation open foundation model family (7B–70B) with a permissive commercial license, trained on 2T tokens, incorporating an architecture of transformer decoder with grouped query attention and RoPE embeddings. The model demonstrates competitive performance across verified evaluations, including MMLU: 68.9% (70B), HumanEval: 29.9% (70B). With its 7B to 70B params design, it supports diverse local and enterprise deployment profiles under the Llama 2 Community license.', 'Transformer decoder with grouped query attention and RoPE embeddings.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-70b-chat-hf")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-70b-chat-hf")', 'MMLU: 68.9% (70B), HumanEval: 29.9% (70B)', 'Weaker than Llama 3 on most tasks, 4096 max context window.', 'https://ai.meta.com/llama/', '[{"text":"Touvron et al. (2023) - Llama 2 Paper","url":"https://arxiv.org/abs/2307.09288"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3 (70B)', 'Meta AI', 'Model', 'NLP', 'Meta Llama 3 License', 2024, '70B params', 'Meta''s powerful open-weights language model, offering near-proprietary performance while remaining free to download and run locally, incorporating an architecture of optimized Transformer decoder architecture trained on 15T tokens. The model demonstrates competitive performance across verified evaluations, including MMLU: 82.0%, HumanEval: 81.7%. With its 70B params design, it supports diverse local and enterprise deployment profiles under the Meta Llama 3 license.', 'Optimized Transformer decoder architecture trained on 15T tokens.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-70B-Instruct")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-70B-Instruct")', 'MMLU: 82.0%, HumanEval: 81.7%', 'Requires substantial GPU VRAM to run locally, lacks native vision/audio.', 'https://llama.meta.com/', '[{"text":"Introducing Meta Llama 3","url":"https://ai.meta.com/blog/meta-llama-3/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3 (8B)', 'Meta AI', 'Model', 'NLP', 'Meta Llama 3 License', 2024, '8B params', 'Meta''s compact open-weights model designed to run efficiently on consumer hardware while retaining strong instruction-following capabilities, incorporating an architecture of transformer decoder with grouped query attention trained on 15T tokens. The model demonstrates competitive performance across verified evaluations, including MMLU: 66.6%, HumanEval: 62.2%. With its 8B params design, it supports diverse local and enterprise deployment profiles under the Meta Llama 3 license.', 'Transformer decoder with grouped query attention trained on 15T tokens.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B-Instruct")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B-Instruct")', 'MMLU: 66.6%, HumanEval: 62.2%', 'Less capable than larger models, struggles with complex multi-step reasoning.', 'https://llama.meta.com/', '[{"text":"Introducing Meta Llama 3","url":"https://ai.meta.com/blog/meta-llama-3/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.1 (405B)', 'Meta AI', 'Model', 'NLP', 'Llama 3.1 Community License', 2024, '405B params', 'Meta''s flagship open-weights model and the first open model to rival top proprietary models like GPT-4o and Claude 3.5 Sonnet across general knowledge, steerability, math, tool use, and multilingual translation, incorporating an architecture of optimized transformer decoder architecture trained on 15T tokens with 128K context window. The model demonstrates competitive performance across verified evaluations, including MMLU: 88.6%, HumanEval: 89.0%, MATH: 73.8%. With its 405B params design, it supports diverse local and enterprise deployment profiles under the Llama 3.1 Community license.', 'Optimized transformer decoder architecture trained on 15T tokens with 128K context window.', 'from transformers import pipeline
pipe = pipeline("text-generation", model="meta-llama/Meta-Llama-3.1-405B-Instruct")
pipe("Hello world!")', 'MMLU: 88.6%, HumanEval: 89.0%, MATH: 73.8%', 'Massive hardware requirements for local inference due to 405B size.', 'https://llama.meta.com/', '[{"text":"Llama 3.1 Announcement","url":"https://ai.meta.com/blog/meta-llama-3-1/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.1 405B', 'Meta AI', 'Model', 'NLP', 'Open', 2024, '128k Context · Open Model', 'Meta AI''s flagship open-weights frontier foundation model with 405 billion parameters, rivaling leading proprietary models across multilingual reasoning, code synthesis, and scientific STEM evaluation, incorporating an architecture of open-weights frontier neural architecture developed by Meta AI, featuring native 128k token window support, optimized reasoning chains, and low-latency inference throughput (high-speed streaming). The model demonstrates competitive performance across verified evaluations, including Context Window: 128k. With its 128k Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by Meta AI, featuring native 128k token window support, optimized reasoning chains, and low-latency inference throughput (high-speed streaming).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Meta/llama-3-1-405b", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Meta/llama-3-1-405b")', 'Context Window: 128k', 'High memory requirements for local execution (128k context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/llama-3-1-instruct-405b', '[{"text":"Llama 3.1 405B on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/llama-3-1-instruct-405b"},{"text":"Llama 3.1 405B Inference Providers","url":"https://artificialanalysis.ai/models/llama-3-1-instruct-405b/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.2 (3B)', 'Meta AI', 'Model', 'NLP', 'Llama 3.2 Community License', 2024, '3.21B params', 'Compact, on-device multilingual small language model optimized for edge devices, mobile compute, and high-speed local inference, incorporating an architecture of pruned and distilled Transformer with 128k context window support. The model demonstrates competitive performance across verified evaluations, including MMLU: 63.4%, GSM8K: 77.7%. With its 3.21B params design, it supports diverse local and enterprise deployment profiles under the Llama 3.2 Community license.', 'Pruned and distilled Transformer with 128k context window support.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-3B-Instruct", device_map="auto")', 'MMLU: 63.4%, GSM8K: 77.7%', 'Less capable on deep multi-step scientific and reasoning problems.', 'https://ai.meta.com/llama/', '[{"text":"Llama 3.2 Announcement","url":"https://ai.meta.com/blog/llama-3-2-connect-2024/"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.2 (90B Vision)', 'Meta AI', 'Model', 'Multimodal', 'Llama 3.2 Community License', 2024, '90B params', 'Meta''s open-weights multimodal model, supporting high-resolution image reasoning alongside top-tier text capabilities, incorporating an architecture of transformer decoder integrated with vision encoder via cross-attention. The model demonstrates competitive performance across verified evaluations, including Highly competitive with closed models on MMMU and MathVista. With its 90B params design, it supports diverse local and enterprise deployment profiles under the Llama 3.2 Community license.', 'Transformer decoder integrated with vision encoder via cross-attention.', 'from transformers import MllamaForConditionalGeneration, AutoProcessor
model = MllamaForConditionalGeneration.from_pretrained("meta-llama/Llama-3.2-90B-Vision-Instruct")
processor = AutoProcessor.from_pretrained("meta-llama/Llama-3.2-90B-Vision-Instruct")', 'Highly competitive with closed models on MMMU and MathVista.', 'Significant hardware required for local inference.', 'https://llama.meta.com/', '[{"text":"Llama 3.2 Announcement","url":"https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.2 Vision (11B)', 'Meta AI', 'Model', 'Multimodal', 'Llama 3.2 Community License', 2024, '11B params', 'Open-weights multimodal vision-language model capable of image understanding, visual reasoning, chart analysis, and document parsing, incorporating an architecture of vision encoder adapter integrated into Llama 3.2 text decoder. The model demonstrates competitive performance across verified evaluations, including DocVQA: 88.4%, ChartQA: 83.4%, MathVista: 57.2%. With its 11B params design, it supports diverse local and enterprise deployment profiles under the Llama 3.2 Community license.', 'Vision encoder adapter integrated into Llama 3.2 text decoder.', 'from transformers import MllamaForConditionalGeneration, AutoProcessor
model = MllamaForConditionalGeneration.from_pretrained("meta-llama/Llama-3.2-11B-Vision-Instruct", device_map="auto")', 'DocVQA: 88.4%, ChartQA: 83.4%, MathVista: 57.2%', 'Vision encoder increases VRAM requirements during high-resolution multi-image processing.', 'https://ai.meta.com/llama/', '[{"text":"Llama 3.2 Vision Model Card","url":"https://ai.meta.com/blog/llama-3-2-connect-2024/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.3 (70B)', 'Meta AI', 'Model', 'NLP', 'Llama 3.3 Community License', 2024, '70B params', 'Meta''s flagship open-weights instruction model delivering capabilities comparable to previous 405B models with 70B parameter efficiency, incorporating an architecture of autoregressive Transformer with Grouped-Query Attention (GQA) and 128k context length. The model demonstrates competitive performance across verified evaluations, including MMLU: 88.6%, HumanEval: 88.4%, GPQA: 50.5%. With its 70B params design, it supports diverse local and enterprise deployment profiles under the Llama 3.3 Community license.', 'Autoregressive Transformer with Grouped-Query Attention (GQA) and 128k context length.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.3-70B-Instruct", device_map="auto")', 'MMLU: 88.6%, HumanEval: 88.4%, GPQA: 50.5%', 'Commercial restriction for products exceeding 700M monthly active users.', 'https://ai.meta.com/llama/', '[{"text":"Llama 3.3 Release","url":"https://ai.meta.com/blog/llama-3-3/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 4 Maverick', 'Meta AI', 'Model', 'NLP', 'Open', 2026, '1M Context · Open Model', 'Meta AI''s next-generation open-weights frontier model, trained on massive multimodal synthetic datasets with enhanced reasoning architectures and a 1M context window, incorporating an architecture of open-weights frontier neural architecture developed by Meta AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (12 tok/s). The model demonstrates competitive performance across verified evaluations, including Briefcase Elo: 0, AutomationBench: 0%, TerminalBench 4: 0%, Speed: 12 tok/s, Context Window: 1M. With its 1M Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by Meta AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (12 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Meta/llama-4-maverick", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Meta/llama-4-maverick")', 'Briefcase Elo: 0, AutomationBench: 0%, TerminalBench 4: 0%, Speed: 12 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/llama-4-maverick', '[{"text":"Llama 4 Maverick on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/llama-4-maverick"},{"text":"Llama 4 Maverick Inference Providers","url":"https://artificialanalysis.ai/models/llama-4-maverick/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 4 Scout', 'Meta AI', 'Model', 'NLP', 'Open', 2026, '10M Context · Open Model', 'Meta AI''s extreme-context open intelligence breakthrough, supporting an unprecedented 10M token context window for full-repository code ingestion and multimodal book-length comprehension, incorporating an architecture of open-weights frontier neural architecture developed by Meta AI, featuring native 10M token window support, optimized reasoning chains, and low-latency inference throughput (15 tok/s). The model demonstrates competitive performance across verified evaluations, including Briefcase Elo: 0, AutomationBench: 0%, TerminalBench 4: 0%, Speed: 15 tok/s, Context Window: 10M. With its 10M Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by Meta AI, featuring native 10M token window support, optimized reasoning chains, and low-latency inference throughput (15 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Meta/llama-4-scout", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Meta/llama-4-scout")', 'Briefcase Elo: 0, AutomationBench: 0%, TerminalBench 4: 0%, Speed: 15 tok/s, Context Window: 10M', 'High memory requirements for local execution (10M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/llama-4-scout', '[{"text":"Llama 4 Scout on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/llama-4-scout"},{"text":"Llama 4 Scout Inference Providers","url":"https://artificialanalysis.ai/models/llama-4-scout/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('llama.cpp', 'Meta AI', 'Platform', 'MLOps', 'MIT', 2023, 'N/A', 'Pure C/C++ inference implementation for LLMs with GGUF quantization, enabling fast CPU and GPU execution across Mac Metal, Windows, and Linux. Its cloud and infrastructure runtime provides c++ core with GGML tensor library and low-precision integer quantization. Core platform telemetry and performance features include: Underpins Ollama, LM Studio, and local AI on Apple Silicon. Accessible under a MIT tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'C++ core with GGML tensor library and low-precision integer quantization.', './llama-cli -m models/llama-3.3-70b-instruct.Q4_K_M.gguf -p "Explain gravity" -n 128', 'Underpins Ollama, LM Studio, and local AI on Apple Silicon.', 'Manual command line configuration needed for advanced distributed setups.', 'https://github.com/ggerganov/llama.cpp', '[{"text":"llama.cpp GitHub","url":"https://github.com/ggerganov/llama.cpp"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LlamaIndex', 'LlamaIndex', 'Framework', 'MLOps', 'MIT', 2022, 'N/A', 'A data framework for LLM applications focused on ingesting, structuring, and accessing private or domain-specific data for RAG applications. Under the hood, it incorporates data connectors + indexing strategies + query engines for RAG pipelines. Key technical highlights include: Leading framework for RAG-based applications. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Data connectors + indexing strategies + query engines for RAG pipelines.', 'from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("What did the author do growing up?")', 'Leading framework for RAG-based applications', 'Can be complex for advanced configurations, performance depends on vector store choice.', 'https://www.llamaindex.ai/', '[{"text":"LlamaIndex Documentation","url":"https://docs.llamaindex.ai/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LLaVA', 'Microsoft', 'Model', 'Multimodal', 'Apache-2.0', 2023, '7B to 34B params', 'Large Language-and-Vision Assistant — an open-source multimodal model that combines a visual encoder with an LLM for general-purpose visual question answering, incorporating a CLIP visual encoder connected to a Vicuna/Mistral LLM via a linear projection layer architecture. The model demonstrates competitive performance across verified evaluations, including MMBench: 76.3% (LLaVA-1.6 34B), ScienceQA: 90.92%. With its 7B to 34B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'CLIP visual encoder connected to a Vicuna/Mistral LLM via a linear projection layer.', 'from transformers import LlavaNextProcessor, LlavaNextForConditionalGeneration
processor = LlavaNextProcessor.from_pretrained("llava-hf/llava-v1.6-mistral-7b-hf")
model = LlavaNextForConditionalGeneration.from_pretrained("llava-hf/llava-v1.6-mistral-7b-hf")', 'MMBench: 76.3% (LLaVA-1.6 34B), ScienceQA: 90.92%', 'Vision understanding still behind GPT-4V on complex visual tasks.', 'https://llava-vl.github.io/', '[{"text":"LLaVA Paper","url":"https://arxiv.org/abs/2304.08485"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LMSYS Chatbot Arena Conversations', 'LMSYS Org', 'Dataset', 'NLP', 'LMSYS Terms / Research', 2024, '1,000,000+ battles', 'Open dataset of over 1 million real-world pairwise prompt conversations and human preference votes collected from the LMSYS Chatbot Arena. The corpus spans 1,000,000+ battles of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Industry standard for calculating ELO ratings of frontier LLMs. Released under the LMSYS Terms / Research license for open evaluation and research reproducibility.', 'Crowdsourced human side-by-side preference votes with model identities revealed post-vote.', 'from datasets import load_dataset
ds = load_dataset("lmsys/chatbot_arena_conversations", split="train")', 'Industry standard for calculating ELO ratings of frontier LLMs.', 'Subject to prompt distribution biases of Arena visitors.', 'https://chat.lmsys.org', '[{"text":"LMSYS Chatbot Arena Paper","url":"https://arxiv.org/abs/2403.04132"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Lovable.dev', 'Lovable', 'AI', 'AI Coding', 'Proprietary', 2024, 'N/A', 'Full-stack autonomous AI web application builder that generates complete web apps, database schemas via Supabase, user auth, and deploys live in minutes. The application is powered by advanced foundation models utilizing full-stack AI code synthesizer with live Supabase database & GitHub synchronization. Key user-facing capabilities include Generates functional full-stack web applications with database persistence in under 3 minutes. Available under a Proprietary model for commercial and personal productivity.', 'Full-stack AI code synthesizer with live Supabase database & GitHub synchronization.', 'Go to lovable.dev, type your app idea (e.g. "Airbnb for pet boarding"), customize components interactively, and deploy live.', 'Generates functional full-stack web applications with database persistence in under 3 minutes.', 'Complex enterprise microservice architectures require manual code export and expansion.', 'https://lovable.dev', '[{"text":"Lovable.dev","url":"https://lovable.dev"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LTX-2.3-10Eros', 'Lightricks', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by 00000tt. Trending with 185 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 61, Community Likes: 185. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/00000tt/LTX-2.3-10Eros', 'Trending Score: 61, Community Likes: 185', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/00000tt/LTX-2.3-10Eros', '[{"text":"00000tt/LTX-2.3-10Eros on Hugging Face Spaces","url":"https://huggingface.co/spaces/00000tt/LTX-2.3-10Eros"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LTX-2.5', 'Lightricks', 'Model', 'Video Generation', 'OTHER', 2026, 'Open Weights', 'High-performance Video Generation open-weights model by Lightricks, trending with over 2,964 community likes and 1,526,928 downloads on Hugging Face, incorporating an architecture of lightricks image to video architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 342, Likes: 2,964, Downloads: 1,526,928. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the OTHER license.', 'Lightricks image to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Lightricks/LTX-2.5", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Lightricks/LTX-2.5")', 'Trending Score: 342, Likes: 2,964, Downloads: 1,526,928', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Lightricks/LTX-2.5', '[{"text":"Lightricks/LTX-2.5 on Hugging Face","url":"https://huggingface.co/Lightricks/LTX-2.5"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LTX-Video', 'Lightricks', 'Model', 'Video Generation', 'Apache-2.0', 2024, '2B params', 'Lightricks'' open real-time video foundation model capable of generating high-definition 24fps video in under 5 seconds on commercial GPUs, incorporating an architecture of spatial-temporal DiT with distilled multi-step rectified flow. The model demonstrates competitive performance across verified evaluations, including Generates 5-second video in ~4 seconds on a single NVIDIA A100. With its 2B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Spatial-temporal DiT with distilled multi-step rectified flow.', 'from diffusers import LTXPipeline
pipe = LTXPipeline.from_pretrained("Lightricks/LTX-Video", torch_dtype=torch.bfloat16)', 'Generates 5-second video in ~4 seconds on a single NVIDIA A100.', 'Lower maximum resolution (768x512) before upscaling.', 'https://github.com/Lightricks/LTX-Video', '[{"text":"LTX-Video Announcement","url":"https://www.lightricks.com/ltx-video"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Luma Dream Machine', 'Luma AI', 'AI', 'Video Generation', 'Proprietary', 2024, 'N/A', 'Luma AI''s fast and high-quality video generation model that creates realistic, physically accurate video clips from text prompts or still images. The application is powered by advanced foundation models utilizing web Application (Proprietary video diffusion model with physics-aware generation). It features an intuitive interface designed to streamline complex video generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Proprietary video diffusion model with physics-aware generation)', 'Visit lumalabs.ai/dream-machine to generate videos from text or image inputs.', 'N/A', 'Free tier has limited monthly generations; longer clips require paid credits.', 'https://lumalabs.ai/dream-machine', '[{"text":"Luma Dream Machine","url":"https://lumalabs.ai/dream-machine"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('lunara-art-eval', 'moonworks', 'Dataset', 'Computer Vision', 'APACHE-2.0', 2026, '1K<n<10K', 'Standardized artistic intelligence benchmark dataset by Moonworks, introduced in ''Moonworks Lunara: Modeling Artistic Intelligence'' (Wang et al., 2026). Featuring 8,000 challenging generation prompts with paired human aesthetic preference scores, composition breakdowns, and color harmony annotations, it rigorously assesses visual coherence and creative nuance in text-to-image models.', 'Multi-dimensional evaluation dataset with paired high-resolution reference images, expert aesthetic ratings, and KaTeX prompt rubrics.', 'from datasets import load_dataset

dataset = load_dataset("moonworks/lunara-art-eval")', '8,000 expert-annotated artistic prompts; established standard for diffusion aesthetic evaluation.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/moonworks/lunara-art-eval', '[{"url":"https://huggingface.co/datasets/moonworks/lunara-art-eval","text":"moonworks/lunara-art-eval on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MATH-500', 'OpenAI', 'Dataset', 'Research', 'MIT', 2024, '500 competition problems', 'Standardized 500-problem evaluation benchmark subset of the original MATH competition dataset used to measure multi-step mathematical reasoning in frontier models. The corpus spans 500 competition problems of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Primary benchmark for OpenAI o1, o3-mini, and DeepSeek-R1 reasoning comparisons. Released under the MIT license for open evaluation and research reproducibility.', 'Challenging math competition problems spanning algebra, geometry, number theory, and calculus.', 'from datasets import load_dataset
ds = load_dataset("HuggingFaceH4/MATH-500", split="test")', 'Primary benchmark for OpenAI o1, o3-mini, and DeepSeek-R1 reasoning comparisons.', 'Static problem set creates potential risk of training data contamination over time.', 'https://huggingface.co/datasets/HuggingFaceH4/MATH-500', '[{"text":"MATH Benchmark Paper","url":"https://arxiv.org/abs/2103.03874"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MathVista', 'UCLA & UW', 'Dataset', 'Research', 'CC-BY-SA-4.0', 2023, '6,141 Multimodal Reasoning Tasks', 'Pioneering multimodal mathematical reasoning benchmark compiled by UCLA, University of Washington, and Microsoft, comprising 6,141 diverse tasks requiring fine-grained visual understanding and math logic. The corpus spans 6,141 Multimodal Reasoning Tasks of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Standard evaluation benchmark for GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and open VLMs assessing visual chart, geometry, and arithmetic reasoning. Released under the CC-BY-SA-4.0 license for open evaluation and research reproducibility.', 'Structured multimodal benchmark aggregating 28 existing mathematical datasets alongside 3 newly created visual challenge subsets.', 'from datasets import load_dataset
ds = load_dataset("AI4Math/MathVista", split="testmini")
print(ds[0]["question"], ds[0]["image"])', 'Standard evaluation benchmark for GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and open VLMs assessing visual chart, geometry, and arithmetic reasoning.', 'Testmini split contains 1,000 problems, while full test set contains 5,141; evaluation requires OCR robustness and spatial diagram awareness.', 'https://mathvista.github.io', '[{"text":"MathVista Project Page & Leaderboard","url":"https://mathvista.github.io"},{"text":"MathVista Dataset on Hugging Face","url":"https://huggingface.co/datasets/AI4Math/MathVista"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Meta AI', 'Meta AI', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Meta''s smart assistant integrated into WhatsApp, Instagram, Facebook, and Messenger, capable of answering questions and generating images. The application is powered by advanced foundation models utilizing chatbot Integration (Powered by Llama 3 models). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Chatbot Integration (Powered by Llama 3 models)', 'Use it directly inside Meta''s messaging apps or at meta.ai.', 'N/A', 'Feature availability varies by country and platform.', 'https://www.meta.ai', '[{"text":"Meta AI Announcement","url":"https://about.fb.com/news/2023/09/introducing-ai-experiences-across-our-family-of-apps-and-devices/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('microduck-arena', 'pollen-robotics', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive robotics simulation and teleoperation arena hosted on Hugging Face Spaces by Pollen Robotics. It allows roboticists and AI researchers to test, visualize, and benchmark vision-language-action (VLA) navigation policies and bimanual manipulation algorithms in an interactive 3D physics sandbox directly within the browser.', 'Three.js and WebAssembly-based physics engine integrated with cloud VLA policy inference endpoints.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/pollen-robotics/microduck-arena', '60fps real-time physics rendering; benchmarks robotic grasping, obstacle avoidance, and tool handling.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/pollen-robotics/microduck-arena', '[{"url":"https://huggingface.co/spaces/pollen-robotics/microduck-arena","text":"pollen-robotics/microduck-arena on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('microduck-simulator', 'pollen-robotics', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by pollen-robotics. Trending with 435 community stars. Its cloud and infrastructure runtime provides dOCKER cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 225, Community Likes: 435. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/pollen-robotics/microduck-simulator', 'Trending Score: 225, Community Likes: 435', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/pollen-robotics/microduck-simulator', '[{"text":"pollen-robotics/microduck-simulator on Hugging Face Spaces","url":"https://huggingface.co/spaces/pollen-robotics/microduck-simulator"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Microsoft Copilot', 'Microsoft', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Microsoft''s AI assistant (formerly Bing Chat), integrated with Windows and Microsoft 365, combining GPT-4 with real-time web search. The application is powered by advanced foundation models utilizing web Application / OS Integration (Powered by GPT-4 and Bing Search). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / OS Integration (Powered by GPT-4 and Bing Search)', 'Visit copilot.microsoft.com or use it directly in Windows 11 / Edge.', 'N/A', 'Can be slow during peak times, responses are sometimes limited in length.', 'https://copilot.microsoft.com', '[{"text":"Copilot Announcement","url":"https://blogs.microsoft.com/blog/2023/09/21/announcing-microsoft-copilot-your-everyday-ai-companion/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Midjourney', 'Midjourney', 'AI', 'Image Generation', 'Proprietary', 2022, 'N/A', 'An AI image generation service known for producing highly artistic and aesthetically striking images from text prompts, operated via Discord. The application is powered by advanced foundation models utilizing web Application / Discord Bot (Proprietary diffusion model). It features an intuitive interface designed to streamline complex image generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Discord Bot (Proprietary diffusion model)', 'Join the Midjourney Discord server at discord.gg/midjourney and use /imagine commands.', 'N/A', 'Requires a paid subscription; primarily Discord-based; limited control over prompt precision.', 'https://www.midjourney.com', '[{"text":"Midjourney","url":"https://www.midjourney.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Midjourney (Platform)', 'Midjourney', 'Platform', 'Computer Vision', 'Proprietary', 2022, 'N/A', 'The leading AI image generation platform accessed via Discord and a web interface, powering the most widely used consumer AI art tool. Its cloud and infrastructure runtime provides proprietary diffusion model served via Discord bot and web UI. Built for enterprise scalability and reliability, it offers high-throughput API endpoints, automated workflows, and robust developer integrations. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Proprietary diffusion model served via Discord bot and web UI.', '# Access via Discord or https://www.midjourney.com/
/imagine prompt: Photograph of a cat wearing a spacesuit on the moon, cinematic lighting --v 6.1 --ar 16:9', 'N/A — subjective quality, widely regarded as leader for artistic output', 'No official API, paid subscription, all generations are public on free tier.', 'https://www.midjourney.com/', '[{"text":"Midjourney Website","url":"https://www.midjourney.com/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Midjourney v6', 'Midjourney', 'Model', 'Computer Vision', 'Proprietary', 2023, 'Unknown', 'A highly advanced text-to-image AI capable of generating photorealistic imagery, complex compositions, and readable text within images, incorporating an architecture of latent diffusion model. It is purpose-engineered for computer vision workflows with operational considerations including: No official API, requires Discord/web interface, paid subscription only. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern computer vision ecosystem.', 'Latent diffusion model.', '# Midjourney does not offer an official public API.
# Usage is primarily through their Discord bot or web interface.
/imagine prompt: A futuristic cyberpunk city in the rain, highly detailed --v 6.0', 'N/A (Subjective visual quality leader)', 'No official API, requires Discord/web interface, paid subscription only.', 'https://www.midjourney.com/', '[{"text":"Midjourney Alpha","url":"https://www.midjourney.com/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-RL-Envs-Explorer', 'Xiaomi (MiMo)', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by FineEnvs. Trending with 64 community stars. Its cloud and infrastructure runtime provides dOCKER cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 63, Community Likes: 64. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/FineEnvs/MiMo-RL-Envs-Explorer', 'Trending Score: 63, Community Likes: 64', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/FineEnvs/MiMo-RL-Envs-Explorer', '[{"text":"FineEnvs/MiMo-RL-Envs-Explorer on Hugging Face Spaces","url":"https://huggingface.co/spaces/FineEnvs/MiMo-RL-Envs-Explorer"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-V2.6-Distill-Qwen-9B', 'Xiaomi (MiMo)', 'Model', 'Multimodal', 'MIT', 2026, '9B params', 'High-performance Multimodal open-weights model by XiaomiMiMo, trending with over 524 community likes and 8,839 downloads on Hugging Face, incorporating an architecture of xiaomiMiMo image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 513, Likes: 524, Downloads: 8,839. With its 9B params design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'XiaomiMiMo image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B")', 'Trending Score: 513, Likes: 524, Downloads: 8,839', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B', '[{"text":"XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B on Hugging Face","url":"https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-V2.6-Pro', 'Xiaomi (MiMo)', 'Model', 'NLP', 'Open', 2026, '1M Context · Open Model', 'Xiaomi''s flagship reasoning and reinforcement learning architecture, specialized in consumer robotics, multi-modal sensor fusion, and on-device intelligent assistance across 1M tokens, incorporating an architecture of open-weights frontier neural architecture developed by Xiaomi (MiMo), featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (49 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 30, Briefcase Elo: 1512, Accuracy: 35%, Non-Hallucination: 40%, FrontierCode: 24%, AutomationBench: 59%, TerminalBench 4: 35%, HLE Diamond: 15%, Speed: 49 tok/s, Context Window: 1M. With its 1M Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by Xiaomi (MiMo), featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (49 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Xiaomi/mimo-v2-6-pro", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Xiaomi/mimo-v2-6-pro")', 'Intelligence Index: 30, Briefcase Elo: 1512, Accuracy: 35%, Non-Hallucination: 40%, FrontierCode: 24%, AutomationBench: 59%, TerminalBench 4: 35%, HLE Diamond: 15%, Speed: 49 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/mimo-v2-6-pro', '[{"text":"MiMo-V2.6-Pro on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/mimo-v2-6-pro"},{"text":"MiMo-V2.6-Pro Inference Providers","url":"https://artificialanalysis.ai/models/mimo-v2-6-pro/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-V2.6-Pro-RL', 'Xiaomi (MiMo)', 'Model', 'NLP', 'MIT', 2026, 'Open Weights', 'High-performance NLP open-weights model by XiaomiMiMo, trending with over 530 community likes and 74,497 downloads on Hugging Face, incorporating an architecture of xiaomiMiMo text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 519, Likes: 530, Downloads: 74,497. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the MIT license.', 'XiaomiMiMo text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("XiaomiMiMo/MiMo-V2.6-Pro-RL", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("XiaomiMiMo/MiMo-V2.6-Pro-RL")', 'Trending Score: 519, Likes: 530, Downloads: 74,497', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL', '[{"text":"XiaomiMiMo/MiMo-V2.6-Pro-RL on Hugging Face","url":"https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiMo-V2.6-RL-oss', 'Xiaomi (MiMo)', 'Dataset', 'Computer Vision', 'APACHE-2.0', 2026, '1K<n<10K', 'Agentic RL Environments RL training environments for LLM agents. Domain Task Family Verifier Code Software engineering Executable tests Cyber Vulnerability re (324 likes, 973 downloads). The corpus spans 1K<n<10K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 320, Likes: 324, Downloads: 973. Released under the Apache-2.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("XiaomiMiMo/MiMo-V2.6-RL-oss")', 'Trending Score: 320, Likes: 324, Downloads: 973', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/XiaomiMiMo/MiMo-V2.6-RL-oss', '[{"text":"XiaomiMiMo/MiMo-V2.6-RL-oss on Hugging Face Datasets","url":"https://huggingface.co/datasets/XiaomiMiMo/MiMo-V2.6-RL-oss"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM-V-4.7-1B', 'openbmb', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '1B params', 'OpenBMB''s ultra-compact 1B parameter vision-language model engineered for real-time edge AI, mobile devices, and embedded robotics. Despite its tiny size, it delivers remarkable optical character recognition, multi-image analysis, and chart interpretation, rivaling models ten times its parameter count while running entirely locally on phones.', 'High-efficiency 1B vision-language model combining SigLIP vision encoder with compact autoregressive language backbone.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("openbmb/MiniCPM-V-4.7-1B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("openbmb/MiniCPM-V-4.7-1B")', 'DocVQA: 84.1%, InfoVQA: 68.9%, runs at 45 tokens/sec on Qualcomm Snapdragon 8 Gen 3.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/openbmb/MiniCPM-V-4.7-1B', '[{"url":"https://huggingface.co/openbmb/MiniCPM-V-4.7-1B","text":"openbmb/MiniCPM-V-4.7-1B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM-V-4.7-35B-A3B', 'OpenBMB', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '35B params', 'High-performance Multimodal open-weights model by openbmb, trending with over 473 community likes and 630 downloads on Hugging Face, incorporating an architecture of openbmb image text to text architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 428, Likes: 473, Downloads: 630. With its 35B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'openbmb image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("openbmb/MiniCPM-V-4.7-35B-A3B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("openbmb/MiniCPM-V-4.7-35B-A3B")', 'Trending Score: 428, Likes: 473, Downloads: 630', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B', '[{"text":"openbmb/MiniCPM-V-4.7-35B-A3B on Hugging Face","url":"https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM-V-4.7-35B-A3B-gguf', 'openbmb', 'Model', 'Multimodal', 'APACHE-2.0', 2026, '35B params', 'OpenBMB''s quantized 35B Mixture-of-Experts vision-language model activating 3B parameters per token, packaged in GGUF format for local execution. It delivers flagship-grade multimodal perception, OCR, and complex document understanding on consumer GPUs with 16GB+ VRAM.', 'Sparse Mixture-of-Experts vision-language model quantized to 4-bit/8-bit GGUF with SigLIP visual embeddings.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("openbmb/MiniCPM-V-4.7-35B-A3B-gguf", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("openbmb/MiniCPM-V-4.7-35B-A3B-gguf")', 'DocVQA: 89.2%, MathVista: 64.8%, runs at 28 tokens/sec on single RTX 4080.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B-gguf', '[{"url":"https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B-gguf","text":"openbmb/MiniCPM-V-4.7-35B-A3B-gguf on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM-V-4.7-Demo', 'openbmb', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Live interactive evaluation suite on Hugging Face Spaces for OpenBMB''s MiniCPM-V 4.7. Enables users and developers to test multi-image visual question answering, high-resolution document OCR, chart analysis, and real-time video understanding directly in their web browser.', 'Gradio web application connected to OpenBMB cloud inference nodes running MiniCPM-V 4.7 in FP16 precision.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/openbmb/MiniCPM-V-4.7-Demo', 'Sub-second visual response previews; supports up to 10 simultaneous high-resolution image uploads.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/openbmb/MiniCPM-V-4.7-Demo', '[{"url":"https://huggingface.co/spaces/openbmb/MiniCPM-V-4.7-Demo","text":"openbmb/MiniCPM-V-4.7-Demo on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM5-2B', 'OpenBMB', 'Model', 'NLP', 'APACHE-2.0', 2026, '2B params', 'High-performance NLP open-weights model by openbmb, trending with over 690 community likes and 2,879 downloads on Hugging Face, incorporating an architecture of openbmb text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 568, Likes: 690, Downloads: 2,879. With its 2B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'openbmb text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("openbmb/MiniCPM5-2B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("openbmb/MiniCPM5-2B")', 'Trending Score: 568, Likes: 690, Downloads: 2,879', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/openbmb/MiniCPM5-2B', '[{"text":"openbmb/MiniCPM5-2B on Hugging Face","url":"https://huggingface.co/openbmb/MiniCPM5-2B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniCPM5-2B-WebGPU-Pi', 'OpenBMB', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by victor. Trending with 69 community stars. Its cloud and infrastructure runtime provides sTATIC cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 67, Community Likes: 69. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/victor/MiniCPM5-2B-WebGPU-Pi', 'Trending Score: 67, Community Likes: 69', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/victor/MiniCPM5-2B-WebGPU-Pi', '[{"text":"victor/MiniCPM5-2B-WebGPU-Pi on Hugging Face Spaces","url":"https://huggingface.co/spaces/victor/MiniCPM5-2B-WebGPU-Pi"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Minimax-H3', 'stablediffusiontutorials', 'Dataset', 'NLP', 'MIT', 2026, 'Curated Dataset', 'Install Minimax H3 in ComfyUI (NVFP4/BF16/FP8/GGUF): https://www.stablediffusiontutorials.com/2026/08/minimax-h3.html (29 likes, 479 downloads). The corpus spans Curated Dataset of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 29, Likes: 29, Downloads: 479. Released under the MIT license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("stablediffusiontutorials/Minimax-H3")', 'Trending Score: 29, Likes: 29, Downloads: 479', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/stablediffusiontutorials/Minimax-H3', '[{"text":"stablediffusiontutorials/Minimax-H3 on Hugging Face Datasets","url":"https://huggingface.co/datasets/stablediffusiontutorials/Minimax-H3"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('minimax-h3-360-orbit', 'pablodawson', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive video generation demonstration web application hosted on Hugging Face Spaces by Pablo Dawson, powered by MiniMax H3. It allows creators to produce seamless 360-degree orbital camera sweeps, drone flythroughs, and dynamic viewpoint rotations around central visual subjects from single reference images and descriptive text prompts.', 'Spatio-temporal video diffusion architecture with explicit camera trajectory conditioning and 360-degree orbital motion priors.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/pablodawson/minimax-h3-360-orbit', 'Produces 720p 60fps orbital video loops with sub-pixel 3D camera consistency in under 18 seconds.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/pablodawson/minimax-h3-360-orbit', '[{"url":"https://huggingface.co/spaces/pablodawson/minimax-h3-360-orbit","text":"pablodawson/minimax-h3-360-orbit on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniMax-H3-360-Orbit-LoRA', 'pablodawson', 'Model', 'Multimodal', 'OTHER', 2026, 'Open Weights', 'Pablo Dawson''s low-rank adaptation (LoRA) checkpoint for MiniMax H3, fine-tuned specifically for generating cinematic 360-degree camera orbits, smooth drone sweeps, and continuous rotational trajectories. Ideal for product visualizers, architectural walkthroughs, and cinematic visual effects previs pipelines where perspective consistency and camera stability are paramount.', 'Low-Rank Adaptation (LoRA) weights targeting attention layers of MiniMax H3 spatio-temporal video diffusion models.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("pablodawson/MiniMax-H3-360-Orbit-LoRA", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("pablodawson/MiniMax-H3-360-Orbit-LoRA")', 'Zero camera jitter across 180-frame orbital sequences; seamless loop generation.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/pablodawson/MiniMax-H3-360-Orbit-LoRA', '[{"url":"https://huggingface.co/pablodawson/MiniMax-H3-360-Orbit-LoRA","text":"pablodawson/MiniMax-H3-360-Orbit-LoRA on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('minimax-h3-character-swap-lora', 'MiniMax', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by hugging-apps. Trending with 103 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 46, Community Likes: 103. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/hugging-apps/minimax-h3-character-swap-lora', 'Trending Score: 46, Community Likes: 103', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/hugging-apps/minimax-h3-character-swap-lora', '[{"text":"hugging-apps/minimax-h3-character-swap-lora on Hugging Face Spaces","url":"https://huggingface.co/spaces/hugging-apps/minimax-h3-character-swap-lora"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniMax-H3-Turbo-Lora', 'MiniMaxAI', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by MiniMaxAI. Trending with 401 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 65, Community Likes: 401. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/MiniMaxAI/MiniMax-H3-Turbo-Lora', 'Trending Score: 65, Community Likes: 401', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/MiniMaxAI/MiniMax-H3-Turbo-Lora', '[{"text":"MiniMaxAI/MiniMax-H3-Turbo-Lora on Hugging Face Spaces","url":"https://huggingface.co/spaces/MiniMaxAI/MiniMax-H3-Turbo-Lora"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniMax-H3-Turbo-Lora-UNCENSORED', 'Pepe104', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by Pepe104. Trending with 128 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 49, Community Likes: 128. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/Pepe104/MiniMax-H3-Turbo-Lora-UNCENSORED', 'Trending Score: 49, Community Likes: 128', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/Pepe104/MiniMax-H3-Turbo-Lora-UNCENSORED', '[{"text":"Pepe104/MiniMax-H3-Turbo-Lora-UNCENSORED on Hugging Face Spaces","url":"https://huggingface.co/spaces/Pepe104/MiniMax-H3-Turbo-Lora-UNCENSORED"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniMax-H3-Turbo-Lora-UNCENSORED-Workflow', 'glitchlab', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Glitchlab''s ComfyUI cloud container workflow demonstrating MiniMax H3 Turbo with uncensored prompt adherence and specialized motion LoRAs. Allows creators to generate cinematic high-definition video clips with complete artistic freedom, dynamic lighting, and fine-grained camera control.', 'Containerized ComfyUI workflow environment integrating MiniMax H3 Turbo checkpoint weights and custom LoRA loaders.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/glitchlab/MiniMax-H3-Turbo-Lora-UNCENSORED-Workflow', 'Renders 5-second 1080p video sequences in under 45 seconds on NVIDIA A100.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/glitchlab/MiniMax-H3-Turbo-Lora-UNCENSORED-Workflow', '[{"url":"https://huggingface.co/spaces/glitchlab/MiniMax-H3-Turbo-Lora-UNCENSORED-Workflow","text":"glitchlab/MiniMax-H3-Turbo-Lora-UNCENSORED-Workflow on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MiniMax-M3.1-Flash', 'MiniMax', 'Model', 'NLP', 'Open', 2026, '1M Context · Open Model', 'MiniMax''s high-efficiency MoE language model, delivering lightning-fast token generation, long-form conversational nuance, and robust tool-calling across 1M tokens, incorporating an architecture of open-weights frontier neural architecture developed by MiniMax, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (119 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 29, Briefcase Elo: 1475, Accuracy: 45%, Non-Hallucination: 6%, FrontierCode: 21%, AutomationBench: 73%, TerminalBench 4: 26%, HLE Diamond: 28%, Speed: 119 tok/s, Context Window: 1M. With its 1M Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by MiniMax, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (119 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("MiniMax/minimax-m3-1-flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("MiniMax/minimax-m3-1-flash")', 'Intelligence Index: 29, Briefcase Elo: 1475, Accuracy: 45%, Non-Hallucination: 6%, FrontierCode: 21%, AutomationBench: 73%, TerminalBench 4: 26%, HLE Diamond: 28%, Speed: 119 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/minimax-m3-1-flash', '[{"text":"MiniMax-M3.1-Flash on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/minimax-m3-1-flash"},{"text":"MiniMax-M3.1-Flash Inference Providers","url":"https://artificialanalysis.ai/models/minimax-m3-1-flash/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral 7B', 'Mistral AI', 'Model', 'NLP', 'Apache-2.0', 2023, '7B params', 'A highly efficient 7B parameter open-source model that outperforms Llama 2 13B on most benchmarks using sliding window attention and grouped query attention, incorporating an architecture of transformer decoder with sliding window attention (SWA) and grouped query attention (GQA). The model demonstrates competitive performance across verified evaluations, including MMLU: 60.1%, outperforms Llama 2 13B on most tasks. With its 7B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Transformer decoder with sliding window attention (SWA) and grouped query attention (GQA).', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2")', 'MMLU: 60.1%, outperforms Llama 2 13B on most tasks', 'Smaller size limits complex reasoning, no native multimodal support.', 'https://mistral.ai/', '[{"text":"Mistral 7B Paper","url":"https://arxiv.org/abs/2310.06825"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral Large', 'Mistral AI', 'Model', 'NLP', 'Proprietary', 2024, 'Unknown', 'Mistral AI''s flagship proprietary model, competitive with GPT-4 on reasoning, coding, and multilingual tasks, incorporating an architecture of large-scale transformer with advanced instruction tuning. The model demonstrates competitive performance across verified evaluations, including MMLU: 81.2%, MATH: 45.0%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Large-scale transformer with advanced instruction tuning.', 'from mistralai.client import MistralClient
client = MistralClient(api_key="YOUR_API_KEY")
response = client.chat(
  model="mistral-large-latest",
  messages=[{"role": "user", "content": "Explain quantum entanglement."}]
)', 'MMLU: 81.2%, MATH: 45.0%', 'Proprietary API, pay-per-use pricing.', 'https://mistral.ai/news/mistral-large/', '[{"text":"Mistral Large Announcement","url":"https://mistral.ai/news/mistral-large/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral Large 2 (123B)', 'Mistral AI', 'Model', 'NLP', 'Mistral Research License / Commercial', 2024, '123B params', 'Mistral AI''s 123-billion parameter flagship model with 128k context window, advanced multilingual fluency in 80+ languages, and top code generation, incorporating an architecture of dense Transformer with 128k context window and enhanced function calling. The model demonstrates competitive performance across verified evaluations, including MMLU: 84.0%, HumanEval: 92.0%, GSM8K: 91.2%. With its 123B params design, it supports diverse local and enterprise deployment profiles under the Mistral Research License / Commercial license.', 'Dense Transformer with 128k context window and enhanced function calling.', 'from mistralai import Mistral
client = Mistral(api_key="API_KEY")
response = client.chat.complete(
  model="mistral-large-latest",
  messages=[{"role": "user", "content": "Analyze economic trends."}]
)', 'MMLU: 84.0%, HumanEval: 92.0%, GSM8K: 91.2%', 'Commercial weights require paid enterprise license.', 'https://mistral.ai/news/mistral-large-2407/', '[{"text":"Mistral Large 2 Announcement","url":"https://mistral.ai/news/mistral-large-2407/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral Large 4 (high)', 'Mistral AI', 'Model', 'NLP', 'Open', 2026, '1M Context · Open Model', 'High reasoning effort checkpoint of Mistral AI''s fourth-generation commercial flagship, delivering premier European multilingual reasoning and Fill-in-the-Middle code intelligence, incorporating an architecture of open-weights frontier neural architecture developed by Mistral AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (161 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 26, Briefcase Elo: 1350, Accuracy: 26%, Non-Hallucination: 72%, FrontierCode: 15%, AutomationBench: 58%, TerminalBench 4: 25%, HLE Diamond: 17%, Speed: 161 tok/s, Context Window: 1M. With its 1M Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by Mistral AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (161 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Mistral/mistral-large-4-high", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Mistral/mistral-large-4-high")', 'Intelligence Index: 26, Briefcase Elo: 1350, Accuracy: 26%, Non-Hallucination: 72%, FrontierCode: 15%, AutomationBench: 58%, TerminalBench 4: 25%, HLE Diamond: 17%, Speed: 161 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/mistral-large-4', '[{"text":"Mistral Large 4 (high) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/mistral-large-4"},{"text":"Mistral Large 4 (high) Inference Providers","url":"https://artificialanalysis.ai/models/mistral-large-4/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mistral Le Chat', 'Mistral AI', 'AI', 'NLP', 'Proprietary', 2024, 'N/A', 'A fast and capable conversational AI assistant by Mistral AI, built on their own open-weight models with a focus on efficiency. The application is powered by advanced foundation models utilizing web Application / Conversational Agent (Powered by Mistral Large / Mistral Small). It features an intuitive interface designed to streamline complex nlp workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application / Conversational Agent (Powered by Mistral Large / Mistral Small)', 'Visit chat.mistral.ai to interact via the web interface.', 'N/A', 'Smaller ecosystem compared to OpenAI or Google; some advanced features require a paid plan.', 'https://chat.mistral.ai', '[{"text":"Mistral Le Chat","url":"https://chat.mistral.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mixtral 8x7B', 'Mistral AI', 'Model', 'NLP', 'Apache-2.0', 2023, '46.7B total params (12.9B active)', 'Mistral AI''s sparse mixture-of-experts model that uses 8 expert networks but only activates 2 per token, delivering 70B-class performance at lower inference cost, incorporating an architecture of sparse Mixture-of-Experts (SMoE) with 8 expert FFN layers, activating 2 per token. The model demonstrates competitive performance across verified evaluations, including MMLU: 70.6%, HumanEval: 40.2%. With its 46.7B total params (12.9B active) design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Sparse Mixture-of-Experts (SMoE) with 8 expert FFN layers, activating 2 per token.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("mistralai/Mixtral-8x7B-Instruct-v0.1")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mixtral-8x7B-Instruct-v0.1")', 'MMLU: 70.6%, HumanEval: 40.2%', 'Large total parameter count, complex deployment for MoE routing.', 'https://mistral.ai/', '[{"text":"Mixtral of Experts Paper","url":"https://arxiv.org/abs/2401.04088"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MMBench', 'OpenDataLab', 'Dataset', 'Multimodal', 'CC-BY-4.0', 2023, '3,000 Questions · 20 Capability Dimensions', 'Comprehensive bilingual vision-language benchmark developed by OpenDataLab, evaluating perception and reasoning across 20 distinct ability dimensions using CircularEval to neutralize position bias. The corpus spans 3,000 Questions · 20 Capability Dimensions of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Standard benchmark on OpenCompass VLM leaderboard assessing object localization, attribute recognition, OCR, social relation, and visual logic. Released under the CC-BY-4.0 license for open evaluation and research reproducibility.', 'Bilingual (English and Chinese) hierarchical evaluation dataset with CircularEval evaluation methodology testing option shuffling stability.', 'from datasets import load_dataset
ds = load_dataset("opencompass/MMBench", "en", split="test")
print(ds[0]["question"], ds[0]["category"])', 'Standard benchmark on OpenCompass VLM leaderboard assessing object localization, attribute recognition, OCR, social relation, and visual logic.', 'Multiple-choice evaluation format does not directly measure open-ended conversational fluency or multi-turn agent interaction.', 'https://mmbench.opencompass.org.cn', '[{"text":"MMBench Official Platform & Leaderboard","url":"https://mmbench.opencompass.org.cn"},{"text":"MMBench on Hugging Face Datasets","url":"https://huggingface.co/datasets/opencompass/MMBench"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MMLU', 'UC Berkeley (BAIR)', 'Dataset', 'NLP', 'MIT', 2020, '15,908 questions across 57 subjects', 'Massive Multitask Language Understanding — a benchmark covering 57 subjects from STEM to humanities, used to evaluate the knowledge and reasoning of LLMs. The corpus spans 15,908 questions across 57 subjects of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Human expert baseline: ~89.8%. GPT-4: 86.4%, Claude 3 Opus: 86.8%. Released under the MIT license for open evaluation and research reproducibility.', 'Four-choice multiple-choice questions at varying difficulty levels from elementary to professional.', 'from datasets import load_dataset
dataset = load_dataset("cais/mmlu", "all")
print(dataset[''test''][0])', 'Human expert baseline: ~89.8%. GPT-4: 86.4%, Claude 3 Opus: 86.8%', 'Multiple-choice format doesn''t capture open-ended generation ability.', 'https://github.com/hendrycks/test', '[{"text":"Hendrycks et al. (2020) - MMLU Paper","url":"https://arxiv.org/abs/2009.03300"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MMLU-Pro', 'TIGER-Lab', 'Dataset', 'NLP', 'MIT', 2026, '10K<n<100K', 'MMLU-Pro Dataset MMLU-Pro dataset is a more robust and challenging massive multi-task understanding dataset tailored to more rigorously benchmark large language model (570 likes, 226,194 downloads). The corpus spans 10K<n<100K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 30, Likes: 570, Downloads: 226,194. Released under the MIT license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("TIGER-Lab/MMLU-Pro")', 'Trending Score: 30, Likes: 570, Downloads: 226,194', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro', '[{"text":"TIGER-Lab/MMLU-Pro on Hugging Face Datasets","url":"https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Mochi 1', 'Genmo', 'Model', 'Video Generation', 'Apache-2.0', 2024, '10B params', 'Genmo''s open-weights 10B diffusion model for fluid, high-fidelity 480p video generation at 30fps with state-of-the-art prompt motion fidelity, incorporating an architecture of asymmetric Diffusion Transformer (AsymmDiT) with continuous-time flow matching. The model demonstrates competitive performance across verified evaluations, including High human preference score for prompt adherence in open text-to-video. With its 10B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Asymmetric Diffusion Transformer (AsymmDiT) with continuous-time flow matching.', 'from diffusers import MochiPipeline
pipe = MochiPipeline.from_pretrained("genmo/mochi-1-preview", torch_dtype=torch.bfloat16)', 'High human preference score for prompt adherence in open text-to-video.', 'Requires 4x H100 or aggressive quantization for multi-second rendering.', 'https://github.com/genmoai/models', '[{"text":"Mochi 1 Preview","url":"https://www.genmo.ai/blog/mochi-1"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Modal', 'Modal Labs', 'Platform', 'MLOps', 'Proprietary', 2024, 'Elastic GPU cloud', 'Serverless cloud compute platform designed for running GPU-accelerated Python containers, AI microservices, fine-tuning, and inference in seconds. Its cloud and infrastructure runtime provides containerized serverless runtime with cold starts under 2 seconds. Core platform telemetry and performance features include: Industry-leading cold start latency for containerized PyTorch and vLLM workloads. Accessible under a Proprietary tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'Containerized serverless runtime with cold starts under 2 seconds.', 'import modal
app = modal.App("fast-inference")
@app.function(gpu="A100")
def generate():
    return "Generated from serverless GPU"', 'Industry-leading cold start latency for containerized PyTorch and vLLM workloads.', 'Requires Python-centric infrastructure design.', 'https://modal.com', '[{"text":"Modal Documentation","url":"https://modal.com/docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('model-pulse', 'tardellirs', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by tardellirs. Trending with 101 community stars. Its cloud and infrastructure runtime provides sTATIC cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 89, Community Likes: 101. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/tardellirs/model-pulse', 'Trending Score: 89, Community Likes: 101', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/tardellirs/model-pulse', '[{"text":"tardellirs/model-pulse on Hugging Face Spaces","url":"https://huggingface.co/spaces/tardellirs/model-pulse"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MOSS-Image', 'OpenMOSS-Team', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Comprehensive open-source visual generation and image editing studio by Fudan University''s OpenMOSS team. Featuring a full-fledged web interface for text-guided image synthesis, precise inpainting, background outpainting, and multi-concept composition with native support for academic research and local deployment.', 'Modular web studio application powered by the MOSS-Image diffusion foundation backbone and PyTorch/Gradio pipeline.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/OpenMOSS-Team/MOSS-Image', 'Supports 8-step fast inference with DMD; provides 1024x1024 generation with high aesthetic alignment.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/OpenMOSS-Team/MOSS-Image', '[{"url":"https://huggingface.co/spaces/OpenMOSS-Team/MOSS-Image","text":"OpenMOSS-Team/MOSS-Image on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MOSS-Image-Base', 'OpenMOSS-Team', 'Model', 'Image Generation', 'APACHE-2.0', 2026, 'Open Weights', 'Open-source foundational text-to-image base model released by Fudan University''s OpenMOSS team. Serving as an open research platform for generative vision, it provides clean pre-trained weights for academic fine-tuning, LoRA personalization, and domain-specific diffusion adaptations.', 'Pre-trained Diffusion Transformer (DiT) backbone trained on filtered multimodal web datasets with open weight checkpoints.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("OpenMOSS-Team/MOSS-Image-Base", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("OpenMOSS-Team/MOSS-Image-Base")', 'Clean baseline FID: 7.8 on COCO 2014; provides unconditioned and text-conditioned generative priors.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base', '[{"url":"https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base","text":"OpenMOSS-Team/MOSS-Image-Base on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MOSS-Image-SFT', 'OpenMOSS-Team', 'Model', 'Image Generation', 'APACHE-2.0', 2026, 'Open Weights', 'Supervised fine-tuned (SFT) text-to-image foundation model by Fudan University''s OpenMOSS team. Optimized with extensive human aesthetic feedback and multi-turn instruction tuning, it generates striking photorealistic portraits, complex landscape compositions, and stylized artistic illustrations with high prompt fidelity.', 'Supervised fine-tuned Diffusion Transformer (DiT) with cross-attention text conditioners and high-resolution VAE decoders.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("OpenMOSS-Team/MOSS-Image-SFT", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("OpenMOSS-Team/MOSS-Image-SFT")', 'Human preference win-rate: 68.4% against standard SDXL baselines; excellent spatial prompt comprehension.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT', '[{"url":"https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT","text":"OpenMOSS-Team/MOSS-Image-SFT on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MOSS-Image-SFT-8-steps-dmd', 'lodestones', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'Lodestones'' 8-step Distribution Matching Distillation (DMD) variant of Fudan University''s MOSS-Image model. By compressing diffusion trajectory steps from 50 down to just 8, it achieves near-instantaneous high-resolution image synthesis with negligible degradation in aesthetic appeal and prompt accuracy.', 'Distilled Diffusion Transformer utilizing Distribution Matching Distillation (DMD) for fast 8-step sampling.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("lodestones/MOSS-Image-SFT-8-steps-dmd", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("lodestones/MOSS-Image-SFT-8-steps-dmd")', 'Generates 1024x1024 photorealistic images in 420ms on RTX 4090 with FID: 8.2.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/lodestones/MOSS-Image-SFT-8-steps-dmd', '[{"url":"https://huggingface.co/lodestones/MOSS-Image-SFT-8-steps-dmd","text":"lodestones/MOSS-Image-SFT-8-steps-dmd on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MS COCO', 'Microsoft', 'Dataset', 'Computer Vision', 'CC BY 4.0', 2014, '328K images, ~25GB', 'Microsoft''s benchmark dataset for object detection, segmentation, and captioning with 328K images containing 2.5M labeled object instances. The corpus spans 328K images, ~25GB of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Standard detection benchmark: mAP metric widely used in CV research. Released under the CC BY 4.0 license for open evaluation and research reproducibility.', 'Images with bounding boxes, segmentation masks, keypoints, and 5 captions each.', 'from torchvision.datasets import CocoDetection
dataset = CocoDetection(
  root="./data/coco/images/train2017",
  annFile="./data/coco/annotations/instances_train2017.json"
)', 'Standard detection benchmark: mAP metric widely used in CV research', 'Object categories limited to 80, some class imbalance.', 'https://cocodataset.org/', '[{"text":"Lin et al. (2014) - COCO Paper","url":"https://arxiv.org/abs/1405.0312"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('multi-harness-rl', 'FineEnvs', 'Platform', 'NLP', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by FineEnvs. Trending with 83 community stars. Its cloud and infrastructure runtime provides dOCKER cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 81, Community Likes: 83. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/FineEnvs/multi-harness-rl', 'Trending Score: 81, Community Likes: 83', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/FineEnvs/multi-harness-rl', '[{"text":"FineEnvs/multi-harness-rl on Hugging Face Spaces","url":"https://huggingface.co/spaces/FineEnvs/multi-harness-rl"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('multimodal-knowledge-agent', 'google', 'Dataset', 'Computer Vision', 'APACHE-2.0', 2026, 'n<1K', 'Google DeepMind''s benchmark and evaluation dataset for autonomous multimodal AI agents. Tests agent ability to synthesize information across mixed modalities—including complex diagrams, financial tables, satellite imagery, and long-form scientific reports—to answer nuanced multi-step questions.', 'Multimodal benchmark dataset featuring high-resolution images, paired multi-page PDFs, structured tables, and verified gold answers.', 'from datasets import load_dataset

dataset = load_dataset("google/multimodal-knowledge-agent")', 'Standardized evaluation benchmark establishing frontier performance on multi-modal information synthesis.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/google/multimodal-knowledge-agent', '[{"url":"https://huggingface.co/datasets/google/multimodal-knowledge-agent","text":"google/multimodal-knowledge-agent on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Murf AI', 'Murf Inc.', 'AI', 'Audio', 'Proprietary', 2020, 'N/A', 'An AI voice generator and text-to-speech studio offering 120+ realistic voices in 20+ languages, with a built-in editor for voiceovers and presentations. The application is powered by advanced foundation models utilizing web Application (Proprietary neural TTS model with studio-grade audio processing). It features an intuitive interface designed to streamline complex audio workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Proprietary neural TTS model with studio-grade audio processing)', 'Visit murf.ai to type or paste text, choose a voice, and generate and download audio.', 'N/A', 'Free tier has a 10-minute voice generation limit; downloads require a paid plan.', 'https://murf.ai', '[{"text":"Murf AI","url":"https://murf.ai"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Muse Wonder (max)', 'Meta AI', 'Model', 'Multimodal', 'Proprietary', 2026, '1.05M Context · Proprietary Model', 'Maximum reasoning and creative generation checkpoint of Meta AI''s Muse Wonder multimodal architecture, delivering expressive long-context visual synthesis across 1.05M tokens, incorporating an architecture of proprietary frontier neural architecture developed by Meta AI, featuring native 1.05M token window support, optimized reasoning chains, and low-latency inference throughput (143 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 43, Briefcase Elo: 1659, Accuracy: 38%, Non-Hallucination: 79%, FrontierCode: 28%, AutomationBench: 68%, TerminalBench 4: 52%, HLE Diamond: 39%, Speed: 143 tok/s, Context Window: 1.05M. With its 1.05M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Meta AI, featuring native 1.05M token window support, optimized reasoning chains, and low-latency inference throughput (143 tok/s).', 'import requests

response = requests.post(
  "https://api.metaai.com/v1/chat/completions",
  json={"model": "muse-wonder-max", "messages": [{"role": "user", "content": "Benchmark query"}]}
)', 'Intelligence Index: 43, Briefcase Elo: 1659, Accuracy: 38%, Non-Hallucination: 79%, FrontierCode: 28%, AutomationBench: 68%, TerminalBench 4: 52%, HLE Diamond: 39%, Speed: 143 tok/s, Context Window: 1.05M', 'Proprietary cloud API access via Meta AI developer platform; subject to API rate limits and token pricing ($4/M in, $20/M out).', 'https://artificialanalysis.ai/models/muse-wonder', '[{"text":"Muse Wonder (max) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/muse-wonder"},{"text":"Muse Wonder (max) Inference Providers","url":"https://artificialanalysis.ai/models/muse-wonder/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Muse Wonder Full (max)', 'Meta AI', 'Model', 'Multimodal', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Maximum compute checkpoint of Meta AI''s creative foundation architecture, featuring high-fidelity multimodal world model simulation and long-range visual coherence, incorporating an architecture of proprietary frontier neural architecture developed by Meta AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (high-speed streaming). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 50, Briefcase Elo: 1729, Accuracy: 41%, Non-Hallucination: 82%, FrontierCode: 38%, AutomationBench: 71%, TerminalBench 4: 57%, HLE Diamond: 49%, Context Window: 1M. With its 1M Context · Proprietary Model design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Proprietary frontier neural architecture developed by Meta AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (high-speed streaming).', 'import requests

response = requests.post(
  "https://api.metaai.com/v1/chat/completions",
  json={"model": "muse-wonder-full-max", "messages": [{"role": "user", "content": "Benchmark query"}]}
)', 'Intelligence Index: 50, Briefcase Elo: 1729, Accuracy: 41%, Non-Hallucination: 82%, FrontierCode: 38%, AutomationBench: 71%, TerminalBench 4: 57%, HLE Diamond: 49%, Context Window: 1M', 'Proprietary cloud API access via Meta AI developer platform; subject to API rate limits and token pricing ($0/M in, $0/M out).', 'https://artificialanalysis.ai/models/muse-wonder-full', '[{"text":"Muse Wonder Full (max) on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/muse-wonder-full"},{"text":"Muse Wonder Full (max) Inference Providers","url":"https://artificialanalysis.ai/models/muse-wonder-full/providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Muse-Spark-Open-816B-A42B', 'meta-models', 'Model', 'Multimodal', 'OTHER', 2026, '816B params', 'Meta-Models'' frontier open-weights multimodal Mixture-of-Experts (MoE) foundation model spanning 816B total parameters with 42B active parameters per token. Engineered for large-scale enterprise reasoning, deep mathematical problem solving, high-resolution document OCR, and full-stack software development, it offers open weights for self-hosted multi-node clusters.', 'Sparse Mixture-of-Experts multimodal Transformer activating 42B parameters across 64 expert routes with RoPE context extension.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meta-models/Muse-Spark-Open-816B-A42B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("meta-models/Muse-Spark-Open-816B-A42B")', 'MMLU-Pro: 81.6%, HumanEval: 89.4%, MathVista: 76.8%, GPQA Diamond: 74.5%', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B', '[{"url":"https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B","text":"meta-models/Muse-Spark-Open-816B-A42B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Muse-Spark-Open-816B-A42B-NVFP4', 'meta-models', 'Model', 'Multimodal', 'OTHER', 2026, '816B params', 'Meta-Models'' 816B parameter open-weights multimodal Mixture-of-Experts model quantized to NVIDIA NVFP4 format. Designed for enterprise private deployment on 4x NVIDIA Blackwell B200 systems, it provides state-of-the-art vision-language reasoning, math derivation, and coding intelligence with 75% reduced memory footprint.', 'Sparse MoE multimodal Transformer with 42B active parameters per token quantized to NVFP4 precision.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meta-models/Muse-Spark-Open-816B-A42B-NVFP4", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("meta-models/Muse-Spark-Open-816B-A42B-NVFP4")', 'Retains 99.1% of FP16 accuracy across MMLU-Pro and MathVista; enables 816B deployment on 4 GPUs.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B-NVFP4', '[{"url":"https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B-NVFP4","text":"meta-models/Muse-Spark-Open-816B-A42B-NVFP4 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('MusicGen', 'Meta AI', 'Model', 'Audio', 'CC BY-NC 4.0', 2023, '300M to 3.3B params', 'Meta''s controllable text-to-music model that generates high-quality music from text descriptions or melody conditioning, incorporating an architecture of transformer-based auto-regressive language model operating on EnCodec audio tokens. The model demonstrates competitive performance across verified evaluations, including FAD: 4.93 (large model), Fréchet Audio Distance competitive with MusicLM. With its 300M to 3.3B params design, it supports diverse local and enterprise deployment profiles under the CC BY-NC 4.0 license.', 'Transformer-based auto-regressive language model operating on EnCodec audio tokens.', 'from audiocraft.models import MusicGen
model = MusicGen.get_pretrained(''facebook/musicgen-large'')
model.set_generation_params(duration=8)
wav = model.generate(["An upbeat jazz piano with drums"])', 'FAD: 4.93 (large model), Fréchet Audio Distance competitive with MusicLM', 'Non-commercial license, 30-second max duration natively.', 'https://github.com/facebookresearch/audiocraft', '[{"text":"Copet et al. (2023) - MusicGen Paper","url":"https://arxiv.org/abs/2306.05284"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nanbeige4.3-33B', 'Nanbeige', 'Model', 'NLP', 'APACHE-2.0', 2026, '33B params', 'Nanbeige''s 33B parameter dense language model excelling in Chinese-English bilingual understanding, mathematical problem solving, and structured JSON generation. Built for enterprise knowledge retrieval and technical reasoning with strong instruction following capabilities.', '33B dense Transformer featuring Grouped Query Attention and 32k context window.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Nanbeige/Nanbeige4.3-33B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Nanbeige/Nanbeige4.3-33B")', 'C-Eval: 88.4%, MMLU: 81.2%, GSM8K: 87.6%, HumanEval: 78.4%', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Nanbeige/Nanbeige4.3-33B', '[{"url":"https://huggingface.co/Nanbeige/Nanbeige4.3-33B","text":"Nanbeige/Nanbeige4.3-33B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron 3 Ultra', 'NVIDIA', 'Model', 'NLP', 'Open', 2026, '262k Context · Open Model', 'NVIDIA''s 550B parameter Mixture-of-Experts reasoning engine, accelerated by TensorRT-LLM for complex synthetic data generation and enterprise agent workflows, incorporating an architecture of open-weights frontier neural architecture developed by NVIDIA, featuring native 262k token window support, optimized reasoning chains, and low-latency inference throughput (153 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 12, Briefcase Elo: 877, Accuracy: 21%, Non-Hallucination: 77%, FrontierCode: 1%, AutomationBench: 3%, TerminalBench 4: 1%, HLE Diamond: 9%, Speed: 153 tok/s, Context Window: 262k. With its 262k Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by NVIDIA, featuring native 262k token window support, optimized reasoning chains, and low-latency inference throughput (153 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("NVIDIA/nemotron-3-ultra", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("NVIDIA/nemotron-3-ultra")', 'Intelligence Index: 12, Briefcase Elo: 877, Accuracy: 21%, Non-Hallucination: 77%, FrontierCode: 1%, AutomationBench: 3%, TerminalBench 4: 1%, HLE Diamond: 9%, Speed: 153 tok/s, Context Window: 262k', 'High memory requirements for local execution (262k context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/nvidia-nemotron-3-ultra-550b-a55b', '[{"text":"Nemotron 3 Ultra on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/nvidia-nemotron-3-ultra-550b-a55b"},{"text":"Nemotron 3 Ultra Inference Providers","url":"https://artificialanalysis.ai/models/nvidia-nemotron-3-ultra-550b-a55b/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron 3.5 Super VL', 'NVIDIA', 'Model', 'Multimodal', 'Open', 2026, '1M Context · Open Model', 'NVIDIA''s multimodal vision-language foundation model, engineered for high-resolution visual inspection, robotic perception, and physical AI simulations with 1M context, incorporating an architecture of open-weights frontier neural architecture developed by NVIDIA, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (474 tok/s). The model demonstrates competitive performance across verified evaluations, including Intelligence Index: 14, Briefcase Elo: 999, Accuracy: 21%, Non-Hallucination: 70%, FrontierCode: 6%, AutomationBench: 15%, TerminalBench 4: 0%, HLE Diamond: 9%, Speed: 474 tok/s, Context Window: 1M. With its 1M Context · Open Model design, it supports diverse local and enterprise deployment profiles under the Open license.', 'Open-weights frontier neural architecture developed by NVIDIA, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (474 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("NVIDIA/nemotron-3-5-super-vl", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("NVIDIA/nemotron-3-5-super-vl")', 'Intelligence Index: 14, Briefcase Elo: 999, Accuracy: 21%, Non-Hallucination: 70%, FrontierCode: 6%, AutomationBench: 15%, TerminalBench 4: 0%, HLE Diamond: 9%, Speed: 474 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/nemotron-3-5-super-vl', '[{"text":"Nemotron 3.5 Super VL on Artificial Analysis Benchmark","url":"https://artificialanalysis.ai/models/nemotron-3-5-super-vl"},{"text":"Nemotron 3.5 Super VL Inference Providers","url":"https://artificialanalysis.ai/models/nemotron-3-5-super-vl/providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-3-Diarization', 'NVIDIA', 'Model', 'Audio', 'OPENMDW-1.1', 2026, 'Open Weights', 'High-performance Audio open-weights model by nvidia, trending with over 565 community likes and 36,386 downloads on Hugging Face, incorporating an architecture of nvidia voice activity detection architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 398, Likes: 565, Downloads: 36,386. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the OPENMDW-1.1 license.', 'nvidia voice activity detection architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/Nemotron-3-Diarization", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/Nemotron-3-Diarization")', 'Trending Score: 398, Likes: 565, Downloads: 36,386', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/Nemotron-3-Diarization', '[{"text":"nvidia/Nemotron-3-Diarization on Hugging Face","url":"https://huggingface.co/nvidia/Nemotron-3-Diarization"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('nemotron-diarization', 'NVIDIA', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by nvidia. Trending with 67 community stars. Its cloud and infrastructure runtime provides dOCKER cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 66, Community Likes: 67. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'DOCKER cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/nvidia/nemotron-diarization', 'Trending Score: 66, Community Likes: 67', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/nvidia/nemotron-diarization', '[{"text":"nvidia/nemotron-diarization on Hugging Face Spaces","url":"https://huggingface.co/spaces/nvidia/nemotron-diarization"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-Personas-Germany', 'nvidia', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '1M<n<10M', 'NVIDIA''s specialized synthetic persona and conversational dialogue dataset tailored for German linguistic and cultural alignment. Covering formal business correspondence, regional dialects (Bavarian, Swabian, Berlin), and idiomatic German expressions for training enterprise conversational agents.', 'Multilingual German-English conversational corpus annotated with dialect tags, formality levels, and domain categories.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Nemotron-Personas-Germany")', '180,000+ multi-turn dialogues with verified cultural authenticity and native linguistic review.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Germany', '[{"url":"https://huggingface.co/datasets/nvidia/Nemotron-Personas-Germany","text":"nvidia/Nemotron-Personas-Germany on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-Personas-UK', 'nvidia', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, '1M<n<10M', 'NVIDIA''s culturally aligned UK English conversational persona dataset, providing authentic British idioms, regional vernacular expressions, and cultural conversational conventions. Designed to fine-tune enterprise conversational AI systems for the United Kingdom market.', 'Curated conversational corpus annotated with British regional dialects, cultural touchpoints, and formality spectra.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Nemotron-Personas-UK")', '160,000+ multi-turn dialogues with verified British English linguistic consistency.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-UK', '[{"url":"https://huggingface.co/datasets/nvidia/Nemotron-Personas-UK","text":"nvidia/Nemotron-Personas-UK on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-Personas-Vietnam', 'nvidia', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '1M<n<10M', 'Culturally nuanced synthetic persona and conversational dialogue dataset created by NVIDIA for developing localized Vietnamese language models. Spanning everyday social interactions, regional dialects, historical queries, and formal business communication to ensure authentic linguistic and cultural alignment.', 'Bilingual Vietnamese-English conversational corpus structured in Parquet with demographic, dialectal, and formality annotations.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Nemotron-Personas-Vietnam")', '150,000+ multi-turn dialogues covering 12 Vietnamese regional linguistic styles.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Vietnam', '[{"url":"https://huggingface.co/datasets/nvidia/Nemotron-Personas-Vietnam","text":"nvidia/Nemotron-Personas-Vietnam on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nemotron-SFT-Agentic-Finance-v1', 'nvidia', 'Dataset', 'NLP', 'OTHER', 2026, '1K<n<10K', 'Supervised fine-tuning dataset developed by NVIDIA for training autonomous financial reasoning agents. Contains complex multi-step reasoning traces over SEC 10-K filings, earnings call transcripts, discounted cash flow (DCF) modeling, and regulatory compliance audits.', 'Curated domain dataset in Parquet format featuring multi-turn financial question-answering, chain-of-thought derivations, and table analysis.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Nemotron-SFT-Agentic-Finance-v1")', '50,000+ expert financial reasoning chains with verified mathematical reconciliation.', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Nemotron-SFT-Agentic-Finance-v1', '[{"url":"https://huggingface.co/datasets/nvidia/Nemotron-SFT-Agentic-Finance-v1","text":"nvidia/Nemotron-SFT-Agentic-Finance-v1 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NeoHorse-1-4B', 'TokenRhythm', 'Model', 'NLP', 'APACHE-2.0', 2026, '4B params', 'High-performance NLP open-weights model by TokenRhythm, trending with over 2,056 community likes and 11,904 downloads on Hugging Face, incorporating an architecture of tokenRhythm text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 392, Likes: 2,056, Downloads: 11,904. With its 4B params design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'TokenRhythm text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("TokenRhythm/NeoHorse-1-4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("TokenRhythm/NeoHorse-1-4B")', 'Trending Score: 392, Likes: 2,056, Downloads: 11,904', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/TokenRhythm/NeoHorse-1-4B', '[{"text":"TokenRhythm/NeoHorse-1-4B on Hugging Face","url":"https://huggingface.co/TokenRhythm/NeoHorse-1-4B"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('news', 'autotrust', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive AI news verification, aggregation, and real-time summarization platform hosted on Hugging Face Spaces by autotrust. Utilizing automated claim extraction, multi-source consensus scoring, and synthetic media debunking algorithms, it provides journalists and researchers with structured executive digests and credibility metrics across thousands of global news feeds.', 'Cloud multimodal pipeline integrating live RSS ingestion, neural entity linking, consensus verification models, and an interactive Gradio web interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/autotrust/news', 'Fact-checking consensus accuracy: 94.2%; processes 50,000+ daily articles with sub-second retrieval.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/autotrust/news', '[{"url":"https://huggingface.co/spaces/autotrust/news","text":"autotrust/news on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nex-N2.5-mini', 'nex-agi', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by nex-agi, trending with over 692 community likes and 3,121 downloads on Hugging Face, incorporating an architecture of nex-agi text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 539, Likes: 692, Downloads: 3,121. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'nex-agi text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nex-agi/Nex-N2.5-mini", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nex-agi/Nex-N2.5-mini")', 'Trending Score: 539, Likes: 692, Downloads: 3,121', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nex-agi/Nex-N2.5-mini', '[{"text":"nex-agi/Nex-N2.5-mini on Hugging Face","url":"https://huggingface.co/nex-agi/Nex-N2.5-mini"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Nex-N2.5-Pro', 'nex-agi', 'Model', 'NLP', 'APACHE-2.0', 2026, 'Open Weights', 'High-performance NLP open-weights model by nex-agi, trending with over 624 community likes and 30,289 downloads on Hugging Face, incorporating an architecture of nex-agi text generation architecture with community-tuned weights. The model demonstrates competitive performance across verified evaluations, including Trending Score: 479, Likes: 624, Downloads: 30,289. With its Open Weights design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'nex-agi text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nex-agi/Nex-N2.5-Pro", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nex-agi/Nex-N2.5-Pro")', 'Trending Score: 479, Likes: 624, Downloads: 30,289', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nex-agi/Nex-N2.5-Pro', '[{"text":"nex-agi/Nex-N2.5-Pro on Hugging Face","url":"https://huggingface.co/nex-agi/Nex-N2.5-Pro"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NightCafe', 'NightCafe Studio', 'AI', 'Image Generation', 'Proprietary', 2019, 'N/A', 'An AI art generator and social community platform with multiple generation algorithms, daily free credits, and art challenges for creators. The application is powered by advanced foundation models utilizing web Application (Supports Stable Diffusion, DALL·E, and other generation backends). It features an intuitive interface designed to streamline complex image generation workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'Web Application (Supports Stable Diffusion, DALL·E, and other generation backends)', 'Visit creator.nightcafe.studio to generate images and participate in the community.', 'N/A', 'Limited free credits; best results often require purchased credit packs.', 'https://creator.nightcafe.studio', '[{"text":"NightCafe Creator","url":"https://creator.nightcafe.studio"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('nlp-before-llms', 'dlouapre', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'DOCKER Platform', 'Educational interactive web museum and reference space on Hugging Face Spaces by dlouapre. It provides interactive demonstrations and historical visual walkthroughs of classical natural language processing techniques, from rule-based parsers, n-grams, and TF-IDF to Word2Vec, GloVe, and early RNN/LSTM architectures.', 'Interactive educational web platform with client-side JavaScript visualizations and Python NLP demonstrations.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/dlouapre/nlp-before-llms', 'Comprehensive educational reference visited by thousands of computer science students and AI researchers.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/dlouapre/nlp-before-llms', '[{"url":"https://huggingface.co/spaces/dlouapre/nlp-before-llms","text":"dlouapre/nlp-before-llms on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NotebookLM', 'Google DeepMind', 'AI', 'Productivity', 'Proprietary', 2024, 'N/A', 'Google''s personalized AI research assistant powered by Gemini 1.5 Pro, featuring Audio Overviews that turn uploaded documents into dynamic conversational podcast discussions. The application is powered by advanced foundation models utilizing grounded RAG pipeline powered by Gemini 1.5 Pro long context and conversational TTS. Key user-facing capabilities include Zero hallucination rate on user source documents through strict ground-truth attribution. Available under a Proprietary model for commercial and personal productivity.', 'Grounded RAG pipeline powered by Gemini 1.5 Pro long context and conversational TTS.', 'Upload research papers, meeting notes, or PDFs at notebooklm.google.com, then click ''Audio Overview'' to generate an engaging AI podcast explanation.', 'Zero hallucination rate on user source documents through strict ground-truth attribution.', 'Outputs strictly restricted to user uploaded source materials.', 'https://notebooklm.google.com', '[{"text":"NotebookLM","url":"https://notebooklm.google.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Notion AI', 'Notion Labs', 'AI', 'Productivity', 'Proprietary', 2023, 'N/A', 'An AI writing and productivity assistant built directly into Notion, capable of drafting, summarizing, translating, and brainstorming within your workspace. The application is powered by advanced foundation models utilizing saaS Integration (Powered by OpenAI GPT-4 and Anthropic Claude models). It features an intuitive interface designed to streamline complex productivity workflows and maximize end-user productivity. Available under a Proprietary model for commercial and personal productivity.', 'SaaS Integration (Powered by OpenAI GPT-4 and Anthropic Claude models)', 'Access inside any Notion workspace by pressing the spacebar or typing /AI on any page.', 'N/A', 'Requires a Notion AI add-on subscription; dependent on third-party LLM providers.', 'https://www.notion.so/product/ai', '[{"text":"Notion AI","url":"https://www.notion.so/product/ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA Cosmos', 'NVIDIA', 'Model', 'Computer Vision', 'Custom', 2025, 'Physical AI Suite', 'NVIDIA''s flagship physical AI and world foundation models designed to simulate physical dynamics, predict camera trajectories, and accelerate robotics and autonomous vehicle simulation, incorporating an architecture of continuous and Discrete Video Autoencoders with physical dynamics conditioning and diffusion generation on NVIDIA Blackwell architecture. The model demonstrates competitive performance across verified evaluations, including Physical Simulation Realism: 92.4%, Robotics Trajectory Prediction: 88.1%. With its Physical AI Suite design, it supports diverse local and enterprise deployment profiles under the Custom license.', 'Continuous and Discrete Video Autoencoders with physical dynamics conditioning and diffusion generation on NVIDIA Blackwell architecture.', 'from cosmos_tokenize import VideoTokenizer
tokenizer = VideoTokenizer.from_pretrained("nvidia/Cosmos-1.0-Tokenizer-CV8x8x8")', 'Physical Simulation Realism: 92.4%, Robotics Trajectory Prediction: 88.1%', 'Optimized specifically for NVIDIA GPU hardware and Omniverse / robotics simulation workflows.', 'https://developer.nvidia.com/cosmos', '[{"text":"NVIDIA Cosmos World Foundation Models","url":"https://developer.nvidia.com/cosmos"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4', 'nvidia', 'Model', 'Multimodal', 'OTHER', 2026, '120B params', 'NVIDIA''s frontier 120B parameter Mixture-of-Experts vision-language model activating 12B parameters per token, quantized in native NVFP4 precision for Blackwell architecture GPUs. Designed for enterprise multi-camera surveillance, industrial robotics, and multimodal document reasoning at massive scale.', 'Sparse Mixture-of-Experts vision-language model quantized to NVFP4 precision with TensorRT-LLM acceleration.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4")', 'MMLU: 86.4%, MathVista: 78.2%, DocVQA: 92.1%, runs at 210 tokens/sec on NVIDIA B200.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4', '[{"url":"https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4","text":"nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16', 'nvidia', 'Model', 'NLP', 'OTHER', 2026, '4B params', 'NVIDIA Labs'' 4B parameter foundation model in bfloat16, fine-tuned for high-speed edge reasoning, robotics control, and conversational agent workflows. Designed for seamless deployment on NVIDIA Jetson embedded modules and desktop RTX GPUs with exceptional instruction following.', 'Compact 4B dense Transformer with bfloat16 precision, Grouped Query Attention, and 32k context window.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16")', 'MMLU: 72.8%, HumanEval: 74.2%, runs at 140 tokens/sec on NVIDIA Jetson AGX Orin.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16', '[{"url":"https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16","text":"nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('o1 (OpenAI)', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2024, 'Unknown', 'OpenAI''s reasoning-focused model that ''thinks before it answers'' using chain-of-thought reasoning, excelling at math, science, and coding problems, incorporating an architecture of large-scale transformer with reinforcement learning on chain-of-thought reasoning traces. The model demonstrates competitive performance across verified evaluations, including AIME: 83.3%, GPQA Diamond: 78.0%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern nlp ecosystem.', 'Large-scale transformer with reinforcement learning on chain-of-thought reasoning traces.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="o1-preview",
  messages=[{"role": "user", "content": "Solve this complex math proof."}]
)', 'AIME: 83.3%, GPQA Diamond: 78.0%', 'Slower than GPT-4o due to extended thinking, no image output, higher cost.', 'https://openai.com/o1', '[{"text":"OpenAI o1 System Card","url":"https://openai.com/index/openai-o1-system-card/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('o3', 'OpenAI', 'Model', 'AI Coding', 'Proprietary', 2025, 'Frontier Reasoning', 'OpenAI''s full-scale frontier reasoning model that achieves unprecedented breakthroughs on FrontierMath, competitive coding (Codeforces 2727 Grandmaster level), and ARC-AGI via test-time reasoning compute scaling, incorporating an architecture of deep reinforcement learning foundation model with scalable chain-of-thought exploration, backtracking, and algorithmic verification. The model demonstrates competitive performance across verified evaluations, including FrontierMath: 25.2%, Codeforces Rating: 2727 (Grandmaster), ARC-AGI: 87.5%, SWE-bench Verified: 71.7%. With its Frontier Reasoning design, it supports diverse local and enterprise deployment profiles under the Proprietary license.', 'Deep reinforcement learning foundation model with scalable chain-of-thought exploration, backtracking, and algorithmic verification.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="o3",
  reasoning_effort="high",
  messages=[{"role": "user", "content": "Solve this unsolved open conjecture step by step."}]
)', 'FrontierMath: 25.2%, Codeforces Rating: 2727 (Grandmaster), ARC-AGI: 87.5%, SWE-bench Verified: 71.7%', 'High latency and API cost during high-effort reasoning; text-only inference.', 'https://openai.com', '[{"text":"OpenAI 12 Days of OpenAI: o3 Preview","url":"https://openai.com"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('o3-mini', 'OpenAI', 'Model', 'AI Coding', 'Proprietary', 2025, 'Unknown', 'OpenAI''s cost-efficient STEM, math, and coding reasoning model with selectable reasoning effort levels (low, medium, high) and function calling, incorporating an architecture of reinforcement learning-trained reasoning model optimized for coding and STEM. The model demonstrates competitive performance across verified evaluations, including AIME 2024: 87.3%, Codeforces Rating: 2088, GPQA: 79.7%. Distributed under the Proprietary license, it serves as a foundational intelligence asset in the modern ai coding ecosystem.', 'Reinforcement learning-trained reasoning model optimized for coding and STEM.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="o3-mini",
  reasoning_effort="medium",
  messages=[{"role": "user", "content": "Design an optimal LRU cache in Rust."}]
)', 'AIME 2024: 87.3%, Codeforces Rating: 2088, GPQA: 79.7%', 'Text only (no image modality input); reasoning adds latency.', 'https://openai.com', '[{"text":"OpenAI o3-mini Announcement","url":"https://openai.com/index/openai-o3-mini/"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ollama', 'Ollama', 'Framework', 'MLOps', 'MIT', 2023, 'N/A', 'A tool for running large language models locally on your Mac, Linux, or Windows machine with a simple CLI and REST API. Under the hood, it incorporates go-based server wrapping llama.cpp inference backend with a Docker-like model management CLI. Widely utilized by developers and researchers, it accelerates model development, experimentation, and production deployment across mlops pipelines. Licensed under the MIT license, it integrates seamlessly into contemporary AI engineering toolchains.', 'Go-based server wrapping llama.cpp inference backend with a Docker-like model management CLI.', '# Install and run from terminal
$ ollama pull llama3
$ ollama run llama3

# Or use the REST API
import requests
response = requests.post(''http://localhost:11434/api/generate'',
  json={"model": "llama3", "prompt": "Why is the sky blue?", "stream": False})', 'N/A — inference speed depends on hardware', 'Local hardware constraints limit model size, not for production serving at scale.', 'https://ollama.com/', '[{"text":"Ollama GitHub","url":"https://github.com/ollama/ollama"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OLMo 2 13B', 'Allen Institute for AI', 'Model', 'NLP', 'Apache-2.0', 2024, '13B Parameters · 4k Context', 'Allen Institute for AI''s completely open frontier language model, providing open weights, pretraining code, full dataset mixes (Dolma 1.7), and evaluation recipes for transparent scientific research, incorporating an architecture of non-gated SwiGLU transformer decoder with rotary position embeddings (RoPE) and RMSNorm, trained transparently on Ai2''s Dolma corpus. The model demonstrates competitive performance across verified evaluations, including MMLU: 68.2%, GSM8k: 76.5%, HumanEval: 61.0%, ARC-Challenge: 86.4%. With its 13B Parameters · 4k Context design, it supports diverse local and enterprise deployment profiles under the Apache-2.0 license.', 'Non-gated SwiGLU transformer decoder with rotary position embeddings (RoPE) and RMSNorm, trained transparently on Ai2''s Dolma corpus.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("allenai/OLMo-2-1124-13B-Instruct", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("allenai/OLMo-2-1124-13B-Instruct")', 'MMLU: 68.2%, GSM8k: 76.5%, HumanEval: 61.0%, ARC-Challenge: 86.4%', 'Native pretraining context window of 4,096 tokens; requires context extension techniques for long-document tasks.', 'https://allenai.org/olmo', '[{"text":"Allen Institute for AI OLMo Research Platform","url":"https://allenai.org/olmo"},{"text":"OLMo 2 13B Instruct on Hugging Face","url":"https://huggingface.co/allenai/OLMo-2-1124-13B-Instruct"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Omni-Image-Editor', 'selfit-camera', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Browser-based generative image editing platform on Hugging Face Spaces by selfit-camera. It provides an intuitive suite of natural language brush controls, semantic object replacement, generative expansion, and photographic relighting powered by modern diffusion architectures.', 'Client-side interactive WebGL canvas communicating with cloud diffusion inpainting and ControlNet inference endpoints.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/selfit-camera/Omni-Image-Editor', 'Sub-2s inpainting preview latency; over 98% user satisfaction on face and object retouching.', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/selfit-camera/Omni-Image-Editor', '[{"url":"https://huggingface.co/spaces/selfit-camera/Omni-Image-Editor","text":"selfit-camera/Omni-Image-Editor on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Omni-videos-custom-auto_prompt_high-quality', 'vamo455', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive AI web platform and demonstration hosted on Hugging Face Spaces by vamo455. Trending with 98 community stars. Its cloud and infrastructure runtime provides gRADIO cloud runtime container with interactive browser interface. Core platform telemetry and performance features include: Trending Score: 46, Community Likes: 98. Accessible under a Community Hosted tier, it empowers teams to build, serve, and monitor AI workloads at scale.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/vamo455/Omni-videos-custom-auto_prompt_high-quality', 'Trending Score: 46, Community Likes: 98', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/vamo455/Omni-videos-custom-auto_prompt_high-quality', '[{"text":"vamo455/Omni-videos-custom-auto_prompt_high-quality on Hugging Face Spaces","url":"https://huggingface.co/spaces/vamo455/Omni-videos-custom-auto_prompt_high-quality"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('OmniVChat', 'Harland', 'Dataset', 'Audio', 'CC-BY-NC-ND-4.0', 2026, '1K<n<10K', 'OmniVChat: Synthesizing, Benchmarking, and Training for Native Audio-Visual Dialogue &nbsp;&nbsp;&nbsp;&nbsp; 1 The Chinese University of Hong Kong 2 Alibaba Token Hu (39 likes, 1,473 downloads). The corpus spans 1K<n<10K of verified and structured training and evaluation samples. It serves as an authoritative benchmark for evaluating Trending Score: 39, Likes: 39, Downloads: 1,473. Released under the CC-BY-NC-ND-4.0 license for open evaluation and research reproducibility.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Harland/OmniVChat")', 'Trending Score: 39, Likes: 39, Downloads: 1,473', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Harland/OmniVChat', '[{"text":"Harland/OmniVChat on Hugging Face Datasets","url":"https://huggingface.co/datasets/Harland/OmniVChat"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

