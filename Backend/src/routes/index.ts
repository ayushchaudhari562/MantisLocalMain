import { Router } from 'express';
import companyRoutes from './companyRoutes.js';
import productRoutes from './productRoutes.js';

const router = Router();

// Health Check Route
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

import chatRoutes from './chatRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

// Feature Routes
router.use('/companies', companyRoutes);
router.use('/products', productRoutes);
router.use('/chat', chatRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
