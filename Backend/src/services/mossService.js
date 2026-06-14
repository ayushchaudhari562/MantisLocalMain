import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runPythonWorker = (command, data) => {
  return new Promise((resolve, reject) => {
    // Determine path to worker
    const workerPath = path.join(__dirname, 'moss_worker.py');
    
    // Spawn python process
    // Use 'python' or 'python3' depending on the environment
    const py = spawn('python', [workerPath, command]);

    let output = '';
    let errorOutput = '';

    py.stdout.on('data', (data) => {
      output += data.toString();
    });

    py.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    py.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python worker exited with code ${code}: ${errorOutput}`));
      }
      
      try {
        const result = JSON.parse(output);
        if (result.error) {
          return reject(new Error(result.error));
        }
        resolve(result);
      } catch (e) {
        reject(new Error(`Failed to parse worker output: ${output}`));
      }
    });

    // Write data to stdin
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
  });
};

export const indexChunks = async (productId, chunks) => {
  // Use productId as the index name so each product has isolated vectors
  const indexName = `product_${productId.replace(/-/g, '')}`;
  
  const result = await runPythonWorker('upload', {
    index_name: indexName,
    chunks
  });
  
  return result;
};

export const searchContext = async (productId, query) => {
  const indexName = `product_${productId.replace(/-/g, '')}`;
  
  const result = await runPythonWorker('search', {
    index_name: indexName,
    query
  });
  
  return result.results || [];
};
