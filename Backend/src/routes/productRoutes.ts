import { Router } from 'express';
import * as productController from '../controllers/productController.js';

import { authenticate, requireCompanyRole } from '../middlewares/authMiddleware.js';

import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.post('/', authenticate, requireCompanyRole, productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authenticate, requireCompanyRole, productController.updateProduct);
router.get('/:id/resources', productController.getProductResources);

// Document Management Routes
router.post('/:id/documents', authenticate, requireCompanyRole, uploadMiddleware.single('file'), productController.uploadDocument);
router.get('/:id/documents', productController.getDocuments);

export default router;
