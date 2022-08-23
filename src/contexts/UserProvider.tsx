import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ActiveUser } from "./contexts";
import axios from "../utils/axiosClient";
import { User } from "../types/types";

type Props = {
  children?: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const queryClient = useQueryClient();

  // Save token to localStorage when received
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    if (!token) queryClient.clear();
  }, [token]);

  // Check for local saved user credentials on load and activate query if so
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);

  const { data, isLoading } = useQuery(
    ["userInfo"],
    async () => {
      const result = await axios().get("/users");
      return result.data;
    },
    {
      onSuccess: (data) => {
        setUser(data);
      },
      // clear localstorage if token is expired
      onError: () => {
        localStorage.clear();
        setToken(null);
        setUser(null);
      },
      enabled: !!token,
    }
  );

  return (
    <ActiveUser.Provider value={{ user, setUser, setToken, isLoading }}>
      {children}
    </ActiveUser.Provider>
  );
};

export default UserProvider;
