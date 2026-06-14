import multer from 'multer';
import path from 'path';

// Store files in memory so we don't save to the local disk
const storage = multer.memoryStorage();

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
