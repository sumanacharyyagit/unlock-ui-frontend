import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./index.js";

const AdminRoute = () => {
  const isAuthent = isAuthenticated();

  return isAuthent && isAuthent.user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
