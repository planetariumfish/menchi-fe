import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ActiveUser } from "../../contexts/contexts";

const LoggedInRoute = () => {
  const { userId } = React.useContext(ActiveUser);
  return userId ? <Outlet /> : <Navigate to="/" />;
};

export default LoggedInRoute;
