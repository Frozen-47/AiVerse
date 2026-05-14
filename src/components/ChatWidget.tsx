import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Minimize2, Maximize2, RefreshCw, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTokens } from '../lib/theme';
import { entries } from '../data';
// Client-side Groq initialization removed for security.
// We now use the Vercel Serverless Function at /api/chat

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
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

export const ChatWidget: React.FC = () => {
  const t = useTokens();
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi there! I am Vox. How can I help you navigate the world of AI today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refreshSuggestions();
  }, []);

  const refreshSuggestions = () => {
    const shuffled = [...PREBUILT_QUESTIONS].sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 3));
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
      const catalogContext = entries.map(e => `- ${e.name} (${e.type})`).join('\n');
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          catalogContext
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
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error: any) {
      console.error("Groq API Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: error.message || 'Sorry, I encountered an error communicating with the backend.' }]);
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
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 ${t.btnPrimary}`}
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div 
      className={`fixed z-50 flex flex-col shadow-2xl border transition-all duration-300 ease-in-out ${t.surface} ${t.border} ${
        isMaximized 
          ? 'bottom-4 right-4 left-4 top-4 rounded-2xl md:left-auto md:w-[600px]' 
          : 'bottom-6 right-6 w-[350px] h-[500px] rounded-2xl sm:w-[400px]'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${t.border}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white">
            <Bot size={18} />
          </div>
          <div>
            <h3 className={`font-semibold text-sm ${t.textPrimary}`}>Agent Vox</h3>
            <p className={`text-[10px] ${t.textMuted}`}>Powered by Groq</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
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
      <div className={`flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4 text-sm ${isMaximized ? 'text-base' : ''}`}>
        {messages.map((msg, idx) => (
          msg.role !== 'system' && (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`group relative max-w-[85%] rounded-2xl px-4 py-2 text-[13px] leading-relaxed ${
                  msg.role === 'user' 
                    ? `bg-blue-600 text-white rounded-br-sm` 
                    : `${t.surfaceHover} ${t.textPrimary} border ${t.border} rounded-bl-sm`
                }`}
              >
                {msg.role === 'user' ? (
                  <div>{msg.content}</div>
                ) : (
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="font-bold text-lg mt-2 mb-1" {...props} />,
                      h2: ({node, ...props}) => <h2 className="font-bold text-base mt-2 mb-1" {...props} />,
                      h3: ({node, ...props}) => <h3 className="font-bold text-[14px] mt-2 mb-1" {...props} />,
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-blue-400" {...props} />,
                      code: ({node, ...props}) => <code className="bg-black/20 rounded px-1 py-0.5 font-mono text-[11px]" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-black/30 rounded p-2 overflow-x-auto my-2 font-mono text-[11px]" {...props} />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
                
                {msg.role === 'assistant' && (
                  <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopy(msg.content, idx)}
                      className={`p-1 rounded text-gray-400 hover:text-white transition-colors`}
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
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${t.surfaceHover} border ${t.border} rounded-bl-sm flex items-center gap-2`}>
              <Loader2 size={16} className={`animate-spin ${t.textAccent}`} />
              <span className={`text-xs ${t.textMuted}`}>Vox is thinking...</span>
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
          <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
            {suggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
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
              input.trim() && !isLoading ? `text-blue-500 hover:bg-blue-500/10` : 'text-gray-400'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
