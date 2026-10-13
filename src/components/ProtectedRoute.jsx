import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('adminToken');

  // If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}