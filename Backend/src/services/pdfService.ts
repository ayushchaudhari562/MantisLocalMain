import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export const extractTextFromBuffer = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};

export const chunkText = (text, maxChunkLength = 1000, overlap = 200) => {
  // Simple character-based overlapping chunker
  if (!text) return [];
  
  // Clean up whitespace
  const cleanText = text.replace(/\s+/g, ' ').trim();
  const chunks = [];
  let i = 0;
  
  while (i < cleanText.length) {
    let end = i + maxChunkLength;
    
    // Try not to cut words in half
    if (end < cleanText.length) {
      let nextSpace = cleanText.indexOf(' ', end);
      if (nextSpace !== -1 && nextSpace - end < 50) {
        end = nextSpace;
      }
    }
    
    chunks.push(cleanText.substring(i, end));
    i = end - overlap; // Move forward but keep overlap
    if (i < 0) i = 0;
  }
  
  // Remove duplicates and extremely small chunks
  return [...new Set(chunks)].filter(c => c.length > 50);
};
