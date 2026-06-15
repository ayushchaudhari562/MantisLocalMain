import { Router } from 'express';
import * as dashboardController from '../controllers/dashboardController.js';
import { authenticate, requireCompanyRole } from '../middlewares/authMiddleware.js';

const router = Router();

// Dashboard routes protected by authentication and company role
router.get('/stats', authenticate, requireCompanyRole, dashboardController.getStats);
router.get('/analytics', authenticate, requireCompanyRole, dashboardController.getAnalyticsCards);
router.get('/products', authenticate, requireCompanyRole, dashboardController.getCompanyProducts);

export default router;
