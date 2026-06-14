import { Router } from 'express';
import * as resourceController from '../controllers/resourceController.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = Router();

// Endpoint uses multer middleware for 'file' field
router.post('/upload', uploadMiddleware.single('file'), resourceController.uploadManual);

export default router;
