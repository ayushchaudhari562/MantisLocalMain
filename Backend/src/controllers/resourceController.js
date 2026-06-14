import { supabase } from '../config/supabase.js';
import * as pdfService from '../services/pdfService.js';
import * as mossService from '../services/mossService.js';

export const uploadManual = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const file = req.file;

    if (!productId || !file) {
      return res.status(400).json({ error: 'Product ID and PDF file are required' });
    }

    // 1. Upload to Supabase Storage (assuming bucket "manuals" exists)
    const filePath = `manuals/${productId}/${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('manuals')
      .upload(filePath, file.buffer, { contentType: 'application/pdf' });

    if (storageError) {
      throw new Error(`Storage upload failed: ${storageError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage.from('manuals').getPublicUrl(filePath);

    // 2. Save resource metadata to Supabase DB
    const { data: resourceData } = await supabase
      .from('resources')
      .insert([{ product_id: productId, type: 'manual', file_url: publicUrl }])
      .select()
      .single();

    // 3. Extract Text
    const text = await pdfService.extractTextFromBuffer(file.buffer);

    // 4. Chunk Text
    const chunks = pdfService.chunkText(text);

    // 5. Index in MOSS
    const mossResult = await mossService.indexChunks(productId, chunks);

    res.status(200).json({
      status: 'success',
      message: 'PDF processed successfully',
      data: {
        resource: resourceData,
        chunksProcessed: chunks.length,
        mossStatus: mossResult
      }
    });

  } catch (error) {
    next(error);
  }
};
