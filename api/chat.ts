import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';
import { entries } from '../src/data';

// Initialize Groq client with environment variable
// Vercel securely injects this at runtime
const groqApiKey = process.env.GROQ_API_KEY;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

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

    // Format the encyclopedia data into a concise catalog
    const catalogContext = entries.map(e => `- ${e.name} (${e.type}): ${e.summary}`).join('\n');

    // System prompt is kept securely on the backend
    const systemPrompt = {
      role: 'system',
      content: `You are Vox, an AI assistant strictly dedicated to the AiVerse encyclopedia. You MUST REFUSE to answer any questions that are not related to Artificial Intelligence, machine learning, AI models, datasets, or the AiVerse platform itself. If a user asks about coding (like Rust loops, general web dev, etc. unless specifically about AI frameworks like PyTorch), general trivia, or off-topic subjects, politely decline and steer the conversation back to AI models and technologies.\n\nHere is the current catalog of AI items in the AiVerse database:\n\n${catalogContext}\n\nUse this catalog to inform your answers. If someone asks what models are available or asks for recommendations, draw from this list. Keep your answers concise, informative, and formatted with markdown when appropriate.`,
    };

    const chatCompletion = await groq.chat.completions.create({
      messages: [systemPrompt, ...messages],
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
