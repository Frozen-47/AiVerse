const ORG_ALIASES = {
    "openai": "OpenAI",
    "google": "Google DeepMind",
    "google deepmind": "Google DeepMind",
    "google brain": "Google DeepMind",
    "google cloud": "Google DeepMind",
    "deepmind": "Google DeepMind",
    "anthropic": "Anthropic",
    "meta": "Meta AI",
    "meta ai": "Meta AI",
    "meta-models": "Meta AI",
    "facebook": "Meta AI",
    "facebook ai research": "Meta AI",
    "pytorch": "Meta AI",
    "deepseek": "DeepSeek AI",
    "deepseek ai": "DeepSeek AI",
    "deepseek-ai": "DeepSeek AI",
    "mistral": "Mistral AI",
    "mistral ai": "Mistral AI",
    "mistralai": "Mistral AI",
    "alibaba": "Alibaba (Qwen)",
    "alibaba cloud": "Alibaba (Qwen)",
    "alibaba (qwen)": "Alibaba (Qwen)",
    "qwen": "Alibaba (Qwen)",
    "microsoft": "Microsoft",
    "microsoft research": "Microsoft",
    "hugging face": "Hugging Face",
    "hugging face inc.": "Hugging Face",
    "huggingface": "Hugging Face",
    "huggingfacetb": "Hugging Face",
    "huggingfacefw": "Hugging Face",
    "huggingfacebio": "Hugging Face",
    "huggingfaceswarms": "Hugging Face",
    "hf-audio": "Hugging Face",
    "amazon": "Amazon Web Services",
    "amazon web services": "Amazon Web Services",
    "aws": "Amazon Web Services",
    "nvidia": "NVIDIA",
    "perplexity": "Perplexity",
    "perplexity ai": "Perplexity",
    "midjourney": "Midjourney",
    "midjourney inc.": "Midjourney",
    "midjourney, inc.": "Midjourney",
    "stability ai": "Stability AI",
    "stanford": "Stanford AI",
    "stanford ai": "Stanford AI",
    "stanford nlp": "Stanford AI",
    "stanford crfm": "Stanford AI",
    "uc berkeley": "UC Berkeley (BAIR)",
    "uc berkeley (bair)": "UC Berkeley (BAIR)",
    "bair": "UC Berkeley (BAIR)",
    "crewai": "CrewAI",
    "crewai inc.": "CrewAI",
    "unsloth": "Unsloth AI",
    "unsloth ai": "Unsloth AI",
    "openbmb": "OpenBMB",
    "thudm": "Zhipu AI (THUDM)",
    "thudm / zhipu ai": "Zhipu AI (THUDM)",
    "zhipu": "Zhipu AI (THUDM)",
    "zhipu ai": "Zhipu AI (THUDM)",
    "zhipu ai (thudm)": "Zhipu AI (THUDM)",
    "z ai": "Zhipu AI (THUDM)",
    "zai-org": "Zhipu AI (THUDM)",
    "anysphere": "Cursor (Anysphere)",
    "cursor": "Cursor (Anysphere)",
    "cursor (anysphere)": "Cursor (Anysphere)",
    "lmsys": "LMSYS Org",
    "lmsys org": "LMSYS Org",
    "apple": "Apple",
    "apple inc.": "Apple",
    "bytedance": "ByteDance",
    "bytedance seed": "ByteDance",
    "baidu": "Baidu",
    "tencent": "Tencent",
    "moonshot": "Moonshot AI",
    "moonshot ai": "Moonshot AI",
    "moonshotai": "Moonshot AI",
    "kimi": "Moonshot AI",
    "kimi ai": "Moonshot AI",
    "cognition": "Cognition AI",
    "cognition ai": "Cognition AI",
    "genmo": "Genmo",
    "lightricks": "Lightricks",
    "hexgrad": "Hexgrad",
    "allen institute for ai": "Allen Institute for AI",
    "allen institute for ai (ai2)": "Allen Institute for AI",
    "ai2": "Allen Institute for AI",
    "ai2 (allen institute for ai)": "Allen Institute for AI",
    "technology innovation institute (tii)": "Technology Innovation Institute (TII)",
    "tii": "Technology Innovation Institute (TII)",
    "tii uae": "Technology Innovation Institute (TII)",
    "cloudflare": "Cloudflare",
    "vercel": "Vercel",
    "krea": "Krea AI",
    "krea ai": "Krea AI",
    "xiaomi": "Xiaomi (MiMo)",
    "xiaomi (mimo)": "Xiaomi (MiMo)",
    "xiaomimimo": "Xiaomi (MiMo)",
    "xiaomi-research": "Xiaomi (MiMo)",
    "minimax": "MiniMax",
    "minimax ai": "MiniMax",
    "minimaxai": "MiniMax",
    "xai": "xAI",
    "spacexai": "xAI",
    "grok": "xAI",
    "stepfun": "StepFun",
    "stepfun ai": "StepFun",
    "step-fun": "StepFun",
    "stepfun-ai": "StepFun",
    "cohere": "Cohere",
    "coherelabs": "Cohere",
    "coherelabscommunity": "Cohere",
    "inclusionai": "InclusionAI",
    "thinkingmachines": "Thinking Machines",
    "thinking machines": "Thinking Machines",
    "liquid": "Liquid AI",
    "liquidai": "Liquid AI",
    "liquid ai": "Liquid AI",
    "upstage": "Upstage",
    "radixark": "RadixArk",
    "llamaindex": "LlamaIndex",
    "laion": "LAION",
    "black forest labs": "Black Forest Labs",
    "black-forest-labs": "Black Forest Labs",
    "nousresearch": "Nous Research",
    "nous research": "Nous Research",
    "ibm": "IBM",
    "ibm-granite": "IBM",
    "suno": "Suno",
    "suno inc.": "Suno",
    "weights & biases": "Weights & Biases",
    "weights & biases inc.": "Weights & Biases",
    "pika labs": "Pika Labs",
    "pika-labs": "Pika Labs",
    "nex-agi": "Nex AGI",
    "nex agi": "Nex AGI",
    "kt": "KT",
    "korea telecom": "KT",
    "briaai": "Bria AI",
    "bria ai": "Bria AI",
    "openmoss-team": "OpenMOSS",
    "openmoss": "OpenMOSS",
    "meituan-longcat": "Meituan (LongCat)",
    "longcat": "Meituan (LongCat)",
    "servicenow": "ServiceNow",
    "servicenow-ai": "ServiceNow",
    "sensenova": "SenseNova",
    "aleph-alpha": "Aleph Alpha",
    "aleph alpha": "Aleph Alpha",
    "conwayresearch": "Conway Research",
    "conway research": "Conway Research",
    "prunaai": "Pruna AI",
    "pruna ai": "Pruna AI",
    "pollen-robotics": "Pollen Robotics",
    "pollen robotics": "Pollen Robotics",
    "lg ai research": "LG AI Research",
    "eleutherai": "EleutherAI",
    "adobe": "Adobe",
    "groq": "Groq",
    "ollama": "Ollama",
    "langchain": "LangChain",
    "runway": "Runway",
    "elevenlabs": "ElevenLabs",
    "together ai": "Together AI",
    "together": "Together AI",
    "argilla": "Argilla",
    "lichess": "Lichess",
    "zyphra": "Zyphra",
    "kormo-vl": "KORMo-VL",
    "multiverse computing": "Multiverse Computing",
    "institute of foundation models": "Institute of Foundation Models",
    "comfy-org": "Comfy-Org",
    "pyannote": "pyannote",
    "datalab-to": "DataLab",
    "daimonrobotics": "Daimon Robotics",
    "sharpa-robotics": "Sharpa Robotics",
    "lightwheelai": "LightwheelAI",
    "ifm": "Institute of Foundation Models",
    "inworld": "Inworld AI",
    "fishaudio": "Fish Audio",
    "sand-ai": "Sand AI",
    "kandinskylab": "Kandinsky Lab",
    "convaiinnovations": "Convai",
    "recursivesi": "RecursiveSI",
    "ricursiveai": "Ricursive AI",
    "reflection": "Reflection AI",
    "flwrlabs": "Flower Labs",
    "aliasrobotics": "Alias Robotics",
    "softmata": "Softmata",
    "bessouat40": "RAGLight",
    "serpentai": "SerpentAI",
    "wikimedia": "Wikimedia Foundation",
    "cais": "Center for AI Safety (CAIS)",
    "nyu-mll": "NYU MLL",
    "tiger-lab": "TIGER-Lab",
    "sentence-transformers": "Sentence Transformers",
    "docling-project": "Docling Project",
    "internscience": "InternScience",
    "ornith-ai": "Ornith AI",
    "xhtoken": "XHToken",
    "reson8": "Reson8",
    "taichuai": "TaichuAI",
    "nanbeige": "Nanbeige",
    "webai-official": "webAI",
    "videorebirthai": "VideoRebirth AI",
    "supersoniclabs": "Supersonic Labs",
    "altworld": "Altworld",
    "diffuspace": "Diffuspace",
    "maxwell-model": "Maxwell",
    "xingchen-agi": "XingChen-AGI",
    "m-a-p": "M-A-P",
    "espnet": "ESPnet",
    "speechcolab": "SpeechColab",
    "lerobot": "LeRobot",
    "xlangai": "XLang AI",
    "alphaxiv": "alphaXiv",
    "vllm-sr": "vLLM-SR",
    "cactus-compute": "Cactus Compute",
    "higurashi-ai": "Higurashi AI",
    "lightonai": "LightOn AI",
    "gradium": "Gradium",
    "fastvideo": "FastVideo",
    "scenario-labs": "Scenario Labs",
    "ilabai": "ilabai",
    "moonworks": "Moonworks",
    "deeplethe": "DeepLethe",
    "contrastive-lm": "Contrastive-LM",
    "edge0": "Edge0",
    "apodex": "Apodex",
    "openrouter": "OpenRouter",
    "replicate inc.": "Replicate",
    "replicate": "Replicate",
    "runpod inc.": "RunPod",
    "runpod": "RunPod",
    "pinecone systems": "Pinecone",
    "pinecone": "Pinecone",
    "grammarly inc.": "Grammarly",
    "grammarly": "Grammarly",
    "luka inc.": "Replika",
    "aisense inc.": "Otter.ai",
    "murf inc.": "Murf AI",
    "glean technologies": "Glean",
    "gamma tech": "Gamma",
    "continue dev, inc.": "Continue",
    "cline bot inc.": "Cline",
    "jasper ai": "Jasper",
    "ideogram ai": "Ideogram",
    "playground ai": "Playground AI",
    "common crawl foundation": "Common Crawl",
    "evalplus community": "EvalPlus",
    "livecodebench team": "LiveCodeBench",
    "code-video-model": "CodeVideoBench",
    "common-pile": "Common Pile",
    "gdquest": "GDQuest",
    "hexabot-ai": "Hexabot",
    "libgdx": "libGDX",
    "operand": "Operand",
    "edtechre": "PyBroker"
};
const PROVIDER_PREFIXES = [
    "OpenAI",
    "Anthropic",
    "Google",
    "Mistral",
    "Meta",
    "Qwen",
    "Baidu",
    "Tencent",
    "LiquidAI",
    "inclusionAI",
    "Xiaomi",
    "Upstage",
    "Thinking Machines",
    "Nex AGI",
    "RadixArk",
    "KT"
];
const PROVIDER_PREFIX_RE = new RegExp(`^(?:${PROVIDER_PREFIXES.map((p)=>p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")}):\\s+`, "i");
const KNOWN_SPAM_ORGS = new Set([
    "cockdaddyfuck",
    "wank3r",
    "tanyakhan",
    "pepe104",
    "glitchlab",
    "fishpasters",
    "keysersoze",
    "mrddickdickenson",
    "kulkas2pintu",
    "traderharikrishna",
    "r3gm",
    "stcm",
    "aet256",
    "arudradey",
    "vclnhihihi",
    "hugging-apps",
    "amisima",
    "ast-1320",
    "lampyy",
    "xyzanonimous5",
    "kogutt999",
    "observantdistressed",
    "waitinghere",
    "malcolmrey",
    "00000tt",
    "stablediffusiontutorials",
    "cumasystem",
    "vamo455",
    "cfahlgren1",
    "tardellirs",
    "aimeebingmouqu",
    "suge212",
    "lynote",
    "jialinyyzz",
    "canberkkkkkk",
    "linlinlinlinsdada",
    "sentinel7",
    "burner22",
    "fusioncow",
    "adventists-ai",
    "jackrong",
    "morethought",
    "aj-gonzalez",
    "manusagents",
    "nisten",
    "datasocial",
    "kuben-developer",
    "bumbuboon",
    "rodrigoflorencio",
    "ankitjh4",
    "digitaluz",
    "grio43",
    "edisoneh",
    "fafsaf1",
    "thea2026",
    "fendouai",
    "megapotatoai",
    "thejagstudio",
    "daankular",
    "hide1",
    "smolagents",
    "embedl",
    "software-mansion",
    "lakonik",
    "ritianyu",
    "townbox",
    "pablodawson",
    "jackiesixnine",
    "assembledchaos",
    "viggle",
    "linoyts",
    "harness-hub",
    "joelniklaus",
    "theagenticdatacompany",
    "nerkyor",
    "davidau",
    "mradermacher",
    "atomicchat",
    "orcarouter",
    "ista-daslab",
    "dealignai",
    "scantist",
    "sc117",
    "huihui-ai",
    "chatrlabs",
    "xtools-at",
    "obliteratus",
    "abenzerps",
    "abiray",
    "venastine-research",
    "nari-labs",
    "strata-engine",
    "conceptcountry",
    "ukisai",
    "maziyarpanahi",
    "israellaguan",
    "deepmostinnovations",
    "vyber07",
    "reizxn",
    "axion1-0",
    "bakrianoo",
    "secemp9",
    "zaevlad",
    "azyg0s",
    "angais",
    "arc4g",
    "harland",
    "cirquar-tech",
    "yootta",
    "eidon-ai",
    "ikala",
    "jaimemalangue",
    "bitmanagerai-speech-lab",
    "open-index",
    "fka",
    "dontplantoend",
    "zhanli-li",
    "trelis",
    "harvardmadsys",
    "zouhar",
    "markov-ai",
    "venvoo",
    "hongzhuyi",
    "dagroup-pku",
    "yurun-chen",
    "x-lance",
    "helenpeng",
    "webml-community",
    "sandflow",
    "ccore",
    "codepawl",
    "autotrust",
    "speridlabs",
    "multimodalart",
    "xenova",
    "lewtun",
    "dlouapre",
    "aidigestorg",
    "bones-studio",
    "rapidata",
    "ropedia-ai",
    "hublabs",
    "pentesterflow",
    "witfoo",
    "wizardty",
    "selfit-camera",
    "agent-memory-leaderboard",
    "akhaliq",
    "victor",
    "mothersuperior",
    "yuyaotechnology",
    "huggingface",
    "datapointai",
    "n4ze3m",
    "zefancai",
    "fineenvs"
]);
const REDUNDANT_EXACT_NAMES = new Set([
    "midjourney (platform)",
    "perplexity ai",
    "groq",
    "phi-4",
    "squad",
    "imagenet-1k",
    "gaia",
    "fineweb-edu",
    "nemotron-diarization",
    "nemotron-transcribe",
    "simready-central",
    "simready-central-library",
    "minicpm-v-4.7-demo",
    "laya-demo",
    "p-h3-image",
    "p-h3-image-comfy",
    "flux-3-image-klein-comfy",
    "bria-rmbg-3.0",
    "fibo-2.0-editing",
    "moss-image-sft-8-steps-dmd",
    "swift-qwen3.8-27b",
    "qwen3.8-27b-dspine-b16",
    "minimax-h3-turbo-lora",
    "carbon-x-release",
    "lfm3-omni-2b-webgpu",
    "embeddinggemma-2-webgpu",
    "speech-to-decisions",
    "system-one-arcade",
    "auk",
    "open-jev",
    "smoldataenvs",
    "openai-math",
    "physicalai-human-1m-explorer",
    "egodemo",
    "open_tts_leaderboard",
    "scaled-swarms",
    "scaling-swarms",
    "underdog-woof",
    "matterseek-enables.inverse.design.of.novel.material"
]);
export function normalizeOrgName(rawOrg) {
    const trimmed = (rawOrg || "").replace(/\s+/g, " ").trim();
    if (!trimmed) return "Independent";
    const mapped = ORG_ALIASES[trimmed.toLowerCase()];
    if (mapped) return mapped;
    return trimmed;
}
export function stripProviderPrefix(name) {
    return (name || "").replace(PROVIDER_PREFIX_RE, "").trim();
}
export function cleanEntryDisplayName(name) {
    let out = stripProviderPrefix((name || "").trim());
    out = out.replace(/\s*\((?:high|low|medium|max|xhigh)(?:\s+with\s+fallback)?\)\s*$/i, "").replace(/\s*\(non-reasoning\)\s*$/i, "").replace(/\s*\((?:batch|free)\)\s*$/i, "").trim();
    return out || name.trim();
}
export function canonicalEntryKey(name) {
    return cleanEntryDisplayName(name).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
export function normalizeLicense(rawLicense, type) {
    const raw = (rawLicense || "").replace(/\s+/g, " ").trim();
    const lower = raw.toLowerCase();
    if (!raw || lower === "other" || lower === "noassertion" || lower === "not specified" || lower === "unknown") {
        if (type === "Dataset") return "Open Data";
        if (type === "Model") return "Open Weights";
        if (type === "AI" || type === "Platform") return "Proprietary";
        return "Open Source";
    }
    if (lower === "apache-2.0" || lower === "apache 2.0") return "Apache-2.0";
    if (lower === "mit") return "MIT";
    if (lower === "bsd-3-clause") return "BSD-3-Clause";
    if (lower === "agpl-3.0") return "AGPL-3.0";
    if (lower === "cc0-1.0" || lower === "cc0 1.0") return "CC0-1.0";
    if (lower === "cc-by-4.0" || lower === "cc by 4.0") return "CC-BY-4.0";
    if (lower === "cc-by-3.0" || lower === "cc by 3.0") return "CC-BY-3.0";
    if (lower === "cc-by-sa-4.0" || lower === "cc by-sa 4.0" || lower === "cc by sa 4.0") return "CC-BY-SA-4.0";
    if (lower === "cc-by-sa-3.0") return "CC-BY-SA-3.0";
    if (lower === "cc-by-nc-4.0" || lower === "cc by-nc 4.0" || lower === "cc by nc 4.0") return "CC-BY-NC-4.0";
    if (lower === "cc-by-nc-sa-4.0") return "CC-BY-NC-SA-4.0";
    if (lower === "cc-by-nc-nd-4.0") return "CC-BY-NC-ND-4.0";
    if (lower === "odc-by" || lower === "odc-by 1.0") return "ODC-By 1.0";
    if (lower === "openrail") return "OpenRAIL";
    if (lower === "openmdw-1.1") return "OpenMDW-1.1";
    if (lower === "apple-amlr") return "Apple AMLR";
    if (lower === "cdla-permissive-2.0") return "CDLA-Permissive-2.0";
    if (lower === "open weights") return "Open Weights";
    if (lower === "open data") return "Open Data";
    if (lower === "open") return type === "Model" ? "Open Weights" : "Open Source";
    return raw;
}
export function cleanEntryText(rawText) {
    if (!rawText) return "";
    let text = rawText.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ");
    text = text.replace(/[\t\r\n]+/g, " ");
    text = text.replace(/\[!(?:NOTE|TIP|CAUTION|IMPORTANT|WARNING)\]\s*/gi, "").replace(/<\/?(?:br|p|div|span|a|img|table|tr|td|th|h[1-6]|ul|li|ol|strong|em|b|i|code|pre|details|summary|blockquote)\b[^>]*>/gi, " ").replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1").replace(/https?:\/\/\S+/g, "").replace(/\(\s*\)/g, "").replace(/[#*`]+/g, "");
    text = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "");
    text = text.replace(/^\s*Dataset Card for\s+["']?[^"']+["']?\s*(?:Dataset Summary\s*)?/i, "").replace(/^\s*Model Card for\s+["']?[^"']+["']?\s*(?:Model Summary\s*)?/i, "").replace(/^\s*Dataset Description:?\s*/i, "").replace(/\bQuick links:\s*(?:\[[^\]]*\]\s*)*/gi, "").replace(/\bHomepage\s*\|\s*arXiv\s*Latest Update\s*[—–-]\s*[A-Za-z]+\s+\d{4}\s*/gi, "").replace(/\bPaper:\s*arXiv:[\d.]+\s*·?\s*/gi, "").replace(/\bExplore the results:\s*dashboard\s*·?\s*/gi, "").replace(/\bPlay:\s*try the riddles yourself\s*·?\s*/gi, "").replace(/\bCode:\s*github\.com\/\S+\s*·?\s*/gi, "").replace(/\bLanguage:\s*English\s*(?:\(current\))?\s*[·|]\s*中文\.?/gi, "");
    const boilerplatePatterns = [
        /\s*The application is powered by advanced foundation models utilizing[\s\S]*$/i,
        /\s*It features an intuitive interface designed to streamline[\s\S]*$/i,
        /\s*Available under (?:a|an) .+ model for commercial and personal productivity\.?/gi,
        /\s*Under the hood, it incorporates[\s\S]*$/i,
        /\s*Key technical highlights include:[\s\S]*$/i,
        /\s*Key user-facing capabilities include[\s\S]*$/i,
        /\s*Licensed under the .+ license, it integrates seamlessly into contemporary AI engineering toolchains\.?/gi,
        /,?\s*incorporating an architecture of[\s\S]*$/i,
        /\s*The model demonstrates competitive performance across verified evaluations[\s\S]*$/i,
        /\s*With its .+ design, it supports diverse local and enterprise deployment profiles[\s\S]*$/i,
        /\s*Distributed under the .+ license, it serves as a foundational intelligence asset[\s\S]*$/i,
        /\s*The corpus spans .+ of verified and structured training and evaluation samples\.[\s\S]*$/i,
        /\s*It serves as an authoritative benchmark for evaluating[\s\S]*$/i,
        /\s*Released under the .+ license for open evaluation and research reproducibility\.?/gi,
        /,?\s*trending with over [\d,]+ community likes and [\d,]+ downloads on Hugging Face\.?/gi,
        /\s*Trending with [\d,]+ community stars\.?/gi,
        /\s*\([\d,]+ likes,\s*[\d,]+ downloads\)\.?/gi
    ];
    for (const pat of boilerplatePatterns){
        text = text.replace(pat, "");
    }
    text = text.replace(/^\s*([A-Za-z0-9._-]{3,})\s+\1\b/i, "$1");
    text = text.replace(/(\d+)\.(\d{3,})/g, (_, whole, dec)=>{
        const num = Number(`${whole}.${dec}`);
        return Number.isFinite(num) ? num.toFixed(1) : `${whole}.${dec}`;
    });
    text = text.replace(/\s{2,}/g, " ").replace(/\s+([.,;:])/g, "$1").trim();
    if (/\.\.\.\s*$/.test(text)) {
        const withoutEllipsis = text.replace(/\.\.\.\s*$/, "").trim();
        const lastSentEnd = Math.max(withoutEllipsis.lastIndexOf(". "), withoutEllipsis.lastIndexOf("! "), withoutEllipsis.lastIndexOf("? "));
        if (lastSentEnd >= 50) {
            text = withoutEllipsis.slice(0, lastSentEnd + 1).trim();
        } else {
            text = withoutEllipsis;
        }
    }
    if (text.length > 90 && /\b(?:a|an|the|and|or|in|on|of|to|for|with|by|from|is|are)\s*\.?$/i.test(text)) {
        const strippedLastDot = text.replace(/\.$/, "").trim();
        const prevDot = strippedLastDot.lastIndexOf(". ");
        if (prevDot >= 45) {
            text = strippedLastDot.slice(0, prevDot + 1).trim();
        }
    }
    if (text && !/[.!?)]$/.test(text)) {
        text = `${text}.`;
    }
    return text;
}
export function isUnnecessaryOrSpamEntry(entry) {
    const name = (entry.name || "").trim();
    const lowerName = name.toLowerCase();
    const rawOrgLower = (entry.org || "").trim().toLowerCase();
    const urlLower = (entry.url || "").trim().toLowerCase();
    const summaryLower = (entry.summary || "").toLowerCase();
    if (!name) return true;
    if (/porn|cockdaddy|wank3r|mrddick|faceswap|face-swap|headswap/i.test(`${lowerName} ${rawOrgLower} ${urlLower}`)) {
        return true;
    }
    if (REDUNDANT_EXACT_NAMES.has(lowerName)) {
        return true;
    }
    if (/\((?:batch|free|non-reasoning)\)$/i.test(name) || /is the same underlying model as|is the same solar pro 4/i.test(summaryLower)) {
        return true;
    }
    if (/(?:^|[-_\s])(?:gguf|imatrix|abliterated|uncensored|heretic|obliterated|gsq-rco)(?:$|[-_\s])/i.test(name) || /-(?:nvfp4|fp4-local|quantized|comfy|b16)$/i.test(name)) {
        return true;
    }
    if (KNOWN_SPAM_ORGS.has(rawOrgLower)) {
        return true;
    }
    if (urlLower.includes("huggingface.co/spaces/")) {
        const allowedSpaceOrgs = [
            "black-forest-labs",
            "openmoss-team",
            "briaai",
            "prunaai",
            "pollen-robotics",
            "lightonai",
            "openbmb",
            "liquidai",
            "qwen",
            "nvidia",
            "microsoft",
            "zai-org",
            "tencent",
            "ibm-granite",
            "stepfun-ai",
            "servicenow-ai",
            "minimaxai",
            "huggingfacebio",
            "huggingfacetb",
            "gaia-benchmark",
            "gradium",
            "fastvideo"
        ];
        const isAllowed = allowedSpaceOrgs.some((org)=>urlLower.includes(`huggingface.co/spaces/${org}/`));
        if (!isAllowed) return true;
    }
    return false;
}
const ENTRY_OVERRIDES = {
    "fibo 2 0": {
        org: "Bria AI",
        task: "Image Generation",
        summary: "FIBO 2.0 is Bria AI's commercial-licensed visual foundation model engineered for structured, controllable text-to-image generation and editing."
    },
    "tailorrig": {
        task: "Computer Vision",
        summary: "Human character rigging dataset containing 39,073 humanoid 3D meshes with skeletons and skinning weights stored across structured anatomical subsets."
    },
    "rmbg 3 0": {
        task: "Computer Vision",
        summary: "Commercial-licensed high-precision background removal and foreground matting model developed by Bria AI."
    },
    "depthpro2": {
        task: "Computer Vision",
        summary: "Zero-shot metric monocular depth estimation model developed by Apple for sharp, high-resolution geometric depth prediction."
    },
    "sam3": {
        org: "Meta AI",
        task: "Computer Vision",
        summary: "Segment Anything Model 3 by Meta AI for promptable open-vocabulary visual segmentation across images and video frames."
    },
    "sam 3d body dinov3": {
        org: "Meta AI",
        task: "Computer Vision",
        summary: "3D human body reconstruction and mesh estimation foundation model powered by Meta AI's DINOv3 visual backbone."
    },
    "dinov3 vitl16 pretrain lvd1689m": {
        org: "Meta AI",
        task: "Computer Vision",
        summary: "Self-supervised DINOv3 Vision Transformer (ViT-L/16) pretrained on 1.689B curated visual samples by Meta AI."
    },
    "sam 3d body dataset": {
        org: "Meta AI",
        task: "Computer Vision",
        summary: "Large-scale 3D human pose and body mesh dataset published by Meta AI for training spatial vision models."
    },
    "ocria nano 1": {
        org: "LlamaIndex",
        task: "Computer Vision",
        summary: "Compact open-weights document OCR and structured text extraction model developed by LlamaIndex."
    },
    "indra ocr": {
        org: "DataLab",
        task: "Computer Vision",
        summary: "Open-weights optical character recognition and document layout parsing model developed by DataLab."
    },
    "unlimited ocr": {
        task: "Computer Vision"
    },
    "unlimited ocr 2": {
        task: "Computer Vision"
    },
    "teleocr": {
        task: "Computer Vision"
    },
    "lightonocr 3 demo": {
        task: "Computer Vision",
        summary: "Interactive document optical character recognition demonstration showcasing LightOn AI's LightOnOCR-3 model."
    },
    "xiaomi ocr 0": {
        task: "Computer Vision"
    },
    "trellis 2": {
        org: "Microsoft",
        task: "Computer Vision",
        summary: "Microsoft's 3D asset generation playground turning text prompts or reference images into high-detail textured 3D meshes."
    },
    "dall e 2": {
        task: "Image Generation"
    },
    "dall e 3": {
        task: "Image Generation"
    },
    "stable diffusion": {
        task: "Image Generation"
    },
    "stable diffusion xl sdxl": {
        task: "Image Generation"
    },
    "flux 1": {
        task: "Image Generation"
    },
    "flux 3 image klein": {
        org: "Black Forest Labs",
        task: "Image Generation",
        summary: "Fast interactive demo for Black Forest Labs' compact FLUX.3 Klein image generation model."
    },
    "midjourney v6": {
        task: "Image Generation"
    },
    "kandinsky imagesr 2 0": {
        task: "Image Generation",
        summary: "High-fidelity generative image super-resolution model developed by Kandinsky Lab."
    },
    "moss image": {
        org: "OpenMOSS",
        task: "Image Generation",
        summary: "Interactive demo for OpenMOSS's high-resolution instruction-following image generation and editing suite."
    },
    "p image oss": {
        org: "Pruna AI",
        task: "Image Generation",
        summary: "Accelerated open-source visual synthesis studio by Pruna AI delivering sub-second diffusion inference."
    },
    "sora": {
        task: "Video Generation"
    },
    "runway gen 3 alpha": {
        task: "Video Generation"
    },
    "longcat video avatar 1 6": {
        task: "Video Generation",
        summary: "Expressive talking-head and full-body video avatar synthesis model developed by Meituan (LongCat)."
    },
    "ltx 2 5": {
        task: "Video Generation"
    },
    "stepaudio 3 music": {
        org: "StepFun",
        task: "Audio",
        summary: "Generative music and vocal synthesis model by StepFun creating controllable multi-track audio compositions."
    },
    "qwen3 tts": {
        org: "Alibaba (Qwen)",
        task: "Audio",
        summary: "Expressive multilingual text-to-speech showcase for Alibaba Qwen's neural speech synthesis family."
    },
    "lfm3 audio 2b": {
        task: "Audio"
    },
    "phonon": {
        org: "Gradium",
        task: "Audio",
        summary: "Low-latency interactive speech and audio synthesis model showcase by Gradium."
    },
    "voice isolator": {
        task: "Audio"
    },
    "gigaspeech3": {
        task: "Audio"
    },
    "darbuka arabic tts dataset": {
        task: "Audio"
    },
    "daimon infinity": {
        org: "Daimon Robotics",
        task: "Multimodal",
        summary: "Large-scale omni-modal robotics dataset featuring synchronized vision and high-resolution tactile sensing for physical AI."
    },
    "robowild": {
        task: "Multimodal"
    },
    "sharpadex v1 0": {
        task: "Multimodal"
    },
    "fasth3 omni": {
        org: "FastVideo",
        task: "Multimodal",
        summary: "High-throughput multimodal inference showcase powered by FastVideo's diffusion and sequence acceleration stack."
    },
    "code llama": {
        task: "AI Coding"
    },
    "codex": {
        task: "AI Coding"
    },
    "deepseek coder": {
        task: "AI Coding"
    },
    "starcoder2": {
        task: "AI Coding"
    },
    "github copilot": {
        task: "AI Coding"
    },
    "openvuln": {
        org: "Zhipu AI (THUDM)",
        task: "AI Coding",
        summary: "Security vulnerability analysis and code auditing benchmark and workspace by Zhipu AI."
    },
    "mimo v2 6 rl oss": {
        task: "AI Coding"
    },
    "hle": {
        org: "Center for AI Safety (CAIS)",
        task: "Research",
        summary: "Humanity's Last Exam benchmark by CAIS and Scale AI evaluating frontier models on expert-level multimodal academic problems."
    },
    "scorpion toxin binder design": {
        task: "Research"
    },
    "carbon x": {
        task: "Research"
    },
    "smol training playbook": {
        org: "Hugging Face",
        task: "Research",
        summary: "Interactive open-science playbook from Hugging Face detailing pretraining, scaling laws, and architecture recipes for small language models."
    },
    "nemotron personas vietnam": {
        task: "NLP"
    },
    "nemotron personas finance japan": {
        task: "NLP"
    },
    "nemotron sft agentic finance v1": {
        task: "NLP"
    },
    "glue": {
        org: "NYU MLL",
        task: "NLP",
        summary: "General Language Understanding Evaluation (GLUE) multi-task benchmark suite for natural language understanding."
    },
    "hh rlhf": {
        org: "Anthropic",
        task: "NLP",
        summary: "Human preference dataset released by Anthropic containing helpful and harmless dialogue comparison pairs for RLHF alignment."
    },
    "wikipedia": {
        org: "Wikimedia Foundation",
        task: "NLP",
        summary: "Clean multilingual Wikipedia dumps structured by Wikimedia Foundation and Hugging Face for language model pretraining and RAG."
    },
    "imdb": {
        org: "Stanford AI",
        task: "NLP",
        summary: "Large Movie Review Dataset of 50,000 labeled film reviews curated at Stanford for binary sentiment classification."
    },
    "chess position evaluations": {
        org: "Lichess",
        task: "Research",
        summary: "Open dataset of millions of chess board positions annotated with deep Stockfish engine evaluations by Lichess."
    },
    "standard chess games": {
        org: "Lichess",
        task: "Research",
        summary: "Large-scale open corpus of rated standard chess games published by Lichess for strategic sequence modeling."
    },
    "3d collection": {
        org: "Scenario Labs",
        task: "Computer Vision",
        summary: "Curated dataset of 1,342 AI-generated 3D assets by Scenario Labs with multi-format meshes and PBR textures."
    },
    "culturalriddles": {
        org: "Cohere",
        task: "NLP",
        summary: "Multilingual benchmark dataset by Cohere evaluating cultural idioms, common sense, and culturally grounded riddles."
    },
    "lunara art eval": {
        org: "Moonworks",
        task: "Computer Vision",
        summary: "Image-generation evaluation dataset by Moonworks containing 8,000 curated samples for artistic intelligence benchmarking."
    },
    "nemotron personas germany": {
        org: "NVIDIA",
        task: "NLP",
        summary: "German synthetic persona dataset generated via NVIDIA's Compound-AI approach grounded in real demographic distributions."
    },
    "tacverse": {
        task: "Multimodal",
        summary: "Multi-scene bimanual robotics dataset synchronizing visual frames with dense tactile sensor measurements."
    },
    "10 2026 qwen investigation traces": {
        org: "Cohere",
        task: "NLP",
        summary: "Diagnostic reasoning traces and raw token ID dataset investigating sampling behavior in Qwen3.8 Flash."
    },
    "fineweb 2": {
        org: "Hugging Face",
        task: "NLP",
        summary: "Second major release of Hugging Face's FineWeb corpus scaling filtered multilingual web text across 1,000+ languages."
    },
    "agentalphaxiv": {
        org: "alphaXiv",
        task: "Research",
        summary: "Twelve-week research archive from alphaXiv capturing 916 studies, code repositories, and autonomous agent preprints."
    },
    "hy4 flash": {
        org: "Tencent",
        task: "NLP",
        summary: "Cost-efficient variant of Tencent's Hy4 foundation model engineered for low-latency and high-throughput generation."
    },
    "ling 3 2 flash": {
        org: "InclusionAI",
        task: "Multimodal",
        summary: "Hybrid reasoning multimodal model from InclusionAI supporting text and up to 200 images across a 1M-token context window."
    },
    "solar mini 4 5 preview": {
        org: "Upstage",
        task: "NLP",
        summary: "Compact Mixture-of-Experts model by Upstage featuring 35B total (3B active) parameters and a 524K context window."
    },
    "lfm3 omni 2b": {
        org: "Liquid AI",
        task: "Multimodal"
    },
    "therefor": {
        year: 2026,
        license: "Freemium",
        size: "Web App",
        summary: "AI remembrance and conversational memorial web app by Mariano Rodriguez enabling private audio-grounded memory conversations."
    }
};
export function sanitizeEntryRecord(entry) {
    const cleanName = cleanEntryDisplayName(entry.name);
    const override = ENTRY_OVERRIDES[canonicalEntryKey(cleanName)];
    const cleanOrg = override?.org || normalizeOrgName(entry.org);
    const finalType = override?.type || entry.type;
    const finalTask = override?.task || entry.task;
    const cleanLicense = normalizeLicense(override?.license || entry.license, finalType);
    let cleanSummary = override?.summary || cleanEntryText(entry.summary || entry.description || "");
    cleanSummary = cleanSummary.replace(/^High-performance .+ open-weights model by [^.]+\.?$/i, `Open-weights ${finalTask} model developed by ${cleanOrg}.`).replace(/^Interactive AI web platform and demonstration hosted on Hugging Face Spaces by [^.]+\.?$/i, `Interactive ${finalTask.toLowerCase()} showcase hosted by ${cleanOrg} on Hugging Face Spaces.`);
    const cleanArch = entry.architecture ? cleanEntryText(entry.architecture) : "";
    const cleanBench = entry.benchmarks ? entry.benchmarks.replace(/(\d+)\.(\d{3,})/g, (_, w, d)=>Number(`${w}.${d}`).toFixed(1)).trim() : "N/A";
    const currentYear = new Date().getFullYear();
    const validYear = override?.year ?? (typeof entry.year === "number" && entry.year >= 1950 && entry.year <= currentYear + 1 ? entry.year : entry.created_at ? new Date(entry.created_at).getFullYear() || currentYear : currentYear);
    const finalSummary = cleanSummary || `${cleanName} is a ${finalTask} ${finalType.toLowerCase()} developed by ${cleanOrg}.`;
    const resolvedSize = override?.size || (entry.size && entry.size !== "Unknown" ? entry.size.trim() : "N/A");
    return {
        ...entry,
        name: cleanName,
        org: cleanOrg,
        type: finalType,
        task: finalTask,
        license: cleanLicense,
        year: validYear,
        size: resolvedSize,
        summary: finalSummary,
        description: finalSummary,
        architecture: cleanArch || "N/A",
        benchmarks: cleanBench || "N/A",
        limitations: entry.limitations ? cleanEntryText(entry.limitations) : "N/A"
    };
}
function variantPriorityScore(rawName) {
    const n = (rawName || "").trim();
    if (/\((?:low|medium)(?:\s+with\s+fallback)?\)$/i.test(n)) return 25;
    if (/\(max(?:\s+with\s+fallback)?\)$/i.test(n)) return 45;
    if (/\((?:high|xhigh)(?:\s+with\s+fallback)?\)$/i.test(n)) return 60;
    if (PROVIDER_PREFIX_RE.test(n)) return 75;
    if (n.includes(" ") && !n.includes("-")) return 95;
    return 90;
}
export function sanitizeAndDeduplicateCatalog(entries) {
    const map = new Map();
    for (const raw of entries){
        if (!raw || !raw.name) continue;
        if (isUnnecessaryOrSpamEntry(raw)) continue;
        const clean = sanitizeEntryRecord(raw);
        const key = canonicalEntryKey(clean.name);
        if (!key) continue;
        const priority = variantPriorityScore(raw.name);
        const current = map.get(key);
        if (!current) {
            map.set(key, {
                entry: clean,
                priority
            });
            continue;
        }
        const existing = current.entry;
        const primary = priority > current.priority ? clean : existing;
        const secondary = priority > current.priority ? existing : clean;
        const pickBetterSummary = (a, b)=>{
            const sa = a || "";
            const sb = b || "";
            const aGeneric = /^High-performance .* open-weights model by/i.test(sa);
            const bGeneric = /^High-performance .* open-weights model by/i.test(sb);
            if (aGeneric !== bGeneric) return aGeneric ? sb : sa;
            return sa.length >= sb.length ? sa : sb;
        };
        const bestSummary = pickBetterSummary(existing.summary, clean.summary);
        const bestArch = primary.architecture && primary.architecture !== "N/A" ? primary.architecture : secondary.architecture && secondary.architecture !== "N/A" ? secondary.architecture : "N/A";
        const bestBench = existing.benchmarks && existing.benchmarks !== "N/A" && (!clean.benchmarks || clean.benchmarks === "N/A" || existing.benchmarks.length >= clean.benchmarks.length) ? existing.benchmarks : clean.benchmarks || existing.benchmarks;
        const bestCitations = primary.citations && primary.citations.length > 0 ? primary.citations : secondary.citations;
        const bestLicense = primary.license && primary.license !== "Proprietary" ? primary.license : secondary.license && secondary.license !== "Proprietary" ? secondary.license : primary.license || secondary.license;
        map.set(key, {
            priority: Math.max(priority, current.priority),
            entry: {
                ...primary,
                license: bestLicense,
                popular: Boolean(existing.popular || clean.popular),
                year: Math.max(existing.year || 0, clean.year || 0) || primary.year,
                summary: bestSummary,
                description: bestSummary,
                architecture: bestArch,
                benchmarks: bestBench,
                citations: bestCitations
            }
        });
    }
    return Array.from(map.values()).map((item)=>item.entry);
}
