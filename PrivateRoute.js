import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Modify this line as per your auth logic
  const isCustomer = localStorage.getItem('user_type') === 'customer';
  return isAuthenticated ? children : <Navigate to="/api/" />;
};

export default PrivateRoute;
