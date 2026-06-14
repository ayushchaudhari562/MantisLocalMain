import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workerPath = path.join(__dirname, 'src/services/moss_worker.py');
const worker = spawn('python', [workerPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: process.env,
});

worker.stdout.on('data', d => console.log('STDOUT:', d.toString()));
worker.stderr.on('data', d => console.log('STDERR:', d.toString()));
worker.on('exit', c => console.log('EXIT:', c));

// write a message
setTimeout(() => {
  worker.stdin.write(JSON.stringify({command: "ping"}) + "\n");
}, 2000);
