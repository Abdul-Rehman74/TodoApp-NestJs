import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const token = useSelector((state) => state.user.token);
  console.log(useSelector((state) => state.user?.token))

  return token ? <Outlet />: <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
