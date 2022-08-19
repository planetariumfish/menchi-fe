import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ActiveUser } from "../../contexts/contexts";
import axios from "axios";

const AdminRoute = () => {
  const { userId } = React.useContext(ActiveUser);

  const user = useQuery(["userInfo"], async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/${userId}`,
      {
        headers: {
          "x-access-token": token || "",
        },
      }
    );
    return result.data;
  });

  return userId && user.data.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
