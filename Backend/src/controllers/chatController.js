import * as chatService from '../services/chatService.js';
import * as mossService from '../services/mossService.js';
import * as geminiService from '../services/geminiService.js';
import { supabase } from '../config/supabase.js';

export const handleChat = async (req, res, next) => {
  try {
    const { productId, message } = req.body;
    let { sessionId } = req.body;

    if (!productId || !message) {
      return res.status(400).json({ error: 'productId and message are required' });
    }

    // 1. Create session if it doesn't exist
    if (!sessionId) {
      const { data: session } = await supabase
        .from('chat_sessions')
        .insert([{ product_id: productId }])
        .select()
        .single();
      sessionId = session.id;
    }

    // 2. Save user message to DB
    await chatService.saveMessage(sessionId, 'user', message);

    // 3. Get Chat History (last 10-15 messages)
    const history = await chatService.getSessionHistory(sessionId);

    // 4. Query MOSS for relevant chunks
    const contextChunks = await mossService.searchContext(productId, message);

    // 5. Ask Gemini
    const aiResponse = await geminiService.generateMechanicResponse(history, message, contextChunks);

    // 6. Save AI message to DB
    await chatService.saveMessage(sessionId, 'assistant', aiResponse);

    res.status(200).json({
      status: 'success',
      data: {
        sessionId,
        role: 'assistant',
        content: aiResponse
      }
    });

  } catch (error) {
    next(error);
  }
};
