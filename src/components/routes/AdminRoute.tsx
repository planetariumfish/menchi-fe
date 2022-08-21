import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ActiveUser } from "../../contexts/contexts";

const AdminRoute = () => {
  const { user } = React.useContext(ActiveUser);

  return user && user.role === "ADMIN" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
