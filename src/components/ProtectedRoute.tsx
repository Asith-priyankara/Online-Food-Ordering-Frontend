import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

type ProtectedRouteProps = {
  requiredRole?: string;
  redirectTo?: string;
};

export default function ProtectedRoute({
  requiredRole,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { authData, role } = useAuth();

  // If user is not authenticated, redirect to login
  if (!authData) {
    return <Navigate to={redirectTo} replace />;
  }

  // If a specific role is required and doesn't match, redirect
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Allow access if the role matches
  return <Outlet />;
}
