import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { clerkMiddleware } from '@clerk/express';

import path from 'path';

const app = express();

// Middlewares
app.use(helmet({ crossOriginResourcePolicy: false })); // Security headers, tweaked to allow loading resources
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(clerkMiddleware()); // Authenticate requests with Clerk

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api', routes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Not Found - ${req.originalUrl}`
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
