import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./index.js";

const PrivateRoute = () => {
  const isAuthent = isAuthenticated();

  return isAuthent ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
