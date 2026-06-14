import { Router } from 'express';
import * as companyController from '../controllers/companyController.js';

import { authenticate, requireCompanyRole } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authenticate, requireCompanyRole, companyController.createCompany);
router.get('/', companyController.getCompanies);

export default router;
