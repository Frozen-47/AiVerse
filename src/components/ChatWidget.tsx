import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Minimize2, Maximize2, RefreshCw, Copy, Check, AlertCircle, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTokens } from '../lib/theme';
// Client-side Groq initialization removed for security.
// We now use the Vercel Serverless Function at /api/chat

interface Message {
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  isTyping?: boolean;
}

const PREBUILT_QUESTIONS = [
  "What is the best model for coding?",
  "Tell me about Llama 3.1 405B capabilities",
  "Compare Claude Haiku vs GPT-4o mini",
  "What models are best for image generation?",
  "Explain what Grok-2 is",
  "Which model is best for fast inference?",
  "What is Flux.1 used for?",
  "Tell me about Runway Gen-3 Alpha",
  "Which models have the largest context window?",
  "What is the difference between open-weights and proprietary?",
  "How does Suno v3.5 generate music?",
  "What is the most capable reasoning model?",
  "Are there any good models for audio generation?",
  "What are the benefits of using Gemma 2?",
  "Can you list the multimodal models available?",
  "What makes ElevenLabs good for voice synthesis?",
  "How does GPT-4o mini compare to the main GPT-4o?",
  "Which open-weights model is the smartest right now?",
  "What models should I use for video generation?",
  "Give me an overview of the Llama 3 family",
  "What is Grok-2's main advantage?",
  "Which model has the lowest latency?"
];

const markdownComponents = {
  h1: ({node, ...props}: any) => <h1 className="font-bold text-lg mt-2 mb-1" {...props} />,
  h2: ({node, ...props}: any) => <h2 className="font-bold text-base mt-2 mb-1" {...props} />,
  h3: ({node, ...props}: any) => <h3 className="font-bold text-[14px] mt-2 mb-1" {...props} />,
  p: ({node, ...props}: any) => <p className="mb-2 last:mb-0" {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
  li: ({node, ...props}: any) => <li className="" {...props} />,
  strong: ({node, ...props}: any) => <strong className="font-semibold text-blue-400" {...props} />,
  code: ({node, ...props}: any) => <code className="bg-black/20 rounded px-1 py-0.5 font-mono text-[11px]" {...props} />,
  pre: ({node, ...props}: any) => <pre className="bg-black/30 rounded p-2 overflow-x-auto my-2 font-mono text-[11px]" {...props} />,
};

const TypewriterMarkdown = ({ content, onComplete }: { content: string, onComplete: () => void }) => {
  const [displayed, setDisplayed] = useState('');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i += 3;
      if (i >= content.length) {
        setDisplayed(content);
        clearInterval(timer);
        onCompleteRef.current();
      } else {
        setDisplayed(content.slice(0, i));
      }
    }, 15);
    return () => clearInterval(timer);
  }, [content]);

  return <ReactMarkdown components={markdownComponents}>{displayed}</ReactMarkdown>;
};

const INITIAL_MESSAGES: Message[] = [
  { role: 'assistant', content: 'Hi there! I am Vox. How can I help you navigate the world of AI today?' }
];

const ZapFastIcon = ({ size, className = "" }: { size?: number | string, className?: string }) => (
  <svg
    width={size || "1em"}
    height={size || "1em"}
    viewBox="0 -960 960 960"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="m480-336 128-184H494l80-280H360v320h120v144ZM400-80v-320H280v-480h400l-80 280h160L400-80Zm80-400H360h120Z" />
  </svg>
);

export const ChatWidget: React.FC = () => {
  const t = useTokens();
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('vox_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Date.now() - parsed.timestamp < 60 * 60 * 1000 && parsed.messages?.length > 0) {
          return parsed.messages;
        }
      }
    } catch (e) {
      console.error('Error loading chat history', e);
    }
    return INITIAL_MESSAGES;
  });
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
    setMessages(INITIAL_MESSAGES);
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
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Server returned non-JSON response (Status ${response.status}): ${responseText.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        throw new Error(data.content || data.error || `HTTP error! status: ${response.status}`);
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.content, isTyping: true }]);
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
        className={`group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center p-2 sm:p-2.5 rounded-full shadow-2xl transition-all duration-500 ease-in-out hover:scale-105 ${t.btnPrimary}`}
      >
        <ZapFastIcon 
          className="w-6 h-6 sm:w-9 sm:h-9 transition-transform duration-500 ease-in-out group-hover:rotate-12" 
        />
        <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
          <div className="overflow-hidden whitespace-nowrap">
            <span className="pl-2 pr-1 font-medium text-[13px] sm:text-[15px] block">Ask Vox</span>
          </div>
        </div>
      </button>
     );
  }

  return (
    <div 
      ref={widgetRef}
      className={`fixed z-50 flex flex-col shadow-2xl border transition-all duration-300 ease-in-out ${t.surface} ${t.border} ${
        isMaximized 
          ? 'bottom-4 right-4 left-4 top-4 rounded-2xl md:left-auto md:w-[600px]' 
          : 'bottom-6 right-6 w-[380px] h-[550px] rounded-2xl sm:w-[420px] sm:h-[600px]'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${t.border}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white">
            <ZapFastIcon size={18} />
          </div>
          <div>
            <h3 className={`font-semibold text-sm ${t.textPrimary}`}>Agent Vox</h3>
            <p className={`text-[10px] ${t.textMuted}`}>Powered by Groq</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 ${t.textSecondary}`}>
          <button 
            onClick={clearChat}
            className={`p-1.5 rounded hover:bg-red-500/10 hover:text-red-400 transition-colors`}
            title="Restart chat"
          >
            <RotateCcw size={14} />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className={`p-1.5 rounded hover:${t.surfaceHover} transition-colors`}
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className={`p-1.5 rounded hover:${t.surfaceHover} transition-colors`}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto overscroll-contain no-scrollbar p-4 flex flex-col gap-4 text-sm ${isMaximized ? 'text-base' : ''}`}>
        {messages.map((msg, idx) => (
          msg.role !== 'system' && (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`group relative max-w-[85%] rounded-2xl px-4 py-2 text-[13px] leading-relaxed ${
                  msg.role === 'user' 
                    ? `bg-linear-to-r from-cyan-500 via-cyan-600 to-sky-600 text-white font-medium rounded-br-sm shadow-sm` 
                    : msg.role === 'error'
                    ? `bg-red-500/10 border-red-500/20 text-red-500 rounded-bl-sm border`
                    : `${t.surfaceHover} ${t.textPrimary} border ${t.border} rounded-bl-sm`
                }`}
              >
                {msg.role === 'user' ? (
                  <div>{msg.content}</div>
                ) : msg.role === 'error' ? (
                  <div className="flex items-start gap-2">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[11px] uppercase tracking-wider mb-0.5 opacity-80">Connection Error</p>
                      <p className="leading-snug">{msg.content}</p>
                    </div>
                  </div>
                ) : msg.isTyping ? (
                  <TypewriterMarkdown 
                    content={msg.content} 
                    onComplete={() => {
                      setMessages(prev => prev.map((m, i) => i === idx ? { ...m, isTyping: false } : m));
                    }} 
                  />
                ) : (
                  <ReactMarkdown
                    components={markdownComponents}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
                
                {msg.role === 'assistant' && (
                  <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopy(msg.content, idx)}
                      className={`p-1 rounded transition-colors ${t.textMuted} hover:${t.textPrimary}`}
                      title="Copy response"
                    >
                      {copiedIndex === idx ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`max-w-[85%] rounded-2xl px-4 py-4 ${t.surfaceHover} border ${t.border} rounded-bl-sm flex items-center gap-1.5 ${t.textAccent}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-typing-dot [animation-delay:-0.32s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-typing-dot [animation-delay:-0.16s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-typing-dot" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-2 shrink-0" />
      </div>

      {/* Suggested Prompts */}
      {!isLoading && messages.length > 0 && (
        <div className={`shrink-0 px-4 pb-3 pt-3 border-t ${t.border} bg-transparent`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-xs ${t.textMuted} font-medium`}>
              Suggested questions:
            </p>
            <button
              onClick={refreshSuggestions}
              className={`flex items-center gap-1 text-[10px] uppercase tracking-wider ${t.textMuted} hover:text-blue-400 transition-colors`}
              title="Refresh suggestions"
            >
              <RefreshCw size={12} />
              Refresh
            </button>
          </div>
          <div className="flex overflow-x-auto overscroll-contain gap-2 pb-1 no-scrollbar">
            {suggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(prompt, idx)}
                className={`whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border ${t.border} ${t.surfaceHover} ${t.textMuted} hover:text-blue-500 hover:border-blue-500/30 transition-colors shadow-sm active:scale-95`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className={`shrink-0 p-3 border-t ${t.border}`}>
        <div className={`flex items-center gap-2 rounded-full border px-4 py-2 ${t.surface} ${t.border} focus-within:border-blue-500/50 transition-colors`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about AI models..."
            className={`flex-1 bg-transparent outline-hidden text-sm ${t.textPrimary} placeholder-${t.textMuted}`}
            disabled={isLoading}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={`p-1.5 rounded-full transition-colors ${
              input.trim() && !isLoading ? `text-blue-500 hover:bg-blue-500/10` : t.textMuted
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
