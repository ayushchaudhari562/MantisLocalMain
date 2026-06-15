import { supabase } from './src/config/supabase.js';

async function alterTable() {
  console.log('Executing SQL RPC...');
  const { data, error } = await supabase.rpc('exec_sql', {
    sql_string: `
      ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS image TEXT;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS doc_hash TEXT;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS doc_status TEXT DEFAULT 'pending';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS chunk_count INTEGER DEFAULT 0;
    `
  });
  
  if (error) {
    console.error('Error executing RPC:', error);
  } else {
    console.log('SQL executed successfully! Result:', data);
  }
}

alterTable();

