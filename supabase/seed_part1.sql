-- =============================================================================
-- AiVerse: Full Catalog Part 1 of 2 (269 entries)
-- Run this script in Supabase Dashboard -> SQL Editor
-- =============================================================================

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

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('10-2026-qwen-investigation-traces', 'Cohere', 'Dataset', 'NLP', 'Open Data', 2026, 'n<1K', 'Diagnostic reasoning traces and raw token ID dataset investigating sampling behavior in Qwen3.8 Flash.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("CohereLabs/10-2026-qwen-investigation-traces")', 'Trending Score: 48, Likes: 49, Downloads: 0', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/CohereLabs/10-2026-qwen-investigation-traces', '[{"url":"https://huggingface.co/datasets/CohereLabs/10-2026-qwen-investigation-traces","text":"CohereLabs/10-2026-qwen-investigation-traces on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('3d-collection', 'Scenario Labs', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '1K<n<10K', 'Curated dataset of 1,342 AI-generated 3D assets by Scenario Labs with multi-format meshes and PBR textures.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("scenario-labs/3d-collection")', 'Trending Score: 38, Likes: 39, Downloads: 693', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/scenario-labs/3d-collection', '[{"url":"https://huggingface.co/datasets/scenario-labs/3d-collection","text":"scenario-labs/3d-collection on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('3dcodeverse', 'ilabai', 'Dataset', 'Computer Vision', 'CC-BY-NC-SA-4.0', 2026, '1M<n<10M', '3DCodeVerse — Towards Building the Universe via Code 3DCodeVerse aims to gather any code that creates, renders, or governs 3D — every dialect, one corpus. Text / Imag.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("ilabai/3dcodeverse")', 'Trending Score: 15, Likes: 20, Downloads: 41,705', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ilabai/3dcodeverse', '[{"url":"https://huggingface.co/datasets/ilabai/3dcodeverse","text":"ilabai/3dcodeverse on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Adobe Firefly', 'Adobe', 'AI', 'Image Generation', 'Proprietary', 2023, 'N/A', 'Adobe''s generative AI tool for image creation and editing, integrated into Photoshop and other Creative Cloud apps, trained exclusively on licensed content.', 'Web Application / Creative Suite Integration (Proprietary diffusion model)', 'Visit firefly.adobe.com or use Generative Fill directly inside Adobe Photoshop.', 'N/A', 'Requires an Adobe account; best features need a Creative Cloud subscription.', 'https://firefly.adobe.com', '[{"url":"https://firefly.adobe.com","text":"Adobe Firefly"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Adobe Podcast', 'Adobe', 'AI', 'Audio', 'Proprietary', 2022, 'N/A', 'Adobe''s AI audio enhancement tool that automatically removes background noise and enhances microphone quality to make any recording sound studio-recorded.', 'Web Application (Proprietary AI speech enhancement model — Project Shasta)', 'Visit podcast.adobe.com, upload an audio file, and use Enhance Speech to clean up the recording.', 'N/A', 'Works best on speech; music or mixed audio may degrade; requires an Adobe account.', 'https://podcast.adobe.com', '[{"url":"https://podcast.adobe.com","text":"Adobe Podcast"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('agency', 'Operand', 'Framework', 'NLP', 'MIT', 2026, '3MB Repo', 'A fast and minimal framework for building agentic systems.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/operand/agency
cd agency
pip install -e .', 'GitHub Stars: 490, Forks: 29', 'Requires local Python environment and dependency configuration.', 'https://github.com/operand/agency', '[{"url":"https://github.com/operand/agency","text":"operand/agency on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('AgentAlphaXiv', 'alphaXiv', 'Dataset', 'Research', 'CC-BY-4.0', 2026, '10K<n<100K', 'Twelve-week research archive from alphaXiv capturing 916 studies, code repositories, and autonomous agent preprints.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("alphaXiv/AgentAlphaXiv")', 'Trending Score: 8, Likes: 39, Downloads: 745', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/alphaXiv/AgentAlphaXiv', '[{"url":"https://huggingface.co/datasets/alphaXiv/AgentAlphaXiv","text":"alphaXiv/AgentAlphaXiv on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('AI Manga Translator (MangaTranslate)', 'Ficory LLC', 'Platform', 'Multimodal', 'Freemium', 2024, 'Cloud Platform & API', 'Enterprise-grade manga and comic translation platform by Ficory LLC featuring batch translation, speech-bubble OCR, AI in-painting, an online Photoshop-style studio editor, and developer REST APIs.', 'Cloud multimodal pipeline combining speech bubble segmentation, text in-painting, neural machine translation, and typography rendering with web studio and REST API.', 'curl -X POST https://api.mangatranslate.com/v1/translate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "image=@comic_page.png" \
  -F "target_lang=en"', 'Supports 30+ languages, batch image translation, style-preserving font matching, and daily free check-in credits.', 'Free tier has daily credit limits; Enterprise volume, advanced Studio editing features, and high-throughput API access require a paid subscription.', 'https://www.mangatranslate.com/ko/ai-manga-translator/', '[{"url":"https://www.mangatranslate.com/ko/ai-manga-translator/","text":"AI Manga Translator - Official Overview"},{"url":"https://www.mangatranslate.com/ko/ai-manga-translator/pricing/","text":"MangaTranslate Pricing & Credits"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Aider', 'Paul Gauthier', 'AI', 'AI Coding', 'Apache-2.0', 2023, 'Python CLI Application', 'Command-line AI pair programming tool that edits code directly in your local git repository, using repository tree-sitter map architectures to coordinate multi-file changes and automatically create clean git commits.', 'Terminal REPL with tree-sitter based repo-map graph representations, git integration, and multi-file unified diff engines compatible with any LLM.', 'pip install aider-chat
aider --model claude-3-5-sonnet-20241022
# Inside aider terminal:
/add src/types.ts src/data.ts
Add a new entry for Pixtral 12B and update seed script.', 'Ranks at the top of the Aider LLM Leaderboard for code editing; automatically generates semantic git commit messages with git diff verification.', 'Command-line terminal interface; requires git repository initialization for version control features.', 'https://github.com/Aider-AI/aider', '[{"url":"https://github.com/Aider-AI/aider","text":"Aider GitHub Repository"},{"url":"https://aider.chat/","text":"Aider Official Documentation & LLM Leaderboards"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('all-MiniLM-L6-v2', 'Sentence Transformers', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by Sentence Transformers.', 'sentence-transformers sentence similarity architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("sentence-transformers/all-MiniLM-L6-v2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")', 'Trending Score: 305, Likes: 5,722, Downloads: 253,331,994', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2', '[{"url":"https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2","text":"sentence-transformers/all-MiniLM-L6-v2 on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Alpaca', 'Stanford AI', 'Model', 'NLP', 'Non-commercial (CC BY NC 4.0)', 2023, '7B params', 'Stanford''s instruction-tuned model based on LLaMA 7B, fine-tuned for ~$600 using Self-Instruct data generated from GPT-3.5.', 'LLaMA fine-tuned on 52K instruction-following examples from GPT-3.5.', '# Weights available on HuggingFace
from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("tatsu-lab/alpaca-7b-wdiff")
tokenizer = AutoTokenizer.from_pretrained("tatsu-lab/alpaca-7b-wdiff")', 'Comparable to GPT-3.5 text-davinci-003 in human evaluation', 'Non-commercial license, now largely superseded by better open models.', 'https://crfm.stanford.edu/2023/03/13/alpaca.html', '[{"url":"https://crfm.stanford.edu/2023/03/13/alpaca.html","text":"Alpaca: A Strong Open-Source LLM"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Alpaca Dataset', 'Stanford AI', 'Dataset', 'NLP', 'CC-BY-NC-4.0', 2023, '52,002 instruction-following pairs', 'Stanford''s 52K instruction-following examples generated by GPT-3.5, kickstarting the open-source instruction tuning movement.', 'Self-Instruct format: instruction, input (optional), and output triples.', 'from datasets import load_dataset
dataset = load_dataset("tatsu-lab/alpaca")
print(dataset[''train''][0])', 'Fine-tuning LLaMA 7B on this data produces near-ChatGPT quality', 'Non-commercial license, GPT-3.5 generated (potential errors), English-only.', 'https://github.com/tatsu-lab/stanford_alpaca', '[{"url":"https://crfm.stanford.edu/2023/03/13/alpaca.html","text":"Alpaca Dataset Release"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Amazon CodeWhisperer', 'Amazon Web Services', 'AI', 'AI Coding', 'Proprietary', 2022, 'N/A', 'Amazon''s AI code generator integrated into popular IDEs, trained on billions of lines of code and AWS APIs, with built-in security vulnerability scanning.', 'IDE Extension (Integrates with VS Code, JetBrains, AWS Cloud9, and more)', 'Install the AWS Toolkit extension in VS Code or JetBrains and sign in with an AWS Builder ID.', 'N/A', 'Best suited for AWS-related codebases; individual tier is free but team features are paid.', 'https://aws.amazon.com/codewhisperer', '[{"url":"https://aws.amazon.com/codewhisperer","text":"Amazon CodeWhisperer"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Anyscale', 'Anyscale', 'Platform', 'MLOps', 'Proprietary', 2019, 'Enterprise Distributed AI Platform', 'Production distributed AI compute and model serving platform built by the creators of Ray, enabling scalable pretraining, fine-tuning, and ultra-high-throughput LLM inference across hybrid and multi-cloud infrastructure.', 'Managed cloud compute control plane orchestrating Ray Core, Ray Train, Ray Serve, and vLLM clusters on AWS, GCP, and private Kubernetes.', 'import ray
ray.init("anyscale://cluster-name")

@ray.remote
def train_batch(data):
    return model.forward(data)

results = ray.get([train_batch.remote(batch) for batch in batches])', 'Powers large-scale AI production workloads at OpenAI, Uber, and Amazon; scales seamlessly to tens of thousands of heterogeneous GPU cores.', 'Requires familiarity with Ray distributed computing abstractions; enterprise tiers required for advanced SSO and multi-tenant billing controls.', 'https://www.anyscale.com', '[{"url":"https://www.anyscale.com","text":"Anyscale Official Website"},{"url":"https://github.com/ray-project/ray","text":"Ray Open Source Project at Anyscale"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Apodex 1.1', 'Apodex', 'Model', 'Research', 'Proprietary', 2026, '256k Context · Proprietary Model', 'Frontier Research model by Apodex benchmarked on Artificial Analysis with an Intelligence Index of 13.7 and a verified 256k Context window.', 'Proprietary frontier neural architecture developed by Apodex, featuring native 256k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/apodex-1-1', 'Context Window: 256k Context, Intelligence Index: 13.7, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/apodex-1-1', '[{"url":"https://artificialanalysis.ai/models/apodex-1-1","text":"Apodex 1.1 on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/apodex-1-1/providers","text":"Apodex 1.1 Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Arena-Hard-Auto', 'LMSYS Org', 'Dataset', 'Research', 'Apache-2.0', 2024, '500 complex prompts', 'Benchmark of 500 challenging, hard-to-distinguish real-world queries evaluated automatically using LLM-as-a-judge with high correlation to human Chatbot Arena rank.', 'Hard prompt filtering pipeline with GPT-4-Judge pairwise win rate calculations.', 'python -m arena_hard.eval --model-answers answers.jsonl', '98% rank correlation with human Chatbot Arena ELO at a fraction of human testing cost.', 'Susceptible to LLM judge biases such as length and formatting preference.', 'https://github.com/sunshanghai/arena-hard-auto', '[{"url":"https://lmsys.org/blog/2024-04-19-arena-hard/","text":"Arena-Hard-Auto Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Arete-27B', 'Nous Research', 'Model', 'NLP', 'Apache-2.0', 2026, '27B params', 'Open-weights NLP model developed by Nous Research.', 'NousResearch text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("NousResearch/Arete-27B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("NousResearch/Arete-27B")', 'Trending Score: 182, Likes: 187, Downloads: 989', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/NousResearch/Arete-27B', '[{"url":"https://huggingface.co/NousResearch/Arete-27B","text":"NousResearch/Arete-27B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('arete-data-pairs', 'Nous Research', 'Dataset', 'NLP', 'Open Data', 2026, '10K<n<100K', 'Arete data pairs — v1.0.0 Prompt–response pairs for seven values topics, each prompt answered by both the Inkling teacher (thinkingmachines/inkling) and the Qwen 3.8-.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("NousResearch/arete-data-pairs")', 'Trending Score: 23, Likes: 23, Downloads: 244', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/NousResearch/arete-data-pairs', '[{"url":"https://huggingface.co/datasets/NousResearch/arete-data-pairs","text":"NousResearch/arete-data-pairs on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Audio8-ASR-Infinite', 'Edge0', 'Model', 'Audio', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Audio model developed by Edge0.', 'Edge0 automatic speech recognition architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Edge0/Audio8-ASR-Infinite", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Edge0/Audio8-ASR-Infinite")', 'Trending Score: 541, Likes: 605, Downloads: 2,853', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Edge0/Audio8-ASR-Infinite', '[{"url":"https://huggingface.co/Edge0/Audio8-ASR-Infinite","text":"Edge0/Audio8-ASR-Infinite on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Audio8-TTS-Realistic-0.6b', 'Edge0', 'Model', 'Audio', 'Apache-2.0', 2026, '0.6B params', 'Open-weights Audio model developed by Edge0.', 'Edge0 text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Edge0/Audio8-TTS-Realistic-0.6b", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Edge0/Audio8-TTS-Realistic-0.6b")', 'Trending Score: 171, Likes: 174, Downloads: 2,755', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Edge0/Audio8-TTS-Realistic-0.6b', '[{"url":"https://huggingface.co/Edge0/Audio8-TTS-Realistic-0.6b","text":"Edge0/Audio8-TTS-Realistic-0.6b on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Audio8-TTS-Realistic-Air', 'Edge0', 'Model', 'Audio', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Audio model developed by Edge0.', 'Edge0 text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Edge0/Audio8-TTS-Realistic-Air", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Edge0/Audio8-TTS-Realistic-Air")', 'Trending Score: 223, Likes: 241, Downloads: 7,259', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Edge0/Audio8-TTS-Realistic-Air', '[{"url":"https://huggingface.co/Edge0/Audio8-TTS-Realistic-Air","text":"Edge0/Audio8-TTS-Realistic-Air on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('AutoGen v0.4', 'Microsoft', 'Framework', 'MLOps', 'MIT', 2024, 'N/A', 'Microsoft''s redesigned asynchronous event-driven multi-agent framework supporting distributed actor patterns, human intervention, and scalable conversations.', 'Asynchronous actor-based event messaging architecture for agents.', 'from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
agent = AssistantAgent("assistant", OpenAIChatCompletionClient(model="gpt-4o"))', 'Benchmark leader for multi-agent benchmark problem solving (GAIA & SWE-bench).', 'Major API breaking rewrite in v0.4 from legacy v0.2.', 'https://github.com/microsoft/autogen', '[{"url":"https://microsoft.github.io/autogen/","text":"AutoGen v0.4 Architecture"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('AWS Bedrock', 'Amazon Web Services', 'Platform', 'MLOps', 'Proprietary', 2023, 'N/A', 'Amazon''s fully managed service for accessing foundation models from Anthropic, Meta, Mistral, and others via a single API with enterprise security.', 'Managed API gateway for foundation models with AWS IAM, VPC, and CloudWatch integration.', 'import boto3, json
bedrock = boto3.client(''bedrock-runtime'', region_name=''us-east-1'')
body = json.dumps({"prompt": "\n\nHuman: Hi\n\nAssistant:", "max_tokens_to_sample": 300})
response = bedrock.invoke_model(body=body, modelId=''anthropic.claude-v2'')', 'N/A', 'AWS-locked, additional latency vs. direct API, complex IAM setup.', 'https://aws.amazon.com/bedrock/', '[{"url":"https://docs.aws.amazon.com/bedrock/","text":"AWS Bedrock Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Axolotl', 'Open Source', 'Framework', 'MLOps', 'Apache-2.0', 2024, 'N/A', 'Streamlined tool for fine-tuning LLMs with SFT, DPO, KTO, and LoRA across various architectures using simple declarative YAML config files.', 'Modular PyTorch/Deepspeed/FSDP harness for scalable training.', 'accelerate launch -m axolotl.cli.train config.yaml', 'Used to train OpenHermes, Zephyr, and top open-weights community models.', 'Complex multi-node configurations require solid Linux cluster admin experience.', 'https://github.com/axolotl-ai-cloud/axolotl', '[{"url":"https://github.com/axolotl-ai-cloud/axolotl","text":"Axolotl Repository"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Baseten', 'Baseten', 'Platform', 'MLOps', 'Proprietary', 2021, 'Cloud Inference Platform', 'Scalable model inference and serving platform designed for deploying open-source and proprietary foundation models with automated cold-start mitigation, Truss packaging, and dedicated GPUs.', 'High-performance Kubernetes model serving layer coupled with Truss open-source model packaging, fast model caching, and custom GPU autoscaling.', 'import baseten
model = baseten.deployed_model_id("MODEL_ID")
response = model.predict({"prompt": "Analyze this financial statement."})
print(response)', 'Sub-second model cold starts via streaming weights from memory-mapped storage; supports Llama 3, DeepSeek, Whisper, and custom fine-tunes with zero-downtime rollouts.', 'Dedicated GPU hours billed according to hardware tiers (NVIDIA A10G, A100, H100); requires enterprise tier for custom VPC peering.', 'https://www.baseten.co', '[{"url":"https://www.baseten.co","text":"Baseten Official Platform"},{"url":"https://github.com/basetenlabs/truss","text":"Truss Open Source Model Framework by Baseten"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Beam-1.0-501B-A23B', 'Reflection AI', 'Model', 'NLP', 'Apache-2.0', 2026, '501B params', 'Open-weights NLP model developed by Reflection AI.', 'reflection text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("reflection/Beam-1.0-501B-A23B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("reflection/Beam-1.0-501B-A23B")', 'Trending Score: 168, Likes: 170, Downloads: 2,097', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/reflection/Beam-1.0-501B-A23B', '[{"url":"https://huggingface.co/reflection/Beam-1.0-501B-A23B","text":"reflection/Beam-1.0-501B-A23B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('BERT', 'Google DeepMind', 'Model', 'NLP', 'Apache-2.0', 2018, 'Base: 110M params, Large: 340M params', 'Bidirectional Encoder Representations from Transformers for NLP pre-training.', 'Transformer encoder with bidirectional attention, pre-trained with masked language modeling.', 'from transformers import BertTokenizer, BertModel
tokenizer = BertTokenizer.from_pretrained(''bert-base-uncased'')
model = BertModel.from_pretrained(''bert-base-uncased'')', 'GLUE: 80.5% (base), SQuAD: 93.2 F1', 'Limited to 512 tokens, slower than newer models.', 'https://github.com/google-research/bert', '[{"url":"https://arxiv.org/abs/1810.04805","text":"Devlin et al. (2018) - BERT Paper"},{"url":"https://github.com/google-research/bert","text":"Official GitHub Repository"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('BigCodeBench', 'BigCode Project', 'Dataset', 'AI Coding', 'Apache-2.0', 2024, '1,140 Python Programming Problems', 'Rigorous software engineering benchmark evaluating code generation across 1,140 challenging programming problems involving 139 diverse external Python libraries and automated unit testing.', 'Structured programming benchmark suite with ground-truth unit test suites, execution sandbox harnesses, and library dependency isolation.', 'from datasets import load_dataset
ds = load_dataset("bigcode/bigcodebench", split="v0.1.2")
print(ds[0]["task_id"], ds[0]["instruct_prompt"])', 'Evaluates pass@1 under instruction and completion modes across 100+ LLMs; uncovers true library-level software generation deficiencies missed by HumanEval.', 'Requires isolated execution container due to untrusted model code execution spanning diverse external libraries.', 'https://bigcode-bench.github.io', '[{"url":"https://bigcode-bench.github.io","text":"BigCodeBench Leaderboard & Documentation"},{"url":"https://huggingface.co/datasets/bigcode/bigcodebench","text":"BigCodeBench Dataset on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('BlenderWorld', 'Alibaba (Qwen)', 'Dataset', 'Multimodal', 'MIT', 2026, 'n<1K', 'BlenderWorld is the first comprehensive benchmark dedicated to evaluating frontier models on realistic 3D creation tasks. BlenderWorld comprises 223 task.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Qwen/BlenderWorld")', 'Trending Score: 19, Likes: 19, Downloads: 614', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Qwen/BlenderWorld', '[{"url":"https://huggingface.co/datasets/Qwen/BlenderWorld","text":"Qwen/BlenderWorld on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Bolt.new', 'StackBlitz', 'AI', 'AI Coding', 'Proprietary', 2024, 'N/A', 'A browser-based AI full-stack development environment by StackBlitz that lets users prompt, run, edit, and deploy complete web applications without any local setup.', 'Web Application (Powered by Claude and other LLMs with WebContainers runtime)', 'Visit bolt.new and describe the app you want to build; it generates and runs the code instantly.', 'N/A', 'Free tier has prompt/token limits; complex apps may require significant manual debugging.', 'https://bolt.new', '[{"url":"https://bolt.new","text":"Bolt.new"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('cai', 'Alias Robotics', 'Framework', 'NLP', 'Open Source', 2026, '153MB Repo', 'Cybersecurity AI (CAI), the framework for AI Security.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/aliasrobotics/cai
cd cai
pip install -e .', 'GitHub Stars: 9,822, Forks: 1,451', 'Requires local Python environment and dependency configuration.', 'https://github.com/aliasrobotics/cai', '[{"url":"https://github.com/aliasrobotics/cai","text":"aliasrobotics/cai on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Canva AI', 'Canva', 'AI', 'Image Generation', 'Proprietary', 2023, 'N/A', 'A suite of AI-powered design tools inside Canva, including Magic Write for text generation, Magic Media for image creation, and one-click background removal.', 'Web Application (Integrates Stable Diffusion, proprietary models, and third-party LLMs)', 'Access at canva.com; AI tools are available within the design editor for all account types.', 'N/A', 'Advanced AI features require a Canva Pro subscription; image generation credits are limited.', 'https://www.canva.com/ai-image-generator', '[{"url":"https://www.canva.com/magic-studio/","text":"Canva Magic Studio"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Carbon-X', 'Hugging Face', 'Model', 'Research', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Research model developed by Hugging Face.', 'HuggingFaceBio text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("HuggingFaceBio/Carbon-X", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("HuggingFaceBio/Carbon-X")', 'Trending Score: 159, Likes: 164, Downloads: 807', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/HuggingFaceBio/Carbon-X', '[{"url":"https://huggingface.co/HuggingFaceBio/Carbon-X","text":"HuggingFaceBio/Carbon-X on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Cerebras Cloud', 'Cerebras Systems', 'Platform', 'MLOps', 'Proprietary', 2024, 'Wafer-scale engine', 'Wafer-Scale AI compute platform powered by CS-3 systems, delivering up to 2,000 tokens per second for Llama 3 models.', 'WSE-3 single-die wafer processor with 900,000 AI cores and 44GB on-chip SRAM.', 'from cerebras.cloud.sdk import Cerebras
client = Cerebras(api_key="CEREBRAS_API_KEY")
response = client.chat.completions.create(model="llama3.1-70b", messages=[{"role": "user", "content": "Fast code review."}])', '2,100 tokens/sec on Llama 3.1 8B, 450 tokens/sec on 70B.', 'Proprietary wafer hardware; limited custom model import options.', 'https://cerebras.ai', '[{"url":"https://cerebras.ai/inference","text":"Cerebras Inference"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Character.ai', 'Character Technologies', 'AI', 'NLP', 'Proprietary', 2022, 'N/A', 'A neural language model chatbot web application that can generate human-like text responses and participate in contextual conversation, often used for roleplay.', 'Web Application / Chatbot (Custom LLMs)', 'Visit character.ai to chat with community-created characters.', 'N/A', 'Highly filtered, mainly focused on entertainment rather than factual accuracy.', 'https://character.ai', '[{"url":"https://character.ai","text":"Character.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ChartNet', 'IBM', 'Dataset', 'Computer Vision', 'CDLA-Permissive-2.0', 2026, '10M<n<100M', 'ChartNet: A Million-Scale Multimodal Dataset for Chart Understanding ChartNet introduce.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("ibm-granite/ChartNet")', 'Trending Score: 17, Likes: 68, Downloads: 18,197', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/ibm-granite/ChartNet', '[{"url":"https://huggingface.co/datasets/ibm-granite/ChartNet","text":"ibm-granite/ChartNet on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ChatGPT', 'OpenAI', 'AI', 'NLP', 'Proprietary', 2022, 'N/A', 'An advanced AI assistant by OpenAI, utilizing the GPT-4 family of models to converse, write code, and assist with a wide range of tasks.', 'Web Application / Conversational Agent (Powered by GPT-4/GPT-4o)', 'Visit chatgpt.com to interact via the web interface.', 'N/A (See underlying models like GPT-4o)', 'May hallucinate, knowledge cutoff depends on the model version.', 'https://chatgpt.com', '[{"url":"https://openai.com/blog/chatgpt","text":"ChatGPT Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('chess-position-evaluations', 'Lichess', 'Dataset', 'Research', 'CC0-1.0', 2026, '1B<n<10B', 'Open dataset of millions of chess board positions annotated with deep Stockfish engine evaluations by Lichess.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Lichess/chess-position-evaluations")', 'Trending Score: 16, Likes: 55, Downloads: 5,114', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Lichess/chess-position-evaluations', '[{"url":"https://huggingface.co/datasets/Lichess/chess-position-evaluations","text":"Lichess/chess-position-evaluations on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude', 'Anthropic', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Anthropic''s AI assistant, known for its high capabilities in coding, writing, and logical reasoning, and featuring a large context window.', 'Web Application / Conversational Agent (Powered by Claude 3/3.5 Family)', 'Visit claude.ai to interact via the web interface.', 'N/A (See underlying models like Claude 3.5 Sonnet)', 'May refuse prompts due to strict safety filters.', 'https://claude.ai', '[{"url":"https://www.anthropic.com/claude","text":"Claude Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude 3 Haiku', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2024, 'N/A', 'Anthropic''s fastest and most compact model for near-instant responsiveness, ideal for quick queries and high-volume tasks.', 'Transformer-based LLM optimized for speed.', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-3-haiku-20240307",
  max_tokens=1000,
  messages=[{"role": "user", "content": "Summarize this quickly."}]
)', 'MMLU: 75.2%, HumanEval: 75.9%', 'Lacks the deep reasoning capabilities of Sonnet and Opus.', 'https://www.anthropic.com/claude', '[{"url":"https://www.anthropic.com/news/claude-3-family","text":"Claude 3 Model Card"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude 3 Opus', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2024, 'N/A', 'Anthropic''s most powerful model for complex analysis, long documents, and nuanced reasoning tasks requiring deep comprehension.', 'Transformer-based LLM with Constitutional AI and RLHF training.', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-3-opus-20240229",
  max_tokens=2048,
  messages=[{"role": "user", "content": "Analyze this research paper."}]
)', 'MMLU: 86.8%, GPQA: 50.4%', 'Slower and more expensive than Sonnet, proprietary API.', 'https://www.anthropic.com/claude', '[{"url":"https://www.anthropic.com/news/claude-3-family","text":"Claude 3 Model Card"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude 3.5 Haiku', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2024, 'N/A', 'Anthropic''s fastest language model, matching original Claude 3 Opus capabilities at blazing speed and lower operational cost.', 'Compact distilled Transformer with Constitutional AI alignment.', 'import anthropic
client = anthropic.Anthropic()
response = client.messages.create(
  model="claude-3-5-haiku-20241022",
  max_tokens=1024,
  messages=[{"role": "user", "content": "Extract entities from this invoice."}]
)', 'MMLU: 80.9%, HumanEval: 75.9%, GPQA: 41.6%', 'Less suited for open-ended multi-page deep thesis analysis.', 'https://www.anthropic.com/claude', '[{"url":"https://www.anthropic.com/news/claude-3-5-haiku","text":"Claude 3.5 Haiku Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude 3.5 Sonnet', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2024, 'N/A', 'Anthropic''s highly capable and exceptionally fast language model, known for advanced coding abilities, nuanced reasoning, and the interactive ''Artifacts'' UI.', 'Transformer-based LLM with Constitutional AI training.', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-3-5-sonnet-20240620",
  max_tokens=1000,
  messages=[{"role": "user", "content": "Write a React component."}]
)', 'MMLU: 88.3%, HumanEval: 92.0%', 'Proprietary API, strict safety filters can sometimes refuse benign prompts.', 'https://www.anthropic.com/claude', '[{"url":"https://www.anthropic.com/news/claude-3-5-sonnet","text":"Claude 3.5 Sonnet Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude 3.7 Sonnet', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2025, 'N/A', 'Anthropic''s hybrid reasoning frontier model that dynamically switches between near-instant conversational responses and deep extended step-by-step thinking.', 'Transformer-based multimodal foundation model with controllable thinking budget tokens.', 'import anthropic
client = anthropic.Anthropic()
response = client.messages.create(
  model="claude-3-7-sonnet-20250219",
  max_tokens=4096,
  thinking={"type": "enabled", "budget_tokens": 2048},
  messages=[{"role": "user", "content": "Analyze complex architecture vulnerabilities."}]
)', 'SWE-bench Verified: 70.3%, GPQA Diamond: 65.2%, TAU-bench: 81.2%', 'Extended reasoning uses token budget; proprietary API pricing.', 'https://www.anthropic.com/claude', '[{"url":"https://www.anthropic.com/news/claude-3-7-sonnet","text":"Claude 3.7 Sonnet Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable', 'Anthropic', 'Model', 'AI Coding', 'Proprietary', 2026, 'Mythos-Class Architecture', 'Anthropic''s flagship Mythos-class generative AI model engineered for long-running agentic projects, multi-application computer use, and root-cause software engineering with frontier safety classifiers.', 'Constitutional AI foundation model sharing core weights with Claude Mythos, augmented with high-assurance safety classifiers and deep multi-step reflective reasoning.', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-fable-5-1",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Analyze root causes for distributed consensus race conditions across 100k nodes."}]
)', 'SWE-bench Verified: 80.9%, TAU-bench: 78.4%, Math-500: 95.2%, 1M token context window', 'Proprietary cloud API via Anthropic Console, AWS Bedrock, and Google Cloud Vertex AI.', 'https://anthropic.com/claude', '[{"url":"https://anthropic.com","text":"Anthropic Claude Fable Overview"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable 5', 'Anthropic', 'Model', 'NLP', 'Proprietary / Commercial', 2026, 'N/A', 'Claude Fable 5 is Anthropic''s most intelligent, generally available "Mythos-class" model released in June 2026. It is designed for long-horizon autonomy, complex reasoning, and professional knowledge work. It has a massive 1 million token context window and up to 128k output tokens per request. Fable 5 excels at agentic workflows, self-verification, and sustained multi-day execution. Notably, it comes with built-in proactive safeguards; if asked a sensitive prompt (e.g., cybersecurity or bio-chem), it automatically falls back to Claude Opus 4.8. (Access to Fable 5 was briefly disrupted days after launch due to US government export-control directives).', 'Proprietary Transformer / Large Language Model. Mythos-class architecture built for sustained asynchronous execution, sub-agent orchestration, and advanced vision capabilities.', 'import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-fable-5",
    max_tokens=128000,
    temperature=1.0,
    messages=[
        {"role": "user", "content": "Analyze this codebase, identify any vulnerabilities, and rewrite the flawed modules with self-verifying test cases."}
    ]
)
print(message.content)', 'Specific benchmarks aren''t detailed in the snippets besides being "state-of-the-art on nearly all tested benchmarks" and having an OpenRouter Intelligence Index of 64.9 (#1) and Coding Index of 62.0.', 'Premium pricing ($10/1M input, $50/1M output), 30-day mandatory data retention on Bedrock, heavy built-in safeguards that fall back to Opus 4.8 for sensitive topics, recently subject to US government export controls restricting foreign national access.', 'https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5', '[]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable 5.1', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Anthropic''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 47, Briefcase Elo of 1577, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (57 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-fable-5-1-high-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 47, Briefcase Elo: 1577, Accuracy: 65%, Non-Hallucination: 30%, FrontierCode: 30%, AutomationBench: 55%, TerminalBench 4: 52%, HLE Diamond: 50%, Speed: 57 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($10/M in, $50/M out).', 'https://artificialanalysis.ai/models/claude-fable-5-1-high', '[{"url":"https://artificialanalysis.ai/models/claude-fable-5-1-high","text":"Claude Fable 5.1 (high with fallback) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/claude-fable-5-1-high/providers","text":"Claude Fable 5.1 (high with fallback) Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Fable 5.2', 'Anthropic', 'Model', 'Research', 'Proprietary', 2026, '1000k Context · Proprietary Model', 'Claude Fable 5.2 is Anthropic''s most capable model for the most demanding technical work, with gains over Fable 5.1 in coding, reasoning, and vision. In prerelease testing it compl.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/claude-fable-5-2', 'Context Window: 1000k Context, Intelligence Index: 56.4, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/claude-fable-5-2', '[{"url":"https://artificialanalysis.ai/models/claude-fable-5-2","text":"Claude Fable 5.2 on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/claude-fable-5-2/providers","text":"Claude Fable 5.2 Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Haiku 5.5', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Anthropic''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 30, Briefcase Elo of 1441, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (173 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-haiku-5-5-high",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 30, Briefcase Elo: 1441, Accuracy: 32%, Non-Hallucination: 61%, FrontierCode: 23%, AutomationBench: 34%, TerminalBench 4: 22%, HLE Diamond: 24%, Speed: 173 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($0.1/M in, $0.5/M out).', 'https://artificialanalysis.ai/models/claude-haiku-5-5-high', '[{"url":"https://artificialanalysis.ai/models/claude-haiku-5-5-high","text":"Claude Haiku 5.5 (high) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/claude-haiku-5-5-high/providers","text":"Claude Haiku 5.5 (high) Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Opus 5.5', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Anthropic''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 52, Briefcase Elo of 1682, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (80 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-opus-5-5-high-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 52, Briefcase Elo: 1682, Accuracy: 65%, Non-Hallucination: 36%, FrontierCode: 36%, AutomationBench: 63%, TerminalBench 4: 57%, HLE Diamond: 56%, Speed: 80 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($4/M in, $20/M out).', 'https://artificialanalysis.ai/models/claude-opus-5-5-high', '[{"url":"https://artificialanalysis.ai/models/claude-opus-5-5-high","text":"Claude Opus 5.5 (high with fallback) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/claude-opus-5-5-high/providers","text":"Claude Opus 5.5 (high with fallback) Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Claude Sonnet 5.5', 'Anthropic', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Anthropic''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 41, Briefcase Elo of 1635, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by Anthropic, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (103 tok/s).', 'import anthropic
client = anthropic.Anthropic()
message = client.messages.create(
  model="claude-sonnet-5-5-high-with-fallback",
  max_tokens=8192,
  messages=[{"role": "user", "content": "Solve multi-step frontier challenge with fallback."}]
)', 'Intelligence Index: 41, Briefcase Elo: 1635, Accuracy: 50%, Non-Hallucination: 36%, FrontierCode: 26%, AutomationBench: 59%, TerminalBench 4: 44%, HLE Diamond: 34%, Speed: 103 tok/s, Context Window: 1M', 'Proprietary cloud API access via Anthropic developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/claude-sonnet-5-5-high', '[{"url":"https://artificialanalysis.ai/models/claude-sonnet-5-5-high","text":"Claude Sonnet 5.5 (high with fallback) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/claude-sonnet-5-5-high/providers","text":"Claude Sonnet 5.5 (high with fallback) Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('clef', 'Cloudflare', 'Model', 'Multimodal', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Multimodal model developed by Cloudflare.', 'Cloudflare image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Cloudflare/clef", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Cloudflare/clef")', 'Trending Score: 365, Likes: 368, Downloads: 18', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Cloudflare/clef', '[{"url":"https://huggingface.co/Cloudflare/clef","text":"Cloudflare/clef on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('clef-flash', 'Cloudflare', 'Model', 'Multimodal', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Multimodal model developed by Cloudflare.', 'Cloudflare image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Cloudflare/clef-flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Cloudflare/clef-flash")', 'Trending Score: 354, Likes: 365, Downloads: 4,310', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Cloudflare/clef-flash', '[{"url":"https://huggingface.co/Cloudflare/clef-flash","text":"Cloudflare/clef-flash on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Cline', 'Cline', 'AI', 'AI Coding', 'Apache-2.0', 2024, 'VS Code Extension', 'Autonomous open-source AI coding assistant extension for VS Code that can create and edit files, execute terminal commands, analyze errors, and perform browser testing with user approval at each step.', 'Agentic control loop integrating Model Context Protocol (MCP), terminal shell hooks, diff editor integration, and Puppeteer browser automation.', 'Install the Cline extension in VS Code. Configure your OpenRouter, Anthropic, or Ollama API key and prompt Cline in the sidebar: "Refactor the auth middleware and run unit tests."', 'Over 500,000 active VS Code installations; supports custom MCP servers, full codebase file trees, and human-in-the-loop permission checkpoints.', 'Autonomous actions require careful user oversight when executing destructive terminal commands or large-scale file edits.', 'https://github.com/cline/cline', '[{"url":"https://github.com/cline/cline","text":"Cline GitHub Repository"},{"url":"https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev","text":"Cline on Visual Studio Marketplace"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CLIP', 'OpenAI', 'Model', 'Computer Vision', 'MIT', 2021, 'ViT-L/14: 428M params', 'Contrastive Language-Image Pre-training for zero-shot image classification.', 'Dual encoder with vision transformer and text transformer trained contrastively.', 'import clip
model, preprocess = clip.load("ViT-B/32")
image = preprocess(image).unsqueeze(0)
text = clip.tokenize(["a cat", "a dog"])', 'Zero-shot ImageNet: 76.2% top-1', 'Struggles with fine-grained classification, abstract concepts.', 'https://github.com/openai/CLIP', '[{"url":"https://arxiv.org/abs/2103.00020","text":"Radford et al. (2021) - CLIP Paper"},{"url":"https://github.com/openai/CLIP","text":"Official CLIP Repository"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CLM-v0.1-8B', 'Contrastive-LM', 'Model', 'NLP', 'Apache-2.0', 2026, '8B params', 'Open-weights NLP model developed by Contrastive-LM.', 'Contrastive-LM text ranking architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Contrastive-LM/CLM-v0.1-8B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Contrastive-LM/CLM-v0.1-8B")', 'Trending Score: 522, Likes: 531, Downloads: 1,910', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Contrastive-LM/CLM-v0.1-8B', '[{"url":"https://huggingface.co/Contrastive-LM/CLM-v0.1-8B","text":"Contrastive-LM/CLM-v0.1-8B on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Clover-35B-A3B-Preview', 'Diffuspace', 'Model', 'NLP', 'Apache-2.0', 2026, '35B params', 'Open-weights NLP model developed by Diffuspace.', 'Diffuspace text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Diffuspace/Clover-35B-A3B-Preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Diffuspace/Clover-35B-A3B-Preview")', 'Trending Score: 181, Likes: 184, Downloads: 2,021', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Diffuspace/Clover-35B-A3B-Preview', '[{"url":"https://huggingface.co/Diffuspace/Clover-35B-A3B-Preview","text":"Diffuspace/Clover-35B-A3B-Preview on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Code Llama', 'Meta AI', 'Model', 'AI Coding', 'Llama 2 Community License', 2023, '7B to 70B params', 'Meta''s family of open-source code-specialized models (7B–70B) built on Llama 2, supporting code generation, infilling, and instruction-following for 100+ programming languages.', 'Llama 2 fine-tuned on 500B code tokens, with infilling and long-context capability.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("meta-llama/CodeLlama-34b-Instruct-hf")
model = AutoModelForCausalLM.from_pretrained("meta-llama/CodeLlama-34b-Instruct-hf")', 'HumanEval: 53.7% (34B), pass@1', 'Commercial use constraints from Llama 2 license.', 'https://ai.meta.com/blog/code-llama-large-language-model-coding/', '[{"url":"https://arxiv.org/abs/2308.12950","text":"Code Llama Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Code-Reasoning', 'Institute of Foundation Models', 'Dataset', 'AI Coding', 'Apache-2.0', 2026, '100M<n<1B', 'Code-Reasoning Dataset Description Code problem-solving data with reasoning, direct-answer, and task-synthesis subsets. This repository is part of the K2.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("IFM/Code-Reasoning")', 'Trending Score: 33, Likes: 46, Downloads: 24,363', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/IFM/Code-Reasoning', '[{"url":"https://huggingface.co/datasets/IFM/Code-Reasoning","text":"IFM/Code-Reasoning on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Codestral 22B', 'Mistral AI', 'Model', 'AI Coding', 'Mistral Non-Production License', 2024, '22B params', 'Mistral AI''s code generation model tailored for fill-in-the-middle (FIM), code completion, unit test drafting, and repository navigation across 80+ languages.', 'Dense autoregressive model with 32k context and bidirectional FIM tokens.', 'from mistralai import Mistral
client = Mistral(api_key="API_KEY")
response = client.fim.complete(
  model="codestral-latest",
  prompt="def calculate_fibonacci(n):",
  suffix="return result"
)', 'HumanEval: 81.1%, MBPP: 78.2%, Spider: 67.5%', 'Non-commercial license for direct weights use unless licensed via Mistral API.', 'https://mistral.ai/news/codestral/', '[{"url":"https://mistral.ai/news/codestral/","text":"Codestral Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CodeVideoBench', 'CodeVideoBench', 'Dataset', 'Computer Vision', 'Open Data', 2026, 'n<1K', 'CodeVideoBench provides 22 video cases across eight applications for code-guided video generation. Each case includes a Three.js code video, a referenc.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("code-video-model/CodeVideoBench")', 'Trending Score: 19, Likes: 21, Downloads: 2,176', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/code-video-model/CodeVideoBench', '[{"url":"https://huggingface.co/datasets/code-video-model/CodeVideoBench","text":"code-video-model/CodeVideoBench on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Codex', 'OpenAI', 'Model', 'AI Coding', 'Proprietary', 2021, '12B params', 'OpenAI''s code-specialized GPT model that powers GitHub Copilot, fine-tuned on billions of lines of public code.', 'GPT-3 fine-tuned on 159GB of GitHub code across 54 programming languages.', '# Codex is accessed via the OpenAI Completions API (deprecated in favor of GPT-4)
from openai import OpenAI
client = OpenAI()
response = client.completions.create(
  model="code-davinci-002",
  prompt="# Python function to sort a list\ndef sort_list(",
  max_tokens=100
)', 'HumanEval: 72% pass@100', 'Deprecated — succeeded by GPT-4, can generate insecure code.', 'https://openai.com/blog/openai-codex', '[{"url":"https://arxiv.org/abs/2107.03374","text":"Chen et al. (2021) - Codex Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CogVideoX-5B', 'Zhipu AI (THUDM)', 'Model', 'Video Generation', 'Apache-2.0', 2024, '5B params', 'Open-source text-to-video foundation model from THUDM featuring 3D causal VAE and Expert Transformer blocks for 6-second video generation.', '3D Causal Convolutional VAE + Diffusion Transformer (DiT).', 'from diffusers import CogVideoXPipeline
pipe = CogVideoXPipeline.from_pretrained("THUDM/CogVideoX-5b", torch_dtype=torch.bfloat16)
video = pipe(prompt="A golden retriever swimming in a crystal clear lake").frames[0]', 'VBench dynamic degree: 82.7%, Motion smoothness: 84.1%', 'High memory utilization during spatial-temporal latent decompression.', 'https://github.com/THUDM/CogVideo', '[{"url":"https://arxiv.org/abs/2408.06072","text":"CogVideoX Paper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Cohere Coral', 'Cohere', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'An enterprise-focused conversational AI assistant by Cohere, designed for business use cases like search, summarization, and knowledge retrieval.', 'Web Application / Conversational Agent (Powered by Command R+ models)', 'Visit coral.cohere.com to interact via the web interface.', 'N/A', 'Primarily optimized for enterprise workflows; less suited for casual general-purpose use.', 'https://coral.cohere.com', '[{"url":"https://coral.cohere.com","text":"Cohere Coral"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Command A+', 'Cohere', 'Model', 'Research', 'Open Weights', 2026, '192k Context · Open Model', 'Frontier Research model by Cohere benchmarked on Artificial Analysis with an Intelligence Index of 6.2 and a verified 192k Context window.', 'Open-weights frontier neural architecture developed by Cohere, featuring native 192k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/command-a-plus', 'Context Window: 192k Context, Intelligence Index: 6.2, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/command-a-plus', '[{"url":"https://artificialanalysis.ai/models/command-a-plus","text":"Command A+ on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/command-a-plus/providers","text":"Command A+ Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Command R+', 'Cohere', 'Model', 'NLP', 'Proprietary', 2024, '104B params', 'Cohere''s enterprise-grade LLM optimized for RAG (Retrieval-Augmented Generation) and tool use, with strong multilingual support across 10 languages.', 'Transformer with specialized grounded generation training for RAG workflows.', 'import cohere
co = cohere.Client("YOUR_API_KEY")
response = co.chat(
  model="command-r-plus",
  message="What are the latest trends in AI?",
  documents=[{"text": "...your documents here..."}]
)', 'MMLU: 75.7%, strong RAG and tool use performance', 'Proprietary, optimized for enterprise RAG — may underperform on general chat.', 'https://cohere.com/command', '[{"url":"https://cohere.com/blog/command-r-plus-microsoft-azure","text":"Command R+ Announcement"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Common Crawl', 'Common Crawl', 'Dataset', 'NLP', 'Public Domain (Terms of Use apply)', 2008, '3+ billion web pages, ~1PB compressed', 'A massive open repository of web crawl data containing petabytes of raw text used as the primary pre-training corpus for most modern LLMs.', 'WARC/WET file format of crawled web content across decades.', '# Access via AWS S3 public dataset
import boto3
s3 = boto3.client(''s3'', region_name=''us-east-1'')
# Browse at s3://commoncrawl/
response = s3.list_objects_v2(Bucket=''commoncrawl'', Prefix=''crawl-data/CC-MAIN-2024-10/'')', 'Used to train GPT-3, LLaMA, Falcon, and virtually all frontier models', 'Requires extensive filtering (toxic content, duplicates, low quality) before use.', 'https://commoncrawl.org/', '[{"url":"https://commoncrawl.org/","text":"Common Crawl Official Site"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Consensus', 'Consensus', 'AI', 'Research', 'Proprietary', 2022, 'N/A', 'An AI-powered academic search engine that finds and synthesizes evidence from peer-reviewed research papers to answer scientific and factual questions.', 'Web Application (Semantic search over 200M+ academic papers with LLM synthesis layer)', 'Visit consensus.app, ask a research question, and get answers backed by peer-reviewed citations.', 'N/A', 'Limited to published academic research; GPT-4 powered summaries require a premium plan.', 'https://consensus.app', '[{"url":"https://consensus.app","text":"Consensus"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Continue', 'Continue', 'AI', 'AI Coding', 'Apache-2.0', 2023, 'VS Code & JetBrains Extension', 'Open-source AI code assistant extension for VS Code and JetBrains, connecting any commercial or local model to your IDE for tab autocomplete, in-line code generation, and custom context providers.', 'TypeScript/Python IDE extension supporting custom @-context providers, Model Context Protocol (MCP), and local inference engines (Ollama, LM Studio).', 'Install Continue from the VS Code Marketplace. Press Cmd/Ctrl+I for inline edits or Cmd/Ctrl+L to chat with your codebase using local Ollama or cloud models.', 'Over 20,000 GitHub stars; supports fully offline air-gapped deployments with local LLMs and enterprise telemetry controls.', 'Autocomplete speed depends heavily on local GPU hardware when running local models; custom slash commands require config.json setup.', 'https://github.com/continuedev/continue', '[{"url":"https://github.com/continuedev/continue","text":"Continue GitHub Repository"},{"url":"https://docs.continue.dev/","text":"Continue Official Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Copilot for Microsoft 365', 'Microsoft', 'AI', 'Productivity', 'Proprietary', 2023, 'N/A', 'Microsoft''s AI assistant embedded in Word, Excel, PowerPoint, Outlook, and Teams, helping users draft, summarize, and analyze within their daily M365 workflow.', 'SaaS Integration (Powered by GPT-4 with Microsoft Graph data grounding)', 'Requires a Microsoft 365 subscription with a Copilot add-on; accessible within all M365 apps.', 'N/A', 'Expensive add-on ($30/user/month); quality depends heavily on organizational data quality.', 'https://www.microsoft.com/en-us/microsoft-365/copilot', '[{"url":"https://blogs.microsoft.com/blog/2023/03/16/introducing-microsoft-365-copilot-your-copilot-for-work/","text":"Microsoft 365 Copilot"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Copy.ai', 'Copy.ai', 'AI', 'Productivity', 'Proprietary', 2020, 'N/A', 'An AI-powered copywriting tool that generates marketing copy, product descriptions, email sequences, social media posts, and more from short prompts.', 'Web Application (Powered by GPT-4 with marketing-specific workflows and templates)', 'Visit copy.ai, select a content type template, enter your product info, and generate copy.', 'N/A', 'Outputs often require editing; free tier limits monthly word count.', 'https://www.copy.ai', '[{"url":"https://www.copy.ai","text":"Copy.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Cosmopedia', 'Hugging Face', 'Dataset', 'NLP', 'Apache-2.0', 2024, '25 Billion tokens', 'Largest synthetic dataset to date, containing over 30 million files and 25 billion tokens of synthetic textbooks, blog posts, and courseware generated by Mixtral.', 'Synthetic curriculum generated with prompt engineering over Web of Science and Wikipedia topics.', 'from datasets import load_dataset
ds = load_dataset("HuggingFaceTB/cosmopedia", split="train", streaming=True)', 'Used to train SmolLM and high-density knowledge small models.', 'Synthetic data contains stylistic generation quirks if unfiltered.', 'https://huggingface.co/datasets/HuggingFaceTB/cosmopedia', '[{"url":"https://huggingface.co/blog/cosmopedia","text":"Cosmopedia Blog"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CrewAI', 'CrewAI', 'Framework', 'Productivity', 'MIT', 2024, 'N/A', 'Production-ready framework for orchestrating role-playing autonomous AI agents that collaborate seamlessly to solve complex tasks.', 'Role-based agent abstraction with task delegation and hierarchical memory.', 'from crewai import Agent, Task, Crew
researcher = Agent(role=''Researcher'', goal=''Investigate tech trends'', memory=True)
task = Task(description=''Summarize 2025 AI models'', expected_output=''Bullet summary'', agent=researcher)
crew = Crew(agents=[researcher], tasks=[task])
crew.kickoff()', 'Over 25,000 GitHub stars; widely used in enterprise workflow automation.', 'Iterative agent loops can quickly trigger API rate limits without rate limiting.', 'https://github.com/crewAIInc/crewAI', '[{"url":"https://docs.crewai.com","text":"CrewAI Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('CulturalRiddles', 'Cohere', 'Dataset', 'NLP', 'Open Data', 2026, '100K<n<1M', 'Multilingual benchmark dataset by Cohere evaluating cultural idioms, common sense, and culturally grounded riddles.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("CohereLabsCommunity/CulturalRiddles")', 'Trending Score: 20, Likes: 21, Downloads: 248', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/CohereLabsCommunity/CulturalRiddles', '[{"url":"https://huggingface.co/datasets/CohereLabsCommunity/CulturalRiddles","text":"CohereLabsCommunity/CulturalRiddles on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Cursor', 'Cursor (Anysphere)', 'AI', 'AI Coding', 'Proprietary', 2023, 'N/A', 'An AI-first code editor forked from VS Code, deeply integrating LLMs for inline code generation, multi-file edits, and natural language codebase chat.', 'IDE Application (VS Code fork integrating GPT-4, Claude, and custom models)', 'Download and install from cursor.com; works as a drop-in VS Code replacement.', 'N/A', 'Paid subscription for full AI features; privacy concerns around sending code to external APIs.', 'https://cursor.com', '[{"url":"https://cursor.com","text":"Cursor"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('d3', 'vLLM-SR', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by vLLM-SR.', 'vllm-sr zero shot classification architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("vllm-sr/d3", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("vllm-sr/d3")', 'Trending Score: 212, Likes: 229, Downloads: 4,263', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/vllm-sr/d3', '[{"url":"https://huggingface.co/vllm-sr/d3","text":"vllm-sr/d3 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Daimon-Infinity', 'Daimon Robotics', 'Dataset', 'Multimodal', 'CC-BY-NC-SA-4.0', 2026, 'Curated Dataset', 'Large-scale omni-modal robotics dataset featuring synchronized vision and high-resolution tactile sensing for physical AI.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("daimonrobotics/Daimon-Infinity")', 'Trending Score: 18, Likes: 37, Downloads: 13,384', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/daimonrobotics/Daimon-Infinity', '[{"url":"https://huggingface.co/datasets/daimonrobotics/Daimon-Infinity","text":"daimonrobotics/Daimon-Infinity on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DaisyRose-27B', 'RadixArk', 'Model', 'Multimodal', 'Apache-2.0', 2026, '27B params', 'DaisyRose 27B is an open-weight multimodal reasoning model from RadixArk, trained from Qwen3.8 27B using reinforcement learning only on lo.', 'RadixArk image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("RadixArk/DaisyRose-27B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("RadixArk/DaisyRose-27B")', 'Context Window: 262k Context, Available across global OpenRouter inference nodes.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/RadixArk/DaisyRose-27B', '[{"url":"https://huggingface.co/RadixArk/DaisyRose-27B","text":"RadixArk/DaisyRose-27B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DALL-E 2', 'OpenAI', 'Model', 'Image Generation', 'Proprietary', 2022, 'Unknown (3.5B params)', 'OpenAI''s second-generation image model introducing inpainting, outpainting, and variations from text and image inputs.', 'CLIP-guided hierarchical diffusion model with GLIDE as prior.', 'from openai import OpenAI
client = OpenAI()
response = client.images.generate(
  model="dall-e-2",
  prompt="A surrealist painting of a robot reading a book",
  n=1,
  size="1024x1024"
)', 'FID: 10.39 on COCO', 'Superseded by DALL-E 3, limited prompt comprehension vs. newer models.', 'https://openai.com/dall-e-2', '[{"url":"https://arxiv.org/abs/2204.06125","text":"Hierarchical Text-Conditional Image Generation Paper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DALL-E 3', 'OpenAI', 'Model', 'Image Generation', 'Proprietary', 2023, 'N/A', 'OpenAI''s third-generation text-to-image model with dramatically improved prompt adherence, integrated directly into ChatGPT.', 'Diffusion model with improved text conditioning via a recaptioning technique.', 'from openai import OpenAI
client = OpenAI()
response = client.images.generate(
  model="dall-e-3",
  prompt="A cozy cabin in a snowy forest at night, cinematic lighting",
  size="1024x1024",
  quality="hd"
)', 'Human preference significantly higher than DALL-E 2, SD, and Midjourney v5', 'Proprietary, no local inference, usage policy restrictions.', 'https://openai.com/dall-e-3', '[{"url":"https://openai.com/research/dall-e-3","text":"DALL-E 3 Technical Report"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DCLM-Baseline', 'DataComp-LM Consortium', 'Dataset', 'NLP', 'ODC-By 1.0', 2024, '3.8 Trillion Tokens · 240B Web Documents', '3.8-trillion token open pretraining dataset produced by the DataComp for Language Models (DCLM) benchmark, demonstrating that systematic model-based data curation outperforms legacy web datasets like RefinedWeb.', 'Common Crawl raw web extraction filtered through resampled fastText quality classifiers and page-level deduplication pipelines.', 'from datasets import load_dataset
ds = load_dataset("apple/DCLM-baseline", streaming=True)
sample = next(iter(ds["train"]))
print(sample["text"][:200])', 'Models trained on DCLM-Baseline achieve 64.2% 5-shot MMLU at the 7B scale, setting state-of-the-art open pretraining data efficiency standards.', 'Very large download volume (multi-terabyte compressed); streaming mode or high-bandwidth cluster storage required for consumption.', 'https://datacomp.ai/dclm', '[{"url":"https://datacomp.ai/dclm","text":"DataComp for Language Models Official Website"},{"url":"https://huggingface.co/datasets/apple/DCLM-baseline","text":"DCLM-Baseline on Hugging Face Datasets"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepInfra', 'DeepInfra', 'Platform', 'MLOps', 'Proprietary', 2023, 'Cloud API', 'Serverless pay-per-token API platform for hosting open-source LLMs, embeddings, speech-to-text, and image generation models at scale.', 'Elastic GPU cluster with automatic scale-to-zero serverless endpoints.', 'import openai
client = openai.OpenAI(api_key="DEEPINFRA_KEY", base_url="https://api.deepinfra.com/v1/openai")
res = client.chat.completions.create(model="meta-llama/Llama-3.3-70B-Instruct", messages=[...])', 'Low cost per million tokens with sub-200ms latency.', 'Proprietary cloud orchestration.', 'https://deepinfra.com', '[{"url":"https://deepinfra.com","text":"DeepInfra"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek Chat', 'DeepSeek AI', 'AI', 'NLP', 'Proprietary / DeepSeek License', 2023, 'N/A', 'An intelligent AI assistant by DeepSeek, highly capable in coding, math, and logical reasoning, powered by efficient open-weight models.', 'Web Application / Conversational Agent (Powered by DeepSeek-V2 / DeepSeek Coder)', 'Visit chat.deepseek.com to interact.', 'N/A', 'May struggle with some niche topics compared to ChatGPT or Claude.', 'https://chat.deepseek.com', '[{"url":"https://chat.deepseek.com","text":"DeepSeek Chat"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek V4 Flash Vision', 'DeepSeek AI', 'Model', 'Multimodal', 'Proprietary', 2026, '1M Context · Proprietary Model', 'DeepSeek AI''s frontier multimodal model featured on the Artificial Analysis leaderboard with an Intelligence Index of N/A, Briefcase Elo of 1420, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by DeepSeek AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (40 tok/s).', 'import requests

response = requests.post(
  "https://api.deepseekai.com/v1/chat/completions",
  json={"model": "deepseek-v4-flash-vision-max", "messages": [{"role": "user", "content": "Benchmark query"}]}
)', 'Briefcase Elo: 1420, AutomationBench: 47%, TerminalBench 4: 12%, HLE Diamond: 21%, Speed: 40 tok/s, Context Window: 1M', 'Proprietary cloud API access via DeepSeek AI developer platform; subject to API rate limits and token pricing ($1.32/M in, $0.01/M out).', 'https://artificialanalysis.ai/models/deepseek-v4-flash-vision', '[{"url":"https://artificialanalysis.ai/models/deepseek-v4-flash-vision","text":"DeepSeek V4 Flash Vision (max) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/deepseek-v4-flash-vision/providers","text":"DeepSeek V4 Flash Vision (max) Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-Coder', 'DeepSeek AI', 'Model', 'AI Coding', 'DeepSeek License', 2023, '1.3B to 33B params', 'DeepSeek''s top-performing open-source code model series (1.3B–33B) that outperforms GPT-3.5 Turbo on many coding benchmarks.', 'Transformer decoder trained on 2T tokens across 87 programming languages.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/deepseek-coder-33b-instruct")
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/deepseek-coder-33b-instruct")', 'HumanEval: 79.3% (33B), outperforms GPT-3.5 Turbo', 'License restricts certain commercial applications.', 'https://github.com/deepseek-ai/DeepSeek-Coder', '[{"url":"https://arxiv.org/abs/2401.14196","text":"DeepSeek-Coder Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-Coder-V2', 'DeepSeek AI', 'Model', 'AI Coding', 'MIT', 2024, '236B (21B active)', 'Open-source mixture-of-experts code intelligence model supporting 338 programming languages and 128k context window.', 'MoE Transformer initialized from DeepSeek-V2 with code & math continual pre-training.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-Coder-V2-Instruct", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-Coder-V2-Instruct", trust_remote_code=True, device_map="auto")', 'HumanEval: 90.2%, MBPP+: 76.2%, SWE-bench: 12.7%', 'High RAM/VRAM footprint for 236B model; requires distributed inference.', 'https://github.com/deepseek-ai/DeepSeek-Coder-V2', '[{"url":"https://arxiv.org/abs/2406.11931","text":"DeepSeek-Coder-V2 Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-R1', 'DeepSeek AI', 'Model', 'NLP', 'MIT', 2025, '671B (37B active)', 'Breakthrough open-weights reasoning model trained via large-scale reinforcement learning (RL) without supervised fine-tuning, rivaling top proprietary reasoning models.', 'DeepSeek-V3 Base + Large-scale Multi-Stage RL with self-verification reasoning.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_KEY", base_url="https://api.deepseek.com")
response = client.chat.completions.create(
  model="deepseek-reasoner",
  messages=[{"role": "user", "content": "Solve: What is the sum of integers from 1 to 100?"}]
)', 'AIME 2024: 79.8%, MATH-500: 97.3%, Codeforces: 96.3 percentile', 'Outputs lengthy reasoning chains which increase token consumption and response latency.', 'https://www.deepseek.com', '[{"url":"https://arxiv.org/abs/2501.12948","text":"DeepSeek-R1 Technical Report"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-R1-Distill-Qwen-32B', 'DeepSeek AI', 'Model', 'NLP', 'MIT', 2025, '32B params', 'Dense 32B reasoning model distilled from DeepSeek-R1 onto Qwen2.5-32B, delivering top-tier mathematical and coding logic on consumer hardware.', 'Qwen2.5-32B backbone fine-tuned on 800k DeepSeek-R1 reasoning trajectories.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-R1-Distill-Qwen-32B", device_map="auto")', 'AIME 2024: 72.6%, MATH-500: 94.3%, LiveCodeBench: 57.2%', 'Higher resource consumption than 8B models; requires ~20GB VRAM with 4-bit quantization.', 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B', '[{"url":"https://github.com/deepseek-ai/DeepSeek-R1","text":"DeepSeek-R1 Distillation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V2', 'DeepSeek AI', 'Model', 'NLP', 'DeepSeek License', 2024, '236B total (21B active)', 'DeepSeek''s efficient MoE model with 236B total parameters but only 21B active, offering GPT-4 class performance at dramatically lower inference cost.', 'Multi-head Latent Attention (MLA) + DeepSeekMoE architecture.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V2")
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-V2", trust_remote_code=True)', 'MMLU: 78.5%, strong on math and code', 'Complex MoE deployment, license restricts certain commercial uses.', 'https://www.deepseek.com/', '[{"url":"https://arxiv.org/abs/2405.04434","text":"DeepSeek-V2 Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V3', 'DeepSeek AI', 'Model', 'NLP', 'MIT', 2024, '671B (37B active)', 'DeepSeek''s flagship 671B Mixture-of-Experts (MoE) model with Multi-head Latent Attention (MLA), activating 37B params per token with industry-leading efficiency.', 'Multi-head Latent Attention (MLA) + DeepSeekMoE + FP8 Mixed Precision Training.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_KEY", base_url="https://api.deepseek.com")
response = client.chat.completions.create(
  model="deepseek-chat",
  messages=[{"role": "user", "content": "Explain MLA architecture."}]
)', 'MMLU-Redux: 89.1%, HumanEval: 90.2%, MATH-500: 75.7%', 'Massive parameter footprint requires multi-GPU or cloud API hosting.', 'https://www.deepseek.com', '[{"url":"https://github.com/deepseek-ai/DeepSeek-V3","text":"DeepSeek-V3 Technical Report"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4-Flash-Vision-Exp', 'DeepSeek AI', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'Open-weights Multimodal model developed by DeepSeek AI.', 'DeepSeek image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-V4-Flash-Vision-Exp", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V4-Flash-Vision-Exp")', 'Trending Score: 582, Likes: 631, Downloads: 184,542', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp', '[{"url":"https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp","text":"deepseek-ai/DeepSeek-V4-Flash-Vision-Exp on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash', 'DeepSeek AI', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'Open-weights Multimodal model developed by DeepSeek AI.', 'DeepSeek image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-V4.1-Flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V4.1-Flash")', 'Trending Score: 1336, Likes: 1,394, Downloads: 6', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash', '[{"url":"https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash","text":"deepseek-ai/DeepSeek-V4.1-Flash on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSeek-V4.1-Flash-1017', 'DeepSeek AI', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'DeepSeek AI''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 32, Briefcase Elo of 1570, and a massive 1M context window.', 'DeepSeek image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-V4.1-Flash-1017", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V4.1-Flash-1017")', 'Intelligence Index: 32, Briefcase Elo: 1570, Accuracy: 40%, Non-Hallucination: 36%, FrontierCode: 28%, AutomationBench: 67%, TerminalBench 4: 34%, HLE Diamond: 25%, Speed: 175 tok/s, Context Window: 1M', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017', '[{"url":"https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017","text":"deepseek-ai/DeepSeek-V4.1-Flash-1017 on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeepSpeed', 'Microsoft', 'Framework', 'MLOps', 'Apache-2.0', 2020, 'N/A', 'Microsoft''s deep learning optimization library that makes distributed training, parameter offloading (ZeRO-1/2/3/Infinity), and high-throughput inference scalable and efficient on commodity and enterprise hardware.', 'Distributed memory optimization engine featuring Zero Redundancy Optimizer (ZeRO), ZeRO-Offload, 3D parallelism (data, tensor, pipeline), and DeepSpeed-MoE.', 'deepspeed --num_gpus=8 train.py --deepspeed deepspeed_config.json', 'Powers trillion-parameter distributed training runs (BLOOM, Megatron-Turing NLG); reduces memory footprint up to 10x via ZeRO-3.', 'Configuration complexity with multi-node networking and custom CUDA kernel compilation requirements across varying driver environments.', 'https://github.com/microsoft/DeepSpeed', '[{"url":"https://github.com/microsoft/DeepSpeed","text":"Microsoft DeepSpeed GitHub Repository"},{"url":"https://www.deepspeed.ai/","text":"DeepSpeed Official Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DepthPro2', 'Apple', 'Model', 'Computer Vision', 'Open Weights', 2026, 'Open Weights', 'Zero-shot metric monocular depth estimation model developed by Apple for sharp, high-resolution geometric depth prediction.', 'apple depth estimation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("apple/DepthPro2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("apple/DepthPro2")', 'Trending Score: 165, Likes: 191, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/apple/DepthPro2', '[{"url":"https://huggingface.co/apple/DepthPro2","text":"apple/DepthPro2 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Descript', 'Descript', 'AI', 'Audio', 'Proprietary', 2017, 'N/A', 'An AI-powered audio and video editing tool that lets users edit media by editing the transcript, with features like voice cloning, filler word removal, and overdub.', 'Desktop / Web Application (Proprietary ASR + TTS + video editing pipeline)', 'Download Descript from descript.com; import audio or video and edit by modifying the transcript.', 'N/A', 'Overdub voice cloning requires recording samples; some AI features are in paid tiers only.', 'https://www.descript.com', '[{"url":"https://www.descript.com","text":"Descript"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DeskForge-1M', 'Docling Project', 'Dataset', 'Computer Vision', 'MIT', 2026, '1M<n<10M', 'DeskForge-1M is a corpus of 1.21M annotated desktop screenshots with 159.7M element instances and 917K recorded click transitions, generated with DeskFor.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("docling-project/DeskForge-1M")', 'Trending Score: 34, Likes: 34, Downloads: 4,899', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/docling-project/DeskForge-1M', '[{"url":"https://huggingface.co/datasets/docling-project/DeskForge-1M","text":"docling-project/DeskForge-1M on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Devin', 'Cognition AI', 'AI', 'AI Coding', 'Proprietary', 2024, 'N/A', 'The first autonomous AI software engineer, equipped with its own sandboxed shell, code editor, and browser to solve end-to-end engineering tasks independently.', 'Autonomous multi-step agent architecture with sandboxed compute environment.', 'Assign a GitHub issue or feature ticket to Devin via the Cognition dashboard or Slack integration.', '13.86% resolved on SWE-bench at launch; over 45% on modern benchmarks.', 'Requires human verification for large architectural migrations and security critical code.', 'https://cognition.ai', '[{"url":"https://cognition.ai/blog/introducing-devin","text":"Devin Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('dinov3-vitl16-pretrain-lvd1689m', 'Meta AI', 'Model', 'Computer Vision', 'Open Weights', 2026, '1689M params', 'Self-supervised DINOv3 Vision Transformer (ViT-L/16) pretrained on 1.689B curated visual samples by Meta AI.', 'facebook image feature extraction architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("facebook/dinov3-vitl16-pretrain-lvd1689m", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("facebook/dinov3-vitl16-pretrain-lvd1689m")', 'Trending Score: 164, Likes: 2,145, Downloads: 703,532', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/facebook/dinov3-vitl16-pretrain-lvd1689m', '[{"url":"https://huggingface.co/facebook/dinov3-vitl16-pretrain-lvd1689m","text":"facebook/dinov3-vitl16-pretrain-lvd1689m on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Distilabel', 'Argilla', 'Framework', 'Research', 'Apache-2.0', 2024, 'N/A', 'Argilla''s framework for synthetic data generation and AI feedback (RLAIF) capable of scaling pipelines for multi-turn DPO, preference datasets, and instruction fine-tuning.', 'Step-based data synthesis and evaluation pipeline orchestrator.', 'from distilabel.pipeline import Pipeline
with Pipeline("SyntheticData") as pipeline:
    # Define generation steps and LLM judges', 'Powered the creation of UltraFeedback, OpenHermes, and benchmark preference datasets.', 'Generates high API usage costs when scaling large synthetic batches.', 'https://github.com/argilla-io/distilabel', '[{"url":"https://distilabel.argilla.io","text":"Distilabel Docs"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Dolma Dataset', 'Allen Institute for AI', 'Dataset', 'NLP', 'ODC-By 1.0', 2024, '3 Trillion tokens', '3-trillion token open pretraining dataset curated by the Allen Institute for AI (AI2) to power the open-source OLMo language models.', 'De-duplicated, safety-filtered web corpus from Common Crawl, Reddit, peS2o, and GitHub.', 'from datasets import load_dataset
ds = load_dataset("allenai/dolma", split="train", streaming=True)', 'Fully open pretraining recipe allowing 100% scientific reproducibility for LLM training.', 'Full dataset download requires high bandwidth and petabyte-scale storage.', 'https://github.com/allenai/dolma', '[{"url":"https://arxiv.org/abs/2402.00159","text":"Dolma Technical Paper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('drama-3', 'Fish Audio', 'Model', 'Audio', 'Open Weights', 2026, 'Open Weights', 'Open-weights Audio model developed by Fish Audio.', 'fishaudio text to speech architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("fishaudio/drama-3", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("fishaudio/drama-3")', 'Trending Score: 466, Likes: 480, Downloads: 4,048', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/fishaudio/drama-3', '[{"url":"https://huggingface.co/fishaudio/drama-3","text":"fishaudio/drama-3 on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('DSPy', 'Stanford AI', 'Framework', 'Research', 'MIT', 2024, 'N/A', 'Stanford NLP''s framework for algorithmically optimizing language model prompts, weights, and retrieval parameters via declarative modules and automatic teleprompters.', 'Declarative LM programming framework with compiler/optimizer loop.', 'import dspy
dspy.settings.configure(lm=dspy.OpenAI(model=''gpt-4o''))
class MultiHopQA(dspy.Module):
    def __init__(self):
        self.generate_query = dspy.ChainOfThought("claim -> query")
        self.retrieve = dspy.Retrieve(k=3)', 'Improves pipeline accuracy by 25%-40% compared to static prompt chains.', 'Requires learning module abstractions rather than writing raw prompt strings.', 'https://github.com/stanfordnlp/dspy', '[{"url":"https://arxiv.org/abs/2310.03714","text":"DSPy Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Duolingo Max', 'Duolingo', 'AI', 'Education', 'Proprietary', 2023, 'N/A', 'Duolingo''s premium AI-powered tier featuring GPT-4 driven features like Explain My Answer for detailed feedback and Roleplay for open-ended AI conversation practice.', 'Mobile / Web Application (Powered by GPT-4 integrated into the Duolingo platform)', 'Upgrade to Duolingo Max within the Duolingo iOS or Android app to access AI features.', 'N/A', 'Only available for select languages; requires a paid Max subscription on top of Duolingo Plus.', 'https://blog.duolingo.com/duolingo-max', '[{"url":"https://blog.duolingo.com/duolingo-max","text":"Duolingo Max"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('E5-Mistral-7B', 'Microsoft', 'Model', 'NLP', 'MIT', 2024, '7B params', 'Microsoft''s state-of-the-art text embedding model based on Mistral 7B, achieving top MTEB scores for retrieval and semantic search tasks.', 'Mistral 7B decoder fine-tuned with contrastive learning for embedding tasks.', 'from sentence_transformers import SentenceTransformer
model = SentenceTransformer("intfloat/e5-mistral-7b-instruct")
embeddings = model.encode(["Hello world", "Bonjour le monde"])', 'MTEB: 66.6% average (top open model at release)', '7B params is large for an embedding model, slower than lighter alternatives.', 'https://arxiv.org/abs/2401.00368', '[{"url":"https://arxiv.org/abs/2401.00368","text":"E5-Mistral Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Edge0-35B-A3B-preview', 'Edge0', 'Model', 'NLP', 'Apache-2.0', 2026, '35B params', 'Open-weights NLP model developed by Edge0.', 'Edge0 text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Edge0/Edge0-35B-A3B-preview", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Edge0/Edge0-35B-A3B-preview")', 'Trending Score: 520, Likes: 538, Downloads: 1,596', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Edge0/Edge0-35B-A3B-preview', '[{"url":"https://huggingface.co/Edge0/Edge0-35B-A3B-preview","text":"Edge0/Edge0-35B-A3B-preview on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('EgoPro', 'LightwheelAI', 'Dataset', 'Multimodal', 'Open Data', 2026, '10K<n<100K', 'EgoPro The 10,000-hour head-and-wrist line of EgoSuite-Open100K. Data Bucket · Collection · EgoDemo · EgoStandard · Project page Explore EgoSuite-Open100K ↗ Data locatio.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("LightwheelAI/EgoPro")', 'Trending Score: 40, Likes: 111, Downloads: 35,382', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/LightwheelAI/EgoPro', '[{"url":"https://huggingface.co/datasets/LightwheelAI/EgoPro","text":"LightwheelAI/EgoPro on Hugging Face Datasets"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('EgoStandard', 'LightwheelAI', 'Dataset', 'Multimodal', 'Open Data', 2026, '10K<n<100K', 'EgoStandard The 90,000-hour head-view line of EgoSuite-Open100K. Data Bucket · Collection · EgoDemo · EgoPro · Project page Explore EgoSuite-Open100K ↗ Data location: Eg.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("LightwheelAI/EgoStandard")', 'Trending Score: 47, Likes: 186, Downloads: 388', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/LightwheelAI/EgoStandard', '[{"url":"https://huggingface.co/datasets/LightwheelAI/EgoStandard","text":"LightwheelAI/EgoStandard on Hugging Face Datasets"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ElevenLabs', 'ElevenLabs', 'AI', 'Audio', 'Proprietary', 2022, 'N/A', 'A leading AI voice synthesis platform capable of cloning voices and generating ultra-realistic speech in multiple languages from text.', 'Web Application / API (Proprietary TTS and voice cloning models)', 'Visit elevenlabs.io to generate speech or use the ElevenLabs API for programmatic access.', 'N/A', 'Free tier has limited monthly character quota; voice cloning requires audio samples.', 'https://elevenlabs.io', '[{"url":"https://elevenlabs.io","text":"ElevenLabs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Elicit', 'Ought', 'AI', 'Research', 'Proprietary', 2021, 'N/A', 'An AI research assistant that searches and summarizes academic papers, extracts key data from studies, and helps researchers synthesize literature at scale.', 'Web Application (Powered by LLMs with semantic search over academic paper databases)', 'Visit elicit.com, enter a research question, and get summaries and data from relevant papers.', 'N/A', 'Coverage limited to papers indexed in Semantic Scholar; may miss very recent publications.', 'https://elicit.com', '[{"url":"https://elicit.com","text":"Elicit"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('embeddinggemma-2', 'Google DeepMind', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by Google DeepMind.', 'Google feature extraction architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("google/embeddinggemma-2", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("google/embeddinggemma-2")', 'Trending Score: 965, Likes: 990, Downloads: 7,562', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/google/embeddinggemma-2', '[{"url":"https://huggingface.co/google/embeddinggemma-2","text":"google/embeddinggemma-2 on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('enterpriseops-gym-v1.1', 'ServiceNow', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'STATIC Platform', 'Interactive multimodal showcase hosted by ServiceNow on Hugging Face Spaces.', 'STATIC cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/ServiceNow-AI/enterpriseops-gym-v1.1', 'Trending Score: 20, Community Likes: 21', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/ServiceNow-AI/enterpriseops-gym-v1.1', '[{"url":"https://huggingface.co/spaces/ServiceNow-AI/enterpriseops-gym-v1.1","text":"ServiceNow-AI/enterpriseops-gym-v1.1 on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ERNIE 5.5 Flash Preview', 'Baidu', 'Model', 'Research', 'Open Weights', 2026, '1024k Context · Open Model', 'Frontier Research model by Baidu benchmarked on Artificial Analysis with an Intelligence Index of 31.3 and a verified 1024k Context window.', 'Open-weights frontier neural architecture developed by Baidu, featuring native 1024k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/ernie-5-5-flash', 'Context Window: 1024k Context, Intelligence Index: 31.3, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/ernie-5-5-flash', '[{"url":"https://artificialanalysis.ai/models/ernie-5-5-flash","text":"ERNIE 5.5 Flash Preview on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/ernie-5-5-flash/providers","text":"ERNIE 5.5 Flash Preview Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ERNIE Bot', 'Baidu', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Baidu''s conversational AI assistant powered by the ERNIE large language model, strong in Chinese language tasks and integrated with Baidu Search.', 'Web Application / Conversational Agent (Powered by ERNIE 4.0)', 'Visit yiyan.baidu.com to interact; primarily available in China.', 'N/A', 'Primarily optimized for Chinese language; access outside China may be restricted.', 'https://yiyan.baidu.com', '[{"url":"https://yiyan.baidu.com","text":"ERNIE Bot"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ERNIE-5.5-Flash-Base', 'Baidu', 'Model', 'NLP', 'Open Weights', 2026, 'Open Weights', 'Open-weights NLP model developed by Baidu.', 'baidu text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("baidu/ERNIE-5.5-Flash-Base", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("baidu/ERNIE-5.5-Flash-Base")', 'Trending Score: 156, Likes: 217, Downloads: 971', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/baidu/ERNIE-5.5-Flash-Base', '[{"url":"https://huggingface.co/baidu/ERNIE-5.5-Flash-Base","text":"baidu/ERNIE-5.5-Flash-Base on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ERNIE-Light-DT-1.0', 'Baidu', 'Model', 'NLP', 'Proprietary', 2026, '1024k Context · Available via API', 'ERNIE-Light-DT-1.0 is based on open-source GLM models and includes research findings from Baidu Search''s Lightning large model. It features Baidu Sparse Attention (BSA), a unique s.', 'Modern foundation model hosted on OpenRouter with native 1024k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "baidu/ernie-light-dt-1.0-intl",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1024k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/baidu/ernie-light-dt-1.0-intl', '[{"url":"https://openrouter.ai/baidu/ernie-light-dt-1.0-intl","text":"Baidu: ERNIE-Light-DT-1.0 on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('EvalPlus', 'EvalPlus', 'Dataset', 'AI Coding', 'Apache-2.0', 2023, '164 HumanEval+ & 378 MBPP+ Rigorous Tasks', 'Rigorous code evaluation suite augmenting HumanEval (HumanEval+) and MBPP (MBPP+) with automated LLM- and mutation-based test synthesis, boosting test-case coverage by up to 80x.', 'Automated test-input synthesis pipeline combining differential testing, type-aware mutations, and constraint solving for strict semantic verification.', 'from evalplus.data import get_human_eval_plus
evalplus_tasks = get_human_eval_plus()
print(len(evalplus_tasks), evalplus_tasks["HumanEval/0"]["entry_point"])', 'Exposes an average of 15% false passes in standard HumanEval benchmarks; recognized as standard rigor baseline on the EvalPlus leaderboard.', 'Focuses on standalone algorithmic programming problems rather than full-repository multi-file architectures.', 'https://evalplus.github.io', '[{"url":"https://evalplus.github.io","text":"EvalPlus Leaderboard & Benchmark Suite"},{"url":"https://github.com/evalplus/evalplus","text":"EvalPlus GitHub Repository"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('EVIDENT', 'KORMo-VL', 'Dataset', 'NLP', 'Open Data', 2026, 'n<1K', 'EVIDENT: Task Metadata for Evidence-Grounded GUI Evaluation This release contains 220 GUI/web agent task records for evidence-grounded trajectory evaluation: 150 Kore.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("KORMo-VL/EVIDENT")', 'Trending Score: 22, Likes: 23, Downloads: 110', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/KORMo-VL/EVIDENT', '[{"url":"https://huggingface.co/datasets/KORMo-VL/EVIDENT","text":"KORMo-VL/EVIDENT on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('fal.ai', 'fal', 'Platform', 'Multimodal', 'Proprietary', 2023, 'Serverless GPU Inference Cloud', 'Real-time generative media cloud platform engineered for ultra-low latency inference across state-of-the-art image, audio, and video models with serverless GPU infrastructure.', 'Serverless GPU orchestration engine with optimized custom inference engines for diffusion models, video generators, and speech synthesis pipelines.', 'import fal_client

result = fal_client.subscribe(
    "fal-ai/flux/dev",
    arguments={"prompt": "A futuristic cityscape at sunset, cinematic lighting, 8k"}
)
print(result["images"][0]["url"])', 'Generates FLUX images in under 1 second; powers real-time WebSockets and streaming video/audio pipelines with global edge distribution.', 'Pay-per-compute pricing model; enterprise rate limits apply to bursty parallel workloads unless reserved capacity is provisioned.', 'https://fal.ai', '[{"url":"https://fal.ai","text":"fal.ai Official Developer Platform"},{"url":"https://fal.ai/models","text":"fal.ai Model Registry and API Docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Falcon 180B', 'Technology Innovation Institute (TII)', 'Model', 'NLP', 'Falcon-180B TII License', 2023, '180B params', 'TII''s massive open-source 180B parameter model, one of the largest publicly available LLMs trained on the RefinedWeb dataset.', 'Causal decoder-only transformer with multi-query attention.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("tiiuae/falcon-180B-chat")
model = AutoModelForCausalLM.from_pretrained("tiiuae/falcon-180B-chat", trust_remote_code=True)', 'MMLU: 70.4%, competitive with PaLM 2-L', 'Requires massive GPU cluster, commercial use needs separate license.', 'https://falconllm.tii.ae/', '[{"url":"https://huggingface.co/tiiuae/falcon-180B","text":"Falcon 180B Release"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FastChat', 'LMSYS Org', 'Framework', 'MLOps', 'Apache-2.0', 2023, 'N/A', 'LMSYS Org''s open platform for training, serving, and evaluating LLM-based chatbots, powering the widely acclaimed LMSYS Chatbot Arena and Vicuna models.', 'Distributed controller-worker serving architecture with OpenAI-compatible REST API endpoints, web UI, and Elo evaluation harnesses.', 'python3 -m fastchat.serve.controller
python3 -m fastchat.serve.model_worker --model-path lmsys/vicuna-7b-v1.5
python3 -m fastchat.serve.openai_api_server --host localhost --port 8000', 'Powers LMSYS Chatbot Arena evaluating over 100+ frontier models; serves millions of evaluation prompts with distributed model worker pools.', 'Built originally for research and benchmark serving; lacks advanced enterprise enterprise access control and billing features out-of-the-box.', 'https://github.com/lm-sys/FastChat', '[{"url":"https://github.com/lm-sys/FastChat","text":"LMSYS FastChat GitHub Repository"},{"url":"https://chat.lmsys.org/","text":"LMSYS Chatbot Arena Platform"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FastFrames-L', 'Apple', 'Model', 'Video Generation', 'Apple AMLR', 2026, 'Open Weights', 'Open-weights Video Generation model developed by Apple.', 'apple text to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("apple/FastFrames-L", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("apple/FastFrames-L")', 'Trending Score: 210, Likes: 228, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/apple/FastFrames-L', '[{"url":"https://huggingface.co/apple/FastFrames-L","text":"apple/FastFrames-L on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FastH3-Omni', 'FastVideo', 'Platform', 'Multimodal', 'Community Hosted', 2026, 'GRADIO Platform', 'High-throughput multimodal inference showcase powered by FastVideo''s diffusion and sequence acceleration stack.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/FastVideo/FastH3-Omni', 'Trending Score: 40, Community Likes: 58', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/FastVideo/FastH3-Omni', '[{"url":"https://huggingface.co/spaces/FastVideo/FastH3-Omni","text":"FastVideo/FastH3-Omni on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FDE-Gym', 'DeepLethe', 'Dataset', 'NLP', 'Open Data', 2026, 'n<1K', 'FDE-Gym: The Last Mile of AI Delivery FDE-Gym tests whether an agent can do the work of a forward-deployed engineer: enter a customer''s running environment, find out.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("DeepLethe/FDE-Gym")', 'Trending Score: 43, Likes: 80, Downloads: 64', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/DeepLethe/FDE-Gym', '[{"url":"https://huggingface.co/datasets/DeepLethe/FDE-Gym","text":"DeepLethe/FDE-Gym on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Fibo-2.0', 'Bria AI', 'Model', 'Image Generation', 'CC-BY-NC-4.0', 2026, 'Open Weights', 'FIBO 2.0 is Bria AI''s commercial-licensed visual foundation model engineered for structured, controllable text-to-image generation and editing.', 'Comfy-Org transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Comfy-Org/Fibo-2.0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Comfy-Org/Fibo-2.0")', 'Trending Score: 149, Likes: 149, Downloads: 70,682', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Comfy-Org/Fibo-2.0', '[{"url":"https://huggingface.co/Comfy-Org/Fibo-2.0","text":"Comfy-Org/Fibo-2.0 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FineART', 'LeRobot', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, '100M<n<1B', 'FineART: Fine-Grained Annotated Robotic Trajectory Dataset FineART is co-released by Scale AI and Hugging Face LeRobot. The data was collected and annotated by the Ph.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("lerobot/FineART")', 'Trending Score: 18, Likes: 32, Downloads: 481,434', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/lerobot/FineART', '[{"url":"https://huggingface.co/datasets/lerobot/FineART","text":"lerobot/FineART on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FineDNA', 'Hugging Face', 'Dataset', 'NLP', 'Apache-2.0', 2026, '100M<n<1B', 'FineDNA is the training data of Carbon-X, the model that taught Qwen3-14B to read DNA, for all three of its training stages. Each stage is a group of configs:.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("HuggingFaceBio/FineDNA")', 'Trending Score: 22, Likes: 23, Downloads: 72', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/HuggingFaceBio/FineDNA', '[{"url":"https://huggingface.co/datasets/HuggingFaceBio/FineDNA","text":"HuggingFaceBio/FineDNA on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FineWeb & FineWeb-Edu', 'Hugging Face', 'Dataset', 'NLP', 'ODC-By 1.0', 2024, '15 Trillion tokens (44 TB)', '15-trillion token open web pretraining dataset from Hugging Face, including FineWeb-Edu filtered with automated AI educational quality scoring.', 'Curated dataset derived from 96 Common Crawl dumps with MinHash deduplication.', 'from datasets import load_dataset
ds = load_dataset("HuggingFaceFW/fineweb-edu", name="sample-100BT", split="train", streaming=True)', 'Pretraining on FineWeb-Edu yields higher MMLU per token than Meta Llama 3 web filtering.', 'Massive multi-terabyte download requirement for full uncompressed sets.', 'https://huggingface.co/datasets/HuggingFaceFW/fineweb', '[{"url":"https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-details","text":"FineWeb Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('fineweb-2', 'Hugging Face', 'Dataset', 'NLP', 'ODC-By 1.0', 2026, '1B<n<10B', 'Second major release of Hugging Face''s FineWeb corpus scaling filtered multilingual web text across 1,000+ languages.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("HuggingFaceFW/fineweb-2")', 'Trending Score: 6, Likes: 1,036, Downloads: 234,335', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/HuggingFaceFW/fineweb-2', '[{"url":"https://huggingface.co/datasets/HuggingFaceFW/fineweb-2","text":"HuggingFaceFW/fineweb-2 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Fireworks AI', 'Fireworks AI', 'Platform', 'MLOps', 'Proprietary', 2024, 'Cloud API', 'Production-grade generative AI inference platform delivering blazing fast latency and cost efficiency for open-weights vision, audio, and language models.', 'Custom inference engine with fine-grained speculative decoding and LoRA multiplexing.', 'from openai import OpenAI
client = OpenAI(base_url="https://api.fireworks.ai/inference/v1", api_key="FW_KEY")
response = client.chat.completions.create(model="accounts/fireworks/models/deepseek-v3", messages=[...])', 'Sub-100ms time-to-first-token and ultra-high concurrency.', 'Proprietary cloud platform.', 'https://fireworks.ai', '[{"url":"https://fireworks.ai","text":"Fireworks AI Platform"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('flint', 'RecursiveSI', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by RecursiveSI.', 'RecursiveSI text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("RecursiveSI/flint", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("RecursiveSI/flint")', 'Trending Score: 199, Likes: 200, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/RecursiveSI/flint', '[{"url":"https://huggingface.co/RecursiveSI/flint","text":"RecursiveSI/flint on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('flower', 'Flower Labs', 'Framework', 'MLOps', 'Apache-2.0', 2026, '347MB Repo', 'Flower: A Friendly Federated AI Framework.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/flwrlabs/flower
cd flower
pip install -e .', 'GitHub Stars: 7,112, Forks: 1,226', 'Requires local Python environment and dependency configuration.', 'https://github.com/flwrlabs/flower', '[{"url":"https://github.com/flwrlabs/flower","text":"flwrlabs/flower on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('flux-3-image-klein', 'Black Forest Labs', 'Platform', 'Image Generation', 'Community Hosted', 2026, 'GRADIO Platform', 'Fast interactive demo for Black Forest Labs'' compact FLUX.3 Klein image generation model.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/black-forest-labs/flux-3-image-klein', 'Trending Score: 57, Community Likes: 58', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/black-forest-labs/flux-3-image-klein', '[{"url":"https://huggingface.co/spaces/black-forest-labs/flux-3-image-klein","text":"black-forest-labs/flux-3-image-klein on Hugging Face Spaces"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Flux.1', 'Black Forest Labs', 'Model', 'Image Generation', 'Various (Pro: Proprietary, Dev: Non-commercial, Schnell: Apache 2.0)', 2024, '12B params', 'Black Forest Labs'' state-of-the-art suite of text-to-image models (Pro, Dev, Schnell) pushing the boundaries of prompt adherence, visual quality, and image detail.', 'Hybrid architecture of multimodal and parallel diffusion transformer blocks.', '# Via API or locally for open variants
from diffusers import FluxPipeline
import torch
pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell", torch_dtype=torch.bfloat16)
image = pipe("A cat holding a sign that says ''Hello World''").images[0]', 'State-of-the-art ELO scores surpassing Midjourney v6 and DALL-E 3 on prompt adherence.', 'High VRAM requirements for local inference of the full 12B model.', 'https://blackforestlabs.ai/', '[{"url":"https://blackforestlabs.ai/announcing-black-forest-labs/","text":"FLUX.1 Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('FLUX.1 Schnell', 'Black Forest Labs', 'Model', 'Image Generation', 'Apache-2.0', 2024, '12B params', 'Black Forest Labs'' ultra-fast 12B parameter open text-to-image rectified flow transformer, generating high-fidelity images in just 1 to 4 diffusion steps.', 'Hybrid multimodal rectified flow transformer with rotary position embeddings (RoPE).', 'import torch
from diffusers import FluxPipeline
pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell", torch_dtype=torch.bfloat16)
image = pipe("A cozy cafe on Mars with neon lighting", num_inference_steps=4).images[0]', 'ELO rating: 1140+ (Superior prompt adherence and in-image typography)', '12B parameter weights require at least 12GB-16GB VRAM for GPU execution.', 'https://blackforestlabs.ai', '[{"url":"https://blackforestlabs.ai/announcing-black-forest-labs/","text":"FLUX.1 Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GAIA Benchmark', 'Meta AI', 'Dataset', 'Research', 'CC-BY-SA-4.0', 2023, '466 questions', 'General AI Assistant benchmark testing AI agents on multi-modal, tool-use, web browsing, and multi-step complex real-world questions that humans solve easily.', '3-tier difficulty question set with multimodal attachments (PDFs, spreadsheets, images).', 'from datasets import load_dataset
ds = load_dataset("gaia-benchmark/GAIA", "2023_all", split="validation")', 'Humans score 92%, whereas leading AI models historically score 30%-60%.', 'Requires full web browsing and python tool execution environment to run evals.', 'https://huggingface.co/spaces/gaia-benchmark/leaderboard', '[{"url":"https://arxiv.org/abs/2311.12983","text":"GAIA Benchmark Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gamma', 'Gamma', 'AI', 'Productivity', 'Proprietary', 2020, 'N/A', 'An AI presentation and document builder that generates beautiful, shareable decks, webpages, and documents from text prompts or outlines in seconds.', 'Web Application (Powered by GPT-4 with proprietary layout and design generation engine)', 'Visit gamma.app, describe your content, and generate a fully designed presentation instantly.', 'N/A', 'Free tier adds a Gamma watermark; advanced themes and AI credits require a paid plan.', 'https://gamma.app', '[{"url":"https://gamma.app","text":"Gamma"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('gdx-ai', 'libGDX', 'Framework', 'MLOps', 'Apache-2.0', 2026, '1MB Repo', 'Artificial Intelligence framework for games based on libGDX or not. Features: Steering Behaviors, Formation Motion, Pathfinding, Behavior Trees and Finite State Machines.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/libgdx/gdx-ai
cd gdx-ai
pip install -e .', 'GitHub Stars: 1,301, Forks: 252', 'Requires local Python environment and dependency configuration.', 'https://github.com/libgdx/gdx-ai', '[{"url":"https://github.com/libgdx/gdx-ai","text":"libgdx/gdx-ai on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 1.5 Flash', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2024, 'N/A', 'Google''s lightweight, fast multimodal model optimized for high-volume tasks with a 1M token context window at lower cost.', 'Distilled MoE transformer, optimized for speed and efficiency.', 'import google.generativeai as genai
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel(''gemini-1.5-flash'')
response = model.generate_content("Summarize this article quickly.")', 'MMLU: 78.9%, significantly faster than Pro', 'Less capable than Gemini 1.5 Pro on complex reasoning tasks.', 'https://deepmind.google/technologies/gemini/flash/', '[{"url":"https://deepmind.google/technologies/gemini/flash/","text":"Gemini 1.5 Flash Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 1.5 Pro', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2024, 'N/A', 'Google''s flagship multimodal model featuring a massive context window of up to 2 million tokens, allowing it to process hours of video, audio, and vast codebases.', 'Mixture-of-Experts (MoE) transformer architecture.', 'import google.generativeai as genai
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel(''gemini-1.5-pro'')
response = model.generate_content("Summarize this 1000-page PDF.")', 'MMLU: 85.9%, MATH: 67.7%', 'Proprietary API, performance can vary on extremely short-context logic puzzles.', 'https://deepmind.google/technologies/gemini/', '[{"url":"https://arxiv.org/abs/2403.05530","text":"Gemini 1.5 Pro Technical Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 2.0 Flash', 'Google DeepMind', 'Model', 'Multimodal', 'Proprietary', 2024, 'N/A', 'Google DeepMind''s agentic multimodal model delivering real-time streaming audio/video generation, sub-second latency, and native tool execution.', 'Natively multimodal Mixture-of-Experts architecture supporting 1M context.', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-2.0-flash",
  contents="Explain quantum computing simply."
)', 'MMLU-Pro: 78.5%, MathVista: 68.3%, TTFT 2x faster than 1.5 Flash', 'API quota boundaries and regional service availability.', 'https://deepmind.google/technologies/gemini/', '[{"url":"https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/","text":"Gemini 2.0 Flash Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 2.0 Flash Thinking', 'Google DeepMind', 'Model', 'Research', 'Proprietary', 2024, 'N/A', 'Experimental reasoning edition of Gemini 2.0 Flash that outputs chain-of-thought steps for visual and logical problem-solving.', 'Multimodal MoE with explicit reasoning tokens and reflection loops.', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-2.0-flash-thinking-exp",
  contents="Solve this physics circuit diagram problem."
)', 'MATH-500: 92.4%, AIME 2024: 74.3%', 'Experimental model with dynamic rate limits.', 'https://deepmind.google/technologies/gemini/', '[{"url":"https://deepmind.google/technologies/gemini/","text":"Gemini Thinking Model"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 2.0 Pro', 'Google DeepMind', 'Model', 'Research', 'Proprietary', 2025, 'Frontier MoE', 'Google''s flagship intelligence model in the 2.0 family, delivering premier multi-lingual and scientific reasoning, 2,000,000 token context window comprehension, and advanced agentic tool calling.', 'Multimodal Mixture-of-Experts with 2M token context, native code execution sandbox, and cross-modal reasoning.', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-2.0-pro-exp-02-05",
  contents="Analyze this entire 100-page clinical trial dossier for pharmacokinetic variance."
)', 'MMLU-Pro: 80.2%, GPQA Diamond: 68.4%, MathVista: 74.1%, Context: 2M tokens', 'Experimental rate limits during preview; requires Google Cloud / AI Studio credentials.', 'https://deepmind.google/technologies/gemini/', '[{"url":"https://blog.google/technology/google-deepmind/gemini-model-updates-february-2025/","text":"Gemini 2.0 Pro Experimental Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 3.5 Flash-Lite', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Google DeepMind''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 12, Briefcase Elo of 651, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by Google DeepMind, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (406 tok/s).', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-3-5-flash-lite",
  contents="Synthesize multimodal analysis over 1M context."
)', 'Intelligence Index: 12, Briefcase Elo: 651, Accuracy: 27%, Non-Hallucination: 73%, FrontierCode: 6%, AutomationBench: 25%, TerminalBench 4: 1%, HLE Diamond: 10%, Speed: 406 tok/s, Context Window: 1M', 'Proprietary cloud API access via Google DeepMind developer platform; subject to API rate limits and token pricing ($0.3/M in, $2.5/M out).', 'https://artificialanalysis.ai/models/gemini-3-5-flash-lite', '[{"url":"https://artificialanalysis.ai/models/gemini-3-5-flash-lite","text":"Gemini 3.5 Flash-Lite on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/gemini-3-5-flash-lite/providers","text":"Gemini 3.5 Flash-Lite Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 3.8 Flash', 'Google DeepMind', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'Google DeepMind''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 31, Briefcase Elo of 1203, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by Google DeepMind, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (120 tok/s).', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-3-8-flash-high",
  contents="Synthesize multimodal analysis over 1M context."
)', 'Intelligence Index: 31, Briefcase Elo: 1203, Accuracy: 51%, Non-Hallucination: 45%, FrontierCode: 19%, AutomationBench: 60%, TerminalBench 4: 20%, HLE Diamond: 33%, Speed: 120 tok/s, Context Window: 1M', 'Proprietary cloud API access via Google DeepMind developer platform; subject to API rate limits and token pricing ($0.75/M in, $3.75/M out).', 'https://artificialanalysis.ai/models/gemini-3-8-flash', '[{"url":"https://artificialanalysis.ai/models/gemini-3-8-flash","text":"Gemini 3.8 Flash (high) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/gemini-3-8-flash/providers","text":"Gemini 3.8 Flash (high) Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 4 Argon', 'Google DeepMind', 'Model', 'AI Coding', 'Proprietary', 2026, 'Frontier MoE', 'Google DeepMind''s flagship frontier reasoning and autonomous execution model featuring a 1M token context window, 1M token output long decode, and advanced goal decomposition for multi-step software engineering and enterprise workflows.', 'Natively Multimodal Reasoning Mixture-of-Experts with long decode output synthesis, self-correction verification loops, and agentic API integration.', 'from google import genai
client = genai.Client()
response = client.models.generate_content(
  model="gemini-4-argon",
  contents="Design an end-to-end distributed fault-tolerant Raft consensus engine in Rust."
)', 'Intelligence Index: 50, Briefcase Elo: 1484, Accuracy: 48%, Non-Hallucination: 96%, FrontierCode: 26%, AutomationBench: 78%, TerminalBench 4: 57%, HLE Diamond: 57%, Speed: 83 tok/s, Context Window: 1M', 'Enterprise and cloud API usage boundaries; high test-time compute requirements for deep reasoning modes.', 'https://deepmind.google/technologies/gemini/', '[{"url":"https://deepmind.google/technologies/gemini/","text":"Gemini 4 Argon Technical Overview"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 4 Carbon', 'Google DeepMind', 'Model', 'AI Coding', 'Proprietary', 2026, '1049k Context · Available via API', 'Google DeepMind''s frontier research model featured on the Artificial Analysis leaderboard with an Intelligence Index of 59, Briefcase Elo of 1610, and a massive 1M context window.', 'Modern foundation model hosted on OpenRouter with native 1049k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "google/gemini-4-carbon",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Intelligence Index: 59, Briefcase Elo: 1610, Accuracy: 58%, Non-Hallucination: 89%, FrontierCode: 41%, AutomationBench: 78%, TerminalBench 4: 65%, HLE Diamond: 69%, Speed: 85 tok/s, Context Window: 1M', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/google/gemini-4-carbon', '[{"url":"https://openrouter.ai/google/gemini-4-carbon","text":"Google: Gemini 4 Carbon on OpenRouter"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 4 Hydrogen', 'Google DeepMind', 'Model', 'Multimodal', 'Proprietary', 2026, '1M Context · High-Throughput MoE', 'Google DeepMind''s high-efficiency, low-latency foundation model in the Gemini 4 family, engineered for high-throughput agentic execution, everyday coding, real-time multimodal processing, and low-latency API workflows with a 1M token context window.', 'Natively multimodal Mixture-of-Experts (MoE) optimized for low latency and high inference concurrency, supporting up to 1M token context windows, long decode continuation, and native tool-calling.', 'from google import genai

client = genai.Client()
response = client.models.generate_content(
  model="gemini-4-hydrogen",
  contents="Analyze this codebase dependency graph and suggest async refactoring opportunities."
)
print(response.text)', '1M token unified context window; sub-150ms time-to-first-token (TTFT) streaming; high throughput across parallel subagent task trees and structured JSON schema generation.', 'Proprietary cloud model accessible via Google AI Studio and the Gemini API; complex deep-theorem mathematical proofs better suited for Gemini 4 Argon.', 'https://deepmind.google/technologies/gemini/', '[{"url":"https://deepmind.google/technologies/gemini/","text":"Google DeepMind Gemini 4 Architecture Overview"},{"url":"https://ai.google.dev/gemini-api/docs","text":"Gemini API Documentation on Google AI for Developers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini 4 Neon', 'Google DeepMind', 'Model', 'Research', 'Proprietary', 2026, '1000k Context · Proprietary Model', 'Frontier Research model by Google benchmarked on Artificial Analysis with an Intelligence Index of 44.1 and a verified 1000k Context window.', 'Proprietary frontier neural architecture developed by Google, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/gemini-4-neon', 'Context Window: 1000k Context, Intelligence Index: 44.1, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/gemini-4-neon', '[{"url":"https://artificialanalysis.ai/models/gemini-4-neon","text":"Gemini 4 Neon on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/gemini-4-neon/providers","text":"Gemini 4 Neon Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemini Omni 1.2 Flash', 'Google DeepMind', 'Model', 'Multimodal', 'Proprietary', 2026, '131k Context · Available via API', 'Gemini Omni 1.2 Flash is Google''s native multimodal video generation and editing model, the successor to Gemini Omni 1.1 Flash. It generates clips up to 15 seconds long with native.', 'Modern foundation model hosted on OpenRouter with native 131k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "google/gemini-omni-1.2-flash",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 131k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/google/gemini-omni-1.2-flash', '[{"url":"https://openrouter.ai/google/gemini-omni-1.2-flash","text":"Google: Gemini Omni 1.2 Flash on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemma 2 (27B)', 'Google DeepMind', 'Model', 'NLP', 'Gemma License', 2024, '27B params', 'Google''s open-weights model built from the same research and technology as the Gemini models, offering class-leading performance for its size.', 'Transformer decoder with sliding window attention and soft-capping.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("google/gemma-2-27b-it")
model = AutoModelForCausalLM.from_pretrained("google/gemma-2-27b-it")', 'MMLU: 81.5%, HumanEval: 71.5%', 'Commercial use permitted but subject to the Gemma license terms.', 'https://ai.google.dev/gemma', '[{"url":"https://blog.google/technology/developers/google-gemma-2/","text":"Gemma 2 Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemma 3 270M', 'Google DeepMind', 'Model', 'NLP', 'Open Weights', 2026, '32k Context · Open Model', 'Frontier NLP model by Google benchmarked on Artificial Analysis and a verified 32k Context window.', 'Open-weights frontier neural architecture developed by Google, featuring native 32k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/gemma-3-270m', 'Context Window: 32k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/gemma-3-270m', '[{"url":"https://artificialanalysis.ai/models/gemma-3-270m","text":"Gemma 3 270M on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/gemma-3-270m/providers","text":"Gemma 3 270M Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Gemma 4 12B', 'Google DeepMind', 'Model', 'NLP', 'Open Weights', 2026, '262k Context · Open Model', 'Frontier NLP model by Google benchmarked on Artificial Analysis and a verified 262k Context window.', 'Open-weights frontier neural architecture developed by Google, featuring native 262k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/gemma-4-12b', 'Context Window: 262k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/gemma-4-12b', '[{"url":"https://artificialanalysis.ai/models/gemma-4-12b","text":"Gemma 4 12B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/gemma-4-12b/providers","text":"Gemma 4 12B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('gigaspeech3', 'SpeechColab', 'Dataset', 'Audio', 'Open Data', 2026, '10M<n<100M', 'GigaSpeech 3 Scaling Multi-Dialect Arabic Speech Recognition with Weakly Labeled Data GigaSpeech 3 is a large-scale Arabic speech recognition corpus containing approx.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("speechcolab/gigaspeech3")', 'Trending Score: 19, Likes: 19, Downloads: 7,022', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/speechcolab/gigaspeech3', '[{"url":"https://huggingface.co/datasets/speechcolab/gigaspeech3","text":"speechcolab/gigaspeech3 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GitHub Copilot', 'Microsoft', 'AI', 'AI Coding', 'Proprietary', 2021, 'N/A', 'An AI pair programmer that offers autocomplete-style suggestions as you code, integrated directly into your IDE.', 'IDE Extension / Service (Powered by OpenAI models)', 'Install the GitHub Copilot extension in VS Code or JetBrains IDEs.', 'N/A', 'Paid subscription required, may suggest incorrect or insecure code.', 'https://github.com/features/copilot', '[{"url":"https://github.com/features/copilot","text":"GitHub Copilot"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Glean', 'Glean', 'AI', 'Productivity', 'Proprietary', 2024, 'Enterprise Cloud', 'Enterprise AI work assistant and enterprise search platform that connects across Google Workspace, Slack, Jira, GitHub, and Microsoft 365 with role-based permissions.', 'Enterprise knowledge graph with vector retrieval and semantic permission enforcement.', 'Ask Glean: "What is the status of project Orion and who is leading the security audit?"', 'Enterprise standard for trusted workplace search and LLM grounding across corporate apps.', 'Requires enterprise corporate deployment and IT administrator configuration.', 'https://www.glean.com', '[{"url":"https://www.glean.com","text":"Glean Enterprise Search"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GLM-5.3', 'Zhipu AI (THUDM)', 'Model', 'NLP', 'Open Weights', 2026, '1M Context · Open Model', 'Zhipu AI (THUDM)''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 32, Briefcase Elo of 1505, and a massive 1M context window.', 'Open-weights frontier neural architecture developed by Zhipu AI (THUDM), featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (76 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Zhipu/glm-5-3-max", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Zhipu/glm-5-3-max")', 'Intelligence Index: 32, Briefcase Elo: 1505, Accuracy: 32%, Non-Hallucination: 61%, FrontierCode: 22%, AutomationBench: 62%, TerminalBench 4: 42%, HLE Diamond: 18%, Speed: 76 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/glm-5-3', '[{"url":"https://artificialanalysis.ai/models/glm-5-3","text":"GLM-5.3 (max) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/glm-5-3/providers","text":"GLM-5.3 (max) Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GLM-5.3-Flash', 'Zhipu AI (THUDM)', 'Model', 'Multimodal', 'MIT', 2026, 'Open Weights', 'Open-weights Multimodal model developed by Zhipu AI (THUDM).', 'Zhipu AI image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("zai-org/GLM-5.3-Flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("zai-org/GLM-5.3-Flash")', 'Trending Score: 316, Likes: 2,099, Downloads: 761,364', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/zai-org/GLM-5.3-Flash', '[{"url":"https://huggingface.co/zai-org/GLM-5.3-Flash","text":"zai-org/GLM-5.3-Flash on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('glue', 'NYU MLL', 'Dataset', 'NLP', 'Open Data', 2026, '1M<n<10M', 'General Language Understanding Evaluation (GLUE) multi-task benchmark suite for natural language understanding.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nyu-mll/glue")', 'Trending Score: 199, Likes: 730, Downloads: 784,661', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nyu-mll/glue', '[{"url":"https://huggingface.co/datasets/nyu-mll/glue","text":"nyu-mll/glue on Hugging Face Datasets"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('godot-steering-ai-framework', 'GDQuest', 'Framework', 'NLP', 'MIT', 2026, '1MB Repo', 'A complete framework for Godot to create beautiful and complex AI motion. Works both in 2D and in 3D.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/GDQuest/godot-steering-ai-framework
cd godot-steering-ai-framework
pip install -e .', 'GitHub Stars: 1,551, Forks: 89', 'Requires local Python environment and dependency configuration.', 'https://github.com/GDQuest/godot-steering-ai-framework', '[{"url":"https://github.com/GDQuest/godot-steering-ai-framework","text":"GDQuest/godot-steering-ai-framework on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Google Antigravity', 'Google DeepMind', 'AI', 'AI Coding', 'Proprietary', 2026, 'Agentic IDE & Multi-Agent Swarm Platform', 'Google DeepMind''s agentic AI assistant and development environment designed for autonomous coding, multi-agent swarms, workspace orchestration, terminal execution, and verified artifact generation.', 'Agentic orchestration framework integrating DeepMind reasoning models, background subagent delegation, sandboxed terminal execution, and reactive state machine messaging.', 'Launch Antigravity in your workspace. Use commands like /goal, /boost, or /plan to direct agentic swarms across multi-file refactoring and testing workflows.', 'End-to-end task automation with zero-drift file modifications, native multi-agent swarm collaboration, and full TypeScript/Vite/Python development support.', 'Proprietary Google platform; requires workspace filesystem permissions and authenticated API access for frontier reasoning models.', 'https://deepmind.google/technologies/antigravity', '[{"url":"https://deepmind.google","text":"Google DeepMind Research & Technologies"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Google Gemini', 'Google DeepMind', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Google''s flagship AI assistant (formerly Bard), featuring multimodal capabilities and tight integration with Google Workspace.', 'Web Application / Conversational Agent (Powered by Gemini Pro / Ultra models)', 'Visit gemini.google.com to interact.', 'N/A', 'May hallucinate, some features are restricted by region.', 'https://gemini.google.com', '[{"url":"https://blog.google/technology/ai/google-gemini-ai/","text":"Gemini Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-3', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2020, '175B params', 'The landmark 175B parameter autoregressive language model that demonstrated few-shot learning and ignited the modern LLM era.', 'Transformer decoder with 96 attention layers.', '# GPT-3 is accessed via OpenAI''s legacy completions API
from openai import OpenAI
client = OpenAI()
response = client.completions.create(
  model="text-davinci-003",
  prompt="Translate to French: Hello, world!",
  max_tokens=60
)', 'SuperGLUE: 71.8% (few-shot)', 'Largely superseded, expensive, no chat interface natively.', 'https://openai.com/research/language-models-are-few-shot-learners', '[{"url":"https://arxiv.org/abs/2005.14165","text":"Brown et al. (2020) - GPT-3 Paper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-3.5 Turbo', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2022, 'Unknown (~175B params)', 'OpenAI''s workhorse model balancing performance and speed, widely used for chatbots and text generation at scale.', 'Transformer decoder fine-tuned with RLHF for instruction following.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[{"role": "user", "content": "Hello!"}]
)', 'MMLU: 70.0%, HumanEval: 48.1%', 'Knowledge cutoff, prone to hallucination on niche topics.', 'https://platform.openai.com/docs/models/gpt-3-5-turbo', '[{"url":"https://openai.com/blog/chatgpt","text":"ChatGPT Blog Post"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-4', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2023, 'Unknown (estimated 1.76T params)', 'Advanced large language model with multimodal capabilities for text and image understanding.', 'Transformer-based decoder architecture with advanced reasoning capabilities.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-4",
  messages=[{"role": "user", "content": "Hello!"}]
)', 'MMLU: 86.4%, HumanEval: 67%', 'Can hallucinate, expensive to run, proprietary with limited access.', 'https://openai.com/gpt-4', '[{"url":"https://openai.com/research/gpt-4","text":"Official GPT-4 Technical Report"},{"url":"https://platform.openai.com/docs","text":"GPT-4 API Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-4.5', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2025, 'Ultra-Large Dense', 'OpenAI''s massive knowledge foundation model (codenamed Orion) built for extraordinary conversational nuance, comprehensive world knowledge, reduced hallucinations, and deep multi-disciplinary analysis.', 'Ultra-scale multimodal Transformer trained on expansive multi-token prediction and unsupervised knowledge synthesis.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-4.5-preview",
  messages=[{"role": "user", "content": "Draft a rigorous scholarly treatise on macroeconomic monetary policy transitions."}]
)', 'SimpleQA: 62.5%, MMLU-Pro: 81.4%, 37% fewer hallucinations than GPT-4o', 'Substantial computational footprint; higher latency and token cost than GPT-4o mini.', 'https://openai.com', '[{"url":"https://openai.com","text":"OpenAI GPT-4.5 Research Overview"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-4o', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2024, 'N/A', 'OpenAI''s fastest and most advanced flagship model, featuring native multimodal capabilities across text, vision, and audio in real-time.', 'Transformer-based, natively multimodal omni-model.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role": "user", "content": "Hello!"}]
)', 'MMLU: 88.7%, HumanEval: 90.2%', 'Requires subscription for high limits, proprietary API, can hallucinate facts.', 'https://openai.com/chatgpt', '[{"url":"https://openai.com/index/hello-gpt-4o/","text":"GPT-4o Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-4o mini', 'OpenAI', 'Model', 'Multimodal', 'Proprietary', 2024, 'N/A', 'OpenAI''s most cost-efficient small model, replacing GPT-3.5 Turbo, offering significantly higher intelligence, broader multimodal capabilities, and a 128K context window at a fraction of the cost.', 'Transformer-based, natively multimodal omni-model.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[{"role": "user", "content": "Hello!"}]
)', 'MMLU: 82.0%, HumanEval: 87.0%', 'Less capable on highly complex reasoning tasks compared to GPT-4o.', 'https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/', '[{"url":"https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/","text":"GPT-4o mini Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6 Astra', 'OpenAI', 'Model', 'AI Coding', 'Proprietary', 2026, 'Frontier Multimodal MoE', 'OpenAI''s frontier flagship model released in September 2026, marking a generational leap in autonomous computer use, deep reasoning, and complex multi-step workflow automation across enterprise environments.', 'Massive multimodal Mixture-of-Experts with reinforcement learning over deep thought chains, native OS-level computer use drivers, and dynamic tool orchestration.', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-astra",
  messages=[{"role": "user", "content": "Execute an end-to-end security audit and refactor the authentication pipeline."}]
)', 'Intelligence Index: 55, Briefcase Elo: 1505, Accuracy: 61%, Non-Hallucination: 57%, FrontierCode: 40%, AutomationBench: 67%, TerminalBench 4: 54%, HLE Diamond: 59%, Speed: 63 tok/s, Context Window: 1M', 'Available via ChatGPT Plus/Pro/Work and enterprise API; high compute intensity for prolonged agentic execution loops.', 'https://openai.com', '[{"url":"https://openai.com","text":"OpenAI GPT-6 Astra Announcement & Technical Report"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6 Luna', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'OpenAI''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 28, Briefcase Elo of 1337, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (118 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-luna-max",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 28, Briefcase Elo: 1337, Accuracy: 40%, Non-Hallucination: 21%, FrontierCode: 25%, AutomationBench: 53%, TerminalBench 4: 13%, HLE Diamond: 22%, Speed: 118 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($0.1/M in, $0.5/M out).', 'https://artificialanalysis.ai/models/gpt-6-luna', '[{"url":"https://artificialanalysis.ai/models/gpt-6-luna","text":"GPT-6 Luna (max) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/gpt-6-luna/providers","text":"GPT-6 Luna (max) Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Sol', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'OpenAI''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 50, Briefcase Elo of 1467, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (60 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-sol-high",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 50, Briefcase Elo: 1467, Accuracy: 60%, Non-Hallucination: 51%, FrontierCode: 37%, AutomationBench: 64%, TerminalBench 4: 52%, HLE Diamond: 52%, Speed: 60 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-sol-high', '[{"url":"https://artificialanalysis.ai/models/gpt-6-1-sol-high","text":"GPT-6.1 Sol (high) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/gpt-6-1-sol-high/providers","text":"GPT-6.1 Sol (high) Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.1 Terra', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1M Context · Proprietary Model', 'OpenAI''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 42, Briefcase Elo of 1264, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (91 tok/s).', 'from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
  model="gpt-6-1-terra-high",
  messages=[{"role": "user", "content": "Execute frontier reasoning workflow."}]
)', 'Intelligence Index: 42, Briefcase Elo: 1264, Accuracy: 47%, Non-Hallucination: 63%, FrontierCode: 37%, AutomationBench: 58%, TerminalBench 4: 42%, HLE Diamond: 35%, Speed: 91 tok/s, Context Window: 1M', 'Proprietary cloud API access via OpenAI developer platform; subject to API rate limits and token pricing ($1/M in, $5/M out).', 'https://artificialanalysis.ai/models/gpt-6-1-terra-high', '[{"url":"https://artificialanalysis.ai/models/gpt-6-1-terra-high","text":"GPT-6.1 Terra (high) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/gpt-6-1-terra-high/providers","text":"GPT-6.1 Terra (high) Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.2 Astra', 'OpenAI', 'Model', 'NLP', 'Proprietary', 2026, '1050k Context · Available via API', 'GPT-6.2 Astra is the flagship model in the GPT-6.2 series from OpenAI, built for the hardest projects. It is suited for real-world engineering, professional work and scientific res.', 'Modern foundation model hosted on OpenRouter with native 1050k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "openai/gpt-6.2-astra",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1050k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/openai/gpt-6.2-astra', '[{"url":"https://openrouter.ai/openai/gpt-6.2-astra","text":"OpenAI: GPT-6.2 Astra on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GPT-6.2 Sol', 'OpenAI', 'Model', 'Research', 'Proprietary', 2026, '1000k Context · Proprietary Model', 'GPT-6.2 Sol is an upgrade to GPT-6.1 Sol from OpenAI, positioned below the flagship GPT-6.2 Astra in the GPT-6.2 series. It is an efficient, versatile model for everyday work, suit.', 'Proprietary frontier neural architecture developed by OpenAI, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/gpt-6-2-sol', 'Context Window: 1000k Context, Intelligence Index: 55.6, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/gpt-6-2-sol', '[{"url":"https://artificialanalysis.ai/models/gpt-6-2-sol","text":"GPT-6.2 Sol on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/gpt-6-2-sol/providers","text":"GPT-6.2 Sol Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('gpt-oss-20b', 'OpenAI', 'Model', 'Research', 'Open Weights', 2026, '131k Context · Open Model', 'Frontier Research model by OpenAI benchmarked on Artificial Analysis and a verified 131k Context window.', 'Open-weights frontier neural architecture developed by OpenAI, featuring native 131k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/gpt-oss-20b', 'Context Window: 131k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/gpt-oss-20b', '[{"url":"https://artificialanalysis.ai/models/gpt-oss-20b","text":"gpt-oss-20b on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/gpt-oss-20b/providers","text":"gpt-oss-20b Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grammarly', 'Grammarly', 'AI', 'Productivity', 'Proprietary', 2009, 'N/A', 'An AI-powered writing assistant that checks grammar, spelling, tone, clarity, and style in real-time across browsers, documents, and email clients.', 'Browser Extension / SaaS (Proprietary NLP models + generative AI layer)', 'Install the Grammarly browser extension from grammarly.com or use the desktop app.', 'N/A', 'Premium plan required for advanced suggestions; can occasionally suggest unnatural rephrasing.', 'https://www.grammarly.com', '[{"url":"https://www.grammarly.com","text":"Grammarly"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Granary-v2', 'NVIDIA', 'Dataset', 'Audio', 'OpenMDW-1.1', 2026, 'Curated Dataset', 'Granary-v2: Multilingual Speech Recognition, Translation and Instruction Data Granary-v2 is NVIDIA''s second rel.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("nvidia/Granary-v2")', 'Trending Score: 23, Likes: 23, Downloads: 1,074', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/nvidia/Granary-v2', '[{"url":"https://huggingface.co/datasets/nvidia/Granary-v2","text":"nvidia/Granary-v2 on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Granite 3.0 8B Instruct', 'IBM', 'Model', 'NLP', 'Apache-2.0', 2024, '8B Parameters · 128k Context', 'IBM''s enterprise-grade open foundation model trained on over 12 trillion tokens across 12 languages and 116 programming languages, optimized for enterprise RAG, tool calling, and structured reasoning.', 'Decoder-only dense transformer with grouped-query attention, RoPE positional embeddings, and instruction tuning over curated enterprise safety datasets.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("ibm-granite/granite-3.0-8b-instruct", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("ibm-granite/granite-3.0-8b-instruct")', 'MMLU: 67.5%, GSM8K: 77.0%, HumanEval: 62.2%, Berkeley Function Calling Leaderboard: 89.2%', 'Primarily optimized for enterprise English and structured workflows; lower performance on niche low-resource multilingual natural dialogue.', 'https://www.ibm.com/granite', '[{"url":"https://www.ibm.com/granite","text":"IBM Granite 3.0 Technical Overview"},{"url":"https://huggingface.co/ibm-granite/granite-3.0-8b-instruct","text":"Granite 3.0 8B Instruct on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Granite 4.0 Micro', 'IBM', 'Model', 'NLP', 'Open Weights', 2026, '128k Context · Open Model', 'Frontier NLP model by IBM benchmarked on Artificial Analysis and a verified 128k Context window.', 'Open-weights frontier neural architecture developed by IBM, featuring native 128k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/granite-4-0-micro', 'Context Window: 128k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/granite-4-0-micro', '[{"url":"https://artificialanalysis.ai/models/granite-4-0-micro","text":"Granite 4.0 Micro on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/granite-4-0-micro/providers","text":"Granite 4.0 Micro Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Granite 4.2 30B', 'IBM', 'Model', 'Research', 'Open Weights', 2026, '131k Context · Open Model', 'Frontier Research model by IBM benchmarked on Artificial Analysis with an Intelligence Index of 5.5 and a verified 131k Context window.', 'Open-weights frontier neural architecture developed by IBM, featuring native 131k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/granite-4-2-30b', 'Context Window: 131k Context, Intelligence Index: 5.5, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/granite-4-2-30b', '[{"url":"https://artificialanalysis.ai/models/granite-4-2-30b","text":"Granite 4.2 30B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/granite-4-2-30b/providers","text":"Granite 4.2 30B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Granite 4.2 3B', 'IBM', 'Model', 'Research', 'Open Weights', 2026, '131k Context · Open Model', 'Frontier Research model by IBM benchmarked on Artificial Analysis with an Intelligence Index of 4.7 and a verified 131k Context window.', 'Open-weights frontier neural architecture developed by IBM, featuring native 131k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/granite-4-2-3b', 'Context Window: 131k Context, Intelligence Index: 4.7, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/granite-4-2-3b', '[{"url":"https://artificialanalysis.ai/models/granite-4-2-3b","text":"Granite 4.2 3B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/granite-4-2-3b/providers","text":"Granite 4.2 3B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Granola AI', 'Granola', 'AI', 'Productivity', 'Proprietary', 2024, 'Desktop app', 'AI notepad for meetings that combines human typing with customizable LLM transcript enhancement to produce clear, actionable meeting notes without intrusive bots.', 'Local audio capture + Whisper transcription + fine-tuned LLM synthesis.', 'Launch Granola on Mac during a Zoom or Google Meet call, take quick notes, and click enhance.', 'Praised by thousands of founders and executives for non-intrusive bot-free note taking.', 'Currently macOS native application.', 'https://www.granola.ai', '[{"url":"https://www.granola.ai","text":"Granola"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok', 'xAI', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'An AI assistant developed by xAI, designed to have a bit of wit, a rebellious streak, and real-time access to X (Twitter) data.', 'Web Application / Conversational Agent (Powered by Grok models)', 'Access via X Premium subscription.', 'N/A', 'Requires an active X Premium subscription.', 'https://x.ai', '[{"url":"https://x.ai/blog/grok","text":"Grok Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok 3', 'xAI', 'Model', 'NLP', 'Proprietary', 2025, 'Colossus Cluster MoE', 'xAI''s flagship frontier reasoning model trained on the 100,000 H100 Colossus cluster, delivering frontier mathematical deduction, competitive programming mastery, and real-time truth-seeking deep reasoning modes.', 'Massive-scale Mixture-of-Experts with reinforcement learning from test-time reasoning tokens and synthetic data verification.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_XAI_KEY", base_url="https://api.x.ai/v1")
response = client.chat.completions.create(
  model="grok-3",
  messages=[{"role": "user", "content": "Prove this lemma on non-abelian gauge theories."}]
)', 'AIME 2025: 84.5%, MATH-500: 94.8%, HumanEval: 91.4%, GPQA: 68.2%', 'Proprietary cloud service; extended reasoning modes consume high token counts and increase latency.', 'https://x.ai', '[{"url":"https://x.ai","text":"xAI Grok 3 Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok 4.7', 'xAI', 'Model', 'NLP', 'Proprietary', 2026, '500k Context · Proprietary Model', 'xAI''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 35, Briefcase Elo of 1629, and a massive 500k context window.', 'Proprietary frontier neural architecture developed by xAI, featuring native 500k token window support, optimized reasoning chains, and low-latency inference throughput (78 tok/s).', 'from openai import OpenAI
client = OpenAI(base_url="https://api.x.ai/v1", api_key="XAI_API_KEY")
response = client.chat.completions.create(
  model="grok-4-7-high",
  messages=[{"role": "user", "content": "Analyze real-time data streaming telemetry."}]
)', 'Intelligence Index: 35, Briefcase Elo: 1629, Accuracy: 42%, Non-Hallucination: 80%, FrontierCode: 28%, AutomationBench: 64%, TerminalBench 4: 25%, HLE Diamond: 24%, Speed: 78 tok/s, Context Window: 500k', 'Proprietary cloud API access via xAI developer platform; subject to API rate limits and token pricing ($2/M in, $6/M out).', 'https://artificialanalysis.ai/models/grok-4-7-high', '[{"url":"https://artificialanalysis.ai/models/grok-4-7-high","text":"Grok 4.7 (high) on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/grok-4-7-high/providers","text":"Grok 4.7 (high) Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok-1', 'xAI', 'Model', 'NLP', 'Apache-2.0', 2024, '314B total (86B active per token)', 'xAI''s open-weights MoE language model, the first large model from Elon Musk''s AI company, trained with a focus on real-time information and humor.', 'Sparse MoE transformer with 8 experts.', '# Grok-1 weights available on HuggingFace
# Run locally with sufficient GPU cluster
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("xai-org/grok-1")', 'MMLU: 73%, HumanEval: 63.2%', 'Extremely large model requiring significant compute, not production-API accessible.', 'https://x.ai/', '[{"url":"https://x.ai/blog/grok-os","text":"Grok-1 Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Grok-2', 'xAI', 'Model', 'Multimodal', 'Proprietary', 2024, 'N/A', 'xAI''s frontier model demonstrating significant improvements in reasoning, coding, and mathematical capabilities, integrated with real-time X (Twitter) data and image generation.', 'Transformer-based multimodal LLM.', '# Accessed via X Premium subscription or xAI API
import os
from openai import OpenAI
client = OpenAI(api_key=os.environ.get("XAI_API_KEY"), base_url="https://api.x.ai/v1")
response = client.chat.completions.create(model="grok-2-latest", messages=[{"role": "user", "content": "Hi"}])', 'Competitive with GPT-4o and Claude 3.5 Sonnet on LMSYS Chatbot Arena.', 'Requires subscription to X or API access, proprietary.', 'https://x.ai/', '[{"url":"https://x.ai/blog/grok-2","text":"Grok-2 Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GroqCloud', 'Groq', 'Platform', 'MLOps', 'Proprietary', 2024, 'LPU clusters', 'Ultra-fast AI inference platform powered by Groq''s custom LPU (Language Processing Unit) silicon, generating 500+ tokens per second for open LLMs.', 'Deterministic tensor streaming architecture on custom silicon.', 'from groq import Groq
client = Groq(api_key="GROQ_API_KEY")
response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "Summarize this live."}]
)', '550+ tokens/sec on Llama 3.3 70B, over 10x faster than standard GPU clouds.', 'Limited context window lengths compared to huge GPU memory clusters.', 'https://groq.com', '[{"url":"https://groq.com","text":"Groq LPU Architecture"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('GSM8K', 'OpenAI', 'Dataset', 'NLP', 'MIT', 2021, '8,500 problems (7,500 train / 1,319 test)', 'A dataset of 8,500 high-quality grade-school math word problems requiring multi-step reasoning, used to evaluate arithmetic reasoning in LLMs.', 'Multi-step word problems with natural language solutions and final numerical answers.', 'from datasets import load_dataset
dataset = load_dataset("gsm8k", "main")
print(dataset[''test''][0])', 'GPT-4: 92%, Claude 3 Opus: 95.0%, Llama 3 70B: 93%', 'Grade-school level only, top models now saturate this benchmark.', 'https://github.com/openai/grade-school-math', '[{"url":"https://arxiv.org/abs/2110.14168","text":"Cobbe et al. (2021) - GSM8K Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Haru-4B', 'Higurashi AI', 'Model', 'Audio', 'Apache-2.0', 2026, '4B params', 'Open-weights Audio model developed by Higurashi AI.', 'higurashi-ai audio to audio architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("higurashi-ai/Haru-4B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("higurashi-ai/Haru-4B")', 'Trending Score: 203, Likes: 217, Downloads: 1,262', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/higurashi-ai/Haru-4B', '[{"url":"https://huggingface.co/higurashi-ai/Haru-4B","text":"higurashi-ai/Haru-4B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Helicone', 'Helicone', 'Platform', 'MLOps', 'Apache-2.0 / Cloud', 2023, 'N/A', 'Open-source LLM observability, smart proxy caching, rate limiting, and cost tracking platform designed for production AI teams.', 'Edge reverse proxy with low-latency async logging and response caching.', 'from openai import OpenAI
client = OpenAI(base_url="https://oai.helicone.ai/v1", default_headers={"Helicone-Auth": "Bearer HELICONE_API_KEY"})', 'Caches repeated semantic queries reducing API bills by up to 40%.', 'Requires routing OpenAI SDK traffic through Helicone proxy URL.', 'https://www.helicone.ai', '[{"url":"https://docs.helicone.ai","text":"Helicone Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hemmingway-1', 'Altworld', 'Model', 'NLP', 'CC-BY-NC-4.0', 2026, 'Open Weights', 'Open-weights NLP model developed by Altworld.', 'Altworld text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Altworld/Hemmingway-1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Altworld/Hemmingway-1")', 'Trending Score: 565, Likes: 579, Downloads: 3,787', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Altworld/Hemmingway-1', '[{"url":"https://huggingface.co/Altworld/Hemmingway-1","text":"Altworld/Hemmingway-1 on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hermes 4 - Llama-3.1 70B', 'Nous Research', 'Model', 'NLP', 'Open Weights', 2026, '128k Context · Open Model', 'Frontier NLP model by Nous Research benchmarked on Artificial Analysis and a verified 128k Context window.', 'Open-weights frontier neural architecture developed by Nous Research, featuring native 128k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/hermes-4-llama-3-1-70b', 'Context Window: 128k Context, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/hermes-4-llama-3-1-70b', '[{"url":"https://artificialanalysis.ai/models/hermes-4-llama-3-1-70b","text":"Hermes 4 - Llama-3.1 70B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/hermes-4-llama-3-1-70b/providers","text":"Hermes 4 - Llama-3.1 70B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hexabot', 'Hexabot', 'Framework', 'NLP', 'Open Source', 2026, '54MB Repo', 'Hexabot v3 is an AI workflow automation platform, combining workflows, actions, agents, and conversational channels in one runtime.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/hexabot-ai/Hexabot
cd Hexabot
pip install -e .', 'GitHub Stars: 1,217, Forks: 242', 'Requires local Python environment and dependency configuration.', 'https://github.com/hexabot-ai/Hexabot', '[{"url":"https://github.com/hexabot-ai/Hexabot","text":"hexabot-ai/Hexabot on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HeyGen', 'HeyGen', 'AI', 'Video Generation', 'Proprietary', 2020, 'N/A', 'An AI video generation platform specializing in realistic AI avatar videos and video translation with lip-sync, widely used for marketing and corporate communications.', 'Web Application (Proprietary talking-head synthesis and lip-sync AI model)', 'Visit heygen.com, choose an avatar or upload your own, write a script, and generate a video.', 'N/A', 'Free tier is very limited; video translation accuracy can vary with complex audio.', 'https://www.heygen.com', '[{"url":"https://www.heygen.com","text":"HeyGen"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('hh-rlhf', 'Anthropic', 'Dataset', 'NLP', 'MIT', 2026, '100K<n<1M', 'Human preference dataset released by Anthropic containing helpful and harmless dialogue comparison pairs for RLHF alignment.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("Anthropic/hh-rlhf")', 'Trending Score: 33, Likes: 2,043, Downloads: 39,538', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/Anthropic/hh-rlhf', '[{"url":"https://huggingface.co/datasets/Anthropic/hh-rlhf","text":"Anthropic/hh-rlhf on Hugging Face Datasets"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('hle', 'Center for AI Safety (CAIS)', 'Dataset', 'Research', 'MIT', 2026, '1K<n<10K', 'Humanity''s Last Exam benchmark by CAIS and Scale AI evaluating frontier models on expert-level multimodal academic problems.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("cais/hle")', 'Trending Score: 15, Likes: 1,036, Downloads: 28,753', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/cais/hle', '[{"url":"https://huggingface.co/datasets/cais/hle","text":"cais/hle on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('horus', 'Softmata', 'Framework', 'MLOps', 'Apache-2.0', 2026, '146MB Repo', 'Fastest Robotics Runtime System. If phones have Android, robots deserve HORUS.', 'Modular AI codebase with native Python/C++ bindings and distributed workflow support.', 'git clone https://github.com/softmata/horus
cd horus
pip install -e .', 'GitHub Stars: 435, Forks: 31', 'Requires local Python environment and dependency configuration.', 'https://github.com/softmata/horus', '[{"url":"https://github.com/softmata/horus","text":"softmata/horus on GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hugging Face', 'Hugging Face', 'Platform', 'MLOps', 'Apache-2.0 (libraries)', 2016, '1M+ models hosted', 'Open platform for sharing and collaborating on ML models, datasets, and applications.', 'Cloud platform with transformers library, model hub, and deployment tools.', 'from transformers import pipeline
classifier = pipeline("sentiment-analysis")
result = classifier("I love this encyclopedia!")', 'Most popular model hub globally', 'Free tier has rate limits, deploying large models requires paid endpoints.', 'https://huggingface.co', '[{"url":"https://huggingface.co/docs","text":"Hugging Face Documentation"},{"url":"https://github.com/huggingface/transformers","text":"Transformers Library"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HuggingChat', 'Hugging Face', 'AI', 'NLP', 'Open Source UI / Various model licenses', 2023, 'N/A', 'An open-source AI assistant by Hugging Face, allowing users to converse with various top-tier open-weight models.', 'Web Application (Supports Llama, Mistral, Command R, etc.)', 'Visit huggingface.co/chat to interact.', 'N/A', 'Model availability may rotate, performance depends on the selected underlying model.', 'https://huggingface.co/chat', '[{"url":"https://huggingface.co/chat","text":"HuggingChat"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HumanEval', 'OpenAI', 'Dataset', 'NLP', 'MIT', 2021, '164 hand-written programming problems', 'OpenAI''s benchmark of 164 hand-crafted Python programming problems to evaluate the code generation capability of language models.', 'Python functions with docstrings and unit tests; evaluated by pass@k metric.', 'from datasets import load_dataset
dataset = load_dataset("openai_humaneval")
print(dataset[''test''][0][''prompt''])', 'GPT-4: 67%, Claude 3.5 Sonnet: 92%, Llama 3 70B: 81.7%', 'Python-only, relatively small size, may be contaminated in model training data.', 'https://github.com/openai/human-eval', '[{"url":"https://arxiv.org/abs/2107.03374","text":"Chen et al. (2021) - Evaluating LLMs Trained on Code"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HunyuanVideo', 'Tencent', 'Model', 'Video Generation', 'Apache-2.0', 2024, '13B params', 'Tencent''s open-weights 13B dual-stream text-to-video foundation model delivering cinema-quality 720p 24fps video clips with exceptional physics consistency.', 'Dual-stream Diffusion Transformer (DiT) integrating 3D VAE with text-video cross-attention.', 'from diffusers import HunyuanVideoPipeline
pipe = HunyuanVideoPipeline.from_pretrained("Tencent-Hunyuan/HunyuanVideo", torch_dtype=torch.bfloat16)
video = pipe("Astronaut riding a horse on the moon, cinematic 4k").frames[0]', 'VBench Total: 85.2% (Top ranked open-source text-to-video model)', 'High VRAM requirements (recommended 44GB+ for unquantized inference).', 'https://github.com/Tencent/HunyuanVideo', '[{"url":"https://arxiv.org/abs/2412.03603","text":"HunyuanVideo Technical Report"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hy-Memory-30B-A3B', 'Tencent', 'Model', 'NLP', 'Apache-2.0', 2026, '30B params', 'Open-weights NLP model developed by Tencent.', 'tencent text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("tencent/Hy-Memory-30B-A3B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("tencent/Hy-Memory-30B-A3B")', 'Trending Score: 185, Likes: 186, Downloads: 1,187', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/tencent/Hy-Memory-30B-A3B', '[{"url":"https://huggingface.co/tencent/Hy-Memory-30B-A3B","text":"tencent/Hy-Memory-30B-A3B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hy-SimulMT-30B-A3B-FP8', 'Tencent', 'Model', 'NLP', 'Apache-2.0', 2026, '30B params', 'Open-weights NLP model developed by Tencent.', 'tencent translation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("tencent/Hy-SimulMT-30B-A3B-FP8", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("tencent/Hy-SimulMT-30B-A3B-FP8")', 'Trending Score: 333, Likes: 338, Downloads: 165', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/tencent/Hy-SimulMT-30B-A3B-FP8', '[{"url":"https://huggingface.co/tencent/Hy-SimulMT-30B-A3B-FP8","text":"tencent/Hy-SimulMT-30B-A3B-FP8 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Hy4-flash', 'Tencent', 'Model', 'NLP', 'Open Weights', 2026, 'Open Weights', 'Cost-efficient variant of Tencent''s Hy4 foundation model engineered for low-latency and high-throughput generation.', 'tencent image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("tencent/Hy4-flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("tencent/Hy4-flash")', 'Context Window: 1049k Context, Available across global OpenRouter inference nodes.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/tencent/Hy4-flash', '[{"url":"https://huggingface.co/tencent/Hy4-flash","text":"tencent/Hy4-flash on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('HyperCLOVA X', 'Naver', 'AI', 'NLP', 'Proprietary', 2023, 'N/A', 'Naver''s large-scale Korean-English bilingual AI assistant, fine-tuned for Korean cultural context and integrated into Naver''s search and services.', 'Web Application / Conversational Agent (Powered by HyperCLOVA X model)', 'Access via clova.ai or integrated directly into Naver Search and other Naver services.', 'N/A', 'Primarily focused on Korean and English; limited global availability.', 'https://clova.ai', '[{"url":"https://clova.ai","text":"HyperCLOVA X"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('hyperflow-h3-flash', 'VideoRebirth AI', 'Model', 'Multimodal', 'Open Weights', 2026, 'Open Weights', 'Open-weights Multimodal model developed by VideoRebirth AI.', 'VideoRebirthAI image text to video architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("VideoRebirthAI/hyperflow-h3-flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("VideoRebirthAI/hyperflow-h3-flash")', 'Trending Score: 167, Likes: 175, Downloads: 110,752', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/VideoRebirthAI/hyperflow-h3-flash', '[{"url":"https://huggingface.co/VideoRebirthAI/hyperflow-h3-flash","text":"VideoRebirthAI/hyperflow-h3-flash on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ideogram', 'Ideogram', 'AI', 'Image Generation', 'Proprietary', 2023, 'N/A', 'An AI image generation tool that excels at rendering accurate, legible text within images — a long-standing weakness of most diffusion models.', 'Web Application (Proprietary text-aware image generation model)', 'Visit ideogram.ai, sign in, and generate images with text prompts including typographic elements.', 'N/A', 'Free tier limits daily generations; less photorealistic than Midjourney for non-text images.', 'https://ideogram.ai', '[{"url":"https://ideogram.ai","text":"Ideogram AI"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('ImageNet', 'Stanford AI', 'Dataset', 'Computer Vision', 'Various (academic use)', 2009, '14M images, 150GB', 'Large-scale image dataset with 14M+ images across 20K+ categories.', 'Hierarchical organization based on WordNet, 1000 classes for ILSVRC.', 'from torchvision.datasets import ImageNet
dataset = ImageNet(root=''./data'', split=''train'')', 'Standard benchmark for computer vision (ImageNet-1K)', 'Some labeling issues, Western-centric bias.', 'https://image-net.org', '[{"url":"https://ieeexplore.ieee.org/document/5206848","text":"Deng et al. (2009) - ImageNet Paper"},{"url":"https://image-net.org","text":"Official ImageNet Website"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('imdb', 'Stanford AI', 'Dataset', 'NLP', 'Open Data', 2026, '100K<n<1M', 'Large Movie Review Dataset of 50,000 labeled film reviews curated at Stanford for binary sentiment classification.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("stanfordnlp/imdb")', 'Trending Score: 216, Likes: 698, Downloads: 189,340', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/stanfordnlp/imdb', '[{"url":"https://huggingface.co/datasets/stanfordnlp/imdb","text":"stanfordnlp/imdb on Hugging Face Datasets"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('indra-ocr', 'DataLab', 'Model', 'Computer Vision', 'OpenRAIL', 2026, 'Open Weights', 'Open-weights optical character recognition and document layout parsing model developed by DataLab.', 'datalab-to image to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("datalab-to/indra-ocr", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("datalab-to/indra-ocr")', 'Trending Score: 190, Likes: 192, Downloads: 1,811', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/datalab-to/indra-ocr', '[{"url":"https://huggingface.co/datalab-to/indra-ocr","text":"datalab-to/indra-ocr on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Inkling', 'Thinking Machines', 'Model', 'Research', 'Open Weights', 2026, '1000k Context · Open Model', 'Frontier Research model by Thinking Machines benchmarked on Artificial Analysis with an Intelligence Index of 12.5 and a verified 1000k Context window.', 'Open-weights frontier neural architecture developed by Thinking Machines, featuring native 1000k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/inkling', 'Context Window: 1000k Context, Intelligence Index: 12.5, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/inkling', '[{"url":"https://artificialanalysis.ai/models/inkling","text":"Inkling on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/inkling/providers","text":"Inkling Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Inkling-2-Mini', 'Thinking Machines', 'Model', 'Multimodal', 'Apache-2.0', 2026, 'Open Weights', 'Inkling 2 Mini is an open-weight multimodal looped transformer from Thinking Machines Lab, with 3.4B active parameters out of 26.4B total (MoE). Its middle layers run three times w.', 'thinkingmachines image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("thinkingmachines/Inkling-2-Mini", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("thinkingmachines/Inkling-2-Mini")', 'Context Window: 1049k Context, Available across global OpenRouter inference nodes.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/thinkingmachines/Inkling-2-Mini', '[{"url":"https://huggingface.co/thinkingmachines/Inkling-2-Mini","text":"thinkingmachines/Inkling-2-Mini on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Inkling-2-Small', 'Thinking Machines', 'Model', 'Multimodal', 'Apache-2.0', 2026, 'Open Weights', 'Inkling 2 Small is an open-weight multimodal mixture-of-experts reasoning model from Thinking Machines Lab, with 17B active parameters out of 594B total. It is the first model in t.', 'thinkingmachines image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("thinkingmachines/Inkling-2-Small", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("thinkingmachines/Inkling-2-Small")', 'Context Window: 1049k Context, Available across global OpenRouter inference nodes.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/thinkingmachines/Inkling-2-Small', '[{"url":"https://huggingface.co/thinkingmachines/Inkling-2-Small","text":"thinkingmachines/Inkling-2-Small on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Instructor', 'Jason Liu', 'Framework', 'MLOps', 'MIT', 2024, 'N/A', 'Python and TypeScript library built on Pydantic to extract guaranteed, strictly validated structured data from any LLM provider.', 'Pydantic schema injection and automatic validation retry handler.', 'import instructor
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
)', 'Eliminates structured JSON extraction parse failures across 10+ LLM backends.', 'Relies on underlying LLM function calling or tool use capabilities.', 'https://github.com/jxnl/instructor', '[{"url":"https://python.useinstructor.com","text":"Instructor Docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Jasper', 'Jasper', 'AI', 'Productivity', 'Proprietary', 2021, 'N/A', 'An AI content writing platform designed for marketing teams, capable of generating blog posts, ad copy, social media content, and brand-consistent text at scale.', 'Web Application (Powered by GPT-4 and other LLMs with marketing-specific fine-tuning)', 'Visit jasper.ai to sign up and use the web editor for AI content generation.', 'N/A', 'Expensive subscription plans; outputs may still require human editing for accuracy.', 'https://www.jasper.ai', '[{"url":"https://www.jasper.ai","text":"Jasper AI"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('JAX', 'Google DeepMind', 'Framework', 'MLOps', 'Apache-2.0', 2018, 'N/A', 'Google''s high-performance numerical computing library combining Autograd and XLA, enabling GPU/TPU-accelerated ML research with functional transformations.', 'NumPy-compatible API with JIT compilation, vectorization (vmap), and automatic differentiation (grad).', 'import jax
import jax.numpy as jnp

@jax.jit
def predict(params, x):
  return jnp.dot(x, params[''w'']) + params[''b'']

grad_fn = jax.grad(lambda params, x, y: jnp.mean((predict(params, x) - y)**2))', 'Powers many state-of-the-art research papers at Google DeepMind', 'Steeper learning curve, functional style requires adapting existing code.', 'https://github.com/google/jax', '[{"url":"https://github.com/google/jax","text":"JAX GitHub Repository"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('JT-35B-Flash', 'China Mobile', 'Model', 'NLP', 'Proprietary', 2026, '256k Context · Proprietary Model', 'Frontier NLP model by China Mobile benchmarked on Artificial Analysis and a verified 256k Context window.', 'Proprietary frontier neural architecture developed by China Mobile, featuring native 256k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/jt-35b-flash', 'Context Window: 256k Context, Benchmarked on Artificial Analysis Leaderboard', 'Cloud API access subject to provider rate limits and compute quotas.', 'https://artificialanalysis.ai/models/jt-35b-flash', '[{"url":"https://artificialanalysis.ai/models/jt-35b-flash","text":"JT-35B-Flash on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/jt-35b-flash/providers","text":"JT-35B-Flash Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Julia-1', 'Supersonic Labs', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by Supersonic Labs.', 'SupersonicLabs text classification architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("SupersonicLabs/Julia-1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("SupersonicLabs/Julia-1")', 'Trending Score: 354, Likes: 370, Downloads: 2,909', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/SupersonicLabs/Julia-1', '[{"url":"https://huggingface.co/SupersonicLabs/Julia-1","text":"SupersonicLabs/Julia-1 on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('K-EXAONE 2.0', 'LG AI Research', 'Model', 'Research', 'Open Weights', 2026, '262k Context · Open Model', 'Frontier Research model by LG AI Research benchmarked on Artificial Analysis with an Intelligence Index of 7.6 and a verified 262k Context window.', 'Open-weights frontier neural architecture developed by LG AI Research, featuring native 262k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/k-exaone-2-0', 'Context Window: 262k Context, Intelligence Index: 7.6, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/k-exaone-2-0', '[{"url":"https://artificialanalysis.ai/models/k-exaone-2-0","text":"K-EXAONE 2.0 on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/k-exaone-2-0/providers","text":"K-EXAONE 2.0 Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('K2 Horizon 7B', 'Institute of Foundation Models', 'Model', 'Research', 'Open Weights', 2026, '524k Context · Open Model', 'Frontier Research model by Institute of Foundation Models benchmarked on Artificial Analysis with an Intelligence Index of 10.6 and a verified 524k Context window.', 'Open-weights frontier neural architecture developed by Institute of Foundation Models, featuring native 524k Context token window support and optimized reasoning chains.', 'Explore benchmarks and inference providers directly on Artificial Analysis: https://artificialanalysis.ai/models/k2-horizon-7b', 'Context Window: 524k Context, Intelligence Index: 10.6, Benchmarked on Artificial Analysis Leaderboard', 'Requires multi-GPU tensor-parallel nodes or local quantization for high-throughput deployment.', 'https://artificialanalysis.ai/models/k2-horizon-7b', '[{"url":"https://artificialanalysis.ai/models/k2-horizon-7b","text":"K2 Horizon 7B on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/k2-horizon-7b/providers","text":"K2 Horizon 7B Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kandinsky-ImageSR-2.0', 'Kandinsky Lab', 'Model', 'Image Generation', 'MIT', 2026, 'Open Weights', 'High-fidelity generative image super-resolution model developed by Kandinsky Lab.', 'kandinskylab image to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("kandinskylab/Kandinsky-ImageSR-2.0", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("kandinskylab/Kandinsky-ImageSR-2.0")', 'Trending Score: 141, Likes: 186, Downloads: 582', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/kandinskylab/Kandinsky-ImageSR-2.0', '[{"url":"https://huggingface.co/kandinskylab/Kandinsky-ImageSR-2.0","text":"kandinskylab/Kandinsky-ImageSR-2.0 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Keras', 'Google DeepMind', 'Framework', 'MLOps', 'Apache-2.0', 2015, 'N/A', 'A high-level deep learning API that runs on top of TensorFlow, JAX, or PyTorch, designed for fast experimentation with a human-centric design philosophy.', 'Multi-backend deep learning API (TF/JAX/PyTorch) with layer, model, and optimizer abstractions.', 'import keras
model = keras.Sequential([
  keras.layers.Dense(64, activation=''relu''),
  keras.layers.Dense(1, activation=''sigmoid'')
])
model.compile(optimizer=''adam'', loss=''binary_crossentropy'')
model.fit(x_train, y_train, epochs=10)', 'N/A — high-level API; backend-dependent performance', 'Less flexibility than raw PyTorch for custom training loops.', 'https://keras.io', '[{"url":"https://keras.io/guides/","text":"Keras Official Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Khanmigo', 'Khan Academy', 'AI', 'Education', 'Proprietary', 2023, 'N/A', 'An AI tutor by Khan Academy that guides students through topics using the Socratic method, asking questions rather than giving direct answers to encourage learning.', 'Web Application (Powered by GPT-4 with educational fine-tuning and guardrails)', 'Access at khanacademy.org; available to students and teachers with a Khan Academy account.', 'N/A', 'Requires a Khan Academy account; primarily focused on K-12 curriculum topics.', 'https://www.khanacademy.org/khan-labs', '[{"url":"https://www.khanacademy.org/khan-labs","text":"Khanmigo by Khan Academy"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kimi k1.5', 'Moonshot AI', 'Model', 'Multimodal', 'Proprietary', 2025, 'Frontier Multimodal', 'Moonshot AI''s multimodal reasoning model with native visual math and long-horizon planning, trained with policy optimization and Monte Carlo Tree Search across text, images, and long video.', 'Multimodal Transformer with reinforcement learning and search-augmented verification across 200k+ context.', 'from openai import OpenAI
client = OpenAI(api_key="YOUR_KEY", base_url="https://api.moonshot.cn/v1")
response = client.chat.completions.create(
  model="kimi-k1.5",
  messages=[{"role": "user", "content": "Solve this Olympiad geometry question with diagram analysis."}]
)', 'AIME 2024: 77.5%, MathVista: 72.8%, LiveCodeBench: 53.2%', 'API availability primarily centered on Moonshot platform; inference latency scales with reasoning length.', 'https://www.moonshot.cn', '[{"url":"https://github.com/MoonshotAI/Kimi-k1.5","text":"Kimi k1.5: Scaling Reinforcement Learning with LLMs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kimi K3.1 Pro', 'Moonshot AI', 'Model', 'NLP', 'Open Weights', 2026, '1M Context · Proprietary Model', 'Moonshot AI''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of 46, Briefcase Elo of 1676, and a massive 1M context window.', 'Proprietary frontier neural architecture developed by Moonshot AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (31 tok/s).', 'import requests

response = requests.post(
  "https://api.moonshotai.com/v1/chat/completions",
  json={"model": "kimi-k3-1-pro", "messages": [{"role": "user", "content": "Benchmark query"}]}
)', 'Intelligence Index: 46, Briefcase Elo: 1676, Accuracy: 49%, Non-Hallucination: 63%, FrontierCode: 25%, AutomationBench: 73%, TerminalBench 4: 67%, HLE Diamond: 37%, Speed: 31 tok/s, Context Window: 1M', 'Proprietary cloud API access via Moonshot AI developer platform; subject to API rate limits and token pricing ($2/M in, $10/M out).', 'https://artificialanalysis.ai/models/kimi-k3-1-pro', '[{"url":"https://artificialanalysis.ai/models/kimi-k3-1-pro","text":"Kimi K3.1 Pro on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/kimi-k3-1-pro/providers","text":"Kimi K3.1 Pro Inference Providers"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kling AI', 'Kuaishou', 'AI', 'Video Generation', 'Proprietary', 2024, 'N/A', 'A powerful AI video generation model by Kuaishou capable of producing realistic 2-minute videos at 1080p from text or image inputs.', 'Web Application (Proprietary video diffusion model with 3D spatiotemporal attention)', 'Access via klingai.com; generate videos from text prompts or reference images.', 'N/A', 'Longer generation times compared to some competitors; some features require a paid plan.', 'https://klingai.com', '[{"url":"https://klingai.com","text":"Kling AI"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ko-MultimodalMind2Web', 'KORMo-VL', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, 'n<1K', '🇰🇷 Ko-MultimodalMind2Web An offline Korean web-agent benchmark, built manually by native Korean annotators. 549 tasks · ️ 12,905 scored steps · 144 websites.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("KORMo-VL/Ko-MultimodalMind2Web")', 'Trending Score: 18, Likes: 24, Downloads: 70', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/KORMo-VL/Ko-MultimodalMind2Web', '[{"url":"https://huggingface.co/datasets/KORMo-VL/Ko-MultimodalMind2Web","text":"KORMo-VL/Ko-MultimodalMind2Web on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ko-Online-Mind2Web', 'KORMo-VL', 'Dataset', 'NLP', 'CC-BY-4.0', 2026, 'n<1K', '🇰🇷 Ko-Online-Mind2Web A live Korean web-agent benchmark, built manually by native Korean annotators. 312 tasks · 104 websites · ️ ~480 annotator-hours · L.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("KORMo-VL/Ko-Online-Mind2Web")', 'Trending Score: 18, Likes: 19, Downloads: 23', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/KORMo-VL/Ko-Online-Mind2Web', '[{"url":"https://huggingface.co/datasets/KORMo-VL/Ko-Online-Mind2Web","text":"KORMo-VL/Ko-Online-Mind2Web on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ko-Screenspot', 'KORMo-VL', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2026, 'n<1K', '🇰🇷 Ko-Screenspot A Korean GUI grounding benchmark, built manually by native Korean annotators. 3,319 samples · 142 websites · ️ ~480 annotator-hours · GUI.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("KORMo-VL/Ko-Screenspot")', 'Trending Score: 19, Likes: 21, Downloads: 67', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/KORMo-VL/Ko-Screenspot', '[{"url":"https://huggingface.co/datasets/KORMo-VL/Ko-Screenspot","text":"KORMo-VL/Ko-Screenspot on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kokoro-82M', 'Hexgrad', 'Model', 'Audio', 'Apache-2.0', 2025, '82M params', 'Hexgrad''s open-weights 82M parameter text-to-speech model producing studio-quality English and multilingual voice audio in real time on CPUs.', 'StyleTTS 2 architecture with ISTFT vocoder.', 'from kokoro import KPipeline
pipeline = KPipeline(lang_code=''a'')
generator = pipeline("Hello, welcome to AiVerse!", voice=''af_heart'', speed=1.0)', 'Real-time factor < 0.1 on modern consumer CPUs; highly ranked on TTS Arena.', 'Trained primarily on English and select Romance languages.', 'https://huggingface.co/hexgrad/Kokoro-82M', '[{"url":"https://huggingface.co/hexgrad/Kokoro-82M","text":"Kokoro Model Card"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kolibri-1', 'Aleph Alpha', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by Aleph Alpha.', 'Aleph-Alpha text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Aleph-Alpha/Kolibri-1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Aleph-Alpha/Kolibri-1")', 'Trending Score: 398, Likes: 407, Downloads: 1,135', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Aleph-Alpha/Kolibri-1', '[{"url":"https://huggingface.co/Aleph-Alpha/Kolibri-1","text":"Aleph-Alpha/Kolibri-1 on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kolibri-1.1', 'Aleph Alpha', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by Aleph Alpha.', 'Aleph-Alpha text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Aleph-Alpha/Kolibri-1.1", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Aleph-Alpha/Kolibri-1.1")', 'Trending Score: 115, Likes: 153, Downloads: 837', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/Aleph-Alpha/Kolibri-1.1', '[{"url":"https://huggingface.co/Aleph-Alpha/Kolibri-1.1","text":"Aleph-Alpha/Kolibri-1.1 on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Krea AI', 'Krea AI', 'AI', 'Image Generation', 'Proprietary', 2024, 'N/A', 'Real-time generative AI canvas and video creation tool allowing creators to generate and refine images and video with real-time brush strokes and prompt feedback.', 'Real-time latent diffusion pipeline with sub-100ms screen rendering canvas.', 'Open krea.ai, draw shapes on the left canvas, and see photorealistic 4k renders update live on the right.', 'Sub-100ms interactive visual generation loop.', 'Requires fast internet connection for real-time web canvas streaming.', 'https://www.krea.ai', '[{"url":"https://www.krea.ai","text":"Krea AI"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Kromoss', 'lodestones', 'Model', 'Image Generation', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights Image Generation model developed by lodestones.', 'lodestones text to image architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("lodestones/Kromoss", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("lodestones/Kromoss")', 'Trending Score: 170, Likes: 171, Downloads: 5,365', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/lodestones/Kromoss', '[{"url":"https://huggingface.co/lodestones/Kromoss","text":"lodestones/Kromoss on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LAION-5B', 'LAION', 'Dataset', 'Computer Vision', 'CC-BY-4.0', 2022, '5.85B image-text pairs (~240TB)', 'A massive open-source dataset of 5.85 billion CLIP-filtered image-text pairs scraped from the web, used to train Stable Diffusion and other vision models.', 'CLIP-filtered pairs from Common Crawl with aesthetic, safety, and watermark scores.', '# Access subsets via HuggingFace
from datasets import load_dataset
dataset = load_dataset("laion/laion2B-en", split="train", streaming=True)', 'Enables training of SOTA text-to-image models', 'Contains harmful/copyrighted content, filtered versions recommended.', 'https://laion.ai/blog/laion-5b/', '[{"url":"https://arxiv.org/abs/2210.08402","text":"Schuhmann et al. (2022) - LAION-5B Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('laion-audio-xl', 'LAION', 'Dataset', 'Audio', 'Open Data', 2026, '100M<n<1B', 'LAION-Audio-XL is the corpus of 366,007,518 audio clips of at most 30 s with captions that the LAION CLAP2 models were trained on. This repository hold.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("laion/laion-audio-xl")', 'Trending Score: 19, Likes: 20, Downloads: 8,394', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/laion/laion-audio-xl', '[{"url":"https://huggingface.co/datasets/laion/laion-audio-xl","text":"laion/laion-audio-xl on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LangChain', 'LangChain', 'Framework', 'MLOps', 'MIT', 2022, 'N/A', 'A popular framework for building LLM-powered applications with chains, agents, memory, and tool integrations.', 'Modular Python/JS library with abstractions for chains, agents, retrievers, and memory.', 'from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

model = ChatOpenAI(model="gpt-4o")
response = model.invoke([HumanMessage(content="Tell me a joke.")])', 'Most starred LLM framework on GitHub (85K+ stars)', 'Rapidly evolving API, abstractions can be opaque, sometimes overengineered for simple tasks.', 'https://www.langchain.com/', '[{"url":"https://python.langchain.com/docs/get_started/introduction","text":"LangChain Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LangGraph', 'LangChain', 'Framework', 'MLOps', 'MIT', 2024, 'N/A', 'Stateful orchestration library from LangChain for building cyclic, multi-agent workflows, human-in-the-loop oversight, and durable execution state.', 'Graph-based execution engine with state persistence checkpoints.', 'from langgraph.graph import StateGraph, START, END
builder = StateGraph(dict)
builder.add_node("agent", lambda state: {"msg": "Done"})
builder.add_edge(START, "agent")
builder.add_edge("agent", END)
graph = builder.compile()', 'De facto industry standard for multi-agent loops and agentic workflow orchestration.', 'Requires structured state typing; higher complexity than linear chains.', 'https://github.com/langchain-ai/langgraph', '[{"url":"https://langchain-ai.github.io/langgraph/","text":"LangGraph Docs"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LangSmith', 'LangChain', 'Platform', 'MLOps', 'Proprietary', 2023, 'Cloud / Self-hosted', 'Enterprise LLMOps platform from LangChain for debugging, testing, evaluating, and monitoring LLM applications and complex agent workflows.', 'Distributed telemetry tracing backend with prompt management and online evaluation.', 'export LANGCHAIN_TRACING_V2="true"
export LANGCHAIN_API_KEY="your-api-key"
# All LangChain & LangGraph calls automatically trace to dashboard', 'Standard tracing tool for production agent developers.', 'Full tracing storage can be expensive at massive enterprise scale.', 'https://smith.langchain.com', '[{"url":"https://docs.smith.langchain.com","text":"LangSmith Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('laya', 'Convai', 'Model', 'NLP', 'Apache-2.0', 2026, 'Open Weights', 'Open-weights NLP model developed by Convai.', 'convaiinnovations text classification architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("convaiinnovations/laya", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("convaiinnovations/laya")', 'Trending Score: 1125, Likes: 1,146, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/convaiinnovations/laya', '[{"url":"https://huggingface.co/convaiinnovations/laya","text":"convaiinnovations/laya on Hugging Face"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Leonardo.ai', 'Leonardo.ai', 'AI', 'Image Generation', 'Proprietary', 2022, 'N/A', 'A versatile AI image generation platform popular with game developers and artists, offering fine-tuned models, canvas editing, and consistent character generation.', 'Web Application (Powered by Stable Diffusion fine-tunes and proprietary models)', 'Visit leonardo.ai, create an account, and generate images using built-in or custom models.', 'N/A', 'Daily token limit on the free plan; advanced features like real-time canvas require paid credits.', 'https://leonardo.ai', '[{"url":"https://leonardo.ai","text":"Leonardo.ai"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM2.5-24B-A2B', 'Liquid AI', 'Model', 'NLP', 'Open Weights', 2026, '24B params', 'Open-weights NLP model developed by Liquid AI.', 'LiquidAI text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM2.5-24B-A2B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM2.5-24B-A2B")', 'Trending Score: 398, Likes: 406, Downloads: 9,356', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM2.5-24B-A2B', '[{"url":"https://huggingface.co/LiquidAI/LFM2.5-24B-A2B","text":"LiquidAI/LFM2.5-24B-A2B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-1.7B', 'Liquid AI', 'Model', 'NLP', 'Open Weights', 2026, '1.7B params', 'A compact 1.7B-parameter text model with a 256K-token context, post-trained for agents, tool calling, and structured outputs. It reasons before it answers. Prompts and outputs may.', 'LiquidAI text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM3-1.7B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM3-1.7B")', 'Context Window: 262k Context, Available across global OpenRouter inference nodes.', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM3-1.7B', '[{"url":"https://huggingface.co/LiquidAI/LFM3-1.7B","text":"LiquidAI/LFM3-1.7B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-Audio-2B', 'Liquid AI', 'Model', 'Audio', 'Open Weights', 2026, '2B params', 'Open-weights Audio model developed by Liquid AI.', 'LiquidAI any to any architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM3-Audio-2B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM3-Audio-2B")', 'Trending Score: 164, Likes: 165, Downloads: 4,790', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM3-Audio-2B', '[{"url":"https://huggingface.co/LiquidAI/LFM3-Audio-2B","text":"LiquidAI/LFM3-Audio-2B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-Omni-2B', 'Liquid AI', 'Model', 'Multimodal', 'Open Weights', 2026, '2B params', 'Open-weights Multimodal model developed by Liquid AI.', 'LiquidAI any to any architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM3-Omni-2B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM3-Omni-2B")', 'Trending Score: 216, Likes: 221, Downloads: 3,080', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM3-Omni-2B', '[{"url":"https://huggingface.co/LiquidAI/LFM3-Omni-2B","text":"LiquidAI/LFM3-Omni-2B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LFM3-VL-2B', 'Liquid AI', 'Model', 'Multimodal', 'Open Weights', 2026, '2B params', 'Open-weights Multimodal model developed by Liquid AI.', 'LiquidAI image text to text architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("LiquidAI/LFM3-VL-2B", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("LiquidAI/LFM3-VL-2B")', 'Trending Score: 180, Likes: 182, Downloads: 8,091', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/LiquidAI/LFM3-VL-2B', '[{"url":"https://huggingface.co/LiquidAI/LFM3-VL-2B","text":"LiquidAI/LFM3-VL-2B on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LightOnOCR-3-Demo', 'LightOn AI', 'Platform', 'Computer Vision', 'Community Hosted', 2026, 'GRADIO Platform', 'Interactive document optical character recognition demonstration showcasing LightOn AI''s LightOnOCR-3 model.', 'GRADIO cloud runtime container with interactive browser interface.', 'Launch and explore the platform directly in your browser: https://huggingface.co/spaces/lightonai/LightOnOCR-3-Demo', 'Trending Score: 43, Community Likes: 45', 'Cloud container subject to community traffic quotas and queue times.', 'https://huggingface.co/spaces/lightonai/LightOnOCR-3-Demo', '[{"url":"https://huggingface.co/spaces/lightonai/LightOnOCR-3-Demo","text":"lightonai/LightOnOCR-3-Demo on Hugging Face Spaces"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ling 3.2 Flash', 'InclusionAI', 'Model', 'Multimodal', 'Proprietary', 2026, '1049k Context · Available via API', 'Hybrid reasoning multimodal model from InclusionAI supporting text and up to 200 images across a 1M-token context window.', 'Modern foundation model hosted on OpenRouter with native 1049k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "inclusionai/ling-3.2-flash",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 1049k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/inclusionai/ling-3.2-flash', '[{"url":"https://openrouter.ai/inclusionai/ling-3.2-flash","text":"inclusionAI: Ling 3.2 Flash on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Ling-3.2-air', 'InclusionAI', 'Model', 'NLP', 'MIT', 2026, 'Open Weights', 'Open-weights NLP model developed by InclusionAI.', 'inclusionAI transformer architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("inclusionAI/Ling-3.2-air", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("inclusionAI/Ling-3.2-air")', 'Trending Score: 103, Likes: 115, Downloads: 0', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/inclusionAI/Ling-3.2-air', '[{"url":"https://huggingface.co/inclusionAI/Ling-3.2-air","text":"inclusionAI/Ling-3.2-air on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LingSante 3.1 Air VL', 'InclusionAI', 'Model', 'Multimodal', 'Proprietary', 2026, '131k Context · Available via API', 'LingSante 3.1 Air VL is inclusionAI''s medical vision-language model, a 124B total / 5.5B active MoE.', 'Modern foundation model hosted on OpenRouter with native 131k Context support and structured output generation.', 'import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
const response = await openai.chat.completions.create({
  model: "inclusionai/lingsante-3.1-air-vl",
  messages: [{ role: "user", content: "Hello!" }]
});', 'Context Window: 131k Context, Available across global OpenRouter inference nodes.', 'Requires OpenRouter API key and token credits.', 'https://openrouter.ai/inclusionai/lingsante-3.1-air-vl', '[{"url":"https://openrouter.ai/inclusionai/lingsante-3.1-air-vl","text":"inclusionAI: LingSante 3.1 Air VL on OpenRouter"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LingSante-3.1-flash', 'InclusionAI', 'Model', 'NLP', 'MIT', 2026, 'Open Weights', 'Open-weights NLP model developed by InclusionAI.', 'inclusionAI text generation architecture with community-tuned weights.', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("inclusionAI/LingSante-3.1-flash", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("inclusionAI/LingSante-3.1-flash")', 'Trending Score: 90, Likes: 99, Downloads: 397', 'Requires GPU VRAM or quantization for efficient local deployment.', 'https://huggingface.co/inclusionAI/LingSante-3.1-flash', '[{"url":"https://huggingface.co/inclusionAI/LingSante-3.1-flash","text":"inclusionAI/LingSante-3.1-flash on Hugging Face"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LingSante-MedGuard', 'InclusionAI', 'Dataset', 'Computer Vision', 'Open Data', 2026, '10K<n<100K', 'LingSante MedGuardBench English | 中文 Technical Report · PDF · Data Files · Quick Start · Citation LingSante MedGuardBench evaluates medical AI responses for safety, c.', 'Parquet / Arrow structured tabular & tokenized dataset.', 'from datasets import load_dataset

dataset = load_dataset("inclusionAI/LingSante-MedGuard")', 'Trending Score: 11, Likes: 34, Downloads: 159', 'Subject to licensing compliance and dataset-specific terms of use.', 'https://huggingface.co/datasets/inclusionAI/LingSante-MedGuard', '[{"url":"https://huggingface.co/datasets/inclusionAI/LingSante-MedGuard","text":"inclusionAI/LingSante-MedGuard on Hugging Face Datasets"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LiteLLM', 'BerriAI', 'Framework', 'MLOps', 'MIT', 2024, 'N/A', 'Universal proxy and Python SDK to call 100+ LLM APIs (OpenAI, Anthropic, Bedrock, Vertex, Ollama, Groq) using the standard OpenAI format with load balancing and fallbacks.', 'Unified API gateway proxy and translation layer.', 'from litellm import completion
response = completion(
    model="anthropic/claude-3-5-sonnet-20240620",
    messages=[{"role": "user", "content": "Hello World"}]
)', '99.99% gateway reliability with automatic multi-provider failover routing.', 'Gateway proxy adds slight network hop (~5ms) in high-throughput setups.', 'https://github.com/BerriAI/litellm', '[{"url":"https://docs.litellm.ai","text":"LiteLLM Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LiveCodeBench', 'LiveCodeBench', 'Dataset', 'AI Coding', 'MIT', 2024, '1,000+ problems', 'Holistic, continuously updated, contamination-free code benchmark collected from LeetCode, AtCoder, and Codeforces to test modern LLM coding capabilities.', 'Time-stamped competitive coding problems with automated evaluation harnesses.', 'from datasets import load_dataset
ds = load_dataset("livecodebench/code_generation_lite", split="test")', 'Prevents benchmark memorization through temporal problem filtering.', 'Focuses on competitive algorithm logic rather than large-scale repo architecture.', 'https://livecodebench.github.io', '[{"url":"https://arxiv.org/abs/2403.07974","text":"LiveCodeBench Paper"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LLaMA', 'Meta AI', 'Model', 'NLP', 'LLaMA License (non-commercial)', 2023, '7B to 65B params', 'Open foundation language models from 7B to 65B parameters that sparked the open-source LLM revolution.', 'Transformer decoder with optimizations for efficiency.', 'from transformers import LlamaForCausalLM, LlamaTokenizer
model = LlamaForCausalLM.from_pretrained("meta-llama/Llama-2-7b")
tokenizer = LlamaTokenizer.from_pretrained("meta-llama/Llama-2-7b")', '70B model competitive with GPT-3.5 on many tasks', 'Restricted commercial use, requires significant compute.', 'https://ai.meta.com/llama/', '[{"url":"https://arxiv.org/abs/2302.13971","text":"Touvron et al. (2023) - LLaMA Paper"},{"url":"https://ai.meta.com/llama/","text":"Meta AI Official LLaMA Page"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LLaMA 2', 'Meta AI', 'Model', 'NLP', 'Llama 2 Community License', 2023, '7B to 70B params', 'Meta''s second-generation open foundation model family (7B–70B) with a permissive commercial license, trained on 2T tokens.', 'Transformer decoder with grouped query attention and RoPE embeddings.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-70b-chat-hf")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-70b-chat-hf")', 'MMLU: 68.9% (70B), HumanEval: 29.9% (70B)', 'Weaker than Llama 3 on most tasks, 4096 max context window.', 'https://ai.meta.com/llama/', '[{"url":"https://arxiv.org/abs/2307.09288","text":"Touvron et al. (2023) - Llama 2 Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3 (70B)', 'Meta AI', 'Model', 'NLP', 'Meta Llama 3 License', 2024, '70B params', 'Meta''s powerful open-weights language model, offering near-proprietary performance while remaining free to download and run locally.', 'Optimized Transformer decoder architecture trained on 15T tokens.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-70B-Instruct")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-70B-Instruct")', 'MMLU: 82.0%, HumanEval: 81.7%', 'Requires substantial GPU VRAM to run locally, lacks native vision/audio.', 'https://llama.meta.com/', '[{"url":"https://ai.meta.com/blog/meta-llama-3/","text":"Introducing Meta Llama 3"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3 (8B)', 'Meta AI', 'Model', 'NLP', 'Meta Llama 3 License', 2024, '8B params', 'Meta''s compact open-weights model designed to run efficiently on consumer hardware while retaining strong instruction-following capabilities.', 'Transformer decoder with grouped query attention trained on 15T tokens.', 'from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B-Instruct")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B-Instruct")', 'MMLU: 66.6%, HumanEval: 62.2%', 'Less capable than larger models, struggles with complex multi-step reasoning.', 'https://llama.meta.com/', '[{"url":"https://ai.meta.com/blog/meta-llama-3/","text":"Introducing Meta Llama 3"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.1 (405B)', 'Meta AI', 'Model', 'NLP', 'Llama 3.1 Community License', 2024, '405B params', 'Meta''s flagship open-weights model and the first open model to rival top proprietary models like GPT-4o and Claude 3.5 Sonnet across general knowledge, steerability, math, tool use, and multilingual translation.', 'Optimized transformer decoder architecture trained on 15T tokens with 128K context window.', 'from transformers import pipeline
pipe = pipeline("text-generation", model="meta-llama/Meta-Llama-3.1-405B-Instruct")
pipe("Hello world!")', 'MMLU: 88.6%, HumanEval: 89.0%, MATH: 73.8%', 'Massive hardware requirements for local inference due to 405B size.', 'https://llama.meta.com/', '[{"url":"https://ai.meta.com/blog/meta-llama-3-1/","text":"Llama 3.1 Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.2 (3B)', 'Meta AI', 'Model', 'NLP', 'Llama 3.2 Community License', 2024, '3.21B params', 'Compact, on-device multilingual small language model optimized for edge devices, mobile compute, and high-speed local inference.', 'Pruned and distilled Transformer with 128k context window support.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-3B-Instruct", device_map="auto")', 'MMLU: 63.4%, GSM8K: 77.7%', 'Less capable on deep multi-step scientific and reasoning problems.', 'https://ai.meta.com/llama/', '[{"url":"https://ai.meta.com/blog/llama-3-2-connect-2024/","text":"Llama 3.2 Announcement"}]'::jsonb, false, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.2 (90B Vision)', 'Meta AI', 'Model', 'Multimodal', 'Llama 3.2 Community License', 2024, '90B params', 'Meta''s open-weights multimodal model, supporting high-resolution image reasoning alongside top-tier text capabilities.', 'Transformer decoder integrated with vision encoder via cross-attention.', 'from transformers import MllamaForConditionalGeneration, AutoProcessor
model = MllamaForConditionalGeneration.from_pretrained("meta-llama/Llama-3.2-90B-Vision-Instruct")
processor = AutoProcessor.from_pretrained("meta-llama/Llama-3.2-90B-Vision-Instruct")', 'Highly competitive with closed models on MMMU and MathVista.', 'Significant hardware required for local inference.', 'https://llama.meta.com/', '[{"url":"https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/","text":"Llama 3.2 Announcement"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.2 Vision (11B)', 'Meta AI', 'Model', 'Multimodal', 'Llama 3.2 Community License', 2024, '11B params', 'Open-weights multimodal vision-language model capable of image understanding, visual reasoning, chart analysis, and document parsing.', 'Vision encoder adapter integrated into Llama 3.2 text decoder.', 'from transformers import MllamaForConditionalGeneration, AutoProcessor
model = MllamaForConditionalGeneration.from_pretrained("meta-llama/Llama-3.2-11B-Vision-Instruct", device_map="auto")', 'DocVQA: 88.4%, ChartQA: 83.4%, MathVista: 57.2%', 'Vision encoder increases VRAM requirements during high-resolution multi-image processing.', 'https://ai.meta.com/llama/', '[{"url":"https://ai.meta.com/blog/llama-3-2-connect-2024/","text":"Llama 3.2 Vision Model Card"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 3.3 (70B)', 'Meta AI', 'Model', 'NLP', 'Llama 3.3 Community License', 2024, '70B params', 'Meta''s flagship open-weights instruction model delivering capabilities comparable to previous 405B models with 70B parameter efficiency.', 'Autoregressive Transformer with Grouped-Query Attention (GQA) and 128k context length.', 'from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.3-70B-Instruct", device_map="auto")', 'MMLU: 88.6%, HumanEval: 88.4%, GPQA: 50.5%', 'Commercial restriction for products exceeding 700M monthly active users.', 'https://ai.meta.com/llama/', '[{"url":"https://ai.meta.com/blog/llama-3-3/","text":"Llama 3.3 Release"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 4 Maverick', 'Meta AI', 'Model', 'NLP', 'Open Weights', 2026, '1M Context · Open Model', 'Meta AI''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of N/A, and a massive 1M context window.', 'Open-weights frontier neural architecture developed by Meta AI, featuring native 1M token window support, optimized reasoning chains, and low-latency inference throughput (12 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Meta/llama-4-maverick", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Meta/llama-4-maverick")', 'Briefcase Elo: 0, AutomationBench: 0%, TerminalBench 4: 0%, Speed: 12 tok/s, Context Window: 1M', 'High memory requirements for local execution (1M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/llama-4-maverick', '[{"url":"https://artificialanalysis.ai/models/llama-4-maverick","text":"Llama 4 Maverick on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/llama-4-maverick/providers","text":"Llama 4 Maverick Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('Llama 4 Scout', 'Meta AI', 'Model', 'NLP', 'Open Weights', 2026, '10M Context · Open Model', 'Meta AI''s frontier nlp model featured on the Artificial Analysis leaderboard with an Intelligence Index of N/A, and a massive 10M context window.', 'Open-weights frontier neural architecture developed by Meta AI, featuring native 10M token window support, optimized reasoning chains, and low-latency inference throughput (15 tok/s).', 'from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("Meta/llama-4-scout", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Meta/llama-4-scout")', 'Briefcase Elo: 0, AutomationBench: 0%, TerminalBench 4: 0%, Speed: 15 tok/s, Context Window: 10M', 'High memory requirements for local execution (10M context); recommended deployment on multi-GPU tensor-parallel nodes or vLLM clusters.', 'https://artificialanalysis.ai/models/llama-4-scout', '[{"url":"https://artificialanalysis.ai/models/llama-4-scout","text":"Llama 4 Scout on Artificial Analysis Benchmark"},{"url":"https://artificialanalysis.ai/models/llama-4-scout/providers","text":"Llama 4 Scout Inference Providers"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('llama.cpp', 'Meta AI', 'Platform', 'MLOps', 'MIT', 2023, 'N/A', 'Pure C/C++ inference implementation for LLMs with GGUF quantization, enabling fast CPU and GPU execution across Mac Metal, Windows, and Linux.', 'C++ core with GGML tensor library and low-precision integer quantization.', './llama-cli -m models/llama-3.3-70b-instruct.Q4_K_M.gguf -p "Explain gravity" -n 128', 'Underpins Ollama, LM Studio, and local AI on Apple Silicon.', 'Manual command line configuration needed for advanced distributed setups.', 'https://github.com/ggerganov/llama.cpp', '[{"url":"https://github.com/ggerganov/llama.cpp","text":"llama.cpp GitHub"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LlamaIndex', 'LlamaIndex', 'Framework', 'MLOps', 'MIT', 2022, 'N/A', 'A data framework for LLM applications focused on ingesting, structuring, and accessing private or domain-specific data for RAG applications.', 'Data connectors + indexing strategies + query engines for RAG pipelines.', 'from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("What did the author do growing up?")', 'Leading framework for RAG-based applications', 'Can be complex for advanced configurations, performance depends on vector store choice.', 'https://www.llamaindex.ai/', '[{"url":"https://docs.llamaindex.ai/","text":"LlamaIndex Documentation"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;

INSERT INTO entries (name, org, type, task, license, year, size, summary, architecture, usage, benchmarks, limitations, url, citations, popular, approved)
VALUES ('LLaVA', 'Microsoft', 'Model', 'Multimodal', 'Apache-2.0', 2023, '7B to 34B params', 'Large Language-and-Vision Assistant — an open-source multimodal model that combines a visual encoder with an LLM for general-purpose visual question answering.', 'CLIP visual encoder connected to a Vicuna/Mistral LLM via a linear projection layer.', 'from transformers import LlavaNextProcessor, LlavaNextForConditionalGeneration
processor = LlavaNextProcessor.from_pretrained("llava-hf/llava-v1.6-mistral-7b-hf")
model = LlavaNextForConditionalGeneration.from_pretrained("llava-hf/llava-v1.6-mistral-7b-hf")', 'MMBench: 76.3% (LLaVA-1.6 34B), ScienceQA: 90.92%', 'Vision understanding still behind GPT-4V on complex visual tasks.', 'https://llava-vl.github.io/', '[{"url":"https://arxiv.org/abs/2304.08485","text":"LLaVA Paper"}]'::jsonb, true, true)
ON CONFLICT (name) DO UPDATE SET
  org = EXCLUDED.org,
  type = EXCLUDED.type,
  task = EXCLUDED.task,
  license = EXCLUDED.license,
  year = EXCLUDED.year,
  size = EXCLUDED.size,
  summary = EXCLUDED.summary,
  architecture = EXCLUDED.architecture,
  usage = EXCLUDED.usage,
  benchmarks = EXCLUDED.benchmarks,
  limitations = EXCLUDED.limitations,
  url = EXCLUDED.url,
  citations = EXCLUDED.citations,
  popular = EXCLUDED.popular,
  approved = true;
