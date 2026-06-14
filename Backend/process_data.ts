import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import { extractTextFromBuffer, chunkText } from './src/services/pdfService.js';
import { indexChunks } from './src/services/mossService.js';
import { supabase } from './src/config/supabase.js';

const COMPANY_ID = "46c8f41f-c92b-40eb-a602-2b1ea5c13fa0";

const filesToProcess = [
  { file: 'activa_USER_MANUAL_9.pdf', name: 'Honda Activa 6G', category: 'Scooter' },
  { file: 'TVS Jupiter 110 SmartXonnect.pdf', name: 'TVS Jupiter 110', category: 'Scooter' },
  { file: 'creta.pdf', name: 'Hyundai Creta', category: 'Car' }
];

async function run() {
  for (const item of filesToProcess) {
    try {
      console.log(`\n--- Processing ${item.name} ---`);
      
      // 1. Check if product exists or create it
      let productId;
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('name', item.name)
        .single();
        
      if (existing) {
        productId = existing.id;
        console.log(`Found existing product ID: ${productId}`);
      } else {
        const { data: newProd, error } = await supabase
          .from('products')
          .insert([{
            name: item.name,
            description: `Official manual for ${item.name}`,
            company_id: COMPANY_ID
          }])
          .select()
          .single();
          
        if (error) throw error;
        productId = newProd.id;
        console.log(`Created new product ID: ${productId}`);
      }

      // 2. Read PDF
      const filePath = path.join(process.cwd(), 'Data', item.file);
      console.log(`Reading PDF: ${filePath}`);
      const buffer = fs.readFileSync(filePath);

      // 3. Extract Text
      console.log(`Extracting text from PDF...`);
      const text = await extractTextFromBuffer(buffer);
      console.log(`Extracted ${text.length} characters.`);

      // 4. Chunk Text
      const chunks = chunkText(text);
      console.log(`Created ${chunks.length} chunks.`);

      // 5. Index in MOSS
      console.log(`Indexing into MOSS for ${item.name}...`);
      const result = await indexChunks(productId, chunks);
      console.log(`MOSS Success:`, result);
      
    } catch (err) {
      console.error(`Error processing ${item.name}:`, err.message);
    }
  }
  console.log('\nAll done!');
}

run();
