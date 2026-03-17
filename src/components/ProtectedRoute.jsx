import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = (user.role || user.UserRole || "").toLowerCase();
  
  if (allowedRoles.length > 0) {
    const lowerCaseAllowed = allowedRoles.map(r => r.toLowerCase());
    
    if (!lowerCaseAllowed.includes(userRole)) {
      console.warn("Unauthorized access attempt by:", userRole);
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;