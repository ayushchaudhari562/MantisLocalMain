import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection] ${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
