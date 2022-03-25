import { useAppSelector } from 'app/hooks';
import { authSelector } from 'features/auth/authSlice';
import { FC, ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute: FC = ({ children }) => {
  const { isAuthorized } = useAppSelector(authSelector);
  const location = useLocation();

  if (!isAuthorized)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return (children || <Outlet />) as ReactElement | null;
};