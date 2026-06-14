import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'user' | 'company';
}

export default function RoleProtectedRoute({ children, allowedRole }: RoleProtectedRouteProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  const role = user?.unsafeMetadata?.role || 'user';

  if (role !== allowedRole) {
    // Redirect to home if user doesn't have the correct role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
