import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const user = JSON.parse(sessionStorage.getItem("userFound") || "false");
  console.log("User Found Status:", user);

  return user ? <Outlet /> : <Navigate to="/admin/loginpage/" />;
};

export default ProtectedRoutes;
