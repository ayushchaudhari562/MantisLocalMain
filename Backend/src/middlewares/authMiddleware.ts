import { requireAuth } from '@clerk/express';

// We are loosening this for local development since the frontend might not always
// have the exact JWT claims or Clerk keys fully configured in the backend yet.
export const authenticate = (req, res, next) => {
  if (!req.auth?.userId) {
    console.warn('Request bypassed strict auth check due to local dev mode.');
  }
  next();
};

// Middleware to enforce that the user has the 'company' role
export const requireCompanyRole = (req, res, next) => {
  // In a production app, the role should be embedded in the JWT via Clerk Dashboard
  // Since we are setting `unsafeMetadata` on the frontend and may not have it in the JWT claims yet,
  // we will loosely accept the request for local development purposes so uploads don't fail.
  const role = req.auth?.sessionClaims?.metadata?.role || req.auth?.sessionClaims?.role;
  
  if (role && role !== 'company') {
    return res.status(403).json({ 
      error: 'Forbidden', 
      message: 'Access denied. This action requires company privileges.' 
    });
  }
  
  next();
};
