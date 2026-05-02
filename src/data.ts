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
    popular: true,
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
    popular: true,
    url: "https://www.anthropic.com/claude",
    citations: [
      { text: "Claude 3.5 Sonnet Release", url: "https://www.anthropic.com/news/claude-3-5-sonnet" }
    ]
  },
  {
    name: "Claude 3 Opus",
    type: "Model",
    summary: "Anthropic's most powerful model for complex analysis, long documents, and nuanced reasoning tasks requiring deep comprehension.",
    task: "NLP",
    license: "Proprietary",
    year: 2024,
    org: "Anthropic",
    size: "Unknown",
    architecture: "Transformer-based LLM with Constitutional AI and RLHF training.",
    usage: `import anthropic\nclient = anthropic.Anthropic()\nmessage = client.messages.create(\n  model="claude-3-opus-20240229",\n  max_tokens=2048,\n  messages=[{"role": "user", "content": "Analyze this research paper."}]\n)`,
    benchmarks: "MMLU: 86.8%, GPQA: 50.4%",
    limitations: "Slower and more expensive than Sonnet, proprietary API.",
    url: "https://www.anthropic.com/claude",
    citations: [
      { text: "Claude 3 Model Card", url: "https://www.anthropic.com/news/claude-3-family" }
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
    popular: true,
    url: "https://deepmind.google/technologies/gemini/",
    citations: [
      { text: "Gemini 1.5 Pro Technical Paper", url: "https://arxiv.org/abs/2403.05530" }
    ]
  },
  {
    name: "Gemini 1.5 Flash",
    type: "Model",
    summary: "Google's lightweight, fast multimodal model optimized for high-volume tasks with a 1M token context window at lower cost.",
    task: "NLP",
    license: "Proprietary",
    year: 2024,
    org: "Google DeepMind",
    size: "Unknown",
    architecture: "Distilled MoE transformer, optimized for speed and efficiency.",
    usage: `import google.generativeai as genai\ngenai.configure(api_key="YOUR_API_KEY")\nmodel = genai.GenerativeModel('gemini-1.5-flash')\nresponse = model.generate_content("Summarize this article quickly.")`,
    benchmarks: "MMLU: 78.9%, significantly faster than Pro",
    limitations: "Less capable than Gemini 1.5 Pro on complex reasoning tasks.",
    url: "https://deepmind.google/technologies/gemini/flash/",
    citations: [
      { text: "Gemini 1.5 Flash Announcement", url: "https://deepmind.google/technologies/gemini/flash/" }
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
    popular: true,
    url: "https://llama.meta.com/",
    citations: [
      { text: "Introducing Meta Llama 3", url: "https://ai.meta.com/blog/meta-llama-3/" }
    ]
  },
  {
    name: "Llama 3 (8B)",
    type: "Model",
    summary: "Meta's compact open-weights model designed to run efficiently on consumer hardware while retaining strong instruction-following capabilities.",
    task: "NLP",
    license: "Meta Llama 3 License",
    year: 2024,
    org: "Meta AI",
    size: "8B params",
    architecture: "Transformer decoder with grouped query attention trained on 15T tokens.",
    usage: `from transformers import AutoTokenizer, AutoModelForCausalLM\ntokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B-Instruct")\nmodel = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B-Instruct")`,
    benchmarks: "MMLU: 66.6%, HumanEval: 62.2%",
    limitations: "Less capable than larger models, struggles with complex multi-step reasoning.",
    popular: true,
    url: "https://llama.meta.com/",
    citations: [
      { text: "Introducing Meta Llama 3", url: "https://ai.meta.com/blog/meta-llama-3/" }
    ]
  },
  {
    name: "Mistral 7B",
    type: "Model",
    summary: "A highly efficient 7B parameter open-source model that outperforms Llama 2 13B on most benchmarks using sliding window attention and grouped query attention.",
    task: "NLP",
    license: "Apache-2.0",
    year: 2023,
    org: "Mistral AI",
    size: "7B params",
    architecture: "Transformer decoder with sliding window attention (SWA) and grouped query attention (GQA).",
    usage: `from transformers import AutoModelForCausalLM, AutoTokenizer\nmodel = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2")\ntokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2")`,
    benchmarks: "MMLU: 60.1%, outperforms Llama 2 13B on most tasks",
    limitations: "Smaller size limits complex reasoning; no native multimodal support.",
    popular: true,
    url: "https://mistral.ai/",
    citations: [
      { text: "Mistral 7B Paper", url: "https://arxiv.org/abs/2310.06825" }
    ]
  },
  {
    name: "Mixtral 8x7B",
    type: "Model",
    summary: "Mistral AI's sparse mixture-of-experts model that uses 8 expert networks but only activates 2 per token, delivering 70B-class performance at lower inference cost.",
    task: "NLP",
    license: "Apache-2.0",
    year: 2023,
    org: "Mistral AI",
    size: "46.7B total params (12.9B active)",
    architecture: "Sparse Mixture-of-Experts (SMoE) with 8 expert FFN layers, activating 2 per token.",
    usage: `from transformers import AutoModelForCausalLM, AutoTokenizer\nmodel = AutoModelForCausalLM.from_pretrained("mistralai/Mixtral-8x7B-Instruct-v0.1")\ntokenizer = AutoTokenizer.from_pretrained("mistralai/Mixtral-8x7B-Instruct-v0.1")`,
    benchmarks: "MMLU: 70.6%, HumanEval: 40.2%",
    limitations: "Large total parameter count, complex deployment for MoE routing.",
    popular: true,
    url: "https://mistral.ai/",
    citations: [
      { text: "Mixtral of Experts Paper", url: "https://arxiv.org/abs/2401.04088" }
    ]
  },
  {
    name: "Mistral Large",
    type: "Model",
    summary: "Mistral AI's flagship proprietary model, competitive with GPT-4 on reasoning, coding, and multilingual tasks.",
    task: "NLP",
    license: "Proprietary",
    year: 2024,
    org: "Mistral AI",
    size: "Unknown",
    architecture: "Large-scale transformer with advanced instruction tuning.",
    usage: `from mistralai.client import MistralClient\nclient = MistralClient(api_key="YOUR_API_KEY")\nresponse = client.chat(\n  model="mistral-large-latest",\n  messages=[{"role": "user", "content": "Explain quantum entanglement."}]\n)`,
    benchmarks: "MMLU: 81.2%, MATH: 45.0%",
    limitations: "Proprietary API, pay-per-use pricing.",
    url: "https://mistral.ai/news/mistral-large/",
    citations: [
      { text: "Mistral Large Announcement", url: "https://mistral.ai/news/mistral-large/" }
    ]
  },
  {
    name: "Command R+",
    type: "Model",
    summary: "Cohere's enterprise-grade LLM optimized for RAG (Retrieval-Augmented Generation) and tool use, with strong multilingual support across 10 languages.",
    task: "NLP",
    license: "Proprietary",
    year: 2024,
    org: "Cohere",
    size: "104B params",
    architecture: "Transformer with specialized grounded generation training for RAG workflows.",
    usage: `import cohere\nco = cohere.Client("YOUR_API_KEY")\nresponse = co.chat(\n  model="command-r-plus",\n  message="What are the latest trends in AI?",\n  documents=[{"text": "...your documents here..."}]\n)`,
    benchmarks: "MMLU: 75.7%, strong RAG and tool use performance",
    limitations: "Proprietary, optimized for enterprise RAG — may underperform on general chat.",
    url: "https://cohere.com/command",
    citations: [
      { text: "Command R+ Announcement", url: "https://cohere.com/blog/command-r-plus-microsoft-azure" }
    ]
  },
  {
    name: "Phi-3 Mini",
    type: "Model",
    summary: "Microsoft's compact 3.8B parameter model that punches far above its weight class, outperforming models 5x its size on reasoning benchmarks.",
    task: "NLP",
    license: "MIT",
    year: 2024,
    org: "Microsoft",
    size: "3.8B params",
    architecture: "Dense transformer decoder trained on heavily curated 'textbook-quality' data.",
    usage: `from transformers import AutoModelForCausalLM, AutoTokenizer\nmodel = AutoModelForCausalLM.from_pretrained("microsoft/Phi-3-mini-4k-instruct")\ntokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3-mini-4k-instruct")`,
    benchmarks: "MMLU: 68.8%, outperforms Mistral 7B on many tasks",
    limitations: "Small size limits knowledge breadth; not suitable for long-form tasks.",
    url: "https://azure.microsoft.com/en-us/products/phi-3",
    citations: [
      { text: "Phi-3 Technical Report", url: "https://arxiv.org/abs/2404.14219" }
    ]
  },
  {
    name: "Qwen2 (72B)",
    type: "Model",
    summary: "Alibaba's powerful open-weights model series competitive with leading frontier models, with strong multilingual and coding capabilities.",
    task: "NLP",
    license: "Qwen License",
    year: 2024,
    org: "Alibaba Cloud",
    size: "72B params",
    architecture: "Transformer with GQA, long-context support up to 128K tokens.",
    usage: `from transformers import AutoModelForCausalLM, AutoTokenizer\nmodel = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2-72B-Instruct")\ntokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2-72B-Instruct")`,
    benchmarks: "MMLU: 84.2%, HumanEval: 86.0%",
    limitations: "Large VRAM requirement for local inference; license restrictions for commercial use.",
    url: "https://qwenlm.github.io/",
    citations: [
      { text: "Qwen2 Technical Report", url: "https://arxiv.org/abs/2407.10671" }
    ]
  },
  {
    name: "DeepSeek-V2",
    type: "Model",
    summary: "DeepSeek's efficient MoE model with 236B total parameters but only 21B active, offering GPT-4 class performance at dramatically lower inference cost.",
    task: "NLP",
    license: "DeepSeek License",
    year: 2024,
    org: "DeepSeek AI",
    size: "236B total (21B active)",
    architecture: "Multi-head Latent Attention (MLA) + DeepSeekMoE architecture.",
    usage: `from transformers import AutoModelForCausalLM, AutoTokenizer\ntokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V2")\nmodel = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-V2", trust_remote_code=True)`,
    benchmarks: "MMLU: 78.5%, strong on math and code",
    limitations: "Complex MoE deployment, license restricts certain commercial uses.",
    url: "https://www.deepseek.com/",
    citations: [
      { text: "DeepSeek-V2 Paper", url: "https://arxiv.org/abs/2405.04434" }
    ]
  },
  {
    name: "o1 (OpenAI)",
    type: "Model",
    summary: "OpenAI's reasoning-focused model that 'thinks before it answers' using chain-of-thought reasoning, excelling at math, science, and coding problems.",
    task: "NLP",
    license: "Proprietary",
    year: 2024,
    org: "OpenAI",
    size: "Unknown",
    architecture: "Large-scale transformer with reinforcement learning on chain-of-thought reasoning traces.",
    usage: `from openai import OpenAI\nclient = OpenAI()\nresponse = client.chat.completions.create(\n  model="o1-preview",\n  messages=[{"role": "user", "content": "Solve this complex math proof."}]\n)`,
    benchmarks: "AIME: 83.3%, GPQA Diamond: 78.0%",
    limitations: "Slower than GPT-4o due to extended thinking, no image output, higher cost.",
    popular: true,
    url: "https://openai.com/o1",
    citations: [
      { text: "OpenAI o1 System Card", url: "https://openai.com/index/openai-o1-system-card/" }
    ]
  },
  {
    name: "Grok-1",
    type: "Model",
    summary: "xAI's open-weights MoE language model, the first large model from Elon Musk's AI company, trained with a focus on real-time information and humor.",
    task: "NLP",
    license: "Apache-2.0",
    year: 2024,
    org: "xAI",
    size: "314B total (86B active per token)",
    architecture: "Sparse MoE transformer with 8 experts.",
    usage: `# Grok-1 weights available on HuggingFace\n# Run locally with sufficient GPU cluster\nfrom transformers import AutoTokenizer\ntokenizer = AutoTokenizer.from_pretrained("xai-org/grok-1")`,
    benchmarks: "MMLU: 73%, HumanEval: 63.2%",
    limitations: "Extremely large model requiring significant compute; not production-API accessible.",
    popular: true,
    url: "https://x.ai/",
    citations: [
      { text: "Grok-1 Release", url: "https://x.ai/blog/grok-os" }
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
    popular: true,
    url: "https://openai.com/gpt-4",
    citations: [
      { text: "Official GPT-4 Technical Report", url: "https://openai.com/research/gpt-4" },
      { text: "GPT-4 API Documentation", url: "https://platform.openai.com/docs" }
    ]
  },
  {
    name: "GPT-3.5 Turbo",
    type: "Model",
    summary: "OpenAI's workhorse model balancing performance and speed, widely used for chatbots and text generation at scale.",
    task: "NLP",
    license: "Proprietary",
    year: 2022,
    org: "OpenAI",
    size: "Unknown (~175B params)",
    architecture: "Transformer decoder fine-tuned with RLHF for instruction following.",
    usage: `from openai import OpenAI\nclient = OpenAI()\nresponse = client.chat.completions.create(\n  model="gpt-3.5-turbo",\n  messages=[{"role": "user", "content": "Hello!"}]\n)`,
    benchmarks: "MMLU: 70.0%, HumanEval: 48.1%",
    limitations: "Knowledge cutoff, prone to hallucination on niche topics.",
    url: "https://platform.openai.com/docs/models/gpt-3-5-turbo",
    citations: [
      { text: "ChatGPT Blog Post", url: "https://openai.com/blog/chatgpt" }
    ]
  },
  {
    name: "GPT-3",
    type: "Model",
    summary: "The landmark 175B parameter autoregressive language model that demonstrated few-shot learning and ignited the modern LLM era.",
    task: "NLP",
    license: "Proprietary",
    year: 2020,
    org: "OpenAI",
    size: "175B params",
    architecture: "Transformer decoder with 96 attention layers.",
    usage: `# GPT-3 is accessed via OpenAI's legacy completions API\nfrom openai import OpenAI\nclient = OpenAI()\nresponse = client.completions.create(\n  model="text-davinci-003",\n  prompt="Translate to French: Hello, world!",\n  max_tokens=60\n)`,
    benchmarks: "SuperGLUE: 71.8% (few-shot)",
    limitations: "Largely superseded, expensive, no chat interface natively.",
    url: "https://openai.com/research/language-models-are-few-shot-learners",
    citations: [
      { text: "Brown et al. (2020) - GPT-3 Paper", url: "https://arxiv.org/abs/2005.14165" }
    ]
  },
  {
    name: "LLaMA 2",
    type: "Model",
    summary: "Meta's second-generation open foundation model family (7B–70B) with a permissive commercial license, trained on 2T tokens.",
    task: "NLP",
    license: "Llama 2 Community License",
    year: 2023,
    org: "Meta AI",
    size: "7B to 70B params",
    architecture: "Transformer decoder with grouped query attention and RoPE embeddings.",
    usage: `from transformers import AutoModelForCausalLM, AutoTokenizer\nmodel = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-70b-chat-hf")\ntokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-70b-chat-hf")`,
    benchmarks: "MMLU: 68.9% (70B), HumanEval: 29.9% (70B)",
    limitations: "Weaker than Llama 3 on most tasks, 4096 max context window.",
    popular: true,
    url: "https://ai.meta.com/llama/",
    citations: [
      { text: "Touvron et al. (2023) - Llama 2 Paper", url: "https://arxiv.org/abs/2307.09288" }
    ]
  },
  {
    name: "LLaMA",
    type: "Model",
    summary: "Open foundation language models from 7B to 65B parameters that sparked the open-source LLM revolution.",
    task: "NLP",
    license: "LLaMA License (non-commercial)",
    year: 2023,
    org: "Meta AI",
    size: "7B to 65B params",
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
    popular: true,
    url: "https://github.com/google-research/bert",
    citations: [
      { text: "Devlin et al. (2018) - BERT Paper", url: "https://arxiv.org/abs/1810.04805" },
      { text: "Official GitHub Repository", url: "https://github.com/google-research/bert" }
    ]
  },
  {
    name: "RoBERTa",
    type: "Model",
    summary: "A robustly optimized BERT pretraining approach that surpassed BERT by training longer with more data and removing next-sentence prediction.",
    task: "NLP",
    license: "MIT",
    year: 2019,
    org: "Facebook AI Research",
    size: "Base: 125M params, Large: 355M params",
    architecture: "Transformer encoder, same as BERT but with dynamic masking and longer training.",
    usage: `from transformers import RobertaTokenizer, RobertaModel\ntokenizer = RobertaTokenizer.from_pretrained('roberta-base')\nmodel = RobertaModel.from_pretrained('roberta-base')`,
    benchmarks: "GLUE: 88.5 (large), SQuAD 2.0: 89.4 F1",
    limitations: "Still limited to 512 tokens; encoder-only, not generative.",
    url: "https://github.com/facebookresearch/fairseq/tree/main/examples/roberta",
    citations: [
      { text: "Liu et al. (2019) - RoBERTa Paper", url: "https://arxiv.org/abs/1907.11692" }
    ]
  },
  {
    name: "T5",
    type: "Model",
    summary: "Text-To-Text Transfer Transformer — Google's unified framework that converts every NLP task into a text-to-text format.",
    task: "NLP",
    license: "Apache-2.0",
    year: 2019,
    org: "Google",
    size: "Small (60M) to 11B params",
    architecture: "Encoder-decoder transformer trained with a span-corruption pre-training objective.",
    usage: `from transformers import T5Tokenizer, T5ForConditionalGeneration\ntokenizer = T5Tokenizer.from_pretrained("t5-base")\nmodel = T5ForConditionalGeneration.from_pretrained("t5-base")\ninput_ids = tokenizer("translate English to French: Hello world", return_tensors="pt").input_ids`,
    benchmarks: "SuperGLUE: 88.9 (11B), GLUE: 90.3 (11B)",
    limitations: "Encoder-decoder architecture slower than decoder-only for generation tasks.",
    url: "https://github.com/google-research/text-to-text-transfer-transformer",
    citations: [
      { text: "Raffel et al. (2019) - T5 Paper", url: "https://arxiv.org/abs/1910.10683" }
    ]
  },
  {
    name: "PaLM 2",
    type: "Model",
    summary: "Google's multilingual, reasoning-focused language model powering Bard and many Google Workspace AI features.",
    task: "NLP",
    license: "Proprietary",
    year: 2023,
    org: "Google",
    size: "Unknown (multiple sizes: Gecko, Otter, Bison, Unicorn)",
    architecture: "Transformer trained with a compute-optimal approach across multilingual and code data.",
    usage: `# Access via Google AI Studio or Vertex AI\nimport vertexai\nfrom vertexai.language_models import TextGenerationModel\nvertexai.init(project="YOUR_PROJECT", location="us-central1")\nmodel = TextGenerationModel.from_pretrained("text-bison@002")\nresponse = model.predict("Write a poem about AI.")`,
    benchmarks: "MMLU: 78.3%, multilingual reasoning leader in 2023",
    limitations: "Superseded by Gemini, proprietary API.",
    url: "https://ai.google/discover/palm2",
    citations: [
      { text: "PaLM 2 Technical Report", url: "https://arxiv.org/abs/2305.10403" }
    ]
  },
  {
    name: "Falcon 180B",
    type: "Model",
    summary: "TII's massive open-source 180B parameter model, one of the largest publicly available LLMs trained on the RefinedWeb dataset.",
    task: "NLP",
    license: "Falcon-180B TII License",
    year: 2023,
    org: "Technology Innovation Institute (TII)",
    size: "180B params",
    architecture: "Causal decoder-only transformer with multi-query attention.",
    usage: `from transformers import AutoTokenizer, AutoModelForCausalLM\ntokenizer = AutoTokenizer.from_pretrained("tiiuae/falcon-180B-chat")\nmodel = AutoModelForCausalLM.from_pretrained("tiiuae/falcon-180B-chat", trust_remote_code=True)`,
    benchmarks: "MMLU: 70.4%, competitive with PaLM 2-L",
    limitations: "Requires massive GPU cluster, commercial use needs separate license.",
    url: "https://falconllm.tii.ae/",
    citations: [
      { text: "Falcon 180B Release", url: "https://huggingface.co/tiiuae/falcon-180B" }
    ]
  },
  {
    name: "Vicuna-13B",
    type: "Model",
    summary: "A fine-tuned LLaMA model trained on ShareGPT conversations, achieving 90% of ChatGPT quality according to GPT-4 evaluations.",
    task: "NLP",
    license: "Non-commercial (based on LLaMA license)",
    year: 2023,
    org: "LMSYS",
    size: "13B params",
    architecture: "LLaMA decoder fine-tuned on ~70K user-shared ChatGPT conversations.",
    usage: `from transformers import AutoModelForCausalLM, AutoTokenizer\nmodel = AutoModelForCausalLM.from_pretrained("lmsys/vicuna-13b-v1.5")\ntokenizer = AutoTokenizer.from_pretrained("lmsys/vicuna-13b-v1.5")`,
    benchmarks: "GPT-4 judged 90% of ChatGPT quality on open questions",
    limitations: "Non-commercial, hallucinates more than proprietary models.",
    url: "https://lmsys.org/blog/2023-03-30-vicuna/",
    citations: [
      { text: "Vicuna Blog Post", url: "https://lmsys.org/blog/2023-03-30-vicuna/" }
    ]
  },
  {
    name: "Alpaca",
    type: "Model",
    summary: "Stanford's instruction-tuned model based on LLaMA 7B, fine-tuned for ~$600 using Self-Instruct data generated from GPT-3.5.",
    task: "NLP",
    license: "Non-commercial (CC BY NC 4.0)",
    year: 2023,
    org: "Stanford CRFM",
    size: "7B params",
    architecture: "LLaMA fine-tuned on 52K instruction-following examples from GPT-3.5.",
    usage: `# Weights available on HuggingFace\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\nmodel = AutoModelForCausalLM.from_pretrained("tatsu-lab/alpaca-7b-wdiff")\ntokenizer = AutoTokenizer.from_pretrained("tatsu-lab/alpaca-7b-wdiff")`,
    benchmarks: "Comparable to GPT-3.5 text-davinci-003 in human evaluation",
    limitations: "Non-commercial license, now largely superseded by better open models.",
    url: "https://crfm.stanford.edu/2023/03/13/alpaca.html",
    citations: [
      { text: "Alpaca: A Strong Open-Source LLM", url: "https://crfm.stanford.edu/2023/03/13/alpaca.html" }
    ]
  },

  // ─── VISION & IMAGE GENERATION MODELS ────────────────────────────────────
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
    popular: true,
    url: "https://stability.ai/stable-diffusion",
    citations: [
      { text: "Rombach et al. (2022) - Latent Diffusion Paper", url: "https://arxiv.org/abs/2112.10752" },
      { text: "Stability AI Official Site", url: "https://stability.ai" }
    ]
  },
  {
    name: "Stable Diffusion XL (SDXL)",
    type: "Model",
    summary: "An improved latent diffusion model with a larger UNet backbone and a refiner model, producing higher-resolution and more detailed images than SD 1.5/2.x.",
    task: "Computer Vision",
    license: "CreativeML Open RAIL++-M",
    year: 2023,
    org: "Stability AI",
    size: "3.5B params (base + refiner)",
    architecture: "Dual text encoders (CLIP ViT-L + OpenCLIP ViT-bigG) with larger UNet backbone.",
    usage: `from diffusers import DiffusionPipeline\npipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0")\nimage = pipe(prompt="A majestic lion at sunset, 8K").images[0]`,
    benchmarks: "Significantly higher FID than SD 2.1, preferred in human evaluation",
    limitations: "Higher VRAM requirement (~12GB), slower than SD 1.5.",
    popular: true,
    url: "https://stability.ai/stable-image",
    citations: [
      { text: "SDXL Paper", url: "https://arxiv.org/abs/2307.01952" }
    ]
  },
  {
    name: "DALL-E 3",
    type: "Model",
    summary: "OpenAI's third-generation text-to-image model with dramatically improved prompt adherence, integrated directly into ChatGPT.",
    task: "Computer Vision",
    license: "Proprietary",
    year: 2023,
    org: "OpenAI",
    size: "Unknown",
    architecture: "Diffusion model with improved text conditioning via a recaptioning technique.",
    usage: `from openai import OpenAI\nclient = OpenAI()\nresponse = client.images.generate(\n  model="dall-e-3",\n  prompt="A cozy cabin in a snowy forest at night, cinematic lighting",\n  size="1024x1024",\n  quality="hd"\n)`,
    benchmarks: "Human preference significantly higher than DALL-E 2, SD, and Midjourney v5",
    limitations: "Proprietary, no local inference, usage policy restrictions.",
    popular: true,
    url: "https://openai.com/dall-e-3",
    citations: [
      { text: "DALL-E 3 Technical Report", url: "https://openai.com/research/dall-e-3" }
    ]
  },
  {
    name: "DALL-E 2",
    type: "Model",
    summary: "OpenAI's second-generation image model introducing inpainting, outpainting, and variations from text and image inputs.",
    task: "Computer Vision",
    license: "Proprietary",
    year: 2022,
    org: "OpenAI",
    size: "Unknown (3.5B params)",
    architecture: "CLIP-guided hierarchical diffusion model with GLIDE as prior.",
    usage: `from openai import OpenAI\nclient = OpenAI()\nresponse = client.images.generate(\n  model="dall-e-2",\n  prompt="A surrealist painting of a robot reading a book",\n  n=1,\n  size="1024x1024"\n)`,
    benchmarks: "FID: 10.39 on COCO",
    limitations: "Superseded by DALL-E 3, limited prompt comprehension vs. newer models.",
    url: "https://openai.com/dall-e-2",
    citations: [
      { text: "Hierarchical Text-Conditional Image Generation Paper", url: "https://arxiv.org/abs/2204.06125" }
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
    popular: true,
    url: "https://github.com/openai/CLIP",
    citations: [
      { text: "Radford et al. (2021) - CLIP Paper", url: "https://arxiv.org/abs/2103.00020" },
      { text: "Official CLIP Repository", url: "https://github.com/openai/CLIP" }
    ]
  },
  {
    name: "SAM (Segment Anything Model)",
    type: "Model",
    summary: "Meta's foundation model for image segmentation that can segment any object in any image with a single click, point, or text prompt.",
    task: "Computer Vision",
    license: "Apache-2.0",
    year: 2023,
    org: "Meta AI",
    size: "ViT-H: 636M params",
    architecture: "Vision Transformer image encoder + prompt encoder + mask decoder.",
    usage: `from segment_anything import sam_model_registry, SamPredictor\nsam = sam_model_registry["vit_h"](checkpoint="sam_vit_h.pth")\npredictor = SamPredictor(sam)\npredictor.set_image(image)\nmasks, scores, logits = predictor.predict(point_coords=input_point, point_labels=input_label)`,
    benchmarks: "Zero-shot COCO AP: 46.5% (SAM ViT-H)",
    limitations: "Does not track objects across frames; not designed for semantic labeling.",
    popular: true,
    url: "https://segment-anything.com/",
    citations: [
      { text: "Kirillov et al. (2023) - SAM Paper", url: "https://arxiv.org/abs/2304.02643" }
    ]
  },
  {
    name: "Whisper",
    type: "Model",
    summary: "OpenAI's robust automatic speech recognition (ASR) model trained on 680K hours of multilingual and multitask supervised web data.",
    task: "Audio / ASR",
    license: "MIT",
    year: 2022,
    org: "OpenAI",
    size: "Large-v3: 1.55B params",
    architecture: "Encoder-decoder transformer operating on log-Mel spectrograms.",
    usage: `import whisper\nmodel = whisper.load_model("large-v3")\nresult = model.transcribe("audio.mp3")\nprint(result["text"])`,
    benchmarks: "WER competitive with commercial ASR on LibriSpeech",
    limitations: "Real-time use requires optimization; struggles with heavy accents and rare languages.",
    popular: true,
    url: "https://openai.com/research/whisper",
    citations: [
      { text: "Radford et al. (2022) - Whisper Paper", url: "https://arxiv.org/abs/2212.04356" }
    ]
  },
  {
    name: "ViT (Vision Transformer)",
    type: "Model",
    summary: "The original paper demonstrating that pure transformer architecture, without convolutional layers, achieves state-of-the-art results on image classification.",
    task: "Computer Vision",
    license: "Apache-2.0",
    year: 2020,
    org: "Google Brain",
    size: "ViT-L/16: 307M params",
    architecture: "Pure transformer applied to sequences of image patches.",
    usage: `from transformers import ViTImageProcessor, ViTForImageClassification\nfrom PIL import Image\nprocessor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')\nmodel = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224')`,
    benchmarks: "ImageNet top-1: 88.55% (ViT-L/16)",
    limitations: "Requires large datasets to train from scratch; less data-efficient than CNNs.",
    url: "https://github.com/google-research/vision_transformer",
    citations: [
      { text: "Dosovitskiy et al. (2020) - ViT Paper", url: "https://arxiv.org/abs/2010.11929" }
    ]
  },
  {
    name: "Sora",
    type: "Model",
    summary: "OpenAI's text-to-video model capable of generating high-quality, minute-long video clips from text descriptions with impressive temporal consistency.",
    task: "Computer Vision",
    license: "Proprietary",
    year: 2024,
    org: "OpenAI",
    size: "Unknown",
    architecture: "Diffusion transformer (DiT) operating on spacetime patches of video.",
    usage: `# Sora is accessible via ChatGPT Plus/Pro or the OpenAI API\n# API access for developers was opened in late 2024\nfrom openai import OpenAI\nclient = OpenAI()\n# See official Sora docs for current API usage`,
    benchmarks: "N/A — subjective quality; significant leap in video coherence",
    limitations: "Limited public API access, expensive, struggles with physics simulation.",
    popular: true,
    url: "https://openai.com/sora",
    citations: [
      { text: "Sora Technical Report", url: "https://openai.com/research/video-generation-models-as-world-simulators" }
    ]
  },
  {
    name: "ResNet",
    type: "Model",
    summary: "The residual neural network that introduced skip connections, enabling training of very deep networks (100+ layers) and winning ImageNet 2015.",
    task: "Computer Vision",
    license: "MIT",
    year: 2015,
    org: "Microsoft Research",
    size: "ResNet-50: 25M params",
    architecture: "CNN with residual (skip) connections to enable very deep network training.",
    usage: `import torchvision.models as models\nmodel = models.resnet50(pretrained=True)\nmodel.eval()`,
    benchmarks: "ImageNet top-5 error: 3.57% (ensemble)",
    limitations: "Largely superseded by ViT-based models for top benchmarks.",
    popular: true,
    url: "https://arxiv.org/abs/1512.03385",
    citations: [
      { text: "He et al. (2015) - Deep Residual Learning Paper", url: "https://arxiv.org/abs/1512.03385" }
    ]
  },
  {
    name: "YOLOv8",
    type: "Model",
    summary: "The latest iteration of the You Only Look Once real-time object detection framework, supporting detection, segmentation, pose estimation, and classification.",
    task: "Computer Vision",
    license: "AGPL-3.0",
    year: 2023,
    org: "Ultralytics",
    size: "Nano: 3.2M params to Extra-Large: 68.2M params",
    architecture: "Single-stage detector with an anchor-free head and a CSPDarknet backbone.",
    usage: `from ultralytics import YOLO\nmodel = YOLO("yolov8n.pt")\nresults = model("https://ultralytics.com/images/bus.jpg")\nresults[0].show()`,
    benchmarks: "COCO mAP: 53.9% (YOLOv8x)",
    limitations: "AGPL license may restrict commercial use without purchase.",
    popular: true,
    url: "https://github.com/ultralytics/ultralytics",
    citations: [
      { text: "Ultralytics YOLOv8 Docs", url: "https://docs.ultralytics.com/" }
    ]
  },

  // ─── AUDIO & MULTIMODAL MODELS ────────────────────────────────────────────
  {
    name: "MusicGen",
    type: "Model",
    summary: "Meta's controllable text-to-music model that generates high-quality music from text descriptions or melody conditioning.",
    task: "Audio",
    license: "CC BY-NC 4.0",
    year: 2023,
    org: "Meta AI",
    size: "300M to 3.3B params",
    architecture: "Transformer-based auto-regressive language model operating on EnCodec audio tokens.",
    usage: `from audiocraft.models import MusicGen\nmodel = MusicGen.get_pretrained('facebook/musicgen-large')\nmodel.set_generation_params(duration=8)\nwav = model.generate(["An upbeat jazz piano with drums"])`,
    benchmarks: "FAD: 4.93 (large model), Fréchet Audio Distance competitive with MusicLM",
    limitations: "Non-commercial license, 30-second max duration natively.",
    url: "https://github.com/facebookresearch/audiocraft",
    citations: [
      { text: "Copet et al. (2023) - MusicGen Paper", url: "https://arxiv.org/abs/2306.05284" }
    ]
  },
  {
    name: "LLaVA",
    type: "Model",
    summary: "Large Language-and-Vision Assistant — an open-source multimodal model that combines a visual encoder with an LLM for general-purpose visual question answering.",
    task: "Multimodal",
    license: "Apache-2.0",
    year: 2023,
    org: "University of Wisconsin-Madison & Microsoft",
    size: "7B to 34B params",
    architecture: "CLIP visual encoder connected to a Vicuna/Mistral LLM via a linear projection layer.",
    usage: `from transformers import LlavaNextProcessor, LlavaNextForConditionalGeneration\nprocessor = LlavaNextProcessor.from_pretrained("llava-hf/llava-v1.6-mistral-7b-hf")\nmodel = LlavaNextForConditionalGeneration.from_pretrained("llava-hf/llava-v1.6-mistral-7b-hf")`,
    benchmarks: "MMBench: 76.3% (LLaVA-1.6 34B), ScienceQA: 90.92%",
    limitations: "Vision understanding still behind GPT-4V on complex visual tasks.",
    url: "https://llava-vl.github.io/",
    citations: [
      { text: "LLaVA Paper", url: "https://arxiv.org/abs/2304.08485" }
    ]
  },

  // ─── CODE MODELS ─────────────────────────────────────────────────────────
  {
    name: "Codex",
    type: "Model",
    summary: "OpenAI's code-specialized GPT model that powers GitHub Copilot, fine-tuned on billions of lines of public code.",
    task: "NLP",
    license: "Proprietary",
    year: 2021,
    org: "OpenAI",
    size: "12B params",
    architecture: "GPT-3 fine-tuned on 159GB of GitHub code across 54 programming languages.",
    usage: `# Codex is accessed via the OpenAI Completions API (deprecated in favor of GPT-4)\nfrom openai import OpenAI\nclient = OpenAI()\nresponse = client.completions.create(\n  model="code-davinci-002",\n  prompt="# Python function to sort a list\\ndef sort_list(",\n  max_tokens=100\n)`,
    benchmarks: "HumanEval: 72% pass@100",
    limitations: "Deprecated — succeeded by GPT-4, can generate insecure code.",
    popular: true,
    url: "https://openai.com/blog/openai-codex",
    citations: [
      { text: "Chen et al. (2021) - Codex Paper", url: "https://arxiv.org/abs/2107.03374" }
    ]
  },
  {
    name: "Code Llama",
    type: "Model",
    summary: "Meta's family of open-source code-specialized models (7B–70B) built on Llama 2, supporting code generation, infilling, and instruction-following for 100+ programming languages.",
    task: "NLP",
    license: "Llama 2 Community License",
    year: 2023,
    org: "Meta AI",
    size: "7B to 70B params",
    architecture: "Llama 2 fine-tuned on 500B code tokens, with infilling and long-context capability.",
    usage: `from transformers import AutoTokenizer, AutoModelForCausalLM\ntokenizer = AutoTokenizer.from_pretrained("meta-llama/CodeLlama-34b-Instruct-hf")\nmodel = AutoModelForCausalLM.from_pretrained("meta-llama/CodeLlama-34b-Instruct-hf")`,
    benchmarks: "HumanEval: 53.7% (34B), pass@1",
    limitations: "Commercial use constraints from Llama 2 license.",
    popular: true,
    url: "https://ai.meta.com/blog/code-llama-large-language-model-coding/",
    citations: [
      { text: "Code Llama Paper", url: "https://arxiv.org/abs/2308.12950" }
    ]
  },
  {
    name: "StarCoder2",
    type: "Model",
    summary: "BigCode's open state-of-the-art code model trained on 619 programming languages with permissive licensing, supporting infilling and 16K context.",
    task: "NLP",
    license: "BigCode OpenRAIL-M v1",
    year: 2024,
    org: "BigCode / HuggingFace",
    size: "3B to 15B params",
    architecture: "Transformer decoder with multi-query attention and Fill-in-the-Middle (FIM) training.",
    usage: `from transformers import AutoTokenizer, AutoModelForCausalLM\ntokenizer = AutoTokenizer.from_pretrained("bigcode/starcoder2-15b")\nmodel = AutoModelForCausalLM.from_pretrained("bigcode/starcoder2-15b")`,
    benchmarks: "HumanEval: 46.3% (15B pass@1), best open model at time of release",
    limitations: "Not an instruction-tuned chat model by default; requires fine-tuning for dialogue.",
    popular: true,
    url: "https://github.com/bigcode-project/starcoder2",
    citations: [
      { text: "StarCoder2 Paper", url: "https://arxiv.org/abs/2402.19173" }
    ]
  },
  {
    name: "DeepSeek-Coder",
    type: "Model",
    summary: "DeepSeek's top-performing open-source code model series (1.3B–33B) that outperforms GPT-3.5 Turbo on many coding benchmarks.",
    task: "NLP",
    license: "DeepSeek License",
    year: 2023,
    org: "DeepSeek AI",
    size: "1.3B to 33B params",
    architecture: "Transformer decoder trained on 2T tokens across 87 programming languages.",
    usage: `from transformers import AutoTokenizer, AutoModelForCausalLM\ntokenizer = AutoTokenizer.from_pretrained("deepseek-ai/deepseek-coder-33b-instruct")\nmodel = AutoModelForCausalLM.from_pretrained("deepseek-ai/deepseek-coder-33b-instruct")`,
    benchmarks: "HumanEval: 79.3% (33B), outperforms GPT-3.5 Turbo",
    limitations: "License restricts certain commercial applications.",
    url: "https://github.com/deepseek-ai/DeepSeek-Coder",
    citations: [
      { text: "DeepSeek-Coder Paper", url: "https://arxiv.org/abs/2401.14196" }
    ]
  },

  // ─── EMBEDDING & RETRIEVAL MODELS ─────────────────────────────────────────
  {
    name: "text-embedding-3-large",
    type: "Model",
    summary: "OpenAI's most capable text embedding model, with improved multilingual performance and flexible dimensionality reduction.",
    task: "NLP",
    license: "Proprietary",
    year: 2024,
    org: "OpenAI",
    size: "Unknown",
    architecture: "Encoder-only transformer producing dense vector representations.",
    usage: `from openai import OpenAI\nclient = OpenAI()\nresponse = client.embeddings.create(\n  input="Your text string goes here",\n  model="text-embedding-3-large"\n)\nembedding = response.data[0].embedding`,
    benchmarks: "MTEB: 64.6% average across 56 tasks",
    limitations: "Proprietary, pay-per-use, no local inference.",
    url: "https://platform.openai.com/docs/guides/embeddings",
    citations: [
      { text: "New Embedding Models Announcement", url: "https://openai.com/blog/new-embedding-models-and-api-updates" }
    ]
  },
  {
    name: "E5-Mistral-7B",
    type: "Model",
    summary: "Microsoft's state-of-the-art text embedding model based on Mistral 7B, achieving top MTEB scores for retrieval and semantic search tasks.",
    task: "NLP",
    license: "MIT",
    year: 2024,
    org: "Microsoft",
    size: "7B params",
    architecture: "Mistral 7B decoder fine-tuned with contrastive learning for embedding tasks.",
    usage: `from sentence_transformers import SentenceTransformer\nmodel = SentenceTransformer("intfloat/e5-mistral-7b-instruct")\nembeddings = model.encode(["Hello world", "Bonjour le monde"])`,
    benchmarks: "MTEB: 66.6% average (top open model at release)",
    limitations: "7B params is large for an embedding model; slower than lighter alternatives.",
    url: "https://arxiv.org/abs/2401.00368",
    citations: [
      { text: "E5-Mistral Paper", url: "https://arxiv.org/abs/2401.00368" }
    ]
  },

  // ─── FRAMEWORKS ──────────────────────────────────────────────────────────
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
    popular: true,
    url: "https://pytorch.org",
    citations: [
      { text: "PyTorch Official Documentation", url: "https://pytorch.org/docs" },
      { text: "GitHub Repository", url: "https://github.com/pytorch/pytorch" }
    ]
  },
  {
    name: "TensorFlow",
    type: "Framework",
    summary: "Google's end-to-end open-source ML platform, widely used in production for its robust serving infrastructure and mobile deployment via TensorFlow Lite.",
    task: "MLOps",
    license: "Apache-2.0",
    year: 2015,
    org: "Google Brain",
    size: "N/A",
    architecture: "Graph-based computation framework with eager execution support, Keras high-level API.",
    usage: `import tensorflow as tf\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(64, activation='relu'),\n  tf.keras.layers.Dense(10, activation='softmax')\n])\nmodel.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])`,
    benchmarks: "Dominant framework for production ML deployments",
    limitations: "More complex debugging than PyTorch, less dominant in research community.",
    popular: true,
    url: "https://www.tensorflow.org",
    citations: [
      { text: "TensorFlow Official Site", url: "https://www.tensorflow.org" },
      { text: "GitHub Repository", url: "https://github.com/tensorflow/tensorflow" }
    ]
  },
  {
    name: "JAX",
    type: "Framework",
    summary: "Google's high-performance numerical computing library combining Autograd and XLA, enabling GPU/TPU-accelerated ML research with functional transformations.",
    task: "MLOps",
    license: "Apache-2.0",
    year: 2018,
    org: "Google DeepMind",
    size: "N/A",
    architecture: "NumPy-compatible API with JIT compilation, vectorization (vmap), and automatic differentiation (grad).",
    usage: `import jax\nimport jax.numpy as jnp\n\n@jax.jit\ndef predict(params, x):\n  return jnp.dot(x, params['w']) + params['b']\n\ngrad_fn = jax.grad(lambda params, x, y: jnp.mean((predict(params, x) - y)**2))`,
    benchmarks: "Powers many state-of-the-art research papers at Google DeepMind",
    limitations: "Steeper learning curve, functional style requires adapting existing code.",
    url: "https://github.com/google/jax",
    citations: [
      { text: "JAX GitHub Repository", url: "https://github.com/google/jax" }
    ]
  },
  {
    name: "LangChain",
    type: "Framework",
    summary: "A popular framework for building LLM-powered applications with chains, agents, memory, and tool integrations.",
    task: "MLOps",
    license: "MIT",
    year: 2022,
    org: "LangChain AI",
    size: "N/A",
    architecture: "Modular Python/JS library with abstractions for chains, agents, retrievers, and memory.",
    usage: `from langchain_openai import ChatOpenAI\nfrom langchain_core.messages import HumanMessage\n\nmodel = ChatOpenAI(model="gpt-4o")\nresponse = model.invoke([HumanMessage(content="Tell me a joke.")])`,
    benchmarks: "Most starred LLM framework on GitHub (85K+ stars)",
    limitations: "Rapidly evolving API, abstractions can be opaque, sometimes overengineered for simple tasks.",
    popular: true,
    url: "https://www.langchain.com/",
    citations: [
      { text: "LangChain Documentation", url: "https://python.langchain.com/docs/get_started/introduction" }
    ]
  },
  {
    name: "LlamaIndex",
    type: "Framework",
    summary: "A data framework for LLM applications focused on ingesting, structuring, and accessing private or domain-specific data for RAG applications.",
    task: "MLOps",
    license: "MIT",
    year: 2022,
    org: "LlamaIndex",
    size: "N/A",
    architecture: "Data connectors + indexing strategies + query engines for RAG pipelines.",
    usage: `from llama_index.core import VectorStoreIndex, SimpleDirectoryReader\ndocuments = SimpleDirectoryReader("data").load_data()\nindex = VectorStoreIndex.from_documents(documents)\nquery_engine = index.as_query_engine()\nresponse = query_engine.query("What did the author do growing up?")`,
    benchmarks: "Leading framework for RAG-based applications",
    limitations: "Can be complex for advanced configurations; performance depends on vector store choice.",
    url: "https://www.llamaindex.ai/",
    citations: [
      { text: "LlamaIndex Documentation", url: "https://docs.llamaindex.ai/" }
    ]
  },
  {
    name: "Scikit-learn",
    type: "Framework",
    summary: "The go-to Python library for classical machine learning with a consistent, easy-to-use API for classification, regression, clustering, and preprocessing.",
    task: "MLOps",
    license: "BSD-3-Clause",
    year: 2007,
    org: "Community / INRIA",
    size: "N/A",
    architecture: "Python library built on NumPy, SciPy, and Matplotlib with estimator API pattern.",
    usage: `from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)\nprint(clf.score(X_test, y_test))`,
    benchmarks: "N/A — foundational library, not benchmarked as a model",
    limitations: "Not designed for deep learning or GPU-accelerated large-scale training.",
    popular: true,
    url: "https://scikit-learn.org",
    citations: [
      { text: "Pedregosa et al. (2011) - Scikit-learn Paper", url: "https://arxiv.org/abs/1201.0490" }
    ]
  },
  {
    name: "Keras",
    type: "Framework",
    summary: "A high-level deep learning API that runs on top of TensorFlow, JAX, or PyTorch, designed for fast experimentation with a human-centric design philosophy.",
    task: "MLOps",
    license: "Apache-2.0",
    year: 2015,
    org: "Google",
    size: "N/A",
    architecture: "Multi-backend deep learning API (TF/JAX/PyTorch) with layer, model, and optimizer abstractions.",
    usage: `import keras\nmodel = keras.Sequential([\n  keras.layers.Dense(64, activation='relu'),\n  keras.layers.Dense(1, activation='sigmoid')\n])\nmodel.compile(optimizer='adam', loss='binary_crossentropy')\nmodel.fit(x_train, y_train, epochs=10)`,
    benchmarks: "N/A — high-level API; backend-dependent performance",
    limitations: "Less flexibility than raw PyTorch for custom training loops.",
    url: "https://keras.io",
    citations: [
      { text: "Keras Official Documentation", url: "https://keras.io/guides/" }
    ]
  },
  {
    name: "Ollama",
    type: "Framework",
    summary: "A tool for running large language models locally on your Mac, Linux, or Windows machine with a simple CLI and REST API.",
    task: "MLOps",
    license: "MIT",
    year: 2023,
    org: "Ollama",
    size: "N/A",
    architecture: "Go-based server wrapping llama.cpp inference backend with a Docker-like model management CLI.",
    usage: `# Install and run from terminal\n$ ollama pull llama3\n$ ollama run llama3\n\n# Or use the REST API\nimport requests\nresponse = requests.post('http://localhost:11434/api/generate',\n  json={"model": "llama3", "prompt": "Why is the sky blue?", "stream": False})`,
    benchmarks: "N/A — inference speed depends on hardware",
    limitations: "Local hardware constraints limit model size; not for production serving at scale.",
    url: "https://ollama.com/",
    citations: [
      { text: "Ollama GitHub", url: "https://github.com/ollama/ollama" }
    ]
  },
  {
    name: "vLLM",
    type: "Framework",
    summary: "A fast and easy-to-use library for LLM inference and serving, featuring PagedAttention for near-optimal GPU memory management.",
    task: "MLOps",
    license: "Apache-2.0",
    year: 2023,
    org: "UC Berkeley",
    size: "N/A",
    architecture: "PagedAttention memory manager with continuous batching for high-throughput serving.",
    usage: `from vllm import LLM, SamplingParams\nllm = LLM(model="meta-llama/Meta-Llama-3-8B-Instruct")\nparams = SamplingParams(temperature=0.8, top_p=0.95)\noutputs = llm.generate(["Tell me a fun fact about space."], params)`,
    benchmarks: "Up to 24x higher throughput than HuggingFace Transformers",
    limitations: "Primarily optimized for NVIDIA GPUs, less support for AMD/Apple Silicon.",
    popular: true,
    url: "https://github.com/vllm-project/vllm",
    citations: [
      { text: "Kwon et al. (2023) - vLLM Paper", url: "https://arxiv.org/abs/2309.06180" }
    ]
  },

  // ─── PLATFORMS ────────────────────────────────────────────────────────────
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
    popular: true,
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
    popular: true,
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
    popular: true,
    url: "https://github.com/features/copilot",
    citations: [
      { text: "GitHub Copilot Features", url: "https://github.com/features/copilot" }
    ]
  },
  {
    name: "OpenAI Platform",
    type: "Platform",
    summary: "OpenAI's developer API platform providing access to GPT-4, DALL-E, Whisper, embeddings, and fine-tuning capabilities.",
    task: "MLOps",
    license: "Proprietary",
    year: 2020,
    org: "OpenAI",
    size: "N/A",
    architecture: "REST API with model routing, rate limiting, and usage tracking.",
    usage: `from openai import OpenAI\nclient = OpenAI(api_key="YOUR_API_KEY")\nresponse = client.chat.completions.create(\n  model="gpt-4o",\n  messages=[{"role": "user", "content": "Hello!"}]\n)`,
    benchmarks: "N/A",
    limitations: "Pay-per-token pricing, rate limits on free tier, proprietary.",
    url: "https://platform.openai.com",
    citations: [
      { text: "OpenAI API Documentation", url: "https://platform.openai.com/docs" }
    ]
  },
  {
    name: "Vertex AI",
    type: "Platform",
    summary: "Google Cloud's unified ML platform for building, deploying, and scaling AI models including access to Gemini, PaLM, and custom model training.",
    task: "MLOps",
    license: "Proprietary",
    year: 2021,
    org: "Google Cloud",
    size: "N/A",
    architecture: "Managed cloud ML platform with AutoML, custom training, feature store, and model registry.",
    usage: `import vertexai\nfrom vertexai.generative_models import GenerativeModel\nvertexai.init(project="YOUR_PROJECT", location="us-central1")\nmodel = GenerativeModel("gemini-1.5-pro")\nresponse = model.generate_content("Describe the water cycle.")`,
    benchmarks: "N/A",
    limitations: "GCP-locked, complex pricing, requires GCP account setup.",
    url: "https://cloud.google.com/vertex-ai",
    citations: [
      { text: "Vertex AI Documentation", url: "https://cloud.google.com/vertex-ai/docs" }
    ]
  },
  {
    name: "AWS Bedrock",
    type: "Platform",
    summary: "Amazon's fully managed service for accessing foundation models from Anthropic, Meta, Mistral, and others via a single API with enterprise security.",
    task: "MLOps",
    license: "Proprietary",
    year: 2023,
    org: "Amazon Web Services",
    size: "N/A",
    architecture: "Managed API gateway for foundation models with AWS IAM, VPC, and CloudWatch integration.",
    usage: `import boto3, json\nbedrock = boto3.client('bedrock-runtime', region_name='us-east-1')\nbody = json.dumps({"prompt": "\\n\\nHuman: Hi\\n\\nAssistant:", "max_tokens_to_sample": 300})\nresponse = bedrock.invoke_model(body=body, modelId='anthropic.claude-v2')`,
    benchmarks: "N/A",
    limitations: "AWS-locked, additional latency vs. direct API, complex IAM setup.",
    url: "https://aws.amazon.com/bedrock/",
    citations: [
      { text: "AWS Bedrock Documentation", url: "https://docs.aws.amazon.com/bedrock/" }
    ]
  },
  {
    name: "Weights & Biases",
    type: "Platform",
    summary: "The ML experiment tracking and model management platform used by researchers worldwide to log metrics, visualize training, and collaborate on models.",
    task: "MLOps",
    license: "Proprietary (free for individuals)",
    year: 2018,
    org: "Weights & Biases Inc.",
    size: "N/A",
    architecture: "Cloud-based experiment tracking with SDK integrations for PyTorch, TensorFlow, JAX, and more.",
    usage: `import wandb\nwandb.init(project="my-project")\nfor epoch in range(10):\n  loss = train_one_epoch()\n  wandb.log({"loss": loss, "epoch": epoch})`,
    benchmarks: "N/A",
    limitations: "Data sent to cloud servers (privacy concern), storage limits on free tier.",
    popular: true,
    url: "https://wandb.ai",
    citations: [
      { text: "W&B Documentation", url: "https://docs.wandb.ai/" }
    ]
  },
  {
    name: "Replicate",
    type: "Platform",
    summary: "A cloud platform for running machine learning models via API, making it easy to deploy open-source models like Llama, Stable Diffusion, and Whisper at scale.",
    task: "MLOps",
    license: "Proprietary",
    year: 2019,
    org: "Replicate Inc.",
    size: "N/A",
    architecture: "Containerized model deployment with Cog packaging and pay-per-prediction pricing.",
    usage: `import replicate\noutput = replicate.run(\n  "meta/meta-llama-3-70b-instruct",\n  input={"prompt": "Write a haiku about AI"}\n)\nprint("".join(output))`,
    benchmarks: "N/A",
    limitations: "Pay-per-second pricing can be costly for heavy use; cold start latency.",
    url: "https://replicate.com",
    citations: [
      { text: "Replicate Documentation", url: "https://replicate.com/docs" }
    ]
  },
  {
    name: "Together AI",
    type: "Platform",
    summary: "A cloud platform for fast inference on open-source AI models with competitive pricing, offering fine-tuning and custom deployment.",
    task: "MLOps",
    license: "Proprietary",
    year: 2022,
    org: "Together AI",
    size: "N/A",
    architecture: "Distributed inference cluster with FlashAttention and custom serving optimizations.",
    usage: `from together import Together\nclient = Together(api_key="YOUR_API_KEY")\nresponse = client.chat.completions.create(\n  model="meta-llama/Llama-3-70b-chat-hf",\n  messages=[{"role": "user", "content": "What is RAG?"}]\n)`,
    benchmarks: "N/A",
    limitations: "Proprietary, model availability may change.",
    url: "https://www.together.ai/",
    citations: [
      { text: "Together AI Documentation", url: "https://docs.together.ai/" }
    ]
  },
  {
    name: "Groq",
    type: "Platform",
    summary: "An AI inference platform powered by custom LPU (Language Processing Unit) chips, delivering extremely fast token generation for open-source models.",
    task: "MLOps",
    license: "Proprietary",
    year: 2016,
    org: "Groq Inc.",
    size: "N/A",
    architecture: "LPU hardware with SRAM-based compute delivering deterministic, ultra-low-latency inference.",
    usage: `from groq import Groq\nclient = Groq(api_key="YOUR_API_KEY")\ncompletion = client.chat.completions.create(\n  model="llama3-70b-8192",\n  messages=[{"role": "user", "content": "Explain transformers quickly."}]\n)`,
    benchmarks: "500+ tokens/second — among fastest public LLM inference APIs",
    limitations: "Limited model selection, proprietary hardware dependency.",
    popular: true,
    url: "https://groq.com/",
    citations: [
      { text: "Groq Documentation", url: "https://console.groq.com/docs/openai" }
    ]
  },
  {
    name: "Cursor",
    type: "Platform",
    summary: "An AI-first code editor (fork of VS Code) with deep model integration, supporting multi-file edits, codebase chat, and agent-based refactoring.",
    task: "NLP",
    license: "Proprietary",
    year: 2023,
    org: "Anysphere",
    size: "Based on GPT-4, Claude 3.5, and custom models",
    architecture: "VS Code fork with custom LSP-integrated AI context window and multi-model routing.",
    usage: `# Cursor is a desktop application\n# Use Cmd+K for inline edits\n# Use Cmd+L to open chat with full codebase context\n# Agent mode: Cmd+Shift+I for autonomous multi-file changes`,
    benchmarks: "N/A — fastest growing AI code editor in 2024",
    limitations: "Subscription required for full model access, privacy concerns with code uploads.",
    popular: true,
    url: "https://cursor.com/",
    citations: [
      { text: "Cursor Official Site", url: "https://cursor.com/" }
    ]
  },
  {
    name: "Midjourney (Platform)",
    type: "Platform",
    summary: "The leading AI image generation platform accessed via Discord and a web interface, powering the most widely used consumer AI art tool.",
    task: "Computer Vision",
    license: "Proprietary",
    year: 2022,
    org: "Midjourney, Inc.",
    size: "N/A",
    architecture: "Proprietary diffusion model served via Discord bot and web UI.",
    usage: `# Access via Discord or https://www.midjourney.com/\n/imagine prompt: Photograph of a cat wearing a spacesuit on the moon, cinematic lighting --v 6.1 --ar 16:9`,
    benchmarks: "N/A — subjective quality, widely regarded as leader for artistic output",
    limitations: "No official API, paid subscription, all generations are public on free tier.",
    url: "https://www.midjourney.com/",
    citations: [
      { text: "Midjourney Website", url: "https://www.midjourney.com/" }
    ]
  },
  {
    name: "Pinecone",
    type: "Platform",
    summary: "A managed vector database purpose-built for AI applications, enabling fast similarity search at scale for RAG, semantic search, and recommendation systems.",
    task: "MLOps",
    license: "Proprietary",
    year: 2019,
    org: "Pinecone Systems",
    size: "N/A",
    architecture: "Managed ANNS (Approximate Nearest Neighbor Search) vector store with hybrid search support.",
    usage: `from pinecone import Pinecone, ServerlessSpec\npc = Pinecone(api_key="YOUR_API_KEY")\npc.create_index("my-index", dimension=1536, metric="cosine", spec=ServerlessSpec(cloud='aws', region='us-east-1'))\nindex = pc.Index("my-index")\nindex.upsert(vectors=[("vec1", [0.1, 0.2, ...], {"text": "hello"})])`,
    benchmarks: "Sub-10ms query latency at billion-vector scale",
    limitations: "Proprietary, can be expensive at scale vs. self-hosted alternatives.",
    popular: true,
    url: "https://www.pinecone.io/",
    citations: [
      { text: "Pinecone Documentation", url: "https://docs.pinecone.io/" }
    ]
  },

  // ─── DATASETS ─────────────────────────────────────────────────────────────
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
    popular: true,
    url: "https://image-net.org",
    citations: [
      { text: "Deng et al. (2009) - ImageNet Paper", url: "https://ieeexplore.ieee.org/document/5206848" },
      { text: "Official ImageNet Website", url: "https://image-net.org" }
    ]
  },
  {
    name: "Common Crawl",
    type: "Dataset",
    summary: "A massive open repository of web crawl data containing petabytes of raw text used as the primary pre-training corpus for most modern LLMs.",
    task: "NLP",
    license: "Public Domain (Terms of Use apply)",
    year: 2008,
    org: "Common Crawl Foundation",
    size: "3+ billion web pages, ~1PB compressed",
    architecture: "WARC/WET file format of crawled web content across decades.",
    usage: `# Access via AWS S3 public dataset\nimport boto3\ns3 = boto3.client('s3', region_name='us-east-1')\n# Browse at s3://commoncrawl/\nresponse = s3.list_objects_v2(Bucket='commoncrawl', Prefix='crawl-data/CC-MAIN-2024-10/')`,
    benchmarks: "Used to train GPT-3, LLaMA, Falcon, and virtually all frontier models",
    limitations: "Requires extensive filtering (toxic content, duplicates, low quality) before use.",
    url: "https://commoncrawl.org/",
    citations: [
      { text: "Common Crawl Official Site", url: "https://commoncrawl.org/" }
    ]
  },
  {
    name: "The Pile",
    type: "Dataset",
    summary: "EleutherAI's 825GB open-source diverse text dataset designed for training large language models, combining 22 high-quality data sources.",
    task: "NLP",
    license: "MIT",
    year: 2020,
    org: "EleutherAI",
    size: "825GB, ~300B tokens",
    architecture: "22 data sources including Books3, GitHub, Wikipedia, PubMed, arXiv, and more.",
    usage: `# Available on HuggingFace\nfrom datasets import load_dataset\ndataset = load_dataset("EleutherAI/pile", split="train", streaming=True)`,
    benchmarks: "Used to train GPT-NeoX, GPT-J, and other EleutherAI models",
    limitations: "Some components have license restrictions (Books3 removed after legal challenges).",
    url: "https://pile.eleuther.ai/",
    citations: [
      { text: "Gao et al. (2020) - The Pile Paper", url: "https://arxiv.org/abs/2101.00027" }
    ]
  },
  {
    name: "LAION-5B",
    type: "Dataset",
    summary: "A massive open-source dataset of 5.85 billion CLIP-filtered image-text pairs scraped from the web, used to train Stable Diffusion and other vision models.",
    task: "Computer Vision",
    license: "CC BY 4.0",
    year: 2022,
    org: "LAION",
    size: "5.85B image-text pairs (~240TB)",
    architecture: "CLIP-filtered pairs from Common Crawl with aesthetic, safety, and watermark scores.",
    usage: `# Access subsets via HuggingFace\nfrom datasets import load_dataset\ndataset = load_dataset("laion/laion2B-en", split="train", streaming=True)`,
    benchmarks: "Enables training of SOTA text-to-image models",
    limitations: "Contains harmful/copyrighted content, filtered versions recommended.",
    url: "https://laion.ai/blog/laion-5b/",
    citations: [
      { text: "Schuhmann et al. (2022) - LAION-5B Paper", url: "https://arxiv.org/abs/2210.08402" }
    ]
  },
  {
    name: "MS COCO",
    type: "Dataset",
    summary: "Microsoft's benchmark dataset for object detection, segmentation, and captioning with 328K images containing 2.5M labeled object instances.",
    task: "Computer Vision",
    license: "CC BY 4.0",
    year: 2014,
    org: "Microsoft",
    size: "328K images, ~25GB",
    architecture: "Images with bounding boxes, segmentation masks, keypoints, and 5 captions each.",
    usage: `from torchvision.datasets import CocoDetection\ndataset = CocoDetection(\n  root="./data/coco/images/train2017",\n  annFile="./data/coco/annotations/instances_train2017.json"\n)`,
    benchmarks: "Standard detection benchmark: mAP metric widely used in CV research",
    limitations: "Object categories limited to 80, some class imbalance.",
    url: "https://cocodataset.org/",
    citations: [
      { text: "Lin et al. (2014) - COCO Paper", url: "https://arxiv.org/abs/1405.0312" }
    ]
  },
  {
    name: "OpenWebText",
    type: "Dataset",
    summary: "An open-source recreation of OpenAI's WebText dataset (used to train GPT-2), scraped from Reddit-upvoted URLs.",
    task: "NLP",
    license: "CC0 1.0",
    year: 2019,
    org: "EleutherAI / Community",
    size: "38GB (~8M documents)",
    architecture: "Web text from all outbound Reddit links with 3+ upvotes, scraped and deduplicated.",
    usage: `from datasets import load_dataset\ndataset = load_dataset("openwebtext", split="train")`,
    benchmarks: "Used as training data for GPT-2 replications",
    limitations: "English-only, Reddit bias toward certain demographics and topics.",
    url: "https://huggingface.co/datasets/openwebtext",
    citations: [
      { text: "OpenWebText on HuggingFace", url: "https://huggingface.co/datasets/openwebtext" }
    ]
  },
  {
    name: "SQuAD 2.0",
    type: "Dataset",
    summary: "Stanford Question Answering Dataset with 100K+ questions on Wikipedia passages, including unanswerable questions to test model abstention.",
    task: "NLP",
    license: "CC BY-SA 4.0",
    year: 2018,
    org: "Stanford NLP",
    size: "150K questions",
    architecture: "Crowdsourced QA pairs from Wikipedia, with adversarially added unanswerable questions.",
    usage: `from datasets import load_dataset\ndataset = load_dataset("squad_v2")\ntrain_data = dataset['train']`,
    benchmarks: "Standard reading comprehension benchmark; human baseline F1: 89.45%",
    limitations: "English-only, Wikipedia domain, extractive QA only.",
    url: "https://rajpurkar.github.io/SQuAD-explorer/",
    citations: [
      { text: "Rajpurkar et al. (2018) - SQuAD 2.0 Paper", url: "https://arxiv.org/abs/1806.03822" }
    ]
  },
  {
    name: "MMLU",
    type: "Dataset",
    summary: "Massive Multitask Language Understanding — a benchmark covering 57 subjects from STEM to humanities, used to evaluate the knowledge and reasoning of LLMs.",
    task: "NLP",
    license: "MIT",
    year: 2020,
    org: "UC Berkeley",
    size: "15,908 questions across 57 subjects",
    architecture: "Four-choice multiple-choice questions at varying difficulty levels from elementary to professional.",
    usage: `from datasets import load_dataset\ndataset = load_dataset("cais/mmlu", "all")\nprint(dataset['test'][0])`,
    benchmarks: "Human expert baseline: ~89.8%. GPT-4: 86.4%, Claude 3 Opus: 86.8%",
    limitations: "Multiple-choice format doesn't capture open-ended generation ability.",
    popular: true,
    url: "https://github.com/hendrycks/test",
    citations: [
      { text: "Hendrycks et al. (2020) - MMLU Paper", url: "https://arxiv.org/abs/2009.03300" }
    ]
  },
  {
    name: "HumanEval",
    type: "Dataset",
    summary: "OpenAI's benchmark of 164 hand-crafted Python programming problems to evaluate the code generation capability of language models.",
    task: "NLP",
    license: "MIT",
    year: 2021,
    org: "OpenAI",
    size: "164 hand-written programming problems",
    architecture: "Python functions with docstrings and unit tests; evaluated by pass@k metric.",
    usage: `from datasets import load_dataset\ndataset = load_dataset("openai_humaneval")\nprint(dataset['test'][0]['prompt'])`,
    benchmarks: "GPT-4: 67%, Claude 3.5 Sonnet: 92%, Llama 3 70B: 81.7%",
    limitations: "Python-only, relatively small size, may be contaminated in model training data.",
    popular: true,
    url: "https://github.com/openai/human-eval",
    citations: [
      { text: "Chen et al. (2021) - Evaluating LLMs Trained on Code", url: "https://arxiv.org/abs/2107.03374" }
    ]
  },
  {
    name: "GSM8K",
    type: "Dataset",
    summary: "A dataset of 8,500 high-quality grade-school math word problems requiring multi-step reasoning, used to evaluate arithmetic reasoning in LLMs.",
    task: "NLP",
    license: "MIT",
    year: 2021,
    org: "OpenAI",
    size: "8,500 problems (7,500 train / 1,319 test)",
    architecture: "Multi-step word problems with natural language solutions and final numerical answers.",
    usage: `from datasets import load_dataset\ndataset = load_dataset("gsm8k", "main")\nprint(dataset['test'][0])`,
    benchmarks: "GPT-4: 92%, Claude 3 Opus: 95.0%, Llama 3 70B: 93%",
    limitations: "Grade-school level only; top models now saturate this benchmark.",
    popular: true,
    url: "https://github.com/openai/grade-school-math",
    citations: [
      { text: "Cobbe et al. (2021) - GSM8K Paper", url: "https://arxiv.org/abs/2110.14168" }
    ]
  },
  {
    name: "RedPajama-Data-v2",
    type: "Dataset",
    summary: "Together AI's massive open dataset of 30 trillion tokens with quality annotations, designed as a fully open alternative to proprietary LLM pre-training data.",
    task: "NLP",
    license: "Apache-2.0",
    year: 2023,
    org: "Together AI",
    size: "30T tokens (with quality signals)",
    architecture: "Multi-language web data with 40+ quality annotation signals for filtering.",
    usage: `from datasets import load_dataset\ndataset = load_dataset("togethercomputer/RedPajama-Data-V2", name="sample-10B", split="train", streaming=True)`,
    benchmarks: "Enables competitive open LLM training at scale",
    limitations: "Requires careful filtering; quality signals are heuristic-based.",
    url: "https://github.com/togethercomputer/RedPajama-Data",
    citations: [
      { text: "RedPajama-V2 Paper", url: "https://arxiv.org/abs/2402.06935" }
    ]
  },
  {
    name: "Alpaca Dataset",
    type: "Dataset",
    summary: "Stanford's 52K instruction-following examples generated by GPT-3.5, kickstarting the open-source instruction tuning movement.",
    task: "NLP",
    license: "CC BY NC 4.0",
    year: 2023,
    org: "Stanford CRFM",
    size: "52,002 instruction-following pairs",
    architecture: "Self-Instruct format: instruction, input (optional), and output triples.",
    usage: `from datasets import load_dataset\ndataset = load_dataset("tatsu-lab/alpaca")\nprint(dataset['train'][0])`,
    benchmarks: "Fine-tuning LLaMA 7B on this data produces near-ChatGPT quality",
    limitations: "Non-commercial license, GPT-3.5 generated (potential errors), English-only.",
    url: "https://github.com/tatsu-lab/stanford_alpaca",
    citations: [
      { text: "Alpaca Dataset Release", url: "https://crfm.stanford.edu/2023/03/13/alpaca.html" }
    ]
  },
];

export const typeFilters = ["All", "Model", "Framework", "Dataset", "Platform"];
export const taskFilters = ["All Tasks", "NLP", "Computer Vision", "MLOps", "Audio", "Audio / ASR", "Multimodal"];