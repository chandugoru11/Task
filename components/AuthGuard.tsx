
import React from 'react';
import { Navigate } from 'react-router-dom';
import { User, UserRole } from '../types';

interface AuthGuardProps {
  user: User | null;
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ user, children, requiredRole }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
