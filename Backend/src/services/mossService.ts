import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Persistent Python MOSS Worker Manager.
 * Instead of spawning a new Python process per request (3-5s cold start),
 * we keep ONE long-running process and send JSON lines over stdin/stdout.
 */
class MossWorkerPool {
  private worker: ReturnType<typeof spawn> | null = null;
  private readline: ReturnType<typeof createInterface> | null = null;
  private pendingRequests: Map<number, { resolve: Function; reject: Function; timer: NodeJS.Timeout }> = new Map();
  private requestId = 0;
  private ready = false;
  private startingPromise: Promise<void> | null = null;
  private responseBuffer: string[] = [];

  private getWorkerPath() {
    return path.join(__dirname, 'moss_worker.py');
  }

  async ensureWorker(): Promise<void> {
    if (this.worker && this.ready) return;
    if (this.startingPromise) return this.startingPromise;

    this.startingPromise = new Promise<void>((resolve, reject) => {
      const workerPath = this.getWorkerPath();
      
      this.worker = spawn('python', [workerPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: process.env,
      });

      this.worker.on('error', (err) => {
        console.error('[MOSS] Worker process error:', err.message);
        this.ready = false;
        this.worker = null;
      });

      this.worker.on('exit', (code) => {
        console.log(`[MOSS] Worker exited with code ${code}`);
        this.ready = false;
        this.worker = null;
        this.startingPromise = null;
        // Reject all pending requests
        for (const [id, req] of this.pendingRequests) {
          clearTimeout(req.timer);
          req.reject(new Error('MOSS worker exited'));
        }
        this.pendingRequests.clear();
      });

      // Read stdout line by line
      this.readline = createInterface({ input: this.worker.stdout! });
      
      this.readline.on('line', (line) => {
        console.log('[MOSS RAW STDOUT]', line);
        try {
          const data = JSON.parse(line);
          
          // First message is the "ready" signal
          if (!this.ready && data.status === 'ready') {
            this.ready = true;
            console.log('[MOSS] Worker is ready (persistent mode)');
            resolve();
            return;
          }

          // Route response to the oldest pending request (FIFO)
          const oldestId = Math.min(...this.pendingRequests.keys());
          const pending = this.pendingRequests.get(oldestId);
          if (pending) {
            clearTimeout(pending.timer);
            this.pendingRequests.delete(oldestId);
            if (data.error) {
              pending.reject(new Error(data.error));
            } else {
              pending.resolve(data);
            }
          }
        } catch (e) {
          // Non-JSON output, ignore
        }
      });

      // Log stderr
      this.worker.stderr?.on('data', (data) => {
        const msg = data.toString().trim();
        if (msg) console.error('[MOSS stderr]', msg);
      });

      // Timeout for startup
      setTimeout(() => {
        if (!this.ready) {
          reject(new Error('MOSS worker startup timed out'));
          this.startingPromise = null;
        }
      }, 15000);
    });

    return this.startingPromise;
  }

  async send(data: Record<string, any>): Promise<any> {
    await this.ensureWorker();
    
    if (!this.worker || !this.ready) {
      throw new Error('MOSS worker not available');
    }

    const id = ++this.requestId;

    return new Promise((resolve, reject) => {
      // 60s timeout per request to account for potential ML model loading
      const timer = setTimeout(() => {
        this.pendingRequests.delete(id);
        reject(new Error('MOSS request timed out (60s)'));
      }, 60000);

      this.pendingRequests.set(id, { resolve, reject, timer });
      
      // Send JSON line to worker stdin
      this.worker!.stdin!.write(JSON.stringify(data) + '\n');
    });
  }

  shutdown() {
    if (this.worker) {
      this.worker.stdin?.end();
      this.worker.kill();
      this.worker = null;
      this.ready = false;
    }
  }
}

// Singleton instance — one worker for the entire server lifetime
const pool = new MossWorkerPool();

// Graceful shutdown
process.on('beforeExit', () => pool.shutdown());
process.on('SIGTERM', () => pool.shutdown());

// Proactively start and warm up the worker so the first user request is fast
export const warmupWorker = async () => {
  try {
    await pool.ensureWorker();
    // Send a ping to pre-warm the Python interpreter and imports
    await pool.send({ command: 'ping' });
    console.log('[MOSS] Worker warmed up successfully.');
  } catch (err) {
    console.error('[MOSS] Worker warmup failed:', err.message);
  }
};

export const indexChunks = async (productId: string, chunks: string[]) => {
  const indexName = `product_${productId.replace(/-/g, '')}`;
  
  const result = await pool.send({
    command: 'upload',
    index_name: indexName,
    chunks
  });
  
  return result;
};

export const searchContext = async (productId: string, query: string) => {
  const indexName = `product_${productId.replace(/-/g, '')}`;
  
  const result = await pool.send({
    command: 'search',
    index_name: indexName,
    query
  });
  
  return result.results || [];
};
