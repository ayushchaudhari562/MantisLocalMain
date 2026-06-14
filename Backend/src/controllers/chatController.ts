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

    // ─── STEP 1: Run independent queries IN PARALLEL ───
    // These 3 operations don't depend on each other, so fire them all at once
    const [productResult, sessionResult, mossResult] = await Promise.all([
      // Fetch product + company info
      supabase
        .from('products')
        .select('name, company_id')
        .eq('id', productId)
        .single(),

      // Create session if needed
      !sessionId
        ? supabase
            .from('chat_sessions')
            .insert([{ product_id: productId }])
            .select()
            .single()
        : Promise.resolve({ data: { id: sessionId } }),

      // Query MOSS for relevant manual chunks (this was the slowest part)
      mossService.searchContext(productId, message),
    ]);

    // Extract results
    const product = productResult.data;
    sessionId = sessionResult.data?.id || sessionId;
    const contextChunks = mossResult;

    let productName = product?.name || 'this product';
    let companyName = 'the manufacturer';

    // ─── STEP 2: Fetch company name + save user msg + get history IN PARALLEL ───
    const companyPromise = product?.company_id
      ? supabase.from('companies').select('name').eq('id', product.company_id).single()
      : Promise.resolve({ data: null });

    const [companyResult, , history] = await Promise.all([
      companyPromise,
      chatService.saveMessage(sessionId, 'user', message),
      chatService.getSessionHistory(sessionId),
    ]);

    if (companyResult.data) {
      companyName = companyResult.data.name;
    }

    // ─── STEP 3: Ask Gemini (this is the only truly sequential step) ───
    const aiResponse = await geminiService.generateMechanicResponse(
      history,
      message,
      contextChunks,
      companyName,
      productName
    );

    // ─── STEP 4: Save AI response (don't block the response) ───
    // Fire and forget — user doesn't need to wait for DB write
    chatService.saveMessage(sessionId, 'assistant', aiResponse).catch(console.error);

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
