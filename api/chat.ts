import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';

// Initialize Groq client with environment variable
// Vercel securely injects this at runtime
const groqApiKey = process.env.GROQ_API_KEY;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!groq) {
    return res.status(500).json({
      content: 'Server configuration error: GROQ_API_KEY is not set in Vercel environment variables.'
    });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array is required.' });
    }

    // Sanitize messages to remove UI-specific properties like 'isTyping'
    const sanitizedMessages = messages.map(({ role, content }) => ({ role, content }));

    // Construct catalog context server-side by fetching the dynamic data from Supabase
    let entries = [];
    if (supabase) {
      const { data, error } = await supabase.from('entries').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        entries = data;
      }
    }

    const catalogContext = entries.map((e: any) => `- ${e.name} (Type: ${e.type}, Task: ${e.task || 'General'}): ${e.summary || ''}${e.url ? ` URL: ${e.url}` : ''}`).join('\n');

    // System prompt is kept securely on the backend
    const systemPrompt = {
      role: 'system',
      content: `You are Vox, an AI assistant strictly dedicated to the AiVerse encyclopedia. You MUST REFUSE to answer any questions that are not related to Artificial Intelligence, machine learning, AI models, datasets, or the AiVerse platform itself. If a user asks about coding (like Rust loops, general web dev, etc. unless specifically about AI frameworks like PyTorch), general trivia, or off-topic subjects, politely decline and steer the conversation back to AI models and technologies.\n\nHere is the current catalog of AI items available in the AiVerse database:\n${catalogContext || 'No catalog provided'}\n\nUse this catalog to inform your answers. If someone asks what models are available or asks for recommendations, draw from this list.\n\nCRITICAL INSTRUCTION:\nYou MUST ONLY recommend or mention models and tools that are explicitly listed in the catalog above. Do NOT hallucinate or mention any models outside of this catalog under any circumstances.\n\nIMPORTANT RESPONSE GUIDELINES:\n1. **ORGANIZE CLEARLY**: Provide clean, highly structured, and refined responses. Use bullet points and paragraphs effectively to break up the text.\n2. Use **bold text** for all AI model and tool names so they stand out in blue. Format them exactly like this: **Model Name**.\n3. **INCLUDE LINKS**: If a URL is provided in the catalog for an item, you MUST include it in your response formatted exactly like this: [Official Website](URL). Place the link naturally after the model name or at the end of its summary.`,
    };

    const chatCompletion = await groq.chat.completions.create({
      messages: [systemPrompt, ...sanitizedMessages],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 1024,
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    res.status(200).json({ content: responseContent });
  } catch (error: any) {
    console.error("Groq API Error:", error);
    res.status(500).json({ content: `Backend Error: ${error.message}` });
  }
}
