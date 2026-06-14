import { Router } from 'express';
import * as companyController from '../controllers/companyController.js';

const router = Router();

router.post('/', companyController.createCompany);
router.get('/', companyController.getCompanies);

export default router;
