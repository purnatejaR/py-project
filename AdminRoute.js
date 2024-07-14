import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Modify this line as per your auth logic
  const isAdmin = localStorage.getItem('role') === 'admin'; // Modify this line as per your auth logic
  return isAuthenticated && isAdmin ? children : <Navigate to="/api/login" />;
};

export default AdminRoute;
