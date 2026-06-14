import dotenv from 'dotenv';
dotenv.config();

import { searchContext } from './src/services/mossService.js';

async function testSearch() {
  try {
    const results = await searchContext('d3e97adf-eedb-413b-a2bb-9f450aa29c1e', 'horn not working');
    console.log('MOSS Results:', results.length, 'chunks found');
    results.forEach((r, i) => console.log(`\n--- Chunk ${i+1} ---\n${r.slice(0, 200)}...`));
  } catch (err) {
    console.error('Search error:', err.message);
  }
}
testSearch();
