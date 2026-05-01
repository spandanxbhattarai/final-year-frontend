import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { ReactNode } from 'react';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: ReactNode;
}

const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
  </div>
);

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, initializing } = useAuth();
  if (initializing) return <Spinner />;
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const hasRole = (userRole: UserRole | undefined, roles: UserRole[]): boolean =>
  !!userRole && roles.includes(userRole);

function getRoleHome(role?: string): string {
  if (role === 'SUPER_ADMIN' || role === 'ADMIN') return '/dashboard';
  if (role === 'STAFF') return '/reservations';
  return '/kitchen';
}

export const SuperAdminRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!hasRole(user?.role, ['SUPER_ADMIN'])) return <Navigate to={getRoleHome(user?.role)} replace />;
  return <>{children}</>;
};

export const AdminOrAboveRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!hasRole(user?.role, ['SUPER_ADMIN', 'ADMIN'])) return <Navigate to={getRoleHome(user?.role)} replace />;
  return <>{children}</>;
};

export const StaffOrAboveRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!hasRole(user?.role, ['SUPER_ADMIN', 'ADMIN', 'STAFF'])) return <Navigate to={getRoleHome(user?.role)} replace />;
  return <>{children}</>;
};

export const AdminOrCookRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!hasRole(user?.role, ['SUPER_ADMIN', 'ADMIN', 'COOK'])) return <Navigate to={getRoleHome(user?.role)} replace />;
  return <>{children}</>;
};

// Kept for backward compatibility
export const AdminRoute = AdminOrAboveRoute;
