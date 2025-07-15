import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const authContext = useContext(AuthContext);
  const { pathname } = useLocation();

  if (!authContext?.isLoggedIn) return <Navigate to="/login" replace state={{ prevPath: pathname }} />;
  return (
    children
  )
}
