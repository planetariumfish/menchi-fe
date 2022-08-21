import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ActiveUser } from "../../contexts/contexts";

const LoggedInRoute = () => {
  const { user } = React.useContext(ActiveUser);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default LoggedInRoute;
