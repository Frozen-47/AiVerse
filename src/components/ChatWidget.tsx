import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Minimize2,
  Maximize2,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  RotateCcw,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from './AuthContext';

interface Message {
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  isTyping?: boolean;
}

const PREBUILT_QUESTIONS = [
  "How does DeepSeek-R1 compare to OpenAI o1 for reasoning?",
  "What are the key architectural breakthroughs of DeepSeek-V3?",
  "What is the best open-source model for AI coding?",
  "Tell me about Llama 3.3 (70B) capabilities vs 405B",
  "How does Claude 3.7 Sonnet handle hybrid reasoning?",
  "Explain how underrated models achieve frontier multimodal performance",
  "What is FLUX.1 Schnell used for?",
  "How does LangGraph help orchestrate multi-agent workflows?",
  "What are the benefits of Unsloth for fine-tuning LLMs?",
  "Which models have the largest context windows?",
  "What is the difference between open-weights and proprietary models?",
  "Tell me about HunyuanVideo and CogVideoX video generation",
  "What makes Kokoro-82M special for text-to-speech?",
  "How does v0 by Vercel generate React & Tailwind components?",
  "What is the MATH-500 dataset used for?",
  "Can you list the best platforms for fast serverless AI inference?",
  "What are the key features of Qwen 2.5-Coder (32B)?",
  "Explain what GroqCloud LPU inference is",
  "What makes OpenRouter useful for AI developers?",
  "Which open-weights model is the smartest right now?"
];

const markdownComponents = {
  h1: ({node, ...props}: any) => (
    <h1 className="font-bold text-base mt-2 mb-1 text-neutral-900 dark:text-white" {...props} />
  ),
  h2: ({node, ...props}: any) => (
    <h2 className="font-bold text-sm mt-2 mb-1 text-neutral-900 dark:text-neutral-100" {...props} />
  ),
  h3: ({node, ...props}: any) => (
    <h3 className="font-semibold text-[13px] mt-1.5 mb-1 text-neutral-800 dark:text-neutral-200" {...props} />
  ),
  p: ({node, ...props}: any) => <p className="mb-2 last:mb-0 leading-relaxed text-neutral-800 dark:text-neutral-200" {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-disc pl-4 mb-2 space-y-1 marker:text-neutral-400 dark:marker:text-neutral-500" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-decimal pl-4 mb-2 space-y-1 marker:text-neutral-400 dark:marker:text-neutral-500" {...props} />,
  li: ({node, ...props}: any) => <li className="text-neutral-800 dark:text-neutral-200" {...props} />,
  strong: ({node, ...props}: any) => <strong className="font-semibold text-neutral-900 dark:text-white" {...props} />,
  code: ({node, ...props}: any) => (
    <code className="bg-neutral-200/70 dark:bg-black/40 text-neutral-800 dark:text-neutral-200 border border-neutral-300/60 dark:border-white/10 rounded px-1.5 py-0.5 font-mono text-[12px]" {...props} />
  ),
  pre: ({node, ...props}: any) => (
    <pre className="bg-[#18191a] text-neutral-200 rounded-xl p-3 overflow-x-auto my-2.5 font-mono text-[12px] border border-neutral-700/40 shadow-inner" {...props} />
  ),
  a: ({node, children, ...props}: any) => (
    <a className="inline-flex items-baseline gap-1 text-[#1a73e8] dark:text-[#8ab4f8] underline underline-offset-2 hover:opacity-80 transition-opacity font-medium" target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <ExternalLink size={12} className="shrink-0 self-center opacity-70" />
    </a>
  ),
};

function buildMarkdownComponents(
  entryNames: string[],
  onEntrySelect?: (name: string) => void,
) {
  return {
    ...markdownComponents,
    strong: ({ children }: { children?: React.ReactNode }) => {
      const text = String(children ?? "").trim();
      const match = entryNames.find(
        (n) => n === text || n.toLowerCase() === text.toLowerCase(),
      );
      if (match && onEntrySelect) {
        return (
          <button
            type="button"
            onClick={() => onEntrySelect(match)}
            className="font-bold text-[#1a73e8] dark:text-[#8ab4f8] underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            {match}
          </button>
        );
      }
      return <strong className="font-bold text-neutral-900 dark:text-white">{children}</strong>;
    },
  };
}

const getInitialMessages = (name?: string | null): Message[] => [
  { role: 'assistant', content: name ? `Hi ${name}! I am Vox, your AI research and discovery copilot. How can I help you navigate the world of AI today?` : 'Hi there! I am Vox, your AI research and discovery copilot. How can I help you navigate the world of AI today?' }
];

interface ChatWidgetProps {
  entryNames?: string[];
  onEntrySelect?: (name: string) => void;
  initialOpen?: boolean;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  entryNames = [],
  onEntrySelect,
  initialOpen = false,
}) => {
  const { user } = useAuth();
  const userId = user?.id || null;
  const userName = (user?.user_metadata?.firstName as string) || user?.email?.split('@')[0] || null;

  const [isOpen, setIsOpen] = useState(initialOpen);
  const mdComponents = useRef(
    buildMarkdownComponents(entryNames, onEntrySelect),
  );
  mdComponents.current = buildMarkdownComponents(entryNames, onEntrySelect);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('vox_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userId === userId && Date.now() - parsed.timestamp < 60 * 60 * 1000 && parsed.messages?.length > 0) {
          return parsed.messages;
        }
      }
    } catch (e) {
      console.error('Error loading chat history', e);
    }
    return getInitialMessages(userName);
  });
  
  const previousUserId = useRef(userId);
  const previousUserName = useRef(userName);
  
  useEffect(() => {
    if (previousUserId.current !== userId) {
      setMessages(getInitialMessages(userName));
      localStorage.removeItem('vox_chat_history');
      previousUserId.current = userId;
      previousUserName.current = userName;
    } else if (previousUserName.current !== userName && messages.length <= 1) {
      setMessages(getInitialMessages(userName));
      previousUserName.current = userName;
    }
  }, [userId, userName, messages.length]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem('vox_chat_history', JSON.stringify({
          userId: userId,
          timestamp: Date.now(),
          messages: messages.map(m => ({ ...m, isTyping: false }))
        }));
      } else {
        localStorage.removeItem('vox_chat_history');
      }
    } catch (e) {
      console.error('Error saving chat history', e);
    }
  }, [messages]);

  const clearChat = () => {
    setMessages(getInitialMessages(userName));
    localStorage.removeItem('vox_chat_history');
  };

  useEffect(() => {
    refreshSuggestions();
  }, []);

  const refreshSuggestions = () => {
    const shuffled = [...PREBUILT_QUESTIONS].sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 3));
  };

  const handleSuggestionClick = (prompt: string, idx: number) => {
    handleSend(prompt);
    setSuggestions(prev => {
      const available = PREBUILT_QUESTIONS.filter(q => !prev.includes(q));
      if (available.length > 0) {
        const randomNew = available[Math.floor(Math.random() * available.length)];
        const next = [...prev];
        next[idx] = randomNew;
        return next;
      }
      return prev;
    });
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend && typeof textToSend === 'string' ? textToSend : input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const requestMessages = messages.filter(m => m.role !== 'error');
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...requestMessages, userMessage],
          userName: (user?.user_metadata?.firstName as string) || user?.email?.split('@')[0] || undefined
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          response.status === 500
            ? "The AI backend encountered a temporary server error. Please try again in a few moments."
            : `Server returned an unexpected response (Status ${response.status}).`
        );
      }
      
      if (!response.ok) {
        throw new Error(data.content || data.error || `HTTP error! status: ${response.status}`);
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error: any) {
      console.error("Groq API Error:", error);
      let errorMessage = "Sorry, I encountered an error communicating with the backend.";
      
      if (error.message) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "Network error: Unable to reach the AI servers. Please check your connection.";
        } else if (error.message.includes("Server returned non-JSON") || error.message.includes("HTTP error")) {
          errorMessage = "Server error: The backend returned an invalid response. The service might be temporarily down.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setMessages(prev => [...prev, { role: 'error', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.45)] bg-white dark:bg-[#1e1f20] text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-[0_6px_24px_rgba(26,115,232,0.25)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer"
        aria-label="Open Vox AI Assistant"
      >
        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-[#1a73e8] via-[#8ab4f8] to-[#ea4335] text-white shadow-xs">
          <Sparkles size={15} className="animate-pulse" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34a853] ring-2 ring-white dark:ring-[#1e1f20]"></span>
          </span>
        </div>
        <span className="font-medium text-[13.5px] sm:text-[14px] text-neutral-800 dark:text-neutral-100 tracking-normal pr-1">
          Ask Vox
        </span>
      </button>
    );
  }

  return (
    <div
      ref={widgetRef}
      className={`fixed z-50 flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out overflow-hidden border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#1e1f20] ${
        isMaximized
          ? 'bottom-4 right-4 left-4 top-4 rounded-3xl md:left-auto md:w-175'
          : 'bottom-6 right-6 w-95 h-137.5 rounded-3xl sm:w-105 sm:h-150'
      }`}
    >
      {/* ── Underrated Conversational Header ── */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-200/80 dark:border-white/10 bg-[#f8fafd] dark:bg-[#18191a]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-tr from-[#1a73e8] via-[#8ab4f8] to-[#ea4335] text-white shadow-xs">
              <Sparkles size={16} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#34a853] ring-2 ring-white dark:ring-[#18191a]" title="Online" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white tracking-normal">
                Vox AI
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#e8f0fe] text-[#1a73e8] dark:bg-blue-900/40 dark:text-[#8ab4f8] border border-blue-200/60 dark:border-blue-700/30">
                Underrated One Powered
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              AI Discovery & Research Assistant
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
          <button
            onClick={clearChat}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-200/70 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Restart conversation"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-200/70 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            title={isMaximized ? "Restore window" : "Maximize window"}
          >
            {isMaximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-200/70 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Close Vox"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* ── Messages Stream ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar p-4 flex flex-col gap-4 text-sm bg-white dark:bg-[#1e1f20]">
        {/* Welcome Hero when 1 message */}
        {messages.length <= 1 && (
          <div className="py-4 px-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight bg-gradient-to-r from-[#4285f4] via-[#9b72cf] to-[#d96570] bg-clip-text text-transparent">
              Hello, {userName ? userName : "there"}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-5 font-normal">
              How can I help you navigate the AI ecosystem today?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {suggestions.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(prompt, idx)}
                  className="p-3.5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-[#f8fafd] dark:bg-[#282a2d] hover:bg-neutral-100 dark:hover:bg-[#323538] hover:border-blue-400 dark:hover:border-blue-500 transition-all text-left text-xs font-normal text-neutral-800 dark:text-neutral-200 cursor-pointer flex flex-col justify-between h-22 group"
                >
                  <span className="line-clamp-2 leading-relaxed">{prompt}</span>
                  <div className="flex justify-end text-neutral-400 group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8]">
                    <Sparkles size={13} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Stream */}
        {messages.length > 1 && messages.map((msg, idx) =>
          msg.role !== 'system' && (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-start gap-3'}`}>
              {msg.role !== 'user' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-tr from-[#1a73e8] via-[#8ab4f8] to-[#ea4335] text-white shadow-xs mt-0.5">
                  <Sparkles size={15} />
                </div>
              )}
              <div
                className={`group relative max-w-[85%] text-[13.5px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#e8f0fe] text-[#174ea6] dark:bg-[#1a3860] dark:text-[#d2e3fc] rounded-3xl rounded-tr-md px-5 py-3 font-normal shadow-xs'
                    : msg.role === 'error'
                    ? 'border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-2xl p-4'
                    : 'flex-1 text-neutral-800 dark:text-neutral-200 pt-1'
                }`}
              >
                {msg.role === 'user' ? (
                  <div>{msg.content}</div>
                ) : msg.role === 'error' ? (
                  <div className="flex items-start gap-2">
                    <AlertCircle size={14} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="font-semibold text-[11px] uppercase tracking-wide mb-0.5 text-red-600 dark:text-red-400">Error</p>
                      <p className="leading-snug">{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed">
                      <ReactMarkdown components={mdComponents.current}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                    <div className="mt-3 flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        title="Copy response"
                      >
                        {copiedIndex === idx ? <Check size={13} className="text-[#34a853]" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {/* ── Typing Indicator ── */}
        {isLoading && (
          <div className="flex justify-start items-start gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-tr from-[#1a73e8] via-[#8ab4f8] to-[#ea4335] text-white shadow-xs mt-0.5 animate-pulse">
              <Sparkles size={15} />
            </div>
            <div className="pt-2 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#1a73e8] animate-typing-dot [animation-delay:-0.32s]" />
                <div className="w-2 h-2 rounded-full bg-[#ea4335] animate-typing-dot [animation-delay:-0.16s]" />
                <div className="w-2 h-2 rounded-full bg-[#34a853] animate-typing-dot" />
              </div>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Underrated one is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-2 shrink-0" />
      </div>

      {/* ── Suggestions Bar when in chat ── */}
      {!isLoading && messages.length > 1 && (
        <div className="shrink-0 px-4 pb-2 pt-2 border-t border-neutral-200/80 dark:border-white/10 bg-[#f8fafd] dark:bg-[#18191a]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">Related topics</span>
            <button
              onClick={refreshSuggestions}
              className="flex items-center gap-1 text-[11px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
            >
              <RefreshCw size={10} />
              Refresh
            </button>
          </div>
          <div className="flex overflow-x-auto overscroll-contain gap-1.5 pb-1 no-scrollbar">
            {suggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(prompt, idx)}
                className="whitespace-nowrap shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-[#f0f4f9] hover:bg-[#e2e7ef] dark:bg-[#282a2d] dark:hover:bg-[#34373b] text-neutral-700 dark:text-neutral-200 border border-neutral-300/60 dark:border-white/10 transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Conversational Input Capsule & Disclaimer ── */}
      <div className="shrink-0 p-3.5 border-t border-neutral-200/80 dark:border-white/10 bg-[#f8fafd] dark:bg-[#18191a]">
        <div className="flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/15 px-4 py-2 bg-white dark:bg-[#282a2d] focus-within:border-[#1a73e8] dark:focus-within:border-[#8ab4f8] focus-within:ring-2 focus-within:ring-[#1a73e8]/20 transition-all shadow-xs">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Vox anything about AI..."
            className="flex-1 bg-transparent outline-none text-[13.5px] text-neutral-900 dark:text-white placeholder:text-neutral-500 font-normal py-0.5"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={`w-8 h-8 rounded-full transition-all flex items-center justify-center shrink-0 cursor-pointer ${
              input.trim() && !isLoading
                ? "bg-[#1a73e8] hover:bg-[#1557b0] text-white shadow-xs active:scale-95"
                : "text-neutral-400 bg-neutral-100 dark:bg-white/5 opacity-50 cursor-not-allowed"
            }`}
            title="Send prompt"
          >
            <Send size={14} />
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 text-center mt-2">
          Vox is powered by Groq LPU & Underrated AI. Check responses for accuracy.
        </p>
      </div>
    </div>
  );
};

