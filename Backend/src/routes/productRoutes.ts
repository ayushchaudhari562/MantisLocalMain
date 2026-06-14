import { Router } from 'express';
import * as productController from '../controllers/productController.js';

const router = Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.get('/:id/resources', productController.getProductResources);

export default router;
