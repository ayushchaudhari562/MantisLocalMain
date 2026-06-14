import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
// Initialize without throwing immediately so server starts even without key
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateMechanicResponse = async (chatHistory, newQuery, manualContext) => {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is not configured in .env");
  }

  // Follow the exact prompt engineering requested by Akarsh
  const systemPrompt = `You are an expert product technician.

Use only official documentation.
Diagnose step by step.
Do not give final answer immediately.
Ask follow-up questions if information is insufficient.
Suggest safe checks only.

Relevant manual context:
${manualContext.map(c => `- ${c}`).join('\n')}

Chat history:
${chatHistory.map(msg => `${msg.role === 'user' ? 'User' : 'You'}: ${msg.content}`).join('\n')}

Latest message:
${newQuery}

Important: Decide if the question asked and the manual context is enough to DIAGNOSE the problem. If not, ask a follow-up question to behave like a mechanic.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemPrompt,
    });
    
    return response.text;
  } catch (error) {
    throw new Error(`Gemini API Error: ${error.message}`);
  }
};
