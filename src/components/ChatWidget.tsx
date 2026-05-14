import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Minimize2, Maximize2, RefreshCw, Copy, Check } from 'lucide-react';
import { useTokens } from '../lib/theme';
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json().catch(() => ({}));
      
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
            <p className={`text-[10px] ${t.textMuted}`}>AI Encyclopedia Assistant</p>
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
                className={`group relative max-w-[85%] rounded-2xl px-4 py-2 ${
                  msg.role === 'user' 
                    ? `bg-blue-600 text-white rounded-br-sm` 
                    : `${t.surfaceHover} ${t.textPrimary} border ${t.border} rounded-bl-sm`
                }`}
              >
                {/* Very simple markdown rendering for bold text and line breaks, since we don't have a full markdown parser */}
                {msg.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < msg.content.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
                
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
              <span className={`text-xs ${t.textMuted}`}>Agent is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions Area */}
      {!isLoading && messages.length > 0 && (
        <div className={`px-4 pb-2 pt-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-t ${t.border}`}>
          <button 
            onClick={refreshSuggestions}
            className={`shrink-0 p-1.5 rounded-full ${t.surfaceHover} text-blue-400 hover:text-blue-300 transition-colors border ${t.border}`}
            title="Refresh suggestions"
          >
            <RefreshCw size={14} />
          </button>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] whitespace-nowrap transition-colors border ${t.border} ${t.surfaceHover} hover:border-blue-500/50 hover:text-blue-400 ${t.textMuted}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className={`p-3 ${isLoading ? `border-t ${t.border}` : ''}`}>
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
