import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  X,
  Plus,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Brain,
  Scale,
  Code,
  ChevronDown,
  ChevronUp,
  PanelLeftClose,
  PanelLeft,
  ArrowUp,
  Square,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  ArrowLeft,
  Share2,
  Search,
  Maximize2,
  Minimize2,
  Send,
  Zap,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from './AuthContext';
import type { Entry } from '../types';
import { EcosystemLogo } from './EcosystemLogo';

export type ChatMode = 'flagship' | 'reasoning' | 'compare' | 'code';

interface ChatModeConfig {
  id: ChatMode;
  name: string;
  badge: string;
  tagline: string;
  icon: React.FC<{ size?: number; className?: string }>;
  model: string;
}

const CHAT_MODES: ChatModeConfig[] = [
  {
    id: 'flagship',
    name: 'Qwen 3.8 (27B)',
    badge: 'Groq LPU',
    tagline: 'High-speed reasoning & technical intelligence on Groq LPU',
    icon: Zap,
    model: 'qwen/qwen3.8-27b',
  },
  {
    id: 'reasoning',
    name: 'GPT-OSS (120B)',
    badge: 'Groq 120B',
    tagline: 'Massive open-weight foundation model accelerated on Groq LPU',
    icon: Brain,
    model: 'openai/gpt-oss-120b',
  },
  {
    id: 'compare',
    name: 'GPT-OSS (20B)',
    badge: 'Groq Fast',
    tagline: 'Ultra-low latency sub-50ms inference for rapid comparisons',
    icon: Scale,
    model: 'openai/gpt-oss-20b',
  },
  {
    id: 'code',
    name: 'Allam 2 (7B)',
    badge: 'Groq 7B',
    tagline: 'Lightweight efficient open model hosted on Groq LPU',
    icon: Code,
    model: 'allam-2-7b',
  },
];

interface Message {
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  reasoning?: string;
  modelUsed?: string;
  isStreaming?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  mode: ChatMode;
}

const getChildrenText = (node: any): string => {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getChildrenText).join('');
  if (typeof node === 'object' && node.props?.children) {
    return getChildrenText(node.props.children);
  }
  return '';
};

export const parseContentAndReasoning = (content?: string, reasoning?: string) => {
  let finalContent = content || '';
  let finalReasoning = reasoning || '';

  // 1. Fully closed think tags: <think>...</think>
  const closedMatches = finalContent.matchAll(/<think>([\s\S]*?)<\/think>/gi);
  for (const match of closedMatches) {
    const extracted = match[1].trim();
    if (extracted) {
      finalReasoning = finalReasoning ? `${finalReasoning}\n${extracted}` : extracted;
    }
  }
  finalContent = finalContent.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

  // 2. In-progress think tag (streaming): <think>...
  const openMatch = finalContent.match(/<think>([\s\S]*)$/i);
  if (openMatch) {
    const inProgress = openMatch[1].trim();
    if (inProgress) {
      finalReasoning = finalReasoning ? `${finalReasoning}\n${inProgress}` : inProgress;
    }
    finalContent = finalContent.slice(0, openMatch.index).trim();
  }

  // 3. Clean any stray unclosed or leftover think tags
  finalContent = finalContent.replace(/<\/?think>/gi, '').trim();

  return {
    content: finalContent,
    reasoning: finalReasoning || undefined,
  };
};

const PREBUILT_PROMPTS = [
  {
    title: "DeepSeek-R1 vs OpenAI o1",
    subtitle: "Compare architectures, reasoning traces & pricing",
    prompt: "Compare DeepSeek-R1 vs OpenAI o1 across architecture, mathematical reasoning benchmarks, and inference cost trade-offs.",
    mode: "compare" as ChatMode,
  },
  {
    title: "Top Open-Source Coding LLMs",
    subtitle: "Qwen 2.5-Coder vs DeepSeek vs Llama",
    prompt: "What are the top 3 open-weights models for AI coding in 2025? Compare their HumanEval scores and VRAM footprints.",
    mode: "code" as ChatMode,
  },
  {
    title: "Claude 3.7 Hybrid Reasoning",
    subtitle: "Instant response vs dynamic thinking budgets",
    prompt: "Explain how Claude 3.7 Sonnet's hybrid reasoning mechanism works and when to allocate higher thinking budgets.",
    mode: "reasoning" as ChatMode,
  },
  {
    title: "Groq LPU vs Traditional GPUs",
    subtitle: "Deterministic architecture delivering 500+ tok/s",
    prompt: "Why do Groq LPUs achieve 500+ tokens/sec on open models compared to H100 clusters? Explain the architectural differences.",
    mode: "flagship" as ChatMode,
  },
];

interface ChatWidgetProps {
  entryNames?: string[];
  onEntrySelect?: (name: string) => void;
  entries?: Entry[];
  initialOpen?: boolean;
  isChatRoute?: boolean;
  onNavigateToChat?: () => void;
  onExitChatRoute?: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  entryNames: _entryNames = [],
  onEntrySelect,
  entries = [],
  initialOpen = false,
  isChatRoute = false,
  onNavigateToChat,
  onExitChatRoute,
}) => {
  const { user } = useAuth();
  const userName = (user?.user_metadata?.firstName as string) || user?.email?.split('@')[0] || null;

  // Mini floating popup open state (when not in full /chat route)
  const [isMiniOpen, setIsMiniOpen] = useState(initialOpen);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentMode, setCurrentMode] = useState<ChatMode>('flagship');
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [currentlySpeakingIdx, setCurrentlySpeakingIdx] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedCodeText, setCopiedCodeText] = useState<string | null>(null);
  const [expandedReasoning, setExpandedReasoning] = useState<Record<number, boolean>>({});
  const [feedbackState, setFeedbackState] = useState<Record<number, 'up' | 'down'>>({});
  const [searchHistoryQuery, setSearchHistoryQuery] = useState('');

  // Multi-session chat history
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('vox_chatgpt_sessions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}

    const defaultSessionId = 'session_' + Date.now();
    return [
      {
        id: defaultSessionId,
        title: 'New conversation',
        createdAt: Date.now(),
        mode: 'flagship',
        messages: [
          {
            role: 'assistant',
            content: userName
              ? `Hello **${userName}**! I'm **Vox**, running on **Groq LPU silicon** delivering 500+ tokens/sec inference. Ask me to compare models, analyze architectures, or check benchmark performance across our 330+ indexed technologies.`
              : `Hello! I'm **Vox**, running on **Groq LPU silicon** delivering 500+ tokens/sec inference. Ask me to compare frontier models, analyze architectures, or check benchmark performance across our 330+ indexed technologies.`,
          },
        ],
      },
    ];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    return sessions[0]?.id || 'session_' + Date.now();
  });

  const activeSession = useMemo(() => {
    return sessions.find((s) => s.id === currentSessionId) || sessions[0];
  }, [sessions, currentSessionId]);

  const messages = activeSession?.messages || [];

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const miniTextareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
    }
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K toggles the chat interface, Escape closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isChatRoute) {
          onExitChatRoute?.();
        } else {
          setIsMiniOpen((prev) => !prev);
        }
      } else if (e.key === 'Escape') {
        if (isChatRoute) {
          onExitChatRoute?.();
        } else if (isMiniOpen) {
          setIsMiniOpen(false);
        }
      }
    };

    const handleCustomOpen = () => {
      if (onNavigateToChat) {
        onNavigateToChat();
      } else {
        setIsMiniOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-aiverse-chat', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-aiverse-chat', handleCustomOpen);
    };
  }, [isMiniOpen, isChatRoute, onNavigateToChat, onExitChatRoute]);

  // Persist sessions
  useEffect(() => {
    try {
      localStorage.setItem('vox_chatgpt_sessions', JSON.stringify(sessions));
    } catch {}
  }, [sessions]);

  // Auto-scroll on new message content
  useEffect(() => {
    if (messagesEndRef.current && (isChatRoute || isMiniOpen)) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatRoute, isMiniOpen]);

  // Focus textarea when open
  useEffect(() => {
    if (isChatRoute) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    } else if (isMiniOpen) {
      setTimeout(() => miniTextareaRef.current?.focus(), 150);
    }
  }, [isChatRoute, isMiniOpen]);

  // Create a new chat session
  const createNewSession = () => {
    if (isStreaming && abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newId = 'session_' + Date.now();
    const newSession: ChatSession = {
      id: newId,
      title: 'New conversation',
      createdAt: Date.now(),
      mode: currentMode,
      messages: [
        {
          role: 'assistant',
          content: `New conversation started. Ask me anything about AI models, architectures, frameworks, or benchmarks!`,
        },
      ],
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setInput('');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setCurrentlySpeakingIdx(null);
  };

  // Delete session
  const deleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== sessionId);
      if (filtered.length === 0) {
        const fallbackId = 'session_' + Date.now();
        const fallback: ChatSession = {
          id: fallbackId,
          title: 'New conversation',
          createdAt: Date.now(),
          mode: 'flagship',
          messages: [
            {
              role: 'assistant',
              content: `How can I help you with AI research today?`,
            },
          ],
        };
        setCurrentSessionId(fallbackId);
        return [fallback];
      }
      if (sessionId === currentSessionId) {
        setCurrentSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Abort active streaming
  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  // Speech Recognition (Dictation)
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Text to speech
  const speakMessage = (content: string, index: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (currentlySpeakingIdx === index) {
      window.speechSynthesis.cancel();
      setCurrentlySpeakingIdx(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = content
      .replace(/```[\s\S]*?```/g, 'Code block omitted.')
      .replace(/[#*`_~[\]()]/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setCurrentlySpeakingIdx(null);
    utterance.onerror = () => setCurrentlySpeakingIdx(null);

    setCurrentlySpeakingIdx(index);
    window.speechSynthesis.speak(utterance);
  };

  // Export current chat
  const handleExport = () => {
    const text = messages
      .filter((m) => m.role !== 'system')
      .map((m) => `[${m.role.toUpperCase()}]\n${m.content}\n`)
      .join('\n---\n\n');
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ChatGPT-AiVerse-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Accurate entity match: only tools actually referenced in markdown
  const getReferencedEntries = useCallback(
    (content: string): Entry[] => {
      if (!entries.length || !content) return [];
      const found: Entry[] = [];
      const contentLower = content.toLowerCase();

      for (const entry of entries) {
        if (!entry.name || entry.name.length < 3) continue;
        const nameLower = entry.name.toLowerCase();

        if (
          contentLower.includes(`**${nameLower}**`) ||
          contentLower.includes(`\`${nameLower}\``) ||
          contentLower.includes(` ${nameLower} `) ||
          contentLower.includes(`\n${nameLower} `)
        ) {
          if (!found.some((f) => f.name.toLowerCase() === nameLower)) {
            found.push(entry);
          }
          if (found.length >= 4) break;
        }
      }
      return found;
    },
    [entries]
  );

  // Markdown renderer with syntax-highlighted code blocks and full GFM support
  const customMarkdownComponents = useMemo(() => {
    return {
      h1: (props: any) => (
        <h1 className="font-bold text-lg sm:text-xl mt-5 mb-2.5 text-neutral-900 dark:text-neutral-100 tracking-tight" {...props} />
      ),
      h2: (props: any) => (
        <h2 className="font-bold text-base sm:text-lg mt-4 mb-2 text-neutral-900 dark:text-neutral-100 tracking-tight" {...props} />
      ),
      h3: (props: any) => (
        <h3 className="font-semibold text-sm sm:text-base mt-3.5 mb-1.5 text-neutral-900 dark:text-neutral-200 tracking-tight" {...props} />
      ),
      h4: (props: any) => (
        <h4 className="font-semibold text-xs sm:text-sm mt-3 mb-1 text-neutral-900 dark:text-neutral-200" {...props} />
      ),
      h5: (props: any) => (
        <h5 className="font-semibold text-xs sm:text-[13px] mt-2 mb-1 text-neutral-900 dark:text-neutral-200" {...props} />
      ),
      h6: (props: any) => (
        <h6 className="font-medium text-xs mt-2 mb-1 text-neutral-800 dark:text-neutral-300" {...props} />
      ),
      p: (props: any) => (
        <p className="mb-3.5 last:mb-0 leading-relaxed text-neutral-800 dark:text-[#d1d5db] text-xs sm:text-[14.5px]" {...props} />
      ),
      ul: (props: any) => (
        <ul className="list-disc pl-5 mb-3.5 space-y-1.5 marker:text-[#1a73e8]/70 dark:marker:text-[#a8c7fa]/70 text-xs sm:text-[14.5px] text-neutral-800 dark:text-[#d1d5db]" {...props} />
      ),
      ol: (props: any) => (
        <ol className="list-decimal pl-5 mb-3.5 space-y-1.5 marker:text-neutral-500 font-normal text-xs sm:text-[14.5px] text-neutral-800 dark:text-[#d1d5db]" {...props} />
      ),
      li: (props: any) => (
        <li className="leading-relaxed [&>p]:mb-1.5 [&>p:last-child]:mb-0" {...props} />
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="my-3.5 border-l-3 border-[#1a73e8] dark:border-[#a8c7fa] pl-3.5 py-1.5 italic text-neutral-600 dark:text-neutral-400 bg-neutral-100/50 dark:bg-white/[0.02] rounded-r-lg text-xs sm:text-[14px]">
          {children}
        </blockquote>
      ),
      hr: () => (
        <hr className="my-4 border-t border-neutral-200 dark:border-neutral-800" />
      ),
      del: ({ children }: any) => (
        <del className="line-through text-neutral-400 dark:text-neutral-500">{children}</del>
      ),
      em: ({ children }: any) => (
        <em className="italic text-neutral-800 dark:text-neutral-200">{children}</em>
      ),
      strong: ({ children }: any) => {
        const text = getChildrenText(children).trim();
        const match = entries.find(
          (e) => e.name.toLowerCase() === text.toLowerCase()
        );
        if (match && onEntrySelect) {
          return (
            <button
              type="button"
              onClick={() => onEntrySelect(match.name)}
              className="inline-flex items-center gap-0.5 font-semibold text-[#1a73e8] dark:text-[#a8c7fa] hover:underline underline-offset-2 decoration-[#1a73e8]/50 cursor-pointer"
              title={`Inspect ${match.name} in AiVerse`}
            >
              <span>{children}</span>
              <span className="text-[10px] opacity-60">↗</span>
            </button>
          );
        }
        return <strong className="font-semibold text-neutral-950 dark:text-white">{children}</strong>;
      },
      pre: ({ children }: any) => {
        const codeElement = React.isValidElement(children) ? (children as React.ReactElement<any>) : null;
        const className = codeElement?.props?.className || '';
        const rawCode = codeElement?.props?.children ?? children;
        const codeString = getChildrenText(rawCode).replace(/\n$/, '');
        const lang = (className || '').replace(/^language-/, '') || 'code';

        return (
          <div className="my-3.5 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-[#0d0e10] text-neutral-100 shadow-sm not-prose">
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.08] bg-white/[0.03] text-[11px] font-mono text-neutral-400">
              <span className="uppercase font-semibold tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Code size={12} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                <span>{lang}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(codeString);
                  setCopiedCodeText(codeString);
                  setTimeout(() => setCopiedCodeText(null), 2000);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-all cursor-pointer text-xs"
              >
                {copiedCodeText === codeString ? (
                  <>
                    <Check size={12} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                    <span className="text-[#1a73e8] dark:text-[#a8c7fa]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-neutral-200 no-scrollbar selection:bg-[#1a73e8]/30">
              <code>{codeString}</code>
            </pre>
          </div>
        );
      },
      code: ({ className, children, ...props }: any) => {
        if (className && className.startsWith('language-')) {
          const codeString = getChildrenText(children).replace(/\n$/, '');
          const lang = className.replace(/^language-/, '');
          return (
            <div className="my-3.5 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-[#0d0e10] text-neutral-100 shadow-sm not-prose">
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.08] bg-white/[0.03] text-[11px] font-mono text-neutral-400">
                <span className="uppercase font-semibold tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Code size={12} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                  <span>{lang}</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(codeString);
                    setCopiedCodeText(codeString);
                    setTimeout(() => setCopiedCodeText(null), 2000);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-all cursor-pointer text-xs"
                >
                  {copiedCodeText === codeString ? (
                    <>
                      <Check size={12} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
                      <span className="text-[#1a73e8] dark:text-[#a8c7fa]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-neutral-200 no-scrollbar">
                <code>{codeString}</code>
              </pre>
            </div>
          );
        }

        return (
          <code
            className="bg-neutral-100 dark:bg-white/[0.08] text-[#1a73e8] dark:text-[#a8c7fa] px-1.5 py-0.5 rounded-md font-mono text-[12px] sm:text-[12.5px] border border-neutral-200/60 dark:border-white/10 font-medium"
            {...props}
          >
            {children}
          </code>
        );
      },
      table: ({ children }: any) => (
        <div className="my-4 overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#141414] shadow-xs no-scrollbar not-prose">
          <table className="w-full text-xs sm:text-[13.5px] text-left border-collapse min-w-full">
            {children}
          </table>
        </div>
      ),
      thead: ({ children }: any) => (
        <thead className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/90 dark:bg-white/[0.04]">
          {children}
        </thead>
      ),
      tbody: ({ children }: any) => (
        <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
          {children}
        </tbody>
      ),
      tr: ({ children }: any) => (
        <tr className="hover:bg-neutral-500/[0.04] transition-colors">
          {children}
        </tr>
      ),
      th: ({ children }: any) => (
        <th className="px-3.5 py-2.5 font-semibold text-neutral-900 dark:text-neutral-100 text-xs sm:text-[13px] tracking-wide whitespace-nowrap">
          {children}
        </th>
      ),
      td: ({ children }: any) => (
        <td className="px-3.5 py-2.5 text-neutral-700 dark:text-[#d1d5db] text-xs sm:text-[13px] leading-relaxed align-top">
          {children}
        </td>
      ),
      a: ({ children, href, ...props }: any) => (
        <a
          href={href}
          className="inline-flex items-center gap-0.5 text-[#1a73e8] dark:text-[#a8c7fa] underline underline-offset-2 hover:opacity-80 font-medium"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          <span>{children}</span>
          <ExternalLink size={11} className="shrink-0 opacity-70 ml-0.5" />
        </a>
      ),
      input: ({ type, checked, ...props }: any) => {
        if (type === 'checkbox') {
          return (
            <input
              type="checkbox"
              checked={Boolean(checked)}
              readOnly
              className="mr-2 rounded border-neutral-300 dark:border-neutral-700 text-[#1a73e8] focus:ring-0 cursor-default align-middle"
              {...props}
            />
          );
        }
        return <input type={type} {...props} />;
      },
    };
  }, [entries, onEntrySelect, copiedCodeText]);

  // Main Streaming Send Handler
  const handleSend = async (textToSend?: string) => {
    const text = textToSend && typeof textToSend === 'string' ? textToSend : input;
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = { role: 'user', content: text.trim() };
    const initialAssistantMessage: Message = { role: 'assistant', content: '', isStreaming: true };

    const newMessages = [...messages, userMessage, initialAssistantMessage];

    // Auto-update session title based on first query
    const sessionTitle =
      activeSession.title === 'New conversation'
        ? text.trim().slice(0, 36) + (text.trim().length > 36 ? '...' : '')
        : activeSession.title;

    setSessions((prev) =>
      prev.map((s) => (s.id === currentSessionId ? { ...s, title: sessionTitle, messages: newMessages } : s))
    );

    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    if (miniTextareaRef.current) {
      miniTextareaRef.current.style.height = 'auto';
    }
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const modeConfig = CHAT_MODES.find((m) => m.id === currentMode) || CHAT_MODES[0];
      const requestMessages = messages.filter((m) => m.role !== 'error');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [...requestMessages, userMessage],
          userName: userName || undefined,
          model: modeConfig.model,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';

      // SSE Stream reader
      // SSE Stream reader
      if (contentType.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let accumulatedRawContent = '';
        let accumulatedReasoning = '';
        let modelUsed = modeConfig.model;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data: ')) continue;
            const payload = trimmed.slice(6).trim();
            if (!payload || payload === '[DONE]') continue;

            try {
              const parsed = JSON.parse(payload);
              if (parsed.error) {
                accumulatedRawContent = parsed.error;
              }
              if (parsed.meta?.model) {
                modelUsed = parsed.meta.model;
              }
              if (parsed.reasoning) {
                accumulatedReasoning += parsed.reasoning;
              }
              if (parsed.text) {
                accumulatedRawContent += parsed.text;
              }

              const { content: cleanContent, reasoning: cleanReasoning } = parseContentAndReasoning(
                accumulatedRawContent,
                accumulatedReasoning
              );

              setSessions((prev) =>
                prev.map((s) => {
                  if (s.id !== currentSessionId) return s;
                  const next = [...s.messages];
                  const lastIdx = next.length - 1;
                  if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
                    next[lastIdx] = {
                      role: 'assistant',
                      content: cleanContent,
                      reasoning: cleanReasoning || undefined,
                      modelUsed,
                      isStreaming: true,
                    };
                  }
                  return { ...s, messages: next };
                })
              );
            } catch {}
          }
        }

        // Finalize assistant message
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id !== currentSessionId) return s;
            const next = [...s.messages];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
              const { content: finalCleanContent, reasoning: finalCleanReasoning } = parseContentAndReasoning(
                next[lastIdx].content,
                next[lastIdx].reasoning
              );
              next[lastIdx] = {
                ...next[lastIdx],
                content: finalCleanContent,
                reasoning: finalCleanReasoning,
                isStreaming: false,
              };
            }
            return { ...s, messages: next };
          })
        );
      } else {
        // Fallback for standard JSON
        const data = await response.json();
        const { content: cleanContent, reasoning: cleanReasoning } = parseContentAndReasoning(
          data.content || '',
          data.reasoning
        );
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id !== currentSessionId) return s;
            const next = [...s.messages];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
              next[lastIdx] = {
                role: 'assistant',
                content: cleanContent,
                reasoning: cleanReasoning,
                modelUsed: data.modelUsed,
                isStreaming: false,
              };
            }
            return { ...s, messages: next };
          })
        );
      }
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      console.error('Chat error:', error);
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== currentSessionId) return s;
          const next = [...s.messages];
          const lastIdx = next.length - 1;
          if (lastIdx >= 0 && next[lastIdx].role === 'assistant') {
            next[lastIdx] = {
              role: 'error',
              content: 'Unable to reach AI services. Please try again.',
              isStreaming: false,
            };
          }
          return { ...s, messages: next };
        })
      );
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const currentModeConfig = CHAT_MODES.find((m) => m.id === currentMode) || CHAT_MODES[0];

  // Filtered session list for sidebar
  const filteredSessions = useMemo(() => {
    if (!searchHistoryQuery.trim()) return sessions;
    return sessions.filter((s) =>
      s.title.toLowerCase().includes(searchHistoryQuery.toLowerCase())
    );
  }, [sessions, searchHistoryQuery]);

  const isInitialEmpty = messages.length <= 1;

  // ══════════════════════════════════════════════════════════════════════
  // MODE 1: FULLSCREEN CHATGPT STUDIO (/chat route)
  // ══════════════════════════════════════════════════════════════════════
  if (isChatRoute) {
    return (
      <div className="fixed inset-0 z-50 flex overflow-hidden bg-white dark:bg-[#212121] text-neutral-900 dark:text-white font-sans animate-[fadeIn_0.2s_ease-out]">
        {/* ──── LEFT SIDEBAR (Iconic ChatGPT style) ──── */}
        <aside
          className={`flex flex-col h-full bg-[#f9f9f9] dark:bg-[#171717] border-r border-neutral-200/80 dark:border-white/[0.08] transition-all duration-300 ease-out z-20 ${
            sidebarOpen ? 'w-[260px] translate-x-0' : 'w-0 -translate-x-full overflow-hidden'
          }`}
        >
          {/* Sidebar Top: Logo + Collapse Sidebar */}
          <div className="p-3 flex items-center justify-between border-b border-neutral-200/60 dark:border-white/[0.06]">
            <div className="flex items-center gap-2 px-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
                <Zap size={13} className="fill-white" />
              </div>
              <span className="font-bold text-sm tracking-tight">Groq AI</span>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
              title="Close sidebar"
            >
              <PanelLeftClose size={16} />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <button
              onClick={createNewSession}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-neutral-300/80 dark:border-white/10 hover:bg-white dark:hover:bg-white/[0.06] text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-xs transition-all cursor-pointer"
            >
              <Plus size={15} className="text-[#1a73e8] dark:text-[#a8c7fa]" />
              <span>New chat</span>
            </button>
          </div>

          {/* Search chats */}
          <div className="px-3 pb-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-200/50 dark:bg-white/[0.04] text-xs text-neutral-400">
              <Search size={13} />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchHistoryQuery}
                onChange={(e) => setSearchHistoryQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Chat Sessions History List */}
          <div className="flex-1 overflow-y-auto px-3 py-1 flex flex-col gap-1 no-scrollbar">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider px-2 py-1">
              Recent Conversations
            </span>
            {filteredSessions.map((session) => {
              const isActive = session.id === currentSessionId;
              return (
                <div
                  key={session.id}
                  onClick={() => setCurrentSessionId(session.id)}
                  className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-neutral-200/80 dark:bg-white/[0.1] text-neutral-900 dark:text-white font-medium shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/40 dark:hover:bg-white/[0.04] hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <span className="truncate pr-2">{session.title}</span>
                  <button
                    onClick={(e) => deleteSession(session.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 rounded transition-opacity"
                    title="Delete chat"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Sidebar Bottom: Back to Directory & User Info */}
          <div className="p-3 border-t border-neutral-200/60 dark:border-white/[0.06] flex flex-col gap-1.5">
            <button
              onClick={() => onExitChatRoute?.()}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-white/[0.06] hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>Back to Directory</span>
            </button>

            <div className="flex items-center justify-between px-3 py-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-mono text-[11px]">{userName || 'AiVerse User'}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] font-semibold">
                PRO
              </span>
            </div>
          </div>
        </aside>

        {/* ──── MAIN CHAT WORKSPACE (Centered ChatGPT style) ──── */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-[#212121] relative">
          {/* Top Navigation Bar */}
          <header className="h-14 px-4 flex items-center justify-between border-b border-neutral-200/60 dark:border-white/[0.06] shrink-0 bg-white/80 dark:bg-[#212121]/80 backdrop-blur-xl z-10">
            <div className="flex items-center gap-3">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
                  title="Open sidebar"
                >
                  <PanelLeft size={18} />
                </button>
              )}

              {/* ChatGPT-style Model Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer font-bold text-base text-neutral-900 dark:text-white tracking-tight"
                >
                  <Zap size={15} className="text-amber-500 fill-amber-500" />
                  <span>{currentModeConfig.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] font-semibold border border-[#1a73e8]/20">
                    Groq LPU
                  </span>
                  <ChevronDown size={14} className="text-neutral-400 mt-0.5" />
                </button>

                {showModeDropdown && (
                  <div className="absolute left-0 top-10 w-72 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1e1e1e] shadow-2xl p-2 z-50 animate-[fadeUp_0.15s_ease-out]">
                    <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      Select Model
                    </div>
                    {CHAT_MODES.map((mode) => {
                      const Icon = mode.icon;
                      const isSelected = mode.id === currentMode;
                      return (
                        <button
                          key={mode.id}
                          onClick={() => {
                            setCurrentMode(mode.id);
                            setShowModeDropdown(false);
                          }}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-100 dark:bg-white/[0.08] text-neutral-900 dark:text-white font-semibold'
                              : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-neutral-200/70 dark:bg-white/10 flex items-center justify-center shrink-0">
                            <Icon size={14} className={isSelected ? 'text-[#1a73e8] dark:text-[#a8c7fa]' : 'opacity-70'} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold leading-tight">{mode.name}</p>
                            <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">{mode.tagline}</p>
                          </div>
                          {isSelected && <Check size={14} className="text-[#1a73e8] dark:text-[#a8c7fa] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Top Right Controls */}
            <div className="flex items-center gap-1.5 text-neutral-400">
              <button
                onClick={handleExport}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.08] hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Share or Export Chat"
              >
                <Share2 size={16} />
              </button>

              <button
                onClick={createNewSession}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.08] hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                title="New chat"
              >
                <RotateCcw size={15} />
              </button>

              {/* Minimize back to mini right bottom widget */}
              <button
                onClick={() => {
                  onExitChatRoute?.();
                  setIsMiniOpen(true);
                }}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.08] hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Minimize to bottom right"
              >
                <Minimize2 size={16} />
              </button>

              {/* Close back to directory */}
              <button
                onClick={() => onExitChatRoute?.()}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.08] hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer ml-1"
                title="Back to Directory (Esc)"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          {/* Centered Conversation Area */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 no-scrollbar flex flex-col justify-between">
            {/* Empty / Welcome State ("What can I help with?") */}
            {isInitialEmpty ? (
              <div className="max-w-2xl mx-auto w-full my-auto flex flex-col items-center text-center animate-[fadeUp_0.25s_ease-out]">
                <div className="w-14 h-14 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#a8c7fa] flex items-center justify-center mb-5 ring-8 ring-[#1a73e8]/5">
                  <Sparkles size={28} />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
                  What can I help with?
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mb-8 leading-relaxed">
                  Ask me anything about foundation models, benchmark scores, architectures, or open-source AI frameworks.
                </p>

                {/* Suggestion prompt cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
                  {PREBUILT_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentMode(item.mode);
                        handleSend(item.prompt);
                      }}
                      className="p-4 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/60 dark:bg-white/[0.02] hover:bg-neutral-100/80 dark:hover:bg-white/[0.06] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group cursor-pointer"
                    >
                      <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 group-hover:text-[#1a73e8] dark:group-hover:text-[#a8c7fa] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-1">
                        {item.subtitle}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Chat Messages List */
              <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
                {messages.map((msg, idx) => {
                  if (msg.role === 'system') return null;

                  const isUser = msg.role === 'user';
                  const isError = msg.role === 'error';
                  const { content: displayContent, reasoning: displayReasoning } = parseContentAndReasoning(msg.content, msg.reasoning);
                  const referenced = !isUser && !isError ? getReferencedEntries(displayContent) : [];
                  const isReasoningThinking = msg.isStreaming && !displayContent && Boolean(displayReasoning);
                  const isReasoningExpanded = expandedReasoning[idx] !== undefined ? expandedReasoning[idx] : isReasoningThinking;

                  return (
                    <div
                      key={idx}
                      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start items-start gap-4'}`}
                    >
                      {!isUser && (
                        <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                          <Sparkles size={15} />
                        </div>
                      )}

                      <div
                        className={`group relative text-[15px] leading-relaxed ${
                          isUser
                            ? 'max-w-[80%] bg-[#f4f4f4] dark:bg-[#2f2f2f] text-neutral-900 dark:text-white rounded-3xl px-5 py-3.5 shadow-xs font-normal'
                            : isError
                            ? 'w-full border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 rounded-2xl p-4'
                            : 'flex-1 min-w-0 text-neutral-800 dark:text-[#ececec]'
                        }`}
                      >
                        {isUser ? (
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        ) : isError ? (
                          <div className="flex items-start gap-2.5 text-sm">
                            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
                            <span>{msg.content}</span>
                          </div>
                        ) : (
                          <div>
                            {/* Collapsible Chain-of-Thought Reasoning Trace */}
                            {displayReasoning && (
                              <div className="mb-3 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">
                                <button
                                  type="button"
                                  onClick={() => setExpandedReasoning((p) => ({ ...p, [idx]: !isReasoningExpanded }))}
                                  className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                                >
                                  <span className="flex items-center gap-1.5">
                                    <Brain size={13} className={`text-purple-500 ${isReasoningThinking ? 'animate-pulse' : ''}`} />
                                    <span>{isReasoningThinking ? 'Thinking in progress...' : 'Thought for a few seconds'}</span>
                                  </span>
                                  {isReasoningExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                </button>
                                {isReasoningExpanded && (
                                  <div className="px-4 py-3 text-xs font-mono leading-relaxed text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-black/30 max-h-56 overflow-y-auto whitespace-pre-wrap no-scrollbar">
                                    {displayReasoning}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Markdown Response Body */}
                            <div className="prose prose-neutral dark:prose-invert max-w-none text-[15px]">
                              <ReactMarkdown remarkPlugins={[remarkGfm]} components={customMarkdownComponents}>
                                {displayContent || (msg.isStreaming ? (displayReasoning ? '' : 'Thinking...') : '')}
                              </ReactMarkdown>
                              {msg.isStreaming && (!displayReasoning || displayContent) && (
                                <span className="inline-block w-2 h-4 bg-[#1a73e8] dark:bg-[#a8c7fa] ml-1 animate-pulse align-middle" />
                              )}
                            </div>

                            {/* Referenced AiVerse Tool Cards */}
                            {referenced.length > 0 && !msg.isStreaming && (
                              <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-white/[0.06] flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-semibold text-neutral-400 mr-1">
                                  AiVerse Specs:
                                </span>
                                {referenced.map((item) => (
                                  <button
                                    key={item.name}
                                    onClick={() => onEntrySelect?.(item.name)}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-[#2a2a2a] text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:border-[#1a73e8] dark:hover:border-[#a8c7fa] hover:text-[#1a73e8] dark:hover:text-[#a8c7fa] transition-all cursor-pointer shadow-xs"
                                  >
                                    <EcosystemLogo name={item.org || item.name} website={item.url} size={15} />
                                    <span>{item.name}</span>
                                    <span className="opacity-50 text-[10px]">↗</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Bottom Action Row */}
                            {!msg.isStreaming && (displayContent || msg.content) && (
                              <div className="mt-3 flex items-center gap-2 text-neutral-400">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(displayContent || msg.content);
                                    setCopiedIndex(idx);
                                    setTimeout(() => setCopiedIndex(null), 2000);
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.08] hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                                  title="Copy response"
                                >
                                  {copiedIndex === idx ? <Check size={14} className="text-[#1a73e8] dark:text-[#a8c7fa]" /> : <Copy size={14} />}
                                </button>

                                <button
                                  onClick={() => speakMessage(displayContent || msg.content, idx)}
                                  className={`p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer ${
                                    currentlySpeakingIdx === idx ? 'text-[#1a73e8] dark:text-[#a8c7fa]' : 'hover:text-neutral-900 dark:hover:text-white'
                                  }`}
                                  title={currentlySpeakingIdx === idx ? 'Stop reading' : 'Read aloud'}
                                >
                                  {currentlySpeakingIdx === idx ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                </button>

                                <button
                                  onClick={() => setFeedbackState((p) => ({ ...p, [idx]: 'up' }))}
                                  className={`p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer ${
                                    feedbackState[idx] === 'up' ? 'text-[#1a73e8] dark:text-[#a8c7fa]' : 'hover:text-neutral-900 dark:hover:text-white'
                                  }`}
                                  title="Good response"
                                >
                                  <ThumbsUp size={14} />
                                </button>

                                <button
                                  onClick={() => setFeedbackState((p) => ({ ...p, [idx]: 'down' }))}
                                  className={`p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer ${
                                    feedbackState[idx] === 'down' ? 'text-red-500' : 'hover:text-neutral-900 dark:hover:text-white'
                                  }`}
                                  title="Bad response"
                                >
                                  <ThumbsDown size={14} />
                                </button>

                                {msg.modelUsed && (
                                  <span className="font-mono text-[11px] opacity-40 ml-2">
                                    {msg.modelUsed.split('/').pop()}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} className="h-4 shrink-0" />
              </div>
            )}
          </div>

          {/* ──── FLOATING BOTTOM INPUT CAPSULE (Exact ChatGPT style) ──── */}
          <footer className="p-4 shrink-0 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-[#212121] dark:via-[#212121]/90 dark:to-transparent">
            <div className="max-w-3xl mx-auto w-full">
              <div className="rounded-3xl border border-neutral-300 dark:border-neutral-700 bg-[#f4f4f4] dark:bg-[#2f2f2f] shadow-lg p-3 flex flex-col focus-within:ring-2 focus-within:ring-neutral-400 dark:focus-within:ring-neutral-500 transition-all">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 180) + 'px';
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={isListening ? 'Listening to your voice...' : 'Message Vox...'}
                  className="w-full bg-transparent outline-none text-[15px] text-neutral-900 dark:text-white placeholder:text-neutral-500 resize-none max-h-44 px-3 py-1.5 leading-relaxed no-scrollbar"
                  disabled={isStreaming}
                />

                <div className="flex items-center justify-between pt-1 px-1">
                  <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                    {speechSupported && (
                      <button
                        type="button"
                        onClick={toggleListening}
                        className={`p-2 rounded-full transition-all cursor-pointer ${
                          isListening
                            ? 'bg-red-500 text-white animate-pulse'
                            : 'hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/10'
                        }`}
                        title={isListening ? 'Stop recording' : 'Voice dictation'}
                      >
                        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                      </button>
                    )}

                    <span className="text-xs text-neutral-400 hidden sm:inline ml-1 font-medium">
                      Groq LPU Engine • 500+ tok/s
                    </span>
                  </div>

                  {isStreaming ? (
                    <button
                      type="button"
                      onClick={handleStopStreaming}
                      className="w-8 h-8 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center hover:opacity-80 transition-all cursor-pointer shadow-sm"
                      title="Stop generating"
                    >
                      <Square size={13} fill="currentColor" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                        input.trim()
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90'
                          : 'bg-neutral-300 dark:bg-neutral-600 text-neutral-400 dark:text-neutral-400 cursor-not-allowed opacity-40'
                      }`}
                      title="Send message"
                    >
                      <ArrowUp size={16} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-center text-neutral-400 dark:text-neutral-500 mt-2.5">
                Accelerated by Groq LPU silicon delivering 500+ tokens/sec. Verify specs with AiVerse directory.
              </p>
            </div>
          </footer>
        </main>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // MODE 2: MINI RIGHT-BOTTOM FLOATING WIDGET (Default experience)
  // ══════════════════════════════════════════════════════════════════════
  return (
    <>
      {/* ── Sleek Collapsed Trigger Button in Right Bottom ── */}
      {!isMiniOpen && (
        <button
          onClick={() => setIsMiniOpen(true)}
          className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.12)] bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 border border-neutral-800 dark:border-white/20 hover:border-neutral-700 dark:hover:border-white/40 transition-colors duration-150 cursor-pointer"
          aria-label="Open Groq AI Assistant"
        >
          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-xs">
            <Zap size={13} className="fill-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#1a73e8] dark:bg-[#a8c7fa] ring-2 ring-neutral-900 dark:ring-white" />
          </div>
          <span className="font-semibold text-xs tracking-tight">Groq AI</span>
        </button>
      )}

      {/* ── Compact Mini Floating Card in Right Bottom Corner ── */}
      {isMiniOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[530px] max-h-[calc(100vh-32px)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.7)] bg-white dark:bg-[#18191c] border border-neutral-200/90 dark:border-neutral-800 flex flex-col overflow-hidden backdrop-blur-2xl animate-[fadeUp_0.2s_ease-out]">
          {/* Mini Header */}
          <div className="px-3.5 py-2.5 border-b border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/80 dark:bg-[#121315]/80 backdrop-blur-xl flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
                  <Zap size={13} className="fill-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#1a73e8] dark:bg-[#a8c7fa] ring-1 ring-white dark:ring-[#18191c]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-neutral-900 dark:text-white">Vox</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-0.5 border border-amber-500/20">
                  <Zap size={9} className="fill-amber-500" />
                  Groq LPU
                </span>
              </div>
            </div>

            {/* Header controls: Open in /chat, New Chat, Close */}
            <div className="flex items-center gap-0.5 text-neutral-400">
              {/* Expand to Fullscreen /chat Studio */}
              <button
                onClick={() => {
                  setIsMiniOpen(false);
                  onNavigateToChat?.();
                }}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold text-[#1a73e8] dark:text-[#a8c7fa] hover:bg-[#1a73e8]/10 transition-colors cursor-pointer mr-1 border border-[#1a73e8]/20"
                title="Expand to Fullscreen Groq Studio (/chat)"
              >
                <span>/chat</span>
                <Maximize2 size={11} />
              </button>

              <button
                onClick={createNewSession}
                className="p-1 rounded-md hover:bg-neutral-200/60 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                title="New conversation"
              >
                <RotateCcw size={13} />
              </button>

              <button
                onClick={() => setIsMiniOpen(false)}
                className="p-1 rounded-md hover:bg-neutral-200/60 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Minimize"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Mini Message Thread */}
          <div className="flex-1 overflow-y-auto px-3.5 py-3 flex flex-col gap-3.5 text-xs no-scrollbar bg-white dark:bg-[#18191c]">
            {isInitialEmpty && (
              <div className="py-2 flex flex-col gap-2.5 animate-[fadeUp_0.15s_ease-out]">
                <div>
                  <h3 className="font-bold text-xs text-neutral-900 dark:text-white">
                    What can I help with?
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Ask me about models, benchmark scores, or framework architectures.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  {PREBUILT_PROMPTS.slice(0, 3).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(item.prompt)}
                      className="p-2 rounded-xl border border-neutral-200/80 dark:border-white/10 bg-neutral-50/70 dark:bg-white/[0.03] hover:border-[#1a73e8] dark:hover:border-[#a8c7fa] text-left transition-all cursor-pointer"
                    >
                      <p className="text-[11.5px] font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => {
              if (msg.role === 'system') return null;

              const isUser = msg.role === 'user';
              const isError = msg.role === 'error';
              const { content: displayContent, reasoning: displayReasoning } = parseContentAndReasoning(msg.content, msg.reasoning);
              const referenced = !isUser && !isError ? getReferencedEntries(displayContent) : [];
              const isReasoningThinking = msg.isStreaming && !displayContent && Boolean(displayReasoning);
              const isReasoningExpanded = expandedReasoning[idx] !== undefined ? expandedReasoning[idx] : isReasoningThinking;

              return (
                <div
                  key={idx}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start items-start gap-2'}`}
                >
                  {!isUser && (
                    <div className="w-5 h-5 rounded-md bg-[#1a73e8] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Sparkles size={11} />
                    </div>
                  )}

                  <div
                    className={`group relative text-[12.5px] leading-relaxed ${
                      isUser
                        ? 'max-w-[85%] bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-2xl rounded-tr-xs px-3.5 py-2 font-medium shadow-xs'
                        : isError
                        ? 'w-full border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 rounded-xl p-2.5'
                        : 'flex-1 min-w-0 text-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    {isUser ? (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    ) : isError ? (
                      <div className="flex items-start gap-1.5 text-xs">
                        <AlertCircle size={13} className="mt-0.5 shrink-0 text-red-500" />
                        <span>{msg.content}</span>
                      </div>
                    ) : (
                      <div>
                        {displayReasoning && (
                          <div className="mb-2 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-black/20">
                            <button
                              type="button"
                              onClick={() => setExpandedReasoning((p) => ({ ...p, [idx]: !isReasoningExpanded }))}
                              className="w-full flex items-center justify-between px-2.5 py-1.5 text-[10.5px] font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5">
                                <Brain size={11} className={`text-purple-500 ${isReasoningThinking ? 'animate-pulse' : ''}`} />
                                <span>{isReasoningThinking ? 'Thinking...' : 'Reasoning thought trace'}</span>
                              </span>
                              {isReasoningExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                            </button>
                            {isReasoningExpanded && (
                              <div className="p-2 text-[10px] font-mono leading-relaxed text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 max-h-32 overflow-y-auto whitespace-pre-wrap no-scrollbar">
                                {displayReasoning}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="prose prose-sm dark:prose-invert max-w-none text-[12.5px]">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={customMarkdownComponents}>
                            {displayContent || (msg.isStreaming ? (displayReasoning ? '' : 'Thinking...') : '')}
                          </ReactMarkdown>
                          {msg.isStreaming && (!displayReasoning || displayContent) && (
                            <span className="inline-block w-1.5 h-3.5 bg-[#1a73e8] dark:bg-[#a8c7fa] ml-0.5 animate-pulse align-middle" />
                          )}
                        </div>

                        {/* Interactive AiVerse Specs Tags */}
                        {referenced.length > 0 && !msg.isStreaming && (
                          <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-white/[0.06] flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                              Specs:
                            </span>
                            {referenced.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => onEntrySelect?.(item.name)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.04] text-[10.5px] font-medium text-neutral-700 dark:text-neutral-300 hover:border-[#1a73e8] dark:hover:border-[#a8c7fa] hover:text-[#1a73e8] dark:hover:text-[#a8c7fa] transition-colors cursor-pointer"
                              >
                                <EcosystemLogo name={item.org || item.name} website={item.url} size={13} />
                                <span>{item.name}</span>
                                <span className="opacity-50 text-[9px]">↗</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Copy / Speak actions */}
                        {!msg.isStreaming && (displayContent || msg.content) && (
                          <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(displayContent || msg.content);
                                  setCopiedIndex(idx);
                                  setTimeout(() => setCopiedIndex(null), 2000);
                                }}
                                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-0.5"
                                title="Copy"
                              >
                                {copiedIndex === idx ? <Check size={10} className="text-[#1a73e8] dark:text-[#a8c7fa]" /> : <Copy size={10} />}
                                <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                              </button>

                              <button
                                onClick={() => speakMessage(displayContent || msg.content, idx)}
                                className={`p-1 rounded transition-colors cursor-pointer flex items-center gap-0.5 ${
                                  currentlySpeakingIdx === idx ? 'text-[#1a73e8] dark:text-[#a8c7fa]' : 'hover:bg-neutral-100 dark:hover:bg-white/10'
                                }`}
                              >
                                {currentlySpeakingIdx === idx ? <VolumeX size={10} /> : <Volume2 size={10} />}
                                <span>{currentlySpeakingIdx === idx ? 'Stop' : 'Listen'}</span>
                              </button>
                            </div>

                            {msg.modelUsed && (
                              <span className="font-mono text-[9px] opacity-40">
                                {msg.modelUsed.split('/').pop()}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} className="h-1 shrink-0" />
          </div>

          {/* Mini Input Box */}
          <div className="p-2.5 border-t border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/70 dark:bg-[#121315]/80 backdrop-blur-xl shrink-0">
            <div className="relative flex items-end gap-1.5 rounded-xl border border-neutral-300/80 dark:border-white/15 px-2.5 py-1.5 bg-white dark:bg-[#1f2024] focus-within:border-[#1a73e8] dark:focus-within:border-[#a8c7fa] transition-all">
              <textarea
                ref={miniTextareaRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={isListening ? 'Listening...' : 'Message Vox... (Enter to send)'}
                className="flex-1 bg-transparent outline-none text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 resize-none max-h-24 py-1 leading-relaxed no-scrollbar"
                disabled={isStreaming}
              />

              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-white'
                  }`}
                  title="Voice dictation"
                >
                  {isListening ? <MicOff size={13} /> : <Mic size={13} />}
                </button>
              )}

              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStopStreaming}
                  className="p-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                >
                  <Square size={11} fill="currentColor" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={`p-1.5 rounded-lg flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                    input.trim()
                      ? 'bg-[#1a73e8] text-white hover:bg-[#1557b0] dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] dark:text-[#041e49] shadow-xs'
                      : 'text-neutral-400 bg-neutral-100 dark:bg-white/5 opacity-40 cursor-not-allowed'
                  }`}
                  title="Send"
                >
                  <Send size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
