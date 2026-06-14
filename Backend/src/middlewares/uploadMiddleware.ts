import multer from 'multer';
import path from 'path';

// Store files on disk so they act as a physical hardcopy
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (req, file, cb) => {
    // Generate a unique filename to prevent overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Security: Validate file type and size
const fileFilter = (req, file, cb) => {
  // Only accept PDFs
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    const error = new Error('Security Alert: Only PDF files are allowed');
    error.statusCode = 415; // Unsupported Media Type
    cb(error, false);
  }
};

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB strict limit for hackathon
  },
});
