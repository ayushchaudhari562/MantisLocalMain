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

import resourceRoutes from './resourceRoutes.js';
import chatRoutes from './chatRoutes.js';

// Feature Routes
router.use('/companies', companyRoutes);
router.use('/products', productRoutes);
router.use('/resources', resourceRoutes);
router.use('/chat', chatRoutes);

export default router;
