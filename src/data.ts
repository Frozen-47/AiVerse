import type { Entry } from './types';

export const entries: Entry[] = [
  // ─── LATEST FRONTIER MODELS ───────────────────────────────────────────────
  {
    name: "GPT-4o",
    type: "Model",
    summary: "OpenAI's fastest and most advanced flagship model, featuring native multimodal capabilities across text, vision, and audio in real-time.",
    task: "NLP",
    license: "Proprietary",
    year: 2024,
    org: "OpenAI",
    size: "Unknown",
    architecture: "Transformer-based, natively multimodal omni-model.",
    usage: `from openai import OpenAI\nclient = OpenAI()\nresponse = client.chat.completions.create(\n  model="gpt-4o",\n  messages=[{"role": "user", "content": "Hello!"}]\n)`,
    benchmarks: "MMLU: 88.7%, HumanEval: 90.2%",
    limitations: "Requires subscription for high limits, proprietary API, can hallucinate facts.",
    url: "https://openai.com/chatgpt",
    citations: [
      { text: "GPT-4o Announcement", url: "https://openai.com/index/hello-gpt-4o/" }
    ]
  },
  {
    name: "Claude 3.5 Sonnet",
    type: "Model",
    summary: "Anthropic's highly capable and exceptionally fast language model, known for advanced coding abilities, nuanced reasoning, and the interactive 'Artifacts' UI.",
    task: "NLP",
    license: "Proprietary",
    year: 2024,
    org: "Anthropic",
    size: "Unknown",
    architecture: "Transformer-based LLM with Constitutional AI training.",
    usage: `import anthropic\nclient = anthropic.Anthropic()\nmessage = client.messages.create(\n  model="claude-3-5-sonnet-20240620",\n  max_tokens=1000,\n  messages=[{"role": "user", "content": "Write a React component."}]\n)`,
    benchmarks: "MMLU: 88.3%, HumanEval: 92.0%",
    limitations: "Proprietary API, strict safety filters can sometimes refuse benign prompts.",
    url: "https://www.anthropic.com/claude",
    citations: [
      { text: "Claude 3.5 Sonnet Release", url: "https://www.anthropic.com/news/claude-3-5-sonnet" }
    ]
  },
  {
    name: "Gemini 1.5 Pro",
    type: "Model",
    summary: "Google's flagship multimodal model featuring a massive context window of up to 2 million tokens, allowing it to process hours of video, audio, and vast codebases.",
    task: "NLP",
    license: "Proprietary",
    year: 2024,
    org: "Google DeepMind",
    size: "Unknown",
    architecture: "Mixture-of-Experts (MoE) transformer architecture.",
    usage: `import google.generativeai as genai\ngenai.configure(api_key="YOUR_API_KEY")\nmodel = genai.GenerativeModel('gemini-1.5-pro')\nresponse = model.generate_content("Summarize this 1000-page PDF.")`,
    benchmarks: "MMLU: 85.9%, MATH: 67.7%",
    limitations: "Proprietary API, performance can vary on extremely short-context logic puzzles.",
    url: "https://deepmind.google/technologies/gemini/",
    citations: [
      { text: "Gemini 1.5 Pro Technical Paper", url: "https://arxiv.org/abs/2403.05530" }
    ]
  },
  {
    name: "Llama 3 (70B)",
    type: "Model",
    summary: "Meta's powerful open-weights language model, offering near-proprietary performance while remaining free to download and run locally.",
    task: "NLP",
    license: "Meta Llama 3 License",
    year: 2024,
    org: "Meta AI",
    size: "70B params",
    architecture: "Optimized Transformer decoder architecture trained on 15T tokens.",
    usage: `from transformers import AutoTokenizer, AutoModelForCausalLM\ntokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-70B-Instruct")\nmodel = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-70B-Instruct")`,
    benchmarks: "MMLU: 82.0%, HumanEval: 81.7%",
    limitations: "Requires substantial GPU VRAM to run locally, lacks native vision/audio.",
    url: "https://llama.meta.com/",
    citations: [
      { text: "Introducing Meta Llama 3", url: "https://ai.meta.com/blog/meta-llama-3/" }
    ]
  },

  // ─── FOUNDATION & LEGACY MODELS ───────────────────────────────────────────
  {
    name: "GPT-4",
    type: "Model",
    summary: "Advanced large language model with multimodal capabilities for text and image understanding.",
    task: "NLP",
    license: "Proprietary",
    year: 2023,
    org: "OpenAI",
    size: "Unknown (estimated 1.76T params)",
    architecture: "Transformer-based decoder architecture with advanced reasoning capabilities.",
    usage: `from openai import OpenAI\nclient = OpenAI()\nresponse = client.chat.completions.create(\n  model="gpt-4",\n  messages=[{"role": "user", "content": "Hello!"}]\n)`,
    benchmarks: "MMLU: 86.4%, HumanEval: 67%",
    limitations: "Can hallucinate, expensive to run, proprietary with limited access.",
    url: "https://openai.com/gpt-4",
    citations: [
      { text: "Official GPT-4 Technical Report", url: "https://openai.com/research/gpt-4" },
      { text: "GPT-4 API Documentation", url: "https://platform.openai.com/docs" }
    ]
  },
  {
    name: "LLaMA",
    type: "Model",
    summary: "Open foundation language models from 7B to 70B parameters.",
    task: "NLP",
    license: "LLaMA License (non-commercial)",
    year: 2023,
    org: "Meta AI",
    size: "7B to 70B params",
    architecture: "Transformer decoder with optimizations for efficiency.",
    usage: `from transformers import LlamaForCausalLM, LlamaTokenizer\nmodel = LlamaForCausalLM.from_pretrained("meta-llama/Llama-2-7b")\ntokenizer = LlamaTokenizer.from_pretrained("meta-llama/Llama-2-7b")`,
    benchmarks: "70B model competitive with GPT-3.5 on many tasks",
    limitations: "Restricted commercial use, requires significant compute.",
    url: "https://ai.meta.com/llama/",
    citations: [
      { text: "Touvron et al. (2023) - LLaMA Paper", url: "https://arxiv.org/abs/2302.13971" },
      { text: "Meta AI Official LLaMA Page", url: "https://ai.meta.com/llama/" }
    ]
  },
  {
    name: "BERT",
    type: "Model",
    summary: "Bidirectional Encoder Representations from Transformers for NLP pre-training.",
    task: "NLP",
    license: "Apache-2.0",
    year: 2018,
    org: "Google",
    size: "Base: 110M params, Large: 340M params",
    architecture: "Transformer encoder with bidirectional attention, pre-trained with masked language modeling.",
    usage: `from transformers import BertTokenizer, BertModel\ntokenizer = BertTokenizer.from_pretrained('bert-base-uncased')\nmodel = BertModel.from_pretrained('bert-base-uncased')`,
    benchmarks: "GLUE: 80.5% (base), SQuAD: 93.2 F1",
    limitations: "Limited to 512 tokens, slower than newer models.",
    url: "https://github.com/google-research/bert",
    citations: [
      { text: "Devlin et al. (2018) - BERT Paper", url: "https://arxiv.org/abs/1810.04805" },
      { text: "Official GitHub Repository", url: "https://github.com/google-research/bert" }
    ]
  },

  // ─── VISION & IMAGE MODELS ────────────────────────────────────────────────
  {
    name: "Midjourney v6",
    type: "Model",
    summary: "A highly advanced text-to-image AI capable of generating photorealistic imagery, complex compositions, and readable text within images.",
    task: "Computer Vision",
    license: "Proprietary",
    year: 2023,
    org: "Midjourney, Inc.",
    size: "Unknown",
    architecture: "Latent diffusion model.",
    usage: `# Midjourney does not offer an official public API.\n# Usage is primarily through their Discord bot or web interface.\n/imagine prompt: A futuristic cyberpunk city in the rain, highly detailed --v 6.0`,
    benchmarks: "N/A (Subjective visual quality leader)",
    limitations: "No official API, requires Discord/web interface, paid subscription only.",
    url: "https://www.midjourney.com/",
    citations: [
      { text: "Midjourney Alpha", url: "https://www.midjourney.com/" }
    ]
  },
  {
    name: "Stable Diffusion",
    type: "Model",
    summary: "Open-source latent diffusion model for high-quality text-to-image generation.",
    task: "Computer Vision",
    license: "CreativeML Open RAIL-M",
    year: 2022,
    org: "Stability AI",
    size: "890M params",
    architecture: "Latent diffusion model with CLIP text encoder and U-Net denoising network.",
    usage: `from diffusers import StableDiffusionPipeline\npipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2")\nimage = pipe("a photo of an astronaut on mars").images[0]`,
    benchmarks: "FID score competitive with DALL-E 2",
    limitations: "Can produce biased outputs, requires GPU for reasonable speed.",
    url: "https://stability.ai/stable-diffusion",
    citations: [
      { text: "Rombach et al. (2022) - Latent Diffusion Paper", url: "https://arxiv.org/abs/2112.10752" },
      { text: "Stability AI Official Site", url: "https://stability.ai" }
    ]
  },
  {
    name: "CLIP",
    type: "Model",
    summary: "Contrastive Language-Image Pre-training for zero-shot image classification.",
    task: "Computer Vision",
    license: "MIT",
    year: 2021,
    org: "OpenAI",
    size: "ViT-L/14: 428M params",
    architecture: "Dual encoder with vision transformer and text transformer trained contrastively.",
    usage: `import clip\nmodel, preprocess = clip.load("ViT-B/32")\nimage = preprocess(image).unsqueeze(0)\ntext = clip.tokenize(["a cat", "a dog"])`,
    benchmarks: "Zero-shot ImageNet: 76.2% top-1",
    limitations: "Struggles with fine-grained classification, abstract concepts.",
    url: "https://github.com/openai/CLIP",
    citations: [
      { text: "Radford et al. (2021) - CLIP Paper", url: "https://arxiv.org/abs/2103.00020" },
      { text: "Official CLIP Repository", url: "https://github.com/openai/CLIP" }
    ]
  },

  // ─── FRAMEWORKS, PLATFORMS & DATASETS ─────────────────────────────────────
  {
    name: "PyTorch",
    type: "Framework",
    summary: "Open-source machine learning framework with dynamic computation graphs.",
    task: "MLOps",
    license: "BSD-3-Clause",
    year: 2016,
    org: "Meta AI",
    size: "N/A",
    architecture: "Python-first framework with automatic differentiation and GPU acceleration.",
    usage: `import torch\nimport torch.nn as nn\nmodel = nn.Sequential(\n  nn.Linear(10, 20),\n  nn.ReLU(),\n  nn.Linear(20, 1)\n)`,
    benchmarks: "Most popular framework for research (60%+ papers)",
    limitations: "More verbose than high-level frameworks, deployment can be complex.",
    url: "https://pytorch.org",
    citations: [
      { text: "PyTorch Official Documentation", url: "https://pytorch.org/docs" },
      { text: "GitHub Repository", url: "https://github.com/pytorch/pytorch" }
    ]
  },
  {
    name: "Hugging Face",
    type: "Platform",
    summary: "Open platform for sharing and collaborating on ML models, datasets, and applications.",
    task: "MLOps",
    license: "Apache-2.0 (libraries)",
    year: 2016,
    org: "Hugging Face Inc.",
    size: "1M+ models hosted",
    architecture: "Cloud platform with transformers library, model hub, and deployment tools.",
    usage: `from transformers import pipeline\nclassifier = pipeline("sentiment-analysis")\nresult = classifier("I love this encyclopedia!")`,
    benchmarks: "Most popular model hub globally",
    limitations: "Free tier has rate limits, deploying large models requires paid endpoints.",
    url: "https://huggingface.co",
    citations: [
      { text: "Hugging Face Documentation", url: "https://huggingface.co/docs" },
      { text: "Transformers Library", url: "https://github.com/huggingface/transformers" }
    ]
  },
  {
    name: "Perplexity AI",
    type: "Platform",
    summary: "An AI-powered search engine that uses LLMs to search the web in real-time, providing conversational answers with direct in-line citations.",
    task: "NLP",
    license: "Proprietary",
    year: 2022,
    org: "Perplexity",
    size: "Various (Uses GPT-4, Claude 3, Sonar)",
    architecture: "RAG (Retrieval-Augmented Generation) pipeline sitting on top of various frontier LLMs.",
    usage: `from openai import OpenAI\n# Perplexity offers an API compatible with OpenAI's SDK\nclient = OpenAI(api_key="PPLX_API_KEY", base_url="https://api.perplexity.ai")\nresponse = client.chat.completions.create(\n  model="llama-3-sonar-large-32k-online",\n  messages=[{"role": "user", "content": "What is the news today?"}]\n)`,
    benchmarks: "N/A",
    limitations: "Quality depends heavily on the retrieved search results, occasionally hallucinates sources.",
    url: "https://www.perplexity.ai/",
    citations: [
      { text: "Perplexity API Docs", url: "https://docs.perplexity.ai/" }
    ]
  },
  {
    name: "GitHub Copilot",
    type: "Platform",
    summary: "An AI pair programmer integrated directly into code editors, offering real-time code autocomplete and chat functionality.",
    task: "NLP",
    license: "Proprietary",
    year: 2021,
    org: "GitHub (Microsoft) & OpenAI",
    size: "Based on customized OpenAI models",
    architecture: "Powered by OpenAI's Codex and newer GPT models tailored for code generation.",
    usage: `// Type a comment in VS Code to trigger Copilot\n// function to parse a URL and return the domain name\nfunction getDomain(url) {\n  return new URL(url).hostname;\n}`,
    benchmarks: "N/A",
    limitations: "Paid subscription required, can suggest insecure code patterns.",
    url: "https://github.com/features/copilot",
    citations: [
      { text: "GitHub Copilot Features", url: "https://github.com/features/copilot" }
    ]
  },
  {
    name: "ImageNet",
    type: "Dataset",
    summary: "Large-scale image dataset with 14M+ images across 20K+ categories.",
    task: "Computer Vision",
    license: "Various (academic use)",
    year: 2009,
    org: "Stanford / Princeton",
    size: "14M images, 150GB",
    architecture: "Hierarchical organization based on WordNet, 1000 classes for ILSVRC.",
    usage: `from torchvision.datasets import ImageNet\ndataset = ImageNet(root='./data', split='train')`,
    benchmarks: "Standard benchmark for computer vision (ImageNet-1K)",
    limitations: "Some labeling issues, Western-centric bias.",
    url: "https://image-net.org",
    citations: [
      { text: "Deng et al. (2009) - ImageNet Paper", url: "https://ieeexplore.ieee.org/document/5206848" },
      { text: "Official ImageNet Website", url: "https://image-net.org" }
    ]
  }
];

export const typeFilters = ["All", "Model", "Framework", "Dataset", "Platform"];
export const taskFilters = ["All Tasks", "NLP", "Computer Vision", "MLOps"];